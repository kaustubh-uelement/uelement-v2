"use client";

import Link from "next/link";
import SpectralCanvas from "./SpectralCanvas";
import PillarCard from "./PillarCard";
import AnkuraOrganisationsCarousel from "./AnkuraOrganisationsCarousel";
import { branding } from "@/lib/content/branding";

export default function AnkuraClient() {
  return (
    <>
      {/* ═══════ HERO ═══════ */}
      <div
        className="hero"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <SpectralCanvas />
        <div
          className="wrap"
          style={{ position: "relative", zIndex: 1, pointerEvents: "none" }}
        >
          <div style={{ maxWidth: "640px" }}>
            <div className="crumb" style={{ pointerEvents: "auto" }}>
              <Link href="/">Home</Link> / <Link href="/stambh">{branding.stambh}</Link> / {branding.ankura}
            </div>
            <h1
              className="display"
              style={{
                fontSize: "var(--text-display)",
              }}
            >
              Weave your digital business <span className="au">into one.</span>
            </h1>
            <p
              className="serif-line"
              style={{
                fontSize: 20,
                marginTop: 8,
                color: "#c88a3e",
              }}
            >
              {branding.stambh} &middot; the digital fabric
            </p>
            <p
              className="lede"
              style={{
                marginTop: 26,
                textShadow: "0 2px 20px rgba(7, 23, 57, 0.85)",
              }}
            >
              {branding.ankura} connects the digital experiences, workflows, data and intelligence your enterprise relies on, into one <strong style={{ color: "#fff" }}>unified, always-on platform</strong> built to simplify complexity and scale with your business.
            </p>
            <div
              style={{
                marginTop: 28,
                display: "flex",
                gap: "16px",
                pointerEvents: "auto",
              }}
            >
              <Link href="/contact" className="btn btn-gold">
                Book a demo session
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ ORGANISATIONS RUNNING ON ANKURA PLATFORM ═══════ */}
      <AnkuraOrganisationsCarousel />

      {/* ═══════ THE PROBLEM BEHIND THE COMPLEXITY ═══════ */}
      <div className="section alt" id="problem">
        <div className="wrap">
          <div className="kicker">The problem behind the complexity</div>
          <h2 className="display text-navy-gradient">
            The threads are already there. <br />
            <span className="au">The problem is they don&apos;t work as one.</span>
          </h2>
          <div style={{ marginTop: 20, maxWidth: "800px" }}>
            <p className="lede" style={{ marginBottom: 16 }}>
              Your website, mobile experience, search, workflows, analytics and AI may each work well on their own. But when they live across different platforms, they create a <strong style={{ color: "#fff" }}>fragmented digital business.</strong>
            </p>
            <p className="lede" style={{ marginBottom: 24 }}>
              Different logins. Different data models. Different analytics. Different decisions. Connecting them takes time, creates integration overhead and makes it harder to see the complete picture of your business.
            </p>
            <div
              style={{
                borderLeft: "1px solid #555",
                paddingLeft: "25px",
                marginTop: "20px",
              }}
            >
              <p style={{ color: "#fff", fontSize: "19px", fontWeight: 600, marginBottom: "8px" }}>
                What if they worked as one?
              </p>
              <p className="lede">
                <strong>One platform. One connected data foundation. One clearer view of your business.</strong> {branding.ankura} helps reduce fragmentation so your teams have more room to focus on customers, operations and what comes next.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ FOUR THREADS, ONE WEAVE (PILLARS) ═══════ */}
      <div className="section navy" id="threads">
        <div className="wrap">
          <div className="kicker">Four threads, one weave</div>
          <h2 className="display">
            Every pillar is a thread.
            <br />
            Together, they become the <span className="au">fabric.</span>
          </h2>
          <p className="lede" style={{ marginTop: 20 }}>
            Activate them independently. Run them as one. {branding.ankura} keeps the foundation connected underneath, so adding a capability doesn&apos;t mean adding another silo.
          </p>

          <div className="grid2" style={{ marginTop: 44 }}>
            <PillarCard
              label="Pillar 01 · Web"
              title="Create digital experiences without creating another silo."
              description="Build, manage and scale web experiences from one shared foundation across brands, regions and journeys."
              points={[
                "Faster delivery across digital properties",
                "Consistent experiences and governance",
                "Less platform complexity as you scale",
              ]}
            />
            <PillarCard
              label="Pillar 02 · Mobile"
              title="Extend the experience without duplicating the foundation."
              description="Bring mobile into the same digital fabric so customers experience one connected business across channels."
              points={[
                "Less duplication across channels",
                "More consistent customer journeys",
                "Easier management as mobile grows",
              ]}
            />
            <PillarCard
              label="Pillar 03 · Search & Discovery"
              title="Make your business easier to find, and easier to understand."
              description="Connect search, content and emerging AI-led discovery to the same digital foundation."
              points={[
                "Stronger discoverability across channels",
                "Connected content and search experience",
                "A clearer path from discovery to engagement",
              ]}
            />
            <PillarCard
              label="Pillar 04 · Workflow"
              title="Turn operational complexity into connected workflows."
              description="Automate repetitive processes while keeping people in control where decisions matter."
              points={[
                "Less manual operational effort",
                "Faster execution across teams",
                "More consistent business processes",
              ]}
            />
          </div>

          <p
            className="serif-line"
            style={{
              fontSize: "14px",
              color: "#888",
              marginTop: "35px",
            }}
          >
            <strong style={{ color: "#fff" }}>One unified, always-on platform:</strong> identity, workflows, analytics and AI remain connected underneath, so each capability can work independently without creating another silo.
          </p>
        </div>
      </div>

      {/* ═══════ THE AI SUBSTRATE ═══════ */}
      <div className="section cream" id="ai">
        <div className="wrap">
          <div className="kicker">The AI substrate</div>
          <h2 className="display text-navy-gradient">
            Intelligence <span className="au">woven into the fabric.</span>
          </h2>
          <p className="lede" style={{ marginTop: 20 }}>
            AI shouldn&apos;t sit beside your digital business. It should work within it. {branding.ankura} puts intelligence inside the fabric, where it can work with your workflows, data and experiences.
          </p>

          <div className="grid2" style={{ marginTop: 44 }}>
            <div className="card">
              <div className="proglabel slate">Agentic AI</div>
              <h4>Let routine work move forward.</h4>
              <p>
                Automate repeatable workflows through intelligent actions with defined levels of autonomy.
              </p>
              <p style={{ color: "var(--gold-500)", marginTop: 12, fontSize: 14 }}>
                <strong>Business outcome:</strong> less manual work, faster execution and more consistent operations.
              </p>
            </div>
            <div className="card">
              <div className="proglabel slate">Generative AI</div>
              <h4>Help teams create and respond faster.</h4>
              <p>
                Bring intelligent assistance into the experiences and workflows people already use: from content to customer-facing journeys.
              </p>
              <p style={{ color: "var(--gold-500)", marginTop: 12, fontSize: 14 }}>
                <strong>Business outcome:</strong> faster creation and response without adding another disconnected tool.
              </p>
            </div>
            <div className="card">
              <div className="proglabel slate">OpenLM</div>
              <h4>Choose the AI model that fits your business.</h4>
              <p>
                Integrate open-weight models such as Llama, Mistral, Qwen or DeepSeek with room for tuning and retrieval-augmented experiences.
              </p>
              <p style={{ color: "var(--gold-500)", marginTop: 12, fontSize: 14 }}>
                <strong>Business outcome:</strong> greater control over deployment, model choice and the economics of scaling AI.
              </p>
            </div>
            <div className="card">
              <div className="proglabel slate">Advanced Data Analytics</div>
              <h4>Turn connected data into better decisions.</h4>
              <p>
                Use the same data foundation to understand what is happening across your digital business and where action is needed.
              </p>
              <p style={{ color: "var(--gold-500)", marginTop: 12, fontSize: 14 }}>
                <strong>Business outcome:</strong> a clearer business view, stronger decisions and less time reconciling data.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ EXTENDED PLATFORM ═══════ */}
      <div className="section navy" id="extended">
        <div className="wrap">
          <div className="kicker">Extended platform</div>
          <h2 className="display">
            Extend the fabric.
            <br />
            Not the <span className="au">fragmentation.</span>
          </h2>
          <p className="lede" style={{ marginTop: 20 }}>
            Extend the same foundation into customer data, personalization, conversations and trust, without rebuilding your digital experience around another disconnected stack.
          </p>

          <div className="grid3" style={{ marginTop: 44 }}>
            <div className="card">
              <div className="proglabel slate">Experience</div>
              <h4>Customer Data Platform</h4>
              <p>
                Bring customer signals together across web, mobile, support and commerce for a more complete view.
              </p>
            </div>
            <div className="card">
              <div className="proglabel slate">Experience</div>
              <h4>Personalization &amp; Testing</h4>
              <p>
                Test, learn and adapt experiences across channels with one connected experimentation foundation.
              </p>
            </div>
            <div className="card">
              <div className="proglabel slate">Experience</div>
              <h4>Conversational Channels</h4>
              <p>
                Connect WhatsApp, RCS, voice and in-app conversations as part of the same digital journey.
              </p>
            </div>
            <div className="card">
              <div className="proglabel slate">Trust</div>
              <h4>Quantum-safe by default</h4>
              <p>
                Build the digital foundation with a security posture designed for the enterprise environments of tomorrow.
              </p>
            </div>
            <div className="card">
              <div className="proglabel slate">Trust</div>
              <h4>Consent &amp; Privacy Engine</h4>
              <p>
                Make regional consent and privacy workflows part of the platform instead of another operational layer.
              </p>
            </div>
            <div className="card">
              <div className="proglabel slate">Developer</div>
              <h4>API-first everywhere</h4>
              <p>
                Connect the systems you keep while reducing the need to stitch together another layer of tools.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ THE STAMBH TRIO ═══════ */}
      <div className="section alt" id="trio">
        <div className="wrap">
          <div className="kicker">{branding.stambhTrio}</div>
          <h2 className="display text-navy-gradient">
            Three platforms.
            <br />
            One connected <span className="au">enterprise.</span>
          </h2>
          <p className="lede" style={{ marginTop: 20 }}>
            {branding.ankura}, Vizor and Kayak are designed to work together, connecting digital experience, visibility and the operational fabric behind what your business delivers.
          </p>
          <div className="grid3" style={{ marginTop: 44 }}>
            <Link
              href="/ankura"
              className="card link"
              style={{ textDecoration: "none", border: "1px solid #c88a3e" }}
            >
              <div className="tag">The digital fabric</div>
              <h4>{branding.ankura}</h4>
              <p
                className="serif-line"
                style={{ fontSize: 16, marginBottom: 10, color: "#c88a3e" }}
              >
                The Enterprise Digital Fabric
              </p>
              <p>
                Build and run outward-facing digital experiences, workflows, analytics and AI from one unified foundation.
              </p>
            </Link>
            <Link
              href="/vizor"
              className="card link"
              style={{ textDecoration: "none" }}
            >
              <div className="tag">The observability fabric</div>
              <h4>Vizor</h4>
              <p
                className="serif-line"
                style={{ fontSize: 16, marginBottom: 10, color: "#c88a3e" }}
              >
                One Platform. Seven Dimensions.
              </p>
              <p>
                Bring visibility across business journeys, runtime security and compliance, connected to what your digital fabric is doing.
              </p>
            </Link>
            <Link
              href="/kayak"
              className="card link"
              style={{ textDecoration: "none" }}
            >
              <div className="tag">The asset fabric</div>
              <h4>Kayak</h4>
              <p
                className="serif-line"
                style={{ fontSize: 16, marginBottom: 10, color: "#c88a3e" }}
              >
                Everything as a Service
              </p>
              <p>
                Connect fulfillment, provenance and asset lifecycle flows so what your digital business promises connects to what the business actually delivers.
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* ═══════ CLOSING CTA ═══════ */}
      <div className="section">
        <div className="wrap" style={{ textAlign: "center" }}>
          <div className="kicker">Start small. Scale with confidence.</div>
          <p
            className="serif-line"
            style={{
              maxWidth: 760,
              margin: "0 auto",
              color: "#c88a3e",
              fontSize: 24,
            }}
          >
            Launch one live property in 5 days.
          </p>
          <p
            className="mut"
            style={{
              marginTop: 16,
              fontFamily: "var(--font-heading)",
              fontSize: 12,
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            Start with one real business need. See the platform in action, prove the value, and build from there, without committing to a large transformation on day one.
          </p>
          <div
            style={{
              marginTop: 28,
              display: "flex",
              gap: "16px",
              justifyContent: "center",
            }}
          >
            <Link href="/contact" className="btn btn-gold">
              Book a demo session
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
