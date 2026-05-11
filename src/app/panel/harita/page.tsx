'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { motion, AnimatePresence } from 'framer-motion';
import { db, auth } from '@/lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { FiTool, FiBox, FiNavigation, FiPhone, FiX, FiSearch, FiMapPin, FiMenu, FiAlertTriangle } from 'react-icons/fi';

const CONTAINER_STYLE = { width: '100%', height: '100%' };
const DEFAULT_CENTER = { lat: 39.9334, lng: 32.8597 };
const DARK_MAP_STYLE = [{ elementType: "geometry", stylers: [{ color: "#242f3e" }] }, { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] }, { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] }, { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] }, { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] }, { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] }, { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] }];

export default function MapPage() {
    const { isLoaded, loadError } = useJsApiLoader({ id: 'google-map-script', googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "" });
    const [drivers, setDrivers] = useState<any[]>([]);
    const [activeLoads, setActiveLoads] = useState<any[]>([]);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(true);
    const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);

    useEffect(() => {
        // Sürücü rolü yerine 'supplier' rolüne sahip makine sahiplerini haritada göster
        const q = query(collection(db, "users"), where("role", "==", "supplier"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const driverData = snapshot.docs.map(doc => ({ id: doc.id, type: 'driver', ...doc.data() })).filter((d: any) => d.lat && d.lng);
            setDrivers(driverData);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const q = query(collection(db, "loads"), where("status", "==", "Yolda"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const loadData = snapshot.docs.map(doc => ({ id: doc.id, type: 'load', ...doc.data() })).filter((l: any) => l.currentLat && l.currentLng);
            setActiveLoads(loadData);
        });
        return () => unsubscribe();
    }, []);

    const onLoad = React.useCallback(function callback(map: google.maps.Map) { setMapRef(map); }, []);
    const onUnmount = React.useCallback(function callback(map: google.maps.Map) { setMapRef(null); }, []);

    const panToItem = (item: any) => {
        setSelectedItem(item);
        if (mapRef) {
            const lat = item.type === 'driver' ? item.lat : item.currentLat;
            const lng = item.type === 'driver' ? item.lng : item.currentLng;
            mapRef.panTo({ lat, lng });
            mapRef.setZoom(14);
        }
    };

    if (loadError) return <div className="flex h-full items-center justify-center bg-gray-900 text-white p-10"><FiAlertTriangle className="text-5xl text-red-500" /></div>;
    if (!isLoaded) return <div className="flex h-[calc(100vh-80px)] items-center justify-center bg-[#0B0F19]"><div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>;

    return (
        <div className="relative w-full h-[calc(100vh-80px)] rounded-[32px] overflow-hidden bg-[#0B0F19] border border-white/10 shadow-2xl">
            <GoogleMap mapContainerStyle={CONTAINER_STYLE} center={DEFAULT_CENTER} zoom={6} options={{ styles: DARK_MAP_STYLE, disableDefaultUI: true }} onLoad={onLoad} onUnmount={onUnmount}>
                {drivers.map(d => (
                    <Marker key={d.id} position={{ lat: d.lat, lng: d.lng }}
                        icon={{ url: "https://cdn-icons-png.flaticon.com/512/1000/1000109.png", scaledSize: new window.google.maps.Size(40, 40) }} // Ekskavatör / İş Makinesi İkonu
                        onClick={() => panToItem(d)}
                    />
                ))}
                {activeLoads.map(l => (
                    <Marker key={l.id} position={{ lat: l.currentLat, lng: l.currentLng }}
                        icon={{ url: "https://cdn-icons-png.flaticon.com/512/679/679720.png", scaledSize: new window.google.maps.Size(35, 35) }} // Şantiye Noktası
                        onClick={() => panToItem(l)}
                    />
                ))}
            </GoogleMap>

            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div initial={{ x: -320, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -320, opacity: 0 }} className="absolute top-4 bottom-4 left-4 w-80 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-[24px] shadow-2xl z-10 flex flex-col overflow-hidden">
                        <div className="p-5 border-b border-white/10">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-1"><FiNavigation className="text-blue-500" /> Saha Takibi</h2>
                            <p className="text-xs text-gray-400">{loading ? 'Bağlanıyor...' : `${drivers.length} Makine • ${activeLoads.length} Şantiye`}</p>
                            <div className="mt-4 relative"><FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" /><input type="text" placeholder="Plaka veya İsim ara..." className="w-full bg-black/30 border border-white/10 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white outline-none" /></div>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
                            {drivers.map(d => (
                                <div key={d.id} onClick={() => panToItem(d)} className={`p-3 rounded-xl cursor-pointer border transition-all ${selectedItem?.id === d.id ? 'bg-blue-600 border-blue-500' : 'bg-white/5 border-transparent hover:bg-white/10'}`}>
                                    <div className="flex justify-between items-center mb-1"><span className="font-bold text-white text-sm">{d.plateNumber || 'PLAKA YOK'}</span><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span></div>
                                    <p className="text-xs text-gray-400 flex items-center gap-1"><FiTool size={10} /> {d.name}</p>
                                </div>
                            ))}
                            {activeLoads.map(l => (
                                <div key={l.id} onClick={() => panToItem(l)} className={`p-3 rounded-xl cursor-pointer border transition-all ${selectedItem?.id === l.id ? 'bg-orange-600 border-orange-500' : 'bg-white/5 border-transparent hover:bg-white/10'}`}>
                                    <div className="flex justify-between items-center mb-1"><span className="font-bold text-white text-sm">#{l.displayId || l.id.substring(0, 6)}</span><FiBox className="text-orange-300" /></div>
                                    <p className="text-xs text-gray-400">{l.origin} Şantiyesi</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="absolute top-4 left-4 z-20 p-2.5 bg-black/50 backdrop-blur rounded-xl border border-white/10 text-white shadow-lg md:hidden">{isSidebarOpen ? <FiX /> : <FiMenu />}</button>
        </div>
    );
}