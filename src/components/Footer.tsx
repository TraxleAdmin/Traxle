'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

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
    <footer className="border-t border-gray-200 bg-[#f6f8fb] px-5 py-12 text-gray-600 dark:border-white/10 dark:bg-[#030712] dark:text-gray-400">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-end">
        <div>
          <Link href="/" className="relative block h-10 w-36" aria-label="TraxleAPP">
            <Image
              src="/logo.png"
              alt="TraxleAPP"
              fill
              sizes="144px"
              className="object-contain object-left brightness-0 dark:brightness-100"
            />
          </Link>
          <p className="mt-5 max-w-md text-sm font-medium leading-7">
            Barkod, personel, belge ve lojistik operasyonlarını tek ürün ekosisteminde toplayan Traxle yazılım hattı.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex min-h-12 items-center justify-between rounded-lg border border-gray-200 bg-white/70 px-3 text-sm font-black text-gray-700 transition hover:border-slate-950 hover:bg-white dark:border-white/10 dark:bg-white/[0.045] dark:text-gray-200 dark:hover:border-white/30"
            >
              {link.label}
              <ArrowUpRight size={14} className="text-gray-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-gray-200 pt-6 text-xs dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Traxle. Tüm hakları saklıdır.</p>
        <div className="flex gap-5">
          <Link href="/gizlilik-politikasi" className="font-black hover:text-cyan-600">Gizlilik</Link>
          <Link href="/kullanim-kosullari" className="font-black hover:text-cyan-600">Kullanım Koşulları</Link>
        </div>
      </div>
    </footer>
  );
}
