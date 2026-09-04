import Link from 'next/link';
import React from 'react';

export interface Breadcrumb {
  label: string;
  href?: string;
}

interface InsightHeroProps {
  breadcrumbs: Breadcrumb[];
  kicker: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  lede: React.ReactNode;
  actions?: React.ReactNode;
  compact?: boolean;
}

export default function InsightHero({
  breadcrumbs,
  kicker,
  title,
  subtitle,
  lede,
  actions,
  compact = false,
}: InsightHeroProps) {
  return (
    <div
      className={`hero hero-half ${compact ? '!min-h-0 !max-h-none !py-16 md:!py-24' : ''}`}
    >
      <div className="hero-art">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/u92-flower.png" alt="" aria-hidden="true" />
      </div>
      <div className="hero-fabric" />

      <div className="wrap relative z-10">
        <div className="crumb">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {crumb.href ? (
                <Link href={crumb.href}>{crumb.label}</Link>
              ) : (
                <span>{crumb.label}</span>
              )}
              {idx < breadcrumbs.length - 1 && ' / '}
            </React.Fragment>
          ))}
        </div>

        <div className="kicker">{kicker}</div>

        <h1
          className="display"
          style={{
            fontSize: 'var(--text-display)',
            maxWidth: '24ch',
          }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className="serif-line"
            style={{ fontSize: 'clamp(18px, 2.2vw, 24px)', marginTop: 12 }}
          >
            {subtitle}
          </p>
        )}

        <p className="lede" style={{ marginTop: subtitle ? 14 : 20 }}>
          {lede}
        </p>

        {actions && (
          <div
            style={{
              display: 'flex',
              gap: 14,
              flexWrap: 'wrap',
              marginTop: 32,
            }}
          >
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
