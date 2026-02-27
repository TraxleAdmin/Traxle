'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore'; // getCountFromServer silindi
import {
  FiCpu,
  FiGlobe,
  FiShield,
  FiActivity,
  FiUsers,
  FiBox,
  FiCheckCircle,
  FiBarChart2,
  FiFileText,
  FiLock,
  FiInfo,
  FiTarget,
  FiArrowRight
} from 'react-icons/fi';
import UnifiedCard from '@/components/ui/UnifiedCard';
import TextShimmer from '@/components/ui/TextShimmer'; 

const AnimatedCounter = ({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
}: {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (end === 0) {
      setCount(0);
      return;
    }

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return (
    <span className="font-mono">
      {prefix}
      {count.toLocaleString('tr-TR')}
      {suffix}
    </span>
  );
};

export default function AboutPage() {
  const [stats, setStats] = useState({
    activeLoads: 0,
    totalDrivers: 0,
    completedJobs: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsRef = doc(db, "system", "stats");
        const statsSnap = await getDoc(statsRef);

        if (statsSnap.exists()) {
          const data = statsSnap.data();
          setStats({
            activeLoads: data.totalLoads || 0, // Tüm üretilen yükler
            totalDrivers: data.totalDrivers || 0,
            completedJobs: data.completedLoads || 0,
          });
        }
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };

    fetchStats();
  }, []);

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer: Variants = {
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const softCard =
    'bg-white/80 dark:bg-white/[0.04] border border-gray-100 dark:border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-sm shadow-sm dark:shadow-none hover:bg-white dark:hover:bg-white/[0.07] transition-all duration-300';

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-[#050814] text-gray-900 dark:text-white pt-24 overflow-hidden transition-colors duration-300 selection:bg-blue-400/30">
      
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 dark:bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 dark:bg-indigo-900/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04] dark:opacity-[0.06] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-4xl mx-auto text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wider uppercase mb-6 backdrop-blur-md border border-blue-200 dark:border-blue-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Traxle Lojistik Teknolojileri
          </div>

          <h1 className="text-4xl md:text-7xl font-black tracking-tight mb-8 leading-tight text-gray-900 dark:text-white">
            Yük Taşımacılığında <br />
            <TextShimmer>Dijital Devrim</TextShimmer>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Geleneksel nakliyenin karmaşasını, yapay zeka destekli algoritmalar ve şeffaf veri akışıyla çözüyoruz. 
            Traxle, yükü olanla yolu olanı en güvenli rotada buluşturur.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32"
        >
          <UnifiedCard
            type="stat"
            icon={<FiBox />}
            label="Sistemdeki Yükler"
            value={<AnimatedCounter end={stats.activeLoads} />}
            color="from-blue-500 to-cyan-400"
            subtext="Platforma kayıtlı operasyon hacmi"
          />
          <UnifiedCard
            type="stat"
            icon={<FiUsers />}
            label="Sürücü Ağı"
            value={<AnimatedCounter end={stats.totalDrivers} />}
            color="from-purple-500 to-indigo-400"
            subtext="Doğrulanmış profesyonel sürücüler"
          />
          <UnifiedCard
            type="stat"
            icon={<FiCheckCircle />}
            label="Başarılı Teslimat"
            value={<AnimatedCounter end={stats.completedJobs} />}
            color="from-emerald-500 to-teal-400"
            subtext="Zamanında tamamlanan sevkiyatlar"
          />
        </motion.div>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className={`${softCard} mb-32`}
        >
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl text-white text-3xl shrink-0 shadow-lg shadow-blue-500/30">
              <FiTarget />
            </div>
            <div className="w-full">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Misyonumuz: <span className="text-blue-600 dark:text-blue-400">Güven İnşa Etmek</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-8">
                Traxle’ın temel amacı; lojistik sektöründeki "belirsizliği" ortadan kaldırmaktır. 
                Yük verenler için <strong>izlenebilir</strong>, sürücüler için <strong>adil ücretlendirilen</strong> ve herkes için <strong>hukuki güvence</strong> altında olan bir ekosistem sunuyoruz.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-blue-200 dark:hover:border-blue-500/30 transition-colors">
                  <div className="flex items-center gap-3 text-base font-bold text-gray-900 dark:text-white mb-2">
                    <FiCheckCircle className="text-emerald-500 text-xl" /> %100 Şeffaflık
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    Gizli ücret yok. Komisyon oranları, navlun bedelleri ve ödeme vadeleri işlem öncesi açıkça gösterilir.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-blue-200 dark:hover:border-blue-500/30 transition-colors">
                  <div className="flex items-center gap-3 text-base font-bold text-gray-900 dark:text-white mb-2">
                    <FiLock className="text-blue-500 text-xl" /> Veri Güvenliği
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    KVKK uyumlu altyapı. Operasyonel verileriniz ve ticari sırlarınız uçtan uca şifreleme ile korunur.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-blue-200 dark:hover:border-blue-500/30 transition-colors">
                  <div className="flex items-center gap-3 text-base font-bold text-gray-900 dark:text-white mb-2">
                    <FiActivity className="text-purple-500 text-xl" /> Sürdürülebilirlik
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    Boş dönüşleri azaltan yapay zeka algoritmamız ile karbon ayak izini ve maliyetleri düşürüyoruz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-gray-900 dark:text-white">Teknolojimiz</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                Sektör standartlarını belirleyen yenilikçi özellikler ile operasyonlarınızı cepten yönetin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
            <UnifiedCard
              className="md:col-span-2"
              title="Yapay Zeka Destekli Rota"
              description="Binlerce veriyi saniyeler içinde analiz eder. Trafik, hava durumu ve araç kapasitesine göre en kârlı rotayı otomatik oluşturur."
              icon={<FiCpu />}
              color="from-blue-500 to-indigo-500"
            >
              <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20 dark:opacity-30 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
                  <path
                    fill="url(#blue-grad)"
                    fillOpacity="0.4"
                    d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                  ></path>
                  <defs>
                    <linearGradient id="blue-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#6366F1" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </UnifiedCard>

            <UnifiedCard
              title="Canlı Takip"
              description="GPS verisi ile anlık konum ve tahmini varış süresi (ETA). Harita üzerinde 7/24 kesintisiz izleme."
              icon={<FiGlobe />}
              color="from-cyan-400 to-blue-400"
              delay={0.1}
            />

            <UnifiedCard
              title="Güvenli Ödeme"
              description="iyzico altyapısı ile korunan ödeme sistemi. Havale/EFT takibine son, tek tıkla güvenli tahsilat."
              icon={<FiShield />}
              color="from-emerald-400 to-teal-500"
              delay={0.2}
            />

            <UnifiedCard
              className="md:col-span-2"
              title="7/24 Gelişmiş Analitik"
              description="Operasyonel verimliliği artıran detaylı raporlar. Hangi rota daha kârlı, hangi araç daha verimli anlık görün."
              icon={<FiActivity />}
              color="from-purple-500 to-pink-500"
              delay={0.3}
            >
              <div className="absolute right-8 bottom-6 hidden md:block opacity-10 dark:opacity-20 transform rotate-12">
                <FiBarChart2 className="text-9xl text-white" />
              </div>
            </UnifiedCard>
          </div>
        </div>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className={`${softCard} mb-32 relative overflow-hidden`}
        >
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-indigo-600"></div>

          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-700 dark:text-blue-400 text-2xl shrink-0">
              <FiInfo />
            </div>
            <div className="w-full">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Şeffaflık & Yasal Uyum
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-6">
                Traxle, 6563 sayılı Kanun ve ilgili mevzuatlara uygun olarak faaliyet gösteren bir <strong>Aracı Hizmet Sağlayıcıdır</strong>. 
                Taşıma hizmetinin fiili ifası (nakliye işlemi) bağımsız sürücü iş ortaklarımız tarafından gerçekleştirilir. 
                Platformumuz; eşleştirme, süreç takibi ve ödeme akışına güvenli teknik aracılık sağlar.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white dark:bg-black/20 p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white mb-3">
                    <FiShield className="text-emerald-500" /> Ödeme Güvenliği
                  </div>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 list-disc pl-5">
                    <li>Ödemeler BDDK lisanslı <strong>iyzico</strong> altyapısı üzerinden alınır.</li>
                    <li>Kredi kartı verileriniz Traxle sunucularında <strong>saklanmaz</strong>.</li>
                    <li>3D Secure ile korunan işlemler.</li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-black/20 p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white mb-3">
                    <FiLock className="text-red-500" /> Suistimal Önleme
                  </div>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 list-disc pl-5">
                    <li>Şüpheli işlemler yapay zeka ile 7/24 izlenir.</li>
                    <li>Platform dışı işlem yapmaya zorlama ve haksız itiraz (chargeback) yasaktır.</li>
                    <li>İhlal durumunda yasal süreç başlatılır.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-3xl mx-auto mb-32"
        >
            <div className="text-center mb-12">
                <span className="text-blue-600 dark:text-blue-400 font-bold tracking-wider text-sm uppercase">Destek Merkezi</span>
                <h2 className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">Sıkça Sorulan Sorular</h2>
            </div>

            <div className="space-y-4">
            <details className="group rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 open:bg-gray-50 dark:open:bg-white/[0.08] transition-all">
                <summary className="cursor-pointer list-none flex items-center justify-between text-base font-bold text-gray-900 dark:text-white">
                Traxle taşıma hizmetini kendisi mi yapıyor?
                <span className="bg-gray-100 dark:bg-white/10 p-2 rounded-full text-gray-500 group-open:rotate-180 transition-transform">
                    <FiArrowRight className="rotate-90" />
                </span>
                </summary>
                <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                Hayır. Traxle bir teknoloji platformudur. Taşıma işlemi, platforma üye olan, belgeleri doğrulanmış bağımsız nakliyeciler tarafından yapılır. Biz süreci dijitalleştirir ve güvence altına alırız.
                </p>
            </details>

            <details className="group rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 open:bg-gray-50 dark:open:bg-white/[0.08] transition-all">
                <summary className="cursor-pointer list-none flex items-center justify-between text-base font-bold text-gray-900 dark:text-white">
                Fatura kesiliyor mu?
                <span className="bg-gray-100 dark:bg-white/10 p-2 rounded-full text-gray-500 group-open:rotate-180 transition-transform">
                    <FiArrowRight className="rotate-90" />
                </span>
                </summary>
                <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                Evet. Platform kullanım bedeli (komisyon/hizmet bedeli) için Traxle tarafından size fatura kesilir. Taşıma hizmetinin faturası ise, hizmeti veren nakliyeci tarafından yük sahibine kesilir.
                </p>
            </details>

            <details className="group rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 open:bg-gray-50 dark:open:bg-white/[0.08] transition-all">
                <summary className="cursor-pointer list-none flex items-center justify-between text-base font-bold text-gray-900 dark:text-white">
                Destek için nereye yazabilirim?
                <span className="bg-gray-100 dark:bg-white/10 p-2 rounded-full text-gray-500 group-open:rotate-180 transition-transform">
                    <FiArrowRight className="rotate-90" />
                </span>
                </summary>
                <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                Her türlü soru ve sorununuz için <strong>support@traxleapp.com</strong> adresine e-posta gönderebilir veya panel içindeki "Destek" bölümünden talep oluşturabilirsiniz.
                </p>
            </details>
            </div>
        </motion.section>

        <section className="relative rounded-[2.5rem] overflow-hidden p-[2px] bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 mb-24 mx-2 md:mx-0">
          <div className="grid md:grid-cols-2 gap-16 items-center bg-white dark:bg-[#080c14] p-8 md:p-16 rounded-[2.4rem] relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05] pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black mb-6 text-gray-900 dark:text-white">
                Geleceğin Lojistiğine <br />
                Bugün Başlayın
              </h2>
              <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                <p>2026 yılında, lojistik sektöründeki "telefon trafiği" ve "belirsizlik" sorununu çözmek için yola çıktık.</p>
                
                <p>
                  Bugün Traxle olarak; şeffaf, ölçülebilir ve %100 dijital bir süreç inşa ederek sektörün kronik sorunlarına kalıcı bir çözüm sunuyoruz. Ekosistemimize katılan her yeni üyeyle birlikte gerçekçi ve emin adımlarla büyüyoruz.
                </p>
                
                <div className="pt-8 flex flex-wrap gap-4">
                  <Link
                    href="/kayit-ol"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-1 transform gap-2"
                  >
                    Ücretsiz Dene <FiArrowRight />
                  </Link>

                  <Link
                    href="/iletisim"
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-900 dark:text-white transition-all duration-200 bg-gray-100 dark:bg-white/10 border border-transparent rounded-xl hover:bg-gray-200 dark:hover:bg-white/20 gap-2"
                  >
                    Bize Ulaşın
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative h-full min-h-[300px] flex items-center justify-center">
              <div className="relative w-72 h-72 flex items-center justify-center">
                <div className="absolute inset-0 border-2 border-blue-400/30 rounded-full animate-[spin_12s_linear_infinite]"></div>
                <div className="absolute inset-8 border-2 border-indigo-400/30 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute inset-0 m-auto w-40 h-40 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full blur-[80px] opacity-40 animate-pulse"></div>
                  <img src="/logo.png" alt="Traxle" className="relative z-10 w-32 dark:brightness-100 brightness-0 opacity-90 drop-shadow-2xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="pb-20 border-t border-gray-200 dark:border-white/10 pt-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <FiFileText className="text-xl" />
              <span className="font-semibold">Kurumsal Belgeler</span>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-gray-600 dark:text-gray-400">
              <Link className="hover:text-blue-600 dark:hover:text-white transition-colors" href="/fiyatlandirma">
                Fiyatlandırma
              </Link>
              <Link className="hover:text-blue-600 dark:hover:text-white transition-colors" href="/mesafeli-hizmet-sozlesmesi">
                Mesafeli Sözleşme
              </Link>
              <Link className="hover:text-blue-600 dark:hover:text-white transition-colors" href="/on-bilgilendirme">
                Ön Bilgilendirme
              </Link>
              <Link className="hover:text-blue-600 dark:hover:text-white transition-colors" href="/gizlilik-politikasi">
                Gizlilik
              </Link>
              <Link className="hover:text-blue-600 dark:hover:text-white transition-colors" href="/kvkk-aydinlatma">
                KVKK
              </Link>
              <Link className="hover:text-blue-600 dark:hover:text-white transition-colors" href="/iptal-iade">
                İptal–İade
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}