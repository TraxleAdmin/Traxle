'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Languages } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import {
  getDictionary,
  getLocaleFromPathname,
  languageOptions,
  switchLocalePath,
  type Locale,
} from '@/lib/i18n';
import { cn } from '@/lib/cn';

const localeLabels: Record<Locale, string> = {
  tr: 'TR',
  en: 'EN',
  de: 'DE',
  ar: 'AR',
  ru: 'RU',
};

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = getLocaleFromPathname(pathname);
  const dictionary = getDictionary(locale);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentLanguage = languageOptions.find((language) => language.locale === locale) ?? languageOptions[0];

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick);
  }, []);

  const selectLocale = (nextLocale: Locale) => {
    setOpen(false);
    router.push(switchLocalePath(pathname, nextLocale));
  };

  return (
    <div ref={containerRef} className={cn('relative', compact && 'min-w-[92px]')}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={dictionary.languageLabel}
        className={cn(
          'group relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-full border border-slate-200/80 bg-white px-3 text-sm font-black text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.86),0_14px_38px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition hover:border-cyan-300/80 hover:shadow-[0_0_38px_rgba(0,194,255,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 dark:border-white/12 dark:bg-[#08111d] dark:text-white dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_16px_44px_rgba(0,0,0,0.38)]',
          compact ? 'min-w-[92px] px-3' : 'min-w-[164px]',
        )}
      >
        <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent,rgba(34,211,238,0.14),transparent_58%)] opacity-0 transition duration-500 group-hover:opacity-100" />
        <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/14 text-cyan-700 shadow-[0_0_22px_rgba(34,211,238,0.12)] dark:text-cyan-100">
          <Languages size={15} aria-hidden="true" />
        </span>
        <span className="relative inline-flex items-center gap-2">
          <span className="rounded-full bg-cyan-300/10 px-1.5 py-0.5 text-[11px] tracking-[0.22em] text-cyan-700 dark:text-cyan-200">{localeLabels[locale]}</span>
          {!compact && <span className="text-sm">{currentLanguage.nativeName}</span>}
        </span>
        <ChevronDown size={15} className={cn('relative transition duration-300', open && 'rotate-180')} aria-hidden="true" />
      </button>

      {open && (
        <div
          role="menu"
          className={cn(
            'language-menu-panel absolute right-0 top-[calc(100%+0.7rem)] z-[80] w-72 overflow-hidden rounded-[1.35rem] border border-slate-200/80 p-2 shadow-[0_28px_90px_rgba(15,23,42,0.22)] dark:border-white/12 dark:shadow-[0_28px_100px_rgba(0,0,0,0.66)]',
            compact && '-right-24 w-[calc(100vw-2rem)] max-w-[22rem]',
          )}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-cyan-300/[0.10] blur-3xl" />
          <div className="relative mb-1 rounded-[1rem] border border-slate-200/70 bg-slate-50 px-3 py-3 dark:border-white/10 dark:bg-[#0b111c]">
            <div className="text-[10px] font-black uppercase tracking-[0.28em] text-cyan-700 dark:text-cyan-200">
              {dictionary.languageLabel}
            </div>
            <div className="mt-1 flex items-center justify-between gap-3">
              <span className="truncate text-sm font-black text-slate-950 dark:text-white">{currentLanguage.nativeName}</span>
              <span className="rounded-full border border-cyan-300/25 bg-cyan-300/12 px-2 py-1 text-[10px] font-black tracking-[0.2em] text-cyan-700 dark:text-cyan-100">
                {localeLabels[locale]}
              </span>
            </div>
          </div>
          <div className="relative grid gap-1">
            {languageOptions.map((language) => {
              const active = language.locale === locale;

              return (
                <button
                  key={language.locale}
                  type="button"
                  role="menuitem"
                  onClick={() => selectLocale(language.locale)}
                  className={cn(
                    'flex min-h-12 items-center justify-between rounded-2xl px-3 text-left text-sm font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300',
                    active
                      ? 'bg-slate-950 text-white shadow-[0_14px_34px_rgba(15,23,42,0.18)] dark:bg-white dark:text-slate-950'
                      : 'text-slate-700 hover:bg-slate-100/90 dark:text-slate-200 dark:hover:bg-white/10',
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className={cn(
                      'inline-flex h-8 w-8 items-center justify-center rounded-full border text-[11px] tracking-[0.14em]',
                      active
                        ? 'border-white/20 bg-white/[0.12] text-white dark:border-slate-200 dark:bg-slate-950 dark:text-cyan-100'
                        : 'border-slate-200/80 bg-white text-slate-700 dark:border-white/10 dark:bg-black/35 dark:text-cyan-100',
                    )}>
                      {localeLabels[language.locale]}
                    </span>
                    <span>
                      <span className="block">{language.nativeName}</span>
                      <span className={cn('block text-xs font-bold', active ? 'text-white/65 dark:text-slate-600' : 'text-slate-400')}>
                        {language.label}
                      </span>
                    </span>
                  </span>
                  {active && <Check size={16} aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
