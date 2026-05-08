import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { getDictionary, type Locale, withLocale } from '@/lib/i18n';

export default function Footer({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const year = new Date().getFullYear();

  const links = [
    { href: withLocale(locale), label: dictionary.nav.home },
    { href: withLocale(locale, '/projects'), label: dictionary.nav.projects },
    { href: withLocale(locale, '/about'), label: dictionary.nav.about },
    { href: withLocale(locale, '/services'), label: dictionary.nav.services },
    { href: withLocale(locale, '/contact'), label: dictionary.nav.contact },
  ];

  return (
    <footer className="relative border-t border-slate-200 bg-[#f6f8fb] px-5 py-12 text-slate-600 dark:border-white/10 dark:bg-[#030712] dark:text-slate-400">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
        <div>
          <Link href={withLocale(locale)} className="relative block h-9 w-36" aria-label="Traxle">
            <Image src="/logo.png" alt="Traxle" fill sizes="144px" className="object-contain object-left brightness-0 dark:brightness-100" />
          </Link>
          <p className="mt-5 max-w-md text-sm font-medium leading-7">{dictionary.footer.description}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex min-h-12 items-center justify-between rounded-lg border border-slate-200 bg-white/70 px-3 text-sm font-black text-slate-700 transition hover:border-slate-950 hover:bg-white dark:border-white/10 dark:bg-white/[0.045] dark:text-slate-200 dark:hover:border-white/30"
            >
              {link.label}
              <ArrowUpRight size={14} className="text-slate-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-slate-200 pt-6 text-xs dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} Traxle. {dictionary.footer.rights}
        </p>
        <Link href={withLocale(locale, '/contact')} className="font-black text-cyan-700 dark:text-cyan-200">
          support@traxleapp.com
        </Link>
      </div>
    </footer>
  );
}
