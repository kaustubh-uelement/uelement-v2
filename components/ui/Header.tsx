'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { navItems, type NavItem, type DropdownGroup } from '@/lib/navigation';
import { ReactIcons } from '../../utils/ReactIcons';
import ContactModal from './ContactModal';

function DropdownContent({
  groups,
  megaVariant,
  onClose,
}: {
  groups: DropdownGroup[];
  megaVariant?: string;
  onClose?: () => void;
}) {
  return (
    <>
      {groups.map((group, gi) => (
        <div className="dgroup" key={gi}>
          {group.heading && (
            <Link
              href={group.headingHref || '#'}
              className="dhead"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              onClick={onClose}
            >
              <span>{group.heading}</span>
              <span className="dhead-arrow font-sans text-[1.1em]">→</span>
            </Link>
          )}
          {group.items.map((item, ii) => (
            <Link href={item.href} className="ditem" key={ii} onClick={onClose}>
              <b>{item.label}</b>
              <span>{item.description}</span>
            </Link>
          ))}
        </div>
      ))}
    </>
  );
}

function NavDropdown({
  item,
  isOpen,
  onClick,
  onClose,
}: {
  item: NavItem;
  isOpen: boolean;
  onClick: () => void;
  onClose?: () => void;
}) {
  const baseDropdown = 'dropdown backdrop-blur-lg bg-[#32323259]';
  const megaClass =
    item.megaVariant === 'prod'
      ? `${baseDropdown} mega prod`
      : item.megaVariant === 'comp'
        ? `${baseDropdown} mega comp`
        : `${baseDropdown} mega`;

  return (
    <div className={isOpen ? 'open' : ''}>
      <span className="navlink" onClick={onClick}>
        <span
          className={`nav-slash transition-all duration-500 text-[#c88a3e] ${
            isOpen ? 'rotate-0' : 'rotate-45'
          }`}
        >
          {ReactIcons.slash}
        </span>
        {item.label}
      </span>
      <div className={megaClass}>
        <DropdownContent
          groups={item.groups!}
          megaVariant={item.megaVariant}
          onClose={onClose}
        />
      </div>
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpenDropdownId(null);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Allow other components across the site to trigger the contact modal
  useEffect(() => {
    const handleOpenModal = () => setIsContactModalOpen(true);
    window.addEventListener('open-contact-modal', handleOpenModal);
    return () => window.removeEventListener('open-contact-modal', handleOpenModal);
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="absolute inset-0 bg-[#32323259] backdrop-blur-[16px] -z-10"></div>
        <div className="wrap nav" ref={navRef}>
          <Link href="/" className="logo">
            <Image
              src="/icons/global/UElement_Logo_White%203.svg"
              alt={'logo'}
              width={150}
              height={150}
            />
          </Link>

          <nav className={`navlinks${menuOpen ? ' open' : ''}`} id="navlinks">
            {navItems.map((item, i) =>
              item.groups ? (
                <NavDropdown
                  item={item}
                  key={i}
                  isOpen={openDropdownId === item.label}
                  onClick={() =>
                    setOpenDropdownId((prev) =>
                      prev === item.label ? null : item.label
                    )
                  }
                  onClose={() => {
                    setOpenDropdownId(null);
                    setMenuOpen(false);
                    if (document.activeElement instanceof HTMLElement) {
                      document.activeElement.blur();
                    }
                  }}
                />
              ) : (
                <div key={i}>
                  <Link
                    href={item.href || '#'}
                    className="navlink"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </div>
              )
            )}

            {/* Mobile Nav Contact Button */}
            <div className="md:hidden pt-4 pb-2 px-3 w-full">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setIsContactModalOpen(true);
                }}
                className="nav-cta w-full text-center cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </nav>

          <button
            type="button"
            onClick={() => setIsContactModalOpen(true)}
            className="nav-cta nav-cta-desktop cursor-pointer"
          >
            Contact Us
          </button>

          <button
            className="burger"
            aria-label="Menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </header>

      {/* Global Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}
