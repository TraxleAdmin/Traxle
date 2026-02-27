'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus, FiHelpCircle } from 'react-icons/fi';

// --- GÜNCELLENMİŞ SORULAR ---
const sorular = [
  {
    q: "Traxle bir nakliye firması mı?",
    a: "Hayır. Traxle, 6563 sayılı Kanun kapsamında faaliyet gösteren bir 'Aracı Hizmet Sağlayıcı'dır. Biz, yük sahiplerini ve bağımsız nakliyecileri dijital ortamda buluşturan teknoloji platformuyuz. Taşıma hizmeti, platforma üye olan doğrulanmış sürücüler tarafından gerçekleştirilir."
  },
  {
    q: "Ücretsiz paket neleri kapsıyor?",
    a: "Deneme paketimiz tamamen ücretsizdir ve her 6 ayda bir yenilenir. Bu paketle yılda 2 kez ilan oluşturabilir veya yük alabilirsiniz. Platformu risk almadan deneyimlemeniz için tasarlanmıştır."
  },
  {
    q: "Ödemeler güvenli mi?",
    a: "Kesinlikle. Tüm ödeme işlemleri BDDK lisanslı iyzico altyapısı üzerinden 3D Secure güvencesiyle gerçekleşir. Kredi kartı bilgileriniz Traxle sunucularında asla saklanmaz."
  },
  {
    q: "Ödememi ne zaman alabilirim?",
    a: "Teslimatın alıcı tarafından onaylanmasının hemen ardından hak edişiniz Traxle Cüzdan'a yansır. İş günü içerisinde banka hesabınıza transfer talimatı verebilirsiniz. Vade bekleme derdi yoktur."
  },
  {
    q: "Sürücü olmak için hangi belgeler şart?",
    a: "Güvenli bir ağ oluşturmak için Ehliyet, SRC Belgesi (3 veya 4) ve Psikoteknik raporu zorunludur. Kendi aracıyla çalışacak sürücülerden Ruhsat ve Sigorta bilgileri de talep edilir."
  },
  {
    q: "Yük sigortası var mı?",
    a: "Platform üzerinden yapılan taşımalar, talep edilirse anlaşmalı sigorta ortaklarımız aracılığıyla 'Emtia Nakliyat Sigortası' kapsamına alınabilir. Bu seçenek ilan oluşturma aşamasında sunulur."
  },
  {
    q: "Hizmet bedeli faturası kesiyor musunuz?",
    a: "Evet. Traxle, platform kullanım bedeli (komisyon) için size resmi e-fatura/e-arşiv fatura düzenler. Taşıma hizmetinin faturası ise nakliyeci tarafından yük sahibine kesilir."
  }
];

export default function SSS() {
  const [aktifIndex, setAktifIndex] = useState<number | null>(0); // İlk soru açık gelsin

  return (
    <section className="relative py-24 sm:py-32 bg-gray-50 dark:bg-[#050814] overflow-hidden transition-colors duration-300">
      
      {/* --- Arka Plan Efektleri (Premium Glow) --- */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 dark:bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        
        {/* --- Header --- */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wider uppercase border border-blue-200 dark:border-blue-500/30">
            <FiHelpCircle /> Destek Merkezi
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            Aklınıza Takılanlar
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Sıkça sorulan sorulara göz atın, cevabınızı hemen bulun. Bulamadınız mı? Destek ekibimiz 7/24 yanınızda.
          </p>
        </div>

        {/* --- Sorular Listesi --- */}
        <div className="space-y-4">
          {sorular.map((soru, index) => {
            const isOpen = aktifIndex === index;
            return (
              <motion.div 
                key={index}
                initial={false}
                animate={{ backgroundColor: isOpen ? 'rgba(59, 130, 246, 0.05)' : 'rgba(255, 255, 255, 0)' }}
                className={`group border rounded-2xl overflow-hidden transition-all duration-300
                  ${isOpen 
                    ? 'border-blue-500/50 dark:border-blue-500/50 shadow-lg shadow-blue-500/10' 
                    : 'border-gray-200 dark:border-white/5 bg-white dark:bg-white/5 hover:border-blue-300 dark:hover:border-white/10'
                  }
                `}
              >
                <button
                  onClick={() => setAktifIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                >
                  <span className={`font-bold text-lg md:text-xl pr-8 transition-colors duration-300 ${isOpen ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}>
                    {soru.q}
                  </span>
                  <span className={`
                    flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 shrink-0
                    ${isOpen 
                      ? 'bg-blue-600 border-blue-600 text-white rotate-180' 
                      : 'bg-transparent border-gray-200 dark:border-white/20 text-gray-400 group-hover:border-blue-600 group-hover:text-blue-600'
                    }
                  `}>
                    {isOpen ? <FiMinus size={20} /> : <FiPlus size={20} />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-8 pt-0">
                        <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-200/50 dark:border-white/5 pt-4">
                          {soru.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}