import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', lg: '2rem' },
      screens: { '2xl': '1200px' },
    },
    extend: {
      colors: {
        brand: {
          /* ---- Primary: Vibrant Tangerine ------------------------------
             Every call to action. The only colour allowed to shout.       */
          tangerine: '#FF8F00',
          'tangerine-dark': '#D97A00',   // hover / gradient end
          'tangerine-light': '#FFB454',
          'tangerine-tint': '#FFF3E0',   // icon chips, eyebrow pills

          /* ---- Accent: brand blue --------------------------------------
             Sampled from the logo artwork (#0F4993), not the original
             #2B3C5A spec, so headings sit in the same family as the mark. */
          navy: '#0F4993',
          'navy-dark': '#0A3369',        // footer gradient end
          'navy-light': '#3D74BE',
          'navy-tint': '#E9EFF8',        // quiet section fills

          /* ---- Neutrals ------------------------------------------------ */
          bg: '#F9F9F9',                 // off-white section background
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        // Wired to the CSS variable exposed by next/font/google in app/[locale]/layout.tsx
        sans: ['var(--font-nunito)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -4px rgba(15, 73, 147, 0.10)',
        lift: '0 18px 40px -12px rgba(15, 73, 147, 0.22)',
        cta: '0 10px 24px -8px rgba(255, 143, 0, 0.55)',
      },
      backgroundImage: {
        'paper-fade': 'linear-gradient(180deg, #FFFFFF 0%, #F9F9F9 100%)',
        'navy-fade': 'linear-gradient(160deg, #0F4993 0%, #0A3369 100%)',
        'orange-fade': 'linear-gradient(135deg, #FF8F00 0%, #D97A00 100%)',
      },
      borderRadius: { '4xl': '2rem' },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'accordion-down': {
          '0%': { maxHeight: '0', opacity: '0' },
          '100%': { maxHeight: '320px', opacity: '1' },
        },
        /* Track holds two identical copies of the slide set; shifting it left by
           exactly 50% lands copy 2 where copy 1 started, so the loop has no seam. */
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'accordion-down': 'accordion-down 0.28s ease-out',
        marquee: 'marquee 45s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
