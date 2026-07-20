# K-Beauty Radar

> What the world really thinks about K-Beauty.

A data-media MVP that tracks how Korean beauty brands and products are
reviewed, discussed and discovered across global markets — brand pages,
product pages, rankings, celebrity-impact tracking, country and ingredient
radars, editorial briefs, and an admin CRUD console.

**This build ships with local, clearly-labeled demo/sample data.** Every
number you see is illustrative, not a live measurement — see
[Data & scope notes](#data--scope-notes) below and the in-app
`/methodology` page.

---

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # ESLint
npm run test    # unit tests for the scoring utilities (node:test via tsx)
```

No environment variables are required to run locally — the app reads
seed data from `src/data/*.json` by default.

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in what you need:

| Variable | Required? | Purpose |
|---|---|---|
| `NEXT_PUBLIC_APP_NAME` | No | Overrides the app name shown in headers/titles. Defaults to "K-Beauty Radar". |
| `NEXT_PUBLIC_SITE_URL` | No | Used to build absolute URLs in `sitemap.xml` / `robots.txt`. |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Set both to switch the data layer from local JSON to Supabase (see below). Leave unset to stay in demo mode. |
| `SUPABASE_SERVICE_ROLE_KEY` | No | Only needed once `/admin` writes go to Supabase. Server-only — never expose with `NEXT_PUBLIC_`. |

---

## Connecting Supabase (optional)

The app runs fully standalone today. To connect a real backend:

1. Create a Supabase project.
2. Run `supabase/schema.sql` against it (`supabase db push` or paste into
   the SQL editor). It defines `brands`, `products`, `review_aggregates`,
   `celebrity_events`, `countries`, `ingredients`, `articles`, `follows`,
   `saved_products`, `newsletter_subscribers`, and more, with RLS enabled
   on user-owned tables (see the file for the full column list and policies).
3. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Swap the function bodies in `src/lib/data.ts` from reading
   `src/data/*.json` to querying Supabase — the function *signatures*
   already match the schema, so this is a mechanical change, not a
   redesign. `USE_SUPABASE` in `src/lib/config.ts` tells you whether the
   env vars are present if you want to branch behavior.
5. For `/admin` writes and `/saved`, `/profile`, `/compare` (currently
   `localStorage`-backed, see `src/lib/client-store.ts`), add Supabase
   Auth and point those hooks at the `profiles` / `follows` /
   `saved_products` / `saved_comparisons` tables instead.

---

## Project structure

```text
src/
  app/                  Routes (App Router). One folder per URL in the spec.
    admin/               Admin CRUD console (brands, products, sources,
                          review aggregates + CSV import, trend events +
                          CSV import, briefs)
    api/                 Two small route handlers that feed client
                          components (compare, admin tables) with data,
                          since the main data layer is server-only.
  components/            Shared UI: header/footer, cards, badges, charts,
                          filters, admin table/CSV-uploader.
  data/                  Seed/demo JSON — brands, products, reviews,
                          celebrity events, countries, ingredients,
                          sources, trend events, briefs.
  lib/
    config.ts             App name, nav links, USE_SUPABASE flag.
    types.ts               TypeScript models — also the shape Supabase
                          tables in supabase/schema.sql mirror.
    data.ts                 Data-access layer (local JSON today; swap to
                          Supabase per the section above).
    scores.ts             Scoring utilities (Market Gap Index, trend
                          direction, etc.) — unit tested.
    client-store.ts        localStorage-backed saved/follow/compare/
                          profile state for the logged-out MVP experience.
    csv.ts                  Minimal CSV parser for admin bulk import.
supabase/
  schema.sql              Full Supabase schema + RLS policies.
scripts/
  seed.py                 Regenerates src/data/*.json from scratch.
```

---

## Data & scope notes

Being direct about what this build is and isn't:

**What's real and working:**
- Every page in the original route list is implemented and renders real,
  internally-consistent data (validated cross-references — no dangling
  brand/product/country links).
- All scores (Global Attention, Review Sentiment, Growth Momentum, Market
  Gap Index, Data Confidence) are computed from documented formulas —
  see `/methodology` and `src/lib/scores.ts`.
- Search, filtering, sorting, compare (up to 4 products), save/follow,
  and CSV bulk-import with validation all function end-to-end.
- Responsive down to mobile; keyboard-focusable controls; loading and
  empty states throughout.

**What's demo data, not live data:**
- All brand/product/review/celebrity-event/trend numbers are hand-authored
  sample data, clearly labeled "Sample Data" in the UI. No scraping or
  third-party API integration is wired up.
- 15 brands, 16 products, 8 markets, 34 review-aggregate rows, 5 celebrity
  events, 8 ingredients, 4 editorial briefs.

**What's intentionally session-only / not persisted:**
- Admin CRUD (`/admin/*`) writes to in-memory React state — refreshing
  the page resets it. This is a deliberate MVP shortcut, not a bug;
  `supabase/schema.sql` plus the "Connecting Supabase" section above is
  the path to real persistence.
- `/saved`, `/profile`, `/compare` use `localStorage`, not accounts —
  there's no auth in this build.
- The newsletter signup on the homepage shows a local success state; it
  does not send email or write to a database.

**Not built in this pass:**
- Authentication (Supabase Auth is schema-ready but not wired to any UI).
- Real payment/checkout — retail links go to each retailer's own site.
- Live scraping/API ingestion from Hwahae, Glowpick, Amazon, etc.
- Moderation tooling for user-submitted content (not applicable yet,
  since there's no user-generated content in this build).

---

## Design notes

Palette, type and the "radar sweep" motif are documented inline in
`src/app/globals.css`. Typography falls back to a system stack + a
Pretendard CDN link (see `src/app/layout.tsx`) rather than
`next/font/google`, because the sandbox this was built in couldn't reach
`fonts.googleapis.com` at build time — if your deploy environment has open
network access, swapping back to self-hosted `next/font/google` Inter /
Space Grotesk is a small, isolated change (see the comments in
`layout.tsx` and `globals.css`).
