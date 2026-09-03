'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { teamMembers, advisors } from '@/lib/team';
import LinkedInIcon from '@/components/ui/LinkedInIcon';
import { useState } from 'react';

const GlobalOperationsGlobe = dynamic(
  () => import('@/components/company/GlobalOperationsGlobe'),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          width: '100%',
          maxWidth: 1120,
          height: 'clamp(320px, 48vh, 600px)',
          margin: '24px auto 0',
          background: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#8b5e3c',
          fontSize: 14,
        }}
      >
        Loading Global Operations Map...
      </div>
    ),
  }
);

function TeamCard({ member }: { member: (typeof teamMembers)[0] }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="card team">
      <div className={`tphoto${imgError ? ' noimg' : ''}`}>
        {!imgError && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.photo}
            alt={member.name}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}
        <span className="tinit">{member.initials}</span>
      </div>
      <div className="trow">
        <h4>{member.name}</h4>
        <a
          className="li"
          href={member.linkedIn}
          target="_blank"
          rel="noopener"
          aria-label={`${member.name} on LinkedIn`}
        >
          <LinkedInIcon />
        </a>
      </div>
      <p className="mono" style={{ color: 'var(--gold-500)', marginBottom: 8 }}>
        {member.title}
      </p>
      <p>{member.description}</p>
    </div>
  );
}

export default function CompanyPage() {
  return (
    <>
      <div className="hero hero-half">
        <div className="hero-art">
          <img src="/u92-flower.png" alt="" aria-hidden="true" />
        </div>
        <div className="hero-fabric" />
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link> / Company / About Us
          </div>
          <div className="kicker">About Us</div>
          <h1 className="display" style={{ fontSize: 'var(--text-display)' }}>
            UElement Technologies.
          </h1>
          <p className="serif-line" style={{ fontSize: 22, marginTop: 10 }}>
            Sovereign platforms for the quantum decade.
          </p>
          <p className="lede" style={{ marginTop: 22 }}>
            UElement Technologies Private Limited is a deeptech company
            headquartered in Pune, India, with offices in Singapore and the UAE,
            operating globally. We build the platforms critical enterprises and
            nations depend on when the stakes are absolute.
          </p>
        </div>
      </div>

      {/* Mission + Vision */}
      <div className="section alt">
        <div className="wrap grid2" style={{ alignItems: 'start' }}>
          <div>
            <div className="kicker">Mission</div>
            <h2
              className="display"
              style={{
                fontSize: 28,
                color: 'var(--ink-800)',
              }}
            >
              Make critical systems sovereign, quantum-safe, and self-healing.
            </h2>
            <p className="mut" style={{ marginTop: 16 }}>
              Every platform we ship answers to the operator who runs it, never
              to a mandatory external dependency. That is what sovereignty means
              in engineering terms, and it is the thread through everything we
              build.
            </p>
          </div>
          <div>
            <div className="kicker">Vision</div>
            <h2
              className="display"
              style={{
                fontSize: 28,
                color: 'var(--ink-800)',
              }}
            >
              The trusted deeptech partner of the quantum decade.
            </h2>
            <p className="mut" style={{ marginTop: 16 }}>
              As quantum computing rewrites the rules of security and autonomy
              rewrites the rules of operations, we intend to be the partner that
              critical sectors: defence, banking, industry, government. We
              intend to be their trusted partner when the transition arrives.
            </p>
          </div>
        </div>
      </div>

      {/* Beliefs */}
      <div className="section">
        <div className="wrap">
          <div className="kicker">What we believe</div>
          <div className="grid4" style={{ marginTop: 26 }}>
            <div className="card">
              <h4>Sovereignty is a feature</h4>
              <p>
                Air-gap first. No mandatory external dependency. Your
                infrastructure answers to you.
              </p>
            </div>
            <div className="card">
              <h4>The quantum transition is now</h4>
              <p>
                Harvest-now-decrypt-later means the migration clock started
                years ago.
              </p>
            </div>
            <div className="card">
              <h4>Evidence over assertion</h4>
              <p>
                Compliance and trust should be generated continuously as
                operational exhaust.
              </p>
            </div>
            <div className="card">
              <h4>Resilience by construction</h4>
              <p>
                Systems should degrade predictably and heal autonomously. They
                must not fail loudly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership */}
      <div className="section navy">
        <div className="wrap">
          <div className="kicker">Leadership</div>
          <h2 className="display" style={{ fontSize: 30 }}>
            The Team.
          </h2>
          <p className="lede" style={{ marginTop: 14 }}>
            Operators, engineers, and researchers who have chosen to build where
            failure is not an option.
          </p>
          <div className="grid3" style={{ marginTop: 38 }}>
            {teamMembers.map((member) => (
              <TeamCard member={member} key={member.name} />
            ))}
          </div>

          <div style={{ marginTop: 44 }}>
            <div className="kicker">Advisors</div>
            <div className="grid3" style={{ marginTop: 18 }}>
              {advisors.map((advisor) => (
                <div className="card" key={advisor.name}>
                  <div className="trow">
                    <h4>{advisor.name}</h4>
                    <a
                      className="li"
                      href={advisor.linkedIn}
                      target="_blank"
                      rel="noopener"
                      aria-label={`${advisor.name} on LinkedIn`}
                    >
                      <LinkedInIcon />
                    </a>
                  </div>
                  <p>{advisor.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Global Operations */}
      <div className="section cream">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="kicker">Global Operations</div>
          </div>

          {/* Globe and Map Animation */}
          <GlobalOperationsGlobe />

          {/* Enterprise Fabric countries */}
          <div
            style={{
              marginTop: 20,
              marginLeft: 'auto',
              marginRight: 'auto',
              maxWidth: 860,
              textAlign: 'center',
            }}
          >
            <p
              style={{
                margin: '0 auto 12px',
                fontSize: 13,
                fontWeight: 600,
                color: '#2a1408',
                letterSpacing: '0.01em',
                textAlign: 'center',
              }}
            >
              Delivering Sovereignty Globally.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px 10px',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {[
                'UAE',
                'Singapore',
                'Malaysia',
                'USA',
                'Netherlands',
                'Australia',
                'Hongkong',
                'South Africa',
                'Vietnam',
                'Saudi Arabia',
                'France',
                'Germany',
                'Denmark',
                'United Kingdom',
                'Canada',
                'Mauritius',
              ].map((country) => (
                <div key={country} className="country-tag">
                  {country}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              marginTop: 24,
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Link href="/careers" className="btn btn-gold">
              Join the team
            </Link>
            <Link href="/contact" className="btn btn-line">
              Talk to us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
