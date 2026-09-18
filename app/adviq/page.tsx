import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UElement - AdviQ | Securing Enterprises for the Quantum decade',
  description:
    'a Quantum Security Program guiding enterprises to Discover, Prioritize and Migrate cryptography for Quantum resilience.',
  openGraph: {
    title: 'UElement - AdviQ | Securing Enterprises for the Quantum decade',
    description:
      'a Quantum Security Program guiding enterprises to Discover, Prioritize and Migrate cryptography for Quantum resilience.',
    images: [
      {
        url: '/ue-adviq-og-image.png',
        width: 1200,
        height: 630,
        alt: 'UElement - AdviQ | Securing Enterprises for the Quantum decade',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UElement - AdviQ | Securing Enterprises for the Quantum decade',
    description:
      'a Quantum Security Program guiding enterprises to Discover, Prioritize and Migrate cryptography for Quantum resilience.',
    images: ['/ue-adviq-og-image.png'],
  },
};

import AdviqCanvas from '../../components/AdviqCanvas';

export default function U92Page() {
  return (
    <>
      <div className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <AdviqCanvas />
        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div className="crumb">
            <Link href="/">Home</Link> / AdviQ
          </div>
          <h1 className="display" style={{ fontSize: 'var(--text-display)' }}>
            AdviQ
          </h1>
          <p className="serif-line" style={{ fontSize: 20, marginTop: 8 }}>
            Named for the element that changed everything. Built for the
            computer that will.
          </p>
          <p className="lede" style={{ marginTop: 26 }}>
            AdviQ is UElement&apos;s dedicated quantum security practice. We
            prepare banks, governments, telecoms, and critical infrastructure
            for the quantum decade: from cryptographic discovery to post-quantum
            migration, quantum key distribution, and lasting crypto-agility.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 14,
              marginTop: 28,
              flexWrap: 'wrap',
            }}
          >
            <Link href="/vyuh" className="btn btn-gold">
              Request a quantum risk assessment
            </Link>
            <Link href="/u92pqc" className="btn btn-line">
              Explore the practice
            </Link>
          </div>
        </div>
      </div>

      <div className="section alt">
        <div className="wrap">
          <div className="kicker">The threat is already here</div>
          <div className="grid2" style={{ alignItems: 'center' }}>
            <p className="serif-line" style={{ fontSize: 24 }}>
              Data stolen today will be decrypted tomorrow.
              Harvest-now-decrypt-later makes every long-lived secret a quantum
              liability, right now.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="card">
                <h4>Shor&apos;s algorithm</h4>
                <p>
                  Breaks RSA, ECC, and DH: the public-key foundations of
                  banking, identity, and the internet.
                </p>
              </div>
              <div className="card">
                <h4>Grover&apos;s algorithm</h4>
                <p>
                  Halves effective symmetric key strength, forcing upgrades
                  across storage and transport.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="wrap">
          <div className="kicker">Three solution lines</div>
          <div className="grid3" style={{ marginTop: 26 }}>
            <Link
              href="/u92pqc"
              className="card link"
              style={{ textDecoration: 'none' }}
            >
              <h4>AdviQ PQC</h4>
              <p>
                Discovery to migration: CBOM cryptographic inventory, NIST FIPS
                203/204/205/206 alignment, hybrid key exchange, phased rollout.
              </p>
              <p
                className="mono"
                style={{ marginTop: 12, color: 'var(--gold-500)' }}
              >
                Learn more →
              </p>
            </Link>
            <Link
              href="/u92qkd"
              className="card link"
              style={{ textDecoration: 'none' }}
            >
              <h4>AdviQ QKD</h4>
              <p>
                Quantum key distribution for links where physics, not
                mathematics, guarantees secrecy.
              </p>
              <p
                className="mono"
                style={{ marginTop: 12, color: 'var(--gold-500)' }}
              >
                Learn more →
              </p>
            </Link>
            <Link
              href="/u92agility"
              className="card link"
              style={{ textDecoration: 'none' }}
            >
              <h4>AdviQ Crypto-Agility</h4>
              <p>
                Axis, Codex, and Crucible: the abstraction layer, registry, and
                drill harness that make your next migration a config change.
              </p>
              <p
                className="mono"
                style={{ marginTop: 12, color: 'var(--gold-500)' }}
              >
                Learn more →
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div className="section navy">
        <div className="wrap">
          <div className="kicker">Coverage</div>
          <h2 className="display" style={{ fontSize: 28 }}>
            Ten domains. One quantum posture.
          </h2>
          <div className="chips" style={{ marginTop: 26 }}>
            {[
              'Application',
              'Infrastructure',
              'Services',
              'Website',
              'Mobile application',
              'Data center',
              'Organizational',
              'Industrial',
              'Telecommunication',
              'Storage',
            ].map((c) => (
              <span className="chip" key={c}>
                {c}
              </span>
            ))}
          </div>
          <p
            style={{ color: 'var(--slate-300)', marginTop: 26, maxWidth: 640 }}
          >
            Regulatory drivers we work with daily: RBI quantum-safe directions
            for Indian banking, the National Quantum Mission, and NIST&apos;s
            finalized post-quantum standards.
          </p>
        </div>
      </div>
    </>
  );
}
