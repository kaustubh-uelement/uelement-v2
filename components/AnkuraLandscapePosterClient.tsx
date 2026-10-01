'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './AnkuraLandscapePoster.css';
import { branding } from '@/lib/content/branding';

export default function AnkuraLandscapePosterClient() {
  const [copied, setCopied] = useState(false);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Responsive scaling to fit window width while maintaining 1600x1080 aspect ratio
  useEffect(() => {
    const updateScale = () => {
      if (typeof window !== 'undefined') {
        const availableWidth = window.innerWidth - 32; // 16px padding on sides
        const availableHeight = window.innerHeight - 100; // account for toolbar & padding
        const scaleX = availableWidth / 1600;
        const scaleY = availableHeight / 1080;
        const targetScale = Math.min(1, scaleX, scaleY);
        setScale(Math.max(0.2, targetScale));
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div className="alp-page-wrapper">
      {/* ── Floating Action Toolbar (Web only, hidden on print) ── */}
      <aside className="alp-toolbar" aria-label="Poster Actions">
        <div className="alp-toolbar-left">
          <Link href="/ankura" className="alp-toolbar-back-btn">
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
          <span className="alp-toolbar-divider hidden sm:inline">/</span>

          {/* Quick switcher between Vertical Pitch & Landscape Architecture */}
          <div className="alp-toolbar-switcher hidden sm:flex">
            <Link href="/ankura/poster" className="alp-switcher-tab">
              Vertical Pitch
            </Link>
            <span className="alp-switcher-tab active">
              Landscape Architecture
            </span>
          </div>
        </div>

        <div className="alp-toolbar-right">
          <button
            type="button"
            className="alp-toolbar-btn"
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
            className="alp-toolbar-btn alp-toolbar-btn-primary"
            onClick={handlePrint}
            title="Print or Save as Landscape PDF"
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

      {/* ── Scaled Landscape Poster Container ── */}
      <main
        className="alp-stage-scaler"
        ref={containerRef}
        style={{
          width: `${1600 * scale}px`,
          height: `${1080 * scale}px`,
        }}
      >
        <article
          className="alp-stage"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: '0 0',
          }}
        >
          {/* Subtle spinning quarterly cropped u92-flower in top-right corner */}
          <div className="alp-stage-flower" aria-hidden="true">
            <Image
              src="/u92-flower.png"
              alt=""
              width={680}
              height={680}
              priority
            />
          </div>

          {/* Broken links behind the isolated problem islands */}
          <svg
            className="alp-layer"
            viewBox="0 0 1600 1080"
            fill="none"
            aria-hidden="true"
          >
            <g
              stroke="#4b6382"
              strokeWidth="1.4"
              strokeDasharray="5 7"
              opacity=".45"
            >
              <path d="M118 211 L292 211" />
              <path d="M118 211 L118 301" />
              <path d="M292 211 L292 301" />
              <path d="M118 301 L292 301" />
              <path d="M118 301 L118 391" />
              <path d="M292 301 L292 391" />
              <path d="M118 391 L292 391" />
              <path d="M118 391 L205 481" />
              <path d="M292 391 L205 481" />
            </g>
            <g fill="#071739" stroke="#75839a" strokeWidth="1.2">
              <circle cx="205" cy="211" r="9" />
              <circle cx="118" cy="256" r="9" />
              <circle cx="292" cy="256" r="9" />
              <circle cx="205" cy="301" r="9" />
              <circle cx="118" cy="346" r="9" />
              <circle cx="292" cy="346" r="9" />
              <circle cx="205" cy="391" r="9" />
              <circle cx="161" cy="436" r="9" />
              <circle cx="248" cy="436" r="9" />
            </g>
            <g stroke="#e0a769" strokeWidth="1.5" strokeLinecap="round">
              <path d="M202 208 l6 6 M208 208 l-6 6" />
              <path d="M115 253 l6 6 M121 253 l-6 6" />
              <path d="M289 253 l6 6 M295 253 l-6 6" />
              <path d="M202 298 l6 6 M208 298 l-6 6" />
              <path d="M115 343 l6 6 M121 343 l-6 6" />
              <path d="M289 343 l6 6 M295 343 l-6 6" />
              <path d="M202 388 l6 6 M208 388 l-6 6" />
              <path d="M158 433 l6 6 M164 433 l-6 6" />
              <path d="M245 433 l6 6 M251 433 l-6 6" />
            </g>
          </svg>

          {/* ══════ CHIPS (Problem vs Outcome) ══════ */}
          <div className="alp-chip alp-chip-problem">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M12 3 2 20h20L12 3Z" />
              <path d="M12 10v4M12 17.5v.01" />
            </svg>
            THE PROBLEM
          </div>

          <div className="alp-chip alp-chip-outcome">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z" />
            </svg>
            THE OUTCOME
          </div>

          {/* ══════ CENTER HERO HEADLINE ══════ */}
          <div className="alp-head">
            <h1>
              We don&apos;t add tools.
              <span className="alp-headline-gold">We build bridges.</span>
            </h1>
            <div className="alp-rule" aria-hidden="true"></div>
            <div className="alp-lede">
              One platform. One data plane. Every experience connected.
            </div>
            <p className="alp-sub">
              {branding.ankura} unifies your people, data and experiences on a single
              fabric; so the business can spend its energy on growth, not on
              integration.
            </p>
          </div>

          {/* ══════ LEFT SIDE: FRAGMENTATION & COSTS ══════ */}
          <div className="alp-side-h" style={{ left: '44px', top: '84px' }}>
            Fragmented. Disconnected. Costly.
          </div>
          <div
            className="alp-side-s"
            style={{ left: '44px', top: '114px', width: '330px' }}
          >
            Seven systems. Seven versions of the customer.
            <br />
            Duplicate data, broken journeys, lost opportunity.
          </div>

          {/* 7 Problem Island Nodes */}
          {/* Row 1 */}
          <div className="alp-node" style={{ left: '44px', top: '175px' }}>
            <svg
              className="alp-node-ic"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <rect x="2.5" y="4" width="19" height="13" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
            <b>WEBSITE</b>
            <span>On its own platform</span>
          </div>

          <div className="alp-node" style={{ left: '218px', top: '175px' }}>
            <svg
              className="alp-node-ic"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <circle cx="12" cy="8" r="3.6" />
              <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
            </svg>
            <b>CRM</b>
            <span>No single customer view</span>
          </div>

          {/* Row 2 */}
          <div className="alp-node" style={{ left: '44px', top: '265px' }}>
            <svg
              className="alp-node-ic"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M3 10v4h4l6 4V6l-6 4H3Z" />
              <path d="M17 9a5 5 0 0 1 0 6" />
            </svg>
            <b>MARKETING</b>
            <span>Disconnected campaigns</span>
          </div>

          <div className="alp-node" style={{ left: '218px', top: '265px' }}>
            <svg
              className="alp-node-ic"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M20 15a3 3 0 0 1-3 3H8l-4 3V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v9Z" />
            </svg>
            <b>SUPPORT</b>
            <span>Siloed conversations</span>
          </div>

          {/* Row 3 */}
          <div className="alp-node" style={{ left: '44px', top: '355px' }}>
            <svg
              className="alp-node-ic"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M3 4h2.2l2.3 11h10l2.2-7H7" />
              <circle cx="9.5" cy="19" r="1.4" />
              <circle cx="17" cy="19" r="1.4" />
            </svg>
            <b>COMMERCE</b>
            <span>A separate experience</span>
          </div>

          <div className="alp-node" style={{ left: '218px', top: '355px' }}>
            <svg
              className="alp-node-ic"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M4 20V10M10 20V5M16 20v-7M22 20H2" />
            </svg>
            <b>ANALYTICS</b>
            <span>Scattered, lagging data</span>
          </div>

          {/* Row 4 (Centered) */}
          <div className="alp-node" style={{ left: '131px', top: '445px' }}>
            <svg
              className="alp-node-ic"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <ellipse cx="12" cy="6" rx="7.5" ry="3" />
              <path d="M4.5 6v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6M4.5 12v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6" />
            </svg>
            <b>ERP / BACK OFFICE</b>
            <span>Operational islands</span>
          </div>

          {/* Left Side: Impact Card */}
          <div className="alp-impact">
            <h3>WHAT IT COSTS YOU</h3>
            <ul>
              <li>
                <i></i>
                <span>Acquisition cost climbs every quarter</span>
              </li>
              <li>
                <i></i>
                <span>Conversion and retention both leak</span>
              </li>
              <li>
                <i></i>
                <span>Customers repeat themselves at every touchpoint</span>
              </li>
              <li>
                <i></i>
                <span>Decisions wait on reconciled reports</span>
              </li>
              <li>
                <i></i>
                <span>Licences, integrations and teams duplicated</span>
              </li>
            </ul>
          </div>

          {/* ══════ CENTER: 3 CORE PILLARS ══════ */}
          <div className="alp-pillars">
            <div>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <circle cx="12" cy="8" r="3.6" />
                <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
              </svg>
              <b>One identity</b>
              <span>A single, verified customer across every surface</span>
            </div>
            <div>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <circle cx="12" cy="12" r="2.6" />
                <circle cx="4" cy="6" r="2" />
                <circle cx="20" cy="6" r="2" />
                <circle cx="4" cy="18" r="2" />
                <circle cx="20" cy="18" r="2" />
                <path d="M9.7 10.6 5.6 7.4M14.3 10.6l4.1-3.2M9.7 13.4l-4.1 3.2M14.3 13.4l4.1 3.2" />
              </svg>
              <b>One customer graph</b>
              <span>
                Real-time relationships between people, accounts and events
              </span>
            </div>
            <div>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z" />
                <path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5" />
              </svg>
              <b>One data plane</b>
              <span>Secure, sovereign, composable by design</span>
            </div>
          </div>

          {/* ══════ CENTER: THE SUSPENSION BRIDGE SCHEMATIC ══════ */}
          <svg
            className="alp-bridge"
            viewBox="0 0 740 260"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="alpDeckGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4b6382" />
                <stop offset="45%" stopColor="#e0a769" />
                <stop offset="100%" stopColor="#f5c116" />
              </linearGradient>
              <linearGradient id="alpFlowGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4b6382" stopOpacity="0" />
                <stop offset="40%" stopColor="#e0a769" stopOpacity=".95" />
                <stop offset="100%" stopColor="#f5c116" stopOpacity=".2" />
              </linearGradient>
              <filter
                id="alpBridgeGlow"
                x="-40%"
                y="-60%"
                width="180%"
                height="240%"
              >
                <feGaussianBlur stdDeviation="6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Left & Right rocky bridgeheads */}
            <path
              d="M0 166 L18 148 L40 158 L62 142 L84 160 L96 166 Z"
              fill="#0f1526"
              opacity=".95"
            />
            <path
              d="M740 166 L722 148 L700 158 L678 142 L656 160 L644 166 Z"
              fill="#0f1526"
              opacity=".95"
            />

            {/* Twin Suspension Towers */}
            {/* Left Tower */}
            <g opacity=".92">
              <rect x="180" y="24" width="14" height="152" fill="#091834" />
              <rect
                x="180"
                y="24"
                width="14"
                height="152"
                stroke="#4b6382"
                strokeWidth="1.2"
                fill="none"
              />
              <rect x="210" y="24" width="14" height="152" fill="#091834" />
              <rect
                x="210"
                y="24"
                width="14"
                height="152"
                stroke="#4b6382"
                strokeWidth="1.2"
                fill="none"
              />
              {/* Bracing */}
              <line
                x1="180"
                y1="54"
                x2="224"
                y2="54"
                stroke="#4b6382"
                strokeWidth="1.4"
              />
              <line
                x1="180"
                y1="94"
                x2="224"
                y2="94"
                stroke="#4b6382"
                strokeWidth="1.4"
              />
              <line
                x1="180"
                y1="134"
                x2="224"
                y2="134"
                stroke="#4b6382"
                strokeWidth="1.4"
              />
              <line
                x1="180"
                y1="54"
                x2="224"
                y2="94"
                stroke="#4b6382"
                strokeWidth="1"
                opacity=".5"
              />
              <line
                x1="224"
                y1="54"
                x2="180"
                y2="94"
                stroke="#4b6382"
                strokeWidth="1"
                opacity=".5"
              />
              <line
                x1="180"
                y1="94"
                x2="224"
                y2="134"
                stroke="#4b6382"
                strokeWidth="1"
                opacity=".5"
              />
              <line
                x1="224"
                y1="94"
                x2="180"
                y2="134"
                stroke="#4b6382"
                strokeWidth="1"
                opacity=".5"
              />
              {/* Pinnacle crown */}
              <polygon points="187,24 202,6 217,24" fill="#e0a769" />
            </g>

            {/* Right Tower */}
            <g opacity=".92">
              <rect x="516" y="24" width="14" height="152" fill="#091834" />
              <rect
                x="516"
                y="24"
                width="14"
                height="152"
                stroke="#4b6382"
                strokeWidth="1.2"
                fill="none"
              />
              <rect x="546" y="24" width="14" height="152" fill="#091834" />
              <rect
                x="546"
                y="24"
                width="14"
                height="152"
                stroke="#4b6382"
                strokeWidth="1.2"
                fill="none"
              />
              {/* Bracing */}
              <line
                x1="516"
                y1="54"
                x2="560"
                y2="54"
                stroke="#4b6382"
                strokeWidth="1.4"
              />
              <line
                x1="516"
                y1="94"
                x2="560"
                y2="94"
                stroke="#4b6382"
                strokeWidth="1.4"
              />
              <line
                x1="516"
                y1="134"
                x2="560"
                y2="134"
                stroke="#4b6382"
                strokeWidth="1.4"
              />
              <line
                x1="516"
                y1="54"
                x2="560"
                y2="94"
                stroke="#4b6382"
                strokeWidth="1"
                opacity=".5"
              />
              <line
                x1="560"
                y1="54"
                x2="516"
                y2="94"
                stroke="#4b6382"
                strokeWidth="1"
                opacity=".5"
              />
              <line
                x1="516"
                y1="94"
                x2="560"
                y2="134"
                stroke="#4b6382"
                strokeWidth="1"
                opacity=".5"
              />
              <line
                x1="560"
                y1="94"
                x2="516"
                y2="134"
                stroke="#4b6382"
                strokeWidth="1"
                opacity=".5"
              />
              {/* Pinnacle crown */}
              <polygon points="523,24 538,6 553,24" fill="#e0a769" />
            </g>

            {/* Main Suspension Cables */}
            <path
              d="M74 166 Q 138 98 202 24"
              stroke="#a4b5c4"
              strokeWidth="2.2"
              fill="none"
            />
            <path
              d="M202 24 Q 370 128 538 24"
              stroke="url(#alpDeckGrad)"
              strokeWidth="3.2"
              fill="none"
              filter="url(#alpBridgeGlow)"
            />
            <path
              d="M538 24 Q 602 98 666 166"
              stroke="#f5c116"
              strokeWidth="2.2"
              fill="none"
            />

            {/* Vertical Suspender Hangers */}
            <g stroke="#a4b5c4" strokeWidth="1" opacity=".55">
              <line x1="110" y1="138" x2="110" y2="166" />
              <line x1="140" y1="112" x2="140" y2="166" />
              <line x1="170" y1="84" x2="170" y2="166" />

              <line x1="242" y1="52" x2="242" y2="166" />
              <line x1="272" y1="74" x2="272" y2="166" />
              <line x1="302" y1="92" x2="302" y2="166" />
              <line x1="336" y1="104" x2="336" y2="166" />
              <line x1="370" y1="108" x2="370" y2="166" />
              <line x1="404" y1="104" x2="404" y2="166" />
              <line x1="438" y1="92" x2="438" y2="166" />
              <line x1="468" y1="74" x2="468" y2="166" />
              <line x1="498" y1="52" x2="498" y2="166" />

              <line x1="570" y1="84" x2="570" y2="166" />
              <line x1="600" y1="112" x2="600" y2="166" />
              <line x1="630" y1="138" x2="630" y2="166" />
            </g>

            {/* Roadway Bridge Deck Truss */}
            <rect
              x="60"
              y="166"
              width="620"
              height="8"
              fill="url(#alpDeckGrad)"
            />
            <rect
              x="60"
              y="174"
              width="620"
              height="3"
              fill="#060e20"
              opacity=".8"
            />

            {/* Glowing Data Highway Streamlines */}
            <g
              filter="url(#alpBridgeGlow)"
              stroke="url(#alpFlowGrad)"
              strokeLinecap="round"
              fill="none"
            >
              <path d="M78 190 C 220 204, 430 180, 664 194" strokeWidth="2.4" />
              <path
                d="M78 206 C 250 224, 440 198, 664 210"
                strokeWidth="1.6"
                opacity=".85"
              />
              <path
                d="M78 220 C 240 236, 460 214, 664 224"
                strokeWidth="1.2"
                opacity=".65"
              />
            </g>

            {/* Center Suspended Emblem Plaque */}
            <rect
              x="260"
              y="74"
              width="220"
              height="66"
              rx="11"
              fill="#071739"
              stroke="#e0a769"
              strokeOpacity=".8"
              strokeWidth="1.5"
            />
            <path d="M370 88 l15 28 h-30 Z" fill="#e0a769" />
            <text
              x="370"
              y="130"
              textAnchor="middle"
              fontFamily="Reddit Sans, Poppins, sans-serif"
              fontSize="21"
              fontWeight="800"
              letterSpacing="7"
              fill="#ffffff"
            >
              ANKURA
            </text>
            <text
              x="370"
              y="180"
              textAnchor="middle"
              fontFamily="DM Serif Text, Georgia, serif"
              fontStyle="italic"
              fontSize="15"
              fill="#f3e7d3"
            >
              The Enterprise Digital Fabric
            </text>
          </svg>

          {/* ══════ CAPABILITY STRIP ══════ */}
          <div className="alp-caps">
            <span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m9 8-5 4 5 4M15 8l5 4-5 4" />
              </svg>
              API-FIRST
            </span>
            <i></i>
            <span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="7" rx="2" />
                <path d="M6 15h5M6 19h9" />
              </svg>
              HEADLESS
            </span>
            <i></i>
            <span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
              </svg>
              COMPOSABLE
            </span>
            <i></i>
            <span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 3 4.5 6v6c0 4.6 3.2 8 7.5 9 4.3-1 7.5-4.4 7.5-9V6L12 3Z" />
              </svg>
              SOVEREIGN &amp; SECURE
            </span>
            <i></i>
            <span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 19V9M10 19V5M16 19v-6M21 19H3" />
              </svg>
              SCALABLE
            </span>
          </div>

          {/* ══════ RIGHT SIDE: CONNECTED CUSTOMER LIFECYCLE ══════ */}
          <div
            className="alp-side-h"
            style={{ right: '44px', top: '84px', textAlign: 'right' }}
          >
            Connected. Unified. Exceptional.
          </div>
          <div
            className="alp-side-s"
            style={{
              right: '44px',
              top: '114px',
              width: '330px',
              textAlign: 'right',
            }}
          >
            One journey the customer actually feels.
            <br />
            Better experiences, happier customers, durable growth.
          </div>

          <div className="alp-ring">
            <svg
              className="alp-ring-svg"
              viewBox="0 0 420 440"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="210"
                cy="220"
                r="145"
                stroke="#e0a769"
                strokeOpacity=".45"
                strokeWidth="1.4"
                strokeDasharray="4 8"
              />
              <circle
                cx="210"
                cy="220"
                r="145"
                stroke="#f5c116"
                strokeOpacity=".16"
                strokeWidth="10"
              />
              {/* Directional arrowheads */}
              <g fill="#e0a769">
                <path d="M336 148 l9 4 -7 7 Z" />
                <path d="M336 292 l2 10 -9 -4 Z" />
                <path d="M210 365 l-8 6 0 -10 Z" />
                <path d="M84 292 l-9 4 7 -7 Z" />
                <path d="M84 148 l-2 -10 9 4 Z" />
                <path d="M210 75 l8 -6 0 10 Z" />
              </g>
            </svg>

            {/* Center Core Badge */}
            <div className="alp-core">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <circle cx="9" cy="8" r="3.2" />
                <path d="M2.5 19a6.5 6.5 0 0 1 13 0" />
                <path d="M16.5 5.4a3.2 3.2 0 0 1 0 5.2M19 3a6.6 6.6 0 0 1 0 10" />
              </svg>
              <b>
                Connected
                <br />
                customer
              </b>
              <span>Known. Valued. Delighted.</span>
            </div>

            {/* 6 Orbiting Stations - Mathematically positioned without clipping */}
            {/* Station 1 - Top (12 o'clock) */}
            <div className="alp-stage-b" style={{ left: '158px', top: '25px' }}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="12" r="8" />
                <circle cx="12" cy="12" r="3.2" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
              </svg>
              <b>1 ATTRACT</b>
              <span>Reach the right audience</span>
            </div>

            {/* Station 2 - 2 o'clock */}
            <div className="alp-stage-b" style={{ left: '284px', top: '98px' }}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M20 14a3 3 0 0 1-3 3H9l-4 3V6a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v8Z" />
              </svg>
              <b>2 ENGAGE</b>
              <span>Meaningful dialogue</span>
            </div>

            {/* Station 3 - 4 o'clock */}
            <div
              className="alp-stage-b"
              style={{ left: '284px', top: '242px' }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M3 4h2.2l2.3 11h10l2.2-7H7" />
                <circle cx="9.5" cy="19" r="1.4" />
                <circle cx="17" cy="19" r="1.4" />
              </svg>
              <b>3 CONVERT</b>
              <span>Frictionless buying</span>
            </div>

            {/* Station 4 - Bottom (6 o'clock) */}
            <div
              className="alp-stage-b"
              style={{ left: '158px', top: '315px' }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
                <rect x="2.5" y="14" width="4" height="6" rx="1.6" />
                <rect x="17.5" y="14" width="4" height="6" rx="1.6" />
              </svg>
              <b>4 SERVE</b>
              <span>Fast, informed support</span>
            </div>

            {/* Station 5 - 8 o'clock */}
            <div className="alp-stage-b" style={{ left: '32px', top: '242px' }}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M12 20s-7-4.4-7-9.2A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.8C19 15.6 12 20 12 20Z" />
              </svg>
              <b>5 RETAIN</b>
              <span>Loyalty built on trust</span>
            </div>

            {/* Station 6 - 10 o'clock */}
            <div className="alp-stage-b" style={{ left: '32px', top: '98px' }}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M3 10v4h3.5L13 18V6L6.5 10H3Z" />
                <path d="M17 9a5 5 0 0 1 0 6M20 6.5a9 9 0 0 1 0 11" />
              </svg>
              <b>6 ADVOCATE</b>
              <span>Customers champion you</span>
            </div>
          </div>

          {/* ══════ STRATEGIC BENEFITS BAR (Across the bottom) ══════ */}
          <div className="alp-benefits">
            <div className="alp-benefit-item">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M4 17 10 11l4 4 6-7" />
                <path d="M20 8h-4.5M20 8v4.5" />
              </svg>
              <div>
                <b>Higher revenue</b>
                <span>More conversion across every channel</span>
              </div>
            </div>

            <div className="alp-benefit-item">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M8.5 14.5a4.5 4.5 0 0 0 7 0M9 9.5v.01M15 9.5v.01" />
              </svg>
              <div>
                <b>Better experience</b>
                <span>Personal and continuous across all touchpoints</span>
              </div>
            </div>

            <div className="alp-benefit-item">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M12 3 4.5 6v6c0 4.6 3.2 8 7.5 9 4.3-1 7.5-4.4 7.5-9V6L12 3Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <div>
                <b>Lower cost</b>
                <span>One stack instead of seven, zero duplicate data</span>
              </div>
            </div>

            <div className="alp-benefit-item">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
              </svg>
              <div>
                <b>Faster innovation</b>
                <span>Compose from modules, launch in weeks</span>
              </div>
            </div>

            <div className="alp-benefit-item">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M12 3a9 9 0 1 0 9 9h-9V3Z" />
                <path d="M15 3.6A9 9 0 0 1 20.4 9H15V3.6Z" />
              </svg>
              <div>
                <b>Data-driven decisions</b>
                <span>One source of truth, insight in real time</span>
              </div>
            </div>
          </div>

          {/* ══════ FOOTER: KICKER & BRAND LOCKUP ══════ */}
          <footer className="alp-foot">
            <span className="alp-kicker">
              Land fast. Expand smart. Scale limitlessly.
            </span>
            <span className="alp-dot">·</span>
            <span className="alp-cta">
              Start with one module. <u>Connect everything.</u>
            </span>
          </footer>

          <div className="alp-mark">
            <span className="alp-tagline">{branding.tagline}</span>
            <div className="alp-mark-logo">
              <Image
                src="/icons/global/UElement_Tech_Logo_White.png"
                alt="UElement Technologies"
                width={160}
                height={28}
                priority
                style={{ height: '26px', width: 'auto' }}
              />
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
