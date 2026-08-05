import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nexus | The Enterprise Digital Fabric | UElement',
  description:
    "Nexus is the platform for building your enterprise's outward-facing online properties: every digital surface, channel, and workflow.",
};

export default function NexusPage() {
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
            / Nexus
          </div>
          <div className="tag">StamBH · Projects outward</div>
          <h1 className="display" style={{ fontSize: 'var(--text-display)' }}>
            Nexus
          </h1>
          <p className="serif-line">The Enterprise Digital Fabric.</p>
          <p className="lede" style={{ marginTop: 22 }}>
            Nexus is the platform for building your enterprise&apos;s
            outward-facing online properties: every digital surface, channel,
            and workflow your customers, partners, and candidates touch.
          </p>
          <Link
            href="/contact"
            className="btn btn-gold"
            style={{ marginTop: 28 }}
          >
            Talk to the Nexus team
          </Link>
        </div>
      </div>

      <div className="section alt">
        <div className="wrap">
          <div className="kicker">Product scope</div>
          <div className="grid3" style={{ marginTop: 26 }}>
            <div className="card">
              <h4>Web platforms</h4>
              <p>
                Websites, Google search presence, GenAI search optimization, SEO
                and SEM, engineered as one discipline, not four vendors.
              </p>
            </div>
            <div className="card">
              <h4>Mobile applications</h4>
              <p>
                Native-quality mobile surfaces that share content, identity, and
                analytics with your web estate.
              </p>
            </div>
            <div className="card">
              <h4>Workflow portal</h4>
              <p>
                A scalable portal to design application workflows: public
                sites, e-commerce, help centers, and careers portals composed
                from one system.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="wrap grid2" style={{ alignItems: 'start' }}>
          <div>
            <div className="kicker">AI built in</div>
            <h2 className="display" style={{ fontSize: 30 }}>
              Intelligence is not a module. It&apos;s the core.
            </h2>
            <div
              style={{
                marginTop: 26,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              <div className="card">
                <h4>Agentic AI automation</h4>
                <p>
                  Autonomous agents handle routing, personalization, and process
                  execution across your digital surfaces.
                </p>
              </div>
              <div className="card">
                <h4>GenAI &amp; OpenLM</h4>
                <p>
                  Generative experiences and open LLM operations: deploy,
                  monitor, and govern the models behind every AI touchpoint.
                </p>
              </div>
              <div className="card">
                <h4>Advanced data analytics</h4>
                <p>
                  Every visit, journey, and conversion feeding one analytical
                  fabric.
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="kicker">Design pillars</div>
            <table className="spec" style={{ marginTop: 26 }}>
              <tbody>
                <tr>
                  <td>Modular</td>
                  <td>Enable only what you need, expand as you grow</td>
                </tr>
                <tr>
                  <td>API-first</td>
                  <td>Every capability exposed through documented APIs</td>
                </tr>
                <tr>
                  <td>Cloud-native</td>
                  <td>Built for scale, resilience, global deployment</td>
                </tr>
                <tr>
                  <td>Multi-tenant SaaS</td>
                  <td>
                    Isolated, secure workspaces with enterprise-grade controls
                  </td>
                </tr>
                <tr>
                  <td>AI-ready</td>
                  <td>
                    Intelligent automation and insights built into the core
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
