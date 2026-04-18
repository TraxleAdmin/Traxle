'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiSmartphone, FiShield, FiShare2, FiBarChart2, FiArrowRight } from 'react-icons/fi';
import TextShimmer from '@/components/ui/TextShimmer';

export default function KunyeXPage() {
  return (
    <div className="relative min-h-screen bg-[#050814] text-white overflow-hidden selection:bg-cyan-500/30 flex flex-col pt-20">

      {/* --- ARKAPLAN AMBİYANS IŞIKLARI (CYAN THEME) --- */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 py-16 md:py-24">
        
        {/* --- HERO SECTION --- */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            TraxleAPP Orijinal Ürünü
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }} 
            className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[1.1] text-white"
          >
            Kimliğinizi <br className="hidden md:block" />
            <TextShimmer className="[--base-color:theme(colors.cyan.600)] [--base-gradient-color:theme(colors.cyan.200)]">Dijitalleştirin.</TextShimmer>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }} 
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Fiziksel kartvizitleri tarihe gömün. KünyeX ile NFC ve QR teknolojisini kullanarak iletişim bilgilerinizi, portfolyonuzu ve sosyal ağlarınızı tek bir dokunuşla saniyeler içinde paylaşın.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-[#050814] font-black text-sm tracking-wide transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] active:scale-95 flex items-center justify-center gap-2">
              Erken Erişime Katıl <FiArrowRight />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm transition-all backdrop-blur-md active:scale-95">
              Nasıl Çalışır?
            </button>
          </motion.div>
        </div>

        {/* --- ÖZELLİKLER (BENTO GRID) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          <FeatureCard 
            icon={<FiShare2 />} 
            title="Temassız Paylaşım" 
            desc="NFC özellikli telefonlara KünyeX kartınızı yaklaştırarak saniyeler içinde bilgilerinizi aktarın." 
          />
          <FeatureCard 
            icon={<FiSmartphone />} 
            title="Uygulama Gerekmez" 
            desc="Karşı tarafın herhangi bir uygulama indirmesine gerek yoktur. Her şey anında tarayıcıda açılır." 
          />
          <FeatureCard 
            icon={<FiShield />} 
            title="Kusursuz Güvenlik" 
            desc="Verileriniz askeri düzeyde şifrelenir. Hangi bilgiyi kiminle paylaşacağınıza siz karar verirsiniz." 
          />
          <FeatureCard 
            icon={<FiBarChart2 />} 
            title="Gelişmiş Analitik" 
            desc="Profilinizin kaç kez görüntülendiğini ve hangi bağlantılarınızın tıklandığını anlık takip edin." 
          />
        </motion.div>

      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="group relative p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent hover:from-cyan-500/30 transition-all duration-500">
      <div className="absolute inset-0 bg-cyan-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
      <div className="relative h-full bg-[#0a0f1c]/90 backdrop-blur-xl rounded-[23px] p-6 border border-white/5 flex flex-col">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-xl mb-6 border border-cyan-500/20 group-hover:scale-110 transition-transform duration-300 shadow-inner">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{title}</h3>
        <p className="text-sm text-gray-500 font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}