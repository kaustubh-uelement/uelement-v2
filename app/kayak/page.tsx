import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kayak | Everything as a Service | UElement',
  description:
    'Every physical asset, inventory unit, cubic foot of space, and unit of movement becomes a metered, queryable, blockchain-verified service.',
};

export default function KayakPage() {
  return (
    <>
      <div className="hero hero-half">
        <div className="hero-art">
          <img src="/u92-flower.png" alt="" aria-hidden="true" />
        </div>
        <div className="hero-fabric" />
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link> / <Link href="/mainstay">StamBH</Link>{' '}
            / Kayak
          </div>
          <div className="tag">StamBH · Commands the physical</div>
          <h1 className="display" style={{ fontSize: 'var(--text-display)' }}>
            Kayak
          </h1>
          <p className="serif-line">Everything as a Service.</p>
          <p className="lede" style={{ marginTop: 22 }}>
            Every physical asset, inventory unit, cubic foot of space, and unit
            of movement becomes a metered, queryable, blockchain-verified
            service. Kayak extends &quot;track a needle in a haystack&quot;
            precision to the whole physical enterprise.
          </p>
          <Link
            href="/contact"
            className="btn btn-gold"
            style={{ marginTop: 28 }}
          >
            See Kayak on your floor
          </Link>
        </div>
      </div>

      <div className="section alt">
        <div className="wrap">
          <div className="kicker">Three verticals</div>
          <div className="grid3" style={{ marginTop: 26 }}>
            <div className="card">
              <h4>Enterprise</h4>
              <p>
                Corporate assets, campus infrastructure, and IT/office equipment
                lifecycle on one queryable fabric.
              </p>
            </div>
            <div className="card">
              <h4>Datacenter</h4>
              <p>
                Rack space, hardware assets, power and cooling infrastructure,
                capacity metering.
              </p>
            </div>
            <div className="card">
              <h4>Warehouse</h4>
              <p>
                SKUs, pallets, dock doors, AGVs, and fulfillment operations;
                live, verified, and billable.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="wrap">
          <div className="kicker">The EaaS catalog</div>
          <h2 className="display" style={{ fontSize: 30 }}>
            Eight services. One physical fabric.
          </h2>
          <div className="grid4" style={{ marginTop: 34 }}>
            <div className="card">
              <h4>Asset</h4>
              <p>Physical assets tracked, metered, and billed by usage.</p>
            </div>
            <div className="card">
              <h4>Inventory</h4>
              <p>SKU pools digital-twinned and available on demand.</p>
            </div>
            <div className="card">
              <h4>Space</h4>
              <p>Racks, bins, and floor slots as bookable resources.</p>
            </div>
            <div className="card">
              <h4>Custody</h4>
              <p>Blockchain chain-of-custody exposed as a service.</p>
            </div>
            <div className="card">
              <h4>Provenance</h4>
              <p>&quot;Where did this come from&quot; as an API.</p>
            </div>
            <div className="card">
              <h4>Movement</h4>
              <p>Fleet, AGV, and robotics orchestration on demand.</p>
            </div>
            <div className="card">
              <h4>Compliance</h4>
              <p>Automated jurisdiction-specific audit reporting.</p>
            </div>
            <div className="card">
              <h4>Fulfillment</h4>
              <p>Pick, pack, and ship as a metered service.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section navy">
        <div className="wrap grid2" style={{ alignItems: 'start' }}>
          <div>
            <div className="kicker">Trust, engineered</div>
            <h2 className="display" style={{ fontSize: 28 }}>
              Every serialized asset gets a cryptographic twin.
            </h2>
            <p style={{ color: 'var(--slate-300)', marginTop: 16 }}>
              Chain-of-custody entries record actor, action, location,
              timestamp, and a sensor hash, on Hyperledger Fabric or Besu.
              Smart contracts govern asset lifecycle, quality gates, compliance
              oracles, recall management, and audit trails.
            </p>
            <div className="chips" style={{ marginTop: 22 }}>
              {[
                'RFID · passive & active',
                'NFC / QR',
                'GPS / GNSS',
                'Computer vision',
                'LiDAR & drones',
                'Kalman-fused attestation',
              ].map((c) => (
                <span className="chip" key={c}>
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="kicker">Design targets</div>
            <div className="grid2" style={{ marginTop: 22 }}>
              <div className="stat">
                <b>95%+</b>
                <span>Identification accuracy, RFID + CV fusion</span>
              </div>
              <div className="stat">
                <b>&lt;1s</b>
                <span>Provenance queries across millions of assets</span>
              </div>
              <div className="stat">
                <b>50%</b>
                <span>
                  Downtime reduction target via predictive maintenance
                </span>
              </div>
              <div className="stat">
                <b>25%</b>
                <span>Operational cost reduction target</span>
              </div>
            </div>
            <p className="mut" style={{ marginTop: 20, fontSize: 13 }}>
              All AI decisions carry SHAP/LIME attribution for auditor
              inspection. Five deployment topologies from air-gapped to managed
              SaaS.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
