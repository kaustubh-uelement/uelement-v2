import { branding } from "@/lib/content/branding";
import Link from 'next/link';
import React from 'react';
import type { Program } from '@/lib/insights/content';

interface InsightCtaBandProps {
  kicker: string;
  heading: React.ReactNode;
  body: React.ReactNode;
  primaryAction: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  program?: Program;
  subtitle?: React.ReactNode;
}

const getCommitments = (program?: Program) => {
  if (program === 'stambh') {
    return {
      title: `${branding.stambh} Delivery Commitments`,
      items: [
        '2-hour architecture mapping workshop',
        'Production-grade functional slice in 5 business days',
        '100% client-owned source code & assets; zero vendor lock-in',
        'Edge-native performance with zero proprietary runtime bloat',
      ],
      metricLabel: 'Typical delivery velocity',
      metricValue: '5 business days',
    };
  }
  if (program === 'adviq') {
    return {
      title: `${branding.adviq} Advisory Commitments`,
      items: [
        'Exhaustive Cryptographic Bill of Materials (CBOM)',
        'Post-quantum vulnerability exposure ranking',
        'Hardware-neutral algorithm assessment',
        'Phased migration roadmap with operational safeguards',
      ],
      metricLabel: 'Assessment rigor',
      metricValue: 'NIST & BSI aligned',
    };
  }
  if (program === 'tripura') {
    return {
      title: `${branding.tripura} Research Commitments`,
      items: [
        'Deterministic in-silico simulation models',
        'Pre-wet-lab target viability validation',
        'Transparent mathematical formulation & documentation',
        'Full data provenance and cryptographic auditability',
      ],
      metricLabel: 'Modeling fidelity',
      metricValue: 'Pre-clinical validated',
    };
  }
  return {
    title: 'Enterprise Advisory Commitments',
    items: [
      'Bilateral mutual NDA executed within 24 business hours',
      'Direct working sessions with senior principal architects',
      'Definitive technical evaluation with zero vendor lock-in',
      'Full architectural blueprints and operational transparency',
    ],
    metricLabel: 'Response window',
    metricValue: '< 24 hours',
  };
};

export default function InsightCtaBand({
  kicker,
  heading,
  body,
  primaryAction,
  secondaryAction,
  program,
  subtitle,
}: InsightCtaBandProps) {
  const commitments = getCommitments(program);

  return (
    <div className="section alt !pt-12 !pb-20">
      <div className="wrap">
        <div
          className="p-8 sm:p-10 md:p-12 relative overflow-hidden"
          style={{
            border: '2px solid transparent',
            backgroundImage:
              'linear-gradient(154.11deg, #071739 15%, #0c1c42 60%, #08132f 100%), conic-gradient(from 140deg, #c88a3e 0%, #e0a769 18%, #fcefdc 28%, #e0a769 38%, #b87930 50%, #c88a3e 62%, #e0a769 74%, #fcefdc 82%, #e0a769 90%, #c88a3e 100%)',
            backgroundClip: 'padding-box, border-box',
            backgroundOrigin: 'padding-box, border-box',
            borderRadius: '24px',
            boxShadow:
              '0 20px 54px rgba(7, 23, 57, 0.7), 0 4px 24px rgba(224, 167, 105, 0.2)',
          }}
        >
          {/* Subtle decorative corner glows */}
          <div
            className="absolute -right-24 -top-24 w-80 h-80 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(224, 167, 105, 0.16) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute -left-24 -bottom-24 w-80 h-80 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(39, 65, 147, 0.25) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading, Subtitle, Body, Buttons */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="tag mb-3 self-start">{kicker}</div>
              <h2
                className="display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2"
                style={{ lineHeight: 1.18 }}
              >
                {heading}
              </h2>
              {subtitle && (
                <p
                  className="serif-line text-sm sm:text-base mb-4"
                  style={{
                    fontSize: 'clamp(15px, 1.4vw, 18px)',
                    marginTop: '4px',
                  }}
                >
                  {subtitle}
                </p>
              )}
              <div className="text-[#c5d0dc] text-[15px] md:text-[16px] mb-8 leading-relaxed max-w-2xl">
                {body}
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={primaryAction.href}
                  className="btn btn-gold text-sm sm:text-base"
                >
                  {primaryAction.label}
                </Link>
                {secondaryAction && (
                  <Link
                    href={secondaryAction.href}
                    className="btn btn-line text-sm sm:text-base"
                  >
                    {secondaryAction.label}
                  </Link>
                )}
              </div>
            </div>

            {/* Right Column: Advisory Commitment Micro-Card */}
            <div className="lg:col-span-5">
              <div
                className="p-6 sm:p-7 rounded-2xl flex flex-col gap-4"
                style={{
                  background: 'rgba(7, 23, 57, 0.65)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(224, 167, 105, 0.25)',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="flex items-center justify-between pb-3 border-b border-[rgba(255,255,255,0.08)]">
                  <span className="text-xs font-heading font-bold uppercase tracking-wider text-[var(--gold-500)]">
                    {commitments.title}
                  </span>
                  <span className="text-[11px] font-mono text-[#8a9bb3]">
                    Guaranteed
                  </span>
                </div>
                <ul className="flex flex-col gap-3 m-0 p-0 list-none">
                  {commitments.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#c5d0dc] leading-relaxed"
                    >
                      <span className="text-[var(--gold-500)] font-bold shrink-0 mt-0.5">
                        ◆
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-xs">
                  <span className="text-[#8a9bb3]">
                    {commitments.metricLabel}
                  </span>
                  <span className="text-[var(--gold-500)] font-mono font-bold">
                    {commitments.metricValue}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
