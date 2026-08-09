type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: 'center' | 'left';
  tone?: 'navy' | 'light';
};

/**
 * Shared section header, and the main lever for typographic contrast across the site.
 *
 * Headings are large with tight tracking and a short line-height, so they read as one
 * confident block. Body copy goes the other way: normal weight, relaxed leading,
 * reduced contrast. The gap between those two settings is what makes a page feel
 * designed rather than merely typed.
 *
 * The tangerine rule above the eyebrow is the only decoration. Under the 60-30-10 rule
 * the accent colour appears at this size or on a button, never as a large fill.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'center',
  tone = 'navy',
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow && (
        <div className={centered ? 'flex flex-col items-center' : 'flex flex-col items-start'}>
          <span
            className={`block h-1 w-12 rounded-full ${
              tone === 'light' ? 'bg-brand-tangerine-light' : 'bg-brand-tangerine'
            }`}
            aria-hidden
          />
          <p
            className={`mt-6 text-xs font-bold uppercase tracking-[0.2em] ${
              tone === 'light' ? 'text-brand-tangerine-light' : 'text-brand-tangerine'
            }`}
          >
            {eyebrow}
          </p>
        </div>
      )}

      <h2
        className={[
          'text-4xl font-extrabold leading-[1.05] tracking-tighter sm:text-5xl lg:text-6xl',
          eyebrow ? 'mt-6' : '',
          tone === 'light' ? 'text-white' : 'text-[#2B3C5A]',
        ].join(' ')}
      >
        {title}
      </h2>

      {lede && (
        <p
          className={[
            'mt-8 text-lg leading-relaxed',
            centered ? 'mx-auto max-w-2xl' : 'max-w-2xl',
            tone === 'light' ? 'text-white/70' : 'text-slate-600',
          ].join(' ')}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
