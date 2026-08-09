/**
 * Live Stripe Payment Links.
 *
 * Kept in one file so a link can be rotated without touching any component. They are
 * ordered to match the plan arrays in messages/*.json, and the page maps them by index.
 *
 * These are Payment Links, not secret keys. They are safe in client-side code and safe
 * in a public repo. Never put a Stripe SECRET key (sk_live_...) in this project: it is a
 * static site, so anything here ships to the browser.
 *
 * If you regenerate a link in the Stripe dashboard, replace it here and redeploy.
 */

/** One-off website builds, in the order Starter, Standard, Growth. */
export const BUILD_CHECKOUT_URLS = [
  'https://buy.stripe.com/6oUbJ2egvaQrdVF20j1kA00', // Starter  $499
  'https://buy.stripe.com/28E5kE6O32jV18T34n1kA01', // Standard $899
  'https://buy.stripe.com/fZu14o4FV2jV3h1cEX1kA02', // Growth   $1399
] as const;

/** Recurring care plans, in the order Essential, Full, Premium. */
export const CARE_CHECKOUT_URLS = [
  'https://buy.stripe.com/5kQeVefkz2jV6tdeN51kA03', // Essential $69/mo
  'https://buy.stripe.com/9B63cwa0fe2D04P8oH1kA04', // Full      $129/mo
  'https://buy.stripe.com/28E3cw7S77EfbNxawP1kA05', // Premium   $179/mo
] as const;
