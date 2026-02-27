'use client';

import { useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

// Ankara - İstanbul arası basit bir rota simülasyonu
const ROUTE_POINTS = [
    { lat: 39.9334, lng: 32.8597 }, // Ankara
    { lat: 40.1000, lng: 32.6000 },
    { lat: 40.4000, lng: 32.2000 },
    { lat: 40.7350, lng: 31.6000 }, // Bolu
    { lat: 40.8000, lng: 31.0000 },
    { lat: 40.8500, lng: 30.5000 }, // Sakarya
    { lat: 40.9500, lng: 29.5000 }, // Kocaeli
    { lat: 41.0082, lng: 28.9784 }  // İstanbul
];

export default function DriverSimulator() {
  useEffect(() => {
    let currentIndex = 0;
    
    const interval = setInterval(async () => {
      // Bir sonraki noktaya geç
      const point = ROUTE_POINTS[currentIndex];
      
      try {
        await updateDoc(doc(db, "tracking", "active-driver-1"), {
            lat: point.lat,
            lng: point.lng,
            speed: Math.floor(Math.random() * (90 - 70 + 1) + 70), // 70-90 km/h arası rastgele hız
            lastUpdated: new Date()
        });
      } catch (e) {
        // Hata olursa sessiz kal (Demo)
      }

      currentIndex = (currentIndex + 1) % ROUTE_POINTS.length; // Döngü başa dönsün
    }, 3000); // 3 saniyede bir güncelle

    return () => clearInterval(interval);
  }, []);

  // Bu bileşen görünmezdir, sadece arka planda çalışır
  return null;
}