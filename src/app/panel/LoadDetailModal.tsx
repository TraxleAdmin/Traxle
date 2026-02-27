'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiX, FiMapPin, FiUser, FiPhone, FiClock, FiFileText, FiCheckCircle, FiNavigation } from 'react-icons/fi';

interface LoadDetailModalProps {
  load: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function LoadDetailModal({ load, isOpen, onClose }: LoadDetailModalProps) {
  if (!isOpen || !load) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      
      {/* Backdrop (Arka Plan Karartma) */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Penceresi */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden"
      >
        
        {/* --- SOL TARAFTAKİ HARİTA BÖLÜMÜ --- */}
        <div className="w-full md:w-5/12 bg-gray-100 dark:bg-[#050814] relative min-h-[300px] md:min-h-full">
           {/* Sahte Harita Arkaplanı */}
           <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
           
           {/* Rota Çizgisi (Temsili) */}
           <div className="absolute top-1/4 left-1/4 right-1/4 bottom-1/4 border-l-2 border-dashed border-blue-500/30"></div>
           
           {/* Noktalar */}
           <div className="absolute top-[25%] left-[25%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
              <div className="w-4 h-4 bg-blue-600 rounded-full ring-4 ring-blue-600/20"></div>
              <span className="text-xs font-bold text-gray-600 dark:text-gray-300 bg-white dark:bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">{load.origin}</span>
           </div>

           <div className="absolute bottom-[25%] right-[25%] translate-x-1/2 translate-y-1/2 flex flex-col items-center gap-2">
              <div className="w-4 h-4 border-4 border-blue-600 bg-white rounded-full"></div>
              <span className="text-xs font-bold text-gray-600 dark:text-gray-300 bg-white dark:bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">{load.destination}</span>
           </div>

           {/* Canlı Araç (Eğer Yoldaysa) */}
           {load.status === 'Yolda' && (
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-600/40 animate-pulse">
                   <FiNavigation size={24} />
                </div>
             </div>
           )}
        </div>

        {/* --- SAĞ TARAFTAKİ DETAYLAR --- */}
        <div className="w-full md:w-7/12 p-8 relative">
           {/* Kapat Butonu */}
           <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-white/5 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
              <FiX className="text-gray-500 dark:text-white" size={20} />
           </button>

           <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                 <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold rounded-lg border border-blue-200 dark:border-blue-500/20">
                    {load.status}
                 </span>
                 <span className="text-sm text-gray-500 font-mono">{load.displayId}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{load.origin} <span className="text-gray-400 mx-2">→</span> {load.destination}</h2>
           </div>

           {/* Bilgi Grid */}
           <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                 <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-gray-500 dark:text-gray-300">
                       <FiUser />
                    </div>
                    <div>
                       <p className="text-xs text-gray-500 uppercase font-bold">Sürücü</p>
                       <p className="font-bold text-gray-900 dark:text-white">{load.driverName || 'Atanmadı'}</p>
                    </div>
                 </div>
                 {load.driverName && (
                    <button className="w-full py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
                       <FiPhone /> İletişime Geç
                    </button>
                 )}
              </div>

              <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                 <p className="text-xs text-gray-500 uppercase font-bold mb-2">Yük Özeti</p>
                 <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                       <span className="text-gray-500">Araç Tipi:</span>
                       <span className="font-medium text-gray-900 dark:text-white">{load.vehicleType}</span>
                    </li>
                    <li className="flex justify-between">
                       <span className="text-gray-500">Tonaj:</span>
                       <span className="font-medium text-gray-900 dark:text-white">24 Ton</span>
                    </li>
                    <li className="flex justify-between">
                       <span className="text-gray-500">Tutar:</span>
                       <span className="font-bold text-green-600">{load.price} {load.currency}</span>
                    </li>
                 </ul>
              </div>
           </div>

           {/* Timeline (Zaman Çizelgesi) */}
           <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                 <FiClock /> Operasyon Geçmişi
              </h3>
              <div className="space-y-4 pl-2 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200 dark:before:bg-white/10">
                 
                 <TimelineItem 
                   active={true} 
                   title="Yük Oluşturuldu" 
                   time={new Date(load.date.seconds * 1000).toLocaleDateString('tr-TR')} 
                 />
                 
                 <TimelineItem 
                   active={load.status !== 'Bekliyor'} 
                   title="Sürücü Atandı" 
                   time={load.driverName ? "Onaylandı" : "Bekleniyor"} 
                 />
                 
                 <TimelineItem 
                   active={load.status === 'Yolda' || load.status === 'Teslim Edildi'} 
                   title="Yola Çıktı" 
                   time={load.status === 'Yolda' ? "Şu an yolda" : "-"} 
                 />
                 
                 <TimelineItem 
                   active={load.status === 'Teslim Edildi'} 
                   title="Teslim Edildi" 
                   time="-" 
                 />

              </div>
           </div>

           {/* Belgeler */}
           <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                 <FiFileText /> Evraklar & Teslimat Kanıtı
              </h3>
              <div className="flex gap-3">
                 {/* Örnek Belge Kutuları */}
                 <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
                    <span className="text-xs text-gray-400">İrsaliye</span>
                 </div>
                 <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
                    <span className="text-xs text-gray-400">Fatura</span>
                 </div>
              </div>
           </div>

        </div>
      </motion.div>
    </div>
  );
}

function TimelineItem({ active, title, time }: any) {
   return (
      <div className="flex items-center gap-4 relative z-10">
         <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-colors ${active ? 'bg-blue-600 border-white dark:border-[#0F1629] text-white' : 'bg-gray-100 dark:bg-white/5 border-white dark:border-[#0F1629] text-gray-400'}`}>
            {active ? <FiCheckCircle /> : <div className="w-2 h-2 bg-gray-400 rounded-full" />}
         </div>
         <div>
            <p className={`text-sm font-bold ${active ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>{title}</p>
            <p className="text-xs text-gray-400">{time}</p>
         </div>
      </div>
   );
}