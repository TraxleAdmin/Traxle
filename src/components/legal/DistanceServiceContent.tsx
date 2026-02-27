'use client';

import React from 'react';
import { 
  FiFileText, 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiCreditCard, 
  FiLayers, 
  FiRefreshCw, 
  FiCheckSquare, 
  FiAlertTriangle, 
  FiShield, 
  FiXCircle, 
  FiDatabase, 
  FiGlobe,
  FiUser,
  FiBriefcase
} from 'react-icons/fi';

export default function DistanceServiceContent() {
  return (
    <div className="max-w-none space-y-8">
      
      {/* --- HEADER --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-6 border-b border-gray-200 dark:border-white/10 pb-4">
            <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl text-cyan-700 dark:text-cyan-400 text-2xl">
                <FiFileText />
            </div>
            <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white m-0">MESAFELİ HİZMET SÖZLEŞMESİ</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Son Güncelleme: <strong>10.02.2026</strong>
                </p>
            </div>
        </div>
      </div>

      {/* --- MADDE 1: TARAFLAR --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
            <span className="w-2 h-8 bg-cyan-600 rounded-full"></span>
            Taraflar
        </h3>
        
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
            İşbu Mesafeli Hizmet Sözleşmesi (“Sözleşme”); Traxle platformunu işleten aşağıda bilgileri yer alan Sağlayıcı ile Platform üzerinden hizmet satın alan/işlem yapan kullanıcı (“Kullanıcı”) arasında elektronik ortamda kurulmuştur.
        </p>

        {/* Sağlayıcı Bilgileri Kartı */}
        <div className="p-6 border border-cyan-200 dark:border-cyan-500/30 rounded-2xl bg-cyan-50/50 dark:bg-cyan-900/10 relative overflow-hidden mb-6">
            <div className="absolute top-0 right-0 bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">SAĞLAYICI BİLGİLERİ</div>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mt-2">
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200 list-none pl-0">
                    <li className="flex flex-col"><span className="text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase">Ünvan</span> <span>Eray Evgin – Traxle</span></li>
                    <li className="flex flex-col"><span className="text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase">Vergi Dairesi / VKN</span> <span>Üçkapılar / 22936280776</span></li>
                    <li className="flex flex-col"><span className="text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase">Adres</span> <span>Yeniköy Mahallesi 58. Sokak No:24 Daire:4</span></li>
                </ul>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200 list-none pl-0">
                    <li className="flex flex-col"><span className="text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase">E-posta</span> <span>support@traxleapp.com</span></li>
                    <li className="flex flex-col"><span className="text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase">Telefon</span> <span>0546 486 03 12</span></li>
                    <li className="flex flex-col"><span className="text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase">Ödeme Kuruluşu</span> <span>iyzico (lisanslı ödeme altyapısı)</span></li>
                </ul>
            </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 italic border-t border-gray-100 dark:border-white/10 pt-3">
            Kullanıcı; Ön Bilgilendirme Formu’nu okuduğunu, bu Sözleşme’yi anladığını ve kabul ettiğini beyan eder.
        </p>
      </div>

      {/* --- MADDE 2: TANIMLAR --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <span className="w-2 h-8 bg-cyan-600 rounded-full"></span>
            Tanımlar
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
            {[
                { title: "Platform", desc: "traxleapp.com ve mobil uygulamalar" },
                { title: "Hizmet Alan", desc: "İlan açan / yük veren kullanıcı" },
                { title: "Hizmet Veren", desc: "İşi kabul eden sürücü" },
                { title: "Abonelik", desc: "Ücretli erişim paketi" },
                { title: "İşlem/İlan", desc: "Platform üzerinden oluşturulan iş talebi" },
                { title: "Bloke", desc: "İşleme ilişkin tutarın geçici ayrılması" },
                { title: "Teslim Doğrulaması", desc: "QR / onay / fotoğraf / log" }
            ].map((item, idx) => (
                <div key={idx} className="p-3 border border-gray-100 dark:border-white/10 rounded-xl bg-white/40 dark:bg-white/[0.02]">
                    <strong className="block text-gray-900 dark:text-white text-xs mb-1">{item.title}</strong>
                    <p className="text-xs text-gray-600 dark:text-gray-400 m-0">{item.desc}</p>
                </div>
            ))}
        </div>
      </div>

      {/* --- MADDE 3: HUKUKİ NİTELİK --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <span className="w-2 h-8 bg-cyan-600 rounded-full"></span>
            Hizmetin Hukuki Niteliği
        </h3>
        <div className="p-5 border border-blue-100 dark:border-blue-500/20 rounded-2xl bg-blue-50/50 dark:bg-blue-900/10 flex gap-4 items-start">
            <div className="mt-1 text-blue-600 dark:text-blue-400 shrink-0">
                <FiLayers className="text-xl" />
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300">
                <p className="m-0 mb-2 font-bold">TRAXLE, aracı dijital platformdur.</p>
                <ul className="list-disc pl-5 m-0 space-y-1">
                    <li>Taşımanın fiili icracısı değildir,</li>
                    <li>Nakliyeci/taşıma organizatörü değildir,</li>
                    <li>Hizmet Alan ile Hizmet Veren arasındaki sözleşmenin tarafı değildir.</li>
                </ul>
                <p className="m-0 mt-2 text-xs opacity-80">İfa ilişkisi doğrudan taraflar arasında kurulur.</p>
            </div>
        </div>
      </div>

      {/* --- MADDE 4 & 5: KONU VE ABONELİK --- */}
      <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                <span className="w-2 h-8 bg-cyan-600 rounded-full"></span>
                Sözleşmenin Konusu
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2"><FiCheckSquare className="text-cyan-500"/> Abonelik hizmeti</li>
                <li className="flex items-center gap-2"><FiCheckSquare className="text-cyan-500"/> İlan/eşleşme akışı</li>
                <li className="flex items-center gap-2"><FiCheckSquare className="text-cyan-500"/> Ödeme–bloke–tahsilat</li>
                <li className="flex items-center gap-2"><FiCheckSquare className="text-cyan-500"/> İptal–iade</li>
                <li className="flex items-center gap-2"><FiCheckSquare className="text-cyan-500"/> Sorumluluk sınırları</li>
            </ul>
          </div>

          <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                <span className="w-2 h-8 bg-cyan-600 rounded-full"></span>
                Abonelik Hükümleri
            </h3>
            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-2 marker:text-cyan-500">
                <li>Abonelik ödeme onayı ile derhal başlar.</li>
                <li>Paket kapsamı satın alma ekranında gösterilir.</li>
                <li>Abonelikler aksi belirtilmedikçe otomatik yenilenir.</li>
                <li>Kullanıcı yenileme öncesi iptal edebilir.</li>
                <li>Fiyat değişikliği makul süre önce bildirilir.</li>
            </ul>
          </div>
      </div>

      {/* --- MADDE 6 & 7: SİPARİŞ VE ÖDEME --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                    <span className="w-2 h-8 bg-cyan-600 rounded-full"></span>
                    Sipariş ve Eşleşme Süreci
                </h3>
                <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex gap-3"><span className="bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded text-xs h-fit font-bold">1</span> Hizmet Alan ilan oluşturur, ücret onayına sunulur.</li>
                    <li className="flex gap-3"><span className="bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded text-xs h-fit font-bold">2</span> Gerekirse tutar bloke edilir.</li>
                    <li className="flex gap-3"><span className="bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded text-xs h-fit font-bold">3</span> Sürücü kabul eder, süreç başlar.</li>
                    <li className="flex gap-3"><span className="bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded text-xs h-fit font-bold">4</span> Teslim doğrulaması ile tamamlanır.</li>
                </ul>
            </div>
            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                    <span className="w-2 h-8 bg-cyan-600 rounded-full"></span>
                    Ödeme Süreci
                </h3>
                <div className="p-4 bg-cyan-50 dark:bg-cyan-900/10 border border-cyan-100 dark:border-cyan-500/20 rounded-xl">
                    <ul className="space-y-2 text-sm text-cyan-900 dark:text-cyan-100 list-none pl-0">
                        <li className="flex items-center gap-2"><FiCreditCard/> Ödemeler <strong>iyzico</strong> üzerinden yapılır.</li>
                        <li className="flex items-center gap-2"><FiShield/> Kart verileri TRAXLE’da tutulmaz.</li>
                        <li className="flex items-center gap-2"><FiFileText/> Bloke ve dağıtım kuralları platform ekranlarında gösterilir.</li>
                    </ul>
                </div>
            </div>
        </div>
      </div>

      {/* --- MADDE 8 & 9: CHARGEBACK VE CAYMA --- */}
      <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-500/20 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-red-700 dark:text-red-400 flex items-center gap-2 mb-4">
                <span className="w-2 h-8 bg-red-600 rounded-full"></span>
                İtiraz / Chargeback
            </h3>
            <ul className="list-disc pl-5 text-sm text-red-800 dark:text-red-200 space-y-2">
                <li>Ters ibraz halinde TRAXLE kayıtları iyzico ile paylaşabilir.</li>
                <li>Haksız itiraz yasaktır.</li>
                <li>Hesap askıya alınabilir, zarar talep edilebilir.</li>
            </ul>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-500/20 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-orange-700 dark:text-orange-400 flex items-center gap-2 mb-4">
                <span className="w-2 h-8 bg-orange-600 rounded-full"></span>
                Dijital İfaya Başlama ve Cayma
            </h3>
            <p className="text-sm text-orange-800 dark:text-orange-200 m-0 leading-relaxed">
                Hizmet kullanıcı onayıyla derhal başlatılır. Bu nedenle <strong>cayma hakkı istisnaları</strong> uygulanabilir. Kullanıcı bu durumu kabul ederek işlem yapar.
            </p>
          </div>
      </div>

      {/* --- MADDE 10: İPTAL KURALLARI --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <span className="w-2 h-8 bg-cyan-600 rounded-full"></span>
            İptal Kuralları
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-100 dark:border-white/10 rounded-xl bg-white/40 dark:bg-white/[0.02]">
                <strong className="block text-gray-900 dark:text-white mb-2">Abonelik</strong>
                <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
                    <li>Panelden iptal edilebilir.</li>
                    <li>Mevcut dönem sonuna kadar erişim sürer.</li>
                </ul>
            </div>
            <div className="p-4 border border-gray-100 dark:border-white/10 rounded-xl bg-white/40 dark:bg-white/[0.02]">
                <strong className="block text-gray-900 dark:text-white mb-2">İlan Bazlı</strong>
                <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
                    <li>Yola çıkmadan iptal: kesinti uygulanabilir.</li>
                    <li>Yola çıktıktan sonra: masraf/bedel uygulanabilir.</li>
                    <li>Yanlış beyan: ek maliyet Kullanıcıya aittir.</li>
                </ul>
            </div>
        </div>
      </div>

      {/* --- MADDE 11, 12, 13: SORUMLULUK, YASAKLAR, KVKK --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <div className="space-y-6">
            <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2 flex items-center gap-2"><FiShield className="text-cyan-500"/> Sorumluluk Sınırları</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">TRAXLE taşımanın ifasından sorumlu değildir. Hasar/kayıp/gecikme taraflar arasıdır. Sorumluluk komisyon tutarı ile sınırlıdır.</p>
            </div>
            <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2 flex items-center gap-2"><FiXCircle className="text-red-500"/> Yasaklı Kullanımlar</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">Komisyon dışı işlem, Sahtecilik, Bot/scraping, Tersine mühendislik, Haksız chargeback ihlalinde hesap kapatılabilir.</p>
            </div>
            <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2 flex items-center gap-2"><FiDatabase className="text-cyan-500"/> Kişisel Veriler</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">Veriler Gizlilik Politikası ve KVKK metnine göre işlenir. Log tutulabilir.</p>
            </div>
        </div>
      </div>

      {/* --- MADDE 14, 15, 16, 17: DİĞER HÜKÜMLER --- */}
      <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm space-y-4">
             <div>
                <strong className="block text-sm text-gray-900 dark:text-white mb-1"> Mücbir Sebep</strong>
                <p className="text-xs text-gray-600 dark:text-gray-400 m-0">İnternet/altyapı kesintileri, resmi kararlar gibi hallerde TRAXLE sorumlu değildir.</p>
             </div>
             <div>
                <strong className="block text-sm text-gray-900 dark:text-white mb-1"> Delil</strong>
                <p className="text-xs text-gray-600 dark:text-gray-400 m-0">Platform kayıtları HMK m.193 gereği delildir.</p>
             </div>
          </div>
          <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm space-y-4">
             <div>
                <strong className="block text-sm text-gray-900 dark:text-white mb-1"> Değişiklik</strong>
                <p className="text-xs text-gray-600 dark:text-gray-400 m-0">Metin güncellenebilir; yayımlandığı tarihte yürürlüğe girer.</p>
             </div>
             <div>
                <strong className="block text-sm text-gray-900 dark:text-white mb-1">Yetki</strong>
                <p className="text-xs text-gray-600 dark:text-gray-400 m-0">Yetkili mahkeme Antalya’dır. Tüketici hakları saklıdır.</p>
             </div>
          </div>
      </div>

      {/* --- MADDE 18: İLETİŞİM --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <span className="w-2 h-8 bg-cyan-600 rounded-full"></span>
            İletişim
        </h3>
        <div className="flex flex-wrap gap-4 text-sm text-gray-700 dark:text-gray-300">
            <span className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 px-4 py-2 rounded-xl border border-gray-100 dark:border-white/5">
                <FiMail className="text-cyan-600"/> support@traxleapp.com
            </span>
            <span className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 px-4 py-2 rounded-xl border border-gray-100 dark:border-white/5">
                <FiPhone className="text-cyan-600"/> 0546 486 03 12
            </span>
            <span className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 px-4 py-2 rounded-xl border border-gray-100 dark:border-white/5 w-full md:w-auto">
                <FiMapPin className="text-cyan-600"/> Yeniköy Mah. 58. Sok. No:24 D:4
            </span>
        </div>
      </div>

    </div>
  );
}