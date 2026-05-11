"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { CONTENT } from "@/lib/i18n/content";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import {
  detectLocale,
  isPanelPath,
  localizedPath,
  resolveRoute,
  RouteKey,
} from "@/lib/i18n/routes";

interface NavLinkProps {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}

function NavLink({ href, label, active, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        active
          ? "bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-[0_10px_24px_rgba(37,99,235,0.4)]"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const locale = detectLocale(pathname);
  const { routeKey } = resolveRoute(pathname);
  const ui = CONTENT[locale].nav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = useMemo(
    () =>
      ui.links.map((item) => ({
        ...item,
        href: localizedPath(item.key, locale),
        active: routeKey === item.key,
      })),
    [locale, routeKey, ui.links],
  );

  if (isPanelPath(pathname)) return null;

  const ctaHref = localizedPath(ui.cta.key, locale);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/70 bg-white/75 py-3 shadow-[0_10px_40px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#04060f]/72"
          : "border-b border-transparent bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href={`/${locale}`} className="relative h-9 w-36 shrink-0">
          <Image src="/logo.png" alt="Traxle" fill className="object-contain object-left" priority />
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-slate-200/80 bg-white/75 p-1 shadow-[0_8px_24px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06] md:flex">
          {navLinks.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} active={item.active} />
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link
            href={ctaHref}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              routeKey === (ui.cta.key as RouteKey)
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_10px_30px_rgba(37,99,235,0.4)]"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:from-cyan-500 hover:to-blue-600"
            }`}
          >
            {ui.cta.label}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="rounded-full border border-slate-200/80 bg-white/75 p-2 text-slate-700 shadow-sm transition hover:bg-white dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:hover:bg-white/10"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mx-4 mt-3 rounded-3xl border border-slate-200/80 bg-white/85 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.2)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#0b1322]/90 md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                active={item.active}
                onClick={() => setMobileMenuOpen(false)}
              />
            ))}
            <Link
              href={ctaHref}
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-center text-sm font-semibold text-white transition hover:from-blue-600 hover:to-indigo-600"
            >
              {ui.cta.label}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

