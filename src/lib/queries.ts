import { queryOptions } from "@tanstack/react-query";

import { getBookedNights } from "./booking.functions";

export const bookedNightsQuery = queryOptions({
  queryKey: ["booked-nights"],
  queryFn: () => getBookedNights(),
  staleTime: 60_000,
});
