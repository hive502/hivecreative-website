# Hive Creative — hivecreative.site

Marketing site for a web design agency serving small businesses and sole traders.
Next.js 14 (App Router) · TypeScript · Tailwind CSS · lucide-react.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

## Architecture

```
hive-creative/
├── app/
│   ├── layout.tsx            # Nunito via next/font/google, metadata, Navbar + Footer shell
│   ├── globals.css           # Tailwind layers + .btn-primary / .btn-secondary / .eyebrow
│   └── page.tsx              # Homepage — all 7 content sections
├── components/
│   ├── Navbar.tsx            # 'use client' — sticky, scroll-aware, mobile drawer
│   ├── Footer.tsx            # Closing CTA + nav + contact + copyright
│   ├── SectionHeading.tsx    # Shared eyebrow / title / lede rhythm
│   ├── ProcessStep.tsx       # One card in the 3-step band
│   ├── PricingCard.tsx       # One-off website build packages
│   ├── CarePlanCard.tsx      # Recurring monthly care plans
│   └── FaqAccordion.tsx      # 'use client' — accessible accordion
├── lib/
│   ├── assets.ts             # Logo + image sources, site constants
│   └── content.ts            # All copy: pricing, care plans, FAQs, pain points
├── public/
│   ├── brand/                # logo-full.svg, logo-icon.svg
│   └── images/               # Higgsfield assets (after fetch-assets.sh)
├── scripts/fetch-assets.sh   # Pulls generated imagery into /public/images
└── tailwind.config.ts        # brand-orange / brand-navy palette, shadows, gradients
```

Only `Navbar` and `FaqAccordion` are client components. Everything else renders on
the server.

### Page anchors

The nav is anchor-driven on a single page: `#process`, `#work`, `#pricing`, `#care`,
`#faq`, `#contact` (the footer). To split these into real routes later, move each
`<section>` into its own `app/<route>/page.tsx` and update `navLinks` in `lib/content.ts`.

## Brand tokens

| Token | Hex | Use |
| --- | --- | --- |
| `brand-orange` | `#E88310` | Primary CTAs, accents, step numbers |
| `brand-orange-dark` | `#C96D06` | CTA hover, gradient end |
| `brand-orange-tint` | `#FEF4E8` | Icon chips, eyebrow pills |
| `brand-navy` | `#2B3C5A` | Headings, body text, footer background |
| `brand-navy-dark` | `#1E2B42` | Footer gradient end |
| `brand-navy-tint` | `#EEF1F6` | Quiet section fills |
| `brand-paper` | `#F9F9F9` | Off-white section backgrounds |

Font: **Nunito** (400/600/700/800) loaded through `next/font/google` and exposed as
`--font-nunito`, mapped onto Tailwind's `font-sans`. To switch to Quicksand, change the
import in `app/layout.tsx` — nothing else needs to move.

## Assets

**Brand marks.** The real artwork is committed to the repo:

- `public/brand/logo-full.png` — 826×256, icon + "hive creative" lockup
- `public/brand/logo-icon.png` — 512×515, circular honeycomb mark

Both were processed from the supplied originals: the paper/white backdrop was keyed out
to alpha while the white hexagons *inside* the circle were kept opaque, then trimmed and
downscaled. That transparency is what lets the icon sit on the navy footer without a
white box behind it. Don't replace these with raw exports — re-run the keying if the
source artwork changes.

> The two source files are named the wrong way round in Drive: the one called
> `…7i84…` is the icon, and `…iangl…` is the full lockup. `DRIVE_IDS` in
> `lib/assets.ts` corrects the mapping — don't "fix" it back to match the filenames.

`LOGO_SOURCE = 'drive'` in `lib/assets.ts` exists as an escape hatch only. It serves the
untrimmed artwork *with* its opaque background (so the footer icon gets a white box),
needs "Anyone with the link" sharing, and is rate-limited by Google. Prefer the local
files.

**Photography and texture.** Generated with Higgsfield (Recraft V4.1) and currently
served from the generation CDN so the site works out of the box:

- `hero-business-owner.png` — 16:9 lifestyle hero
- `case-study-mockup.png` — 4:3 laptop + phone mockup
- `honeycomb-texture.svg` — background texture for the process band

These are fetched by `scripts/fetch-assets.sh`, which runs automatically as the
`prebuild` npm script. It is idempotent — files already in `public/images` are left
alone — so the first CI build downloads them and bakes them into the export, and once
you commit `public/images` the script becomes a no-op and builds stop touching the
network. Either way the live site self-hosts them and never hotlinks the generation CDN.

Run it once locally and commit the results to drop the network dependency entirely:

```bash
bash scripts/fetch-assets.sh
git add public/images && git commit -m "Vendor generated imagery"
```

## Editing copy

All marketing copy lives in `lib/content.ts` — prices, features, FAQ answers, pain
points and nav links. Components read from it, so you can change pricing without
touching JSX.

## Conversion notes

- Exactly one loud button style (`.btn-primary`, orange). Everything else is a quiet
  navy outline, so the eye always knows where to go.
- The middle option is featured in both pricing grids (Standard, Full Care) — ring,
  badge and a slight vertical lift.
- The Agitator section names the reader's problem before the offer appears, and closes
  on a navy "it doesn't have to be this way" block that hands off to the process.
- Care plan cards lead with the monthly figure and treat the annual saving as a
  supporting chip, since monthly is the lower-friction entry point.

## Deploy — Cloudflare Pages

The site is a **static export**: `next build` writes a complete static site to `out/`
with no Node server required (`output: 'export'` in `next.config.mjs`).

| Cloudflare Pages field | Value |
| --- | --- |
| Framework preset | `Next.js (Static HTML Export)` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node version | `20` (pinned by `.node-version`) |

Constraints static export puts on this codebase — all currently satisfied, worth keeping
in mind before adding features: no API routes, route handlers, middleware or server
actions; no `cookies()` / `headers()`; no ISR or `revalidate`; any dynamic route needs
`generateStaticParams`. `images.unoptimized: true` is required — the default next/image
loader optimises on demand via a Node server, which a static host doesn't have.

Vercel or any Node host also works with `npm run build && npm start`.
