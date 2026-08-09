import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Mail, ArrowRight } from 'lucide-react';
import Logo from '@/components/Logo';
import { site } from '@/lib/assets';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const links = [
    { label: t('nav.home'), href: `/${locale}/` },
    { label: t('nav.pricing'), href: '#pricing' },
    { label: t('nav.work'), href: '#work' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <footer id="contact" className="bg-navy-fade text-white">
      {/* Closing CTA */}
      <div className="container py-20 text-center sm:py-28">
        <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem]">
          {t('footer.ctaTitle')}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
          {t('footer.ctaBody')}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href={`mailto:${site.email}`} className="btn-primary w-full sm:w-auto">
            {t('footer.ctaPrimary')}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <a
            href="#pricing"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2
                       border-white/25 px-7 py-4 text-base font-bold text-white transition-all
                       duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/5
                       sm:w-auto"
          >
            {t('footer.ctaSecondary')}
          </a>
        </div>

        <p className="mt-6 text-sm font-medium text-white/50">{t('footer.subtext')}</p>
      </div>

      {/* Footer body */}
      <div className="border-t border-white/10">
        <div className="container grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            {/* Icon-only mark. The wordmark is navy, so it would vanish on this background. */}
            <Logo iconOnly iconClassName="h-14 w-auto" title={site.name} />
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-white/60">
              {t('footer.blurb')}
            </p>
          </div>

          <nav aria-label={t('nav.footerNav')}>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">
              {t('footer.explore')}
            </h3>
            <ul className="mt-5 space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[0.95rem] font-medium text-white/70 transition-colors hover:text-brand-tangerine-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">
              {t('footer.getInTouch')}
            </h3>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2.5 text-[0.95rem] font-medium text-white/70 transition-colors hover:text-brand-tangerine-light"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden />
                  {site.email}
                </a>
              </li>
              <li className="text-[0.95rem] font-medium text-white/50">{site.domain}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-sm text-white/45 sm:flex-row">
          <p>
            © 2026 {site.name}. {t('footer.rights')}
          </p>
          <p className="font-medium">{t('footer.tagline')}</p>
        </div>
      </div>
    </footer>
  );
}
