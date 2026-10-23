import { describe, expect, it } from "vitest";

import {
  PRICE_PER_ROOM_PER_NIGHT,
  countNights,
  estimateTotal,
  formatKwacha,
  stayHitsBookedNight,
} from "./pricing";

describe("Abel's Lodge pricing", () => {
  it("charges K30,000 per room per night", () => {
    expect(PRICE_PER_ROOM_PER_NIGHT).toBe(30000);
    expect(estimateTotal(1, 1)).toBe(30000);
  });

  it("multiplies by nights and rooms", () => {
    expect(estimateTotal(3, 2)).toBe(180000);
  });

  it("does not count the check-out day as a night", () => {
    expect(countNights("2026-11-10", "2026-11-13")).toBe(3);
    expect(countNights("2026-11-10", "2026-11-10")).toBe(0);
  });

  it("formats prices in Kwacha", () => {
    expect(formatKwacha(30000)).toBe("K30,000");
  });

  it("blocks a stay that includes a fully booked night but allows checking out on one", () => {
    expect(stayHitsBookedNight("2026-11-10", "2026-11-13", ["2026-11-12"])).toBe(true);
    expect(stayHitsBookedNight("2026-11-10", "2026-11-12", ["2026-11-12"])).toBe(false);
  });
});
