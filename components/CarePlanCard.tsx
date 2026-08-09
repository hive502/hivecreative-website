import { Check, ShieldCheck } from 'lucide-react';

export type CarePlanCardProps = {
  name: string;
  monthly: string;
  yearly: string;
  saving: string;
  tagline: string;
  features: string[];
  /** e.g. "/mo" */
  perMonth: string;
  /** e.g. "or" placed before the annual price */
  orLabel: string;
  /** e.g. "Choose", combined with the plan name for the CTA */
  chooseLabel: string;
  badge?: string;
  featured?: boolean;
  /** Stripe Payment Link for the recurring subscription. */
  checkoutUrl?: string;
};

/**
 * Recurring care plan card. Visually distinct from PricingCard: navy-filled when
 * featured, calmer overall, with the monthly figure leading and the annual saving as a
 * supporting chip. This is a retention product, not an impulse purchase, so it reads
 * reassuring rather than loud.
 */
export default function CarePlanCard({
  name,
  monthly,
  yearly,
  saving,
  tagline,
  features,
  perMonth,
  orLabel,
  chooseLabel,
  badge,
  featured = false,
  checkoutUrl,
}: CarePlanCardProps) {
  const ctaClass = featured
    ? 'btn-primary w-full'
    : 'btn-secondary w-full hover:border-brand-tangerine/40';
  const ctaLabel = `${chooseLabel} ${name}`;

  return (
    <div
      className={[
        'relative flex h-full flex-col rounded-2xl p-8 transition-all duration-300',
        featured
          ? 'bg-navy-fade text-white shadow-lift ring-2 ring-brand-tangerine lg:-mt-4 lg:mb-4 lg:p-10'
          : 'border border-brand-navy/10 bg-white shadow-soft hover:-translate-y-2 hover:border-brand-navy/20 hover:shadow-xl',
      ].join(' ')}
    >
      {badge && (
        <span
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-orange-fade px-4 py-1.5
                     text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white shadow-cta"
        >
          {badge}
        </span>
      )}

      <div className="flex items-center gap-2.5">
        <ShieldCheck
          className={`h-5 w-5 ${featured ? 'text-brand-tangerine-light' : 'text-brand-tangerine'}`}
          aria-hidden
        />
        <h3 className={`text-xl font-bold tracking-tight ${featured ? 'text-white' : 'text-brand-navy'}`}>
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
        <span className={`text-5xl font-bold tracking-tight ${featured ? 'text-white' : 'text-brand-navy'}`}>
          {monthly}
        </span>
        <span className={`text-base font-bold ${featured ? 'text-white/60' : 'text-brand-navy/50'}`}>
          {perMonth}
        </span>
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className={`text-sm font-bold ${featured ? 'text-white/70' : 'text-brand-navy/60'}`}>
          {orLabel} {yearly}
        </span>
        <span
          className={[
            'rounded-full px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wider',
            featured
              ? 'bg-brand-tangerine text-white'
              : 'bg-brand-tangerine-tint text-brand-tangerine-dark',
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
                featured ? 'bg-brand-tangerine' : 'bg-brand-tangerine-tint',
              ].join(' ')}
              aria-hidden
            >
              <Check
                className={`h-3 w-3 stroke-[3.5] ${featured ? 'text-white' : 'text-brand-tangerine'}`}
              />
            </span>
            <span
              className={`text-[0.95rem] font-medium leading-snug ${
                featured ? 'text-white/85' : 'text-brand-navy/80'
              }`}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {checkoutUrl ? (
        <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" className={ctaClass}>
          {ctaLabel}
        </a>
      ) : (
        <a href="#contact" className={ctaClass}>
          {ctaLabel}
        </a>
      )}
    </div>
  );
}
