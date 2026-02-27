'use client';

import React from 'react';
import { FiList } from 'react-icons/fi';

export interface AdminLog {
    id: string;
    action: string;
    targetId: string;
    adminId: string;
    timestamp: any;
    details: string;
}

interface LogsViewProps {
    logs: AdminLog[];
}

export default function LogsView({ logs }: LogsViewProps) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold flex items-center gap-2">
                <FiList className="text-blue-500"/> Denetim Günlüğü (Audit Logs)
            </h2>
            
            <div className="bg-white dark:bg-[#0A0A0A] rounded-3xl border border-gray-200 dark:border-white/5 overflow-hidden shadow-xl">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 border-b border-gray-100 dark:border-white/10">
                            <tr>
                                <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">İşlem (Action)</th>
                                <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Hedef ID</th>
                                <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">İşlemi Yapan (Admin ID)</th>
                                <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider">Aksiyon Detayı</th>
                                <th className="px-6 py-4 font-bold uppercase text-xs tracking-wider text-right">Zaman Damgası</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                            {logs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-gray-500 font-medium">
                                        Henüz kaydedilmiş bir denetim izi bulunmuyor.
                                    </td>
                                </tr>
                            ) : (
                                logs.map((log) => (
                                    <tr key={log.id} className="hover:bg-blue-50/50 dark:hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded text-xs tracking-wide">
                                                {log.action}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs text-gray-700 dark:text-gray-300">
                                            {log.targetId}
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs text-gray-500">
                                            {log.adminId}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                            {log.details}
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-right font-mono text-xs">
                                            {log.timestamp?.toDate ? new Date(log.timestamp.toDate()).toLocaleString('tr-TR') : 'Yükleniyor...'}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}