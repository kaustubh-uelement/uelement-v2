'use client';

import React from 'react';

export interface FilterOption<T extends string> {
  value: T | 'all';
  label: string;
}

interface InsightFilterChipsProps<T extends string> {
  legend?: string;
  options: FilterOption<T>[];
  value: T | 'all';
  onChange: (value: T | 'all') => void;
  countLabel?: string;
}

export default function InsightFilterChips<T extends string>({
  legend,
  options,
  value,
  onChange,
  countLabel,
}: InsightFilterChipsProps<T>) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[rgba(255,255,255,0.08)]">
      <div className="flex flex-col gap-2">
        {legend && (
          <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--gold-500)] font-heading">
            {legend}
          </span>
        )}
        <div className="flex flex-wrap gap-2">
          {options.map((option) => {
            const isSelected = value === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange(option.value)}
                className={`text-[12.5px] px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer font-medium ${
                  isSelected
                    ? 'bg-[var(--gold-500)] text-[#101010] shadow-[0_2px_10px_rgba(224,167,105,0.35)] font-semibold'
                    : 'bg-[#232223] text-[#c5d0dc] border border-[rgba(255,255,255,0.12)] hover:border-[var(--gold-500)] hover:text-white'
                }`}
                aria-pressed={isSelected}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {countLabel && (
        <div className="text-[12px] font-mono text-[#8a9bb3] shrink-0 self-start md:self-end">
          {countLabel}
        </div>
      )}
    </div>
  );
}
