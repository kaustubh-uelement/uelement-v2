import type { Metadata } from 'next';
import {
  Montserrat,
  Noto_Sans,
  Reddit_Sans,
  Roboto_Mono,
  DM_Serif_Text,
} from 'next/font/google';
import './globals.css';
import Header from '@/components/ui/Header';
import Footer from '@/components/layout/FooterV2';
import SplashScreen from '@/components/ui/SplashScreen';
import { SITE_URL } from '@/lib/content/locales';

const redditSans = Reddit_Sans({
  subsets: ['latin'],
  variable: '--font-reddit-sans-loaded',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat-loaded',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const notoSans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto-sans-loaded',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono-loaded',
  weight: ['400', '500'],
  display: 'swap',
});

const dmSerifText = DM_Serif_Text({
  subsets: ['latin'],
  variable: '--font-dm-serif-loaded',
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title:
    'UElement Technologies | Building Sovereign DeepTech & Quantum Secure Enterprise Fabric',
  description:
    'a Global DeepTech company engineering Quantum-safe security, Autonomous systems and Enterprise-scale digital infrastructure.',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en-IN': 'https://uelement.in',
      'en': 'https://uelement.co',
      'x-default': 'https://uelement.co',
    },
  },
  openGraph: {
    title:
      'UElement Technologies | Building Sovereign DeepTech & Quantum Secure Enterprise Fabric',
    description:
      'a Global DeepTech company engineering Quantum-safe security, Autonomous systems and Enterprise-scale digital infrastructure.',
    url: SITE_URL,
    siteName: 'UElement',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/ue-website-og-image.png',
        width: 1200,
        height: 630,
        alt: 'UElement Technologies | Building Sovereign DeepTech & Quantum Secure Enterprise Fabric',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UElement Technologies',
    description: 'Sovereign deeptech for the systems that cannot fail.',
    images: ['/ue-website-og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${redditSans.variable} ${montserrat.variable} ${notoSans.variable} ${robotoMono.variable} ${dmSerifText.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <SplashScreen />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
