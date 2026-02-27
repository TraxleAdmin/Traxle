'use client';

import React from 'react';
import { 
  motion, 
  AnimatePresence, 
  useMotionValue, 
  useTransform, 
  useScroll, 
  useVelocity, 
  useSpring
} from 'framer-motion';

// Ekran Bileşenleri
import ScreenMap from './screens/ScreenMap';
import ScreenWallet from './screens/ScreenWallet';

// --- ANA EKRAN (HOME) ---
const ScreenHome = () => (
  <div className="flex flex-col h-full p-5 space-y-4 pt-10 transition-colors duration-300">
    {/* Üst Kısım */}
    <div className="flex justify-between items-center">
        <div>
            <p className="text-gray-500 dark:text-gray-400 text-[10px]">Hoş geldin,</p>
            <h3 className="font-bold text-gray-900 dark:text-white text-md">Traxle Lojistik</h3>
        </div>
        <div className="w-8 h-8 bg-blue-100 text-blue-600 dark:bg-blue-600 dark:text-white rounded-full flex items-center justify-center text-[10px] font-bold">TR</div>
    </div>
    
    {/* Arama */}
    <div className="h-10 rounded-xl flex items-center px-3 gap-2 text-xs transition-colors duration-300 bg-gray-100 text-gray-600 dark:bg-[#222] dark:text-gray-500">
      <span>🔍</span> <span>Yük ara...</span>
    </div>

    {/* Kart */}
    <div className="p-4 rounded-2xl border relative overflow-hidden group transition-all duration-300 bg-white border-gray-200 shadow-sm dark:bg-[#1A1A1A] dark:border-white/10 dark:shadow-none">
        <div className="absolute right-0 top-0 w-20 h-20 bg-blue-500/10 blur-2xl opacity-0 dark:opacity-100"></div>
        <div className="flex justify-between items-start mb-2 relative z-10">
           <span className="text-blue-600 dark:text-blue-400 text-[10px] bg-blue-100 dark:bg-blue-500/10 px-2 py-1 rounded">TR ➔ DE</span>
           <span className="text-gray-900 dark:text-white font-bold">€3.250</span>
        </div>
        <div className="flex justify-between text-xs relative z-10 text-gray-600 dark:text-gray-300">
            <span>İstanbul</span><span className="text-gray-400 dark:text-gray-600">--------</span><span>Münih</span>
        </div>
        <div className="mt-3 flex gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <p className="text-[10px] text-green-600 dark:text-green-500">Yüklemeye Hazır</p>
        </div>
    </div>

    {/* Grid */}
    <div className="grid grid-cols-4 gap-2 mt-2">
        {['📦', '📄', '💬', '⚙️'].map((icon, i) => (
            <div key={i} className="aspect-square rounded-xl flex items-center justify-center text-lg cursor-pointer border transition-colors duration-300 bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-[#1A1A1A] dark:border-white/5 dark:hover:bg-[#252525]">
                {icon}
            </div>
        ))}
    </div>
  </div>
);

interface PhoneProps { activeTab: string; }

export default function InteractivePhone({ activeTab }: PhoneProps) {
  
  // --- 1. SCROLL FİZİĞİ (YUMUŞAK YAYLANMA) ---
  // Burası senin sevdiğin o "bounce" efekti. Buna dokunmadım.
  const { scrollY } = useScroll(); 
  const scrollVelocity = useVelocity(scrollY); 
  const smoothVelocity = useSpring(scrollVelocity, { damping: 40, stiffness: 200, mass: 0.5 });
  const physicsY = useTransform(smoothVelocity, [-2000, 0, 2000], [-60, 0, 60]);

  // --- 2. MOUSE FİZİĞİ (ANLIK / RAW INPUT) ---
  // Buradaki "Spring" tamamen kaldırıldı. Mouse nerede, telefon orada.
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // useTransform ile direkt mapping yapıyoruz. Gecikme YOK.
  // Mouse 250px sağa giderse, telefon 12 derece döner.
  const rotateX = useTransform(y, [-250, 250], [12, -12]); 
  const rotateY = useTransform(x, [-250, 250], [-12, 12]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect();
    // Mouse'un merkeze olan uzaklığını hesapla
    const xPct = (event.clientX - rect.left - rect.width / 2);
    const yPct = (event.clientY - rect.top - rect.height / 2);
    
    // Değeri anında güncelle
    x.set(xPct);
    y.set(yPct);
  }

  // Mouse ayrılınca yavaşça merkeze dönmesi için animasyon
  function handleMouseLeave() {
    // Burada ufak bir hile: Çıkarken motion value'yu manuel animate edebiliriz 
    // ama şimdilik direkt 0'a set ediyoruz ki takılmasın.
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ perspective: 1200, y: physicsY }}
      className="w-full max-w-md mx-auto h-[700px] flex items-center justify-center cursor-pointer will-change-transform"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d" 
        }}
        // 'transition-all' duration-75 yaptık ki renk değişimi yumuşak olsun ama hareket takılmasın
        className="relative rounded-[3.5rem] p-[6px] shadow-2xl duration-75 ease-out h-[680px] w-[340px]
                   /* LIGHT MODE KASA */
                   bg-gray-100 ring-1 ring-black/5 border-4 border-gray-300
                   /* DARK MODE KASA */
                   dark:bg-[#151515] dark:ring-white/10 dark:border-[#2a2a2a] 
                   /* HOVER SHADOW (Daha belirgin) */
                   hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_0_60px_rgba(0,87,255,0.25)]"
      >
        {/* Dynamic Island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-center shadow-md">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse ml-auto mr-3"></div>
        </div>

        {/* EKRAN */}
        <div className="rounded-[3.2rem] overflow-hidden w-full h-full relative flex flex-col font-sans z-20 transition-colors duration-300
                        bg-white border border-gray-200
                        dark:bg-[#050505] dark:border-black">
          
          <div className="flex-1 relative">
             <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, filter: 'blur(4px)' }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  {activeTab === 'home' && <ScreenHome />}
                  {activeTab === 'map' && <ScreenMap />}
                  {activeTab === 'wallet' && <ScreenWallet />}
                </motion.div>
             </AnimatePresence>
          </div>

          {/* Alt Çizgi */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[120px] h-1 rounded-full transition-colors duration-300 bg-gray-300 dark:bg-white/20"></div>
        </div>
      </motion.div>
    </motion.div>
  );
}