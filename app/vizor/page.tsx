import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vizor | One Platform. Seven Dimensions. Zero Blind Spots. | UElement',
  description:
    'Unified observability, security and compliance fabric for enterprise IT and industrial OT.',
};

export default function VizorPage() {
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
            / Vizor
          </div>
          <div className="tag">StamBH · Watches the digital</div>
          <h1 className="display" style={{ fontSize: 'var(--text-display)' }}>
            Vizor
          </h1>
          <p className="serif-line">
            One Platform. Seven Dimensions. Zero Blind Spots.
          </p>
          <p className="lede" style={{ marginTop: 22 }}>
            A unified observability, security and compliance fabric for
            enterprise IT and industrial OT. One data lake, one topology graph,
            one AI engine, from board-level KPIs down to the packet on the
            wire.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 14,
              marginTop: 28,
              flexWrap: 'wrap',
            }}
          >
            <Link href="/contact" className="btn btn-gold">
              Start a 45-day proof of value
            </Link>
            <Link href="/contact" className="btn btn-line">
              Request the architecture briefing
            </Link>
          </div>
        </div>
      </div>

      {/* Seven Dimensions */}
      <div className="section alt">
        <div className="wrap">
          <div className="kicker">The seven dimensions</div>
          <h2 className="display" style={{ fontSize: 30 }}>
            Everything that can fail, watched.
          </h2>
          <div className="grid4" style={{ marginTop: 36 }}>
            <div className="card">
              <h4>Enterprise</h4>
              <p>Business processes, KPIs, SLAs, customer journeys.</p>
            </div>
            <div className="card">
              <h4>Apps</h4>
              <p>
                Full APM, code-level profiling, distributed tracing, GenAI/LLM
                observability.
              </p>
            </div>
            <div className="card">
              <h4>Network</h4>
              <p>Deep FCAPS, SNMP, NetFlow, packet level, WAN &amp; SD-WAN.</p>
            </div>
            <div className="card">
              <h4>Cloud</h4>
              <p>Hybrid, multi-cloud, Kubernetes, serverless, FinOps.</p>
            </div>
            <div className="card">
              <h4>Security</h4>
              <p>
                Runtime AppSec, SIEM, XDR, continuous vulnerability management.
              </p>
            </div>
            <div className="card">
              <h4>Compliance</h4>
              <p>Automated frameworks embedded in daily operations.</p>
            </div>
            <div className="card">
              <h4>Risk</h4>
              <p>
                Risk register, controls, KRIs, business continuity planning.
              </p>
            </div>
            <div
              className="card"
              style={{ borderColor: 'rgba(224,167,105,0.5)' }}
            >
              <h4 style={{ color: 'var(--gold-500)' }}>One shared fabric</h4>
              <p>Data lake + topology graph + AI engine unify all seven.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Architectural planes + VizorIQ */}
      <div className="section">
        <div className="wrap grid2" style={{ alignItems: 'start' }}>
          <div>
            <div className="kicker">Four architectural planes</div>
            <div className="steps" style={{ marginTop: 26 }}>
              <div className="step">
                <b>Collection</b>
                <p>
                  Purdue-aware hardware taps, software sensors, lightweight
                  agents. Every byte timestamped and zone-tagged at source.
                  Passive by architecture at Levels 0–2.
                </p>
              </div>
              <div className="step">
                <b>Processing</b>
                <p>
                  Behavioral baselining per device, conduit, and operator.
                  Config-drift detection alongside real-time rule and ML threat
                  detections.
                </p>
              </div>
              <div className="step">
                <b>Evidence</b>
                <p>
                  Telemetry structured into an immutable zone/conduit graph.
                  Tamper-evident, cryptographically signed audit store.
                </p>
              </div>
              <div className="step">
                <b>Experience</b>
                <p>
                  Role-based dashboards, control-room screens, mobile on-call,
                  and an investigation workbench with time-travel scrub.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="kicker">VizorIQ intelligence</div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                marginTop: 26,
              }}
            >
              <div className="card">
                <h4>Causal AI</h4>
                <p>
                  Deterministic root-cause analysis grounded in live topology;
                  analysis to root cause in 30 seconds or less.
                </p>
              </div>
              <div className="card">
                <h4>Predictive AI</h4>
                <p>
                  72-hour forward forecasting for capacity, SLO burn, and
                  attack-surface drift.
                </p>
              </div>
              <div className="card">
                <h4>Generative AI</h4>
                <p>
                  An audit-backed, citation-supported natural-language copilot
                  on a private LLM.
                </p>
              </div>
              <div className="card">
                <h4>Five-agent fleet</h4>
                <p>
                  SecOps, SRE, GRC, FinOps and Developer agents: triage,
                  diagnose, evidence, right-size, fix.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Protocol coverage */}
      <div className="section navy">
        <div className="wrap">
          <div className="kicker">Protocol coverage</div>
          <h2 className="display" style={{ fontSize: 28 }}>
            Fluent in the languages of industry.
          </h2>
          <div className="chips" style={{ marginTop: 26 }}>
            {[
              'Modbus',
              'DNP3',
              'IEC 60870-5-104',
              'IEC 61850',
              'OPC UA',
              'EtherNet/IP + CIP',
              'PROFINET',
              'S7',
              'CC-Link IE',
              'HART-IP',
              'WirelessHART',
              'ISA-100.11a',
              'LoRaWAN',
              'Zigbee',
              'BLE',
              'SMB',
              'RDP',
              'SSH',
              'LDAP/Kerberos',
              'NetFlow',
              'Zeek',
              'MQTT',
              'Kafka',
              'BACnet/IP',
              '+ open templates for proprietary parsers',
            ].map((c) => (
              <span className="chip" key={c}>
                {c}
              </span>
            ))}
          </div>
          <div className="grid4" style={{ marginTop: 44 }}>
            <div className="stat">
              <b>28B+</b>
              <span>Monitored events per month, by design target</span>
            </div>
            <div className="stat">
              <b>≤30s</b>
              <span>Causal root-cause time</span>
            </div>
            <div className="stat">
              <b>500+</b>
              <span>Pre-built adaptors and parsers</span>
            </div>
            <div className="stat">
              <b>99.99%</b>
              <span>Platform availability SLA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance + Deployment */}
      <div className="section light">
        <div className="wrap grid2" style={{ alignItems: 'start' }}>
          <div>
            <div className="kicker">Compliance as exhaust</div>
            <h2
              className="display"
              style={{ fontSize: 28, color: 'var(--navy-900)' }}
            >
              Evidence generated daily, not reconstructed for audit season.
            </h2>
            <p className="mut" style={{ marginTop: 16 }}>
              Compliance packs for IEC 62443, CERT-In / CEA 6-hour reporting,
              DPDP Act, RBI &amp; SEBI frameworks, NIST SP 800-82 / CSF 2.0,
              PCI-DSS v4.0, HIPAA, NERC CIP, ISO 27001:2022, ISO 27019, and EU
              AI Act model lineage.
            </p>
          </div>
          <div>
            <div className="kicker">Deployment topologies</div>
            <table className="spec" style={{ marginTop: 20 }}>
              <tbody>
                <tr>
                  <td>On-prem air-gapped</td>
                  <td>Defence, nuclear, sovereign facilities</td>
                </tr>
                <tr>
                  <td>On-prem connected</td>
                  <td>Tier-1 BFSI and government</td>
                </tr>
                <tr>
                  <td>Sovereign cloud</td>
                  <td>In-region cloud partners</td>
                </tr>
                <tr>
                  <td>Hybrid managed</td>
                  <td>Regulated enterprise</td>
                </tr>
                <tr>
                  <td>Managed SaaS</td>
                  <td>Mid-market and fintech</td>
                </tr>
              </tbody>
            </table>
            <p className="mut" style={{ marginTop: 14, fontSize: 13 }}>
              Five topologies. One control plane, one VizorIQ, one set of APIs.
            </p>
          </div>
        </div>
      </div>

      {/* Engagement model */}
      <div className="section">
        <div className="wrap">
          <div className="kicker">Engagement model</div>
          <h2 className="display" style={{ fontSize: 28 }}>
            Five gates from first call to steady state.
          </h2>
          <div
            className="grid4"
            style={{ marginTop: 34, gridTemplateColumns: 'repeat(5,1fr)' }}
          >
            <div className="card">
              <p
                className="mono"
                style={{ color: 'var(--gold-500)', marginBottom: 8 }}
              >
                G0 · 2 wks
              </p>
              <h4>Discovery</h4>
              <p>Signed scoping pack: assets, zones, deployment shape.</p>
            </div>
            <div className="card">
              <p
                className="mono"
                style={{ color: 'var(--gold-500)', marginBottom: 8 }}
              >
                G1 · 4 wks
              </p>
              <h4>Reference</h4>
              <p>Live telemetry from a candidate reference site.</p>
            </div>
            <div className="card">
              <p
                className="mono"
                style={{ color: 'var(--gold-500)', marginBottom: 8 }}
              >
                G2 · 6 wks
              </p>
              <h4>Expansion</h4>
              <p>End-to-end identity stitching and data correlation.</p>
            </div>
            <div className="card">
              <p
                className="mono"
                style={{ color: 'var(--gold-500)', marginBottom: 8 }}
              >
                G3 · 4 wks
              </p>
              <h4>Assurance</h4>
              <p>Detection tuning, operator training, sign-off.</p>
            </div>
            <div className="card">
              <p
                className="mono"
                style={{ color: 'var(--gold-500)', marginBottom: 8 }}
              >
                G4 · ∞
              </p>
              <h4>Operate</h4>
              <p>Governance reviews and continuous detection refresh.</p>
            </div>
          </div>
          <p className="mut" style={{ marginTop: 22 }}>
            Standard entry motion: a 45-day proof of value scoped to one
            critical business journey.
          </p>
        </div>
      </div>
    </>
  );
}
