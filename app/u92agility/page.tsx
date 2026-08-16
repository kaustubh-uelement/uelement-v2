import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AdviQ Crypto-Agility | Axis · Codex · Crucible | UElement',
  description:
    'The last migration you do by hand. Three products that make crypto-agility real.',
};

export default function U92AgilityPage() {
  return (
    <>
      <div className="hero hero-half">
        <div className="hero-art">
          <img src="/u92-flower.png" alt="" aria-hidden="true" />
        </div>
        <div className="hero-fabric" />
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link> / <Link href="/adviq">AdviQ</Link> /
            Crypto-Agility
          </div>
          <div className="tag">AdviQ · Crypto-Agility</div>
          <h1 className="display" style={{ fontSize: 'var(--text-display)' }}>
            AdviQ Crypto-Agility
          </h1>
          <p className="serif-line">The last migration you do by hand.</p>
          <p className="lede" style={{ marginTop: 22 }}>
            Algorithms will be broken again. Crypto-agility means the next
            transition is a policy change, not a five-year program. Three
            products make it real.
          </p>
        </div>
      </div>
      <div className="section alt">
        <div className="wrap grid3">
          <div className="card">
            <div className="tag">Product</div>
            <h4>AdviQ Axis</h4>
            <p>
              A crypto-abstraction layer between your applications and their
              algorithms; swap primitives without touching application code.
            </p>
          </div>
          <div className="card">
            <div className="tag">Product</div>
            <h4>AdviQ Codex</h4>
            <p>
              The algorithm registry and policy control plane: declare which
              algorithms are approved, where, and until when.
            </p>
          </div>
          <div className="card">
            <div className="tag">Product</div>
            <h4>AdviQ Crucible</h4>
            <p>
              A rotation drill harness: rehearse algorithm swaps in
              production-like conditions until migration is muscle memory.
            </p>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <p className="serif-line" style={{ maxWidth: 680, margin: '0 auto' }}>
            Agility is not a document. It is a rehearsed capability.
          </p>
          <Link
            href="/contact"
            className="btn btn-gold"
            style={{ marginTop: 26 }}
          >
            Schedule a rotation drill
          </Link>
        </div>
      </div>
    </>
  );
}
