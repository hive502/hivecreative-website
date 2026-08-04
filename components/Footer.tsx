import Image from 'next/image';
import Link from 'next/link';
import { Mail, ArrowRight } from 'lucide-react';
import { logo, site } from '@/lib/assets';
import { navLinks } from '@/lib/content';

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy-fade text-white">
      {/* Closing CTA */}
      <div className="container py-20 text-center sm:py-28">
        <h2 className="mx-auto max-w-3xl text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem]">
          Ready for a website that actually works for your business?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
          No tech stress. No disappearing freelancers. Just a professional site that brings
          you customers.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href={`mailto:${site.email}`} className="btn-primary w-full sm:w-auto">
            Get Started Today
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <Link
            href="/#pricing"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2
                       border-white/25 px-7 py-4 text-base font-bold text-white transition-all
                       duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/5
                       sm:w-auto"
          >
            See Our Packages
          </Link>
        </div>

        <p className="mt-6 text-sm font-semibold text-white/50">
          Simple, transparent pricing for small businesses.
        </p>
      </div>

      {/* Footer body */}
      <div className="border-t border-white/10">
        <div className="container grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            {/* Icon-only mark — transparent PNG, so the navy shows through */}
            <Image
              src={logo.icon.src}
              alt={`${site.name} mark`}
              width={logo.icon.width}
              height={logo.icon.height}
              unoptimized={logo.unoptimized}
              className="h-14 w-auto"
            />
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-white/60">
              Done-for-you websites for small businesses and sole traders — built properly,
              then looked after every single month.
            </p>
          </div>

          <nav aria-label="Footer">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-white/45">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[0.95rem] font-semibold text-white/70 transition-colors hover:text-brand-orange-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-white/45">
              Get in touch
            </h3>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2.5 text-[0.95rem] font-semibold text-white/70 transition-colors hover:text-brand-orange-light"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden />
                  {site.email}
                </a>
              </li>
              <li className="text-[0.95rem] font-semibold text-white/50">{site.domain}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-sm text-white/45 sm:flex-row">
          <p>© 2026 {site.name}. All rights reserved.</p>
          <p className="font-semibold">Websites without the tech headaches.</p>
        </div>
      </div>
    </footer>
  );
}
