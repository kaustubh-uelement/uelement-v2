// data/careersJobs.js

export const careersJobs = [
  {
    id: 'pqc-migration-engineer',
    title: 'PQC Migration Engineer',
    department: 'U92 Quantum',
    location: 'Pune, India',
    type: 'Full-time',
    status: 'open',
    shortDescription:
      'CBOM tooling, hybrid key exchange, FIPS 203/204/205 rollouts for BFSI estates.',
    aboutRole:
      'You will own the engineering side of U92 PQC migration engagements — building the cryptographic bill-of-materials (CBOM) tooling that discovers every RSA, ECC, and DH exposure across a client estate, then designing and executing the hybrid key-exchange rollout that gets them onto NIST-standardized post-quantum algorithms without breaking production. This is hands-on migration engineering for banks operating under RBI quantum-safe guidance — every line you ship has a countdown clock attached to it.',
    responsibilities: [
      'Build and maintain CBOM discovery tooling across codebases, TLS configs, certificates, and APIs',
      'Design hybrid key-exchange rollouts (e.g. X25519MLKEM768) that stay secure through the classical-to-PQC transition',
      'Map client cryptographic estates to NIST FIPS 203/204/205/206 and produce compliance evidence',
      'Run crack-timeline risk modelling to sequence migration by actual exposure, not guesswork',
      'Work directly with BFSI engineering teams to migrate production systems in phased, reversible steps',
    ],
    requirements: [
      '3+ years of experience in applied cryptography, security engineering, or systems engineering',
      'Working knowledge of TLS, PKI, and public-key cryptography internals (RSA, ECC, DH)',
      'Comfortable reading and instrumenting large, unfamiliar codebases to find crypto usage',
      'Familiarity with NIST PQC standards (ML-KEM, ML-DSA, SLH-DSA) or willingness to go deep fast',
      "Strong written communication — migration plans need to survive an auditor's read",
    ],
    niceToHave: [
      'Prior BFSI or regulated-industry engineering experience',
      'Contributions to open-source crypto libraries or PQC tooling',
    ],
    applyFormUrl: 'https://form.co/YOUR_FORM_ID?role=pqc-migration-engineer',
  },
  {
    id: 'quantum-security-architect',
    title: 'Quantum Security Architect',
    department: 'U92 Quantum',
    location: 'Pune, India',
    type: 'Full-time',
    status: 'open',
    shortDescription:
      'End-to-end quantum-safe architectures across application, network, and storage domains.',
    aboutRole:
      'As Quantum Security Architect, you design the target-state architecture that PQC migration engineers build toward. You will sit across U92 PQC, QKD, and Crypto-Agility engagements, translating a client\'s threat model and infrastructure reality into a concrete quantum-safe blueprint — covering application-layer crypto, network transport, and data-at-rest. You will be the person in the room when a bank\'s CISO asks "what does secure actually mean after Q-Day," and you will have an answer with a rollout plan attached.',
    responsibilities: [
      'Author end-to-end quantum-safe architecture blueprints spanning app, network, and storage layers',
      'Define crypto-agility abstraction points so future algorithm swaps are config changes, not re-architectures',
      'Advise on QKD integration points for links where physics-based secrecy is required',
      'Review and sign off on PQC migration plans produced by engineering teams',
      "Represent U92's architectural posture in client steering committees and regulator conversations",
    ],
    requirements: [
      '6+ years in security architecture, with direct experience across app, network, and data security domains',
      'Deep understanding of both classical and post-quantum cryptographic primitives',
      'Experience producing architecture documentation that survives regulatory and audit scrutiny',
      'Ability to communicate technical trade-offs to non-technical executive stakeholders',
      'Exposure to BFSI, telecom, or critical-infrastructure security requirements',
    ],
    niceToHave: [
      'Direct QKD design or integration experience',
      'Published research or conference talks on post-quantum security',
    ],
    applyFormUrl:
      'https://form.co/YOUR_FORM_ID?role=quantum-security-architect',
  },
  {
    id: 'edge-ai-engineer-merlinos',
    title: 'Edge AI Engineer — MerlinOS',
    department: 'MainSPAR',
    location: 'Pune, India',
    type: 'Full-time',
    status: 'open',
    shortDescription:
      'Sovereign MLOps on constrained hardware. Inference where every milliwatt counts.',
    aboutRole:
      'MerlinOS is the sovereign edge AI operating system that brings model inference and lifecycle management to nodes that may never see a datacenter. You will build and optimize the Light and Standard builds — squeezing usable inference out of constrained sensors on one end, and running full node-level MLOps for vehicle-class hardware on the other. Every decision you make is bounded by power, thermal, and connectivity constraints that a cloud engineer never has to think about.',
    responsibilities: [
      'Optimize model inference for extreme resource-constrained hardware (Light build)',
      'Build fleet orchestration, model serving, and retraining hooks for station/vehicle-class nodes (Standard build)',
      'Implement post-quantum key exchange for node-to-node trust with zero mandatory external calls',
      'Profile and reduce power/compute footprint of deployed models without sacrificing accuracy',
      'Work with MustangC3 and MesoGRID teams to ensure inference survives partition and attrition scenarios',
    ],
    requirements: [
      '3+ years building ML systems for embedded, edge, or resource-constrained environments',
      'Strong grasp of model quantization, pruning, and inference optimization techniques',
      'Comfortable with C/C++ or Rust alongside Python for performance-critical paths',
      'Experience with MLOps concepts — versioning, serving, monitoring — applied outside the cloud',
      'Understanding of air-gapped or offline-first system design',
    ],
    niceToHave: [
      'Experience with TinyML, ONNX Runtime, or similar edge inference frameworks',
      'Background in robotics, defence, or industrial embedded systems',
    ],
    applyFormUrl: 'https://form.co/YOUR_FORM_ID?role=edge-ai-engineer-merlinos',
  },
  {
    id: 'mesh-networking-engineer-mesogrid',
    title: 'Mesh Networking Engineer — MesoGRID',
    department: 'MainSPAR',
    location: 'Pune, India',
    type: 'Full-time',
    status: 'open',
    shortDescription:
      'Stochastic routing, partition tolerance, self-healing topology for DDIL environments.',
    aboutRole:
      'MesoGRID is the mesh that refuses to die — a decentralised network built for denied, degraded, intermittent, and limited (DDIL) environments where jamming and partition are the operating condition, not the exception. You will design and implement stochastic path-selection algorithms, self-healing topology logic, and partition-tolerant reconciliation so that islands of the network keep functioning independently and merge cleanly when links return.',
    responsibilities: [
      'Design and implement stochastic routing algorithms resistant to adversarial prediction',
      'Build self-healing topology reformation logic that operates without central coordination',
      'Develop partition-tolerance and state-reconciliation protocols for disconnected network islands',
      'Simulate and stress-test mesh behaviour under jamming, node loss, and high-attrition scenarios',
      'Collaborate with MustangC3 to ensure command-and-control traffic prioritizes correctly under degraded conditions',
    ],
    requirements: [
      '3+ years working on distributed systems, networking protocols, or mesh/ad-hoc networks',
      'Solid grounding in graph theory, routing algorithms, and distributed consensus',
      'Experience with network simulation tools (ns-3, Mininet, or equivalent)',
      'Comfortable operating in low-level networking code (C/C++, Go, or Rust)',
      'Understanding of DDIL, tactical, or disaster-recovery networking constraints',
    ],
    niceToHave: [
      'Experience with software-defined radio or RF-constrained networking',
      'Prior defence, telecom, or disaster-response networking work',
    ],
    applyFormUrl:
      'https://form.co/YOUR_FORM_ID?role=mesh-networking-engineer-mesogrid',
  },
  {
    id: 'observability-platform-engineer-vizor',
    title: 'Observability Platform Engineer — Vizor',
    department: 'MainSTAY',
    location: 'Pune, India',
    type: 'Full-time',
    status: 'open',
    shortDescription:
      'High-throughput telemetry pipelines, topology graphs, and causal AI at 28B+ events/month scale.',
    aboutRole:
      'Vizor unifies observability, security, and compliance into one fabric — one data lake, one topology graph, one AI engine, from board-level KPIs down to the packet on the wire. As an Observability Platform Engineer, you will build the ingestion and processing pipelines that make this possible at scale: 28B+ monitored events per month, with a target of ≤30 seconds to causal root cause. This is core platform engineering, not dashboard-building.',
    responsibilities: [
      'Design and scale high-throughput telemetry ingestion pipelines across IT and OT sources',
      'Build and maintain the topology graph that underpins causal root-cause analysis',
      'Optimize the data lake and query layer for sub-30-second root-cause response times',
      'Implement behavioral baselining and config-drift detection at the processing layer',
      'Partner with the causal/predictive AI team to ensure telemetry is structured for model consumption',
    ],
    requirements: [
      '4+ years building high-throughput data or observability platforms',
      'Strong experience with streaming systems (Kafka, Flink, or equivalent) at scale',
      'Solid understanding of time-series databases and graph data structures',
      'Experience operating systems targeting 99.99%+ availability SLAs',
      'Comfort working across both IT telemetry and industrial OT protocol data',
    ],
    niceToHave: [
      'Experience with SIEM/XDR platforms or security telemetry pipelines',
      'Familiarity with Purdue model concepts for OT environments',
    ],
    applyFormUrl:
      'https://form.co/YOUR_FORM_ID?role=observability-platform-engineer-vizor',
  },
  {
    id: 'ot-protocol-engineer-vizor',
    title: 'OT Protocol Engineer — Vizor',
    department: 'MainSTAY',
    location: 'Pune, India',
    type: 'Full-time',
    status: 'open',
    shortDescription:
      'Deep parsers for Modbus, DNP3, IEC 61850, PROFINET, and the languages of industry.',
    aboutRole:
      "Vizor's OT observability is passive-by-architecture at Purdue Levels 0–2, which means every insight has to come from correctly and safely parsing industrial protocols without ever touching the control loop. You will build and maintain deep protocol parsers — Modbus, DNP3, IEC 61850, PROFINET, and dozens more — that turn raw plant-floor traffic into the zone/conduit graph Vizor uses for IEC 62443 conformance and threat detection.",
    responsibilities: [
      'Build and maintain deep packet parsers for industrial protocols (Modbus, DNP3, IEC 61850, PROFINET, and others)',
      'Ensure all monitoring remains strictly passive at Purdue Levels 0–2 — zero write-path risk',
      "Map parsed traffic into Vizor's zone/conduit graph for IEC 62443 conformance reporting",
      'Work with hardware tap and sensor teams to validate protocol coverage on new client sites',
      'Support incident investigations by reconstructing OT traffic timelines from parsed telemetry',
    ],
    requirements: [
      '3+ years of experience with industrial control systems (ICS/SCADA) or OT networking',
      'Hands-on protocol parsing or reverse-engineering experience (Modbus, DNP3, IEC 61850, etc.)',
      'Strong C/C++, Rust, or Go skills for performance-sensitive parsing code',
      'Understanding of the Purdue model and IEC 62443 zone/conduit concepts',
      'Respect for the operational reality that OT uptime is non-negotiable',
    ],
    niceToHave: [
      'Experience with manufacturing, energy, or critical-infrastructure environments',
      'Familiarity with Wireshark dissector development or similar tooling',
    ],
    applyFormUrl:
      'https://form.co/YOUR_FORM_ID?role=ot-protocol-engineer-vizor',
  },
  {
    id: 'blockchain-engineer-kayak',
    title: 'Blockchain Engineer — Kayak',
    department: 'MainSTAY',
    location: 'Pune, India',
    type: 'Full-time',
    status: 'open',
    shortDescription:
      'Chain-of-custody on Hyperledger Fabric/Besu, smart-contract lifecycle for physical assets.',
    aboutRole:
      'Kayak turns every physical asset, inventory unit, and unit of movement into a metered, queryable, blockchain-verified service. You will build the chain-of-custody layer — actor, action, location, timestamp, and sensor hash, recorded on Hyperledger Fabric or Besu — and the smart contracts that govern asset lifecycle, quality gates, compliance oracles, and recall management for physical goods.',
    responsibilities: [
      'Design and implement chain-of-custody smart contracts on Hyperledger Fabric or Besu',
      'Build asset-lifecycle, quality-gate, and recall-management contract logic',
      'Integrate RFID/CV asset-identification pipelines with on-chain provenance records',
      'Optimize for sub-second provenance queries across millions of tracked assets',
      'Ensure all AI-assisted decisions carry SHAP/LIME attribution for auditor inspection',
    ],
    requirements: [
      '3+ years of blockchain engineering experience, ideally with permissioned/enterprise chains',
      'Hands-on experience with Hyperledger Fabric or Besu smart-contract development',
      'Solid understanding of distributed ledger consensus and permissioning models',
      'Experience integrating blockchain systems with IoT or physical-asset data sources',
      'Comfort operating in regulated, audit-heavy engineering contexts',
    ],
    niceToHave: [
      'Experience with warehouse, logistics, or supply-chain systems',
      'Familiarity with RFID/computer-vision fusion for asset identification',
    ],
    applyFormUrl: 'https://form.co/YOUR_FORM_ID?role=blockchain-engineer-kayak',
  },
  {
    id: 'enterprise-sales-bfsi',
    title: 'Enterprise Sales — BFSI',
    department: 'Go-to-Market',
    location: 'Pune / Singapore, India',
    type: 'Full-time',
    status: 'open',
    shortDescription:
      'Carry the U92 and Vizor story into banks and financial institutions across India and JAPAC.',
    aboutRole:
      'You will own enterprise sales into banking and financial services — carrying the U92 quantum security and Vizor observability story into institutions operating under RBI quantum-safe directions and SEBI compliance mandates. This is a consultative, technically-literate sales role: you will be scoping 45-day proofs of value, not pushing a generic deck. Coverage spans India and JAPAC.',
    responsibilities: [
      'Build and manage a pipeline of BFSI enterprise accounts across India and JAPAC',
      'Scope and close 45-day Vizor proofs of value and U92 quantum-readiness assessments',
      'Translate RBI quantum-safe and SEBI compliance requirements into a value narrative for prospects',
      'Work closely with solution architects to tailor technical proposals to each institution',
      'Represent UElement in BFSI industry forums and procurement conversations',
    ],
    requirements: [
      '5+ years of enterprise sales experience, with BFSI or fintech vertical exposure',
      'Demonstrated ability to sell technical, multi-stakeholder solutions with long sales cycles',
      'Working knowledge of banking compliance frameworks (RBI, SEBI) is a strong plus',
      'Comfortable operating with quota accountability and CRM discipline',
      'Willingness to travel across India and JAPAC as engagements require',
    ],
    niceToHave: [
      'Existing relationships within Indian or JAPAC banking/financial institutions',
      'Experience selling security, observability, or compliance software',
    ],
    applyFormUrl: 'https://form.co/YOUR_FORM_ID?role=enterprise-sales-bfsi',
  },
  {
    id: 'partner-alliances-manager',
    title: 'Partner Alliances Manager',
    department: 'Go-to-Market',
    location: 'UAE / Singapore',
    type: 'Full-time',
    status: 'open',
    shortDescription:
      'Build the SI, cloud, and OEM alliance network across regions.',
    aboutRole:
      'UElement delivers alongside systems integrators, cloud and infrastructure providers, and regional operations partners across India, JAPAC, and the Middle East. You will build and manage this alliance network from the ground up in your region — recruiting SI co-delivery partners, negotiating OEM embedding and royalty terms, and establishing the operational alliances that let UElement scale without direct headcount in every market.',
    responsibilities: [
      'Identify, recruit, and onboard systems integrator and cloud/infrastructure partners in-region',
      'Negotiate OEM embedding agreements and per-unit royalty structures',
      'Build joint go-to-market plans with regional operations alliances across JAPAC and the Middle East',
      'Manage ongoing partner relationships, enablement, and co-delivery quality',
      'Report on partner-sourced pipeline and revenue contribution to leadership',
    ],
    requirements: [
      '4+ years in partner/alliance management, channel sales, or business development',
      'Experience structuring SI, OEM, or cloud partnership agreements',
      'Regional market knowledge of the UAE, Singapore, or broader JAPAC/Middle East technology ecosystem',
      'Strong negotiation and relationship-management skills',
      'Comfortable working autonomously across time zones with a distributed team',
    ],
    niceToHave: [
      'Existing network within regional systems integrators or hyperscaler partner programs',
      'Experience in deeptech, security, or critical-infrastructure sectors',
    ],
    applyFormUrl: 'https://form.co/YOUR_FORM_ID?role=partner-alliances-manager',
  },
];
