'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiGrid, FiFileText, FiMessageSquare, FiSettings } from 'react-icons/fi';

export default function ScreenHome() {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-full p-5 space-y-4 pt-10 transition-colors duration-300 bg-gray-50 dark:bg-[#050814]">

      {/* --- ÜST KISIM (HEADER) --- */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-[10px] font-medium">Hoş geldin,</p>
          <h3 className="font-bold text-gray-900 dark:text-white text-md">Traxle Tedarikçi</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 text-blue-600 dark:bg-blue-600 dark:text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm">
            TR
          </div>
        </div>
      </div>

      {/* --- ARAMA ÇUBUĞU --- */}
      <div className="h-10 rounded-xl flex items-center px-3 gap-2 text-xs transition-colors duration-300 
                      bg-white border border-gray-200 text-gray-400
                      dark:bg-[#1A1A1A] dark:border-white/10 dark:text-gray-500">
        <FiSearch size={14} />
        <span>Makine, şantiye veya ID ara...</span>
      </div>

      {/* --- AKTİF KART (MAIN CARD) --- */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="p-4 rounded-2xl border relative overflow-hidden group transition-all duration-300 shadow-sm hover:shadow-md
                   bg-white border-gray-200 
                   dark:bg-[#151515] dark:border-white/10 dark:shadow-none"
      >
        <div className="absolute right-0 top-0 w-20 h-20 bg-blue-500/10 blur-2xl opacity-0 dark:opacity-100"></div>

        <div className="flex justify-between items-start mb-3 relative z-10">
          <span className="text-[10px] font-bold px-2 py-1 rounded bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
            EKSKAVATÖR
          </span>
          <span className="text-gray-900 dark:text-white font-bold text-lg">₺45.000<span className="text-[10px] text-gray-500 font-normal">/ay</span></span>
        </div>

        <div className="flex justify-between items-center text-xs relative z-10 text-gray-600 dark:text-gray-300 mb-4">
          <span className="font-semibold">Merkez Depo</span>
          <div className="flex-1 border-t border-dashed border-gray-300 dark:border-gray-700 mx-2"></div>
          <span className="font-semibold">Döşemealtı Şantiye</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <p className="text-[10px] font-bold text-green-600 dark:text-green-500">Sevkiyata Hazır (Lowbed Bekleniyor)</p>
        </div>
      </motion.div>

      {/* --- HIZLI MENÜ GRİDİ --- */}
      <div className="grid grid-cols-4 gap-3 mt-2">
        <MenuButton icon={<FiGrid />} delay={0.2} />
        <MenuButton icon={<FiFileText />} delay={0.3} />
        <MenuButton icon={<FiMessageSquare />} delay={0.4} />
        <MenuButton icon={<FiSettings />} delay={0.5} />
      </div>

      {/* --- ALT BİLGİ (CANLI BİLDİRİM SİMÜLASYONU) --- */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-auto p-3 rounded-xl border shadow-lg backdrop-blur-md
                       bg-white/80 border-orange-200 
                       dark:bg-white/5 dark:border-white/5"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400 flex items-center justify-center text-xs animate-bounce">
                🔔
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-900 dark:text-white">Yeni Kiralama Talebi</p>
                <p className="text-[9px] text-gray-500">Rönesans İnşaat A.Ş. firmasından...</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

function MenuButton({ icon, delay }: { icon: React.ReactNode, delay: number }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay }}
      className="aspect-square rounded-xl flex items-center justify-center text-lg cursor-pointer border transition-colors duration-300 
                 bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-blue-600
                 dark:bg-[#151515] dark:border-white/5 dark:text-gray-400 dark:hover:bg-[#252525] dark:hover:text-white"
    >
      {icon}
    </motion.div>
  );
}