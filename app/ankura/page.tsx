import type { Metadata } from 'next';
import AnkuraClient from '@/components/AnkuraClient';

export const metadata: Metadata = {
  title: 'StamBH Ankura - Enterprise Digital Fabric | UElement',
  description:
    'One platform. Every digital surface. StamBH Ankura runs your Websites, Portals, Careers, Partners and Support on a single fabric; Identity, Content, Workflow and AI included.',
  openGraph: {
    title: 'StamBH Ankura - Enterprise Digital Fabric',
    description:
      'One platform. Every digital surface. StamBH Ankura runs your Websites, Portals, Careers, Partners and Support on a single fabric; Identity, Content, Workflow and AI included.',
    url: 'https://uelement.in/ankura',
    images: [
      {
        url: '/ue-ankura-og-image.png',
        width: 1200,
        height: 630,
        alt: 'StamBH Ankura - Enterprise Digital Fabric',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StamBH Ankura - Enterprise Digital Fabric',
    description:
      'One platform. Every digital surface. StamBH Ankura runs your Websites, Portals, Careers, Partners and Support on a single fabric; Identity, Content, Workflow and AI included.',
    images: ['/ue-ankura-og-image.png'],
  },
};

export default function AnkuraPage() {
  return <AnkuraClient />;
}
