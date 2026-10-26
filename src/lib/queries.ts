import { queryOptions } from "@tanstack/react-query";

import { getBookedNights } from "./booking.functions";

export const bookedNightsQuery = queryOptions({
  queryKey: ["booked-nights"],
  // Never throw: if availability can't load (old browser, flaky network), the page
  // must still show — the booking section just displays a notice instead.
  queryFn: async () => {
    try {
      return await getBookedNights();
    } catch (error) {
      console.error("booked nights request failed", error);
      return { nights: [] as string[], error: "Availability could not be loaded" as string | null };
    }
  },
  staleTime: 60_000,
  retry: 1,
});
