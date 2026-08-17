import type { Metadata } from 'next';
import KayakClient from '@/components/KayakClient';

export const metadata: Metadata = {
  title: 'Kayak | Everything as a Service | UElement',
  description:
    'Every physical asset, inventory unit, cubic foot of space, and unit of movement becomes a metered, queryable, blockchain-verified service.',
};

export default function KayakPage() {
  return <KayakClient />;
}
