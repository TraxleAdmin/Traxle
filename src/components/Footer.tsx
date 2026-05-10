'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';

const localizedPrefixes = ['/tr', '/en', '/de', '/ar', '/ru'];

export default function Footer() {
  const pathname = usePathname();
  if (
    pathname?.startsWith('/panel') ||
    localizedPrefixes.some((prefix) => pathname === prefix || pathname?.startsWith(`${prefix}/`))
  ) return null;

  const links = [
    { href: '/tr/urunler', label: 'Ürünler' },
    { href: '/barkodx', label: 'BarkodX' },
    { href: '/molatik', label: 'Molatik' },
    { href: '/kunyex', label: 'KünyeX' },
    { href: '/lojistik', label: 'Lojistik' },
    { href: '/iletisim', label: 'İletişim' },
  ];

  return (
    <footer className="bg-black px-5 py-16 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 border-t border-white/10 pt-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl font-black text-black">T</span>
            <span className="text-2xl font-black uppercase">TRAXLE</span>
          </div>
          <p className="mt-6 max-w-md text-base leading-7 text-white/60">
            Barkod, personel, belge ve lojistik operasyonlarını tek ürün ekosisteminde toplayan Traxle yazılım hattı.
          </p>
          <p className="mt-10 text-sm text-white/40">Traxle © 2026</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex min-h-16 items-center justify-between rounded-2xl border border-white/10 px-4 text-lg font-light lowercase transition hover:bg-white hover:text-black"
            >
              {link.label}
              <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
