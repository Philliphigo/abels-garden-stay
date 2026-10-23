// Room price rules for Abel's Lodge. Breakfast is included in the nightly rate.
export const PRICE_PER_ROOM_PER_NIGHT = 30000;

const DAY_MS = 24 * 60 * 60 * 1000;

/** Parse a yyyy-MM-dd string as a UTC midnight timestamp. */
function toUtc(date: string): number {
  const [y, m, d] = date.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

function fromUtc(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

/** Number of nights between check-in and check-out (check-out day is not a night). */
export function countNights(checkIn: string, checkOut: string): number {
  const diff = Math.round((toUtc(checkOut) - toUtc(checkIn)) / DAY_MS);
  return diff > 0 ? diff : 0;
}

/** Every night (yyyy-MM-dd) a guest stays, excluding the check-out day. */
export function nightsOfStay(checkIn: string, checkOut: string): string[] {
  const nights: string[] = [];
  const start = toUtc(checkIn);
  const count = countNights(checkIn, checkOut);
  for (let i = 0; i < count; i++) nights.push(fromUtc(start + i * DAY_MS));
  return nights;
}

/** True when any night of the stay is already fully booked. */
export function stayHitsBookedNight(
  checkIn: string,
  checkOut: string,
  booked: Iterable<string>,
): boolean {
  const set = new Set(booked);
  return nightsOfStay(checkIn, checkOut).some((n) => set.has(n));
}

export function estimateTotal(nights: number, rooms: number): number {
  if (nights <= 0 || rooms <= 0) return 0;
  return nights * rooms * PRICE_PER_ROOM_PER_NIGHT;
}

export function formatKwacha(amount: number): string {
  return `K${amount.toLocaleString("en-US")}`;
}
