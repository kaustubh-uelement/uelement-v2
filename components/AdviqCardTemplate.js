/**
 * AdviqCardTemplate.js
 * Generates pixel-perfect, self-contained SVG & HTML card elements
 * replicating the 5 financial card designs without external image dependencies.
 */

export const CARD_DEFINITIONS = [
  {
    id: "stripe-holo",
    name: "Chaitanya",
    number: "1234 5678 9000 0000",
    theme: "stripe-holo",
  },
  {
    id: "x-gold",
    name: "Kaustubh",
    number: "1234 5678 9000 0000",
    theme: "x-gold",
  },
  {
    id: "apple-pastel",
    name: "Steve",
    number: "1234 5678 9000 0000",
    theme: "apple-pastel",
  },
  {
    id: "revolut-aurora",
    name: "Dipankar",
    number: "1234 5678 9000 0000",
    theme: "revolut-aurora",
  },
  {
    id: "x-titanium",
    name: "Elon",
    number: "1234 5678 9000 0000",
    theme: "x-titanium",
  },
];

// Common SVG vectors
const SVG_ICONS = {
  apple: `
    <svg viewBox="0 0 170 170" fill="currentColor" width="22" height="22">
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.8-11.7-14.28-6.19-9.78-10.74-20.48-13.65-32.1-2.9-11.62-4.36-22.38-4.36-32.28 0-14.35 3.58-26.24 10.74-35.68 7.16-9.44 16.29-14.28 27.39-14.52 4.35 0 9.28 1.16 14.79 3.48 5.51 2.32 9.4 3.59 11.66 3.8 2.03-.21 6.05-1.52 12.06-3.92 6.01-2.4 11.09-3.48 15.22-3.26 11.41.65 20.35 4.54 26.83 11.68 6.48 7.13 10.37 15.86 11.67 26.17-10.22 6.19-15.23 14.78-15.01 25.76.22 8.69 3.52 15.97 9.9 21.84 6.38 5.87 14.07 9.45 23.07 10.76-2.18 6.52-4.8 12.61-7.86 18.27zm-38.38-114.72c0 3.7-.87 7.6-2.61 11.7-1.74 4.1-4.24 7.6-7.5 10.5-3.04 2.82-6.52 4.96-10.44 6.41-3.91 1.45-7.46 2.1-10.65 1.96-.29-1.3-.43-2.68-.43-4.13 0-3.91.98-7.93 2.94-12.06 1.96-4.13 4.67-7.64 8.15-10.54 3.04-2.61 6.45-4.57 10.22-5.87 3.77-1.3 7.21-1.96 10.32-1.97z"/>
    </svg>
  `,
  appleWatermark: `
    <svg viewBox="0 0 170 170" fill="none" stroke="rgba(0,0,0,0.12)" stroke-width="2" width="220" height="220">
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.8-11.7-14.28-6.19-9.78-10.74-20.48-13.65-32.1-2.9-11.62-4.36-22.38-4.36-32.28 0-14.35 3.58-26.24 10.74-35.68 7.16-9.44 16.29-14.28 27.39-14.52 4.35 0 9.28 1.16 14.79 3.48 5.51 2.32 9.4 3.59 11.66 3.8 2.03-.21 6.05-1.52 12.06-3.92 6.01-2.4 11.09-3.48 15.22-3.26 11.41.65 20.35 4.54 26.83 11.68 6.48 7.13 10.37 15.86 11.67 26.17-10.22 6.19-15.23 14.78-15.01 25.76.22 8.69 3.52 15.97 9.9 21.84 6.38 5.87 14.07 9.45 23.07 10.76-2.18 6.52-4.8 12.61-7.86 18.27zm-38.38-114.72c0 3.7-.87 7.6-2.61 11.7-1.74 4.1-4.24 7.6-7.5 10.5-3.04 2.82-6.52 4.96-10.44 6.41-3.91 1.45-7.46 2.1-10.65 1.96-.29-1.3-.43-2.68-.43-4.13 0-3.91.98-7.93 2.94-12.06 1.96-4.13 4.67-7.64 8.15-10.54 3.04-2.61 6.45-4.57 10.22-5.87 3.77-1.3 7.21-1.96 10.32-1.97z"/>
    </svg>
  `,
  xLogo: `
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  `,
  contactless: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="20" height="20">
      <path d="M7 6a9 9 0 0 1 0 12" />
      <path d="M11 8a6 6 0 0 1 0 8" />
      <path d="M15 10a3 3 0 0 1 0 4" />
    </svg>
  `,
  chipOutline: `
    <svg viewBox="0 0 34 26" fill="none" stroke="currentColor" stroke-width="1.2" width="30" height="23">
      <rect x="1" y="1" width="32" height="24" rx="4" />
      <line x1="11" y1="1" x2="11" y2="25" />
      <line x1="23" y1="1" x2="23" y2="25" />
      <line x1="1" y1="13" x2="33" y2="13" />
      <circle cx="17" cy="13" r="3.5" />
    </svg>
  `,
  chipBar: `
    <svg viewBox="0 0 28 22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" width="26" height="20">
      <path d="M6 4h16M2 11h24M6 18h16" />
      <line x1="10" y1="4" x2="10" y2="18" />
      <line x1="18" y1="4" x2="18" y2="18" />
    </svg>
  `,
  mastercardOutline: `
    <svg viewBox="0 0 44 26" fill="none" stroke="currentColor" stroke-width="1.4" width="38" height="22">
      <circle cx="14" cy="13" r="11" />
      <circle cx="30" cy="13" r="11" />
    </svg>
  `,
  mastercardFilled: (c1 = "#EB001B", c2 = "#F79E1B") => `
    <svg viewBox="0 0 44 26" width="38" height="22">
      <circle cx="14" cy="13" r="11" fill="${c1}" fill-opacity="0.85" />
      <circle cx="30" cy="13" r="11" fill="${c2}" fill-opacity="0.85" />
    </svg>
  `,
  dynamicIslandChip: `
    <svg viewBox="0 0 36 24" fill="none" stroke="currentColor" stroke-width="1.2" width="32" height="22">
      <rect x="1" y="1" width="34" height="22" rx="11" />
      <circle cx="10" cy="8" r="1.5" fill="currentColor" />
      <circle cx="10" cy="16" r="1.5" fill="currentColor" />
      <circle cx="26" cy="8" r="1.5" fill="currentColor" />
      <circle cx="26" cy="16" r="1.5" fill="currentColor" />
      <line x1="16" y1="8" x2="20" y2="8" />
      <line x1="16" y1="16" x2="20" y2="16" />
    </svg>
  `,
};

function generateHoloWaves() {
  let paths = "";
  for (let i = 0; i < 22; i++) {
    const yStart = 30 + i * 11;
    const cp1y = yStart - 45 + Math.sin(i * 0.4) * 20;
    const cp2y = yStart + 55 - Math.cos(i * 0.4) * 25;
    const endY = yStart - 10;
    paths += `<path d="M 0 ${yStart} C 120 ${cp1y}, 260 ${cp2y}, 400 ${endY}" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1.2"/>`;
  }
  return paths;
}

