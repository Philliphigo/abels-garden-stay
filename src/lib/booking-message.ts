import { format } from "date-fns";

import { formatKwacha, parseLocalDate } from "./pricing";

export const DEFAULT_GUEST_NOTE = "No special requests. Please confirm my booking.";

export type BookingMessageDetails = {
  fullName: string;
  phone: string;
  email?: string | undefined;
  checkIn: string;
  checkOut: string;
  nights: number;
  rooms: number;
  guests: number;
  total: number;
  message?: string | undefined;
};

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;
const day = (d: string) => format(parseLocalDate(d), "EEE d MMM yyyy");

/** WhatsApp message the guest sends to the lodge after submitting the booking form. */
export function bookingWhatsappMessage(d: BookingMessageDetails) {
  const note = d.message?.trim() || DEFAULT_GUEST_NOTE;
  const lines = [
    "Hello Abel's Lodge, I would like to book a room.",
    "",
    `Name: ${d.fullName.trim()}`,
    `Phone: ${d.phone.trim()}`,
    ...(d.email?.trim() ? [`Email: ${d.email.trim()}`] : []),
    `Check-in: ${day(d.checkIn)}`,
    `Check-out: ${day(d.checkOut)}`,
    `Stay: ${plural(d.nights, "night")}, ${plural(d.rooms, "room")}, ${plural(d.guests, "guest")}`,
    `Estimated total: ${formatKwacha(d.total)}`,
    "",
    `Message: ${note}`,
  ];
  return lines.join("\n");
}
