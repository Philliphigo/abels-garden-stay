import { CalendarDays, Phone, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IMAGES } from "@/lib/images";
import { LODGE, TEL_LINK } from "@/lib/lodge";
import { PRICE_PER_ROOM_PER_NIGHT, formatKwacha } from "@/lib/pricing";
import { Reveal } from "./Reveal";

export function GoogleRating({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={
        dark
          ? "inline-flex items-center gap-3 rounded-full border border-evening-foreground/15 bg-evening-soft px-4 py-2"
          : "inline-flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 shadow-soft"
      }
    >
      <span className="font-serif text-xl font-semibold">{LODGE.rating}</span>
      <span className="flex text-gold" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </span>
      <span className={dark ? "text-xs text-evening-foreground/70" : "text-xs text-muted-foreground"}>
        on Google · {LODGE.reviewCount} reviews
      </span>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-sand opacity-80 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-8 lg:grid-cols-[1.05fr_1fr] lg:px-8 lg:pb-28 lg:pt-14">
        <Reveal>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Area 25 · Dzenza · Lilongwe
          </p>
          <h1 className="text-5xl font-medium leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
            Quiet nights,
            <br />
            <em className="font-normal text-primary">warm mornings.</em>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            A calm, private bed &amp; breakfast behind a secure gate, with a leafy garden to
            unwind in and a hearty breakfast waiting every morning.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-13 rounded-full px-7 text-base shadow-card">
              <a href="#booking">
                <CalendarDays /> Check availability
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-13 rounded-full border-foreground/20 bg-transparent px-7 text-base"
            >
              <a href={TEL_LINK}>
                <Phone /> Call {LODGE.phoneDisplay}
              </a>
            </Button>
          </div>

          <div className="mt-8">
            <GoogleRating />
          </div>
        </Reveal>

        <Reveal delay={150} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative ml-auto w-[78%] sm:w-[72%]">
            <div className="arch overflow-hidden border-[6px] border-card shadow-card">
              <img
                src={IMAGES.gardenMain.src}
                alt={IMAGES.gardenMain.alt}
                className="aspect-[3/4] w-full object-cover"
                fetchPriority="high"
              />
            </div>
          </div>

          <div className="absolute bottom-10 left-0 w-[46%] overflow-hidden rounded-3xl border-[5px] border-card shadow-card">
            <img
              src={IMAGES.roomMain.src}
              alt={IMAGES.roomMain.alt}
              className="aspect-square w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-6 right-2 rounded-2xl bg-evening px-5 py-4 text-evening-foreground shadow-card sm:right-6">
            <p className="text-[0.65rem] uppercase tracking-[0.22em] text-gold-soft">From</p>
            <p className="font-serif text-3xl font-semibold">
              {formatKwacha(PRICE_PER_ROOM_PER_NIGHT)}
            </p>
            <p className="text-xs text-evening-foreground/75">per night · breakfast included</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
