'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { motion, AnimatePresence } from 'framer-motion';
import { db, auth } from '@/lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { 
  FiTruck, FiBox, FiNavigation, FiPhone, FiX, FiSearch, 
  FiMapPin, FiMenu, FiAlertTriangle 
} from 'react-icons/fi';

// --- GERÇEK AYARLAR ---
const CONTAINER_STYLE = { width: '100%', height: '100%' };
// Başlangıç: Türkiye Geneli (Zoom seviyesiyle ayarlanır)
const DEFAULT_CENTER = { lat: 39.9334, lng: 32.8597 }; 

// Profesyonel Dark Tema (Gece Modu)
const DARK_MAP_STYLE = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
];

export default function MapPage() {
  // 1. Google Maps API Yüklemesi
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "" 
  });

  const [drivers, setDrivers] = useState<any[]>([]);
  const [activeLoads, setActiveLoads] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);

  // --- GERÇEK VERİ AKIŞI: SÜRÜCÜLER ---
  useEffect(() => {
    // Sadece 'driver' rolüne sahip kullanıcıları dinle
    const q = query(collection(db, "users"), where("role", "==", "driver"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const driverData = snapshot.docs
        .map(doc => ({ id: doc.id, type: 'driver', ...doc.data() }))
        // 🔥 FİLTRE: Sadece gerçekten konumu (lat/lng) olanları al. Asla sahte veri gösterme.
        .filter((d: any) => d.lat && d.lng && typeof d.lat === 'number' && typeof d.lng === 'number');
      
      setDrivers(driverData);
      setLoading(false);
    }, (error) => {
        console.error("Sürücü verisi çekme hatası:", error);
    });

    return () => unsubscribe();
  }, []);

  // --- GERÇEK VERİ AKIŞI: YÜKLER ---
  useEffect(() => {
    // Sadece 'Yolda' statüsündeki yükleri dinle
    const q = query(collection(db, "loads"), where("status", "==", "Yolda"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const loadData = snapshot.docs
            .map(doc => ({ id: doc.id, type: 'load', ...doc.data() }))
            // 🔥 FİLTRE: Sadece gerçekten anlık konumu olan yükleri al.
            .filter((l: any) => l.currentLat && l.currentLng);
        
        setActiveLoads(loadData);
    });

    return () => unsubscribe();
  }, []);

  // Harita Yüklenince Referansı Al
  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    setMapRef(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    setMapRef(null);
  }, []);

  // Seçili öğeye odaklanma fonksiyonu
  const panToItem = (item: any) => {
      setSelectedItem(item);
      if (mapRef) {
          const lat = item.type === 'driver' ? item.lat : item.currentLat;
          const lng = item.type === 'driver' ? item.lng : item.currentLng;
          mapRef.panTo({ lat, lng });
          mapRef.setZoom(14); // Yakınlaş
      }
  };

  if (loadError) {
      return (
          <div className="flex h-full items-center justify-center bg-gray-900 text-white p-10 text-center">
              <div>
                  <FiAlertTriangle className="text-5xl text-red-500 mx-auto mb-4" />
                  <h2 className="text-xl font-bold">Harita Yüklenemedi</h2>
                  <p className="text-gray-400 mt-2">API Anahtarı hatalı veya eksik. Lütfen yapılandırmayı kontrol edin.</p>
              </div>
          </div>
      );
  }

  if (!isLoaded) {
      return (
        <div className="flex h-[calc(100vh-80px)] items-center justify-center bg-[#0B0F19]">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400 text-sm">Google Maps Bağlanıyor...</p>
            </div>
        </div>
      );
  }

  return (
    <div className="relative w-full h-[calc(100vh-80px)] rounded-[32px] overflow-hidden bg-[#0B0F19] border border-white/10 shadow-2xl">
      
      {/* --- GOOGLE MAPS --- */}
      <GoogleMap
        mapContainerStyle={CONTAINER_STYLE}
        center={DEFAULT_CENTER}
        zoom={6}
        options={{
            styles: DARK_MAP_STYLE,
            disableDefaultUI: true, // Buton kirliliğini temizle
            zoomControl: false,     // Zoom butonlarını gizle (Custom buton eklenebilir)
            mapTypeControl: false,
            streetViewControl: false,
        }}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
          {/* SÜRÜCÜ İŞARETÇİLERİ */}
          {drivers.map(d => (
              <Marker 
                  key={d.id} 
                  position={{ lat: d.lat, lng: d.lng }} 
                  icon={{
                      url: "https://cdn-icons-png.flaticon.com/512/741/741407.png", // Kamyon İkonu
                      scaledSize: new window.google.maps.Size(40, 40)
                  }}
                  onClick={() => panToItem(d)}
              />
          ))}

          {/* YÜK İŞARETÇİLERİ */}
          {activeLoads.map(l => (
              <Marker 
                  key={l.id} 
                  position={{ lat: l.currentLat, lng: l.currentLng }} 
                  icon={{
                      url: "https://cdn-icons-png.flaticon.com/512/679/679720.png", // Kutu İkonu
                      scaledSize: new window.google.maps.Size(35, 35)
                  }}
                  onClick={() => panToItem(l)}
              />
          ))}
      </GoogleMap>

      {/* --- SOL SIDEBAR (GERÇEK VERİ LİSTESİ) --- */}
      <AnimatePresence>
        {isSidebarOpen && (
            <motion.div 
                initial={{ x: -320, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -320, opacity: 0 }}
                className="absolute top-4 bottom-4 left-4 w-80 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-[24px] shadow-2xl z-10 flex flex-col overflow-hidden"
            >
                <div className="p-5 border-b border-white/10">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-1">
                        <FiNavigation className="text-blue-500" /> Canlı Takip
                    </h2>
                    <p className="text-xs text-gray-400">
                        {loading ? 'Bağlanıyor...' : `${drivers.length} Sürücü • ${activeLoads.length} Yük`}
                    </p>
                    
                    <div className="mt-4 relative">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input type="text" placeholder="Plaka veya İsim ara..." className="w-full bg-black/30 border border-white/10 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-blue-500/50" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
                    {drivers.length === 0 && activeLoads.length === 0 && !loading && (
                        <div className="text-center py-10 text-gray-500 text-xs">
                            <FiAlertTriangle className="mx-auto mb-2 text-lg text-gray-600"/>
                            Haritada görüntülenecek<br/>aktif veri bulunamadı.
                        </div>
                    )}

                    {/* SÜRÜCÜ LİSTESİ */}
                    {drivers.map(d => (
                        <div 
                            key={d.id} 
                            onClick={() => panToItem(d)} 
                            className={`p-3 rounded-xl cursor-pointer border transition-all ${selectedItem?.id === d.id ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-500/20' : 'bg-white/5 border-transparent hover:bg-white/10'}`}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-white text-sm">{d.plateNumber || 'PLAKA YOK'}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                            </div>
                            <p className="text-xs text-gray-400 flex items-center gap-1">
                                <FiTruck size={10}/> {d.name}
                            </p>
                            <p className="text-[10px] text-gray-500 mt-1 truncate">
                                {d.currentLocation || 'Konum verisi alınıyor...'}
                            </p>
                        </div>
                    ))}

                    {/* YÜK LİSTESİ */}
                    {activeLoads.map(l => (
                        <div 
                            key={l.id} 
                            onClick={() => panToItem(l)} 
                            className={`p-3 rounded-xl cursor-pointer border transition-all ${selectedItem?.id === l.id ? 'bg-orange-600 border-orange-500 shadow-lg shadow-orange-500/20' : 'bg-white/5 border-transparent hover:bg-white/10'}`}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-white text-sm">#{l.displayId || l.id.substring(0,6)}</span>
                                <FiBox className="text-orange-300" />
                            </div>
                            <p className="text-xs text-gray-400 flex items-center gap-1">
                                {l.origin} ➝ {l.destination}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* --- SIDEBAR TOGGLE (MOBİL) --- */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        className="absolute top-4 left-4 z-20 p-2.5 bg-black/50 backdrop-blur rounded-xl border border-white/10 text-white shadow-lg md:hidden"
      >
          {isSidebarOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* --- SAĞ ALT BİLGİ KARTI (WIDGET) --- */}
      <AnimatePresence>
        {selectedItem && (
            <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="absolute bottom-6 right-6 w-80 bg-gray-900/90 backdrop-blur-2xl border border-white/10 rounded-[24px] p-5 shadow-2xl z-20"
            >
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-white">
                            {selectedItem.type === 'driver' ? (selectedItem.plateNumber || 'Bilinmiyor') : `#${selectedItem.displayId}`}
                        </h3>
                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                            {selectedItem.type === 'driver' ? <FiTruck /> : <FiBox />}
                            {selectedItem.type === 'driver' ? selectedItem.name : 'Sevkiyat'}
                        </p>
                    </div>
                    <button onClick={() => setSelectedItem(null)} className="p-1.5 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"><FiX /></button>
                </div>

                <div className="space-y-3 border-t border-white/10 pt-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Durum</span>
                        <span className="font-bold text-green-400">Aktif & Takipte</span>
                    </div>
                    
                    {selectedItem.phone && (
                        <div className="flex justify-between text-sm items-center">
                            <span className="text-gray-500">İletişim</span>
                            <a href={`tel:${selectedItem.phone}`} className="flex items-center gap-1 text-blue-400 font-bold hover:underline">
                                <FiPhone size={12}/> {selectedItem.phone}
                            </a>
                        </div>
                    )}

                    {selectedItem.location && (
                        <div className="text-xs text-gray-400 bg-white/5 p-2 rounded-lg mt-2">
                            <FiMapPin className="inline mr-1 text-gray-500"/>
                            {selectedItem.location}
                        </div>
                    )}
                </div>
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}