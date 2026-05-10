"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiInstagram, FiLinkedin } from "react-icons/fi";
import { CONTENT } from "@/lib/i18n/content";
import { detectLocale, isPanelPath, localizedPath } from "@/lib/i18n/routes";

export default function Footer() {
  const pathname = usePathname() ?? "/";
  const locale = detectLocale(pathname);
  const ui = CONTENT[locale];

  if (isPanelPath(pathname)) return null;

  return (
    <footer className="border-t border-gray-200 bg-gray-50 pt-20 pb-10 text-gray-800 transition-colors dark:border-white/10 dark:bg-[#050814] dark:text-gray-100">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-4">
        <div className="space-y-5 md:col-span-2">
          <Link href={`/${locale}`} className="relative block h-10 w-40">
            <Image src="/logo.png" alt="Traxle" fill className="object-contain object-left" />
          </Link>
          <p className="max-w-md text-sm leading-7 text-gray-600 dark:text-gray-300">{ui.footer.description}</p>
          <div className="flex gap-3">
            <Link
              href="#"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:text-white"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </Link>
            <Link
              href="#"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition hover:text-pink-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:text-white"
              aria-label="Instagram"
            >
              <FiInstagram />
            </Link>
          </div>
        </div>

        <div>
          <h5 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-900 dark:text-white">
            {ui.footer.ecosystem}
          </h5>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <li>
              <Link href={localizedPath("kunyex", locale)} className="transition hover:text-blue-600 dark:hover:text-white">
                KunyeX
              </Link>
            </li>
            <li>
              <Link href={localizedPath("molatik", locale)} className="transition hover:text-blue-600 dark:hover:text-white">
                Molatik
              </Link>
            </li>
            <li>
              <Link href={localizedPath("logistics", locale)} className="transition hover:text-blue-600 dark:hover:text-white">
                Logistics
              </Link>
            </li>
            <li>
              <Link href={localizedPath("integrations", locale)} className="transition hover:text-blue-600 dark:hover:text-white">
                {ui.pages.integrations.title}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-900 dark:text-white">
            {ui.footer.company}
          </h5>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <li>
              <Link href={localizedPath("about", locale)} className="transition hover:text-blue-600 dark:hover:text-white">
                {ui.about.badge}
              </Link>
            </li>
            <li>
              <Link href={localizedPath("careers", locale)} className="transition hover:text-blue-600 dark:hover:text-white">
                {ui.pages.careers.title}
              </Link>
            </li>
            <li>
              <Link href={localizedPath("contact", locale)} className="transition hover:text-blue-600 dark:hover:text-white">
                {ui.pages.contact.title}
              </Link>
            </li>
            <li>
              <Link href={localizedPath("updates", locale)} className="transition hover:text-blue-600 dark:hover:text-white">
                {ui.pages.updates.title}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 flex w-full max-w-7xl flex-col items-start justify-between gap-4 border-t border-gray-200 px-4 pt-6 text-xs text-gray-500 dark:border-white/10 dark:text-gray-400 sm:px-6 md:flex-row md:items-center">
        <p>{ui.footer.copyright}</p>
        <div className="flex flex-wrap gap-4">
          <Link href={localizedPath("privacy", locale)} className="transition hover:text-blue-600 dark:hover:text-white">
            {ui.pages.privacy.title}
          </Link>
          <Link href={localizedPath("terms", locale)} className="transition hover:text-blue-600 dark:hover:text-white">
            {ui.pages.terms.title}
          </Link>
          <Link href={localizedPath("cookies", locale)} className="transition hover:text-blue-600 dark:hover:text-white">
            {ui.pages.cookies.title}
          </Link>
          <Link href={localizedPath("kvkk", locale)} className="transition hover:text-blue-600 dark:hover:text-white">
            {ui.pages.kvkk.title}
          </Link>
        </div>
      </div>
    </footer>
  );
}
