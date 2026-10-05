'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

declare global {
  interface Window {
    initSite?: () => void;
  }
}

export default function SiteScript() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.initSite) {
      window.initSite();
    }
  }, [pathname]);

  return (
    <Script
      src="/assets/js/site.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window !== 'undefined' && window.initSite) {
          window.initSite();
        }
      }}
    />
  );
}
