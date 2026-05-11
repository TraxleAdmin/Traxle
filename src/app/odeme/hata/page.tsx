'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiRefreshCw, FiHeadphones } from 'react-icons/fi';

export default function PaymentError() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050814] flex items-center justify-center p-6 transition-colors duration-300">
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl text-center max-w-lg w-full relative z-10"
      >
        <div className="w-24 h-24 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiAlertCircle className="text-red-600 dark:text-red-400 text-5xl" />
        </div>

        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
          Ödeme Alınamadı
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          Ne yazık ki işleminizi tamamlayamadık. Kart bilgilerinizde bir hata olabilir veya bankanız işlemi reddetmiş olabilir.
        </p>

        <div className="bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-2xl p-4 mb-8 text-sm text-red-600 dark:text-red-400">
            <p className="font-bold">Olası Sebepler:</p>
            <ul className="list-disc list-inside mt-2 text-left space-y-1">
                <li>Yetersiz bakiye</li>
                <li>İnternet alışverişine kapalı kart</li>
                <li>Hatalı CVC veya SKT bilgisi</li>
            </ul>
        </div>

        <div className="flex flex-col gap-3">
            <Link 
              href="/odeme?plan=starter" 
              className="w-full py-4 rounded-xl font-bold text-white bg-gray-900 dark:bg-white dark:text-black hover:opacity-90 shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <FiRefreshCw /> Tekrar Dene
            </Link>
            
            <Link 
              href="/iletisim" 
              className="w-full py-4 rounded-xl font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2"
            >
              <FiHeadphones /> Destek Ekibiyle İletişim
            </Link>
        </div>

      </motion.div>
    </div>
  );
}