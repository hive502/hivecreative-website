/**
 * Central asset registry.
 *
 * BRAND MARKS
 * -----------
 * The real artwork now ships with the repo at /public/brand:
 *   - logo-full.png  826×256  — icon + "hive creative" lockup, transparent background
 *   - logo-icon.png  512×515  — circular honeycomb mark, transparent background
 *
 * Both were processed from the originals: the paper/white backdrop was keyed out to
 * alpha while the white hexagons inside the circle were kept opaque, then trimmed and
 * downscaled. That transparency is what lets the icon sit on the navy footer.
 *
 * The `drive` source below is kept as an escape hatch only. Note that Drive's
 * /file/d/<id>/view URL is a *viewer page*, not an image — it cannot be used as an
 * <img> or next/image `src`. The /thumbnail?id=<id>&sz=w<width> endpoint returns the
 * raw bitmap. Using it requires "Anyone with the link" sharing, serves the untrimmed
 * artwork *with* its opaque background (so it will show a white box on the navy
 * footer), and is rate-limited by Google. Prefer the local files.
 *
 * PHOTOGRAPHY / TEXTURE
 * ---------------------
 * Generated via Higgsfield (Recraft V4.1). They currently point at the generation CDN
 * so the site renders immediately. Run `bash scripts/fetch-assets.sh` to pull them into
 * /public/images, then flip IMAGE_SOURCE to 'local' before going live.
 */

const driveDirect = (id: string, width = 1200) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`;

/**
 * NOTE: the two Drive files are named the wrong way round at the source —
 * "Gemini_Generated_Image_7i84…" (id 1q0ds…) is the ICON, and
 * "Gemini_Generated_Image_iangl…" (id 1HqXz…) is the FULL lockup.
 * The mapping below is corrected; don't "fix" it back to match the filenames.
 */
export const DRIVE_IDS = {
  logoFull: '1HqXzwYpgZ_3reQoS_jYZGBXUsfqH0RMM',
  logoIcon: '1q0dsN9QZeKqG4VeKAOTao-UkodPxfoje',
} as const;

type LogoSource = 'local' | 'drive';

/** 'local' serves the trimmed, transparent PNGs. Only use 'drive' as a fallback. */
const LOGO_SOURCE = 'local' as LogoSource;

export const logo = {
  full: {
    src: LOGO_SOURCE === 'drive' ? driveDirect(DRIVE_IDS.logoFull, 1200) : '/brand/logo-full.png',
    width: 826,
    height: 256,
  },
  icon: {
    src: LOGO_SOURCE === 'drive' ? driveDirect(DRIVE_IDS.logoIcon, 512) : '/brand/logo-icon.png',
    width: 512,
    height: 515,
  },
  /** Drive can't be run through the Next image optimizer reliably. */
  unoptimized: LOGO_SOURCE === 'drive',
} as const;

export const images = {
  hero: {
    remote:
      'https://d8j0ntlcm91z4.cloudfront.net/user_3HEB9Aj6pYwybMvL0c7StZffjFh/hf_20260804_215550_b1a59439-efc7-48b8-8e41-39bbeb160aec.png',
    local: '/images/hero-business-owner.png',
    alt: 'A relaxed small business owner smiling at his laptop in a sunlit workshop office',
  },
  caseStudy: {
    remote:
      'https://d8j0ntlcm91z4.cloudfront.net/user_3HEB9Aj6pYwybMvL0c7StZffjFh/hf_20260804_215549_d5160b7d-744d-4dea-9c19-a4aad3a2fc86.png',
    local: '/images/case-study-mockup.png',
    alt: 'A modern small business website shown on a laptop and a smartphone',
  },
  honeycomb: {
    remote:
      'https://d8j0ntlcm91z4.cloudfront.net/user_3HEB9Aj6pYwybMvL0c7StZffjFh/hf_20260804_215549_c4e2149d-6cb9-4e2b-ac25-fde8be448d72.svg',
    local: '/images/honeycomb-texture.svg',
    alt: '',
  },
} as const;

type ImageSource = 'local' | 'remote';

/**
 * 'local' is correct for every build: the `prebuild` npm script runs
 * scripts/fetch-assets.sh, which guarantees these files exist in public/images
 * before next build runs. The static export therefore self-hosts them and the
 * live site never hotlinks the generation CDN.
 */
const IMAGE_SOURCE = 'local' as ImageSource;

export const src = (key: keyof typeof images) => images[key][IMAGE_SOURCE];

export const site = {
  name: 'Hive Creative',
  domain: 'hivecreative.site',
  url: 'https://hivecreative.site',
  email: 'info@hivecreative.site',
} as const;
