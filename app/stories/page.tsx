import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Success Stories — UElement Technologies',
  description: 'How our platforms deliver for the sectors where downtime is measured in consequences.',
};

export default function StoriesPage() {
  return (
    <>
      <div className="hero hero-half"><div className="hero-fabric" /><div className="wrap">
        <div className="crumb"><Link href="/">Home</Link> / Company / Success Stories</div>
        <div className="kicker">Success Stories</div>
        <h1 className="display" style={{ fontSize: 'var(--text-display)' }}>Measured in outcomes.</h1>
        <p className="lede" style={{ marginTop: 20 }}>How our platforms deliver for the sectors where downtime is measured in consequences.</p>
      </div></div>
      <div className="section alt"><div className="wrap">
        <div className="grid3">
          <div className="card"><div className="tag">BFSI</div><h4>Quantum-readiness for banking</h4><p>Cryptographic discovery and post-quantum migration planning aligned to RBI quantum-safe directions for financial institutions.</p></div>
          <div className="card"><div className="tag">Industrial OT</div><h4>Zero blind spots on the plant floor</h4><p>Purdue-native observability proofs of value spanning IT and OT — one topology, one evidence trail.</p></div>
          <div className="card"><div className="tag">Enterprise IT</div><h4>Cloud migration at scale</h4><p>Partner-led infrastructure modernization engagements moving mission-critical estates to new platforms.</p></div>
        </div>
        <p className="mut" style={{ marginTop: 24, fontSize: 13 }}>Client identities are shared under NDA. Ask us for reference conversations relevant to your sector.</p>
        <Link href="/contact" className="btn btn-line" style={{ marginTop: 16 }}>Request references</Link>
      </div></div>
    </>
  );
}
