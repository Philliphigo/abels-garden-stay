import { cn } from "@/lib/utils";

/**
 * Decorative section backgrounds. Place inside a `relative isolate overflow-hidden`
 * section — they sit behind the content (-z-10) and ignore clicks.
 * On larger screens (md+) they are toned down so they never compete with text.
 */

/** Repeating tent motif (from the logo), tinted with the current text colour. */
export function TentPattern({
  className,
  fade = "bottom",
}: {
  className?: string;
  fade?: "bottom" | "top" | "edges" | "none";
}) {
  const fadeClass =
    fade === "bottom"
      ? "mask-fade-b"
      : fade === "top"
        ? "mask-fade-t"
        : fade === "edges"
          ? "mask-fade-x"
          : "";
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 md:opacity-40 lg:opacity-30",
        fadeClass,
      )}
    >
      <div className={cn("pattern-tents h-full w-full", className)} />
    </div>
  );
}

/** Soft colour glow. Position and colour it with classes. */
export function Glow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute -z-10 glow-mask rounded-full md:opacity-50 lg:opacity-40",
        className,
      )}
    />
  );
}
