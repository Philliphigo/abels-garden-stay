import { Flower2, Lamp, Leaf, Lock, Sun, Umbrella } from "lucide-react";

import { IMAGES } from "@/lib/images";
import { Glow, TentPattern } from "./Backdrop";
import { Eyebrow, Reveal } from "./Reveal";

const FEATURES = [
  { icon: Leaf, label: "Lush lawn and shady trees" },
  { icon: Flower2, label: "Flowering plants and potted palms" },
  { icon: Umbrella, label: "Outdoor table under an umbrella" },
  { icon: Lamp, label: "Garden lamps for evening strolls" },
  { icon: Sun, label: "Quiet spots for morning tea" },
  { icon: Lock, label: "Fully walled and gated" },
];

const PHOTOS = [IMAGES.gardenMain, IMAGES.gardenPath, IMAGES.gate];

export function Garden() {
  return (
    <section
      id="garden"
      className="relative isolate overflow-hidden bg-forest py-20 text-forest-foreground lg:py-28"
    >
      <TentPattern fade="none" className="text-forest-deep/70" />
      <Glow className="-right-40 -top-32 h-[26rem] w-[26rem] bg-gold/15" />
      <Glow className="-bottom-40 -left-32 h-[26rem] w-[26rem] bg-forest-deep" />
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:items-center lg:px-8">
        <Reveal>
          <Eyebrow className="text-gold">The garden</Eyebrow>
          <h2 className="text-4xl font-medium sm:text-5xl">
            A green corner <em className="text-gold">to unwind.</em>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-forest-foreground/80">
            Step outside into a peaceful garden full of birdsong, shade and colour — the perfect
            place to read, talk or simply slow down.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <li
                key={f.label}
                className="flex items-center gap-3 rounded-2xl border border-forest-foreground/15 bg-forest-deep px-4 py-3"
              >
                <f.icon className="h-5 w-5 shrink-0 text-gold" />
                <span className="text-sm">{f.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="grid grid-cols-3 items-start gap-3 sm:gap-4">
            {PHOTOS.map((p, i) => (
              <div
                key={p.src}
                className={
                  i === 1
                    ? "mt-10 overflow-hidden rounded-full border-4 border-forest-deep"
                    : "overflow-hidden rounded-[1.75rem] border-4 border-forest-deep"
                }
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className={i === 1 ? "aspect-[1/2] w-full object-cover" : "aspect-[3/5] w-full object-cover"}
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
