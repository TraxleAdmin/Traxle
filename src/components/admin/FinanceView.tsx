'use client';

import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiTool, FiAlertTriangle, FiDatabase, FiTerminal, FiCheckCircle } from 'react-icons/fi';
import UnifiedCard from '@/components/ui/UnifiedCard';
import { Load } from './OperationsView';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, doc, updateDoc, serverTimestamp } from 'firebase/firestore';

export interface WebhookLog {
    id: string; gateway: string; status: number; loadId?: string; error?: string; createdAt: any;
}

interface FinanceViewProps {
    loads: Load[];
    webhooks: WebhookLog[];
    logAction?: (action: string, targetId: string, details: string) => Promise<void>;
}

export default function FinanceView({ loads, webhooks, logAction }: FinanceViewProps) {
    const totalRevenue = loads.reduce((acc, l) => acc + l.price, 0);
    const estimatedCommission = totalRevenue * 0.10;

    const [withdrawals, setWithdrawals] = useState<any[]>([]);

    useEffect(() => {
        const q = query(collection(db, "transactions"), where("category", "==", "withdrawal"), where("status", "==", "pending"));
        const unsub = onSnapshot(q, (snapshot) => {
            setWithdrawals(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsub();
    }, []);

    const handleApproveWithdrawal = async (id: string, amount: number, userId: string) => {
        if (!confirm(`Bu tedarikçiye ₺${amount} EFT/Havale işlemini gerçekleştirdiniz mi? Sistemde "Ödendi" olarak işaretlenecek.`)) return;

        try {
            await updateDoc(doc(db, "transactions", id), {
                status: "completed",
                processedAt: serverTimestamp()
            });

            if (logAction) {
                await logAction("APPROVE_WITHDRAWAL", id, `Approved withdrawal of ₺${amount} for user ${userId}`);
            }
            alert("İşlem başarıyla onaylandı!");
        } catch (error: any) {
            alert("Yetki Hatası: " + error.message);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold flex items-center gap-2">
                <FiDollarSign className="text-green-500" /> Finansal Analiz & Ödeme İzleme
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <UnifiedCard type="stat" title="Toplam İşlem Hacmi (GMV)" value={`₺${totalRevenue.toLocaleString()}`} icon={<FiTool />} color="from-blue-500 to-indigo-600" />
                <UnifiedCard type="stat" title="Tahmini Kasa Girişi" value={`₺${estimatedCommission.toLocaleString()}`} icon={<FiDollarSign />} color="from-green-500 to-emerald-600" />
                <UnifiedCard type="stat" title="Bekleyen Ödeme" value={`₺${withdrawals.reduce((a, b) => a + b.amount, 0).toLocaleString()}`} icon={<FiAlertTriangle />} color="from-orange-500 to-red-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-[#0A0A0A] p-6 rounded-3xl border border-gray-200 dark:border-white/5 shadow-xl flex flex-col h-[400px]">
                    <h3 className="font-bold mb-6 flex items-center gap-2 text-lg">
                        <FiDatabase className="text-blue-500" /> EFT/Havale Bekleyenler
                    </h3>
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                        {withdrawals.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500">
                                <FiCheckCircle className="text-4xl text-green-500 mb-3 opacity-50" />
                                <p>Bekleyen ödeme talebi yok.</p>
                            </div>
                        ) : (
                            <table className="w-full text-sm text-left">
                                <thead className="text-gray-500 border-b border-gray-100 dark:border-white/10 sticky top-0 bg-white dark:bg-[#0A0A0A] z-10">
                                    <tr>
                                        <th className="pb-4 font-semibold uppercase text-xs">Tedarikçi ID</th>
                                        <th className="pb-4 font-semibold uppercase text-xs">Tutar</th>
                                        <th className="pb-4 font-semibold uppercase text-xs text-right">İşlem</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                                    {withdrawals.map(w => (
                                        <tr key={w.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                            <td className="py-4 font-mono text-xs">{w.userId.substring(0, 8)}...</td>
                                            <td className="font-mono font-bold py-4 text-red-500">-₺{w.amount}</td>
                                            <td className="py-4 text-right">
                                                <button onClick={() => handleApproveWithdrawal(w.id, w.amount, w.userId)} className="px-4 py-2 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 rounded-lg text-xs font-bold hover:bg-green-100 transition-colors">
                                                    Gönderildi İşaretle
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                <div className="bg-[#1e1e1e] border border-gray-700 p-6 rounded-3xl shadow-2xl flex flex-col h-[400px]">
                    <h3 className="font-bold mb-6 flex items-center justify-between text-gray-300 font-mono text-lg">
                        <div className="flex items-center gap-2"><FiTerminal className="text-purple-400" /> Webhook_Stream</div>
                    </h3>
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                        <table className="w-full text-xs text-left font-mono text-gray-400">
                            <thead className="border-b border-gray-700 text-gray-500 sticky top-0 bg-[#1e1e1e] z-10">
                                <tr>
                                    <th className="pb-3">Gateway</th>
                                    <th className="pb-3">Status</th>
                                    <th className="pb-3 text-right">Zaman</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {(!webhooks || webhooks.length === 0) ? (
                                    <tr><td colSpan={3} className="py-8 text-center text-gray-600">Log yok.</td></tr>
                                ) : (
                                    webhooks.map(wh => (
                                        <tr key={wh.id} className="hover:bg-white/5 transition-colors">
                                            <td className="py-4 font-bold text-gray-300">{wh.gateway}</td>
                                            <td className="py-4">
                                                <span className={`px-2 py-1 rounded inline-flex font-bold ${wh.status === 200 ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                                    {wh.status === 200 ? '200 OK' : `${wh.status} ERR`}
                                                </span>
                                            </td>
                                            <td className="py-4 text-right text-gray-500">
                                                {wh.createdAt?.toDate ? new Date(wh.createdAt.toDate()).toLocaleTimeString('tr-TR') : '...'}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}