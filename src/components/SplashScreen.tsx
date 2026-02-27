'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- KORUNAN LOGO YOLLARI (Traxle Yazısı) ---
const logoPaths = [
  "M57.8 149.8h25.9l19.7.1 28.7.2a9872 9872 0 0 1 91.5.4h16.8l115.6.5c.9 3.8 1.1 5.6-.8 9.2l-1.2 2.3-1.4 2.4-1.4 2.6q-4.5 8.4-9.8 16.3-4.4 6.7-8.3 13.6-5.2 9-10.7 17.6l-1.3 2c-3 4.9-3 4.9-4.1 6l-4.1.2h-2.7l-3 .1H304l-10.3.3h-3.5q-39.6.7-79.2.4l-.1 1.9c-1.5 28-4.1 55.9-6.6 83.8L195.6 410l-1.4 17.5q-1.6 19.6-3.7 39.3l-.4 3.3-.3 3.1-.3 2.7c-.5 2.2-.5 2.2-2.5 4.2-2.9.2-2.9.2-6.6.2h-60.6c-2.8-.2-2.8-.2-3.8-1.2a69 69 0 0 1 .5-7.7l.2-3.5.3-3.6 4.6-56 7-79.2q3.1-32.5 5.8-65.1l.2-3.1.7-8.6.2-2.3q.8-13 1.5-25.9l-115.2.1h-3.6A138 138 0 0 1 0 223c.5-5.4 3.4-9.2 6.3-13.6l3.3-5.2 1.7-2.6 7.7-12.1 13.6-21.8L37 161l1.6-2.6c5.5-8 9.8-8.8 19.2-8.6",
  "M409.9 149.9h58.5a4867 4867 0 0 1 86.1.5c29.7.4 57 4.4 81.5 22.6l2.8 2c19 14.6 29.1 37.4 32.8 60.6q.9 8.8.7 17.5v6.3c.1 12.7-1.5 25.2-6 37.1l-.8 2.1a118 118 0 0 1-20.9 36.1 58 58 0 0 1-13.7 12.2A114 114 0 0 1 603 362c.6 4.5 2.4 7.9 4.8 11.7l1.1 2 13 21.3q1.5 2.7 3.2 5.4 8.2 13.6 16.7 27.3 9.6 15.4 18.7 31l2 3.4 1.8 3 4.7 7.6c2 3.3 2 3.3 2 5.3-3 1.5-6.4 1.2-9.8 1.2h-13.1l-46.3.4H592c-4 0-5.7-.4-8.8-3a68 68 0 0 1-6.9-10.4l-3.2-5.6-25.3-43.1q-9-15-17.2-30.2l-1.3-2.3-1-2-1.2-2-1-2c-3.4-3.3-7.5-2.6-12-2.5h-3l-17.3-.2H475l-19-.1-37.1-.2-.2 3.3a978 978 0 0 1-3.8 50.5l-3.3 37.7-.1 2.2c-.3 3-.7 5.5-1.6 8.3q-6.1 1.1-12.4 1.1h-53.8q-3.5 0-6.8-1.1-.2-12.4.9-24.8l.3-3.4a4202 4202 0 0 1 7.3-78.5 2056 2056 0 0 0 5.2-59.3q.4-4 1.3-8c3.7-1.2 7-1.1 10.8-1.1h10.5l38.3-.2 125.3-.3c17.7 0 34.8-1 48.5-13.6 9.9-11.1 12.1-24.5 11.9-38.8q-.8-11.3-8.5-19.5c-12.4-10.1-32.1-9-47.1-9h-41.5l-72.7-.3-79.5-.2c1.1-3.5 2.1-6.6 4.2-9.6l1.3-2 1.4-2 3-4.6 1.5-2.4q4-6 7.9-12.3a316 316 0 0 1 11-16.5l8.2-13 5-8c4-4.2 12.9-2.7 18.4-2.7",
  "M851.4 148.6h3c2.6.4 2.6.4 4 1.9 2.2 3.5 3.4 7 4.6 11l14 40.9 1.3 3.7 2.5 6.6c2.4 7 2.3 10.7-.8 17.3l-1.4 3.2-6.4 14.5q-4.8 10.6-10.1 21.1-6 12-11.6 24.2-6.6 14.1-13.6 28.1-4.7 9.7-9.3 19.4a2721 2721 0 0 1-25.4 53l-8.7 18a4146 4146 0 0 1-28.6 59l-1 2c-1.6 3.2-2.6 4.4-6 5.7-3.9.8-7.2 1-11.1 1h-60.6c-3.1-.2-5.3-.8-8.2-2.2q2-5 4.3-9.7l1.3-2.7 1.5-3 1.5-3 23.7-46.5 15.3-29.7q3-6.3 6.3-12.5l1.6-3.1 12.4-24.1q9.8-18.9 19.1-37.8 6.4-12.7 13.1-25.5 6.9-13.2 13.5-26.7 6.7-13.6 13.8-26.8 5.2-9.9 10.1-19.9a1291 1291 0 0 1 22.5-43.4q2.5-4.5 4.6-9c2.4-4.5 3.9-5 8.8-5",
  "m869 149 59.4-.3h3.5c3.5.3 5.3 1.3 8.1 3.3 1.2 1.8 1.2 1.8 2 3.8l1 2.3 1 2.7 1.2 2.8q5.4 13.3 10.5 26.7l15.9 40.4 1.4 3.6q8 20.3 16.2 40.4 7.6 18.7 15 37.5l23 57.4q8.6 22 17.4 44l1.4 3.4 3.8 9.5 1.1 3 4.9 11.5c1.4 3.5 1.6 4.5.2 8q-2.8 4.2-6 8.1l-1.8 2.3-10.1 13-2 2.6c-4.8 4.6-10.9 4.3-17.1 4.3H995c-5.7 0-5.7 0-7.8-1.7-1.9-2.3-2.7-4.7-3.8-7.5l-1.4-3.7-3.1-8.2q-6-15.6-11.4-31.3-6.9-19.6-14.2-39.1l-1-3L948 373c-12.6-34-12.6-34-17.4-47.8q-4.9-13.8-10-27.6l-.8-2.3-8.3-22a779 779 0 0 1-12.1-34.3q-4.3-12.8-9.1-25.3-4.3-11.2-8.1-22.7-3-8.5-6.2-17.1l-.8-2-5.2-14-1.2-3.3c-.8-2.7-.8-2.7.2-5.7",
  "M1466.9 148.8h64.3c2.8.2 2.8.2 3.8 1.2l-.3 9-.1 3q-1.2 19.7-3 39.3l-.8 9-5 55.8-.2 2.4-1.3 14.5q-4 44.6-7.4 89l-.2 2.4-.9 10.9-.2 3.8-.3 3.3-1.3 13.6h3l178.5-.1c8.9 0 17.7 0 26.5 1.1-.5 4.3-1.4 7.2-3.7 10.8l-1.7 2.7-1.8 3q-7.6 12-14.5 24.4a503 503 0 0 1-13.1 22.3c-4 6.2-4 6.2-6.2 7.8-5.1 1.2-10.2 1.1-15.4 1.1h-214.3q-8.7 0-17.3-1.1c-.8-3.1-1-5.6-.8-8.8l.3-3 .3-3.2.3-3.4 3.3-38.5 1.3-15.6q4.5-54.2 10-108.3 4.7-47.8 8.4-95.8l1-12 .7-8q.9-11.8 2.2-23.5l.4-3.9c.8-4 1.4-4.9 5.5-5.2",
  "M1478.5-.1h48.4l31.1.1c0 4.2-.1 4.6-2.6 7.6l-1.8 2-1.8 2.3-2 2.3-5.8 6.8-1.7 2-6.1 7.1q-5.5 6.4-10.7 12.9l-9.2 11.1-1.8 2.2-7.4 9-5.4 6.6-1.8 2.1-9.5 11.7-12 14.2q-4.4 5-8.4 10.1l-11.5 13.8-9 10.6q-9.4 11.4-19.2 22.6-9.3 10.5-18.2 21.5-3.1 3.7-6.5 7.3-5.2 6-10 12.1a227 227 0 0 1-13.2 15.5q-5.2 5.8-10 12-11.4 14-23.2 27.7-6.7 7.8-13.2 15.9a1110 1110 0 0 1-23 27.5l-1.5 1.7-2.9 3.3a42 42 0 0 0-6.6 10.5l2 2.6a1429 1429 0 0 1 38.8 54.6l23.6 33.7c25.3 36 25.3 36 31 44.6q4.4 6.8 9.2 13.2l1.4 2q4.5 6 9.2 11.7c1 2.2.5 3.3-.2 5.6a6622 6622 0 0 1-81.2.6h-2.5c-4.3 0-5.8-.2-9.2-3l-5.2-6.8-1.7-2.4-1.7-2.5-1.8-2.7q-7.2-10.2-14-20.5l-10.8-15.3q-13.5-18.8-26.5-38-4.4-6.5-9.3-12.8c-1.1-1.6-1.1-1.6-1.1-3.6a81 81 0 0 0-13.4 13.8 333 333 0 0 1-12.3 14.4l-1.7 1.9-12.1 14.2-4.6 5.3-15.6 18.6-9.9 11.6-11 13.4-8.3 9.6q-6.8 8-13.2 16.2-5.1 6.5-10.8 12.6-4.2 4.8-8 9.8l-9.6 11.6-7 8.4q-5.6 7-11.4 13.8l-8.6 10.3q-8.3 10.2-17 20.2l-4.1 5-1.4 1.5q-5.7 6.7-11.2 13.7c-1.8 2.1-1.8 2.1-3.8 4.1a104 104 0 0 1-10.7.3H976c-3.8 0-6.8-.1-10-2.3a86 86 0 0 1 10-14.6l1.7-2 13-15.5q6.9-7.8 13.3-15.9 11-13.5 22.5-26.8l11.2-13.4 8.2-9.6q6-6.9 11.5-14.1 6.6-8.5 13.8-16.5 5.3-6.2 10.4-12.8 5.9-7.4 12-14.3 5-5.4 9.5-11.3 8.2-10.4 17-20.4 8.4-9.3 16-19.2 4.7-6 9.9-11.8 6.4-7.5 12.5-15.1 5.7-7.4 12-14.3 4.5-5.2 8.8-10.5a620 620 0 0 1 14.7-17.5l3.8-4.4 2.1-2.6c2.7-3.4 2.7-3.4 3.8-7.4q-2.4-4.7-5.7-8.9l-1.8-2.5-13.8-18.9a967 967 0 0 1-20.3-28.8q-6-8.7-12.2-17.2-6.7-9.2-13.3-18.6l-10.5-14.7q-9.5-13.5-18.7-27.1l-8.7-12.5-1.3-1.8-3.4-4.6-1.3-2.4 1-3 74.5-.2h2.2c5.5 0 11.6.3 16.2 3.5l1.4 1.8 1.7 2.1a890 890 0 0 1 18.5 26l16 23.1q5.1 7.5 10.5 14.9 3.8 5.4 7.5 10.9 6.3 9.3 13.5 17.9 10.4-10.2 19.3-21.7 8.2-10.5 17.1-20.5 8.7-10 17-20.2 6.2-7.5 12.8-15 6-7 11.7-14 3.1-3.9 6.5-7.4 6-6.9 11.6-14 4.8-6.2 10-12 3.3-3.6 6.2-7.3l11.2-13.3q18.4-21.4 36.2-43.3l12-14.1q5.7-6.7 11.1-13.4l8.8-10.5 8.2-9.9 1.9-2.3 3.6-4.6 1.7-2.1 1.5-2c3.8-3.4 9.3-2.5 14.1-2.5",
  "M1751.3 275.9H1883l99.1.1c1 3 1 3-.2 5.8l-2 3.6-1 2-11.3 19.7q-5.4 9.3-10.3 19-6 11.8-13.2 22.9-4 .4-8.1.4h-11.1l-22.8-.1h-17.4l-70.4-.1-77.2-.2v-11.7q0-9.5 1-19l.3-3 2.4-21.2.3-2.8c1.8-15.4 1.8-15.4 10.3-15.4",
  "M1763.7 148.9h157.8l116.5.1c-.8 4.5-2.4 8-4.7 11.8l-1.2 2q-6.3 11.2-12.9 22.2a617 617 0 0 0-14 24.8c-1.3 2.2-1.3 2.2-2.1 4.7-1.7 3.5-3 5.2-6.1 7.5-7.5 2-15.8 1.3-23.6 1.1h-23l-22.9-.2a6272 6272 0 0 1-73-.4h-13.2l-92.3-.5v-10.4q.1-7.6 1-15.4l.3-3.1 2.4-23 .3-3c1.4-13.3 1.4-13.3 3-17.1a21 21 0 0 1 7.7-1.1",
  "M1763.2 405.8h220.4q20.7 0 41.4 1.2c-.7 4.5-1.7 7.7-3.9 11.6l-1.8 3.3-2 3.5-2 3.6q-7.5 13.5-15.5 26.8-3.9 6.3-7.1 12.8l-1 2-2.5 5c-3.8 4-9.4 3.3-14.7 3.5h-225c-23 0-23 0-32.5-1.1.7-3.8 1.7-6.6 3.6-10l1.7-3 1.8-3.2 9.9-17.3c22-38.8 22-38.8 29.2-38.7"
];

