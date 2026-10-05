import type { Metadata } from 'next';
import {
  Montserrat,
  Noto_Sans,
  Reddit_Sans,
  Roboto_Mono,
  DM_Serif_Text,
} from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SiteScript from '@/components/SiteScript';

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
  metadataBase: new URL('https://uelement.in'),
  title: 'UElement: Quantum-safe security and enterprise platforms',
  description:
    'UElement is a DeepTech company in Pune, India. We help banks, insurers and critical infrastructure move to quantum-safe cryptography, and we run the digital front door of growing companies on the MainSTAY platform.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Quantum-safe security and the MainSTAY platform · UElement',
    description:
      'UElement is a DeepTech company in Pune, India. We help banks, insurers and critical infrastructure move to quantum-safe cryptography, and we run the digital front door of growing companies on the MainSTAY platform.',
    url: 'https://uelement.in/',
    siteName: 'UElement',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://uelement.in/og.png',
        width: 1200,
        height: 630,
        alt: 'UElement: Sovereign DeepTech for the systems that cannot fail.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quantum-safe security and the MainSTAY platform · UElement',
    description:
      'UElement is a DeepTech company in Pune, India. We help banks, insurers and critical infrastructure move to quantum-safe cryptography, and we run the digital front door of growing companies on the MainSTAY platform.',
    images: ['https://uelement.in/og.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-IN"
      className={`${redditSans.variable} ${montserrat.variable} ${notoSans.variable} ${robotoMono.variable} ${dmSerifText.variable}`}
    >
      <head>
        <meta name="theme-color" content="#0D1A34" />
        <meta name="color-scheme" content="light" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <SiteScript />
      </body>
    </html>
  );
}
