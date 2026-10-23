import { createFileRoute } from "@tanstack/react-router";

import { Booking } from "@/components/site/Booking";
import { Breakfast } from "@/components/site/Breakfast";
import { Faq } from "@/components/site/Faq";
import { Footer } from "@/components/site/Footer";
import { Gallery } from "@/components/site/Gallery";
import { Garden } from "@/components/site/Garden";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Location } from "@/components/site/Location";
import { Rooms } from "@/components/site/Rooms";
import { Welcome } from "@/components/site/Welcome";
import { bookedNightsQuery } from "@/lib/queries";

const TITLE = "Abel's Lodge — Quiet B&B in Area 25, Dzenza, Lilongwe";
const DESCRIPTION =
  "Private, gated bed & breakfast in Area 25, Dzenza, Lilongwe. Rooms K30,000 per night with breakfast included. Check availability and book online, on WhatsApp or by phone.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(bookedNightsQuery),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Welcome />
        <Rooms />
        <Breakfast />
        <Gallery />
        <Garden />
        <Booking />
        <Location />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
