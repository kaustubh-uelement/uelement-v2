import type { Metadata } from 'next';
import StambhClient from './StambhClient';

export const metadata: Metadata = {
  title:
    'UElement - StamBH | Enterprise Digital Fabric for Managing, Monitoring and Building the next big Company',
  description:
    'a single platform governing Digital touchpoints, Internal operations and Physical assets with unified Identity, RBAC and Audit..',
  openGraph: {
    title:
      'UElement - StamBH | Enterprise Digital Fabric for Managing, Monitoring and Building the next big Company',
    description:
      'a single platform governing Digital touchpoints, Internal operations and Physical assets with unified Identity, RBAC and Audit..',
    images: [
      {
        url: '/ue-stambh-og-image.png',
        width: 1200,
        height: 630,
        alt: 'UElement - StamBH | Enterprise Digital Fabric for Managing, Monitoring and Building the next big Company',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'UElement - StamBH | Enterprise Digital Fabric for Managing, Monitoring and Building the next big Company',
    description:
      'a single platform governing Digital touchpoints, Internal operations and Physical assets with unified Identity, RBAC and Audit..',
    images: ['/ue-stambh-og-image.png'],
  },
};

export default function MainstayPage() {
  return <StambhClient />;
}
