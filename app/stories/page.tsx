import type { Metadata } from 'next';
import Link from 'next/link';
import InsightHero from '@/components/insights/InsightHero';
import StoriesClient from '@/components/insights/StoriesClient';
import InsightCtaBand from '@/components/insights/InsightCtaBand';
import { getStories } from '@/lib/insights/content';

export const metadata: Metadata = {
  title: 'Success Stories | UElement Technologies',
  description:
    'Measured outcomes from production deployments of AdviQ, StamBH and TRIpura across banking, industrial OT, defence, government and datacenter estates.',
  alternates: { canonical: '/stories' },
  openGraph: {
    title: 'Success Stories | UElement Technologies',
    description:
      'Verified outcomes our customers measured with their own instrumentation.',
    url: 'https://uelement.in/stories',
    images: ['/ue-website-og-image.png'],
  },
};

export default function StoriesPage() {
  const stories = getStories();

  return (
    <>
      <InsightHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Company', href: '/company' },
          { label: 'Success Stories' },
        ]}
        kicker="Success Stories"
        title={
          <>
            Measured in <span className="au">Outcomes</span>.
          </>
        }
        subtitle="Verified by client instrumentation, not vendor claims."
        lede="Thirteen enterprises and government agencies across four continents run mission-critical workloads on our platforms. These are the operational figures they measured."
        actions={
          <>
            <Link href="/contact" className="btn btn-gold">
              Scope a proof of value
            </Link>
            <Link href="/case-studies" className="btn btn-line">
              Read technical case studies
            </Link>
          </>
        }
      />

      <StoriesClient stories={stories} />

      <InsightCtaBand
        kicker="Start Somewhere Small"
        heading={
          <>
            Most engagements begin as a{' '}
            <span className="au">45-day proof of value</span>.
          </>
        }
        body="One critical journey, one plant floor, one cryptographic inventory. We scope the smallest operational engagement that produces a verified number you can defend before leadership."
        primaryAction={{
          label: 'Scope a proof of value',
          href: '/contact',
        }}
        secondaryAction={{
          label: 'Read case studies',
          href: '/case-studies',
        }}
      />
    </>
  );
}
