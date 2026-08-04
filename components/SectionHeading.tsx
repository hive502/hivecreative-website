type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: 'center' | 'left';
  tone?: 'navy' | 'light';
};

/** Shared section header so every band on the page shares the same rhythm. */
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
        <p
          className={
            tone === 'light'
              ? 'inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-brand-orange-light'
              : 'eyebrow'
          }
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={[
          'text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem]',
          eyebrow ? 'mt-5' : '',
          tone === 'light' ? 'text-white' : 'text-brand-navy',
        ].join(' ')}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={[
            'mt-6 text-lg leading-relaxed',
            centered ? 'mx-auto max-w-2xl' : 'max-w-2xl',
            tone === 'light' ? 'text-white/70' : 'text-brand-navy/70',
          ].join(' ')}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
