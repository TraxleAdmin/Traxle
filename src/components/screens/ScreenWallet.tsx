'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

function Counter({ value }: { value: number }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(value - 1000);
  const springValue = useSpring(motionValue, { damping: 100, stiffness: 100 });
  const rounded = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => { motionValue.set(value); }, [value, motionValue]);
  useEffect(() => {
    return rounded.on("change", (latest) => {
      if (ref.current) ref.current.textContent = latest.toLocaleString('tr-TR');
    });
  }, [rounded]);
  return <span ref={ref} />;
}

export default function ScreenWallet() {
  const [balance, setBalance] = useState(138500);
  const [transactions, setTransactions] = useState([
    { id: 1, title: "Hamburg Lojistik", amount: "+₺12.400", time: "2sa önce", type: "in" },
    { id: 2, title: "Shell İstasyon", amount: "-₺3.200", time: "5sa önce", type: "out" },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
        setBalance(prev => prev + 4000);
        setTransactions(prev => [
            { id: 99, title: "Amazon Depo", amount: "+₺4.000", time: "Şimdi", type: "in", highlight: true },
            ...prev
        ]);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-full p-5 space-y-6 pt-12 text-center transition-colors duration-500
                    bg-gray-50 dark:bg-gradient-to-b dark:from-[#050814] dark:to-[#0A0F25]">
       
       {/* Bakiye Alanı */}
       <div className="space-y-1 text-center relative">
          <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-widest">Toplam Bakiye</p>
          <div className="text-4xl font-bold tracking-tight flex justify-center items-center gap-1 text-gray-900 dark:text-white">
             ₺<Counter value={balance} />
          </div>
          <AnimatePresence>
             {balance > 138500 && (
                 <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="absolute -right-2 top-0 bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                 >+4.000</motion.div>
             )}
          </AnimatePresence>
       </div>

       {/* Grafik */}
       <div className="w-full h-24 rounded-2xl flex items-end p-2 gap-1 overflow-hidden relative border 
                       bg-blue-50 border-blue-100 
                       dark:bg-blue-600/10 dark:border-white/5">
          {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
              <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} transition={{ delay: i * 0.1 }} 
                          className="flex-1 bg-blue-500 rounded-t-sm opacity-80" />
          ))}
       </div>

       {/* Liste */}
       <div className="flex-1 overflow-hidden">
          <div className="space-y-3">
             <AnimatePresence>
                 {transactions.slice(0,3).map((tx) => (
                     <motion.div
                        key={tx.id} layout initial={{ opacity: 0, x: -20 }} 
                        animate={{ 
                            opacity: 1, x: 0, 
                            backgroundColor: (tx as any).highlight 
                                ? "rgba(34, 197, 94, 0.1)" // Yeşil vurgu (ortak)
                                : "var(--bg-card)" // Aşağıda stil ile atanacak
                        }}
                        className={`p-3 rounded-xl flex justify-between items-center border shadow-sm dark:shadow-none
                                   bg-white border-gray-200 
                                   dark:bg-white/5 dark:border-white/5
                                   ${(tx as any).highlight ? 'border-green-500/30 ring-1 ring-green-500/30' : ''}`}
                     >
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm 
                                            ${tx.type === 'in' 
                                                ? 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400' 
                                                : 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400'}`}>
                                {tx.type === 'in' ? '↓' : '↑'}
                            </div>
                            <div className="text-left">
                                <p className="text-gray-900 dark:text-white text-xs font-bold">{tx.title}</p>
                            </div>
                        </div>
                        <span className={`text-xs font-bold ${tx.type === 'in' ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                            {tx.amount}
                        </span>
                     </motion.div>
                 ))}
             </AnimatePresence>
          </div>
       </div>
    </div>
  );
}