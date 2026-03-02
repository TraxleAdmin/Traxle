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
                            <li className="flex flex-col"><span className="text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase">Ödeme Kuruluşu</span> <span>BDDK Lisanslı Güvenli Ödeme Altyapısı</span></li>
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
                        { title: "Abonelik / Doping", desc: "Platformdaki ücretli erişim ve öne çıkarma paketleri" },
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
                        <li className="flex items-center gap-2"><FiCheckSquare className="text-cyan-500" /> Abonelik ve Doping hizmetleri</li>
                        <li className="flex items-center gap-2"><FiCheckSquare className="text-cyan-500" /> İlan/eşleşme akışı</li>
                        <li className="flex items-center gap-2"><FiCheckSquare className="text-cyan-500" /> Güvenli Havuz (Ödeme)</li>
                        <li className="flex items-center gap-2"><FiCheckSquare className="text-cyan-500" /> İptal–iade süreçleri</li>
                        <li className="flex items-center gap-2"><FiCheckSquare className="text-cyan-500" /> Sorumluluk sınırları</li>
                    </ul>
                </div>

                <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                        <span className="w-2 h-8 bg-cyan-600 rounded-full"></span>
                        Abonelik ve Ek Özellikler
                    </h3>
                    <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-2 marker:text-cyan-500">
                        <li>Abonelik veya Doping ödeme onayı ile derhal başlar.</li>
                        <li>Paket kapsamı ve limitleri satın alma ekranında gösterilir.</li>
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
                            <li className="flex gap-3"><span className="bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded text-xs h-fit font-bold">1</span> Müşteri ilan oluşturur ve yayınlar.</li>
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

            {/* --- MADDE 8 & 9: İPTAL, CAYMA VE İTİRAZ --- */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                        <span className="w-2 h-8 bg-cyan-600 rounded-full"></span>
                        İptal ve Sorumluluk
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Makine şantiyeye sevk edilmeden iptallerde kesinti uygulanabilir. Sevkiyat sonrası iptallerde tüm mobilizasyon (sahaya sevk) ve bekleme maliyetleri müşteriye aittir.</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">TRAXLE, aracı platformdur; kiralamanın fiilen ifasından sorumlu değildir. Sorumluluk tahsil edilen platform hizmet/doping bedeli ile sınırlıdır.</p>
                </div>

                <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-500/20 rounded-3xl p-8 backdrop-blur-sm">
                    <h3 className="text-lg font-bold text-red-700 dark:text-red-400 flex items-center gap-2 mb-4">
                        <span className="w-2 h-8 bg-red-600 rounded-full"></span>
                        Yasaklı İşlemler ve İtiraz
                    </h3>
                    <p className="text-xs text-red-800 dark:text-red-200 mb-2">Platformu atlayarak harici kiralama yapmak veya haksız chargeback (ters ibraz) talebinde bulunmak yasaktır.</p>
                    <p className="text-xs text-red-800 dark:text-red-200">Tespiti halinde hesap kalıcı olarak kapatılır, TRAXLE yasal haklarını saklı tutar.</p>
                </div>
            </div>

            {/* --- MADDE 10, 11, 12: İÇERİK, KVKK, GÜVENLİK --- */}
            <div className="grid md:grid-cols-3 gap-4">
                <div className="p-5 border border-gray-100 dark:border-white/10 rounded-2xl bg-white/50 dark:bg-white/5">
                    <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white mb-2"><FiLayers /> Fikri Mülkiyet</div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 m-0">Platform’daki yazılım ve markalar TRAXLE’a aittir. Kullanıcıya yalnızca kullanım hakkı verilir.</p>
                </div>
                <div className="p-5 border border-gray-100 dark:border-white/10 rounded-2xl bg-white/50 dark:bg-white/5">
                    <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white mb-2"><FiDatabase /> Kişisel Veriler</div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 m-0">Veriler Gizlilik Politikası ve KVKK metnine uygun olarak işlenir ve korunur.</p>
                </div>
                <div className="p-5 border border-gray-100 dark:border-white/10 rounded-2xl bg-white/50 dark:bg-white/5">
                    <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white mb-2"><FiShield /> Güvenlik</div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 m-0">Platform güvenliği için işlem logları tutulur. Şüpheli durumlarda hesaplar askıya alınabilir.</p>
                </div>
            </div>

            {/* --- MADDE 13, 14, 15: DİĞER HÜKÜMLER --- */}
            <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <div className="grid md:grid-cols-3 gap-6">
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2 flex items-center gap-2"><FiGlobe /> Mücbir Sebep</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">İnternet kesintisi, üçüncü taraf arızaları, altyapı sorunları veya resmi kararlar gibi hallerde TRAXLE sorumlu tutulamaz.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2 flex items-center gap-2"><FiRefreshCw /> Değişiklik</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Bu sözleşme şartları güncellenebilir; yeni metin yayımlandığı tarihte otomatik olarak yürürlüğe girer.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2 flex items-center gap-2"><FiCheckSquare /> Delil ve Yetki</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Platform sunucu kayıtları yasal delil kabul edilir. Yetkili mahkeme Antalya Mahkemeleridir.</p>
                    </div>
                </div>
            </div>

            {/* --- MADDE 16: İLETİŞİM --- */}
            <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                    <span className="w-2 h-8 bg-cyan-600 rounded-full"></span>
                    İletişim
                </h3>
                <div className="flex flex-wrap gap-4 text-sm text-gray-700 dark:text-gray-300">
                    <span className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 px-4 py-2 rounded-xl border border-gray-100 dark:border-white/5">
                        <FiMail className="text-cyan-600" /> support@traxleapp.com
                    </span>
                    <span className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 px-4 py-2 rounded-xl border border-gray-100 dark:border-white/5">
                        <FiPhone className="text-cyan-600" /> 0546 486 03 12
                    </span>
                    <span className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 px-4 py-2 rounded-xl border border-gray-100 dark:border-white/5 w-full md:w-auto">
                        <FiMapPin className="text-cyan-600" /> Yeniköy Mah. 58. Sok. No:24 D:4
                    </span>
                </div>
            </div>

        </div>
    );
}