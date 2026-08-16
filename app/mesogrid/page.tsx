import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MesoGRID | Resilient Decentralised Mesh | UElement',
  description:
    'A resilient decentralised mesh network with stochastic path optimisation.',
};

export default function MesogridPage() {
  return (
    <>
      <div className="hero hero-half">
        <div className="hero-art">
          <img src="/u92-flower.png" alt="" aria-hidden="true" />
        </div>
        <div className="hero-fabric" />
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link> / <Link href="/tripura">TRIpura</Link>{' '}
            / MesoGRID
          </div>
          <div className="tag slate">TRIpura · The Fabric</div>
          <h1 className="display" style={{ fontSize: 'var(--text-display)' }}>
            MesoGRID
          </h1>
          <p className="serif-line">The mesh that refuses to die.</p>
          <p className="lede" style={{ marginTop: 22 }}>
            A resilient decentralised mesh network with stochastic path
            optimisation. MesoGRID treats disruption as the operating condition,
            not the exception, routing around jamming, loss, and partition
            without central coordination.
          </p>
        </div>
      </div>
      <div className="section alt">
        <div className="wrap grid3">
          <div className="card">
            <h4>Stochastic routing</h4>
            <p>
              Probabilistic path selection that adversaries cannot predict or
              pre-empt.
            </p>
          </div>
          <div className="card">
            <h4>Self-healing topology</h4>
            <p>
              The mesh reforms around node loss in real time, with no operator
              intervention.
            </p>
          </div>
          <div className="card">
            <h4>Partition-tolerant</h4>
            <p>
              Islands of the network keep operating independently and reconcile
              on rejoin.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
