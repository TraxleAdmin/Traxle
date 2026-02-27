'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiCheck, FiX, FiZap, FiTruck, FiBriefcase, FiShield, FiInfo, FiLayers, FiUser } from 'react-icons/fi';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-[#050814] py-24 sm:py-32 text-gray-900 dark:text-white overflow-hidden transition-colors duration-300">
      
      {/* --- Arka Plan Efektleri --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 dark:bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04] dark:opacity-[0.06] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        
        {/* --- 1. ÜST BLOK: BAŞLIK --- */}
        <div className="mx-auto max-w-4xl text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-6">
            Traxle ile <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Güvenli ve Hızlı</span> <br />
            Teslimat Yönetimi
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
            <span className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/10 shadow-sm">
                <FiLayers className="text-blue-500"/> Abonelik = Platforma Erişim
            </span>
            <span className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/10 shadow-sm">
                <FiZap className="text-purple-500"/> İşlem Ücreti = Eşleştirme Hizmeti
            </span>
            <span className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/10 shadow-sm">
                <FiShield className="text-green-500"/> Ödemeler <strong className="text-gray-900 dark:text-white">iyzico</strong> güvencesiyle
            </span>
          </div>
        </div>
        
        {/* --- TOGGLE (AYLIK / YILLIK) --- */}
        <div className="flex justify-center mb-16">
          <div className="relative bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-1 rounded-full inline-flex items-center w-[340px] shadow-sm">
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gray-100 dark:bg-white/10 rounded-full shadow-sm transition-all duration-300 ease-out border border-gray-200/50 dark:border-white/5
              ${isAnnual ? 'translate-x-[100%] left-1' : 'left-1'}`}
            />
            <div className="grid grid-cols-2 w-full relative z-10">
              <button
                onClick={() => setIsAnnual(false)}
                className={`flex items-center justify-center h-10 text-sm rounded-full transition-colors duration-200
                ${!isAnnual ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-500 dark:text-gray-400 font-medium'}`}
              >
                Aylık
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`flex items-center justify-center h-10 text-sm rounded-full transition-colors duration-200 gap-2
                ${isAnnual ? 'text-gray-900 dark:text-white font-bold' : 'text-gray-500 dark:text-gray-400 font-medium'}`}
              >
                Yıllık
                <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] px-2 py-0.5 rounded-full font-bold border border-green-200 dark:border-green-500/20">
                  2 AY HEDİYE
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* --- 2. PAKET KARTLARI (4 PLAN) --- */}
        {/* Responsive Grid: Mobilde 1, Tablette 2, Geniş ekranda 4 kolon */}
        <div className="isolate grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-20">
          
          {/* 1. ÜCRETSİZ PLAN (YENİ) */}
          <PricingCard
            title="Deneme"
            description="Platformu keşfetmek ve ilk işleminizi yapmak için."
            price="₺0"
            period="/ömür boyu"
            colorTheme="gray"
            icon={<FiUser className="w-6 h-6" />}
            buttonText="Ücretsiz Dene"
            buttonHref="/kayit-ol?plan=free"
            features={[
              { text: "Yıllık 2 İlan Hakkı", included: true },
              { text: "Her 6 Ayda Bir Yenilenir", included: true },
              { text: "Standart Eşleştirme", included: true },
              { text: "Mobil Uygulama Erişimi", included: true },
              { text: "Teslimat Doğrulama", included: false },
              { text: "Raporlama", included: false },
            ]}
          />

          {/* 2. BAŞLANGIÇ PLAN */}
          <PricingCard
            title="Başlangıç"
            description="Düzenli gönderim yapan bireyseller ve küçük işletmeler."
            price={isAnnual ? "₺1.490" : "₺149"}
            period={isAnnual ? "/yıl" : "/ay"}
            colorTheme="blue"
            icon={<FiTruck className="w-6 h-6" />}
            buttonText="Hemen Başla"
            buttonHref="/kayit-ol?plan=starter"
            features={[
              { text: "Ayda 50 İlan Hakkı", included: true },
              { text: "Standart Eşleştirme", included: true },
              { text: "Teslimat Doğrulama (Foto)", included: true },
              { text: "Temel Raporlar", included: true },
              { text: "Öncelikli Destek", included: false },
              { text: "API Erişimi", included: false },
            ]}
          />

          {/* 3. PROFESYONEL PLAN (ÖNE ÇIKAN) */}
          <PricingCard
            title="Profesyonel"
            description="Büyüyen işler için sınırsız özgürlük ve akıllı özellikler."
            price={isAnnual ? "₺2.990" : "₺299"}
            period={isAnnual ? "/yıl" : "/ay"}
            isPopular={true}
            colorTheme="purple"
            icon={<FiZap className="w-6 h-6" />}
            buttonText="Şimdi Yükselt"
            buttonHref="/kayit-ol?plan=pro"
            features={[
              { text: "Sınırsız İlan Oluşturma", included: true },
              { text: "Öncelikli Eşleşme Algoritması", included: true },
              { text: "Yapay Zeka Rota Optimizasyonu", included: true },
              { text: "Detaylı Raporlama & Analiz", included: true },
              { text: "Öncelikli Canlı Destek", included: true },
              { text: "API Erişimi", included: false },
            ]}
          />

          {/* 4. KURUMSAL PLAN */}
          <PricingCard
            title="Kurumsal"
            description="Büyük ölçekli operasyonlar için özel çözümler."
            price="Teklif Al"
            period=""
            colorTheme="red"
            icon={<FiBriefcase className="w-6 h-6" />}
            buttonText="Satışla Görüş"
            buttonHref="/iletisim"
            features={[
              { text: "API Erişimi (Tam Entegrasyon)", included: true },
              { text: "Çoklu Kullanıcı Yönetimi", included: true },
              { text: "Özel ERP/CRM Entegrasyonu", included: true },
              { text: "SLA Hizmet Garantisi", included: true },
              { text: "Dedicated Account Manager", included: true },
              { text: "Özel Sunucu Seçeneği", included: true },
            ]}
          />

        </div>

        {/* --- 3. ÜCRETE DAHİL OLANLAR (ORTAK ÖZELLİKLER) --- */}
        <div className="mb-20">
            <h3 className="text-center text-xl font-bold mb-8 text-gray-900 dark:text-white">
                Tüm Paketlere Dahil Standart Hizmetler
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <FeatureItem text="Platform Erişimi" />
                <FeatureItem text="Eşleştirme Altyapısı" />
                <FeatureItem text="Ödeme Aracılığı" />
                <FeatureItem text="Teslim Doğrulama" />
                <FeatureItem text="Güvenlik & Loglama" />
                <FeatureItem text="7/24 Teknik Destek" />
            </div>
        </div>

        {/* --- 4. HUKUKİ ŞEFFAFLIK KUTUSU (ÖNEMLİ) --- */}
        <div className="bg-gray-100 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex flex-col md:flex-row gap-8">
                
                {/* Sol Taraf: Ödeme Bilgilendirmesi */}
                <div className="flex-1 space-y-3">
                    <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <FiInfo className="w-4 h-4" /> Ödeme ve Hizmet Bilgilendirmesi
                    </h4>
                    <ul className="space-y-2 list-disc pl-4 text-xs md:text-sm marker:text-gray-400">
                        <li>Ücretsiz paket hariç abonelikler, ödeme işleminin başarıyla gerçekleşmesiyle <strong>derhal başlar</strong>.</li>
                        <li>Sunulan hizmet <strong>elektronik ortamda ifa edilen gayri maddi bir mal/hizmettir</strong>.</li>
                        <li>Hizmetin anında ifa edilmesi sebebiyle, mevzuat gereği <strong>cayma hakkı istisnaları</strong> uygulanabilir.</li>
                        <li>Tüm ödemeler <strong>iyzico Güvenli Ödeme Altyapısı</strong> ile alınır.</li>
                        <li>Traxle, kredi kartı bilgilerinizi asla kendi sunucularında <strong>saklamaz</strong>.</li>
                    </ul>
                </div>

                {/* Sağ Taraf: Linkler */}
                <div className="flex-1 md:flex-none md:w-1/3 space-y-3">
                     <h4 className="font-bold text-gray-900 dark:text-white">Yasal Sözleşmeler</h4>
                     <div className="flex flex-col gap-2">
                        <Link href="/on-bilgilendirme-formu" className="hover:text-blue-600 dark:hover:text-blue-400 underline transition-colors">
                            Ön Bilgilendirme Formu
                        </Link>
                        <Link href="/mesafeli-hizmet-sozlesmesi" className="hover:text-blue-600 dark:hover:text-blue-400 underline transition-colors">
                            Mesafeli Hizmet Sözleşmesi
                        </Link>
                        <Link href="/iptal-iade" className="hover:text-blue-600 dark:hover:text-blue-400 underline transition-colors">
                            İptal ve İade Koşulları
                        </Link>
                     </div>
                </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-xs text-gray-500">
                Fiyatlara KDV dahil değildir. Traxle, fiyatlarda ve paket içeriklerinde önceden bildirmeksizin değişiklik yapma hakkını saklı tutar.
            </div>
        </div>

      </div>
    </div>
  );
}

