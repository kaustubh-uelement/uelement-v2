import type { Metadata } from "next";

export const metadata: Metadata = {
  "title": "Partners \u00b7 UElement",
  "description": "The quantum technology and go-to-market partners UElement works with, and what each partnership covers.",
  "alternates": {
    "canonical": "https://uelement.co/company/partners/"
  },
  "openGraph": {
    "title": "Partners \u00b7 UElement",
    "description": "The quantum technology and go-to-market partners UElement works with, and what each partnership covers.",
    "url": "https://uelement.co/company/partners/",
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
    "title": "Partners \u00b7 UElement",
    "description": "The quantum technology and go-to-market partners UElement works with, and what each partnership covers.",
    "images": [
      "https://uelement.co/og.png"
    ]
  }
};

const content = "<section class=\"hero hero--page\"><div class=\"hero__art\"><canvas aria-hidden=\"true\" data-art=\"mesh\" data-seed=\"77\"></canvas></div><div class=\"hero__veil\"></div><div class=\"wrap\"><div class=\"hero__inner\"><nav aria-label=\"Breadcrumb\"><ol class=\"crumbs\"><li><a href=\"/\">Home</a></li><li><a href=\"/company\">Company</a></li><li aria-current=\"page\">Partners</li></ol></nav><script type=\"application/ld+json\">{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"https://uelement.co/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Company\",\"item\":\"https://uelement.co/company/\"},{\"@type\":\"ListItem\",\"position\":3,\"name\":\"Partners\",\"item\":\"https://uelement.co/company/partners/\"}]}</script><div class=\"hero__meta\"><p class=\"eyebrow\">Partners</p></div><h1 class=\"display d-5\">Specialists where it matters, <em>named with what they cover.</em></h1><p class=\"lede\">We do not build quantum hardware, and we do not pretend to. For hardware and adjacent products we work with partners, and we list a partner only when an agreement is in place.</p></div></div></section><section class=\"section\"><div class=\"wrap stack gap-8\"><div class=\"grid-12\"><div class=\"span-4\"><h2 class=\"h-sub\">Quantum technology</h2></div><ul class=\"span-8 ruled ruled--2\"><li><h3 class=\"h-card\">Toshiba</h3><div class=\"stack gap-1\"><p class=\"body\">Quantum key distribution systems</p><p class=\"tiny placeholder\">[What this partnership covers, e.g. resale, integration, joint delivery]</p></div></li><li><h3 class=\"h-card\">ID Quantique</h3><div class=\"stack gap-1\"><p class=\"body\">Quantum key distribution and quantum random number generation</p><p class=\"tiny placeholder\">[What this partnership covers, e.g. resale, integration, joint delivery]</p></div></li><li><h3 class=\"h-card\">IonQ</h3><div class=\"stack gap-1\"><p class=\"body\">Trapped-ion quantum computing</p><p class=\"tiny placeholder\">[What this partnership covers, e.g. resale, integration, joint delivery]</p></div></li><li><h3 class=\"h-card\">D-Wave</h3><div class=\"stack gap-1\"><p class=\"body\">Quantum annealing for optimisation</p><p class=\"tiny placeholder\">[What this partnership covers, e.g. resale, integration, joint delivery]</p></div></li></ul></div><div class=\"grid-12\"><div class=\"span-4\"><h2 class=\"h-sub\">Go-to-market</h2></div><ul class=\"span-8 ruled ruled--2\"><li><h3 class=\"h-card\">miniOrange</h3><div class=\"stack gap-1\"><p class=\"body\">Identity and DPDP compliance</p><p class=\"tiny placeholder\">[What this partnership covers, e.g. resale, integration, joint delivery]</p></div></li><li><h3 class=\"h-card\">Perforce</h3><div class=\"stack gap-1\"><p class=\"body\">Data protection and test data management</p><p class=\"tiny placeholder\">[What this partnership covers, e.g. resale, integration, joint delivery]</p></div></li></ul></div><p class=\"tiny\" style=\"max-width:72ch\">Partner names are trademarks of their owners and appear here to describe working relationships. They do not imply endorsement of UElement products.</p></div></section><section class=\"section section--surface\" aria-labelledby=\"cta-title\"><div class=\"wrap grid-12\" style=\"align-items:end\"><div class=\"span-7 stack gap-3\"><p class=\"eyebrow\">Next step</p><h2 id=\"cta-title\" class=\"h-section\">Want to partner with us?</h2><p class=\"lede\">We work with system integrators, hardware makers and research institutions. Tell us what you do and where you see a fit.</p></div><div class=\"span-5 stack gap-3\" style=\"align-items:flex-start\"><div class=\"row\"><a href=\"/contact?topic=other\" class=\"btn btn--gold\">Propose a partnership <svg class=\"arrow\" width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\" aria-hidden=\"true\"><path d=\"M1 7h11M8 3l4 4-4 4\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg></a></div><p class=\"small mono\">+91 76206 90561 \u00b7 contact@uelement.co</p></div></div></section>";

export default function Company_PartnersPage() {
  return (
    <main id="main" dangerouslySetInnerHTML={{ __html: content }} />
  );
}
