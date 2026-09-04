import type { Metadata } from 'next';
import AnkuraClient from '@/components/AnkuraClient';

export const metadata: Metadata = {
  title: 'Ankura · The Enterprise Digital Fabric · StamBH by UElement',
  description:
    'Ankura connects digital experiences, workflows, data and intelligence into one unified, always-on digital fabric.',
};

export default function AnkuraPage() {
  return <AnkuraClient />;
}
