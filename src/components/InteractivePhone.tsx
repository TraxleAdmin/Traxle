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

// Ekran Bileşenleri (Artık hepsi dışarıdan geliyor)
import ScreenHome from './screens/ScreenHome';
import ScreenMap from './screens/ScreenMap';
import ScreenWallet from './screens/ScreenWallet';

interface PhoneProps { activeTab: string; }

export default function InteractivePhone({ activeTab }: PhoneProps) {

  // --- 1. SCROLL FİZİĞİ (YUMUŞAK YAYLANMA) ---
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 40, stiffness: 200, mass: 0.5 });
  const physicsY = useTransform(smoothVelocity, [-2000, 0, 2000], [-60, 0, 60]);

  // --- 2. MOUSE FİZİĞİ (ANLIK / RAW INPUT) ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-250, 250], [12, -12]);
  const rotateY = useTransform(x, [-250, 250], [-12, 12]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const xPct = (event.clientX - rect.left - rect.width / 2);
    const yPct = (event.clientY - rect.top - rect.height / 2);

    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
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
        className="relative rounded-[3.5rem] p-[6px] shadow-2xl duration-75 ease-out h-[680px] w-[340px]
                   bg-gray-100 ring-1 ring-black/5 border-4 border-gray-300
                   dark:bg-[#151515] dark:ring-white/10 dark:border-[#2a2a2a] 
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