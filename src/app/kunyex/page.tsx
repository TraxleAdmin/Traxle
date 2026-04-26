'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiCpu, FiPrinter, FiFileText, FiActivity, FiLayers, FiMessageSquare, FiMaximize } from 'react-icons/fi';
import TextShimmer from '@/components/ui/TextShimmer';
import Link from 'next/link';

export default function KunyeXEnterprisePage() {
  // Staggered animation variants 8Bit.ai style
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } }
  };

  return (
    <div className="relative min-h-screen bg-transparent text-gray-900 dark:text-white pt-32 pb-20 overflow-hidden transition-colors duration-500 selection:bg-cyan-500/30">
      
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32 perspective-1000">
          
          {/* --- SOL: İNDİRME GÖRÜNÜMLÜ TALEP KARTI (GLASSMORPHISM) --- */}
          <motion.div
            initial={{ opacity: 0, rotateY: -15, z: -100 }}
            animate={{ opacity: 1, rotateY: 0, z: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 order-2 lg:order-1 transform-gpu"
          >
            <div className="bg-white/80 dark:bg-[#0a0f1c]/70 backdrop-blur-3xl border border-gray-200/50 dark:border-white/10 rounded-[3rem] p-10 shadow-[0_20px_60px_rgba(0,194,255,0.1)] dark:shadow-[0_20px_60px_rgba(0,194,255,0.15)] relative overflow-hidden group text-center hover:border-cyan-500/50 transition-all duration-700">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 animate-gradient-xy"></div>
              
              <div className="w-24 h-24 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-8 shadow-inner border border-cyan-100 dark:border-cyan-500/20 group-hover:scale-110 transition-transform duration-700">
                <FiCpu />
              </div>
              
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-3">KünyeX Enterprise</h2>
              <p className="text-base font-medium text-gray-600 dark:text-gray-400 mb-8 px-2 leading-relaxed">Merkez depo ve şubeleriniz için HWID (Donanım Kimliği) kilitli, size özel derlenmiş kurulum paketi.</p>
              
              <div className="flex flex-col gap-3 mb-8">
                 <div className="flex items-center gap-2 text-[10px] font-bold text-cyan-400 bg-cyan-500/5 py-2 px-4 rounded-xl w-fit mx-auto border border-cyan-500/20">
                    <FiShield /> UÇTAN UCA ŞİFRELİ (ZERO-TRUST)
                 </div>
              </div>

              {/* İNDİR GÖRÜNÜMLÜ TALEP BUTONU */}
              <Link 
                href="/iletisim?ref=kunyex-request"
                className="group/btn relative w-full py-5 rounded-2xl font-black text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 transition-all active:scale-95 flex items-center justify-center gap-3 tracking-wide overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.4)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                <FiMessageSquare className="text-xl" /> Kurulum Talebi Oluştur
              </Link>
              
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-5 font-bold tracking-widest uppercase opacity-60">Sadece Onaylı Terminaller İçin</p>
            </div>
          </motion.div>

          {/* --- SAĞ: KÜNYEX GERÇEK ÖZELLİKLERİ --- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 order-1 lg:order-2 space-y-8"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold tracking-widest uppercase border border-cyan-200 dark:border-cyan-500/20 backdrop-blur-md shadow-sm">
              <FiActivity className="animate-pulse" /> Akıllı OCR ve Barkod Otomasyonu
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-500 dark:from-white dark:to-white/40 leading-[1.0]">
              Evrak İşlerini <br />
              <TextShimmer className="[--base-color:theme(colors.cyan.600)] [--base-gradient-color:theme(colors.cyan.400)] dark:[--base-color:theme(colors.cyan.400)] dark:[--base-gradient-color:theme(colors.cyan.200)]">Otopilota Alın.</TextShimmer>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light max-w-2xl">
              Hal Kayıt Sistemi (HKS) bildirimlerini, karmaşık faturaları ve PDF'leri yapay zeka ile saniyeler içinde okuyun. Otomatik fiyat eşleştirmesiyle QR kodlu reyon ve sevkiyat etiketlerinizi tek tıkla yazdırın.
            </motion.p>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-200/50 dark:border-white/10">
               <div className="flex gap-4">
                  <FiMaximize className="text-cyan-500 text-3xl shrink-0 mt-1 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Görüntü İşleme (OCR)</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Sürükle-bırak ile yüklediğiniz PDF veya fotoğraflardaki Plaka, Miktar ve Ürün Cinsini otomatik ayıklar.</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <FiPrinter className="text-cyan-500 text-3xl shrink-0 mt-1 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Dinamik PDF Motoru</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Saniyeler içinde QR kodlu, firmanıza özel logolu ve parametrik fiyatlı baskı dosyaları üretir.</p>
                  </div>
               </div>
            </motion.div>
          </motion.div>
        </div>

        {/* --- BENTO GRID: TEKNOLOJİ ALTYAPISI --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
            <motion.div variants={itemVariants} className="bg-white/80 dark:bg-[#0a0f1c]/70 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 p-10 rounded-[2.5rem] hover:border-blue-500/30 transition-all duration-500 group shadow-lg hover:-translate-y-2">
                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center text-2xl mb-8 shadow-inner border border-blue-100 dark:border-blue-500/20 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500"><FiLayers /></div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">Akıllı Fiyat Matrisi</h3>
                <p className="text-base text-gray-600 dark:text-gray-400 font-light leading-relaxed">Merkezi sistemden (ART_STM) gelen verileri anlık analiz eder, faturalardaki ürün isimleriyle eşleştirerek etiket fiyatlarını otomatik belirler.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white/80 dark:bg-[#0a0f1c]/70 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 p-10 rounded-[2.5rem] hover:border-cyan-500/30 transition-all duration-500 group shadow-lg hover:-translate-y-2">
                <div className="w-14 h-14 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-2xl flex items-center justify-center text-2xl mb-8 shadow-inner border border-cyan-100 dark:border-cyan-500/20 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500"><FiShield /></div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">HWID Şube Kilidi</h3>
                <p className="text-base text-gray-600 dark:text-gray-400 font-light leading-relaxed">Her şubeye özel derlenen istemciler (Client), bilgisayarın donanım kimliğini Firebase üzerinden doğrulamadan asla açılmaz. 0 Veri Kaçağı.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white/80 dark:bg-[#0a0f1c]/70 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 p-10 rounded-[2.5rem] hover:border-purple-500/30 transition-all duration-500 group shadow-lg hover:-translate-y-2">
                <div className="w-14 h-14 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center text-2xl mb-8 shadow-inner border border-purple-100 dark:border-purple-500/20 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500"><FiFileText /></div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4">Otonom Veri Madenciliği</h3>
                <p className="text-base text-gray-600 dark:text-gray-400 font-light leading-relaxed">Karmaşık satırları ve kargaşık PDF tablolarını Computer Vision (CV2) ile tarayarak en doğru üretim ve tüketim yeri verilerini çıkartır.</p>
            </motion.div>
        </motion.div>

      </div>
    </div>
  );
}