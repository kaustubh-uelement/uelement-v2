export type Locale = 'in' | 'co';

// Default to 'in' so existing Cloudflare .in deployment works with ZERO config changes
export const CURRENT_LOCALE: Locale =
  (process.env.NEXT_PUBLIC_LOCALE as Locale) === 'co' ? 'co' : 'in';

export const isGlobal = CURRENT_LOCALE === 'co';
export const SITE_DOMAIN = isGlobal ? 'uelement.co' : 'uelement.in';
export const SITE_URL = `https://${SITE_DOMAIN}`;
