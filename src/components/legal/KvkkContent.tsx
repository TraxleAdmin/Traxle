'use client';

import React from 'react';
import { 
  FiShield, 
  FiUser, 
  FiLock, 
  FiFileText, 
  FiGlobe, 
  FiDatabase, 
  FiCheckCircle, 
  FiServer,
  FiMail,
  FiRefreshCw
} from 'react-icons/fi';

export default function KvkkContent() {
  return (
    <div className="max-w-none space-y-8">
      
      {/* --- HEADER --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-6 border-b border-gray-200 dark:border-white/10 pb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-700 dark:text-blue-400 text-2xl">
                <FiShield />
            </div>
            <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white m-0">KVKK AYDINLATMA METNİ</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Son Güncelleme: <strong>10.02.2026</strong>
                </p>
            </div>
        </div>
      </div>

      {/* --- MADDE 1: VERİ SORUMLUSU --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
            <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
            Veri Sorumlusu
        </h3>
        
        <div className="p-6 border border-blue-200 dark:border-blue-500/30 rounded-2xl bg-blue-50/50 dark:bg-blue-900/10 relative overflow-hidden">
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200 list-none pl-0">
                    <li className="flex flex-col"><span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase">Ünvan</span> <span>Eray Evgin – Traxle</span></li>
                    <li className="flex flex-col"><span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase">Vergi Dairesi / VKN</span> <span>Üçkapılar / 22936280776</span></li>
                    <li className="flex flex-col"><span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase">Adres</span> <span>Yeniköy Mahallesi 58. Sokak No:24 Daire:4</span></li>
                </ul>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200 list-none pl-0">
                    <li className="flex flex-col"><span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase">E-posta</span> <span>support@traxleapp.com</span></li>
                    <li className="flex flex-col"><span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase">Telefon</span> <span>0546 486 03 12</span></li>
                </ul>
            </div>
        </div>
      </div>

      {/* --- MADDE 2: İŞLENEN VERİLER --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
            <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
            İşlenen Kişisel Veriler
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
            {[
                "Kimlik ve iletişim verileri",
                "Hesap ve üyelik bilgileri",
                "İşlem ve ilan kayıtları",
                "Teknik loglar ve IP bilgileri",
                "Destek iletişim içerikleri",
                "Ödeme işlem kayıtları (kart verisi saklanmaz)"
            ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 border border-gray-100 dark:border-white/10 rounded-xl bg-white/40 dark:bg-white/[0.02]">
                    <div className="p-2 bg-gray-100 dark:bg-white/10 rounded-lg text-gray-600 dark:text-gray-300">
                        <FiDatabase />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                </div>
            ))}
        </div>
      </div>

      {/* --- MADDE 3: İŞLEME AMAÇLARI --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
            İşleme Amaçları
        </h3>
        <ul className="grid md:grid-cols-2 gap-2 list-none pl-0 text-sm text-gray-700 dark:text-gray-300">
            {[
                "Sözleşmenin kurulması ve ifası",
                "Abonelik ve ödeme süreçleri",
                "Güvenlik ve suistimal önleme",
                "Destek hizmetleri",
                "Yasal yükümlülüklerin yerine getirilmesi",
                "Açık rıza olması halinde pazarlama iletişimi"
            ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                    <FiCheckCircle className="text-blue-500 shrink-0"/> {item}
                </li>
            ))}
        </ul>
      </div>

      {/* --- MADDE 4: HUKUKİ SEBEPLER --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
            Hukuki Sebepler
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 font-bold">KVKK m.5 ve m.6 kapsamında:</p>
        <div className="flex flex-wrap gap-2">
            {[
                "Sözleşmenin ifası",
                "Hukuki yükümlülük",
                "Meşru menfaat",
                "Bir hakkın tesisi veya korunması",
                "Açık rıza"
            ].map((item, idx) => (
                <span key={idx} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-medium border border-blue-100 dark:border-blue-500/20">
                    {item}
                </span>
            ))}
        </div>
      </div>

      {/* --- MADDE 5: TOPLAMA YÖNTEMİ --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
            Toplama Yöntemi
        </h3>
        <div className="p-4 border border-gray-100 dark:border-white/10 rounded-xl bg-white/40 dark:bg-white/[0.02]">
            <p className="text-sm text-gray-700 dark:text-gray-300 m-0">
                Veriler; üyelik formları, satın alma ekranları, uygulama/web kullanım kayıtları ve destek kanalları aracılığıyla elektronik ortamda toplanır.
            </p>
        </div>
      </div>

      {/* --- MADDE 6: AKTARIM --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
            Aktarım
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">Veriler aşağıdaki taraflara aktarılabilir:</p>
        <div className="grid md:grid-cols-2 gap-3">
            <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5 text-sm flex items-center gap-2">
                <FiServer className="text-blue-500"/> iyzico ödeme kuruluşu
            </div>
            <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5 text-sm flex items-center gap-2">
                <FiServer className="text-blue-500"/> Teknik hizmet sağlayıcılar
            </div>
            <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5 text-sm flex items-center gap-2">
                <FiFileText className="text-blue-500"/> Yetkili kamu kurumları
            </div>
            <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5 text-sm flex items-center gap-2">
                <FiFileText className="text-blue-500"/> Uyuşmazlık çözümü tarafları
            </div>
        </div>
      </div>

      {/* --- MADDE 7: SAKLAMA VE GÜVENLİK --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
            Saklama ve Güvenlik
        </h3>
        <div className="flex gap-4 items-start p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-500/20 rounded-xl">
            <FiLock className="text-blue-600 text-xl shrink-0 mt-1"/>
            <p className="text-sm text-gray-700 dark:text-gray-300 m-0">
                Veriler, gerekli süre boyunca saklanır; süre sonunda silinir, yok edilir veya anonimleştirilir. Güvenlik için teknik ve idari tedbirler uygulanır.
            </p>
        </div>
      </div>

      {/* --- MADDE 8: HAKLAR --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
            Veri Sahibi Hakları
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">KVKK m.11 uyarınca aşağıdaki haklara sahipsiniz:</p>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> İşlenip işlenmediğini öğrenme</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> Düzeltme ve silme talebi</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> İtiraz hakkı</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> Aktarım talebi</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> Zararı giderme talebi</li>
        </ul>
      </div>

      {/* --- MADDE 9: BAŞVURU --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
            Başvuru
        </h3>
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            Hak taleplerinizi <span className="font-bold text-blue-600 dark:text-blue-400">support@traxleapp.com</span> adresine iletebilirsiniz. Başvurular yasal süre içinde sonuçlandırılır.
        </div>
      </div>

      {/* --- MADDE 10: GÜNCELLEMELER --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
             Güncellemeler
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 m-0">
            Metin güncellenebilir; yayımlandığı tarihte yürürlüğe girer.
        </p>
      </div>

    </div>
  );
}