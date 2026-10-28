import { describe, expect, it } from "vitest";

import { saveBookingRequest } from "./booking.server";

const NOW = Date.parse("2026-11-01T08:00:00Z");
const booking = {
  fullName: "Grace Banda",
  phone: "0999 111 222",
  email: "",
  guests: 2,
  rooms: 1,
  checkIn: "2026-11-02",
  checkOut: "2026-11-04",
  message: "",
};

// Minimal stand-in for the database client's chained queries.
function fakeDb(opts: { booked?: string[]; insertFails?: boolean } = {}) {
  return {
    from(table: string) {
      const chain: Record<string, unknown> = {};
      for (const m of ["select", "gte", "lt", "eq", "insert"]) chain[m] = () => chain;
      chain["single"] = () =>
        Promise.resolve(
          opts.insertFails
            ? { data: null, error: { message: "insert failed" } }
            : { data: { id: "row-1" }, error: null },
        );
      chain["then"] = (res: (v: unknown) => unknown, rej: (e: unknown) => unknown) =>
        Promise.resolve(
          table === "booked_nights"
            ? { data: (opts.booked ?? []).map((night) => ({ night })), error: null }
            : { count: 0, error: null },
        ).then(res, rej);
      return chain;
    },
  } as never;
}

describe("saveBookingRequest", () => {
  it("still succeeds (unsaved) when the database isn't configured", async () => {
    const res = await saveBookingRequest(booking, async () => null, NOW);
    expect(res).toEqual({ ok: true, nights: 2, total: 60000, saved: false, id: null });
  });

  it("still succeeds (unsaved) when the database can't be reached", async () => {
    const res = await saveBookingRequest(
      booking,
      async () => {
        throw new Error("Missing Supabase environment variable(s)");
      },
      NOW,
    );
    expect(res).toMatchObject({ ok: true, saved: false, nights: 2, total: 60000 });
  });

  it("still succeeds (unsaved) when saving the request fails", async () => {
    const res = await saveBookingRequest(booking, async () => fakeDb({ insertFails: true }), NOW);
    expect(res).toMatchObject({ ok: true, saved: false });
  });

  it("saves the request when the database works", async () => {
    const res = await saveBookingRequest(booking, async () => fakeDb(), NOW);
    expect(res).toEqual({ ok: true, nights: 2, total: 60000, saved: true, id: "row-1" });
  });

  it("refuses nights the lodge marked as fully booked", async () => {
    const res = await saveBookingRequest(booking, async () => fakeDb({ booked: ["2026-11-03"] }), NOW);
    expect(res.ok).toBe(false);
  });
});
