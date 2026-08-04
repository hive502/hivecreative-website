/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Static export — `next build` emits a fully static site to ./out with no Node
   * server required. This is what Cloudflare Pages serves.
   *
   * Constraints this puts on the codebase (all currently satisfied):
   *   - no API routes, route handlers, middleware, or server actions
   *   - no dynamic params without generateStaticParams
   *   - no ISR / revalidate, no cookies() or headers()
   */
  output: 'export',

  images: {
    /**
     * REQUIRED for output: 'export'. The default next/image loader optimises on
     * demand via a Node server, which a static host doesn't have — the build
     * fails without this. With it, next/image renders a plain <img> and serves
     * the source file as-is.
     *
     * Consequence: images are shipped at their authored size, so keep the files
     * in /public reasonably sized. The logo PNGs are already trimmed and
     * downscaled for this reason.
     */
    unoptimized: true,
  },

  /**
   * Emits /pricing/index.html rather than /pricing.html. Cloudflare Pages
   * resolves both, but this keeps directory-style URLs stable if the site is
   * ever moved to a plainer static host.
   */
  trailingSlash: true,

  // Fail the production build on type errors rather than shipping them.
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
