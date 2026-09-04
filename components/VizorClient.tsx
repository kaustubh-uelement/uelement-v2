'use client';

import Link from 'next/link';
import ScopeCanvas from './ScopeCanvas';
import PillarCard from './PillarCard';

export default function VizorClient() {
  return (
    <>
      {/* ═══════ HERO ═══════ */}
      <div className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <ScopeCanvas />
        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div className="crumb">
            <Link href="/">Home</Link> / <Link href="/stambh">StamBH</Link> / Vizor
          </div>
          <h1 className="display" style={{ fontSize: 'var(--text-display)' }}>
            One platform. Seven dimensions. <br />
            <span className="au">Zero blind spots.</span>
          </h1>
          <p className="serif-line" style={{ fontSize: 20, marginTop: 8, color: '#c88a3e' }}>
            StamBH &middot; Watches the digital
          </p>
          <p className="lede" style={{ marginTop: 26 }}>
            The unified observability, security, and compliance fabric for enterprise IT and
            industrial OT — one data lake, one topology graph, one AI engine across every
            dimension you have to see.
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
          <div className="kicker">The six-console investigation</div>
          <h2 className="display text-navy-gradient">
            Six vendors. Six fragments of the truth. <span className="au">One auditor.</span>
          </h2>
          <div style={{ marginTop: 20, maxWidth: '800px' }}>
            <p className="lede" style={{ marginBottom: 16 }}>
              A regulated enterprise assembles its monitoring from an APM vendor, a log
              analytics vendor, a SIEM, a network monitor, a cloud observability tool, a
              GRC platform, and — if it runs industrial assets — a separate OT security
              specialist.
            </p>
            <p className="lede">
              Each holds a piece. None holds the picture. A failed transaction or a lateral
              movement crosses four consoles and three data models before anyone names a root
              cause, and when the auditor arrives the evidence is reconstructed by hand.
            </p>
          </div>
        </div>
      </div>

      {/* ═══════ DIMENSIONS ═══════ */}
      <div className="section navy" id="dimensions">
        <div className="wrap">
          <div className="kicker">The product surface</div>
          <h2 className="display">
            Seven dimensions of visibility,
            <br />
            on <span className="au">one fabric.</span>
          </h2>
          <p className="lede" style={{ marginTop: 20 }}>
            Each dimension is independently activatable. All seven consume the same
            collection infrastructure and the same intelligence layer — so turning one on is
            a licensing decision, not a deployment project.
          </p>

          <div className="grid4" style={{ marginTop: 44 }}>
            <PillarCard
              label="Dimension 01"
              title="Enterprise"
              description="Business processes, KPIs, SLAs, and customer journeys — observability at the outcome layer."
              points={[]}
            />
            <PillarCard
              label="Dimension 02"
              title="Apps"
              description="Full APM: code-level profiling, distributed tracing, and GenAI/LLM observability."
              points={[]}
            />
            <PillarCard
              label="Dimension 03"
              title="Network"
              description="Deep FCAPS, SNMP, NetFlow, packet-level analysis, WAN and SD-WAN."
              points={[]}
            />
            <PillarCard
              label="Dimension 04"
              title="Cloud"
              description="Hybrid and multi-cloud, Kubernetes, serverless, and FinOps cost intelligence."
              points={[]}
            />
            <PillarCard
              label="Dimension 05"
              title="Security"
              description="Runtime application security, SIEM, XDR, and continuous vulnerability management."
              points={[]}
            />
            <PillarCard
              label="Dimension 06"
              title="Compliance"
              description="Frameworks embedded in daily operations, not assembled in annual projects."
              points={[]}
            />
            <PillarCard
              label="Dimension 07"
              title="Risk"
              description="Risk register, controls, key risk indicators, and business continuity planning."
              points={[]}
            />
            <PillarCard
              label="Unified"
              title="One shared fabric"
              description="One data lake. One topology graph. One AI engine. A payment slowdown and a control drift are views of the same graph."
              points={[]}
            />
          </div>
        </div>
      </div>

      {/* ═══════ ARCHITECTURE ═══════ */}
      <div className="section cream" id="architecture">
        <div className="wrap">
          <div className="kicker">Architecture</div>
          <h2 className="display text-navy-gradient">
            Four planes, <span className="au">Purdue-native</span> throughout.
          </h2>
          <p className="lede" style={{ marginTop: 20 }}>
            Every entity, flow, and event is born with a Purdue level and an IEC 62443 zone
            tag. Industrial context is native schema here, not an afterthought bolted onto
            IT-shaped data.
          </p>

          <div className="grid2" style={{ marginTop: 44 }}>
            <div className="card">
              <div className="proglabel slate">Plane 01</div>
              <h4>Collection</h4>
              <p>Purdue-aware taps, sensors, and agents. Every byte timestamped and zone-tagged at source.</p>
            </div>
            <div className="card">
              <div className="proglabel slate">Plane 02</div>
              <h4>Processing</h4>
              <p>Behavioral baselines per device, conduit, and operator, with config-drift detection beside real-time rule and ML detections.</p>
            </div>
            <div className="card">
              <div className="proglabel slate">Plane 03</div>
              <h4>Evidence</h4>
              <p>An immutable zone-and-conduit graph on a tamper-evident, cryptographically signed audit store.</p>
            </div>
            <div className="card">
              <div className="proglabel slate">Plane 04</div>
              <h4>Experience</h4>
              <p>Role-based dashboards, control-room displays, mobile on-call, and a time-travel investigation workbench.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ SENSORS ═══════ */}
      <div className="section alt">
        <div className="wrap">
          <div className="kicker">Collection plane</div>
          <h2 className="display text-navy-gradient">
            Six sensor classes, from plant floor to <span className="au">cloud.</span>
          </h2>
          <p className="lede" style={{ marginTop: 20 }}>
            At Purdue Levels 0–2 Vizor is passive by architecture — no active scanning, no controller write-backs, no automated remediation.
          </p>

          <div className="grid3" style={{ marginTop: 44 }}>
            <div className="card">
              <div className="proglabel slate">Sensor</div>
              <h4>Passive Network Tap</h4>
              <p>Strictly passive hardware taps or SPAN feeds. Zero active probing on industrial segments.</p>
            </div>
            <div className="card">
              <div className="proglabel slate">Sensor</div>
              <h4>Protocol-Aware Analyser</h4>
              <p>Turns raw telemetry into semantic fields through 40+ OT and IT protocol parsers.</p>
            </div>
            <div className="card">
              <div className="proglabel slate">Sensor</div>
              <h4>Host Telemetry Agent</h4>
              <p>A minimal-footprint signed agent for audit log forwarding from hosts that accept one.</p>
            </div>
            <div className="card">
              <div className="proglabel slate">Sensor</div>
              <h4>API / Log Collector</h4>
              <p>Read-only subscriptions to MES, historians, SCADA, and identity providers.</p>
            </div>
            <div className="card">
              <div className="proglabel slate">Sensor</div>
              <h4>Session Recording Integrator</h4>
              <p>Session metadata from CyberArk, BeyondTrust, and Thycotic.</p>
            </div>
            <div className="card">
              <div className="proglabel slate">Sensor</div>
              <h4>Evidence Channel Bridge</h4>
              <p>Carries compliance evidence across data diodes and unidirectional gateways.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ VIZOR IQ ═══════ */}
      <div className="section cream" id="vizoriq">
        <div className="wrap">
          <div className="kicker">VizorIQ</div>
          <h2 className="display text-navy-gradient">
            Three engines. Five agents. One graph to <span className="au">reason over.</span>
          </h2>
          <p className="lede" style={{ marginTop: 20 }}>
            Intelligence layered over the topology graph to accelerate time-to-resolution and audit readiness.
          </p>

          <div className="grid3" style={{ marginTop: 44 }}>
            <div className="card">
              <div className="proglabel slate">Causal</div>
              <h4>Causal AI</h4>
              <p>
                Deterministic root-cause analysis grounded in the live topology graph. The causal chain is shown, not asserted.
              </p>
            </div>
            <div className="card">
              <div className="proglabel slate">Predictive</div>
              <h4>Predictive AI</h4>
              <p>
                Forward projection on capacity exhaustion, SLO burn-down, and attack-surface drift — act before the threshold breaks.
              </p>
            </div>
            <div className="card">
              <div className="proglabel slate">Generative</div>
              <h4>Generative AI</h4>
              <p>
                A natural-language copilot on a private, SOC 2-aligned LLM. Every answer traceable to the evidence it came from.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ THE MAINSTAY TRIO ═══════ */}
      <div className="section alt">
        <div className="wrap">
          <div className="kicker">The StamBH trio</div>
          <h2 className="display text-navy-gradient">
            Vizor watches what Ankura builds.
            <br />
            Kayak commands the <span className="au">physical.</span>
          </h2>
          <div className="grid3" style={{ marginTop: 44 }}>
            <Link
              href="/ankura"
              className="card link"
              style={{ textDecoration: 'none' }}
            >
              <div className="tag">The digital fabric</div>
              <h4>Ankura</h4>
              <p
                className="serif-line"
                style={{ fontSize: 16, marginBottom: 10, color: '#c88a3e' }}
              >
                The Enterprise Digital Fabric
              </p>
              <p>
                Business journeys and compliance artifacts flow in from Ankura without separate agents to deploy.
              </p>
            </Link>
            <Link
              href="/vizor"
              className="card link"
              style={{ textDecoration: 'none', border: '1px solid #c88a3e' }}
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
                You are here — observability, security, and GRC across enterprise IT and industrial OT.
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
                Feeds asset telemetry into the collection plane and custody evidence into the same GRC ledger.
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
            First signal in 45 days.
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
            A two-hour scoping workshop, a fourteen-day proof-of-value deployment on one critical business journey, and a day-45 review.
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
              Book the workshop
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
