import Link from 'next/link';
import { Check, ShieldCheck } from 'lucide-react';
import type { CarePlan } from '@/lib/content';

/**
 * Recurring care plan card. Visually distinct from PricingCard: navy-tinted, calmer,
 * with the monthly figure leading and the annual saving as a supporting chip — this is
 * a retention product, not an impulse purchase, so it reads reassuring rather than loud.
 */
export default function CarePlanCard({
  name,
  monthly,
  yearly,
  saving,
  tagline,
  features,
  featured = false,
  badge,
}: CarePlan) {
  return (
    <div
      className={[
        'relative flex h-full flex-col rounded-2xl p-8 transition-all duration-300',
        featured
          ? 'bg-navy-fade text-white shadow-lift ring-2 ring-brand-orange lg:-mt-4 lg:mb-4 lg:p-10'
          : 'border border-brand-navy/10 bg-white shadow-soft hover:-translate-y-1 hover:shadow-lift',
      ].join(' ')}
    >
      {badge && (
        <span
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-orange-fade px-4 py-1.5
                     text-[0.7rem] font-extrabold uppercase tracking-[0.12em] text-white shadow-cta"
        >
          {badge}
        </span>
      )}

      <div className="flex items-center gap-2.5">
        <ShieldCheck
          className={`h-5 w-5 ${featured ? 'text-brand-orange-light' : 'text-brand-orange'}`}
          aria-hidden
        />
        <h3
          className={`text-xl font-extrabold tracking-tight ${featured ? 'text-white' : 'text-brand-navy'}`}
        >
          {name}
        </h3>
      </div>

      <p
        className={`mt-2 min-h-[2.75rem] text-[0.95rem] leading-snug ${
          featured ? 'text-white/70' : 'text-brand-navy/60'
        }`}
      >
        {tagline}
      </p>

      <p className="mt-5 flex items-baseline gap-1.5">
        <span
          className={`text-5xl font-extrabold tracking-tight ${featured ? 'text-white' : 'text-brand-navy'}`}
        >
          {monthly}
        </span>
        <span className={`text-base font-bold ${featured ? 'text-white/60' : 'text-brand-navy/50'}`}>
          /mo
        </span>
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span
          className={`text-sm font-bold ${featured ? 'text-white/70' : 'text-brand-navy/60'}`}
        >
          or {yearly}
        </span>
        <span
          className={[
            'rounded-full px-2.5 py-1 text-[0.7rem] font-extrabold uppercase tracking-wider',
            featured ? 'bg-brand-orange text-white' : 'bg-brand-orange-tint text-brand-orange-dark',
          ].join(' ')}
        >
          {saving}
        </span>
      </div>

      <ul
        className={`my-7 flex-1 space-y-4 border-t pt-7 ${
          featured ? 'border-white/15' : 'border-brand-navy/10'
        }`}
      >
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span
              className={[
                'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                featured ? 'bg-brand-orange' : 'bg-brand-orange-tint',
              ].join(' ')}
              aria-hidden
            >
              <Check
                className={`h-3 w-3 stroke-[3.5] ${featured ? 'text-white' : 'text-brand-orange'}`}
              />
            </span>
            <span
              className={`text-[0.95rem] font-semibold leading-snug ${
                featured ? 'text-white/85' : 'text-brand-navy/80'
              }`}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href="/#contact"
        className={
          featured
            ? 'btn-primary w-full'
            : 'btn-secondary w-full hover:border-brand-orange/40'
        }
      >
        Choose {name}
      </Link>
    </div>
  );
}
