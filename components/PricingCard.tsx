import { Check, ArrowRight } from 'lucide-react';

export type PricingCardProps = {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  ctaLabel: string;
  /** Copy shown under the price, e.g. "one-off build". */
  priceSuffix: string;
  /** Reminder that the Care Plan is a separate charge. */
  footnote: string;
  /** Badge text for the highlighted card. Omit on the others. */
  badge?: string;
  featured?: boolean;
  /**
   * Stripe Payment Link. When present the CTA becomes an external anchor that opens in
   * a new tab; when absent it falls back to the on-page contact anchor, so the card
   * still works if a link is being rotated.
   */
  checkoutUrl?: string;
};

/**
 * Reusable website-build pricing card.
 *
 * The `featured` variant lifts off the page with a tangerine ring, a badge and a slight
 * upward offset on desktop, the standard "guide the eye to the middle option" pattern.
 * Everything else stays deliberately quiet so the featured card can do its job.
 */
export default function PricingCard({
  name,
  price,
  tagline,
  features,
  ctaLabel,
  priceSuffix,
  footnote,
  badge,
  featured = false,
  checkoutUrl,
}: PricingCardProps) {
  const ctaClass = featured
    ? 'btn-primary w-full'
    : 'btn-secondary w-full group-hover:border-brand-tangerine/40';

  const ctaInner = (
    <>
      {ctaLabel}
      <ArrowRight
        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
        aria-hidden
      />
    </>
  );

  return (
    <div
      className={[
        'group relative flex h-full flex-col rounded-2xl bg-white p-8 transition-all duration-300',
        featured
          ? 'shadow-lift ring-2 ring-brand-tangerine lg:-mt-4 lg:mb-4 lg:p-10'
          : 'border border-brand-navy/10 shadow-soft hover:-translate-y-2 hover:border-brand-navy/20 hover:shadow-xl',
      ].join(' ')}
    >
      {featured && badge && (
        <span
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-orange-fade px-4 py-1.5
                     text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white shadow-cta"
        >
          {badge}
        </span>
      )}

      <header className="border-b border-brand-navy/10 pb-7">
        <h3 className="text-xl font-bold tracking-tight text-brand-navy">{name}</h3>
        <p className="mt-2 min-h-[2.75rem] text-[0.95rem] leading-snug text-brand-navy/60">
          {tagline}
        </p>
        <p className="mt-5 flex items-baseline gap-2">
          <span className="text-5xl font-bold tracking-tight text-brand-navy">{price}</span>
          <span className="text-sm font-bold text-brand-navy/50">{priceSuffix}</span>
        </p>
      </header>

      <ul className="flex-1 space-y-4 py-7">
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
            <span className="text-[0.95rem] font-medium leading-snug text-brand-navy/80">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {checkoutUrl ? (
        <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" className={ctaClass}>
          {ctaInner}
        </a>
      ) : (
        <a href="#contact" className={ctaClass}>
          {ctaInner}
        </a>
      )}

      <p className="mt-4 text-center text-xs font-medium text-brand-navy/45">{footnote}</p>
    </div>
  );
}
