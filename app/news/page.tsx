import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'News Room — UElement Technologies',
  description:
    'Announcements, media coverage, and the public conversation on quantum security and sovereign technology.',
};

const mediaHighlights = [
  {
    type: 'Media',
    outlet: 'All India Radio',
    headline: 'Leadership commentary on quantum security and India deeptech moment.',
    detail:
      'Broadcast nationally — our founders spoke on the urgency of post-quantum cryptography for Indian banks and critical infrastructure.',
    date: '2025',
  },
  {
    type: 'Commentary',
    outlet: 'LinkedIn Thought Leadership',
    headline: 'Professional insights on sovereign platforms and the deeptech economy.',
    detail:
      'Ongoing perspectives on quantum-safe migration timelines, crypto-agility architectures, and building for denied-network environments.',
    date: 'Ongoing',
  },
  {
    type: 'Forums',
    outlet: 'BFSI & Defence Forums',
    headline: 'Briefings and talks across BFSI, defence, and public-sector technology forums.',
    detail:
      'Keynotes and technical briefings covering OT/IT convergence, zero-trust postures, and quantum readiness roadmaps for regulators.',
    date: '2024 – 2025',
  },
];

const milestones = [
  {
    year: '2025',
    items: [
      'Presented post-quantum key distribution architecture at a national cybersecurity symposium.',
      'Published first quantum-safe migration white paper for Indian BFSI regulators.',
      'All India Radio feature: quantum threat timeline and sovereign technology imperatives.',
    ],
  },
  {
    year: '2024',
    items: [
      'Established MainSPAR program — autonomous MLOps for DDIL edge environments.',
      'Launched MainSTAY enterprise platform trio (Nexus · Vizor · Kayak).',
      'Expanded to Singapore and UAE — first international engagements in defence and BFSI.',
    ],
  },
  {
    year: '2023',
    items: [
      'UElement Technologies incorporated in Pune, India.',
      'U92 Quantum Security program initiated — PQC and QKD stack foundational research.',
      'Seed partnerships with national-level defence and infrastructure stakeholders.',
    ],
  },
];

const topics = [
  { label: 'Quantum Security', desc: 'PQC migration, QKD deployment, crypto-agility mandates.' },
  { label: 'Sovereign Platforms', desc: 'Air-gap first architectures, CERT-In compliance, Make-in-India.' },
  { label: 'DDIL Operations', desc: 'Autonomous MLOps at the tactical edge — denied, degraded, intermittent.' },
  { label: 'BFSI Resilience', desc: 'Quantum-safe transactions, RBI/SEBI compliance fabric, UPI journey observability.' },
  { label: 'OT / ICS Security', desc: 'Purdue-native monitoring, 40+ protocol parsers, passive-by-architecture.' },
  { label: 'Defence & Aerospace', desc: 'Air-gapped deployment, ITAR-free eligibility, sovereign cloud for tactical systems.' },
];

