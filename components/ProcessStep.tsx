import type { LucideIcon } from 'lucide-react';

type ProcessStepProps = {
  step: string;
  /** Localised word for "Step". */
  stepLabel: string;
  title: string;
  body: string;
  Icon: LucideIcon;
  /** Hides the connector line on the final card. */
  isLast?: boolean;
};

/**
 * One card in the "How It Works" band. On desktop a hairline connector runs from the
 * icon toward the next card, so the three steps read as a single sequence rather than
 * three unrelated boxes.
 */
export default function ProcessStep({
  step,
  stepLabel,
  title,
  body,
  Icon,
  isLast = false,
}: ProcessStepProps) {
  return (
    <div className="relative">
      {!isLast && (
        <span
          className="absolute left-[calc(50%+3.5rem)] top-10 hidden h-px w-[calc(100%-7rem)]
                     bg-gradient-to-r from-brand-navy/20 to-brand-navy/5 lg:block"
          aria-hidden
        />
      )}

      <div
        className="group relative h-full rounded-2xl border border-brand-navy/10 bg-white/80 p-8
                   text-center shadow-soft backdrop-blur-sm transition-all duration-300
                   hover:-translate-y-1.5 hover:border-brand-tangerine/30 hover:shadow-lift"
      >
        <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
          <span
            className="absolute inset-0 rounded-2xl bg-orange-fade opacity-100 shadow-cta transition-transform
                       duration-300 group-hover:scale-105"
            aria-hidden
          />
          <Icon className="relative h-9 w-9 text-white" strokeWidth={2} aria-hidden />
        </div>

        <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-brand-tangerine">
          {stepLabel} {step}
        </p>
        <h3 className="mt-2 text-xl font-bold tracking-tight text-brand-navy">{title}</h3>
        <p className="mt-4 text-[0.975rem] leading-relaxed text-brand-navy/70">{body}</p>
      </div>
    </div>
  );
}
