'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function VuyhRedirectClient() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/vyuh');
  }, [router]);

  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 20px',
        color: '#e2e8f0',
      }}
    >
      <p style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 500 }}>
        Redirecting to <strong>Vyuh</strong>...
      </p>
      <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
        If you are not redirected automatically,{' '}
        <Link
          href="/vyuh"
          style={{ color: '#d4af37', textDecoration: 'underline' }}
        >
          click here
        </Link>
        .
      </p>
    </div>
  );
}
