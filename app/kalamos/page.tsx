import Link from 'next/link';
import type { Metadata } from 'next';
import { branding } from '@/lib/content/branding';

export const metadata: Metadata = {
  title: `${branding.kalamos} | Sovereign Edge AI OS | UElement`,
  description:
    'A sovereign edge AI operating system that brings model inference, orchestration, and lifecycle management to nodes that may never see a datacenter.',
};

export default function KalamosPage() {
  return (
    <>
      <div className="hero hero-half">
        <div className="hero-art">
          <img src="/u92-flower.png" alt="" aria-hidden="true" />
        </div>
        <div className="hero-fabric" />
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link> / <Link href="/tripura">{branding.tripura}</Link>{' '}
            / {branding.kalamos}
          </div>
          <div className="tag slate">{branding.tripura} · The Brain</div>
          <h1 className="display" style={{ fontSize: 'var(--text-display)' }}>
            {branding.kalamos}
          </h1>
          <p className="serif-line">
            The operating system for intelligence at the edge.
          </p>
          <p className="lede" style={{ marginTop: 22 }}>
            A sovereign edge AI operating system that brings model inference,
            orchestration, and lifecycle management to nodes that may never see
            a datacenter. Available in Light and Standard builds to match node
            class and power envelope.
          </p>
        </div>
      </div>
      <div className="section alt">
        <div className="wrap grid3">
          <div className="card">
            <h4>Light build</h4>
            <p>
              Minimal footprint for constrained sensors and disposable nodes;
              inference where every milliwatt counts.
            </p>
          </div>
          <div className="card">
            <h4>Standard build</h4>
            <p>
              Full MLOps at the node: model serving, retraining hooks, fleet
              orchestration for vehicle-class and station-class hardware.
            </p>
          </div>
          <div className="card">
            <h4>Sovereign by default</h4>
            <p>
              No mandatory external calls. Air-gap first. Post-quantum key
              exchange between every node pair.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
