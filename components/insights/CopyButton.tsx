'use client';

import React, { useState } from 'react';

interface CopyButtonProps {
  label: string;
  copiedLabel?: string;
  textToCopy: string;
  className?: string;
}

export default function CopyButton({
  label,
  copiedLabel = 'Copied!',
  textToCopy,
  className = '',
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`text-[12px] px-3.5 py-1.5 rounded-full border transition-all duration-200 cursor-pointer font-mono ${
        copied
          ? 'bg-[var(--gold-500)] text-[#101010] border-[var(--gold-500)] font-semibold'
          : 'bg-transparent text-[#c5d0dc] border-[rgba(255,255,255,0.18)] hover:border-[var(--gold-500)] hover:text-white'
      } ${className}`}
      title={textToCopy}
    >
      {copied ? copiedLabel : label}
    </button>
  );
}
