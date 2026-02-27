'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiX, FiStar, FiZap, FiShield, FiPackage, FiCheckCircle, FiInfo } from 'react-icons/fi';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { PLANS, PlanType } from '@/lib/plans'; 
import UpgradeModal from '@/components/UpgradeModal';

export default function SubscriptionPage() {
  const [currentPlan, setCurrentPlan] = useState<PlanType>('free');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('pro');
  const [loading, setLoading] = useState(true);

  // --- KULLANICI PLANINI ÇEK ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const data = userSnap.data();
            setCurrentPlan((data.subscriptionPlan as PlanType) || 'free');
          }
        } catch (error) {
          console.error("Plan bilgisi alınamadı:", error);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleUpgradeClick = (planId: PlanType) => {
    setSelectedPlan(planId);
    setIsModalOpen(true);
  };

  // İkon Seçici
  const getPlanIcon = (id: string) => {
    switch (id) {
      case 'starter': return <FiZap className="w-6 h-6" />;
      case 'pro': return <FiStar className="w-6 h-6" />;
      case 'enterprise': return <FiShield className="w-6 h-6" />;
      default: return <FiPackage className="w-6 h-6" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-100px)]">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-20 px-4 md:px-0">
      
      {/* --- HEADER --- */}
      <div className="text-center mb-16 pt-8 space-y-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest border border-blue-100 dark:border-blue-500/20">
            <FiStar /> Premium Özellikler
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          İşinizi Büyütmek İçin <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">En Doğru Planı</span> Seçin
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Daha fazla yük ilanı, daha düşük komisyon oranları ve premium destek ile kazancınızı artırın. İstediğiniz zaman iptal edebilirsiniz.
        </motion.p>
      </div>

      {/* --- PLAN KARTLARI --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 relative items-start">
        
        {/* Arka plan Glow Efekti (Pro kartın arkası) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>

        {Object.values(PLANS).map((plan, index) => {
          const isCurrent = currentPlan === plan.id;
          const isPro = plan.id === 'pro';
          
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative flex flex-col p-8 rounded-[32px] border transition-all duration-300 h-full
                ${isPro 
                  ? 'border-blue-500/50 bg-white dark:bg-[#161b2c] shadow-[0_20px_50px_-12px_rgba(59,130,246,0.3)] z-10 scale-105 md:scale-110 ring-4 ring-blue-500/10' 
                  : 'border-gray-200 dark:border-white/5 bg-white dark:bg-[#0B0F19] hover:shadow-xl hover:border-gray-300 dark:hover:border-white/20'
                }
              `}
            >
              {/* Popüler Rozeti */}
              {plan.ui.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg tracking-wider uppercase flex items-center gap-1">
                  <FiStar className="fill-current" /> En Çok Tercih Edilen
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-2xl shadow-lg transition-transform
                  ${plan.id === 'free' ? 'bg-gray-100 dark:bg-white/10 text-gray-500' : ''}
                  ${plan.id === 'starter' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' : ''}
                  ${plan.id === 'pro' ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white' : ''}
                  ${plan.id === 'enterprise' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' : ''}
                `}>
                  {getPlanIcon(plan.id)}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                <p className="text-sm text-gray-500 mt-2 min-h-[40px] leading-relaxed">{plan.description}</p>
              </div>

              {/* Fiyat */}
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                    {plan.price === 0 ? 'Ücretsiz' : `₺${plan.price.toLocaleString()}`}
                    </span>
                    {plan.price > 0 && <span className="text-gray-400 text-sm font-medium">/ay</span>}
                </div>
                {plan.price > 0 && (
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">Yıllık ödemede %20 indirim</p>
                )}
              </div>

              {/* Özellikler */}
              <div className="flex-1 space-y-4 mb-8">
                {plan.displayFeatures.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm group">
                    {feature.included ? (
                      <div className={`mt-0.5 p-0.5 rounded-full shrink-0 ${isPro ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400'}`}>
                        <FiCheck size={10} />
                      </div>
                    ) : (
                      <FiX className="shrink-0 text-lg text-gray-300 dark:text-gray-700 mt-0.5" />
                    )}
                    <span className={`transition-colors ${feature.included ? 'text-gray-700 dark:text-gray-300 font-medium' : 'text-gray-400 line-through decoration-gray-300 dark:decoration-gray-700'}`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Aksiyon Butonu */}
              <button
                onClick={() => !isCurrent && plan.price > 0 ? handleUpgradeClick(plan.id) : null}
                disabled={isCurrent || plan.price === 0}
                className={`w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2
                  ${isCurrent 
                    ? 'bg-gray-100 dark:bg-white/5 text-gray-400 cursor-not-allowed border border-gray-200 dark:border-white/5'
                    : isPro
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-600/30 hover:scale-[1.02]'
                      : 'bg-white border-2 border-gray-200 text-gray-900 hover:border-gray-900 dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10'
                  }
                `}
              >
                {isCurrent ? (
                    <><FiCheckCircle /> Mevcut Plan</>
                ) : plan.price === 0 ? (
                    'Varsayılan Plan'
                ) : (
                    plan.ui.buttonText
                )}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* --- ALT BİLGİ --- */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Güvenli Ödeme</h4>
              <p className="text-xs text-gray-500">Tüm ödemeleriniz 256-bit SSL sertifikası ve Iyzico altyapısı ile güvence altındadır.</p>
          </div>
          <div className="p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">İstediğin Zaman İptal</h4>
              <p className="text-xs text-gray-500">Memnun kalmazsanız aboneliğinizi tek tıkla iptal edebilirsiniz. Taahhüt yok.</p>
          </div>
          <div className="p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">7/24 Destek</h4>
              <p className="text-xs text-gray-500">Pro ve Enterprise üyelerimiz için öncelikli WhatsApp ve telefon desteği mevcuttur.</p>
          </div>
      </div>

      {/* --- UPGRADE MODAL --- */}
      <UpgradeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        targetPlan={selectedPlan}
      />
    </div>
  );
}