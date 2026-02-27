'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMapPin, FiCalendar, FiBox, FiTruck, FiDollarSign, FiCheck, FiArrowRight, FiArrowLeft, FiInfo, FiLayers, FiActivity
} from 'react-icons/fi';
import { db, auth } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

// --- DATA & TYPES ---
const VEHICLE_OPTIONS = [
    { id: 'panelvan', label: 'Panelvan', capacity: '1.5 Ton', icon: <FiTruck />, basePrice: 2000 },
    { id: 'kamyonet', label: 'Kamyonet', capacity: '3.5 Ton', icon: <FiTruck />, basePrice: 3500 },
    { id: 'kamyon', label: 'Kamyon (10 Teker)', capacity: '15 Ton', icon: <FiTruck />, basePrice: 7000 },
    { id: 'kirkayak', label: 'Kırkayak', capacity: '20 Ton', icon: <FiTruck />, basePrice: 9000 },
    { id: 'tir', label: 'Tır (Tenteli)', capacity: '25 Ton', icon: <FiTruck />, basePrice: 12000 },
    { id: 'frigo', label: 'Tır (Frigo)', capacity: '24 Ton', icon: <FiBox />, basePrice: 14000 },
];

const LOAD_TYPES = ["Paletli", "Koli", "Dökme", "Ev Eşyası", "Makine", "Gıda", "Diğer"];

