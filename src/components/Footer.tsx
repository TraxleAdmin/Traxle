"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiInstagram, FiLinkedin } from "react-icons/fi";
import { FaCookieBite } from "react-icons/fa";
import { CONTENT } from "@/lib/i18n/content";
import { detectLocale, isPanelPath, localizedPath } from "@/lib/i18n/routes";

export default function Footer() {
  const pathname = usePathname() ?? "/";
  const locale = detectLocale(pathname);
  const ui = CONTENT[locale];

  if (isPanelPath(pathname)) return null;

  return (
    <footer className="relative overflow-hidden border-t border-slate-200/70 bg-slate-50/90 pt-20 pb-10 text-slate-800 transition-colors dark:border-white/10 dark:bg-[#04060f] dark:text-gray-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.14),transparent_38%)]" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-4">
        <div className="space-y-5 md:col-span-2">
          <Link href={`/${locale}`} className="relative block h-10 w-40">
            <Image src="/logo.png" alt="Traxle" fill className="object-contain object-left" />
          </Link>
          <p className="max-w-md text-sm leading-7 text-slate-600 dark:text-slate-300">{ui.footer.description}</p>
          <div className="flex gap-3">
            <Link
              href="#"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-600 shadow-sm transition hover:border-cyan-300 hover:text-cyan-600 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:text-white"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </Link>
            <Link
              href="#"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-600 shadow-sm transition hover:border-fuchsia-300 hover:text-fuchsia-600 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:text-white"
              aria-label="Instagram"
            >
              <FiInstagram />
            </Link>
          </div>
        </div>

        <div>
          <h5 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
            {ui.footer.ecosystem}
          </h5>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <Link href={localizedPath("kunyex", locale)} className="transition hover:text-cyan-600 dark:hover:text-white">
                KunyeX
              </Link>
            </li>
            <li>
              <Link href={localizedPath("molatik", locale)} className="transition hover:text-cyan-600 dark:hover:text-white">
                Molatik
              </Link>
            </li>
            <li>
              <Link href={localizedPath("logistics", locale)} className="transition hover:text-cyan-600 dark:hover:text-white">
                Logistics
              </Link>
            </li>
            <li>
              <Link href={localizedPath("integrations", locale)} className="transition hover:text-cyan-600 dark:hover:text-white">
                {ui.pages.integrations.title}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
            {ui.footer.company}
          </h5>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <Link href={localizedPath("about", locale)} className="transition hover:text-cyan-600 dark:hover:text-white">
                {ui.about.badge}
              </Link>
            </li>
            <li>
              <Link href={localizedPath("careers", locale)} className="transition hover:text-cyan-600 dark:hover:text-white">
                {ui.pages.careers.title}
              </Link>
            </li>
            <li>
              <Link href={localizedPath("contact", locale)} className="transition hover:text-cyan-600 dark:hover:text-white">
                {ui.pages.contact.title}
              </Link>
            </li>
            <li>
              <Link href={localizedPath("updates", locale)} className="transition hover:text-cyan-600 dark:hover:text-white">
                {ui.pages.updates.title}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative mx-auto mt-10 flex w-full max-w-7xl flex-col items-start justify-between gap-4 border-t border-slate-200/70 px-4 pt-6 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400 sm:px-6 md:flex-row md:items-center">
        <p>{ui.footer.copyright}</p>
        <div className="flex flex-wrap gap-4">
          <Link href={localizedPath("privacy", locale)} className="transition hover:text-cyan-600 dark:hover:text-white">
            {ui.pages.privacy.title}
          </Link>
          <Link href={localizedPath("terms", locale)} className="transition hover:text-cyan-600 dark:hover:text-white">
            {ui.pages.terms.title}
          </Link>
          <Link href={localizedPath("cookies", locale)} className="transition hover:text-cyan-600 dark:hover:text-white">
            <span className="inline-flex items-center gap-1">
              <FaCookieBite className="text-[11px]" />
              {ui.pages.cookies.title}
            </span>
          </Link>
          <Link href={localizedPath("kvkk", locale)} className="transition hover:text-cyan-600 dark:hover:text-white">
            {ui.pages.kvkk.title}
          </Link>
        </div>
      </div>
    </footer>
  );
}

