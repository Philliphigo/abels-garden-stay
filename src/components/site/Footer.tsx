import { CalendarDays, MapPin, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LODGE, NAV_LINKS, TEL_LINK, whatsappLink } from "@/lib/lodge";
import { Logo } from "./Logo";
import { Glow, TentPattern } from "./Backdrop";
import { Reveal } from "./Reveal";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.59-2.59 2.59 2.59 0 0 1 3.4-2.47V9.68a5.68 5.68 0 0 0-.81-.06A5.69 5.69 0 0 0 4.17 15.3 5.69 5.69 0 0 0 9.86 21a5.69 5.69 0 0 0 5.69-5.69V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.3 4.3 0 0 1-3.25-1.48Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-evening text-evening-foreground">
      <Glow className="left-1/2 top-0 h-[34rem] w-[min(60rem,140vw)] -translate-x-1/2 bg-primary/55" />
      <Glow className="right-0 top-10 h-[20rem] w-[20rem] bg-gold/35" />
      <div className="mx-auto max-w-7xl px-5 pt-16 lg:px-8 lg:pt-20">
        <Reveal>
          <div className="bg-warm relative isolate overflow-hidden rounded-[2rem] px-6 py-12 text-center text-primary-foreground shadow-card sm:px-12 sm:py-16">
            <TentPattern fade="edges" className="text-primary-foreground/10" />
            <Glow className="-right-20 -top-20 h-64 w-64 bg-gold/50 blur-[80px]" />
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-soft">
              {LODGE.tagline}
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-medium sm:text-5xl">
              Ready for a quiet night and a warm morning?
            </h2>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                asChild
                className="h-13 rounded-full bg-ivory px-7 text-base text-terracotta-deep hover:bg-ivory/90"
              >
                <a href="#booking">
                  <CalendarDays /> Book your stay
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-13 rounded-full border-primary-foreground/50 bg-transparent px-7 text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <a href={TEL_LINK}>
                  <Phone /> {LODGE.phoneDisplay}
                </a>
              </Button>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo light />
            <p className="mt-4 max-w-sm font-serif text-xl italic text-gold-soft">
              &ldquo;{LODGE.tagline}.&rdquo;
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Contact</p>
            <ul className="mt-4 space-y-3 text-sm text-evening-foreground/80">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {LODGE.address}
              </li>
              <li>
                <a href={TEL_LINK} className="flex items-center gap-3 hover:text-evening-foreground">
                  <Phone className="h-4 w-4 shrink-0 text-gold" /> {LODGE.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 hover:text-evening-foreground"
                >
                  <MessageCircle className="h-4 w-4 shrink-0 text-gold" /> WhatsApp{" "}
                  {LODGE.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={LODGE.tiktokUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 hover:text-evening-foreground"
                >
                  <TikTokIcon className="h-4 w-4 shrink-0 text-gold" /> {LODGE.tiktokHandle}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Explore</p>
            <ul className="mt-4 grid grid-cols-2 gap-3 text-sm text-evening-foreground/80 sm:grid-cols-1">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-evening-foreground">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-evening-foreground/10 py-6 text-xs text-evening-foreground/60 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Abel&apos;s Lodge · Area 25, Dzenza, Lilongwe</p>
          <p>{LODGE.tagline}.</p>
        </div>
      </div>
    </footer>
  );
}
