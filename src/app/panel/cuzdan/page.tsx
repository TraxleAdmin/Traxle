'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowUpRight, FiArrowDownLeft, FiCreditCard, 
  FiDownload, FiPlus, FiActivity, FiMoreHorizontal,
  FiX, FiCheckCircle, FiLock, FiShield, FiDollarSign, FiSearch, FiFilter
} from 'react-icons/fi';
import * as XLSX from 'xlsx';
import { db, auth } from '@/lib/firebase';
import { collection, query, where, onSnapshot, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

// --- TİP TANIMLAMALARI ---
interface Transaction {
  id: string;
  title: string;
  desc: string;
  date: any; 
  amount: number;
  type: 'incoming' | 'outgoing';
  category: 'payment' | 'fuel' | 'maintenance' | 'shopping' | 'deposit' | 'other';
  status: string;
}

export default function WalletPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isAddBalanceModalOpen, setIsAddBalanceModalOpen] = useState(false);

  // --- FIREBASE DİNLEYİCİLERİ ---
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // 1. Bakiye Dinle
        const unsubUser = onSnapshot(doc(db, "users", currentUser.uid), (docSnap) => {
            if (docSnap.exists()) {
                setBalance(docSnap.data().walletBalance || docSnap.data().credits || 0);
            }
        });

        // 2. Yük ve Cüzdan Hareketlerini Birleştir
        const qLoads = query(collection(db, "loads"), where("createdBy", "==", currentUser.uid), where("status", "==", "Teslim Edildi"));
        const qTrans = query(collection(db, "transactions"), where("userId", "==", currentUser.uid));

        const unsubLoads = onSnapshot(qLoads, (snapLoads) => {
          const loadTransactions: Transaction[] = snapLoads.docs.map(doc => {
            const data = doc.data();
            const price = typeof data.price === 'string' ? parseFloat(data.price.replace(/[^0-9.-]+/g,"")) : data.price;
            return {
              id: doc.id,
              title: `${data.origin} - ${data.destination}`,
              desc: `Yük Teslimatı (#${data.displayId || doc.id.substring(0,6)})`,
              date: data.date, amount: price || 0, type: 'incoming', category: 'payment', status: 'Tamamlandı'
            };
          });

          onSnapshot(qTrans, (snapTrans) => {
             const walletTransactions: Transaction[] = snapTrans.docs.map(doc => {
                const data = doc.data();
                return {
                   id: doc.id,
                   title: data.title || 'İşlem',
                   desc: data.description,
                   date: data.date || data.createdAt,
                   amount: data.amount,
                   type: data.type, 
                   category: data.category || 'other',
                   status: data.status === 'completed' ? 'Tamamlandı' : data.status
                } as Transaction;
             });

             const allTransactions = [...loadTransactions, ...walletTransactions].sort((a, b) => {
                const dateA = a.date?.toDate ? a.date.toDate() : new Date(a.date || 0);
                const dateB = b.date?.toDate ? b.date.toDate() : new Date(b.date || 0);
                return dateB.getTime() - dateA.getTime();
             });

             setTransactions(allTransactions);
             setLoading(false);
          });
        });
        
        return () => { unsubUser(); unsubLoads(); };
      }
    });
    return () => unsubscribeAuth();
  }, []);

  // --- EXCEL İNDİRME ---
  const handleDownloadStatement = () => {
    const worksheet = XLSX.utils.json_to_sheet(transactions.map(tx => ({
      'İşlem': tx.title, 'Açıklama': tx.desc, 'Tutar': tx.amount, 'Tarih': tx.date?.toDate ? tx.date.toDate().toLocaleDateString('tr-TR') : '-'
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ekstre");
    XLSX.writeFile(workbook, `Traxle_Ekstre.xlsx`);
  };

  const formatDate = (timestamp: any) => timestamp?.toDate ? timestamp.toDate().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }) : '-';
  const incomeThisMonth = transactions.filter(t => t.type === 'incoming').reduce((acc, curr) => acc + Number(curr.amount), 0);
  const expenseThisMonth = transactions.filter(t => t.type === 'outgoing').reduce((acc, curr) => acc + Number(curr.amount), 0);

  return (
    <div className="space-y-8 pb-20 relative px-2 md:px-0">
      
      <PaymentModal 
        isOpen={isAddBalanceModalOpen} 
        onClose={() => setIsAddBalanceModalOpen(false)} 
        user={user}
      />

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">CÜZDAN</motion.div>
           <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Finansal Durum</motion.h1>
        </div>
        <div className="flex gap-3">
           <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleDownloadStatement} disabled={transactions.length === 0} className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-[#11131F] border border-gray-200 dark:border-white/10 rounded-full font-bold text-sm text-gray-700 dark:text-gray-200 shadow-sm disabled:opacity-50 transition-all hover:bg-gray-50 dark:hover:bg-white/5">
              <FiDownload /> <span className="hidden sm:inline">Ekstre</span>
           </motion.button>
           <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsAddBalanceModalOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-sm shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all">
              <FiPlus className="text-lg" /> <span>Bakiye Yükle</span>
           </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         
         {/* --- LEFT: DIGITAL CARD (3D Effect) --- */}
         <div className="lg:col-span-4 perspective-1000">
             <PremiumCard balance={balance} userName={user?.displayName || "Kullanıcı"} />
             
             {/* Mini Stats under card */}
             <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white dark:bg-[#11131F] p-4 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mb-2"><FiArrowDownLeft /></div>
                    <div className="text-xs text-gray-500 font-medium">Gelir</div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">₺{incomeThisMonth.toLocaleString()}</div>
                </div>
                <div className="bg-white dark:bg-[#11131F] p-4 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mb-2"><FiArrowUpRight /></div>
                    <div className="text-xs text-gray-500 font-medium">Gider</div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">₺{expenseThisMonth.toLocaleString()}</div>
                </div>
             </div>
         </div>

         {/* --- RIGHT: TRANSACTION LIST (Spotify Style) --- */}
         <div className="lg:col-span-8">
            <div className="bg-white dark:bg-[#11131F] border border-gray-200 dark:border-white/5 rounded-[32px] p-8 min-h-[500px] flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <FiActivity className="text-blue-500" /> Hesap Hareketleri
                    </h3>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full text-gray-400 transition-colors"><FiSearch /></button>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full text-gray-400 transition-colors"><FiFilter /></button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-4">
                        <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                        <span className="text-sm">Veriler yükleniyor...</span>
                    </div>
                ) : transactions.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-4">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center text-2xl opacity-50"><FiCreditCard /></div>
                        <span className="text-sm">Henüz bir işlem yok.</span>
                    </div>
                ) : (
                    <div className="space-y-1">
                        {/* Liste Başlıkları (Spotify tarzı) */}
                        <div className="grid grid-cols-12 text-xs font-bold text-gray-400 uppercase tracking-wider px-4 pb-2 border-b border-gray-100 dark:border-white/5 mb-2">
                            <div className="col-span-6 md:col-span-5">İşlem</div>
                            <div className="col-span-3 hidden md:block">Kategori</div>
                            <div className="col-span-3 md:col-span-2 text-right md:text-left">Tarih</div>
                            <div className="col-span-3 md:col-span-2 text-right">Tutar</div>
                        </div>
                        
                        {/* Liste Elemanları */}
                        <div className="overflow-y-auto max-h-[500px] custom-scrollbar pr-2">
                             {transactions.map((tx, i) => (
                                 <motion.div 
                                    key={tx.id} 
                                    initial={{ opacity: 0, y: 10 }} 
                                    animate={{ opacity: 1, y: 0 }} 
                                    transition={{ delay: i * 0.05 }}
                                    className="group grid grid-cols-12 items-center px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                                 >
                                     <div className="col-span-6 md:col-span-5 flex items-center gap-4">
                                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${
                                             tx.type === 'incoming' 
                                             ? 'bg-green-500/10 text-green-500 dark:text-green-400' 
                                             : 'bg-orange-500/10 text-orange-500 dark:text-orange-400'
                                         }`}>
                                             {tx.type === 'incoming' ? <FiArrowDownLeft /> : <FiArrowUpRight />}
                                         </div>
                                         <div className="min-w-0">
                                             <h4 className="font-bold text-gray-900 dark:text-white text-sm truncate">{tx.title}</h4>
                                             <p className="text-xs text-gray-500 truncate group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">{tx.desc}</p>
                                         </div>
                                     </div>
                                     <div className="col-span-3 hidden md:block">
                                         <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 capitalize border border-gray-200 dark:border-white/5">
                                             {tx.category}
                                         </span>
                                     </div>
                                     <div className="col-span-3 md:col-span-2 text-right md:text-left text-xs text-gray-500 font-medium">
                                         {formatDate(tx.date)}
                                     </div>
                                     <div className={`col-span-3 md:col-span-2 text-right font-bold text-sm ${tx.type === 'incoming' ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                                         {tx.type === 'incoming' ? '+' : '-'}₺{tx.amount.toLocaleString()}
                                     </div>
                                 </motion.div>
                             ))}
                        </div>
                    </div>
                )}
            </div>
         </div>
      </div>
    </div>
  );
}

