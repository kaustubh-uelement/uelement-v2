'use client';

import Link from 'next/link';
import LedgerCanvas from './LedgerCanvas';
import PillarCard from './PillarCard';

export default function KayakClient() {
  return (
    <>
      {/* ═══════ HERO ═══════ */}
      <div className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <LedgerCanvas />
        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div className="crumb">
            <Link href="/">Home</Link> / <Link href="/stambh">StamBH</Link> / Kayak
          </div>
          <h1 className="display" style={{ fontSize: 'var(--text-display)' }}>
            Everything you own, <br />
            <span className="au">as a service.</span>
          </h1>
          <p className="serif-line" style={{ fontSize: 20, marginTop: 8, color: '#c88a3e' }}>
            StamBH &middot; the asset fabric
          </p>
          <p className="lede" style={{ marginTop: 26 }}>
            Kayak turns every physical asset, inventory unit, cubic foot of space,
            and unit of movement into something metered, queryable, and
            cryptographically provable — across your enterprise, your datacenters,
            and your warehouses.
          </p>
          <div style={{ marginTop: 28, display: 'flex', gap: '16px' }}>
            <Link href="/contact" className="btn btn-gold">
              Book a Demo
            </Link>
          </div>
        </div>
      </div>

      {/* ═══════ PROBLEM ═══════ */}
      <div className="section alt">
        <div className="wrap">
          <div className="kicker">The physical blind spot</div>
          <h2 className="display text-navy-gradient">
            Your digital estate is instrumented. Your physical estate is a <span className="au">spreadsheet.</span>
          </h2>
          <div style={{ marginTop: 20, maxWidth: '800px' }}>
            <p className="lede" style={{ marginBottom: 16 }}>
              Enterprises can tell you the p99 latency of a checkout API to the millisecond,
              then take three weeks and a physical walk-around to answer where a particular
              server, pallet, or forklift actually is, who last touched it, and whether it is
              still under warranty.
            </p>
            <p className="lede">
              The asset register drifts from reality the day it is published. Custody is a
              signature on a form. Provenance is a phone call to a supplier. And when a
              regulator, an auditor, or a recall asks for proof, the answer is assembled by
              hand from systems that were never built to produce it.
            </p>
          </div>
        </div>
      </div>

      {/* ═══════ CATALOG ═══════ */}
      <div className="section navy" id="catalog">
        <div className="wrap">
          <div className="kicker">The service catalog</div>
          <h2 className="display">
            Eight services.
            <br />
            Each with an API, an SLA, and a <span className="au">meter.</span>
          </h2>
          <p className="lede" style={{ marginTop: 20 }}>
            “Everything as a Service” is a category claim, so Kayak has to defend it
            literally. Every physical thing in the enterprise is exposed as a service you
            can call, measure, and bill.
          </p>

          <div className="grid4" style={{ marginTop: 44 }}>
            <PillarCard label="Service 01" title="Asset" description="Physical assets tracked, metered, and billed by actual usage." points={[]} />
            <PillarCard label="Service 02" title="Inventory" description="SKU pools digital-twinned and available on demand across sites." points={[]} />
            <PillarCard label="Service 03" title="Space" description="Rack units, warehouse bins, floor slots, and dock doors as bookable resources." points={[]} />
            <PillarCard label="Service 04" title="Custody" description="Blockchain chain-of-custody exposed as an API for any auditor or partner." points={[]} />
            <PillarCard label="Service 05" title="Provenance" description="Where did this come from — answered in under a second, across millions of items." points={[]} />
            <PillarCard label="Service 06" title="Movement" description="Fleet, AGV, and robotics orchestration as a callable service." points={[]} />
            <PillarCard label="Service 07" title="Compliance" description="Jurisdiction-specific audit reports generated as operational exhaust." points={[]} />
            <PillarCard label="Service 08" title="Fulfillment" description="Pick, pack, and ship exposed as an API for internal and partner consumption." points={[]} />
          </div>
        </div>
      </div>

      {/* ═══════ VERTICALS ═══════ */}
      <div className="section cream">
        <div className="wrap">
          <div className="kicker">Three verticals</div>
          <h2 className="display text-navy-gradient">
            One fabric, three very different <span className="au">floors.</span>
          </h2>
          <p className="lede" style={{ marginTop: 20 }}>
            The same seven-layer stack, the same ledger, and the same catalog — configured
            for the estate you actually operate.
          </p>

          <div className="grid3" style={{ marginTop: 44 }}>
            <div className="card">
              <div className="proglabel slate">Vertical 01</div>
              <h4>Enterprise</h4>
              <p>
                Laptops, monitors, meeting-room hardware, badges, campus infrastructure — every asset with a lifecycle, a custodian, a warranty, and an audit obligation.
              </p>
            </div>
            <div className="card">
              <div className="proglabel slate">Vertical 02</div>
              <h4>Datacenter</h4>
              <p>
                Rack units, PDU ports, cage doors, spare hardware, cable runs, and cooling capacity treated as serialized, custodied, meterable assets.
              </p>
            </div>
            <div className="card">
              <div className="proglabel slate">Vertical 03</div>
              <h4>Warehouse</h4>
              <p>
                SKUs, pallets, dock doors, AGVs, and cold-chain conditions across defence, pharma, aerospace, manufacturing, and third-party logistics.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ ARCHITECTURE ═══════ */}
      <div className="section alt" id="architecture">
        <div className="wrap">
          <div className="kicker">Architecture</div>
          <h2 className="display text-navy-gradient">
            Seven layers, sensor to <span className="au">service.</span>
          </h2>
          <p className="lede" style={{ marginTop: 20 }}>
            Inherited from the MagCHAIN programme, which merged into Kayak, and extended for
            datacenter and corporate estates.
          </p>

          <div className="grid3" style={{ marginTop: 44 }}>
            <div className="card">
              <div className="proglabel slate">Layer 07</div>
              <h4>Edge & Sensor</h4>
              <p>RFID, GPS/GNSS, IoT sensors, cameras, LiDAR, drones, AGVs, environmental and power telemetry.</p>
            </div>
            <div className="card">
              <div className="proglabel slate">Layer 06</div>
              <h4>Ingestion</h4>
              <p>MQTT and OPC-UA brokers, protocol normalization, ruggedized edge compute with offline queuing.</p>
            </div>
            <div className="card">
              <div className="proglabel slate">Layer 05</div>
              <h4>Blockchain</h4>
              <p>Hyperledger Fabric or Besu, immutable ledger, smart contracts, and a digital twin per serialized asset.</p>
            </div>
            <div className="card">
              <div className="proglabel slate">Layer 04</div>
              <h4>Data Foundation</h4>
              <p>Kafka streaming, time-series storage, and a governed data lake.</p>
            </div>
            <div className="card">
              <div className="proglabel slate">Layer 03</div>
              <h4>AI & Intelligence</h4>
              <p>Computer vision, demand forecasting, predictive maintenance, and route optimization.</p>
            </div>
            <div className="card">
              <div className="proglabel slate">Layer 02</div>
              <h4>Application</h4>
              <p>Supplier, order, warehouse, transport, QC, capacity, and compliance microservices.</p>
            </div>
            <div className="card">
              <div className="proglabel slate">Layer 01</div>
              <h4>Experience</h4>
              <p>Isometric digital-twin dashboards, mobile companion, partner portal, and the EaaS API gateway.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ LEDGER ═══════ */}
      <div className="section cream">
        <div className="wrap">
          <div className="kicker">The custody ledger</div>
          <h2 className="display text-navy-gradient">
            Provenance you can prove, <span className="au">not assert.</span>
          </h2>
          <p className="lede" style={{ marginTop: 20 }}>
            Every serialized asset gets a cryptographic digital twin. Every movement appends
            a signed custody entry — actor, action, location, timestamp, and a hash of the
            sensor reading that witnessed it.
          </p>

          <div className="grid3" style={{ marginTop: 44 }}>
            <div className="card">
              <div className="proglabel slate">Smart Contract</div>
              <h4>AssetLifecycle</h4>
              <p>Birth, transfer, service, retirement — every state change signed and sequenced.</p>
            </div>
            <div className="card">
              <div className="proglabel slate">Smart Contract</div>
              <h4>QualityGate</h4>
              <p>Inspection and acceptance criteria enforced before an asset can progress.</p>
            </div>
            <div className="card">
              <div className="proglabel slate">Smart Contract</div>
              <h4>ComplianceOracle</h4>
              <p>Jurisdiction rules evaluated on-chain as conditions change.</p>
            </div>
            <div className="card">
              <div className="proglabel slate">Smart Contract</div>
              <h4>RecallManager</h4>
              <p>Scoped recall, repossession, or capacity revocation with a verifiable blast radius.</p>
            </div>
            <div className="card">
              <div className="proglabel slate">Smart Contract</div>
              <h4>AuditTrail</h4>
              <p>Append-only evidence with cryptographic proof of non-tampering.</p>
            </div>
          </div>
        </div>
      </div>


      {/* ═══════ THE MAINSTAY TRIO ═══════ */}
      <div className="section alt">
        <div className="wrap">
          <div className="kicker">The StamBH trio</div>
          <h2 className="display text-navy-gradient">
            Kayak commands the physical.
            <br />
            Its siblings handle the <span className="au">rest.</span>
          </h2>
          <div className="grid3" style={{ marginTop: 44 }}>
            <Link
              href="/ankura"
              className="card link"
              style={{ textDecoration: 'none' }}
            >
              <div className="tag">The digital ground</div>
              <h4>Ankura</h4>
              <p
                className="serif-line"
                style={{ fontSize: 16, marginBottom: 10, color: '#c88a3e' }}
              >
                The Enterprise Digital Ground
              </p>
              <p>
                Embeds Kayak provenance in customer-facing surfaces and calls fulfillment straight from a workflow.
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
                Consumes Kayak asset telemetry as a sensor stream and folds custody evidence into one GRC ledger.
              </p>
            </Link>
            <Link
              href="/kayak"
              className="card link"
              style={{ textDecoration: 'none', border: '1px solid #c88a3e' }}
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
                You are here — every asset, SKU, rack unit, and unit of movement, metered and provable.
              </p>
            </Link>
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
            Pick one floor. Instrument it in 45 days.
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
            A single site, hall, or campus is enough to prove the ledger. We scope it in
            two hours and put it live on the deployment topology you choose.
          </p>
          <div
            style={{
              marginTop: 28,
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
            }}
          >
            <Link href="/contact" className="btn btn-gold">
              Book a Demo
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
