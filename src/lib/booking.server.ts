import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";
import type { BookingInput } from "./booking-schema";
import { countNights, estimateTotal, stayHitsBookedNight } from "./pricing";

export type SubmitBookingResult =
  | { ok: true; nights: number; total: number; saved: boolean; id: string | null }
  | { ok: false; error: string };

type Db = Pick<SupabaseClient<Database>, "from">;

/**
 * Saves a booking request when the database is available.
 * If the database isn't configured (e.g. a self-hosted copy without env vars) or
 * errors out, the request still succeeds with `saved: false` so the guest can
 * send it to the lodge on WhatsApp. Only genuine guest problems (past dates,
 * fully booked nights, repeated requests) return `ok: false`.
 */
export async function saveBookingRequest(
  data: BookingInput,
  getDb: () => Promise<Db | null>,
  now: number = Date.now(),
): Promise<SubmitBookingResult> {
  // Malawi is UTC+2; allow check-in from "yesterday" UTC to avoid edge cases near midnight.
  const earliest = new Date(now - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  if (data.checkIn < earliest) {
    return { ok: false, error: "Please choose a check-in date from today onwards." };
  }
  const nights = countNights(data.checkIn, data.checkOut);
  if (nights > 60) {
    return { ok: false, error: "For stays longer than 60 nights, please call us." };
  }
  const total = estimateTotal(nights, data.rooms);
  const unsaved = { ok: true as const, nights, total, saved: false, id: null };

  let db: Db | null;
  try {
    db = await getDb();
  } catch (e) {
    console.error("booking database unavailable", e);
    return unsaved;
  }
  if (!db) {
    console.warn("booking database not configured; request goes by WhatsApp only");
    return unsaved;
  }

  try {
    const { data: booked, error: bookedErr } = await db
      .from("booked_nights")
      .select("night")
      .gte("night", data.checkIn)
      .lt("night", data.checkOut);
    if (bookedErr) {
      console.error("booked_nights check failed", bookedErr.message);
      return unsaved;
    }
    if (stayHitsBookedNight(data.checkIn, data.checkOut, (booked ?? []).map((b) => b.night))) {
      return { ok: false, error: "Some of those nights are fully booked. Please pick other dates." };
    }

    // Light spam protection: max 3 requests per phone number per hour.
    const hourAgo = new Date(now - 60 * 60 * 1000).toISOString();
    const { count } = await db
      .from("booking_requests")
      .select("id", { count: "exact", head: true })
      .eq("phone", data.phone)
      .gte("created_at", hourAgo);
    if ((count ?? 0) >= 3) {
      return {
        ok: false,
        error: "We already have your request. We will be in touch shortly, or call us now.",
      };
    }

    const { data: row, error } = await db
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
        estimated_total: total,
        message: data.message || null,
      })
      .select("id")
      .single();
    if (error || !row) {
      console.error("booking insert failed", error?.message);
      return unsaved;
    }
    return { ok: true, nights, total, saved: true, id: row.id };
  } catch (e) {
    console.error("booking database error", e);
    return unsaved;
  }
}
