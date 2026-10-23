import { useMemo, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { parseLocalDate } from "@/lib/pricing";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

type Props = {
  today: string;
  booked: Set<string>;
  checkIn: string | null;
  checkOut: string | null;
  onPick: (day: string) => void;
};

function MonthGrid({
  month,
  today,
  booked,
  checkIn,
  checkOut,
  onPick,
}: Props & { month: Date }) {
  const days = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfWeek(startOfMonth(month), { weekStartsOn: 1 }),
        end: endOfWeek(endOfMonth(month), { weekStartsOn: 1 }),
      }),
    [month],
  );

  return (
    <div>
      <p className="mb-3 text-center font-serif text-lg font-medium">{format(month, "MMMM yyyy")}</p>
      <div className="grid grid-cols-7 gap-1 text-center text-[0.7rem] font-semibold uppercase tracking-wider text-muted-foreground">
        {WEEKDAYS.map((d) => (
          <span key={d} className="py-1">
            {d}
          </span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {days.map((d) => {
          const key = format(d, "yyyy-MM-dd");
          if (!isSameMonth(d, month)) return <span key={key} />;
          const past = key < today;
          const isBooked = booked.has(key);
          const isStart = key === checkIn;
          const isEnd = key === checkOut;
          const inRange = !!checkIn && !!checkOut && key > checkIn && key < checkOut;
          // A fully booked night can still be a check-out day.
          const canBeCheckout = !!checkIn && !checkOut && key > checkIn;
          const disabled = past || (isBooked && !canBeCheckout);

          return (
            <button
              key={key}
              type="button"
              disabled={disabled}
              onClick={() => onPick(key)}
              aria-label={`${format(d, "EEEE d MMMM yyyy")}${isBooked ? ", fully booked" : ""}`}
              aria-pressed={isStart || isEnd}
              className={cn(
                "relative grid aspect-square place-items-center rounded-xl text-sm font-medium transition-colors",
                "hover:bg-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                past && "cursor-not-allowed text-muted-foreground/40 hover:bg-transparent",
                isBooked &&
                  !past &&
                  "cursor-not-allowed bg-muted text-muted-foreground line-through decoration-destructive decoration-2 hover:bg-muted",
                isBooked && canBeCheckout && "cursor-pointer",
                inRange && "rounded-none bg-primary/15 text-foreground",
                (isStart || isEnd) && "bg-primary text-primary-foreground hover:bg-primary",
                key === today && !isStart && !isEnd && "ring-1 ring-primary/50",
              )}
            >
              {format(d, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function AvailabilityCalendar(props: Props) {
  const todayDate = useMemo(() => parseLocalDate(props.today), [props.today]);
  const [offset, setOffset] = useState(0);
  const first = addMonths(startOfMonth(todayDate), offset);
  const second = addMonths(first, 1);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setOffset((o) => Math.max(0, o - 1))}
          disabled={offset === 0}
          className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card hover:bg-sand disabled:opacity-40"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => setOffset((o) => Math.min(11, o + 1))}
          className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card hover:bg-sand"
          aria-label="Next month"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <MonthGrid {...props} month={first} />
        <div className="hidden md:block">
          <MonthGrid {...props} month={second} />
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-md bg-primary" /> Your dates
        </span>
        <span className="flex items-center gap-2">
          <span className="grid h-4 w-4 place-items-center rounded-md bg-muted text-[0.6rem] line-through decoration-destructive">
            8
          </span>
          Fully booked
        </span>
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-md ring-1 ring-primary/50" /> Today
        </span>
      </div>
    </div>
  );
}
