import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";
import { bookingSchema } from "./booking-schema";
import { saveBookingRequest } from "./booking.server";

function publicClient() {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) return null;
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

/** Fully booked nights from today onwards (yyyy-MM-dd strings). Never throws. */
export const getBookedNights = createServerFn({ method: "GET" }).handler(async () => {
  const unavailable = { nights: [] as string[], error: "Availability could not be loaded" as string | null };
  try {
    const client = publicClient();
    if (!client) return unavailable;
    const today = new Date().toISOString().slice(0, 10);
    const { data, error } = await client
      .from("booked_nights")
      .select("night")
      .gte("night", today)
      .order("night");
    if (error) {
      console.error("booked_nights read failed", error.message);
      return unavailable;
    }
    return { nights: (data ?? []).map((r) => r.night), error: null as string | null };
  } catch (e) {
    console.error("booked_nights read failed", e);
    return unavailable;
  }
});

export const submitBookingRequest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => bookingSchema.parse(input))
  .handler(async ({ data }) =>
    saveBookingRequest(data, async () => {
      if (!process.env["SUPABASE_URL"] || !process.env["SUPABASE_SERVICE_ROLE_KEY"]) return null;
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      return supabaseAdmin;
    }),
  );
