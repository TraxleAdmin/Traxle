'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Boxes, Menu, Moon, Sun, X } from 'lucide-react';
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
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const currentTheme = mounted ? resolvedTheme : 'dark';
  const themeIcon = currentTheme === 'light' ? <Moon size={17} /> : <Sun size={17} />;
  const toggleTheme = () => {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 rounded-lg border border-slate-200 bg-white/90 px-3 py-3 shadow-[0_18px_60px_rgba(15,23,42,0.10)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#050a13]/88 dark:shadow-[0_18px_70px_rgba(0,0,0,0.36)]">
        <Link href={withLocale(locale)} className="relative h-8 w-32 shrink-0" aria-label="Traxle">
          <Image
            src="/logo.png"
            alt="Traxle"
            fill
            sizes="128px"
            priority
            className="object-contain object-left brightness-0 dark:brightness-100"
          />
        </Link>

        <div className="hidden items-center justify-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== withLocale(locale) && pathname.startsWith(`${item.href}/`));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300',
                  active
                    ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white',
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
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-800 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 dark:border-white/10 dark:bg-white/[0.08] dark:text-white dark:hover:bg-white/[0.14]"
            aria-label={dictionary.themeLabel}
          >
            {themeIcon}
          </button>
          <Button href={withLocale(locale, '/projects')} variant="secondary" className="min-h-10 gap-2 rounded-md px-4">
            <Boxes size={16} aria-hidden="true" />
            {dictionary.nav.projects}
          </Button>
          <Button href={withLocale(locale, '/contact')} className="min-h-10 rounded-md px-4">
            {dictionary.home.secondaryCta}
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher compact />
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/10 bg-slate-950/[0.82] text-white shadow-[0_10px_30px_rgba(15,23,42,0.18)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 dark:bg-white/[0.08]"
            aria-label={dictionary.themeLabel}
          >
            {themeIcon}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-white/10 bg-slate-950/[0.82] text-white shadow-[0_10px_30px_rgba(15,23,42,0.18)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 dark:bg-white/[0.08]"
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mx-auto mt-3 max-w-7xl rounded-lg border border-slate-200 bg-white/96 p-3 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-black/90 lg:hidden">
          <div className="grid gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-4 py-3 text-sm font-black text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Button href={withLocale(locale, '/contact')} className="mt-3 w-full rounded-md">
            {dictionary.home.secondaryCta}
          </Button>
        </div>
      )}
    </header>
  );
}
