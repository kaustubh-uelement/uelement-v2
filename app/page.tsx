import Link from 'next/link';
import GoldenRatioSphere from '@/components/ui/GoldenRatioSphere';

export default function HomePage() {
  return (
    <>
      {/* ═══════ HERO ═══════ */}
      <div className="hero">
        <div className="hero-fabric" />

        {/* Golden Ratio Sphere Background (Desktop) / Below Buttons (Mobile) */}
        <div className="absolute inset-0 pointer-events-none mix-blend-screen hidden md:flex justify-center z-0">
          <div className="w-full max-w-[1100px] relative h-full mx-auto">
            <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-full md:w-1/2 h-full scale-[1.15]">
              <GoldenRatioSphere
                showControls={false}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        <div className="wrap relative z-10 pointer-events-none">
          <div className="flex flex-col items-center md:items-start max-w-full md:max-w-[65%] gap-0 text-center md:text-left mx-auto md:mx-0">
            {/* Kicker */}
            <div className="text-(--gold-500) mb-2 text-[13px] tracking-[1px]">
              सशक्त · सक्षम · सुरक्षित
            </div>

            <h1 className="display-sm mb-0">
              Sovereign <span className="au">DeepTech</span>{' '}
              <br className="hidden md:block" />
              systems for Enterprise <br className="hidden md:block" />
              <span className="au">Resilience</span>.
            </h1>

            <p className="lede mt-6 md:mt-8">
              Engineering{' '}
              <span className="italic font-medium">Quantum-secure</span> and{' '}
              resilient autonomous systems <br className="hidden md:block" />
              that create a seamless{' '}
              <span className="italic font-medium">Digital-fabric</span> for the
              tactical edge.
            </p>

            {/* CTA Buttons: re-enable pointer events just here */}
            <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-4 mt-10 md:mt-16 w-full md:w-auto pointer-events-auto">
              <Link href="/company" className="btn btn-gold">
                About Us
              </Link>
              <Link href="/stambh" className="btn btn-line">
                Explore the Platforms
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Golden Ratio Sphere (visible only on small screens) */}
        <div className="md:hidden w-full flex justify-center pointer-events-none mt-auto overflow-hidden opacity-80 mix-blend-screen z-0">
          <div className="w-[120%] max-w-[500px] flex justify-center">
            <GoldenRatioSphere
              showControls={false}
              radius={250}
              totalPoints={2000}
              className="w-full aspect-square"
            />
          </div>
        </div>
      </div>

      {/* ═══════ THE PORTFOLIO ═══════ */}
      <div className="section alt">
        <div className="wrap">
          <div className="kicker" id="portfolio"  >The portfolio</div>
          <h2 className="display text-navy-gradient">
            Two programs. One practice.
            <br />
            Every layer of <span className="au">Sovereignty.</span>
          </h2>
          <div className="grid3" style={{ marginTop: 44 }}>
            <Link
              href="/adviq"
              className="card link"
              style={{ textDecoration: 'none' }}
            >
              <div className="proglabel">Quantum Security</div>
              <h4>AdviQ</h4>
              <p>
                Named for uranium&apos;s atomic number, engineered for the
                quantum decade. Post-quantum cryptography, quantum key
                distribution, and crypto-agility for banks, governments, and
                critical infrastructure.
              </p>
              <p
                className="mono"
                style={{ marginTop: 14, color: 'var(--gold-500)' }}
              >
                PQC · QKD · Crypto-Agility →
              </p>
            </Link>
            <Link
              href="/stambh"
              className="card link"
              style={{ textDecoration: 'none' }}
            >
              <div className="proglabel slate">Enterpirse Fabric</div>
              <h4>StamBH</h4>
              <p>
                The enterprise platform trio. Ankura projects your business
                outward, Vizor watches every digital signal, Kayak commands the
                physical world. One control plane, one identity, one audit
                trail.
              </p>
              <p
                className="mono"
                style={{ marginTop: 14, color: 'var(--gold-500)' }}
              >
                Ankura · Vizor · Kayak →
              </p>
            </Link>
            <Link
              href="/tripura"
              className="card link"
              style={{ textDecoration: 'none' }}
            >
              <div className="proglabel slate">Edge Platform</div>
              <h4>TRIpura</h4>
              <p>
                Autonomous resilience for the tactical edge. A sovereign MLOps
                ecosystem for denied, degraded, intermittent and limited
                environments. We don&apos;t connect the edge to the cloud; we
                turn the edge into the cloud.
              </p>
              <p
                className="mono"
                style={{ marginTop: 14, color: 'var(--gold-500)' }}
              >
                KalAMOS · BoSC3 · NobisGRID →
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* ═══════ WHY UELEMENT ═══════ */}
      <div className="section navy" id="whyuelement">
        <div
          className="wrap grid2"
          style={{ alignItems: 'center', columnGap: '60px' }}
        >
          <div>
            <div className="kicker">Why UElement</div>
            <p className="serif-line">
              Harvest now, decrypt later is not a hypothesis. It is a
              procurement line item in adversary budgets.
            </p>
            <p className="mut" style={{ marginTop: 18 }}>
              Every platform we ship is built on the same convictions:
              cryptography must survive the quantum transition, systems must
              operate when networks are denied, and evidence must be generated
              as operational exhaust, not reconstructed for audit season.
            </p>
          </div>
          <div className="grid2 relative">
            {/* Vertical divider */}
            <div className="hidden md:block absolute inset-y-0 left-1/2 border-l border-dotted border-[#c5d0dc]/40" />
            {/* Horizontal divider */}
            <div className="hidden md:block absolute inset-x-0 top-1/2 border-t border-dotted border-[#c5d0dc]/40" />

            <div className="stat">
              <b>13</b>
              <span>
                Global customers across USA, Europe, Middle-east &amp; JAPAC
              </span>
            </div>
            <div className="stat">
              <b>2 + 1</b>
              <span>DeepTech programs and a dedicated quantum practice</span>
            </div>
            <div className="stat">
              <b>500+</b>
              <span>
                Pre-built adaptors and protocol parsers across IT and OT
              </span>
            </div>
            <div className="stat">
              <b>0</b>
              <span>Blind spots we consider acceptable</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ INDUSTRIES ═══════ */}
      <div className="section navy">
        <div className="wrap">
          <div className="kicker" id='industries'>Industries</div>
          <h2 className="display">
            Built where failure is <span className="au">not an option</span>.
          </h2>
          <div className="grid3" style={{ marginTop: 40 }}>
            <Link
              href="/industries"
              className="card link"
              style={{ textDecoration: 'none' }}
            >
              <h4>Defence &amp; Aerospace</h4>
              <p>
                Air-gapped deployment, DDIL operation, ITAR-free export
                eligibility.
              </p>
            </Link>
            <Link
              href="/industries"
              className="card link"
              style={{ textDecoration: 'none' }}
            >
              <h4>Banking &amp; Financial Services</h4>
              <p>
                Quantum-safe transactions, UPI/CBS journey observability, RBI
                and SEBI compliance fabric.
              </p>
            </Link>
            <Link
              href="/industries"
              className="card link"
              style={{ textDecoration: 'none' }}
            >
              <h4>Manufacturing &amp; Industrial OT</h4>
              <p>
                Purdue-native monitoring, 40+ OT protocol parsers,
                passive-by-architecture at Levels 0–2.
              </p>
            </Link>
            <Link
              href="/industries"
              className="card link"
              style={{ textDecoration: 'none' }}
            >
              <h4>Government &amp; Public Sector</h4>
              <p>
                Sovereign cloud, CERT-In 6-hour reporting, Make-in-India GeM
                procurement readiness.
              </p>
            </Link>
            <Link
              href="/industries"
              className="card link"
              style={{ textDecoration: 'none' }}
            >
              <h4>Healthcare &amp; Pharma</h4>
              <p>
                HIPAA and DPDP compliance, clinical uptime, serialized
                provenance from factory to patient.
              </p>
            </Link>
            <Link
              href="/industries"
              className="card link"
              style={{ textDecoration: 'none' }}
            >
              <h4>Datacenter &amp; Warehouse</h4>
              <p>
                Rack space, hardware, power and movement metered as services on
                a blockchain-verified fabric.
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* ═══════ CREAM QUOTE ═══════ */}
      <div className="section cream">
        <div className="wrap" style={{ textAlign: 'center' }}>
          <p
            className="serif-line serif-line--quote"
            style={{ maxWidth: 760, margin: '0 auto' }}
          >
            &quot;We don&apos;t connect the edge to the cloud.
            <br />
            We turn the edge into the cloud.&quot;
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
            The TRIpura thesis
          </p>
          <Link
            href="/tripura"
            className="btn btn-gold"
            style={{ marginTop: 28 }}
          >
            See how
          </Link>
        </div>
      </div>
    </>
  );
}
