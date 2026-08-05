import Link from 'next/link';

export default function SitemapContent() {
  return (
    <div className="space-y-10 !text-[#232223]">

      {/* ── Home ── */}
      <SitemapSection title="Home">
        <SitemapLink href="/">Landing Page</SitemapLink>
        <SitemapLink href="/#objective">Objective</SitemapLink>
        <SitemapLink href="/#use-cases">Use Cases</SitemapLink>
        <SitemapLink href="/#hardware-showcase">Hardware Showcase</SitemapLink>
        <SitemapLink href="/#software-showcase">Software Showcase</SitemapLink>
        <SitemapLink href="/our-partners">Partnerships</SitemapLink>
        <SitemapLink href="/#testimonials">Testimonials</SitemapLink>
      </SitemapSection>

      <Divider />

      {/* ── Products ── */}
      <div className="space-y-6">
        <h2 className="font-montserrat font-semibold text-14 md:text-18 xl:text-[22px] mb-2 md:mb-4 3xl:mb-6">
          Products
        </h2>

        {/* Product sub-categories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">

          {/* Mainstay */}
          <div className="space-y-3">
            <h3 className="font-montserrat font-semibold text-13 md:text-15 xl:text-[17px] border-b border-[#DFDFDF] pb-2">
              Mainstay
            </h3>
            <div className="space-y-2 pl-2">
              <SitemapLink href="/nexus">NEXUS</SitemapLink>
              <SitemapLink href="/vizor">VIZOR</SitemapLink>
              <SitemapLink href="/kayak">KAYAK</SitemapLink>
            </div>
          </div>

          {/* U92 Quantum */}
          <div className="space-y-3">
            <h3 className="font-montserrat font-semibold text-13 md:text-15 xl:text-[17px] border-b border-[#DFDFDF] pb-2">
              U92 Quantum
            </h3>
            <div className="space-y-2 pl-2">
              <SitemapLink href="/u92">U92</SitemapLink>
              <SitemapLink href="/u92agility">U92 Agility</SitemapLink>
              <SitemapLink href="/u92pqc">U92 PQC</SitemapLink>
              <SitemapLink href="/u92qkd">U92 QKD</SitemapLink>
            </div>
          </div>

          {/* Edge Storage
          <div className="space-y-3">
            <h3 className="font-montserrat font-semibold text-13 md:text-15 xl:text-[17px] border-b border-[#DFDFDF] pb-2">
              Edge Storage
            </h3>
            <div className="space-y-2 pl-2">
              <SitemapLink href="/mainstay">MAINSTAY</SitemapLink>
              <SitemapLink href="/mainspar">MAINSPAR</SitemapLink>
              <SitemapLink href="/mesogrid">MESOGRID</SitemapLink>
            </div>
          </div> */}

          {/* Mainspar */}
          <div className="space-y-3">
            <h3 className="font-montserrat font-semibold text-13 md:text-15 xl:text-[17px] border-b border-[#DFDFDF] pb-2">
              Mainspar
            </h3>
            <div className="space-y-2 pl-2">
              <SitemapLink href="/merlinos">MERLINOS</SitemapLink>
              <SitemapLink href="/mustang">MUSTANG</SitemapLink>
              <SitemapLink href="/mesogrid">MESOGRID</SitemapLink>

            </div>
          </div>

          {/* Data Movement */}
          <div className="space-y-3">
            <h3 className="font-montserrat font-semibold text-13 md:text-15 xl:text-[17px] border-b border-[#DFDFDF] pb-2">
              Data Movement
            </h3>
            <div className="space-y-2 pl-2">
              <SitemapLink href="/blogs">Blogs</SitemapLink>
              <SitemapLink href="/resources">Resources</SitemapLink>
            </div>
          </div>

        </div>
      </div>

      <Divider />

      {/* ── Industries ── */}
      <SitemapSection title="Industries">
        <SitemapLink href="/industries/#ind-def">Defence  &amp; Aerospace</SitemapLink>
        <SitemapLink href="/industries/#ind-bfsi">Banking &amp; Financial Service</SitemapLink>
        <SitemapLink href="/industries/#ind-mfg">Manifacturing &amp; Iot</SitemapLink>
        <SitemapLink href="/industries/#ind-gov">Govt &amp; Public Sector</SitemapLink>
        <SitemapLink href="/industries/#ind-health">HealthCare &amp; Pharma</SitemapLink>
        <SitemapLink href="/industries/#ind-dc">DataCenter &amp; Warehouse</SitemapLink>
      </SitemapSection>

      <Divider />

      {/* ── Solutions ── */}
      <SitemapSection title="Solutions">
        <SitemapLink href="/u92pqc">Quantum Risk Assessment</SitemapLink>
        <SitemapLink href="/vizor">45-Day Of Proof Value</SitemapLink>
        <SitemapLink href="/mainspar">Tactial Edge Briefing</SitemapLink>
        <SitemapLink href="/kayak">Everything As A Service</SitemapLink>
        <SitemapLink href="/ioet">Crypto-Agility Platform</SitemapLink>
        <SitemapLink href="/nexus">Digital Presense Build-Out</SitemapLink>
      </SitemapSection>

      <Divider />

      {/* ── Company ── */}
      <SitemapSection title="Company">
        <SitemapLink href="/company">About Us</SitemapLink>
        <SitemapLink href="/stories">Succsess Stories</SitemapLink>
        <SitemapLink href="/investors">Investors Relation</SitemapLink>
        <SitemapLink href="/partnerships">Partnerships</SitemapLink>
        <SitemapLink href="/blogs">Blogs</SitemapLink>
      </SitemapSection>

      <Divider />


      {/* ── Partners ── */}
      <SitemapSection title="Partners">
        <SitemapLink href="/our-partners">All Partners</SitemapLink>
        <SitemapLink href="/our-partners?tab=ai-ml#partners">AI &amp; ML Partners</SitemapLink>
        <SitemapLink href="/our-partners?tab=cybersecurity#partners">Cybersecurity Partners</SitemapLink>
        <SitemapLink href="/our-partners?tab=cloud#partners">Cloud Partners</SitemapLink>
        <SitemapLink href="/partnerships">Partnerships</SitemapLink>
      </SitemapSection>

      <Divider />

      {/* ── Support & Legal ── */}
      <SitemapSection title="Support &amp; Legal">
        {/* <SitemapLink href="/company">About Us</SitemapLink> */}
        <SitemapLink href="/contact-us">Contact</SitemapLink>
        <SitemapLink href="/careers">Careers</SitemapLink>
        <SitemapLink href="/news">News</SitemapLink>
        {/* <SitemapLink href="/stories">Stories</SitemapLink> */}
        <SitemapLink href="/legal?page=privacy">Privacy Policy</SitemapLink>
        <SitemapLink href="/legal?page=terms">Terms of Use</SitemapLink>
        {/* <SitemapLink href="/legal?page=sitemap">Sitemap</SitemapLink> */}
        {/* <SitemapLink href="/investors">Investors</SitemapLink> */}
      </SitemapSection>

    </div>
  );
}

function SitemapSection({ title, children }) {
  return (
    <div className="space-y-4">
      <h2 className="font-montserrat font-semibold text-14 md:text-18 xl:text-[22px] mb-2 md:mb-4 3xl:mb-6">
        {title}
      </h2>
      <div className="flex flex-wrap gap-x-8 gap-y-3 pl-2">
        {children}
      </div>
    </div>
  );
}

function SitemapLink({ href, children }) {
  return (
    <Link
      href={href}
      className="flex items-center !text-[#232223] hover:text-white transition group"
    >
      <span className="inline-block w-2 h-2 rounded-full bg-[#000000] mr-3 group-hover:scale-125 transition-transform" />
      {children}
    </Link>
  );
}

function Divider() {
  return <div className="h-px bg-white/10" />;
}
