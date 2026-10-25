<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Single long scrolling page at `/` with in-page anchors (`#rooms`, `#booking`, …): the owner asked for one booking landing page; sections live in `src/components/site/`.
- Business facts (phone, address, links) live in `src/lib/lodge.ts` and price rules in `src/lib/pricing.ts` (covered by `pricing.test.ts`); never hardcode them in components.
- Booking requests are written server-side only via `submitBookingRequest` (service role, no anon policies on `booking_requests`); the owner marks fully booked nights by adding rows to `booked_nights` (public read-only).
- Photos are Lovable CDN assets referenced through `src/lib/images.ts`.
- Decorative section backgrounds (tent pattern, colour glows) come from `src/components/site/Backdrop.tsx` inside `relative isolate overflow-hidden` sections: keeps the look consistent and token-based.
- Entrance animations go through `Reveal` (shared observer; `stagger`, `immediate` for above the fold) and animate only opacity/transform; glows use `glow-mask`, never large CSS blur filters: keeps scrolling smooth on phones.
