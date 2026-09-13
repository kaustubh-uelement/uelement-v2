import type { Metadata } from 'next';
import VyuhScanner from '@/components/solutions/VyuhScanner';

export const metadata: Metadata = {
  title: 'Quantum Risk Assessment — Vyuh CBOM Scanner | UElement',
  description:
    'Point Vyuh at a website or code repository to generate a Cryptographic Bill of Materials (CBOM), quantify Shor and Grover exposure, and map your migration path to NIST FIPS 203/204/205.',
  alternates: { canonical: 'https://uelement.in/solutions/quantum' },
};

export default function SolutionsQuantumPage() {
  return <VyuhScanner />;
}
