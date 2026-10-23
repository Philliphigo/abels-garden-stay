import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { format } from "date-fns";
import { CheckCircle2, Loader2, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MAX_GUESTS, MAX_ROOMS, bookingSchema } from "@/lib/booking-schema";
import { submitBookingRequest } from "@/lib/booking.functions";
import { LODGE, TEL_LINK, whatsappLink } from "@/lib/lodge";
import {
  PRICE_PER_ROOM_PER_NIGHT,
  countNights,
  estimateTotal,
  formatKwacha,
  parseLocalDate,
  stayHitsBookedNight,
} from "@/lib/pricing";
import { bookedNightsQuery } from "@/lib/queries";
import { AvailabilityCalendar } from "./AvailabilityCalendar";
import { Eyebrow, Reveal } from "./Reveal";

function prettyDate(d: string | null) {
  if (!d) return "Select a date";
  return format(parseLocalDate(d), "EEE d MMM yyyy");
}

const selectClass =
  "h-11 w-full rounded-xl border border-input bg-card px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

type ErrorKey = "fullName" | "phone" | "email" | "message" | "checkIn" | "checkOut" | "guests" | "rooms" | "dates";

type Done = { nights: number; total: number; name: string; checkIn: string; checkOut: string; rooms: number; guests: number };

