'use client';

import React from 'react';
import { FiNavigation, FiTruck } from 'react-icons/fi';

export default function ScreenMap() {
  // Rota: Antalya Liman (Güney) -> İstanbul (Kuzey)
  const routePath = "M 160 550 C 160 450, 100 400, 80 300 S 140 150, 100 40";

  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-[#111318] text-white font-sans">
      
      {/* --- KATMAN 1: ŞEHİR DOKUSU & TOPOGRAFYA --- */}
      <div className="absolute inset-0 z-0 opacity-20">
         <svg className="w-full h-full" stroke="#374151" strokeWidth="2" fill="none">
            <path d="M -20 450 L 400 500" />
            <path d="M 50 0 L 20 600" />
            <path d="M 200 0 L 250 600" />
            <path d="M -50 200 L 400 150" />
            
            <rect x="120" y="480" width="80" height="60" fill="#1F2937" />
            <rect x="40" y="250" width="50" height="50" fill="#1F2937" />
            <rect x="60" y="20" width="100" height="60" fill="#1F2937" />
         </svg>
      </div>

      {/* --- KATMAN 2: ROTA HATTI --- */}
      <div className="absolute inset-0 z-10">
        <svg className="w-full h-full overflow-visible">
            <defs>
                <linearGradient id="routeGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>

            {/* Pasif Yol */}
            <path d={routePath} fill="none" stroke="#1F2937" strokeWidth="14" strokeLinecap="round" />

            {/* Aktif Rota (Neon) */}
            <path d={routePath} fill="none" stroke="url(#routeGradient)" strokeWidth="6" strokeLinecap="round" filter="url(#glow)" />

            <circle cx="160" cy="550" r="6" fill="#3B82F6" />
            <circle cx="100" cy="40" r="8" fill="#8B5CF6" className="animate-ping" />
            <circle cx="100" cy="40" r="5" fill="white" />
        </svg>

        {/* --- KATMAN 3: HAREKETLİ TIR --- */}
        <div 
            className="absolute top-0 left-0 w-12 h-12 z-20 flex items-center justify-center"
            style={{
                offsetPath: `path("${routePath}")`,
                animation: 'driveRoute 12s linear infinite normal', // Antalya -> İstanbul
            }}
        >
            <div className="relative">
                {/* Tır Gövdesi (Sağa çevirdik: -scale-x-100) */}
                <div className="bg-white text-blue-700 p-2 rounded-lg shadow-[0_0_25px_rgba(59,130,246,0.6)] z-20 relative transform -scale-x-100">
                    <FiTruck size={20} />
                </div>
                
                {/* Far Hüzmesi (Artık ikonun SAĞINDAN çıkıyor çünkü araç ileri gidiyor) */}
                <div className="absolute top-1/2 left-full -translate-y-1/2 w-32 h-16 bg-gradient-to-r from-white/30 to-transparent -z-10 clip-path-beam"></div>
            </div>
        </div>
      </div>

      {/* --- KATMAN 4: NAVİGASYON ARAYÜZÜ (UI) --- */}
      
      <div className="relative z-30 pt-6 px-4">
         <div className="bg-[#1A1F36]/90 backdrop-blur-xl border border-white/10 p-4 rounded-3xl flex items-center gap-4 shadow-2xl">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xl shrink-0 shadow-lg shadow-blue-600/30">
                <FiNavigation />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white text-sm">İstanbul Tuzla Lojistik</h3>
                <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-green-400 text-xs font-bold">5s 20dk</span>
                    <span className="text-gray-500 text-xs">•</span>
                    <span className="text-gray-400 text-xs">450 km kaldı</span>
                </div>
            </div>
         </div>
      </div>

      <div className="absolute bottom-6 left-4 right-4 z-30">
         <div className="flex gap-3">
             <div className="bg-[#1A1F36]/90 backdrop-blur-xl border border-white/10 p-3 rounded-2xl flex-1 shadow-lg">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Anlık Hız</p>
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-white">88</span>
                    <span className="text-xs text-gray-500 font-medium">km/s</span>
                </div>
             </div>
             <div className="bg-[#1A1F36]/90 backdrop-blur-xl border border-white/10 p-3 rounded-2xl flex-1 shadow-lg">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Varış Saati</p>
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-white">21:30</span>
                </div>
             </div>
         </div>
         
         <div className="mt-4 flex justify-center">
            <div className="bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-[10px] text-gray-400">Kütahya, D-650 Karayolu</p>
            </div>
         </div>
      </div>

      {/* Gerekli CSS */}
      <style jsx>{`
        @keyframes driveRoute {
          0% { offset-distance: 0%; }
          100% { offset-distance: 100%; }
        }
        /* Far hüzmesi (Sağa bakan üçgen) */
        .clip-path-beam {
            clip-path: polygon(0% 20%, 100% 0%, 100% 100%, 0% 80%);
        }
      `}</style>

    </div>
  );
}