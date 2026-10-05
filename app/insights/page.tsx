import type { Metadata } from "next";

export const metadata: Metadata = {
  "title": "Insights \u00b7 UElement",
  "description": "Plain, dated and sourced explainers on post-quantum cryptography in India, cryptographic bills of materials, hybrid key exchange and running a company\u2019s digital front door.",
  "alternates": {
    "canonical": "https://uelement.in/insights/"
  },
  "openGraph": {
    "title": "Insights \u00b7 UElement",
    "description": "Plain, dated and sourced explainers on post-quantum cryptography in India, cryptographic bills of materials, hybrid key exchange and running a company\u2019s digital front door.",
    "url": "https://uelement.in/insights/",
    "siteName": "UElement",
    "locale": "en_IN",
    "type": "website",
    "images": [
      {
        "url": "https://uelement.in/og.png",
        "width": 1200,
        "height": 630
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Insights \u00b7 UElement",
    "description": "Plain, dated and sourced explainers on post-quantum cryptography in India, cryptographic bills of materials, hybrid key exchange and running a company\u2019s digital front door.",
    "images": [
      "https://uelement.in/og.png"
    ]
  }
};

const content = "<section class=\"hero hero--page\"><div class=\"hero__art\"><canvas aria-hidden=\"true\" data-art=\"kernel\" data-seed=\"3\"></canvas></div><div class=\"hero__veil\"></div><div class=\"wrap\"><div class=\"hero__inner\"><nav aria-label=\"Breadcrumb\"><ol class=\"crumbs\"><li><a href=\"/\">Home</a></li><li aria-current=\"page\">Insights</li></ol></nav><script type=\"application/ld+json\">{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"https://uelement.in/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Insights\",\"item\":\"https://uelement.in/insights/\"}]}</script><div class=\"hero__meta\"><p class=\"eyebrow\">Insights</p></div><h1 class=\"display d-5\">Plain answers, <em>dated and sourced.</em></h1><p class=\"lede\">Every piece names its sources, shows when it was last reviewed, and is written to be useful whether or not you ever talk to us.</p></div></div></section><section class=\"section\"><div class=\"wrap stack gap-6\"><a href=\"/insights/india-pqc-deadlines\" class=\"card card--link card--accent grid-12\" style=\"align-items:end\"><div class=\"span-8 stack gap-3\"><div class=\"row\"><span class=\"eyebrow\">Tracker</span><span class=\"code\">Reviewed monthly \u00b7 last 1 October 2026</span></div><h2 class=\"display d-4\">India\u2019s post-quantum deadlines, sector by sector</h2><p class=\"lede\">The national roadmap has dates. The banking regulator has a committee. The algorithms are final. Here is what is required, what is recommended and what is still open, with sources.</p></div><div class=\"span-4\" style=\"justify-self:end\"><span class=\"btn btn--gold\">Open the tracker <svg class=\"arrow\" width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\" aria-hidden=\"true\"><path d=\"M1 7h11M8 3l4 4-4 4\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg></span></div></a><div class=\"cols-2\"><a href=\"/insights/what-is-a-cbom\" class=\"card card--link\"><div class=\"row\" style=\"justify-content:space-between\"><span class=\"eyebrow\">Quantum security \u00b7 Explainer</span><span class=\"code\">5 min</span></div><h2 class=\"h-sub\">What is a cryptographic bill of materials?</h2><p class=\"small\">A CBOM lists every algorithm, key, certificate and protocol in a system and where each is used. It is the first step of every post-quantum programme. Here is what goes in one.</p><span class=\"tiny mono\">Reviewed 1 October 2026</span></a><a href=\"/insights/harvest-now-decrypt-later\" class=\"card card--link\"><div class=\"row\" style=\"justify-content:space-between\"><span class=\"eyebrow\">Quantum security \u00b7 Explainer</span><span class=\"code\">4 min</span></div><h2 class=\"h-sub\">Harvest now, decrypt later: when does your data stop being secret?</h2><p class=\"small\">Encrypted traffic recorded today can be read once a large quantum computer exists. A simple inequality tells you whether your data is already exposed.</p><span class=\"tiny mono\">Reviewed 1 October 2026</span></a><a href=\"/insights/hybrid-key-exchange\" class=\"card card--link\"><div class=\"row\" style=\"justify-content:space-between\"><span class=\"eyebrow\">Quantum security \u00b7 Explainer</span><span class=\"code\">5 min</span></div><h2 class=\"h-sub\">Hybrid key exchange, explained with byte counts</h2><p class=\"small\">X25519MLKEM768 is now the default in major browsers and a TLS standard. What it combines, why both halves matter, and what it costs on the wire.</p><span class=\"tiny mono\">Reviewed 1 October 2026</span></a><a href=\"/insights/one-platform-or-many-tools\" class=\"card card--link\"><div class=\"row\" style=\"justify-content:space-between\"><span class=\"eyebrow\">MainSTAY \u00b7 Guide</span><span class=\"code\">4 min</span></div><h2 class=\"h-sub\">One platform or many tools for your digital front door?</h2><p class=\"small\">A website builder, an applicant tracker, a help desk and a login service, or one platform? An honest way to decide, including when the answer is not ours.</p><span class=\"tiny mono\">Reviewed 1 October 2026</span></a></div></div></section><section class=\"section section--surface\" aria-labelledby=\"cta-title\"><div class=\"wrap grid-12\" style=\"align-items:end\"><div class=\"span-7 stack gap-3\"><p class=\"eyebrow\">Next step</p><h2 id=\"cta-title\" class=\"h-section\">Want a piece on something specific?</h2><p class=\"lede\">Tell us what your security or digital team is trying to decide. If it is useful to others, we will write it up.</p></div><div class=\"span-5 stack gap-3\" style=\"align-items:flex-start\"><div class=\"row\"><a href=\"/contact\" class=\"btn btn--gold\">Start a conversation <svg class=\"arrow\" width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\" aria-hidden=\"true\"><path d=\"M1 7h11M8 3l4 4-4 4\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg></a></div><p class=\"small mono\">+91 76206 90561 \u00b7 contact@uelement.in</p></div></div></section>";

export default function InsightsPage() {
  return (
    <main id="main" dangerouslySetInnerHTML={{ __html: content }} />
  );
}
