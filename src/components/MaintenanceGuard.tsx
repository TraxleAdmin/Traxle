'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

interface MaintenanceConfig {
  isActive: boolean;
  title: string;
  message: string;
  expectedEndTime: string;
  allowedIps: string;
}

export default function MaintenanceGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [config, setConfig] = useState<MaintenanceConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "system", "maintenance"), (docSnap) => {
      if (docSnap.exists()) {
        setConfig(docSnap.data() as MaintenanceConfig);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return null; 

  if (pathname?.startsWith('/panel')) {
    return <>{children}</>;
  }

  if (config?.isActive) {
    const formattedDate = config.expectedEndTime 
        ? new Date(config.expectedEndTime).toLocaleString('tr-TR', { 
            day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' 
          }) 
        : null;

    // Arkaplanda yazacak büyük yazıyı başlıktan üret (İlk kelime veya MAX 5 harf)
    const bgText = config.title ? config.title.split(' ')[0].substring(0, 5).toUpperCase() : 'BAKIM';

    return (
      <div className="min-h-screen bg-[#050814] flex flex-col items-center justify-center relative overflow-hidden text-center px-4 font-sans selection:bg-red-500/30">
        
        {/* 404 Sayfasındaki Tarz Arka Plan Işıkları */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Büyük Arka Plan Yazısı (Dinamik) */}
        <h1 className="text-[100px] md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-800 to-[#050814] leading-none select-none opacity-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
          {bgText}
        </h1>

        <div className="relative z-10 -mt-10 md:-mt-20">
          
          {/* Kırmızı Badge (404 Sayfasındaki Gibi) */}
          <div className="inline-block px-5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium mb-6 animate-pulse">
            Sistem Kapalı
          </div>
          
          {/* Admin'den Gelen Başlık */}
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            {config.title || 'Sistem Güncelleniyor'}
          </h2>
          
          {/* Admin'den Gelen Mesaj */}
          <p className="text-gray-400 text-lg max-w-lg mx-auto mb-8 leading-relaxed">
            {config.message || 'Altyapımızı daha iyi hizmet verebilmek için güncelliyoruz. Lütfen daha sonra tekrar deneyin.'}
          </p>

          {/* Dönüş Saati */}
          {formattedDate && (
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-6 py-4 backdrop-blur-sm">
                <span className="text-sm text-gray-500">Tahmini Dönüş:</span>
                <span className="text-white font-mono font-bold text-lg">{formattedDate}</span>
            </div>
          )}

          <div className="mt-12 opacity-50">
             <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}