'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { careersJobs } from '@/data/careersJobs';
import ApplicationForm from './ApplicationForm';

function JobRow({ job, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState('0px');
  const isFilled = job.status === 'filled';

  useEffect(() => {
    if (!contentRef.current) return;

    if (isOpen) {
      const resize = () => setMaxHeight(`${contentRef.current.scrollHeight}px`);
      resize();
      const observer = new ResizeObserver(resize);
      observer.observe(contentRef.current);
      return () => observer.disconnect();
    } else {
      setMaxHeight('0px');
    }
  }, [isOpen]);

  return (
    <div
      className="card"
      style={{
        padding: 0,
        overflow: 'hidden',
        borderColor: isOpen ? 'rgba(224, 167, 105, 0.5)' : undefined,
        transition: 'border-color 0.35s ease',
      }}
    >
      <button
        type="button"
        onClick={() => onToggle(job.id, job.status)}
        aria-expanded={isOpen}
        disabled={isFilled}
        className="w-full flex items-center justify-between gap-6 text-left"
        style={{
          padding: '24px 28px',
          background: 'transparent',
          border: 'none',
          cursor: isFilled ? 'default' : 'pointer',
        }}
      >
        <div>
          <div
            className="flex items-center gap-3 flex-wrap"
            style={{ marginBottom: 10 }}
          >
            <span className="tag" style={{ marginBottom: 0 }}>
              {job.department}
            </span>
            <span className="mono" style={{ color: 'var(--grey-450)' }}>
              {job.type}
            </span>
            {isFilled && (
              <span className="tag slate" style={{ marginBottom: 0 }}>
                Filled
              </span>
            )}
          </div>
          <h4 style={{ marginBottom: 6 }}>{job.title}</h4>
          <p className="mut" style={{ fontSize: 13 }}>
            {job.location}
          </p>
        </div>

        <span
          className={isFilled ? 'btn' : 'btn btn-line'}
          style={{
            flexShrink: 0,
            ...(isFilled && {
              background: 'rgba(255,255,255,0.06)',
              color: 'var(--grey-450)',
              cursor: 'default',
            }),
          }}
        >
          <span
            style={{
              display: 'inline-block',
              transition: 'transform 0.3s ease',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              marginRight: 6,
            }}
          >
            {isFilled ? '' : '▾'}
          </span>
          {isFilled
            ? 'Position filled'
            : isOpen
              ? 'Close details'
              : 'View details'}
        </span>
      </button>

      <div
        style={{
          maxHeight,
          overflow: 'hidden',
          transition: 'max-height 0.45s cubic-bezier(0.65, 0, 0.076, 1)',
        }}
      >
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            padding: '28px',
            opacity: isOpen ? 1 : 0,
            transition: 'opacity 0.35s ease',
            transitionDelay: isOpen ? '0.1s' : '0s',
          }}
        >
          <div>
            <h5
              className="mono"
              style={{
                color: 'var(--gold-500)',
                marginBottom: 10,
                fontSize: 12,
              }}
            >
              About the role
            </h5>
            <p className="mut" style={{ marginBottom: 24 }}>
              {job.aboutRole}
            </p>

            <h5
              className="mono"
              style={{
                color: 'var(--gold-500)',
                marginBottom: 12,
                fontSize: 12,
              }}
            >
              Key responsibilities
            </h5>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              style={{ marginBottom: 24 }}
            >
              {job.responsibilities.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2"
                  style={{
                    fontSize: 13.5,
                    color: 'var(--grey-350)',
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: 'var(--gold-500)', flexShrink: 0 }}>
                    ✓
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <h5
              className="mono"
              style={{
                color: 'var(--gold-500)',
                marginBottom: 12,
                fontSize: 12,
              }}
            >
              Requirements
            </h5>
            <ul style={{ marginBottom: job.niceToHave?.length ? 24 : 0 }}>
              {job.requirements.map((item) => (
                <li
                  key={item}
                  className="mut"
                  style={{
                    fontSize: 13.5,
                    marginBottom: 6,
                    paddingLeft: 14,
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      color: 'var(--gold-500)',
                    }}
                  >
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {job.niceToHave?.length > 0 && (
              <>
                <h5
                  className="mono"
                  style={{
                    color: 'var(--gold-500)',
                    marginBottom: 12,
                    fontSize: 12,
                  }}
                >
                  Good to have
                </h5>
                <ul>
                  {job.niceToHave.map((item) => (
                    <li
                      key={item}
                      className="mut"
                      style={{
                        fontSize: 13.5,
                        fontStyle: 'italic',
                        marginBottom: 6,
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 'var(--radius-md)',
              padding: 20,
            }}
          >
            <h5 style={{ marginBottom: 4 }}>Submit application</h5>
            <p className="mut" style={{ fontSize: 12.5, marginBottom: 16 }}>
              Applying for {job.title}
            </p>
            <ApplicationForm
              job={job}
              onSuccess={() => onToggle(job.id, job.status)}
              isFilled={isFilled}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OpenPositions() {
  const [activeId, setActiveId] = useState(null);
  const openCount = careersJobs.filter((job) => job.status !== 'filled').length;

  const toggleJob = (id, status) => {
    if (status === 'filled') return;
    setActiveId((current) => (current === id ? null : id));
  };

  return (
    <div className="section alt">
      <div className="wrap">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="kicker" style={{ color: 'var(--navy-800)' }}>
              Open roles
            </div>
            <h2 className="display text-navy-gradient">
              Find your <span className="au">program.</span>
            </h2>
          </div>
          <p className="mono" style={{ color: 'var(--gold-500)' }}>
            {openCount} Open Role{openCount !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-10">
          {careersJobs.map((job) => (
            <JobRow
              key={job.id}
              job={job}
              isOpen={activeId === job.id}
              onToggle={toggleJob}
            />
          ))}

          <Link
            href="/contact"
            className="card link"
            style={{ textDecoration: 'none' }}
          >
            <h4>Don&apos;t see your role?</h4>
            <p>
              Exceptional people don&apos;t always fit a listing. Tell us what
              you&apos;d build here.
            </p>
            <p
              className="mono"
              style={{ marginTop: 14, color: 'var(--gold-500)' }}
            >
              Write to us →
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
