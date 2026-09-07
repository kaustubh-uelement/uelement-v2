import type {
  CaseStudy,
  Publication,
  SuccessStory,
  Industry,
  Program,
  Deployment,
  PublicationKind,
} from './types';

export type {
  Program,
  Industry,
  Deployment,
  PublicationKind,
  ProductKey,
  CaseStudy,
  Publication,
  SuccessStory,
} from './types';

/* ---------------------------------------------------------------- labels */

export const PROGRAM_LABEL: Record<Program, string> = {
  adviq: 'AdviQ',
  stambh: 'StamBH',
  tripura: 'TRIpura',
};

export const INDUSTRY_LABEL: Record<Industry, string> = {
  defence: 'Defence & Aerospace',
  bfsi: 'Banking & Financial Services',
  manufacturing: 'Manufacturing & Industrial OT',
  government: 'Government & Public Sector',
  healthcare: 'Healthcare & Pharma',
  datacenter: 'Datacenter & Warehouse',
};

export const DEPLOYMENT_LABEL: Record<Deployment, string> = {
  airgapped: 'Air-gapped',
  sovereign: 'Sovereign cloud',
  hybrid: 'Hybrid',
  onprem: 'On-premises',
  cloud: 'Public cloud',
};

export const KIND_LABEL: Record<PublicationKind, string> = {
  'peer-reviewed': 'Peer-reviewed',
  preprint: 'Preprint',
  whitepaper: 'Whitepaper',
  'technical-note': 'Technical note',
  standards: 'Standards contribution',
};

/* ---------------------------------------------------------- success stories */

export const successStories: SuccessStory[] = [
  {
    slug: 'tsecond-edge-ai-digital-fabric',
    client: 'Tsecond Inc.',
    cleared: true,
    program: 'stambh',
    products: ['ankura'],
    industry: 'defence',
    deployment: 'hybrid',
    figure: '78%',
    figureCaption:
      'faster talent qualification cycle and zero cross-border catalog discrepancies',
    headline:
      'Tsecond deployed a dual-region digital web fabric with country-aware display and driver distribution',
    summary:
      'Scaling BRYCK edge storage and AI compute across US defense contractors and Indian enterprises required distinct regional experiences, strict catalog segregation, and reliable hardware firmware delivery. Ankura unified Tsecond’s global web presence: adding geo-selective content delivery, an automated ATS candidate ranking portal, a cryptographically verified driver repository, and a centralized media pool that eliminated duplicate assets.',
    tags: [
      'Geo-aware display',
      'Driver portal',
      'ATS candidate ranking',
      'Unified media pool',
    ],
    quote: {
      text: 'We engineer edge hardware that operates without excuses. Ankura gave our web presence the same rigor — our US defense partners and Indian commercial clients see exactly what is relevant to their jurisdiction, our drivers are distributed reliably, and our engineering hiring pipeline runs on autopilot.',
      attribution: 'Co-founder & Chief Technology Officer, Tsecond Inc.',
    },
    caseStudySlug: 'tsecond-bryck-unified-fabric',
    publishedAt: '2026-09-02',
  },
  {
    slug: 'marma-security-frictionless-onboarding',
    client: 'Marma Security',
    cleared: true,
    program: 'stambh',
    products: ['ankura'],
    industry: 'government',
    deployment: 'hybrid',
    figure: '42',
    figureCaption:
      'currencies supported through a unified global payment engine with dynamic geo-pricing',
    headline:
      'Marma Security scaled global cybersecurity sales with multi-currency checkout and unified media storage',
    summary:
      'Marma Security brings automated, network-level AI protection to enterprises, SMBs, and distributed organizations. To eliminate international purchasing friction and accelerate sales across 40+ countries, Ankura upgraded Marma’s web platform with a unified global payment engine featuring automated currency conversion and dynamic geo-pricing, an integrated cybersecurity career portal, a threat-intelligence blog engine, and a centralized media storage pool.',
    tags: [
      'Dynamic geo-pricing',
      'Global payment gateway',
      'Multi-currency checkout',
      'Unified media pool',
    ],
    quote: {
      text: 'Our platform stands for radical simplicity. Before Ankura, buying our security appliances internationally involved manual quotes and currency friction. Now, a buyer in London, Tokyo, or Mumbai sees localized pricing in their currency, checks out seamlessly, and receives their appliance tracking in minutes.',
      attribution: 'Head of Product & Operations, Marma Security',
    },
    caseStudySlug: 'marma-cybersecurity-digital-fabric',
    publishedAt: '2026-08-18',
  },
  {
    slug: 'payment-core-retires-rsa',
    client: 'A scheduled commercial bank',
    cleared: false,
    program: 'adviq',
    products: ['pqc', 'crypto-agility'],
    industry: 'bfsi',
    deployment: 'hybrid',
    figure: '11 mo',
    figureCaption:
      'from cryptographic discovery to first production PQC handshake',
    headline:
      'A scheduled commercial bank retired RSA from its payment core before the regulator asked',
    summary:
      'The bank held 41,000 certificates it could not enumerate and no owner for two-thirds of them. AdviQ built the cryptographic bill of materials, ranked every asset by harvest-now-decrypt-later exposure, and ran hybrid ML-KEM alongside classical key exchange on the UPI switch for a full quarter before cutover.',
    tags: [
      '41,000 certificates',
      'RBI quantum-safe direction',
      'Zero payment downtime',
    ],
    quote: {
      text: 'We stopped arguing about whether the quantum threat was real once we could see how much of our estate would fail an inventory question.',
      attribution: 'Head of Information Security',
    },
    caseStudySlug: 'hybrid-pqc-upi-switch',
    publishedAt: '2026-08-14',
  },
  {
    slug: 'plant-floor-zero-blind-spots',
    client: 'A speciality chemicals manufacturer',
    cleared: false,
    program: 'stambh',
    products: ['vizor'],
    industry: 'manufacturing',
    deployment: 'hybrid',
    figure: '0',
    figureCaption:
      'blind spots remaining across Purdue Levels 0–3 at the pilot plant',
    headline:
      'A speciality chemicals maker saw its plant floor and its ERP on one topology for the first time',
    summary:
      'Two teams, two toolchains, and a five-hour mean time to identify anything that crossed the IT/OT boundary. Vizor was deployed passively at Levels 0–2 — no agents, no active polling, no change to the safety case — and correlated batch anomalies against the MES and SAP layers above.',
    tags: [
      '45-day proof of value',
      'Modbus · PROFINET · OPC-UA',
      'MTTI 5 h → 11 min',
    ],
    quote: {
      text: 'The passive-by-architecture point was what got it past our process safety review. Nothing we deployed can write to a controller.',
      attribution: 'Plant Automation Lead',
    },
    caseStudySlug: 'passive-observability-purdue',
    publishedAt: '2026-07-02',
  },
  {
    slug: 'seventy-two-hours-denied',
    client: 'A forward-deployed unit',
    cleared: false,
    program: 'tripura',
    products: ['merlinos', 'mesogrid', 'mustangc3'],
    industry: 'defence',
    deployment: 'airgapped',
    figure: '72 h',
    figureCaption:
      'continuous autonomous operation with the satellite uplink deliberately severed',
    headline:
      'A forward unit kept its sensor fusion running through three days of denied communications',
    summary:
      'The exercise brief was blunt: assume the link is gone and the cloud is unreachable. MerlinOS ran inference at the node, MesoGRID re-formed the mesh each time a hop dropped, and MustangC3 held the command picture locally. When the link returned, state reconciled without operator intervention.',
    tags: ['DDIL exercise', 'Air-gapped', 'ITAR-free'],
    quote: {
      text: 'Every vendor tells you they work at the edge. This one worked when we cut the edge off.',
      attribution: 'Exercise Directing Staff',
    },
    caseStudySlug: 'seventy-two-hours-denied-network',
    publishedAt: '2026-05-20',
  },
  {
    slug: 'colocation-metered-services',
    client: 'A colocation operator',
    cleared: false,
    program: 'stambh',
    products: ['kayak'],
    industry: 'datacenter',
    deployment: 'hybrid',
    figure: '340',
    figureCaption:
      'racks moved to metered, blockchain-verified service billing in one quarter',
    headline:
      'A colocation operator started billing power, space and hardware the way clouds bill compute',
    summary:
      'Capacity was sold on spreadsheets and reconciled by argument. Kayak instrumented the physical estate — rack units, PDU draw, hardware lifecycle, movement — and turned each into a metered service with a tamper-evident record both operator and tenant could read.',
    tags: ['Everything as a Service', 'Disputed invoices −86%'],
    quote: {
      text: 'Billing disputes used to take our account managers a week each. Now the tenant reads the same ledger we do.',
      attribution: 'Director of Operations',
    },
    publishedAt: '2026-04-08',
  },
  {
    slug: 'audit-season-becomes-a-query',
    client: 'A state digital services agency',
    cleared: false,
    program: 'stambh',
    products: ['vizor'],
    industry: 'government',
    deployment: 'sovereign',
    figure: '6 h',
    figureCaption:
      'CERT-In incident reporting window met from detection to filed report',
    headline:
      'A state digital services agency turned audit season into a query',
    summary:
      'Evidence used to be reconstructed after the fact by four people over three weeks. Vizor generates it as operational exhaust: every access, config change and data movement is written once, signed, and retained. Compliance stopped being a project and became a report.',
    tags: ['Sovereign cloud', 'CERT-In', 'DPDP'],
    quote: {
      text: 'We used to prepare for audits. Now we answer them.',
      attribution: 'Chief Information Officer',
    },
    publishedAt: '2026-03-11',
  },
];

