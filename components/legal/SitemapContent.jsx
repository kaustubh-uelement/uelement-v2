import Link from 'next/link';

export default function SitemapContent() {
  return (
    <div className="space-y-10 !text-[#232223]">

      {/* ── Home ── */}
      <SitemapSection title="Home">
        <SitemapLink href="/">Landing Page</SitemapLink>
        <SitemapLink href="/#portfolio">Portfolio</SitemapLink>
        <SitemapLink href="/#whyuelement">Why Uelement</SitemapLink>
        <SitemapLink href="/#industries">Industries</SitemapLink>
        <SitemapLink href="/careers">Careers</SitemapLink>

      </SitemapSection>

      <Divider />

      {/* ── Products ── */}
      <div className="space-y-6">
        <h2 className="font-montserrat font-semibold text-14 md:text-18 xl:text-[22px] mb-2 md:mb-4 3xl:mb-6">
          Products
        </h2>

        {/* Product sub-categories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">

          {/* AdviQ */}
          <div className="space-y-3">
            <h3 className="font-montserrat font-semibold text-13 md:text-15 xl:text-[17px] border-b border-[#DFDFDF] pb-2">
              AdviQ
            </h3>
            <div className="space-y-2 pl-2">

              <SitemapLink href="/u92pqc"> PQC</SitemapLink>
              <SitemapLink href="/u92qkd"> QKD</SitemapLink>
              <SitemapLink href="/u92agility"> Crypto-Agility</SitemapLink>
            </div>
          </div>

          {/* StamBH */}
          <div className="space-y-3">
            <h3 className="font-montserrat font-semibold text-13 md:text-15 xl:text-[17px] border-b border-[#DFDFDF] pb-2">
              StamBH
            </h3>
            <div className="space-y-2 pl-2">
              <SitemapLink href="/ankura">Ankura</SitemapLink>
              <SitemapLink href="/vizor">Vizor</SitemapLink>
              <SitemapLink href="/kayak">Kayak</SitemapLink>
            </div>
          </div>




          {/* TRipura */}
          <div className="space-y-3">
            <h3 className="font-montserrat font-semibold text-13 md:text-15 xl:text-[17px] border-b border-[#DFDFDF] pb-2">
              TRIpura
            </h3>
            <div className="space-y-2 pl-2">
              <SitemapLink href="/kalamos">KalAMOS</SitemapLink>
              <SitemapLink href="/bosc3">BoSC3</SitemapLink>
              <SitemapLink href="/nobisgrid">NobisGRID</SitemapLink>
            </div>
          </div>



        </div>
      </div>

      <Divider />

      {/* ── Industries ── */}
      <SitemapSection title="Industries">
        <SitemapLink href="/industries/#ind-def">Defence  &amp; Aerospace</SitemapLink>
        <SitemapLink href="/industries/#ind-gov">Government &amp; Public Sector</SitemapLink>
        <SitemapLink href="/industries/#ind-bfsi">Banking &amp; Financial Services</SitemapLink>
        <SitemapLink href="/industries/#ind-health">Healthcare &amp; Pharma</SitemapLink>
        <SitemapLink href="/industries/#ind-mfg">Manufacturing &amp; OT</SitemapLink>
        <SitemapLink href="/industries/#ind-dc">Datacenter &amp; Warehouse</SitemapLink>
      </SitemapSection>

      <Divider />

      {/* ── Solutions ── */}
      <SitemapSection title="Solutions">
        <SitemapLink href="/vuyh">Quantum Risk Assessment</SitemapLink>
        <SitemapLink href="/kayak">Everything as a  Service</SitemapLink>
        <SitemapLink href="/vizor">45-Day Proof of Value</SitemapLink>
        <SitemapLink href="/ioet">Crypto-Agility Program</SitemapLink>
        <SitemapLink href="/tripura">Tactical Edge Briefing</SitemapLink>
        <SitemapLink href="/ankura">Digital Presence Build-Out</SitemapLink>
      </SitemapSection>

      <Divider />

      {/* ── Company ── */}
      <SitemapSection title="Company">
        <SitemapLink href="/company">About Us</SitemapLink>
        <SitemapLink href="/partnerships">Partnerships</SitemapLink>
        <SitemapLink href="/stories">Success Stories</SitemapLink>
        <SitemapLink href="/blogs">Blogs</SitemapLink>
        <SitemapLink href="/investors">Investor Relations</SitemapLink>
      </SitemapSection>

      <Divider />




      {/* ── Support & Legal ── */}
      <SitemapSection title="Support &amp; Legal">
        <SitemapLink href="/contact-us">Contact</SitemapLink>
        <SitemapLink href="/news">News</SitemapLink>
        <SitemapLink href="/legal?page=privacy">Privacy Policy</SitemapLink>
        <SitemapLink href="/legal?page=terms">Terms of Use</SitemapLink>
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
