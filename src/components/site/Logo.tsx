import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "bg-logo grid h-10 w-10 shrink-0 place-items-center rounded-md shadow-soft",
        className,
      )}
    >
      <svg viewBox="0 0 32 32" className="h-[62%] w-[62%] text-primary-foreground" fill="none">
        <path
          d="M16 6 L4 26 H28 Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M16 6 L16 26" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12.5 26 L16 18 L19.5 26" fill="currentColor" />
        <path d="M13 4 L16 6 L19 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex min-w-0 items-center gap-3">
      <LogoMark />
      <span className="min-w-0 leading-tight">
        <span
          className={cn(
            "block truncate font-serif text-lg font-semibold",
            light ? "text-evening-foreground" : "text-foreground",
          )}
        >
          Abel&apos;s Lodge
        </span>
        <span
          className={cn(
            "block truncate text-[0.65rem] uppercase tracking-[0.2em]",
            light ? "text-gold-soft" : "text-muted-foreground",
          )}
        >
          Bed &amp; Breakfast
        </span>
      </span>
    </span>
  );
}
