'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FiArrowRight, FiInstagram, FiLinkedin, FiMail, FiMapPin } from 'react-icons/fi';

const ecosystem = [
  ['Traxle Platform', '/lojistik'],
  ['KünyeX', '/kunyex'],
  ['Molatik', '/molatik'],
];

const company = [
  ['Hakkımızda', '/hakkimizda'],
  ['İletişim', '/iletisim'],
  ['Gizlilik Politikası', '/gizlilik-politikasi'],
  ['Kullanım Koşulları', '/kullanim-kosullari'],
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/panel')) return null;

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#05070d] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-[-220px] left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:76px_76px] opacity-[0.05]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_.75fr_.75fr_.9fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]">
                <Image src="/logo.png" alt="Traxle" fill className="object-contain p-2" />
              </span>
              <span>
                <span className="block text-base font-black tracking-[0.28em]">TRAXLE</span>
                <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Operation OS</span>
              </span>
            </Link>
            <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">
              Ağır operasyonlar, lojistik, saha doğrulama, ödeme kurguları ve kurumsal otomasyon için tasarlanan yeni nesil teknoloji ekosistemi.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="#" className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-slate-300 transition hover:bg-white hover:text-slate-950"><FiLinkedin /></Link>
              <Link href="#" className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-slate-300 transition hover:bg-white hover:text-slate-950"><FiInstagram /></Link>
            </div>
          </div>

          <FooterColumn title="Ekosistem" items={ecosystem} />
          <FooterColumn title="Kurumsal" items={company} />

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
            <h3 className="text-lg font-black tracking-tight">Proje görüşmesi</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">Operasyonunu dijitalleştirmek isteyen işletmeler için ürün, ödeme ve saha mimarisini birlikte planlayalım.</p>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <div className="flex items-center gap-3"><FiMail className="text-blue-300" /> contact@traxleapp.com</div>
              <div className="flex items-center gap-3"><FiMapPin className="text-blue-300" /> Antalya, Türkiye</div>
            </div>
            <Link href="/iletisim" className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5">
              İletişime geç <FiArrowRight className="transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Traxle. Tüm hakları saklıdır.</p>
          <p>Güvenli, ölçeklenebilir ve operasyon odaklı yazılım altyapısı.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[][] }) {
  return (
    <div>
      <h3 className="text-sm font-black uppercase tracking-[0.22em] text-slate-300">{title}</h3>
      <ul className="mt-6 space-y-4 text-sm text-slate-400">
        {items.map(([label, href]) => (
          <li key={href}>
            <Link href={href} className="transition hover:text-white">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
