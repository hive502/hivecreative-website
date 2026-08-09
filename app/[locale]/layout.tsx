import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import '../globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { site } from '@/lib/assets';
import { locales, isLocale, type Locale } from '@/i18n';

/**
 * Nunito, a rounded geometric sans that reads friendly without losing authority.
 *
 * Only three weights are loaded, which is deliberate: every extra weight is another
 * font file on the critical path.
 *   400 body copy
 *   500 supporting labels and captions
 *   700 headings and buttons
 * Nothing in the codebase uses 600 or 800. If you add `font-semibold` or
 * `font-extrabold` the browser will synthesise it and the result looks smeared, so
 * add the weight here first.
 */
const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
  variable: '--font-nunito',
});

/** Prerender both locales at build time. Required by output: 'export'. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL(site.url),
    title: { default: t('title'), template: `%s | ${site.name}` },
    description: t('description'),
    alternates: {
      canonical: `/${locale}/`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/`])),
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: `${site.url}/${locale}/`,
      siteName: site.name,
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },
    icons: { icon: '/brand/logo-icon.png', apple: '/brand/logo-icon.png' },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{ children: React.ReactNode; params: { locale: string } }>) {
  if (!isLocale(locale)) notFound();

  // Opts this route into static rendering. Without it, next-intl treats the tree as
  // dynamic and the export step fails.
  unstable_setRequestLocale(locale as Locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={nunito.variable}>
      <body className="font-sans">
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]
                       focus:rounded-lg focus:bg-brand-navy focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
