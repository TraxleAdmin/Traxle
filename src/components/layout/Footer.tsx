import Link from 'next/link';
import Image from 'next/image';
import { getDictionary, type Locale, withLocale } from '@/lib/i18n';

export default function Footer({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const year = new Date().getFullYear();

  const links = [
    { href: withLocale(locale), label: dictionary.nav.home },
    { href: withLocale(locale, '/projects'), label: dictionary.nav.projects },
    { href: withLocale(locale, '/services'), label: dictionary.nav.services },
    { href: withLocale(locale, '/contact'), label: dictionary.nav.contact },
  ];

  return (
    <footer className="relative border-t border-slate-200 bg-white px-5 py-12 text-slate-600 dark:border-white/10 dark:bg-black dark:text-slate-400">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <Link href={withLocale(locale)} className="relative block h-9 w-36" aria-label="Traxle">
            <Image src="/logo.png" alt="Traxle" fill className="object-contain object-left brightness-0 dark:brightness-100" />
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7">{dictionary.footer.description}</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold transition hover:border-cyan-300 hover:text-slate-950 dark:border-white/10 dark:hover:border-cyan-300/60 dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-slate-200 pt-6 text-xs dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} Traxle. {dictionary.footer.rights}
        </p>
        <Link href={withLocale(locale, '/contact')} className="font-bold text-cyan-700 dark:text-cyan-200">
          support@traxleapp.com
        </Link>
      </div>
    </footer>
  );
}
