import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import InsightHero from '@/components/insights/InsightHero';
import InsightCtaBand from '@/components/insights/InsightCtaBand';
import NdaCallout from '@/components/insights/NdaCallout';
import {
  caseStudies,
  getCaseStudy,
  getPublicationsByIds,
  INDUSTRY_LABEL,
  PROGRAM_LABEL,
  DEPLOYMENT_LABEL,
} from '@/lib/insights/content';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: `${cs.title} | UElement Case Study`,
    description: cs.standfirst,
    alternates: { canonical: `/case-studies/${cs.slug}` },
  };
}

export default async function CaseStudyDetailPage({ params }: Params) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const relatedPubs = getPublicationsByIds(cs.relatedPublicationIds);

  return (
    <>
      <InsightHero
        compact
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Case Studies', href: '/case-studies' },
          { label: cs.reference },
        ]}
        kicker={`${INDUSTRY_LABEL[cs.industry]} · ${PROGRAM_LABEL[cs.program]} · ${DEPLOYMENT_LABEL[cs.deployment]}`}
        title={cs.title}
        lede={cs.standfirst}
      />

      <div className="section alt">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Main Dossier Content */}
            <div className="lg:col-span-8 flex flex-col gap-10">
              {/* High-Impact Metrics Grid */}
              <div className="card !p-6 md:!p-8">
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-[var(--gold-500)] block mb-4">
                  Operational Metrics
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {cs.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col">
                      <div
                        className="font-serif text-3xl md:text-4xl text-[var(--gold-500)] font-normal mb-1.5"
                        style={{ letterSpacing: '-0.02em' }}
                      >
                        {m.value}
                      </div>
                      <div className="text-xs text-[#8a9bb3] leading-snug">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Sections */}
              <div className="card !p-8 md:!p-10 flex flex-col gap-8">
                {cs.sections.map((section, idx) => (
                  <div
                    key={section.heading}
                    className={
                      idx > 0
                        ? 'pt-8 border-t border-[rgba(255,255,255,0.08)]'
                        : ''
                    }
                  >
                    <h3 className="text-xl md:text-2xl font-bold font-hero text-white mb-4">
                      {section.heading}
                    </h3>
                    <div className="flex flex-col gap-4 text-[#c5d0dc] text-[15px] leading-relaxed">
                      {section.content.map((p, pIdx) => (
                        <p key={pIdx} className="m-0">
                          {p}
                        </p>
                      ))}
                    </div>

                    {section.bullets && section.bullets.length > 0 && (
                      <ul className="mt-4 mb-0 pl-0 flex flex-col gap-2.5 list-none">
                        {section.bullets.map((bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className="flex items-start gap-3 text-sm text-[#c5d0dc] leading-relaxed"
                          >
                            <span className="text-[var(--gold-500)] font-bold">
                              —
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {/* Related Research Papers */}
              {relatedPubs.length > 0 && (
                <div className="card !p-8">
                  <span className="text-xs font-heading font-bold uppercase tracking-wider text-[var(--gold-500)] block mb-3">
                    Underlying Scientific Research
                  </span>
                  <h4 className="text-white text-lg font-bold mb-4">
                    Publications behind this deployment
                  </h4>
                  <div className="flex flex-col gap-4">
                    {relatedPubs.map((pub) => (
                      <div
                        key={pub.id}
                        className="p-4 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2 text-xs font-mono text-[var(--gold-500)] mb-1">
                            <span>{pub.id}</span>
                            <span>·</span>
                            <span className="text-[#8a9bb3]">{pub.venue}</span>
                          </div>
                          <Link
                            href={`/research/${pub.slug}`}
                            className="text-white font-semibold text-sm hover:text-[var(--gold-500)] transition-colors"
                          >
                            {pub.title}
                          </Link>
                        </div>
                        <Link
                          href={`/research/${pub.slug}`}
                          className="text-xs font-mono text-[var(--gold-500)] shrink-0 hover:underline inline-flex items-center gap-1"
                        >
                          View Paper <span>→</span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Confidentiality Notice */}
              <NdaCallout program={cs.program} />
            </div>

            {/* Sidebar Facts */}
            <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
              <div className="card !p-6">
                <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-[var(--gold-500)] mb-4">
                  Engagement Dossier Facts
                </h4>

                <div className="flex flex-col text-sm divide-y divide-[rgba(255,255,255,0.06)]">
                  <div className="py-2.5 flex justify-between gap-4">
                    <span className="text-[#8a9bb3]">Reference</span>
                    <span className="text-[var(--gold-500)] font-mono text-xs font-bold text-right">
                      {cs.reference}
                    </span>
                  </div>
                  {cs.facts.map((fact) => (
                    <div
                      key={fact.key}
                      className="py-2.5 flex justify-between gap-4"
                    >
                      <span className="text-[#8a9bb3]">{fact.key}</span>
                      <span className="text-white font-medium text-right text-xs md:text-sm">
                        {fact.value}
                      </span>
                    </div>
                  ))}
                  <div className="py-2.5 flex justify-between gap-4">
                    <span className="text-[#8a9bb3]">Industry</span>
                    <span className="text-white font-medium text-right">
                      {INDUSTRY_LABEL[cs.industry]}
                    </span>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <span className="text-[#8a9bb3]">Deployment</span>
                    <span className="text-white font-medium text-right">
                      {DEPLOYMENT_LABEL[cs.deployment]}
                    </span>
                  </div>
                </div>

                <div className="pt-6 mt-4 flex flex-col gap-3">
                  <Link
                    href="/contact"
                    className="btn btn-gold text-center text-sm"
                  >
                    Request full dossier
                  </Link>
                  <Link
                    href="/case-studies"
                    className="btn btn-line text-center text-sm"
                  >
                    All case studies
                  </Link>
                </div>
              </div>

              {/* Cross link to related story if exists */}
              {cs.relatedStorySlug && (
                <div className="card !p-6">
                  <span className="text-xs font-mono text-[var(--gold-500)] block mb-1">
                    Executive Narrative
                  </span>
                  <h5 className="text-white font-bold text-sm mb-3">
                    Read the customer outcome summary
                  </h5>
                  <Link
                    href={`/stories/${cs.relatedStorySlug}`}
                    className="text-xs font-mono text-[var(--gold-500)] hover:underline inline-flex items-center gap-1 font-semibold"
                  >
                    View executive story <span>→</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <InsightCtaBand
        program={cs.program}
        kicker={
          cs.program === 'stambh'
            ? 'StamBH Deployment Advisory'
            : 'Strategic Advisory'
        }
        heading={
          cs.program === 'stambh' ? (
            <>
              Start small. Scale with <span className="au">confidence.</span>
            </>
          ) : (
            <>
              Start with the <span className="au">Inventory</span>, not the
              algorithm.
            </>
          )
        }
        subtitle={
          cs.program === 'stambh'
            ? 'StamBH · 2-hour workshop, 5 days to something live'
            : 'AdviQ · Post-Quantum Readiness Framework'
        }
        body={
          cs.program === 'stambh'
            ? 'Bring us one real digital presence or workflow challenge. In a 2-hour architecture session we map the integration topology, and within 5 business days we deliver a functional, tested slice in your environment. Zero lock-in, client-owned IP.'
            : 'A quantum risk assessment produces the definitive cryptographic bill of materials (CBOM) and empirical exposure ranking. Most organizations find the risk order substantially different from asset criticality.'
        }
        primaryAction={{
          label:
            cs.program === 'stambh'
              ? 'Schedule 2-hour architecture workshop'
              : 'Book a risk assessment',
          href: '/contact',
        }}
        secondaryAction={{
          label: 'Back to case studies',
          href: '/case-studies',
        }}
      />
    </>
  );
}
