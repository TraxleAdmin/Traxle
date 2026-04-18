'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiDownloadCloud, FiCheckCircle, FiShield, FiCpu, FiZap, FiBox } from 'react-icons/fi';
import TextShimmer from '@/components/ui/TextShimmer';

export default function UpdatePage() {
  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-[#050814] text-gray-900 dark:text-gray-300 pt-32 pb-20 overflow-hidden transition-colors duration-300 selection:bg-blue-500/30">
      
      {/* --- ARKA PLAN EFEKTLERİ --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-600/10 dark:bg-blue-900/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 dark:bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        
        {/* --- ÜST BAŞLIK --- */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wider uppercase border border-blue-200 dark:border-blue-500/30 mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Sistem Güncellemesi
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-gray-900 dark:text-white">
            KünyeX <TextShimmer>v1.1</TextShimmer> <br className="hidden md:block" />
            Yayınlandı.
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Operasyonlarınızı daha hızlı ve güvenli hale getirmek için sistem altyapımızı güncelledik. Kesintisiz hizmet için yeni sürümü hemen indirin.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* --- SOL: İNDİRME KARTI --- */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-5">
            <div className="bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group text-center">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
              
              <div className="w-24 h-24 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner border border-blue-100 dark:border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                <FiDownloadCloud />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">KünyeX Master Client</h2>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-8">Windows 10 / 11 uyumlu • 64-bit</p>
              
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 py-2 px-4 rounded-xl w-fit mx-auto mb-8 border border-green-200 dark:border-green-500/20">
                <FiShield /> Virüs Taramasından Geçti
              </div>

// Next.js (React) Buton Örneği
<a 
  href="/guncelleme/KunyeX_Master_Client.exe" 
  download="KunyeX_Kurulum.exe"
  className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all"
>
  Sistemi Hemen İndir
</a>
              <p className="text-[10px] text-gray-400 mt-4 font-medium">Sürüm: 1.1.0 | Boyut: ~65 MB</p>
            </div>
          </motion.div>

          {/* --- SAĞ: SÜRÜM NOTLARI --- */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-7 space-y-6">
            <div className="bg-white/80 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-3xl p-8 backdrop-blur-sm h-full">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <FiBox className="text-blue-500" /> Sürüm Notları (Neler Yeni?)
              </h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <FiCpu />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 dark:text-white">Kalıcı Bellek Matrisi</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                      Sistem artık eski fiyatları unutmuyor. Yeni fiyatlar geldiğinde eskilere dokunmadan üzerine yazar, her zaman en geniş ve en güncel fiyat havuzuna sahip olursunuz.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <FiZap />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 dark:text-white">Havadan Güncelleme (OTA) Motoru</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                      Yeni bir versiyon yayınlandığında sistem sizi otomatik uyarır. Böylece tüm şubeleriniz anında en yeni sürüme geçmiş olur.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 w-10 h-10 rounded-xl bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0">
                    <FiCheckCircle />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 dark:text-white">Performans ve Arayüz</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1 list-disc pl-4 marker:text-green-500">
                      <li>Sürükle-bırak (Drag & Drop) fonksiyonundaki güvenlik kısıtlaması aşıldı.</li>
                      <li>Arka planda yanıp sönen siyah konsol (CMD) ekranları tamamen gizlendi.</li>
                      <li>Kurulum ekranına masaüstü kısayol tercihi eklendi.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}