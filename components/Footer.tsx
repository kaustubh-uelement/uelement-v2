import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div className="stack gap-3">
            <Link href="/" className="brand" aria-label="UElement home">
              <img
                src="/icons/global/UElement_Logo_White%203.svg"
                alt="UElement"
                style={{ height: "32px", width: "auto", display: "block" }}
              />
            </Link>
            <p className="small" style={{ maxWidth: "34ch" }}>
              Sovereign DeepTech for the systems that cannot fail.
            </p>
            <address className="small" style={{ fontStyle: "normal" }}>
              UElement Technologies Private Limited
              <br />
              Wakad, Pune, Maharashtra 411057, India
              <br />
              <span className="mono">+91 76206 90561</span> ·{" "}
              <span className="mono">contact@uelement.co</span>
            </address>
            <div className="row" style={{ gap: "16px", marginTop: "2px" }}>
              <Link href="/legal/privacy" className="tiny" style={{ color: "var(--text-3)" }}>
                Privacy
              </Link>
              <Link href="/legal/terms" className="tiny" style={{ color: "var(--text-3)" }}>
                Terms
              </Link>
            </div>
          </div>
          <div>
            <h2>UElement Quantum</h2>
            <ul>
              <li>
                <Link href="/quantum">Overview</Link>
              </li>
              <li>
                <Link href="/quantum/discovery">Cryptographic Discovery</Link>
              </li>
              <li>
                <Link href="/quantum/pqc">Post-Quantum Cryptography</Link>
              </li>
              <li>
                <Link href="/quantum/crypto-agility">Crypto-Agility</Link>
              </li>
              <li>
                <Link href="/quantum/qkd">Quantum Key Distribution</Link>
              </li>
              <li>
                <Link href="/quantum/networking">Quantum Networking</Link>
              </li>
              <li>
                <Link href="/quantum/qml">Quantum Machine Learning</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>MainSTAY</h2>
            <ul>
              <li>
                <Link href="/mainstay">Overview</Link>
              </li>
              <li>
                <Link href="/mainstay/nexus">Nexus</Link>
              </li>
              <li>
                <Link href="/mainstay/vizor">Vizor</Link>
              </li>
              <li>
                <Link href="/mainstay/kayak">Kayak</Link>
              </li>
              <li>
                <Link href="/mainstay/nexus#pricing">Nexus pricing</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>Industries</h2>
            <ul>
              <li>
                <Link href="/industries/banking-financial-services">
                  Banking and financial services
                </Link>
              </li>
              <li>
                <Link href="/industries/insurance">Insurance</Link>
              </li>
              <li>
                <Link href="/industries/government-critical-infrastructure">
                  Government and critical infrastructure
                </Link>
              </li>
              <li>
                <Link href="/industries/manufacturing-ot">
                  Manufacturing and industrial OT
                </Link>
              </li>
              <li>
                <Link href="/industries/startups-smes">Startups and SMEs</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>Company</h2>
            <ul>
              <li>
                <Link href="/company">About</Link>
              </li>
              <li>
                <Link href="/company/team">Team</Link>
              </li>
              <li>
                <Link href="/company/trust">Trust and security</Link>
              </li>
              <li>
                <Link href="/company/partners">Partners</Link>
              </li>
              <li>
                <Link href="/company/careers">Careers</Link>
              </li>
              <li>
                <Link href="/insights">Insights</Link>
              </li>
              <li>
                <Link href="/faq">Questions and answers</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__base">
          <p className="tiny mono">
            © 2026 UElement Technologies Private Limited · CIN U63990PN2026PTC251047 · GSTIN 27AAECU0576G1Z9
          </p>
          <div className="row" style={{ gap: "20px", alignItems: "center" }}>
            <a
              href="https://www.linkedin.com/company/uelement-technologies/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social"
              aria-label="LinkedIn"
              title="LinkedIn"
              style={{ display: "inline-flex", alignItems: "center", color: "#B4BED0", transition: "color 0.2s" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
              </svg>
            </a>
            <a
              href="https://github.com/UElement"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social"
              aria-label="GitHub"
              title="GitHub"
              style={{ display: "inline-flex", alignItems: "center", color: "#B4BED0", transition: "color 0.2s" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </a>
            <a
              href="https://x.com/uelement_tech"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social"
              aria-label="X"
              title="X"
              style={{ display: "inline-flex", alignItems: "center", color: "#B4BED0", transition: "color 0.2s" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <span
              className="deva"
              style={{ color: "var(--accent)" }}
              lang="hi"
              title="Empowered · Capable · Secure"
            >
              सशक्त · सक्षम · सुरक्षित
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
