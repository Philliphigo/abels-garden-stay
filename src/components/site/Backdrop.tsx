import { cn } from "@/lib/utils";

/**
 * Decorative section backgrounds. Place inside a `relative isolate overflow-hidden`
 * section — they sit behind the content (-z-10) and ignore clicks.
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
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10", fadeClass)}>
      <div className={cn("pattern-tents h-full w-full", className)} />
    </div>
  );
}

/** Soft blurred colour glow. Position and colour it with classes. */
export function Glow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute -z-10 rounded-full blur-[110px]", className)}
    />
  );
}
