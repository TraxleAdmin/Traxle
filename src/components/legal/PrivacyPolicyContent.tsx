'use client';

import React from 'react';
import { 
  FiLock, 
  FiEye, 
  FiDatabase, 
  FiGlobe, 
  FiCreditCard, 
  FiShield, 
  FiClock, 
  FiShare2, 
  FiAlertCircle, 
  FiMail,
  FiFileText,
  FiLayers
} from 'react-icons/fi';

export default function PrivacyPolicyContent() {
  return (
    <div className="max-w-none space-y-8">
      
      {/* --- HEADER --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-6 border-b border-gray-200 dark:border-white/10 pb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-700 dark:text-blue-400 text-2xl">
                <FiLock />
            </div>
            <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white m-0">GİZLİLİK POLİTİKASI</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Son Güncelleme: <strong>10.02.2026</strong>
                </p>
            </div>
        </div>
      </div>

      {/* --- MADDE 1: AMAÇ --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
            Amaç
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 m-0">
            Bu Gizlilik Politikası, Traxle platformunu kullanan kişilere ait bilgilerin nasıl toplandığını, kullanıldığını, korunduğunu ve kimlerle paylaşılabileceğini açıklamak amacıyla hazırlanmıştır.
        </p>
      </div>

      {/* --- MADDE 2: TOPLANAN BİLGİLER --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
            <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
            Toplanan Bilgiler
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">Platform kullanımı kapsamında aşağıdaki bilgiler toplanabilir:</p>
        
        <div className="grid md:grid-cols-2 gap-3 mb-6">
            {[
                "Ad, soyad, e-posta adresi, telefon numarası",
                "Üyelik ve hesap bilgileri",
                "Oluşturulan ilan ve işlem kayıtları",
                "Teslim doğrulama kayıtları",
                "Cihaz, IP, tarayıcı ve kullanım logları",
                "Destek ve iletişim içerikleri",
                "Ödeme işlemine ilişkin teknik kayıtlar"
            ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 border border-gray-100 dark:border-white/10 rounded-xl bg-white/40 dark:bg-white/[0.02]">
                    <div className="p-2 bg-gray-100 dark:bg-white/10 rounded-lg text-gray-600 dark:text-gray-300">
                        <FiDatabase />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                </div>
            ))}
        </div>

        {/* Ödeme Notu */}
        <div className="flex gap-4 items-start p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-500/20 rounded-xl">
            <FiCreditCard className="text-blue-600 text-xl shrink-0 mt-1"/>
            <p className="text-sm text-gray-700 dark:text-gray-300 m-0">
                Kart bilgileri Traxle tarafından saklanmaz; ödeme işlemleri <strong>iyzico</strong> altyapısı üzerinden yürütülür.
            </p>
        </div>
      </div>

      {/* --- MADDE 3: KULLANIM AMAÇLARI --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
            Bilgilerin Kullanım Amaçları
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">Toplanan bilgiler şu amaçlarla kullanılır:</p>
        <ul className="grid md:grid-cols-2 gap-2 list-none pl-0 text-sm text-gray-700 dark:text-gray-300">
            {[
                "Platform hizmetlerinin sunulması",
                "Abonelik ve ödeme süreçlerinin yürütülmesi",
                "Güvenlik, suistimal ve dolandırıcılık önleme",
                "Kullanıcı desteği sağlama",
                "Hizmet kalitesini geliştirme",
                "Yasal yükümlülüklerin yerine getirilmesi"
            ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 p-2 border border-gray-100 dark:border-white/5 rounded-lg">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> {item}
                </li>
            ))}
        </ul>
      </div>

      {/* --- MADDE 4: PAYLAŞIM --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
            Bilgilerin Paylaşılması
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">Bilgiler, yalnızca gerekli olduğu ölçüde paylaşılabilir:</p>
        <div className="grid md:grid-cols-2 gap-3">
            <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5 text-sm flex items-center gap-2">
                <FiShare2 className="text-blue-500"/> iyzico ödeme kuruluşu ile
            </div>
            <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5 text-sm flex items-center gap-2">
                <FiShare2 className="text-blue-500"/> Teknik altyapı sağlayıcıları ile
            </div>
            <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5 text-sm flex items-center gap-2">
                <FiShare2 className="text-blue-500"/> Yetkili kamu kurumları ile
            </div>
            <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5 text-sm flex items-center gap-2">
                <FiShare2 className="text-blue-500"/> Uyuşmazlık çözümü süreçlerinde
            </div>
        </div>
      </div>

      {/* --- MADDE 5 & 6: GÜVENLİK VE SAKLAMA --- */}
      <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                Güvenlik
            </h3>
            <div className="flex gap-3">
                <FiShield className="text-blue-600 text-xl shrink-0 mt-1"/>
                <p className="text-sm text-gray-700 dark:text-gray-300 m-0 leading-relaxed">
                    Traxle, bilgilerin korunması için makul teknik ve idari tedbirleri uygular. Ancak internet ortamının doğası gereği mutlak güvenlik garanti edilemez.
                </p>
            </div>
          </div>

          <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                Saklama Süresi
            </h3>
            <div className="flex gap-3">
                <FiClock className="text-blue-600 text-xl shrink-0 mt-1"/>
                <p className="text-sm text-gray-700 dark:text-gray-300 m-0 leading-relaxed">
                    Bilgiler, hizmet ilişkisi sürdüğü müddetçe ve yasal saklama süreleri boyunca tutulur; süre sonunda silinir veya anonimleştirilir.
                </p>
            </div>
          </div>
      </div>

      {/* --- MADDE 7 & 8: ÇEREZLER VE 3. TARAFLAR --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <div className="space-y-6">
            <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2 flex items-center gap-2"><FiLayers className="text-blue-500"/> Çerezler</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">Platform, kullanıcı deneyimini iyileştirmek ve güvenliği sağlamak amacıyla çerezler kullanabilir. Çerezlere ilişkin detaylar Çerez Politikası’nda yer alır.</p>
            </div>
            <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2 flex items-center gap-2"><FiGlobe className="text-blue-500"/> Üçüncü Taraf Bağlantıları</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">Platform, üçüncü taraf sitelere bağlantı içerebilir. Bu sitelerin gizlilik uygulamalarından Traxle sorumlu değildir.</p>
            </div>
        </div>
      </div>

      {/* --- MADDE 9 & 10: DEĞİŞİKLİKLER VE İLETİŞİM --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
            Değişiklikler ve İletişim
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            Bu politika güncellenebilir. Güncel metin yayımlandığı tarihten itibaren geçerlidir.
        </p>
        <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 text-sm flex items-center gap-3">
             <FiMail className="text-blue-500 text-xl shrink-0"/>
             <div>
                Sorularınız için: <a href="mailto:support@traxleapp.com" className="font-bold text-blue-600 dark:text-blue-400">support@traxleapp.com</a>
             </div>
        </div>
      </div>

    </div>
  );
}