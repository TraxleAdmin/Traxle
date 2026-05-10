'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/Button';

const localizedPrefixes = ['/tr', '/en', '/de', '/ar', '/ru'];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5 py-5 sm:px-10">
      <nav className="mx-auto flex max-w-[92rem] items-center justify-between">
        <Link href="/" className="flex items-center gap-4 text-white" aria-label="Traxle">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl font-black text-black">T</span>
          <span className="text-2xl font-black uppercase">TRAXLE</span>
        </Link>

        <div className="flex items-center gap-5">
          <Button href="/iletisim" variant="ghost" className="hidden min-h-11 rounded-full border border-white px-6 text-white hover:bg-white/10 sm:inline-flex">
            contact us
          </Button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-12 w-12 items-center justify-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X size={34} strokeWidth={1.8} /> : <Menu size={38} strokeWidth={1.8} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-5 max-w-[92rem] rounded-[2rem] border border-white/10 bg-black/92 p-5 text-white shadow-2xl backdrop-blur-2xl">
          <div className="grid gap-2 md:grid-cols-5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-white/10 px-5 py-5 text-2xl font-black transition hover:bg-white hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
