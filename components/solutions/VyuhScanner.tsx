'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Shield,
  FileCode,
  Download,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Globe,
  GitBranch,
  X,
  Check,
} from 'lucide-react';

/* ── Types ── */
type ScanType = 'url' | 'repo';
type RiskVerdict = 'broken' | 'weak' | 'safe';

interface Finding {
  sev: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  detail: string;
  fix: string;
  std: string;
}

interface CBOMItem {
  asset: string;
  primitive: string;
  purpose: string;
  verdict: RiskVerdict;
  replacement: string;
}

interface ScanPlan {
  phase: string;
  title: string;
  desc: string;
}

interface ScanResults {
  target: string;
  type: ScanType;
  when: Date;
  score: number;
  band: string;
  retention: number;
  stats: {
    total: number;
    broken: number;
    weak: number;
    safe: number;
  };
  cbom: CBOMItem[];
  findings: Finding[];
  detail: [string, string][];
  plan: ScanPlan[];
  raw?: any;
}

const FREE_EMAIL_DOMAINS = [
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'yahoo.co.in',
  'hotmail.com',
  'outlook.com',
  'live.com',
  'icloud.com',
  'aol.com',
  'proton.me',
  'protonmail.com',
  'rediffmail.com',
  'mail.com',
  'yandex.com',
  'gmx.com',
  'zoho.com',
];

const SCAN_STAGES: Record<ScanType, string[]> = {
  url: [
    'Resolving target and discovering hosts',
    'Negotiating TLS 1.3 and TLS 1.2 handshakes',
    'Enumerating accepted cipher suites and key exchange groups',
    'Parsing the certificate chain to the root authority',
    'Checking for hybrid post-quantum groups (X25519MLKEM768)',
    'Classifying primitives against NIST FIPS 203, 204 and 205',
    'Assembling CycloneDX 1.6 Cryptographic BOM',
    'Calculating quantum readiness & HNDL exposure score',
  ],
  repo: [
    'Cloning source tree and parsing package manifests',
    'Indexing cryptographic calls and primitive invocations',
    'Resolving library and dependency versions (OpenSSL, BouncyCastle)',
    'Scanning for hardcoded keys, tokens, and PEM certificates',
    'Inspecting entropy sources and legacy digest invocations',
    'Classifying primitives against NIST FIPS 203, 204 and 205',
    'Assembling CycloneDX 1.6 Cryptographic BOM',
    'Calculating quantum readiness & HNDL exposure score',
  ],
};

function pseudoRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function stringToSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export default function VyuhScanner() {
  // Hero simulation state
  const [heroLinesVisible, setHeroLinesVisible] = useState<number>(0);
  const [heroScoreValue, setHeroScoreValue] = useState<number>(0);

  // Modal & scanning state
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<number>(1);
  const [scanType, setScanType] = useState<ScanType>('url');
  const [activeTab, setActiveTab] = useState<'cbom' | 'findings' | 'plan' | 'detail'>('cbom');

  // Step 1: Profile form state
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    company: '',
    email: '',
    countryCode: '+91',
    phone: '',
    linkedin: '',
    purpose: 'Preparing a post-quantum migration plan',
    consent: false,
  });
  const [errors1, setErrors1] = useState<Record<string, string>>({});

  // Step 2: 2FA OTP state
  const [demoCodes, setDemoCodes] = useState({ email: '', phone: '' });
  const [otpInputs, setOtpInputs] = useState({ email: '', phone: '' });
  const [verified, setVerified] = useState({ email: false, phone: false });
  const [otpErrors, setOtpErrors] = useState({ email: false, phone: false });
  const [resendTimers, setResendTimers] = useState({ email: 0, phone: 0 });

  // Step 3: Target state
  const [targetConfig, setTargetConfig] = useState({
    target: '',
    depth: 'standard',
    retention: 12,
    authorized: false,
  });
  const [targetError, setTargetError] = useState<string | null>(null);

  // Step 4: Live scan progress
  const [scanStageIndex, setScanStageIndex] = useState<number>(0);
  const [results, setResults] = useState<ScanResults | null>(null);
  const [resScoreDisplay, setResScoreDisplay] = useState<number>(0);

  // FAQ open states
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Footer notification flash
  const [footerMsg, setFooterMsg] = useState<{ text: string; isError: boolean } | null>(null);

  // Dynamically load jsPDF on client
  useEffect(() => {
    if (typeof window !== 'undefined' && !(window as any).jspdf) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Hero simulation effect
  useEffect(() => {
    const totalLines = 8;
    const interval = setInterval(() => {
      setHeroLinesVisible((prev) => {
        if (prev < totalLines) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 280);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (heroLinesVisible >= 8) {
      let current = 0;
      const targetScore = 41;
      const scoreTimer = setInterval(() => {
        current += 2;
        if (current >= targetScore) {
          setHeroScoreValue(targetScore);
          clearInterval(scoreTimer);
        } else {
          setHeroScoreValue(current);
        }
      }, 35);
      return () => clearInterval(scoreTimer);
    }
  }, [heroLinesVisible]);

  // Modal score animation on complete
  useEffect(() => {
    if (step === 5 && results) {
      let current = 0;
      const target = results.score;
      const timer = setInterval(() => {
        current += Math.max(1, Math.round(target / 25));
        if (current >= target) {
          setResScoreDisplay(target);
          clearInterval(timer);
        } else {
          setResScoreDisplay(current);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [step, results]);

  // OTP resend timers countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimers((prev) => ({
        email: prev.email > 0 ? prev.email - 1 : 0,
        phone: prev.phone > 0 ? prev.phone - 1 : 0,
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') handleCloseModal();
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen]);

  const triggerFooterMessage = (msg: string, isError: boolean = false) => {
    setFooterMsg({ text: msg, isError });
    setTimeout(() => {
      setFooterMsg(null);
    }, 3200);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
    setScanType('url');
    setStep(3);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  /* ── Validation for Step 1 ── */
  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!profile.name.trim()) errs.name = 'Please enter your full name.';
    if (!profile.title.trim()) errs.title = 'Please enter your job title.';
    if (!profile.company.trim()) errs.company = 'Please enter your organisation name.';

    const emailTrim = profile.email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
    if (!emailRegex.test(emailTrim)) {
      errs.email = 'Please enter a valid work email address.';
    } else {
      const domain = emailTrim.split('@')[1];
      if (FREE_EMAIL_DOMAINS.includes(domain)) {
        errs.email = 'Free mailbox providers are not accepted. Please use your corporate email.';
      }
    }

    const cleanedPhone = profile.phone.replace(/\D/g, '');
    if (cleanedPhone.length < 7 || cleanedPhone.length > 13) {
      errs.phone = 'Please enter a valid mobile number (7–13 digits).';
    }

    const liTrim = profile.linkedin.trim().toLowerCase();
    if (!/linkedin\.com\/(in|pub)\/[a-z0-9\-_%]{3,}/i.test(liTrim)) {
      errs.linkedin = 'Enter a valid LinkedIn profile URL (e.g. linkedin.com/in/handle).';
    }

    if (!profile.consent) {
      errs.consent = 'Please confirm consent to proceed.';
    }

    setErrors1(errs);
    return Object.keys(errs).length === 0;
  };

  const generateCodes = () => {
    const emailCode = String(Math.floor(100000 + Math.random() * 900000));
    const phoneCode = String(Math.floor(100000 + Math.random() * 900000));
    setDemoCodes({ email: emailCode, phone: phoneCode });
    setVerified({ email: false, phone: false });
    setOtpInputs({ email: '', phone: '' });
    setOtpErrors({ email: false, phone: false });
  };

  const handleProceedFromStep1 = () => {
    if (validateStep1()) {
      generateCodes();
      setStep(2);
    } else {
      triggerFooterMessage('Please complete all required fields correctly.', true);
    }
  };

  const handleVerifyOtp = (type: 'email' | 'phone') => {
    if (otpInputs[type].trim() === demoCodes[type]) {
      setVerified((prev) => ({ ...prev, [type]: true }));
      setOtpErrors((prev) => ({ ...prev, [type]: false }));
    } else {
      setOtpErrors((prev) => ({ ...prev, [type]: true }));
    }
  };

  const handleResendCode = (type: 'email' | 'phone') => {
    const newCode = String(Math.floor(100000 + Math.random() * 900000));
    setDemoCodes((prev) => ({ ...prev, [type]: newCode }));
    setResendTimers((prev) => ({ ...prev, [type]: 30 }));
    setOtpErrors((prev) => ({ ...prev, [type]: false }));
    setOtpInputs((prev) => ({ ...prev, [type]: '' }));
  };

  const handleProceedFromStep2 = () => {
    if (verified.email && verified.phone) {
      setStep(3);
    } else {
      triggerFooterMessage('Both email and SMS verification codes must be confirmed.', true);
    }
  };

  /* ── Step 3 Validation ── */
  const validateStep3 = () => {
    const val = targetConfig.target.trim();
    if (!val) {
      setTargetError('Please provide a target endpoint or repository URL.');
      return false;
    }
    if (scanType === 'repo') {
      const isRepo = /^https?:\/\/(www\.)?(github\.com|gitlab\.com|bitbucket\.org|dev\.azure\.com)\/[\w.\-]+\/[\w.\-]+/i.test(val);
      if (!isRepo) {
        setTargetError('Enter a valid GitHub, GitLab, Bitbucket, or Azure DevOps repository URL.');
        return false;
      }
    } else {
      const clean = val.replace(/^https?:\/\//i, '').split('/')[0].split(':')[0];
      const isDomain = /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/i.test(clean);
      if (!isDomain) {
        setTargetError('Enter a valid domain name or HTTPS URL (e.g. cloudflare.com or https://service.yourorg.com).');
        return false;
      }
    }

    if (!targetConfig.authorized) {
      setTargetError('You must confirm authorization to inspect this target.');
      return false;
    }

    setTargetError(null);
    return true;
  };

  const executeScan = async (target: string) => {
    setStep(4);
    setScanStageIndex(0);
    const stages = SCAN_STAGES[scanType];
    let idx = 0;

    const stageInterval = setInterval(() => {
      idx++;
      if (idx < stages.length - 1) {
        setScanStageIndex(idx);
      }
    }, 700);

    if (scanType === 'url') {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_SCANNER_API_URL || 'http://localhost:8080';
        const res = await fetch(`${apiUrl}/api/scan`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            target,
            type: scanType,
            depth: targetConfig.depth,
            retention: targetConfig.retention,
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Scan service responded with status ${res.status}`);
        }

        const scanData = await res.json();
        clearInterval(stageInterval);
        setScanStageIndex(stages.length - 1);

        const formattedResults: ScanResults = {
          ...scanData,
          when: new Date(scanData.when || Date.now()),
          raw: scanData.raw,
        };

        setTimeout(() => {
          setResults(formattedResults);
          setStep(5);
        }, 500);
      } catch (err: any) {
        clearInterval(stageInterval);
        console.error('PQC Scan error:', err);
        setStep(3);
        const isNetworkErr = err?.message === 'Failed to fetch' || err?.name === 'TypeError';
        const userMsg = isNetworkErr
          ? 'Unable to connect to the Vyuh Scanner backend service (http://localhost:8080). Please ensure the scanner microservice is running or deployed.'
          : (err?.message || 'Diagnostic scan failed. Please check the target and try again.');
        setTargetError(userMsg);
        triggerFooterMessage(userMsg, true);
      }
    } else {
      const mockInterval = setInterval(() => {
        idx++;
        if (idx < stages.length) {
          setScanStageIndex(idx);
        } else {
          clearInterval(mockInterval);
          clearInterval(stageInterval);
          const scanRes = generateScanResults(target, scanType, targetConfig.depth, targetConfig.retention);
          setResults(scanRes);
          setStep(5);
        }
      }, 550);
    }
  };

  const handleStartScan = () => {
    if (validateStep3()) {
      let t = targetConfig.target.trim();
      if (scanType === 'url' && !/^https?:\/\//i.test(t)) {
        t = `https://${t}`;
        setTargetConfig((prev) => ({ ...prev, target: t }));
      }
      executeScan(t);
    }
  };

  /* ── Result Generator Function ── */
  const generateScanResults = (
    target: string,
    type: ScanType,
    depth: string,
    retention: number
  ): ScanResults => {
    const rng = pseudoRandom(stringToSeed(target + type));
    const depthMultiplier = depth === 'deep' ? 1.7 : depth === 'single' ? 0.6 : 1.0;

    const webAssets: CBOMItem[] = [
      { asset: 'Edge Certificate', primitive: 'RSA-2048 / SHA-256', purpose: 'Server Authentication', verdict: 'broken', replacement: 'ML-DSA-65 (NIST FIPS 204)' },
      { asset: 'TLS Key Exchange', primitive: 'ECDHE secp256r1', purpose: 'Session Key Establishment', verdict: 'broken', replacement: 'X25519MLKEM768 Hybrid' },
      { asset: 'Intermediate CA', primitive: 'RSA-4096 / SHA-256', purpose: 'Chain of Trust Validation', verdict: 'broken', replacement: 'ML-DSA-87 Chain' },
      { asset: 'Bulk Transport Cipher', primitive: 'AES-128-GCM', purpose: 'Payload Confidentiality', verdict: 'weak', replacement: 'AES-256-GCM' },
      { asset: 'Handshake Transcript', primitive: 'SHA-256', purpose: 'Integrity Verification', verdict: 'weak', replacement: 'SHA-384' },
      { asset: 'Session Tickets', primitive: 'AES-256-GCM', purpose: 'Resumption State Sealing', verdict: 'safe', replacement: 'Maintained (Compliant)' },
      { asset: 'OCSP Responder Token', primitive: 'ECDSA P-256', purpose: 'Revocation Attestation', verdict: 'broken', replacement: 'ML-DSA-44' },
      { asset: 'API Gateway mTLS', primitive: 'ECDSA P-384', purpose: 'Zero-Trust Client Identity', verdict: 'broken', replacement: 'ML-DSA-65' },
      { asset: 'JWT Authentication', primitive: 'RS256 (RSA-2048)', purpose: 'Claims Integrity & Bearer', verdict: 'broken', replacement: 'ML-DSA-44' },
      { asset: 'State Cookie Token', primitive: 'AES-256-GCM', purpose: 'Cookie Encryption', verdict: 'safe', replacement: 'Maintained (Compliant)' },
      { asset: 'Legacy Fallback Listener', primitive: 'TLS 1.0 / 3DES', purpose: 'Compatibility Fallback', verdict: 'broken', replacement: 'Disable listener, enforce TLS 1.3' },
      { asset: 'Static Asset Signature', primitive: 'SHA-384', purpose: 'Content Integrity (SRI)', verdict: 'safe', replacement: 'Maintained (Compliant)' },
    ];

    const repoAssets: CBOMItem[] = [
      { asset: 'crypto/tls configuration', primitive: 'RSA-2048 Keypair', purpose: 'Service Mutual TLS', verdict: 'broken', replacement: 'ML-DSA-65 (NIST FIPS 204)' },
      { asset: 'auth/jwt_issuer.go', primitive: 'ES256 (ECDSA P-256)', purpose: 'Service Token Signing', verdict: 'broken', replacement: 'ML-DSA-44' },
      { asset: 'requirements.txt', primitive: 'pycryptodome 3.19', purpose: 'Core Crypto Provider', verdict: 'weak', replacement: 'PQC-capable library release' },
      { asset: 'pom.xml', primitive: 'BouncyCastle 1.70', purpose: 'JVM Security Provider', verdict: 'weak', replacement: 'BouncyCastle 1.78+ (FIPS 203)' },
      { asset: 'payments/transit.java', primitive: 'RSA-OAEP-2048', purpose: 'Cardholder Encryption', verdict: 'broken', replacement: 'ML-KEM-768 (NIST FIPS 203)' },
      { asset: 'vault/secrets.py', primitive: 'AES-256-GCM', purpose: 'At-Rest Secret Envelope', verdict: 'safe', replacement: 'Maintained (Compliant)' },
      { asset: 'legacy/hash_util.js', primitive: 'SHA-1 / MD5', purpose: 'Internal Checksums & HMAC', verdict: 'broken', replacement: 'SHA-384' },
      { asset: 'infra/tls_policy.tf', primitive: 'ECDHE-RSA Cipher Suite', purpose: 'Terraform Ingress Rule', verdict: 'broken', replacement: 'Enforce Hybrid PQC Profile' },
      { asset: 'certs/dev_service.pem', primitive: 'Committed RSA Private Key', purpose: 'Hardcoded Material', verdict: 'broken', replacement: 'Immediate revocation & HSM' },
      { asset: 'utils/entropy.ts', primitive: 'Math.random() Pseudorandom', purpose: 'Non-cryptographic PRNG', verdict: 'broken', replacement: 'crypto.getRandomValues()' },
      { asset: 'release/signing.sh', primitive: 'GPG RSA-4096', purpose: 'Artifact Release Signing', verdict: 'broken', replacement: 'SLH-DSA (NIST FIPS 205)' },
      { asset: 'cache/session.go', primitive: 'AES-256-GCM', purpose: 'Distributed Cache Seal', verdict: 'safe', replacement: 'Maintained (Compliant)' },
    ];

    const sourcePool = type === 'repo' ? repoAssets : webAssets;
    const sampleSize = Math.max(7, Math.min(sourcePool.length, Math.round(8 + rng() * 4)));
    const sampleCbom = sourcePool.slice(0, sampleSize);

    const extraAssets = Math.round((type === 'repo' ? 10 : 15) * depthMultiplier) + Math.floor(rng() * 7);
    const weakCount = sampleCbom.filter((i) => i.verdict === 'weak').length;
    const safeCount = sampleCbom.filter((i) => i.verdict === 'safe').length;

    const totalAssets = sampleCbom.length + extraAssets;
    const safeTotal = safeCount + Math.round(extraAssets * 0.44);
    const weakTotal = weakCount + Math.round(extraAssets * 0.22);
    const brokenTotal = Math.max(1, totalAssets - safeTotal - weakTotal);

    let scoreCalc = Math.round((100 * (safeTotal + weakTotal * 0.5)) / totalAssets);
    if (retention >= 12) scoreCalc -= 6;
    if (retention >= 20) scoreCalc -= 6;
    const finalScore = Math.max(14, Math.min(91, scoreCalc));

    const band =
      finalScore < 35
        ? 'Critical Harvest-Now Exposure'
        : finalScore < 55
          ? 'High Quantum Exposure'
          : finalScore < 72
            ? 'Partially Prepared'
            : 'Substantially Prepared';

    const findings: Finding[] = [
      {
        sev: 'critical',
        title: "Key establishment broken by Shor's algorithm",
        detail:
          type === 'repo'
            ? 'Asymmetric key agreement routines rely on standard RSA-2048 and ECDHE primitives without hybrid PQC fallback in codebase dependencies.'
            : 'The endpoint negotiates classical ECDHE curves with zero post-quantum hybrid groups (X25519MLKEM768), making recorded sessions fully decryptable by Shor.',
        fix: 'Deploy X25519MLKEM768 hybrid key establishment on all primary ingress listeners.',
        std: 'NIST FIPS 203',
      },
      {
        sev: 'critical',
        title: `Harvest-Now-Decrypt-Later (HNDL) exposure over ${retention}-year data horizon`,
        detail: `Ciphertext intercepted today remains sensitive for ${retention} years. An adversary archiving this traffic can retroactively recover plaintext when CRQC systems become operational.`,
        fix: 'Prioritise hybrid key encapsulation on external endpoints carrying long-lived data.',
        std: 'NIST SP 1800-38',
      },
      {
        sev: 'high',
        title: 'Digital signatures & trust chains anchored to classical primitives',
        detail:
          'Identity certificates, release artifacts, and tokens trace to RSA and ECDSA roots. Replacing trust anchors requires comprehensive PKI coordination.',
        fix: 'Architect an ML-DSA-65 migration timeline for online services and SLH-DSA for archival firmware.',
        std: 'NIST FIPS 204 / 205',
      },
    ];

    if (weakTotal > 0) {
      findings.push({
        sev: 'medium',
        title: "Symmetric security margins halved by Grover's algorithm",
        detail:
          '128-bit symmetric block ciphers and 256-bit hashes suffer effective security reductions to ~64-bits and ~128-bits under Grover quantum search.',
        fix: 'Standardize on AES-256-GCM and SHA-384 across databases, caches, and transport.',
        std: 'CNSA 2.0',
      });
    }

    if (type === 'repo') {
      findings.push({
        sev: 'critical',
        title: 'Committed private key material located in source tree',
        detail: 'Unencrypted PEM private keys and development keystores were identified in repository history.',
        fix: 'Purge historical commits, revoke affected credentials, and integrate with hardware security modules.',
        std: 'Immediate Action',
      });
    } else {
      findings.push({
        sev: 'medium',
        title: 'Legacy fallback listener permits protocol downgrade',
        detail: 'TLS 1.0/1.1 or deprecated cipher suites remain active on at least one secondary virtual host.',
        fix: 'Enforce strict TLS 1.3 / 1.2 suite allowlists and terminate legacy fallback paths.',
        std: 'RBI Cyber Resilience',
      });
    }

    findings.push({
      sev: 'low',
      title: 'Absence of continuous Cryptographic Bill of Materials (CBOM)',
      detail: 'No automated mechanism records and validates cryptographic asset lifecycles across builds.',
      fix: 'Embed CycloneDX 1.6 CBOM generation directly into continuous deployment pipelines.',
      std: 'CycloneDX 1.6 / OWASP',
    });

    const detail: [string, string][] =
      type === 'repo'
        ? [
            ['Default Branch Inspected', 'main / master'],
            ['Files Scanned & Indexed', String(1280 + Math.floor(rng() * 3200))],
            ['Detected Tech Stacks', 'Java, Go, Python, TypeScript, Docker'],
            ['Cryptographic Libraries Identified', String(4 + Math.floor(rng() * 5))],
            ['Dependency Manifests', 'pom.xml, go.mod, requirements.txt, package-lock.json'],
            ['Committed Key Material', '1 PEM Private Key, 2 X.509 Certificates'],
            ['Scan Scope Depth', depth === 'deep' ? 'Comprehensive (all branches)' : 'Standard'],
            ['CBOM Spec Version', 'CycloneDX 1.6 CBOM Schema'],
          ]
        : [
            ['Protocols Negotiated', 'TLS 1.3 (Primary), TLS 1.2 (Supported)'],
            ['Cipher Suites Offered', String(11 + Math.floor(rng() * 6))],
            ['Hybrid Post-Quantum Groups', 'Not Offered (Classical curves only)'],
            ['Server Certificate Signature', 'SHA-256 with RSA Encryption'],
            ['Public Key Modulus', '2048-bit RSA'],
            ['Certificate Chain Length', '3 Certificates to Trusted Root'],
            ['HSTS & Forward Secrecy', 'HSTS Max-Age: 31536000s; PFS Enabled'],
            ['Discovered Subdomains / APIs', String(2 + Math.floor(rng() * depthMultiplier * 8))],
            ['CBOM Spec Version', 'CycloneDX 1.6 CBOM Schema'],
          ];

    const plan: ScanPlan[] = [
      {
        phase: 'Phase 1 · 0–3 Months',
        title: 'Comprehensive Inventory & CBOM Pipeline',
        desc: 'Expand discovery from this single target across all enterprise endpoints, internal microservices, and repositories. Integrate CycloneDX CBOM generation into CI/CD.',
      },
      {
        phase: 'Phase 2 · 3–9 Months',
        title: 'Enterprise Crypto-Agility Abstraction',
        desc: 'Decouple hardcoded cryptographic algorithms behind a unified abstraction interface (AdviQ Axis), allowing runtime algorithm rotation without source refactoring.',
      },
      {
        phase: 'Phase 3 · 9–18 Months',
        title: 'Hybrid Post-Quantum Deployment',
        desc: 'Enable X25519MLKEM768 hybrid key encapsulation across edge gateways and high-value data paths, protecting in-transit secrets against retroactive HNDL capture.',
      },
      {
        phase: 'Phase 4 · 18–36 Months',
        title: 'Full PQC Signature & Classical Retirement',
        desc: 'Upgrade internal PKI, code signing, and mutual TLS to NIST FIPS 204 (ML-DSA) and FIPS 205 (SLH-DSA), subsequently disabling classical fallback suites.',
      },
    ];

    return {
      target,
      type,
      when: new Date(),
      score: finalScore,
      band,
      retention,
      stats: {
        total: totalAssets,
        broken: brokenTotal,
        weak: weakTotal,
        safe: safeTotal,
      },
      cbom: sampleCbom,
      findings,
      detail,
      plan,
    };
  };

  /* ── Export to CycloneDX 1.6 CBOM (JSON) ── */
  const exportCycloneDX = () => {
    if (!results) return;

    let cyclonedxJson: string;
    if (results.raw?.cbom) {
      cyclonedxJson = JSON.stringify(results.raw.cbom, null, 2);
    } else {
      const cyclonedx = {
        $schema: 'http://cyclonedx.org/schema/bom-1.6.schema.json',
        bomFormat: 'CycloneDX',
        specVersion: '1.6',
        serialNumber: `urn:uuid:${Math.random().toString(36).substring(2)}-${Date.now()}`,
        version: 1,
        metadata: {
          timestamp: results.when.toISOString(),
          tools: [
            {
              vendor: 'UElement Technologies',
              name: 'Vyuh Quantum CBOM Scanner',
              version: '2.4.0',
            },
          ],
          component: {
            type: results.type === 'repo' ? 'application' : 'service',
            name: results.target,
          },
        },
        declarations: {
          assessors: [
            {
              organization: { name: 'UElement AdviQ Quantum Practice' },
            },
          ],
        },
        cryptographicAssets: results.cbom.map((item, index) => ({
          bomRef: `crypto-asset-${index + 1}`,
          type: item.purpose.toLowerCase().includes('certificate') ? 'certificate' : 'algorithm',
          name: item.asset,
          algorithm: item.primitive,
          quantumSecurityVerdict: item.verdict,
          targetStandard: item.replacement,
        })),
        quantumReadiness: {
          score: results.score,
          assessmentBand: results.band,
          dataRetentionHorizonYears: results.retention,
        },
      };
      cyclonedxJson = JSON.stringify(cyclonedx, null, 2);
    }

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(cyclonedxJson);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `Vyuh_CycloneDX_CBOM_${results.target.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  /* ── Client-side PDF Report Generation ── */
  const downloadPDFReport = () => {
    if (!results) return;
    const jspdfObj = (window as any).jspdf?.jsPDF;
    if (!jspdfObj) {
      alert('PDF generation engine is still initializing. Please click again in a moment or export the CycloneDX CBOM.');
      return;
    }

    const doc = new jspdfObj({ unit: 'pt', format: 'a4' });
    const W = 595.28;
    const H = 841.89;
    const M = 46;
    let y = 0;
    let page = 1;

    const NAVY = [7, 23, 57];
    const GOLD = [200, 138, 62];
    const DARK_TEXT = [35, 34, 35];

    const printHeader = () => {
      doc.setFillColor(7, 23, 57);
      doc.rect(0, 0, W, 88, 'F');

      // Brand Logo Box
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(M, 24, 34, 34, 6, 6, 'F');
      doc.setTextColor(7, 23, 57);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('92', M + 9, 46);

      // Title & practice
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('U E L E M E N T   A D V I Q', M + 46, 38);

      doc.setTextColor(224, 167, 105);
      doc.setFontSize(16);
      doc.text('Vyuh', M + 46, 56);

      doc.setTextColor(197, 208, 220);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text('Quantum CBOM & Readiness Assessment Report', M + 92, 56);

      y = 120;
    };

    const printFooter = (currPage: number) => {
      doc.setDrawColor(228, 230, 235);
      doc.setLineWidth(0.6);
      doc.line(M, H - 52, W - M, H - 52);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(130, 130, 130);
      doc.text(
        'UElement Technologies Private Limited · Wakad, Pune, Maharashtra 411057, India · www.uelement.in · contact@uelement.in',
        M,
        H - 38
      );
      doc.text(
        'Vyuh is an enterprise cryptographic evaluation platform from UElement AdviQ. Results are indicative based on non-invasive inspection.',
        M,
        H - 28
      );
      doc.text(`Page ${currPage}`, W - M - 26, H - 28);
    };

    const checkPageRoom = (needed: number) => {
      if (y + needed > H - 70) {
        printFooter(page);
        doc.addPage();
        page++;
        printHeader();
      }
    };

    const drawSectionTitle = (title: string) => {
      checkPageRoom(50);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
      doc.text(title, M, y);
      y += 6;
      doc.setDrawColor(GOLD[0], GOLD[1], GOLD[2]);
      doc.setLineWidth(1.8);
      doc.line(M, y, M + 44, y);
      y += 20;
    };

    const drawParagraph = (text: string, size = 9.5) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(size);
      doc.setTextColor(60, 60, 60);
      const lines = doc.splitTextToSize(text, W - M * 2);
      lines.forEach((l: string) => {
        checkPageRoom(15);
        doc.text(l, M, y);
        y += 13.5;
      });
      y += 8;
    };

    // First page
    printHeader();

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(21);
    doc.setTextColor(DARK_TEXT[0], DARK_TEXT[1], DARK_TEXT[2]);
    doc.text('Cryptographic Bill of Materials (CBOM)', M, y);
    y += 22;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text('NIST FIPS 203/204/205 Quantum Risk & Migration Roadmap', M, y);
    y += 24;

    // Metadata Card
    doc.setDrawColor(220, 225, 232);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(M, y, W - M * 2, 94, 6, 6, 'FD');

    const metaBaseY = y + 22;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(130, 130, 130);
    doc.text('TARGET ASSET', M + 18, metaBaseY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(20, 20, 20);
    doc.text(doc.splitTextToSize(results.target, 270), M + 18, metaBaseY + 14);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(130, 130, 130);
    doc.text('SCAN CLASSIFICATION', M + 310, metaBaseY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(20, 20, 20);
    doc.text(results.type === 'repo' ? 'Source & Manifest Inspection' : 'Endpoint & Protocol Handshake', M + 310, metaBaseY + 14);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(130, 130, 130);
    doc.text('ASSESSED FOR', M + 18, metaBaseY + 44);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(20, 20, 20);
    doc.text(`${profile.name || 'Executive'} · ${profile.company || 'Enterprise'}`, M + 18, metaBaseY + 58);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(130, 130, 130);
    doc.text('EVALUATION DATE', M + 310, metaBaseY + 44);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(20, 20, 20);
    doc.text(results.when.toLocaleString(), M + 310, metaBaseY + 58);

    y += 114;

    // Score Banner
    drawSectionTitle('Quantum Readiness Score & HNDL Risk');
    const scoreColor = results.score < 40 ? [226, 96, 74] : results.score < 70 ? [214, 170, 20] : [95, 185, 139];
    doc.setFillColor(scoreColor[0], scoreColor[1], scoreColor[2]);
    doc.roundedRect(M, y, 92, 54, 6, 6, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(26);
    doc.text(String(results.score), M + 18, y + 36);
    doc.setFontSize(11);
    doc.text('/100', M + 58, y + 36);

    doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
    doc.setFontSize(13);
    doc.text(results.band, M + 108, y + 20);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.8);
    doc.setTextColor(80, 80, 80);
    const scoreSummary = `${results.stats.broken} of ${results.stats.total} identified cryptographic primitives are breakable by Shor's algorithm, ${results.stats.weak} are weakened under Grover search, and ${results.stats.safe} hold today. Evaluated across a ${results.retention}-year data retention horizon.`;
    doc.text(doc.splitTextToSize(scoreSummary, W - M * 2 - 114), M + 108, y + 36);

    y += 76;

    // Executive Summary
    drawSectionTitle('Executive Summary');
    drawParagraph(
      'This assessment compiles a complete cryptographic inventory of the target system and classifies every active primitive against post-quantum standards standardized by NIST (FIPS 203, 204, 205). Asymmetric cryptography (including RSA, ECDSA, ECDH, and classical Diffie-Hellman) will be completely broken once Cryptographically Relevant Quantum Computers (CRQCs) reach scale. Symmetric ciphers and hash functions experience effective security halving and require parameter expansion.'
    );
    drawParagraph(
      'The imminent threat is Harvest-Now-Decrypt-Later (HNDL): adversaries actively capture encrypted enterprise traffic today to retroactively decrypt it once Shor’s algorithm is operational. Data with an operational life beyond 2029 is already in jeopardy. Migration sequencing must therefore be governed by data longevity rather than legacy system criticality.'
    );

    // CBOM Table
    drawSectionTitle('Cryptographic Bill of Materials (CBOM)');
    const tableCols = [M, M + 120, M + 235, M + 345, M + 430];
    const tableWidths = [116, 110, 105, 80, W - M - (M + 430)];

    checkPageRoom(30);
    doc.setFillColor(242, 244, 248);
    doc.rect(M, y - 10, W - M * 2, 20, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(70, 70, 70);
    ['Asset Name', 'Active Primitive', 'Security Purpose', 'Verdict', 'Recommended Move'].forEach((header, i) => {
      doc.text(header, tableCols[i] + 4, y + 3);
    });
    y += 18;

    results.cbom.forEach((row) => {
      const verdictLabel = row.verdict === 'broken' ? 'Broken (Shor)' : row.verdict === 'weak' ? 'Weakened (Grover)' : 'Quantum-Safe';
      const cellData = [row.asset, row.primitive, row.purpose, verdictLabel, row.replacement];
      const wrappedCells = cellData.map((txt, i) => doc.splitTextToSize(String(txt), tableWidths[i] - 8));
      const rowHeight = Math.max(...wrappedCells.map((lines) => lines.length)) * 11 + 9;

      checkPageRoom(rowHeight + 10);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);

      wrappedCells.forEach((lines, i) => {
        if (i === 3) {
          const col = row.verdict === 'broken' ? [200, 60, 40] : row.verdict === 'weak' ? [180, 130, 20] : [40, 145, 90];
          doc.setTextColor(col[0], col[1], col[2]);
        } else {
          doc.setTextColor(45, 45, 45);
        }
        doc.text(lines, tableCols[i] + 4, y + 3);
      });

      y += rowHeight;
      doc.setDrawColor(235, 238, 242);
      doc.setLineWidth(0.5);
      doc.line(M, y - 5, W - M, y - 5);
    });

    y += 10;
    drawParagraph(`Plus ${results.stats.total - results.cbom.length} additional cryptographic assets mapped in the CycloneDX 1.6 export.`, 8);

    // Findings
    drawSectionTitle('Key Vulnerabilities & Remediation Actions');
    results.findings.forEach((finding) => {
      checkPageRoom(74);
      const sevColor =
        finding.sev === 'critical'
          ? [226, 96, 74]
          : finding.sev === 'high'
            ? [224, 138, 74]
            : finding.sev === 'medium'
              ? [214, 170, 20]
              : [120, 135, 155];

      doc.setFillColor(sevColor[0], sevColor[1], sevColor[2]);
      doc.rect(M, y - 8, 3.5, 14, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(sevColor[0], sevColor[1], sevColor[2]);
      doc.text(finding.sev.toUpperCase(), M + 10, y);

      doc.setFontSize(9.8);
      doc.setTextColor(DARK_TEXT[0], DARK_TEXT[1], DARK_TEXT[2]);
      const titleLines = doc.splitTextToSize(finding.title, W - M * 2 - 70);
      doc.text(titleLines, M + 64, y);
      y += titleLines.length * 12 + 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.8);
      doc.setTextColor(70, 70, 70);
      const detailLines = doc.splitTextToSize(finding.detail, W - M * 2 - 14);
      detailLines.forEach((l: string) => {
        checkPageRoom(14);
        doc.text(l, M + 10, y);
        y += 12;
      });

      y += 2;
      doc.setFontSize(8.5);
      doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
      const fixLines = doc.splitTextToSize(`Action: ${finding.fix}  [Standard: ${finding.std}]`, W - M * 2 - 14);
      fixLines.forEach((l: string) => {
        checkPageRoom(14);
        doc.text(l, M + 10, y);
        y += 12;
      });

      y += 14;
    });

    // 4-Phase Plan
    drawSectionTitle('Four-Phase PQC Migration Roadmap');
    results.plan.forEach((phase) => {
      checkPageRoom(55);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(GOLD[0], GOLD[1], GOLD[2]);
      doc.text(phase.phase, M, y);

      doc.setFontSize(10);
      doc.setTextColor(DARK_TEXT[0], DARK_TEXT[1], DARK_TEXT[2]);
      doc.text(phase.title, M + 140, y);
      y += 13;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.8);
      doc.setTextColor(70, 70, 70);
      const descLines = doc.splitTextToSize(phase.desc, W - M * 2 - 140);
      descLines.forEach((l: string) => {
        checkPageRoom(14);
        doc.text(l, M + 140, y);
        y += 12;
      });
      y += 10;
    });

    // Next steps
    drawSectionTitle('Engagement with UElement AdviQ');
    drawParagraph(
      'Vyuh provides single-target scanning. Estate-wide discovery, continuous automated CBOM monitoring, hardware security module (HSM) migration, and crypto-agility implementation are delivered by UElement AdviQ, our dedicated quantum security practice. Contact our cryptographic engineering team at contact@uelement.in or call +91 7620690561 to review your assessment.'
    );

    printFooter(page);
    const sanitizedName = results.target.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 36);
    doc.save(`Vyuh_CBOM_Assessment_${sanitizedName}.pdf`);
  };

  return (
    <>
      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <div className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Subtle Background Glow Elements */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-40 h-[650px] w-[650px] rounded-full opacity-20 blur-[130px]"
          style={{ background: 'radial-gradient(circle, #e0a769 0%, transparent 70%)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full opacity-35 blur-[140px]"
          style={{ background: 'radial-gradient(circle, #071739 0%, #163068 60%, transparent 80%)' }}
        />

        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div className="crumb">
            <Link href="/">Home</Link> / <Link href="/adviq">AdviQ</Link> / Quantum Risk Assessment
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-2 pb-8">
            {/* Hero Left Column */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#e0a769]/30 bg-[#e0a769]/10 text-xs text-[#e0a769] font-medium tracking-wide mb-6">
                <span className="h-2 w-2 rounded-full bg-[#f5c116] shadow-[0_0_8px_rgba(245,193,22,0.8)] animate-pulse" />
                Free Online Diagnostic Tool · UElement AdviQ
              </div>

              <h1 className="display" style={{ fontSize: 'var(--text-display)', lineHeight: 1.08 }}>
                Every certificate, cipher and key your stack depends on.{' '}
                <span className="au">
                  Vyuh
                </span>{' '}
                lays out the formation.
              </h1>

              <p className="serif-line" style={{ fontSize: 19, marginTop: 10, color: '#c88a3e' }}>
                Automated Cryptographic Bill of Materials (CBOM) & NIST PQC Migration Roadmap
              </p>

              <p className="lede" style={{ marginTop: 22 }}>
                Point Vyuh at a public endpoint or a code repository. It constructs an actionable cryptographic bill of
                materials, classifies what a quantum computer running Shor and Grover algorithms breaks, and outputs a clear
                migration path to NIST FIPS 203, 204, and 205, in about ninety seconds.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <button
                  onClick={handleOpenModal}
                  className="btn btn-gold cursor-pointer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    whiteSpace: 'nowrap',
                    gap: '8px',
                    height: '44px',
                    padding: '0 28px',
                    lineHeight: 'normal',
                  }}
                >
                  <Shield className="w-4 h-4 shrink-0" />
                  <span>Run a free scan</span>
                </button>
                <a
                  href="#output"
                  className="btn btn-line"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    whiteSpace: 'nowrap',
                    gap: '8px',
                    height: '44px',
                    padding: '0 28px',
                    lineHeight: 'normal',
                  }}
                >
                  <span>See what the report covers</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </a>
              </div>

              {/* Trust checklist */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-7 text-xs text-[#c5d0dc]/80">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#e0a769]" /> No agent or sensor install
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#e0a769]" /> CycloneDX 1.6 CBOM export
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#e0a769]" /> Board-ready PDF circulation
                </span>
              </div>
            </div>

            {/* Hero Right Column: Live Terminal Readout Rig */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#101010]/95 to-[#1c1c1c]/90 backdrop-blur-xl shadow-2xl overflow-hidden">
                {/* Readout Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.03]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    <span className="ml-2 font-mono text-[11px] text-gray-400">vyuh · scan simulation session</span>
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#e0a769]/80">LIVE INSPECTION</span>
                </div>

                {/* Readout Body */}
                <div className="p-5 font-mono text-[12px] leading-relaxed min-h-[220px] flex flex-col justify-center space-y-2 text-[#c5d0dc]">
                  <div className={`transition-opacity duration-300 ${heroLinesVisible >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="text-[#e0a769]">→</span> target{' '}
                    <span className="text-white font-semibold">https://netbanking.enterprise.in</span>
                  </div>
                  <div className={`transition-opacity duration-300 ${heroLinesVisible >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="text-[#e0a769]">→</span> TLS 1.3 / 1.2 · 14 cipher suites enumerated
                  </div>
                  <div className={`transition-opacity duration-300 ${heroLinesVisible >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="text-[#e0a769]">→</span> key exchange{' '}
                    <span className="text-white font-medium">ECDHE-P256</span>{' '}
                    <span className="text-red-400 font-semibold">[breakable: Shor]</span>
                  </div>
                  <div className={`transition-opacity duration-300 ${heroLinesVisible >= 4 ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="text-[#e0a769]">→</span> certificate signature{' '}
                    <span className="text-white font-medium">RSA-2048 / SHA-256</span>{' '}
                    <span className="text-red-400 font-semibold">[breakable: Shor]</span>
                  </div>
                  <div className={`transition-opacity duration-300 ${heroLinesVisible >= 5 ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="text-[#e0a769]">→</span> bulk transport cipher{' '}
                    <span className="text-white font-medium">AES-128-GCM</span>{' '}
                    <span className="text-yellow-400 font-semibold">[weakened: Grover]</span>
                  </div>
                  <div className={`transition-opacity duration-300 ${heroLinesVisible >= 6 ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="text-[#e0a769]">→</span> hash digest{' '}
                    <span className="text-white font-medium">SHA-384</span>{' '}
                    <span className="text-emerald-400 font-semibold">[quantum-safe]</span>
                  </div>
                  <div className={`transition-opacity duration-300 ${heroLinesVisible >= 7 ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="text-[#e0a769]">→</span> ML-KEM hybrid group{' '}
                    <span className="text-red-400 font-semibold">[not offered]</span>
                  </div>
                  <div className={`transition-opacity duration-300 ${heroLinesVisible >= 8 ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="text-[#e0a769]">→</span> CBOM assembled · 27 assets mapped · 6 findings
                  </div>
                </div>

                {/* Readout Footer with Progress Ring */}
                <div className="p-4 border-t border-white/10 bg-white/[0.02] flex items-center gap-4">
                  <div className="relative w-16 h-16 shrink-0">
                    <svg className="w-16 h-16 -rotate-90" viewBox="0 0 72 72">
                      <circle cx="36" cy="36" r="30" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                      <circle
                        cx="36"
                        cy="36"
                        r="30"
                        fill="none"
                        stroke="#f5c116"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={188.5}
                        strokeDashoffset={188.5 - (188.5 * heroScoreValue) / 100}
                        style={{ transition: 'stroke-dashoffset 1s ease' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-heading font-bold text-base text-white">
                      {heroScoreValue}
                    </div>
                  </div>
                  <div className="text-xs">
                    <b className="block text-sm text-white font-heading font-semibold">Quantum Readiness Score</b>
                    <span className="text-gray-400">Harvest-Now-Decrypt-Later exposure over 12-year horizon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════ TARGETS SECTION ═══════════════════════ */}
      <div className="section alt">
        <div className="wrap">
          <div className="kicker">Attack Surface Discovery</div>
          <h2 className="display text-navy-gradient">
            Two ways in, <span className="au">one inventory out.</span>
          </h2>
          <p className="lede" style={{ marginTop: 14 }}>
            Most organisations cannot answer a simple question: where is RSA or classical ECC running, and what relies on
            it? Vyuh answers it from the outside in via protocol handshakes, or from the source out across repositories.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Target 1: Public Endpoints */}
            <div className="card hover:border-[#c88a3e]/40 transition-all duration-300">
              <span className="inline-flex items-center font-mono text-xs font-semibold text-[#e0a769] bg-[#e0a769]/15 border border-[#e0a769]/30 px-3 py-1 rounded-md mb-4">
                https://
              </span>
              <h3 className="font-heading text-2xl font-bold text-white mb-3 tracking-tight">Public Web Endpoints</h3>
              <p className="text-[#c5d0dc] text-sm mb-6 leading-relaxed">
                Vyuh negotiates directly with internet-facing services the way a client browser or API partner would,
                evaluating negotiated and fallback cryptographic suites.
              </p>
              <ul className="space-y-3.5 border-t border-white/10 pt-5 text-sm">
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e0a769] mt-2 shrink-0 shadow-[0_0_8px_rgba(224,167,105,0.7)]" />
                  <span className="text-[#e4e8eb] font-normal leading-relaxed">
                    TLS 1.3/1.2 versions, negotiated cipher suites, and key exchange groups
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e0a769] mt-2 shrink-0 shadow-[0_0_8px_rgba(224,167,105,0.7)]" />
                  <span className="text-[#e4e8eb] font-normal leading-relaxed">
                    Full X.509 certificate chain inspection: signature algorithms, key sizes, CA roots
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e0a769] mt-2 shrink-0 shadow-[0_0_8px_rgba(224,167,105,0.7)]" />
                  <span className="text-[#e4e8eb] font-normal leading-relaxed">
                    Detection of hybrid post-quantum key encapsulation (e.g. X25519MLKEM768)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e0a769] mt-2 shrink-0 shadow-[0_0_8px_rgba(224,167,105,0.7)]" />
                  <span className="text-[#e4e8eb] font-normal leading-relaxed">
                    HSTS, OCSP stapling validation, session ticket secrecy, and downgrade behavior
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e0a769] mt-2 shrink-0 shadow-[0_0_8px_rgba(224,167,105,0.7)]" />
                  <span className="text-[#e4e8eb] font-normal leading-relaxed">
                    Discovered subdomains and APIs harvested from Certificate Transparency logs
                  </span>
                </li>
              </ul>
            </div>

            {/* Target 2: Code Repositories */}
            <div className="card hover:border-[#c88a3e]/40 transition-all duration-300">
              <span className="inline-flex items-center font-mono text-xs font-semibold text-[#e0a769] bg-[#e0a769]/15 border border-[#e0a769]/30 px-3 py-1 rounded-md mb-4">
                git://
              </span>
              <h3 className="font-heading text-2xl font-bold text-white mb-3 tracking-tight">Code Repositories</h3>
              <p className="text-[#c5d0dc] text-sm mb-6 leading-relaxed">
                Point Vyuh at a public repository or connect a private repo with a scoped read-only token. Vyuh traverses the
                code tree to parse cryptographic primitives and dependencies.
              </p>
              <ul className="space-y-3.5 border-t border-white/10 pt-5 text-sm">
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e0a769] mt-2 shrink-0 shadow-[0_0_8px_rgba(224,167,105,0.7)]" />
                  <span className="text-[#e4e8eb] font-normal leading-relaxed">
                    Cryptographic API calls across Java, Python, Go, C/C++, TypeScript, and .NET
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e0a769] mt-2 shrink-0 shadow-[0_0_8px_rgba(224,167,105,0.7)]" />
                  <span className="text-[#e4e8eb] font-normal leading-relaxed">
                    Library versions: OpenSSL, BouncyCastle, PyCA/cryptography, libsodium
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e0a769] mt-2 shrink-0 shadow-[0_0_8px_rgba(224,167,105,0.7)]" />
                  <span className="text-[#e4e8eb] font-normal leading-relaxed">
                    Hardcoded private keys, weak pseudo-random generators, and legacy SHA-1/MD5 digests
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e0a769] mt-2 shrink-0 shadow-[0_0_8px_rgba(224,167,105,0.7)]" />
                  <span className="text-[#e4e8eb] font-normal leading-relaxed">
                    Certificates, keystores (JKS/PKCS12), and PEM credentials committed to version control
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e0a769] mt-2 shrink-0 shadow-[0_0_8px_rgba(224,167,105,0.7)]" />
                  <span className="text-[#e4e8eb] font-normal leading-relaxed">
                    Infrastructure-as-Code (Terraform, Kubernetes) and CI/CD TLS configuration audit
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════ DELIVERABLES & ALGORITHM MATRIX ═══════════════════════ */}
      <div className="section navy" id="output">
        <div className="wrap">
          <div className="kicker">Scan Output & Artifacts</div>
          <h2 className="display">
            What comes back in <span className="au">ninety seconds.</span>
          </h2>
          <p className="lede" style={{ marginTop: 14 }}>
            A comprehensive, verifiable report your security architects can execute on and your audit committee can
            circulate, immediately downloadable as a PDF and exportable in CycloneDX 1.6 format.
          </p>

          {/* 6 Deliverables Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <div className="p-6 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
              <span className="font-mono text-xs text-[#e0a769] font-semibold tracking-wider">01 · CBOM</span>
              <h4 className="text-lg font-heading font-bold text-white mt-2 mb-2">Cryptographic Bill of Materials</h4>
              <p className="text-sm text-[#c5d0dc]">
                Every algorithm, key length, protocol, and certificate mapped to where it lives, exportable directly to
                CycloneDX 1.6 for automated SBOM pipelines.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
              <span className="font-mono text-xs text-[#e0a769] font-semibold tracking-wider">02 · SCORE</span>
              <h4 className="text-lg font-heading font-bold text-white mt-2 mb-2">Quantum Readiness Score</h4>
              <p className="text-sm text-[#c5d0dc]">
                A single 0–100 index with full arithmetic exposed: assessing what survives Shor and Grover, and how much is
                mission-critical.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
              <span className="font-mono text-xs text-[#e0a769] font-semibold tracking-wider">03 · HNDL</span>
              <h4 className="text-lg font-heading font-bold text-white mt-2 mb-2">Harvest-Now-Decrypt-Later Exposure</h4>
              <p className="text-sm text-[#c5d0dc]">
                Weighs exposure using your data retention timeline against the estimated quantum arrival horizon to quantify
                active risk today.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
              <span className="font-mono text-xs text-[#e0a769] font-semibold tracking-wider">04 · STANDARDS</span>
              <h4 className="text-lg font-heading font-bold text-white mt-2 mb-2">Mapping to NIST FIPS 203/204/205</h4>
              <p className="text-sm text-[#c5d0dc]">
                Each vulnerable asset is mapped to standardized replacements: ML-KEM, ML-DSA, and SLH-DSA, with hybrid
                transitional paths.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
              <span className="font-mono text-xs text-[#e0a769] font-semibold tracking-wider">05 · FINDINGS</span>
              <h4 className="text-lg font-heading font-bold text-white mt-2 mb-2">Severity-Ranked Findings</h4>
              <p className="text-sm text-[#c5d0dc]">
                Actionable findings prioritized by risk, including exact remediation recommendations rather than vague
                vendor advisories.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
              <span className="font-mono text-xs text-[#e0a769] font-semibold tracking-wider">06 · ROADMAP</span>
              <h4 className="text-lg font-heading font-bold text-white mt-2 mb-2">4-Phase Migration Roadmap</h4>
              <p className="text-sm text-[#c5d0dc]">
                Discovery, crypto-agility, hybrid deployment, and classical retirement sequenced specifically against your
                actual inventory.
              </p>
            </div>
          </div>

          {/* Algorithm Vulnerability Table */}
          <div className="mt-14 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="p-5 border-b border-white/10 bg-white/[0.03] flex items-center justify-between">
              <div>
                <h4 className="font-heading font-bold text-white text-base">NIST Quantum Vulnerability & Replacement Matrix</h4>
                <p className="text-xs text-gray-400 mt-1">
                  How classical primitives perform under Shor’s and Grover’s algorithms and their approved PQC replacements
                </p>
              </div>
              <span className="text-xs font-mono text-[#e0a769] border border-[#e0a769]/30 px-2.5 py-1 rounded">
                NIST FIPS Validated
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#c5d0dc]">
                <thead className="bg-white/[0.04] text-xs font-heading font-semibold text-gray-300 uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-5">Classical Primitive</th>
                    <th className="py-3.5 px-5">Common Enterprise Location</th>
                    <th className="py-3.5 px-5">Quantum Verdict</th>
                    <th className="py-3.5 px-5">NIST FIPS Replacement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-normal">
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-3.5 px-5 font-mono text-white font-medium">RSA-2048 / RSA-4096</td>
                    <td className="py-3.5 px-5">TLS certificates, code signing, JWT tokens</td>
                    <td className="py-3.5 px-5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/20">
                        Broken by Shor
                      </span>
                    </td>
                    <td className="py-3.5 px-5 font-mono text-emerald-300">ML-KEM-768 · ML-DSA-65</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-3.5 px-5 font-mono text-white font-medium">ECDSA P-256 / P-384</td>
                    <td className="py-3.5 px-5">Certificate signatures, mTLS, zero-trust tokens</td>
                    <td className="py-3.5 px-5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/20">
                        Broken by Shor
                      </span>
                    </td>
                    <td className="py-3.5 px-5 font-mono text-emerald-300">ML-DSA-65 · SLH-DSA</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-3.5 px-5 font-mono text-white font-medium">ECDH / X25519</td>
                    <td className="py-3.5 px-5">TLS session key exchange, VPN tunnels, SSH</td>
                    <td className="py-3.5 px-5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/20">
                        Broken by Shor
                      </span>
                    </td>
                    <td className="py-3.5 px-5 font-mono text-emerald-300">X25519MLKEM768 Hybrid</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-3.5 px-5 font-mono text-white font-medium">AES-128-GCM</td>
                    <td className="py-3.5 px-5">Symmetric session encryption, database columns</td>
                    <td className="py-3.5 px-5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-500/15 text-yellow-400 border border-yellow-500/20">
                        Halved by Grover
                      </span>
                    </td>
                    <td className="py-3.5 px-5 font-mono text-emerald-300">AES-256-GCM</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-3.5 px-5 font-mono text-white font-medium">SHA-1 / MD5</td>
                    <td className="py-3.5 px-5">Legacy HMACs, file integrity, older microservices</td>
                    <td className="py-3.5 px-5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/20">
                        Already Insecure
                      </span>
                    </td>
                    <td className="py-3.5 px-5 font-mono text-emerald-300">SHA-384 · SHA-3</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-3.5 px-5 font-mono text-white font-medium">AES-256-GCM / SHA-384</td>
                    <td className="py-3.5 px-5">Modern high-assurance envelope encryption</td>
                    <td className="py-3.5 px-5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                        Quantum-Safe
                      </span>
                    </td>
                    <td className="py-3.5 px-5 font-mono text-gray-400">No modification required</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════ SCAN SEQUENCE STEPS ═══════════════════════ */}
      <div className="section alt">
        <div className="wrap">
          <div className="kicker">Transparent Methodology</div>
          <h2 className="display text-navy-gradient">
            How a scan <span className="au">runs.</span>
          </h2>
          <p className="lede" style={{ marginTop: 14 }}>
            Vyuh is free to use and gated only by a verified professional identity, ensuring diagnostic telemetry and
            cryptographic discoveries are shared strictly with verified organizational stewards.
          </p>

          <div className="mt-12 divide-y divide-gray-200 border-t border-b border-gray-200">
            <div className="py-7 grid md:grid-cols-12 gap-6 items-baseline">
              <div className="md:col-span-1 font-serif text-3xl text-[#c88a3e] font-bold">1</div>
              <div className="md:col-span-4">
                <h3 className="font-heading text-lg font-bold text-[#071739]">Verify who you are</h3>
              </div>
              <div className="md:col-span-7 text-sm text-gray-600">
                Work email and mobile number are confirmed via one-time verification codes, accompanied by your professional
                LinkedIn profile. Personal free mailboxes are rejected to ensure accountability.
              </div>
            </div>

            <div className="py-7 grid md:grid-cols-12 gap-6 items-baseline">
              <div className="md:col-span-1 font-serif text-3xl text-[#c88a3e] font-bold">2</div>
              <div className="md:col-span-4">
                <h3 className="font-heading text-lg font-bold text-[#071739]">Name the target</h3>
              </div>
              <div className="md:col-span-7 text-sm text-gray-600">
                Provide a website URL or repository URI with explicit declaration of authorization. Vyuh executes only
                read-only, non-invasive cryptographic inspection without injecting payloads.
              </div>
            </div>

            <div className="py-7 grid md:grid-cols-12 gap-6 items-baseline">
              <div className="md:col-span-1 font-serif text-3xl text-[#c88a3e] font-bold">3</div>
              <div className="md:col-span-4">
                <h3 className="font-heading text-lg font-bold text-[#071739]">Vyuh probes and classifies</h3>
              </div>
              <div className="md:col-span-7 text-sm text-gray-600">
                Handshakes, certificates, and AST source patterns are parsed. Every primitive is evaluated against NIST FIPS
                203, 204, and 205 post-quantum standards and HNDL longevity formulas.
              </div>
            </div>

            <div className="py-7 grid md:grid-cols-12 gap-6 items-baseline">
              <div className="md:col-span-1 font-serif text-3xl text-[#c88a3e] font-bold">4</div>
              <div className="md:col-span-4">
                <h3 className="font-heading text-lg font-bold text-[#071739]">Inspect, export, and download</h3>
              </div>
              <div className="md:col-span-7 text-sm text-gray-600">
                Live findings display in your browser immediately. The full cryptographic assessment downloads as a
                board-ready PDF report, with the machine-readable CBOM available in CycloneDX 1.6 format.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════ REGULATORY & COMPLIANCE STANDARDS ═══════════════════════ */}
      <div className="section navy">
        <div className="wrap">
          <div className="kicker">Regulatory Alignment</div>
          <h2 className="display">
            Classified against the standards <span className="au">your regulator cites.</span>
          </h2>
          <p className="lede" style={{ marginTop: 14 }}>
            Vyuh’s risk ratings and remediation mandates trace directly to authoritative guidance from global and sovereign
            cryptographic bodies.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-12">
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#e0a769]/40 transition-colors">
              <b className="block font-heading text-white text-base">NIST FIPS 203</b>
              <span className="text-xs text-gray-400 mt-1 block">ML-KEM · Module-Lattice Key Encapsulation</span>
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#e0a769]/40 transition-colors">
              <b className="block font-heading text-white text-base">NIST FIPS 204</b>
              <span className="text-xs text-gray-400 mt-1 block">ML-DSA · Module-Lattice Digital Signatures</span>
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#e0a769]/40 transition-colors">
              <b className="block font-heading text-white text-base">NIST FIPS 205</b>
              <span className="text-xs text-gray-400 mt-1 block">SLH-DSA · Stateless Hash-Based Signatures</span>
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#e0a769]/40 transition-colors">
              <b className="block font-heading text-white text-base">NIST SP 1800-38</b>
              <span className="text-xs text-gray-400 mt-1 block">Enterprise Migration to Post-Quantum Cryptography</span>
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#e0a769]/40 transition-colors">
              <b className="block font-heading text-white text-base">CycloneDX 1.6</b>
              <span className="text-xs text-gray-400 mt-1 block">Cryptographic Bill of Materials (CBOM) Schema</span>
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#e0a769]/40 transition-colors">
              <b className="block font-heading text-white text-base">CNSA 2.0</b>
              <span className="text-xs text-gray-400 mt-1 block">Commercial National Security Algorithm Suite</span>
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#e0a769]/40 transition-colors">
              <b className="block font-heading text-white text-base">RBI Cyber Resilience</b>
              <span className="text-xs text-gray-400 mt-1 block">Supervisory Guidance on Quantum-Safe BFSI Readiness</span>
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#e0a769]/40 transition-colors">
              <b className="block font-heading text-white text-base">CERT-In PQC Framework</b>
              <span className="text-xs text-gray-400 mt-1 block">National Security Advisory on Sovereign Encryption</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════ FREQUENTLY ASKED QUESTIONS ═══════════════════════ */}
      <div className="section alt" id="faq">
        <div className="wrap max-w-4xl">
          <div className="kicker text-center">Clarity & Governance</div>
          <h2 className="display text-navy-gradient text-center">
            Questions asked before <span className="au">scanning.</span>
          </h2>

          <div className="mt-12 divide-y divide-gray-200 border-t border-b border-gray-200">
            {[
              {
                q: 'Is Vyuh really free to use?',
                a: 'Yes. Scanning targets you own or are authorized to assess is completely free. There are no credit cards required, no trial expiration timers, and no paywalls on report generation. A verified professional identity is the sole requirement.',
              },
              {
                q: 'Does Vyuh attack, disrupt, or exploit systems?',
                a: 'No. Web scans perform standard TLS cryptographic handshakes and consume public Certificate Transparency logs, exactly like a web browser. Repository scans inspect source syntax trees and package manifests. No exploits are executed, no intrusive probes occur, and no code or data is altered.',
              },
              {
                q: 'Why do you require a work email, mobile number, and LinkedIn?',
                a: 'Evaluating organizational infrastructure carries a strict duty of authorization. Validating professional credentials protects organizations from unauthorized third-party probing and ensures sensitive cryptographic assessments reach legitimate custodians.',
              },
              {
                q: 'What happens to our scan data and source code?',
                a: 'Scan results remain accessible under your session and are retained securely for ninety days so you can retrieve them, after which they are expunged. Source code is never persisted or stored; only the extracted cryptographic inventory metadata is retained.',
              },
              {
                q: 'How does Vyuh relate to a full CBOM enterprise engagement?',
                a: 'Vyuh provides focused diagnostics for single targets. Full enterprise discovery, automated CI/CD continuous monitoring, hardware security module (HSM) migration, and policy-driven crypto-agility are led by UElement AdviQ, our dedicated quantum security practice.',
              },
              {
                q: 'Can we scan private repositories or internal VPC services?',
                a: 'Yes. Private repositories can be scanned using fine-grained, read-only personal access tokens discarded immediately after analysis. For internal networks or air-gapped VPCs, UElement AdviQ provides containerized on-premise scanner agents.',
              },
            ].map((faq, idx) => {
              const isOpenItem = openFaq === idx;
              return (
                <div key={idx} className="py-5">
                  <button
                    onClick={() => setOpenFaq(isOpenItem ? null : idx)}
                    className="w-full flex items-center justify-between text-left font-heading font-semibold text-lg text-[#071739] hover:text-[#c88a3e] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-[#c88a3e] text-2xl font-normal ml-4 shrink-0">
                      {isOpenItem ? '–' : '+'}
                    </span>
                  </button>
                  {isOpenItem && (
                    <p className="mt-3 text-sm text-gray-600 leading-relaxed pr-6 animate-fadeIn">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══════════════════════ CLOSING CTA ═══════════════════════ */}
      <div className="section text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #071739 0%, #0c142d 100%)' }}>
        <div className="wrap max-w-3xl">
          <div className="tag mx-auto mb-4">UElement AdviQ Practice</div>
          <h2 className="display text-white">
            You cannot migrate what you have <span className="au">not inventoried.</span>
          </h2>
          <p className="text-[#c5d0dc] text-base mt-4 mb-8">
            Start with one internet-facing endpoint or one critical repository. The first actionable CBOM and quantum
            readiness verdict is ready in ninety seconds.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={handleOpenModal}
              className="btn btn-gold cursor-pointer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap',
                gap: '8px',
                height: '44px',
                padding: '0 28px',
                lineHeight: 'normal',
              }}
            >
              <Shield className="w-4 h-4 shrink-0" />
              <span>Run a free scan</span>
            </button>
            <Link
              href="/contact"
              className="btn btn-line"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap',
                gap: '8px',
                height: '44px',
                padding: '0 28px',
                lineHeight: 'normal',
              }}
            >
              <span>Speak with an AdviQ Quantum Architect</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          INTERACTIVE SCANNER MODAL (Contact Us Modal Theme & z-[9999])
         ══════════════════════════════════════════════════════════ */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="vyuh-modal-title"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 md:p-8 animate-fadeIn"
          style={{
            backgroundColor: 'rgba(7, 23, 57, 0.78)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseModal();
          }}
        >
          <div
            className="relative w-full max-w-[96vw] xl:max-w-[95vw] 2xl:max-w-[1700px] h-[92vh] md:h-[94vh] max-h-[96vh] flex flex-col rounded-[24px] bg-[linear-gradient(165deg,#ffffff_0%,#fbfbfe_100%)] text-[#232223] border border-[#c88a3e]/30 shadow-[0px_20px_70px_rgba(7,23,57,0.35),0px_0px_35px_rgba(200,138,62,0.12)] p-4 sm:p-6 md:p-8 transition-all duration-300"
          >
            {/* Top Gold Accent Bar */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[24px]"
              style={{
                background:
                  'linear-gradient(90deg, transparent, #c88a3e 20%, #e0a769 50%, #c88a3e 80%, transparent)',
              }}
            />

            {/* Close Button matching Contact Us modal */}
            <button
              type="button"
              onClick={handleCloseModal}
              aria-label="Close dialog"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center justify-center w-8 h-8 rounded-full bg-[#071739]/[0.05] hover:bg-[#071739]/[0.12] hover:text-[#c88a3e] border border-black/5 hover:border-[#c88a3e]/40 text-[#4a5568] transition-all duration-200 cursor-pointer z-20"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="text-left mb-3.5 sm:mb-4 pr-8 shrink-0">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full text-[10.5px] font-bold font-heading tracking-widest uppercase bg-[#c88a3e]/10 text-[#a86e24] border border-[#c88a3e]/30 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c88a3e] animate-pulse" />
                <span>
                  {scanType === 'url' ? (
                    <>
                      {step === 3 && 'Step 1 of 2 · Target Endpoint'}
                      {step === 4 && 'Step 2 of 2 · Probing & Classification'}
                      {step === 5 && 'Diagnostic Complete · Cryptographic Inventory'}
                    </>
                  ) : (
                    <>
                      {step === 1 && 'Step 1 of 4 · Professional Identity'}
                      {step === 2 && 'Step 2 of 4 · 2FA Code Verification'}
                      {step === 3 && 'Step 3 of 4 · Repository Configuration'}
                      {step === 4 && 'Step 4 of 4 · Codebase Analysis'}
                      {step === 5 && 'Diagnostic Complete · Cryptographic Inventory'}
                    </>
                  )}
                </span>
              </div>

              <h2
                id="vyuh-modal-title"
                className="text-20 sm:text-24 md:text-26 font-bold font-heading text-[#071739] tracking-tight leading-snug"
              >
                Vyuh: <span className="au">Quantum CBOM Scanner</span>
              </h2>

              <p className="text-12 sm:text-13 text-[#556987] mt-1 leading-normal font-body">
                {step === 1 &&
                  'Repository scanning inspects internal codebase dependencies. We verify a professional identity to ensure authorized repository access.'}
                {step === 2 &&
                  'We have dispatched a six-digit verification code to your email and phone. Both must be confirmed before inspecting code repositories.'}
                {step === 3 &&
                  (scanType === 'url'
                    ? 'Enter any public domain, website, or API endpoint. Vyuh performs live non-invasive TLS 1.3 handshake and certificate chain analysis.'
                    : 'Configure the repository to be inventoried. Vyuh performs read-only, non-invasive inspection of cryptographic primitives.')}
                {step === 4 && 'Negotiating cryptographic handshakes and evaluating primitives against NIST standards...'}
                {step === 5 &&
                  'Cryptographic Bill of Materials (CBOM) compiled. Review findings, migration timeline, and export formats below.'}
              </p>
            </div>

            {/* Step Progress Bar */}
            <div className="flex gap-2 mb-3.5 sm:mb-4 shrink-0">
              {(scanType === 'url' ? [3, 4] : [1, 2, 3, 4]).map((s) => (
                <div
                  key={s}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    step >= s ? 'bg-[#c88a3e]' : 'bg-black/[0.08]'
                  }`}
                />
              ))}
            </div>

            {/* Modal Body Content */}
            <div className="flex-1 min-h-0 overflow-y-auto custom-modal-scrollbar pr-1 sm:pr-2 py-1">
              {/* ── STEP 1: Details ── */}
              {step === 1 && (
                <div className="flex flex-col gap-3 sm:gap-3.5 max-w-4xl mx-auto w-full">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 p-3 rounded-xl bg-[#c88a3e]/10 border border-[#c88a3e]/30 text-xs">
                    <span className="text-[#071739] font-medium">
                      Want to scan a public website or API endpoint instead? No login or verification required.
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setScanType('url');
                        setStep(3);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#c88a3e] text-white font-semibold hover:bg-[#b0752f] transition-colors shrink-0 cursor-pointer"
                    >
                      Instant Free URL Scan
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="font-heading text-xs sm:text-[12.5px] font-semibold text-[#071739] mb-1 block">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Dr. Arjun Sharma"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className={`w-full bg-[#f8f9fa] border rounded-lg px-3 py-2 text-sm text-[#232223] placeholder:text-[#808080] focus:outline-none focus:border-[#c88a3e] focus:bg-white transition-all ${
                          errors1.name ? 'border-red-500' : 'border-[#D7D7D7]'
                        }`}
                      />
                      {errors1.name && <p className="text-red-600 text-xs mt-0.5 font-heading">{errors1.name}</p>}
                    </div>

                    <div>
                      <label className="font-heading text-xs sm:text-[12.5px] font-semibold text-[#071739] mb-1 block">
                        Job Title *
                      </label>
                      <input
                        type="text"
                        placeholder="Chief Information Security Officer"
                        value={profile.title}
                        onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                        className={`w-full bg-[#f8f9fa] border rounded-lg px-3 py-2 text-sm text-[#232223] placeholder:text-[#808080] focus:outline-none focus:border-[#c88a3e] focus:bg-white transition-all ${
                          errors1.title ? 'border-red-500' : 'border-[#D7D7D7]'
                        }`}
                      />
                      {errors1.title && <p className="text-red-600 text-xs mt-0.5 font-heading">{errors1.title}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="font-heading text-xs sm:text-[12.5px] font-semibold text-[#071739] mb-1 block">
                        Organisation *
                      </label>
                      <input
                        type="text"
                        placeholder="State Bank / Enterprise Corp"
                        value={profile.company}
                        onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                        className={`w-full bg-[#f8f9fa] border rounded-lg px-3 py-2 text-sm text-[#232223] placeholder:text-[#808080] focus:outline-none focus:border-[#c88a3e] focus:bg-white transition-all ${
                          errors1.company ? 'border-red-500' : 'border-[#D7D7D7]'
                        }`}
                      />
                      {errors1.company && <p className="text-red-600 text-xs mt-0.5 font-heading">{errors1.company}</p>}
                    </div>

                    <div>
                      <label className="font-heading text-xs sm:text-[12.5px] font-semibold text-[#071739] mb-1 block">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        placeholder="arjun@enterprise.in"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className={`w-full bg-[#f8f9fa] border rounded-lg px-3 py-2 text-sm text-[#232223] placeholder:text-[#808080] focus:outline-none focus:border-[#c88a3e] focus:bg-white transition-all ${
                          errors1.email ? 'border-red-500' : 'border-[#D7D7D7]'
                        }`}
                      />
                      {errors1.email && <p className="text-red-600 text-xs mt-0.5 font-heading">{errors1.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="font-heading text-xs sm:text-[12.5px] font-semibold text-[#071739] mb-1 block">
                        Mobile Number *
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={profile.countryCode}
                          onChange={(e) => setProfile({ ...profile, countryCode: e.target.value })}
                          className="bg-[#f8f9fa] border border-[#D7D7D7] rounded-lg px-2.5 py-2 text-xs sm:text-sm text-[#232223] focus:outline-none focus:border-[#c88a3e] focus:bg-white"
                        >
                          <option value="+91">+91 (IN)</option>
                          <option value="+1">+1 (US)</option>
                          <option value="+44">+44 (UK)</option>
                          <option value="+65">+65 (SG)</option>
                          <option value="+971">+971 (AE)</option>
                          <option value="+81">+81 (JP)</option>
                          <option value="+61">+61 (AU)</option>
                          <option value="+49">+49 (DE)</option>
                        </select>
                        <input
                          type="tel"
                          placeholder="9876543210"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          className={`w-full bg-[#f8f9fa] border rounded-lg px-3 py-2 text-sm text-[#232223] placeholder:text-[#808080] focus:outline-none focus:border-[#c88a3e] focus:bg-white transition-all ${
                            errors1.phone ? 'border-red-500' : 'border-[#D7D7D7]'
                          }`}
                        />
                      </div>
                      {errors1.phone && <p className="text-red-600 text-xs mt-0.5 font-heading">{errors1.phone}</p>}
                    </div>

                    <div>
                      <label className="font-heading text-xs sm:text-[12.5px] font-semibold text-[#071739] mb-1 block">
                        LinkedIn Profile *
                      </label>
                      <input
                        type="url"
                        placeholder="linkedin.com/in/arjun-sharma"
                        value={profile.linkedin}
                        onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                        className={`w-full bg-[#f8f9fa] border rounded-lg px-3 py-2 text-sm text-[#232223] placeholder:text-[#808080] focus:outline-none focus:border-[#c88a3e] focus:bg-white transition-all ${
                          errors1.linkedin ? 'border-red-500' : 'border-[#D7D7D7]'
                        }`}
                      />
                      {errors1.linkedin && <p className="text-red-600 text-xs mt-0.5 font-heading">{errors1.linkedin}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="font-heading text-xs sm:text-[12.5px] font-semibold text-[#071739] mb-1 block">
                      Primary Objective
                    </label>
                    <select
                      value={profile.purpose}
                      onChange={(e) => setProfile({ ...profile, purpose: e.target.value })}
                      className="w-full bg-[#f8f9fa] border border-[#D7D7D7] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#232223] focus:outline-none focus:border-[#c88a3e] focus:bg-white"
                    >
                      <option value="Preparing a post-quantum migration plan">Preparing a post-quantum migration plan</option>
                      <option value="Responding to a regulator or audit mandate">Responding to a regulator or audit mandate (RBI, SEBI, CERT-In)</option>
                      <option value="Building an enterprise cryptographic inventory (CBOM)">Building an enterprise cryptographic inventory (CBOM)</option>
                      <option value="Evaluating vendor software or third-party risk">Evaluating vendor software or third-party risk</option>
                      <option value="Academic research and sovereign security interest">Academic research and sovereign security interest</option>
                    </select>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs text-[#556987] mt-0.5">
                    <input
                      type="checkbox"
                      id="consentCheck"
                      checked={profile.consent}
                      onChange={(e) => setProfile({ ...profile, consent: e.target.checked })}
                      className="mt-0.5 rounded border-[#D7D7D7] text-[#c88a3e] focus:ring-[#c88a3e] accent-[#c88a3e]"
                    />
                    <label htmlFor="consentCheck" className="cursor-pointer leading-snug">
                      I confirm these details are mine and agree that UElement may contact me with this assessment report.
                      Details are handled strictly under UElement’s privacy policy.
                    </label>
                  </div>
                  {errors1.consent && <p className="text-red-600 text-xs font-heading">{errors1.consent}</p>}
                </div>
              )}

              {/* ── STEP 2: 2FA Verification ── */}
              {step === 2 && (
                <div className="flex flex-col gap-3 sm:gap-3.5 max-w-4xl mx-auto w-full">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 p-3 rounded-xl bg-[#c88a3e]/10 border border-[#c88a3e]/30 text-xs">
                    <span className="text-[#071739] font-medium">
                      Want to bypass 2FA? Public website scans require no verification.
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setScanType('url');
                        setStep(3);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#c88a3e] text-white font-semibold hover:bg-[#b0752f] transition-colors shrink-0 cursor-pointer"
                    >
                      Switch to Free URL Scan
                    </button>
                  </div>
                  {/* Email OTP Card */}
                  <div className="p-4 sm:p-4.5 rounded-xl border border-[#c88a3e]/25 bg-[#f8f9fa] shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#556987] mb-2.5">
                      <span>
                        Email code dispatched to: <b className="text-[#071739] font-mono">{profile.email}</b>
                      </span>
                      <span className="font-mono text-xs font-semibold text-[#a86e24] bg-[#c88a3e]/10 px-2.5 py-0.5 rounded border border-[#c88a3e]/30">
                        demo code: {demoCodes.email}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="000000"
                        disabled={verified.email}
                        value={otpInputs.email}
                        onChange={(e) => setOtpInputs({ ...otpInputs, email: e.target.value.replace(/\D/g, '') })}
                        className="w-32 sm:w-36 bg-white border border-[#D7D7D7] rounded-lg px-3 py-1.5 text-center font-mono text-sm tracking-widest text-[#071739] focus:outline-none focus:border-[#c88a3e] disabled:opacity-50"
                      />
                      {!verified.email ? (
                        <button
                          onClick={() => handleVerifyOtp('email')}
                          className="btn btn-line btn-sm cursor-pointer !inline-flex items-center justify-center whitespace-nowrap"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            whiteSpace: 'nowrap',
                            color: '#071739',
                            borderColor: '#cbd5e1',
                          }}
                        >
                          Verify Code
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                          <CheckCircle2 className="w-4 h-4 shrink-0" /> Verified
                        </span>
                      )}

                      {!verified.email && (
                        <button
                          onClick={() => handleResendCode('email')}
                          disabled={resendTimers.email > 0}
                          className="text-xs text-[#c88a3e] hover:underline disabled:text-gray-400 cursor-pointer"
                        >
                          {resendTimers.email > 0 ? `Resend in ${resendTimers.email}s` : 'Resend code'}
                        </button>
                      )}
                    </div>
                    {otpErrors.email && (
                      <p className="text-red-600 text-xs mt-1.5 font-heading">
                        Incorrect code. Try entering {demoCodes.email}.
                      </p>
                    )}
                  </div>

                  {/* SMS OTP Card */}
                  <div className="p-4 sm:p-4.5 rounded-xl border border-[#c88a3e]/25 bg-[#f8f9fa] shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#556987] mb-2.5">
                      <span>
                        SMS code dispatched to: <b className="text-[#071739] font-mono">{profile.phone}</b>
                      </span>
                      <span className="font-mono text-xs font-semibold text-[#a86e24] bg-[#c88a3e]/10 px-2.5 py-0.5 rounded border border-[#c88a3e]/30">
                        demo code: {demoCodes.phone}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="000000"
                        disabled={verified.phone}
                        value={otpInputs.phone}
                        onChange={(e) => setOtpInputs({ ...otpInputs, phone: e.target.value.replace(/\D/g, '') })}
                        className="w-32 sm:w-36 bg-white border border-[#D7D7D7] rounded-lg px-3 py-1.5 text-center font-mono text-sm tracking-widest text-[#071739] focus:outline-none focus:border-[#c88a3e] disabled:opacity-50"
                      />
                      {!verified.phone ? (
                        <button
                          onClick={() => handleVerifyOtp('phone')}
                          className="btn btn-line btn-sm cursor-pointer !inline-flex items-center justify-center whitespace-nowrap"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            whiteSpace: 'nowrap',
                            color: '#071739',
                            borderColor: '#cbd5e1',
                          }}
                        >
                          Verify Code
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                          <CheckCircle2 className="w-4 h-4 shrink-0" /> Verified
                        </span>
                      )}

                      {!verified.phone && (
                        <button
                          onClick={() => handleResendCode('phone')}
                          disabled={resendTimers.phone > 0}
                          className="text-xs text-[#c88a3e] hover:underline disabled:text-gray-400 cursor-pointer"
                        >
                          {resendTimers.phone > 0 ? `Resend in ${resendTimers.phone}s` : 'Resend code'}
                        </button>
                      )}
                    </div>
                    {otpErrors.phone && (
                      <p className="text-red-600 text-xs mt-1.5 font-heading">
                        Incorrect code. Try entering {demoCodes.phone}.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* ── STEP 3: Target ── */}
              {step === 3 && (
                <div className="flex flex-col gap-3.5 max-w-4xl mx-auto w-full">
                  {scanType === 'url' && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <span>
                        <strong>Zero friction:</strong>{' '}Public endpoint &amp; TLS diagnostic is 100% free with no account or OTP required.
                      </span>
                    </div>
                  )}

                  {/* Target Type Switcher */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setScanType('url');
                        setTargetConfig((p) => ({ ...p, target: '' }));
                        setTargetError(null);
                      }}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        scanType === 'url'
                          ? 'border-[#c88a3e] bg-[#c88a3e]/10 text-[#071739] shadow-sm'
                          : 'border-[#e2e8f0] bg-[#f8f9fa] text-[#556987] hover:border-[#c88a3e]/40'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Globe className="w-4 h-4 text-[#c88a3e] shrink-0" />
                        <b className="font-heading text-sm text-[#071739]">Website or API Endpoint</b>
                      </div>
                      <span className="text-xs text-[#64748b] block leading-snug">
                        TLS handshakes, cipher negotiation, full certificate chain
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (!verified.email || !verified.phone) {
                          setScanType('repo');
                          setStep(1);
                          triggerFooterMessage('Repository scanning requires corporate identity verification.', false);
                        } else {
                          setScanType('repo');
                          setTargetConfig((p) => ({ ...p, target: '' }));
                          setTargetError(null);
                        }
                      }}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        scanType === 'repo'
                          ? 'border-[#c88a3e] bg-[#c88a3e]/10 text-[#071739] shadow-sm'
                          : 'border-[#e2e8f0] bg-[#f8f9fa] text-[#556987] hover:border-[#c88a3e]/40'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <GitBranch className="w-4 h-4 text-[#c88a3e] shrink-0" />
                        <b className="font-heading text-sm text-[#071739]">Code Repository</b>
                      </div>
                      <span className="text-xs text-[#64748b] block leading-snug">
                        Source AST, dependencies, committed credentials & keystores
                      </span>
                    </button>
                  </div>

                  {/* Target Input */}
                  <div>
                    <label className="font-heading text-xs sm:text-[12.5px] font-semibold text-[#071739] mb-1 block">
                      {scanType === 'repo' ? 'Repository URL *' : 'Target Host / Endpoint URL *'}
                    </label>
                    <input
                      type="text"
                      placeholder={
                        scanType === 'repo'
                          ? 'https://github.com/org/payments-core-service'
                          : 'https://netbanking.yourbank.com'
                      }
                      value={targetConfig.target}
                      onChange={(e) => setTargetConfig({ ...targetConfig, target: e.target.value })}
                      className="w-full bg-[#f8f9fa] border border-[#D7D7D7] rounded-lg px-3.5 py-2 text-sm text-[#071739] font-mono focus:outline-none focus:border-[#c88a3e] focus:bg-white"
                    />
                    {targetError && <p className="text-red-600 text-xs mt-1 font-heading">{targetError}</p>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-heading text-xs sm:text-[12.5px] font-semibold text-[#071739] mb-1 block">
                        Scan Depth
                      </label>
                      <select
                        value={targetConfig.depth}
                        onChange={(e) => setTargetConfig({ ...targetConfig, depth: e.target.value })}
                        className="w-full bg-[#f8f9fa] border border-[#D7D7D7] rounded-lg px-3 py-2 text-xs text-[#071739] focus:outline-none focus:border-[#c88a3e]"
                      >
                        {scanType === 'repo' ? (
                          <>
                            <option value="standard">Standard: default branch</option>
                            <option value="deep">Deep: all branches & history</option>
                            <option value="single">Manifests & direct dependencies only</option>
                          </>
                        ) : (
                          <>
                            <option value="standard">Standard: target & primary hostnames</option>
                            <option value="deep">Deep: discovered subdomains & CT logs</option>
                            <option value="single">Single host endpoint only</option>
                          </>
                        )}
                      </select>
                    </div>

                    <div>
                      <label className="font-heading text-xs sm:text-[12.5px] font-semibold text-[#071739] mb-1 block">
                        Data Retention Horizon
                      </label>
                      <select
                        value={targetConfig.retention}
                        onChange={(e) => setTargetConfig({ ...targetConfig, retention: parseInt(e.target.value, 10) })}
                        className="w-full bg-[#f8f9fa] border border-[#D7D7D7] rounded-lg px-3 py-2 text-xs text-[#071739] focus:outline-none focus:border-[#c88a3e]"
                      >
                        <option value={5}>5 years (standard operational data)</option>
                        <option value={8}>8 years (corporate & regulatory records)</option>
                        <option value={12}>12 years (financial & health archives)</option>
                        <option value={20}>20 years or more (national sovereign secrets)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs text-[#556987]">
                    <input
                      type="checkbox"
                      id="authCheck"
                      checked={targetConfig.authorized}
                      onChange={(e) => setTargetConfig({ ...targetConfig, authorized: e.target.checked })}
                      className="mt-0.5 rounded border-[#D7D7D7] text-[#c88a3e] focus:ring-[#c88a3e] accent-[#c88a3e]"
                    />
                    <label htmlFor="authCheck" className="cursor-pointer leading-snug">
                      I own this target or am explicitly authorized to have it assessed. I understand Vyuh performs
                      read-only, non-invasive cryptographic inspection only.
                    </label>
                  </div>
                </div>
              )}

              {/* ── STEP 4: Scanning In Progress ── */}
              {step === 4 && (
                <div className="py-4 max-w-4xl mx-auto w-full">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-heading font-bold text-[#071739] text-xl">
                      {scanType === 'repo' ? 'Analyzing Codebase & Dependencies' : 'Probing Target Endpoints'}
                    </h4>
                    <span className="font-mono text-xs text-[#a86e24] font-semibold">
                      Stage {scanStageIndex + 1} of {SCAN_STAGES[scanType].length}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-[#64748b] mb-6 truncate">{targetConfig.target}</p>

                  <div className="space-y-3 font-mono text-xs mb-6">
                    {SCAN_STAGES[scanType].map((stage, idx) => {
                      const isComplete = idx < scanStageIndex;
                      const isCurrent = idx === scanStageIndex;
                      return (
                        <div
                          key={idx}
                          className={`flex items-center gap-3 transition-all ${
                            isComplete
                              ? 'text-[#071739] font-medium'
                              : isCurrent
                                ? 'text-[#071739] font-bold'
                                : 'text-gray-400 opacity-60'
                          }`}
                        >
                          {isComplete ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : isCurrent ? (
                            <RefreshCw className="w-4 h-4 text-[#c88a3e] animate-spin shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-gray-300 shrink-0" />
                          )}
                          <span>{stage}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Gradient Progress Bar */}
                  <div className="h-2 w-full bg-black/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#c88a3e] via-[#e0a769] to-[#10b981] transition-all duration-300 rounded-full"
                      style={{
                        width: `${Math.round(((scanStageIndex + 1) / SCAN_STAGES[scanType].length) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* ── STEP 5: Results Dashboard ── */}
              {step === 5 && results && (
                <div>
                  {/* Top Score Summary Banner */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-5 rounded-2xl border border-[#e2e8f0] bg-[#f8f9fa] mb-6 shadow-sm">
                    <div className="relative w-24 h-24 shrink-0">
                      <svg className="w-24 h-24 -rotate-90" viewBox="0 0 112 112">
                        <circle cx="56" cy="56" r="47" fill="none" stroke="#e2e8f0" strokeWidth="9" />
                        <circle
                          cx="56"
                          cy="56"
                          r="47"
                          fill="none"
                          stroke={
                            results.score < 40 ? '#e2604a' : results.score < 70 ? '#f5c116' : '#10b981'
                          }
                          strokeWidth="9"
                          strokeLinecap="round"
                          strokeDasharray={295.3}
                          strokeDashoffset={295.3 - (295.3 * resScoreDisplay) / 100}
                          style={{ transition: 'stroke-dashoffset 1s ease' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center font-heading font-bold text-2xl text-[#071739]">
                        {resScoreDisplay}
                      </div>
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                      <div
                        className="font-heading font-bold text-lg mb-1"
                        style={{
                          color: results.score < 40 ? '#dc2626' : results.score < 70 ? '#d97706' : '#059669',
                        }}
                      >
                        {results.band}
                      </div>
                      <div className="font-mono text-xs text-[#071739] font-semibold break-all">{results.target}</div>
                      <p className="text-xs text-[#556987] mt-2 leading-relaxed">
                        {results.stats.broken} of {results.stats.total} cryptographic assets fall to Shor’s algorithm,
                        assessed across a {results.retention}-year data retention horizon.
                      </p>
                    </div>
                  </div>

                  {/* 4 KPI Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    <div className="p-4 rounded-xl border border-[#e2e8f0] bg-white shadow-sm">
                      <b className="block text-2xl font-heading font-bold text-[#071739]">{results.stats.total}</b>
                      <span className="text-[11px] text-[#64748b]">Total Crypto Assets</span>
                    </div>
                    <div className="p-4 rounded-xl border border-red-200 bg-red-50/60 shadow-sm">
                      <b className="block text-2xl font-heading font-bold text-red-600">{results.stats.broken}</b>
                      <span className="text-[11px] text-red-700">Breakable by Shor</span>
                    </div>
                    <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 shadow-sm">
                      <b className="block text-2xl font-heading font-bold text-amber-600">{results.stats.weak}</b>
                      <span className="text-[11px] text-amber-700">Halved by Grover</span>
                    </div>
                    <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/60 shadow-sm">
                      <b className="block text-2xl font-heading font-bold text-emerald-600">{results.stats.safe}</b>
                      <span className="text-[11px] text-emerald-700">Quantum-Safe Today</span>
                    </div>
                  </div>

                  {/* Tabs Navigation */}
                  <div className="flex border-b border-[#e2e8f0] mb-4 gap-1 overflow-x-auto text-xs font-heading">
                    <button
                      onClick={() => setActiveTab('cbom')}
                      className={`py-2.5 px-4 font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                        activeTab === 'cbom'
                          ? 'border-[#c88a3e] text-[#071739] font-bold'
                          : 'border-transparent text-[#64748b] hover:text-[#071739]'
                      }`}
                    >
                      Cryptographic Inventory (CBOM)
                    </button>
                    <button
                      onClick={() => setActiveTab('findings')}
                      className={`py-2.5 px-4 font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                        activeTab === 'findings'
                          ? 'border-[#c88a3e] text-[#071739] font-bold'
                          : 'border-transparent text-[#64748b] hover:text-[#071739]'
                      }`}
                    >
                      Findings & Vulnerabilities ({results.findings.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('plan')}
                      className={`py-2.5 px-4 font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                        activeTab === 'plan'
                          ? 'border-[#c88a3e] text-[#071739] font-bold'
                          : 'border-transparent text-[#64748b] hover:text-[#071739]'
                      }`}
                    >
                      Migration Roadmap
                    </button>
                    <button
                      onClick={() => setActiveTab('detail')}
                      className={`py-2.5 px-4 font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                        activeTab === 'detail'
                          ? 'border-[#c88a3e] text-[#071739] font-bold'
                          : 'border-transparent text-[#64748b] hover:text-[#071739]'
                      }`}
                    >
                      Scan Detail
                    </button>
                  </div>

                  {/* Tab 1: CBOM Table */}
                  {activeTab === 'cbom' && (
                    <div className="overflow-x-auto max-h-80 overflow-y-auto border border-[#e2e8f0] rounded-xl">
                      <table className="w-full text-left text-xs text-[#334155]">
                        <thead className="sticky top-0 bg-[#f1f5f9] text-[11px] font-heading font-semibold text-[#475569] uppercase">
                          <tr>
                            <th className="py-2.5 px-3">Asset</th>
                            <th className="py-2.5 px-3">Primitive</th>
                            <th className="py-2.5 px-3">Purpose</th>
                            <th className="py-2.5 px-3">Verdict</th>
                            <th className="py-2.5 px-3">Target Standard</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#e2e8f0]">
                          {results.cbom.map((item, idx) => (
                            <tr key={idx} className="hover:bg-[#f8f9fa]">
                              <td className="py-2.5 px-3 text-[#071739] font-semibold">{item.asset}</td>
                              <td className="py-2.5 px-3 font-mono text-[#0f172a]">{item.primitive}</td>
                              <td className="py-2.5 px-3 text-[#64748b]">{item.purpose}</td>
                              <td className="py-2.5 px-3">
                                {item.verdict === 'broken' && (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-red-50 text-red-700 border border-red-200">
                                    Broken (Shor)
                                  </span>
                                )}
                                {item.verdict === 'weak' && (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                                    Weakened (Grover)
                                  </span>
                                )}
                                {item.verdict === 'safe' && (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    Quantum-Safe
                                  </span>
                                )}
                              </td>
                              <td className="py-2.5 px-3 font-mono text-[#a86e24] font-semibold">{item.replacement}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="p-3 text-[11px] text-[#64748b] border-t border-[#e2e8f0] bg-[#f8f9fa]">
                        Plus {results.stats.total - results.cbom.length} further assets itemized in the downloadable PDF
                        and CycloneDX 1.6 export.
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Findings */}
                  {activeTab === 'findings' && (
                    <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                      {results.findings.map((f, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-xl border text-xs shadow-sm ${
                            f.sev === 'critical'
                              ? 'border-red-200 bg-red-50/50'
                              : f.sev === 'high'
                                ? 'border-orange-200 bg-orange-50/50'
                                : f.sev === 'medium'
                                  ? 'border-amber-200 bg-amber-50/50'
                                  : 'border-blue-200 bg-blue-50/50'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                f.sev === 'critical'
                                  ? 'bg-red-100 text-red-800'
                                  : f.sev === 'high'
                                    ? 'bg-orange-100 text-orange-800'
                                    : f.sev === 'medium'
                                      ? 'bg-amber-100 text-amber-800'
                                      : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {f.sev}
                            </span>
                            <h5 className="font-heading font-bold text-[#071739] text-sm">{f.title}</h5>
                          </div>
                          <p className="text-[#334155] mb-2 leading-relaxed">{f.detail}</p>
                          <div className="text-[11px] text-[#64748b]">
                            <b className="text-[#071739]">Recommended Action:</b> {f.fix} ·{' '}
                            <span className="text-[#071739] font-mono font-semibold">[{f.std}]</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tab 3: Migration Roadmap */}
                  {activeTab === 'plan' && (
                    <div className="space-y-3.5 max-h-80 overflow-y-auto pr-1">
                      {results.plan.map((p, idx) => (
                        <div key={idx} className="p-4 rounded-xl border border-[#e2e8f0] bg-[#f8f9fa] shadow-sm">
                          <span className="font-heading font-bold text-xs text-[#a86e24] block mb-1">{p.phase}</span>
                          <h5 className="font-heading font-bold text-[#071739] text-sm mb-1">{p.title}</h5>
                          <p className="text-xs text-[#556987] leading-relaxed">{p.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tab 4: Scan Detail */}
                  {activeTab === 'detail' && (
                    <div className="max-h-80 overflow-y-auto border border-[#e2e8f0] rounded-xl">
                      <table className="w-full text-left text-xs">
                        <tbody className="divide-y divide-[#e2e8f0]">
                          {results.detail.map(([k, v], idx) => (
                            <tr key={idx} className="hover:bg-[#f8f9fa]">
                              <td className="py-2.5 px-3 text-[#64748b] w-1/2">{k}</td>
                              <td className="py-2.5 px-3 font-mono text-[#071739] font-medium w-1/2">{v}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer matching Contact Us modal */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-3 sm:pt-3.5 border-t border-black/[0.08] mt-3 sm:mt-4 shrink-0">
              <div className="text-12 text-[#64748b] font-body flex items-center gap-1.5 order-2 sm:order-1">
                {step > 1 && step < 4 && !(step === 3 && scanType === 'url') && (
                  <button
                    type="button"
                    onClick={() => {
                      if (step === 3 && scanType === 'repo') {
                        setStep(2);
                      } else {
                        setStep(step - 1);
                      }
                    }}
                    className="btn btn-ghost btn-sm cursor-pointer mr-2 !inline-flex items-center justify-center whitespace-nowrap"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      whiteSpace: 'nowrap',
                      color: '#071739',
                      borderColor: '#cbd5e1',
                    }}
                  >
                    Back
                  </button>
                )}
                {step === 5 && (
                  <button
                    type="button"
                    onClick={() => {
                      setStep(3);
                      setTargetConfig((p) => ({ ...p, target: '' }));
                    }}
                    className="btn btn-ghost btn-sm cursor-pointer mr-2 !inline-flex items-center justify-center whitespace-nowrap"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      whiteSpace: 'nowrap',
                      color: '#071739',
                      borderColor: '#cbd5e1',
                    }}
                  >
                    Scan Another Target
                  </button>
                )}
                <span className={footerMsg?.isError ? 'text-red-600 font-medium' : 'text-[#64748b]'}>
                  {footerMsg ? footerMsg.text : step === 5 ? 'CycloneDX 1.6 CBOM ready' : 'Free · No credit card required'}
                </span>
              </div>

              <div className="flex items-center gap-3 order-1 sm:order-2 w-full sm:w-auto justify-end">
                {step === 1 && (
                  <button
                    type="button"
                    onClick={handleProceedFromStep1}
                    className="btn btn-gold cursor-pointer w-full sm:w-auto !inline-flex items-center justify-center gap-2 whitespace-nowrap"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      whiteSpace: 'nowrap',
                      gap: '8px',
                      minHeight: '42px',
                    }}
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                )}

                {step === 2 && (
                  <button
                    type="button"
                    onClick={handleProceedFromStep2}
                    className="btn btn-gold cursor-pointer w-full sm:w-auto !inline-flex items-center justify-center gap-2 whitespace-nowrap"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      whiteSpace: 'nowrap',
                      gap: '8px',
                      minHeight: '42px',
                    }}
                  >
                    <span>Continue to Target</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                )}

                {step === 3 && (
                  <button
                    type="button"
                    onClick={handleStartScan}
                    className="btn btn-gold cursor-pointer w-full sm:w-auto !inline-flex items-center justify-center gap-2 whitespace-nowrap"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      whiteSpace: 'nowrap',
                      gap: '8px',
                      minHeight: '42px',
                    }}
                  >
                    <span>Start Diagnostic Scan</span>
                    <Shield className="w-4 h-4 shrink-0" />
                  </button>
                )}

                {step === 5 && (
                  <>
                    <button
                      type="button"
                      onClick={exportCycloneDX}
                      className="btn btn-ghost btn-sm cursor-pointer text-xs !inline-flex items-center justify-center gap-2 whitespace-nowrap"
                      title="Download CycloneDX 1.6 JSON CBOM"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        whiteSpace: 'nowrap',
                        gap: '6px',
                        color: '#071739',
                        borderColor: '#cbd5e1',
                      }}
                    >
                      <FileCode className="w-3.5 h-3.5 text-[#a86e24] shrink-0" />
                      <span>CycloneDX JSON</span>
                    </button>
                    <button
                      type="button"
                      onClick={downloadPDFReport}
                      className="btn btn-gold btn-sm cursor-pointer text-xs !inline-flex items-center justify-center gap-2 whitespace-nowrap"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        whiteSpace: 'nowrap',
                        gap: '6px',
                      }}
                      title="Download formal PDF assessment report"
                    >
                      <Download className="w-3.5 h-3.5 shrink-0" />
                      <span>Download Report (PDF)</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
