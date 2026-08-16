import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AdviQ QKD | Quantum Key Distribution | UElement',
  description:
    'Quantum key distribution for links where physics, not mathematics, guarantees secrecy.',
};

export default function U92QKDPage() {
  return (
    <>
      <div className="hero hero-half">
        <div className="hero-art">
          <img src="/u92-flower.png" alt="" aria-hidden="true" />
        </div>
        <div className="hero-fabric" />
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link> / <Link href="/adviq">AdviQ</Link> / QKD
          </div>
          <div className="tag">AdviQ · Quantum Key Distribution</div>
          <h1 className="display" style={{ fontSize: 'var(--text-display)' }}>
            AdviQ QKD
          </h1>
          <p className="serif-line">Secrecy guaranteed by physics.</p>
          <p className="lede" style={{ marginTop: 22 }}>
            For the links that matter most, quantum key distribution offers what
            no algorithm can: keys whose interception is detectable by the laws
            of quantum mechanics themselves. AdviQ designs, integrates, and
            operates QKD for sovereign and financial backbones.
          </p>
        </div>
      </div>
      <div className="section alt">
        <div className="wrap grid3">
          <div className="card">
            <h4>Link design</h4>
            <p>
              Fiber and free-space QKD architecture matched to your topology,
              distances, and threat model.
            </p>
          </div>
          <div className="card">
            <h4>Integration</h4>
            <p>
              QKD-derived keys feeding your existing encryptors, HSMs, and
              key-management systems.
            </p>
          </div>
          <div className="card">
            <h4>Hybrid assurance</h4>
            <p>
              QKD layered with PQC for defense in depth: physics and
              mathematics, together.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
