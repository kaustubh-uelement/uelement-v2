'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import type {
  CaseStudy,
  Deployment,
  Industry,
  Program,
} from '@/lib/insights/types';
import {
  DEPLOYMENT_LABEL,
  INDUSTRY_LABEL,
  PROGRAM_LABEL,
} from '@/lib/insights/content';
import NdaCallout from './NdaCallout';

export default function CaseStudyClient({ items }: { items: CaseStudy[] }) {
  const [selectedProgram, setSelectedProgram] = useState<Program | 'all'>(
    'all'
  );
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | 'all'>(
    'all'
  );
  const [selectedDeployment, setSelectedDeployment] = useState<
    Deployment | 'all'
  >('all');

  const visible = useMemo(
    () =>
      items.filter(
        (c) =>
          (selectedProgram === 'all' || c.program === selectedProgram) &&
          (selectedIndustry === 'all' || c.industry === selectedIndustry) &&
          (selectedDeployment === 'all' || c.deployment === selectedDeployment)
      ),
    [items, selectedProgram, selectedIndustry, selectedDeployment]
  );

  const programs = Array.from(new Set(items.map((c) => c.program)));
  const industries = Array.from(new Set(items.map((c) => c.industry)));
  const deployments = Array.from(new Set(items.map((c) => c.deployment)));

  const clearFilters = () => {
    setSelectedProgram('all');
    setSelectedIndustry('all');
    setSelectedDeployment('all');
  };

  const hasActiveFilters =
    selectedProgram !== 'all' ||
    selectedIndustry !== 'all' ||
    selectedDeployment !== 'all';

  return (
    <div className="section alt">
      <div className="wrap">
        {/* Multi-Faceted Filter Rails */}
        <div className="card !p-6 mb-8 border border-[rgba(255,255,255,0.08)] bg-[#071739]/80">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Program Filter */}
            <div>
              <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--gold-500)] font-heading block mb-2">
                Program
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedProgram('all')}
                  className={`text-xs px-3 py-1 rounded-full transition-all cursor-pointer ${
                    selectedProgram === 'all'
                      ? 'bg-[var(--gold-500)] text-[#101010] font-semibold'
                      : 'bg-[#232223] text-[#c5d0dc] border border-[rgba(255,255,255,0.1)] hover:border-[var(--gold-500)]'
                  }`}
                >
                  All
                </button>
                {programs.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setSelectedProgram(p)}
                    className={`text-xs px-3 py-1 rounded-full transition-all cursor-pointer ${
                      selectedProgram === p
                        ? 'bg-[var(--gold-500)] text-[#101010] font-semibold'
                        : 'bg-[#232223] text-[#c5d0dc] border border-[rgba(255,255,255,0.1)] hover:border-[var(--gold-500)]'
                    }`}
                  >
                    {PROGRAM_LABEL[p]}
                  </button>
                ))}
              </div>
            </div>

            {/* Industry Filter */}
            <div>
              <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--gold-500)] font-heading block mb-2">
                Industry
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedIndustry('all')}
                  className={`text-xs px-3 py-1 rounded-full transition-all cursor-pointer ${
                    selectedIndustry === 'all'
                      ? 'bg-[var(--gold-500)] text-[#101010] font-semibold'
                      : 'bg-[#232223] text-[#c5d0dc] border border-[rgba(255,255,255,0.1)] hover:border-[var(--gold-500)]'
                  }`}
                >
                  All
                </button>
                {industries.map((i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedIndustry(i)}
                    className={`text-xs px-3 py-1 rounded-full transition-all cursor-pointer ${
                      selectedIndustry === i
                        ? 'bg-[var(--gold-500)] text-[#101010] font-semibold'
                        : 'bg-[#232223] text-[#c5d0dc] border border-[rgba(255,255,255,0.1)] hover:border-[var(--gold-500)]'
                    }`}
                  >
                    {INDUSTRY_LABEL[i].split('&')[0].trim()}
                  </button>
                ))}
              </div>
            </div>

            {/* Deployment Filter */}
            <div>
              <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--gold-500)] font-heading block mb-2">
                Deployment
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedDeployment('all')}
                  className={`text-xs px-3 py-1 rounded-full transition-all cursor-pointer ${
                    selectedDeployment === 'all'
                      ? 'bg-[var(--gold-500)] text-[#101010] font-semibold'
                      : 'bg-[#232223] text-[#c5d0dc] border border-[rgba(255,255,255,0.1)] hover:border-[var(--gold-500)]'
                  }`}
                >
                  All
                </button>
                {deployments.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDeployment(d)}
                    className={`text-xs px-3 py-1 rounded-full transition-all cursor-pointer ${
                      selectedDeployment === d
                        ? 'bg-[var(--gold-500)] text-[#101010] font-semibold'
                        : 'bg-[#232223] text-[#c5d0dc] border border-[rgba(255,255,255,0.1)] hover:border-[var(--gold-500)]'
                    }`}
                  >
                    {DEPLOYMENT_LABEL[d]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 mt-4 border-t border-[rgba(255,255,255,0.06)]">
            <span className="text-xs font-mono text-[#8a9bb3]">
              Showing {visible.length} of {items.length} engineering dossiers
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-mono text-[var(--gold-500)] hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Dossiers List */}
        <div className="flex flex-col gap-8">
          {visible.map((c) => (
            <article
              key={c.slug}
              className="card !p-6 md:!p-8 transition-all duration-300 hover:border-[rgba(224,167,105,0.4)]"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[var(--gold-500)] tracking-wider">
                    {c.reference}
                  </span>
                  <span className="tag mb-0">{PROGRAM_LABEL[c.program]}</span>
                  <span className="text-xs font-mono text-[#8a9bb3] px-2.5 py-0.5 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)]">
                    {DEPLOYMENT_LABEL[c.deployment]}
                  </span>
                </div>
                <span className="text-xs text-[#8a9bb3] font-mono">
                  {INDUSTRY_LABEL[c.industry]}
                </span>
              </div>

              {/* Title & Standfirst */}
              <h3 className="text-xl md:text-2xl font-bold font-hero text-white mb-2 hover:text-[var(--gold-500)] transition-colors">
                <Link href={`/case-studies/${c.slug}`}>{c.title}</Link>
              </h3>
              <p className="text-[#c5d0dc] text-[14.5px] leading-relaxed mb-6">
                {c.standfirst}
              </p>

              {/* Situation / Intervention / Result Spine */}
              <div className="grid grid-cols-1 md:grid-cols-3 rounded-lg overflow-hidden border border-[rgba(255,255,255,0.08)] mb-6 bg-[rgba(7,23,57,0.4)]">
                <div className="p-4 md:border-r border-[rgba(255,255,255,0.08)] border-b md:border-b-0">
                  <span className="text-[10.5px] font-heading font-bold uppercase tracking-[0.14em] text-[#8a9bb3] block mb-1.5">
                    Situation
                  </span>
                  <p className="text-xs leading-relaxed text-[#c5d0dc] m-0">
                    {c.spine.situation}
                  </p>
                </div>

                <div className="p-4 md:border-r border-[rgba(255,255,255,0.08)] border-b md:border-b-0">
                  <span className="text-[10.5px] font-heading font-bold uppercase tracking-[0.14em] text-[#8a9bb3] block mb-1.5">
                    Intervention
                  </span>
                  <p className="text-xs leading-relaxed text-[#c5d0dc] m-0">
                    {c.spine.intervention}
                  </p>
                </div>

                <div className="p-4 bg-[rgba(224,167,105,0.08)]">
                  <span className="text-[10.5px] font-heading font-bold uppercase tracking-[0.14em] text-[var(--gold-500)] block mb-1.5">
                    Result
                  </span>
                  <p className="text-xs leading-relaxed text-[#f3e7d3] m-0 font-medium">
                    {c.spine.result}
                  </p>
                </div>
              </div>

              {/* Metrics Quick Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] mb-6">
                {c.metrics.map((m) => (
                  <div key={m.label} className="text-left">
                    <div className="font-serif text-xl md:text-2xl text-[var(--gold-500)] font-normal">
                      {m.value}
                    </div>
                    <div className="text-[11px] text-[#8a9bb3] leading-tight mt-1">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer row: Tags and Link */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                <div className="flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono text-[#8a9bb3] px-2.5 py-0.5 rounded bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/case-studies/${c.slug}`}
                  className="text-xs font-mono text-[var(--gold-500)] hover:underline inline-flex items-center gap-1.5 font-semibold"
                >
                  Read full engineering dossier <span>→</span>
                </Link>
              </div>
            </article>
          ))}

          {visible.length === 0 && (
            <div className="card text-center py-16">
              <p className="text-[#8a9bb3] text-[15px] mb-4">
                No case studies match that combination of criteria.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="btn btn-gold text-sm"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Confidentiality Callout */}
        <NdaCallout />
      </div>
    </div>
  );
}
