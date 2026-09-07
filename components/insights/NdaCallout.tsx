import Link from 'next/link';
import React from 'react';
import type { Program } from '@/lib/insights/content';

interface NdaCalloutProps {
  className?: string;
  program?: Program;
}

export default function NdaCallout({
  className = '',
  program = 'stambh',
}: NdaCalloutProps) {
  const isStambh = program === 'stambh';

  return (
    <div
      className={`mt-12 md:mt-16 p-6 sm:p-8 md:p-10 relative overflow-hidden ${className}`}
      style={{
        border: '2px solid transparent',
        backgroundImage:
          'linear-gradient(154.11deg, #071739 15%, #0c1c42 60%, #08132f 100%), conic-gradient(from 140deg, #c88a3e 0%, #e0a769 18%, #fcefdc 28%, #e0a769 38%, #b87930 50%, #c88a3e 62%, #e0a769 74%, #fcefdc 82%, #e0a769 90%, #c88a3e 100%)',
        backgroundClip: 'padding-box, border-box',
        backgroundOrigin: 'padding-box, border-box',
        borderRadius: '20px',
        boxShadow:
          '0 16px 48px rgba(7, 23, 57, 0.6), 0 2px 18px rgba(224, 167, 105, 0.15)',
      }}
    >
      {/* Subtle corner ambient glows */}
      <div
        className="absolute -right-20 -top-20 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(224, 167, 105, 0.12) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(39, 65, 147, 0.2) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10">
        {/* Top Header Badge & Security Standard */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="tag inline-flex items-center gap-2 !mb-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e0a769] animate-pulse" />
            <span>Confidentiality & Non-Disclosure Assurance</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[11px] font-mono text-[#8a9bb3]">
            <svg
              className="w-3.5 h-3.5 text-[var(--gold-500)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span>Bilateral MNDA Standard</span>
          </div>
        </div>

        {/* Title */}
        <h3
          className="display text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 leading-tight"
          style={{
            fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
          }}
        >
          Client identities held under{' '}
          <span className="au">strict non-disclosure.</span>
        </h3>

        {/* Serif line */}
        <p
          className="serif-line text-sm sm:text-base mb-4"
          style={{ fontSize: 'clamp(15px, 1.4vw, 18px)', marginTop: '4px' }}
        >
          {isStambh
            ? 'StamBH · Enterprise integrity protocol'
            : 'AdviQ · Sovereign assurance protocol'}
        </p>

        {/* Body */}
        <p className="text-[#c5d0dc] text-[14px] sm:text-[15px] leading-relaxed max-w-3xl mb-8">
          Every metric published across our engineering dossiers was generated
          by the client’s own operational instrumentation, reviewed jointly
          under bilateral NDA, and cleared for anonymised release. Technical
          architecture blueprints and direct peer reference calls with
          engineering leadership are available to verified counterparties under
          matching NDA terms.
        </p>

        {/* 3 Pillars of Assurance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div
            className="p-4 sm:p-5 rounded-xl flex flex-col transition-all duration-300 hover:border-[rgba(224,167,105,0.4)]"
            style={{
              background: 'rgba(7, 23, 57, 0.65)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(224, 167, 105, 0.2)',
            }}
          >
            <div className="text-[11px] font-mono font-bold text-[var(--gold-500)] uppercase tracking-wider mb-1.5">
              01 &middot; Operational Exhaust
            </div>
            <div className="text-sm font-bold text-white mb-1.5">
              Direct Telemetry
            </div>
            <p className="text-xs text-[#8a9bb3] leading-relaxed m-0">
              Production performance figures captured directly from client cloud
              monitoring and verified against SLA targets.
            </p>
          </div>

          <div
            className="p-4 sm:p-5 rounded-xl flex flex-col transition-all duration-300 hover:border-[rgba(224,167,105,0.4)]"
            style={{
              background: 'rgba(7, 23, 57, 0.65)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(224, 167, 105, 0.2)',
            }}
          >
            <div className="text-[11px] font-mono font-bold text-[var(--gold-500)] uppercase tracking-wider mb-1.5">
              02 &middot; Peer Reference Calls
            </div>
            <div className="text-sm font-bold text-white mb-1.5">
              Executive Verification
            </div>
            <p className="text-xs text-[#8a9bb3] leading-relaxed m-0">
              Direct peer briefings with enterprise CTO, VP Engineering, or
              Security leadership arranged under bilateral non-disclosure.
            </p>
          </div>

          <div
            className="p-4 sm:p-5 rounded-xl flex flex-col transition-all duration-300 hover:border-[rgba(224,167,105,0.4)]"
            style={{
              background: 'rgba(7, 23, 57, 0.65)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(224, 167, 105, 0.2)',
            }}
          >
            <div className="text-[11px] font-mono font-bold text-[var(--gold-500)] uppercase tracking-wider mb-1.5">
              03 &middot; Cleared Dossiers
            </div>
            <div className="text-sm font-bold text-white mb-1.5">
              Architecture Blueprints
            </div>
            <p className="text-xs text-[#8a9bb3] leading-relaxed m-0">
              Unredacted component topologies, schema definitions, and migration
              playbooks available for qualified in-house review.
            </p>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="pt-6 border-t border-[rgba(255,255,255,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-xs text-[#8a9bb3]">
            <svg
              className="w-4 h-4 text-[var(--gold-500)] shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span>
              Mutual Non-Disclosure Agreement (MNDA) executed within 24 business
              hours.
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="btn btn-gold text-xs sm:text-sm whitespace-nowrap"
            >
              Request reference call
            </Link>
            <Link
              href="/company"
              className="btn btn-line text-xs sm:text-sm whitespace-nowrap"
            >
              Enterprise governance
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
