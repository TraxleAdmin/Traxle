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
    <div ref={containerRef} className={cn('relative', compact && 'w-full')}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={dictionary.languageLabel}
        className={cn(
          'group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/86 px-3 text-sm font-black text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_12px_34px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition hover:border-cyan-300/70 hover:shadow-[0_0_34px_rgba(0,194,255,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 dark:border-white/10 dark:bg-white/8 dark:text-white dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_14px_38px_rgba(0,0,0,0.35)]',
          compact ? 'w-full justify-between px-4' : 'min-w-[154px]',
        )}
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-cyan-300/16 text-cyan-700 dark:text-cyan-100">
          <Languages size={15} aria-hidden="true" />
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="text-[11px] tracking-[0.22em] text-cyan-700 dark:text-cyan-200">{localeLabels[locale]}</span>
          {!compact && <span className="text-sm">{currentLanguage.nativeName}</span>}
        </span>
        <ChevronDown size={15} className={cn('transition duration-300', open && 'rotate-180')} aria-hidden="true" />
      </button>

      {open && (
        <div
          role="menu"
          className={cn(
            'absolute right-0 top-[calc(100%+0.6rem)] z-50 w-64 overflow-hidden rounded-[1.35rem] border border-slate-200/80 bg-white/92 p-2 shadow-[0_24px_80px_rgba(15,23,42,0.22)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#05070d]/92 dark:shadow-[0_24px_90px_rgba(0,0,0,0.62)]',
            compact && 'left-0 right-auto w-full',
          )}
        >
          <div className="px-3 pb-2 pt-2 text-[10px] font-black uppercase tracking-[0.28em] text-slate-400 dark:text-slate-500">
            {dictionary.languageLabel}
          </div>
          <div className="grid gap-1">
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
                      ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10',
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200/80 bg-white text-[11px] tracking-[0.14em] text-slate-700 dark:border-white/10 dark:bg-black/35 dark:text-cyan-100">
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
