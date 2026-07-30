// Navigation data structure for the UElement website

export interface DropdownItem {
  label: string;
  description: string;
  href: string;
}

export interface DropdownGroup {
  heading?: string;
  headingHref?: string;
  items: DropdownItem[];
}

export interface NavItem {
  label: string;
  href?: string;
  groups?: DropdownGroup[];
  megaVariant?: 'prod' | 'comp' | 'default';
}

export const navItems: NavItem[] = [
  {
    label: 'Products',
    megaVariant: 'prod',
    groups: [
      {
        heading: 'U92 Quantum',
        headingHref: '/u92',
        items: [
          {
            label: 'PQC',
            description: 'Post-quantum cryptography',
            href: '/u92pqc',
          },
          {
            label: 'QKD',
            description: 'Quantum key distribution',
            href: '/u92qkd',
          },
          {
            label: 'Crypto-Agility',
            description: 'Axis · Codex · Crucible',
            href: '/u92agility',
          },
        ],
      },
      {
        heading: 'MainSTAY',
        headingHref: '/mainstay',
        items: [
          {
            label: 'Nexus',
            description: 'The Enterprise Digital Fabric',
            href: '/nexus',
          },
          {
            label: 'Vizor',
            description: 'Observability · Security · GRC',
            href: '/vizor',
          },
          {
            label: 'Kayak',
            description: 'Everything as a Service',
            href: '/kayak',
          },
        ],
      },
      {
        heading: 'MainSPAR',
        headingHref: '/mainspar',
        items: [
          {
            label: 'MerlinOS',
            description: 'Sovereign edge AI OS',
            href: '/merlinos',
          },
          {
            label: 'MustangC3',
            description: 'Agentic command & control',
            href: '/mustang',
          },
          {
            label: 'MesoGRID',
            description: 'Resilient decentralised mesh',
            href: '/mesogrid',
          },
        ],
      },
    ],
  },
  {
    label: 'Industries',
    megaVariant: 'default',
    groups: [
      {
        items: [
          {
            label: 'Defence & Aerospace',
            description: 'DDIL autonomy, air-gap, post-quantum comms',
            href: '/industries#ind-def',
          },
          {
            label: 'Banking & Financial Services',
            description: 'Quantum-safe, RBI & SEBI compliant',
            href: '/industries#ind-bfsi',
          },
          {
            label: 'Manufacturing & OT',
            description: 'Purdue-native, 40+ OT protocols',
            href: '/industries#ind-mfg',
          },
        ],
      },
      {
        items: [
          {
            label: 'Government & Public Sector',
            description: 'Sovereign cloud, CERT-In ready',
            href: '/industries#ind-gov',
          },
          {
            label: 'Healthcare & Pharma',
            description: 'HIPAA, DPDP, serialized provenance',
            href: '/industries#ind-health',
          },
          {
            label: 'Datacenter & Warehouse',
            description: 'Assets and space as metered services',
            href: '/industries#ind-dc',
          },
        ],
      },
    ],
  },
  {
    label: 'Solutions',
    megaVariant: 'default',
    groups: [
      {
        items: [
          {
            label: 'Quantum Risk Assessment',
            description: 'CBOM discovery and migration planning',
            href: '/u92pqc',
          },
          {
            label: '45-Day Proof of Value',
            description: 'Observability on one critical journey',
            href: '/vizor',
          },
          {
            label: 'Tactical Edge Briefing',
            description: 'Autonomy for DDIL environments',
            href: '/mainspar',
          },
        ],
      },
      {
        items: [
          {
            label: 'Everything as a Service',
            description: 'Physical assets, metered and verified',
            href: '/kayak',
          },
          {
            label: 'Crypto-Agility Program',
            description: 'Rotation drills and policy control',
            href: '/u92agility',
          },
          {
            label: 'Digital Presence Build-out',
            description: 'Web, mobile, GenAI search, workflows',
            href: '/nexus',
          },
        ],
      },
    ],
  },
  {
    label: 'Company',
    megaVariant: 'comp',
    groups: [
      {
        items: [
          {
            label: 'About Us',
            description:
              'Our mission, vision, and the team driving sovereign deeptech.',
            href: '/company',
          },

          {
            label: 'Success Stories',
            description: 'How our platforms deliver measurable outcomes.',
            href: '/stories',
          },
          {
            label: 'Investor Relations',
            description: 'Structure, governance, and investor inquiries.',
            href: '/investors',
          },
        ],
      },
      {
        items: [
          {
            label: 'Partnerships',
            description: 'Strategic alliances that extend our technology.',
            href: '/partnerships',
          },
          {
            label: 'Blogs',
            description:
              'Insights, trends, and expert perspectives from our team.',
            href: '/blogs',
          },
        ],
      },
    ],
  },
  { label: 'Careers', href: '/careers' },
  { label: 'News', href: '/news' },
];
