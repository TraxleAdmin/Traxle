'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '@/lib/firebase';
import { deleteUser } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { FiTrash2, FiX } from 'react-icons/fi';

// TypeScript Hatasını çözen Interface kısmı (Hangi verileri alacağını tanımlıyoruz)
interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
  userPhone?: string;
}

export default function DeleteAccountModal({ isOpen, onClose, userEmail, userPhone }: DeleteAccountModalProps) {
  const [confirmationText, setConfirmationText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    setError(null);
    setLoading(true);
    const user = auth.currentUser;

    if (!user) return;

    try {
      await deleteUser(user);
      router.push('/'); // Silince ana sayfaya at
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/requires-recent-login') {
        setError("Güvenlik gereği hesabınızı silmek için oturumu kapatıp tekrar giriş yapmalısınız.");
      } else {
        setError("Bir hata oluştu: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // isOpen "false" ise componenti hiç render etme (Görünmez yap)
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
        
        {/* Arka Plan Karartma */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white dark:bg-[#1A1A1A] rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5">
            <FiX size={24} />
          </button>
          
          <div className="p-8 pb-0 text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center text-red-600 dark:text-red-400 text-3xl mx-auto mb-4">
              <FiTrash2 />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Hesabınızı Siliyor musunuz?
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Bu işlem geri alınamaz. Onaylamak için lütfen aşağıya <br/>
              <span className="font-black text-gray-900 dark:text-white select-all bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded">SIL</span> yazın.
            </p>
            {/* Parent'tan gelen veriyi gösteriyoruz */}
            {userEmail && <p className="text-xs text-gray-500 mt-4 opacity-70">Hedef Hesap: {userEmail}</p>}
          </div>

          <div className="p-8 pt-6">
            <input
              type="text"
              placeholder="SIL"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-black/50 focus:ring-2 focus:ring-red-500 outline-none transition-all font-bold text-center tracking-[0.5em] uppercase text-lg text-gray-900 dark:text-white"
            />
            
            {error && (
              <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs rounded-lg text-center font-medium">
                {error}
              </div>
            )}

            <button
              onClick={handleDelete}
              disabled={confirmationText !== 'SIL' || loading}
              className="w-full mt-6 py-4 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg shadow-red-600/20"
            >
              {loading ? 'Siliniyor...' : 'Hesabımı Kalıcı Olarak Sil'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}