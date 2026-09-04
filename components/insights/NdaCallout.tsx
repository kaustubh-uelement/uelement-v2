import Link from 'next/link';
import React from 'react';

export default function NdaCallout() {
  return (
    <div
      className="card mt-12 p-6 md:p-8"
      style={{
        border: '1px solid rgba(224, 167, 105, 0.3)',
        background:
          'linear-gradient(154.11deg, rgba(12, 20, 45, 0.95) 20%, rgba(39, 65, 147, 0.4) 100%)',
      }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="tag ember mb-2">Confidentiality & NDA</div>
          <h4 className="text-white text-lg font-bold mb-2">
            Client identities are held under strict non-disclosure
          </h4>
          <p className="text-[#c5d0dc] text-[13.5px] leading-relaxed m-0">
            Every metric published here was produced by the client’s own
            operational instrumentation, reviewed jointly, and cleared for
            anonymised release. Reference conversations with peers in your
            sector can be arranged under NDA.
          </p>
        </div>
        <div className="shrink-0">
          <Link
            href="/contact"
            className="btn btn-gold text-sm whitespace-nowrap"
          >
            Request reference call
          </Link>
        </div>
      </div>
    </div>
  );
}
