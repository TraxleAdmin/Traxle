'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollFeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color?: string; // Örn: #3B82F6
}

export default function ScrollFeatureCard({ title, description, icon, color = "#3B82F6" }: ScrollFeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // 1. Scroll Takibi: Kart ekranın altına girdiğinde başlar, ortasına gelince biter
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  // 2. Animasyon Değerleri
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale }}
      className="group relative h-full overflow-hidden rounded-[2rem] border border-white/5 bg-gradient-to-b from-white/10 to-transparent p-8 md:p-10 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-white/10 hover:shadow-2xl"
    >
      {/* --- EFEKT KATMANLARI --- */}
      
      {/* 1. Arka Plan Işığı (Glow) - Hover ile canlanır */}
      <motion.div 
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-0 blur-[100px] transition-all duration-700 group-hover:opacity-30"
        style={{ backgroundColor: color }}
      />

      {/* 2. Alt İlerleme Çubuğu (Scroll Progress) */}
      <motion.div 
        style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
        className="absolute bottom-0 left-0 h-1 w-full opacity-60"
      >
        <div 
            className="h-full w-full bg-gradient-to-r from-transparent via-current to-transparent" 
            style={{ color: color }} 
        />
      </motion.div>

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
            {/* 3. İkon Alanı: Cam Efektli ve Parlayan */}
            <div 
                className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-3xl shadow-inner backdrop-blur-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                style={{ 
                    color: color, 
                    boxShadow: `inset 0 0 20px ${color}10, 0 10px 30px -10px ${color}30` 
                }}
            >
                {icon}
            </div>

            {/* Başlık */}
            <h3 className="mb-4 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text"
                style={{ 
                    backgroundImage: `linear-gradient(to right, #fff, ${color})`, // Hover'da renk geçişi
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text' // Safari desteği için
                }}
            >
                {title}
            </h3>
            
            {/* Açıklama */}
            <p className="text-gray-400 leading-relaxed text-sm font-medium">
                {description}
            </p>
        </div>

        {/* 4. Dekoratif Köşe Noktası (Teknoloji hissi için) */}
        <div className="absolute top-0 right-0 p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
             <div className="h-2 w-2 rounded-full shadow-[0_0_10px_currentColor]" style={{ color: color, backgroundColor: color }}></div>
        </div>
      </div>
    </motion.div>
  );
}