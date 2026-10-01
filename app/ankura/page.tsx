import type { Metadata } from 'next';
import AnkuraClient from '@/components/AnkuraClient';

import { branding } from '@/lib/content/branding';
import { SITE_URL } from '@/lib/content/locales';

export const metadata: Metadata = {
  title: `${branding.stambh} ${branding.ankura} - Enterprise Digital Fabric | UElement`,
  description:
    `One platform. Every digital surface. ${branding.stambh} ${branding.ankura} runs your Websites, Portals, Careers, Partners and Support on a single fabric; Identity, Content, Workflow and AI included.`,
  openGraph: {
    title: `${branding.stambh} ${branding.ankura} - Enterprise Digital Fabric`,
    description:
      `One platform. Every digital surface. ${branding.stambh} ${branding.ankura} runs your Websites, Portals, Careers, Partners and Support on a single fabric; Identity, Content, Workflow and AI included.`,
    url: `${SITE_URL}/ankura`,
    images: [
      {
        url: '/ue-ankura-og-image.png',
        width: 1200,
        height: 630,
        alt: `${branding.stambh} ${branding.ankura} - Enterprise Digital Fabric`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${branding.stambh} ${branding.ankura} - Enterprise Digital Fabric`,
    description:
      `One platform. Every digital surface. ${branding.stambh} ${branding.ankura} runs your Websites, Portals, Careers, Partners and Support on a single fabric; Identity, Content, Workflow and AI included.`,
    images: ['/ue-ankura-og-image.png'],
  },
};

export default function AnkuraPage() {
  return <AnkuraClient />;
}
