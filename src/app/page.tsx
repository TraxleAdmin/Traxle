'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiBox, FiLayers, FiShield, FiZap, FiMousePointer } from 'react-icons/fi';
import TextShimmer from '@/components/ui/TextShimmer';
export default function TraxleHoldingPage() {
  return (
    <div className="relative min-h-screen bg-transparent text-gray-900 dark:text-white selection:bg-blue-500/30 flex flex-col justify-center transition-colors duration-500">

      <div className="container mx-auto px-6 relative z-10 min-h-screen flex flex-col justify-center">
        
        {/* --- HERO: ŞİRKET MANİFESTOSU --- */}
        <div className="text-center max-w-5xl mx-auto perspective-1000 stacking-section relative z-10 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold tracking-widest uppercase mb-8 shadow-[0_0_20px_rgba(0,87,255,0.2)] mx-auto w-max"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse flex-shrink-0"></span>
            <span className="whitespace-nowrap">Traxle Ekosistemi</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 pb-4 leading-[1.0] text-transparent bg-clip-text bg-gradient-to-b from-gray-900 via-gray-800 to-gray-500 dark:from-white dark:via-white/90 dark:to-white/40 drop-shadow-2xl"
          >
            Geleceği <br className="hidden md:block" />
            <span className="text-blue-600 dark:text-blue-500 drop-shadow-[0_0_30px_rgba(0,87,255,0.3)] dark:drop-shadow-[0_0_30px_rgba(0,87,255,0.5)]">İnşa</span> Ediyoruz.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Lojistik, dijital kimlik ve personel yönetimi alanlarında sınırları zorlayan, <span className="text-gray-900 dark:text-white font-medium">yapay zeka destekli</span> yeni nesil SaaS ürünleri.
          </motion.p>

          {/* Mouse/Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 dark:text-white/30"
          >
            <FiMousePointer className="text-xl animate-bounce" />
            <span className="text-xs tracking-widest uppercase">Keşfet</span>
          </motion.div>
        </div>

        <div className="stacking-section relative z-20 pt-10 pb-10 mt-10 overflow-y-visible bg-white dark:bg-[#0A0F25]">
          {/* --- ÜRÜN KARTLARI (BENTO GRID HUB) --- */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-[360px] max-w-7xl mx-auto perspective-1000 px-6"
          >

            {/* ÜRÜN 1: Yeni İsimli Lojistik Uygulaması */}
            <Link href="/lojistik" className="group relative rounded-[2.5rem] p-[2px] bg-gradient-to-br from-blue-500/10 dark:from-blue-500/20 via-transparent to-transparent hover:from-blue-500/30 dark:hover:from-blue-500/50 transition-all duration-700 block transform-gpu hover:-translate-y-2 hover:rotate-y-2 hover:shadow-[0_20px_40px_rgba(0,87,255,0.1)] dark:hover:shadow-[0_20px_40px_rgba(0,87,255,0.15)]">
              <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-500/10 blur-2xl group-hover:bg-blue-500/20 dark:group-hover:bg-blue-500/30 transition-all duration-700 rounded-[2.5rem] opacity-0 group-hover:opacity-100"></div>
              <div className="relative h-full rounded-[2.4rem] p-8 md:p-10 flex flex-col justify-between border border-gray-200/50 dark:border-white/5 overflow-hidden group-hover:border-blue-500/20 transition-colors duration-500">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/10 dark:group-hover:bg-blue-500/20 transition-all duration-700"></div>
                <div className="flex justify-between items-start relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-3xl border border-blue-100 dark:border-blue-500/20 group-hover:scale-110 transition-transform duration-500"><FiLayers /></div>
                  <span className="px-4 py-1.5 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-300">Gizli Proje</span>
                </div>
                <div className="relative z-10 transform-gpu group-hover:translate-x-2 transition-transform duration-500">
                  <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Project: Lojistik</h3>
                  <p className="text-base text-gray-600 dark:text-gray-400 font-light leading-relaxed">İş makinesi ve ağır vasıta kiralama sektörünü kökünden değiştirecek yepyeni B2B işletim sistemi.</p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-bold opacity-70 dark:opacity-50 group-hover:opacity-100 transition-opacity">
                  Yakında <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-500" />
                </div>
              </div>
            </Link>

            {/* ÜRÜN 2: KünyeX */}
            <Link href="/kunyex" className="group relative rounded-[2.5rem] p-[2px] bg-gradient-to-br from-cyan-500/10 dark:from-cyan-500/20 via-transparent to-transparent hover:from-cyan-500/30 dark:hover:from-cyan-500/50 transition-all duration-700 block transform-gpu hover:-translate-y-2 hover:-rotate-y-2 hover:shadow-[0_20px_40px_rgba(0,194,255,0.1)] dark:hover:shadow-[0_20px_40px_rgba(0,194,255,0.15)]">
              <div className="absolute inset-0 bg-cyan-500/5 dark:bg-cyan-500/10 blur-2xl group-hover:bg-cyan-500/20 dark:group-hover:bg-cyan-500/30 transition-all duration-700 rounded-[2.5rem] opacity-0 group-hover:opacity-100"></div>
              <div className="relative h-full rounded-[2.4rem] p-8 md:p-10 flex flex-col justify-between border border-gray-200/50 dark:border-white/5 overflow-hidden group-hover:border-cyan-500/20 transition-colors duration-500">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/10 dark:group-hover:bg-cyan-500/20 transition-all duration-700"></div>
                <div className="flex justify-between items-start relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-3xl border border-cyan-100 dark:border-cyan-500/20 group-hover:scale-110 transition-transform duration-500"><FiShield /></div>
                  <span className="px-4 py-1.5 bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-cyan-600 dark:text-cyan-300 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(0,194,255,0.1)] dark:shadow-[0_0_10px_rgba(0,194,255,0.2)]">Geliştiriliyor</span>
                </div>
                <div className="relative z-10 transform-gpu group-hover:translate-x-2 transition-transform duration-500">
                  <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">KünyeX</h3>
                  <p className="text-base text-gray-600 dark:text-gray-400 font-light leading-relaxed">OCR, QR ve etiket otomasyonu ile evrak süreçlerini şube kontrollü bir enterprise akışa taşıyan sistem.</p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-sm font-bold opacity-70 dark:opacity-70 group-hover:opacity-100 transition-opacity">
                  Gelişimi incele <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-500" />
                </div>
              </div>
            </Link>

            {/* ÜRÜN 3: BarkodX */}
            <Link href="/barkodx" className="group relative rounded-[2.5rem] p-[2px] bg-gradient-to-br from-amber-500/10 dark:from-amber-500/20 via-transparent to-transparent hover:from-amber-500/30 dark:hover:from-amber-500/50 transition-all duration-700 block transform-gpu hover:-translate-y-2 hover:-rotate-y-2 hover:shadow-[0_20px_40px_rgba(245,158,11,0.1)] dark:hover:shadow-[0_20px_40px_rgba(245,158,11,0.15)]">
              <div className="absolute inset-0 bg-amber-500/5 dark:bg-amber-500/10 blur-2xl group-hover:bg-amber-500/20 dark:group-hover:bg-amber-500/30 transition-all duration-700 rounded-[2.5rem] opacity-0 group-hover:opacity-100"></div>
              <div className="relative h-full rounded-[2.4rem] p-8 md:p-10 flex flex-col justify-between border border-gray-200/50 dark:border-white/5 overflow-hidden group-hover:border-amber-500/20 transition-colors duration-500">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/10 dark:group-hover:bg-amber-500/20 transition-all duration-700"></div>
                <div className="flex justify-between items-start relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-300 flex items-center justify-center text-3xl border border-amber-100 dark:border-amber-500/20 group-hover:scale-110 transition-transform duration-500"><FiBox /></div>
                  <span className="px-4 py-1.5 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-300">Kodlanıyor</span>
                </div>
                <div className="relative z-10 transform-gpu group-hover:translate-x-2 transition-transform duration-500">
                  <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">BarkodX</h3>
                  <p className="text-base text-gray-600 dark:text-gray-400 font-light leading-relaxed">Ürün kartları, barkod kayıtları ve etiket hazırlığı için geliştirilen yeni operasyon uygulaması.</p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-amber-700 dark:text-amber-300 text-sm font-bold opacity-70 dark:opacity-70 group-hover:opacity-100 transition-opacity">
                  Kod sürecini gör <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-500" />
                </div>
              </div>
            </Link>

            {/* ÜRÜN 4: Molatik */}
            <Link href="/molatik" className="group relative rounded-[2.5rem] p-[2px] bg-gradient-to-br from-purple-500/10 dark:from-purple-500/20 via-transparent to-transparent hover:from-purple-500/30 dark:hover:from-purple-500/50 transition-all duration-700 block transform-gpu hover:-translate-y-2 hover:rotate-y-2 hover:shadow-[0_20px_40px_rgba(168,85,247,0.1)] dark:hover:shadow-[0_20px_40px_rgba(168,85,247,0.15)]">
              <div className="absolute inset-0 bg-purple-500/5 dark:bg-purple-500/10 blur-2xl group-hover:bg-purple-500/20 dark:group-hover:bg-purple-500/30 transition-all duration-700 rounded-[2.5rem] opacity-0 group-hover:opacity-100"></div>
              <div className="relative h-full rounded-[2.4rem] p-8 md:p-10 flex flex-col justify-between border border-gray-200/50 dark:border-white/5 overflow-hidden group-hover:border-purple-500/20 transition-colors duration-500">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/10 dark:group-hover:bg-purple-500/20 transition-all duration-700"></div>
                <div className="flex justify-between items-start relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center text-3xl border border-purple-100 dark:border-purple-500/20 group-hover:scale-110 transition-transform duration-500"><FiZap /></div>
                  <span className="px-4 py-1.5 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-green-700 dark:text-green-300">Canlıya Hazır</span>
                </div>
                <div className="relative z-10 transform-gpu group-hover:translate-x-2 transition-transform duration-500">
                  <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Molatik</h3>
                  <p className="text-base text-gray-600 dark:text-gray-400 font-light leading-relaxed">Personel molası, zaman takibi ve kullanım istatistiklerini canlı kullanıma hazır operasyon ekranına taşır.</p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-purple-600 dark:text-purple-400 text-sm font-bold opacity-70 dark:opacity-50 group-hover:opacity-100 transition-opacity">
                  İncele <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-500" />
                </div>
              </div>
            </Link>

          </motion.div>
        </div>

      </div>
    </div>
  );
}
