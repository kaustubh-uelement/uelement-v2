import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Investor Relations — UElement Technologies',
  description: 'UElement Technologies Private Limited — structure, governance, and investor inquiries.',
};

export default function InvestorsPage() {
  return (
    <>
      <div className="hero hero-half"><div className="hero-fabric" /><div className="wrap">
        <div className="crumb"><Link href="/">Home</Link> / Company / Investor Relations</div>
        <div className="kicker">Investor Relations</div>
        <h1 className="display" style={{ fontSize: 'var(--text-display)' }}>Built for the long horizon.</h1>
        <p className="lede" style={{ marginTop: 20 }}>UElement Technologies Private Limited is part of the UDTechs group, building deeptech platforms across quantum security, autonomous resilience, and enterprise fabric.</p>
      </div></div>
      <div className="section alt"><div className="wrap grid2" style={{ alignItems: 'start' }}>
        <div>
          <div className="kicker">Structure &amp; governance</div>
          <table className="spec" style={{ marginTop: 20 }}>
            <tbody>
              <tr><td>Entity</td><td>UElement Technologies Private Limited</td></tr>
              <tr><td>Group</td><td>Part of the UDTechs group</td></tr>
              <tr><td>Headquarters</td><td>Pune, Maharashtra, India</td></tr>
              <tr><td>Regional offices</td><td>Singapore · UAE</td></tr>
              <tr><td>Programs</td><td>MainSTAY · MainSPAR · U92 Quantum</td></tr>
              <tr><td>Revenue model</td><td>Licensing · AMC · Engineering services · OEM royalty</td></tr>
            </tbody>
          </table>
        </div>
        <div className="card">
          <h4>Investor inquiries</h4>
          <p>Financial reports, updates, and performance materials are shared with qualified investors directly. Reach the investor desk to begin a conversation.</p>
          <Link href="/contact" className="btn btn-gold" style={{ marginTop: 20 }}>Contact investor desk</Link>
        </div>
      </div></div>
    </>
  );
}