interface SplashScreenProps {
  onFinished?: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinished }) => {
  const [showSplash, setShowSplash] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');

    if (hasSeenSplash) {
      setShowSplash(false);
      if (onFinished) onFinished();
      return;
    }

    sessionStorage.setItem('hasSeenSplash', 'true');
    const timer = setTimeout(() => {
      setShowSplash(false);
      if (onFinished) onFinished();
    }, 3800);

    return () => clearTimeout(timer);
  }, [onFinished]);

  // 🔥 ÇÖZÜM: Sunucu tarafında veya client'ın ilk milisaniyesinde FOUC engellemek için simsiyah perde
  if (!isMounted) {
    return <div className="fixed inset-0 z-[9999] bg-[#02040A]"></div>;
  }

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.15,
            filter: "blur(25px)",
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#02040A] overflow-hidden"
        >
          {/* --- ARKAPLAN DERİNLİK EFEKTLERİ --- */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1e3a8a25_0%,transparent_60%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_80%,transparent_100%)] animate-pan-grid"></div>

          {/* --- MERKEZİ HUD / RADAR ÇEKİRDEĞİ --- */}
          <div className="relative flex items-center justify-center w-full max-w-2xl z-10 perspective-[1000px]">

            {/* RADAR HALKALARI VE OPTİK KATMANLAR (Boyut Küçültüldü: w-[340px]) */}
            <div className="absolute w-[340px] h-[340px] flex items-center justify-center pointer-events-none opacity-80" style={{ transformStyle: 'preserve-3d' }}>

              {/* Merkezdeki Derin Volumetrik Işık */}
              <div className="absolute w-24 h-24 bg-blue-500/30 rounded-full blur-[40px] animate-pulse-glow"></div>

              {/* Dış Halka: İnce, Kesikli, Yavaş Döner */}
              <svg className="absolute w-[100%] h-[100%] animate-spin-slow opacity-30" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="95" fill="none" stroke="#60A5FA" strokeWidth="0.3" strokeDasharray="1 4" />
                <circle cx="100" cy="100" r="92" fill="none" stroke="#3B82F6" strokeWidth="0.5" strokeDasharray="20 15 5 15" />
              </svg>

              {/* Orta Halka: Veri Akışı, Asimetrik, Ters Döner */}
              <svg className="absolute w-[80%] h-[80%] animate-spin-reverse-medium opacity-60" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" fill="none" stroke="#22D3EE" strokeWidth="1.2" strokeDasharray="40 20 2 10" />
                <circle cx="10" cy="100" r="2.5" fill="#22D3EE" className="animate-pulse shadow-[0_0_10px_#22D3EE]" />
                <circle cx="190" cy="100" r="1.5" fill="#3B82F6" className="animate-pulse" />
              </svg>

              {/* İç Halka: Hassas Odak, Mor/Indigo Karışımlı */}
              <svg className="absolute w-[60%] h-[60%] animate-spin-fast opacity-50" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" fill="none" stroke="#8B5CF6" strokeWidth="0.5" strokeDasharray="50 20" />
              </svg>

              {/* Gerçek Radar Işık Taraması (Sweep Effect) */}
              <div className="absolute inset-0 rounded-full animate-radar-sweep [mask-image:radial-gradient(transparent_52%,black_53%)]">
                <div className="w-full h-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(34,211,238,0.5)_360deg)]"></div>
              </div>

              {/* İnce Hedefleme Çizgileri (Crosshair) */}
              <div className="absolute w-full h-[0.5px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
              <div className="absolute h-full w-[0.5px] bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"></div>

              {/* Köşe Hedefleme İşaretçileri (Optik Hissiyat) */}
              <div className="absolute top-[15%] left-[15%] w-4 h-4 border-t-2 border-l-2 border-cyan-400/50 rounded-tl-sm"></div>
              <div className="absolute top-[15%] right-[15%] w-4 h-4 border-t-2 border-r-2 border-cyan-400/50 rounded-tr-sm"></div>
              <div className="absolute bottom-[15%] left-[15%] w-4 h-4 border-b-2 border-l-2 border-cyan-400/50 rounded-bl-sm"></div>
              <div className="absolute bottom-[15%] right-[15%] w-4 h-4 border-b-2 border-r-2 border-cyan-400/50 rounded-br-sm"></div>
            </div>

            {/* --- LOGO ÇİZİMİ (KÜÇÜLTÜLDÜ VE MERKEZLENDİ) --- */}
            <motion.div
              className="relative z-20 flex items-center justify-center mt-2"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
            >
              <svg
                width="180"
                height="50"
                viewBox="0 0 2038 603"
                fill="none"
                className="overflow-visible drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]"
              >
                <defs>
                  <linearGradient id="neon-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#22D3EE" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>

                  <filter id="glow">
                    <feGaussianBlur stdDeviation="12" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {logoPaths.map((pathCode, index) => (
                  <React.Fragment key={index}>
                    <motion.path
                      d={pathCode}
                      stroke="url(#neon-grad)"
                      strokeWidth="18"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                        delay: index * 0.1
                      }}
                      filter="url(#glow)"
                    />
                    <motion.path
                      d={pathCode}
                      fill="url(#neon-grad)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: 1.2 + (index * 0.1)
                      }}
                    />
                  </React.Fragment>
                ))}
              </svg>
            </motion.div>

          </div>

          <style jsx>{`
            @keyframes spin-slow {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes spin-reverse-medium {
                0% { transform: rotate(360deg); }
                100% { transform: rotate(0deg); }
            }
            @keyframes spin-fast {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes radar-sweep {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes pan-grid {
                0% { background-position: 0% 0%; }
                100% { background-position: 100px 100px; }
            }
            @keyframes pulse-glow {
                0%, 100% { opacity: 0.6; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.2); }
            }
            
            .animate-spin-slow { animation: spin-slow 20s linear infinite; }
            .animate-spin-reverse-medium { animation: spin-reverse-medium 15s linear infinite; }
            .animate-spin-fast { animation: spin-fast 10s linear infinite; }
            .animate-radar-sweep { animation: radar-sweep 4s linear infinite; }
            .animate-pan-grid { animation: pan-grid 40s linear infinite; }
            .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;