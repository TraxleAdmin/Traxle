'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FiInstagram, FiLinkedin, FiCheckCircle } from 'react-icons/fi';
import DownloadButtons from "./DownloadButtons";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/panel')) return null;

  return (
    <footer className="relative overflow-hidden transition-colors duration-500
                        bg-gray-50 border-t border-gray-200 text-gray-600
                        dark:bg-[#050814] dark:border-white/5 dark:text-gray-400">

      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-500" />

      <div className="container mx-auto px-6 relative z-10 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* 1. KOLON: Logo ve Sosyal Medya */}
          <div className="space-y-6">
            <Link href="/" className="block relative h-10 w-32 hover:opacity-80 transition-opacity">
              <Image
                src="/logo.png"
                alt="Traxle"
                fill
                className="object-contain object-left dark:filter-none filter brightness-0 dark:brightness-100 opacity-80 dark:opacity-100 transition-all"
              />
            </Link>
            <p className="text-sm leading-7 max-w-xs text-gray-500 dark:text-gray-400">
              İş makinesi kiralama ve şantiye operasyonlarını yapay zeka ile optimize eden, yeni nesil B2B yönetim platformu.
            </p>

            <div className="flex gap-3 pt-2">
              <SocialLink
                href="https://x.com/traxleapp"
                icon={
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                }
                brand="x"
              />
              <SocialLink
                href="https://www.instagram.com/traxle.app"
                icon={<FiInstagram size={20} />}
                brand="instagram"
              />
              <SocialLink
                href="https://www.linkedin.com/in/traxle-app/"
                icon={<FiLinkedin size={20} />}
                brand="linkedin"
              />
            </div>
          </div>

          {/* 2. KOLON: Platform */}
          <div>
            <h4 className="font-bold mb-6 text-lg text-gray-900 dark:text-white">Platform</h4>
            <ul className="space-y-3">
              <FooterLink href="/ozellikler">Özellikler</FooterLink>
              <FooterLink href="/entegrasyonlar">Entegrasyonlar</FooterLink>
              <FooterLink href="/fiyatlandirma">Fiyatlandırma</FooterLink>
              <FooterLink href="/giris">Giriş Yap</FooterLink>
            </ul>
          </div>

          {/* 3. KOLON: Şirket */}
          <div>
            <h4 className="font-bold mb-6 text-lg text-gray-900 dark:text-white">Şirket</h4>
            <ul className="space-y-3">
              <FooterLink href="/hakkimizda">Hakkımızda</FooterLink>
              <FooterLink href="/kariyer">Kariyer</FooterLink>
              <FooterLink href="/iletisim">İletişim</FooterLink>
            </ul>
          </div>

          {/* 4. KOLON: İndir */}
          <div>
            <h4 className="font-bold mb-6 text-lg text-gray-900 dark:text-white">Hemen Başlayın</h4>
            <p className="text-sm mb-6 leading-6 text-gray-500 dark:text-gray-400">
              Tedarikçi ve Şantiye mobil uygulamasını ücretsiz indirin.
            </p>
            <DownloadButtons className="flex-col !gap-3 sm:items-start" />
          </div>

        </div>

        <div className="border-t pt-8 flex flex-col xl:flex-row justify-between items-center gap-8 text-xs font-medium transition-colors
                        border-gray-200 text-gray-500
                        dark:border-white/5 dark:text-gray-500">

          <div className="flex flex-col md:flex-row items-center gap-6 w-full xl:w-auto justify-between xl:justify-start">

            <div className="flex flex-col md:items-start items-center gap-1 min-w-max">
              <p className="font-bold text-gray-900 dark:text-gray-300">© 2026 Traxle</p>
              <p>Tüm hakları saklıdır.</p>
            </div>

            <a
              href="https://etbis.ticaret.gov.tr/tr/Anasayfa/SiteAraSonuc?siteId=8aeebdb4-700c-41bd-bec6-e33744ce6baf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-3 py-1.5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
            >
              <div className="relative flex items-center justify-center w-8 h-8 rounded-md transition-colors">
                <div className="relative w-full h-full">
                  <Image
                    src="/etbis-logo.png"
                    alt="ETBİS Karekod"
                    fill
                    className="object-contain p-0.5 dark:brightness-0 dark:invert transition-all duration-300"
                  />
                </div>
                <div className="absolute -top-1.5 -right-1.5 bg-white dark:bg-[#050814] rounded-full p-[1px] shadow-sm z-10">
                  <FiCheckCircle size={12} className="text-green-500" fill="currentColor" style={{ color: 'white' }} stroke="rgb(34, 197, 94)" />
                </div>
              </div>

              <div className="text-left leading-tight">
                <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold group-hover:text-blue-500 transition-colors">Resmî Kayıt</p>
                <p className="text-[10px] font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">ETBİS'e Kayıtlıdır</p>
              </div>
            </a>

          </div>

          <div className="flex flex-wrap justify-center xl:justify-end gap-x-6 gap-y-3 text-center">
            <Link href="/kullanim-kosullari" className="hover:text-blue-600 dark:hover:text-white transition-colors">Kullanım Koşulları</Link>
            <Link href="/gizlilik-politikasi" className="hover:text-blue-600 dark:hover:text-white transition-colors">Gizlilik Politikası</Link>
            <Link href="/cerezler" className="hover:text-blue-600 dark:hover:text-white transition-colors">Çerez Politikası</Link>
            <Link href="/kvkk-aydinlatma" className="hover:text-blue-600 dark:hover:text-white transition-colors">KVKK Aydınlatma</Link>
            <Link href="/on-bilgilendirme" className="hover:text-blue-600 dark:hover:text-white transition-colors">Ön Bilgilendirme Formu</Link>
            <Link href="/mesafeli-hizmet-sozlesmesi" className="hover:text-blue-600 dark:hover:text-white transition-colors">Mesafeli Hizmet Sözleşmesi</Link>
            <Link href="/iptal-iade" className="hover:text-blue-600 dark:hover:text-white transition-colors">İptal & İade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <li>
    <Link href={href} className="text-sm transition-all duration-200 hover:translate-x-1 inline-block
                                 text-gray-600 hover:text-blue-600
                                 dark:text-gray-400 dark:hover:text-blue-400">
      {children}
    </Link>
  </li>
);

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  brand: 'x' | 'instagram' | 'linkedin';
}

const SocialLink = ({ href, icon, brand }: SocialLinkProps) => {
  const hoverStyles = {
    x: "hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white",
    instagram: "hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent dark:hover:bg-gradient-to-tr dark:hover:from-[#f09433] dark:hover:via-[#dc2743] dark:hover:to-[#bc1888] dark:hover:text-white dark:hover:border-transparent",
    linkedin: "hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] dark:hover:bg-[#0077b5] dark:hover:text-white dark:hover:border-[#0077b5]"
  };

  return (
    <Link
      href={href}
      target="_blank"
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-lg
                  bg-white border border-gray-200 text-gray-500
                  dark:bg-white/5 dark:border-white/10 dark:text-gray-400
                  ${hoverStyles[brand]}`}
    >
      {icon}
    </Link>
  );
}