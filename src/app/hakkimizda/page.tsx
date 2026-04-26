'use client';

import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import {
  FiCpu, FiGlobe, FiShield, FiActivity, FiLayers, FiDatabase, FiCheckCircle,
  FiTarget, FiLock, FiSmartphone
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
  // Ekosistem metrikleri (Örnek değerler, dilersen veritabanından çekilebilir)
  const [stats, setStats] = useState({ activeUsers: 4500, transactions: 125000, uptime: 99 });

  const fadeInUp: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
  const staggerContainer: Variants = { visible: { transition: { staggerChildren: 0.15 } } };
  const softCard = 'bg-white/80 dark:bg-white/[0.04] border border-gray-100 dark:border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-sm shadow-sm dark:shadow-none hover:bg-white dark:hover:bg-white/[0.07] transition-all duration-300';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative min-h-screen bg-transparent text-gray-900 dark:text-white pt-24 overflow-hidden transition-colors duration-300 selection:bg-blue-400/30"
    >

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- HERO BÖLÜMÜ --- */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-4xl mx-auto text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-xs font-bold tracking-wider uppercase mb-6 backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Traxle Teknoloji Ekosistemi
          </div>

          <h1 className="text-4xl md:text-7xl font-black tracking-tight mb-8 leading-tight text-gray-900 dark:text-white">
            Geleceğin Teknolojisini <br />
            <TextShimmer>Bugünden Kodluyoruz.</TextShimmer>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Traxle; fiziksel dünyadaki operasyonları dijital evrenle buluşturan, yapay zeka destekli ve askeri düzeyde şifrelenmiş B2B SaaS (Hizmet Olarak Yazılım) ürünleri geliştiren bağımsız bir teknoloji şirketidir.
          </p>
        </motion.div>

        {/* --- İSTATİSTİKLER --- */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          <UnifiedCard type="stat" icon={<FiActivity />} label="Sistem Uptime" value={<AnimatedCounter end={stats.uptime} suffix=",9%" />} color="from-blue-500 to-cyan-400" subtext="Kesintisiz Bulut Altyapısı" />
          <UnifiedCard type="stat" icon={<FiShield />} label="Güvenli İşlem Hacmi" value={<AnimatedCounter end={stats.transactions} prefix="+" />} color="from-purple-500 to-indigo-400" subtext="Şifrelenmiş Veri Akışı" />
          <UnifiedCard type="stat" icon={<FiLayers />} label="Aktif Kullanıcı" value={<AnimatedCounter end={stats.activeUsers} prefix="+" />} color="from-emerald-500 to-teal-400" subtext="Ekosisteme Bağlı Profesyoneller" />
        </motion.div>

        {/* --- VİZYON VE MİSYON --- */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className={`${softCard} mb-32`}>
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl text-white text-3xl shrink-0 shadow-lg shadow-blue-500/30"><FiTarget /></div>
            <div className="w-full">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Vizyonumuz: <span className="text-blue-600 dark:text-blue-400">Sınırları Kaldırmak</span></h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-8">
                Amacımız sadece bir sektörün sorunlarını çözmek değil; <strong>KünyeX</strong> ile dijital kimlikleri fiziksel dünyaya entegre etmek, <strong>Molatik</strong> ile kurumsal verimliliği otonom hale getirmek ve <strong>Lojistik</strong> çözümlerimizle ağır sanayiyi modernize etmektir.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-blue-200 dark:hover:border-blue-500/30 transition-colors">
                  <div className="flex items-center gap-3 text-base font-bold text-gray-900 dark:text-white mb-2"><FiCheckCircle className="text-emerald-500 text-xl" /> Zero-Trust Mimarisi</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Tüm ürünlerimizde "Sıfır Güven" politikası uygularız. Verileriniz donanım kimlikleriyle (HWID) kilitlenir ve uçtan uca şifrelenir.</p>
                </div>
                <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-blue-200 dark:hover:border-blue-500/30 transition-colors">
                  <div className="flex items-center gap-3 text-base font-bold text-gray-900 dark:text-white mb-2"><FiGlobe className="text-blue-500 text-xl" /> Cloud-Native Altyapı</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Modern web teknolojileri (Next.js, Firebase) ile inşa edilen ürünlerimiz, dünyanın her yerinden milisaniyeler içinde yanıt verir.</p>
                </div>
                <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-blue-200 dark:hover:border-blue-500/30 transition-colors">
                  <div className="flex items-center gap-3 text-base font-bold text-gray-900 dark:text-white mb-2"><FiCpu className="text-purple-500 text-xl" /> Akıllı Otomasyon</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">İnsan hatasını sıfıra indirmek için Görüntü İşleme (OCR) ve Yapay Zeka algoritmalarını operasyonel süreçlerin merkezine koyarız.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* --- TEKNOLOJİ YAKLAŞIMI --- */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-gray-900 dark:text-white">Ekosistem Bileşenleri</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">Birbiriyle konuşan ve birbirini tamamlayan akıllı sistemler bütünü.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
            <UnifiedCard className="md:col-span-2" title="Donanım ve Yazılım Entegrasyonu" description="NFC ve QR teknolojilerini kullanarak fiziksel kartları ve nesneleri bulut tabanlı sistemlerimize anında bağlıyoruz." icon={<FiSmartphone />} color="from-cyan-400 to-blue-500" />
            <UnifiedCard title="Büyük Veri Yönetimi" description="Milyonlarca satır veriyi gerçek zamanlı analiz edip anlamlı raporlara dönüştürüyoruz." icon={<FiDatabase />} color="from-blue-400 to-indigo-500" delay={0.1} />
            <UnifiedCard title="Finansal Güvenlik" description="Ödemeleri güvence altına alan kapalı devre (Escrow) havuz mimarisi." icon={<FiLock />} color="from-emerald-400 to-teal-500" delay={0.2} />
            <UnifiedCard className="md:col-span-2" title="Merkezi Otopilot" description="İnsan müdahalesi gerektirmeden arka planda çalışan zamanlanmış görevler (Cron Jobs) ve otonom karar mekanizmaları." icon={<FiActivity />} color="from-purple-500 to-pink-500" delay={0.3} />
          </div>
        </div>

      </div>
    </motion.div>
  );
}