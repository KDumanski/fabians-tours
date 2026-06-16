import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import ThemeScript from '@/components/ThemeScript';
import { BRAND } from '@/lib/copy';

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
  metadataBase: new URL('https://fabianstours.example'),
  title: {
    default: 'Oceanic Ventures — Sacred Egypt Journeys',
    template: '%s · Oceanic Ventures',
  },
  description:
    'Luxury sacred journeys through ancient Egypt — pyramids, the Nile, Luxor temples, and the Red Sea. Small groups, deep transformation, unforgettable wonder.',
  keywords: ['Egypt tours', 'luxury Egypt travel', 'Nile cruise', 'pyramids', 'Red Sea diving', 'Luxor', 'sacred Egypt journeys'],
  openGraph: {
    title: 'Oceanic Ventures — Sacred Egypt Journeys',
    description: 'Answer the call of ancient Egypt. Luxury sacred journeys through desert, river, temple, and sea.',
    type: 'website',
    siteName: BRAND.name,
  },
  twitter: { card: 'summary_large_image', title: 'Oceanic Ventures — Sacred Egypt Journeys' },
  icons: { icon: '/favicon.svg' },
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
      </body>
    </html>
  );
}
