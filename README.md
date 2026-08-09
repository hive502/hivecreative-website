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
│   ├── [locale]/
│   │   ├── layout.tsx        # Root layout: Nunito, metadata, i18n provider, Navbar + Footer
│   │   └── page.tsx          # Homepage, all content pulled from messages/
│   └── globals.css           # Tailwind layers + .btn-primary / .btn-secondary / .eyebrow
├── messages/
│   ├── en.json               # Every English string on the site
│   └── es.json               # Full Spanish translation
├── i18n.ts                   # Locale list + message loader
├── middleware.ts             # Documented, INERT on a static export (see file header)
├── components/
│   ├── Logo.tsx              # Inline SVG mark + wordmark, no image request
│   ├── LanguageToggle.tsx    # 'use client' — EN/ES switch, preserves the current path
│   ├── Navbar.tsx            # 'use client' — sticky, scroll-aware, mobile drawer
│   ├── Footer.tsx            # Closing CTA + nav + contact + copyright
│   ├── SectionHeading.tsx    # Shared eyebrow / title / lede rhythm
│   ├── ProcessStep.tsx       # One card in the 3-step band
│   ├── PricingCard.tsx       # One-off website build packages
│   ├── CarePlanCard.tsx      # Recurring monthly care plans
│   └── FaqAccordion.tsx      # 'use client' — accessible accordion
├── lib/
│   ├── assets.ts             # Image sources and site constants
│   └── stripe.ts             # Live Stripe Payment Links
├── public/
│   ├── brand/                # logo-full.png, logo-icon.png (favicon)
│   ├── images/               # Hero, texture, portfolio screenshots
│   └── index.html            # Root redirect: language detect, then /en/ or /es/
├── scripts/
│   ├── fetch-assets.sh       # Pulls generated imagery into /public/images
│   └── find-emdashes.sh      # Flags em-dashes in visitor-facing copy
└── tailwind.config.ts        # brand-tangerine / brand-navy palette, shadows, gradients
```

Only `Navbar`, `LanguageToggle` and `FaqAccordion` are client components. Everything
else renders on the server, including the logo and the portfolio marquee.

### Page anchors

The nav is anchor-driven on a single page: `#process`, `#work`, `#pricing`, `#care`,
`#faq`, `#contact` (the footer). To split these into real routes later, move each
`<section>` into its own `app/[locale]/<route>/page.tsx` and update the `links` array
in `components/Navbar.tsx`.

## Brand tokens

| Token | Hex | Use |
| --- | --- | --- |
| `brand-tangerine` | `#FF8F00` | Primary CTAs, accents, step numbers |
| `brand-tangerine-dark` | `#D97A00` | CTA hover, gradient end |
| `brand-tangerine-light` | `#FFB454` | Accents on dark backgrounds |
| `brand-tangerine-tint` | `#FFF3E0` | Icon chips, eyebrow pills |
| `brand-navy` | `#0F4993` | Headings, body text, footer background |
| `brand-navy-dark` | `#0A3369` | Footer gradient end |
| `brand-navy-tint` | `#E9EFF8` | Quiet section fills |
| `brand-bg` | `#F9F9F9` | Off-white section backgrounds |

`brand-navy` is sampled from the logo artwork. The original brief specified `#2B3C5A`,
a softer slate; the supplied files use a vivid royal blue, and the site follows the
artwork so the mark never clashes with the headings beside it.

Font: **Nunito** at 400 / 500 / 700 only, loaded through `next/font/google` and exposed
as `--font-nunito`, mapped onto Tailwind's `font-sans`. 400 is body copy, 500 supporting
labels, 700 headings and buttons. Nothing uses 600 or 800; if you add `font-semibold` or
`font-extrabold` the browser synthesises the weight and it looks smeared, so add the
weight in `app/[locale]/layout.tsx` first.

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

**Photography and texture.** Generated with Higgsfield (Recraft V4.1):

- `hero-business-owner.png` — 16:9 lifestyle hero
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

Every visitor-facing string lives in `messages/en.json` and `messages/es.json`.
Components read from them, so you can change prices, features or FAQ answers without
touching JSX. **Edit both files together**, or one locale silently falls behind.

Run `bash scripts/find-emdashes.sh` before committing copy changes. House style avoids
em-dashes: use a colon for an explanation, commas for an aside, or split the sentence.

## Languages

Two locales, both fully prerendered: `/en/` and `/es/`. `public/index.html` handles the
bare `/` by reading `navigator.language` and sending Spanish speakers to `/es/`,
falling back to `/en/` via meta refresh when JavaScript is off.

`middleware.ts` is committed but **does not run**: `output: 'export'` means there is no
server for it to run on. It documents the intended routing and starts working
automatically if the site ever moves to a server runtime. The only thing lost meanwhile
is Accept-Language detection, which the root redirect approximates client-side.

To add a locale: add it to `locales` in `i18n.ts`, add `messages/<code>.json`, done.
`generateStaticParams` picks it up.

## Payments

`lib/stripe.ts` holds the six live Payment Links, index-matched to the plan arrays in
the message files. `PricingCard` and `CarePlanCard` take a `checkoutUrl` prop and render
`target="_blank" rel="noopener noreferrer"`; without it they fall back to the contact
anchor, so a card still works while a link is being rotated.

These are Payment Links, not secret keys, and are safe in a public repo. Never put a
Stripe secret key in this project: it is a static site, so everything ships to the
browser.

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
