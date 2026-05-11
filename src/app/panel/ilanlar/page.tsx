'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiTruck, FiBox, FiDollarSign, FiSend, FiArrowRight } from 'react-icons/fi';
import { db, auth } from '@/lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import OfferModal from '@/components/OfferModal'; // Daha önce yazdığımız modal!

export default function AvailableLoadsPage() {
  const [loads, setLoads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLoad, setSelectedLoad] = useState<any>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 🔥 SİHİRLİ SORGGU: Sadece "Bekliyor" statüsündeki boştaki yükleri çek
        const q = query(collection(db, "loads"), where("status", "==", "Bekliyor"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const fetchedLoads = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setLoads(fetchedLoads);
          setLoading(false);
        });
        return () => unsubscribe();
      }
    });
    return () => unsubscribeAuth();
  }, []);

  return (
    <div className="space-y-8 pb-20 px-2 md:px-0">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">PİYASA</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
             Açık İlanlar
             <span className="text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full">{loads.length}</span>
          </motion.h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
            <div className="col-span-full flex justify-center py-20"><div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>
        ) : loads.length === 0 ? (
            <div className="col-span-full py-20 text-center bg-gray-50 dark:bg-white/5 rounded-[32px] border border-dashed border-gray-200 dark:border-white/10">
                <FiBox className="text-4xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Şu An Boşta Yük Yok</h3>
            </div>
        ) : (
            loads.map((load) => (
                <motion.div key={load.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-[#11131F] border border-gray-200 dark:border-white/5 rounded-[24px] p-6 shadow-sm hover:shadow-xl transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400 text-[10px] font-bold uppercase rounded-full border border-yellow-200 dark:border-yellow-500/20">Teklif Bekliyor</span>
                        <span className="font-mono text-sm text-gray-400">#{load.displayId || load.id.substring(0,6)}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        {load.origin} <FiArrowRight className="text-gray-400"/> {load.destination}
                    </h3>
                    <div className="space-y-2 mb-6 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2"><FiTruck /> {load.vehicleType}</div>
                        <div className="flex items-center gap-2"><FiBox /> {load.weight} Ton / {load.loadType}</div>
                        <div className="flex items-center gap-2 font-bold text-blue-600 dark:text-blue-400"><FiDollarSign /> {load.price.toLocaleString()} TL (İstenen)</div>
                    </div>
                    <button onClick={() => setSelectedLoad(load)} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-blue-500/20">
                        <FiSend /> Teklif Ver
                    </button>
                </motion.div>
            ))
        )}
      </div>

      {/* Önceden hazır olan Teklif Verme Modalı */}
      {selectedLoad && (
        <OfferModal
            isOpen={!!selectedLoad}
            onClose={() => setSelectedLoad(null)}
            loadId={selectedLoad.id}
            loadTitle={`${selectedLoad.origin} - ${selectedLoad.destination}`}
        />
      )}
    </div>
  );
}