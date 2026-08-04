'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';
import { logo, site } from '@/lib/assets';
import { navLinks } from '@/lib/content';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // The bar sits transparent over the hero, then gains a soft shadow on scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-brand-navy/10 bg-white/90 shadow-soft backdrop-blur-md'
          : 'border-b border-transparent bg-white/60 backdrop-blur-sm'
      }`}
    >
      <nav className="container flex h-20 items-center justify-between gap-6">
        {/* Full logo (icon + wordmark) — see lib/assets.ts to serve the Drive original */}
        <Link href="/" className="flex shrink-0 items-center" aria-label={`${site.name} home`}>
          <Image
            src={logo.full.src}
            alt={`${site.name} logo`}
            width={logo.full.width}
            height={logo.full.height}
            unoptimized={logo.unoptimized}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="relative text-[0.95rem] font-bold text-brand-navy/75 transition-colors
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
          <Link href="/#pricing" className="btn-primary px-6 py-3 text-[0.95rem]">
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
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
                  className="block rounded-lg px-3 py-3 text-base font-bold text-brand-navy/80
                             transition-colors hover:bg-brand-navy-tint hover:text-brand-navy"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/#pricing"
            onClick={() => setOpen(false)}
            className="btn-primary mt-4 w-full"
          >
            See Our Packages
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      )}
    </header>
  );
}
