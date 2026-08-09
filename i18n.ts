import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Loads the message bundle for a request.
 *
 * Because the site is a static export, every locale is resolved at BUILD time via
 * generateStaticParams in app/[locale]/layout.tsx. Nothing here runs per visitor.
 */
export default getRequestConfig(async ({ locale }) => {
  if (!isLocale(locale)) notFound();

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
