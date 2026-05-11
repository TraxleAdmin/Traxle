'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiGrid, FiMessageSquare, FiSettings, FiActivity, FiCode, FiTerminal } from 'react-icons/fi';

export default function ScreenHome() {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-full p-5 space-y-4 pt-10 relative transition-colors duration-500 bg-gray-50 dark:bg-[#050814] overflow-hidden">
      
      {/* Neon Mesh Arka Plan Işıkları (Apple Stili) */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 dark:bg-blue-600/20 rounded-full blur-[80px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-[80px] pointer-events-none translate-x-1/2 translate-y-1/2"></div>

      {/* --- ÜST KISIM (HEADER) --- */}
      <div className="flex justify-between items-center relative z-10">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-[10px] font-medium tracking-wider uppercase">Sistem Durumu</p>
          <h3 className="font-bold text-gray-900 dark:text-white text-md tracking-tight">Traxle Workspace</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shadow-[0_0_15px_rgba(37,99,235,0.3)] bg-blue-100 text-blue-600 dark:bg-blue-600/20 dark:text-blue-400 dark:border dark:border-blue-500/30">
            TR
          </div>
        </div>
      </div>

      {/* --- ARAMA ÇUBUĞU --- */}
      <div className="relative z-10 h-10 rounded-xl flex items-center px-3 gap-2 text-xs transition-all duration-300 
                      bg-white border border-gray-200 text-gray-400 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500
                      dark:bg-[#0A0F24] dark:border-white/10 dark:text-gray-500 dark:focus-within:ring-cyan-500/30 dark:focus-within:border-cyan-500/50
                      shadow-[0_2px_10px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(6,182,212,0.05)]">
        <FiSearch size={14} className="text-blue-500 dark:text-cyan-400" />
        <input 
          type="text" 
          placeholder="Proje, API veya modül ara..." 
          className="bg-transparent border-none outline-none w-full text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600"
        />
      </div>

      {/* --- AKTİF KART (MAIN CARD WITH GLOW) --- */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="p-5 rounded-2xl border relative overflow-hidden group transition-all duration-500 
                   bg-white border-gray-200 shadow-lg hover:shadow-xl
                   dark:bg-[#0A0F24]/80 dark:border-blue-500/20 dark:hover:border-cyan-400/50 
                   dark:shadow-[0_0_20px_rgba(37,99,235,0.1)] dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] backdrop-blur-xl"
      >
        {/* Kart İçi Dinamik Işık */}
        <div className="absolute right-[-20px] top-[-20px] w-24 h-24 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>

        <div className="flex justify-between items-start mb-4 relative z-10">
          <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-blue-50 text-blue-600 border border-blue-100 dark:bg-blue-500/10 dark:text-cyan-400 dark:border-cyan-500/20 shadow-[0_0_10px_rgba(37,99,235,0.1)]">
            MOBİL UYGULAMA
          </span>
          <span className="text-gray-900 dark:text-white font-bold text-lg flex items-center gap-1">
            v2.4.0 <span className="text-[10px] text-gray-500 font-normal border border-gray-200 dark:border-gray-700 px-1.5 py-0.5 rounded-full">Stable</span>
          </span>
        </div>

        <div className="flex justify-between items-center text-xs relative z-10 text-gray-600 dark:text-gray-300 mb-5">
          <span className="font-semibold flex items-center gap-1"><FiCode /> Development</span>
          <div className="flex-1 border-t border-dashed border-gray-300 dark:border-gray-600/50 mx-2 relative">
             <div className="absolute top-[-3px] left-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.8)]"></div>
          </div>
          <span className="font-semibold flex items-center gap-1">Production <FiTerminal /></span>
        </div>

        <div className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 p-2 rounded-lg border border-gray-100 dark:border-white/5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span>
          </span>
          <p className="text-[11px] font-medium text-gray-700 dark:text-gray-300">
            Deploy Bekleniyor <span className="text-green-600 dark:text-green-400 font-bold">(AWS eu-central-1)</span>
          </p>
        </div>
      </motion.div>

      {/* --- HIZLI MENÜ GRİDİ --- */}
      <div className="grid grid-cols-4 gap-3 mt-2 relative z-10">
        <MenuButton icon={<FiGrid />} delay={0.2} activeGlow="blue" />
        <MenuButton icon={<FiActivity />} delay={0.3} activeGlow="cyan" />
        <MenuButton icon={<FiMessageSquare />} delay={0.4} activeGlow="blue" />
        <MenuButton icon={<FiSettings />} delay={0.5} activeGlow="cyan" />
      </div>

      {/* --- ALT BİLGİ (CANLI BİLDİRİM SİMÜLASYONU) --- */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mt-auto p-3.5 rounded-xl border backdrop-blur-xl
                       bg-white/90 border-blue-100 shadow-[0_8px_30px_rgba(37,99,235,0.1)]
                       dark:bg-[#0A0F24]/90 dark:border-cyan-500/30 dark:shadow-[0_0_25px_rgba(6,182,212,0.15)] relative overflow-hidden"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
            
            <div className="flex items-center gap-3 pl-2">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm shadow-inner
                              bg-blue-50 text-blue-600 border border-blue-100
                              dark:bg-cyan-500/10 dark:text-cyan-300 dark:border-cyan-500/20">
                <FiTerminal className="animate-pulse" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-900 dark:text-white drop-shadow-sm">Yeni API İsteği</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">Ödeme geçidi (iyzico) doğrulandı.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

function MenuButton({ icon, delay, activeGlow }: { icon: React.ReactNode, delay: number, activeGlow: 'blue' | 'cyan' }) {
  const glowClasses = activeGlow === 'blue' 
    ? 'dark:hover:border-blue-500/50 dark:hover:shadow-[0_0_15px_rgba(37,99,235,0.3)]' 
    : 'dark:hover:border-cyan-400/50 dark:hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]';

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay }}
      className={`aspect-square rounded-xl flex items-center justify-center text-xl cursor-pointer border transition-all duration-300 
                 bg-white border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-blue-600 hover:shadow-md
                 dark:bg-[#0A0F24]/50 dark:border-white/5 dark:text-gray-500 dark:hover:bg-[#0A0F24] dark:hover:text-white
                 ${glowClasses} backdrop-blur-sm`}
    >
      {icon}
    </motion.div>
  );
}