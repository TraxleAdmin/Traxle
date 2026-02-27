'use client';

import React from 'react';
import {
    FiShield,
    FiFileText,
    FiAlertTriangle,
    FiCreditCard,
    FiXCircle,
    FiLock,
    FiLayers,
    FiCheckCircle,
    FiMail,
    FiPhone,
    FiMapPin,
    FiBriefcase,
    FiCpu,
    FiGlobe,
    FiRefreshCw
} from 'react-icons/fi';

export default function TermsOfServiceContent() {
    return (
        <div className="max-w-none space-y-8">

            {/* --- HEADER --- */}
            <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-6 border-b border-gray-200 dark:border-white/10 pb-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-700 dark:text-blue-400 text-2xl">
                        <FiBriefcase />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white m-0">KULLANIM KOŞULLARI</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Son Güncelleme: <strong>10.02.2026</strong>
                        </p>
                    </div>
                </div>
            </div>

            {/* --- MADDE 1: GENEL HÜKÜMLER --- */}
            <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6">
                    <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                    Genel Hükümler
                </h3>

                <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
                    Bu Kullanım Koşulları, Traxle platformunun kullanımına ilişkin kuralları belirler. Platform’u kullanan herkes bu koşulları okumuş, anlamış ve kabul etmiş sayılır.
                </p>

                {/* İşletici Bilgileri Kartı */}
                <div className="p-6 border border-blue-200 dark:border-blue-500/30 rounded-2xl bg-blue-50/50 dark:bg-blue-900/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">İŞLETİCİ</div>
                    <div className="grid md:grid-cols-2 gap-4 mt-2">
                        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200 list-none pl-0">
                            <li className="flex flex-col"><span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase">Sahibi ve İşleticisi</span> <span>Eray Evgin – Traxle</span></li>
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

            {/* --- MADDE 2: HİZMETİN NİTELİĞİ --- */}
            <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                    <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                    Hizmetin Niteliği
                </h3>
                <div className="p-5 border border-blue-100 dark:border-blue-500/20 rounded-2xl bg-blue-50/50 dark:bg-blue-900/10 flex gap-4 items-start">
                    <div className="mt-1 text-blue-600 dark:text-blue-400 shrink-0">
                        <FiLayers className="text-xl" />
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                        <p className="m-0 mb-2 font-bold">Traxle, şantiyeleri (müşterileri) ve makine sahiplerini (tedarikçileri) birbirleriyle buluşturan aracı bir dijital platformdur.</p>
                        <ul className="list-disc pl-5 m-0 space-y-1">
                            <li>TRAXLE; kiralamanın veya saha operasyonunun fiili icracısı değildir,</li>
                            <li>Makine sahibi, bayisi veya kiralama şirketi sıfatı taşımaz,</li>
                            <li>Şantiye ile Tedarikçi arasındaki kiralama sözleşmesinin tarafı değildir.</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* --- MADDE 3 & 4: KULLANIM AMACI VE SORUMLULUKLAR --- */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                        <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                        Platform Kullanım Amacı
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">Platform yalnızca şu amaçlarla kullanılabilir:</p>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <li className="flex items-center gap-2"><FiCheckCircle className="text-green-500" /> Kiralama talebi oluşturma</li>
                        <li className="flex items-center gap-2"><FiCheckCircle className="text-green-500" /> Makine ve iş eşleşmesi sağlama</li>
                        <li className="flex items-center gap-2"><FiCheckCircle className="text-green-500" /> Operasyon ve lojistik takibi</li>
                        <li className="flex items-center gap-2"><FiCheckCircle className="text-green-500" /> Güvenli tahsilat ve ödeme aracılığı</li>
                    </ul>
                    <p className="text-xs text-red-500 mt-3 font-bold">Bu amaçlar dışında kullanım yasaktır.</p>
                </div>

                <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                        <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                        Kullanıcının Sorumlulukları
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">Kullanıcı şunlarla yükümlüdür:</p>
                    <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                        <li>Makine ve şantiye bilgilerini doğru beyan etmek</li>
                        <li>İş güvenliği ve mevzuata uygun hareket etmek</li>
                        <li>Başkalarının haklarını ihlal etmemek</li>
                        <li>Platform’u kötüye kullanmamak</li>
                        <li>Gerçek dışı ilan/talep oluşturmamak</li>
                    </ul>
                </div>
            </div>

            {/* --- MADDE 5: YASAKLI İŞLEMLER --- */}
            <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-500/20 rounded-3xl p-8 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-red-700 dark:text-red-400 flex items-center gap-2 mb-4">
                    <span className="w-2 h-8 bg-red-600 rounded-full"></span>
                    Yasaklı İşlemler
                </h3>
                <p className="text-sm text-red-800 dark:text-red-200 mb-3 font-bold">Aşağıdakiler kesin olarak yasaktır:</p>
                <div className="grid md:grid-cols-2 gap-x-4 gap-y-2 text-sm text-red-800 dark:text-red-200">
                    <div className="flex items-center gap-2"><FiXCircle /> Platform’u atlayarak harici kiralama yapmak</div>
                    <div className="flex items-center gap-2"><FiXCircle /> Sahte hesap, makine ve evrak yüklemek</div>
                    <div className="flex items-center gap-2"><FiXCircle /> Bot/scraping ile veri çekmek</div>
                    <div className="flex items-center gap-2"><FiXCircle /> Tersine mühendislik</div>
                    <div className="flex items-center gap-2"><FiXCircle /> Yanıltıcı beyan</div>
                    <div className="flex items-center gap-2"><FiXCircle /> Haksız chargeback (ters ibraz)</div>
                    <div className="flex items-center gap-2 md:col-span-2"><FiXCircle /> Güvenliği bozacak siber eylemler</div>
                </div>
            </div>

            {/* --- MADDE 6 & 7: ÖDEME VE DİJİTAL HİZMET --- */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                        <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                        Ücretler ve Ödeme
                    </h3>
                    <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                        <li>Komisyon ve kiralama ücretleri işlem öncesi açıkça gösterilir.</li>
                        <li>Ödemeler BDDK lisanslı <strong>Güvenli Ödeme Altyapısı</strong> ile alınır.</li>
                        <li>Kart verileri TRAXLE sunucularında kesinlikle saklanmaz.</li>
                    </ul>
                </div>

                <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                        <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                        Dijital Hizmetin Başlaması
                    </h3>
                    <div className="flex gap-3 items-start p-3 border border-blue-100 dark:border-blue-500/20 rounded-xl bg-blue-50/50 dark:bg-blue-900/10">
                        <FiCreditCard className="text-blue-600 text-xl shrink-0 mt-1" />
                        <p className="text-sm text-gray-700 dark:text-gray-300 m-0">
                            Ücretli hizmetler, ödeme onayıyla derhal başlar. Kullanıcı bu durumu bilerek işlem yapar ve cayma hakkı istisnalarının geçerli olduğunu kabul eder.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- MADDE 8: İPTAL SÜREÇLERİ --- */}
            <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                    <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                    İptal Süreçleri
                </h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700 dark:text-gray-300">
                    <div className="p-3 border border-gray-100 dark:border-white/10 rounded-xl bg-white/40 dark:bg-white/[0.02]">
                        <strong>Abonelik:</strong> Panelden dilediğiniz an iptal edilebilir, yenileme durdurulur.
                    </div>
                    <div className="p-3 border border-gray-100 dark:border-white/10 rounded-xl bg-white/40 dark:bg-white/[0.02]">
                        <strong>Kiralama (İlan):</strong> Makine şantiyeye sevk edilmeden önceki ve sonraki iptallerde ekranda gösterilen kurallar/kesintiler geçerlidir.
                    </div>
                    <div className="p-3 border border-gray-100 dark:border-white/10 rounded-xl bg-white/40 dark:bg-white/[0.02]">
                        <strong>Kötüye Kullanım:</strong> İade reddedilebilir ve hesap dondurulabilir.
                    </div>
                </div>
            </div>

            {/* --- MADDE 9: SORUMLULUK REDDİ --- */}
            <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-500/20 rounded-3xl p-8 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-orange-700 dark:text-orange-400 flex items-center gap-2 mb-4">
                    <span className="w-2 h-8 bg-orange-600 rounded-full"></span>
                    Sorumluluk Reddi
                </h3>
                <p className="text-sm text-orange-800 dark:text-orange-200 mb-2">TRAXLE aşağıdakilerden sorumlu değildir:</p>
                <ul className="list-disc pl-5 text-sm text-orange-800 dark:text-orange-200 space-y-1 mb-3">
                    <li>Operasyonun gecikmesinden veya makinenin arızalanmasından,</li>
                    <li>Şantiye sahasında meydana gelebilecek iş kazaları ve hasarlardan,</li>
                    <li>Taraflar arası hukuki ve ticari uyuşmazlıklardan.</li>
                </ul>
                <p className="text-sm font-bold text-orange-800 dark:text-orange-200 m-0">Platformun mali sorumluluğu, tahsil edilen aracı komisyon tutarı ile sınırlıdır.</p>
            </div>

            {/* --- MADDE 10, 11, 12: İÇERİK, KVKK, GÜVENLİK --- */}
            <div className="grid md:grid-cols-3 gap-4">
                <div className="p-5 border border-gray-100 dark:border-white/10 rounded-2xl bg-white/50 dark:bg-white/5">
                    <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white mb-2"><FiCpu /> Fikri Mülkiyet</div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 m-0">Platform’daki yazılım, tasarım ve markalar TRAXLE’a aittir. Kullanıcıya yalnızca kiralama süresince kullanım hakkı verilir.</p>
                </div>
                <div className="p-5 border border-gray-100 dark:border-white/10 rounded-2xl bg-white/50 dark:bg-white/5">
                    <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white mb-2"><FiFileText /> Kişisel Veriler</div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 m-0">Veriler ve KYC evrakları Gizlilik Politikası ve KVKK metni kapsamında güvenle işlenir.</p>
                </div>
                <div className="p-5 border border-gray-100 dark:border-white/10 rounded-2xl bg-white/50 dark:bg-white/5">
                    <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white mb-2"><FiLock /> Güvenlik</div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 m-0">Platform güvenliği için işlem logları tutulur. TRAXLE şüpheli durumlarda hesabı askıya alma hakkını saklı tutar.</p>
                </div>
            </div>

            {/* --- MADDE 13, 14, 15: DİĞER HÜKÜMLER --- */}
            <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <div className="grid md:grid-cols-3 gap-6">
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2 flex items-center gap-2"><FiGlobe /> Mücbir Sebep</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">İnternet kesintisi, üçüncü taraf arızaları veya resmi kararlar gibi hallerde TRAXLE sorumlu tutulamaz.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2 flex items-center gap-2"><FiRefreshCw /> Değişiklik</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Bu kullanım koşulları güncellenebilir; yeni metin yayımlandığı tarihte otomatik olarak yürürlüğe girer.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2 flex items-center gap-2"><FiShield /> Delil ve Yetki</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Platform sunucu kayıtları (loglar) yasal delil kabul edilir. Yetkili mahkeme Antalya Mahkemeleridir.</p>
                    </div>
                </div>
            </div>

            {/* --- MADDE 16: İLETİŞİM --- */}
            <div className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                    <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                    İletişim
                </h3>
                <div className="flex flex-wrap gap-4 text-sm text-gray-700 dark:text-gray-300">
                    <span className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 px-4 py-2 rounded-xl border border-gray-100 dark:border-white/5">
                        <FiMail className="text-blue-600" /> support@traxleapp.com
                    </span>
                    <span className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 px-4 py-2 rounded-xl border border-gray-100 dark:border-white/5">
                        <FiPhone className="text-blue-600" /> 0546 486 03 12
                    </span>
                    <span className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 px-4 py-2 rounded-xl border border-gray-100 dark:border-white/5 w-full md:w-auto">
                        <FiMapPin className="text-blue-600" /> Yeniköy Mah. 58. Sok. No:24 D:4
                    </span>
                </div>
            </div>

        </div>
    );
}