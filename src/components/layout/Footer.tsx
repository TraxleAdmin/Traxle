import Link from 'next/link';
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
    <footer className="bg-black px-5 py-16 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 border-t border-white/10 pt-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl font-black text-black">T</span>
            <span className="text-2xl font-black uppercase">TRAXLE</span>
          </div>
          <p className="mt-6 max-w-md text-base leading-7 text-white/60">{dictionary.footer.description}</p>
          <p className="mt-10 text-sm text-white/40">Traxle © {year}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex min-h-16 items-center justify-between rounded-2xl border border-white/10 px-4 text-lg font-light lowercase transition hover:bg-white hover:text-black"
            >
              {link.label}
              <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
