'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiLayers, FiShield, FiZap } from 'react-icons/fi';
import TextShimmer from '@/components/ui/TextShimmer';

export default function TraxleHoldingPage() {
  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-[#050814] text-gray-900 dark:text-white overflow-hidden selection:bg-blue-500/30 flex flex-col justify-center transition-colors duration-500">

      {/* --- ARKAPLAN AMBİYANS IŞIKLARI (APPLE STYLE) --- */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 dark:bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 py-24 md:py-32">
        
        {/* --- HERO: ŞİRKET MANİFESTOSU --- */}
        <div className="text-center max-w-4xl mx-auto mb-24 mt-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Traxle Ekosistemi
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }} 
            className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1] text-gray-900 dark:text-white"
          >
            Geleceği <br className="hidden md:block" />
            <TextShimmer>İnşa Ediyoruz.</TextShimmer>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }} 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Traxle; lojistik, dijital kimlik ve personel yönetimi alanlarında sınırları zorlayan, yapay zeka destekli yeni nesil SaaS ürünleri geliştirir.
          </motion.p>
        </div>

        {/* --- ÜRÜN KARTLARI (BENTO GRID HUB) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px] max-w-6xl mx-auto"
        >
          
          {/* ÜRÜN 1: Yeni İsimli Lojistik Uygulaması */}
          <Link href="/lojistik" className="group relative rounded-[2.5rem] p-[2px] bg-gradient-to-br from-blue-500/10 dark:from-blue-500/20 via-transparent to-transparent hover:from-blue-500/30 dark:hover:from-blue-500/40 transition-all duration-500 block shadow-sm hover:shadow-md">
            <div className="absolute inset-0 bg-blue-500/5 blur-xl group-hover:bg-blue-500/10 dark:group-hover:bg-blue-500/20 transition-all duration-500 rounded-[2.5rem] opacity-0 group-hover:opacity-100"></div>
            <div className="relative h-full bg-white/90 dark:bg-[#0a0f1c]/90 backdrop-blur-xl rounded-[2.4rem] p-8 md:p-10 flex flex-col justify-between border border-gray-100 dark:border-white/5 overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl border border-blue-100 dark:border-blue-500/20"><FiLayers /></div>
                <span className="px-3 py-1 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Gizli Proje</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Project: Lojistik</h3>
                <p className="text-sm text-gray-600 dark:text-gray-500 font-medium">İş makinesi ve ağır vasıta kiralama sektörünü kökünden değiştirecek yepyeni B2B işletim sistemi.</p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-blue-600 dark:text-blue-500 text-sm font-bold opacity-70 dark:opacity-50">
                Yakında <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* ÜRÜN 2: KünyeX */}
          <Link href="/kunyex" className="group relative rounded-[2.5rem] p-[2px] bg-gradient-to-br from-cyan-500/10 dark:from-cyan-500/20 via-transparent to-transparent hover:from-cyan-500/30 dark:hover:from-cyan-500/40 transition-all duration-500 block shadow-sm hover:shadow-md">
            <div className="absolute inset-0 bg-cyan-500/5 blur-xl group-hover:bg-cyan-500/10 dark:group-hover:bg-cyan-500/20 transition-all duration-500 rounded-[2.5rem] opacity-0 group-hover:opacity-100"></div>
            <div className="relative h-full bg-white/90 dark:bg-[#0a0f1c]/90 backdrop-blur-xl rounded-[2.4rem] p-8 md:p-10 flex flex-col justify-between border border-gray-100 dark:border-white/5 overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 rounded-2xl bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-2xl border border-cyan-100 dark:border-cyan-500/20"><FiShield /></div>
                <span className="px-3 py-1 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Canlıda</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">KünyeX</h3>
                <p className="text-sm text-gray-600 dark:text-gray-500 font-medium">Fiziksel ve dijital dünyayı birbirine bağlayan, yeni nesil NFC/QR tabanlı akıllı kimlik ve profil yönetimi.</p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-cyan-600 dark:text-cyan-500 text-sm font-bold opacity-70 dark:opacity-50">
                İncele <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* ÜRÜN 3: Molatik */}
          <Link href="/molatik" className="group relative rounded-[2.5rem] p-[2px] bg-gradient-to-br from-purple-500/10 dark:from-purple-500/20 via-transparent to-transparent hover:from-purple-500/30 dark:hover:from-purple-500/40 transition-all duration-500 block shadow-sm hover:shadow-md">
            <div className="absolute inset-0 bg-purple-500/5 blur-xl group-hover:bg-purple-500/10 dark:group-hover:bg-purple-500/20 transition-all duration-500 rounded-[2.5rem] opacity-0 group-hover:opacity-100"></div>
            <div className="relative h-full bg-white/90 dark:bg-[#0a0f1c]/90 backdrop-blur-xl rounded-[2.4rem] p-8 md:p-10 flex flex-col justify-between border border-gray-100 dark:border-white/5 overflow-hidden">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center text-2xl border border-purple-100 dark:border-purple-500/20"><FiZap /></div>
                <span className="px-3 py-1 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Geliştiriliyor</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Molatik</h3>
                <p className="text-sm text-gray-600 dark:text-gray-500 font-medium">Kurumsal işletmeler için tasarlanmış, otonom personel takip, mola yönetimi ve verimlilik analizi sistemi.</p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-purple-600 dark:text-purple-500 text-sm font-bold opacity-70 dark:opacity-50">
                Yakında <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

        </motion.div>

      </div>
    </div>
  );
}