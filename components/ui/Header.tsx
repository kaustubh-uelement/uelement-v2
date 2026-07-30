'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { navItems, type NavItem, type DropdownGroup } from '@/lib/navigation';
import { ReactIcons } from '../../utils/ReactIcons';

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
              onClick={onClose}
            >
              {group.heading}
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
          className={`transition-all duration-500 text-[#c88a3e] ${isOpen ? 'rotate-0' : 'rotate-45'}`}
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

  return (
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
        </nav>

        <Link href="/contact" className="nav-cta nav-cta-desktop">
          Contact Us
        </Link>

        <button
          className="burger"
          aria-label="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>
    </header>
  );
}
