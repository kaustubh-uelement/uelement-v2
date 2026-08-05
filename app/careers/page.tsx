import type { Metadata } from 'next';
import CareersClient from '@/components/careers/CareersClient';

export const metadata: Metadata = {
  title: 'Careers | UElement Technologies',
  description:
    'Do the work your family will brag about. Quantum-safe banking rails, autonomy that survives when the network dies, machines that keep nations running.',
};

export default function CareersPage() {
  return <CareersClient />;
}
