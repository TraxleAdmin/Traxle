'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiInstagram, FiLinkedin } from 'react-icons/fi';
import Image from 'next/image';

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/panel')) return null;

  return (
    <footer className="bg-gray-50 dark:bg-[#050814] border-t border-gray-200 dark:border-white/5 pt-20 pb-12 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 space-y-6">
{/* LOGO */}
            <Link href="/" className="block relative h-10 w-36 mb-4 hover:opacity-80 transition-opacity">
              <Image
                src="/logo.png"
                alt="TraxleAPP"
                fill
                className="object-contain object-left dark:filter-none filter brightness-0 dark:brightness-100 opacity-80 dark:opacity-100 transition-all"
              />
            </Link>

            <p className="text-sm leading-7 text-gray-500 dark:text-gray-400 max-w-sm">
              Lojistik, dijital kimlik ve personel yönetimi alanlarında sınırları zorlayan, yapay zeka destekli yeni nesil SaaS ürünleri geliştiren bir teknoloji ekosistemi.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 hover:text-blue-500 transition-all"><FiLinkedin /></Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 hover:text-pink-500 transition-all"><FiInstagram /></Link>
            </div>
          </div>
          <div>
            <h5 className="font-bold text-gray-900 dark:text-white mb-6">Ekosistem</h5>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="/" className="hover:text-blue-500 transition-colors">Lojistik Çözümleri</Link></li>
              <li><Link href="/" className="hover:text-blue-500 transition-colors">KünyeX (Dijital Kimlik)</Link></li>
              <li><Link href="/" className="hover:text-blue-500 transition-colors">Molatik (Personel Takip)</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-gray-900 dark:text-white mb-6">Kurumsal</h5>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="/hakkimizda" className="hover:text-blue-500 transition-colors">Şirket Hakkında</Link></li>
              <li><Link href="/kariyer" className="hover:text-blue-500 transition-colors">Kariyer</Link></li>
              <li><Link href="/iletisim" className="hover:text-blue-500 transition-colors">İletişim</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 TraxleAPP Technology Group. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            <Link href="/gizlilik-politikasi" className="hover:text-blue-500">Gizlilik</Link>
            <Link href="/kullanim-kosullari" className="hover:text-blue-500">Kullanım Koşulları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}