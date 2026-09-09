import type { Metadata } from 'next';
import AnkuraPosterClient from '@/components/AnkuraPosterClient';

export const metadata: Metadata = {
  title: 'StamBH Ankura · Pitch Poster | UElement',
  description:
    'One platform for every outward-facing surface: website, careers, partners, help centre, plus Google and ChatGPT search.',
  alternates: {
    canonical: '/ankura/poster',
  },
  openGraph: {
    title: 'StamBH Ankura · Pitch Poster',
    description:
      'One platform for every outward-facing surface: website, careers, partners, help centre, plus Google and ChatGPT search.',
    url: 'https://uelement.in/ankura/poster',
    images: [
      {
        url: '/ue-ankura-og-image.png',
        width: 1200,
        height: 630,
        alt: 'StamBH Ankura · Pitch Poster',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StamBH Ankura · Pitch Poster',
    description:
      'One platform for every outward-facing surface: website, careers, partners, help centre, plus Google and ChatGPT search.',
    images: ['/ue-ankura-og-image.png'],
  },
};

export default function AnkuraPosterPage() {
  return <AnkuraPosterClient />;
}
