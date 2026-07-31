import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industries | UElement Technologies',
  description:
    'UElement builds for sectors where downtime is measured in consequences, not minutes.',
};

export default function IndustriesPage() {
  return (
    <>
      <div className="hero hero-half">
        <div className="hero-art">
          <img src="/u92-flower.png" alt="" aria-hidden="true" />
        </div>
        <div className="hero-fabric" />
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link> / Industries
          </div>
          <div className="kicker">Industries</div>
          <h1 className="display" style={{ fontSize: 'var(--text-display)' }}>
            Where we operate.
          </h1>
          <p className="lede" style={{ marginTop: 20 }}>
            UElement builds for sectors where downtime is measured in
            consequences, not minutes. Each industry pairing below maps our
            platforms to the problems that define it.
          </p>
        </div>
      </div>

      <div className="section alt">
        <div
          className="wrap"
          style={{ display: 'flex', flexDirection: 'column', gap: 22 }}
        >
          <div className="card" id="ind-def">
            <div className="grid2" style={{ alignItems: 'center' }}>
              <div>
                <h4>Defence &amp; Aerospace</h4>
                <p>
                  DDIL-native autonomy, air-gapped deployment, and post-quantum
                  communications. ITAR-free and export-eligible by design.
                </p>
              </div>
              <div className="chips">
                <span className="chip">MainSPAR</span>
                <span className="chip">U92 PQC</span>
                <span className="chip">Kayak custody</span>
              </div>
            </div>
          </div>
          <div className="card" id="ind-bfsi">
            <div className="grid2" style={{ alignItems: 'center' }}>
              <div>
                <h4>Banking &amp; Financial Services</h4>
                <p>
                  Quantum-safe transaction protection, UPI/CBS journey
                  observability, RBI &amp; SEBI compliance evidence generated as
                  daily exhaust.
                </p>
              </div>
              <div className="chips">
                <span className="chip">U92 PQC</span>
                <span className="chip">U92 Crypto-Agility</span>
                <span className="chip">Vizor</span>
                <span className="chip">Nexus</span>
              </div>
            </div>
          </div>
          <div className="card" id="ind-mfg">
            <div className="grid2" style={{ alignItems: 'center' }}>
              <div>
                <h4>Manufacturing &amp; Industrial OT</h4>
                <p>
                  Purdue-native observability across 40+ OT protocols, passive
                  by architecture at Levels 0–2, IEC 62443 conformance graphed
                  in real time.
                </p>
              </div>
              <div className="chips">
                <span className="chip">Vizor OT</span>
                <span className="chip">Kayak</span>
                <span className="chip">U92 Industrial</span>
              </div>
            </div>
          </div>
          <div className="card" id="ind-gov">
            <div className="grid2" style={{ alignItems: 'center' }}>
              <div>
                <h4>Government &amp; Public Sector</h4>
                <p>
                  Sovereign cloud and air-gapped topologies, CERT-In 6-hour
                  incident reporting, GeM procurement readiness under
                  Make-in-India.
                </p>
              </div>
              <div className="chips">
                <span className="chip">Vizor</span>
                <span className="chip">MainSPAR</span>
                <span className="chip">U92 QKD</span>
              </div>
            </div>
          </div>
          <div className="card" id="ind-health">
            <div className="grid2" style={{ alignItems: 'center' }}>
              <div>
                <h4>Healthcare &amp; Pharma</h4>
                <p>
                  HIPAA and DPDP-aligned operations, clinical uptime, and
                  serialized provenance from production line to patient.
                </p>
              </div>
              <div className="chips">
                <span className="chip">Kayak provenance</span>
                <span className="chip">Vizor</span>
                <span className="chip">U92</span>
              </div>
            </div>
          </div>
          <div className="card" id="ind-dc">
            <div className="grid2" style={{ alignItems: 'center' }}>
              <div>
                <h4>Datacenter &amp; Warehouse</h4>
                <p>
                  Rack space, hardware, power, cooling, SKUs, and movement:
                  metered, digital-twinned, and billed as services on a verified
                  fabric.
                </p>
              </div>
              <div className="chips">
                <span className="chip">Kayak EaaS</span>
                <span className="chip">Vizor Cloud</span>
                <span className="chip">Nexus portals</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