export function Booking() {
  const { data } = useSuspenseQuery(bookedNightsQuery);
  const booked = useMemo(() => new Set(data.nights), [data.nights]);
  const submit = useServerFn(submitBookingRequest);

  const [today, setToday] = useState<string | null>(null);
  useEffect(() => setToday(format(new Date(), "yyyy-MM-dd")), []);

  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    guests: 1,
    rooms: 1,
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<ErrorKey, string>>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<Done | null>(null);

  const nights = checkIn && checkOut ? countNights(checkIn, checkOut) : 0;
  const total = estimateTotal(nights, form.rooms);

  function pick(day: string) {
    if (!checkIn || checkOut || day <= checkIn) {
      if (booked.has(day)) return;
      setCheckIn(day);
      setCheckOut(null);
      return;
    }
    if (stayHitsBookedNight(checkIn, day, booked)) {
      toast.error("Some nights in that range are fully booked. Please choose other dates.");
      return;
    }
    setCheckOut(day);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const payload = {
      ...form,
      checkIn: checkIn ?? "",
      checkOut: checkOut ?? "",
    };
    const parsed = bookingSchema.safeParse(payload);
    if (!parsed.success) {
      const errs: Partial<Record<ErrorKey, string>> = {};
      for (const issue of parsed.error.issues) {
        const k = String(issue.path[0]) as ErrorKey;
        if (!errs[k]) errs[k] = issue.message;
      }
      if (!checkIn || !checkOut) errs.dates = "Please choose your check-in and check-out dates.";
      setErrors(errs);
      return;
    }
    setErrors({});
    setSending(true);
    try {
      const res = await submit({ data: parsed.data });
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      setDone({
        nights: res.nights,
        total: res.total,
        name: parsed.data.fullName,
        checkIn: parsed.data.checkIn,
        checkOut: parsed.data.checkOut,
        rooms: parsed.data.rooms,
        guests: parsed.data.guests,
      });
    } catch {
      toast.error("Something went wrong. Please call or WhatsApp us instead.");
    } finally {
      setSending(false);
    }
  }

  const waMessage = done
    ? `Hello Abel's Lodge, this is ${done.name}. I just sent a booking request for ${prettyDate(done.checkIn)} to ${prettyDate(done.checkOut)} (${done.nights} night${done.nights > 1 ? "s" : ""}, ${done.rooms} room${done.rooms > 1 ? "s" : ""}, ${done.guests} guest${done.guests > 1 ? "s" : ""}).`
    : checkIn && checkOut
      ? `Hello Abel's Lodge, I'd like to book from ${prettyDate(checkIn)} to ${prettyDate(checkOut)} for ${form.guests} guest${form.guests > 1 ? "s" : ""} and ${form.rooms} room${form.rooms > 1 ? "s" : ""}.`
      : "Hello Abel's Lodge, I would like to book a room.";

  return (
    <section id="booking" className="bg-sand/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <Eyebrow className="justify-center">Book your stay</Eyebrow>
          <h2 className="text-4xl font-medium sm:text-5xl">
            Check availability <em className="text-primary">&amp; request a room.</em>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Pick your dates, send your details and we&apos;ll confirm by phone or WhatsApp. No
            online payment needed.
          </p>
        </Reveal>

        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
            <div className="rounded-[2rem] border border-border bg-card p-5 shadow-soft sm:p-8">
              <div className="mb-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-secondary p-4">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Check-in
                  </p>
                  <p className="mt-1 font-serif text-base sm:text-lg">{prettyDate(checkIn)}</p>
                </div>
                <div className="rounded-2xl bg-secondary p-4">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Check-out
                  </p>
                  <p className="mt-1 font-serif text-base sm:text-lg">{prettyDate(checkOut)}</p>
                </div>
              </div>

              {today ? (
                <AvailabilityCalendar
                  today={today}
                  booked={booked}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  onPick={pick}
                />
              ) : (
                <div className="h-80 animate-pulse rounded-2xl bg-secondary" />
              )}

              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                  {!checkIn
                    ? "Tap your check-in date."
                    : !checkOut
                      ? "Now tap your check-out date."
                      : `${nights} night${nights > 1 ? "s" : ""} selected.`}
                </p>
                {(checkIn || checkOut) && (
                  <button
                    type="button"
                    onClick={() => {
                      setCheckIn(null);
                      setCheckOut(null);
                    }}
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    Clear dates
                  </button>
                )}
              </div>
              {errors.dates && <p className="mt-2 text-sm text-destructive">{errors.dates}</p>}
              {data.error && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Live availability couldn&apos;t load right now — send your request and we&apos;ll
                  confirm.
                </p>
              )}
            </div>

            <div className="rounded-[2rem] border border-border bg-card p-5 shadow-soft sm:p-8">
              {done ? (
                <div className="flex h-full flex-col">
                  <CheckCircle2 className="h-12 w-12 text-forest" />
                  <h3 className="mt-4 text-3xl font-medium">Thank you, {done.name.split(" ")[0]}!</h3>
                  <p className="mt-3 text-muted-foreground">
                    Your request for <strong>{prettyDate(done.checkIn)}</strong> to{" "}
                    <strong>{prettyDate(done.checkOut)}</strong> has been received. We&apos;ll
                    call or message you soon to confirm.
                  </p>
                  <div className="mt-6 rounded-2xl bg-secondary p-5">
                    <p className="text-sm text-muted-foreground">
                      Estimated total · {done.nights} night{done.nights > 1 ? "s" : ""} ×{" "}
                      {done.rooms} room{done.rooms > 1 ? "s" : ""}
                    </p>
                    <p className="font-serif text-3xl font-semibold">{formatKwacha(done.total)}</p>
                    <p className="text-xs text-muted-foreground">Pay at the lodge · breakfast included</p>
                  </div>
                  <p className="mt-6 text-sm text-muted-foreground">Want a faster reply?</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <Button asChild className="h-12 rounded-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90">
                      <a href={whatsappLink(waMessage)} target="_blank" rel="noreferrer">
                        <MessageCircle /> WhatsApp us
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="h-12 rounded-full">
                      <a href={TEL_LINK}>
                        <Phone /> Call us
                      </a>
                    </Button>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setDone(null);
                      setCheckIn(null);
                      setCheckOut(null);
                    }}
                    className="mt-6 text-sm font-semibold text-primary hover:underline"
                  >
                    Make another request
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-4">
                  <h3 className="text-2xl font-medium">Your details</h3>

                  <div className="space-y-1.5">
                    <Label htmlFor="fullName">Full name</Label>
                    <Input
                      id="fullName"
                      autoComplete="name"
                      className="h-11 rounded-xl bg-card"
                      value={form.fullName}
                      maxLength={100}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      aria-invalid={!!errors.fullName}
                    />
                    {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Phone / WhatsApp</Label>
                      <Input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        className="h-11 rounded-xl bg-card"
                        placeholder="0999 000 000"
                        value={form.phone}
                        maxLength={20}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        aria-invalid={!!errors.phone}
                      />
                      {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">
                        Email <span className="font-normal text-muted-foreground">(optional)</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        className="h-11 rounded-xl bg-card"
                        value={form.email}
                        maxLength={255}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="guests">Guests</Label>
                      <select
                        id="guests"
                        className={selectClass}
                        value={form.guests}
                        onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
                      >
                        {Array.from({ length: MAX_GUESTS }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "guest" : "guests"}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="rooms">Rooms</Label>
                      <select
                        id="rooms"
                        className={selectClass}
                        value={form.rooms}
                        onChange={(e) => setForm({ ...form, rooms: Number(e.target.value) })}
                      >
                        {Array.from({ length: MAX_ROOMS }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "room" : "rooms"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message">
                      Message <span className="font-normal text-muted-foreground">(optional)</span>
                    </Label>
                    <Textarea
                      id="message"
                      rows={3}
                      maxLength={1000}
                      className="rounded-xl bg-card"
                      placeholder="Arrival time, special requests, lunch or dinner…"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                    {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                  </div>

                  <div className="rounded-2xl bg-evening p-5 text-evening-foreground">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-sm text-evening-foreground/75">
                        {nights > 0
                          ? `${nights} night${nights > 1 ? "s" : ""} × ${form.rooms} room${form.rooms > 1 ? "s" : ""} × ${formatKwacha(PRICE_PER_ROOM_PER_NIGHT)}`
                          : `${formatKwacha(PRICE_PER_ROOM_PER_NIGHT)} per room, per night`}
                      </span>
                    </div>
                    <p className="mt-1 font-serif text-3xl font-semibold">
                      {nights > 0 ? formatKwacha(total) : "—"}
                    </p>
                    <p className="text-xs text-gold-soft">
                      Estimated total · breakfast included · pay at the lodge
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={sending}
                    className="h-13 w-full rounded-full text-base shadow-card"
                  >
                    {sending ? <Loader2 className="animate-spin" /> : null}
                    {sending ? "Sending…" : "Send booking request"}
                  </Button>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button
                      asChild
                      className="h-12 rounded-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
                    >
                      <a href={whatsappLink(waMessage)} target="_blank" rel="noreferrer">
                        <MessageCircle /> Book on WhatsApp
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="h-12 rounded-full">
                      <a href={TEL_LINK}>
                        <Phone /> Call {LODGE.phoneDisplay}
                      </a>
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
