'use client';

import { useId, useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: readonly FaqItem[];
  /** Index of the row open on first paint. Pass `null` to start fully collapsed. */
  defaultOpen?: number | null;
  /** When false, multiple rows can sit open at once. */
  singleOpen?: boolean;
};

/**
 * Accessible FAQ accordion.
 *
 * Buttons carry aria-expanded / aria-controls, panels are labelled by their trigger,
 * and collapsed panels are removed from the a11y tree via `hidden`. The grid-rows
 * trick animates height without needing a measured pixel value.
 */
export default function FaqAccordion({
  items,
  defaultOpen = 0,
  singleOpen = true,
}: FaqAccordionProps) {
  const baseId = useId();
  const [open, setOpen] = useState<number[]>(defaultOpen === null ? [] : [defaultOpen]);

  const toggle = (index: number) => {
    setOpen((current) => {
      const isOpen = current.includes(index);
      if (singleOpen) return isOpen ? [] : [index];
      return isOpen ? current.filter((i) => i !== index) : [...current, index];
    });
  };

  return (
    <div className="divide-y divide-brand-navy/10 overflow-hidden rounded-2xl border border-brand-navy/10 bg-white shadow-soft">
      {items.map((item, index) => {
        const isOpen = open.includes(index);
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.question} className={isOpen ? 'bg-brand-bg/60' : 'bg-white'}>
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left
                           transition-colors hover:bg-brand-navy-tint/50 focus-visible:outline
                           focus-visible:outline-2 focus-visible:-outline-offset-2
                           focus-visible:outline-brand-tangerine sm:px-8"
              >
                <span className="text-base font-bold leading-snug text-brand-navy sm:text-lg">
                  {item.question}
                </span>
                <span
                  className={[
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300',
                    isOpen
                      ? 'bg-brand-tangerine text-white rotate-180'
                      : 'bg-brand-tangerine-tint text-brand-tangerine',
                  ].join(' ')}
                  aria-hidden
                >
                  {isOpen ? <Minus className="h-4 w-4 stroke-[3]" /> : <Plus className="h-4 w-4 stroke-[3]" />}
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className="px-6 pb-7 sm:px-8"
            >
              <p className="max-w-2xl text-[0.975rem] leading-relaxed text-brand-navy/70">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
