'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiPlus, FiTool, FiMapPin, FiCalendar, FiSearch,
  FiTrash2, FiCheckCircle, FiEye, FiArrowRight
} from 'react-icons/fi';
import { db, auth } from '@/lib/firebase';
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import IncomingOffersModal from '@/components/IncomingOffersModal';

export default function MyLoadsPage() {
  const router = useRouter();
  const [loads, setLoads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLoadId, setSelectedLoadId] = useState<string | null>(null);
  const [selectedLoadTitle, setSelectedLoadTitle] = useState('');

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(collection(db, "loads"), where("createdBy", "==", user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const fetchedLoads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];
          fetchedLoads.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
          setLoads(fetchedLoads);
          setLoading(false);
        });
        return () => unsubscribe();
      } else { router.push('/giris'); }
    });
    return () => unsubscribeAuth();
  }, [router]);

  const handleDeleteLoad = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Bu kiralama talebini silmek istediğinize emin misiniz?")) await deleteDoc(doc(db, "loads", id));
  };

  const filteredLoads = loads.filter(load => {
    const matchesStatus = filterStatus === 'Tümü' || load.status === filterStatus;
    const matchesSearch = load.origin?.toLowerCase().includes(searchQuery.toLowerCase()) || load.destination?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const formatDate = (dateString: any) => dateString?.toDate ? new Date(dateString.toDate()).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' }) : '-';

  const tabs = [{ id: 'Tümü', label: 'Tümü' }, { id: 'Bekliyor', label: 'Bekleyenler' }, { id: 'Yolda', label: 'Sahada' }, { id: 'Teslim Edildi', label: 'Tamamlanan' }];

  return (
    <div className="space-y-8 pb-20 px-2 md:px-0">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">ŞANTİYE OPERASYON</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            Kiralama Yönetimi
            <span className="text-sm font-medium bg-gray-100 dark:bg-white/10 text-gray-500 px-3 py-1 rounded-full">{loads.length}</span>
          </motion.h1>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => router.push('/panel/yuk-piyasasi')} className="w-full md:w-auto px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2">
          <FiPlus size={22} /> Yeni Talep Oluştur
        </motion.button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-white dark:bg-[#11131F] p-2 rounded-[24px] border border-gray-200 dark:border-white/5 shadow-sm">
        <div className="flex p-1 bg-gray-100 dark:bg-black/20 rounded-xl overflow-x-auto w-full lg:w-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setFilterStatus(tab.id)} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${filterStatus === tab.id ? 'bg-white dark:bg-white/10 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>{tab.label}</button>
          ))}
        </div>
        <div className="relative w-full lg:w-80 group">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          <input type="text" placeholder="Şantiye ara..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" />
        </div>
      </div>

      <div className="bg-white dark:bg-[#11131F] border border-gray-200 dark:border-white/5 rounded-[32px] overflow-hidden min-h-[400px] shadow-sm relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center"><div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div></div>
        ) : filteredLoads.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center text-3xl text-gray-300 dark:text-gray-600 mb-4"><FiTool /></div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Talep Bulunamadı</h3>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-white/5">
            <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 bg-gray-50/50 dark:bg-white/5 text-xs font-bold text-gray-400 uppercase tracking-wider">
              <div className="col-span-4">Şantiye Bilgisi</div><div className="col-span-3">Tarih & Makine</div><div className="col-span-2">Bütçe</div><div className="col-span-2">Durum</div><div className="col-span-1 text-right">İşlem</div>
            </div>
            <AnimatePresence>
              {filteredLoads.map((load, index) => (
                <motion.div key={load.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} transition={{ delay: index * 0.05 }} className="group grid grid-cols-1 md:grid-cols-12 gap-4 px-6 md:px-8 py-5 items-center hover:bg-blue-50/30 dark:hover:bg-white/5 transition-colors cursor-pointer relative">
                  <div className="col-span-1 md:col-span-4 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${load.status === 'Yolda' ? 'bg-blue-100 text-blue-600 animate-pulse' : load.status === 'Teslim Edildi' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500 dark:bg-white/10'}`}>
                      {load.status === 'Yolda' ? <FiTool /> : load.status === 'Teslim Edildi' ? <FiCheckCircle /> : <FiTool />}
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="flex items-center gap-2 mb-1"><span className="font-bold text-gray-900 dark:text-white truncate max-w-[100px]">{load.origin}</span><FiArrowRight className="text-gray-400 text-xs" /><span className="font-bold text-gray-900 dark:text-white truncate max-w-[100px]">{load.destination}</span></div>
                      <div className="w-full h-1 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden relative"><div className={`h-full rounded-full ${load.status === 'Yolda' ? 'w-1/2 bg-blue-500' : load.status === 'Teslim Edildi' ? 'w-full bg-green-500' : 'w-0'}`}></div></div>
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-3 flex md:flex-col gap-4 md:gap-1 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400"><FiCalendar className="text-gray-400" /> <span className="font-medium">{formatDate(load.pickupDate)}</span></div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs"><FiTool className="text-gray-400" /><span>{load.vehicleType}</span></div>
                  </div>
                  <div className="col-span-1 md:col-span-2"><span className="text-lg font-bold text-gray-900 dark:text-white font-mono tracking-tight">₺{load.price?.toLocaleString()}</span></div>
                  <div className="col-span-1 md:col-span-2 flex items-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1.5 border ${load.status === 'Bekliyor' ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20' : load.status === 'Yolda' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20' : 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${load.status === 'Bekliyor' ? 'bg-yellow-500' : load.status === 'Yolda' ? 'bg-blue-500 animate-ping' : 'bg-green-500'}`}></span>
                      {load.status === 'Yolda' ? 'Sahada' : load.status}
                    </span>
                  </div>
                  <div className="col-span-1 flex items-center justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                    {load.status === 'Bekliyor' && <button onClick={() => { setSelectedLoadId(load.id); setSelectedLoadTitle(`${load.origin} Şantiyesi`); }} className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-lg"><FiEye /></button>}
                    <button onClick={(e) => handleDeleteLoad(load.id, e)} className="p-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg"><FiTrash2 /></button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {selectedLoadId && (
        <IncomingOffersModal isOpen={!!selectedLoadId} onClose={() => setSelectedLoadId(null)} loadId={selectedLoadId} loadTitle={selectedLoadTitle} />
      )}
    </div>
  );
}