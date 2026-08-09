import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

/**
 * ⚠️  THIS FILE DOES NOT RUN ON THE CURRENT DEPLOYMENT.
 *
 * next.config.mjs sets `output: 'export'`, which produces a pure static site with no
 * server in front of it. Next.js middleware needs a running request pipeline, so on a
 * static export it is never invoked. Cloudflare serves the prerendered HTML directly.
 *
 * It is committed deliberately, for two reasons:
 *   1. It documents the intended locale routing in one place.
 *   2. If the site ever moves to a server runtime (@opennextjs/cloudflare, Vercel, or
 *      `next start`), locale detection starts working with no other changes.
 *
 * What you lose while static: automatic redirection based on the visitor's
 * Accept-Language header. A Spanish speaker landing on "/" is sent to /en by the root
 * redirect in app/page.tsx and has to use the language toggle. Everything else,
 * including both fully prerendered locales at /en and /es, works exactly the same.
 */
export default createMiddleware({
  locales,
  defaultLocale,
  // Always prefix, so the URL is unambiguous: /en/... and /es/...
  localePrefix: 'always',
  localeDetection: true,
});

export const config = {
  // Skip API routes, Next internals, and anything with a file extension.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
