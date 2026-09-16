import type { Metadata } from 'next';
import VyuhScanner from '@/components/solutions/VyuhScanner';

export const metadata: Metadata = {
  title: 'VyUH: Quantum CBOM Scanner & Readiness Assessment | UElement',
  description:
    'Point VyUH at a website or code repository to generate a Cryptographic Bill of Materials (CBOM), quantify Shor and Grover exposure, and map your migration path to NIST FIPS 203, 204, and 205.',
  alternates: { canonical: 'https://uelement.in/vuyh' },
  openGraph: {
    title: 'VyUH: Quantum CBOM Scanner & Readiness Assessment | UElement',
    description:
      'Point VyUH at a website or repository to generate a Cryptographic Bill of Materials (CBOM) and map your migration path to NIST FIPS 203, 204, and 205.',
    url: 'https://uelement.in/vuyh',
    siteName: 'UElement',
    images: [
      {
        url: '/ue-website-og-image.png',
        width: 1200,
        height: 630,
        alt: 'VyUH Quantum CBOM Scanner - UElement AdviQ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VyUH: Quantum CBOM Scanner & Readiness Assessment | UElement',
    description:
      'Every certificate, cipher, and key your stack depends on. VyUH lays out the formation. NIST FIPS 203/204/205 compliant.',
    images: ['/ue-website-og-image.png'],
  },
};

export default function VuyhPage() {
  return <VyuhScanner />;
}
