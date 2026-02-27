'use client';

import React from 'react';
import { 
  FiInfo, 
  FiUser, 
  FiLayers, 
  FiCreditCard, 
  FiPlayCircle, 
  FiAlertTriangle, 
  FiXCircle, 
  FiShield, 
  FiMessageSquare, 
  FiFileText, 
  FiCheckSquare,
  FiMapPin,
  FiPhone,
  FiMail
} from 'react-icons/fi';

export default function PreInfoFormContent() {
  return (
    <div className="max-w-none space-y-8">
      
      {/* --- HEADER --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-6 border-b border-gray-200 dark:border-white/10 pb-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-700 dark:text-indigo-400 text-2xl">
                <FiInfo />
            </div>
            <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white m-0">ÖN BİLGİLENDİRME FORMU</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    (6502 Sayılı Kanun ve Mesafeli Sözleşmeler Yönetmeliği Kapsamında) <br/>
                    Son Güncelleme: <strong>10.02.2026</strong>
                </p>
            </div>
        </div>
      </div>

      {/* --- MADDE 1: SATICI BİLGİLERİ --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
            <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
            Satıcı / Sağlayıcı Bilgileri
        </h3>
        
        <div className="p-6 border border-indigo-200 dark:border-indigo-500/30 rounded-2xl bg-indigo-50/50 dark:bg-indigo-900/10 relative overflow-hidden">
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200 list-none pl-0">
                    <li className="flex flex-col"><span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase">Ünvan</span> <span>Eray Evgin – Traxle</span></li>
                    <li className="flex flex-col"><span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase">Vergi Dairesi / VKN</span> <span>Üçkapılar / 22936280776</span></li>
                    <li className="flex flex-col"><span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase">Ödeme Kuruluşu</span> <span>iyzico</span></li>
                </ul>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200 list-none pl-0">
                    <li className="flex flex-col"><span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase">E-posta</span> <span>support@traxleapp.com</span></li>
                    <li className="flex flex-col"><span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase">Telefon</span> <span>0546 486 03 12</span></li>
                    <li className="flex flex-col"><span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase">Adres</span> <span>Yeniköy Mahallesi 58. Sokak No:24 Daire:4</span></li>
                </ul>
            </div>
        </div>
      </div>

      {/* --- MADDE 2: HİZMETİN NİTELİKLERİ --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
            Hizmetin Temel Nitelikleri
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            Traxle, kullanıcıları birbirleriyle eşleştiren aracı bir dijital platformdur. Platform üzerinden şu hizmetler sunulur:
        </p>
        <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300 mb-4">
            <li className="flex items-center gap-2"><FiLayers className="text-indigo-500"/> İlan oluşturma</li>
            <li className="flex items-center gap-2"><FiLayers className="text-indigo-500"/> Sürücü eşleştirme</li>
            <li className="flex items-center gap-2"><FiLayers className="text-indigo-500"/> Süreç takibi</li>
            <li className="flex items-center gap-2"><FiLayers className="text-indigo-500"/> Ödeme aracılığı</li>
        </ul>
        <div className="p-3 bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-500/20 rounded-xl text-sm text-indigo-800 dark:text-indigo-200">
            <strong>NOT:</strong> TRAXLE, taşımanın fiili icracısı değildir; taşıma sözleşmesi Hizmet Alan ile Hizmet Veren arasında kurulur.
        </div>
      </div>

      {/* --- MADDE 3: ÜCRET VE ÖDEME --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
            Ücret ve Ödeme Bilgileri
        </h3>
        <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-2 marker:text-indigo-500">
            <li>Abonelik ücretleri ve işlem bazlı bedeller satın alma ekranında açıkça gösterilir.</li>
            <li>Tüm vergiler dahil toplam bedel kullanıcı onayına sunulur.</li>
            <li>Ödemeler <strong>iyzico</strong> altyapısı ile tahsil edilir.</li>
            <li>Kart bilgileri TRAXLE tarafından saklanmaz.</li>
        </ul>
      </div>

      {/* --- MADDE 4 & 5: İFA VE CAYMA HAKKI --- */}
      <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
                Hizmetin İfası
            </h3>
            <div className="flex gap-3">
                <FiPlayCircle className="text-indigo-600 text-xl shrink-0 mt-1"/>
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <p className="m-0">Dijital hizmet, ödeme onayı ile derhal başlar.</p>
                    <p className="m-0">Abonelik kapsamında platform özelliklerine anında erişim sağlanır.</p>
                    <p className="m-0">İlan süreçleri kullanıcı onayıyla yürütülür.</p>
                </div>
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-500/20 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-orange-700 dark:text-orange-400 flex items-center gap-2 mb-4">
                <span className="w-2 h-8 bg-orange-600 rounded-full"></span>
                Cayma Hakkı
            </h3>
            <p className="text-sm text-orange-800 dark:text-orange-200 mb-2">
                Dijital hizmetin kullanıcı onayıyla derhal ifa edilmesi nedeniyle, mevzuattaki cayma hakkı istisnaları uygulanabilir. Kullanıcı satın alma adımında;
            </p>
            <ul className="list-disc pl-5 text-sm text-orange-800 dark:text-orange-200 space-y-1">
                <li>Dijital hizmetin hemen başlatılmasını talep ettiğini,</li>
                <li>Cayma hakkı istisnaları hakkında bilgilendirildiğini onaylar.</li>
            </ul>
          </div>
      </div>

      {/* --- MADDE 6 & 7: İPTAL VE SORUMLULUK --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
                    <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
                    İptal ve İade Esasları
                </h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300">
                    <div className="p-3 border border-gray-100 dark:border-white/10 rounded-xl bg-white/40 dark:bg-white/[0.02]">
                        <strong>Abonelik:</strong> Panel üzerinden iptal edilebilir; iptal sonraki yenilemeyi durdurur. Mevcut dönem sonuna kadar erişim devam eder.
                    </div>
                    <div className="p-3 border border-gray-100 dark:border-white/10 rounded-xl bg-white/40 dark:bg-white/[0.02]">
                        <strong>İlan/İşlem:</strong> İlan bazlı iptallerde ekranda gösterilen kesintiler uygulanır. Kötüye kullanım halinde iade reddedilebilir.
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
                    <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
                    Sorumluluk
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 m-0">
                    TRAXLE, aracı platformdur; taşımanın fiilen ifasından sorumlu değildir. Sorumluluk tahsil edilen komisyon ile sınırlıdır.
                </p>
            </div>
        </div>
      </div>

      {/* --- MADDE 8, 9, 10: DİĞER HÜKÜMLER --- */}
      <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <div className="grid md:grid-cols-3 gap-6">
            <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2 flex items-center gap-2"><FiMessageSquare className="text-indigo-500"/> Şikayet ve Başvuru</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">Talepler: support@traxleapp.com. Tüketici Hakem Heyeti ve Tüketici Mahkemelerine başvuru hakkı saklıdır.</p>
            </div>
            <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2 flex items-center gap-2"><FiFileText className="text-indigo-500"/> Delil</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">Platform kayıtları ve elektronik loglar delil niteliğindedir.</p>
            </div>
            <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2 flex items-center gap-2"><FiCheckSquare className="text-indigo-500"/> Onay</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">Kullanıcı, bu Ön Bilgilendirme Formu’nu okuyarak, anladığını ve Mesafeli Hizmet Sözleşmesi ile birlikte kabul ettiğini beyan eder.</p>
            </div>
        </div>
      </div>

    </div>
  );
}