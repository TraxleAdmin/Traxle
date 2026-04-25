'use client';

import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiNavigation, FiCheckCircle, FiClock, FiDollarSign, FiArrowRight, FiTool, FiStar, FiFileText } from 'react-icons/fi';
import { db, auth } from '@/lib/firebase';
import { collection, query, where, onSnapshot, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link'; // 🔥 HATA 1 ÇÖZÜLDÜ: Link eklendi
import FreightContractModal from '@/components/FreightContractModal';
import ReviewModal from '@/components/ReviewModal';

const mapContainerStyle = { width: '100%', height: '100%', borderRadius: '1.5rem' };
const darkMapStyle = [{ elementType: "geometry", stylers: [{ color: "#242f3e" }] }, { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] }, { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] }, { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] }, { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] }, { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] }, { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] }];

export default function MyTasksPage() {
    const { isLoaded } = useJsApiLoader({ id: 'google-map-script', googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "" });
    const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
    const [activeTask, setActiveTask] = useState<any>(null);
    const [historyTasks, setHistoryTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [directionsResponse, setDirectionsResponse] = useState<any>(null);

    const [isContractOpen, setIsContractOpen] = useState(false);
    const [contractData, setContractData] = useState<any>(null);
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [reviewData, setReviewData] = useState<any>(null);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) setCurrentUser({ uid: user.uid, ...userDoc.data() });

                const qActive = query(collection(db, "loads"), where("status", "in", ["Yolda", "Bekliyor"]), where("driverId", "==", user.uid));
                const unsubActive = onSnapshot(qActive, (snapshot) => {
                    const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setActiveTask(tasks.find((t: any) => t.status === 'Yolda') || tasks[0] || null);
                });

                const qHistory = query(collection(db, "loads"), where("status", "==", "Teslim Edildi"), where("driverId", "==", user.uid));
                const unsubHistory = onSnapshot(qHistory, (snapshot) => {
                    setHistoryTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                    setLoading(false);
                });
                return () => { unsubActive(); unsubHistory(); };
            }
        });
        return () => unsubscribeAuth();
    }, []);

    const handleOpenContract = async () => {
        if (!activeTask || !currentUser) return;
        let shipperName = "Şantiye Yetkilisi";
        if (activeTask.createdBy) {
            const shipperDoc = await getDoc(doc(db, "users", activeTask.createdBy));
            if (shipperDoc.exists()) shipperName = shipperDoc.data().companyName || shipperDoc.data().name || shipperName;
        }
        setContractData({
            contractId: activeTask.displayId || activeTask.id.substring(0, 8).toUpperCase(),
            date: activeTask.assignedAt?.toDate ? new Intl.DateTimeFormat('tr-TR').format(activeTask.assignedAt.toDate()) : new Date().toLocaleDateString('tr-TR'),
            shipperName, driverName: currentUser.name || "Tedarikçi", driverPlate: currentUser.plateNumber || "---",
            origin: activeTask.origin, destination: activeTask.destination, goodsDescription: activeTask.vehicleType || "İş Makinesi", price: activeTask.price || 0
        });
        setIsContractOpen(true);
    };

    const handleOpenReview = async (task: any) => {
        let shipperName = "Şantiye Yetkilisi";
        if (task.createdBy) {
            const sDoc = await getDoc(doc(db, "users", task.createdBy));
            if (sDoc.exists()) shipperName = sDoc.data().companyName || sDoc.data().name;
        }
        setReviewData({ jobId: task.id, targetUserId: task.createdBy, targetUserName: shipperName });
        setIsReviewOpen(true);
    };

    const handleUpdateStatus = async (newStatus: string) => {
        if (!activeTask) return;
        try {
            await updateDoc(doc(db, "loads", activeTask.id), { status: newStatus, updatedAt: serverTimestamp() });
            if (newStatus === 'Teslim Edildi') { alert("Görev tamamlandı."); setActiveTask(null); setActiveTab('history'); }
        } catch (error) { console.error(error); }
    };

    return (
        <div className="space-y-6 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3"><FiNavigation className="text-blue-600" /> Saha Operasyonları</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Mevcut makine kiralamalarınızı ve geçmiş işlerinizi yönetin.</p>
                </div>
                <div className="bg-white dark:bg-[#0F1629] p-1.5 rounded-xl border border-gray-200 dark:border-white/10 flex">
                    <button onClick={() => setActiveTab('active')} className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'active' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'}`}><FiTool /> Aktif Operasyon</button>
                    <button onClick={() => setActiveTab('history')} className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'history' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'}`}><FiClock /> Geçmiş</button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'active' && (
                    <motion.div key="active" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {activeTask ? (
                            <>
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="h-[400px] bg-[#1c1c1e] rounded-3xl overflow-hidden shadow-lg border border-gray-200 dark:border-white/5 relative group">
                                        {isLoaded ? (
                                            <GoogleMap mapContainerStyle={mapContainerStyle} center={{ lat: 39.9334, lng: 32.8597 }} zoom={6} options={{ styles: darkMapStyle, disableDefaultUI: true }}>
                                                {/* 🔥 HATA 2 ÇÖZÜLDÜ: (res, status) olarak ayrıldı */}
                                                <DirectionsService options={{ destination: activeTask.destination, origin: activeTask.origin, travelMode: window.google.maps.TravelMode.DRIVING }} callback={(res, status) => { if (status === 'OK' && res) setDirectionsResponse(res); }} />
                                                {directionsResponse && (<DirectionsRenderer options={{ directions: directionsResponse, suppressMarkers: false, polylineOptions: { strokeColor: "#3b82f6", strokeWeight: 6 } }} />)}
                                            </GoogleMap>
                                        ) : (<div className="w-full h-full flex items-center justify-center text-gray-500">Harita Yükleniyor...</div>)}
                                        <div className="absolute top-4 left-4 bg-black/60 px-4 py-2 rounded-xl border border-white/10"><div className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div><span className="text-white text-xs font-bold uppercase tracking-wider">Canlı Takip</span></div></div>
                                    </div>
                                    <div className="bg-white dark:bg-[#0F1629] p-6 rounded-3xl border border-gray-200 dark:border-white/5 shadow-sm flex justify-between items-center gap-6">
                                        <div className="flex items-center gap-4"><div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-full flex items-center justify-center"><FiMapPin /></div><div><p className="text-xs text-gray-400 uppercase font-bold mb-1">Şantiye Teslim</p><h3 className="font-bold text-gray-900 dark:text-white text-lg">{activeTask.origin}</h3></div></div>
                                        <div className="flex-1 border-t-2 border-dashed border-gray-200 dark:border-white/10 relative"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-50 dark:bg-[#0F1629] px-2 text-gray-400 text-xs">Ağır Nakliye Rotalı</div></div>
                                        <div className="flex items-center gap-4"><div className="text-right"><p className="text-xs text-gray-400 uppercase font-bold mb-1">İade Noktası</p><h3 className="font-bold text-gray-900 dark:text-white text-lg">{activeTask.destination}</h3></div><div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 text-orange-600 rounded-full flex items-center justify-center"><FiNavigation /></div></div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="bg-white dark:bg-[#0F1629] p-6 rounded-3xl border border-gray-200 dark:border-white/5 shadow-sm h-full flex flex-col">
                                        <div className="mb-6"><span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase mb-2">Aktif Kiralama</span><h2 className="text-2xl font-bold text-gray-900 dark:text-white">{activeTask.vehicleType} Operasyonu</h2><p className="text-gray-500 text-sm mt-1">Sözleşme ID: #{activeTask.displayId || activeTask.id.substring(0, 6)}</p></div>
                                        <div className="space-y-4 mb-8">
                                            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-white/5 rounded-xl"><span className="text-sm text-gray-500 flex items-center gap-2"><FiTool /> Tonaj/Ataşman</span><span className="font-bold text-gray-900 dark:text-white">{activeTask.weight}T / {activeTask.loadType}</span></div>
                                            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-white/5 rounded-xl"><span className="text-sm text-gray-500 flex items-center gap-2"><FiDollarSign /> Kira Bedeli</span><span className="font-bold text-green-600">₺{activeTask.price}</span></div>
                                        </div>
                                        <div className="mt-auto space-y-3">
                                            <button onClick={handleOpenContract} className="w-full py-4 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 text-gray-900 dark:text-white font-bold rounded-xl flex items-center justify-center gap-2"><FiFileText /> Dijital Sözleşme</button>
                                            <button onClick={() => handleUpdateStatus('Teslim Edildi')} className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl flex items-center justify-center gap-2"><FiCheckCircle /> İşi Tamamla</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="col-span-3 py-20 text-center bg-gray-50 dark:bg-white/5 rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/10">
                                <div className="w-20 h-20 bg-gray-200 dark:bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400 text-3xl"><FiTool /></div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Aktif Operasyonunuz Yok</h2>
                                <p className="text-gray-500 mb-8 max-w-md mx-auto">Şu anda sahada çalışan bir makineniz bulunmuyor. İlan piyasasından yeni bir iş bulabilirsiniz.</p>
                                <Link href="/panel/ilanlar" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl inline-flex items-center gap-2">İlanlara Göz At <FiArrowRight /></Link>
                            </div>
                        )}
                    </motion.div>
                )}

                {activeTab === 'history' && (
                    <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 text-xs uppercase font-bold">
                                    <tr><th className="px-6 py-4">Tarih</th><th className="px-6 py-4">Şantiye</th><th className="px-6 py-4">Makine</th><th className="px-6 py-4">Kazanç</th><th className="px-6 py-4 text-right">Aksiyon</th></tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                                    {historyTasks.map((task) => (
                                        <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{task.updatedAt?.toDate ? new Date(task.updatedAt.toDate()).toLocaleDateString('tr-TR') : '---'}</td>
                                            <td className="px-6 py-4"><span className="font-bold text-gray-900 dark:text-white text-sm">{task.origin}</span></td>
                                            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{task.vehicleType}</td>
                                            <td className="px-6 py-4 font-bold text-green-600">₺{task.price}</td>
                                            <td className="px-6 py-4 text-right"><button onClick={() => handleOpenReview(task)} className="px-4 py-2 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 rounded-lg text-xs font-bold flex items-center gap-1 ml-auto"><FiStar className="fill-current" /> Değerlendir</button></td>
                                        </tr>
                                    ))}
                                    {historyTasks.length === 0 && (<tr><td colSpan={5} className="px-6 py-10 text-center text-gray-500">Henüz tamamlanmış bir operasyonunuz yok.</td></tr>)}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {contractData && <FreightContractModal isOpen={isContractOpen} onClose={() => setIsContractOpen(false)} data={contractData} />}
            {reviewData && <ReviewModal isOpen={isReviewOpen} onClose={() => setIsReviewOpen(false)} jobId={reviewData.jobId} targetUserId={reviewData.targetUserId} targetUserName={reviewData.targetUserName} />}
        </div>
    );
}