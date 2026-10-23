import { Check, MessageCircle } from "lucide-react";

import { IMAGES } from "@/lib/images";
import { TEL_LINK, whatsappLink } from "@/lib/lodge";
import { Eyebrow, Reveal } from "./Reveal";

const PLATE = [
  "Fried eggs, cooked to order",
  "Golden chips",
  "Grilled sausage",
  "Toast or a fresh bun",
  "Crisp coleslaw and tomato",
  "Samosa on some mornings",
  "Hot tea or coffee",
];

export function Breakfast() {
  return (
    <section id="breakfast" className="bg-evening py-20 text-evening-foreground lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <Reveal>
            <Eyebrow className="text-gold">Breakfast included</Eyebrow>
            <h2 className="text-4xl font-medium sm:text-5xl">
              Wake up to a <em className="text-gold">proper breakfast.</em>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-evening-foreground/75">
              Every night&apos;s stay includes a warm, filling plate to set you up for the day.
            </p>

            <ul className="mt-8 space-y-3">
              {PLATE.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-gold/30 bg-evening-soft p-5">
              <p className="font-serif text-lg">Lunch or dinner?</p>
              <p className="mt-1 text-sm text-evening-foreground/75">
                Just ask us about lunch and dinner when you book or during your stay.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                <a
                  href={whatsappLink("Hello Abel's Lodge, I'd like to ask about lunch and dinner.")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-gold hover:underline"
                >
                  <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
                </a>
                <a href={TEL_LINK} className="text-evening-foreground/80 hover:underline">
                  or call us
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              <div className="row-span-2 overflow-hidden rounded-[2rem]">
                <img
                  src={IMAGES.breakfastToast.src}
                  alt={IMAGES.breakfastToast.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-[2rem]">
                <img
                  src={IMAGES.breakfastBun.src}
                  alt={IMAGES.breakfastBun.alt}
                  className="aspect-square w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-[2rem]">
                <img
                  src={IMAGES.breakfastSamosa.src}
                  alt={IMAGES.breakfastSamosa.alt}
                  className="aspect-square w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
