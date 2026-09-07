'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import type { SuccessStory, Industry } from '@/lib/insights/types';
import { INDUSTRY_LABEL, PROGRAM_LABEL } from '@/lib/insights/content';
import InsightFilterChips from './InsightFilterChips';
import NdaCallout from './NdaCallout';

const SECTORS: Industry[] = [
  'bfsi',
  'manufacturing',
  'defence',
  'government',
  'healthcare',
  'datacenter',
];

export default function StoriesClient({
  stories,
}: {
  stories: SuccessStory[];
}) {
  const [selectedSector, setSelectedSector] = useState<Industry | 'all'>('all');

  const filteredStories = useMemo(() => {
    if (selectedSector === 'all') return stories;
    return stories.filter((s) => s.industry === selectedSector);
  }, [stories, selectedSector]);

  const filterOptions = [
    { value: 'all' as const, label: 'All Sectors' },
    ...SECTORS.filter((sector) =>
      stories.some((s) => s.industry === sector)
    ).map((sector) => ({
      value: sector,
      label: INDUSTRY_LABEL[sector],
    })),
  ];

  return (
    <div className="section alt">
      <div className="wrap">
        {/* Filter Bar */}
        <InsightFilterChips
          legend="Filter by Industry Sector"
          options={filterOptions}
          value={selectedSector}
          onChange={setSelectedSector}
          countLabel={`Showing ${filteredStories.length} of ${stories.length} stories`}
        />

        {/* Stories Listing Grid */}
        <div className="flex flex-col gap-8">
          {filteredStories.map((story) => (
            <article
              key={story.slug}
              className="card !p-6 md:!p-10 transition-all duration-300 hover:border-[rgba(224,167,105,0.4)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Metric Display Column */}
                <div className="lg:col-span-3 flex flex-col justify-start">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="tag mb-0">
                      {INDUSTRY_LABEL[story.industry]}
                    </span>
                  </div>
                  <div
                    className="font-serif text-[clamp(44px,5vw,68px)] font-normal text-[var(--gold-500)] leading-none mb-3"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {story.figure}
                  </div>
                  <p className="text-[12.5px] text-[#8a9bb3] leading-snug max-w-[24ch]">
                    {story.figureCaption}
                  </p>
                </div>

                {/* Narrative Column */}
                <div className="lg:col-span-9 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs font-mono text-[var(--gold-500)] mb-2">
                      <span>{PROGRAM_LABEL[story.program]}</span>
                      {story.products[0] && (
                        <>
                          <span>·</span>
                          <span className="uppercase text-[#8a9bb3]">
                            {story.products.join(' · ')}
                          </span>
                        </>
                      )}
                      <span>·</span>
                      <span className="text-[#8a9bb3]">{story.client}</span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold font-hero text-white mb-4 hover:text-[var(--gold-500)] transition-colors">
                      {story.caseStudySlug ? (
                        <Link href={`/case-studies/${story.caseStudySlug}`}>
                          {story.headline}
                        </Link>
                      ) : (
                        <Link href={`/stories/${story.slug}`}>
                          {story.headline}
                        </Link>
                      )}
                    </h3>

                    <p className="text-[#c5d0dc] text-[14.5px] leading-relaxed mb-6">
                      {story.summary}
                    </p>

                    {/* Customer Quote */}
                    {story.quote && (
                      <blockquote className="border-l-2 border-[var(--gold-500)] pl-4 py-1 my-4 bg-[rgba(224,167,105,0.04)] rounded-r-md">
                        <p className="italic text-[#f3e7d3] text-[14px] leading-relaxed m-0">
                          &ldquo;{story.quote.text}&rdquo;
                        </p>
                        <footer className="text-xs font-mono text-[#8a9bb3] mt-2">
                          — {story.quote.attribution}
                        </footer>
                      </blockquote>
                    )}
                  </div>

                  {/* Tags & Action Link */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 mt-4 border-t border-[rgba(255,255,255,0.06)]">
                    <div className="flex flex-wrap gap-2">
                      {story.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono text-[#8a9bb3] px-2.5 py-1 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div>
                      {story.caseStudySlug ? (
                        <Link
                          href={`/case-studies/${story.caseStudySlug}`}
                          className="text-xs font-mono text-[var(--gold-500)] hover:underline inline-flex items-center gap-1.5 font-semibold"
                        >
                          Read technical dossier <span>→</span>
                        </Link>
                      ) : (
                        <Link
                          href={`/stories/${story.slug}`}
                          className="text-xs font-mono text-[var(--gold-500)] hover:underline inline-flex items-center gap-1.5 font-semibold"
                        >
                          View story details <span>→</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {filteredStories.length === 0 && (
            <div className="card text-center py-16">
              <p className="text-[#8a9bb3] text-[15px] mb-4">
                No public stories match the selected industry sector.
              </p>
              <p className="text-sm text-[#c5d0dc] mb-6">
                Most client engagements in this sector remain under NDA. Contact
                us directly to arrange an authorized reference conversation.
              </p>
              <Link href="/contact" className="btn btn-gold">
                Request confidential references
              </Link>
            </div>
          )}
        </div>

        {/* NDA & Governance Callout */}
        <NdaCallout />
      </div>
    </div>
  );
}
