'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import {
  FiCpu, FiGlobe, FiShield, FiActivity, FiUsers, FiBox, FiCheckCircle,
  FiBarChart2, FiFileText, FiLock, FiInfo, FiTarget, FiArrowRight
} from 'react-icons/fi';
import UnifiedCard from '@/components/ui/UnifiedCard';
import TextShimmer from '@/components/ui/TextShimmer';

const AnimatedCounter = ({ end, duration = 2000, suffix = '', prefix = '' }: any) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (end === 0) { setCount(0); return; }
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span className="font-mono">{prefix}{count.toLocaleString('tr-TR')}{suffix}</span>;
};

export default function AboutPage() {
  const [stats, setStats] = useState({ activeLoads: 0, totalDrivers: 0, completedJobs: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsRef = doc(db, "system", "stats");
        const statsSnap = await getDoc(statsRef);
        if (statsSnap.exists()) {
          const data = statsSnap.data();
          setStats({
            activeLoads: data.totalLoads || 0,
            totalDrivers: data.totalDrivers || 0,
            completedJobs: data.completedLoads || 0,
          });
        }
      } catch (error) { console.error('Veri çekme hatası:', error); }
    };
    fetchStats();
  }, []);

  const fadeInUp: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
  const staggerContainer: Variants = { visible: { transition: { staggerChildren: 0.15 } } };
  const softCard = 'bg-white/80 dark:bg-white/[0.04] border border-gray-100 dark:border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-sm shadow-sm dark:shadow-none hover:bg-white dark:hover:bg-white/[0.07] transition-all duration-300';

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
            Traxle B2B Platformu
          </div>

          <h1 className="text-4xl md:text-7xl font-black tracking-tight mb-8 leading-tight text-gray-900 dark:text-white">
            İş Makinesi Kiralamada <br />
            <TextShimmer>Dijital Devrim</TextShimmer>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Geleneksel kiralamanın karmaşasını, yapay zeka destekli algoritmalar ve şeffaf veri akışıyla çözüyoruz.
            Traxle, şantiyeler ile makine sahiplerini en güvenli havuz sisteminde buluşturur.
          </p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          <UnifiedCard type="stat" icon={<FiBox />} label="Aktif Şantiyeler" value={<AnimatedCounter end={stats.activeLoads} />} color="from-blue-500 to-cyan-400" subtext="Platforma kayıtlı operasyon hacmi" />
          <UnifiedCard type="stat" icon={<FiUsers />} label="Tedarikçi Ağı" value={<AnimatedCounter end={stats.totalDrivers} />} color="from-purple-500 to-indigo-400" subtext="Doğrulanmış kurumsal tedarikçiler" />
          <UnifiedCard type="stat" icon={<FiCheckCircle />} label="Tamamlanan Kiralama" value={<AnimatedCounter end={stats.completedJobs} />} color="from-emerald-500 to-teal-400" subtext="Sorunsuz tamamlanan operasyonlar" />
        </motion.div>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className={`${softCard} mb-32`}>
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl text-white text-3xl shrink-0 shadow-lg shadow-blue-500/30"><FiTarget /></div>
            <div className="w-full">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Misyonumuz: <span className="text-blue-600 dark:text-blue-400">Güven İnşa Etmek</span></h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-8">
                Traxle’ın temel amacı; şantiye sektöründeki "tahsilat ve sözleşme" belirsizliğini ortadan kaldırmaktır. Müşteriler için <strong>izlenebilir</strong>, makine sahipleri için <strong>garanti ödemeli</strong> ve herkes için <strong>hukuki güvence</strong> altında olan bir ekosistem sunuyoruz.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-blue-200 dark:hover:border-blue-500/30 transition-colors">
                  <div className="flex items-center gap-3 text-base font-bold text-gray-900 dark:text-white mb-2"><FiCheckCircle className="text-emerald-500 text-xl" /> %100 Şeffaflık</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Gizli ücret yok. Komisyon oranları ve kiralama bedelleri işlem öncesi açıkça gösterilir.</p>
                </div>
                <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-blue-200 dark:hover:border-blue-500/30 transition-colors">
                  <div className="flex items-center gap-3 text-base font-bold text-gray-900 dark:text-white mb-2"><FiLock className="text-blue-500 text-xl" /> Veri Güvenliği</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">KVKK uyumlu altyapı. Operasyonel verileriniz ve ticari sırlarınız uçtan uca şifreleme ile korunur.</p>
                </div>
                <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-blue-200 dark:hover:border-blue-500/30 transition-colors">
                  <div className="flex items-center gap-3 text-base font-bold text-gray-900 dark:text-white mb-2"><FiActivity className="text-purple-500 text-xl" /> Sürdürülebilirlik</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Makine parkındaki atıl süreleri azaltan akıllı algoritmamız ile verimliliği maksimuma çıkarıyoruz.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-gray-900 dark:text-white">Teknolojimiz</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">Sektör standartlarını belirleyen yenilikçi özellikler ile operasyonlarınızı cepten yönetin.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
            <UnifiedCard className="md:col-span-2" title="Yapay Zeka Destekli Eşleştirme" description="Tonaj, ataşman ve lokasyon verilerini saniyeler içinde analiz eder. İhtiyacınıza en uygun makineyi otomatik bulur." icon={<FiCpu />} color="from-blue-500 to-indigo-500" />
            <UnifiedCard title="Canlı Takip" description="Harita üzerinde 7/24 kesintisiz makine lokasyon izleme." icon={<FiGlobe />} color="from-cyan-400 to-blue-400" delay={0.1} />
            <UnifiedCard title="Güvenli Havuz" description="BDDK lisanslı altyapı ile korunan ödeme sistemi. İş bitmeden para aktarılmaz." icon={<FiShield />} color="from-emerald-400 to-teal-500" delay={0.2} />
            <UnifiedCard className="md:col-span-2" title="7/24 Gelişmiş Analitik" description="Hangi makine daha kârlı, hangi şantiyede ne kadar mesai yapıldı detaylı olarak raporlayın." icon={<FiActivity />} color="from-purple-500 to-pink-500" delay={0.3} />
          </div>
        </div>
      </div>
    </div>
  );
}