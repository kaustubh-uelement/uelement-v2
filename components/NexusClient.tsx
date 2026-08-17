'use client';

import Link from 'next/link';
import WeaveCanvas from './WeaveCanvas';

export default function NexusClient() {
  return (
    <>
      {/* ═══════ HERO ═══════ */}
      <div
        className="hero"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <WeaveCanvas />
        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div className="crumb">
            <Link href="/">Home</Link> / Nexus
          </div>
          <h1 className="display" style={{ fontSize: 'var(--text-display)' }}>
            The Enterprise <span className="au">Digital Fabric</span>
          </h1>
          <p
            className="serif-line"
            style={{ fontSize: 20, marginTop: 8, color: '#c88a3e' }}
          >
            MainSTAY &middot; the digital fabric
          </p>
          <p className="lede" style={{ marginTop: 26 }}>
            One platform to build and run every outward-facing surface your
            enterprise touches — web, mobile, search, and AI-native experiences
            — governed by a single workflow and analytics fabric.
          </p>
          <div style={{ marginTop: 28, display: 'flex', gap: '16px' }}>
            <Link href="/contact" className="btn btn-gold">
              Book a scoping workshop
            </Link>
          </div>
        </div>
      </div>

      {/* ═══════ THE SPRAWL PROBLEM ═══════ */}
      <div className="section alt">
        <div className="wrap">
          <div className="kicker">The sprawl problem</div>
          <h2 className="display text-navy-gradient">
            Ten platforms are telling ten <span className="au">versions</span>{' '}
            of your story.
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

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              marginTop: '44px',
            }}
          >
            {/* Pillar 01 */}
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
                Pillar 01
              </div>
              <h4
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  marginBottom: '24px',
                  color: '#fff',
                }}
              >
                Web Platform
              </h4>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: '#e2e8f0',
                  marginBottom: '24px',
                }}
              >
                Every site the enterprise runs — corporate, commerce, help
                centre, careers, community — from one headless core.
              </p>
              <ul
                style={{
                  paddingLeft: '20px',
                  color: '#94a3b8',
                  fontSize: '14px',
                  lineHeight: 1.6,
                }}
              >
                <li>Visual builder on server-rendered React</li>
                <li>Multi-brand, multi-region, multi-language on one tenant</li>
                <li>Accessibility and performance gates enforced at publish</li>
              </ul>
            </div>

            {/* Pillar 02 */}
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
                Pillar 02
              </div>
              <h4
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  marginBottom: '24px',
                  color: '#fff',
                }}
              >
                Mobile Applications
              </h4>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: '#e2e8f0',
                  marginBottom: '24px',
                }}
              >
                iOS and Android from a single runtime, sharing the web
                platform&apos;s design system and content model.
              </p>
              <ul
                style={{
                  paddingLeft: '20px',
                  color: '#94a3b8',
                  fontSize: '14px',
                  lineHeight: 1.6,
                }}
              >
                <li>Normalized native SDK across both platforms</li>
                <li>Over-the-air updates without store review cycles</li>
                <li>Store submission pipelines built in</li>
              </ul>
            </div>

            {/* Pillar 03 */}
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
                Pillar 03
              </div>
              <h4
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  marginBottom: '24px',
                  color: '#fff',
                }}
              >
                Search & Discovery
              </h4>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: '#e2e8f0',
                  marginBottom: '24px',
                }}
              >
                Found on Google, and found by the generative engines your buyers
                increasingly ask instead of Google.
              </p>
              <ul
                style={{
                  paddingLeft: '20px',
                  color: '#94a3b8',
                  fontSize: '14px',
                  lineHeight: 1.6,
                }}
              >
                <li>SEO governance on every published surface</li>
                <li>GEO — generative engine optimization, first-class</li>
                <li>Semantic in-property search in every language</li>
              </ul>
            </div>

            {/* Pillar 04 */}
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
                Pillar 04
              </div>
              <h4
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  marginBottom: '24px',
                  color: '#fff',
                }}
              >
                Workflow Studio
              </h4>
              <p
                style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: '#e2e8f0',
                  marginBottom: '24px',
                }}
              >
                Visual orchestration with a TypeScript escape hatch — the
                connective tissue of the whole fabric.
              </p>
              <ul
                style={{
                  paddingLeft: '20px',
                  color: '#94a3b8',
                  fontSize: '14px',
                  lineHeight: 1.6,
                }}
              >
                <li>Long-running, durable, auditable workflows</li>
                <li>Human-in-the-loop approvals and escalation</li>
                <li>Triggered from any surface, webhook, or schedule</li>
              </ul>
            </div>
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
                Embedded copilots across every Nexus surface. Bring your own key
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

      {/* ═══════ GEO SECTION (CREAM) ═══════ */}
      <div className="section cream">
        <div className="wrap">
          <div className="kicker">Generative engine optimization</div>
          <h2 className="display">
            Your next customer won&apos;t search.{' '}
            <span className="au">They&apos;ll ask.</span>
          </h2>
          <div style={{ marginTop: 20, maxWidth: '800px' }}>
            <p className="lede" style={{ marginBottom: 16 }}>
              Buyers increasingly begin with ChatGPT, Perplexity, Google AI
              Overviews, or Gemini rather than a search box. Being ranked is no
              longer the same as being cited.
            </p>
            <p className="lede">
              Nexus ships GEO as a first-class module: structured content,
              metadata, and grounding designed so generative engines surface and
              cite your properties. It is a discipline the market has barely
              named, and the tooling to do it deliberately is close to
              non-existent.
            </p>
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
                REST, GraphQL, and webhooks for every capability — Nexus can be
                the headless backend for surfaces you build yourself.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ THE MAINSTAY TRIO ═══════ */}
      <div className="section alt">
        <div className="wrap">
          <div className="kicker">The MainSTAY trio</div>
          <h2 className="display text-navy-gradient">
            Nexus projects outward.
            <br />
            Its siblings handle the <span className="au">rest.</span>
          </h2>
          <div className="grid3" style={{ marginTop: 44 }}>
            <Link
              href="/nexus"
              className="card link"
              style={{ textDecoration: 'none', border: '1px solid #c88a3e' }}
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
                Instruments what Nexus publishes — business journeys, runtime
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
                Fulfils what Nexus sells — order fulfillment, provenance
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
            Launch one live property in 45 days.
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
            A two-hour scoping workshop maps your surface area. A 45-day proof
            of value puts one Nexus property live on the deployment topology you
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
