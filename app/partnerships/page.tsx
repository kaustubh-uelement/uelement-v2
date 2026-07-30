import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partnerships — UElement Technologies',
  description: 'Strategic alliances that extend our technology across India, JAPAC, and the Middle East.',
};

export default function PartnershipsPage() {
  return (
    <>
      <div className="hero hero-half"><div className="hero-fabric" /><div className="wrap">
        <div className="crumb"><Link href="/">Home</Link> / Company / Partnerships</div>
        <div className="kicker">Partnerships</div>
        <h1 className="display" style={{ fontSize: 'var(--text-display)' }}>Stronger through alliances.</h1>
        <p className="lede" style={{ marginTop: 20 }}>We deliver alongside systems integrators, cloud and infrastructure providers, and regional operations partners across India, JAPAC, and the Middle East.</p>
      </div></div>
      <div className="section alt"><div className="wrap">
        <div className="grid4">
          <div className="card"><h4>Systems integrators</h4><p>Co-delivery on enterprise and government engagements.</p></div>
          <div className="card"><h4>Cloud &amp; infrastructure</h4><p>Sovereign and hyperscale deployment partnerships.</p></div>
          <div className="card"><h4>OEM embedding</h4><p>Platform capabilities embedded in partner hardware, with per-unit royalty models.</p></div>
          <div className="card"><h4>Regional alliances</h4><p>Operations partners across JAPAC and the Middle East.</p></div>
        </div>
        <div className="card" style={{ marginTop: 26 }}><div className="grid2" style={{ alignItems: 'center' }}><div><h4>Become a partner</h4><p>Tell us about your practice, your region, and the clients you serve.</p></div><div style={{ textAlign: 'right' }}><Link href="/contact" className="btn btn-gold">Start the conversation</Link></div></div></div>
      </div></div>
    </>
  );
}
