'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname?.startsWith('/panel')) return null;

  return (
    <>
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/80 dark:bg-[#050814]/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 py-3' 
        : 'bg-transparent border-b border-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="relative h-8 w-32 hover:opacity-80 transition-opacity">
          <Image 
            src="/logo.png" 
            alt="TraxleAPP" 
            fill 
            className="object-contain object-left dark:invert-0 invert-0 dark:filter-none filter" 
            priority 
          />
        </Link>

        {/* ORTA MENÜ */}
        <div className="hidden md:flex items-center gap-1 bg-gray-100 dark:bg-white/5 p-1 rounded-full border border-gray-200 dark:border-white/5 backdrop-blur-md">
          <NavLink href="/kunyex">KünyeX</NavLink>
          <NavLink href="/molatik">Molatik</NavLink>
          <NavLink href="/lojistik">Lojistik</NavLink>
          <NavLink href="/hakkimizda">Şirket</NavLink>
        </div>

        {/* SAĞ KISIM - SADECE TEMA BUTONU */}
        <div className="hidden md:flex items-center gap-4">
          <div className="scale-90"><ThemeToggle /></div>
        </div>

        {/* MOBİL MENÜ BUTONU */}
        <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-900 dark:text-white p-2">
                {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
        </div>
      </div>
    </nav>
    </>
  );
}

const NavLink = ({href, children}: {href:string, children:React.ReactNode}) => (
  <Link href={href} className="px-5 py-2 rounded-full text-sm font-medium transition-all text-gray-600 hover:text-black hover:bg-white dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10">{children}</Link>
);