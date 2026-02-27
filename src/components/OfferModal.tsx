'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheckCircle, FiDollarSign, FiMessageSquare, FiSend, FiAlertCircle } from 'react-icons/fi';
import { db, auth } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { checkSubscriptionLimit } from '@/lib/subscription'; // Limit kontrolü

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  loadId: string;
  loadTitle: string; // Örn: "İstanbul - Ankara"
}

export default function OfferModal({ isOpen, onClose, loadId, loadTitle }: OfferModalProps) {
  const [price, setPrice] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    setLoading(true);
    setError('');

    try {
      // 1. Limit Kontrolü (Gelecekte aktif edilecek)
      // const limitCheck = await checkSubscriptionLimit(auth.currentUser.uid, 'make_offer');
      // if (!limitCheck.success) throw new Error(limitCheck.message);

      // 2. Teklifi Kaydet
      await addDoc(collection(db, "offers"), {
        loadId: loadId,
        bidderId: auth.currentUser.uid,
        bidderName: auth.currentUser.displayName || 'Sürücü',
        amount: parseFloat(price),
        note: note,
        status: 'pending', // Beklemede
        createdAt: serverTimestamp()
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setPrice('');
        setNote('');
        onClose();
      }, 2000);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Teklif gönderilemedi.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Arka Plan Blur */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal İçeriği */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }} 
          animate={{ scale: 1, opacity: 1, y: 0 }} 
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative bg-white dark:bg-[#1A1A1A] w-full max-w-md rounded-3xl p-8 border border-gray-200 dark:border-white/10 shadow-2xl"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
            <FiX size={24} />
          </button>

          {success ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 text-green-600 rounded-full flex items-center justify-center mb-4">
                <FiCheckCircle size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Teklif Gönderildi!</h3>
              <p className="text-gray-500 mt-2">Yük sahibi teklifini değerlendirecek.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Teklif Ver</h3>
                <p className="text-sm text-gray-500 mt-1">
                  <span className="font-bold text-blue-600">{loadTitle}</span> için fiyat veriyorsunuz.
                </p>
              </div>

              {/* Fiyat Girişi */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Teklif Tutarı (TL)</label>
                <div className="relative">
                  <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input 
                    type="number" 
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Örn: 15000"
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-4 pl-12 pr-4 text-xl font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Not Girişi */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Sürücü Notu (Opsiyonel)</label>
                <div className="relative">
                  <FiMessageSquare className="absolute left-4 top-4 text-gray-400" />
                  <textarea 
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Ne zaman yükleyebileceğinizi belirtin..."
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 text-sm rounded-lg flex items-center gap-2">
                  <FiAlertCircle /> {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
              >
                {loading ? 'Gönderiliyor...' : <><FiSend /> Teklifi Gönder</>}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}