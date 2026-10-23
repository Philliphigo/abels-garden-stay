import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

import type { Database } from "@/integrations/supabase/types";
import { countNights, estimateTotal, stayHitsBookedNight } from "./pricing";

function publicClient() {
  const url = process.env["SUPABASE_URL"]!;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
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

/** Fully booked nights from today onwards (yyyy-MM-dd strings). */
export const getBookedNights = createServerFn({ method: "GET" }).handler(async () => {
  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await publicClient()
    .from("booked_nights")
    .select("night")
    .gte("night", today)
    .order("night");
  if (error) {
    console.error("booked_nights read failed", error.message);
    return { nights: [] as string[], error: "Availability could not be loaded" };
  }
  return { nights: (data ?? []).map((r) => r.night), error: null as string | null };
});

const dateStr = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date");

export const bookingSchema = z
  .object({
    fullName: z.string().trim().min(2, "Please enter your name").max(100),
    phone: z
      .string()
      .trim()
      .min(7, "Please enter a valid phone number")
      .max(20)
      .regex(/^[+\d\s()-]+$/, "Please enter a valid phone number"),
    email: z
      .string()
      .trim()
      .max(255)
      .email("Please enter a valid email")
      .optional()
      .or(z.literal("")),
    guests: z.number().int().min(1).max(12),
    rooms: z.number().int().min(1).max(6),
    checkIn: dateStr,
    checkOut: dateStr,
    message: z.string().trim().max(1000).optional().or(z.literal("")),
  })
  .refine((d) => d.checkOut > d.checkIn, {
    message: "Check-out must be after check-in",
    path: ["checkOut"],
  });

export type BookingInput = z.infer<typeof bookingSchema>;

export const submitBookingRequest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => bookingSchema.parse(input))
  .handler(async ({ data }) => {
    // Malawi is UTC+2; allow check-in from "yesterday" UTC to avoid edge cases near midnight.
    const earliest = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    if (data.checkIn < earliest) {
      return { ok: false as const, error: "Please choose a check-in date from today onwards." };
    }
    const nights = countNights(data.checkIn, data.checkOut);
    if (nights > 60) {
      return { ok: false as const, error: "For stays longer than 60 nights, please call us." };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: booked, error: bookedErr } = await supabaseAdmin
      .from("booked_nights")
      .select("night")
      .gte("night", data.checkIn)
      .lt("night", data.checkOut);
    if (bookedErr) {
      console.error("booked_nights check failed", bookedErr.message);
      return { ok: false as const, error: "Something went wrong. Please call or WhatsApp us." };
    }
    if (stayHitsBookedNight(data.checkIn, data.checkOut, (booked ?? []).map((b) => b.night))) {
      return {
        ok: false as const,
        error: "Some of those nights are fully booked. Please pick other dates.",
      };
    }

    // Light spam protection: max 3 requests per phone number per hour.
    const hourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count } = await supabaseAdmin
      .from("booking_requests")
      .select("id", { count: "exact", head: true })
      .eq("phone", data.phone)
      .gte("created_at", hourAgo);
    if ((count ?? 0) >= 3) {
      return {
        ok: false as const,
        error: "We already have your request. We will be in touch shortly, or call us now.",
      };
    }

    const { data: row, error } = await supabaseAdmin
      .from("booking_requests")
      .insert({
        full_name: data.fullName,
        phone: data.phone,
        email: data.email || null,
        guests: data.guests,
        rooms: data.rooms,
        check_in: data.checkIn,
        check_out: data.checkOut,
        nights,
        estimated_total: estimateTotal(nights, data.rooms),
        message: data.message || null,
      })
      .select("id")
      .single();

    if (error || !row) {
      console.error("booking insert failed", error?.message);
      return { ok: false as const, error: "Something went wrong. Please call or WhatsApp us." };
    }

    return { ok: true as const, id: row.id, nights, total: estimateTotal(nights, data.rooms) };
  });
