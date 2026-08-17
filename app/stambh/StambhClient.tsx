'use client';

import Link from 'next/link';

export default function StambhClient() {
  return (
    <>
      {/* ═══════ HERO ═══════ */}
      <div className="hero">
        <div className="hero-fabric" />
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link> / StamBH
          </div>
          <h1 className="display" style={{ fontSize: 'var(--text-display)' }}>
            StamBH
          </h1>
          <p
            className="serif-line"
            style={{ fontSize: 20, marginTop: 8, color: '#c88a3e' }}
          >
            One program. Three planes of the enterprise.
          </p>
          <p className="lede" style={{ marginTop: 26 }}>
            Every enterprise lives in three worlds at once: the outward-facing
            digital surfaces its customers touch, the internal signals its
            operations emit, and the physical assets it actually owns. StamBH is
            one platform family that governs all three, with shared tenant
            identity, shared RBAC, and one audit trail.
          </p>
          <Link
            href="/contact"
            className="btn btn-gold"
            style={{ marginTop: 28, display: 'inline-block' }}
          >
            Book a scoping workshop
          </Link>
        </div>
      </div>

      {/* ═══════ THE TRIO ═══════ */}
      <div className="section alt">
        <div className="wrap">
          <div className="kicker">The Family</div>
          <h2 className="display text-navy-gradient">
            Each one stands alone.
            <br />
            Together they cover the{' '}
            <span className="au">whole enterprise.</span>
          </h2>
          <p className="lede" style={{ marginTop: 20 }}>
            The three products are peers, not layers. Buy one and it earns its
            keep on its own; add a second and the shared spine starts paying you
            back.
          </p>
          <div className="grid3" style={{ marginTop: 44 }}>
            <Link
              href="/nexus"
              className="card link"
              style={{ textDecoration: 'none' }}
            >
              <div className="tag">The digital fabric</div>
              <h4>Nexus</h4>
              <p
                className="serif-line"
                style={{ fontSize: 16, marginBottom: 10, color: '#c88a3e' }}
              >
                The Enterprise Digital Fabric
              </p>
              <p>
                Builds and runs every outward-facing surface your enterprise
                touches — web, mobile, search, workflows, and a full AI
                substrate.
              </p>
            </Link>
            <Link
              href="/vizor"
              className="card link"
              style={{ textDecoration: 'none' }}
            >
              <div className="tag">The observability fabric</div>
              <h4>Vizor</h4>
              <p
                className="serif-line"
                style={{ fontSize: 16, marginBottom: 10, color: '#c88a3e' }}
              >
                One Platform. Seven Dimensions.
              </p>
              <p>
                Watches every packet, log, transaction, and control across
                enterprise IT and industrial OT, with compliance evidence as
                operational exhaust.
              </p>
            </Link>
            <Link
              href="/kayak"
              className="card link"
              style={{ textDecoration: 'none' }}
            >
              <div className="tag">The asset fabric</div>
              <h4>Kayak</h4>
              <p
                className="serif-line"
                style={{ fontSize: 16, marginBottom: 10, color: '#c88a3e' }}
              >
                Everything as a Service
              </p>
              <p>
                Commands the physical world — every asset, SKU, rack unit, and
                unit of movement, metered and blockchain-verified.
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* ═══════ THE SHARED SPINE ═══════ */}
      <div className="section cream">
        <div className="wrap">
          <div className="kicker">The shared spine</div>
          <h2 className="display">
            What &quot;one control plane&quot; actually <span className="au">buys you.</span>
          </h2>
          <p className="lede" style={{ marginTop: 20 }}>
            Not a marketing phrase. Four concrete things you only have to decide, build, and audit once.
          </p>

          <div className="grid2" style={{ marginTop: 44 }}>
            <div className="card">
              <div className="proglabel slate">Identity</div>
              <h4>One tenant, one directory</h4>
              <p>
                A single tenant model, RBAC and ABAC, and FIDO2 passwordless access across all three fabrics. Adopt one product and the second inherits your identity architecture.
              </p>
            </div>
            <div className="card">
              <div className="proglabel slate">Evidence</div>
              <h4>One audit trail</h4>
              <p>
                Compliance evidence from every fabric lands in the same tamper-evident ledger. One artifact satisfies digital, operational, and physical-custody obligations at once.
              </p>
            </div>
            <div className="card">
              <div className="proglabel slate">Deployment</div>
              <h4>One topology decision</h4>
              <p>
                All three deploy air-gapped, on-premise, on sovereign cloud, hybrid-managed, or as hosted SaaS — on a single control plane, with no re-platforming between them.
              </p>
            </div>
            <div className="card">
              <div className="proglabel slate">Interfaces</div>
              <h4>One API surface</h4>
              <p>
                REST, GraphQL, and webhooks with shared conventions. A Nexus workflow can open a Vizor incident and trigger a Kayak fulfillment without custom integration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ INTEGRATIONS ═══════ */}
      <div className="section alt">
        <div className="wrap">
          <div className="kicker">Integration</div>
          <h2 className="display text-navy-gradient">
            What actually flows between the <span className="au">fabrics.</span>
          </h2>
          <p className="lede" style={{ marginTop: 20 }}>
            Concrete integrations, not a diagram with arrows. Each of these
            works without custom connector development.
          </p>

          <div className="grid3" style={{ marginTop: 44, alignItems: 'stretch' }}>
            <div
              style={{
                background: 'linear-gradient(180deg, #151828 0%, #213866 100%)',
                borderRadius: '16px',
                padding: '36px',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  padding: '6px 16px',
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  color: '#94a3b8',
                  marginBottom: '24px',
                  alignSelf: 'flex-start',
                }}
              >
                Nexus &rarr; Vizor
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px', color: '#fff' }}>
                Nexus feeds Vizor
              </h4>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#e2e8f0', marginBottom: '16px' }}>
                Business KPIs and customer journeys instrumented natively — no
                separate agent deployment.
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#e2e8f0', marginBottom: '16px' }}>
                Consent capture, DPDP rights requests, and GDPR artifacts flow
                into the evidence plane.
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#e2e8f0' }}>
                Runtime application security and SIEM correlation cover every
                published property.
              </p>
            </div>

            <div
              style={{
                background: 'linear-gradient(180deg, #151828 0%, #213866 100%)',
                borderRadius: '16px',
                padding: '36px',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  padding: '6px 16px',
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  color: '#94a3b8',
                  marginBottom: '24px',
                  alignSelf: 'flex-start',
                }}
              >
                Nexus &rarr; Kayak
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px', color: '#fff' }}>
                Nexus feeds Kayak
              </h4>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#e2e8f0', marginBottom: '16px' }}>
                A checkout can call fulfillment; a support portal can initiate
                a recall.
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#e2e8f0', marginBottom: '16px' }}>
                Provenance widgets embed directly in commerce and support
                surfaces.
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#e2e8f0' }}>
                Warranty registration and service history surface as
                customer-facing flows.
              </p>
            </div>

            <div
              style={{
                background: 'linear-gradient(180deg, #151828 0%, #213866 100%)',
                borderRadius: '16px',
                padding: '36px',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  padding: '6px 16px',
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  color: '#94a3b8',
                  marginBottom: '24px',
                  alignSelf: 'flex-start',
                }}
              >
                Kayak &rarr; Vizor
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '24px', color: '#fff' }}>
                Kayak feeds Vizor
              </h4>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#e2e8f0', marginBottom: '16px' }}>
                Asset telemetry arrives as a first-class collection-plane
                stream.
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#e2e8f0', marginBottom: '16px' }}>
                Custody evidence merges with cyber evidence in one GRC ledger.
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#e2e8f0' }}>
                Physical and digital control drift are correlated on the same
                topology graph.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ CLOSING CTA ═══════ */}
      <div className="section">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <p
            className="serif-line"
            style={{
              maxWidth: 760,
              margin: '0 auto',
              color: '#c88a3e',
              fontSize: 24,
            }}
          >
            A two-hour workshop, then 45 days to something live.
          </p>
          <p
            className="mut"
            style={{
              marginTop: 16,
              fontFamily: 'var(--font-heading)',
              fontSize: 12,
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            We map your estate, pick the highest-value starting point, and put
            one thing into production on the deployment topology you choose.
          </p>
          <Link
            href="/contact"
            className="btn btn-gold"
            style={{ marginTop: 28 }}
          >
            Book a scoping workshop
          </Link>
        </div>
      </div>
    </>
  );
}
