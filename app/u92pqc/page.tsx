import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AdviQ PQC | Post-Quantum Cryptography | UElement',
  description:
    'A complete post-quantum migration practice: discover every cryptographic asset, prioritize by exposure, and migrate on NIST-standardized algorithms.',
};

export default function U92PQCPage() {
  return (
    <>
      <div className="hero hero-half">
        <div className="hero-art">
          <img src="/u92-flower.png" alt="" aria-hidden="true" />
        </div>
        <div className="hero-fabric" />
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link> / <Link href="/u92">AdviQ</Link> / PQC
          </div>
          <div className="tag">AdviQ · Post-Quantum Cryptography</div>
          <h1 className="display" style={{ fontSize: 'var(--text-display)' }}>
            AdviQ PQC
          </h1>
          <p className="serif-line">Migrate before the countdown ends.</p>
          <p className="lede" style={{ marginTop: 22 }}>
            A complete post-quantum migration practice: discover every
            cryptographic asset you own, prioritize by exposure, and migrate on
            NIST-standardized algorithms, without breaking production.
          </p>
        </div>
      </div>
      <div className="section alt">
        <div className="wrap grid2" style={{ alignItems: 'start' }}>
          <div>
            <div className="kicker">The method</div>
            <div className="steps" style={{ marginTop: 24 }}>
              <div className="step">
                <b>CBOM discovery</b>
                <p>
                  A cryptographic bill of materials across codebases, TLS
                  configurations, certificates, and APIs, surfacing every RSA,
                  ECC, and DH exposure.
                </p>
              </div>
              <div className="step">
                <b>Risk modelling</b>
                <p>
                  Crack-timeline modelling per asset class, so migration order
                  follows actual exposure.
                </p>
              </div>
              <div className="step">
                <b>Hybrid rollout</b>
                <p>
                  Hybrid key exchange (X25519MLKEM768) bridges classical and
                  post-quantum, secure against both worlds during transition.
                </p>
              </div>
              <div className="step">
                <b>Standards alignment</b>
                <p>
                  NIST FIPS 203 (ML-KEM), 204 (ML-DSA), 205 (SLH-DSA), and 206,
                  mapped to your estate with compliance evidence.
                </p>
              </div>
            </div>
          </div>
          <div className="card">
            <h4>Who this is for</h4>
            <p>
              Banks under RBI quantum-safe guidance. Telecoms with decade-long
              infrastructure. Governments with secrets that must outlive the
              quantum transition. Anyone whose data has a shelf life longer than
              the countdown.
            </p>
            <Link
              href="/contact"
              className="btn btn-gold"
              style={{ marginTop: 20 }}
            >
              Start with a CBOM assessment
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
