'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Menu, X, ArrowRight } from 'lucide-react';
import Logo from '@/components/Logo';
import LanguageToggle from '@/components/LanguageToggle';

/**
 * Site header.
 *
 * Sizing follows the Knapsack pattern: a deliberately tall, generous bar on load so the
 * branding is the first thing you see, which then compacts once the user starts
 * scrolling so it stops eating vertical space.
 *
 *   at rest    py-6  + h-16 mark  ~112px tall
 *   scrolled   py-3  + h-11 mark  ~76px tall
 *
 * Both states come from one `scrolled` flag and a shared 300ms transition, so the bar
 * and the logo shrink together rather than in two visible stages.
 *
 * If you change these, bump `scroll-padding-top` in app/globals.css to match the
 * at-rest height, otherwise anchor jumps (#pricing, #faq) land under the header.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Section anchors stay relative so they work on whichever locale page is rendered.
  const links = [
    { label: t('home'), href: `/${locale}/` },
    { label: t('pricing'), href: '#pricing' },
    { label: t('work'), href: '#work' },
    { label: t('contact'), href: '#contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-brand-navy/10 bg-white/95 shadow-soft backdrop-blur-md'
          : 'border-b border-transparent bg-white/70 backdrop-blur-sm'
      }`}
    >
      <nav
        className={`container flex items-center justify-between gap-6 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-6'
        }`}
      >
        <Link href={`/${locale}/`} className="flex shrink-0 items-center" aria-label={t('homeAria')}>
          <Logo
            title=""
            iconClassName={`w-auto transition-all duration-300 ${
              scrolled ? 'h-10 sm:h-11' : 'h-12 sm:h-16'
            }`}
            textClassName={`transition-all duration-300 ${
              scrolled ? 'text-2xl sm:text-[1.6rem]' : 'text-2xl sm:text-4xl'
            }`}
          />
        </Link>

        <ul className="hidden items-center gap-9 lg:flex">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="relative text-base font-bold text-brand-navy/75 transition-colors
                           hover:text-brand-navy after:absolute after:-bottom-1.5 after:left-0
                           after:h-0.5 after:w-0 after:rounded-full after:bg-brand-tangerine
                           after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageToggle />
          <Link
            href="#pricing"
            className={`btn-primary transition-all duration-300 ${
              scrolled ? 'px-6 py-3 text-[0.95rem]' : 'px-7 py-3.5 text-base'
            }`}
          >
            {t('cta')}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t('closeMenu') : t('openMenu')}
            className="rounded-lg p-2 text-brand-navy transition-colors hover:bg-brand-navy-tint"
          >
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-brand-navy/10 bg-white px-5 pb-6 pt-4 shadow-soft lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-lg font-bold text-brand-navy/80
                             transition-colors hover:bg-brand-navy-tint hover:text-brand-navy"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="#pricing" onClick={() => setOpen(false)} className="btn-primary mt-4 w-full">
            {t('cta')}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      )}
    </header>
  );
}
