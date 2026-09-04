import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import InsightHero from '@/components/insights/InsightHero';
import InsightCtaBand from '@/components/insights/InsightCtaBand';
import CopyButton from '@/components/insights/CopyButton';
import {
  publications,
  getPublication,
  citationLine,
  KIND_LABEL,
  PROGRAM_LABEL,
} from '@/lib/insights/content';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publications.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getPublication(slug);
  if (!p) return {};

  return {
    title: `${p.title} | UElement Research`,
    description: p.abstract.slice(0, 300),
    alternates: { canonical: `/research/${p.slug}` },
    other: {
      citation_title: p.title,
      citation_author: [...p.authors, ...(p.externalAuthors ?? [])].join('; '),
      citation_publication_date: p.publishedAt,
      citation_journal_title: p.venue,
      citation_pdf_url: p.pdf.href,
      ...(p.doi ? { citation_doi: p.doi } : {}),
    },
  };
}

export default async function PublicationDetailPage({ params }: Params) {
  const { slug } = await params;
  const p = getPublication(slug);
  if (!p) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: p.title,
    author: [...p.authors, ...(p.externalAuthors ?? [])].map((name) => ({
      '@type': 'Person',
      name,
    })),
    datePublished: p.publishedAt,
    publisher: {
      '@type': 'Organization',
      name: 'UElement Technologies Private Limited',
    },
    abstract: p.abstract,
    ...(p.doi ? { identifier: `https://doi.org/${p.doi}` } : {}),
  };

  const formattedCitation = citationLine(p);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <InsightHero
        compact
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Research', href: '/research' },
          { label: p.id },
        ]}
        kicker={`${KIND_LABEL[p.kind]}${p.program ? ` · ${PROGRAM_LABEL[p.program]}` : ''}`}
        title={p.title}
        lede={
          <>
            {[...p.authors, ...(p.externalAuthors ?? [])].join(', ')} ·{' '}
            <span className="text-[var(--gold-500)]">{p.venue}</span>
          </>
        }
      />

      <div className="section alt">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Main Column */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              {/* Abstract Card */}
              <div className="card !p-8 md:!p-10">
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-[var(--gold-500)] block mb-3">
                  Scientific Abstract
                </span>
                <h3 className="text-white text-xl font-bold mb-4 font-hero">
                  Overview & Methodology
                </h3>
                <p className="text-[#c5d0dc] text-[15.5px] leading-relaxed m-0">
                  {p.abstract}
                </p>
              </div>

              {/* Citation & BibTeX Card */}
              <div className="card !p-8">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-xs font-heading font-bold uppercase tracking-wider text-[var(--gold-500)]">
                    Citation & Indexing
                  </span>
                  <CopyButton
                    label="Copy BibTeX"
                    copiedLabel="BibTeX copied!"
                    textToCopy={p.bibtex}
                  />
                </div>

                <div className="p-4 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] mb-6">
                  <span className="text-[11px] font-mono uppercase text-[#8a9bb3] block mb-1">
                    Standard Citation
                  </span>
                  <p className="text-sm font-mono text-[#f3e7d3] leading-relaxed m-0">
                    {formattedCitation}
                  </p>
                </div>

                <div className="relative">
                  <span className="text-[11px] font-mono uppercase text-[#8a9bb3] block mb-2">
                    BibTeX Entry
                  </span>
                  <pre className="p-4 rounded-lg bg-[#071739] border border-[rgba(255,255,255,0.1)] text-xs font-mono text-[#c5d0dc] overflow-x-auto leading-relaxed">
                    <code>{p.bibtex}</code>
                  </pre>
                </div>
              </div>

              {/* Practical Production Link */}
              <div className="card !p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-l-4 !border-l-[var(--gold-500)]">
                <div>
                  <span className="text-xs font-mono text-[var(--gold-500)] block mb-1">
                    Applied in Real-world Infrastructure
                  </span>
                  <h4 className="text-white text-base font-bold m-0">
                    This theoretical finding runs in active enterprise
                    production.
                  </h4>
                  <p className="text-xs text-[#8a9bb3] mt-1 m-0">
                    Discover how our engineering teams deployed these concepts
                    under real-world operational constraints.
                  </p>
                </div>
                <Link
                  href="/case-studies"
                  className="btn btn-gold text-xs whitespace-nowrap self-start sm:self-auto"
                >
                  Explore case studies
                </Link>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
              <div className="card !p-6">
                <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-[var(--gold-500)] mb-4">
                  Publication Access
                </h4>

                <div className="flex flex-col text-sm divide-y divide-[rgba(255,255,255,0.06)]">
                  <div className="py-2.5 flex justify-between gap-4">
                    <span className="text-[#8a9bb3]">Reference ID</span>
                    <span className="text-[var(--gold-500)] font-mono text-xs font-bold text-right">
                      {p.id}
                    </span>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <span className="text-[#8a9bb3]">Format</span>
                    <span className="text-white font-medium text-right">
                      {KIND_LABEL[p.kind]}
                    </span>
                  </div>
                  {p.doi && (
                    <div className="py-2.5 flex justify-between gap-4">
                      <span className="text-[#8a9bb3]">DOI</span>
                      <span className="text-[var(--gold-500)] font-mono text-xs text-right">
                        {p.doi}
                      </span>
                    </div>
                  )}
                  {p.arxivId && (
                    <div className="py-2.5 flex justify-between gap-4">
                      <span className="text-[#8a9bb3]">arXiv ID</span>
                      <span className="text-[var(--gold-500)] font-mono text-xs text-right">
                        {p.arxivId}
                      </span>
                    </div>
                  )}
                  <div className="py-2.5 flex justify-between gap-4">
                    <span className="text-[#8a9bb3]">Licence</span>
                    <span className="text-white font-medium text-right text-xs">
                      CC BY 4.0 (Open Access)
                    </span>
                  </div>
                  {p.codeHref && (
                    <div className="py-2.5 flex justify-between gap-4">
                      <span className="text-[#8a9bb3]">Source Code</span>
                      <a
                        href={p.codeHref}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[var(--gold-500)] text-xs hover:underline text-right"
                      >
                        GitHub Repository ↗
                      </a>
                    </div>
                  )}
                </div>

                <div className="pt-6 mt-4 flex flex-col gap-3">
                  <Link
                    href="/contact"
                    className="btn btn-gold text-center text-sm"
                  >
                    Inquire with researchers
                  </Link>
                  <Link
                    href="/research"
                    className="btn btn-line text-center text-sm"
                  >
                    All publications
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <InsightCtaBand
        kicker="Applied Sovereignty"
        heading={
          <>
            Science translated into{' '}
            <span className="au">battle-tested code</span>.
          </>
        }
        body="Our case studies document exactly where each of these scientific breakthroughs met concrete operational constraints, regulatory mandates, and enterprise latency budgets."
        primaryAction={{
          label: 'Read case studies',
          href: '/case-studies',
        }}
        secondaryAction={{
          label: 'All publications',
          href: '/research',
        }}
      />
    </>
  );
}
