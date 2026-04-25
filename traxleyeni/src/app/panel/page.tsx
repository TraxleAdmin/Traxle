'use client';

import React, { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { FiSmartphone, FiShield, FiZap } from 'react-icons/fi';
import DownloadButtons from '@/components/DownloadButtons';

export default function PanelHome() {
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
        } catch (error) {
          console.error("Veri çekme hatası:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return (
    <div className="flex h-[80vh] items-center justify-center">
      <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );

  const firmName = userData?.companyName || userData?.name?.split(' ')[0] || 'Yetkili';

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-10">

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-4xl bg-white dark:bg-[#0A0A0A] rounded-[3rem] p-10 md:p-16 border border-gray-200 dark:border-white/5 shadow-2xl text-center overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="relative z-10">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl shadow-inner border border-blue-200 dark:border-blue-500/30">
            <FiSmartphone />
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            Hoş geldin, {firmName} 👋
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Traxle platformunda tüm operasyonel süreçler (İş makinesi kiralama ilanı açma, dijital sözleşme onayı ve güvenli ödeme/havuz yönetimi) saha güvenliği gereği sadece <strong>Traxle Mobil Uygulaması</strong> üzerinden yapılmaktadır.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12 text-left">
            <div className="bg-gray-50 dark:bg-white/5 p-5 rounded-2xl border border-gray-100 dark:border-white/5 flex items-start gap-4">
              <div className="mt-1 text-green-500"><FiShield size={20} /></div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">Şantiye & Cihaz Güvenliği</h4>
                <p className="text-xs text-gray-500 mt-1">Sistemimiz, sahte kurumsal işlemleri önlemek için sadece mobil cihaz donanım kimlikleriyle çalışır.</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-white/5 p-5 rounded-2xl border border-gray-100 dark:border-white/5 flex items-start gap-4">
              <div className="mt-1 text-blue-500"><FiZap size={20} /></div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">Anlık Bildirimler</h4>
                <p className="text-xs text-gray-500 mt-1">Yeni kiralama talepleri ve havuz hesabınıza düşen ödemeler telefonunuza anında (Push Notification) düşer.</p>
              </div>
            </div>
          </div>

          <div className="inline-block border-t border-gray-200 dark:border-white/10 pt-10 w-full">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Operasyona Başlamak İçin Uygulamayı İndirin</h3>
            <div className="flex justify-center transform scale-110">
              <DownloadButtons />
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
}