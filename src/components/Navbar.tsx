'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Boxes, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const localizedPrefixes = ['/tr', '/en', '/de', '/ar', '/ru'];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (
    pathname?.startsWith('/panel') ||
    localizedPrefixes.some((prefix) => pathname === prefix || pathname?.startsWith(`${prefix}/`))
  ) return null;

  return (
    <>
      <nav className={`fixed top-0 z-50 w-full px-3 transition-all duration-500 sm:px-5 ${scrolled ? 'py-3' : 'py-4'}`}>
        <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 rounded-lg border border-slate-200 bg-white/90 px-3 py-3 shadow-[0_18px_60px_rgba(15,23,42,0.10)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#050a13]/88">
          <Link href="/" className="relative h-8 w-32 shrink-0 hover:opacity-80" aria-label="TraxleAPP">
            <Image
              src="/logo.png"
              alt="TraxleAPP"
              fill
              sizes="128px"
              className="object-contain object-left"
              priority
            />
          </Link>

          <div className="hidden items-center justify-center gap-1 md:flex">
            <NavLink href="/tr/urunler">Ürünler</NavLink>
            <NavLink href="/kunyex">KünyeX</NavLink>
            <NavLink href="/molatik">Molatik</NavLink>
            <NavLink href="/barkodx">BarkodX</NavLink>
            <NavLink href="/lojistik">Lojistik</NavLink>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Link href="/tr/urunler" className="inline-flex min-h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-black text-slate-900 transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.08] dark:text-white dark:hover:bg-white/[0.14]">
              <Boxes size={16} aria-hidden="true" />
              Kartlar
            </Link>
            <div className="scale-90"><ThemeToggle /></div>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-md p-2 text-gray-900 dark:text-white"
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed left-4 right-4 top-20 z-40 rounded-lg border border-gray-200 bg-white/95 p-3 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#080c14]/95 md:hidden">
          <MobileNavLink href="/tr/urunler" onClick={() => setMobileMenuOpen(false)}>Ürünler</MobileNavLink>
          <MobileNavLink href="/kunyex" onClick={() => setMobileMenuOpen(false)}>KünyeX</MobileNavLink>
          <MobileNavLink href="/molatik" onClick={() => setMobileMenuOpen(false)}>Molatik</MobileNavLink>
          <MobileNavLink href="/barkodx" onClick={() => setMobileMenuOpen(false)}>BarkodX</MobileNavLink>
          <MobileNavLink href="/lojistik" onClick={() => setMobileMenuOpen(false)}>Lojistik</MobileNavLink>
        </div>
      )}
    </>
  );
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="rounded-md px-3 py-2 text-sm font-black text-gray-600 transition-all hover:bg-slate-100 hover:text-black dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white">
    {children}
  </Link>
);

const MobileNavLink = ({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) => (
  <Link href={href} onClick={onClick} className="block rounded-md px-4 py-3 text-sm font-black text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10">
    {children}
  </Link>
);
