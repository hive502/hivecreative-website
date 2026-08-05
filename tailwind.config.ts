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
          orange: '#E88310',
          'orange-dark': '#C96D06',
          'orange-light': '#FBB35C',
          'orange-tint': '#FEF4E8',
          navy: '#2B3C5A',
          'navy-dark': '#1E2B42',
          'navy-light': '#4A5E80',
          'navy-tint': '#EEF1F6',
          paper: '#F9F9F9',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        // Wired to the CSS variable exposed by next/font/google in app/layout.tsx
        sans: ['var(--font-nunito)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -4px rgba(43, 60, 90, 0.10)',
        lift: '0 18px 40px -12px rgba(43, 60, 90, 0.22)',
        cta: '0 10px 24px -8px rgba(232, 131, 16, 0.55)',
      },
      backgroundImage: {
        'paper-fade': 'linear-gradient(180deg, #FFFFFF 0%, #F9F9F9 100%)',
        'navy-fade': 'linear-gradient(160deg, #2B3C5A 0%, #1E2B42 100%)',
        'orange-fade': 'linear-gradient(135deg, #E88310 0%, #C96D06 100%)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'accordion-down': {
          '0%': { maxHeight: '0', opacity: '0' },
          '100%': { maxHeight: '320px', opacity: '1' },
        },
        /* The track holds two identical copies of the slide set side by side.
           Shifting it left by exactly 50% lands copy 2 where copy 1 started, so the
           loop restarts with no visible jump. */
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
