'use client';

import React from 'react';
import {
    FiFileText,
    FiMapPin,
    FiPhone,
    FiMail,
    FiCreditCard,
    FiLayers,
    FiCheckSquare,
    FiShield,
    FiXCircle,
    FiDatabase,
    FiGlobe
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
                            <li className="flex flex-col"><span className="text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase">Ödeme Kuruluşu</span> <span>Güvenli Ödeme Altyapısı</span></li>
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
                        { title: "Müşteri / Şantiye", desc: "Kiralama talebi oluşturan kullanıcı" },
                        { title: "Tedarikçi", desc: "Talebi kabul eden makine sahibi" },
                        { title: "Abonelik", desc: "Ücretli erişim paketi" },
                        { title: "Kiralama Talebi", desc: "Platform üzerinden oluşturulan iş ilanı" },
                        { title: "Bloke (Havuz)", desc: "İşleme ilişkin tutarın geçici ayrılması" },
                        { title: "Teslim Doğrulaması", desc: "Tutanak / fotoğraf / onay" }
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
                            <li>Kiralamanın ve operasyonun fiili icracısı değildir,</li>
                            <li>Makine sahibi veya kiralama şirketi değildir,</li>
                            <li>Müşteri ile Tedarikçi arasındaki sözleşmenin tarafı değildir.</li>
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
                        <li className="flex items-center gap-2"><FiCheckSquare className="text-cyan-500" /> Abonelik hizmeti</li>
                        <li className="flex items-center gap-2"><FiCheckSquare className="text-cyan-500" /> İlan/eşleşme akışı</li>
                        <li className="flex items-center gap-2"><FiCheckSquare className="text-cyan-500" /> Güvenli Havuz (Ödeme)</li>
                        <li className="flex items-center gap-2"><FiCheckSquare className="text-cyan-500" /> İptal–iade süreçleri</li>
                        <li className="flex items-center gap-2"><FiCheckSquare className="text-cyan-500" /> Sorumluluk sınırları</li>
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
                            Kiralama ve Eşleşme
                        </h3>
                        <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                            <li className="flex gap-3"><span className="bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded text-xs h-fit font-bold">1</span> Müşteri ilan oluşturur, ücret onayına sunulur.</li>
                            <li className="flex gap-3"><span className="bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded text-xs h-fit font-bold">2</span> Tutar güvenli havuz hesabına bloke edilir.</li>
                            <li className="flex gap-3"><span className="bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded text-xs h-fit font-bold">3</span> Tedarikçi kabul eder, operasyon başlar.</li>
                            <li className="flex gap-3"><span className="bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded text-xs h-fit font-bold">4</span> Teslim doğrulaması ile para aktarılır.</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                            <span className="w-2 h-8 bg-cyan-600 rounded-full"></span>
                            Ödeme Süreci
                        </h3>
                        <div className="p-4 bg-cyan-50 dark:bg-cyan-900/10 border border-cyan-100 dark:border-cyan-500/20 rounded-xl">
                            <ul className="space-y-2 text-sm text-cyan-900 dark:text-cyan-100 list-none pl-0">
                                <li className="flex items-center gap-2"><FiCreditCard /> Ödemeler BDDK lisanslı kuruluş üzerinden yapılır.</li>
                                <li className="flex items-center gap-2"><FiShield /> Kart verileri TRAXLE’da tutulmaz.</li>
                                <li className="flex items-center gap-2"><FiFileText /> Bloke ve dağıtım kuralları şeffafça gösterilir.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- DİĞER MADDELERİ KISALTTIK --- */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                        <span className="w-2 h-8 bg-cyan-600 rounded-full"></span>
                        İptal ve Sorumluluk
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Makine şantiyeye sevk edilmeden iptallerde kesinti uygulanabilir. Sevkiyat sonrası iptallerde tüm taşıma/bekleme maliyetleri müşteriye aittir.</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">TRAXLE, operasyonun gecikmesinden veya makinenin hasarından sorumlu tutulamaz. Sorumluluk komisyon tutarı ile sınırlıdır.</p>
                </div>

                <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-500/20 rounded-3xl p-8 backdrop-blur-sm">
                    <h3 className="text-lg font-bold text-red-700 dark:text-red-400 flex items-center gap-2 mb-4">
                        <span className="w-2 h-8 bg-red-600 rounded-full"></span>
                        Yasaklı İşlemler
                    </h3>
                    <p className="text-xs text-red-800 dark:text-red-200">Platformu atlayarak komisyon dışı (harici) kiralama yapmak, haksız chargeback (ters ibraz) talebinde bulunmak yasaktır. Tespiti halinde hesap kalıcı olarak kapatılır ve hukuki süreç başlatılır.</p>
                </div>
            </div>
        </div>
    );
}