export default function CreateLoadPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
      origin: '',
      destination: '',
      pickupDate: '',
      description: '',
      weight: '',
      loadType: 'Paletli',
      vehicleType: '',
      price: '',
      isPriceNegotiable: false
  });

  // Tahmini Fiyat Hesaplayıcı (Simülasyon)
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  useEffect(() => {
      const unsub = onAuthStateChanged(auth, (u) => {
          if (!u) router.push('/giris');
          setUser(u);
      });
      return () => unsub();
  }, [router]);

  // Fiyat Tahmini Mantığı
  useEffect(() => {
      if (formData.vehicleType) {
          const vehicle = VEHICLE_OPTIONS.find(v => v.label === formData.vehicleType);
          if (vehicle) {
              // Basit bir randomize mantık (Gerçekte Google Maps API ile mesafe çarpılır)
              const randomFactor = 1 + Math.random() * 0.5; 
              setEstimatedPrice(Math.floor(vehicle.basePrice * randomFactor));
          }
      }
  }, [formData.vehicleType, formData.origin, formData.destination]);

  const handleNext = () => {
      if (step === 1 && (!formData.origin || !formData.destination || !formData.pickupDate)) return alert("Lütfen rota ve tarih bilgilerini doldurun.");
      if (step === 2 && (!formData.weight || !formData.description)) return alert("Lütfen yük ağırlığı ve açıklama girin.");
      if (step === 3 && (!formData.vehicleType || !formData.price)) return alert("Lütfen araç tipi ve fiyat belirleyin.");
      setStep(prev => prev + 1);
  };

  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
      if (!user) return;
      setLoading(true);
      try {
          const priceNum = parseFloat(formData.price.replace(/[^0-9.]/g, ''));
          
          await addDoc(collection(db, 'loads'), {
              ...formData,
              price: priceNum,
              createdBy: user.uid,
              creatorName: user.displayName || 'Anonim',
              status: 'Bekliyor',
              createdAt: serverTimestamp(),
              displayId: `LOAD-${Math.floor(100000 + Math.random() * 900000)}`
          });

          // Başarılı Animasyonu için bekle
          setTimeout(() => {
              router.push('/panel/yukler');
          }, 1500);
      } catch (error) {
          console.error(error);
          alert("Bir hata oluştu.");
          setLoading(false);
      }
  };

  // --- ANIMASYON VARYANTLARI ---
  const slideVariants = {
      hidden: { x: 50, opacity: 0 },
      visible: { x: 0, opacity: 1 },
      exit: { x: -50, opacity: 0 }
  };

  return (
    <div className="max-w-3xl mx-auto pb-20 px-4 md:px-0">
      
      {/* HEADER & PROGRESS BAR */}
      <div className="mb-8 pt-6">
          <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Yeni Yük Oluştur</h1>
              <span className="text-sm font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">Adım {step}/4</span>
          </div>
          <div className="h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: `${(step / 4) * 100}%` }} 
                  className="h-full bg-blue-600 rounded-full"
              />
          </div>
      </div>

      <div className="bg-white dark:bg-[#11131F] rounded-[32px] p-6 md:p-10 border border-gray-200 dark:border-white/5 shadow-xl min-h-[500px] flex flex-col justify-between relative overflow-hidden">
         
         <AnimatePresence mode="wait">
             
             {/* --- ADIM 1: ROTA VE TARİH --- */}
             {step === 1 && (
                 <motion.div key="step1" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                     <div className="text-center mb-8">
                         <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl text-blue-600"><FiMapPin /></div>
                         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Rota Bilgisi</h2>
                         <p className="text-gray-500 text-sm">Yükün nereden alınıp nereye gideceğini belirleyin.</p>
                     </div>

                     <div className="space-y-4">
                         <div className="relative group">
                             <div className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                             <input 
                                value={formData.origin}
                                onChange={(e) => setFormData({...formData, origin: e.target.value})}
                                placeholder="Nereden? (Şehir, İlçe)" 
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl text-lg font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                             />
                         </div>
                         
                         {/* Görsel Bağlantı Çizgisi */}
                         <div className="ml-5 h-8 border-l-2 border-dashed border-gray-300 dark:border-white/10 -my-2"></div>

                         <div className="relative group">
                             <div className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 bg-indigo-500 rounded-full border-2 border-white dark:border-black"></div>
                             <input 
                                value={formData.destination}
                                onChange={(e) => setFormData({...formData, destination: e.target.value})}
                                placeholder="Nereye? (Şehir, İlçe)" 
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl text-lg font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                             />
                         </div>

                         <div className="pt-4">
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Yükleme Tarihi</label>
                             <div className="relative">
                                 <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                 <input 
                                    type="date" 
                                    value={formData.pickupDate}
                                    onChange={(e) => setFormData({...formData, pickupDate: e.target.value})}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" 
                                 />
                             </div>
                         </div>
                     </div>
                 </motion.div>
             )}

             {/* --- ADIM 2: YÜK DETAYLARI --- */}
             {step === 2 && (
                 <motion.div key="step2" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                     <div className="text-center mb-8">
                         <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl text-orange-600"><FiBox /></div>
                         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Yük Detayları</h2>
                         <p className="text-gray-500 text-sm">Taşınacak ürün hakkında bilgi verin.</p>
                     </div>

                     <div className="space-y-6">
                         <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-3 ml-1">Yük Tipi</label>
                             <div className="flex flex-wrap gap-3">
                                 {LOAD_TYPES.map(type => (
                                     <button 
                                        key={type}
                                        onClick={() => setFormData({...formData, loadType: type})}
                                        className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${formData.loadType === type ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-600' : 'border-gray-100 dark:border-white/10 text-gray-500 hover:border-gray-300'}`}
                                     >
                                         {type}
                                     </button>
                                 ))}
                             </div>
                         </div>

                         <div className="grid grid-cols-2 gap-4">
                             <div>
                                 <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Ağırlık (Ton)</label>
                                 <input 
                                    type="number"
                                    value={formData.weight}
                                    onChange={(e) => setFormData({...formData, weight: e.target.value})} 
                                    placeholder="Örn: 24" 
                                    className="w-full p-4 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500" 
                                 />
                             </div>
                             <div>
                                 <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Hacim / Desi</label>
                                 <input placeholder="Opsiyonel" className="w-full p-4 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500" />
                             </div>
                         </div>

                         <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Açıklama</label>
                             <textarea 
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                placeholder="Yük hakkında özel notlar, paketleme detayları..." 
                                rows={3}
                                className="w-full p-4 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-orange-500 resize-none" 
                             />
                         </div>
                     </div>
                 </motion.div>
             )}

             {/* --- ADIM 3: ARAÇ VE FİYAT --- */}
             {step === 3 && (
                 <motion.div key="step3" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                     <div className="text-center mb-6">
                         <div className="w-16 h-16 bg-purple-50 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl text-purple-600"><FiTruck /></div>
                         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Araç & Bütçe</h2>
                         <p className="text-gray-500 text-sm">Hangi araca ihtiyacın var?</p>
                     </div>

                     <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[240px] overflow-y-auto custom-scrollbar pr-2">
                         {VEHICLE_OPTIONS.map(vehicle => (
                             <div 
                                key={vehicle.id}
                                onClick={() => setFormData({...formData, vehicleType: vehicle.label})}
                                className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col items-center text-center gap-2 ${formData.vehicleType === vehicle.label ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-100 dark:border-white/10 hover:border-purple-200'}`}
                             >
                                 <div className={`text-2xl ${formData.vehicleType === vehicle.label ? 'text-purple-600' : 'text-gray-400'}`}>{vehicle.icon}</div>
                                 <div>
                                     <div className={`text-sm font-bold ${formData.vehicleType === vehicle.label ? 'text-purple-700 dark:text-purple-300' : 'text-gray-700 dark:text-gray-300'}`}>{vehicle.label}</div>
                                     <div className="text-[10px] text-gray-500">{vehicle.capacity}</div>
                                 </div>
                             </div>
                         ))}
                     </div>

                     <div className="bg-gray-50 dark:bg-black/20 p-5 rounded-2xl border border-gray-200 dark:border-white/10 mt-4">
                         <div className="flex justify-between items-center mb-2">
                             <label className="text-xs font-bold text-gray-500 uppercase">Teklif Fiyatı (KDV Hariç)</label>
                             {estimatedPrice && (
                                 <span className="text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded flex items-center gap-1">
                                     <FiActivity /> Piyasa: ₺{estimatedPrice.toLocaleString()}
                                 </span>
                             )}
                         </div>
                         <div className="relative">
                             <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                             <input 
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: e.target.value})}
                                placeholder="0.00" 
                                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#11131F] border border-gray-200 dark:border-white/10 rounded-xl font-bold text-2xl text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500" 
                             />
                             <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">TL</div>
                         </div>
                         <div className="mt-3 flex items-center gap-2">
                             <input 
                                type="checkbox" 
                                checked={formData.isPriceNegotiable}
                                onChange={(e) => setFormData({...formData, isPriceNegotiable: e.target.checked})}
                                className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500" 
                             />
                             <span className="text-sm text-gray-600 dark:text-gray-400">Pazarlığa Açık</span>
                         </div>
                     </div>
                 </motion.div>
             )}

             {/* --- ADIM 4: ÖZET VE ONAY --- */}
             {step === 4 && (
                 <motion.div key="step4" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                     <div className="text-center mb-6">
                         <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl text-green-600"><FiCheck /></div>
                         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Her Şey Hazır!</h2>
                         <p className="text-gray-500 text-sm">İlan detaylarını kontrol edip yayınlayın.</p>
                     </div>

                     <div className="bg-gray-50 dark:bg-black/20 rounded-2xl p-6 space-y-4 border border-gray-200 dark:border-white/10 relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full -mr-4 -mt-4"></div>
                         
                         <div className="flex items-start gap-4">
                             <div className="flex flex-col items-center gap-1 mt-1">
                                 <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                 <div className="w-0.5 h-8 bg-gray-300 dark:bg-white/10 border-l border-dashed"></div>
                                 <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                             </div>
                             <div className="flex-1 space-y-4">
                                 <div>
                                     <p className="text-xs text-gray-400 font-bold uppercase">Nereden</p>
                                     <p className="font-bold text-gray-900 dark:text-white text-lg">{formData.origin}</p>
                                 </div>
                                 <div>
                                     <p className="text-xs text-gray-400 font-bold uppercase">Nereye</p>
                                     <p className="font-bold text-gray-900 dark:text-white text-lg">{formData.destination}</p>
                                 </div>
                             </div>
                         </div>

                         <div className="h-px bg-gray-200 dark:bg-white/10 my-2"></div>

                         <div className="grid grid-cols-2 gap-4">
                             <div>
                                 <p className="text-xs text-gray-400 font-bold uppercase">Araç</p>
                                 <p className="font-bold text-gray-900 dark:text-white">{formData.vehicleType}</p>
                             </div>
                             <div>
                                 <p className="text-xs text-gray-400 font-bold uppercase">Tarih</p>
                                 <p className="font-bold text-gray-900 dark:text-white">{formData.pickupDate}</p>
                             </div>
                             <div>
                                 <p className="text-xs text-gray-400 font-bold uppercase">Yük</p>
                                 <p className="font-bold text-gray-900 dark:text-white">{formData.weight} Ton / {formData.loadType}</p>
                             </div>
                             <div>
                                 <p className="text-xs text-gray-400 font-bold uppercase">Fiyat</p>
                                 <p className="font-black text-blue-600 text-xl">₺{Number(formData.price).toLocaleString()}</p>
                             </div>
                         </div>
                     </div>
                 </motion.div>
             )}

         </AnimatePresence>

         {/* --- NAVIGATION BUTTONS --- */}
         <div className="mt-8 flex gap-4">
             {step > 1 && (
                 <button 
                    onClick={handleBack} 
                    className="px-6 py-4 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 text-gray-700 dark:text-white font-bold transition-colors"
                 >
                    <FiArrowLeft />
                 </button>
             )}
             
             <button 
                onClick={step === 4 ? handleSubmit : handleNext} 
                disabled={loading}
                className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
             >
                {loading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Yayınlanıyor...
                    </>
                ) : step === 4 ? (
                    <>İlanı Yayınla <FiCheck /></>
                ) : (
                    <>Devam Et <FiArrowRight /></>
                )}
             </button>
         </div>

      </div>

      {/* FOOTER INFO */}
      <div className="mt-6 text-center text-xs text-gray-400 flex items-center justify-center gap-2">
          <FiInfo /> İlan yayınlandıktan sonra sürücülerden teklif almaya başlayacaksınız.
      </div>

    </div>
  );
}