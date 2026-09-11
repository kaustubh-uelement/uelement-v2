import type { Metadata } from 'next';
import AnkuraLandscapePosterClient from '@/components/AnkuraLandscapePosterClient';

export const metadata: Metadata = {
  title: 'StamBH Ankura: We Build Bridges | UElement',
  description:
    'One platform. One data plane. Every experience connected. Ankura unifies your people, data and experiences on a single fabric; so the business can spend its energy on growth, not on integration.',
  alternates: {
    canonical: '/ankura/poster/landscape',
  },
  openGraph: {
    title: 'StamBH Ankura: We Build Bridges | Architecture Poster',
    description:
      'One platform. One data plane. Every experience connected. Ankura unifies your people, data and experiences on a single fabric; so the business can spend its energy on growth, not on integration.',
    url: 'https://uelement.in/ankura/poster/landscape',
    images: [
      {
        url: '/ue-ankura-og-image.png',
        width: 1200,
        height: 630,
        alt: 'StamBH Ankura: We Build Bridges',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StamBH Ankura: We Build Bridges | Architecture Poster',
    description:
      'One platform. One data plane. Every experience connected. Ankura unifies your people, data and experiences on a single fabric; so the business can spend its energy on growth, not on integration.',
    images: ['/ue-ankura-og-image.png'],
  },
};

export default function AnkuraLandscapePosterPage() {
  return <AnkuraLandscapePosterClient />;
}
