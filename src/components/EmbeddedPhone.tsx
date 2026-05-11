'use client';
import { ReactNode } from 'react';

export default function EmbeddedPhone({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex justify-center py-6">
      <div className={`
        relative w-[280px] h-[550px] rounded-[45px] shadow-2xl overflow-hidden ring-1 transition-colors duration-500
        /* LIGHT MODE KASA: Beyazımsı Gri, Parlak Kenar */
        bg-gray-100 border-4 border-gray-300 ring-black/5
        /* DARK MODE KASA: Siyah, Koyu Kenar */
        dark:bg-[#151515] dark:border-[#2a2a2a] dark:ring-white/10
      `}>
        
        {/* Ekran İçeriği */}
        <div className="w-full h-full bg-white dark:bg-[#050505] transition-colors duration-500">
          {children}
        </div>

        {/* Dynamic Island (Çentik) */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[90px] h-[24px] bg-black rounded-full z-50 shadow-sm"></div>
        
        {/* Cam Yansıması */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/20 to-transparent pointer-events-none z-40 opacity-50 dark:opacity-100"></div>
      </div>
    </div>
  );
}