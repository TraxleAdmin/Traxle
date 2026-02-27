'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiSettings, FiX } from 'react-icons/fi';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Madde 3'e göre 4 tür çerez: Zorunlu, İşlevsel, Analitik, Pazarlama
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: false, // Yeni eklendi
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem('traxle_cookie_consent');
    if (!savedConsent) {
      const timer = setTimeout(() => setShowBanner(true), 1500); 
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSave = (settings: typeof preferences) => {
    localStorage.setItem('traxle_cookie_consent', JSON.stringify(settings));
    setPreferences(settings);
    setShowBanner(false);
    setShowSettings(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-6 right-6 z-[9990] max-w-5xl mx-auto"
          >
            <div className="bg-white/95 dark:bg-[#0F1629]/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-5 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-6">
               
               <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center text-2xl shrink-0">
                    🍪
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Çerez Tercihleri</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Traxle deneyiminizi iyileştirmek için çerezleri kullanıyoruz. Detaylar için 
                      {/* 🔥 GÜNCELLENDİ: Link adresi /cerezler olarak değiştirildi */}
                      <Link href="/cerezler" className="text-blue-600 hover:underline ml-1 font-medium">Çerez Politikası</Link>'nı inceleyebilirsiniz.
                    </p>
                  </div>
               </div>

               <div className="flex gap-3 shrink-0 w-full md:w-auto">
                  <button 
                    onClick={() => setShowSettings(true)}
                    className="flex-1 md:flex-none px-5 py-2.5 rounded-xl font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors border border-gray-200 dark:border-white/10"
                  >
                    Ayarlar
                  </button>
                  <button 
                    onClick={() => handleSave({ necessary: true, functional: true, analytics: true, marketing: true })}
                    className="flex-1 md:flex-none px-6 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all active:scale-95"
                  >
                    Kabul Et
                  </button>
               </div>
            </div>
          </motion.div>

          {/* AYARLAR MODALI */}
          {showSettings && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowSettings(false)} 
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                className="relative bg-white dark:bg-[#1A1A1A] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10 max-h-[90vh] flex flex-col"
              >
                <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center shrink-0">
                   <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                     <FiSettings /> Çerez Ayarları
                   </h3>
                   <button onClick={() => setShowSettings(false)} className="text-gray-500 hover:text-red-500"><FiX size={24} /></button>
                </div>
                
                <div className="p-6 space-y-6 overflow-y-auto">
                   <CookieOption 
                     title="Zorunlu Çerezler" 
                     desc="Sitenin güvenliği ve temel fonksiyonları (oturum açma vb.) için gereklidir. Kapatılamaz." 
                     checked={true} 
                     disabled={true} 
                   />
                   <CookieOption 
                     title="İşlevsel Çerezler" 
                     desc="Dil, tema ve kullanıcı tercihlerini hatırlayarak kullanım kolaylığı sağlar." 
                     checked={preferences.functional} 
                     onChange={() => setPreferences(p => ({...p, functional: !p.functional}))} 
                   />
                   <CookieOption 
                     title="Analitik ve Performans" 
                     desc="Ziyaret sayısı ve hata tespiti yaparak hizmet kalitesini artırmamıza yarar." 
                     checked={preferences.analytics} 
                     onChange={() => setPreferences(p => ({...p, analytics: !p.analytics}))} 
                   />
                   <CookieOption 
                     title="Pazarlama Çerezleri" 
                     desc="İlgi alanlarınıza uygun içerik ve reklam sunulmasını sağlar." 
                     checked={preferences.marketing} 
                     onChange={() => setPreferences(p => ({...p, marketing: !p.marketing}))} 
                   />
                </div>

                <div className="p-4 bg-gray-50 dark:bg-white/5 flex justify-end gap-3 shrink-0">
                   <button onClick={() => handleSave({ necessary: true, functional: false, analytics: false, marketing: false })} className="px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg">Tümünü Reddet</button>
                   <button onClick={() => handleSave(preferences)} className="px-6 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg">Seçimi Kaydet</button>
                </div>
              </motion.div>
            </div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}

function CookieOption({ title, desc, checked, onChange, disabled }: any) {
  return (
    <div className="flex items-start justify-between gap-4">
       <div>
          <h4 className="font-bold text-gray-900 dark:text-white text-sm">{title}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{desc}</p>
       </div>
       <button 
         onClick={onChange} 
         disabled={disabled}
         className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${checked ? 'bg-blue-600' : 'bg-gray-200 dark:bg-white/10'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
       >
          <motion.div 
            className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm"
            animate={{ x: checked ? 20 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
       </button>
    </div>
  );
}