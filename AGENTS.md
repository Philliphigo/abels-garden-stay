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
- Booking requests are written server-side only via `submitBookingRequest` → `saveBookingRequest` in `booking.server.ts` (service role, no anon policies on `booking_requests`); the owner marks fully booked nights by adding rows to `booked_nights` (public read-only).
- A missing or failing database (e.g. Vercel copy without env vars, or no server at all) must never block a booking: the server returns `ok: true, saved: false` and the form falls back to local pricing, so WhatsApp still opens. Only guest problems (past dates, fully booked nights, repeat requests) block.
- Photos are bundled files in `src/assets/photos/` imported through `src/lib/images.ts`, not Lovable CDN pointers: the site is also deployed on Vercel, where `/__l5e/` CDN URLs don't resolve.
- Decorative section backgrounds (tent pattern, colour glows) come from `src/components/site/Backdrop.tsx` inside `relative isolate overflow-hidden` sections: keeps the look consistent and token-based.
- Entrance animations go through `Reveal` (shared observer; `stagger`, `immediate` for above the fold) and animate only opacity/transform; glows use `glow-mask`, never large CSS blur filters: keeps scrolling smooth on phones.
- Never add a root `index.html`: the published build serves it instead of the app (it broke the live site once). The GitHub Pages redirect lives in `README.md` as raw HTML.
- Keep `vite.build.target` at `["es2020","safari14"]` in `vite.config.ts` (plus the polyfills in `__root.tsx`): the lodge owner uses an older iMac Safari that cannot parse ES2022 syntax like class static blocks.
