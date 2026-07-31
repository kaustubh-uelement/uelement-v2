'use client';

import Link from 'next/link';
import { ReactIcons } from '../../utils/ReactIcons';

const MobileNav = ({
  navbarList,
  showMobileNav,
  expandedMobileMenu,
  setExpandedMobileMenu,
  closeMobileNav,
  isScrolled,
  mobileNavRef,
  NO_TOP_LEVEL_NAV,
  NO_DROPDOWN_LINKS,
  MOBILE_DROPDOWN_HEIGHT,
}) => {
  return (
    <div
      ref={mobileNavRef}
      className={`lg:hidden bg-[#0c142d]/35 w-[90vw] lg:w-full lg:px-[10px] lg:max-w-[1920px] rounded-b-[12px]
        backdrop-blur-2xl fixed left-1/2 -translate-x-1/2 z-[70]
        overflow-hidden transition-all duration-300 ease-in-out
        ${isScrolled ? 'top-[38px]' : 'top-[60px]'}
        ${
          showMobileNav
            ? expandedMobileMenu
              ? 'max-h-[700px]'
              : 'max-h-[400px]'
            : 'max-h-0'
        }`}
    >
      <div className="flex flex-col gap-3 px-3 md:pt-12 py-6 md:pb-8 lg:mx-auto lg:max-w-[calc(100%-20px)]">
        {navbarList.map((navItem) => {
          const hasChildren = !!navItem.children?.length;
          const canExpand =
            hasChildren && !NO_DROPDOWN_LINKS.includes(navItem.id);

          return (
            <div key={navItem.id}>
              {hasChildren ? (
                <div
                  onClick={() =>
                    setExpandedMobileMenu((prev) =>
                      prev === navItem.id ? null : navItem.id
                    )
                  }
                  className="flex justify-between items-center border-b-[0.5px]
      border-primary-blue/20 text-white font-semibold pb-1 cursor-pointer"
                >
                  <span className="h-10 flex items-end">{navItem.label}</span>
                  {ReactIcons.chevDown}
                </div>
              ) : (
                <Link
                  href={navItem.link}
                  onClick={closeMobileNav}
                  className="flex justify-between items-center border-b-[0.5px]
      border-primary-blue/20 text-white font-semibold pb-1 cursor-pointer"
                >
                  <span className="h-10 flex items-end">{navItem.label}</span>
                </Link>
              )}

              {/* DROPDOWN */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out
  ${
    expandedMobileMenu === navItem.id
      ? (MOBILE_DROPDOWN_HEIGHT[navItem.id] ?? 'h-auto')
      : 'h-0'
  }`}
              >
                {/* Extra "view" item for Resources */}
                {navItem.id === 2 && (
                  <Link
                    href="/resources"
                    onClick={closeMobileNav}
                    className="block py-2 border-b-[0.5px]
                      border-primary-blue/20 hover:text-primary-blue max-w-[90%]"
                  >
                    <div className="font-semibold text-14 text-[#E8E8E8] flex gap-2 items-center">
                      View Resources {ReactIcons?.arrowright}
                    </div>
                  </Link>
                )}

                {/* Extra "view" item for Partnership */}
                {navItem.id === 3 && (
                  <Link
                    href="/our-partners"
                    onClick={closeMobileNav}
                    className="block py-2 border-b-[0.5px]
                      border-primary-blue/20 hover:text-primary-blue max-w-[90%]"
                  >
                    <div className="font-semibold text-14 text-[#E8E8E8] flex gap-2 items-center">
                      View Partner Ecosystem {ReactIcons?.arrowright}
                    </div>
                  </Link>
                )}

                {navItem.children?.map((child) =>
                  NO_DROPDOWN_LINKS.includes(navItem.id) ? (
                    // Resources descriptive items (non-clickable)
                    <div
                      key={child.id}
                      className="block py-2 border-b-[0.5px]
                        last:border-none border-primary-blue/20
                        max-w-[90%] pointer-events-none opacity-75"
                    >
                      <div className="font-semibold text-14 text-[#E8E8E8]">
                        {child.label}
                      </div>
                      <div className="text-12 font-light text-[#E8E8E8]">
                        {child.desc}
                      </div>
                    </div>
                  ) : (
                    // Normal clickable items
                    <Link
                      key={child.id}
                      href={child.link}
                      onClick={closeMobileNav}
                      className="block py-2 border-b-[0.5px]
                        last:border-none border-primary-blue/20
                        hover:text-primary-blue max-w-[90%]"
                    >
                      <div className="font-semibold text-14 text-[#E8E8E8]">
                        {child.label}
                      </div>
                      <div className="text-12 font-light text-[#E8E8E8]">
                        {child.desc}
                      </div>
                    </Link>
                  )
                )}
              </div>
            </div>
          );
        })}

        {/* CTA */}
        <div className="flex items-center justify-end">
          <Link
            href="/contact"
            onClick={closeMobileNav}
            className="bg-white text-primary-blue rounded-[40px]
              font-reddit-sans text-16 px-8 py-2 h-fit hover:shadow-hover"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
