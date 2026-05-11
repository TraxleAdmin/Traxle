'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore'; // getCountFromServer YERİNE getDoc

export default function Stats() {
  // Başlangıç değerleri sıfır. Sahte veri yok.
  const [counts, setCounts] = useState({
    drivers: 0,
    loads: 0,
    cities: 81,
    satisfaction: 98
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        // 🔥 ARTIK BİNLERCE DOKÜMANI SAYMIYORUZ. SADECE 1 TANE PUBLIC DOKÜMANI OKUYORUZ.
        const statsRef = doc(db, "system", "stats");
        const statsSnap = await getDoc(statsRef);

        if (statsSnap.exists()) {
          const data = statsSnap.data();
          setCounts(prev => ({
            ...prev,
            drivers: data.totalDrivers || 0,
            loads: data.completedLoads || 0
          }));
        }
      } catch (error) {
        console.error("İstatistikler çekilemedi:", error);
      }
    }

    fetchStats();
  }, []);

  const statItems = [
    { label: 'Aktif Sürücü', value: counts.drivers, suffix: '+' },
    { label: 'Tamamlanan Yük', value: counts.loads, suffix: '+' },
    { label: 'Hizmet Verilen Şehir', value: counts.cities, suffix: '' },
    { label: 'Müşteri Memnuniyeti', value: counts.satisfaction, suffix: '%' },
  ];

  return (
    <div className="border-y border-gray-200 dark:border-white/5 bg-white dark:bg-[#0B0F19] py-12 relative z-10 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
           {statItems.map((stat, i) => (
             <div key={i} className="text-center group cursor-default">
                <h4 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  <AnimatedNumber value={stat.value} />
                  <span className="text-3xl ml-1">{stat.suffix}</span>
                </h4>
                <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                  {stat.label}
                </p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}

function AnimatedNumber({ value }: { value: number }) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (value === 0) {
            setDisplayValue(0);
            return;
        }

        let startTimestamp: number | null = null;
        const duration = 2000; 

        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            setDisplayValue(Math.floor(progress * value));
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }, [value]);

    return <span>{displayValue.toLocaleString('tr-TR')}</span>;
}