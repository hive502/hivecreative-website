import Image from 'next/image';
import { portfolioShots, type PortfolioShot } from '@/lib/assets';

/**
 * Infinite auto-scrolling portfolio marquee.
 *
 * Deliberately a SERVER component: the animation is pure CSS, so there is no hydration
 * cost and nothing ships to the client bundle. Framer Motion is not installed and is
 * not needed for a linear loop like this.
 *
 * How the loop works
 * ------------------
 * The track renders the slide set TWICE. The `marquee` keyframe (tailwind.config.ts)
 * translates it left by exactly 50%, the width of one full copy, so at the moment the
 * animation resets copy 2 sits precisely where copy 1 began. The seam is mathematically
 * invisible, which is why the duplicate is not optional.
 *
 * Accessibility
 * -------------
 * The duplicate set is aria-hidden, so each project is announced once. Hover and
 * keyboard focus both pause the scroll, and prefers-reduced-motion falls back to a
 * normal horizontal scroll container so the content stays reachable.
 *
 * Image files are pre-cropped to exact ratios (21:10 desktop, 21:40 mobile) so the
 * aspect boxes never crop them further and every card lines up.
 */

type Label = { label: string; alt: string };

function Frame({ shot, label }: { shot: PortfolioShot; label: Label }) {
  const isDesktop = shot.device === 'desktop';

  return (
    <figure
      className={[
        'group/card relative shrink-0',
        isDesktop ? 'w-[20rem] sm:w-[28rem] lg:w-[34rem]' : 'w-[9rem] sm:w-[11rem]',
      ].join(' ')}
    >
      <div
        className={[
          'overflow-hidden bg-white ring-1 ring-brand-navy/10 transition-all duration-300',
          'shadow-soft group-hover/card:shadow-lift',
          isDesktop ? 'rounded-xl' : 'rounded-[1.75rem] p-1.5',
        ].join(' ')}
      >
        {/* Browser chrome sells the "this is a real website" read at a glance. */}
        {isDesktop && (
          <div className="flex items-center gap-1.5 border-b border-brand-navy/10 bg-brand-bg px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-navy/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand-navy/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand-navy/15" />
            <span className="ml-3 h-2.5 flex-1 rounded-full bg-brand-navy/[0.07]" />
          </div>
        )}

        <div
          className={[
            'relative overflow-hidden',
            isDesktop ? 'aspect-[21/10]' : 'aspect-[21/40] rounded-[1.4rem]',
          ].join(' ')}
        >
          <Image
            src={shot.src}
            alt={label.alt}
            width={isDesktop ? 1600 : 660}
            height={isDesktop ? 762 : 1257}
            loading="lazy"
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>

      <figcaption className="mt-4 text-center text-sm font-bold text-brand-navy/55">
        {label.label}
      </figcaption>
    </figure>
  );
}

type PortfolioAnimationProps = {
  eyebrow: string;
  title: string;
  lede: string;
  /** Localised caption and alt text, index-matched to `portfolioShots`. */
  labels: Label[];
};

export default function PortfolioAnimation({
  eyebrow,
  title,
  lede,
  labels,
}: PortfolioAnimationProps) {
  if (portfolioShots.length === 0) return null;

  const slides = portfolioShots.map((shot, i) => ({
    shot,
    label: labels[i] ?? { label: '', alt: '' },
  }));

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="overflow-hidden border-y border-brand-navy/10 bg-white py-20 sm:py-28"
    >
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{eyebrow}</p>
          <h2
            id="portfolio-heading"
            className="mt-5 text-3xl font-bold leading-[1.15] tracking-tight text-brand-navy sm:text-4xl lg:text-[2.75rem]"
          >
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-navy/70">{lede}</p>
        </div>
      </div>

      {/* Full-bleed rail. `group` is what lets hover anywhere pause the track. */}
      <div className="group relative mt-14">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-32"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-32"
          aria-hidden
        />

        <div className="overflow-x-auto motion-safe:overflow-hidden">
          <div
            className="flex w-max items-end gap-6 pb-2 sm:gap-10
                       motion-safe:animate-marquee
                       group-hover:[animation-play-state:paused]
                       group-focus-within:[animation-play-state:paused]
                       motion-reduce:animate-none"
          >
            {slides.map(({ shot, label }) => (
              <Frame key={shot.src} shot={shot} label={label} />
            ))}

            {/* Second copy, required for the seamless wrap. Hidden from the a11y tree. */}
            <div className="flex items-end gap-6 sm:gap-10" aria-hidden>
              {slides.map(({ shot, label }) => (
                <Frame key={`${shot.src}-dup`} shot={shot} label={label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
