import type { Metadata } from 'next';
import NexusClient from '@/components/NexusClient';

export const metadata: Metadata = {
  title: 'Nexus — The Enterprise Digital Fabric — MainSTAY by UElement',
  description:
    'MainSTAY Nexus builds and runs every outward-facing digital surface an enterprise touches — web, mobile, search, workflows — on a first-class AI substrate.',
};

export default function NexusPage() {
  return <NexusClient />;
}
