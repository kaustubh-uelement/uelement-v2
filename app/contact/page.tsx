'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Metadata } from 'next';

/* ─── Live status dot ─────────────────────────────────────────── */


/* ─── Inline contact form ─────────────────────────────────────── */
/* The form logic is intentionally kept minimal — wire to your CRM */
/* or email endpoint without touching the layout around it.        */
function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [data, setData] = useState({ name: '', email: '', interest: '', message: '' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // --- FORM SUBMISSION: wire to your endpoint here ---
    await new Promise((r) => setTimeout(r, 900)); // simulate latency
    setStatus('sent');
    // ---------------------------------------------------
  };

  if (status === 'sent') {
    return (
      <div
        style={{
          padding: '40px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: 'rgba(16,185,129,0.12)',
            border: '1px solid rgba(16,185,129,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
          }}
        >
          ✓
        </div>
        <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--cream-100)', fontSize: 18 }}>
          Message received
        </h4>
        <p style={{ color: 'var(--grey-350)', fontSize: 13.5 }}>
          A specialist will reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
      autoComplete="off"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label className="form-label">Full name *</label>
          <input
            required
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Work email *</label>
          <input
            required
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="jane@company.com"
            className="form-input"
          />
        </div>
      </div>
      <div>
        <label className="form-label">I&apos;m interested in…</label>
        <select
          name="interest"
          value={data.interest}
          onChange={handleChange}
          className="form-input"
        >
          <option value="">Select a topic</option>
          <option value="pqc">Post-Quantum Cryptography (U92)</option>
          <option value="qkd">Quantum Key Distribution (U92)</option>
          <option value="mainstay">MainSTAY enterprise platforms</option>
          <option value="mainspar">MainSPAR edge autonomy</option>
          <option value="pilot">Running a 45-day pilot / PoV</option>
          <option value="partnership">Partnership or investment</option>
          <option value="other">Something else</option>
        </select>
      </div>
      <div>
        <label className="form-label">Message</label>
        <textarea
          name="message"
          value={data.message}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us what you're solving for — the more context, the better."
          className="form-input"
          style={{ resize: 'vertical' }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          type="submit"
          className="btn btn-gold"
          disabled={status === 'sending'}
          style={{ minWidth: 160 }}
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  );
}

/* ─── Data ────────────────────────────────────────────────────── */
const channels = [
  {
    id: 'sales',
    label: 'New business',
    desc: 'Scoping a project or evaluating a partner.',
    value: 'contact@uelement.in',
    href: 'mailto:contact@uelement.in',
    icon: '✉',
  },
  {
    id: 'incidents',
    label: 'Security incidents',
    desc: 'Active incident or urgent vulnerability report.',
    value: '+91 762 069 0561',
    href: 'tel:+917620690561',
    icon: '☎',
  },
  {
    id: 'careers',
    label: 'Careers',
    desc: 'Open roles across quantum, platform, and AI engineering.',
    value: 'careers@uelement.in',
    href: 'mailto:careers@uelement.in',
    icon: '⬡',
  },
] as const;

const stats = [
  { value: '< 1 day', label: 'First response SLA' },
  { value: '100%', label: 'NDA-backed scopes' },
  { value: '24 / 7', label: 'Monitoring desk active' },
  { value: '3', label: 'Global offices' },
];

const faqs = [
  {
    q: 'How quickly will someone respond?',
    a: 'Our monitoring desk logs every enquiry immediately. A specialist in the relevant practice — quantum security, enterprise platforms, or edge autonomy — typically replies within one business day. Flagged incidents are prioritised.',
  },
  {
    q: 'Do you sign an NDA before scoping?',
    a: 'Yes — all scoping conversations are covered by a mutual NDA by default, so you can speak openly about your architecture, constraints, and risk posture from the first call.',
  },
  {
    q: 'What does a first engagement look like?',
    a: 'Most start with a short discovery call, followed by a scoped proposal. There is no obligation past discovery. Many clients use a 45-day pilot to validate MainSTAY or U92 in their environment before committing to a full deployment.',
  },
  {
    q: 'Do you work with teams outside India?',
    a: 'Yes. We operate globally from Pune HQ, Singapore, and UAE, with a mix of remote and on-site delivery depending on the engagement requirements.',
  },
];

/* ─── FAQ accordion item ─────────────────────────────────────── */
function FAQItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          padding: '22px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          color: 'var(--cream-100)',
          fontFamily: 'var(--font-heading)',
          fontSize: 14.5,
          fontWeight: 500,
          letterSpacing: '0.01em',
        }}
      >
        <span>{q}</span>
        <span
          style={{
            flexShrink: 0,
            width: 26,
            height: 26,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            color: 'var(--gold-500)',
            transform: open ? 'rotate(45deg)' : 'none',
            transition: 'transform 0.3s ease',
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.32s ease, opacity 0.32s ease',
          opacity: open ? 1 : 0,
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <p style={{ color: 'var(--grey-350)', fontSize: 13.5, lineHeight: 1.72, paddingBottom: 22, paddingRight: 40 }}>
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────── */
export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <div className="hero">
        <div className="hero-fabric" />
        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div className="crumb">
            <Link href="/">Home</Link> / Contact
          </div>

      

          <div className="kicker">Contact</div>
          <h1 className="display" style={{ fontSize: 'var(--text-display)', maxWidth: 620 }}>
            Start the{' '}
            <span className="au">conversation.</span>
          </h1>
          <p className="lede" style={{ marginTop: 20, maxWidth: 560 }}>
            Whether it&apos;s a quantum risk assessment, a 45-day MainSTAY proof of value,
            a tactical-edge briefing, or a partnership — tell us what you&apos;re solving for.
          </p>

          {/* Quick-action pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 36 }}>
            <a href="mailto:contact@uelement.in" className="btn btn-gold">
              Email directly
            </a>
            <a href="tel:+917620690561" className="btn btn-line">
              +91 762 069 0561
            </a>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          TRUST STATS STRIP
      ══════════════════════════════════════ */}
    

     
      {/* ══════════════════════════════════════
          DIRECT CHANNELS
      ══════════════════════════════════════ */}
      <div className="section">
        <div className="wrap">
          <div className="kicker">Direct channels</div>
          <h2 className="display" style={{ fontSize: 'clamp(26px,3.2vw,38px)', marginBottom: 14 }}>
            Know what you need?
          </h2>
          <p className="lede" style={{ marginBottom: 44 }}>
            Route straight to the right inbox — no generic form required.
          </p>
          <div className="grid3">
            {channels.map((ch) => (
              <a
                key={ch.id}
                href={ch.href}
                className="card link"
                style={{ textDecoration: 'none', position: 'relative', overflow: 'hidden' }}
              >
                {/* icon badge */}
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    background: 'rgba(224,167,105,0.08)',
                    border: '1px solid rgba(224,167,105,0.22)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    marginBottom: 20,
                  }}
                >
                  {ch.icon}
                </div>
                <h4>{ch.label}</h4>
                <p style={{ marginBottom: 18 }}>{ch.desc}</p>
                <p className="mono" style={{ color: 'var(--gold-500)' }}>
                  {ch.value} →
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          MAP + ADDRESS
      ══════════════════════════════════════ */}
      <div className="section navy" style={{ padding: '80px 0' }}>
        <div className="wrap">
          <div className="kicker">Find us</div>
          <h2 className="display" style={{ fontSize: 'clamp(26px,3.2vw,38px)', marginBottom: 44 }}>
            Three offices. One standard.
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.6fr',
              gap: 32,
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {/* Address panel */}
            <div
              className="card"
              style={{
                borderRadius: 0,
                border: 'none',
                background: 'rgba(12,20,62,0.75)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 28,
              }}
            >
              {[
                {
                  city: 'Pune, India',
                  role: 'Global HQ',
                  addr: '9th Floor, Pride Gateway, Sr. No. 112, Baner, Pune 411045.',
                  maps: 'https://www.google.com/maps/search/?api=1&query=Pride+Gateway+Baner+Pune',
                },
                {
                  city: 'Singapore',
                  role: 'JAPAC Operations',
                  addr: 'Partnerships & regional pursuits.',
                  maps: undefined,
                },
                {
                  city: 'UAE',
                  role: 'Middle East Operations',
                  addr: 'Regional engagements and pursuits.',
                  maps: undefined,
                },
              ].map((o) => (
                <div key={o.city}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <h4 style={{ margin: 0 }}>{o.city}</h4>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 9,
                        letterSpacing: '0.08em',
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-pill)',
                        background: 'rgba(224,167,105,0.08)',
                        border: '1px solid rgba(224,167,105,0.22)',
                        color: 'var(--gold-500)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {o.role}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, marginBottom: o.maps ? 10 : 0 }}>{o.addr}</p>
                  {o.maps && (
                    <a
                      href={o.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 12,
                        color: 'var(--gold-500)',
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                      }}
                    >
                      Get directions →
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Map embed */}
            <div style={{ minHeight: 380 }}>
              <iframe
                title="UElement Technologies — Baner, Pune"
                src="https://www.google.com/maps?q=Pride+Gateway,+Baner,+Pune&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 380, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          FAQ
      ══════════════════════════════════════ */}
      <div className="section">
        <div className="wrap" style={{ maxWidth: 760, marginLeft: 'auto', marginRight: 'auto' }}>
          <div className="kicker" style={{ justifyContent: 'center' }}>
            Before you reach out
          </div>
          <h2 className="display" style={{ fontSize: 'clamp(26px,3.2vw,38px)', textAlign: 'center', marginBottom: 48 }}>
            Common questions.
          </h2>
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            {faqs.map((f, i) => (
              <FAQItem
                key={f.q}
                q={f.q}
                a={f.a}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>

      

      {/* ── Form field styles (scoped) ─────── */}
      <style>{`
        .form-label {
          display: block;
          font-family: var(--font-heading);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--grey-450);
          margin-bottom: 8px;
        }
        .form-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--radius-md);
          padding: 12px 16px;
          color: var(--white);
          font-family: var(--font-body);
          font-size: 14px;
          outline: none;
          transition: border-color 0.15s;
          box-sizing: border-box;
        }
        .form-input::placeholder { color: var(--grey-450); }
        .form-input:focus { border-color: var(--gold-500); }
        .form-input option { background: #0c142d; color: #fff; }
        @media (max-width: 900px) {
          .form-input + .form-input { margin-top: 12px; }
        }
        @media (max-width: 768px) {
          #contact-form .wrap > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
