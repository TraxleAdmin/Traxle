'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, FiUser, FiPhone, FiTruck, FiMapPin, FiStar, FiMessageSquare, FiShield, FiBriefcase, FiCalendar, FiFilter
} from 'react-icons/fi';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

// --- TİP TANIMLAMALARI ---
interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleType?: string;
  plateNumber?: string;
  status?: 'Müsait' | 'Yolda' | 'Çevrimdışı' | 'İzinde';
  rating?: number;
  totalTrips?: number;
  createdAt?: any; // Firestore Timestamp
  city?: string;
  photoURL?: string;
}

export default function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tümü');

  // --- FIREBASE GERÇEK VERİ ÇEKME ---
  useEffect(() => {
    // 'users' koleksiyonunda rolü 'driver' olanları getir
    const q = query(
      collection(db, "users"),
      where("role", "==", "driver")
      // Not: Eğer index hatası alırsan orderBy'ı geçici olarak kaldır
      // orderBy("createdAt", "desc") 
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedDrivers = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Driver[];
      
      setDrivers(fetchedDrivers);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // --- FİLTRELEME ---
  const filteredDrivers = drivers.filter(driver => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      (driver.name?.toLowerCase() || '').includes(term) ||
      (driver.plateNumber?.toLowerCase() || '').includes(term) ||
      (driver.phone || '').includes(term);
    
    // Veritabanında status yoksa varsayılan 'Çevrimdışı' kabul et
    const driverStatus = driver.status || 'Çevrimdışı';
    const matchesStatus = filterStatus === 'Tümü' || driverStatus === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const tabs = ['Tümü', 'Müsait', 'Yolda', 'Çevrimdışı'];

  return (
    <div className="space-y-8 pb-20 px-2 md:px-0">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">İNSAN KAYNAKLARI</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
             Sürücü Havuzu
             <span className="text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-500/20">{drivers.length}</span>
          </motion.h1>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-white dark:bg-[#11131F] p-2 rounded-[24px] border border-gray-200 dark:border-white/5 shadow-sm">
         {/* TABS */}
         <div className="flex p-1 bg-gray-100 dark:bg-black/20 rounded-xl overflow-x-auto w-full lg:w-auto scrollbar-hide">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setFilterStatus(tab)}
                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                        filterStatus === tab 
                        ? 'bg-white dark:bg-white/10 text-gray-900 dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10' 
                        : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                >
                    {tab}
                </button>
            ))}
         </div>

         {/* SEARCH */}
         <div className="relative w-full lg:w-96 group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
                type="text" 
                placeholder="İsim, plaka veya telefon ile ara..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
         </div>
      </div>

      {/* LISTE */}
      {loading ? (
         <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div></div>
      ) : filteredDrivers.length === 0 ? (
         <div className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-[32px] border border-dashed border-gray-200 dark:border-white/10">
            <FiUser className="text-4xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Sürücü Bulunamadı</h3>
            <p className="text-gray-500 text-sm">Arama kriterlerinize uygun sürücü yok.</p>
         </div>
      ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence>
                {filteredDrivers.map((driver, index) => (
                    <ProfessionalIDCard key={driver.id} driver={driver} index={index} />
                ))}
            </AnimatePresence>
         </div>
      )}

    </div>
  );
}

