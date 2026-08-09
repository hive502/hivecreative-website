'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Globe } from 'lucide-react';
import { locales, type Locale } from '@/i18n';

/**
 * EN / ES switch.
 *
 * Renders real <Link> elements rather than a router.push, so each option is a genuine
 * URL: crawlable, right-clickable, and openable in a new tab. That matters because on a
 * static export /en and /es are two separately prerendered pages, not one page with a
 * state flag.
 *
 * The current path is preserved across the switch by swapping only the first segment,
 * so a visitor deep in the page stays where they were.
 */
export default function LanguageToggle({ className = '' }: { className?: string }) {
  const pathname = usePathname();
  const active = useLocale() as Locale;
  const t = useTranslations('language');

  /** /es/pricing -> /en/pricing. Falls back to the locale root. */
  const hrefFor = (locale: Locale) => {
    const segments = (pathname || '/').split('/').filter(Boolean);
    if (segments.length && locales.includes(segments[0] as Locale)) {
      segments[0] = locale;
    } else {
      segments.unshift(locale);
    }
    return `/${segments.join('/')}`;
  };

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-brand-navy/15 bg-white p-1 ${className}`}
      role="group"
      aria-label={t('label')}
    >
      <Globe className="ml-1.5 h-3.5 w-3.5 shrink-0 text-brand-navy/45" aria-hidden />
      {locales.map((locale) => {
        const isActive = locale === active;
        return (
          <Link
            key={locale}
            href={hrefFor(locale)}
            /* No hrefLang here: next/link passes it through verbatim, so it emits the
               camelCase attribute, which is invalid HTML. The proper hreflang signals
               are the <link rel="alternate"> tags generated from metadata.alternates
               in app/[locale]/layout.tsx, which is what crawlers read anyway. */
            aria-current={isActive ? 'true' : undefined}
            className={[
              'rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide transition-colors',
              isActive
                ? 'bg-brand-navy text-white'
                : 'text-brand-navy/60 hover:bg-brand-navy-tint hover:text-brand-navy',
            ].join(' ')}
          >
            {locale}
          </Link>
        );
      })}
    </div>
  );
}
