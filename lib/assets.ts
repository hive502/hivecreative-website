/**
 * Central asset registry.
 *
 * BRAND MARKS
 * -----------
 * The logo is drawn as inline SVG by components/Logo.tsx, so no image request is made
 * for it anywhere on the page. The PNGs below survive only as the favicon and
 * apple-touch icon, which have to be real files.
 *
 * PHOTOGRAPHY AND ARTWORK
 * -----------------------
 * Generated via Higgsfield (Recraft V4.1). The abstract pieces share one prompt suffix,
 * "Modern Geometric Precision", so they read as a set rather than four unrelated
 * pictures: matte 3D geometry, studio lighting, and nothing outside navy, tangerine and
 * off-white.
 *
 * The hero deliberately stays a PHOTOGRAPH of a real person. It is the only human
 * moment on the page, and a small business owner needs to picture themselves in it.
 *
 * scripts/fetch-assets.sh runs as `prebuild` and guarantees every file below exists in
 * public/images before next build, so the static export always self-hosts them.
 */

export const logo = {
  /** Favicon and apple-touch icon only. The on-page mark is components/Logo.tsx. */
  icon: '/brand/logo-icon.png',
} as const;

export const images = {
  hero: {
    remote:
      'https://d8j0ntlcm91z4.cloudfront.net/user_3HEB9Aj6pYwybMvL0c7StZffjFh/hf_20260804_215550_b1a59439-efc7-48b8-8e41-39bbeb160aec.png',
    local: '/images/hero-business-owner.png',
  },
  /** Three ascending hexagonal tiles. Sits beside the 3-step process. */
  process: {
    remote:
      'https://d8j0ntlcm91z4.cloudfront.net/user_3HEB9Aj6pYwybMvL0c7StZffjFh/hf_20260809_004022_906828b1-e25b-489a-b6ce-3652358263c3.png',
    local: '/images/geo-process.png',
  },
  /** A navy prism sheltered inside a honeycomb frame. Sits beside the care plans. */
  care: {
    remote:
      'https://d8j0ntlcm91z4.cloudfront.net/user_3HEB9Aj6pYwybMvL0c7StZffjFh/hf_20260809_004022_af93a9c0-2ee0-445a-9fd4-5eb04d881d20.png',
    local: '/images/geo-care.png',
  },
  /** Near-invisible embossed honeycomb, used at low opacity behind sections. */
  texture: {
    remote:
      'https://d8j0ntlcm91z4.cloudfront.net/user_3HEB9Aj6pYwybMvL0c7StZffjFh/hf_20260809_004022_811ba3d7-4291-4e91-ab32-df6979e05ee9.png',
    local: '/images/geo-texture.png',
  },
  /** Social share card. Never rendered on the page itself. */
  social: {
    remote:
      'https://d8j0ntlcm91z4.cloudfront.net/user_3HEB9Aj6pYwybMvL0c7StZffjFh/hf_20260809_004022_3527910b-1c76-4df9-9f86-7de47666b05d.png',
    local: '/images/geo-social.png',
  },
} as const;

type ImageSource = 'local' | 'remote';

/**
 * 'local' is correct for every build: the `prebuild` script guarantees these files
 * exist before next build runs, so the export self-hosts them and the live site never
 * hotlinks the generation CDN.
 */
const IMAGE_SOURCE = 'local' as ImageSource;

export const src = (key: keyof typeof images) => images[key][IMAGE_SOURCE];

/**
 * Featured case study visual: a composite of the real Osorio desktop and mobile
 * screenshots in device frames, with its own shadows baked in and a transparent
 * background. Rebuild it from the source screenshots rather than editing the composite.
 */
export const caseStudyImage = {
  src: '/images/portfolio/osorio-case-study.webp',
} as const;

export type PortfolioShot = {
  /** Path under /public/images/portfolio/ */
  src: string;
  /** Controls the device frame and card width. */
  device: 'desktop' | 'mobile';
};

/**
 * Real client screenshots for the marquee. Captions and alt text are localised, so they
 * live in messages/*.json and are matched to this array BY INDEX. Reorder one and you
 * must reorder the other.
 *
 * These are genuine client work, not decoration. Do not swap them for generated art.
 */
export const portfolioShots: PortfolioShot[] = [
  { src: '/images/portfolio/osorio-desktop-hero.webp', device: 'desktop' },
  { src: '/images/portfolio/osorio-mobile-hero.webp', device: 'mobile' },
  { src: '/images/portfolio/osorio-desktop-services.webp', device: 'desktop' },
  { src: '/images/portfolio/osorio-mobile-services.webp', device: 'mobile' },
  { src: '/images/portfolio/osorio-mobile-advisor.webp', device: 'mobile' },
];

export const site = {
  name: 'Hive Creative',
  domain: 'hivecreative.site',
  url: 'https://hivecreative.site',
  email: 'info@hivecreative.site',
} as const;
