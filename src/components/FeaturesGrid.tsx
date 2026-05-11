'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiCpu, FiGlobe, FiShield, FiZap, FiBarChart2, FiLayers } from 'react-icons/fi';

export default function FeaturesGrid() {
  return (
    <section className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        
        {/* Başlık */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 mb-4 border rounded-full text-xs font-semibold backdrop-blur-md
                       border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400"
          >
            🚀 Neden Traxle?
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
          >
            Lojistiği <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">Yeniden Tanımlayın.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400"
          >
            Eski usül Excel dosyalarını ve telefon trafiğini unutun. Traxle, tüm operasyonunuzu tek bir akıllı merkezden yönetmenizi sağlar.
          </motion.p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          
          {/* KART 1: AI (Büyük Kart) */}
          <BentoCard 
            className="md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 text-white overflow-hidden relative group"
            delay={0}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-all duration-500"></div>
            <div className="relative z-10 p-8 flex flex-col justify-between h-full">
               <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl mb-4">
                 <FiCpu />
               </div>
               <div>
                 <h3 className="text-2xl font-bold mb-2">Yapay Zeka Destekli Rota</h3>
                 <p className="text-blue-100 max-w-md">
                   Binlerce veriyi saniyeler içinde analiz eder. Trafik, hava durumu ve araç kapasitesine göre en kârlı rotayı otomatik oluşturur.
                 </p>
               </div>
            </div>
            {/* Dekoratif Dalgalar */}
            <div className="absolute bottom-0 left-0 right-0 h-32 opacity-30">
               <svg className="w-full h-full" viewBox="0 0 1440 320" fill="none">
                 <path fill="#fff" fillOpacity="0.2" d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
               </svg>
            </div>
          </BentoCard>

          {/* KART 2: Güvenlik */}
          <BentoCard delay={0.1}>
             <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4
                             bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400">
               <FiShield />
             </div>
             <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Uçtan Uca Şifreleme</h3>
             <p className="text-sm text-gray-600 dark:text-gray-400">
               Verileriniz askeri düzeyde şifreleme ile korunur. Ödemeleriniz ve müşteri bilgileriniz güvende.
             </p>
          </BentoCard>

          {/* KART 3: Analitik */}
          <BentoCard delay={0.2}>
             <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4
                             bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">
               <FiBarChart2 />
             </div>
             <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Gerçek Zamanlı Analiz</h3>
             <p className="text-sm text-gray-600 dark:text-gray-400">
               Filo performansını canlı izleyin. Hangi araç ne kadar kazandırdı, anlık raporlayın.
             </p>
          </BentoCard>

          {/* KART 4: Global (Büyük Kart) */}
          <BentoCard 
            className="md:col-span-2 md:col-start-2 bg-gray-50 dark:bg-[#0F1629] overflow-hidden relative"
            delay={0.3}
          >
             <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05]" />
             <div className="relative z-10 p-8 flex flex-row items-center justify-between h-full gap-8">
                <div className="flex-1">
                   <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4
                                   bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400">
                     <FiGlobe />
                   </div>
                   <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Sınırları Kaldırın</h3>
                   <p className="text-gray-600 dark:text-gray-400">
                     Traxle, 80+ ülkede gümrük ve mevzuat uyumluluğu sağlar. Uluslararası taşımacılık hiç bu kadar kolay olmamıştı.
                   </p>
                </div>
                {/* Minik Dünya Haritası Görseli (CSS ile Temsili) */}
                <div className="hidden md:flex w-40 h-40 rounded-full border-2 border-dashed border-gray-300 dark:border-white/10 items-center justify-center animate-spin-slow">
                   <div className="w-32 h-32 rounded-full bg-blue-500/5 dark:bg-blue-500/10 flex items-center justify-center">
                      <FiGlobe className="text-5xl text-blue-500/30" />
                   </div>
                </div>
             </div>
          </BentoCard>
          
          {/* KART 5: Hız */}
          <BentoCard className="md:col-start-1 md:row-start-2" delay={0.4}>
             <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4
                             bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400">
               <FiZap />
             </div>
             <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Işık Hızında İşlem</h3>
             <p className="text-sm text-gray-600 dark:text-gray-400">
               Redis tabanlı önbellekleme ile milisaniyeler içinde yanıt alın. Beklemek yok.
             </p>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}

// --- YARDIMCI KART BİLEŞENİ ---
function BentoCard({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className={`p-8 rounded-3xl border transition-all duration-300 shadow-sm hover:shadow-xl
                  bg-white border-gray-200 
                  dark:bg-[#151515] dark:border-white/5
                  ${className}`}
    >
      {children}
    </motion.div>
  );
}