import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Static export: `next build` emits a complete static site to ./out with no Node
   * server required. This is what Cloudflare serves.
   *
   * Constraints this puts on the codebase (all currently satisfied):
   *   - no API routes, route handlers, or server actions
   *   - middleware.ts is inert (see the note at the top of that file)
   *   - every dynamic segment needs generateStaticParams, which app/[locale] provides
   *   - no ISR / revalidate, no cookies() or headers()
   */
  output: 'export',

  images: {
    /**
     * REQUIRED for output: 'export'. The default next/image loader optimises on demand
     * via a Node server, which a static host doesn't have. With this, next/image
     * renders a plain <img> and serves the source file as-is, so keep files in /public
     * reasonably sized.
     */
    unoptimized: true,
  },

  /** Emits /en/index.html rather than /en.html, keeping directory-style URLs stable. */
  trailingSlash: true,

  typescript: { ignoreBuildErrors: false },
};

export default withNextIntl(nextConfig);
