import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import {
  ArrowRight,
  ArrowDown,
  Hammer,
  ShieldCheck,
  MousePointerClick,
  Wrench,
  UserX,
  Ghost,
  TrendingUp,
  Clock,
  Sparkles,
  Tag,
} from 'lucide-react';

import SectionHeading from '@/components/SectionHeading';
import ProcessStep from '@/components/ProcessStep';
import PricingCard from '@/components/PricingCard';
import CarePlanCard from '@/components/CarePlanCard';
import FaqAccordion from '@/components/FaqAccordion';
import PortfolioAnimation from '@/components/PortfolioAnimation';
import { src, site, caseStudyImage } from '@/lib/assets';
import { BUILD_CHECKOUT_URLS, CARE_CHECKOUT_URLS } from '@/lib/stripe';
import { locales, type Locale } from '@/i18n';

const painIcons = [Wrench, UserX, Ghost];
const stepIcons = [MousePointerClick, Hammer, ShieldCheck];

/** Types for the arrays pulled out of the message bundle with t.raw(). */
type PainPoint = { title: string; body: string };
type Step = { step: string; title: string; body: string };
type Stat = { value: string; label: string };
type BuildPlan = { name: string; price: string; tagline: string; features: string[]; cta: string };
type CarePlan = {
  name: string;
  monthly: string;
  yearly: string;
  saving: string;
  tagline: string;
  features: string[];
};
type Faq = { q: string; a: string };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale as Locale);

  const t = useTranslations();
  const painPoints = t.raw('agitator.points') as PainPoint[];
  const steps = t.raw('process.steps') as Step[];
  const buildPlans = t.raw('pricing.plans') as BuildPlan[];
  const carePlans = t.raw('care.plans') as CarePlan[];
  const caseStats = t.raw('caseStudy.stats') as Stat[];
  const faqs = (t.raw('faq.items') as Faq[]).map((f) => ({ question: f.q, answer: f.a }));

  return (
    <>
      {/* ───────────────────────── 1. HERO ───────────────────────── */}
      <section className="relative overflow-hidden bg-paper-fade">
        <div
          className="pointer-events-none absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full
                     bg-brand-tangerine/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-40 top-1/3 h-[28rem] w-[28rem] rounded-full
                     bg-brand-navy/5 blur-3xl"
          aria-hidden
        />

        <div className="container relative grid items-center gap-14 py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:py-32">
          <div className="animate-fade-up">
            <p className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              {t('hero.eyebrow')}
            </p>

            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-brand-navy sm:text-5xl lg:text-[3.5rem]">
              {t('hero.titleStart')}{' '}
              <span className="relative inline-block">
                <span className="relative z-10">{t('hero.titleHighlight')}</span>
                <span
                  className="absolute inset-x-0 bottom-1.5 z-0 h-3 rounded-full bg-brand-tangerine/25 sm:bottom-2 sm:h-4"
                  aria-hidden
                />
              </span>
              {t('hero.titleEnd')}
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-brand-navy/70">
              {t('hero.sub')}
            </p>

            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a href="#pricing" className="btn-primary w-full sm:w-auto">
                {t('hero.ctaPrimary')}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a href="#process" className="btn-secondary w-full sm:w-auto">
                {t('hero.ctaSecondary')}
              </a>
            </div>

            <p className="mt-5 text-sm font-medium text-brand-navy/55">{t('hero.subtext')}</p>

            <ul className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-brand-navy/10 pt-7">
              {[
                { Icon: Clock, label: t('hero.trust1') },
                { Icon: ShieldCheck, label: t('hero.trust2') },
                { Icon: TrendingUp, label: t('hero.trust3') },
              ].map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-sm font-bold text-brand-navy/65">
                  <Icon className="h-4 w-4 text-brand-tangerine" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative animate-fade-up [animation-delay:120ms]">
            <div className="relative overflow-hidden rounded-4xl bg-white shadow-lift ring-1 ring-brand-navy/10">
              <Image
                src={src('hero')}
                alt={t('hero.imageAlt')}
                width={2688}
                height={1536}
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="h-full w-full object-cover"
              />
            </div>

            <div
              className="absolute -bottom-6 -left-4 hidden items-center gap-3 rounded-2xl border
                         border-brand-navy/10 bg-white px-5 py-4 shadow-lift sm:flex lg:-left-8"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-tangerine-tint">
                <Tag className="h-5 w-5 text-brand-tangerine" aria-hidden />
              </span>
              <span>
                <span className="block text-xl font-bold leading-none text-brand-navy">
                  {t('hero.chipValue')}
                </span>
                <span className="mt-1 block text-xs font-bold text-brand-navy/55">
                  {t('hero.chipLabel')}
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────── 2. THE AGITATOR ───────────────────── */}
      <section className="border-y border-brand-navy/10 bg-white py-20 sm:py-28">
        <div className="container">
          <SectionHeading
            eyebrow={t('agitator.eyebrow')}
            title={
              <>
                {t('agitator.titleStart')}{' '}
                <span className="text-brand-tangerine">{t('agitator.titleHighlight')}</span>
              </>
            }
            lede={t('agitator.lede')}
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {painPoints.map((pain, i) => {
              const Icon = painIcons[i];
              return (
                <div
                  key={pain.title}
                  className="group rounded-2xl border border-brand-navy/10 bg-brand-bg p-8
                             transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-tangerine/30
                             hover:bg-white hover:shadow-lift"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-soft ring-1 ring-brand-navy/5">
                    <Icon
                      className="h-6 w-6 text-brand-navy/70 transition-colors group-hover:text-brand-tangerine"
                      aria-hidden
                    />
                  </span>
                  <h3 className="mt-6 text-lg font-bold tracking-tight text-brand-navy">
                    {pain.title}
                  </h3>
                  <p className="mt-3 text-[0.975rem] leading-relaxed text-brand-navy/70">
                    {pain.body}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mx-auto mt-14 max-w-3xl rounded-2xl bg-navy-fade px-8 py-10 text-center shadow-lift sm:px-12">
            <ArrowDown className="mx-auto h-6 w-6 text-brand-tangerine" aria-hidden />
            <p className="mt-5 text-xl font-bold leading-snug text-white sm:text-2xl">
              {t('agitator.turnTitle')}
            </p>
            <p className="mx-auto mt-4 max-w-xl text-[1.05rem] leading-relaxed text-white/70">
              {t('agitator.turnBody')}
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────── 3. THE 3-STEP PROCESS ───────────────── */}
      <section id="process" className="relative overflow-hidden bg-brand-bg py-20 sm:py-32">
        <div className="pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden>
          <Image src={src('honeycomb')} alt="" fill aria-hidden className="object-cover" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-bg via-brand-bg/60 to-brand-bg"
          aria-hidden
        />

        <div className="container relative">
          <SectionHeading
            eyebrow={t('process.eyebrow')}
            title={t('process.title')}
            lede={t('process.lede')}
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-6">
            {steps.map((step, i) => (
              <ProcessStep
                key={step.step}
                step={step.step}
                stepLabel={t('process.stepLabel')}
                title={step.title}
                body={step.body}
                Icon={stepIcons[i]}
                isLast={i === steps.length - 1}
              />
            ))}
          </div>

          <div className="mt-14 text-center">
            <a href="#pricing" className="btn-primary">
              {t('process.cta')}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* ──────────── 3b. PORTFOLIO MARQUEE ──────────── */}
      <PortfolioAnimation
        eyebrow={t('portfolio.eyebrow')}
        title={t('portfolio.title')}
        lede={t('portfolio.lede')}
        labels={t.raw('portfolio.shots') as { label: string; alt: string }[]}
      />

      {/* ───────────────── 4. FEATURED CASE STUDY ───────────────── */}
      <section id="work" className="bg-white py-20 sm:py-32">
        <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative order-2 lg:order-1">
            <div
              className="pointer-events-none absolute -inset-6 -z-10 rounded-4xl bg-brand-navy-tint"
              aria-hidden
            />
            <Image
              src={caseStudyImage.src}
              alt={t('caseStudy.imageAlt')}
              width={1600}
              height={900}
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="w-full"
            />
          </div>

          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow={t('caseStudy.eyebrow')}
              title={t('caseStudy.title')}
              align="left"
            />

            <p className="mt-8 text-[1.05rem] leading-relaxed text-brand-navy/75">
              <strong className="font-bold text-brand-navy">{t('caseStudy.client')}</strong>{' '}
              {t('caseStudy.paragraph1')}
            </p>

            <p className="mt-5 text-[1.05rem] leading-relaxed text-brand-navy/75">
              {t('caseStudy.paragraph2')}
            </p>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-brand-navy/10 pt-8">
              {caseStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-xl font-bold tracking-tight text-brand-tangerine sm:text-2xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-1.5 text-xs font-bold leading-snug text-brand-navy/55 sm:text-sm">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>

            <a href="#pricing" className="btn-primary mt-10">
              {t('caseStudy.cta')}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* ───────────────── 5. PRICING (BUILDS) ───────────────── */}
      <section id="pricing" className="border-y border-brand-navy/10 bg-paper-fade py-20 sm:py-32">
        <div className="container">
          <SectionHeading
            eyebrow={t('pricing.eyebrow')}
            title={t('pricing.title')}
            lede={t('pricing.lede')}
          />

          <div className="mt-16 grid items-stretch gap-8 lg:grid-cols-3 lg:gap-6">
            {buildPlans.map((plan, i) => (
              <PricingCard
                key={plan.name}
                name={plan.name}
                price={plan.price}
                tagline={plan.tagline}
                features={plan.features}
                ctaLabel={plan.cta}
                priceSuffix={t('pricing.priceSuffix')}
                footnote={t('pricing.cardFootnote')}
                badge={t('pricing.mostPopular')}
                featured={i === 1}
                checkoutUrl={BUILD_CHECKOUT_URLS[i]}
              />
            ))}
          </div>

          {/* Pricing integrity: the Care Plan is a separate, required charge. */}
          <p className="mx-auto mt-12 max-w-3xl rounded-2xl border border-brand-navy/10 bg-white px-6 py-5 text-center text-sm font-medium leading-relaxed text-brand-navy/70">
            {t('pricing.integrityNote')}{' '}
            <a
              href="#care"
              className="font-bold text-brand-tangerine underline-offset-4 hover:underline"
            >
              {t('pricing.seeCarePlans')}
            </a>
          </p>
        </div>
      </section>

      {/* ───────────────── 6. CARE PLANS ───────────────── */}
      <section id="care" className="bg-white py-20 sm:py-32">
        <div className="container">
          <SectionHeading eyebrow={t('care.eyebrow')} title={t('care.title')} lede={t('care.lede')} />

          <div className="mt-16 grid items-stretch gap-8 lg:grid-cols-3 lg:gap-6">
            {carePlans.map((plan, i) => (
              <CarePlanCard
                key={plan.name}
                name={plan.name}
                monthly={plan.monthly}
                yearly={plan.yearly}
                saving={plan.saving}
                tagline={plan.tagline}
                features={plan.features}
                perMonth={t('care.perMonth')}
                orLabel={t('care.orYearly')}
                chooseLabel={t('care.choose')}
                badge={i === 1 ? t('care.recommended') : undefined}
                featured={i === 1}
                checkoutUrl={CARE_CHECKOUT_URLS[i]}
              />
            ))}
          </div>

          <p className="mt-12 text-center text-sm font-medium text-brand-navy/55">
            {t('care.note')}
          </p>
        </div>
      </section>

      {/* ───────────────── 7. FAQ ───────────────── */}
      <section id="faq" className="border-t border-brand-navy/10 bg-brand-bg py-20 sm:py-32">
        <div className="container">
          <SectionHeading eyebrow={t('faq.eyebrow')} title={t('faq.title')} lede={t('faq.lede')} />

          <div className="mx-auto mt-14 max-w-3xl">
            <FaqAccordion items={faqs} defaultOpen={0} />

            <p className="mt-10 text-center text-[0.975rem] font-medium text-brand-navy/60">
              {t('faq.stillWondering')}{' '}
              <a
                href={`mailto:${site.email}`}
                className="font-bold text-brand-tangerine underline-offset-4 hover:underline"
              >
                {t('faq.emailUs')} {site.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
