import type { Metadata } from 'next';
import VuyhRedirectClient from './RedirectClient';

export const metadata: Metadata = {
  title: 'Redirecting to Vyuh | UElement',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://uelement.in/vyuh',
  },
  other: {
    refresh: '0; url=/vyuh',
  },
};

export default function VuyhRedirectPage() {
  return <VuyhRedirectClient />;
}
