'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FiArrowRight, FiMenu, FiX } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { href: '/lojistik', label: 'Platform' },
  { href: '/kunyex', label: 'KünyeX' },
  { href: '/molatik', label: 'Molatik' },
  { href: '/hakkimizda', label: 'Şirket' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (pathname?.startsWith('/panel')) return null;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-[1.7rem] border px-4 transition-all duration-500 md:px-5 ${
          scrolled
            ? 'border-white/10 bg-[#05070d]/78 py-3 shadow-2xl shadow-black/25 backdrop-blur-2xl'
            : 'border-white/0 bg-transparent py-4'
        }`}
      >
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-inner">
            <Image src="/logo.png" alt="Traxle" fill className="object-contain p-2" priority />
          </span>
          <span className="hidden leading-none sm:block">
            <span className="block text-sm font-black tracking-[0.24em] text-white">TRAXLE</span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">Operation OS</span>
          </span>
        </Link>

        <div className="hidden items-center rounded-full border border-white/10 bg-white/[0.055] p-1 backdrop-blur-xl lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  active ? 'bg-white text-slate-950 shadow-lg' : 'text-slate-300 hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link
            href="/iletisim"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-blue-50"
          >
            Demo al
            <FiArrowRight className="transition group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((value) => !value)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-white backdrop-blur-xl transition hover:bg-white/[0.1]"
            aria-label="Menüyü aç/kapat"
          >
            {mobileMenuOpen ? <FiX size={21} /> : <FiMenu size={21} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="mx-auto mt-3 max-w-7xl rounded-[1.8rem] border border-white/10 bg-[#05070d]/92 p-3 shadow-2xl shadow-black/30 backdrop-blur-2xl lg:hidden">
          <div className="grid gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl px-4 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/[0.08] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/iletisim"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950"
            >
              Demo al <FiArrowRight />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
