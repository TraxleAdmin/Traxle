'use client';

import React from 'react';
import { 
  FiTarget, 
  FiShield, 
  FiSettings, 
  FiPieChart, 
  FiGlobe, 
  FiMousePointer, 
  FiLock,
  FiFileText,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCheckCircle
} from 'react-icons/fi';

export default function CookiePolicyContent() {
  return (
    <div className="max-w-none space-y-8">
      
      {/* --- HEADER --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-6 border-b border-gray-200 dark:border-white/10 pb-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl text-amber-700 dark:text-amber-400 text-2xl">
                <FiFileText />
            </div>
            <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white m-0">ÇEREZ POLİTİKASI</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Son Güncelleme: <strong>10.02.2026</strong>
                </p>
            </div>
        </div>
      </div>

      {/* --- MADDE 1 & 2: AMAÇ VE TANIM --- */}
      <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
                Amaç
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 m-0 leading-relaxed">
                Bu Çerez Politikası, Traxle platformunda kullanılan çerezlerin ne olduğunu, hangi amaçlarla kullanıldığını ve kullanıcıların çerez tercihlerini nasıl yönetebileceğini açıklamak amacıyla hazırlanmıştır.
            </p>
          </div>

          <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
                Çerez Nedir?
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 m-0 leading-relaxed">
                Çerezler; ziyaret edilen internet siteleri tarafından tarayıcınıza veya cihazınıza kaydedilen küçük metin dosyalarıdır. Çerezler, platformun düzgün çalışmasını sağlamak, kullanıcı deneyimini iyileştirmek ve güvenliği artırmak için kullanılır.
            </p>
          </div>
      </div>

      {/* --- MADDE 3: ÇEREZ TÜRLERİ --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-amber-600 dark:text-amber-400 flex items-center gap-2 mb-6">
            <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
            Kullanılan Çerez Türleri
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-100 dark:border-white/10 rounded-xl bg-white/40 dark:bg-white/[0.02]">
                <strong className="block text-gray-900 dark:text-white mb-1 flex items-center gap-2"><FiShield className="text-amber-500"/> a) Zorunlu Çerezler</strong>
                <p className="text-xs text-gray-600 dark:text-gray-400 m-0">Platformun temel işlevleri için gereklidir. Oturum açma, güvenlik, kimlik doğrulama gibi işlemler bu çerezler olmadan çalışamaz. Bu çerezler kapatılamaz.</p>
            </div>
            <div className="p-4 border border-gray-100 dark:border-white/10 rounded-xl bg-white/40 dark:bg-white/[0.02]">
                <strong className="block text-gray-900 dark:text-white mb-1 flex items-center gap-2"><FiSettings className="text-amber-500"/> b) İşlevsel Çerezler</strong>
                <p className="text-xs text-gray-600 dark:text-gray-400 m-0">Kullanıcı tercihlerini (dil, tema, giriş bilgileri gibi) hatırlayarak kullanım kolaylığı sağlar.</p>
            </div>
            <div className="p-4 border border-gray-100 dark:border-white/10 rounded-xl bg-white/40 dark:bg-white/[0.02]">
                <strong className="block text-gray-900 dark:text-white mb-1 flex items-center gap-2"><FiPieChart className="text-amber-500"/> c) Analitik/Performans</strong>
                <p className="text-xs text-gray-600 dark:text-gray-400 m-0">Platformun nasıl kullanıldığını analiz ederek hizmet kalitesini artırmaya yardımcı olur. Ziyaret sayısı, sayfa görüntüleme ve hata tespiti gibi amaçlarla kullanılır.</p>
            </div>
            <div className="p-4 border border-gray-100 dark:border-white/10 rounded-xl bg-white/40 dark:bg-white/[0.02]">
                <strong className="block text-gray-900 dark:text-white mb-1 flex items-center gap-2"><FiTarget className="text-amber-500"/> d) Pazarlama Çerezleri</strong>
                <p className="text-xs text-gray-600 dark:text-gray-400 m-0">Kullanıcının ilgi alanlarına uygun içerik ve reklam sunulmasına yardımcı olur. Bu çerezler yalnızca açık rıza ile kullanılır.</p>
            </div>
        </div>
      </div>

      {/* --- MADDE 4 & 5: AMAÇLAR VE VERİLER --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                    <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
                    Kullanım Amaçları
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-center gap-2"><FiCheckCircle className="text-amber-500"/> Platformun güvenli ve kesintisiz çalışması</li>
                    <li className="flex items-center gap-2"><FiCheckCircle className="text-amber-500"/> Kullanıcı oturumunun yönetilmesi</li>
                    <li className="flex items-center gap-2"><FiCheckCircle className="text-amber-500"/> Tercihlerin hatırlanması</li>
                    <li className="flex items-center gap-2"><FiCheckCircle className="text-amber-500"/> Performans ve hata analizleri</li>
                    <li className="flex items-center gap-2"><FiCheckCircle className="text-amber-500"/> Suistimal ve dolandırıcılık önleme</li>
                    <li className="flex items-center gap-2"><FiCheckCircle className="text-amber-500"/> Kullanıcı deneyiminin geliştirilmesi</li>
                </ul>
            </div>
            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                    <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
                    Toplanan Veriler
                </h3>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-500/20 rounded-xl">
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 list-disc pl-4 marker:text-amber-500">
                        <li>IP adresi</li>
                        <li>Tarayıcı ve cihaz bilgileri</li>
                        <li>Oturum ve kullanım kayıtları</li>
                        <li>Tercih bilgileri</li>
                    </ul>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 m-0 pt-3 border-t border-amber-200 dark:border-amber-500/20">
                        Bu veriler, kişisel verilerin korunması mevzuatına uygun şekilde işlenir.
                    </p>
                </div>
            </div>
        </div>
      </div>

      {/* --- MADDE 6, 7, 8: 3. TARAFLAR VE YÖNETİM --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <div className="space-y-6">
            <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2 flex items-center gap-2"><FiGlobe className="text-amber-500"/> Üçüncü Taraf Çerezleri </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">Platform, hizmet kalitesini artırmak için üçüncü taraf hizmet sağlayıcıların çerezlerini kullanabilir. Bu taraflar kendi gizlilik politikalarına tabidir.</p>
            </div>
            <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2 flex items-center gap-2"><FiSettings className="text-amber-500"/> Çerez Tercihlerinin Yönetimi </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">Kullanıcılar; Tarayıcı ayarlarından çerezleri görüntüleyebilir, kabul edebilir, engelleyebilir veya silebilir. Zorunlu çerezlerin engellenmesi halinde Platform’un bazı bölümleri çalışmayabilir.</p>
            </div>
            <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2 flex items-center gap-2"><FiMousePointer className="text-amber-500"/> Açık Rıza </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">Zorunlu çerezler dışındaki çerezler, kullanıcı onayıyla kullanılır. Kullanıcı, çerez tercihlerini dilediği zaman değiştirebilir.</p>
            </div>
        </div>
      </div>

      {/* --- MADDE 9, 10, 11: KVKK VE İLETİŞİM --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <div className="grid md:grid-cols-2 gap-6">
            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
                    <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
                    KVKK & Değişiklik
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Çerezler yoluyla toplanan veriler, Gizlilik Politikası ve KVKK Aydınlatma Metni kapsamında işlenir.</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">Bu politika güncellenebilir. Güncel metin yayımlandığı tarihte yürürlüğe girer.</p>
            </div>
            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
                    <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
                     İletişim
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-center gap-2"><FiMail className="text-amber-500"/> support@traxleapp.com</li>
                    <li className="flex items-center gap-2"><FiPhone className="text-amber-500"/> 0546 486 03 12</li>
                    <li className="flex items-center gap-2"><FiMapPin className="text-amber-500"/> Yeniköy Mah. 58. Sok. No:24 D:4</li>
                </ul>
            </div>
        </div>
      </div>

    </div>
  );
}