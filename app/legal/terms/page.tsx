import type { Metadata } from "next";

export const metadata: Metadata = {
  "title": "Website terms \u00b7 UElement",
  "description": "Terms for using the UElement Technologies website.",
  "alternates": {
    "canonical": "https://uelement.co/legal/terms/"
  },
  "openGraph": {
    "title": "Website terms \u00b7 UElement",
    "description": "Terms for using the UElement Technologies website.",
    "url": "https://uelement.co/legal/terms/",
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
    "title": "Website terms \u00b7 UElement",
    "description": "Terms for using the UElement Technologies website.",
    "images": [
      "https://uelement.co/og.png"
    ]
  }
};

const content = "<section class=\"section\"><div class=\"wrap stack gap-4\" style=\"max-width:calc(860px + var(--gutter) * 2)\"><nav aria-label=\"Breadcrumb\"><ol class=\"crumbs\"><li><a href=\"/\">Home</a></li><li aria-current=\"page\">Website terms</li></ol></nav><script type=\"application/ld+json\">{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"https://uelement.co/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Website terms\",\"item\":\"https://uelement.co/legal/terms/\"}]}</script><h1 class=\"display d-5\">Website terms</h1><p class=\"callout tiny\">Draft for legal review before publication. Last updated 1 October 2026.</p><div class=\"prose\"><p>This website is operated by UElement Technologies Private Limited, CIN U63990PN2026PTC251047. By using it you agree to these terms.</p><h2>Information on this site</h2><p>We work to keep the information here accurate and we show when regulatory content was last reviewed. It is general information, not legal, regulatory or security advice for your organisation. Product availability is described by the maturity label on each product page.</p><h2>Prices</h2><p>Published prices are in US dollars, exclude applicable taxes, and are confirmed in a written proposal before any work begins.</p><h2>Intellectual property</h2><p>The content, design and code of this site belong to UElement unless stated otherwise. Insight articles may be quoted with attribution and a link. Third-party names are trademarks of their owners.</p><h2>Links</h2><p>We link to external sources so you can check our facts. We are not responsible for their content.</p><h2>Law</h2><p>These terms are governed by the laws of India, and the courts at Pune have jurisdiction. [Confirm with counsel.]</p></div></div></section>";

export default function Legal_TermsPage() {
  return (
    <main id="main" dangerouslySetInnerHTML={{ __html: content }} />
  );
}
