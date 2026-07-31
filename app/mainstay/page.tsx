import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MainSTAY | UElement Technologies',
  description: 'One program. Three planes of the enterprise. Nexus · Vizor · Kayak.',
};

export default function MainstayPage() {
  return (
    <>
      <div className="hero">
        <div className="hero-fabric" />
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link> / MainSTAY
          </div>
          <h1 className="display" style={{ fontSize: 'var(--text-display)' }}>
            MainSTAY
          </h1>
          <p className="serif-line" style={{ fontSize: 20, marginTop: 8 }}>
            One program. Three planes of the enterprise.
          </p>
          <p className="lede" style={{ marginTop: 26 }}>
            Every enterprise lives in three worlds at once: the outward-facing digital surfaces its
            customers touch, the internal signals its operations emit, and the physical assets it
            actually owns. MainSTAY is one platform family that governs all three, with shared
            tenant identity, shared RBAC, and one audit trail.
          </p>
        </div>
      </div>

      <div className="section alt">
        <div className="wrap grid3">
          <Link href="/nexus" className="card link" style={{ textDecoration: 'none' }}>
            <div className="tag">Projects outward</div>
            <h4>MainSTAY Nexus</h4>
            <p className="serif-line" style={{ fontSize: 16, marginBottom: 10 }}>
              The Enterprise Digital Fabric
            </p>
            <p>
              Web platforms, mobile applications, GenAI search, SEO/SEM, and a scalable portal to
              design application workflows. Everything your customer sees, on one fabric.
            </p>
          </Link>
          <Link href="/vizor" className="card link" style={{ textDecoration: 'none' }}>
            <div className="tag">Watches the digital</div>
            <h4>MainSTAY Vizor</h4>
            <p className="serif-line" style={{ fontSize: 16, marginBottom: 10 }}>
              One Platform. Seven Dimensions. Zero Blind Spots.
            </p>
            <p>
              Unified observability, security and compliance fabric for enterprise IT and industrial
              OT, from business KPIs down to packet level.
            </p>
          </Link>
          <Link href="/kayak" className="card link" style={{ textDecoration: 'none' }}>
            <div className="tag">Commands the physical</div>
            <h4>MainSTAY Kayak</h4>
            <p className="serif-line" style={{ fontSize: 16, marginBottom: 10 }}>
              Everything as a Service
            </p>
            <p>
              Every physical asset, inventory unit, cubic foot of space and unit of movement becomes
              a metered, queryable, blockchain-verified service.
            </p>
          </Link>
        </div>
      </div>

      <div className="section">
        <div className="wrap">
          <div className="kicker">How the trio composes</div>
          <h2 className="display" style={{ fontSize: 32 }}>
            Better together, by design.
          </h2>
          <div className="steps" style={{ marginTop: 36, maxWidth: 720 }}>
            <div className="step">
              <b>Kayak feeds Vizor</b>
              <p>
                Physical asset telemetry flows into Vizor&apos;s Collection Plane; compliance evidence
                flows to the Evidence Plane for unified GRC reporting.
              </p>
            </div>
            <div className="step">
              <b>Nexus fronts Kayak</b>
              <p>
                Customer-facing surfaces: billing subscriptions, partner portals, and support for
                Kayak&apos;s as-a-service offerings run on Nexus.
              </p>
            </div>
            <div className="step">
              <b>One control plane</b>
              <p>
                All three share tenant identity, role-based access, and audit through the MainSTAY
                control plane. Adopt one, expand to three, without re-platforming.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
