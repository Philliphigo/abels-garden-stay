import { Coffee, EyeOff, ShieldCheck, Trees } from "lucide-react";

import { Eyebrow, Reveal } from "./Reveal";

const HIGHLIGHTS = [
  {
    icon: EyeOff,
    title: "Private & discreet",
    text: "A quiet, respectful place to rest. Come and go in peace.",
  },
  {
    icon: Coffee,
    title: "Breakfast included",
    text: "Every stay comes with a freshly cooked breakfast.",
  },
  {
    icon: ShieldCheck,
    title: "Gated compound",
    text: "Secure walls, a locked gate and parking inside.",
  },
  {
    icon: Trees,
    title: "A garden to unwind",
    text: "Shady trees, flowers and a table outside to relax.",
  },
];

export function Welcome() {
  return (
    <section className="bg-sand/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">Welcome to Abel&apos;s Lodge</Eyebrow>
          <h2 className="text-4xl font-medium text-foreground sm:text-5xl">
            Your privacy is <em className="text-primary">our priority.</em>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Tucked away in Area 25, Dzenza, Abel&apos;s Lodge is a small, homely bed &amp;
            breakfast for travellers, couples and anyone who simply wants a peaceful night in
            Lilongwe.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((h, i) => (
            <Reveal key={h.title} delay={i * 90}>
              <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft">
                <span className="bg-warm grid h-12 w-12 place-items-center rounded-2xl text-primary-foreground">
                  <h.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-medium">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
