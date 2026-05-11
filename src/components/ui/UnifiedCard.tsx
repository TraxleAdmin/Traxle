'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiCpu } from 'react-icons/fi'; // Default icon

interface UnifiedCardProps {
    title?: string;
    description?: string;
    label?: string;       // İstatistik için
    value?: React.ReactNode; // İstatistik için
    subtext?: string;     // İstatistik için
    icon: React.ReactNode;
    className?: string;
    color?: string; // Örn: "from-blue-400 to-cyan-300" (Soft)
    delay?: number;
    children?: React.ReactNode;
    type?: 'stat' | 'tech' | 'feature';
}

export default function UnifiedCard({ 
    title, description, label, value, subtext, icon, 
    className = "", 
    color = "from-blue-400 to-cyan-300", // Varsayılan SOFT renk
    delay = 0, 
    children, 
    type = 'tech' 
}: UnifiedCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }} // Daha yumuşak geçiş
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className={`relative group h-full ${className}`}
        >
            {/* 1. ARKADAKİ GLOW (DAHA SOFT VE FLU) */}
            <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r ${color} opacity-20 group-hover:opacity-60 blur-lg transition-all duration-700`} />
            
            {/* 2. KARTIN KENDİSİ (MATLAŞTIRILMIŞ DERİN GRİ) */}
            <div className="relative h-full rounded-2xl p-6 overflow-hidden flex flex-col justify-between transition-colors duration-300
                            bg-white/80 border-gray-100 backdrop-blur-sm
                            dark:bg-[#0A0A0A]/90 dark:border-white/5">
                
                {/* 3. İÇ EFEKTLER */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] dark:opacity-[0.04] pointer-events-none" />
                <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-full blur-[50px] pointer-events-none`} />

                {/* 4. İÇERİK */}
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                        {/* İkon Kutusu */}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 border transition-all duration-500
                                        bg-gray-50 border-gray-100 text-gray-500
                                        dark:bg-white/5 dark:border-white/10 dark:text-gray-300
                                        group-hover:scale-105 group-hover:bg-gradient-to-br ${color} group-hover:border-transparent group-hover:text-white group-hover:shadow-md`}>
                            {icon}
                        </div>
                        
                        {/* Başlık Mantığı */}
                        {type === 'stat' ? (
                             <dt className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{label}</dt>
                        ) : (
                             <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 leading-tight tracking-tight">{title}</h3>
                        )}
                    </div>
                    
                    {/* İçerik Mantığı */}
                    {type === 'stat' ? (
                        <div>
                            <dd className="text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
                                {value}
                            </dd>
                            <p className="text-xs text-gray-500 dark:text-gray-500 font-medium">{subtext}</p>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                            {description}
                        </p>
                    )}
                </div>

                {children && <div className="relative z-10 mt-6 pt-2 flex-1 w-full">{children}</div>}
            </div>
        </motion.div>
    );
}