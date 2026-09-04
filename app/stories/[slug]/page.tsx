import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import InsightHero from '@/components/insights/InsightHero';
import InsightCtaBand from '@/components/insights/InsightCtaBand';
import NdaCallout from '@/components/insights/NdaCallout';
import {
  successStories,
  getStory,
  INDUSTRY_LABEL,
  PROGRAM_LABEL,
} from '@/lib/insights/content';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return successStories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const s = getStory(slug);
  if (!s) return {};
  return {
    title: `${s.headline} | UElement Success Story`,
    description: s.summary,
    alternates: { canonical: `/stories/${s.slug}` },
  };
}

export default async function StoryDetailPage({ params }: Params) {
  const { slug } = await params;
  const s = getStory(slug);
  if (!s) notFound();

  return (
    <>
      <InsightHero
        compact
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Success Stories', href: '/stories' },
          { label: s.client },
        ]}
        kicker={`${INDUSTRY_LABEL[s.industry]} · ${PROGRAM_LABEL[s.program]}`}
        title={s.headline}
        lede={s.summary}
      />

      <div className="section alt">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Main Column */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              {/* Highlight Metric Card */}
              <div className="card !p-8 md:!p-10">
                <span className="tag mb-4">Measured Impact</span>
                <div
                  className="font-serif text-[clamp(52px,6vw,84px)] text-[var(--gold-500)] leading-none mb-3"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {s.figure}
                </div>
                <p className="text-[#8a9bb3] text-sm md:text-base leading-relaxed">
                  {s.figureCaption}
                </p>

                <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-[rgba(255,255,255,0.08)]">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono text-[#c5d0dc] px-3 py-1 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quote Card */}
              {s.quote && (
                <div className="card !p-8 border-l-4 !border-l-[var(--gold-500)]">
                  <blockquote className="m-0">
                    <p className="text-[#f3e7d3] text-lg md:text-xl italic font-serif leading-relaxed mb-4">
                      &ldquo;{s.quote.text}&rdquo;
                    </p>
                    <footer className="text-sm font-mono text-[var(--gold-500)]">
                      — {s.quote.attribution}, {s.client}
                    </footer>
                  </blockquote>
                </div>
              )}

              {/* Cross link to case study if exists */}
              {s.caseStudySlug && (
                <div className="card !p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono text-[var(--gold-500)] block mb-1">
                      Technical Deep Dive Available
                    </span>
                    <h4 className="text-white text-base font-bold m-0">
                      Looking for the complete architecture and deployment
                      dossier?
                    </h4>
                  </div>
                  <Link
                    href={`/case-studies/${s.caseStudySlug}`}
                    className="btn btn-gold text-sm whitespace-nowrap self-start sm:self-auto"
                  >
                    Read case study
                  </Link>
                </div>
              )}

              {/* NDA Callout */}
              <NdaCallout />
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
              <div className="card !p-6">
                <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-[var(--gold-500)] mb-4">
                  Engagement Overview
                </h4>

                <div className="flex flex-col text-sm divide-y divide-[rgba(255,255,255,0.06)]">
                  <div className="py-2.5 flex justify-between gap-4">
                    <span className="text-[#8a9bb3]">Client</span>
                    <span className="text-white font-medium text-right">
                      {s.client}
                    </span>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <span className="text-[#8a9bb3]">Industry</span>
                    <span className="text-white font-medium text-right">
                      {INDUSTRY_LABEL[s.industry]}
                    </span>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <span className="text-[#8a9bb3]">Program</span>
                    <span className="text-white font-medium text-right">
                      {PROGRAM_LABEL[s.program]}
                    </span>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <span className="text-[#8a9bb3]">Deployment</span>
                    <span className="text-white font-medium text-right">
                      {s.deployment.toUpperCase()}
                    </span>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <span className="text-[#8a9bb3]">Products</span>
                    <span className="text-[var(--gold-500)] font-mono text-xs uppercase text-right">
                      {s.products.join(', ')}
                    </span>
                  </div>
                </div>

                <div className="pt-6 mt-4 flex flex-col gap-3">
                  <Link
                    href="/contact"
                    className="btn btn-gold text-center text-sm"
                  >
                    Request reference call
                  </Link>
                  <Link
                    href="/stories"
                    className="btn btn-line text-center text-sm"
                  >
                    Back to all stories
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <InsightCtaBand
        kicker="Next Steps"
        heading={
          <>
            See what our platforms deliver in{' '}
            <span className="au">your sector</span>.
          </>
        }
        body="Every production deployment begins with the specific engineering or regulatory constraint you cannot design around. Tell us yours."
        primaryAction={{
          label: 'Talk to an architect',
          href: '/contact',
        }}
        secondaryAction={{
          label: 'Explore all stories',
          href: '/stories',
        }}
      />
    </>
  );
}
