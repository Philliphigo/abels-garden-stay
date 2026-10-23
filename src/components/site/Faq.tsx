import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LODGE } from "@/lib/lodge";
import { PRICE_PER_ROOM_PER_NIGHT, formatKwacha } from "@/lib/pricing";
import { Eyebrow, Reveal } from "./Reveal";

const QUESTIONS = [
  {
    q: "How much does a room cost?",
    a: `Rooms are ${formatKwacha(PRICE_PER_ROOM_PER_NIGHT)} per night, and breakfast is included.`,
  },
  {
    q: "How do I book?",
    a: `Pick your dates in the calendar above and send a booking request — we'll call or message you to confirm. You can also book directly on WhatsApp or call us on ${LODGE.phoneDisplay}.`,
  },
  {
    q: "How do I pay?",
    a: "There is no online payment. Once we confirm your booking, you pay at the lodge. Ask us when you book if you'd like to know the payment options.",
  },
  {
    q: "Is there parking?",
    a: "Yes. There is parking inside our gated compound, so your car stays safe behind the gate.",
  },
  {
    q: "Where are you located?",
    a: `We're in ${LODGE.address}. Use the Get directions button above to open the route in Google Maps, or call us and we'll guide you in.`,
  },
];

export function Faq() {
  return (
    <section id="faq" className="bg-sand/60 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <Reveal className="mb-10 text-center">
          <Eyebrow className="justify-center">Questions</Eyebrow>
          <h2 className="text-4xl font-medium sm:text-5xl">
            Good to <em className="text-primary">know.</em>
          </h2>
        </Reveal>
        <Reveal>
          <Accordion type="single" collapsible className="space-y-3">
            {QUESTIONS.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={`q${i}`}
                className="rounded-2xl border border-border bg-card px-5 shadow-soft"
              >
                <AccordionTrigger className="py-5 text-left font-serif text-lg font-medium hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
