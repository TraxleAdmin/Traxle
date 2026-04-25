'use client';

import React, { useState } from 'react';
import { FiSearch, FiDownload, FiArrowRight } from 'react-icons/fi';

export interface User {
    id: string; name: string; email: string; role: string; isVerified: boolean;
    isBanned?: boolean; phone?: string; photoURL?: string; vehicleType?: string;
    plateNumber?: string; createdAt?: any; walletBalance?: number; rating?: number; lastIp?: string;
}

interface UsersModuleProps {
    users: User[];
    openDetail: (user: User) => void;
    exportCSV: () => void;
}

function FilterButton({ label, active, onClick, isDanger }: { label: string, active: boolean, onClick: () => void, isDanger?: boolean }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${active ? (isDanger ? 'bg-red-600 text-white border-red-600' : 'bg-blue-600 text-white border-blue-600')
                    : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10'
                }`}
        >
            {label}
        </button>
    );
}

export default function UsersModule({ users, openDetail, exportCSV }: UsersModuleProps) {
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('all');

    const filtered = users.filter((u) => {
        if (filterType === 'pending' && (u.isVerified || u.isBanned)) return false;
        if (filterType === 'banned' && !u.isBanned) return false;
        if (filterType === 'suppliers' && u.role !== 'supplier') return false;
        if (filterType === 'customers' && u.role !== 'customer') return false;

        const searchLower = search.toLowerCase();
        return (u.name?.toLowerCase().includes(searchLower) || u.email?.toLowerCase().includes(searchLower));
    });

    return (
        <div className="flex flex-col h-full gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                    <FilterButton label="Tümü" active={filterType === 'all'} onClick={() => setFilterType('all')} />
                    <FilterButton label="Onay Bekleyen" active={filterType === 'pending'} onClick={() => setFilterType('pending')} />
                    <FilterButton label="Tedarikçiler" active={filterType === 'suppliers'} onClick={() => setFilterType('suppliers')} />
                    <FilterButton label="Şantiyeler" active={filterType === 'customers'} onClick={() => setFilterType('customers')} />
                    <FilterButton label="Banlılar" active={filterType === 'banned'} onClick={() => setFilterType('banned')} isDanger />
                </div>

                <div className="flex gap-2 shrink-0">
                    <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-green-500/20 transition-all active:scale-95">
                        <FiDownload /> CSV İndir
                    </button>
                    <div className="relative w-full md:w-64">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Kullanıcı Ara (İsim, E-posta)..." onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" />
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden flex flex-col shadow-sm">
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-white/5 text-xs uppercase text-gray-500 font-bold sticky top-0 backdrop-blur-md z-10">
                            <tr><th className="px-6 py-4">Kullanıcı Bilgisi</th><th className="px-6 py-4">Sistem Rolü</th><th className="px-6 py-4">Onay Durumu</th><th className="px-6 py-4 text-right">Aksiyon</th></tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                            {filtered.length === 0 ? (
                                <tr><td colSpan={4} className="text-center py-10 text-gray-500">Arama kriterlerine uygun kullanıcı bulunamadı.</td></tr>
                            ) : (
                                filtered.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group" onClick={() => openDetail(user)}>
                                        <td className="px-6 py-4 font-medium flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-inner">{user.name?.charAt(0).toUpperCase() || '?'}</div>
                                            <div><p className="text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">{user.name}</p><p className="text-xs text-gray-500">{user.email}</p></div>
                                        </td>
                                        <td className="px-6 py-4 text-sm capitalize text-gray-600 dark:text-gray-300">{user.role}</td>
                                        <td className="px-6 py-4">
                                            {user.isVerified ? <span className="inline-flex items-center gap-1 text-green-600 bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded text-xs font-bold">Onaylı</span> : <span className="inline-flex items-center gap-1 text-orange-600 bg-orange-100 dark:bg-orange-900/20 px-2 py-1 rounded text-xs font-bold">Bekliyor</span>}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                                                <FiArrowRight className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                                            </div>
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