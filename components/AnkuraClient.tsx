'use client';

import Link from 'next/link';
import SpectralCanvas from './SpectralCanvas';
import PillarCard from './PillarCard';

export default function AnkuraClient() {
  return (
    <>
      {/* ═══════ HERO ═══════ */}
      <div
        className="hero"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <SpectralCanvas />
        <div
          className="wrap"
          style={{ position: 'relative', zIndex: 1, pointerEvents: 'none' }}
        >
          <div style={{ maxWidth: '640px' }}>
            <div className="crumb" style={{ pointerEvents: 'auto' }}>
              <Link href="/">Home</Link> / Ankura
            </div>
            <h1
              className="display"
              style={{
                fontSize: 'var(--text-display)',
              }}
            >
              The Enterprise <span className="au">Digital Fabric</span>
            </h1>
            <p
              className="serif-line"
              style={{
                fontSize: 20,
                marginTop: 8,
                color: '#c88a3e',
              }}
            >
              StamBH &middot; the digital fabric
            </p>
            <p
              className="lede"
              style={{
                marginTop: 26,
                textShadow: '0 2px 20px rgba(7, 23, 57, 0.85)',
              }}
            >
              One platform to build and run every outward-facing surface your
              enterprise touches — web, mobile, search, and AI-native
              experiences — governed by a single workflow and analytics fabric.
            </p>
            <div
              style={{
                marginTop: 28,
                display: 'flex',
                gap: '16px',
                pointerEvents: 'auto',
              }}
            >
              <Link href="/contact" className="btn btn-gold">
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ THE SPRAWL PROBLEM ═══════ */}
      <div className="section alt">
        <div className="wrap">
          <div className="kicker">The sprawl problem</div>
          <h2 className="display text-navy-gradient">
            Ten platforms are telling <br />
            ten <span className="au"> versions</span> of your story.
          </h2>
          <div style={{ marginTop: 20, maxWidth: '800px' }}>
            <p className="lede" style={{ marginBottom: 16 }}>
              The average enterprise assembles its outward-facing presence from
              a headless CMS, a mobile app platform, an SEO stack, a workflow
              engine, and a growing zoo of AI tools bolted on the edges — each
              with its own login, data model, analytics, and compliance surface.
            </p>
            <p className="lede">
              The result is familiar to every CIO and CMO: fragmented customer
              data, integration debt that only grows, blurred accountability
              during outages, and duplicated compliance evidence at every audit.
            </p>
          </div>
        </div>
      </div>

      {/* ═══════ FOUR THREADS, ONE WEAVE (PILLARS) ═══════ */}
      <div className="section navy" id="pillars">
        <div className="wrap">
          <div className="kicker">Four threads, one weave</div>
          <h2 className="display">
            Every pillar is a thread.
            <br />
            The platform is the <span className="au">fabric.</span>
          </h2>
          <p className="lede" style={{ marginTop: 20 }}>
            Activate them independently — they share identity, workflows,
            analytics, and the AI substrate underneath.
          </p>

          <div className="grid2" style={{ marginTop: 44 }}>
            <PillarCard
              label="Pillar 01"
              title="Web Platform"
              description="Every site the enterprise runs — corporate, commerce, help centre, careers, community — from one headless core."
              points={[
                'Visual builder on server-rendered React',
                'Multi-brand, multi-region, multi-language on one tenant',
                'Accessibility and performance gates enforced at publish',
              ]}
            />
            <PillarCard
              label="Pillar 02"
              title="Mobile Applications"
              description="iOS and Android from a single runtime, sharing the web platform's design system and content model."
              points={[
                'Normalized native SDK across both platforms',
                'Over-the-air updates without store review cycles',
                'Store submission pipelines built in',
              ]}
            />
            <PillarCard
              label="Pillar 03"
              title="Search & Discovery"
              description="Found on Google, and found by the generative engines your buyers increasingly ask instead of Google."
              points={[
                'SEO governance on every published surface',
                'GEO — generative engine optimization, first-class',
                'Semantic in-property search in every language',
              ]}
            />
            <PillarCard
              label="Pillar 04"
              title="Workflow Studio"
              description="Visual orchestration with a TypeScript escape hatch — the connective tissue of the whole fabric."
              points={[
                'Long-running, durable, auditable workflows',
                'Human-in-the-loop approvals and escalation',
                'Triggered from any surface, webhook, or schedule',
              ]}
            />
          </div>
        </div>
      </div>

      {/* ═══════ THE AI SUBSTRATE ═══════ */}
      <div className="section cream">
        <div className="wrap">
          <div className="kicker">The AI substrate</div>
          <h2 className="display text-navy-gradient">
            Not a bolt-on. The layer everything{' '}
            <span className="au">runs on.</span>
          </h2>
          <p className="lede" style={{ marginTop: 20 }}>
            Four capabilities that power every pillar above them, and that your
            developers and workflow designers consume directly.
          </p>

          <div className="grid2" style={{ marginTop: 44 }}>
            <div className="card">
              <div className="proglabel slate">Agents</div>
              <h4>Agentic AI Automation</h4>
              <p>
                Task-completing agents over the tools you define, with trust
                levels from suggestion-only to full autonomy and every decision
                captured for replay.
              </p>
            </div>
            <div className="card">
              <div className="proglabel slate">Generate</div>
              <h4>Generative AI</h4>
              <p>
                Embedded copilots across every Ankura surface. Bring your own key
                across frontier providers, with versioned prompts and evaluation
                built in.
              </p>
            </div>
            <div className="card">
              <div className="proglabel slate">Sovereign</div>
              <h4>OpenLM</h4>
              <p>
                Self-hosted open-weights models — Llama, Mistral, Qwen, DeepSeek
                — with fine-tuning, RAG infrastructure, and inference tuning
                inside your perimeter.
              </p>
            </div>
            <div className="card">
              <div className="proglabel slate">Analyze</div>
              <h4>Advanced Data Analytics</h4>
              <p>
                Warehouse-native on Snowflake, BigQuery, or ClickHouse, with
                AI-generated insights and natural-language exploration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ EXTENDED PLATFORM ═══════ */}
      <div className="section navy">
        <div className="wrap">
          <div className="kicker">Extended platform</div>
          <h2 className="display">
            What a serious digital fabric{' '}
            <span className="au">can&apos;t ship without.</span>
          </h2>

          <div className="grid3" style={{ marginTop: 44 }}>
            <div className="card">
              <div className="proglabel slate">Experience</div>
              <h4>Customer Data Platform</h4>
              <p>
                A unified profile stitched from web, mobile, support, and
                commerce activity — the substrate that makes AI personal rather
                than generic.
              </p>
            </div>
            <div className="card">
              <div className="proglabel slate">Experience</div>
              <h4>Personalization & testing</h4>
              <p>
                Content variants, A/B and multivariate experiments, ML-driven
                recommendations, and feature flags on every surface.
              </p>
            </div>
            <div className="card">
              <div className="proglabel slate">Experience</div>
              <h4>Conversational channels</h4>
              <p>
                WhatsApp, RCS, voice, and in-app chat treated as peers of web
                and mobile, not afterthoughts.
              </p>
            </div>
            <div className="card">
              <div className="proglabel slate">Trust</div>
              <h4>Quantum-safe by default</h4>
              <p>
                Every hosted property inherits post-quantum cryptography posture
                from UElement&apos;s U92 practice.
              </p>
            </div>
            <div className="card">
              <div className="proglabel slate">Trust</div>
              <h4>Consent & privacy engine</h4>
              <p>
                DPDP, GDPR, and CCPA banners and data-principal rights workflows
                implemented per region automatically.
              </p>
            </div>
            <div className="card">
              <div className="proglabel slate">Developer</div>
              <h4>API-first everywhere</h4>
              <p>
                REST, GraphQL, and webhooks for every capability — Ankura can be
                the headless backend for surfaces you build yourself.
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
            Ankura projects outward.
            <br />
            Its siblings handle the <span className="au">rest.</span>
          </h2>
          <div className="grid3" style={{ marginTop: 44 }}>
            <Link
              href="/ankura"
              className="card link"
              style={{ textDecoration: 'none', border: '1px solid #c88a3e' }}
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
                You are here — every digital surface, every workflow, every AI
                capability.
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
                Instruments what Ankura publishes — business journeys, runtime
                security, and compliance evidence, with no separate agents to
                deploy.
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
                Fulfils what Ankura sells — order fulfillment, provenance
                widgets, and asset lifecycle flows callable from any workflow.
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
            Launch one live property in 5 days.
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
            A two-hour scoping workshop maps your surface area. A 5-day proof of
            value puts one Ankura property live on the deployment topology you
            choose.
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
