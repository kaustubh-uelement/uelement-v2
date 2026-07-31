import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MainSPAR | Autonomous Resilience for the Tactical Edge | UElement',
  description: 'A sovereign MLOps ecosystem for DDIL environments. MerlinOS · MustangC3 · MesoGRID.',
};

export default function MainsparPage() {
  return (
    <>
      <div className="hero"><div className="hero-fabric" /><div className="wrap">
        <div className="crumb"><Link href="/">Home</Link> / MainSPAR</div>
        <h1 className="display" style={{ fontSize: 'var(--text-display)' }}>MainSPAR</h1>
        <p className="serif-line" style={{ fontSize: 20, marginTop: 8 }}>Autonomous Resilience for the Tactical Edge.</p>
        <p className="lede" style={{ marginTop: 26 }}>A sovereign MLOps ecosystem for D3 and DDIL environments: denied, degraded, intermittent, limited. When the network goes dark and the cloud is a memory, MainSPAR keeps thinking. We don&apos;t connect the edge to the cloud. We turn the edge into the cloud.</p>
        <div style={{ display: 'flex', gap: 14, marginTop: 28, flexWrap: 'wrap' }}>
          <Link href="/contact" className="btn btn-gold">Request the defence briefing</Link>
          <Link href="/merlinos" className="btn btn-line">Explore the triad</Link>
        </div>
      </div></div>

      <div className="section alt"><div className="wrap">
        <div className="kicker">The triad</div>
        <div className="grid3" style={{ marginTop: 26 }}>
          <Link href="/merlinos" className="card link" style={{ textDecoration: 'none' }}><div className="tag slate">The Brain</div><h4>MerlinOS</h4><p>A sovereign edge AI operating system in Light and Standard builds: inference, orchestration, and model lifecycle at the node.</p></Link>
          <Link href="/mustang" className="card link" style={{ textDecoration: 'none' }}><div className="tag slate">The Commander</div><h4>MustangC3</h4><p>Agentic AI command, control and communications: mission continuity through 60%+ node attrition.</p></Link>
          <Link href="/mesogrid" className="card link" style={{ textDecoration: 'none' }}><div className="tag slate">The Fabric</div><h4>MesoGRID</h4><p>A resilient decentralised mesh with stochastic path optimisation. Self-healing by construction.</p></Link>
        </div>
      </div></div>

      <div className="section"><div className="wrap">
        <div className="kicker">Four pillars of differentiation</div>
        <div className="grid4" style={{ marginTop: 26 }}>
          <div className="card"><h4>Self-healing networks</h4><p>Topology reforms around loss automatically.</p></div>
          <div className="card"><h4>Post-quantum cryptography</h4><p>ML-KEM, ML-DSA, and SLH-DSA at the tactical edge.</p></div>
          <div className="card"><h4>Zero-trust intelligence</h4><p>Every node, every message, continuously verified.</p></div>
          <div className="card"><h4>Fully offline operation</h4><p>Complete air-gapped capability. No cloud dependency, ever.</p></div>
        </div>
        <div style={{ marginTop: 40, display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="tag ember">ITAR-free · Export-eligible</span>
          <span className="mut" style={{ fontSize: 13 }}>Spanning Defence, Environment, and Energy. Baselined solution architecture: UE-MSP-SAD-001.</span>
        </div>
      </div></div>

      <div className="section navy"><div className="wrap grid2" style={{ alignItems: 'center' }}>
        <div>
          <div className="kicker">Go to market</div>
          <h2 className="display" style={{ fontSize: 28 }}>Anchored in India. Reaching outward.</h2>
          <p style={{ color: 'var(--slate-300)', marginTop: 16 }}>India is the primary market with anchor public-sector procurement relationships, expanding through Singapore and the UAE with regional operations alliances across JAPAC and the Middle East, as part of UElement&apos;s global footprint.</p>
        </div>
        <div className="card">
          <h4>Four revenue streams</h4>
          <table className="spec" style={{ marginTop: 12 }}>
            <tbody>
              <tr><td>Licensing</td><td>Modular, per-node</td></tr>
              <tr><td>AMC</td><td>Annual maintenance on licence value</td></tr>
              <tr><td>NRE</td><td>Engineering for bespoke integration</td></tr>
              <tr><td>OEM royalty</td><td>Per-unit on embedded deployments</td></tr>
            </tbody>
          </table>
        </div>
      </div></div>
    </>
  );
}