/* ------------------------------------------------------------- case studies */

export const caseStudies: CaseStudy[] = [
  {
    slug: 'tsecond-bryck-unified-fabric',
    reference: 'UE-CS-2026-015',
    program: 'stambh',
    products: ['ankura'],
    industry: 'defence',
    deployment: 'hybrid',
    title:
      'Dual-region web presence with country-aware catalog routing, driver delivery, and ATS recruitment',
    standfirst:
      'How Tsecond leveraged StamBH Ankura to deploy a high-performance web fabric featuring selective US/India geo-display, a secure hardware driver download portal, algorithmic ATS applicant ranking, and unified asset storage.',
    spine: {
      situation:
        'A dual-continent footprint in San Jose and Bengaluru created regional content overlap, unvetted candidate backlogs, unverified driver downloads, and fragmented media storage.',
      intervention:
        'Deployed StamBH Ankura to deliver edge-level country-specific page display, a versioned hardware driver distribution portal, an embedded ATS ranking engine, and a unified media asset repository.',
      result:
        'Technical hiring turnaround fell by 78%, driver verification failures dropped to zero, media storage overhead fell by 64%, and SEO visibility doubled.',
    },
    metrics: [
      {
        value: '78%',
        label:
          'Reduction in engineering hiring review time via automated ATS scoring',
      },
      {
        value: '0',
        label:
          'Cross-border compliance discrepancies through edge geo-aware display',
      },
      {
        value: '64%',
        label:
          'Reduction in media storage overhead via unified deduplicated asset pool',
      },
      {
        value: '100%',
        label: 'Cryptographically verified driver & firmware package delivery',
      },
    ],
    facts: [
      { key: 'Program', value: 'StamBH · Ankura' },
      {
        key: 'Client',
        value: 'Tsecond Inc. (San Jose, CA & Bengaluru, India)',
      },
      {
        key: 'Web Scope',
        value: 'Dual-region corporate website, driver portal, career engine',
      },
      {
        key: 'Core Modules',
        value:
          'Country-wise Display, Driver Repository, ATS Engine, Unified Media DAM',
      },
      {
        key: 'Performance',
        value: '100/100 Core Web Vitals, automated WebP/AVIF compression',
      },
      {
        key: 'Security & SEO',
        value:
          'Edge Geo-DNS, SHA-256 Checksums, JSON-LD Schema, Dynamic OpenGraph',
      },
    ],
    sections: [
      {
        heading: 'The situation',
        content: [
          'Tsecond engineers and manufactures the BRYCK platform — a hyperconverged, ruggedized edge system that packs up to one petabyte of high-speed NVMe storage and over 1,600 TOPS of AI inferencing into an ultra-dense chassis weighing under fifteen pounds. While the physical hardware established new benchmarks in Size, Weight, and Power (SWaP) efficiency, Tsecond’s digital web presence struggled with the operational friction of running a dual-continent business.',
          'With commercial and defense operations based in San Jose, California, and primary engineering facilities in Bengaluru, India, Tsecond’s corporate website had to cater to two fundamentally different markets. Defense procurement officers and aerospace integrators in the United States required ITAR-aligned capability summaries, federal certifications, and tactical specs. Meanwhile, Indian aerospace and commercial enterprise clients required sovereign storage solutions and local technical documentation. Without geo-specific presentation, product visibility overlapped, risking compliance confusion.',
          'Simultaneously, distributed drone operators, field engineers, and partner integrators had no centralized, authoritative repository to download OS-specific drivers, kernel modules, and firmware patches. Furthermore, an influx of worldwide engineering applications was arriving through generic web forms, overwhelming hiring managers without structured evaluation, while unoptimized 3D CAD renders and product photography bloated page load times.',
        ],
      },
      {
        heading: 'What constrained the design',
        content: [
          'Architecting a unified digital web fabric for a high-security defense hardware manufacturer required adhering to rigid technical boundaries:',
        ],
        bullets: [
          'Strict segregation ensuring defense configurations visible to US visitors are not inadvertently exposed on Indian commercial routes, without managing two disconnected codebases.',
          'Cryptographic integrity for hardware drivers: field personnel operating in remote testbeds require verified OS kernel drivers and PCIe acceleration packages with deterministic SHA-256 validation.',
          'Automated talent filtering: technical applicant resumes for embedded C++, PCIe Gen5, and thermal architecture roles had to be parsed and scored prior to human review.',
          'Single-pool media asset management: hundreds of gigabytes of CAD diagrams, hardware photography, and documentation assets needed centralized deduplication to eliminate broken links and multiple hosting fees.',
        ],
      },
      {
        heading: 'What we deployed',
        content: [
          'Tsecond deployed StamBH Ankura as its unified enterprise web fabric, implementing four interconnected modules.',
          'Country-Aware Routing & Selective Display: Using edge geo-IP inspection at the CDN layer, Ankura dynamically tailors navigation menus, product showcases, and compliance collateral based on the visitor’s geographic region. US visitors access defense-ready BRYCK Block configurations and ITAR-relevant solutions, while Indian visitors are presented with commercial enterprise data-transport platforms — all managed seamlessly from a single content model without redirects or duplicate site instances.',
          'Cryptographic Driver & Firmware Distribution Portal: Built an authenticated, version-controlled driver repository categorized by operating system (Linux kernel trees, RTOS), host architecture (x86_64, ARM64), and hardware revision. Each package includes deterministic SHA-256 checksums, automated installation scripts, and release changelogs, eliminating corrupted field deployments.',
          'Embedded Career Platform with ATS Candidate Ranking: Deployed an automated recruitment workflow where engineering candidates submit credentials directly on-site. Ankura parses incoming resumes, extracts specialized technical proficiencies (e.g., PCIe drivers, low-SWaP design, hardware clearance), and assigns an algorithmic ATS match score, routing top-percentile candidates straight to San Jose and Bengaluru engineering leads.',
          'Unified Media Storage Pool: Consolidated all CAD renders, hardware photography, benchmark graphics, and PDF whitepapers into Ankura’s centralized media pool. The storage service applies content-addressable deduplication, automated WebP/AVIF compression, dynamic resolution srcsets, and aggressive edge CDN caching, slashing page weights by sixty-four percent.',
          'Technical Editorial & SEO Substrate: Integrated a high-performance engineering blog engine featuring syntax highlighting, dynamic OpenGraph card generation, and comprehensive JSON-LD schema markup for hardware products, elevating organic search rank across defense and edge-computing keywords.',
        ],
      },
      {
        heading: 'What it cost to run',
        content: [
          'Retiring separate regional CMS plugins, third-party ATS subscriptions, and unmanaged cloud storage buckets into Ankura reduced monthly SaaS expenses by more than half. Edge caching and automated asset optimization brought First Contentful Paint (FCP) under 600 milliseconds worldwide.',
        ],
      },
      {
        heading: 'Where it stands now',
        content: [
          'Tsecond operates a unified, single-codebase web fabric serving both North American defense partners and Indian commercial enterprises. Driver downloads execute with 100% hash verification, and the engineering recruitment review cycle was compressed from twenty-four days to under six.',
        ],
      },
    ],
    tags: [
      'Country-aware display',
      'Driver portal',
      'ATS ranking',
      'Unified media DAM',
    ],
    durationMonths: 5,
    relatedStorySlug: 'tsecond-edge-ai-digital-fabric',
    publishedAt: '2026-09-02',
  },
  {
    slug: 'marma-cybersecurity-digital-fabric',
    reference: 'UE-CS-2026-016',
    program: 'stambh',
    products: ['ankura'],
    industry: 'government',
    deployment: 'hybrid',
    title:
      'Global payment orchestration, dynamic geo-pricing, and unified web infrastructure for an AI cybersecurity platform',
    standfirst:
      'How Marma Security deployed StamBH Ankura to deliver automated multi-currency checkout, dynamic purchasing-power pricing, an integrated career portal, and centralized media pooling across global markets.',
    spine: {
      situation:
        'Static pricing in a single currency, manual international sales routing, and fragmented media assets created checkout abandonment and sluggish page loads across 40+ countries.',
      intervention:
        'Integrated Ankura’s global payment orchestration with real-time geo-currency adaptation, unified digital asset storage, a security engineering career portal, and an automated threat intelligence blog.',
      result:
        'International self-serve checkout conversions increased by 3.4x, average checkout completion dropped to under 90 seconds, and page weight decreased by 62%.',
    },
    metrics: [
      {
        value: '42',
        label:
          'Global currencies supported with real-time exchange rate updates',
      },
      {
        value: '3.4x',
        label: 'Increase in international direct checkout conversions',
      },
      {
        value: '< 90 s',
        label:
          'Average time to complete localized hardware and subscription purchase',
      },
      {
        value: '62%',
        label:
          'Reduction in page weight through Ankura’s unified media storage pool',
      },
    ],
    facts: [
      { key: 'Program', value: 'StamBH · Ankura' },
      {
        key: 'Client',
        value: 'Marma Security (Sacramento, CA & Pune, India)',
      },
      {
        key: 'Web Capabilities',
        value:
          'Global Multi-Currency Checkout, Dynamic Geo-Pricing, Careers Engine, Security Blog',
      },
      {
        key: 'Commerce',
        value:
          'Automated Tax Calculation, Local Payment Rails, Invoice Automation',
      },
      {
        key: 'Media Infrastructure',
        value:
          'Single Asset Storage Pool, On-the-fly Image Transformation, CDN Caching',
      },
      {
        key: 'SEO & Compliance',
        value:
          'Dynamic OpenGraph Cards, CSP Header Enforcement, JSON-LD Product Markup',
      },
    ],
    sections: [
      {
        heading: 'The situation',
        content: [
          'Marma Security was founded on a singular premise: redefining cybersecurity through radical simplicity. The company delivers enterprise-grade, network-level protection requiring zero specialized IT staff, powered by autonomous machine learning, Deep Packet Inspection (DPI), and plug-and-play hardware security gateways like SafeBiz and SafeEnterprise.',
          'While Marma’s security appliances were designed for effortless setup, their commercial web infrastructure faced steep global friction. As inbound demand accelerated from over forty countries, prospective customers were confronted with a static pricing matrix locked into a single currency. International enterprise and SMB buyers faced foreign transaction fees, manual currency conversions, and cumbersome wire transfer requests that stalled sales cycles.',
          'Additionally, Marma’s visual identity and technical documentation suffered from asset sprawl: product renders, hardware diagrams, and software screenshots were scattered across independent storage endpoints without compression or deterministic caching, severely degrading Core Web Vitals. OpenGraph social preview cards were inconsistent, and recruitment for specialized security research talent was handled through manual email workflows.',
        ],
      },
      {
        heading: 'What constrained the design',
        content: [
          'Deploying commercial, recruitment, and media infrastructure for an AI cybersecurity company imposed strict design constraints:',
        ],
        bullets: [
          'Global payment compliance: checkout had to accept international credit cards, regional banking rails, and automated tax calculations across forty-two currencies in a single seamless flow without third-party redirection.',
          'Dynamic purchasing-power localization: pricing models had to automatically adapt based on visitor geolocation, showing localized currencies and regional tier discounts while preventing VPN-based arbitrage.',
          'Single-source media reuse: high-resolution appliance mockups and interface diagrams across seven industry verticals needed a unified repository to prevent duplicate asset bloat.',
          'Security header enforcement: strict Content Security Policy (CSP), HTTP Strict Transport Security (HSTS), and cryptographic resource integrity headers had to protect the web presence.',
        ],
      },
      {
        heading: 'What we deployed',
        content: [
          'Marma Security implemented StamBH Ankura to modernize its global web presence and commercial engine.',
          'Unified Global Payment Engine & Dynamic Geo-Pricing: Integrated an enterprise payment orchestration layer directly into Marma’s website. By inspecting incoming geolocation headers, Ankura dynamically displays pricing in forty-two local currencies with real-time exchange rates, applies regional VAT and tax calculations, and provides a frictionless, zero-redirect checkout supporting credit cards, ACH, and automated enterprise invoices.',
          'Centralized Media Storage Pool: Migrated all marketing assets, appliance photography, architecture schematics, and compliance guides into Ankura’s unified media storage service. The pool provides single-point asset reuse across pages, automated WebP/AVIF transcoding, dynamic resolution srcsets, and aggressive edge CDN caching, reducing overall page weight by sixty-two percent.',
          'Cybersecurity Career & Talent Pipeline: Deployed an on-site talent acquisition portal tailored for offensive security researchers, firmware engineers, and enterprise account executives, enabling direct resume submissions and automated candidate routing to hiring leads in Sacramento and Pune.',
          'Threat Intelligence Blog Engine: Built an integrated technical publication system supporting CVE tags, syntax-highlighted incident teardowns, automated RSS feeds, and dynamic OpenGraph social sharing cards.',
          'SEO Architecture & Security Hardening: Rebuilt page metadata with rich JSON-LD schema for security hardware products, enforced strict CSP and HSTS headers, and refined UI styling to embody Marma’s "radical simplicity" principle, achieving 98+ Lighthouse performance scores globally.',
        ],
      },
      {
        heading: 'What it cost to run',
        content: [
          'Consolidating disconnected international payment add-ons, external form services, and disparate asset buckets into Ankura reduced monthly overhead while eliminating manual billing reconciliation.',
          'Average page load times dropped from 3.8 seconds to 1.1 seconds globally.',
        ],
      },
      {
        heading: 'Where it stands now',
        content: [
          'Marma Security now operates a unified global storefront processing transactions in forty-two currencies. Direct international online checkout conversions increased by 3.4x, and marketing teams deploy new vertical campaigns and threat advisories in hours rather than days.',
        ],
      },
    ],
    tags: [
      'Dynamic geo-pricing',
      'Multi-currency checkout',
      'Global payment engine',
      'Unified media DAM',
    ],
    durationMonths: 4,
    relatedStorySlug: 'marma-security-frictionless-onboarding',
    publishedAt: '2026-08-18',
  },
  {
    slug: 'hybrid-pqc-upi-switch',
    reference: 'UE-CS-2026-011',
    program: 'adviq',
    products: ['pqc', 'crypto-agility'],
    industry: 'bfsi',
    deployment: 'hybrid',
    title: 'Hybrid post-quantum key exchange on a live UPI payment switch',
    standfirst:
      'Migrating a tier-1 payment path to ML-KEM without a maintenance window, and proving the classical fallback still holds.',
    spine: {
      situation:
        '41,000 certificates, no authoritative inventory, and a regulator moving from guidance to direction on quantum-safe transition.',
      intervention:
        'CBOM discovery across 1,900 hosts, exposure ranking, then hybrid X25519 + ML-KEM-768 run in shadow for 94 days before cutover.',
      result:
        'Payment core cut over with zero downtime and 3.1 ms added median handshake latency. Rotation drill now runs quarterly.',
    },
    metrics: [
      {
        value: '41k',
        label: 'Certificates discovered and attributed to an owner',
      },
      { value: '94', label: 'Days of shadow traffic before cutover' },
      { value: '3.1 ms', label: 'Added median handshake latency' },
      { value: '0', label: 'Minutes of payment downtime' },
    ],
    facts: [
      { key: 'Program', value: 'AdviQ · PQC' },
      { key: 'Deployment', value: 'Hybrid, on-premises' },
      { key: 'Duration', value: '11 months' },
      { key: 'Estate', value: '1,900 hosts' },
      { key: 'Algorithms', value: 'X25519 + ML-KEM-768' },
      { key: 'Standards', value: 'FIPS 203, RBI direction' },
    ],
    sections: [
      {
        heading: 'The situation',
        content: [
          'The bank could name its certificate authorities but not its certificates. A first-pass inventory built from configuration management data accounted for roughly a third of what was actually in use; the rest lived in application keystores, appliance configurations and one memorable hard-coded constant in a settlement batch job written in 2011.',
          'Regulatory language had shifted from encouragement to expectation, and the internal risk committee had asked a question nobody could answer: which of our long-lived confidential data flows would be readable if the traffic captured today were decrypted in 2032?',
        ],
      },
      {
        heading: 'What constrained the design',
        content: [
          'The payment switch handles millions of transactions daily across critical banking rails. Any architectural intervention had to respect strict operational boundaries:',
        ],
        bullets: [
          'No maintenance window was available on the payment switch. Any change had to be reversible within one request cycle.',
          'Hardware security modules in the settlement path had no post-quantum firmware track and would not for at least two more release cycles.',
          'Several counterparties would remain classical-only for years, so a clean break was never an option.',
          'Every cryptographic change had to produce an audit artefact the regulator could read without a briefing.',
        ],
      },
      {
        heading: 'What we deployed',
        content: [
          'Discovery ran first: passive TLS observation across 1,900 hosts plus static scanning of build artefacts produced a cryptographic bill of materials with an owner, an expiry and an exposure score against every entry. Exposure was scored on data lifetime rather than asset criticality, which reordered the migration queue substantially — several low-tier systems moved to the front because the data they carried stayed sensitive for two decades.',
          'The switch then ran hybrid X25519 with ML-KEM-768 in shadow mode for ninety-four days. Shadow traffic exercised the post-quantum path in full while the classical result remained authoritative, so a failure in the new path could not affect a settlement. Only after two full quarter-end peaks did the hybrid result become authoritative.',
        ],
      },
      {
        heading: 'What it cost to run',
        content: [
          "Median handshake latency rose by 3.1 ms and the 99th percentile by 8.4 ms, comfortably inside the switch's existing budget. Certificate sizes grew enough to matter for the constrained ATM fleet, which was handled by keeping that segment classical for the present and scheduling it against the hardware refresh already funded for the following year.",
        ],
      },
      {
        heading: 'Where it stands now',
        content: [
          'Crypto-agility drills run quarterly: the bank rotates an algorithm in a controlled segment and measures the blast radius. The point is not that ML-KEM is the answer. The point is that the next answer can be adopted without another eleven-month programme.',
        ],
      },
    ],
    tags: ['ML-KEM-768', 'CBOM', 'Crypto-agility'],
    durationMonths: 11,
    relatedStorySlug: 'payment-core-retires-rsa',
    relatedPublicationIds: ['UE-RES-2026-014', 'UE-RES-2026-010'],
    publishedAt: '2026-08-14',
  },
  {
    slug: 'passive-observability-purdue',
    reference: 'UE-CS-2026-009',
    program: 'stambh',
    products: ['vizor'],
    industry: 'manufacturing',
    deployment: 'hybrid',
    title:
      'Passive observability across Purdue Levels 0–3 at a speciality chemicals plant',
    standfirst:
      'Correlating batch anomalies to ERP events without placing a single agent on a controller.',
    spine: {
      situation:
        'Separate IT and OT toolchains, five-hour mean time to identify any cross-boundary fault, and a process safety case that forbade active polling.',
      intervention:
        'Vizor deployed via SPAN taps at Levels 0–2 with 40+ protocol parsers; one topology joined to the MES and SAP layers above.',
      result:
        'MTTI fell from five hours to eleven minutes. The safety review passed on first submission.',
    },
    metrics: [
      { value: '11 min', label: 'Mean time to identify, from five hours' },
      { value: '41', label: 'Industrial protocols parsed passively' },
      { value: '0', label: 'Agents installed on control hardware' },
      { value: '45', label: 'Days from tap to signed proof of value' },
    ],
    facts: [
      { key: 'Program', value: 'StamBH · Vizor' },
      { key: 'Deployment', value: 'On-premises, hybrid egress' },
      { key: 'Duration', value: '45-day proof of value' },
      { key: 'Purdue levels', value: '0–3' },
      { key: 'Protocols', value: 'Modbus/TCP, PROFINET, OPC-UA' },
      { key: 'Safety class', value: 'SIL-3 compliant passive tap' },
    ],
    sections: [
      {
        heading: 'The situation',
        content: [
          'Operating teams at the continuous-synthesis chemicals facility faced constant friction between plant safety and IT observability. Whenever batch deviations occurred, operators took an average of five hours to diagnose whether the root cause originated in control loops, programmable logic controllers, network drops, or upstream MES recipe changes.',
          'Traditional IT agents and active polling scanners were categorically prohibited by plant process safety guidelines, as uncontrolled packets on legacy fieldbuses could induce controller faults or emergency shutdown trips.',
        ],
      },
      {
        heading: 'What constrained the design',
        content: [
          'Industrial control networks have strict deterministic requirements and zero tolerance for jitter:',
        ],
        bullets: [
          'No software or agent could be installed on any Level 0–2 PLC, RTU, or safety instrumented system.',
          'Tapping hardware had to be completely electrically and logically passive with zero ability to inject packets.',
          'Legacy proprietary protocols (Modbus serial, PROFINET RT, proprietary vendor extensions) had to be parsed in real time.',
          'Data egress from the industrial demilitarized zone (IDMZ) had to be strictly unidirectional and encrypted.',
        ],
      },
      {
        heading: 'What we deployed',
        content: [
          'Vizor was connected via optical SPAN taps at the core switch mirrors of Purdue Levels 1 and 2. Operating completely out-of-band, Vizor activated 41 protocol decoders to continuously inspect command-response cycles, timing jitter, register state changes, and session anomalies without sending a single frame onto the operational network.',
          'Extracted telemetry was correlated with MES batch identifiers and SAP transaction logs through an encrypted unidirectional gateway, establishing a unified time-synchronized topology spanning physical reactors to executive dashboards.',
        ],
      },
      {
        heading: 'What it cost to run',
        content: [
          'Mean time to identify (MTTI) cross-boundary anomalies dropped from over 300 minutes to just 11 minutes. The entire deployment passed rigorous internal and third-party process safety audits on the first evaluation cycle.',
        ],
      },
      {
        heading: 'Where it stands now',
        content: [
          'Following the 45-day pilot success, the manufacturer standardizing on Vizor across all four manufacturing facilities nationwide, establishing an automated compliance record aligned with ISA/IEC 62443 requirements.',
        ],
      },
    ],
    tags: ['Purdue model', 'Passive-by-architecture', 'Process safety'],
    relatedStorySlug: 'plant-floor-zero-blind-spots',
    relatedPublicationIds: ['UE-RES-2026-007'],
    publishedAt: '2026-07-02',
  },
  {
    slug: 'seventy-two-hours-denied-network',
    reference: 'UE-CS-2026-006',
    program: 'tripura',
    products: ['merlinos', 'mesogrid', 'mustangc3'],
    industry: 'defence',
    deployment: 'airgapped',
    title: 'Seventy-two hours of autonomy in a deliberately denied network',
    standfirst:
      'Edge inference, mesh re-formation and local command picture with the uplink cut for the duration of the exercise.',
    spine: {
      situation:
        "An exercise brief requiring continuous sensor fusion and tasking with no reachback, on hardware already in the unit's inventory.",
      intervention:
        'MerlinOS for on-node inference, MesoGRID for self-healing mesh transport, MustangC3 holding tasking state locally with deferred reconciliation.',
      result:
        'Zero operator interventions across 72 hours. State reconciled cleanly in under four minutes when the link returned.',
    },
    metrics: [
      { value: '72 h', label: 'Continuous operation with no reachback' },
      { value: '0', label: 'Operator interventions required' },
      { value: '< 4 min', label: 'State reconciliation on link restore' },
      { value: '100%', label: 'Local mission autonomy preserved' },
    ],
    facts: [
      { key: 'Program', value: 'TRIpura' },
      { key: 'Deployment', value: 'Air-gapped, field' },
      { key: 'Environment', value: 'DDIL (Denied, Degraded, Intermittent)' },
      { key: 'Export', value: 'ITAR-free' },
      { key: 'Node compute', value: 'Tactical edge micro-clusters' },
      { key: 'Architecture', value: 'Decentralized CRDT consensus' },
    ],
    sections: [
      {
        heading: 'The situation',
        content: [
          'Field exercises under simulated electronic warfare conditions required deployed reconnaissance units to maintain complete situational awareness and coordinated team decision-making when primary satellite and high-bandwidth long-range RF uplinks were jammed or severed.',
          'Existing commercial and defense cloud-dependent architectures suffered total failure: command consoles froze, local sensor pipelines stalled, and mission coordination broke down when contact with headquarters was lost.',
        ],
      },
      {
        heading: 'What constrained the design',
        content: [
          'Operating in contested environments imposes extreme computing and communications limits:',
        ],
        bullets: [
          'Assumed total loss of cloud reachback for periods ranging from hours to several days.',
          'Hostile electronic warfare and jamming causing ad-hoc network fragmentation and intermittent hops.',
          'Zero ITAR hardware requirements — software stack had to operate on commercial-off-the-shelf sovereign ruggedized silicon.',
          'Strict deterministic recovery when communication channels re-open without state corruption or split-brain conflicts.',
        ],
      },
      {
        heading: 'What we deployed',
        content: [
          'The TRIpura suite was deployed across tactical edge nodes. MerlinOS executed local machine learning inference and sensor classification directly on edge compute. MesoGRID maintained a peer-to-peer resilient wireless mesh that dynamically rerouted whenever terrain or electronic interference dropped a hop.',
          'MustangC3 utilized a decentralized conflict-free replicated data type (CRDT) consensus model with causal ordering. Nodes recorded decisions and mission state locally without waiting for unreachable peers. When satellite connectivity was restored, the distributed mesh synchronized all state changes across 72 hours in 3 minutes and 42 seconds.',
        ],
      },
      {
        heading: 'What it cost to run',
        content: [
          'The system operated continuously throughout the 72-hour simulated denial with zero manual resets or configuration overrides by field personnel.',
        ],
      },
      {
        heading: 'Where it stands now',
        content: [
          'The sovereign TRIpura architecture is now scheduled for validation across multi-domain joint tactical testing exercises.',
        ],
      },
    ],
    tags: ['DDIL', 'Edge autonomy', 'Mesh'],
    relatedStorySlug: 'seventy-two-hours-denied',
    relatedPublicationIds: ['UE-RES-2026-012'],
    publishedAt: '2026-05-20',
  },
  {
    slug: 'serialised-provenance-pharma',
    reference: 'UE-CS-2026-004',
    program: 'stambh',
    products: ['kayak', 'ankura'],
    industry: 'healthcare',
    deployment: 'sovereign',
    title: 'Serialised provenance from fill line to dispensing counter',
    standfirst:
      'A pharmaceutical manufacturer tracking every unit across four contract packers and eleven distributors on one verifiable ledger.',
    spine: {
      situation:
        'Serialisation data lived in four incompatible packer systems; recall simulations took nine days to trace a single lot.',
      intervention:
        'Kayak instrumented the physical chain and wrote custody events to a tamper-evident record; Ankura exposed a partner-facing verification portal.',
      result:
        'Lot trace time fell to under ninety seconds. DPDP and HIPAA evidence generated as a by-product of operation.',
    },
    metrics: [
      { value: '< 90 s', label: 'Lot trace, from nine days' },
      { value: '15', label: 'Partner systems on one custody ledger' },
      { value: '100%', label: 'Verifiable provenance chain' },
      { value: 'Zero', label: 'Disputed cold-chain custody handoffs' },
    ],
    facts: [
      { key: 'Program', value: 'StamBH · Kayak' },
      { key: 'Deployment', value: 'Sovereign cloud' },
      { key: 'Compliance', value: 'DPDP, HIPAA, 21 CFR Part 11' },
      { key: 'Ledger type', value: 'Tamper-evident cryptographically signed' },
      { key: 'Verification speed', value: 'Real-time via mobile & API' },
    ],
    sections: [
      {
        heading: 'The situation',
        content: [
          'A leading healthcare and pharmaceutical producer distributed critical temperature-sensitive medications through four contract packaging organizations (CPOs) and eleven major distributor networks across Southeast Asia and India.',
          'Each stakeholder maintained siloed enterprise software and proprietary scanning systems. When mock product recall drills were initiated, auditing teams took up to nine days of manual email coordination, spreadsheet reconciliation, and phone verifications to locate a target medication lot.',
        ],
      },
      {
        heading: 'What constrained the design',
        content: [
          'Healthcare logistics operate under stringent regulatory mandates and non-negotiable compliance boundaries:',
        ],
        bullets: [
          'Zero shared database access between competing external distributor organizations.',
          'Mandatory compliance with DPDP, HIPAA, and FDA 21 CFR Part 11 data integrity standards.',
          'Variable scanning equipment and legacy barcoding scanners at remote distribution hubs.',
          'Sub-minute verification required for emergency patient dispensing safety checks.',
        ],
      },
      {
        heading: 'What we deployed',
        content: [
          'Kayak was configured to ingest serialisation barcodes and IoT cold-chain sensor events directly at packing line points, signing custody transfer attestations to an immutable cryptographic audit ledger.',
          'Ankura provided lightweight, role-restricted web and mobile interfaces enabling packers, logistics drivers, and hospital pharmacies to scan and affirm custodial receipt with zero technical integration overhead on their proprietary ERP databases.',
        ],
      },
      {
        heading: 'What it cost to run',
        content: [
          'End-to-end lot tracing dropped from nine business days to under ninety seconds. Regulatory compliance packages for Good Distribution Practices (GDP) are now compiled automatically in real time.',
        ],
      },
      {
        heading: 'Where it stands now',
        content: [
          'The platform now monitors over twelve million serialised units annually with zero disputed transit liability claims.',
        ],
      },
    ],
    tags: ['Serialisation', 'Custody ledger', 'Recall readiness'],
    relatedPublicationIds: ['UE-RES-2026-003'],
    publishedAt: '2026-02-19',
  },
];

