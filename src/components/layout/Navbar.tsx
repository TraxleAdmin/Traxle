'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/Button';
import {
  getDictionary,
  getLocaleFromPathname,
  withLocale,
} from '@/lib/i18n';
import { cn } from '@/lib/cn';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';

export default function Navbar() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const dictionary = getDictionary(locale);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

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

  const themeIcon = theme === 'light' ? <Moon size={17} /> : <Sun size={17} />;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-[1.65rem] border border-slate-200/80 bg-white/76 px-4 py-3 shadow-[0_22px_70px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-black/48 dark:shadow-[0_22px_80px_rgba(0,0,0,0.42)] lg:rounded-full">
        <Link href={withLocale(locale)} className="relative h-8 w-32 shrink-0" aria-label="Traxle">
          <Image
            src="/logo.png"
            alt="Traxle"
            fill
            priority
            className="object-contain object-left brightness-0 dark:brightness-100"
          />
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50/70 p-1 dark:border-white/10 dark:bg-white/5 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== withLocale(locale) && pathname.startsWith(`${item.href}/`));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300',
                  active
                    ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                    : 'text-slate-600 hover:bg-white hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white',
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 dark:border-white/10 dark:bg-white/8 dark:text-white dark:hover:bg-white/14"
            aria-label={dictionary.themeLabel}
          >
            {themeIcon}
          </button>
          <Button href={withLocale(locale, '/contact')} className="min-h-10 px-4">
            {dictionary.home.secondaryCta}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 dark:border-white/10 dark:bg-white/8 dark:text-white lg:hidden"
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="mx-auto mt-3 max-w-7xl rounded-[1.5rem] border border-slate-200 bg-white/96 p-3 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-black/90 lg:hidden">
          <div className="grid gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 border-t border-slate-200 pt-3 dark:border-white/10">
            <LanguageSwitcher compact />
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 dark:border-white/10 dark:bg-white/10 dark:text-white"
              aria-label={dictionary.themeLabel}
            >
              {themeIcon}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
