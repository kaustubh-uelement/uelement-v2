import type { Metadata } from "next";

export const metadata: Metadata = {
  "title": "Privacy notice \u00b7 UElement",
  "description": "How UElement Technologies collects, uses and protects personal data, and your rights under India\u2019s Digital Personal Data Protection Act, 2023.",
  "alternates": {
    "canonical": "https://uelement.in/legal/privacy/"
  },
  "openGraph": {
    "title": "Privacy notice \u00b7 UElement",
    "description": "How UElement Technologies collects, uses and protects personal data, and your rights under India\u2019s Digital Personal Data Protection Act, 2023.",
    "url": "https://uelement.in/legal/privacy/",
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
    "title": "Privacy notice \u00b7 UElement",
    "description": "How UElement Technologies collects, uses and protects personal data, and your rights under India\u2019s Digital Personal Data Protection Act, 2023.",
    "images": [
      "https://uelement.in/og.png"
    ]
  }
};

const content = "<section class=\"section\"><div class=\"wrap stack gap-4\" style=\"max-width:calc(860px + var(--gutter) * 2)\"><nav aria-label=\"Breadcrumb\"><ol class=\"crumbs\"><li><a href=\"/\">Home</a></li><li aria-current=\"page\">Privacy notice</li></ol></nav><script type=\"application/ld+json\">{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"https://uelement.in/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Privacy notice\",\"item\":\"https://uelement.in/legal/privacy/\"}]}</script><h1 class=\"display d-5\">Privacy notice</h1><p class=\"callout tiny\">Draft for legal review before publication. Last updated 1 October 2026.</p><div class=\"prose\"><p>This notice explains how UElement Technologies Private Limited (\u201cUElement\u201d, \u201cwe\u201d) handles personal data when you visit this website, contact us, or work with us. We act as a data fiduciary under India\u2019s Digital Personal Data Protection Act, 2023 (DPDP Act).</p><h2>What we collect</h2><ul><li>Details you give us through the contact form or by email: your name, work email, organisation, role and message.</li><li>Details needed to deliver an engagement, such as the names and work contact details of your project team.</li><li>[Confirm before launch: any analytics or server logs, what they record, and for how long.]</li></ul><h2>Why we use it</h2><ul><li>To reply to you and discuss the work you asked about.</li><li>To deliver and invoice work under a contract with you or your organisation.</li><li>To meet legal obligations, such as tax and company records.</li></ul><p>We do not sell personal data, and we do not add you to a mailing list unless you ask us to.</p><h2>How long we keep it</h2><p>We keep enquiry data for [period] after our last contact, and engagement records for as long as the law requires. We then delete it.</p><h2>Who we share it with</h2><p>Only with service providers who help us run the business, such as email and hosting providers, under contracts that require them to protect it. [List categories before launch.]</p><h2>Your rights</h2><p>Under the DPDP Act you may ask to access, correct or erase your personal data, withdraw consent, and nominate someone to exercise your rights. Write to <strong>contact@uelement.in</strong> and we will respond within [period].</p><h2>Grievances</h2><p>If you are not satisfied with our response, contact our grievance officer at [name, email]. You may also complain to the Data Protection Board of India.</p><h2>Contact</h2><p>UElement Technologies Private Limited, Wakad, Pune, Maharashtra 411057, India. CIN U63990PN2026PTC251047.</p></div></div></section>";

export default function Legal_PrivacyPage() {
  return (
    <main id="main" dangerouslySetInnerHTML={{ __html: content }} />
  );
}
