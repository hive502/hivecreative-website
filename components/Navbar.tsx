'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';
import { logo, site } from '@/lib/assets';
import { navLinks } from '@/lib/content';

/**
 * Site header.
 *
 * Sizing follows the Knapsack pattern: a deliberately tall, generous bar on load so
 * the branding is the first thing you see, which then compacts once the user starts
 * scrolling so it stops eating vertical space.
 *
 *   at rest    py-6  + h-16 logo  ≈ 112px tall
 *   scrolled   py-3  + h-11 logo  ≈  76px tall
 *
 * Both states are driven by one `scrolled` flag and a shared 300ms transition, so the
 * bar and the logo shrink together rather than in two visible stages.
 *
 * If you change these, bump `scroll-padding-top` in app/globals.css to match the
 * at-rest height, otherwise anchor jumps (#pricing, #faq) land under the header.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
        {/* Full logo (icon + wordmark). w-auto keeps the aspect ratio locked. */}
        <Link href="/" className="flex shrink-0 items-center" aria-label={`${site.name} home`}>
          <Image
            src={logo.full.src}
            alt={`${site.name} logo`}
            width={logo.full.width}
            height={logo.full.height}
            unoptimized={logo.unoptimized}
            priority
            className={`w-auto transition-all duration-300 ${
              scrolled ? 'h-10 sm:h-11' : 'h-12 sm:h-16'
            }`}
          />
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="relative text-base font-bold text-brand-navy/75 transition-colors
                           hover:text-brand-navy after:absolute after:-bottom-1.5 after:left-0
                           after:h-0.5 after:w-0 after:rounded-full after:bg-brand-orange
                           after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link
            href="/#pricing"
            className={`btn-primary transition-all duration-300 ${
              scrolled ? 'px-6 py-3 text-[0.95rem]' : 'px-7 py-3.5 text-base'
            }`}
          >
            See Our Packages
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="rounded-lg p-2 text-brand-navy transition-colors hover:bg-brand-navy-tint md:hidden"
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-brand-navy/10 bg-white px-5 pb-6 pt-4 shadow-soft md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
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
          <Link href="/#pricing" onClick={() => setOpen(false)} className="btn-primary mt-4 w-full">
            See Our Packages
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      )}
    </header>
  );
}
