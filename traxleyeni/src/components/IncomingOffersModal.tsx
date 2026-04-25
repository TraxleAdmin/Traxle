'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheckCircle, FiUser, FiStar, FiDollarSign, FiMessageSquare, FiTruck } from 'react-icons/fi';
// 🔥 GÜNCELLEME 1: auth ve addDoc eklendi
import { db, auth } from '@/lib/firebase';
import { collection, query, where, onSnapshot, doc, updateDoc, writeBatch, serverTimestamp, addDoc } from 'firebase/firestore';

interface IncomingOffersModalProps {
  isOpen: boolean;
  onClose: () => void;
  loadId: string;
  loadTitle: string;
}

export default function IncomingOffersModal({ isOpen, onClose, loadId, loadTitle }: IncomingOffersModalProps) {
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- TEKLİFLERİ DİNLE ---
  useEffect(() => {
    if (!isOpen || !loadId) return;

    const q = query(collection(db, "offers"), where("loadId", "==", loadId), where("status", "==", "pending"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedOffers = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Fiyata göre sırala (En düşük en üstte)
      fetchedOffers.sort((a: any, b: any) => a.amount - b.amount);
      setOffers(fetchedOffers);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isOpen, loadId]);

  // 🔥 GÜNCELLEME 2: TEKLİF KABUL VE CANLI SOHBET BAŞLATMA MANTIĞI
  const handleAcceptOffer = async (offer: any) => {
    // Güvenlik kontrolü: Kullanıcı giriş yapmış mı?
    if (!auth.currentUser) {
        alert("İşlem yapmak için giriş yapmalısınız.");
        return;
    }

    if (!confirm(`${offer.bidderName} teklifini onaylıyor musunuz? Bu işlem sohbeti başlatacaktır.`)) return;

    try {
      const batch = writeBatch(db);

// 1. Yükü Güncelle (Sürücü Atandı ve Durum 'Yolda' oldu)
      const loadRef = doc(db, "loads", loadId);
      batch.update(loadRef, {
        status: "Yolda",
        driverId: offer.bidderId,
        driverName: offer.bidderName,
        price: offer.amount,        // 🔥 ÇÖZÜM: Ana fiyatı Sürücünün Teklifi ile eziyoruz!
        agreedPrice: offer.amount,  // Analitik için anlaşılan fiyatı da ayrıca tutuyoruz.
        assignedAt: serverTimestamp()
      });

      // 2. Kabul Edilen Teklifi 'accepted' yap
      const offerRef = doc(db, "offers", offer.id);
      batch.update(offerRef, { status: "accepted" });

      // 3. (Opsiyonel) Diğer teklifleri reddet (Clean Data)
      offers.forEach(o => {
          if (o.id !== offer.id) {
              const otherOfferRef = doc(db, "offers", o.id);
              batch.update(otherOfferRef, { status: 'rejected' });
          }
      });

      // 4. CANLI SOHBETİ BAŞLAT (Chat Dokümanı Oluştur)
      // "İş Yoksa Sohbet Yok" kuralı gereği, chat odasını tam şu an oluşturuyoruz.
      await addDoc(collection(db, "chats"), {
        participants: [auth.currentUser.uid, offer.bidderId],
        loadId: loadId,
        chatName: loadTitle, // Sohbet başlığı yükün rotası/adı olur
        lastMessage: "Sistem: Teklif kabul edildi. Operasyon başladı!",
        lastMessageTime: serverTimestamp(),
        createdAt: serverTimestamp(),
        users: {
          [auth.currentUser.uid]: auth.currentUser.displayName || "Yük Sahibi",
          [offer.bidderId]: offer.bidderName || "Sürücü"
        }
      });

      await batch.commit();

      alert("Sürücü atandı ve iletişim kanalı açıldı!");
      onClose();

    } catch (error) {
      console.error("Critical Error in Transaction:", error);
      alert("İşlem sırasında bir hata oluştu.");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="relative bg-white dark:bg-[#1A1A1A] w-full max-w-2xl rounded-3xl p-8 border border-gray-200 dark:border-white/10 shadow-2xl max-h-[80vh] overflow-y-auto"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Gelen Teklifler</h3>
              <p className="text-sm text-gray-500">{loadTitle} için sürücü adayları.</p>
            </div>
            <button onClick={onClose} className="p-2 bg-gray-100 dark:bg-white/5 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                <FiX size={20} />
            </button>
          </div>

          {loading ? (
            <div className="text-center py-10 text-gray-400 animate-pulse">Veriler çekiliyor...</div>
          ) : offers.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-white/5 rounded-2xl border-2 border-dashed border-gray-200 dark:border-white/5">
                <FiUser className="mx-auto text-4xl text-gray-300 mb-3" />
                <p className="text-gray-500">Bu ilana henüz bir teklif gelmedi.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {offers.map((offer) => (
                <div key={offer.id} className="bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 p-5 rounded-2xl flex flex-col md:flex-row items-center gap-4 hover:border-blue-500/30 transition-colors group">

                  {/* Sürücü Bilgisi */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center text-xl font-bold">
                        {offer.bidderName ? offer.bidderName.charAt(0) : 'S'}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                          {offer.bidderName}
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded flex items-center gap-1">
                              <FiStar size={10} className="fill-current" /> 4.9
                          </span>
                      </h4>
                      {offer.note && (
                          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                              <FiMessageSquare /> "{offer.note}"
                          </p>
                      )}
                    </div>
                  </div>

                  {/* Fiyat ve Aksiyon */}
                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-gray-100 dark:border-white/5 pt-4 md:pt-0">
                    <div className="text-right">
                      <p className="text-xs text-gray-400 uppercase font-bold">Teklif</p>
                      <p className="text-xl font-black text-gray-900 dark:text-white">₺{offer.amount.toLocaleString()}</p>
                    </div>
                    <button
                        onClick={() => handleAcceptOffer(offer)}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-500/20 transition-all active:scale-95 flex items-center gap-2"
                    >
                        <FiCheckCircle /> Kabul Et
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}