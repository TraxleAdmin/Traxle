'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiArrowRight, FiTarget, FiUsers, FiCpu, FiCoffee, FiMapPin, FiClock } from 'react-icons/fi';
import UnifiedCard from '@/components/ui/UnifiedCard';
import TextShimmer from '@/components/ui/TextShimmer';

const jobs = [
  { id: 1, title: 'Senior Frontend Developer', department: 'Engineering', type: 'Tam Zamanlı', location: 'Uzaktan / Hibrit', badge: 'Yeni' },
  { id: 2, title: 'Growth Marketing Manager', department: 'Marketing', type: 'Tam Zamanlı', location: 'Antalya / İstanbul', badge: null },
  { id: 3, title: 'Saha Operasyon Uzmanı', department: 'Operations', type: 'Tam Zamanlı', location: 'Antalya', badge: null }
];

const benefits = [
  { icon: <FiTarget />, title: "Büyük Vizyon", desc: "İnşaat teknolojilerinin geleceğini değiştiren bir ekibin parçası olun.", color: "from-blue-400 to-cyan-300" },
  { icon: <FiCpu />, title: "En Yeni Teknoloji", desc: "Next.js 14, AI ve Cloud Native mimarilerle çalışın.", color: "from-purple-400 to-fuchsia-300" },
  { icon: <FiUsers />, title: "Yatay Hiyerarşi", desc: "Fikirlerin unvanlardan daha değerli olduğu bir ortam.", color: "from-emerald-400 to-teal-300" },
  { icon: <FiCoffee />, title: "Esnek Çalışma", desc: "İster ofisten, ister evden. Önemli olan sonuç.", color: "from-amber-400 to-orange-300" },
];

export default function CareerPage() {
  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-[#050814] text-gray-900 dark:text-white pt-32 pb-20 overflow-hidden transition-colors duration-300 selection:bg-blue-400/30">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="text-center mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-3 py-1 mb-6 border rounded-full text-xs font-semibold backdrop-blur-md border-blue-400/30 bg-blue-400/10 text-blue-500">🚀 Kariyer Fırsatları</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-7xl font-black mb-6 tracking-tight">Geleceği <br className="hidden md:block" /><TextShimmer>Birlikte</TextShimmer> Kodlayalım.</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">Traxle, sadece bir B2B platformu değil; veriyle çalışan bir teknoloji şirketidir. Sınırları zorlamayı seven, meraklı zihinleri arıyoruz.</motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24 auto-rows-[240px]">
          {benefits.map((item, index) => (
            <UnifiedCard key={index} delay={index * 0.1} title={item.title} description={item.desc} icon={item.icon} color={item.color} />
          ))}
        </div>

        <div className="mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold flex items-center gap-3"><FiBriefcase className="text-blue-500" /> Açık Pozisyonlar</h2>
            <span className="text-sm font-medium text-gray-500 bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full border border-gray-200 dark:border-white/10">{jobs.length} pozisyon mevcut</span>
          </motion.div>

          <div className="grid gap-4">
            {jobs.map((job, index) => (
              <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group bg-white dark:bg-[#080c14] p-6 rounded-3xl border border-gray-200 dark:border-white/5 hover:border-blue-400/30 transition-all flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-lg">
                <div className="w-full">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold group-hover:text-blue-500 transition-colors">{job.title}</h3>
                    {job.badge && <span className="px-2.5 py-0.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 text-[10px] font-bold uppercase rounded-full border border-blue-200">{job.badge}</span>}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
                    <span className="flex items-center gap-1.5"><FiBriefcase /> {job.department}</span>
                    <span className="flex items-center gap-1.5"><FiMapPin /> {job.location}</span>
                    <span className="flex items-center gap-1.5"><FiClock /> {job.type}</span>
                  </div>
                </div>
                <a href={`mailto:contact@traxleapp.com?subject=Başvuru: ${job.title}`} className="w-full md:w-auto px-6 py-3 rounded-xl bg-gray-100 dark:bg-white/5 font-bold text-sm hover:bg-blue-500 hover:text-white transition-all flex justify-center items-center gap-2">Başvur <FiArrowRight /></a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}