'use client';

interface PillarCardProps {
  label: string;
  title: string;
  description: string;
  points: string[];
}

export default function PillarCard({
  label,
  title,
  description,
  points,
}: PillarCardProps) {
  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #151828 0%, #213866 100%)',
        borderRadius: '16px',
        padding: '28px',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          padding: '6px 16px',
          borderRadius: '999px',
          border: '1px solid rgba(255,255,255,0.15)',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.05em',
          color: '#94a3b8',
          marginBottom: '20px',
          alignSelf: 'flex-start',
        }}
      >
        {label}
      </div>
      <h4
        style={{
          fontSize: '18px',
          fontWeight: 600,
          marginBottom: '16px',
          color: '#fff',
        }}
      >
        {title}
      </h4>
      <p
        style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: '#e2e8f0',
          marginBottom: '20px',
        }}
      >
        {description}
      </p>
      <ul
        style={{
          padding: 0,
          margin: 0,
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {points.map((point, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              fontSize: '14px',
              lineHeight: 1.6,
              color: '#94a3b8',
            }}
          >
            <span
              style={{
                color: '#c88a3e',
                marginRight: '12px',
                fontWeight: 'bold',
              }}
            >
              -
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
