'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiArrowRight, FiTarget, FiUsers, FiCpu, FiCoffee, FiMapPin, FiClock } from 'react-icons/fi';
import UnifiedCard from '@/components/ui/UnifiedCard'; // ✨ Kısayol: Standart Kart
import TextShimmer from '@/components/ui/TextShimmer'; // ✨ Kısayol: Kayan Yazı

// --- İŞ İLANLARI VERİSİ ---
const jobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    type: 'Tam Zamanlı',
    location: 'Uzaktan / Hibrit',
    badge: 'Yeni',
  },
  {
    id: 2,
    title: 'Growth Marketing Manager',
    department: 'Marketing',
    type: 'Tam Zamanlı',
    location: 'Antalya / İstanbul',
    badge: null,
  },
  {
    id: 3,
    title: 'Lojistik Operasyon Uzmanı',
    department: 'Operations',
    type: 'Tam Zamanlı',
    location: 'Antalya',
    badge: null,
  }
];

// --- KÜLTÜR KARTLARI (SOFT RENKLERLE) ---
const benefits = [
  { 
    icon: <FiTarget />, 
    title: "Büyük Vizyon", 
    desc: "Lojistiğin geleceğini değiştiren bir ekibin parçası olun.",
    color: "from-blue-400 to-cyan-300" // Soft Mavi
  },
  { 
    icon: <FiCpu />, 
    title: "En Yeni Teknoloji", 
    desc: "Next.js 14, AI ve Cloud Native mimarilerle çalışın.",
    color: "from-purple-400 to-fuchsia-300" // Soft Mor
  },
  { 
    icon: <FiUsers />, 
    title: "Yatay Hiyerarşi", 
    desc: "Fikirlerin unvanlardan daha değerli olduğu bir ortam.",
    color: "from-emerald-400 to-teal-300" // Soft Yeşil
  },
  { 
    icon: <FiCoffee />, 
    title: "Esnek Çalışma", 
    desc: "İster ofisten, ister evden. Önemli olan sonuç.",
    color: "from-amber-400 to-orange-300" // Soft Turuncu
  },
];

export default function CareerPage() {
  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-[#050814] text-gray-900 dark:text-white pt-32 pb-20 overflow-hidden transition-colors duration-300 selection:bg-blue-400/30">
      
      {/* --- ARKA PLAN EFEKTLERİ (SOFT) --- */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none dark:invert"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.04] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-block px-3 py-1 mb-6 border rounded-full text-xs font-semibold backdrop-blur-md
                       border-blue-400/30 bg-blue-400/10 text-blue-500 dark:text-blue-300"
          >
            🚀 Kariyer Fırsatları
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-7xl font-black mb-6 tracking-tight text-gray-900 dark:text-white"
          >
            Geleceği <br className="hidden md:block" />
            {/* 🔥 TextShimmer ile Yumuşak Geçişli Yazı */}
            <TextShimmer>Birlikte</TextShimmer> Kodlayalım.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Traxle, sadece bir lojistik platformu değil; veriyle çalışan bir teknoloji şirketidir. 
            Sınırları zorlamayı seven, meraklı zihinleri arıyoruz.
          </motion.p>
        </div>

        {/* --- KÜLTÜR & AVANTAJLAR (UNIFIED CARD KULLANIMI) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24 auto-rows-[240px]">
           {benefits.map((item, index) => (
              <UnifiedCard 
                key={index} 
                delay={index * 0.1}
                title={item.title}
                description={item.desc}
                icon={item.icon}
                color={item.color}
              />
           ))}
        </div>

        {/* --- AÇIK POZİSYONLAR --- */}
        <div className="mb-20">
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                className="flex items-center justify-between mb-8"
            >
                <h2 className="text-3xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
                    <FiBriefcase className="text-blue-500 dark:text-blue-400" /> Açık Pozisyonlar
                </h2>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full border border-gray-200 dark:border-white/10">
                    {jobs.length} pozisyon mevcut
                </span>
            </motion.div>

            <div className="grid gap-4">
                {jobs.map((job, index) => (
                    <motion.div 
                        key={job.id}
                        initial={{ opacity: 0, y: 20 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group bg-white dark:bg-[#080c14] p-6 md:p-8 rounded-3xl border border-gray-200 dark:border-white/5 hover:border-blue-400/30 dark:hover:border-blue-400/30 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm hover:shadow-lg relative overflow-hidden"
                    >
                        {/* Hover Glow */}
                        <div className="absolute inset-0 bg-blue-400/0 group-hover:bg-blue-400/[0.02] transition-colors duration-500 pointer-events-none" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors text-gray-900 dark:text-white">{job.title}</h3>
                                {job.badge && (
                                    <span className="px-2.5 py-0.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-300 text-[10px] font-bold uppercase tracking-wider rounded-full border border-blue-200 dark:border-blue-500/20">
                                        {job.badge}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
                                <span className="flex items-center gap-1.5"><FiBriefcase className="text-gray-400" /> {job.department}</span>
                                <span className="hidden md:inline w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                                <span className="flex items-center gap-1.5"><FiMapPin className="text-gray-400" /> {job.location}</span>
                                <span className="hidden md:inline w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                                <span className="flex items-center gap-1.5"><FiClock className="text-gray-400" /> {job.type}</span>
                            </div>
                        </div>

                        <a 
                           href={`mailto:contact@traxleapp.com?subject=Başvuru: ${job.title}`}
                           className="relative z-10 w-full md:w-auto px-6 py-3 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white font-bold text-sm hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 transition-all flex items-center justify-center gap-2 whitespace-nowrap border border-gray-200 dark:border-white/10 group-hover:border-blue-400/30"
                        >
                           Başvur <FiArrowRight />
                        </a>
                    </motion.div>
                ))}
            </div>
        </div>

        {/* --- 🔥 GENEL BAŞVURU CTA (UNIFIED STYLE - SOFT) 🔥 --- */}
        <div className="relative group">
            {/* Arkadaki Soft Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
            
            <div className="relative rounded-[2.5rem] bg-gray-50 dark:bg-[#080c14] overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl p-10 md:p-16 text-center">
                {/* İç Efektler */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05] animate-grid-move"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/5 to-transparent h-[200%] w-full animate-scanline pointer-events-none"></div>
                
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">Aradığınız pozisyonu bulamadınız mı?</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                        Yetenekli insanlarla tanışmayı her zaman severiz. CV&apos;nizi bize gönderin, uygun bir pozisyon açıldığında ilk size haber verelim.
                    </p>
                    <a 
                       href="mailto:contact@traxleapp.com?subject=Genel Başvuru"
                       className="inline-flex items-center gap-2 px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                       Genel Başvuru Yap <FiArrowRight />
                    </a>
                </div>
            </div>
        </div>

      </div>

      {/* Global Style */}
      <style jsx global>{`
        @keyframes gradient-xy { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes grid-move { 0% { background-position: 0 0; } 100% { background-position: 40px 40px; } }
        @keyframes scanline { 0% { transform: translateY(-50%); } 100% { transform: translateY(0%); } }
        .animate-gradient-xy { background-size: 200% 200%; animation: gradient-xy 6s ease infinite; }
        .animate-grid-move { animation: grid-move 20s linear infinite; }
        .animate-scanline { animation: scanline 8s linear infinite; }
      `}</style>

    </div>
  );
}