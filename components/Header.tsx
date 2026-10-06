"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [platformTab, setPlatformTab] = useState<"quantum" | "enterprise">("quantum");
  const [solutionsTab, setSolutionsTab] = useState<"industries" | "usecases">("industries");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hoveredMenuRef = useRef<string | null>(null);

  // Close everything on route change
  useEffect(() => {
    hoveredMenuRef.current = null;
    setActiveMenu(null);
    setIsDrawerOpen(false);
  }, [pathname]);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // When activeMenu is open, wheel scrolling on the page smoothly closes it
  useEffect(() => {
    if (!activeMenu) return;
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest(".mega")) {
        hoveredMenuRef.current = null;
        setActiveMenu(null);
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeMenu]);

  // Handle click outside to close dropdowns and drawer
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest(".nav__item") && !target?.closest(".menu-btn") && !target?.closest(".drawer")) {
        hoveredMenuRef.current = null;
        setActiveMenu(null);
        setIsDrawerOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Lock scroll only for full-screen mobile drawer (never for desktop dropdowns to prevent layout jerk)
  useEffect(() => {
    if (isDrawerOpen) {
      document.documentElement.classList.add("nav-open");
      document.body.classList.add("nav-open");
    } else {
      document.documentElement.classList.remove("nav-open");
      document.body.classList.remove("nav-open");
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        hoveredMenuRef.current = null;
        setActiveMenu(null);
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.documentElement.classList.remove("nav-open");
      document.body.classList.remove("nav-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDrawerOpen]);

  const handleMouseEnter = (menuName: string) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    hoveredMenuRef.current = menuName;
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveMenu(menuName);
  };

  const handleMouseLeave = (menuName: string) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    if (hoveredMenuRef.current === menuName) {
      hoveredMenuRef.current = null;
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      if (!hoveredMenuRef.current) {
        setActiveMenu(null);
      }
    }, 180);
  };

  const toggleMenu = (menuName: string, ev: React.MouseEvent) => {
    ev.stopPropagation();
    setActiveMenu((prev) => {
      const next = prev === menuName ? null : menuName;
      hoveredMenuRef.current = next;
      return next;
    });
  };

  return (
    <div className={`header-sticky-wrapper ${isScrolled ? "is-scrolled" : ""}`}>
      <header className={`header ${isScrolled ? "is-scrolled" : ""}`}>
        <div className="wrap header__bar">
          <Link href="/" className="brand" aria-label="UElement home" onClick={() => setActiveMenu(null)}>
            <img
              src="/icons/global/UElement_Logo_White%203.svg"
              alt="UElement"
              style={{ height: "24px", width: "auto", display: "block" }}
            />
          </Link>

          <nav className="nav" aria-label="Main">
            {/* Platform Item */}
            <div
              className="nav__item"
              onMouseEnter={() => handleMouseEnter("platform")}
              onMouseLeave={() => handleMouseLeave("platform")}
            >
              <button
                type="button"
                className="nav__trigger"
                aria-expanded={activeMenu === "platform"}
                aria-controls="menu-platform"
                onClick={(e) => toggleMenu("platform", e)}
              >
                Platform{" "}
                <svg className="nav__caret" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M1.5 3.5 5 7l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              <div
                className={`mega mega--platform ${activeMenu === "platform" ? "is-open" : ""}`}
                id="menu-platform"
                hidden={activeMenu !== "platform"}
                onMouseEnter={() => handleMouseEnter("platform")}
                onMouseLeave={() => handleMouseLeave("platform")}
              >
                <div className="platform-head">
                  <span className="eyebrow" style={{ color: "var(--text-3)", fontSize: "0.6875rem", letterSpacing: "0.18em" }}>
                    PLATFORM &amp; PRODUCTS
                  </span>
                </div>

                <div className="platform-body">
                  <div className="platform-tabs" role="tablist" aria-label="Platform categories">
                    <button
                      type="button"
                      className={`platform-tab ${platformTab === "quantum" ? "is-active" : ""}`}
                      role="tab"
                      aria-selected={platformTab === "quantum"}
                      aria-controls="panel-quantum"
                      onClick={() => setPlatformTab("quantum")}
                    >
                      <span>U92 Quantum</span>
                      <svg className="tab__arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M5 2.5l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      className={`platform-tab ${platformTab === "enterprise" ? "is-active" : ""}`}
                      role="tab"
                      aria-selected={platformTab === "enterprise"}
                      aria-controls="panel-enterprise"
                      onClick={() => setPlatformTab("enterprise")}
                    >
                      <span>U92 Enterprise</span>
                      <svg className="tab__arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M5 2.5l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>

                  <div className="platform-panels">
                    {/* Quantum Panel */}
                    <div
                      className="platform-panel"
                      id="panel-quantum"
                      role="tabpanel"
                      hidden={platformTab !== "quantum"}
                    >
                      <div className="platform-featured">
                        <div className="platform-featured__info">
                          <h3 className="platform-featured__title">UElement Quantum</h3>
                          <p className="tiny platform-featured__desc">
                            Sovereign Quantum-safe security: from cryptographic inventory to post-quantum migration and crypto-agility.
                          </p>
                        </div>
                        <Link
                          href="/quantum"
                          className="btn btn--gold btn--sm platform-featured__cta"
                          onClick={() => setActiveMenu(null)}
                        >
                          Explore Quantum{" "}
                          <svg className="arrow" width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      </div>

                      <div className="platform-grid platform-grid--6">
                        <Link href="/quantum/discovery" className="platform-card" onClick={() => setActiveMenu(null)}>
                          <div className="platform-card__meta">
                            <span className="code">Q·01</span>
                            <span className="chip chip--pilot">Early access</span>
                          </div>
                          <h4>Cryptographic Discovery</h4>
                          <p className="tiny">Find every cryptographic lock, key, and certificate you depend on.</p>
                        </Link>

                        <Link href="/quantum/pqc" className="platform-card" onClick={() => setActiveMenu(null)}>
                          <div className="platform-card__meta">
                            <span className="code">Q·02</span>
                            <span className="chip chip--pilot">Proof-of-concept</span>
                          </div>
                          <h4>Post-Quantum Cryptography</h4>
                          <p className="tiny">Migration to NIST post-quantum standards without breaking operations.</p>
                        </Link>

                        <Link href="/quantum/crypto-agility" className="platform-card" onClick={() => setActiveMenu(null)}>
                          <div className="platform-card__meta">
                            <span className="code">Q·03</span>
                            <span className="chip chip--build">In development</span>
                          </div>
                          <h4>Crypto-Agility</h4>
                          <p className="tiny">Axis, Codex and Crucible: algorithm rotation via policy configuration.</p>
                        </Link>

                        <Link href="/quantum/qkd" className="platform-card" onClick={() => setActiveMenu(null)}>
                          <div className="platform-card__meta">
                            <span className="code">Q·04</span>
                            <span className="chip chip--later">Planned 2027</span>
                          </div>
                          <h4>Quantum Key Distribution</h4>
                          <p className="tiny">Physics-based key exchange with validated hardware partners.</p>
                        </Link>

                        <Link href="/quantum/networking" className="platform-card" onClick={() => setActiveMenu(null)}>
                          <div className="platform-card__meta">
                            <span className="code">Q·05</span>
                            <span className="chip chip--later">Research</span>
                          </div>
                          <h4>Quantum Networking</h4>
                          <p className="tiny">Architectural studies for networks carrying entangled quantum states.</p>
                        </Link>

                        <Link href="/quantum/qml" className="platform-card" onClick={() => setActiveMenu(null)}>
                          <div className="platform-card__meta">
                            <span className="code">Q·06</span>
                            <span className="chip chip--later">Research</span>
                          </div>
                          <h4>Quantum Machine Learning</h4>
                          <p className="tiny">Empirical benchmarks testing where quantum models surpass classical AI.</p>
                        </Link>
                      </div>
                    </div>

                    {/* Enterprise Panel */}
                    <div
                      className="platform-panel"
                      id="panel-enterprise"
                      role="tabpanel"
                      hidden={platformTab !== "enterprise"}
                    >
                      <div className="platform-featured">
                        <div className="platform-featured__info">
                          <h3 className="platform-featured__title">MainSTAY</h3>
                          <p className="tiny platform-featured__desc">
                            The line that holds up your digital operations. Run the digital front door of growing companies on one sovereign fabric.
                          </p>
                        </div>
                        <Link
                          href="/mainstay"
                          className="btn btn--gold btn--sm platform-featured__cta"
                          onClick={() => setActiveMenu(null)}
                        >
                          Explore MainSTAY{" "}
                          <svg className="arrow" width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      </div>

                      <div className="platform-grid platform-grid--3">
                        <Link href="/mainstay/nexus" className="platform-card" onClick={() => setActiveMenu(null)}>
                          <div className="platform-card__meta">
                            <span className="code">M·01</span>
                            <span className="chip chip--live">In production</span>
                          </div>
                          <h4>MainSTAY Nexus</h4>
                          <p className="tiny">The Enterprise Digital Fabric: web, portals, auth, workflows &amp; unified audit trail.</p>
                        </Link>

                        <Link href="/mainstay/vizor" className="platform-card" onClick={() => setActiveMenu(null)}>
                          <div className="platform-card__meta">
                            <span className="code">M·02</span>
                            <span className="chip chip--build">Design partners</span>
                          </div>
                          <h4>MainSTAY Vizor</h4>
                          <p className="tiny">Observability, Security &amp; GRC: continuous posture tracking and operational telemetry.</p>
                        </Link>

                        <Link href="/mainstay/kayak" className="platform-card" onClick={() => setActiveMenu(null)}>
                          <div className="platform-card__meta">
                            <span className="code">M·03</span>
                            <span className="chip chip--later">Roadmap</span>
                          </div>
                          <h4>MainSTAY Kayak</h4>
                          <p className="tiny">Everything as a Service: hardware, cloud, power and storage metered on fabric.</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="platform-footer">
                  <div className="platform-footer__links">
                    <a href="/#exposure" className="textlink" style={{ fontSize: "0.8125rem" }} onClick={() => setActiveMenu(null)}>
                      Check your quantum exposure{" "}
                      <svg className="arrow" width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                    <a href="/mainstay/nexus#pricing" className="textlink" style={{ fontSize: "0.8125rem" }} onClick={() => setActiveMenu(null)}>
                      Nexus packages &amp; pricing{" "}
                      <svg className="arrow" width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                  <Link href="/contact" className="btn btn--line btn--sm" onClick={() => setActiveMenu(null)}>
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>

            {/* Solutions Item */}
            <div
              className="nav__item"
              onMouseEnter={() => handleMouseEnter("solutions")}
              onMouseLeave={() => handleMouseLeave("solutions")}
            >
              <button
                type="button"
                className="nav__trigger"
                aria-expanded={activeMenu === "solutions"}
                aria-controls="menu-solutions"
                onClick={(e) => toggleMenu("solutions", e)}
              >
                Solutions{" "}
                <svg className="nav__caret" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M1.5 3.5 5 7l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              <div
                className={`mega mega--solutions ${activeMenu === "solutions" ? "is-open" : ""}`}
                id="menu-solutions"
                hidden={activeMenu !== "solutions"}
                onMouseEnter={() => handleMouseEnter("solutions")}
                onMouseLeave={() => handleMouseLeave("solutions")}
              >
                <div className="platform-head">
                  <span className="eyebrow" style={{ color: "var(--text-3)", fontSize: "0.6875rem", letterSpacing: "0.18em" }}>
                    SOLUTIONS &amp; USE CASES
                  </span>
                </div>

                <div className="platform-body">
                  <div className="platform-tabs" role="tablist" aria-label="Solutions categories">
                    <button
                      type="button"
                      className={`platform-tab ${solutionsTab === "industries" ? "is-active" : ""}`}
                      role="tab"
                      aria-selected={solutionsTab === "industries"}
                      aria-controls="panel-industries"
                      onClick={() => setSolutionsTab("industries")}
                    >
                      <span>For Industries</span>
                      <svg className="tab__arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M5 2.5l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      className={`platform-tab ${solutionsTab === "usecases" ? "is-active" : ""}`}
                      role="tab"
                      aria-selected={solutionsTab === "usecases"}
                      aria-controls="panel-usecases"
                      onClick={() => setSolutionsTab("usecases")}
                    >
                      <span>For Use Cases</span>
                      <svg className="tab__arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M5 2.5l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>

                  <div className="platform-panels">
                    {/* Industries Panel */}
                    <div
                      className="platform-panel"
                      id="panel-industries"
                      role="tabpanel"
                      hidden={solutionsTab !== "industries"}
                    >
                      <div className="platform-featured">
                        <div className="platform-featured__info">
                          <h3 className="platform-featured__title">Solutions for Industries</h3>
                          <p className="tiny platform-featured__desc">
                            Sovereign quantum-safe security and enterprise digital fabric engineered for high-stakes, regulated sectors.
                          </p>
                        </div>
                        <Link
                          href="/industries"
                          className="btn btn--gold btn--sm platform-featured__cta"
                          onClick={() => setActiveMenu(null)}
                        >
                          All Industries{" "}
                          <svg className="arrow" width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      </div>

                      <div className="platform-grid platform-grid--6">
                        <Link href="/industries/banking-financial-services" className="platform-card" onClick={() => setActiveMenu(null)}>
                          <div className="platform-card__meta">
                            <span className="code">SEC·01</span>
                            <span className="chip chip--live">BFSI</span>
                          </div>
                          <h4>Banking and Financial Services</h4>
                          <p className="tiny">Banks, NBFCs and payment operators. Quantum-safe transaction security and CBOM compliance.</p>
                        </Link>

                        <Link href="/industries/insurance" className="platform-card" onClick={() => setActiveMenu(null)}>
                          <div className="platform-card__meta">
                            <span className="code">SEC·02</span>
                            <span className="chip chip--live">Insurance</span>
                          </div>
                          <h4>Insurance</h4>
                          <p className="tiny">Life, health and general insurers. Multi-decade data protection against harvest-now-decrypt-later.</p>
                        </Link>

                        <Link href="/industries/government-critical-infrastructure" className="platform-card" onClick={() => setActiveMenu(null)}>
                          <div className="platform-card__meta">
                            <span className="code">SEC·03</span>
                            <span className="chip chip--live">Critical Infra</span>
                          </div>
                          <h4>Government and Critical Infrastructure</h4>
                          <p className="tiny">Public sector, energy, telecom and defence. Sovereign PQC migration and national readiness.</p>
                        </Link>

                        <Link href="/industries/manufacturing-ot" className="platform-card" onClick={() => setActiveMenu(null)}>
                          <div className="platform-card__meta">
                            <span className="code">SEC·04</span>
                            <span className="chip chip--live">Industrial OT</span>
                          </div>
                          <h4>Manufacturing and Industrial OT</h4>
                          <p className="tiny">Plants, utilities and process industries. SCADA/ICS resilience and long-lifecycle cryptographic agility.</p>
                        </Link>

                        <Link href="/industries/startups-smes" className="platform-card" onClick={() => setActiveMenu(null)}>
                          <div className="platform-card__meta">
                            <span className="code">SEC·05</span>
                            <span className="chip chip--live">Enterprises</span>
                          </div>
                          <h4>Startups and SMEs</h4>
                          <p className="tiny">Growing companies, from first site to many portals. Complete digital front door on MainSTAY fabric.</p>
                        </Link>
                      </div>
                    </div>

                    {/* Use Cases Panel */}
                    <div
                      className="platform-panel"
                      id="panel-usecases"
                      role="tabpanel"
                      hidden={solutionsTab !== "usecases"}
                    >
                      <div className="platform-featured">
                        <div className="platform-featured__info">
                          <h3 className="platform-featured__title">Solutions by Use Case</h3>
                          <p className="tiny platform-featured__desc">
                            Solve quantum cryptographic exposure, automate CBOM, and unify enterprise digital operations.
                          </p>
                        </div>
                        <a
                          href="/#exposure"
                          className="btn btn--gold btn--sm platform-featured__cta"
                          onClick={() => setActiveMenu(null)}
                        >
                          Check Exposure{" "}
                          <svg className="arrow" width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      </div>

                      <div className="platform-grid platform-grid--6">
                        <Link href="/insights/harvest-now-decrypt-later" className="platform-card" onClick={() => setActiveMenu(null)}>
                          <div className="platform-card__meta">
                            <span className="code">UC·01</span>
                            <span className="chip chip--pilot">Threat Protection</span>
                          </div>
                          <h4>Harvest Now, Decrypt Later</h4>
                          <p className="tiny">Protect sensitive customer data recorded today from being decrypted by future quantum computers.</p>
                        </Link>

                        <Link href="/quantum/discovery" className="platform-card" onClick={() => setActiveMenu(null)}>
                          <div className="platform-card__meta">
                            <span className="code">UC·02</span>
                            <span className="chip chip--pilot">Discovery</span>
                          </div>
                          <h4>Cryptographic Inventory &amp; CBOM</h4>
                          <p className="tiny">Automated discovery of all cryptographic algorithms, keys, certificates, and protocols.</p>
                        </Link>

                        <Link href="/quantum/pqc" className="platform-card" onClick={() => setActiveMenu(null)}>
                          <div className="platform-card__meta">
                            <span className="code">UC·03</span>
                            <span className="chip chip--pilot">Migration</span>
                          </div>
                          <h4>Post-Quantum Cryptography</h4>
                          <p className="tiny">Dual-track hybrid ML-KEM and ML-DSA deployment compliant with NIST standards.</p>
                        </Link>

                        <Link href="/mainstay/nexus" className="platform-card" onClick={() => setActiveMenu(null)}>
                          <div className="platform-card__meta">
                            <span className="code">UC·04</span>
                            <span className="chip chip--live">Digital Fabric</span>
                          </div>
                          <h4>Enterprise Operations Fabric</h4>
                          <p className="tiny">Consolidate portals, auth, CMS, and workflows into a single sovereign infrastructure.</p>
                        </Link>

                        <Link href="/mainstay/vizor" className="platform-card" onClick={() => setActiveMenu(null)}>
                          <div className="platform-card__meta">
                            <span className="code">UC·05</span>
                            <span className="chip chip--build">Posture &amp; GRC</span>
                          </div>
                          <h4>Observability &amp; Continuous GRC</h4>
                          <p className="tiny">Continuous security posture tracking, operational telemetry, and audit-ready governance.</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="platform-footer">
                  <div className="platform-footer__links">
                    <Link href="/insights/india-pqc-deadlines" className="textlink" style={{ fontSize: "0.8125rem" }} onClick={() => setActiveMenu(null)}>
                      India PQC deadlines tracker{" "}
                      <svg className="arrow" width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                    <a href="/#exposure" className="textlink" style={{ fontSize: "0.8125rem" }} onClick={() => setActiveMenu(null)}>
                      Check your quantum exposure{" "}
                      <svg className="arrow" width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                  <Link href="/industries" className="btn btn--line btn--sm" onClick={() => setActiveMenu(null)}>
                    All Solutions
                  </Link>
                </div>
              </div>
            </div>

            {/* Insights Link */}
            <Link href="/insights" className="nav__link" onClick={() => setActiveMenu(null)}>
              Insights
            </Link>

            {/* Company Item */}
            <div
              className="nav__item"
              onMouseEnter={() => handleMouseEnter("company")}
              onMouseLeave={() => handleMouseLeave("company")}
            >
              <button
                type="button"
                className="nav__trigger"
                aria-expanded={activeMenu === "company"}
                aria-controls="menu-company"
                onClick={(e) => toggleMenu("company", e)}
              >
                Company{" "}
                <svg className="nav__caret" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M1.5 3.5 5 7l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              <div
                className={`mega ${activeMenu === "company" ? "is-open" : ""}`}
                id="menu-company"
                hidden={activeMenu !== "company"}
                style={{
                  left: "auto",
                  right: "0px",
                  width: "min(520px, calc(100vw - 32px))",
                  gridTemplateColumns: "1fr",
                }}
                onMouseEnter={() => handleMouseEnter("company")}
                onMouseLeave={() => handleMouseLeave("company")}
              >
                <ul className="mega__list">
                  <li>
                    <Link href="/company" className="mega__link" onClick={() => setActiveMenu(null)}>
                      <span className="h-card">About UElement</span>
                      <span></span>
                      <span className="tiny">Why we exist and how we work</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/company/team" className="mega__link" onClick={() => setActiveMenu(null)}>
                      <span className="h-card">Team</span>
                      <span></span>
                      <span className="tiny">The people accountable for the work</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/company/trust" className="mega__link" onClick={() => setActiveMenu(null)}>
                      <span className="h-card">Trust and security</span>
                      <span></span>
                      <span className="tiny">How we label, disclose and handle data</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/company/partners" className="mega__link" onClick={() => setActiveMenu(null)}>
                      <span className="h-card">Partners</span>
                      <span></span>
                      <span className="tiny">Who we work with, and on what</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/company/careers" className="mega__link" onClick={() => setActiveMenu(null)}>
                      <span className="h-card">Careers</span>
                      <span></span>
                      <span className="tiny">Open roles in Pune</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="header__cta">
            <Link href="/contact" className="btn btn--line btn--sm" onClick={() => setActiveMenu(null)}>
              Contact
            </Link>
            <button
              type="button"
              className="menu-btn"
              aria-expanded={isDrawerOpen}
              aria-controls="drawer"
              aria-label={isDrawerOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsDrawerOpen((prev) => !prev)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Backdrop for dropdowns and mobile drawer */}
        <div
          className={`nav-backdrop ${activeMenu || isDrawerOpen ? "is-open" : ""}`}
          id="nav-backdrop"
          hidden={!activeMenu && !isDrawerOpen}
          onClick={() => {
            setActiveMenu(null);
            setIsDrawerOpen(false);
          }}
        />

        {/* Mobile Drawer */}
        <div className="drawer" id="drawer" hidden={!isDrawerOpen}>
          <div className="drawer__group">
            <p className="eyebrow" style={{ color: "var(--gold-on-navy)" }}>Platform</p>
            <div style={{ paddingLeft: "8px" }}>
              <p className="eyebrow" style={{ marginTop: "10px", fontSize: "0.6875rem" }}>U92 Quantum</p>
              <Link href="/quantum" onClick={() => setIsDrawerOpen(false)}>Overview</Link>
              <Link href="/quantum/discovery" onClick={() => setIsDrawerOpen(false)}>
                <span>Cryptographic Discovery</span>
                <span className="chip chip--pilot">Early access</span>
              </Link>
              <Link href="/quantum/pqc" onClick={() => setIsDrawerOpen(false)}>
                <span>Post-Quantum Cryptography</span>
                <span className="chip chip--pilot">Proof-of-concept</span>
              </Link>
              <Link href="/quantum/crypto-agility" onClick={() => setIsDrawerOpen(false)}>
                <span>Crypto-Agility</span>
                <span className="chip chip--build">In development</span>
              </Link>
              <Link href="/quantum/qkd" onClick={() => setIsDrawerOpen(false)}>
                <span>Quantum Key Distribution</span>
                <span className="chip chip--later">Planned 2027</span>
              </Link>
              <Link href="/quantum/networking" onClick={() => setIsDrawerOpen(false)}>
                <span>Quantum Networking</span>
                <span className="chip chip--later">Research</span>
              </Link>
              <Link href="/quantum/qml" onClick={() => setIsDrawerOpen(false)}>
                <span>Quantum Machine Learning</span>
                <span className="chip chip--later">Research</span>
              </Link>

              <p className="eyebrow" style={{ marginTop: "16px", fontSize: "0.6875rem" }}>U92 Enterprise</p>
              <Link href="/mainstay" onClick={() => setIsDrawerOpen(false)}>Overview</Link>
              <Link href="/mainstay/nexus" onClick={() => setIsDrawerOpen(false)}>
                <span>MainSTAY Nexus</span>
                <span className="chip chip--live">In production</span>
              </Link>
              <Link href="/mainstay/vizor" onClick={() => setIsDrawerOpen(false)}>
                <span>MainSTAY Vizor</span>
                <span className="chip chip--build">Design partners</span>
              </Link>
              <Link href="/mainstay/kayak" onClick={() => setIsDrawerOpen(false)}>
                <span>MainSTAY Kayak</span>
                <span className="chip chip--later">Roadmap</span>
              </Link>
            </div>
          </div>

          <div className="drawer__group">
            <p className="eyebrow" style={{ color: "var(--gold-on-navy)" }}>Solutions</p>
            <div style={{ paddingLeft: "8px" }}>
              <Link href="/industries" onClick={() => setIsDrawerOpen(false)}>
                <span>All Solutions &amp; Industries</span>
              </Link>
              <Link href="/industries/banking-financial-services" onClick={() => setIsDrawerOpen(false)}>
                <span>Banking and Financial Services</span>
              </Link>
              <Link href="/industries/insurance" onClick={() => setIsDrawerOpen(false)}>
                <span>Insurance</span>
              </Link>
              <Link href="/industries/government-critical-infrastructure" onClick={() => setIsDrawerOpen(false)}>
                <span>Government and Critical Infrastructure</span>
              </Link>
              <Link href="/industries/manufacturing-ot" onClick={() => setIsDrawerOpen(false)}>
                <span>Manufacturing and Industrial OT</span>
              </Link>
              <Link href="/industries/startups-smes" onClick={() => setIsDrawerOpen(false)}>
                <span>Startups and SMEs</span>
              </Link>
            </div>
          </div>

          <div className="drawer__group">
            <Link href="/insights" onClick={() => setIsDrawerOpen(false)}>Insights</Link>
            <Link href="/company" onClick={() => setIsDrawerOpen(false)}>About UElement</Link>
            <Link href="/company/team" onClick={() => setIsDrawerOpen(false)}>Team</Link>
            <Link href="/company/trust" onClick={() => setIsDrawerOpen(false)}>Trust and security</Link>
            <Link href="/company/partners" onClick={() => setIsDrawerOpen(false)}>Partners</Link>
            <Link href="/company/careers" onClick={() => setIsDrawerOpen(false)}>Careers</Link>
            <Link href="/faq" onClick={() => setIsDrawerOpen(false)}>Questions and answers</Link>
            <Link href="/contact" onClick={() => setIsDrawerOpen(false)}>Contact</Link>
          </div>

          <Link href="/contact" className="btn btn--line mt-3" style={{ width: "100%" }} onClick={() => setIsDrawerOpen(false)}>
            Contact Us
          </Link>
        </div>
      </header>
    </div>
  );
}