// --- PREMIUM 3D CARD COMPONENT ---
function PremiumCard({ balance, userName }: { balance: number, userName: string }) {
    return (
        <motion.div 
            initial={{ rotateX: 10, rotateY: 10 }}
            whileHover={{ rotateX: 0, rotateY: 0, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative w-full aspect-[1.586/1] rounded-[24px] overflow-hidden shadow-2xl shadow-blue-900/40 select-none"
        >
            {/* Background Gradient - Metalik Hissiyat */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#0B0F19] to-black"></div>
            
            {/* Ambient Glows */}
            <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[80%] bg-blue-600/30 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
            <div className="absolute bottom-[-30%] right-[-10%] w-[60%] h-[60%] bg-purple-600/20 rounded-full blur-[80px] pointer-events-none mix-blend-screen"></div>

            {/* Noise Texture (Doku) */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

            <div className="relative z-10 p-6 md:p-8 flex flex-col justify-between h-full text-white">
                <div className="flex justify-between items-start">
                    <span className="text-xl font-bold tracking-tighter flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xs">TR</div>
                        TRAXLE
                    </span>
                    <FiActivity className="text-2xl opacity-50 rotate-90" />
                </div>

                <div className="space-y-1">
                     {/* Chip Image */}
                     <div className="w-12 h-9 rounded-md bg-gradient-to-br from-yellow-200 to-yellow-500 mb-4 opacity-90 shadow-sm border border-yellow-600/30 flex items-center justify-center">
                        <div className="w-8 h-[1px] bg-black/10"></div>
                     </div>
                     
                     <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">TOPLAM BAKİYE</p>
                     <h2 className="text-3xl md:text-4xl font-mono font-bold tracking-tight drop-shadow-lg">
                        ₺{balance.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                     </h2>
                </div>

                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">KART SAHİBİ</p>
                        <p className="font-bold tracking-wider text-sm uppercase text-gray-200">{userName}</p>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center gap-2">
                           <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md"></div>
                           <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md -ml-4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

// --- IYZICO MODAL (NETFLIX PLAN STYLE) ---
function PaymentModal({ isOpen, onClose, user }: any) {
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  
    const presetAmounts = [
        { val: 1000, label: 'Başlangıç', desc: 'Acil ihtiyaçlar için.' },
        { val: 5000, label: 'Standart', desc: 'En çok tercih edilen.', popular: true },
        { val: 10000, label: 'Pro', desc: 'Yüksek hacimli işlemler.' }
    ];

    const handlePayment = async (e: React.FormEvent) => {
      e.preventDefault();
      const num = parseFloat(amount);
      if (isNaN(num) || num <= 0) return alert("Lütfen geçerli bir tutar girin.");
      
      setLoading(true);

      try {
        const res = await fetch('/api/payment/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ price: num, user: user })
        });

        const data = await res.json();

        if (data.status === 'success' && data.paymentPageUrl) {
            window.location.href = data.paymentPageUrl;
        } else {
            alert("Ödeme başlatılamadı: " + (data.errorMessage || "Bilinmeyen hata"));
            setLoading(false);
        }
      } catch (error) {
        console.error(error);
        alert("Bağlantı hatası.");
        setLoading(false);
      }
    };
  
    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
             <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="relative bg-white dark:bg-[#11131F] w-full max-w-lg rounded-[32px] p-8 border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden">
                <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors z-10 bg-gray-100 dark:bg-white/5 p-2 rounded-full"><FiX size={20}/></button>
                
                <form onSubmit={handlePayment}>
                  <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-blue-600/10 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
                          <FiCreditCard />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Bakiye Yükle</h2>
                      <p className="text-gray-500 text-sm mt-1">Güvenli ödeme altyapısı ile hesabına para ekle.</p>
                  </div>
                  
                  {/* Netflix Style Plan Selection */}
                  <div className="grid grid-cols-3 gap-3 mb-8">
                      {presetAmounts.map((item) => (
                          <div 
                            key={item.val}
                            onClick={() => { setAmount(item.val.toString()); setSelectedPlan(item.val); }}
                            className={`cursor-pointer relative p-4 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center text-center gap-1 ${
                                selectedPlan === item.val 
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                                : 'border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 hover:border-blue-200 dark:hover:border-white/20'
                            }`}
                          >
                              {item.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-blue-500/30">POPÜLER</span>}
                              <span className={`text-lg font-bold ${selectedPlan === item.val ? 'text-blue-700 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>₺{item.val.toLocaleString()}</span>
                              <span className="text-[10px] text-gray-500 font-medium">{item.label}</span>
                          </div>
                      ))}
                  </div>

                  <div className="mb-6">
                      <label className="block text-xs font-bold mb-2 text-gray-500 uppercase tracking-wider">Farklı Tutar Gir</label>
                      <div className="relative group">
                          <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-blue-500 transition-colors" />
                          <input 
                            type="number" 
                            value={amount} 
                            onChange={(e) => { setAmount(e.target.value); setSelectedPlan(null); }} 
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-[#050814] border border-gray-200 dark:border-white/10 rounded-2xl font-bold text-xl text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                            required 
                            placeholder="0.00" 
                          />
                      </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading} 
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-600/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                      {loading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                          <>Ödemeyi Tamamla <FiCreditCard className="group-hover:translate-x-1 transition-transform" /></>
                      )}
                  </button>
                  
                  <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                      <FiLock />
                      <span>256-bit SSL ile güvenli ödeme (Iyzico)</span>
                  </div>
                </form>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
}