'use client';

interface PillarCardProps {
  label: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  points?: React.ReactNode[];
  className?: string;
  style?: React.CSSProperties;
}

export default function PillarCard({
  label,
  title,
  description,
  points,
  className = '',
  style,
}: PillarCardProps) {
  return (
    <div
      className={className}
      style={{
        border: '2px solid transparent',
        backgroundImage:
          'linear-gradient(154.11deg, #0c142d 20%, #162447 100%), conic-gradient(from 140deg, #b87930 0%, #c88a3e 18%, #fcefdc 28%, #e0a769 38%, #7a5416 50%, #b87930 62%, #c88a3e 74%, #fcefdc 82%, #e0a769 90%, #b87930 100%)',
        backgroundClip: 'padding-box, border-box',
        backgroundOrigin: 'padding-box, border-box',
        borderRadius: '20px',
        padding: '28px',
        color: '#c5d0dc',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxShadow:
          '0 8px 32px rgba(7, 23, 57, 0.4), 0 2px 10px rgba(224, 167, 105, 0.08)',
        ...style,
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          padding: '6px 14px',
          borderRadius: '999px',
          border: '1px solid rgba(200, 138, 62, 0.4)',
          background:
            'linear-gradient(105deg, rgba(184, 121, 48, 0.25) 0%, rgba(200, 138, 62, 0.12) 100%)',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.06em',
          color: '#fcefdc',
          marginBottom: '20px',
          alignSelf: 'flex-start',
        }}
      >
        {label}
      </div>
      <h4
        style={{
          fontSize: '18px',
          fontWeight: 700,
          marginBottom: '14px',
          color: '#ffffff',
          fontFamily: "var(--font-heading, 'Montserrat', sans-serif)",
        }}
      >
        {title}
      </h4>
      {description && (
        <p
          style={{
            fontSize: '14px',
            lineHeight: 1.6,
            color: '#c5d0dc',
            marginBottom: '20px',
          }}
        >
          {description}
        </p>
      )}
      {points && points.length > 0 && (
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
                color: '#8a9bb3',
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
      )}
    </div>
  );
}
