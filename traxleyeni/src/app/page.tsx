'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { FiArrowRight, FiLayers, FiShield, FiZap } from 'react-icons/fi';
import TextShimmer from '@/components/ui/TextShimmer';

function CyberCard({
  href,
  title,
  description,
  badge,
  icon,
  colors
}: {
  href: string;
  title: string;
  description: string;
  badge: string;
  icon: React.ReactNode;
  colors: { from: string, via: string, to: string, shadow: string, border: string }
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <Link href={href} className="group relative block w-full h-full rounded-[2.5rem]">
      <motion.div
        className="absolute -inset-[2px] rounded-[2.6rem] opacity-0 group-hover:opacity-100 transition duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.2),
              transparent 80%
            )
          `,
        }}
      />

      <div
        onMouseMove={handleMouseMove}
        className={`relative h-full flex flex-col justify-between p-8 md:p-10 rounded-[2.5rem] bg-white/80 dark:bg-[#0a0f1c]/90 backdrop-blur-xl border border-gray-200 dark:border-white/10 overflow-hidden transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-[1.02] shadow-sm group-hover:shadow-2xl ${colors.shadow}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.from} ${colors.via} ${colors.to} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500`} />

        <div className="relative z-10 flex justify-between items-start mb-12">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 group-hover:text-white group-hover:bg-gradient-to-br ${colors.from} ${colors.to} transition-all duration-500 shadow-inner`}>
            {icon}
          </div>
          <span className="px-3 py-1 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 group-hover:border-current transition-colors">
            {badge}
          </span>
        </div>

        <div className="relative z-10 mt-auto">
          <h3 className={`text-2xl font-bold text-gray-900 dark:text-white mb-3 bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r ${colors.from} ${colors.to} transition-all duration-500`}>
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed group-hover:text-gray-800 dark:group-hover:text-gray-300 transition-colors">
            {description}
          </p>
        </div>

        <div className="relative z-10 mt-6 flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm font-bold opacity-70 group-hover:opacity-100 transition-opacity">
          <span>İncele</span>
          <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
}

export default function TraxleHoldingPage() {
  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-[#050814] text-gray-900 dark:text-white overflow-hidden selection:bg-purple-500/30 flex flex-col justify-center transition-colors duration-500">

      {/* --- ARKAPLAN AMBİYANS IŞIKLARI (SİBER TEMA) --- */}
      <div className="absolute top-[-10%] left-1/4 w-[800px] h-[600px] bg-blue-500/20 dark:bg-blue-600/20 rounded-full blur-[150px] pointer-events-none animate-pulse-slow mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-1/4 w-[600px] h-[600px] bg-purple-500/20 dark:bg-purple-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-fuchsia-500/10 dark:bg-fuchsia-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 py-24 md:py-32">

        {/* --- HERO: ŞİRKET MANİFESTOSU --- */}
        <div className="text-center max-w-4xl mx-auto mb-24 mt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-75"></span>
            Traxle Ekosistemi
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1] text-gray-900 dark:text-white"
          >
            Geleceği <br className="hidden md:block" />
            <span className="bg-cyber-gradient bg-clip-text text-transparent animate-gradient-x">
              İnşa Ediyoruz.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Traxle; lojistik, dijital kimlik ve personel yönetimi alanlarında sınırları zorlayan, <span className="font-semibold text-gray-800 dark:text-gray-200">yapay zeka destekli</span> yeni nesil SaaS ürünleri geliştirir.
          </motion.p>
        </div>

        {/* --- ETKİLEŞİMLİ ÜRÜN KARTLARI (SİBER BENTO GRID) --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[340px] max-w-6xl mx-auto perspective-1000"
        >

          {/* ÜRÜN 1: Lojistik */}
          <CyberCard
            href="/lojistik"
            title="Project: Lojistik"
            description="İş makinesi ve ağır vasıta kiralama sektörünü kökünden değiştirecek yepyeni B2B işletim sistemi."
            badge="Gizli Proje"
            icon={<FiLayers />}
            colors={{
              from: "from-blue-500",
              via: "via-blue-400",
              to: "to-cyan-500",
              shadow: "hover:shadow-blue-500/20",
              border: "group-hover:border-blue-500/50"
            }}
          />

          {/* ÜRÜN 2: KünyeX */}
          <CyberCard
            href="/kunyex"
            title="KünyeX"
            description="Fiziksel ve dijital dünyayı birbirine bağlayan, yeni nesil NFC/QR tabanlı akıllı kimlik ve profil yönetimi."
            badge="Canlıda"
            icon={<FiShield />}
            colors={{
              from: "from-purple-500",
              via: "via-fuchsia-500",
              to: "to-pink-500",
              shadow: "hover:shadow-purple-500/20",
              border: "group-hover:border-purple-500/50"
            }}
          />

          {/* ÜRÜN 3: Molatik */}
          <CyberCard
            href="/molatik"
            title="Molatik"
            description="Kurumsal işletmeler için tasarlanmış, otonom personel takip, mola yönetimi ve verimlilik analizi sistemi."
            badge="Geliştiriliyor"
            icon={<FiZap />}
            colors={{
              from: "from-cyan-500",
              via: "via-teal-400",
              to: "to-emerald-500",
              shadow: "hover:shadow-cyan-500/20",
              border: "group-hover:border-cyan-500/50"
            }}
          />

        </motion.div>

      </div>

      {/* Background gradient animation for text */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 6s ease infinite;
        }
      `}} />
    </div>
  );
}
