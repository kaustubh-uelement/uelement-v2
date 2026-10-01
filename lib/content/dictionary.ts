import { CURRENT_LOCALE, Locale } from './locales';
import { branding } from './branding';

export const dictionary = {
  in: {
    tagline: 'सशक्त · सक्षम · सुरक्षित',
    hero: {
      kicker: 'सशक्त · सक्षम · सुरक्षित',
      title: 'Sovereign DeepTech systems for Enterprise Resilience.',
      lead: 'Engineering Quantum-secure and resilient autonomous systems that create a seamless Digital fabric for the advanced Enterprise.',
    },
    portfolio: {
      adviqSummary:
        "Named for uranium's atomic number, engineered for the quantum decade. Post-quantum cryptography, quantum key distribution, and crypto-agility for banks, governments, and critical infrastructure.",
      stambhSummary:
        'The enterprise platform trio. Ankura projects your business outward, Vizor watches every digital signal, Kayak commands the physical world. One control plane, one identity, one audit trail.',
      tripuraSummary:
        "Autonomous resilience for the tactical edge. A sovereign MLOps ecosystem for denied, degraded, intermittent and limited environments. We don't connect the edge to the cloud; we turn the edge into the cloud.",
    },
    industries: {
      bfsi: 'Quantum-safe transactions, UPI/CBS journey observability, RBI and SEBI compliance fabric.',
      gov: 'Sovereign cloud, CERT-In 6-hour reporting, Make-in-India GeM procurement readiness.',
      health:
        'HIPAA and DPDP compliance, clinical uptime, serialized provenance from factory to patient.',
    },
  },
  co: {
    tagline: 'Resilient · Capable · Secure',
    hero: {
      kicker: 'Resilient · Capable · Secure',
      title: 'Sovereign DeepTech systems for Enterprise Resilience.',
      lead: 'Engineering Quantum-secure and resilient autonomous systems that create a seamless Digital fabric for the advanced Enterprise.',
    },
    portfolio: {
      adviqSummary:
        'Engineered for the quantum decade. Post-quantum cryptography, quantum key distribution, and crypto-agility for global banks, enterprises, and critical infrastructure.',
      stambhSummary:
        'The enterprise platform trio. NEXUS projects your business outward, Vizor watches every digital signal, Kayak commands the physical world. One control plane, one identity, one audit trail.',
      tripuraSummary:
        "Autonomous resilience for the tactical edge. A sovereign MLOps ecosystem for denied, degraded, intermittent and limited environments. We don't connect the edge to the cloud; we turn the edge into the cloud.",
    },
    industries: {
      bfsi: 'Quantum-safe transactions, core banking journey observability, global regulatory compliance and audit fabric.',
      gov: 'Sovereign cloud, zero-trust architectures, NIST and international compliance readiness.',
      health:
        'HIPAA and international privacy compliance, clinical uptime, serialized provenance from factory to patient.',
    },
  },
};

export function getDictionary(locale: Locale = CURRENT_LOCALE) {
  return dictionary[locale] || dictionary.in;
}

export { branding };
