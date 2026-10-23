import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { GALLERY } from "@/lib/images";
import { cn } from "@/lib/utils";
import { Eyebrow, Reveal } from "./Reveal";

const SPANS = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "",
  "",
  "sm:row-span-2",
  "",
  "",
  "",
];

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;
  const count = GALLERY.length;

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + count) % count)),
    [count],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  const current = index !== null ? GALLERY[index] : null;

  return (
    <section id="gallery" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Gallery</Eyebrow>
            <h2 className="text-4xl font-medium sm:text-5xl">
              A look <em className="text-primary">inside the gate.</em>
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">Tap any photo to view it full screen.</p>
        </Reveal>

        <Reveal>
          <div className="grid grid-flow-dense auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:grid-cols-4 sm:gap-4">
            {GALLERY.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  "group relative overflow-hidden rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  SPANS[i],
                )}
                aria-label={`View photo: ${img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/85 text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  <Expand className="h-4 w-4" />
                </span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <Dialog open={open} onOpenChange={(o) => !o && setIndex(null)}>
        <DialogContent className="h-[100dvh] w-screen max-w-none border-none bg-evening p-0 text-evening-foreground sm:rounded-none [&>button]:hidden">
          <DialogTitle className="sr-only">Photo viewer</DialogTitle>
          {current && (
            <div className="relative flex h-full w-full flex-col">
              <div className="flex items-center justify-between px-4 py-3 sm:px-6">
                <span className="text-sm text-evening-foreground/70">
                  {(index ?? 0) + 1} / {count}
                </span>
                <button
                  type="button"
                  onClick={() => setIndex(null)}
                  className="grid h-11 w-11 place-items-center rounded-full bg-evening-soft hover:bg-evening-foreground/10"
                  aria-label="Close photo viewer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-20">
                <img
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  className="max-h-full max-w-full rounded-2xl object-contain animate-in fade-in duration-300"
                />
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-evening-soft/90 hover:bg-primary sm:left-6"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-evening-soft/90 hover:bg-primary sm:right-6"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
              <p className="px-6 pb-6 text-center text-sm text-evening-foreground/75">{current.alt}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
