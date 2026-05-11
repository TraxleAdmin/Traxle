"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { FiChevronDown, FiGlobe } from "react-icons/fi";
import { CONTENT } from "@/lib/i18n/content";
import {
  LOCALES,
  LOCALE_META,
  localizedPath,
  replaceLocaleInPath,
  resolveRoute,
} from "@/lib/i18n/routes";

function flagEmoji(countryCode: string): string {
  return countryCode
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");
}

export default function LanguageSwitcher() {
  const pathname = usePathname() ?? "/";
  const { locale, routeKey } = resolveRoute(pathname);
  const [open, setOpen] = useState(false);

  const current = LOCALE_META[locale];
  const text = CONTENT[locale].nav;

  const options = useMemo(
    () =>
      LOCALES.map((targetLocale) => {
        const href = routeKey
          ? localizedPath(routeKey, targetLocale)
          : replaceLocaleInPath(pathname, targetLocale);

        return {
          locale: targetLocale,
          href,
          label: LOCALE_META[targetLocale].nativeLabel,
          flag: flagEmoji(LOCALE_META[targetLocale].flag),
        };
      }),
    [pathname, routeKey],
  );

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-gray-300 hover:text-gray-900 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:border-white/20 dark:hover:text-white"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={text.languageLabel}
      >
        <FiGlobe className="text-base" />
        <span>{flagEmoji(current.flag)}</span>
        <span className="hidden sm:inline">{current.nativeLabel}</span>
        <FiChevronDown
          className={`text-sm transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-[#0b1322]"
        >
          {options.map((option) => (
            <Link
              key={option.locale}
              href={option.href}
              onClick={() => setOpen(false)}
              role="menuitem"
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
                option.locale === locale
                  ? "bg-gray-100 font-semibold text-gray-900 dark:bg-white/10 dark:text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
              }`}
            >
              <span>{option.flag}</span>
              <span>{option.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
