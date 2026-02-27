'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FiBox, FiCpu, FiMapPin, FiCheckCircle, FiTruck, FiSmartphone, FiNavigation, FiCreditCard } from 'react-icons/fi';

// 1. Yük Veren Adımları
const yukVerenAdimlari = [
  { icon: <FiBox />, title: "1. Yükünü Oluştur", desc: "Yükün cinsini, tonajını ve rotasını sisteme girin. İlanınız anında binlerce sürücüye ulaşsın." },
  { icon: <FiCpu />, title: "2. Anında Fiyat & Eşleşme", desc: "Yapay zeka, piyasa koşullarına göre en adil fiyatı belirler ve en uygun araç tipini atar." },
  { icon: <FiMapPin />, title: "3. Canlı Takip Et", desc: "Sürücüyü aramaya gerek yok. Harita üzerinden aracın konumunu ve tahmini varış süresini izleyin." },
  { icon: <FiCheckCircle />, title: "4. Dijital Teslimat", desc: "Teslimat kanıtı (POD) ve e-fatura anında panelinize düşer. Operasyon tamamlanır." }
];

// 2. Sürücü Adımları
const surucuAdimlari = [
  { icon: <FiSmartphone />, title: "1. Yükü Yakala", desc: "Bölge, araç tipi ve fiyata göre filtrele. Sana uygun yükü tek tıkla kabul et." },
  { icon: <FiNavigation />, title: "2. Akıllı Rota", desc: "Navigasyon derdi yok. Tır ve kamyonlara özel en uygun rotayı senin için biz çiziyoruz." },
  { icon: <FiTruck />, title: "3. Yola Çık", desc: "Yükleme ve boşaltma işlemlerini QR kod ile temassız hallet. Durum güncellemeleri otomatiktir." },
  { icon: <FiCreditCard />, title: "4. Paran Cebinde", desc: "Teslimatı yaptığın an paran Cüzdan'da. Vade beklemeden banka hesabına çek." }
];

export default function NasilCalisir() {
  const [aktifSekme, setAktifSekme] = useState<'yukveren' | 'surucu'>('yukveren');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);
  
  return (
    <section ref={containerRef} className="py-24 relative bg-gray-50 dark:bg-[#050814] overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Başlık */}
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
          >
            Süreç Nasıl İşliyor?
          </motion.h2>
          
          {/* Toggle Butonu */}
          <div className="inline-flex bg-gray-200 dark:bg-white/10 p-1.5 rounded-full relative">
             <motion.div 
               className="absolute top-1.5 bottom-1.5 w-[150px] bg-white dark:bg-blue-600 rounded-full shadow-md z-0"
               initial={false}
               animate={{ x: aktifSekme === 'yukveren' ? 0 : 150 }}
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
             />
             <button onClick={() => setAktifSekme('yukveren')} className={`relative z-10 w-[150px] py-3 rounded-full text-sm font-bold transition-colors ${aktifSekme === 'yukveren' ? 'text-blue-600 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>Yük Veren</button>
             <button onClick={() => setAktifSekme('surucu')} className={`relative z-10 w-[150px] py-3 rounded-full text-sm font-bold transition-colors ${aktifSekme === 'surucu' ? 'text-blue-600 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>Sürücü</button>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Gri Arka Plan Çizgisi */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 dark:bg-white/10 -translate-x-1/2 rounded-full"></div>
          
          {/* Mavi Dolum Çizgisi (Scroll ile uzayan) */}
          <motion.div style={{ height: lineHeight }} className="absolute left-[28px] md:left-1/2 top-0 w-1 bg-gradient-to-b from-blue-500 to-cyan-500 -translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)] z-0"></motion.div>

          <AnimatePresence mode='wait'>
            <motion.div 
              key={aktifSekme} 
              className="space-y-24 py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {(aktifSekme === 'yukveren' ? yukVerenAdimlari : surucuAdimlari).map((adim, index) => {
                const isLeft = index % 2 !== 0; // Tek sayılar (1, 3...) solda (PC'de)
                // Telefondaki görünümde hepsi aynı yönden gelebilir veya sırayla
                
                return (
                  <div key={index} className={`flex flex-col md:flex-row items-start md:items-center justify-between relative w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* METİN KISMI (Animasyonlu) */}
                    <motion.div 
                      // 1. Başlangıç Hali: Görünmez ve 50px kenarda
                      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }} 
                      // 2. Ekrana Girince: Görünür ve yerine otursun
                      whileInView={{ opacity: 1, x: 0 }}
                      // 3. Ayarlar: Sadece bir kere çalışsın, %20 görünce başlasın
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className={`w-full md:w-[35%] pl-20 md:pl-0 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                    >
                      <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{adim.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed">{adim.desc}</p>
                    </motion.div>

                    {/* İKON KUTUSU (Animasyonlu - Pop Effect) */}
                    <div className="absolute left-[28px] md:left-1/2 -translate-x-1/2 top-0 md:top-1/2 md:-translate-y-1/2 flex items-center justify-center z-10">
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                        className="w-16 h-16 rounded-full border-[4px] border-blue-500/20 bg-gray-50 dark:bg-[#050814] flex items-center justify-center text-3xl text-blue-600 shadow-2xl shadow-blue-500/10 relative group hover:scale-110 hover:border-blue-500 transition-colors duration-300"
                      >
                         <span className="relative z-10">{adim.icon}</span>
                      </motion.div>
                    </div>

                    {/* BOŞLUK DENGELEYİCİ */}
                    <div className="hidden md:block md:w-[35%]"></div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}