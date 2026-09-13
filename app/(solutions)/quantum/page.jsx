import VyuhScanner from '@/components/solutions/VyuhScanner';

export const metadata = {
  title: 'Vyuh — Quantum CBOM Scanner & Readiness Assessment | UElement',
  description:
    'Point Vyuh at a website or code repository to generate a Cryptographic Bill of Materials (CBOM), quantify Shor and Grover exposure, and map your migration path to NIST FIPS 203/204/205 in 90 seconds.',
  alternates: { canonical: 'https://uelement.in/solutions/quantum' },
  openGraph: {
    title: 'Vyuh — Quantum CBOM Scanner & Readiness Assessment | UElement',
    description:
      'Point Vyuh at a website or repository to generate a Cryptographic Bill of Materials (CBOM) and map your migration path to NIST FIPS 203, 204, and 205.',
    url: 'https://uelement.in/solutions/quantum',
    siteName: 'UElement',
    images: [
      {
        url: '/ue-website-og-image.png',
        width: 1200,
        height: 630,
        alt: 'Vyuh Quantum CBOM Scanner - UElement AdviQ',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vyuh — Quantum CBOM Scanner & Readiness Assessment | UElement',
    description:
      'Every certificate, cipher and key your stack depends on. Vyuh lays out the formation. NIST FIPS 203/204/205 compliant.',
    images: ['/ue-website-og-image.png'],
  },
};

export default function QuantumRiskAssessmentPage() {
  return <VyuhScanner />;
}
