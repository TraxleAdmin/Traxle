'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiBell, FiCheck, FiTruck, FiDollarSign, FiInfo, FiAlertTriangle, FiBox, FiTrash2, FiClock, FiActivity
} from 'react-icons/fi';
import { db, auth } from '@/lib/firebase';
import { collection, query, where, onSnapshot, orderBy, doc, updateDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

// --- TİP TANIMLAMASI ---
interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  category: 'load' | 'finance' | 'system' | 'driver';
  title: string;
  message: string;
  createdAt: any; // Firestore Timestamp
  read: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, unread, load, finance
  const [userId, setUserId] = useState<string | null>(null);

  // --- FIREBASE VERİ ÇEKME ---
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        
        // Kullanıcıya ait bildirimleri tarihe göre tersten çek
        const q = query(
            collection(db, "notifications"), 
            where("userId", "==", user.uid),
            // orderBy("createdAt", "desc") // Index hatası alırsan bu satırı geçici kapat
        );

        const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          const fetchedData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Notification[];
          
          // Client-side sıralama (Index hatası riskine karşı)
          fetchedData.sort((a, b) => {
              const timeA = a.createdAt?.seconds || 0;
              const timeB = b.createdAt?.seconds || 0;
              return timeB - timeA;
          });

          setNotifications(fetchedData);
          setLoading(false);
        });

        return () => unsubscribeSnapshot();
      } else {
          setLoading(false);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  // --- AKSİYONLAR ---

  const handleMarkAsRead = async (id: string, currentReadStatus: boolean) => {
      if (currentReadStatus) return; // Zaten okunmuşsa işlem yapma
      try {
          const ref = doc(db, "notifications", id);
          await updateDoc(ref, { read: true });
      } catch (error) { console.error("Hata:", error); }
  };

  const handleDelete = async (id: string) => {
      try {
          await deleteDoc(doc(db, "notifications", id));
      } catch (error) { console.error("Silme hatası:", error); }
  };

  const handleMarkAllRead = async () => {
      if (!userId || notifications.length === 0) return;
      
      // Batch işlemi ile toplu güncelleme
      const batch = writeBatch(db);
      const unreadNotes = notifications.filter(n => !n.read);
      
      unreadNotes.forEach(n => {
          const ref = doc(db, "notifications", n.id);
          batch.update(ref, { read: true });
      });

      await batch.commit();
  };

  // --- FİLTRELEME ---
  const filteredList = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    return n.category === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 px-4 md:px-0">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">GÜNCELLEMELER</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
             Bildirim Merkezi
             {unreadCount > 0 && (
                 <span className="text-sm font-bold bg-red-500 text-white px-3 py-1 rounded-full animate-pulse shadow-lg shadow-red-500/30">
                     {unreadCount} Yeni
                 </span>
             )}
          </motion.h1>
        </div>
        
        {unreadCount > 0 && (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMarkAllRead}
              className="px-5 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 text-gray-700 dark:text-white rounded-xl text-sm font-bold transition-colors flex items-center gap-2 shadow-sm"
            >
              <FiCheck className="text-lg text-blue-500" /> Tümünü Okundu Say
            </motion.button>
        )}
      </div>

      {/* --- SLIDING TABS (Kayan Filtreler) --- */}
      <div className="flex gap-1 p-1 bg-gray-100 dark:bg-[#11131F] rounded-2xl overflow-x-auto border border-gray-200 dark:border-white/5 w-full md:w-auto inline-flex">
          {[
            { id: 'all', label: 'Tümü' },
            { id: 'unread', label: 'Okunmamış' },
            { id: 'load', label: 'Yük & Lojistik' },
            { id: 'finance', label: 'Finans' },
            { id: 'system', label: 'Sistem' },
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-colors z-10 ${filter === tab.id ? 'text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              {filter === tab.id && (
                  <motion.div layoutId="activeTab" className="absolute inset-0 bg-white dark:bg-[#2A2A2A] rounded-xl shadow-sm border border-black/5 dark:border-white/5 -z-10" />
              )}
              {tab.label}
            </button>
          ))}
      </div>

      {/* --- LİSTE --- */}
      <div className="space-y-3 min-h-[400px]">
         {loading ? (
             <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div></div>
         ) : filteredList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-gray-50 dark:bg-white/5 rounded-[32px] border border-dashed border-gray-200 dark:border-white/10">
               <div className="w-20 h-20 bg-gray-200 dark:bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl opacity-50">
                  <FiBell />
               </div>
               <h3 className="text-lg font-bold text-gray-900 dark:text-white">Bildirim Yok</h3>
               <p className="text-sm">Şu an için bu kategoride görüntülenecek bir bildiriminiz bulunmuyor.</p>
            </div>
         ) : (
             <AnimatePresence>
                {filteredList.map((item, index) => (
                   <NotificationItem 
                     key={item.id} 
                     item={item} 
                     index={index}
                     onRead={() => handleMarkAsRead(item.id, item.read)}
                     onDelete={() => handleDelete(item.id)}
                   />
                ))}
             </AnimatePresence>
         )}
      </div>

    </div>
  );
}

// --- AKILLI BİLDİRİM KARTI ---
function NotificationItem({ item, index, onRead, onDelete }: any) {
  
  // Zamanı Formatla (Örn: "10 dk önce")
  const getTimeAgo = (timestamp: any) => {
      if (!timestamp) return '';
      const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

      if (diffInSeconds < 60) return 'Az önce';
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} dk önce`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} saat önce`;
      return `${Math.floor(diffInSeconds / 86400)} gün önce`;
  };

  const getStyle = (type: string, category: string) => {
     switch (type) {
       case 'success': return { icon: <FiCheck />, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/20' };
       case 'warning': return { icon: <FiAlertTriangle />, color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/20' };
       case 'error': return { icon: <FiInfo />, color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/20' };
       default: 
           if(category === 'finance') return { icon: <FiDollarSign />, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/20' };
           if(category === 'load') return { icon: <FiTruck />, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/20' };
           return { icon: <FiActivity />, color: 'text-gray-600', bg: 'bg-gray-100 dark:bg-white/10' };
     }
  };

  const style = getStyle(item.type, item.category);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onRead}
      className={`relative p-5 rounded-2xl border transition-all cursor-pointer group overflow-hidden
          ${item.read 
            ? 'bg-white dark:bg-[#11131F] border-gray-200 dark:border-white/5 opacity-60 hover:opacity-100' 
            : 'bg-white dark:bg-[#161b2c] border-blue-200 dark:border-blue-900/40 shadow-sm'}`}
    >
       {/* Okunmamış İndikatörü */}
       {!item.read && (
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600"></div>
       )}

       <div className="flex items-start gap-5">
          {/* İkon */}
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${style.bg} ${style.color}`}>
             {style.icon}
          </div>
          
          <div className="flex-1 pr-8">
             <div className="flex justify-between items-start">
                 <h4 className={`text-base font-bold mb-1 ${item.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>
                    {item.title}
                 </h4>
                 <span className="text-xs font-medium text-gray-400 flex items-center gap-1 whitespace-nowrap">
                    <FiClock size={10}/> {getTimeAgo(item.createdAt)}
                 </span>
             </div>
             
             <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.message}
             </p>
          </div>

          {/* Sil Butonu (Hover'da gelir) */}
          <button 
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="absolute bottom-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
              title="Bildirimi Sil"
          >
             <FiTrash2 size={18} />
          </button>
       </div>
    </motion.div>
  );
}