// --- PROFESYONEL KİMLİK KARTI ---
function ProfessionalIDCard({ driver, index }: { driver: Driver, index: number }) {
    const status = driver.status || 'Çevrimdışı';
    const rating = driver.rating || 5.0;
    const trips = driver.totalTrips || 0;
    
    // Firestore Timestamp dönüşümü
    const joinYear = driver.createdAt?.seconds 
        ? new Date(driver.createdAt.seconds * 1000).getFullYear() 
        : new Date().getFullYear();
        
    const city = driver.city || 'Konum Yok';

    const statusConfig: any = {
        'Müsait': { color: 'bg-green-500', bg: 'bg-green-50' },
        'Yolda': { color: 'bg-blue-500', bg: 'bg-blue-50' },
        'Çevrimdışı': { color: 'bg-gray-400', bg: 'bg-gray-50' },
        'İzinde': { color: 'bg-orange-500', bg: 'bg-orange-50' },
    };

    const currentStatus = statusConfig[status] || statusConfig['Çevrimdışı'];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.05 }}
            className="group relative bg-white dark:bg-[#11131F] rounded-[24px] overflow-hidden border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300"
        >
            {/* Header Gradient */}
            <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                <div className="absolute top-4 right-4 text-white/20 text-4xl font-black italic tracking-tighter select-none">TRAXLE</div>
            </div>

            {/* Avatar & Badge */}
            <div className="px-6 relative flex justify-between items-end -mt-12 mb-4">
                <div className="relative">
                    <div className="w-24 h-24 rounded-2xl bg-white dark:bg-[#11131F] p-1 shadow-lg">
                        <div className="w-full h-full rounded-xl bg-gray-200 dark:bg-white/10 flex items-center justify-center overflow-hidden relative">
                             {driver.photoURL ? (
                                 <img src={driver.photoURL} alt={driver.name} className="w-full h-full object-cover" />
                             ) : (
                                 <span className="text-3xl font-bold text-gray-400 select-none">{driver.name ? driver.name.charAt(0).toUpperCase() : '?'}</span>
                             )}
                        </div>
                    </div>
                    {/* Status Dot */}
                    <span className="absolute -bottom-1 -right-1 flex h-5 w-5">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${currentStatus.color}`}></span>
                        <span className={`relative inline-flex rounded-full h-5 w-5 border-2 border-white dark:border-[#11131F] ${currentStatus.color}`}></span>
                    </span>
                </div>
                
                <div className="mb-1 flex flex-col items-end">
                     <div className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border border-blue-100 dark:border-blue-500/20">
                         <FiShield className="text-xs" /> Onaylı Sürücü
                     </div>
                </div>
            </div>

            {/* Info */}
            <div className="px-6 pb-6">
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">{driver.name || 'İsimsiz Sürücü'}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <FiMapPin size={14} /> {city}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                    <div className="bg-gray-50 dark:bg-white/5 p-2 rounded-xl text-center border border-gray-100 dark:border-white/5">
                        <div className="flex items-center justify-center gap-1 text-yellow-500 font-bold text-lg"><FiStar className="fill-current" /> {rating.toFixed(1)}</div>
                        <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Puan</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-white/5 p-2 rounded-xl text-center border border-gray-100 dark:border-white/5">
                        <div className="text-gray-900 dark:text-white font-bold text-lg flex items-center justify-center gap-1"><FiBriefcase className="text-blue-500 text-sm" /> {trips}</div>
                        <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Sefer</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-white/5 p-2 rounded-xl text-center border border-gray-100 dark:border-white/5">
                        <div className="text-gray-900 dark:text-white font-bold text-lg flex items-center justify-center gap-1"><FiCalendar className="text-purple-500 text-sm" /> {joinYear}</div>
                        <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Kayıt</div>
                    </div>
                </div>

                {/* Vehicle & Plate */}
                <div className="flex items-center justify-between bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-white/5 mb-6">
                     <div className="flex items-center gap-2">
                         <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-gray-500"><FiTruck /></div>
                         <div className="flex flex-col">
                             <span className="text-[10px] text-gray-400 font-bold uppercase">Araç Tipi</span>
                             <span className="text-xs font-bold text-gray-900 dark:text-white truncate max-w-[100px]">{driver.vehicleType || 'Belirsiz'}</span>
                         </div>
                     </div>
                     <div className="border-2 border-black/10 dark:border-white/20 rounded-md flex overflow-hidden h-8 bg-white shadow-sm">
                         <div className="bg-blue-600 w-6 flex flex-col items-center justify-end pb-0.5"><span className="text-[6px] font-bold text-white">TR</span></div>
                         <div className="px-2 flex items-center justify-center"><span className="font-mono font-bold text-gray-900 text-sm tracking-wider">{driver.plateNumber || '---'}</span></div>
                     </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => driver.phone && (window.location.href = `tel:${driver.phone}`)} className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/20 active:scale-95 transition-all"><FiPhone /> Ara</button>
                    <button onClick={() => alert('Mesajlaşma yakında!')} className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 active:scale-95 transition-all"><FiMessageSquare /> Mesaj</button>
                </div>

            </div>
        </motion.div>
    );
}