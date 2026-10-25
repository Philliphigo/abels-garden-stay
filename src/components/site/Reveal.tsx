import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/utils";

// One shared observer for every Reveal on the page (cheaper than one per element).
let sharedObserver: IntersectionObserver | null = null;
function getObserver() {
  if (sharedObserver || typeof IntersectionObserver === "undefined") return sharedObserver;
  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          sharedObserver?.unobserve(e.target);
        }
      }
    },
    // Start just before the block scrolls onto the screen, so it is already settling as it appears.
    { threshold: 0, rootMargin: "0px 0px 12% 0px" },
  );
  return sharedObserver;
}

/**
 * Gently rises and fades its content in.
 * - default: when it scrolls into view
 * - `stagger`: direct children come in one after another
 * - `immediate`: plays on page load without waiting for scripts (use above the fold)
 */
export function Reveal({
  children,
  className,
  delay = 0,
  stagger = false,
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (immediate) return;
    const el = ref.current;
    if (!el) return;
    const io = getObserver();
    if (!io) {
      el.classList.add("is-visible");
      return;
    }
    io.observe(el);
    return () => io.unobserve(el);
  }, [immediate]);

  return (
    <div
      ref={ref}
      className={cn(immediate ? "reveal-now" : "reveal", stagger && "reveal-stagger", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary",
        className,
      )}
    >
      <span className="h-px w-8 bg-current opacity-60" />
      {children}
    </p>
  );
}
