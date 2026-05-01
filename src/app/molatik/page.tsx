'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiZap } from 'react-icons/fi';

export default function MolatikYakindaPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative min-h-screen bg-transparent overflow-hidden transition-colors duration-500 selection:bg-purple-500/30"
    >
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[100px] pointer-events-none animate-pulse-slow dark:bg-purple-600/10" />
        
        <h1 className="text-[90px] md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-50 dark:from-gray-800 dark:to-[#050814] leading-none select-none opacity-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
          MOLATİK
        </h1>

        <div className="relative z-10 -mt-10 md:-mt-20">
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 text-sm font-bold mb-6 backdrop-blur-md">
            <FiZap className="animate-pulse" /> Kodlama yapılıyor.
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Sistem Altyapısı Kuruluyor.
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-lg mx-auto mb-10 leading-relaxed font-medium">
            Kurumsal işletmeler için tasarladığımız personel takip ve mola yönetimi sistemi Molatik yakında TraxleAPP ekosistemine dahil olacak.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-[#050814] px-8 py-4 rounded-xl font-black hover:scale-105 transition-all shadow-lg active:scale-95"
          >
            <span>←</span> Ana Karargaha Dön
          </Link>
        </div>
      </section>
    </motion.div>
  );
}