// --- YARDIMCI COMPONENTLER ---

// 1. Ortak Özellik Kutucuğu
const FeatureItem = ({ text }: { text: string }) => (
    <div className="flex items-center justify-center gap-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-3 rounded-xl text-xs font-semibold text-center shadow-sm text-gray-700 dark:text-gray-300">
        <FiCheck className="text-green-500 shrink-0" />
        {text}
    </div>
);

// 2. Fiyat Kartı
interface PricingCardProps {
    title: string;
    description: string;
    price: string;
    period: string;
    isPopular?: boolean;
    colorTheme: 'gray' | 'blue' | 'purple' | 'red';
    icon: React.ReactNode;
    buttonText: string;
    buttonHref: string;
    features: { text: string; included: boolean }[];
}

function PricingCard({ title, description, price, period, isPopular, colorTheme, icon, buttonText, buttonHref, features }: PricingCardProps) {
    
    // Renk Temaları (Gri eklendi)
    const themeClasses = {
        gray: {
            bg: 'bg-white dark:bg-white/5',
            border: 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20',
            iconBg: 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300',
            button: 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 border border-transparent',
            check: 'text-gray-500'
        },
        blue: {
            bg: 'bg-white dark:bg-white/5',
            border: 'border-gray-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-blue-500/30',
            iconBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
            button: 'bg-white border border-gray-200 text-blue-600 hover:bg-blue-50 dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10',
            check: 'text-blue-500'
        },
        purple: {
            bg: 'bg-[#0f172a] dark:bg-[#0f172a]',
            border: 'border-blue-500 ring-2 ring-blue-500',
            iconBg: 'bg-blue-500/20 text-blue-400',
            button: 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30',
            check: 'text-blue-400'
        },
        red: {
            bg: 'bg-white dark:bg-white/5',
            border: 'border-gray-200 dark:border-white/10 hover:border-red-300 dark:hover:border-red-500/30',
            iconBg: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
            button: 'bg-white border border-gray-200 text-red-600 hover:bg-red-50 dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10',
            check: 'text-red-500'
        }
    };

    const theme = themeClasses[colorTheme];

    return (
        <div className={`relative flex flex-col justify-between p-6 rounded-3xl transition-all duration-300 ${theme.bg} ${theme.border} hover:shadow-xl`}>
            
            {isPopular && (
                <div className="absolute top-0 right-0 -mt-3 mr-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1 text-[10px] font-bold text-white shadow-lg shadow-blue-600/30">
                        <FiZap className="w-3 h-3" /> ÖNERİLEN
                    </span>
                </div>
            )}

            <div>
                <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${theme.iconBg}`}>
                        {icon}
                    </div>
                    <h3 className={`text-xl font-bold ${isPopular ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{title}</h3>
                </div>
                
                <p className={`text-xs leading-5 mb-6 min-h-[40px] ${isPopular ? 'text-gray-300' : 'text-gray-500 dark:text-gray-400'}`}>
                    {description}
                </p>

                <div className="flex items-baseline gap-1 mb-6">
                    <span className={`text-3xl font-black tracking-tight ${isPopular ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                        {price}
                    </span>
                    {period && <span className={`text-xs font-semibold ${isPopular ? 'text-gray-400' : 'text-gray-500'}`}>{period}</span>}
                </div>

                <ul className="space-y-3 mb-8">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-xs">
                            {feature.included ? (
                                <FiCheck className={`w-4 h-4 shrink-0 ${theme.check}`} />
                            ) : (
                                <FiX className="w-4 h-4 shrink-0 text-gray-300 dark:text-white/20" />
                            )}
                            <span className={`${
                                feature.included 
                                    ? (isPopular ? 'text-gray-200' : 'text-gray-700 dark:text-gray-300') 
                                    : (isPopular ? 'text-gray-600 line-through decoration-gray-600' : 'text-gray-400 line-through decoration-gray-300 dark:text-gray-600 dark:decoration-gray-700')
                            }`}>
                                {feature.text}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <Link 
                href={buttonHref}
                className={`block w-full py-2.5 px-4 rounded-xl text-center text-sm font-bold transition-all duration-200 ${theme.button}`}
            >
                {buttonText}
            </Link>
        </div>
    );
}