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
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white m-0">İPTAL VE İADE POLİTİKASI</h2>
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
                    Bu İptal–İade Politikası; Traxle platformunda sunulan abonelik paketleri, ilan öne çıkarma (doping) ücretleri ve kiralama işlemleri için kurulan güvenli havuz (escrow) uygulamalarına ilişkin iptal ve iade süreçlerini düzenler. Bu metin, Kullanım Koşulları ve Mesafeli Hizmet Sözleşmesi’nin ayrılmaz bir parçasıdır.
                </p>
            </div>

            {/* --- MADDE 2 & 3: ABONELİK VE CAYMA HAKKI --- */}
            <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
                            <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                            Dijital Hizmetlerin İfası (Abonelik ve Doping)
                        </h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            Aylık Abonelik ve İlan Öne Çıkarma (Doping) hizmetleri, ödeme onayı alınır alınmaz dijital olarak başlatılır ve paket kapsamındaki özelliklere (ilan yayınlama hakkı, vitrin görünümü vb.) erişim derhal sağlanır.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
                            <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                            Cayma Hakkı İstisnası
                        </h3>
                        <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-500/20 rounded-xl">
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                Abonelik ve Doping gibi "elektronik ortamda anında ifa edilen hizmetler" mevzuat gereği <strong>Cayma Hakkı İstisnaları</strong> kapsamındadır.
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300 m-0">
                                Kullanıcı, ödeme adımında hizmetin derhal başlatılmasını talep ettiğini ve bu nedenle cayma hakkını (koşulsuz iade hakkını) kullanamayacağını kabul ederek işlemi tamamlar. Satın alınan paketlerin geçmişe dönük iadesi yapılamaz.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- MADDE 4: ABONELİK İPTALİ --- */}
            <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 mb-4">
                    <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                    Abonelik İptali Süreci
                </h3>
                <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-2 marker:text-emerald-500">
                    <li>Kullanıcı, aboneliğini "Hesabım" paneli üzerinden dilediği an iptal edebilir.</li>
                    <li>İptal işlemi, bir sonraki faturalandırma (yenileme) dönemini durdurur. Kartınızdan tekrar çekim yapılmaz.</li>
                    <li>Mevcut (ödemesi yapılmış) dönemin sonuna kadar platform erişimi ve kalan ilan hakları kullanılmaya devam eder. İçinde bulunulan aya ilişkin kısmi veya tam ücret iadesi yapılmaz.</li>
                </ul>
            </div>

            {/* --- MADDE 5: İADE KOŞULLARI (GRID) --- */}
            <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
                    <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                    Traxle Ücretleri İçin İade Koşulları
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Kabul Edilenler */}
                    <div className="p-5 border border-green-200 dark:border-green-500/30 rounded-2xl bg-green-50/50 dark:bg-green-900/10">
                        <div className="flex items-center gap-2 mb-3 text-green-700 dark:text-green-400 font-bold">
                            <FiCheckCircle className="text-xl" /> İade Yapılabilecek Haller
                        </div>
                        <ul className="list-disc pl-5 text-xs text-gray-700 dark:text-gray-300 space-y-2">
                            <li>Sistemsel hata nedeniyle karttan çift (mükerrer) çekim yapılması</li>
                            <li>TRAXLE kaynaklı teknik sorun sebebiyle satın alınan Doping veya Abonelik özelliğinin sisteme tanımlanamaması</li>
                            <li>Tüketici mevzuatı gereği iade yapılması zorunlu kılındığı kanıtlanan istisnai durumlar</li>
                        </ul>
                    </div>

                    {/* Reddedilenler */}
                    <div className="p-5 border border-red-200 dark:border-red-500/30 rounded-2xl bg-red-50/50 dark:bg-red-900/10">
                        <div className="flex items-center gap-2 mb-3 text-red-700 dark:text-red-400 font-bold">
                            <FiXCircle className="text-xl" /> İadenin Reddedileceği Haller
                        </div>
                        <ul className="list-disc pl-5 text-xs text-gray-700 dark:text-gray-300 space-y-2">
                            <li>Satın alınan paketin/hakkın kısmen dahi olsa kullanılmış olması</li>
                            <li>İlanın yayına alınmasından sonra "işten vazgeçilmesi" bahanesi</li>
                            <li>Platform kullanım kurallarının ihlali sebebiyle hesabın dondurulması</li>
                            <li>Bankaya haksız chargeback (ters ibraz) başvurusunda bulunulması</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* --- MADDE 6: KİRALAMA VE GÜVENLİK HAVUZU İPTALLERİ --- */}
            <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2 mb-4">
                    <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                    Şantiye ve Tedarikçi Arası İptaller (Havuz İadeleri)
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">Traxle, kiralama bedelinin tahsilatında sadece aracı (Güvenli Havuz) rolü üstlenir. İptal durumunda iade şartları Şantiye ve Tedarikçi anlaşmasına tabidir:</p>
                <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                    <div className="p-3 border border-gray-100 dark:border-white/10 rounded-xl bg-white/40 dark:bg-white/[0.02]">
                        <strong>İş Makinesi Şantiyeye Sevk Edilmeden İptal:</strong> Taraflar arası mutabakat sağlandığında havuzdaki kiralama bedeli Şantiye'ye kesintisiz iade edilir.
                    </div>
                    <div className="p-3 border border-gray-100 dark:border-white/10 rounded-xl bg-white/40 dark:bg-white/[0.02]">
                        <strong>Makine Sevk Edildikten veya İş Başladıktan Sonra İptal:</strong> Mobilizasyon (sahaya sevk) maliyetleri, bekleme/çalışma bedeli hesaplanır. Traxle Müşteri Temsilcisi tarafların onayına istinaden havuzdaki parayı bölüştürerek (Örn: Tedarikçiye mobilizasyon masrafı, Müşteriye kalan iade) işlemi sonuçlandırır.
                    </div>
                </div>
            </div>

            {/* --- MADDE 7: İLETİŞİM VE ŞİKAYET --- */}
            <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                    <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                    İletişim ve Destek
                </h3>

                <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
                    Mükerrer çekim itirazları, teknik iade talepleri veya abonelik iptal süreçleri ile ilgili destek ekibimize ulaşabilirsiniz. Başvurularınız incelenerek en kısa sürede (yasal limitler dahilinde) sonuçlandırılır.
                </p>

                <div className="p-5 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                    <div className="flex flex-wrap gap-4 text-sm text-gray-700 dark:text-gray-300">
                        <span className="flex items-center gap-2"><FiMail className="text-emerald-500" /> support@traxleapp.com</span>
                        <span className="flex items-center gap-2"><FiPhone className="text-emerald-500" /> 0546 486 03 12</span>
                        <span className="flex items-center gap-2 w-full"><FiMapPin className="text-emerald-500" /> Yeniköy Mahallesi 58. Sokak No:24 Daire:4 Döşemealtı/Antalya</span>
                    </div>
                </div>
            </div>

        </div>
    );
}