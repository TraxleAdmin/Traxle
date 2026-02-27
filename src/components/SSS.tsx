'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus, FiHelpCircle } from 'react-icons/fi';

const sorular = [
  {
    q: "Traxle kendisi mi iş makinesi kiralıyor?",
    a: "Hayır. Traxle, 6563 sayılı Kanun kapsamında faaliyet gösteren bir 'Aracı Hizmet Sağlayıcı'dır. Biz, şantiyeleri (müşterileri) ve onaylı makine sahiplerini (tedarikçileri) dijital ortamda buluşturan, süreci hukuki ve finansal olarak güvence altına alan bir teknoloji platformuyuz."
  },
  {
    q: "Hangi tür iş makinelerini kiralayabilirim?",
    a: "Platformumuzda ekskavatör, loder (yükleyici), kazıcı yükleyici (beko loder), vinç, forklift, dozer, greyder, silindir ve ağır nakliye araçları dahil olmak üzere şantiyede ihtiyaç duyabileceğiniz tüm ağır iş makineleri bulunmaktadır."
  },
  {
    q: "Operatörlü kiralama yapabiliyor muyum?",
    a: "Evet. İlan oluştururken veya arama yaparken 'Operatörlü' veya 'Operatörsüz (Kuru Kiralama)' seçeneklerinden birini tercih edebilirsiniz. Operatörlü kiralamalarda operatörün sertifika ve puan bilgilerini de sistem üzerinden görebilirsiniz."
  },
  {
    q: "Ödemeler ve tahsilat güvenli mi?",
    a: "Kesinlikle. Traxle'ın en büyük avantajı tahsilat riskini sıfıra indirmesidir. Tüm ödeme işlemleri BDDK lisanslı güvenli ödeme altyapısı üzerinden havuz hesabına (Escrow) aktarılır. Makine şantiyeye sorunsuz teslim edilip dijital onay verilmeden para tedarikçiye aktarılmaz."
  },
  {
    q: "Platformdaki tedarikçiler güvenilir mi?",
    a: "Platformumuz kapalı bir B2B ağıdır. Sisteme kayıt olmak isteyen her tedarikçi zorunlu KYC (Müşterini Tanı) sürecinden geçer. Vergi levhası, imza sirküleri, makine ruhsatları ve sigorta belgeleri Traxle yöneticileri tarafından onaylanmadan kimse platformda ilan açamaz."
  },
  {
    q: "Fatura süreci nasıl işliyor?",
    a: "Kiralama bedelinin asıl faturası, hizmeti veren Makine Sahibi (Tedarikçi) tarafından doğrudan Hizmet Alan'a (Müşteriye) kesilir. Traxle, yalnızca sağladığı eşleştirme ve güvenli ödeme altyapısı için taraflara kendi hizmet bedeli (komisyon) faturasını keser."
  }
];

export default function SSS() {
  const [aktifIndex, setAktifIndex] = useState<number | null>(0);

  return (
    <section className="relative py-24 sm:py-32 bg-gray-50 dark:bg-[#050814] overflow-hidden transition-colors duration-300">

      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 dark:bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wider uppercase border border-blue-200 dark:border-blue-500/30 shadow-inner">
            <FiHelpCircle /> Destek Merkezi
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            Aklınıza Takılanlar
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            İş makinesi kiralama süreçleriyle ilgili sıkça sorulan sorulara göz atın. Bulamadığınız sorular için destek ekibimiz 7/24 yanınızda.
          </p>
        </div>

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
                    flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 shrink-0 shadow-sm
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