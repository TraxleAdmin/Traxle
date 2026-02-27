'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiStar, FiCheckCircle, FiMessageSquare } from 'react-icons/fi';
import { db, auth } from '@/lib/firebase';
import { addDoc, collection, doc, runTransaction, serverTimestamp } from 'firebase/firestore';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;        // Hangi iş için?
  targetUserId: string; // Kimi puanlıyoruz? (Sürücü ise Yük Vereni, Yük Veren ise Sürücüyü)
  targetUserName: string;
}

export default function ReviewModal({ isOpen, onClose, jobId, targetUserId, targetUserName }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return alert("Lütfen en az 1 yıldız seçin.");
    if (!auth.currentUser) return;

    setLoading(true);

    try {
      // Transaction kullanarak atomik işlem yapıyoruz (Veri tutarlılığı için)
      await runTransaction(db, async (transaction) => {
        // 1. Hedef kullanıcının referansını al
        const userRef = doc(db, "users", targetUserId);
        const userDoc = await transaction.get(userRef);

        if (!userDoc.exists()) throw "Kullanıcı bulunamadı!";

        const userData = userDoc.data();
        const currentRating = userData.rating || 0;
        const currentCount = userData.reviewCount || 0;

        // 2. Yeni ortalamayı hesapla
        const newCount = currentCount + 1;
        const newRating = ((currentRating * currentCount) + rating) / newCount;

        // 3. Kullanıcı profilini güncelle
        transaction.update(userRef, {
          rating: newRating,
          reviewCount: newCount
        });

        // 4. Yorumu 'reviews' koleksiyonuna ekle
        const reviewRef = doc(collection(db, "reviews"));
        transaction.set(reviewRef, {
          jobId: jobId,
          reviewerId: auth.currentUser!.uid,
          reviewerName: auth.currentUser!.displayName || "Kullanıcı",
          targetId: targetUserId,
          rating: rating,
          comment: comment,
          createdAt: serverTimestamp()
        });
      });

      alert("Değerlendirmeniz kaydedildi! Teşekkürler.");
      onClose();
      setRating(0);
      setComment('');

    } catch (error) {
      console.error("Puanlama hatası:", error);
      alert("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        />
        <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} 
            className="relative bg-white dark:bg-[#1A1A1A] w-full max-w-md rounded-3xl p-8 border border-gray-200 dark:border-white/10 shadow-2xl text-center"
        >
          <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"><FiX size={24} /></button>
          
          <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            <FiStar className="fill-current" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Hizmeti Puanla</h2>
          <p className="text-sm text-gray-500 mb-6">
            <span className="font-bold text-gray-900 dark:text-white">{targetUserName}</span> ile deneyimin nasıldı?
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Yıldız Seçimi */}
            <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        onClick={() => setRating(star)}
                        className="text-3xl transition-transform hover:scale-110 focus:outline-none"
                    >
                        <FiStar 
                            className={`${(hoveredStar || rating) >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                        />
                    </button>
                ))}
            </div>
            <p className="text-sm font-bold text-blue-600 h-5">
                {rating === 1 && "Çok Kötü"}
                {rating === 2 && "Kötü"}
                {rating === 3 && "Orta"}
                {rating === 4 && "İyi"}
                {rating === 5 && "Mükemmel!"}
            </p>

            {/* Yorum Alanı */}
            <div className="relative">
                <FiMessageSquare className="absolute left-4 top-4 text-gray-400" />
                <textarea 
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Deneyimini kısaca anlat..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 dark:text-white resize-none"
                />
            </div>

            <button 
                type="submit" 
                disabled={loading || rating === 0}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? 'Kaydediliyor...' : <><FiCheckCircle /> Değerlendirmeyi Gönder</>}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}