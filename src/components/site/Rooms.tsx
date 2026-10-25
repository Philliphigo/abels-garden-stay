import { BedDouble, Car, Coffee, Fan, Grid2x2, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IMAGES } from "@/lib/images";
import { PRICE_PER_ROOM_PER_NIGHT, formatKwacha } from "@/lib/pricing";
import { Glow, TentPattern } from "./Backdrop";
import { Eyebrow, Reveal } from "./Reveal";

const FEATURES = [
  { icon: BedDouble, label: "Comfortable double bed" },
  { icon: Shield, label: "Mosquito net" },
  { icon: Fan, label: "Standing fan" },
  { icon: Grid2x2, label: "Clean tiled floors" },
  { icon: Coffee, label: "Breakfast included" },
  { icon: Car, label: "Parking inside the gate" },
];

export function Rooms() {
  return (
    <section id="rooms" className="relative isolate overflow-hidden py-20 lg:py-28">
      <TentPattern fade="edges" className="text-primary/10" />
      <Glow className="-right-40 top-1/3 h-[28rem] w-[28rem] bg-gold/25" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <Reveal className="relative">
          <div className="overflow-hidden rounded-[2rem] shadow-card">
            <img
              src={IMAGES.roomMain.src}
              alt={IMAGES.roomMain.alt}
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-8 -right-2 w-[38%] overflow-hidden rounded-3xl border-[5px] border-background shadow-card sm:-right-6">
            <img
              src={IMAGES.roomSide.src}
              alt={IMAGES.roomSide.alt}
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
            />
          </div>
        </Reveal>

        <Reveal stagger delay={120}>
          <Eyebrow>Our rooms</Eyebrow>
          <h2 className="text-4xl font-medium sm:text-5xl">
            Simple, spotless and <em className="text-primary">restful.</em>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Each room is kept fresh and tidy, with everything you need for a good night&apos;s
            sleep and a calm start to the day.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <li
                key={f.label}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3"
              >
                <f.icon className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm font-medium">{f.label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-5 rounded-3xl bg-evening p-6 text-evening-foreground sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-gold-soft">Per room, per night</p>
              <p className="mt-1 font-serif text-4xl font-semibold">
                {formatKwacha(PRICE_PER_ROOM_PER_NIGHT)}
              </p>
              <p className="mt-1 text-sm text-evening-foreground/75">Breakfast included</p>
            </div>
            <Button asChild className="h-12 rounded-full px-7 text-base">
              <a href="#booking">Check availability</a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
