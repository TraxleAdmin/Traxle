'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getDictionary, getLocaleFromPathname, withLocale } from '@/lib/i18n';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';

export default function Navbar() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const dictionary = getDictionary(locale);
  const [open, setOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { href: withLocale(locale), label: dictionary.nav.home },
      { href: withLocale(locale, '/projects'), label: dictionary.nav.projects },
      { href: withLocale(locale, '/about'), label: dictionary.nav.about },
      { href: withLocale(locale, '/services'), label: dictionary.nav.services },
      { href: withLocale(locale, '/contact'), label: dictionary.nav.contact },
    ],
    [dictionary, locale],
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-5 py-5 sm:px-10">
      <nav className="mx-auto flex max-w-[92rem] items-center justify-between">
        <Link href={withLocale(locale)} className="flex items-center gap-4 text-white" aria-label="Traxle">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl font-black text-black">T</span>
          <span className="text-2xl font-black uppercase">TRAXLE</span>
        </Link>

        <div className="flex items-center gap-5">
          <Button href={withLocale(locale, '/contact')} variant="ghost" className="hidden min-h-11 rounded-full border border-white px-6 text-white hover:bg-white/10 sm:inline-flex">
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
          <div className="mb-4 flex justify-end">
            <LanguageSwitcher compact />
          </div>
          <div className="grid gap-2 md:grid-cols-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-white/10 px-5 py-5 text-2xl font-black transition hover:bg-white hover:text-black"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
