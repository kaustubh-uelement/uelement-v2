'use client';

import Link from 'next/link';
import { teamMembers, advisors } from '@/lib/team';
import LinkedInIcon from '@/components/ui/LinkedInIcon';
import { useState } from 'react';

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
            headquartered in Pune, India, with offices in Singapore and the UAE
            — operating globally. We build the platforms critical enterprises
            and nations depend on when the stakes are absolute.
          </p>
        </div>
      </div>

      {/* Mission + Vision */}
      <div className="section alt">
        <div className="wrap grid2" style={{ alignItems: 'start' }}>
          <div>
            <div className="kicker">Mission</div>
            <h2 className="display" style={{ fontSize: 28 }}>
              Make critical systems sovereign, quantum-safe, and self-healing.
            </h2>
            <p className="mut" style={{ marginTop: 16 }}>
              Every platform we ship answers to the operator who runs it — never
              to a mandatory external dependency. That is what sovereignty means
              in engineering terms, and it is the thread through everything we
              build.
            </p>
          </div>
          <div>
            <div className="kicker">Vision</div>
            <h2 className="display" style={{ fontSize: 28 }}>
              The trusted deeptech partner of the quantum decade.
            </h2>
            <p className="mut" style={{ marginTop: 16 }}>
              As quantum computing rewrites the rules of security and autonomy
              rewrites the rules of operations, we intend to be the partner that
              critical sectors — defence, banking, industry, government —
              already trust when the transition arrives.
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
                Systems should degrade predictably and heal autonomously — not
                fail loudly.
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
            The team.
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
                  <p>Advisor</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Global presence */}
      <div className="section cream">
        <div className="wrap">
          <div className="kicker">Global presence</div>
          <h2 className="display" style={{ fontSize: 28 }}>
            Three offices. One standard.
          </h2>
          <div className="grid3" style={{ marginTop: 30 }}>
            <div className="card">
              <h4>Pune, India</h4>
              <p>
                Global headquarters — engineering, research, and program
                leadership.
              </p>
            </div>
            <div className="card">
              <h4>Singapore</h4>
              <p>JAPAC operations and partnerships.</p>
            </div>
            <div className="card">
              <h4>UAE</h4>
              <p>Middle East operations and regional pursuits.</p>
            </div>
          </div>
          <div
            style={{
              marginTop: 36,
              display: 'flex',
              gap: 14,
              flexWrap: 'wrap',
              alignItems: 'center',
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
