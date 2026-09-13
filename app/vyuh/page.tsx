import type { Metadata } from 'next';
import VyuhScanner from '@/components/solutions/VyuhScanner';

export const metadata: Metadata = {
  title: 'Vyuh — Quantum CBOM Scanner | UElement',
  description:
    'Point Vyuh at a website or code repository to generate a Cryptographic Bill of Materials (CBOM), quantify Shor and Grover exposure, and map your migration path to NIST FIPS 203/204/205.',
  alternates: { canonical: 'https://uelement.in/vyuh' },
  openGraph: {
    title: 'Vyuh — Quantum CBOM Scanner | UElement',
    description:
      'Point Vyuh at a website or repository to generate a Cryptographic Bill of Materials (CBOM) and map your migration path to NIST FIPS 203, 204, and 205.',
    url: 'https://uelement.in/vyuh',
    siteName: 'UElement',
    images: [
      {
        url: '/ue-website-og-image.png',
        width: 1200,
        height: 630,
        alt: 'Vyuh Quantum CBOM Scanner - UElement AdviQ',
      },
    ],
  },
};

export default function VyuhPage() {
  return <VyuhScanner />;
}
