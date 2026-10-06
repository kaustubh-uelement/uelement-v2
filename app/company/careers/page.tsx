import type { Metadata } from "next";

export const metadata: Metadata = {
  "title": "Careers \u00b7 UElement",
  "description": "Work on post-quantum cryptography and enterprise platforms in Pune. We hire people with security foundations and train them for PQC deployment.",
  "alternates": {
    "canonical": "https://uelement.co/company/careers/"
  },
  "openGraph": {
    "title": "Careers \u00b7 UElement",
    "description": "Work on post-quantum cryptography and enterprise platforms in Pune. We hire people with security foundations and train them for PQC deployment.",
    "url": "https://uelement.co/company/careers/",
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
    "title": "Careers \u00b7 UElement",
    "description": "Work on post-quantum cryptography and enterprise platforms in Pune. We hire people with security foundations and train them for PQC deployment.",
    "images": [
      "https://uelement.co/og.png"
    ]
  }
};

const content = "<section class=\"hero hero--page\"><div class=\"hero__art\"><canvas aria-hidden=\"true\" data-art=\"kernel\" data-seed=\"8\"></canvas></div><div class=\"hero__veil\"></div><div class=\"wrap\"><div class=\"hero__inner\"><nav aria-label=\"Breadcrumb\"><ol class=\"crumbs\"><li><a href=\"/\">Home</a></li><li><a href=\"/company\">Company</a></li><li aria-current=\"page\">Careers</li></ol></nav><script type=\"application/ld+json\">{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"https://uelement.co/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Company\",\"item\":\"https://uelement.co/company/\"},{\"@type\":\"ListItem\",\"position\":3,\"name\":\"Careers\",\"item\":\"https://uelement.co/company/careers/\"}]}</script><div class=\"hero__meta\"><p class=\"eyebrow\">Careers</p></div><h1 class=\"display d-5\">Learn post-quantum cryptography <em>on real systems.</em></h1><p class=\"lede\">We are a small team in Pune. We hire slowly, train properly and give people real ownership early. One of our co-founders joined as an intern.</p></div></div></section><section class=\"section\"><div class=\"wrap stack gap-6\"><article class=\"card grid-12\" style=\"align-items:start\"><div class=\"span-5 stack gap-2\"><p class=\"eyebrow\">Quantum security</p><h2 class=\"h-sub\">PQC deployment engineer</h2><p class=\"code\">Pune, on site \u00b7 Interviews November\u2013December 2026</p></div><div class=\"span-7 stack gap-3\"><p class=\"body\">You have a grounding in network security, TLS and PKI, and you want to learn post-quantum cryptography properly. We will train you on ML-KEM, ML-DSA, CBOM discovery and hybrid migrations, then put you on real customer engagements.</p><ul class=\"stack gap-1\" style=\"list-style:none;padding:0;margin:0\"><li class=\"bullet-row\"><span class=\"diamond\"></span><span class=\"small\">Working knowledge of TLS, certificates and PKI</span></li><li class=\"bullet-row\"><span class=\"diamond\"></span><span class=\"small\">Comfort on Linux and with scripting</span></li><li class=\"bullet-row\"><span class=\"diamond\"></span><span class=\"small\">Care about doing things correctly, and writing down what you did</span></li></ul><a href=\"/contact?topic=careers\" class=\"textlink\">Apply <svg class=\"arrow\" width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\" aria-hidden=\"true\"><path d=\"M1 7h11M8 3l4 4-4 4\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg></a></div></article><article class=\"card grid-12\" style=\"align-items:start\"><div class=\"span-5 stack gap-2\"><p class=\"eyebrow\">Quantum security and MainSTAY</p><h2 class=\"h-sub\">Engineering interns</h2><p class=\"code\">Pune, on site \u00b7 A few places, rolling</p></div><div class=\"span-7 stack gap-3\"><p class=\"body\">Work alongside the engineers building Discovery and Nexus. Several of our team, including a co-founder, started as interns.</p><ul class=\"stack gap-1\" style=\"list-style:none;padding:0;margin:0\"><li class=\"bullet-row\"><span class=\"diamond\"></span><span class=\"small\">A final-year or recent degree in computer science or a related field</span></li><li class=\"bullet-row\"><span class=\"diamond\"></span><span class=\"small\">Something you built that you can show us</span></li></ul><a href=\"/contact?topic=careers\" class=\"textlink\">Apply <svg class=\"arrow\" width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\" aria-hidden=\"true\"><path d=\"M1 7h11M8 3l4 4-4 4\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg></a></div></article></div></section><section class=\"section section--surface\" aria-labelledby=\"cta-title\"><div class=\"wrap grid-12\" style=\"align-items:end\"><div class=\"span-7 stack gap-3\"><p class=\"eyebrow\">Next step</p><h2 id=\"cta-title\" class=\"h-section\">Don\u2019t see your role?</h2><p class=\"lede\">If you think you could help us, write to us with what you have built.</p></div><div class=\"span-5 stack gap-3\" style=\"align-items:flex-start\"><div class=\"row\"><a href=\"/contact?topic=careers\" class=\"btn btn--gold\">Write to us <svg class=\"arrow\" width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\" aria-hidden=\"true\"><path d=\"M1 7h11M8 3l4 4-4 4\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg></a></div><p class=\"small mono\">+91 76206 90561 \u00b7 contact@uelement.co</p></div></div></section>";

export default function Company_CareersPage() {
  return (
    <main id="main" dangerouslySetInnerHTML={{ __html: content }} />
  );
}
