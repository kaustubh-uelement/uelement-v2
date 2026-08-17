import type { Metadata } from 'next';
import VizorClient from '@/components/VizorClient';

export const metadata: Metadata = {
  title: 'Vizor | One Platform. Seven Dimensions. Zero Blind Spots. | UElement',
  description:
    'Unified observability, security and compliance fabric for enterprise IT and industrial OT.',
};

export default function VizorPage() {
  return <VizorClient />;
}
