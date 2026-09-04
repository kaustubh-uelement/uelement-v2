/**
 * UElement — Insights content model
 *
 * Unified taxonomy across Success Stories, Case Studies, and Research Publications
 * so narratives, dossiers, and academic papers cross-link seamlessly.
 */

export type Program = 'adviq' | 'stambh' | 'tripura';

export type ProductKey =
  | 'pqc'
  | 'qkd'
  | 'crypto-agility' // AdviQ
  | 'ankura'
  | 'vizor'
  | 'kayak' // StamBH
  | 'merlinos'
  | 'mustangc3'
  | 'mesogrid'; // TRIpura

export type Industry =
  | 'defence'
  | 'bfsi'
  | 'manufacturing'
  | 'government'
  | 'healthcare'
  | 'datacenter';

export type Deployment =
  'airgapped' | 'sovereign' | 'hybrid' | 'onprem' | 'cloud';

export type PublicationKind =
  'peer-reviewed' | 'preprint' | 'whitepaper' | 'technical-note' | 'standards';

export interface Taxonomy {
  program: Program;
  products: ProductKey[];
  industry: Industry;
  deployment: Deployment;
}

/** A short, outcome-led narrative. The headline unit is a measured figure. */
export interface SuccessStory extends Taxonomy {
  slug: string;
  /** Anonymised customer descriptor — never a name unless `cleared` is true. */
  client: string;
  cleared: boolean;
  headline: string;
  summary: string;
  /** The single number the ledger leads with, e.g. "11 mo", "72 h", "0". */
  figure: string;
  figureCaption: string;
  tags: string[];
  quote?: { text: string; attribution: string };
  /** Optional deep link to the full engineering write-up. */
  caseStudySlug?: string;
  publishedAt: string; // ISO date
}

/** The full engineering account. Situation / Intervention / Result is required. */
export interface CaseStudy extends Taxonomy {
  slug: string;
  /** Human-facing reference, e.g. "UE-CS-2026-011". */
  reference: string;
  title: string;
  standfirst: string;
  spine: {
    situation: string;
    intervention: string;
    result: string;
  };
  metrics: { value: string; label: string }[];
  facts: { key: string; value: string }[];
  /** Detailed technical sections for the dossier */
  sections: {
    heading: string;
    content: string[];
    bullets?: string[];
  }[];
  tags: string[];
  durationMonths?: number;
  relatedStorySlug?: string;
  relatedPublicationIds?: string[];
  publishedAt: string;
}

export interface Publication {
  id: string; // "UE-RES-2026-014"
  slug: string;
  kind: PublicationKind;
  title: string;
  authors: string[];
  /** Externally affiliated co-authors, rendered with an affiliation marker. */
  externalAuthors?: string[];
  venue: string;
  doi?: string;
  arxivId?: string;
  abstract: string;
  pdf: { href: string; sizeLabel: string };
  codeHref?: string;
  bibtex: string;
  program?: Program;
  publishedAt: string;
  underReview?: boolean;
}
