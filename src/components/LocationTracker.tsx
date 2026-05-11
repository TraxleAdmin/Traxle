'use client';

import React, { useEffect, useState } from 'react';
import { db, auth } from '@/lib/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { FiAlertTriangle, FiX, FiMapPin } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

export default function LocationTracker() {
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Tarayıcınız konum servisini desteklemiyor.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        setError(null); // Konum alındıysa hatayı sil
        if (auth.currentUser) {
          try {
            const userRef = doc(db, "users", auth.currentUser.uid);
            await updateDoc(userRef, {
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                updatedAt: serverTimestamp()
              }
            });
          } catch (err) {
            console.error("Konum güncelleme hatası:", err);
          }
        }
      },
      (err) => {
        if (err.code === 1) setError("Lütfen konum izni verin.");
        else setError("Konum alınamıyor.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  if (!error || !isVisible) return null;

  return (
    <AnimatePresence>
      {/* 🔥 KONUM GÜNCELLEMESİ:
          - z-[110]: Sidebar'ın (z-100) üzerinde dursun.
          - Mobilde: top-20 (Header altı), ortalı.
          - Masaüstünde (md): top-5 right-40 (Header içi, bildirimlerin solunda).
      */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: -20 }}
        className="fixed z-[110] 
                   top-20 left-1/2 -translate-x-1/2 w-[90%] max-w-sm 
                   md:top-5 md:left-auto md:translate-x-0 md:right-48 md:w-auto
                   bg-red-500/90 backdrop-blur-md text-white px-4 py-2.5 rounded-full shadow-xl border border-red-400/50 
                   flex items-center gap-3"
      >
        <div className="bg-white/20 p-1.5 rounded-full animate-pulse shrink-0">
            <FiMapPin className="text-sm" />
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center gap-0.5 md:gap-2">
            <span className="text-xs font-bold whitespace-nowrap">Konum Erişimi Gerekli</span>
            <span className="hidden md:inline text-white/50">|</span>
            <span className="text-[10px] md:text-xs opacity-90 truncate max-w-[150px] md:max-w-none">{error}</span>
        </div>

        <button 
            onClick={() => setIsVisible(false)} 
            className="ml-auto md:ml-2 p-1 hover:bg-white/20 rounded-full transition-colors"
        >
            <FiX size={14} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}