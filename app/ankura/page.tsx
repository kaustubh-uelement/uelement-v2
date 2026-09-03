import type { Metadata } from 'next';
import AnkuraClient from '@/components/AnkuraClient';

export const metadata: Metadata = {
  title: 'Ankura — The Enterprise Digital Fabric — StamBH by UElement',
  description:
    'StamBH Ankura builds and runs every outward-facing digital surface an enterprise touches — web, mobile, search, workflows — on a first-class AI substrate.',
};

export default function AnkuraPage() {
  return <AnkuraClient />;
}
