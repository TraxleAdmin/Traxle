'use client';

import React from 'react';
import { 
  FiRefreshCw, 
  FiAlertTriangle, 
  FiCheckCircle, 
  FiXCircle, 
  FiClock, 
  FiDollarSign, 
  FiShield, 
  FiFileText,
  FiInfo,
  FiMail,
  FiPhone,
  FiMapPin
} from 'react-icons/fi';

export default function RefundPolicyContent() {
  return (
    <div className="max-w-none space-y-8">
      
      {/* --- HEADER --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-6 border-b border-gray-200 dark:border-white/10 pb-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-700 dark:text-emerald-400 text-2xl">
                <FiRefreshCw />
            </div>
            <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white m-0">İPTAL – İADE POLİTİKASI</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Son Güncelleme: <strong>10.02.2026</strong>
                </p>
            </div>
        </div>
      </div>

      {/* --- MADDE 1: KAPSAM --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 mb-4">
            <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
            Kapsam
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 m-0 leading-relaxed">
            Bu İptal–İade Politikası; Traxle platformunda sunulan abonelik paketleri, ilan/işlem bazlı ücretler, komisyonlar ve bakiye/bloke uygulamalarına ilişkin iptal ve iade süreçlerini düzenler. Politika, Mesafeli Hizmet Sözleşmesi ve Ön Bilgilendirme Formu’nun ayrılmaz parçasıdır.
        </p>
      </div>

      {/* --- MADDE 2 & 3: ABONELİK VE CAYMA HAKKI --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
                    <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                    Aboneliğin Başlangıcı
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                    Abonelik ve dijital hizmetler, ödeme onayı alınır alınmaz başlatılır ve paket kapsamındaki özelliklere erişim derhal sağlanır. Kullanıcı, satın alma anında bu durumu bilerek işlem yapar.
                </p>
            </div>

            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
                    <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                    Cayma Hakkı Bilgilendirmesi
                </h3>
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-500/20 rounded-xl">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        Dijital içeriğin ve hizmetin kullanıcı onayıyla derhal ifa edilmesi nedeniyle, mevzuatta öngörülen cayma hakkı istisnaları uygulanabilir.
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 m-0">
                        Kullanıcı, ödeme adımında; <strong>dijital hizmetin derhal başlatılmasını talep ettiğini</strong> ve <strong>cayma hakkına ilişkin istisnalar hakkında bilgilendirildiğini</strong> kabul ederek işlemi tamamlar.
                    </p>
                </div>
            </div>
        </div>
      </div>

      {/* --- MADDE 4: ABONELİK İPTALİ --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 mb-4">
            <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
            Abonelik İptali
        </h3>
        <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-2 marker:text-emerald-500">
            <li>Kullanıcı, aboneliğini panel üzerinden dilediği an iptal edebilir.</li>
            <li>İptal işlemi, bir sonraki yenileme dönemini durdurur.</li>
            <li>Aksi açıkça belirtilmedikçe, mevcut dönemin sonuna kadar erişim devam eder ve bu süreye ilişkin bedel iade edilmez.</li>
        </ul>
      </div>

      {/* --- MADDE 5: İADE KOŞULLARI (GRID) --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
            <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
            İade Koşulları
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
            {/* Kabul Edilenler */}
            <div className="p-5 border border-green-200 dark:border-green-500/30 rounded-2xl bg-green-50/50 dark:bg-green-900/10">
                <div className="flex items-center gap-2 mb-3 text-green-700 dark:text-green-400 font-bold">
                    <FiCheckCircle className="text-xl"/> İade/Değerlendirme Yapılabilir Haller
                </div>
                <ul className="list-disc pl-5 text-xs text-gray-700 dark:text-gray-300 space-y-2">
                    <li>Teknik hata nedeniyle mükerrer çekim oluşması</li>
                    <li>TRAXLE kaynaklı teknik sorun sebebiyle hizmete erişimin sağlanamaması</li>
                    <li>Mevzuat gereği iade yapılması zorunlu haller</li>
                </ul>
            </div>

            {/* Reddedilenler */}
            <div className="p-5 border border-red-200 dark:border-red-500/30 rounded-2xl bg-red-50/50 dark:bg-red-900/10">
                <div className="flex items-center gap-2 mb-3 text-red-700 dark:text-red-400 font-bold">
                    <FiXCircle className="text-xl"/> İade Talebi Reddedilebilir Haller
                </div>
                <ul className="list-disc pl-5 text-xs text-gray-700 dark:text-gray-300 space-y-2">
                    <li>Hizmetin kullanılmış olması</li>
                    <li>Dijital ifaya başlanmış olması</li>
                    <li>Kötüye kullanım, çoklu hesap, suistimal tespiti</li>
                    <li>Haksız itiraz/chargeback girişimi</li>
                    <li>Platform kurallarının ihlali</li>
                </ul>
            </div>
        </div>
      </div>

      {/* --- MADDE 6: İLAN VE İŞLEM BAZLI İPTALLER --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 mb-4">
            <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
            İlan ve İşlem Bazlı İptaller
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">İlan/taşıma süreçlerinde:</p>
        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="p-3 border border-gray-100 dark:border-white/10 rounded-xl bg-white/40 dark:bg-white/[0.02]">
                <strong>Sürücü yola çıkmadan iptal:</strong> Ücretsiz veya kısmi kesinti uygulanabilir (işlem ekranında gösterilen kurallar geçerlidir).
            </div>
            <div className="p-3 border border-gray-100 dark:border-white/10 rounded-xl bg-white/40 dark:bg-white/[0.02]">
                <strong>Sürücü yola çıktıktan sonra iptal:</strong> İptal bedeli, bekleme bedeli ve masraflar tahsil edilebilir.
            </div>
            <div className="p-3 border border-gray-100 dark:border-white/10 rounded-xl bg-white/40 dark:bg-white/[0.02]">
                <strong>Yanlış beyan:</strong> Yük/adres/iletişim hatalarından doğan ek maliyetler Hizmet Alan’a aittir.
            </div>
        </div>
      </div>

      {/* --- MADDE 7 & 8: BAKİYE, BLOKE VE CHARGEBACK --- */}
      <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-500/20 rounded-3xl p-8 backdrop-blur-sm">
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-red-700 dark:text-red-400 flex items-center gap-2 mb-3">
                    <span className="w-2 h-8 bg-red-600 rounded-full"></span>
                    Bakiye ve Bloke İşlemleri
                </h3>
                <ul className="list-disc pl-5 text-sm text-red-800 dark:text-red-200 space-y-1">
                    <li>İşlem güvenliği için bakiye/bloke uygulanabilir.</li>
                    <li>Teslim doğrulaması sonrası bloke çözülür ve tutar süreç kurallarına göre dağıtılır.</li>
                    <li>Uyuşmazlık halinde Platform kayıtları esas alınır.</li>
                </ul>
            </div>

            <div>
                <h3 className="text-lg font-bold text-red-700 dark:text-red-400 flex items-center gap-2 mb-3">
                    <span className="w-2 h-8 bg-red-600 rounded-full"></span>
                    İtiraz ve Chargeback
                </h3>
                <p className="text-sm text-red-800 dark:text-red-200 mb-2">
                    Kullanıcının bankası/ödeme kuruluşu üzerinden haksız itiraz (ters ibraz/chargeback) başlatması halinde:
                </p>
                <ul className="list-disc pl-5 text-sm text-red-800 dark:text-red-200 space-y-1">
                    <li>TRAXLE işlem kayıtlarını ödeme kuruluşu ile paylaşabilir,</li>
                    <li>Hesap askıya alınabilir,</li>
                    <li>Doğan zararların tazmini talep edilebilir.</li>
                </ul>
            </div>
        </div>
      </div>

      {/* --- MADDE 9 & 10: DEĞİŞİKLİKLER VE İLETİŞİM --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
            Değişiklikler ve Başvuru
        </h3>
        
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
            Bu politika, mevzuat ve hizmet gerekliliklerine göre güncellenebilir. Güncel metin yayımlandığı tarihte yürürlüğe girer.
        </p>

        <div className="p-5 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
            <strong className="block text-emerald-600 dark:text-emerald-400 mb-3">İptal ve iade talepleriniz için:</strong>
            <div className="flex flex-wrap gap-4 text-sm text-gray-700 dark:text-gray-300">
                <span className="flex items-center gap-2"><FiMail className="text-emerald-500"/> support@traxleapp.com</span>
                <span className="flex items-center gap-2"><FiPhone className="text-emerald-500"/> 0546 486 03 12</span>
                <span className="flex items-center gap-2 w-full"><FiMapPin className="text-emerald-500"/> Yeniköy Mahallesi 58. Sokak No:24 Daire:4</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 m-0">Başvurular makul süre içinde değerlendirilir ve sonuçlandırılır.</p>
        </div>
      </div>

    </div>
  );
}