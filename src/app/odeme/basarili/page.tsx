'use client';

import React, { Suspense } from 'react'; // Suspense eklendi
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; // Parametre okumak için
import { motion } from 'framer-motion';
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi';


// İçeriği ayrı bir component yaptık (Suspense hatası almamak için)
function SuccessContent() {
  const searchParams = useSearchParams();
  // URL'den gelen sipariş nosunu al, yoksa varsayılanı göster
  const orderId = searchParams.get('siparisNo') || '#TRX-2026-8842'; 

  return (
    <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl text-center max-w-lg w-full relative z-10"
      >
        <div className="w-24 h-24 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle className="text-green-600 dark:text-green-400 text-5xl" />
        </div>

        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
          Ödeme Başarılı!
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          Harika! Aboneliğin başarıyla başlatıldı. Hoş geldin, Traxle dünyasında operasyonlarını yönetmeye hemen başlayabilirsin.
        </p>

        <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-4 mb-8 text-sm text-gray-500 dark:text-gray-400">
            {/* 🔥 BURASI ARTIK DİNAMİK */}
            <p>Sipariş Numaranız: <span className="font-mono text-gray-900 dark:text-white font-bold">{orderId}</span></p>
            <p className="mt-1">Faturanız e-posta adresinize gönderildi.</p>
        </div>

        <div className="flex flex-col gap-3">
            <Link 
              href="/panel" 
              className="w-full py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 group"
            >
              Yönetim Paneline Git <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/" 
              className="w-full py-4 rounded-xl font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
            >
              Ana Sayfaya Dön
            </Link>
        </div>

      </motion.div>
  );
}

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050814] flex items-center justify-center p-6 transition-colors duration-300 relative overflow-hidden">
      
      {/* Konfeti Efekti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-2 h-2 bg-red-500 rounded-full animate-ping opacity-75"></div>
          <div className="absolute top-10 right-1/4 w-3 h-3 bg-blue-500 rounded-full animate-ping opacity-75 delay-75"></div>
          <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75 delay-150"></div>
      </div>

      <Suspense fallback={<div className="text-white">Yükleniyor...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}