/* ------------------------------------------------------------- publications */

export const publications: Publication[] = [
  {
    id: 'UE-RES-2026-014',
    slug: 'exposure-lifetime-ranking',
    kind: 'peer-reviewed',
    title:
      'Exposure-lifetime ranking: reordering post-quantum migration by data sensitivity horizon',
    authors: ['S. Malviya', 'U. Wad'],
    externalAuthors: ['S. Prabhudesai', 'U. Sinha'],
    venue: 'IEEE Transactions on Dependable and Secure Computing',
    doi: '10.0000/uelement.2026.014',
    abstract:
      'Migration programmes conventionally sequence cryptographic assets by system criticality. We argue this is the wrong ordering under a harvest-now-decrypt-later threat model, and present a ranking function over data sensitivity lifetime, capture probability and re-key cost. Applied to three production financial estates totalling 5,400 hosts, the resulting order differs from criticality ranking in 38% of the top quartile, and concentrates residual risk in assets that conventional sequencing would have addressed last.',
    pdf: { href: '#', sizeLabel: '1.4 MB' },
    codeHref: 'https://github.com/UElement/exposure-lifetime',
    bibtex: `@article{malviya2026exposure,
  title  = {Exposure-lifetime ranking: reordering post-quantum migration by data sensitivity horizon},
  author = {Malviya, S. and Prabhudesai, S. and Wad, U. and Sinha, U.},
  journal= {IEEE Transactions on Dependable and Secure Computing},
  year   = {2026},
  doi    = {10.0000/uelement.2026.014}
}`,
    program: 'adviq',
    publishedAt: '2026-09-01',
  },
  {
    id: 'UE-RES-2026-012',
    slug: 'deferred-consensus-tactical-mesh',
    kind: 'preprint',
    title:
      'Deferred consensus for tasking state in intermittently partitioned tactical meshes',
    authors: ['K. Narwade', 'S. Sengupta', 'A. Kumar'],
    venue: 'arXiv preprint',
    arxivId: '2607.04412',
    underReview: true,
    abstract:
      'We describe the reconciliation protocol used by MustangC3 to maintain a coherent command picture across mesh partitions lasting hours to days. Rather than blocking on quorum, nodes accept locally-ordered tasking and reconcile through a causal merge with operator-visible conflict surfacing. We report reconciliation behaviour across a 72-hour denied-communications field exercise and characterise the conditions under which manual adjudication becomes necessary.',
    pdf: { href: '#', sizeLabel: '2.1 MB' },
    bibtex: `@misc{narwade2026deferred,
  title        = {Deferred consensus for tasking state in intermittently partitioned tactical meshes},
  author       = {Narwade, K. and Sengupta, S. and Kumar, A.},
  year         = {2026},
  eprint       = {2607.04412},
  archivePrefix= {arXiv},
  primaryClass = {cs.DC}
}`,
    program: 'tripura',
    publishedAt: '2026-07-15',
  },
  {
    id: 'UE-RES-2026-010',
    slug: 'cbom-interchange-comments',
    kind: 'standards',
    title:
      'Comments on cryptographic bill of materials interchange for regulated financial estates',
    authors: ['S. Malviya', 'C. V. Ghate'],
    venue: 'Submitted contribution · working group review',
    abstract:
      'A CBOM is only useful across an organisational boundary if the receiving party can interpret asset ownership and exposure claims without out-of-band context. We propose three additions to the interchange schema covering custody attestation, exposure-lifetime annotation, and a deprecation channel for algorithms withdrawn mid-programme, and discuss migration impact for institutions already producing inventories under the current draft.',
    pdf: { href: '#', sizeLabel: '640 KB' },
    bibtex: `@techreport{malviya2026cbom,
  title      = {Comments on cryptographic bill of materials interchange for regulated financial estates},
  author     = {Malviya, S. and Ghate, C. V.},
  institution= {UElement Technologies Private Limited},
  year       = {2026}
}`,
    program: 'adviq',
    publishedAt: '2026-06-04',
  },
  {
    id: 'UE-RES-2026-007',
    slug: 'passive-by-architecture-coverage',
    kind: 'whitepaper',
    title:
      'Passive-by-architecture monitoring at Purdue Levels 0–2: what it can and cannot see',
    authors: ['U. Wad', 'B. Shrirame', 'N. Randive'],
    venue: 'UElement technical whitepaper, second edition',
    abstract:
      'Passive monitoring is frequently sold as equivalent to active polling with fewer risks. It is not. This paper sets out precisely which OT conditions are observable from mirrored traffic across forty-one industrial protocols, which require an active query and are therefore deliberately outside our scope, and how to reason about the resulting coverage gap during a process safety review rather than after one.',
    pdf: { href: '#', sizeLabel: '3.2 MB' },
    codeHref: 'https://github.com/UElement/ot-protocol-coverage',
    bibtex: `@techreport{wad2026passive,
  title      = {Passive-by-architecture monitoring at Purdue Levels 0--2},
  author     = {Wad, U. and Shrirame, B. and Randive, N.},
  institution= {UElement Technologies Private Limited},
  year       = {2026},
  note       = {Second edition}
}`,
    program: 'stambh',
    publishedAt: '2026-04-22',
  },
  {
    id: 'UE-RES-2026-003',
    slug: 'evidence-as-operational-exhaust',
    kind: 'peer-reviewed',
    title:
      'Evidence as operational exhaust: continuous compliance artefact generation in sovereign deployments',
    authors: ['A. Kumar', 'B. Pancholi'],
    externalAuthors: ['U. Banerjee'],
    venue: 'ACM Digital Threats: Research and Practice',
    doi: '10.0000/uelement.2026.003',
    abstract:
      'Compliance evidence is typically reconstructed retrospectively from logs never designed to serve as evidence. We present an architecture in which attestable artefacts are emitted at the point of action and signed before aggregation, and evaluate storage, verification and retrieval cost against three regulatory regimes with differing retention and reporting-window requirements, including the six-hour CERT-In incident window.',
    pdf: { href: '#', sizeLabel: '1.1 MB' },
    bibtex: `@article{kumar2026evidence,
  title  = {Evidence as operational exhaust: continuous compliance artefact generation in sovereign deployments},
  author = {Kumar, A. and Banerjee, U. and Pancholi, B.},
  journal= {ACM Digital Threats: Research and Practice},
  year   = {2026},
  doi    = {10.0000/uelement.2026.003}
}`,
    program: 'stambh',
    publishedAt: '2026-02-10',
  },
];

/* -------------------------------------------------------------- accessors */

const byDateDesc = <T extends { publishedAt: string }>(a: T, b: T) =>
  b.publishedAt.localeCompare(a.publishedAt);

export const getStories = () => [...successStories].sort(byDateDesc);
export const getStory = (slug: string) =>
  successStories.find((s) => s.slug === slug);

export const getCaseStudies = () => [...caseStudies].sort(byDateDesc);
export const getCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);

export const getPublications = () => [...publications].sort(byDateDesc);
export const getPublication = (slug: string) =>
  publications.find((p) => p.slug === slug);
export const getPublicationsByIds = (ids: string[] = []) =>
  publications.filter((p) => ids.includes(p.id));

export const citationLine = (p: Publication) =>
  [...p.authors, ...(p.externalAuthors ?? [])].join(', ') +
  `. ${p.title}. ${p.venue}, ${new Date(p.publishedAt).getFullYear()}.` +
  (p.doi ? ` doi:${p.doi}` : p.arxivId ? ` arXiv:${p.arxivId}` : '');
