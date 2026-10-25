import { describe, expect, it } from "vitest";

import { DEFAULT_GUEST_NOTE, bookingWhatsappMessage } from "./booking-message";

const base = {
  fullName: "Grace Banda",
  phone: "0999 111 222",
  checkIn: "2026-11-02",
  checkOut: "2026-11-04",
  nights: 2,
  rooms: 1,
  guests: 2,
  total: 60000,
};

describe("bookingWhatsappMessage", () => {
  it("includes the guest's own message when they wrote one", () => {
    const text = bookingWhatsappMessage({ ...base, message: "Arriving around 6pm" });
    expect(text).toContain("Message: Arriving around 6pm");
    expect(text).not.toContain(DEFAULT_GUEST_NOTE);
  });

  it("puts in a default message when the guest left it empty", () => {
    const text = bookingWhatsappMessage({ ...base, message: "   " });
    expect(text).toContain(`Message: ${DEFAULT_GUEST_NOTE}`);
  });

  it("carries the booking details to the lodge", () => {
    const text = bookingWhatsappMessage(base);
    expect(text).toContain("Name: Grace Banda");
    expect(text).toContain("Phone: 0999 111 222");
    expect(text).toContain("2 nights, 1 room, 2 guests");
  });
});
