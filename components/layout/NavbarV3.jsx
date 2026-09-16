'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ReactIcons } from '../../utils/ReactIcons';
import Link from 'next/link';
import MobileNav from './MobileNav';
import { imgUrl } from '@/lib/imageUrl';

const navbarList = [
  {
    id: 1,
    label: 'Services',
    link: '/services',
    children: [
      {
        id: 1,
        label: 'AI & ML',
        desc: 'AI-powered solutions that boost efficiency and drive smarter decisions for global enterprises.',
        link: '/ai-ml',
      },
      {
        id: 2,
        label: 'Cybersecurity',
        desc: 'We provide enterprise security solutions that protect assets, ensure compliance, and reduce risks.',
        link: '/cybersecurity',
      },
      {
        id: 3,
        label: 'Cloud Solutions',
        desc: 'We deliver scalable, secure, and efficient cloud solutions tailored for global businesses.',
        link: '/cloud-solutions',
      },
      {
        id: 4,
        label: 'Quantum & Web3',
        desc: 'Quantum-ready and next-generation technologies designed to future-proof enterprise infrastructure.',
        link: '/future-tech',
      },
    ],
  },
  {
    id: 6,
    label: 'Solutions',
    link: '/solutions',
    children: [
      { id: 1, label: 'SaaS', desc: 'Web Platform Management', link: '/saas' },
      {
        id: 2,
        label: 'Observability',
        desc: 'SecOps, CloudOps, AIOps & FinOps',
        link: '/observability',
      },
      { id: 3, label: 'IoET', desc: 'Enhanced Digital Twin', link: '/ioet' },
      {
        id: 4,
        label: 'Quantum',
        desc: 'Application Development & PQC',
        link: '/vuyh',
      },
    ],
  },
  { id: 7, label: 'Industries', link: '#' },
  {
    id: 8,
    label: 'Company',
    link: '/company',
    children: [
      {
        id: 1,
        label: 'About Us',
        desc: 'Learn about our mission, vision, and the team driving innovation.',
        link: '/company',
      },
      {
        id: 2,
        label: 'Partnerships',
        desc: 'Explore our strategic alliances that enhance our technology and services.',
        link: '/our-partners',
      },
      {
        id: 3,
        label: 'News Room',
        desc: 'Stay updated with our latest announcements, media coverage, and press releases.',
        link: '#',
      },
      {
        id: 4,
        label: 'Blogs',
        desc: 'Read insights, trends, and expert perspectives from our team.',
        link: '/resources',
      },
      {
        id: 5,
        label: 'Careers',
        desc: 'Discover opportunities to grow your career and work with us.',
        link: '#',
      },
      {
        id: 6,
        label: 'Investor Relations',
        desc: 'Access financial reports, investor updates, and company performance insights.',
        link: '#',
      },
      {
        id: 7,
        label: 'Success Stories',
        desc: 'See how we have helped clients achieve measurable results.',
        link: '#',
      },
    ],
  },
];

// IDs whose dropdown children render in a 2-column grid
const GRID_DROPDOWN_IDS = new Set([1, 6, 8]);

const MOBILE_DROPDOWN_HEIGHT = {
  1: 'h-[300px]',
  6: 'h-[300px]',
  8: 'h-[485px]',
};

const DESKTOP_DROPDOWN_HEIGHT = {
  1: 'h-[380px]',
  6: 'h-[320px]',
  8: 'h-[485px]',
};

