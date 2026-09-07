import type { Metadata } from 'next';
import Link from 'next/link';
import InsightHero from '@/components/insights/InsightHero';
import CaseStudyClient from '@/components/insights/CaseStudyClient';
import InsightCtaBand from '@/components/insights/InsightCtaBand';
import { getCaseStudies } from '@/lib/insights/content';

export const metadata: Metadata = {
  title: 'Case Studies | UElement Technologies',
  description:
    'Full technical accounts of UElement deployments: what we built, what constrained it, and what it costs to run across banking, manufacturing, defence, and healthcare.',
  alternates: { canonical: '/case-studies' },
  openGraph: {
    title: 'Case Studies | UElement Technologies',
    description:
      'Engineering dossiers documenting production deployments, architectural constraints, and measured outcomes.',
    url: 'https://uelement.in/case-studies',
    images: ['/ue-website-og-image.png'],
  },
};

export default function CaseStudiesPage() {
  const studies = getCaseStudies();

  return (
    <>
      <InsightHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Company', href: '/company' },
          { label: 'Case Studies' },
        ]}
        kicker="Case Studies"
        title={
          <>
            The <span className="au">Engineering Record</span>.
          </>
        }
        subtitle="Dossiers of what we deployed, what constrained it, and what it costs to run."
        lede="Full technical accounts written for the enterprise architect and security lead who must defend the operational decision, not the executive who merely approves it."
        actions={
          <>
            <Link href="/contact" className="btn btn-gold">
              Inquire about your estate
            </Link>
            <Link href="/research" className="btn btn-line">
              Read scientific publications
            </Link>
          </>
        }
      />

      <CaseStudyClient items={studies} />

      <InsightCtaBand
        kicker="Strict Non-Disclosure"
        heading={
          <>
            Published work is a fraction of our{' '}
            <span className="au">deployed footprint</span>.
          </>
        }
        body="If your specific sector or exact regulatory regime is not represented here, it is usually because client security protocols restrict public publication. We can arrange confidential technical briefings on request."
        primaryAction={{
          label: 'Request a technical briefing',
          href: '/contact',
        }}
        secondaryAction={{
          label: 'Explore research publications',
          href: '/research',
        }}
      />
    </>
  );
}
