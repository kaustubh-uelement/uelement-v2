import type { Metadata } from "next";

export const metadata: Metadata = {
  "title": "UElement: Sovereign DeepTech for the systems that cannot fail.",
  "description": "UElement is a DeepTech company in Pune, India. We help banks, insurers and critical infrastructure move to quantum-safe cryptography, and we run the digital front door of growing companies on the MainSTAY platform.",
  "openGraph": {
    "title": "UElement: Sovereign DeepTech for the systems that cannot fail.",
    "description": "UElement is a DeepTech company in Pune, India. We help banks, insurers and critical infrastructure move to quantum-safe cryptography, and we run the digital front door of growing companies on the MainSTAY platform.",
    "url": "https://uelement.co/",
    "siteName": "UElement",
    "locale": "en_IN",
    "type": "website",
    "images": [
      {
        "url": "https://uelement.co/og.png",
        "width": 1200,
        "height": 630
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "UElement: Sovereign DeepTech for the systems that cannot fail.",
    "description": "UElement is a DeepTech company in Pune, India. We help banks, insurers and critical infrastructure move to quantum-safe cryptography, and we run the digital front door of growing companies on the MainSTAY platform.",
    "images": [
      "https://uelement.co/og.png"
    ]
  }
};

const content = "<section class=\"hero\"><div class=\"hero__art\"><canvas aria-hidden=\"true\" data-art=\"photon\" data-seed=\"404\"></canvas></div><div class=\"hero__veil\"></div><div class=\"wrap\"><div class=\"hero__inner\"><p class=\"code\">404 \u00b7 measured, not found</p><h1 class=\"display d-5\">This page collapsed <em>when you looked at it.</em></h1><p class=\"lede\">The address may have changed when we renamed our products. These pages are a good place to start.</p><div class=\"row\"><a href=\"/\" class=\"btn btn--gold\">Home <svg class=\"arrow\" width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\" aria-hidden=\"true\"><path d=\"M1 7h11M8 3l4 4-4 4\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg></a><a href=\"/quantum\" class=\"btn btn--line\">Quantum security</a><a href=\"/mainstay\" class=\"btn btn--line\">MainSTAY</a></div></div></div></section>";

export default function NotFound() {
  return (
    <main id="main" dangerouslySetInnerHTML={{ __html: content }} />
  );
}
