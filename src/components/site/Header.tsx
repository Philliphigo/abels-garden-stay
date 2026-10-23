import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LODGE, NAV_LINKS, TEL_LINK } from "@/lib/lodge";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/90 backdrop-blur-md"
          : "bg-background/0",
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 lg:flex lg:justify-between lg:px-8">
        <a href="#top" className="min-w-0" aria-label="Abel's Lodge home">
          <Logo />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground/75 transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={TEL_LINK}
            className="hidden items-center gap-2 text-sm font-semibold text-foreground hover:text-primary md:flex"
          >
            <Phone className="h-4 w-4 text-primary" />
            {LODGE.phoneDisplay}
          </a>
          <Button asChild className="hidden h-10 rounded-full px-5 sm:inline-flex">
            <a href="#booking">Book now</a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm border-l-border bg-background p-0 [&>button:last-child]:hidden">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <Logo />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col px-5 py-4" aria-label="Mobile">
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-border/60 py-4 font-serif text-xl text-foreground"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
              <div className="space-y-3 px-5 pb-8 pt-2">
                <Button asChild className="h-12 w-full rounded-full text-base">
                  <a href="#booking" onClick={() => setOpen(false)}>
                    Book now
                  </a>
                </Button>
                <Button asChild variant="outline" className="h-12 w-full rounded-full text-base">
                  <a href={TEL_LINK}>
                    <Phone /> Call {LODGE.phoneDisplay}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
