import { MapPin, MessageCircle, Navigation, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DIRECTIONS_URL, LODGE, MAP_EMBED_URL, TEL_LINK, whatsappLink } from "@/lib/lodge";
import { GoogleRating } from "./Hero";
import { Eyebrow, Reveal } from "./Reveal";

export function Location() {
  return (
    <section id="location" className="py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1fr_1.3fr] lg:items-center lg:px-8">
        <Reveal>
          <Eyebrow>Find us</Eyebrow>
          <h2 className="text-4xl font-medium sm:text-5xl">
            Easy to reach, <em className="text-primary">quiet to stay.</em>
          </h2>
          <div className="mt-6 flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <p className="text-lg">
              Abel&apos;s Lodge
              <br />
              <span className="text-muted-foreground">{LODGE.address}</span>
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Button asChild className="h-12 rounded-full sm:col-span-2">
              <a href={DIRECTIONS_URL} target="_blank" rel="noreferrer">
                <Navigation /> Get directions
              </a>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-full">
              <a href={TEL_LINK}>
                <Phone /> Call
              </a>
            </Button>
            <Button
              asChild
              className="h-12 rounded-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
            >
              <a href={whatsappLink()} target="_blank" rel="noreferrer">
                <MessageCircle /> WhatsApp
              </a>
            </Button>
          </div>

          <div className="mt-8">
            <GoogleRating />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="overflow-hidden rounded-[2rem] border-[6px] border-card shadow-card">
            <iframe
              title="Map showing Abel's Lodge in Area 25, Dzenza, Lilongwe"
              src={MAP_EMBED_URL}
              className="block h-[380px] w-full sm:h-[460px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
