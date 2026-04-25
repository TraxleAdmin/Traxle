'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiCpu, FiPrinter, FiFileText, FiActivity, FiLayers, FiMessageSquare, FiMaximize } from 'react-icons/fi';
import TextShimmer from '@/components/ui/TextShimmer';
import Link from 'next/link';

export default function KunyeXEnterprisePage() {
  return (
    <div className="relative min-h-screen bg-[#050814] text-white pt-32 pb-20 overflow-hidden transition-colors duration-300 selection:bg-cyan-500/30">

      {/* --- ARKAPLAN AMBİYANS IŞIKLARI --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">

          {/* --- SOL: İNDİRME GÖRÜNÜMLÜ TALEP KARTI --- */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-5 order-2 lg:order-1">
            <div className="bg-[#0a0f1c]/90 backdrop-blur-xl border border-white/5 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group text-center ring-1 ring-white/10 hover:ring-cyan-500/30 transition-all duration-500">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 animate-gradient-xy"></div>

              <div className="w-20 h-20 bg-cyan-500/10 text-cyan-400 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-8 shadow-inner border border-cyan-500/20 group-hover:scale-110 transition-transform duration-500">
                <FiCpu />
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">KünyeX Enterprise</h2>
              <p className="text-sm font-medium text-gray-400 mb-8 px-2 leading-relaxed">Merkez depo ve şubeleriniz için HWID (Donanım Kimliği) kilitli, size özel derlenmiş kurulum paketi.</p>

              <div className="flex flex-col gap-3 mb-8">
                 <div className="flex items-center gap-2 text-[10px] font-bold text-cyan-400 bg-cyan-500/5 py-2 px-4 rounded-xl w-fit mx-auto border border-cyan-500/20">
                    <FiShield /> UÇTAN UCA ŞİFRELİ (ZERO-TRUST)
                 </div>
              </div>

              {/* İNDİR GÖRÜNÜMLÜ TALEP BUTONU */}
              <Link
                href="/iletisim?ref=kunyex-request"
                className="group/btn relative w-full py-5 rounded-2xl font-black text-[#050814] bg-cyan-500 hover:bg-cyan-400 transition-all active:scale-95 flex items-center justify-center gap-3 tracking-wide overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.3)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                <FiMessageSquare className="text-xl" /> Kurulum Talebi Oluştur
              </Link>

              <p className="text-[10px] text-gray-500 mt-5 font-bold tracking-widest uppercase opacity-60">Sadece Onaylı Terminaller İçin</p>
            </div>
          </motion.div>

          {/* --- SAĞ: KÜNYEX GERÇEK ÖZELLİKLERİ --- */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-7 order-1 lg:order-2 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-widest uppercase border border-cyan-500/20 backdrop-blur-md">
              <FiActivity className="animate-pulse" /> Akıllı OCR ve Barkod Otomasyonu
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[1.1]">
              Evrak İşlerini <br />
              <TextShimmer className="[--base-color:theme(colors.cyan.600)] [--base-gradient-color:theme(colors.cyan.200)]">Otopilota Alın.</TextShimmer>
            </h1>

            <p className="text-lg text-gray-400 leading-relaxed font-medium">
              Hal Kayıt Sistemi (HKS) bildirimlerini, karmaşık faturaları ve PDF'leri yapay zeka ile saniyeler içinde okuyun. Otomatik fiyat eşleştirmesiyle QR kodlu reyon ve sevkiyat etiketlerinizi tek tıkla yazdırın.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
               <div className="flex gap-4">
                  <FiMaximize className="text-cyan-500 text-2xl shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white">Görüntü İşleme (OCR)</h4>
                    <p className="text-sm text-gray-500 mt-1">Sürükle-bırak ile yüklediğiniz PDF veya fotoğraflardaki Plaka, Miktar ve Ürün Cinsini otomatik ayıklar.</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <FiPrinter className="text-cyan-500 text-2xl shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white">Dinamik PDF Motoru</h4>
                    <p className="text-sm text-gray-500 mt-1">Saniyeler içinde QR kodlu, firmanıza özel logolu ve parametrik fiyatlı baskı dosyaları (A5, A6) üretir.</p>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>

        {/* --- BENTO GRID: TEKNOLOJİ ALTYAPISI --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
            <div className="bg-[#0a0f1c]/60 backdrop-blur-md border border-white/5 p-8 rounded-[2.5rem] hover:border-cyan-500/30 transition-colors group">
                <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center text-xl mb-6 shadow-inner border border-blue-500/20 group-hover:scale-110 transition-transform"><FiLayers /></div>
                <h3 className="text-xl font-bold text-white mb-3">Akıllı Fiyat Matrisi</h3>
                <p className="text-sm text-gray-500 font-medium">Merkezi sistemden (ART_STM) gelen verileri anlık analiz eder, faturalardaki ürün isimleriyle eşleştirerek etiket fiyatlarını otomatik belirler.</p>
            </div>

            <div className="bg-[#0a0f1c]/60 backdrop-blur-md border border-white/5 p-8 rounded-[2.5rem] hover:border-cyan-500/30 transition-colors group">
                <div className="w-12 h-12 bg-cyan-500/10 text-cyan-400 rounded-2xl flex items-center justify-center text-xl mb-6 shadow-inner border border-cyan-500/20 group-hover:scale-110 transition-transform"><FiShield /></div>
                <h3 className="text-xl font-bold text-white mb-3">HWID Şube Kilidi</h3>
                <p className="text-sm text-gray-500 font-medium">Her şubeye özel derlenen istemciler (Client), bilgisayarın donanım kimliğini Firebase üzerinden doğrulamadan asla açılmaz. 0 Veri Kaçağı.</p>
            </div>

            <div className="bg-[#0a0f1c]/60 backdrop-blur-md border border-white/5 p-8 rounded-[2.5rem] hover:border-cyan-500/30 transition-colors group">
                <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center text-xl mb-6 shadow-inner border border-purple-500/20 group-hover:scale-110 transition-transform"><FiFileText /></div>
                <h3 className="text-xl font-bold text-white mb-3">Otonom Veri Madenciliği</h3>
                <p className="text-sm text-gray-500 font-medium">Karmaşık satırları ve kargaşık PDF tablolarını Computer Vision (CV2) ile tarayarak en doğru üretim ve tüketim yeri verilerini çıkartır.</p>
            </div>
        </motion.div>

      </div>
    </div>
  );
}