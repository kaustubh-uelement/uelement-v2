import Link from 'next/link';
import React from 'react';

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
}

export default function InsightCtaBand({
  kicker,
  heading,
  body,
  primaryAction,
  secondaryAction,
}: InsightCtaBandProps) {
  return (
    <div className="section alt !pt-12 !pb-20">
      <div className="wrap">
        <div
          className="card p-8 md:p-12 relative overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, rgba(7, 23, 57, 0.95) 0%, rgba(13, 36, 80, 0.95) 50%, rgba(22, 48, 104, 0.95) 100%)',
            border: '1px solid rgba(224, 167, 105, 0.35)',
            boxShadow: '0 18px 48px rgba(7, 23, 57, 0.6)',
          }}
        >
          {/* Subtle decorative glow */}
          <div
            className="absolute -right-20 -top-20 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(224, 167, 105, 0.15) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10 max-w-3xl">
            <div className="kicker mb-3">{kicker}</div>
            <h2
              className="display text-2xl md:text-3xl lg:text-4xl mb-4 font-bold"
              style={{ lineHeight: 1.15 }}
            >
              {heading}
            </h2>
            <p className="lede text-[15px] md:text-[16px] mb-8 leading-relaxed">
              {body}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href={primaryAction.href} className="btn btn-gold">
                {primaryAction.label}
              </Link>
              {secondaryAction && (
                <Link href={secondaryAction.href} className="btn btn-line">
                  {secondaryAction.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
