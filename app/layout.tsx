import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { site } from '@/lib/assets';

/**
 * Nunito — a rounded geometric sans that reads friendly without losing authority.
 * Exposed as a CSS variable so tailwind.config.ts can map it onto `font-sans`.
 * (Swap `Nunito` for `Quicksand` here and the whole site follows.)
 */
const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700', '800'],
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Hive Creative — Websites for Small Businesses, Without the Tech Headaches',
    template: '%s | Hive Creative',
  },
  description:
    'Done-for-you websites for small businesses and sole traders. Transparent upfront pricing from $499, plus an ongoing care plan so you never have to worry about maintenance, hosting, or updates.',
  keywords: [
    'small business website design',
    'website care plan',
    'sole trader website',
    'done-for-you websites',
    'website maintenance',
  ],
  openGraph: {
    title: 'A Professional Website That Brings You Customers — Without the Tech Headaches',
    description:
      'Transparent website packages from $499 with ongoing care built in. You run your business, we handle the website.',
    url: site.url,
    siteName: site.name,
    type: 'website',
  },
  icons: { icon: '/brand/logo-icon.png', apple: '/brand/logo-icon.png' },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]
                     focus:rounded-lg focus:bg-brand-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
