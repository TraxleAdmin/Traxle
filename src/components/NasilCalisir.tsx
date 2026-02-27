'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FiTool, FiCpu, FiShield, FiCheckCircle, FiTruck, FiSmartphone, FiFileText, FiCreditCard } from 'react-icons/fi';

// 1. Şantiye / Müşteri Adımları
const musteriAdimlari = [
  { icon: <FiTool />, title: "1. İhtiyacını Belirle", desc: "Hangi makineye ihtiyacınız var? Ekskavatör, vinç veya loder... Tonaj, ataşman ve tarih aralığını belirleyip talebinizi oluşturun." },
  { icon: <FiCpu />, title: "2. Anında Eşleşme", desc: "Gelişmiş algoritmamız, bölgenizdeki en uygun, müsait ve KYC onaylı kurumsal tedarikçileri saniyeler içinde karşınıza çıkarır." },
  { icon: <FiShield />, title: "3. Dijital Sözleşme & Ödeme", desc: "Hukuki güvence için sözleşmeyi dijital olarak onaylayın. Kiralama bedeli güvenli ödeme altyapısıyla havuz hesabına alınır, risk sıfırlanır." },
  { icon: <FiCheckCircle />, title: "4. Sahada Teslimat", desc: "Makine şantiyenize ulaşır. Mobil uygulama üzerinden fotoğraflı teslimat tutanağı onaylanır ve operasyon anında başlar." }
];

// 2. Tedarikçi / Makine Sahibi Adımları
const tedarikciAdimlari = [
  { icon: <FiTruck />, title: "1. Makine Parkını Yükle", desc: "Filonuzdaki iş makinelerini tüm detaylarıyla sisteme ekleyin. Boşta yatan makinelerinizi Türkiye'nin en büyük şantiye ağına görünür kılın." },
  { icon: <FiSmartphone />, title: "2. Talepleri Değerlendir", desc: "Bölgenizdeki veya Türkiye genelindeki uygun kiralama taleplerini cep telefonunuzdan anında görüntüleyin ve teklif verin." },
  { icon: <FiFileText />, title: "3. Dijital Tutanak", desc: "Makineyi müşteriye teslim ederken o anki durumunu fotoğraflayın ve dijital teslim tutanağı ile her şeyi kayıt altına alın." },
  { icon: <FiCreditCard />, title: "4. Paran Garanti Altında", desc: "Teslimat başarıyla gerçekleştiği an, havuzda bekleyen kiralama bedeliniz anında cüzdanınıza geçer. Tahsilat stresi biter." }
];

export default function NasilCalisir() {
  const [aktifSekme, setAktifSekme] = useState<'musteri' | 'tedarikci'>('musteri');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-24 relative bg-gray-50 dark:bg-[#050814] overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
          >
            Süreç Nasıl İşliyor?
          </motion.h2>

          <div className="inline-flex bg-gray-200 dark:bg-white/10 p-1.5 rounded-full relative shadow-inner">
            <motion.div
              className="absolute top-1.5 bottom-1.5 w-[150px] bg-white dark:bg-blue-600 rounded-full shadow-md z-0"
              initial={false}
              animate={{ x: aktifSekme === 'musteri' ? 0 : 150 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <button onClick={() => setAktifSekme('musteri')} className={`relative z-10 w-[150px] py-3 rounded-full text-sm font-bold transition-colors ${aktifSekme === 'musteri' ? 'text-blue-600 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>Şantiye / Müşteri</button>
            <button onClick={() => setAktifSekme('tedarikci')} className={`relative z-10 w-[150px] py-3 rounded-full text-sm font-bold transition-colors ${aktifSekme === 'tedarikci' ? 'text-blue-600 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>Tedarikçi</button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 dark:bg-white/10 -translate-x-1/2 rounded-full"></div>

          <motion.div style={{ height: lineHeight }} className="absolute left-[28px] md:left-1/2 top-0 w-1 bg-gradient-to-b from-blue-500 to-cyan-500 -translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)] z-0"></motion.div>

          <AnimatePresence mode='wait'>
            <motion.div
              key={aktifSekme}
              className="space-y-24 py-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {(aktifSekme === 'musteri' ? musteriAdimlari : tedarikciAdimlari).map((adim, index) => {
                return (
                  <div key={index} className={`flex flex-col md:flex-row items-start md:items-center justify-between relative w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className={`w-full md:w-[35%] pl-20 md:pl-0 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
                    >
                      <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{adim.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed">{adim.desc}</p>
                    </motion.div>

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