const NavbarV3 = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolled100vh, setIsScrolled100vh] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState(null);

  const location = usePathname();
  const navRef = useRef(null);
  const dropdownRef = useRef(null);
  const mobileNavRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      setIsScrolled100vh(window.scrollY > window.innerHeight - 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        navRef.current &&
        dropdownRef.current &&
        !navRef.current.contains(e.target) &&
        !dropdownRef.current.contains(e.target)
      )
        setOpenMenu(null);

      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      )
        setShowMobileNav(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setShowMobileNav(false);
    setOpenMenu(null);
    setExpandedMobileMenu(null);
  }, [location]);

  const closeMobileNav = () => {
    setShowMobileNav(false);
    setExpandedMobileMenu(null);
  };

  const toggleDesktopMenu = (navItem) =>
    setOpenMenu((prev) => (prev?.id === navItem.id ? null : navItem));

  return (
    <>
      <nav
        className={`w-[90vw] md:w-full md:px-[10px] md:max-w-[1920px] md:mx-auto shadow-none md:bg-transparent rounded-[40px] md:rounded-none h-13 md:h-15 flex justify-between fixed z-[80] left-1/2 -translate-x-1/2
          ${isScrolled ? 'top-2' : 'top-6'} transition-all duration-700 ease-in-out`}
      >
        <div className="w-full md:px-[30px] lg:px-10 rounded-[40px]">
          <div className="flex justify-between h-full w-full relative rounded-[40px]">
            {/* Logo */}
            <Link
              href="/"
              className={`${isScrolled100vh || location === '/contact-us/' ? 'bg-primary-blue' : 'backdrop-blur-lg'}
                rounded-l-[22px] rounded-tl-[4px] md:w-[220px] 2xl:w-[290px] w-[180px] h-full ps-4 pe-12 md:pe-0
                flex items-center relative z-40 transition-all duration-300`}
            >
              <img
                src={imgUrl('/icons/global/UElement_Logo_White 3.svg')}
                alt="uelement"
                className="2xl:w-auto md:w-[140px] h-auto"
              />
            </Link>

            <div className="flex-1 relative">
              <div className="w-[calc(100%+30px)] md:w-[calc(100%+40px)] h-full bg-[#32323259] backdrop-blur-lg rounded-[40px] -ml-[30px] md:-ml-10 px-3 flex items-center relative z-50">
                {/* 92 badge */}
                <div className="size-8 md:size-10 bg-[#9B7025] rounded-full flex-shrink-0 relative">
                  <span className="absolute -translate-x-1/2 left-3 md:left-[18px] -translate-y-1/2 top-3 font-bold text-18 md:text-22 font-reddit-sans text-[#ffffff50]">
                    92
                  </span>
                </div>

                {/* Desktop menu */}
                <div
                  ref={navRef}
                  className="flex-1 hidden lg:flex justify-center gap-3 min-h-full"
                >
                  {navbarList.map((navItem) => {
                    const isOpen = openMenu?.id === navItem.id;
                    const hasDropdown = !!navItem.children?.length;
                    return (
                      <div
                        key={navItem.id}
                        className="group min-h-full flex items-stretch"
                      >
                        {hasDropdown ? (
                          <button
                            type="button"
                            onClick={() => toggleDesktopMenu(navItem)}
                            className="flex items-center font-reddit-sans font-semibold md:text-14 xl:text-16 text-[#fff] px-3 relative h-full cursor-pointer"
                          >
                            <span
                              className={`transition-all duration-500 ${isOpen ? 'rotate-0' : 'rotate-45'}`}
                            >
                              {ReactIcons.slash}
                            </span>
                            {navItem.label}
                          </button>
                        ) : (
                          <Link
                            href={navItem.link}
                            className="flex items-center font-reddit-sans font-semibold md:text-14 xl:text-16 text-[#fff] px-3 relative h-full cursor-pointer"
                          >
                            {navItem.label}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Mobile hamburger */}
                <button
                  ref={buttonRef}
                  onClick={() => {
                    setExpandedMobileMenu(null);
                    setShowMobileNav((p) => !p);
                  }}
                  className="lg:hidden ml-auto text-white !bg-transparent text-20"
                >
                  {ReactIcons.hamburgerMenu}
                </button>

                {/* Contact button */}
                <Link
                  href="/contact-us"
                  className="hidden lg:block bg-white rounded-[40px] font-reddit-sans text-14 xl:text-18 px-8 md:px-4 xl:px-8 py-2 h-fit hover:shadow-hover"
                >
                  Contact us
                </Link>
              </div>

              {/* Desktop dropdown */}
              <div
                ref={dropdownRef}
                className={`w-[calc(100%+40px)] absolute -left-10 bg-[#00000050] backdrop-blur-2xl backdrop-saturate-150
                  text-[#fff] z-[30] top-9 hidden lg:flex rounded-b-[22px] overflow-hidden
                  transition-all duration-300 ease-in-out border border-t-0 border-[#ffffff20]
                  ${openMenu?.children ? (DESKTOP_DROPDOWN_HEIGHT[openMenu.id] ?? 'h-[400px]') : 'h-0'}`}
              >
                {openMenu?.children && (
                  <div className="pt-9 pb-3 px-4 flex w-full">
                    <div className="flex-[2]">
                      <div className="flex items-center gap-4 border-b-[0.5px] border-[#ebebeb] pb-2">
                        <div className="md:text-18 xl:text-22 text-white font-reddit-sans font-semibold">
                          {openMenu.label}
                        </div>
                      </div>

                      {/* 2-col grid for Services (1), Solutions (6), and Company (8) */}
                      <div
                        className={`${GRID_DROPDOWN_IDS.has(openMenu.id) ? 'flex flex-wrap' : 'flex flex-col'} pt-2 gap-y-1`}
                      >
                        {openMenu.children.map((child) => (
                          <Link
                            key={child.id}
                            href={child.link}
                            className={`group/item flex flex-col py-3 px-3 rounded-[12px] transition-all duration-200
        hover:bg-white/10  
        border-l-2 border-transparent
        ${GRID_DROPDOWN_IDS.has(openMenu.id) ? 'w-1/2' : 'w-full'}`}
                          >
                            <div className="font-semibold text-16 xl:text-18 text-white font-reddit-sans capitalize group-hover/item:text-[#bf8a2d] transition-colors duration-200">
                              {child.label}
                            </div>
                            <div className="text-14 xl:text-16 font-light text-white/70 font-reddit-sans group-hover/item:text-white/90 transition-colors duration-200">
                              {child.desc}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <MobileNav
        navbarList={navbarList}
        showMobileNav={showMobileNav}
        expandedMobileMenu={expandedMobileMenu}
        setExpandedMobileMenu={setExpandedMobileMenu}
        closeMobileNav={closeMobileNav}
        isScrolled={isScrolled}
        mobileNavRef={mobileNavRef}
        NO_TOP_LEVEL_NAV={[]}
        NO_DROPDOWN_LINKS={[]}
        MOBILE_DROPDOWN_HEIGHT={MOBILE_DROPDOWN_HEIGHT}
      />
    </>
  );
};

export default NavbarV3;
