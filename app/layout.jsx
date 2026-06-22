import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import NewsletterPopup from '@/components/NewsletterPopup';
import ThemeScript from '@/components/ThemeScript';
import { BRAND } from '@/lib/copy';
import { asset } from '@/lib/asset';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  style: ['normal', 'italic'],
});

export const metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://fabians-tours.vercel.app'),
  title: {
    default: 'Oceanic Ventures — Transformational Water Retreats',
    template: '%s · Oceanic Ventures',
  },
  description:
    'The Atlantis Call — transformational retreats rooted in the wisdom of water. Freediving, somatics, ritual, and sacred Egypt journeys, held by a small devoted crew.',
  keywords: ['transformational retreats', 'water retreats', 'freediving retreat', 'somatic water therapy', 'Egypt sacred journeys', 'Red Sea retreat', 'dolphin retreat'],
  openGraph: {
    title: 'Oceanic Ventures — Transformational Water Retreats',
    description: 'Answer the Atlantis Call. Transformational retreats through sea, river, temple, and desert.',
    type: 'website',
    siteName: BRAND.name,
  },
  twitter: { card: 'summary_large_image', title: 'Oceanic Ventures — Transformational Water Retreats' },
  icons: { icon: asset('/favicon.svg') },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0e0c0a' },
    { media: '(prefers-color-scheme: light)', color: '#f4ecda' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <a href="#main" className="sr-only">Skip to content</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <NewsletterPopup />
      </body>
    </html>
  );
}
