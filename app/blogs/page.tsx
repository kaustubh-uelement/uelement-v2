import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blogs — UElement Technologies',
  description: 'Insights, trends, and expert perspectives from the UElement team.',
};

export default function BlogsPage() {
  return (
    <>
      <div className="hero hero-half"><div className="hero-fabric" /><div className="wrap">
        <div className="crumb"><Link href="/">Home</Link> / Company / Blogs</div>
        <div className="kicker">Blogs</div>
        <h1 className="display" style={{ fontSize: 'var(--text-display)' }}>Perspectives worth your time.</h1>
        <p className="lede" style={{ marginTop: 20 }}>Insights, trends, and expert perspectives from the UElement team.</p>
      </div></div>
      <div className="section alt"><div className="wrap">
        <div className="grid3">
          <Link href="/u92pqc" className="card link" style={{ textDecoration: 'none' }}><div className="tag">Quantum</div><h4>Why harvest-now-decrypt-later changes your migration math</h4><p>The quantum threat to today&apos;s encrypted archives — and what a CBOM-first response looks like.</p><p className="mono" style={{ marginTop: 12, color: 'var(--gold-500)' }}>Read the practice →</p></Link>
          <Link href="/vizor" className="card link" style={{ textDecoration: 'none' }}><div className="tag">Observability</div><h4>Compliance as exhaust, not archaeology</h4><p>What changes when audit evidence is generated continuously by the systems themselves.</p><p className="mono" style={{ marginTop: 12, color: 'var(--gold-500)' }}>Read the practice →</p></Link>
          <Link href="/mainspar" className="card link" style={{ textDecoration: 'none' }}><div className="tag">Tactical Edge</div><h4>The edge is the cloud</h4><p>Designing for denied, degraded, intermittent, and limited environments from first principles.</p><p className="mono" style={{ marginTop: 12, color: 'var(--gold-500)' }}>Read the practice →</p></Link>
          <Link href="/u92agility" className="card link" style={{ textDecoration: 'none' }}><div className="tag">Crypto-Agility</div><h4>The last migration you do by hand</h4><p>Why algorithm rotation should be a rehearsed capability, not a five-year program.</p><p className="mono" style={{ marginTop: 12, color: 'var(--gold-500)' }}>Read the practice →</p></Link>
          <Link href="/kayak" className="card link" style={{ textDecoration: 'none' }}><div className="tag">Physical Fabric</div><h4>When the warehouse becomes an API</h4><p>Everything as a Service, and what a cryptographic twin means for physical trust.</p><p className="mono" style={{ marginTop: 12, color: 'var(--gold-500)' }}>Read the practice →</p></Link>
          <Link href="/nexus" className="card link" style={{ textDecoration: 'none' }}><div className="tag">Digital Fabric</div><h4>GenAI search is the new front door</h4><p>Why enterprises must be discoverable to both people and models.</p><p className="mono" style={{ marginTop: 12, color: 'var(--gold-500)' }}>Read the practice →</p></Link>
        </div>
      </div></div>
    </>
  );
}
