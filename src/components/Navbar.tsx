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
          ? "bg-slate-950 text-white shadow-sm dark:bg-white dark:text-[#050814]"
          : "text-slate-600 hover:bg-slate-950/5 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
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
      className="fixed inset-x-0 top-3 z-50 px-3 transition-all duration-300"
    >
      <div
        className={`mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border px-3 py-2 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition-all duration-300 sm:px-4 ${
          scrolled
            ? "border-slate-200/80 bg-white/82 dark:border-white/10 dark:bg-[#050814]/82"
            : "border-slate-200/60 bg-white/58 dark:border-white/10 dark:bg-[#050814]/48"
        }`}
      >
        <Link href={`/${locale}`} className="relative h-10 w-36 shrink-0 rounded-full">
          <Image src="/logo.png" alt="Traxle" fill className="object-contain object-left" priority />
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-slate-200/70 bg-white/70 p-1 shadow-sm dark:border-white/10 dark:bg-white/5 md:flex">
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
                ? "bg-slate-950 text-white dark:bg-white dark:text-[#050814]"
                : "bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-[#050814] dark:hover:bg-slate-200"
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
            className="rounded-full border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mx-auto mt-3 max-w-7xl rounded-3xl border border-slate-200 bg-white/92 p-4 shadow-xl backdrop-blur-2xl dark:border-white/10 dark:bg-[#0b1322]/95 md:hidden">
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
              className="mt-2 rounded-full bg-slate-950 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-[#050814]"
            >
              {ui.cta.label}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
