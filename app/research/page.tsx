import type { Metadata } from 'next';
import Link from 'next/link';
import InsightHero from '@/components/insights/InsightHero';
import ResearchClient from '@/components/insights/ResearchClient';
import InsightCtaBand from '@/components/insights/InsightCtaBand';
import { getPublications } from '@/lib/insights/content';

export const metadata: Metadata = {
  title: 'Research & Publications | UElement Technologies',
  description:
    'Peer-reviewed papers, preprints, technical notes, and standards contributions from the UElement research group. Open access, zero lead-capture walls.',
  alternates: { canonical: '/research' },
  openGraph: {
    title: 'Research & Publications | UElement Technologies',
    description:
      'Scientific contributions advancing post-quantum cryptography, edge mesh consensus, and continuous compliance verification.',
    url: 'https://uelement.in/research',
    images: ['/ue-website-og-image.png'],
  },
};

export default function ResearchPage() {
  const publications = getPublications();

  return (
    <>
      <InsightHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Company', href: '/company' },
          { label: 'Research' },
        ]}
        kicker="Research Publishing"
        title={
          <>
            What we discovered,{' '}
            <span className="au">proven in peer review</span>.
          </>
        }
        subtitle="Peer-reviewed papers, preprints, technical notes, and standards contributions."
        lede="Everything here is open-access under Creative Commons Attribution. Download papers, copy BibTeX citations, and explore reference implementations without forms or paywalls."
        actions={
          <>
            <Link href="/contact" className="btn btn-gold">
              Contact research group
            </Link>
            <Link href="/case-studies" className="btn btn-line">
              See applied case studies
            </Link>
          </>
        }
      />

      <ResearchClient items={publications} />

      <InsightCtaBand
        kicker="Open Access Philosophy"
        heading={
          <>
            Every paper is <span className="au">free to read and cite</span>.
          </>
        }
        body="No registration walls, no lead capture gates on PDF downloads. If our mathematical proofs, protocol parsers, or architecture models advance your mission, we believe open science serves sovereign resilience best."
        primaryAction={{
          label: 'Inquire about research collaborations',
          href: '/contact',
        }}
        secondaryAction={{
          label: 'See applied case studies',
          href: '/case-studies',
        }}
      />
    </>
  );
}
