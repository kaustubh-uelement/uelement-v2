'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { branding } from '@/lib/content/branding';

export default function AnkuraPosterClient() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="poster-page-wrapper">
      {/* ── Sleek Floating Action Toolbar (Web only, hidden on print) ── */}
      <aside className="poster-toolbar" aria-label="Poster Actions">
        <div className="toolbar-left">
          <Link href="/ankura" className="toolbar-back-btn">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Back to {branding.ankura}</span>
          </Link>
          <span className="toolbar-divider hidden sm:inline">/</span>
          <div className="toolbar-switcher hidden sm:flex">
            <span className="switcher-tab active">Vertical Pitch</span>
            <Link href="/ankura/poster/landscape" className="switcher-tab">
              Landscape Architecture
            </Link>
          </div>
        </div>

        <div className="toolbar-right">
          <button
            type="button"
            className="toolbar-btn"
            onClick={handleCopyLink}
            title="Copy poster share URL"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>{copied ? 'Copied!' : 'Share'}</span>
          </button>

          <button
            type="button"
            className="toolbar-btn toolbar-btn-primary"
            onClick={handlePrint}
            title="Print or Save as PDF"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            <span>Print / PDF</span>
          </button>
        </div>
      </aside>

      {/* ── Main Poster Container ── */}
      <main className="poster-container">
        <article className="poster">
          {/* Subtle gold outer boundary frame */}
          <div className="frame" aria-hidden="true"></div>

          {/* Quarterly cropped spinning u92 flower in top-right corner */}
          <div className="poster-art" aria-hidden="true">
            <Image
              src="/u92-flower.png"
              alt=""
              width={580}
              height={580}
              priority
            />
          </div>

          <div className="inner">
            {/* ══════ HERO / HEADER ══════ */}
            <header className="poster-hero">
              <div className="eyebrow">{branding.stambh}</div>
              <h1>{branding.ankura}</h1>
              <div className="surface-deck">
                <p className="surface-lede">
                  One platform for every outward-facing surface
                </p>
                <div className="surface-cluster">
                  <div className="surface-pills">
                    <span className="surface-pill">Website</span>
                    <span className="surface-pill">Careers</span>
                    <span className="surface-pill">Partners</span>
                    <span className="surface-pill">Help Centre</span>
                  </div>
                  <div className="surface-ai-badge">
                    <svg
                      className="ai-sparkle"
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
                    </svg>
                    <span>Google &amp; ChatGPT Search</span>
                  </div>
                </div>
              </div>

              <div className="rule" aria-hidden="true"></div>
            </header>

            {/* ══════ SIGNATURE: FOUR THREADS CONVERGING INTO ONE ══════ */}
            <div className="weave">
              <div className="threads">
                <div className="thread">
                  <div className="who">Website</div>
                  <div className="vendor">vendor 1</div>
                </div>
                <div className="thread">
                  <div className="who">Careers</div>
                  <div className="vendor">vendor 2</div>
                </div>
                <div className="thread">
                  <div className="who">Partners</div>
                  <div className="vendor">vendor 3</div>
                </div>
                <div className="thread">
                  <div className="who">Help centre</div>
                  <div className="vendor">vendor 4</div>
                </div>
              </div>

              {/* Desktop Converging Fabric SVG Diagram */}
              <svg
                className="converge"
                viewBox="0 0 836 120"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="beamGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f5c116" />
                    <stop offset="100%" stopColor="#e0a769" />
                  </linearGradient>
                  <filter
                    id="nodeGlow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="4"
                      result="blur"
                    />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* 4 Separate Vendor Threads converging inwards */}
                <g
                  stroke="#6f8098"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeDasharray="1.5 8"
                  fill="none"
                >
                  <path d="M 104.5 4 V 40 C 104.5 58, 200 62, 418 62" />
                  <path d="M 313.5 4 V 40 C 313.5 58, 360 62, 418 62" />
                  <path d="M 522.5 4 V 40 C 522.5 58, 476 62, 418 62" />
                  <path d="M 731.5 4 V 40 C 731.5 58, 636 62, 418 62" />
                </g>

                {/* Convergence Junction Node (glowing ember/gold pulse) */}
                <circle cx="418" cy="62" r="11" fill="#f5c116" opacity="0.25" />
                <circle
                  cx="418"
                  cy="62"
                  r="6"
                  fill="#f5c116"
                  filter="url(#nodeGlow)"
                />

                {/* Unified Fabric Beam directly connecting to platform bar (zero gap) */}
                <path
                  d="M 418 62 V 106"
                  stroke="url(#beamGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Platform Anchor Joint */}
                <circle cx="418" cy="106" r="3.5" fill="#f5c116" />

                {/* Horizontal Unified Platform Bar */}
                <path
                  d="M 188 106 H 648"
                  stroke="#e0a769"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  opacity="0.92"
                />
              </svg>

              {/* Mobile Convergence Graphic */}
              <div className="mobile-converge" aria-hidden="true">
                <div className="mobile-converge-node"></div>
                <div className="mobile-converge-line"></div>
                <div className="mobile-converge-anchor"></div>
                <div className="mobile-converge-bar"></div>
              </div>

              <div className="oneline">
                One login. One invoice. <em>One platform.</em>
                <span className="sub">
                  9 modules on the same fabric: switch on what you need, add the
                  rest later.
                </span>
              </div>
            </div>

            {/* ══════ PILLARS ══════ */}
            <div className="pillars">
              <div className="pillar">
                <div className="t">Modular</div>
                <div className="d">Start with one surface, grow into nine</div>
              </div>
              <div className="pillar">
                <div className="t">API-first</div>
                <div className="d">
                  Every capability documented and callable
                </div>
              </div>
              <div className="pillar">
                <div className="t">Cloud-native</div>
                <div className="d">Multi-tenant, isolated, built to scale</div>
              </div>
              <div className="pillar">
                <div className="t">Priced to switch</div>
                <div className="d">Costs less than the stack it replaces</div>
              </div>
            </div>

            {/* ══════ CTA / BRAND FOOTER ══════ */}
            <div className="cta">
              <div className="cta-left">
                <h2>
                  Send us your current stack.{' '}
                  <span>
                    We&apos;ll show you what one platform looks like in 20
                    minutes.
                  </span>
                </h2>
                <div className="note">
                  Reply to this message to book a walkthrough.
                  <br />
                  UElement Technologies Pvt. Ltd. &nbsp;·&nbsp;{' '}
                  <span className="dev">{branding.tagline}</span>
                </div>
              </div>

              <div className="id">
                <div className="contact">
                  <a href="mailto:contact@uelement.in">contact@uelement.in</a>
                  <br />
                  <a href="tel:+919007374836">+91 90073 74836</a>
                </div>
                <div className="brand-lockup">
                  <Image
                    src="/icons/global/UElement_Tech_Logo_White.png"
                    alt="UElement Technologies"
                    width={180}
                    height={30}
                    priority
                    style={{ height: '30px', width: 'auto' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>

      {/* ── Component Scoped Styles ── */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Noto+Sans:wght@300;400;500;600;700&display=swap');

        /* ---- Outer Page Environment ---- */
        .poster-page-wrapper {
          min-height: 100vh;
          background: #040c1a;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px 16px 64px;
          color: #ffffff;
          font-family:
            'Noto Sans',
            -apple-system,
            BlinkMacSystemFont,
            'Segoe UI',
            Roboto,
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          box-sizing: border-box;
          width: 100%;
          overflow-x: hidden;
        }

        /* ---- Sleek Floating Action Toolbar ---- */
        .poster-toolbar {
          width: 100%;
          max-width: 960px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          margin-bottom: 20px;
          background: rgba(12, 26, 56, 0.78);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(224, 167, 105, 0.22);
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
          box-sizing: border-box;
          gap: 10px;
          z-index: 20;
        }

        .toolbar-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .toolbar-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #dbe4ec;
          text-decoration: none;
          font-family: 'Poppins', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          transition:
            color 0.2s,
            transform 0.2s;
        }
        .toolbar-back-btn:hover {
          color: #e0a769;
          transform: translateX(-2px);
        }

        .toolbar-divider {
          color: rgba(255, 255, 255, 0.25);
          font-size: 14px;
        }

        .toolbar-switcher {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 999px;
          padding: 2px 4px;
          gap: 2px;
        }

        .switcher-tab {
          font-family: 'Poppins', sans-serif;
          font-size: 11.5px;
          font-weight: 500;
          padding: 3px 11px;
          border-radius: 999px;
          color: #a4b5c4;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .switcher-tab:hover {
          color: #ffffff;
        }
        .switcher-tab.active {
          background: rgba(224, 167, 105, 0.18);
          color: #e0a769;
          border: 1px solid rgba(224, 167, 105, 0.3);
        }

        .toolbar-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .toolbar-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.06);
          color: #eef2f6;
          border: 1px solid rgba(255, 255, 255, 0.14);
          padding: 6px 13px;
          border-radius: 6px;
          font-family: 'Poppins', sans-serif;
          font-size: 12.5px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .toolbar-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(224, 167, 105, 0.4);
          color: #ffffff;
        }

        .toolbar-btn-primary {
          background: linear-gradient(135deg, #e0a769 0%, #c88a3e 100%);
          color: #071739;
          border: none;
          font-weight: 600;
          box-shadow: 0 4px 14px rgba(224, 167, 105, 0.25);
        }
        .toolbar-btn-primary:hover {
          background: linear-gradient(135deg, #ebd0a0 0%, #e0a769 100%);
          color: #050f26;
          box-shadow: 0 6px 20px rgba(224, 167, 105, 0.4);
        }

        /* ---- Poster Container (Width Constrained & Centered) ---- */
        .poster-container {
          width: 100%;
          max-width: 960px;
          display: flex;
          justify-content: center;
          box-sizing: border-box;
        }

        /* ---- The Poster Card (Fluid Responsive on Mobile, 960x1280 on Desktop) ---- */
        .poster {
          position: relative;
          width: 100%;
          max-width: 960px;
          overflow: hidden;
          color: #ffffff;
          box-sizing: border-box;
          background:
            radial-gradient(
              120% 90% at 78% -8%,
              rgba(30, 66, 140, 0.55) 0%,
              rgba(7, 23, 57, 0) 58%
            ),
            radial-gradient(
              90% 70% at 8% 104%,
              rgba(19, 45, 102, 0.45) 0%,
              rgba(7, 23, 57, 0) 60%
            ),
            linear-gradient(168deg, #0a1c44 0%, #071739 46%, #050f26 100%);
          box-shadow:
            0 24px 70px rgba(0, 0, 0, 0.7),
            0 0 0 1px rgba(255, 255, 255, 0.08);
          border-radius: 4px;
        }

        /* Desktop Fixed Canvas Aspect Ratio */
        @media (min-width: 961px) {
          .poster {
            width: 960px;
            height: 1280px;
          }
        }

        /* Faint vertical fabric weave lines */
        .poster::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.028) 0 1px,
            transparent 1px 46px
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Gold inner frame border */
        .frame {
          position: absolute;
          left: 44px;
          right: 44px;
          top: 26px;
          bottom: 26px;
          border: 1px solid rgba(224, 167, 105, 0.18);
          border-radius: 2px;
          pointer-events: none;
          z-index: 2;
        }

        @media (max-width: 768px) {
          .frame {
            left: 12px;
            right: 12px;
            top: 12px;
            bottom: 12px;
          }
        }

        /* Top-right quarterly cropped u92-flower */
        .poster-art {
          position: absolute;
          pointer-events: none;
          z-index: 1;
          opacity: 0.22;
          width: 580px;
          height: 580px;
          top: -240px;
          right: -220px;
        }

        @media (max-width: 768px) {
          .poster-art {
            width: 320px;
            height: 320px;
            top: -140px;
            right: -130px;
            opacity: 0.18;
          }
        }

        .poster-art img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 24px 40px rgba(0, 0, 0, 0.5));
          animation: poster-spin 220s linear infinite;
        }

        @keyframes poster-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Main Inner Content Layout */
        .inner {
          box-sizing: border-box;
          z-index: 3;
          position: relative;
        }

        @media (min-width: 961px) {
          .inner {
            position: absolute;
            inset: 0;
            padding: 76px 62px 56px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .poster-hero,
          .weave,
          .pillars,
          .cta {
            margin-top: 0;
          }
        }

        @media (max-width: 960px) {
          .inner {
            padding: 48px 30px 40px;
            display: flex;
            flex-direction: column;
            gap: 36px;
          }
          .poster-hero,
          .weave,
          .pillars,
          .cta {
            margin-top: 0;
          }
        }

        @media (max-width: 480px) {
          .inner {
            padding: 36px 20px 32px;
            gap: 28px;
          }
        }

        /* ---- Poster Hero Header ---- */
        .poster-hero {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        /* ---- Eyebrow & Headline ---- */
        .eyebrow {
          font-family:
            'Poppins',
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
          font-weight: 300;
          font-size: 40px;
          letter-spacing: 0.16em;
          color: #c8d4e0;
          line-height: 1;
        }

        @media (max-width: 768px) {
          .eyebrow {
            font-size: clamp(22px, 5.5vw, 34px);
          }
        }

        h1 {
          font-family:
            'Poppins',
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
          font-weight: 700;
          font-size: 154px;
          line-height: 0.88;
          letter-spacing: -0.035em;
          color: #e0a769;
          margin: 8px 0 0 0;
        }

        @media (max-width: 960px) {
          h1 {
            font-size: clamp(68px, 15vw, 130px);
            margin: 6px 0 0 0;
          }
        }

        /* ---- Surface Deck (Creative Second Section) ---- */
        .surface-deck {
          margin-top: 18px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 836px;
        }

        .surface-lede {
          font-family:
            'Poppins',
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 19px;
          line-height: 1.4;
          letter-spacing: -0.01em;
          color: #dbe4ec;
          margin: 0;
        }

        @media (max-width: 768px) {
          .surface-lede {
            font-size: clamp(15px, 4.2vw, 18px);
          }
        }

        .surface-cluster {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .surface-pills {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .surface-pill {
          display: inline-flex;
          align-items: center;
          padding: 5px 14px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(224, 167, 105, 0.24);
          border-radius: 999px;
          font-family:
            'Poppins',
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #f3e7d3;
          letter-spacing: 0.02em;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: all 0.2s ease;
        }

        .surface-pill:hover {
          background: rgba(224, 167, 105, 0.12);
          border-color: rgba(224, 167, 105, 0.45);
        }

        .surface-ai-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 5px 14px;
          background: rgba(224, 167, 105, 0.12);
          border: 1px solid rgba(224, 167, 105, 0.42);
          border-radius: 999px;
          font-family:
            'Poppins',
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          color: #e0a769;
          letter-spacing: 0.02em;
          box-shadow: 0 0 16px rgba(224, 167, 105, 0.15);
        }

        .ai-sparkle {
          color: #f5c116;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .surface-deck {
            margin-top: 14px;
            gap: 10px;
          }
          .surface-cluster {
            gap: 8px;
          }
          .surface-pills {
            gap: 6px;
          }
          .surface-pill {
            font-size: 12px;
            padding: 4px 11px;
          }
          .surface-ai-badge {
            font-size: 11.5px;
            padding: 4px 11px;
          }
        }

        .rule {
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(224, 167, 105, 0.55),
            rgba(224, 167, 105, 0.06)
          );
          margin: 32px 0 0;
        }

        @media (max-width: 768px) {
          .rule {
            margin: 24px 0 0;
          }
        }

        /* ---- Weave Signature Diagram ---- */
        .weave {
          margin-top: 42px;
        }

        @media (max-width: 768px) {
          .weave {
            margin-top: 30px;
          }
        }

        .threads {
          display: flex;
          gap: 0;
          text-align: center;
        }

        .thread {
          flex: 1;
        }

        .thread .who {
          font-family:
            'Poppins',
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
          font-weight: 500;
          font-size: 19px;
          color: #eef2f6;
          letter-spacing: 0.005em;
        }

        .thread .vendor {
          margin-top: 7px;
          font-family:
            'Poppins',
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #7d8ba1;
        }

        .converge {
          display: block;
          width: 100%;
          height: 120px;
          margin-top: 6px;
        }

        /* Mobile convergence graphic (hidden on desktop) */
        .mobile-converge {
          display: none;
        }

        @media (max-width: 768px) {
          .threads {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .thread {
            background: rgba(255, 255, 255, 0.035);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 8px;
            padding: 12px 10px;
          }
          .thread .who {
            font-size: 16px;
          }
          .thread .vendor {
            font-size: 11px;
            margin-top: 4px;
          }
          .converge {
            display: none;
          }
          .mobile-converge {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 18px 0 14px;
          }
          .mobile-converge-node {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #f5c116;
            box-shadow: 0 0 14px #f5c116;
          }
          .mobile-converge-line {
            width: 2.5px;
            height: 28px;
            background: linear-gradient(180deg, #f5c116 0%, #e0a769 100%);
          }
          .mobile-converge-anchor {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #f5c116;
            margin-top: -3.5px;
          }
          .mobile-converge-bar {
            width: min(85%, 260px);
            height: 3px;
            background: #e0a769;
            border-radius: 2px;
            margin-top: 0;
          }
        }

        .oneline {
          margin-top: 12px;
          text-align: center;
          font-family:
            'Poppins',
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
          font-weight: 600;
          font-size: 30px;
          letter-spacing: -0.01em;
          color: #ffffff;
        }

        @media (max-width: 768px) {
          .oneline {
            font-size: clamp(20px, 5vw, 26px);
            margin-top: 14px;
          }
        }

        .oneline em {
          font-style: normal;
          background: linear-gradient(118deg, #7a5a1e 0%, #b98e3a 22%, #f1d894 42%, #c49a45 58%, #e9cc80 76%, #8f6a28 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent !important;
          -webkit-text-fill-color: transparent !important;
        }

        .oneline .sub {
          display: block;
          margin-top: 11px;
          font-family: 'Noto Sans', sans-serif;
          font-weight: 400;
          font-size: 16px;
          letter-spacing: 0.01em;
          color: #8fa0b4;
        }

        @media (max-width: 768px) {
          .oneline .sub {
            font-size: clamp(13px, 3.6vw, 15px);
            margin-top: 8px;
            line-height: 1.45;
          }
        }

        /* ---- Pillars ---- */
        .pillars {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 26px;
          padding-top: 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 960px) {
          .pillars {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            margin-top: 40px;
            padding-top: 24px;
          }
          .pillar {
            background: rgba(255, 255, 255, 0.025);
            border: 1px solid rgba(255, 255, 255, 0.07);
            border-radius: 8px;
            padding: 14px 12px;
          }
        }

        @media (max-width: 480px) {
          .pillars {
            grid-template-columns: 1fr;
            gap: 12px;
            margin-top: 32px;
          }
        }

        .pillar .t {
          font-family:
            'Poppins',
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
          font-weight: 600;
          font-size: 17.5px;
          color: #f3e7d3;
          letter-spacing: 0.01em;
        }

        @media (max-width: 768px) {
          .pillar .t {
            font-size: 15.5px;
          }
        }

        .pillar .d {
          margin-top: 6px;
          font-family: 'Noto Sans', sans-serif;
          font-size: 13.5px;
          line-height: 1.45;
          color: #8fa0b4;
        }

        @media (max-width: 768px) {
          .pillar .d {
            font-size: 12.5px;
            margin-top: 4px;
          }
        }

        /* ---- CTA Section ---- */
        .cta {
          margin-top: 36px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 36px;
          padding-top: 30px;
          border-top: 1px solid rgba(224, 167, 105, 0.28);
        }

        @media (max-width: 768px) {
          .cta {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            margin-top: 32px;
            padding-top: 22px;
          }
        }

        .cta-left {
          flex: 1;
          min-width: 0;
        }

        .cta-left h2 {
          font-family:
            'Poppins',
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
          font-weight: 600;
          font-size: 28px;
          line-height: 1.28;
          letter-spacing: -0.012em;
          max-width: 530px;
          color: #ffffff;
        }

        @media (max-width: 768px) {
          .cta-left h2 {
            font-size: clamp(19px, 4.8vw, 24px);
            line-height: 1.35;
          }
        }

        .cta-left h2 span {
          color: #e0a769;
        }

        .cta-left .note {
          margin-top: 14px;
          font-family: 'Noto Sans', sans-serif;
          font-size: 13.5px;
          color: #8fa0b4;
          line-height: 1.55;
        }

        @media (max-width: 768px) {
          .cta-left .note {
            font-size: 12.5px;
            margin-top: 10px;
          }
        }

        .cta-left .note .dev {
          color: #e0a769;
          letter-spacing: 0.06em;
          font-weight: 500;
        }

        .id {
          text-align: right;
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
        }

        @media (max-width: 768px) {
          .id {
            width: 100%;
            align-items: flex-start;
            text-align: left;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 16px;
            gap: 14px;
          }
        }

        .id .contact {
          font-family: 'Noto Sans', sans-serif;
          font-size: 14px;
          line-height: 1.6;
          color: #dbe4ec;
        }

        .id .contact a {
          color: #dbe4ec;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .id .contact a:hover {
          color: #e0a769;
        }

        .id .brand-lockup {
          margin-top: 4px;
          padding-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.16);
          display: flex;
          justify-content: flex-end;
          width: 100%;
        }

        @media (max-width: 768px) {
          .id .brand-lockup {
            border-top: none;
            padding-top: 0;
            justify-content: flex-start;
          }
        }

        .id .brand-lockup img {
          height: 30px;
          width: auto;
          object-fit: contain;
        }

        /* ════════ PRINT STYLESHEET (Pixel-Perfect 1-Page A4 / Letter) ════════ */
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }

          html,
          body {
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #05101f !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          .poster-page-wrapper {
            width: 100% !important;
            height: 100vh !important;
            max-height: 100vh !important;
            min-height: 100vh !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #05101f !important;
            overflow: hidden !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }

          .poster-toolbar {
            display: none !important;
          }

          .poster-container {
            width: 100% !important;
            max-width: 100% !important;
            height: 100vh !important;
            max-height: 100vh !important;
            margin: 0 !important;
            padding: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }

          .poster {
            width: 100% !important;
            max-width: 100% !important;
            height: 100vh !important;
            max-height: 100vh !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 0 !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: avoid !important;
            border-radius: 0 !important;
            overflow: hidden !important;
            background:
              radial-gradient(
                120% 90% at 78% -8%,
                rgba(30, 66, 140, 0.55) 0%,
                rgba(7, 23, 57, 0) 58%
              ),
              radial-gradient(
                90% 70% at 8% 104%,
                rgba(19, 45, 102, 0.45) 0%,
                rgba(7, 23, 57, 0) 60%
              ),
              linear-gradient(168deg, #0a1c44 0%, #071739 46%, #050f26 100%) !important;
            background-color: #071739 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .frame {
            position: absolute !important;
            left: 26px !important;
            right: 26px !important;
            top: 22px !important;
            bottom: 22px !important;
            border: 1px solid rgba(224, 167, 105, 0.24) !important;
            border-radius: 2px !important;
            display: block !important;
            pointer-events: none !important;
            z-index: 2 !important;
          }

          .poster-art {
            position: absolute !important;
            width: 460px !important;
            height: 460px !important;
            top: -170px !important;
            right: -150px !important;
            opacity: 0.2 !important;
            display: block !important;
            z-index: 1 !important;
          }

          .poster-art img {
            animation: none !important;
            -webkit-animation: none !important;
          }

          /* ── Inner layout evenly spread across vertical height ── */
          .inner {
            position: absolute !important;
            inset: 0 !important;
            padding: 56px 54px 44px 54px !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            box-sizing: border-box !important;
            height: 100% !important;
            z-index: 3 !important;
          }

          .poster-hero {
            display: flex !important;
            flex-direction: column !important;
            width: 100% !important;
            margin: 0 !important;
          }

          .eyebrow {
            font-size: 32px !important;
            letter-spacing: 0.16em !important;
            color: #c8d4e0 !important;
            line-height: 1 !important;
            margin: 0 !important;
          }

          h1 {
            font-size: 124px !important;
            line-height: 0.88 !important;
            letter-spacing: -0.035em !important;
            color: #e0a769 !important;
            margin: 8px 0 0 0 !important;
          }

          .surface-deck {
            margin-top: 16px !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 10px !important;
            width: 100% !important;
            max-width: none !important;
          }

          .surface-lede {
            font-size: 17px !important;
            line-height: 1.35 !important;
            color: #dbe4ec !important;
            font-weight: 500 !important;
            margin: 0 !important;
          }

          .surface-cluster {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            gap: 8px !important;
            flex-wrap: wrap !important;
          }

          .surface-pills {
            display: flex !important;
            flex-direction: row !important;
            gap: 6px !important;
            flex-wrap: nowrap !important;
          }

          .surface-pill {
            display: inline-flex !important;
            align-items: center !important;
            padding: 5px 13px !important;
            background: rgba(255, 255, 255, 0.05) !important;
            border: 1px solid rgba(224, 167, 105, 0.35) !important;
            border-radius: 999px !important;
            font-size: 12.5px !important;
            font-weight: 500 !important;
            color: #f3e7d3 !important;
            letter-spacing: 0.02em !important;
            white-space: nowrap !important;
          }

          .surface-ai-badge {
            display: inline-flex !important;
            align-items: center !important;
            gap: 6px !important;
            padding: 5px 13px !important;
            background: rgba(224, 167, 105, 0.14) !important;
            border: 1px solid rgba(224, 167, 105, 0.48) !important;
            border-radius: 999px !important;
            font-size: 12px !important;
            font-weight: 600 !important;
            color: #e0a769 !important;
            letter-spacing: 0.02em !important;
            white-space: nowrap !important;
          }

          .ai-sparkle {
            color: #f5c116 !important;
            display: inline-block !important;
          }

          .rule {
            height: 1px !important;
            background: linear-gradient(
              90deg,
              rgba(224, 167, 105, 0.55),
              rgba(224, 167, 105, 0.06)
            ) !important;
            margin: 22px 0 0 !important;
          }

          /* ── Weave Diagram evenly placed in upper-middle ── */
          .weave {
            margin: 0 !important;
            width: 100% !important;
          }

          .threads {
            display: flex !important;
            flex-direction: row !important;
            grid-template-columns: none !important;
            gap: 0 !important;
            text-align: center !important;
            width: 100% !important;
          }

          .thread {
            flex: 1 1 0 !important;
            background: transparent !important;
            border: none !important;
            border-radius: 0 !important;
            padding: 0 !important;
          }

          .thread .who {
            font-size: 17.5px !important;
            font-weight: 500 !important;
            color: #eef2f6 !important;
          }

          .thread .vendor {
            margin-top: 5px !important;
            font-size: 11px !important;
            font-weight: 500 !important;
            letter-spacing: 0.16em !important;
            text-transform: uppercase !important;
            color: #7d8ba1 !important;
          }

          .converge {
            display: block !important;
            width: 100% !important;
            height: 104px !important;
            margin-top: 6px !important;
          }

          .mobile-converge {
            display: none !important;
          }

          .oneline {
            margin-top: 10px !important;
            text-align: center !important;
            font-size: 25px !important;
            font-weight: 600 !important;
            letter-spacing: -0.01em !important;
            color: #ffffff !important;
          }

          .oneline em {
            font-style: normal !important;
            background: linear-gradient(118deg, #7a5a1e 0%, #b98e3a 22%, #f1d894 42%, #c49a45 58%, #e9cc80 76%, #8f6a28 100%) !important;
            -webkit-background-clip: text !important;
            background-clip: text !important;
            color: transparent !important;
            -webkit-text-fill-color: transparent !important;
          }

          .oneline .sub {
            display: block !important;
            margin-top: 6px !important;
            font-size: 13.5px !important;
            font-weight: 400 !important;
            color: #8fa0b4 !important;
            line-height: 1.4 !important;
          }

          /* ── Pillars evenly placed in lower-middle ── */
          .pillars {
            display: grid !important;
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 20px !important;
            padding-top: 24px !important;
            border-top: 1px solid rgba(255, 255, 255, 0.12) !important;
            margin: 0 !important;
            width: 100% !important;
          }

          .pillar {
            background: transparent !important;
            border: none !important;
            border-radius: 0 !important;
            padding: 0 !important;
          }

          .pillar .t {
            font-size: 16px !important;
            font-weight: 600 !important;
            color: #f3e7d3 !important;
          }

          .pillar .d {
            margin-top: 4px !important;
            font-size: 12.5px !important;
            line-height: 1.42 !important;
            color: #8fa0b4 !important;
          }

          /* ── CTA Footer evenly anchored at bottom ── */
          .cta {
            display: flex !important;
            flex-direction: row !important;
            align-items: flex-end !important;
            justify-content: space-between !important;
            width: 100% !important;
            gap: 28px !important;
            margin: 0 !important;
            padding-top: 20px !important;
            border-top: 1px solid rgba(224, 167, 105, 0.28) !important;
            box-sizing: border-box !important;
          }

          .cta-left {
            flex: 1 1 auto !important;
            max-width: 530px !important;
            min-width: 0 !important;
            width: auto !important;
          }

          .cta-left h2 {
            font-family:
              'Poppins',
              -apple-system,
              BlinkMacSystemFont,
              sans-serif !important;
            font-weight: 600 !important;
            font-size: 23px !important;
            line-height: 1.28 !important;
            letter-spacing: -0.012em !important;
            max-width: 510px !important;
            color: #ffffff !important;
            margin: 0 !important;
            word-break: normal !important;
          }

          .cta-left h2 span {
            color: #e0a769 !important;
          }

          .cta-left .note {
            margin-top: 8px !important;
            font-family: 'Noto Sans', sans-serif !important;
            font-size: 12px !important;
            line-height: 1.45 !important;
            color: #8fa0b4 !important;
          }

          .cta-left .note .dev {
            color: #e0a769 !important;
            font-weight: 500 !important;
          }

          .id {
            flex: 0 0 auto !important;
            width: auto !important;
            max-width: none !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-end !important;
            text-align: right !important;
            border-top: none !important;
            padding-top: 0 !important;
            margin: 0 !important;
            gap: 8px !important;
          }

          .id .contact {
            font-family: 'Noto Sans', sans-serif !important;
            font-size: 13px !important;
            line-height: 1.5 !important;
            color: #dbe4ec !important;
            text-align: right !important;
            white-space: nowrap !important;
          }

          .id .contact a {
            color: #dbe4ec !important;
            text-decoration: none !important;
          }

          .id .brand-lockup {
            margin-top: 2px !important;
            padding-top: 8px !important;
            border-top: 1px solid rgba(255, 255, 255, 0.16) !important;
            display: flex !important;
            justify-content: flex-end !important;
            align-items: center !important;
            width: 100% !important;
          }

          .id .brand-lockup img {
            height: 25px !important;
            width: auto !important;
            object-fit: contain !important;
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
