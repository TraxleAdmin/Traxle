'use client';

import React, { useState, useEffect } from 'react';
import { FiBell } from 'react-icons/fi';
import { db, auth } from '@/lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotificationBadge() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (!auth.currentUser) return;

    // Bekleyen teklifleri veya yeni mesajları dinle
    const q = query(
      collection(db, "offers"), 
      where("bidderId", "==", auth.currentUser.uid),
      where("status", "==", "accepted")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUnreadCount(snapshot.docs.length);
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), type: 'offer_accepted' }));
      setNotifications(list);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-blue-600 transition-colors"
      >
        <FiBell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#0F1629] border border-gray-100 dark:border-white/5 rounded-2xl shadow-2xl z-[1000] overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100 dark:border-white/5 font-bold text-sm">Bildirimler</div>
            <div className="max-h-60 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-400 text-xs">Yeni bildirim yok.</div>
              ) : (
                notifications.map(n => (
                  <div key={n.id} className="p-4 hover:bg-gray-50 dark:hover:bg-white/5 border-b border-gray-50 dark:border-white/5 transition-colors cursor-pointer">
                    <p className="text-xs text-gray-900 dark:text-white font-bold">🎉 Teklifin Kabul Edildi!</p>
                    <p className="text-[10px] text-gray-500 mt-1">Hemen sohbet başlatıp detayları konuşabilirsin.</p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}