import type { Metadata } from "next";

export const metadata: Metadata = {
  "title": "Contact \u00b7 UElement",
  "description": "Talk to UElement about a quantum readiness assessment, a post-quantum proof-of-concept, a Nexus demo or a Vizor design partnership. Wakad, Pune, India.",
  "alternates": {
    "canonical": "https://uelement.in/contact/"
  },
  "openGraph": {
    "title": "Contact \u00b7 UElement",
    "description": "Talk to UElement about a quantum readiness assessment, a post-quantum proof-of-concept, a Nexus demo or a Vizor design partnership. Wakad, Pune, India.",
    "url": "https://uelement.in/contact/",
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
    "title": "Contact \u00b7 UElement",
    "description": "Talk to UElement about a quantum readiness assessment, a post-quantum proof-of-concept, a Nexus demo or a Vizor design partnership. Wakad, Pune, India.",
    "images": [
      "https://uelement.in/og.png"
    ]
  }
};

const content = "<section class=\"section\"><div class=\"wrap grid-12\"><div class=\"span-5 stack gap-4\"><nav aria-label=\"Breadcrumb\"><ol class=\"crumbs\"><li><a href=\"/\">Home</a></li><li aria-current=\"page\">Contact</li></ol></nav><script type=\"application/ld+json\">{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"https://uelement.in/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Contact\",\"item\":\"https://uelement.in/contact/\"}]}</script><p class=\"eyebrow\">Contact</p><h1 class=\"display d-5\">Talk to the people <em>who build it.</em></h1><p class=\"lede\">Tell us what you need. A founder reads every message.</p><ol class=\"ruled\" style=\"list-style:none\"><li class=\"bullet-row\" style=\"padding-block:18px\"><span class=\"code\" style=\"color:var(--accent)\">01</span><div class=\"stack\" style=\"gap:4px\"><p class=\"h-card\">Within one working day</p><p class=\"small\">A founder replies from an @uelement.in address.</p></div></li><li class=\"bullet-row\" style=\"padding-block:18px\"><span class=\"code\" style=\"color:var(--accent)\">02</span><div class=\"stack\" style=\"gap:4px\"><p class=\"h-card\">A 30-minute call</p><p class=\"small\">We ask about your systems, timeline and constraints. No slides.</p></div></li><li class=\"bullet-row\" style=\"padding-block:18px\"><span class=\"code\" style=\"color:var(--accent)\">03</span><div class=\"stack\" style=\"gap:4px\"><p class=\"h-card\">A written scope</p><p class=\"small\">If there is a fit, a one-page scope with a fixed fee. If not, we say so and suggest who might help.</p></div></li></ol><address class=\"stack gap-1\" style=\"font-style:normal\"><p class=\"h-card\">UElement Technologies Private Limited</p><p class=\"small\">Wakad, Pune, Maharashtra 411057, India</p><p class=\"mono\" style=\"color:var(--text-strong)\">+91 76206 90561</p><p class=\"mono\" style=\"color:var(--text-strong)\">contact@uelement.in</p><p class=\"tiny mt-1\">Security reports: security@uelement.in</p></address></div><div class=\"span-7\"><div class=\"card\"><form class=\"form\" data-endpoint=\"\" noValidate=\"\" aria-describedby=\"_R_9bsnnb_-note\"><div class=\"field\"><label for=\"_R_9bsnnb_-name\">Name</label><input id=\"_R_9bsnnb_-name\" autoComplete=\"name\" aria-invalid=\"false\" name=\"name\"/></div><div class=\"field\"><label for=\"_R_9bsnnb_-email\">Work email</label><input id=\"_R_9bsnnb_-email\" type=\"email\" autoComplete=\"email\" aria-invalid=\"false\" name=\"email\"/></div><div class=\"field\"><label for=\"_R_9bsnnb_-company\">Organisation</label><input id=\"_R_9bsnnb_-company\" autoComplete=\"organization\" name=\"company\"/></div><div class=\"field\"><label for=\"_R_9bsnnb_-role\">Role (optional)</label><input id=\"_R_9bsnnb_-role\" autoComplete=\"organization-title\" name=\"role\"/></div><div class=\"field field--full\"><label for=\"_R_9bsnnb_-topic\">What do you need?</label><select id=\"_R_9bsnnb_-topic\" name=\"topic\"><option value=\"assessment\" selected=\"\">Quantum readiness assessment</option><option value=\"pqc\">Post-quantum migration proof-of-concept</option><option value=\"agility\">Crypto-agility design partnership</option><option value=\"qkd\">Quantum key distribution</option><option value=\"research\">Research collaboration (networking or QML)</option><option value=\"nexus\">Nexus demo or proposal</option><option value=\"vizor\">Vizor design partnership</option><option value=\"kayak\">Roadmap updates</option><option value=\"careers\">Careers</option><option value=\"other\">Something else</option></select></div><div class=\"field field--full\"><label for=\"_R_9bsnnb_-message\">Message</label><textarea id=\"_R_9bsnnb_-message\" name=\"message\" placeholder=\"Your systems, your timeline, and what a good outcome looks like.\" aria-invalid=\"false\"></textarea></div><div class=\"field field--full\"><label class=\"row\" style=\"align-items:flex-start;gap:12px;font-weight:400;font-family:var(--font-body);font-size:0.9375rem\"><input type=\"checkbox\" style=\"width:18px;height:18px;min-height:0;margin-top:3px;accent-color:var(--gold-500)\" name=\"consent\" value=\"yes\"/><span class=\"muted\">UElement may use these details to reply to this message. We do not add you to a mailing list. See our <a href=\"/legal/privacy\">privacy notice</a>.</span></label></div><div class=\"field--full row\" style=\"justify-content:space-between\"><button class=\"btn btn--gold\" type=\"submit\" style=\"border:0\">Send message</button><span id=\"_R_9bsnnb_-note\" class=\"tiny\">A founder reads every message.</span></div></form></div></div></div></section>";

export default function ContactPage() {
  return (
    <main id="main" dangerouslySetInnerHTML={{ __html: content }} />
  );
}