export default function NewsPage() {
  return (
    <>
      {/* ═══════ HERO ═══════ */}
      <div className="hero hero-half">
        <div className="" />
        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div className="crumb">
            <Link href="/">Home</Link> / Company / News Room
          </div>
          <div className="kicker">News Room</div>
          <h1 className="display" style={{ fontSize: 'var(--text-display)' }}>
            In the conversation.
          </h1>
          <p className="lede" style={{ marginTop: 20, maxWidth: 600 }}>
            Announcements, media coverage, and the ongoing public discourse on{' '}
            <span className="italic font-medium">quantum security</span> and{' '}
            <span className="italic font-medium">sovereign technology</span>.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 36 }}>
            <a href="#coverage" className="btn btn-gold">
              Coverage &amp; commentary
            </a>
            <Link href="/contact" className="btn btn-line">
              Press inquiries
            </Link>
          </div>
        </div>
      </div>

      {/* ═══════ FEATURED STORY ═══════ */}
      <div className="section navy">
        <div className="wrap">
          <div className="kicker">Featured</div>
          <div
            className="card"
            style={{
              background:
                'linear-gradient(135deg, rgba(12,20,62,0.92) 0%, rgba(22,48,104,0.75) 100%) padding-box, var(--metal-edge) border-box',
              padding: '48px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* decorative glow */}
            <div
              style={{
                position: 'absolute',
                top: '-60px',
                right: '-60px',
                width: 280,
                height: 280,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(200,138,62,0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />
            <div className="tag" style={{ marginBottom: 24 }}>
              Media Coverage
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-hero)',
                fontWeight: 800,
                fontSize: 'clamp(22px, 3vw, 36px)',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                background: 'linear-gradient(180deg, #ffffff 0%, #c5d0dc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: 20,
                maxWidth: 700,
              }}
            >
              All India Radio: Quantum Security and India&apos;s Deeptech Moment
            </h2>
            <p
              style={{
                fontSize: 15,
                color: 'var(--grey-350)',
                lineHeight: 1.72,
                maxWidth: 680,
                marginBottom: 28,
              }}
            >
              UElement leadership joined All India Radio for a nationally broadcast discussion on
              the urgency of post-quantum cryptography — why the harvest-now-decrypt-later threat
              is already a procurement line item in adversary budgets, and what sovereign
              technology means for India&apos;s critical infrastructure in the quantum decade.
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'var(--grey-450)',
                  letterSpacing: '0.08em',
                }}
              >
                All India Radio · National Broadcast · 2025
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ MEDIA HIGHLIGHTS ═══════ */}
      <div className="section alt" id="coverage">
        <div className="wrap">
          <div className="kicker">Coverage &amp; commentary</div>
          <h2 className="display text-navy-gradient" style={{ fontSize: 'clamp(26px,3.2vw,40px)' }}>
            Where we show up.
          </h2>
          <p
            style={{
              color: 'var(--ink-600)',
              fontSize: 15,
              marginTop: 14,
              marginBottom: 44,
              maxWidth: 580,
            }}
          >
            From national broadcasts to industry forums — UElement engages where the conversation
            on deeptech, sovereignty, and quantum resilience is happening.
          </p>
          <div className="grid3">
            {mediaHighlights.map((item) => (
              <div className="card" key={item.outlet}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginBottom: 16,
                    gap: 10,
                  }}
                >
                  <div className="tag">{item.type}</div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      color: 'var(--grey-450)',
                      letterSpacing: '0.08em',
                      paddingTop: 6,
                    }}
                  >
                    {item.date}
                  </span>
                </div>
                <h4 style={{ fontSize: 15, marginBottom: 10 }}>{item.outlet}</h4>
                <p style={{ fontWeight: 500, fontSize: 13, color: 'var(--slate-200)', marginBottom: 10 }}>
                  {item.headline}
                </p>
                <p style={{ fontSize: 12.5, lineHeight: 1.65 }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════ TOPICS WE SPEAK ON ═══════ */}
      <div className="section">
        <div className="wrap">
          <div className="kicker">Topics</div>
          <h2 className="display" style={{ fontSize: 'clamp(26px,3.2vw,40px)', marginBottom: 14 }}>
            What we speak about.
          </h2>
          <p className="lede" style={{ marginBottom: 48 }}>
            Our commentary spans the full surface area of sovereign deeptech — from
            cryptographic primitives to edge autonomy.
          </p>
          <div className="grid3">
            {topics.map((t, i) => (
              <div
                key={t.label}
                className="card"
                style={{
                  border: 'none',
                  borderLeft: '2px solid var(--gold-500)',
                }}
              >

                {String(i + 1).padStart(2, '0')}

                <h4>{t.label}</h4>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════ MILESTONES TIMELINE ═══════ */}
      <div className="section navy">
        <div className="wrap">
          <div className="kicker">Timeline</div>
          <h2 className="display" style={{ fontSize: 'clamp(26px,3.2vw,40px)', marginBottom: 14 }}>
            How we got here.
          </h2>
          <p className="lede" style={{ marginBottom: 52 }}>
            Key moments in UElement&apos;s public journey — from incorporation to national broadcast.
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
            }}
          >
            {milestones.map((block, bi) => (
              <div
                key={block.year}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '100px 1fr',
                  gap: '0 36px',
                  paddingBottom: bi < milestones.length - 1 ? 0 : 0,
                }}
              >
                {/* Year column */}
                <div style={{ paddingTop: 6, textAlign: 'right' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-hero)',
                      fontWeight: 800,
                      fontSize: 26,
                      background: 'var(--metal-gold)',
                      backgroundSize: '200% 100%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {block.year}
                  </span>
                </div>

                {/* Items column */}
                <div
                  style={{
                    borderLeft: '1px solid rgba(224,167,105,0.3)',
                    paddingLeft: 28,
                    paddingBottom: 44,
                    position: 'relative',
                  }}
                >
                  {/* dot */}
                  <div
                    style={{
                      position: 'absolute',
                      left: -6,
                      top: 8,
                      width: 11,
                      height: 11,
                      borderRadius: '50%',
                      background: 'var(--metal-gold)',
                    }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {block.items.map((item) => (
                      <div className="card" key={item} style={{ padding: '20px 24px' }}>
                        <p style={{ fontSize: 13.5, color: 'var(--grey-350)', margin: 0, lineHeight: 1.65 }}>
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════ STAY INFORMED ═══════ */}
      <div className="section alt">
        <div className="wrap">
          <div className="kicker">Stay informed</div>
          <h2
            className="display text-navy-gradient"
            style={{ fontSize: 'clamp(26px,3.2vw,40px)', marginBottom: 14 }}
          >
            Follow the conversation.
          </h2>
          <p
            style={{
              color: 'var(--ink-600)',
              fontSize: 15,
              maxWidth: 580,
              marginBottom: 44,
              lineHeight: 1.7,
            }}
          >
            Our team regularly publishes perspectives on LinkedIn, engages in industry forums,
            and participates in briefings for BFSI, defence, and public-sector technology leaders.
          </p>
          <div className="grid2">
            <a
              href="https://www.linkedin.com/company/uelement"
              target="_blank"
              rel="noopener noreferrer"
              className="card link"
              style={{ textDecoration: 'none' }}
            >
              <div className="tag">LinkedIn</div>
              <h4>Professional commentary</h4>
              <p>
                Follow UElement Technologies on LinkedIn for ongoing perspectives on
                quantum-safe migration, sovereign platforms, and the deeptech economy.
              </p>
              <p
                className="mono"
                style={{ marginTop: 14, color: 'var(--gold-500)' }}
              >
                linkedin.com/company/uelement →
              </p>
            </a>
            <div className="card">
              <div className="tag">Briefings</div>
              <h4>Industry engagements</h4>
              <p>
                We participate in technical briefings and forums across BFSI, defence,
                and public-sector technology — from regulatory roundtables to CERT-In
                advisory discussions.
              </p>
              <p
                className="mono"
                style={{ marginTop: 14, color: 'var(--grey-450)' }}
              >
                By invitation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ PRESS CTA ═══════ */}
      <div className="section cream">
        <div className="wrap">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 40,
              alignItems: 'center',
            }}
          >
            <div>
              <div className="kicker">Press &amp; media</div>
              <h2 className="display" style={{ fontSize: 'clamp(24px,3vw,38px)', marginBottom: 14 }}>
                Working on a story?
              </h2>
              <p
                style={{
                  color: 'var(--ink-600)',
                  fontSize: 15,
                  lineHeight: 1.7,
                  maxWidth: 520,
                }}
              >
                For interviews, expert commentary, press material, and background on quantum
                security and sovereign technology — reach the UElement communications desk.
                We respond to credentialed journalists and analysts.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-end', flexShrink: 0 }}>
              <Link href="/contact" className="btn btn-gold" id="news-press-cta">
                Contact communications
              </Link>
              <Link href="/company" className="btn btn-line" id="news-about-link">
                About UElement
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