/**
 * Creates and returns the DOM element for a specific card style.
 */
export function createCustomCardElement(cardConfig) {
  const { theme, name, number } = cardConfig;
  const cardDiv = document.createElement("div");
  cardDiv.className = `custom-adviq-card theme-${theme}`;

  switch (theme) {
    case "stripe-holo": {
      cardDiv.innerHTML = `
        <div class="card-bg holo-bg">
          <svg class="holo-mesh" viewBox="0 0 400 250" preserveAspectRatio="none">
            <defs>
              <linearGradient id="holoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#071739" />
                <stop offset="25%" stop-color="#0f2b5c" />
                <stop offset="50%" stop-color="#1b4578" />
                <stop offset="75%" stop-color="#3d3228" />
                <stop offset="90%" stop-color="#8a632c" />
                <stop offset="100%" stop-color="#0a193d" />
              </linearGradient>
              <pattern id="gridPattern" width="8" height="8" patternUnits="userSpaceOnUse">
                <rect width="8" height="8" fill="none" stroke="rgba(224,167,105,0.08)" stroke-width="0.75" />
              </pattern>
            </defs>
            <rect width="400" height="250" fill="url(#holoGrad)" />
            <rect width="400" height="250" fill="url(#gridPattern)" />
            ${generateHoloWaves()}
          </svg>
        </div>
        <div class="card-header-bar">
          <span class="brand-stripe">stripe</span>
          <span class="card-name">${name}</span>
          <div class="chip-icon">${SVG_ICONS.dynamicIslandChip}</div>
        </div>
        <div class="card-body"></div>
        <div class="card-footer">
          <div class="brand-mc">${SVG_ICONS.mastercardFilled("#c88a3e", "#3d5578")}</div>
          <span class="card-number ocr-font">${number}</span>
        </div>
      `;
      break;
    }

    case "apple-pastel": {
      cardDiv.innerHTML = `
        <div class="card-bg apple-pastel-bg"></div>
        <div class="watermark-apple">${SVG_ICONS.appleWatermark}</div>
        <div class="card-top-row">
          <div class="brand-apple-wrapper">
            ${SVG_ICONS.apple}
            <span class="brand-apple-text">Apple</span>
          </div>
        </div>
        <div class="card-bottom-area">
          <div class="card-name-bold">${name}</div>
          <div class="card-number ocr-font">${number}</div>
        </div>
        <div class="card-bottom-right">
          <div class="brand-mc">${SVG_ICONS.mastercardFilled("#1e293b", "#475569")}</div>
          <div class="chip-icon-bars">${SVG_ICONS.chipBar}</div>
        </div>
      `;
      break;
    }

    case "revolut-aurora": {
      cardDiv.innerHTML = `
        <div class="card-bg revolut-aurora-bg"></div>
        <div class="card-top-row">
          <span class="brand-revolut">Revolut</span>
          <div class="chip-icon-revolut">${SVG_ICONS.chipOutline}</div>
        </div>
        <div class="card-middle-number ocr-font">${number}</div>
        <div class="card-black-banner">
          <div class="card-name-multiline">${name.replace("\n", "<br/>")}</div>
          <div class="brand-mc">${SVG_ICONS.mastercardFilled("rgba(200,138,62,0.6)", "rgba(197,208,220,0.4)")}</div>
        </div>
      `;
      break;
    }

    case "x-titanium": {
      cardDiv.innerHTML = `
        <div class="card-bg titanium-bg"></div>
        <div class="left-dark-strip">
          <div class="brand-x">${SVG_ICONS.xLogo}</div>
          <div class="brand-mc">${SVG_ICONS.mastercardOutline}</div>
        </div>
        <div class="main-card-content">
          <div class="card-top-right">
            <span class="card-name">${name}</span>
          </div>
          <div class="card-middle-row">
            <div class="contactless-icon">${SVG_ICONS.contactless}</div>
            <span class="card-number ocr-font">${number}</span>
          </div>
          <div class="card-bottom-right">
            <div class="chip-icon-dark">${SVG_ICONS.chipOutline}</div>
          </div>
        </div>
      `;
      break;
    }

    case "x-gold":
    default: {
      cardDiv.innerHTML = `
        <div class="card-bg x-gold-bg"></div>
        <div class="card-top-row">
          <div class="brand-x">${SVG_ICONS.xLogo}</div>
          <span class="card-name">${name}</span>
        </div>
        <div class="middle-black-band">
          <div class="contactless-icon">${SVG_ICONS.contactless}</div>
          <span class="card-number ocr-font">${number}</span>
        </div>
        <div class="card-bottom-row">
          <div class="brand-mc">${SVG_ICONS.mastercardFilled("rgba(80,80,80,0.6)", "rgba(160,160,160,0.5)")}</div>
          <div class="chip-icon">${SVG_ICONS.chipOutline}</div>
        </div>
      `;
      break;
    }
  }

  return cardDiv;
}
