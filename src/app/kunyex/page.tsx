'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiDownloadCloud, FiCheckCircle, FiShield, FiCpu, FiZap, FiBox, FiArrowDown } from 'react-icons/fi';
import TextShimmer from '@/components/ui/TextShimmer';

export default function KunyeXDownloadPage() {
  return (
    <div className="relative min-h-screen bg-[#050814] text-white pt-32 pb-20 overflow-hidden transition-colors duration-300 selection:bg-cyan-500/30">
      
      {/* --- ARKA PLAN EFEKTLERİ --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        
        {/* --- ÜST BAŞLIK --- */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-wider uppercase border border-cyan-500/20 mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Resmi Sürüm Yayında
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white">
            KünyeX <TextShimmer className="[--base-color:theme(colors.cyan.600)] [--base-gradient-color:theme(colors.cyan.200)]">v1.1</TextShimmer> <br className="hidden md:block" />
            İndirilmeye Hazır.
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Fiziksel ve dijital dünyayı bağlayan akıllı kimlik sistemimiz artık aktif. KünyeX Master Client'ı bilgisayarınıza kurarak ekosisteme hemen entegre olun.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* --- SOL: İNDİRME KARTI --- */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-5">
            <div className="bg-[#0a0f1c]/90 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group text-center">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
              
              <div className="w-24 h-24 bg-cyan-500/10 text-cyan-400 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner border border-cyan-500/20 group-hover:scale-110 transition-transform duration-500">
                <FiDownloadCloud />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">KünyeX Master Client</h2>
              <p className="text-sm font-medium text-gray-500 mb-8">Windows 10 / 11 Uyumlu • 64-bit</p>
              
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-green-400 bg-green-500/10 py-2 px-4 rounded-xl w-fit mx-auto mb-8 border border-green-500/20">
                <FiShield /> Virüs Taramasından Geçti
              </div>

              {/* JİLET GİBİ İNDİRME BUTONU */}
              <a 
                href="/guncelleme/KunyeX_Master_Client.exe" 
                download="KunyeX_Kurulum.exe"
                className="w-full py-4 rounded-2xl font-black text-[#050814] shadow-[0_0_30px_rgba(6,182,212,0.3)] bg-cyan-500 hover:bg-cyan-400 transition-all active:scale-95 flex items-center justify-center gap-3 tracking-wide"
              >
                <FiArrowDown className="text-xl" /> Sistemi Hemen İndir
              </a>
              <p className="text-[10px] text-gray-500 mt-4 font-bold tracking-wider uppercase">Sürüm: 1.1.0 | Boyut: ~65 MB</p>
            </div>
          </motion.div>

          {/* --- SAĞ: SÜRÜM NOTLARI --- */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-7 space-y-6">
            <div className="bg-[#0a0f1c]/90 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 md:p-10 h-full">
              <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                <FiBox className="text-cyan-500 text-2xl" /> Neler Yeni? (Sürüm Notları)
              </h3>
              
              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="mt-1 w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0 shadow-inner">
                    <FiCpu className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Kalıcı Bellek Matrisi</h4>
                    <p className="text-sm text-gray-400 leading-relaxed font-medium">
                      Sistem artık eski fiyatları unutmuyor. Yeni fiyatlar geldiğinde eskilere dokunmadan üzerine yazar, her zaman en geniş ve en güncel fiyat havuzuna sahip olursunuz.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="mt-1 w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center shrink-0 shadow-inner">
                    <FiZap className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Havadan Güncelleme (OTA) Motoru</h4>
                    <p className="text-sm text-gray-400 leading-relaxed font-medium">
                      Yeni bir versiyon yayınlandığında sistem sizi otomatik uyarır. Böylece tüm şubeleriniz anında en yeni sürüme geçmiş olur.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="mt-1 w-12 h-12 rounded-2xl bg-green-500/10 text-green-400 border border-green-500/20 flex items-center justify-center shrink-0 shadow-inner">
                    <FiCheckCircle className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Performans ve Arayüz</h4>
                    <ul className="text-sm text-gray-400 space-y-2 list-disc pl-4 marker:text-green-500 font-medium">
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