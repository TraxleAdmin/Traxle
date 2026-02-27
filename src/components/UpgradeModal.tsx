'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiX, FiAlertCircle, FiCreditCard, FiStar, FiZap, FiPlus, FiShield } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
// ÖNEMLİ: setDoc burada da kullanılmalı ki planı güncellerken hata vermesin
import { doc, getDoc, setDoc, collection, query, where, getDocs, increment } from 'firebase/firestore';
import { PLANS, PlanType } from '@/lib/plans';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetPlan?: PlanType;
}

export default function UpgradeModal({ isOpen, onClose, targetPlan = 'pro' }: UpgradeModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('');

  const plan = PLANS[targetPlan] || PLANS.pro;

  useEffect(() => {
    if (isOpen && auth.currentUser) {
      const fetchBalance = async () => {
        try {
          // 1. Kasa Bakiyesi Kontrolü
          const userDocRef = doc(db, 'users', auth.currentUser!.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          let currentBalance = 0;
          
          // Eğer users tablosunda kayıt varsa oradan al
          if (userDocSnap.exists() && userDocSnap.data().walletBalance !== undefined) {
             currentBalance = userDocSnap.data().walletBalance;
          } else {
             // 2. Kasa Boşsa veya Kullanıcı Yoksa -> Fişleri (Transactions) Topla
             // Bu kısım "Hayalet Para" sorununu çözer.
             const q = query(collection(db, "wallet_transactions"), where("userId", "==", auth.currentUser!.uid));
             const querySnapshot = await getDocs(q);
             const calculatedBalance = querySnapshot.docs.reduce((acc, doc) => {
                const data = doc.data();
                if (data.status === 'success' || data.status === 'Tamamlandı') {
                    return data.type === 'incoming' ? acc + Number(data.amount) : acc - Number(data.amount);
                }
                return acc;
             }, 0);
             currentBalance = calculatedBalance;
          }
          
          setBalance(currentBalance);
        } catch (err) {
          console.error("Bakiye okuma hatası:", err);
        }
      };
      fetchBalance();
    }
  }, [isOpen]);

  const handlePurchase = async () => {
    if (!auth.currentUser) return;
    setLoading(true);
    setError('');

    try {
      if (balance < plan.price) {
        throw new Error("Yetersiz bakiye. Lütfen cüzdanınıza para yükleyin.");
      }

      const userRef = doc(db, 'users', auth.currentUser.uid);
      
      // PARAYI DÜŞ VE PLANI GÜNCELLE
      // setDoc + merge: true kullanıyoruz, böylece kullanıcı yoksa bile oluşturulur.
      await setDoc(userRef, {
        walletBalance: increment(-plan.price), // Bakiyeden düş
        subscriptionPlan: plan.id
      }, { merge: true });

      alert(`Tebrikler! Hesabınız ${plan.name} paketine yükseltildi.`);
      onClose();
      window.location.reload(); 

    } catch (err: any) {
      setError(err.message || "Satın alma başarısız.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  let Icon = FiStar;
  let iconColor = 'from-purple-500 to-indigo-600';
  
  if (plan.id === 'starter') { Icon = FiZap; iconColor = 'from-blue-400 to-cyan-500'; }
  if (plan.id === 'enterprise') { Icon = FiShield; iconColor = 'from-gray-700 to-gray-900'; }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-white dark:bg-[#0F1629] w-full max-w-md rounded-3xl p-8 border border-gray-200 dark:border-white/10 shadow-2xl text-center"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><FiX size={24}/></button>
        
        <div className={`w-20 h-20 bg-gradient-to-tr ${iconColor} rounded-full flex items-center justify-center mx-auto mb-6 text-4xl text-white shadow-lg`}>
          <Icon />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name} Paketine Yükselt</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm px-4">
          {plan.description}
        </p>

        <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-5 text-left mb-6 space-y-3 border border-gray-100 dark:border-white/5 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-white/10 scrollbar-track-transparent">
            {plan.displayFeatures.map((feature, i) => (
                <div key={i} className={`flex items-start gap-3 text-sm font-medium ${feature.included ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 line-through'}`}>
                    {feature.included ? (
                        <FiCheck className="text-green-500 shrink-0 text-lg mt-0.5" />
                    ) : (
                        <FiX className="text-gray-400 shrink-0 text-lg mt-0.5" />
                    )}
                    {feature.text}
                </div>
            ))}
        </div>

        <div className="flex justify-between items-center mb-6 px-2 py-3 border-t border-b border-gray-100 dark:border-white/5">
            <div className="text-left">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Paket Tutarı</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">₺{plan.price}</p>
            </div>
            <div className="text-right">
                <p className="text-xs text-gray-400 uppercase tracking-wide">Cüzdan Bakiyesi</p>
                <p className={`text-xl font-bold ${balance >= plan.price ? 'text-green-500' : 'text-red-500'}`}>
                    ₺{balance.toLocaleString('tr-TR')}
                </p>
            </div>
        </div>

        {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs rounded-xl flex items-center gap-2">
                <FiAlertCircle className="text-lg shrink-0" /> {error}
            </div>
        )}

        {balance >= plan.price ? (
            <button 
                onClick={handlePurchase}
                disabled={loading}
                className={`w-full py-4 bg-gradient-to-r ${iconColor} hover:opacity-90 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70`}
            >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <FiCreditCard /> Hemen Yükselt
                  </>
                )}
            </button>
        ) : (
            <button 
                onClick={() => { onClose(); router.push('/panel/cuzdan'); }}
                className="w-full py-4 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            >
                <FiPlus /> Önce Bakiye Yükle
            </button>
        )}

      </motion.div>
    </div>
  );
}