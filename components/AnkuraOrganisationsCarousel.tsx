"use client";

import React, { useRef, useState } from "react";

interface Organisation {
  name: string;
  url: string;
  category: string;
  description: string;
  altText: string;
  renderLogo: () => React.ReactNode;
}

const organisations: Organisation[] = [
  {
    name: "The Foundry Loom",
    url: "https://thefoundryloom.com/",
    category: "Digital Craft & Studio",
    description: "Creative digital production & bespoke web experiences",
    altText: "The Foundry Loom logo",
    renderLogo: () => (
      <div className="flex items-center gap-2.5">
        <img
          src="/images/organisations/foundry-loom-dark.png"
          alt="The Foundry Loom"
          className="h-8 w-8 object-contain rounded-md"
        />
        <span className="font-bold text-[15px] tracking-tight text-[#071739] group-hover:text-[#c88a3e] transition-colors whitespace-nowrap">
          The Foundry Loom
        </span>
      </div>
    ),
  },
  {
    name: "Marma Security",
    url: "https://www.marmasec.com/",
    category: "Autonomous Cyber Defense",
    description: "Enterprise hardware & endpoint security platform",
    altText: "Marma Security logo",
    renderLogo: () => (
      <img
        src="/images/organisations/marma-security.svg"
        alt="Marma Security"
        className="h-6 w-auto max-w-[170px] object-contain"
      />
    ),
  },
  {
    name: "InteleQlass",
    url: "https://inteleqlass.in/",
    category: "Quantum & Cognitive AI",
    description: "Advanced cognitive intelligence & learning networks",
    altText: "InteleQlass logo",
    renderLogo: () => (
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-[#071739] flex items-center justify-center text-[#38bdf8] font-mono text-xs font-bold shadow-sm">
          IQ
        </div>
        <span className="font-bold text-[16px] text-[#071739] tracking-tight group-hover:text-[#c88a3e] transition-colors whitespace-nowrap">
          Intele<span className="text-[#0284c7]">Qlass</span>
        </span>
      </div>
    ),
  },
  {
    name: "Bioflow",
    url: "https://main.dgvywblrwouqh.amplifyapp.com/",
    category: "Connected Health & Biometrics",
    description: "Real-time wearable health telemetry & diagnostics",
    altText: "Bioflow logo",
    renderLogo: () => (
      <div className="flex items-center gap-2.5">
        <svg
          width="32"
          height="32"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <rect width="100" height="100" rx="24" fill="#0B1120" />
          <rect x="0" y="0" width="100" height="100" rx="24" fill="#1E3A8A" opacity="0.4" />
          <rect x="1" y="1" width="98" height="98" rx="23" stroke="#3B82F6" strokeWidth="2" opacity="0.3" />
          <path 
            d="M 22 50 C 22 25 50 25 50 50 C 50 75 78 75 78 50 C 78 25 50 25 50 50 C 50 75 22 75 22 50 Z" 
            stroke="#2563EB" 
            strokeWidth="12" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <path 
            d="M 22 50 C 22 25 50 25 50 50" 
            stroke="#60A5FA" 
            strokeWidth="12" 
            strokeLinecap="round" 
          />
          <path
            d="M 12 50 L 32 50 L 42 22 L 58 78 L 68 50 L 88 50"
            stroke="white"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="88" cy="50" r="4.5" fill="white" />
          <circle cx="12" cy="50" r="4.5" fill="#60A5FA" />
        </svg>
        <span className="font-bold text-[17px] tracking-tight text-[#071739] group-hover:text-[#c88a3e] transition-colors">
          Bio<span className="text-[#2563eb]">Flow</span>
        </span>
      </div>
    ),
  },
  {
    name: "Gotta",
    url: "https://gottabeverages.in/",
    category: "Consumer Brand & Commerce",
    description: "Next-generation lifestyle & functional beverages",
    altText: "Gotta Beverages logo",
    renderLogo: () => (
      <div className="flex items-center text-[#071739] group-hover:text-[#c88a3e] transition-colors">
        <svg
          viewBox="0 0 505 216"
          className="h-7 w-auto fill-none stroke-current"
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
          role="img"
          aria-label="Gotta Beverages"
        >
          <g transform="translate(6,162)">
            <path d="M9 -50 a46 46 0 1 0 92 0 a46 46 0 1 0 -92 0 M101 -92 L101 18 C101 34 88 44 70 44 C58 44 48 40 41 33 M139 -50 a46 46 0 1 0 92 0 a46 46 0 1 0 -92 0 M257 -100 L375 -100 M283 -152 L283 -12 C283 -2 290 3 301 3 M349 -152 L349 -12 C349 -2 356 3 367 3 M398 -50 a46 46 0 1 0 92 0 a46 46 0 1 0 -92 0 M490 -92 L490 0" />
          </g>
        </svg>
      </div>
    ),
  },
  {
    name: "New Origin",
    url: "https://new-origin.in/",
    category: "Cloud Native Systems",
    description: "Enterprise digital transformation & scalable services",
    altText: "New Origin logo",
    renderLogo: () => (
      <div className="flex items-center text-[#071739] group-hover:text-[#c88a3e] transition-colors">
        <img
          src="/images/organisations/new-origin.svg"
          alt="New Origin"
          className="h-6 w-auto max-w-[150px] object-contain"
          style={{ filter: "brightness(0)" }}
        />
      </div>
    ),
  },
  {
    name: "Kshana",
    url: "https://kshana.cloud/",
    category: "High-Performance Cloud",
    description: "Hyperscale cloud acceleration & compute infrastructure",
    altText: "Kshana logo",
    renderLogo: () => (
      <div className="flex items-center gap-2">
        <img
          src="/images/organisations/kshana-logo.webp"
          alt="Kshana"
          className="h-7 w-7 object-contain"
        />
        <span className="font-bold text-[15px] tracking-widest text-[#071739] group-hover:text-[#c88a3e] transition-colors">
          KSHANA
        </span>
      </div>
    ),
  },
  {
    name: "MSL Products",
    url: "https://www.mslproducts.com/",
    category: "Sovereign GPU Infrastructure",
    description: "High-density AI clusters & accelerated hardware",
    altText: "MSL Products logo",
    renderLogo: () => (
      <div className="flex items-center gap-2.5">
        <img
          src="/images/organisations/msl-products.webp"
          alt="MSL Products"
          className="h-7 w-7 object-contain rounded"
        />
        <span className="font-bold text-[15px] tracking-tight text-[#071739] group-hover:text-[#c88a3e] transition-colors whitespace-nowrap">
          MSL <span className="font-normal text-[#c88a3e]">Products</span>
        </span>
      </div>
    ),
  },
  {
    name: "Samami Ventures",
    url: "https://www.samamiventures.com/",
    category: "Venture Studio & Incubation",
    description: "Backing and building frontier technology ventures",
    altText: "Samami Ventures logo",
    renderLogo: () => (
      <div className="flex items-center">
        <span className="font-bold text-[15px] tracking-wider uppercase text-[#071739] group-hover:text-[#c88a3e] transition-colors whitespace-nowrap">
          SAMAMI <span className="font-light text-[#a87228]">VENTURES</span>
        </span>
      </div>
    ),
  },
];

export default function AnkuraOrganisationsCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Triple list for completely seamless infinite loop
  const marqueeItems = [...organisations, ...organisations, ...organisations];

  return (
    <div
      className="section alt ankura-orgs-section"
      id="organisations"
      style={{
        position: "relative",
        background: "#ffffff",
        padding: "72px 0 80px",
        overflow: "hidden",
      }}
      aria-label="Organisations running on Ankura platform"
    >
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div
          style={{
            maxWidth: "840px",
            marginBottom: "36px",
          }}
        >
          <div className="kicker" style={{ color: "#a87228", marginBottom: "14px" }}>
            Enterprise Ecosystem
          </div>
          <h2 className="display text-navy-gradient">
            Organisations running on <span className="au">Ankura platform</span>
          </h2>
          <p
            className="lede"
            style={{
              marginTop: 18,
              color: "#475569",
              fontSize: "17px",
              lineHeight: 1.6,
            }}
          >
            Leading enterprises, sovereign platforms, and frontier technology builders run their digital surfaces, customer portals, and intelligent workflows on StamBH Ankura.
          </p>
        </div>
      </div>

      {/* Carousel Container with Left/Right Gradient Masks */}
      <div
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          padding: "12px 0",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left gradient fade */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "clamp(40px, 8vw, 140px)",
            background: "linear-gradient(90deg, #ffffff 20%, rgba(255, 255, 255, 0) 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Right gradient fade */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "clamp(40px, 8vw, 140px)",
            background: "linear-gradient(270deg, #ffffff 20%, rgba(255, 255, 255, 0) 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Marquee Track */}
        <div
          ref={marqueeRef}
          className="ankura-marquee-track"
          style={{
            display: "flex",
            gap: "22px",
            width: "max-content",
            animation: "marqueeLoop 45s linear infinite",
            animationPlayState: isPaused ? "paused" : "running",
            willChange: "transform",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          {marqueeItems.map((org, index) => (
            <a
              key={`${org.name}-${index}`}
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group ankura-org-card"
              title={`Visit ${org.name} (${org.url})`}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minWidth: "270px",
                maxWidth: "290px",
                height: "124px",
                padding: "18px 22px",
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "16px",
                textDecoration: "none",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: "0 4px 16px rgba(7, 23, 57, 0.05), 0 1px 3px rgba(7, 23, 57, 0.03)",
                position: "relative",
                cursor: "pointer",
                contain: "content",
              }}
            >
              {/* Top Row: Logo & External link arrow */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", minHeight: "36px" }}>
                  {org.renderLogo ? org.renderLogo() : (
                    <span className="font-bold text-[#071739]">{org.name}</span>
                  )}
                </div>
                <div
                  className="org-arrow"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    color: "#a87228",
                    fontSize: "12px",
                    fontWeight: 600,
                    transition: "all 0.25s ease",
                    flexShrink: 0,
                  }}
                >
                  ↗
                </div>
              </div>

              {/* Bottom Row: Category without LIVE badge */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderTop: "1px solid #f1f5f9",
                  paddingTop: "10px",
                  marginTop: "6px",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#64748b",
                    letterSpacing: "0.2px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {org.category}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Embedded animation styles */}
      <style jsx global>{`
        @keyframes marqueeLoop {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(calc(-100% / 3), 0, 0);
          }
        }

        .ankura-org-card:hover {
          transform: translateY(-4px);
          border-color: #c88a3e !important;
          box-shadow: 0 14px 32px rgba(200, 138, 62, 0.16), 0 4px 12px rgba(7, 23, 57, 0.08) !important;
          background: #ffffff !important;
        }

        .ankura-org-card:hover .org-arrow {
          background: #c88a3e !important;
          color: #ffffff !important;
          border-color: #c88a3e !important;
          transform: translate(2px, -2px);
        }

        @media (max-width: 768px) {
          .ankura-orgs-section {
            padding: 50px 0 58px !important;
          }
          .ankura-org-card {
            min-width: 240px !important;
            max-width: 250px !important;
            height: 114px !important;
            padding: 14px 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
