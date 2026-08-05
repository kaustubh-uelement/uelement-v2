import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MustangC3 | Agentic Command & Control | UElement',
  description:
    'Agentic AI command, control, and communications engineered for graceful degradation.',
};

export default function MustangPage() {
  return (
    <>
      <div className="hero hero-half">
        <div className="hero-art">
          <img src="/u92-flower.png" alt="" aria-hidden="true" />
        </div>
        <div className="hero-fabric" />
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link> / <Link href="/mainspar">TRIpura</Link> /
            MustangC3
          </div>
          <div className="tag slate">TRIpura · The Commander</div>
          <h1 className="display" style={{ fontSize: 'var(--text-display)' }}>
            MustangC3
          </h1>
          <p className="serif-line">
            Command that survives the loss of most of itself.
          </p>
          <p className="lede" style={{ marginTop: 22 }}>
            Agentic AI command, control, and communications engineered for
            graceful degradation. MustangC3 maintains mission continuity through
            the attrition of 60% or more of its nodes, reforming hierarchies,
            re-tasking assets, and preserving intent when links are cut.
          </p>
        </div>
      </div>
      <div className="section alt">
        <div className="wrap grid3">
          <div className="card">
            <h4>Agentic C2</h4>
            <p>
              AI agents hold mission intent locally and execute against it when
              higher echelons are unreachable.
            </p>
          </div>
          <div className="card">
            <h4>Attrition-resilient</h4>
            <p>
              Formal degradation contract: capability declines predictably,
              never catastrophically.
            </p>
          </div>
          <div className="card">
            <h4>Zero-trust command</h4>
            <p>
              Every order verified end-to-end with post-quantum signatures; no
              spoofed hierarchy.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
