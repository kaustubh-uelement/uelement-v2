'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Publication, PublicationKind } from '@/lib/insights/types';
import { KIND_LABEL, PROGRAM_LABEL } from '@/lib/insights/content';
import InsightFilterChips from './InsightFilterChips';
import CopyButton from './CopyButton';

const KIND_ORDER: PublicationKind[] = [
  'peer-reviewed',
  'preprint',
  'whitepaper',
  'technical-note',
  'standards',
];

export default function ResearchClient({ items }: { items: Publication[] }) {
  const [selectedKind, setSelectedKind] = useState<PublicationKind | 'all'>(
    'all'
  );

  const visible = useMemo(
    () =>
      selectedKind === 'all'
        ? items
        : items.filter((p) => p.kind === selectedKind),
    [items, selectedKind]
  );

  const filterOptions = [
    { value: 'all' as const, label: 'All Publications' },
    ...KIND_ORDER.filter((k) => items.some((p) => p.kind === k)).map((k) => ({
      value: k,
      label: KIND_LABEL[k],
    })),
  ];

  return (
    <div className="section alt">
      <div className="wrap">
        {/* Filter Bar */}
        <InsightFilterChips
          legend="Filter by Publication Type"
          options={filterOptions}
          value={selectedKind}
          onChange={setSelectedKind}
          countLabel={`Showing ${visible.length} of ${items.length} publications`}
        />

        {/* Papers Listing Grid */}
        <div className="flex flex-col gap-8">
          {visible.map((pub) => {
            const year = new Date(pub.publishedAt).getFullYear();
            const month = new Date(pub.publishedAt).toLocaleString('en-US', {
              month: 'short',
            });

            return (
              <article
                key={pub.id}
                className="card !p-6 md:!p-8 transition-all duration-300 hover:border-[rgba(224,167,105,0.4)]"
              >
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-[var(--gold-500)] tracking-wider">
                      {pub.id}
                    </span>
                    <span className="tag mb-0">{KIND_LABEL[pub.kind]}</span>
                    {pub.program && (
                      <span className="text-xs font-mono text-[#8a9bb3] px-2.5 py-0.5 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)]">
                        {PROGRAM_LABEL[pub.program]}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[#8a9bb3] font-mono">
                    {month} {year}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold font-hero text-white mb-2 hover:text-[var(--gold-500)] transition-colors">
                  <Link href={`/research/${pub.slug}`}>{pub.title}</Link>
                </h3>

                {/* Authors */}
                <p className="text-sm text-[#8a9bb3] mb-1">
                  <span className="text-white font-medium">
                    {pub.authors.join(', ')}
                  </span>
                  {pub.externalAuthors && pub.externalAuthors.length > 0 && (
                    <span className="text-[#a4b5c4] italic">
                      , {pub.externalAuthors.join(', ')} (external)
                    </span>
                  )}
                </p>

                {/* Venue & IDs */}
                <p className="text-xs font-mono text-[var(--gold-500)] mb-4">
                  {pub.venue}
                  {pub.doi && <span> · doi:{pub.doi}</span>}
                  {pub.arxivId && <span> · arXiv:{pub.arxivId}</span>}
                  {pub.underReview && (
                    <span className="text-amber-400 font-sans">
                      {' '}
                      · Under Review
                    </span>
                  )}
                </p>

                {/* Abstract Accordion */}
                <details className="group mb-6 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg p-4 transition-colors">
                  <summary className="cursor-pointer text-xs font-heading font-semibold uppercase tracking-wider text-[var(--gold-500)] select-none list-none flex items-center justify-between">
                    <span>Abstract</span>
                    <span className="text-sm transition-transform group-open:rotate-180">
                      ▾
                    </span>
                  </summary>
                  <p className="text-[#c5d0dc] text-[13.5px] leading-relaxed mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)] m-0">
                    {pub.abstract}
                  </p>
                </details>

                {/* Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/research/${pub.slug}`}
                      className="text-xs font-mono text-[var(--gold-500)] hover:underline inline-flex items-center gap-1 font-semibold mr-2"
                    >
                      Read Publication <span>→</span>
                    </Link>

                    {pub.doi && (
                      <CopyButton
                        label="Copy DOI"
                        copiedLabel="DOI copied!"
                        textToCopy={pub.doi}
                      />
                    )}

                    {pub.arxivId && (
                      <CopyButton
                        label="Copy arXiv ID"
                        copiedLabel="arXiv ID copied!"
                        textToCopy={`arXiv:${pub.arxivId}`}
                      />
                    )}

                    <CopyButton
                      label="Copy BibTeX"
                      copiedLabel="BibTeX copied!"
                      textToCopy={pub.bibtex}
                    />

                    {pub.codeHref && (
                      <a
                        href={pub.codeHref}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-mono px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.18)] text-[#c5d0dc] hover:border-[var(--gold-500)] hover:text-white transition-colors"
                      >
                        Code Repository ↗
                      </a>
                    )}
                  </div>

                  <span className="text-xs font-mono text-[#8a9bb3]">
                    PDF · {pub.pdf.sizeLabel}
                  </span>
                </div>
              </article>
            );
          })}

          {visible.length === 0 && (
            <div className="card text-center py-16">
              <p className="text-[#8a9bb3] text-[15px] mb-4">
                No publications match this category.
              </p>
              <button
                type="button"
                onClick={() => setSelectedKind('all')}
                className="btn btn-gold text-sm"
              >
                Show all publications
              </button>
            </div>
          )}
        </div>

        {/* Academic Collaboration Callout */}
        <div
          className="card mt-12 p-6 md:p-8"
          style={{
            border: '1px solid rgba(224, 167, 105, 0.3)',
            background:
              'linear-gradient(154.11deg, rgba(12, 20, 45, 0.95) 20%, rgba(39, 65, 147, 0.4) 100%)',
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="tag slate mb-2">Research Program</div>
              <h4 className="text-white text-lg font-bold mb-2">
                Working on adjacent deeptech research?
              </h4>
              <p className="text-[#c5d0dc] text-[13.5px] leading-relaxed m-0">
                We actively collaborate with university laboratories and
                doctoral candidates in post-quantum cryptography, distributed
                consensus in tactical meshes, and industrial protocol analysis.
                Reach out with your research hypothesis.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/contact"
                className="btn btn-gold text-sm whitespace-nowrap"
              >
                Contact research group
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
