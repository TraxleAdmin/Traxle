'use client';

import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMapPin, FiNavigation, FiCheckCircle, FiClock, 
  FiDollarSign, FiArrowRight, FiTruck, FiBox, FiFileText, FiStar 
} from 'react-icons/fi';
import { db, auth } from '@/lib/firebase';
import { collection, query, where, onSnapshot, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import FreightContractModal from '@/components/FreightContractModal';
import ReviewModal from '@/components/ReviewModal'; // 🔥 EKLENDİ

// --- HARİTA STİLİ ---
const mapContainerStyle = { width: '100%', height: '100%', borderRadius: '1.5rem' };
const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
];

export default function MyTasksPage() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || ""
  });

  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [activeTask, setActiveTask] = useState<any>(null);
  const [historyTasks, setHistoryTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [directionsResponse, setDirectionsResponse] = useState<any>(null);

  // --- MODAL STATES ---
  const [isContractOpen, setIsContractOpen] = useState(false);
  const [contractData, setContractData] = useState<any>(null);
  
  // 🔥 REVIEW MODAL STATE
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviewData, setReviewData] = useState<any>(null);

  // --- VERİ ÇEKME ---
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            setCurrentUser({ uid: user.uid, ...userDoc.data() });
        }

        // Aktif Görevler
        const qActive = query(
            collection(db, "loads"), 
            where("status", "in", ["Yolda", "Bekliyor"]), 
            where("driverId", "==", user.uid)
        );

        const unsubActive = onSnapshot(qActive, (snapshot) => {
            const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const myTask = tasks.find((t: any) => t.status === 'Yolda') || tasks[0] || null;
            setActiveTask(myTask);
        });

        // Geçmiş Görevler (Tamamlananlar)
        const qHistory = query(
            collection(db, "loads"), 
            where("status", "==", "Teslim Edildi"),
            where("driverId", "==", user.uid)
        );
        
        const unsubHistory = onSnapshot(qHistory, (snapshot) => {
            const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setHistoryTasks(tasks);
            setLoading(false);
        });

        return () => {
            unsubActive();
            unsubHistory();
        };
      }
    });
    return () => unsubscribeAuth();
  }, []);

  // --- SÖZLEŞME AÇMA ---
  const handleOpenContract = async () => {
    if (!activeTask || !currentUser) return;
    let shipperName = "Belirtilmemiş Firma";
    try {
        if (activeTask.createdBy) {
            const shipperDoc = await getDoc(doc(db, "users", activeTask.createdBy));
            if (shipperDoc.exists()) {
                const sData = shipperDoc.data();
                shipperName = sData.companyName || sData.name || "Yük Veren Firma";
            }
        }
    } catch (e) { console.error(e); }

    const dateObj = activeTask.assignedAt?.toDate ? activeTask.assignedAt.toDate() : new Date();
    const formattedDate = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(dateObj);

    setContractData({
        contractId: activeTask.displayId || activeTask.id.substring(0, 8).toUpperCase(),
        date: formattedDate,
        shipperName: shipperName,
        driverName: currentUser.name || "Sürücü",
        driverPlate: currentUser.plateNumber || "34 --- --",
        origin: activeTask.origin,
        destination: activeTask.destination,
        goodsDescription: activeTask.goodsType || activeTask.description || "Genel Kargo",
        price: activeTask.price || activeTask.agreedPrice || 0
    });
    setIsContractOpen(true);
  };

  // --- 🔥 DEĞERLENDİRME AÇMA (YENİ) ---
  const handleOpenReview = async (task: any) => {
      // Yük verenin adını bul
      let shipperName = "Yük Sahibi";
      if (task.createdBy) {
          const sDoc = await getDoc(doc(db, "users", task.createdBy));
          if(sDoc.exists()) shipperName = sDoc.data().name || sDoc.data().companyName;
      }

      setReviewData({
          jobId: task.id,
          targetUserId: task.createdBy, // Yükü veren kişiyi puanlıyoruz
          targetUserName: shipperName
      });
      setIsReviewOpen(true);
  };

  const handleUpdateStatus = async (newStatus: string) => {
      if (!activeTask) return;
      try {
          const taskRef = doc(db, "loads", activeTask.id);
          await updateDoc(taskRef, { status: newStatus, updatedAt: serverTimestamp() });
          if (newStatus === 'Teslim Edildi') {
              alert("Tebrikler! Görev tamamlandı.");
              setActiveTask(null);
              // Otomatik olarak geçmiş sekmesine atabiliriz
              setActiveTab('history');
          }
      } catch (error) { console.error(error); }
  };

  const directionsCallback = (response: any) => {
    if (response !== null && response.status === 'OK') setDirectionsResponse(response);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* BAŞLIK VE SEKMELER */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <FiNavigation className="text-blue-600" /> Görev Yönetimi
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Mevcut taşımalarınızı yönetin ve geçmiş seferlerinizi inceleyin.
          </p>
        </div>

        <div className="bg-white dark:bg-[#0F1629] p-1.5 rounded-xl border border-gray-200 dark:border-white/10 flex">
            <button onClick={() => setActiveTab('active')} className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'active' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'}`}><FiTruck /> Aktif Görev</button>
            <button onClick={() => setActiveTab('history')} className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'history' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'}`}><FiClock /> Geçmiş</button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* 1. AKTİF GÖREV EKRANI */}
        {activeTab === 'active' && (
            <motion.div key="active" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {activeTask ? (
                    <>
                        {/* SOL: HARİTA */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="h-[400px] bg-[#1c1c1e] rounded-3xl overflow-hidden shadow-lg border border-gray-200 dark:border-white/5 relative group">
                                {isLoaded ? (
                                    <GoogleMap mapContainerStyle={mapContainerStyle} center={{ lat: 39.9334, lng: 32.8597 }} zoom={6} options={{ styles: darkMapStyle, disableDefaultUI: true }}>
                                        <DirectionsService options={{ destination: activeTask.destination, origin: activeTask.origin, travelMode: window.google.maps.TravelMode.DRIVING }} callback={directionsCallback} />
                                        {directionsResponse && (<DirectionsRenderer options={{ directions: directionsResponse, suppressMarkers: false, polylineOptions: { strokeColor: "#3b82f6", strokeWeight: 6 } }} />)}
                                    </GoogleMap>
                                ) : ( <div className="w-full h-full flex items-center justify-center text-gray-500">Harita Yükleniyor...</div> )}
                                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10"><div className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div><span className="text-white text-xs font-bold uppercase tracking-wider">Canlı Takip</span></div></div>
                            </div>
                            {/* Rota Bilgisi */}
                            <div className="bg-white dark:bg-[#0F1629] p-6 rounded-3xl border border-gray-200 dark:border-white/5 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                                <div className="flex items-center gap-4 w-full md:w-auto"><div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-full flex items-center justify-center text-xl shrink-0"><FiMapPin /></div><div><p className="text-xs text-gray-400 uppercase font-bold mb-1">Başlangıç</p><h3 className="font-bold text-gray-900 dark:text-white text-lg">{activeTask.origin}</h3></div></div>
                                <div className="flex-1 border-t-2 border-dashed border-gray-200 dark:border-white/10 w-full md:w-auto relative"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-50 dark:bg-[#0F1629] px-2 text-gray-400 text-xs">--- km</div></div>
                                <div className="flex items-center gap-4 w-full md:w-auto justify-end"><div className="text-right"><p className="text-xs text-gray-400 uppercase font-bold mb-1">Varış</p><h3 className="font-bold text-gray-900 dark:text-white text-lg">{activeTask.destination}</h3></div><div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 text-orange-600 rounded-full flex items-center justify-center text-xl shrink-0"><FiNavigation /></div></div>
                            </div>
                        </div>
                        {/* SAĞ: DURUM KONTROLÜ */}
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-[#0F1629] p-6 rounded-3xl border border-gray-200 dark:border-white/5 shadow-sm h-full flex flex-col">
                                <div className="mb-6"><span className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wide mb-2">Aktif Görev</span><h2 className="text-2xl font-bold text-gray-900 dark:text-white">{activeTask.vehicleType || "Tır"} İle Taşıma</h2><p className="text-gray-500 text-sm mt-1">Yük ID: #{activeTask.displayId || activeTask.id.substring(0,6)}</p></div>
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-white/5 rounded-xl"><span className="text-sm text-gray-500 flex items-center gap-2"><FiBox /> Yük Tipi</span><span className="font-bold text-gray-900 dark:text-white">{activeTask.goodsType || "Genel Yük"}</span></div>
                                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-white/5 rounded-xl"><span className="text-sm text-gray-500 flex items-center gap-2"><FiDollarSign /> Kazanç</span><span className="font-bold text-green-600">₺{activeTask.price || activeTask.agreedPrice || 0}</span></div>
                                </div>
                                <div className="mt-auto space-y-3">
                                    <button onClick={handleOpenContract} className="w-full py-4 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"><FiFileText /> Dijital Sözleşme</button>
                                    <button onClick={() => handleUpdateStatus('Teslim Edildi')} className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-600/20 transition-all flex items-center justify-center gap-2 active:scale-95"><FiCheckCircle /> Teslimatı Tamamla</button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="col-span-3 py-20 text-center bg-gray-50 dark:bg-white/5 rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/10">
                        <div className="w-20 h-20 bg-gray-200 dark:bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400 text-3xl"><FiTruck /></div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Aktif Göreviniz Yok</h2>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">Şu anda üzerinize atanmış bir taşıma bulunmuyor. Yük piyasasından kendinize uygun bir iş bulabilirsiniz.</p>
                        <Link href="/panel/yuk-piyasasi" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all inline-flex items-center gap-2">Yük Piyasasına Git <FiArrowRight /></Link>
                    </div>
                )}
            </motion.div>
        )}

        {/* 2. GEÇMİŞ GÖREVLER */}
        {activeTab === 'history' && (
            <motion.div key="history" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 text-xs uppercase font-bold">
                            <tr>
                                <th className="px-6 py-4">Tarih</th>
                                <th className="px-6 py-4">Rota</th>
                                <th className="px-6 py-4">Yük</th>
                                <th className="px-6 py-4">Kazanç</th>
                                <th className="px-6 py-4 text-right">Aksiyon</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                            {historyTasks.map((task) => (
                                <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{task.updatedAt?.toDate ? new Date(task.updatedAt.toDate()).toLocaleDateString('tr-TR') : '---'}</td>
                                    <td className="px-6 py-4"><div className="flex flex-col"><span className="text-xs text-gray-500">Nereden</span><span className="font-bold text-gray-900 dark:text-white text-sm">{task.origin}</span><span className="text-xs text-gray-500 mt-1">Nereye</span><span className="font-bold text-gray-900 dark:text-white text-sm">{task.destination}</span></div></td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{task.vehicleType} / {task.weight}</td>
                                    <td className="px-6 py-4 font-bold text-green-600">₺{task.price}</td>
                                    <td className="px-6 py-4 text-right">
                                        {/* 🔥 PUANLA BUTONU */}
                                        <button 
                                            onClick={() => handleOpenReview(task)}
                                            className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/40 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ml-auto"
                                        >
                                            <FiStar className="fill-current" /> Değerlendir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {historyTasks.length === 0 && (<tr><td colSpan={5} className="px-6 py-10 text-center text-gray-500">Henüz tamamlanmış bir göreviniz yok.</td></tr>)}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        )}

      </AnimatePresence>

      {/* SÖZLEŞME MODALI */}
      {contractData && (
        <FreightContractModal isOpen={isContractOpen} onClose={() => setIsContractOpen(false)} data={contractData} />
      )}

      {/* 🔥 DEĞERLENDİRME MODALI */}
      {reviewData && (
        <ReviewModal 
            isOpen={isReviewOpen} 
            onClose={() => setIsReviewOpen(false)} 
            jobId={reviewData.jobId} 
            targetUserId={reviewData.targetUserId}
            targetUserName={reviewData.targetUserName}
        />
      )}

    </div>
  );
}