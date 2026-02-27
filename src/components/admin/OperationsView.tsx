'use client';

import React from 'react';
import { FiTruck, FiArrowRight, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';
import { db } from '@/lib/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

export interface Load {
    id: string; pickup: string; delivery: string; price: number;
    status: 'pending' | 'active' | 'completed' | 'cancelled';
    driverId?: string; shipperId: string; createdAt: any;
}

export default function OperationsView({ loads }: { loads: Load[] }) {
    
    const handleCancelLoad = async (id: string) => {
        if(!confirm("Bu yük ilanını iptal etmek istediğinize emin misiniz? Sürücü atanmışsa işlem geri alınamaz!")) return;
        try {
            await updateDoc(doc(db, "loads", id), { 
                status: 'cancelled', 
                updatedAt: serverTimestamp(),
                cancelledBy: 'admin_op'
            });
            alert("İlan iptal edildi.");
        } catch (error: any) { alert("Yetki Hatası: " + error.message); }
    };

    const getStatusConfig = (status: Load['status']) => {
        switch (status) {
            case 'active': return { color: 'bg-blue-100 text-blue-700', label: 'AKTİF / YOLDA', icon: <FiTruck className="inline mr-1" /> };
            case 'pending': return { color: 'bg-yellow-100 text-yellow-700', label: 'BEKLİYOR', icon: <FiClock className="inline mr-1" /> };
            case 'completed': return { color: 'bg-green-100 text-green-700', label: 'TAMAMLANDI', icon: <FiCheckCircle className="inline mr-1" /> };
            case 'cancelled': return { color: 'bg-red-100 text-red-700', label: 'İPTAL EDİLDİ', icon: <FiXCircle className="inline mr-1" /> };
            default: return { color: 'bg-gray-100 text-gray-700', label: status, icon: null };
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold flex items-center gap-2"><FiTruck className="text-blue-500"/> Operasyon Merkezi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loads.length === 0 ? (
                    <div className="col-span-full p-12 bg-white dark:bg-[#0A0A0A] border border-dashed rounded-3xl text-center text-gray-500">Sistemde yük bulunmuyor.</div>
                ) : (
                    loads.map((load) => {
                        const statusConfig = getStatusConfig(load.status);
                        return (
                            <div key={load.id} className="bg-white dark:bg-[#0A0A0A] p-6 rounded-3xl border border-gray-200 dark:border-white/10 flex flex-col justify-between shadow-sm">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className={`text-[10px] font-bold px-3 py-1.5 rounded-full inline-flex items-center uppercase mb-2 ${statusConfig.color}`}>{statusConfig.icon} {statusConfig.label}</div>
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">İlan #{load.id.slice(0,8)}</h3>
                                    </div>
                                    <span className="font-mono text-xl font-black text-green-600">₺{load.price.toLocaleString()}</span>
                                </div>
                                <div className="space-y-4 mb-8 bg-gray-50 dark:bg-white/5 p-4 rounded-2xl">
                                    <div className="flex items-start gap-3 text-sm">
                                        <div className="mt-1 w-2.5 h-2.5 bg-blue-500 rounded-full shrink-0"></div> 
                                        <div><span className="text-xs text-gray-400 block mb-0.5">Yükleme</span><span className="font-medium">{load.pickup}</span></div>
                                    </div>
                                    <div className="ml-1 w-0.5 h-4 bg-gray-300 dark:bg-gray-700"></div>
                                    <div className="flex items-start gap-3 text-sm">
                                        <div className="mt-1 w-2.5 h-2.5 bg-orange-500 rounded-full shrink-0"></div> 
                                        <div><span className="text-xs text-gray-400 block mb-0.5">Teslimat</span><span className="font-medium">{load.delivery}</span></div>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button className="flex-1 py-3 bg-gray-100 dark:bg-white/5 hover:text-blue-500 rounded-xl text-xs font-bold flex items-center justify-center gap-2">Detay Gör <FiArrowRight /></button>
                                    {load.status !== 'cancelled' && load.status !== 'completed' && (
                                        <button onClick={() => handleCancelLoad(load.id)} className="flex-[0.5] py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold transition-colors">İptal Et</button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}