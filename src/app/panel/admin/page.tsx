'use client';

import React, { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebase';
import {
    collection, query, orderBy, onSnapshot, doc, updateDoc,
    deleteDoc, getDoc, where, getDocs, addDoc, serverTimestamp, limit
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import {
    FiGrid, FiUsers, FiFileText, FiTool, FiMap, FiDollarSign, FiList, FiSliders,
    FiLogOut, FiMenu, FiActivity, FiDatabase, FiCpu, FiSend, FiXCircle, FiCheckCircle, FiLock, FiUserCheck, FiTrash2, FiEye, FiUser, FiShield
} from 'react-icons/fi';

import UsersModule from '@/components/admin/UsersModule';
import OperationsView from '@/components/admin/OperationsView';
import FinanceView from '@/components/admin/FinanceView';
import LogsView from '@/components/admin/LogsView';
import SettingsView from '@/components/admin/SettingsView';

interface User { id: string; name: string; email: string; role: string; isVerified: boolean; isBanned?: boolean; phone?: string; photoURL?: string; createdAt?: any; }
interface UserDocument { id: string; type: string; name: string; status: string; uploadedAt: any; fileUrl?: string; userId: string; rejectReason?: string; fileName?: string; }
interface UserVehicle { id: string; plate: string; brand: string; model: string; status: string; userId: string; }
interface Load { id: string; pickup: string; delivery: string; price: number; status: 'pending' | 'active' | 'completed' | 'cancelled'; driverId?: string; shipperId: string; createdAt: any; }
interface AdminLog { id: string; action: string; targetId: string; adminId: string; timestamp: any; details: string; }
interface WebhookLog { id: string; gateway: string; status: number; loadId?: string; error?: string; createdAt: any; }

export default function AdminPage() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'kyc' | 'operations' | 'finance' | 'logs' | 'settings'>('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [users, setUsers] = useState<User[]>([]);
    const [loads, setLoads] = useState<Load[]>([]);
    const [logs, setLogs] = useState<AdminLog[]>([]);
    const [webhooks, setWebhooks] = useState<WebhookLog[]>([]);
    const [pendingDocs, setPendingDocs] = useState<UserDocument[]>([]);
    const [stats, setStats] = useState({ totalUsers: 0, revenue: 0, pending: 0, activeLoads: 0 });
    const [metrics, setMetrics] = useState({ reads: 45200, writes: 12500 });

    const [maintenanceConfig, setMaintenanceConfig] = useState({ isActive: false, title: '', message: '', expectedEndTime: '', allowedIps: '' });
    const [wafConfig, setWafConfig] = useState({ rateLimit: 100, blocklist: '', suspiciousThreshold: 5 });
    const [featureFlags, setFeatureFlags] = useState({ newPaymentGateway: false, autoKYC: true, mapboxIntegration: false, driverRewards: false });

    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [userDocs, setUserDocs] = useState<UserDocument[]>([]);
    const [userVehicles, setUserVehicles] = useState<UserVehicle[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTab, setModalTab] = useState<'profile' | 'documents' | 'vehicles'>('profile');
    const [pendingRole, setPendingRole] = useState<string>('');

    const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
    const [broadcastMessage, setBroadcastMessage] = useState({ title: '', body: '', target: 'all' });

    useEffect(() => {
        const checkAdmin = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists() && userDoc.data().role === 'admin') {
                    setIsAdmin(true);
                    startLiveData();
                } else { setIsAdmin(false); setLoading(false); }
            } else { setIsAdmin(false); setLoading(false); }
        });
        return () => checkAdmin();
    }, []);

    const startLiveData = () => {
        const unsubUsers = onSnapshot(query(collection(db, "users"), orderBy("createdAt", "desc")), (snap) => {
            const uList = snap.docs.map(d => ({ id: d.id, ...d.data() } as User));
            setUsers(uList);
            setStats(prev => ({ ...prev, totalUsers: uList.length, pending: uList.filter(u => !u.isVerified && !u.isBanned).length }));
        });

        const unsubLoads = onSnapshot(query(collection(db, "loads"), orderBy("createdAt", "desc")), (snap) => {
            const lList = snap.docs.map(d => ({ id: d.id, ...d.data() } as Load));
            setLoads(lList);
            setStats(prev => ({ ...prev, activeLoads: lList.filter(l => l.status === 'active').length, revenue: lList.reduce((acc, curr) => acc + (curr.price * 0.10), 0) }));
        });

        const unsubLogs = onSnapshot(query(collection(db, "admin_logs"), orderBy("timestamp", "desc"), limit(50)), (snap) => {
            setLogs(snap.docs.map(d => ({ id: d.id, ...d.data() } as AdminLog)));
        });

        const unsubWebhooks = onSnapshot(query(collection(db, "payment_logs"), orderBy("createdAt", "desc"), limit(50)), (snap) => {
            setWebhooks(snap.docs.map(d => ({ id: d.id, ...d.data() } as WebhookLog)));
        });

        const unsubDocs = onSnapshot(query(collection(db, "documents"), where("status", "==", "pending")), (snap) => {
            setPendingDocs(snap.docs.map(d => ({ id: d.id, ...d.data() } as UserDocument)));
        });

        onSnapshot(doc(db, "system", "maintenance"), (d) => { if (d.exists()) setMaintenanceConfig(d.data() as any); });
        onSnapshot(doc(db, "system", "waf"), (d) => { if (d.exists()) setWafConfig(d.data() as any); });
        onSnapshot(doc(db, "system", "features"), (d) => { if (d.exists()) setFeatureFlags(d.data() as any); });

        setTimeout(() => setLoading(false), 500);
        return () => { unsubUsers(); unsubLoads(); unsubLogs(); unsubWebhooks(); unsubDocs(); };
    };

    const logAction = async (action: string, targetId: string, details: string) => {
        if (!auth.currentUser) return;
        await addDoc(collection(db, "admin_logs"), { action, targetId, details, adminId: auth.currentUser.uid, timestamp: serverTimestamp() });
    };

    const handleGlobalDocAction = async (docId: string, isApproved: boolean, userId: string) => {
        let reason = "";
        if (!isApproved) {
            reason = prompt("Belgeyi reddetme sebebini yazın:") || "Belge standartlara uymuyor.";
            if (!reason) return;
        } else { if (!confirm("Belgeyi onaylıyorsunuz, emin misiniz?")) return; }

        try {
            await updateDoc(doc(db, "documents", docId), { status: isApproved ? 'approved' : 'rejected', rejectReason: reason });
            await logAction("GLOBAL_KYC_REVIEW", docId, `Status: ${isApproved ? 'Approved' : 'Rejected'}`);
            await addDoc(collection(db, "notifications"), {
                userId: userId, title: isApproved ? "Belge Onaylandı 🎉" : "Belge Reddedildi",
                message: isApproved ? "Evrak başarıyla onaylandı." : `Belge reddedildi. Sebep: ${reason}`,
                type: isApproved ? "success" : "error", createdAt: serverTimestamp(), read: false
            });
        } catch (error: any) { alert("Hata: " + error.message); }
    };

    const openUserDetail = async (user: User) => {
        setSelectedUser(user);
        setPendingRole(user.role || 'customer');
        setModalTab('profile');
        setIsModalOpen(true);
        const docsSnap = await getDocs(query(collection(db, "documents"), where("userId", "==", user.id)));
        setUserDocs(docsSnap.docs.map(d => ({ id: d.id, ...d.data() } as UserDocument)));
        const vehSnap = await getDocs(query(collection(db, "vehicles"), where("userId", "==", user.id)));
        setUserVehicles(vehSnap.docs.map(d => ({ id: d.id, ...d.data() } as UserVehicle)));
    };

    const handleVerify = async (userId: string, status: boolean) => {
        if (!confirm(status ? "Kullanıcı onaylanacak?" : "Onay kaldırılacak?")) return;
        try {
            await updateDoc(doc(db, "users", userId), { isVerified: status, verifiedAt: status ? new Date() : null });
            await logAction("VERIFY_USER", userId, `Status: ${status}`);
            if (selectedUser) setSelectedUser({ ...selectedUser, isVerified: status });
        } catch (e: any) { alert(e.message); }
    };

    const handleBan = async (userId: string, status: boolean) => {
        if (!confirm(status ? "Kullanıcı banlanacak?" : "Ban kaldırılacak?")) return;
        try {
            await updateDoc(doc(db, "users", userId), { isBanned: status });
            await logAction("BAN_USER", userId, `Banned: ${status}`);
            if (selectedUser) setSelectedUser({ ...selectedUser, isBanned: status });
        } catch (e: any) { alert(e.message); }
    };

    const handleDelete = async (userId: string) => {
        if (!confirm("⚠️ KALICI SİLME İŞLEMİ!")) return;
        try {
            await deleteDoc(doc(db, "users", userId));
            await logAction("DELETE_USER", userId, "User deleted permanently");
            setIsModalOpen(false);
        } catch (e: any) { alert(e.message); }
    };

    const handleChangeRole = async (userId: string, newRole: string) => {
        if (!confirm(`Kullanıcının yetkisini "${newRole.toUpperCase()}" olarak değiştirmek istediğinize emin misiniz?`)) return;
        try {
            await updateDoc(doc(db, "users", userId), { role: newRole });
            await logAction("CHANGE_ROLE", userId, `Assigned new role: ${newRole}`);
            if (selectedUser) setSelectedUser({ ...selectedUser, role: newRole });
            alert("✅ Yetki başarıyla güncellendi!");
        } catch (e: any) { alert(e.message); }
    };

    const handleImpersonate = async () => {
        if (!selectedUser) return;
        if (!confirm(`⚠️ ${selectedUser.name} hesabına geçiş yapıyorsunuz. Devam edilsin mi?`)) return;
        await logAction("IMPERSONATE_USER", selectedUser.id, `Shadow mode activated`);
        alert("Gölge Modu aktif (Demo).");
    };

    const handleBroadcast = async () => {
        if (!broadcastMessage.title || !broadcastMessage.body) return alert("Başlık ve mesaj girin.");
        await addDoc(collection(db, "notifications"), { type: 'info', category: 'system', title: broadcastMessage.title, message: broadcastMessage.body, targetRole: broadcastMessage.target, createdAt: serverTimestamp(), read: false, userId: 'broadcast' });
        await logAction("BROADCAST", "ALL", `Message: ${broadcastMessage.title}`);
        alert("Duyuru başarıyla gönderildi!");
        setIsBroadcastOpen(false); setBroadcastMessage({ title: '', body: '', target: 'all' });
    };

    const exportToCSV = () => {
        const headers = ["ID", "Name", "Email", "Role", "Phone", "Status"];
        const rows = users.map(u => [u.id, u.name, u.email, u.role, u.phone || '', u.isVerified ? 'Verified' : 'Pending']);
        let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
        const link = document.createElement("a"); link.setAttribute("href", encodeURI(csvContent)); link.setAttribute("download", "traxle_users.csv"); document.body.appendChild(link); link.click();
        logAction("EXPORT_DATA", "USERS", "Exported CSV");
    };

    if (loading) {
        return (
            <div className="flex h-screen bg-[#050814] w-full overflow-hidden">
                <div className="w-[280px] border-r border-white/5 p-6 flex flex-col gap-6 bg-[#0A0A0A]">
                    <div className="w-32 h-10 bg-white/10 animate-pulse rounded-xl mb-4"></div>
                    {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="w-full h-11 bg-white/5 animate-pulse rounded-2xl"></div>)}
                </div>
                <div className="flex-1 p-8 flex flex-col gap-8">
                    <div className="w-full h-16 bg-white/5 animate-pulse rounded-2xl"></div>
                    <div className="grid grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(i => <div key={i} className="w-full h-32 bg-[#0A0A0A] border border-white/5 animate-pulse rounded-[32px]"></div>)}
                    </div>
                    <div className="w-full h-96 bg-[#0A0A0A] border border-white/5 animate-pulse rounded-[32px]"></div>
                </div>
            </div>
        );
    }

    if (!isAdmin) return <div className="h-screen flex items-center justify-center bg-black text-red-500 font-bold">Erişim Engellendi (403)</div>;

    return (
        <div className="flex h-screen bg-[#050814] overflow-hidden text-white font-sans selection:bg-blue-500/30">

            <motion.aside initial={{ width: 280 }} animate={{ width: sidebarOpen ? 280 : 80 }} className="bg-[#0A0A0A] border-r border-white/5 flex flex-col z-20 relative shadow-2xl">
                <div className="h-24 flex items-center px-6 border-b border-white/5 relative">
                    {sidebarOpen ? (
                        <div className="flex items-center gap-3">
                            <Link href="/panel/admin" className="relative w-28 h-8 block">
                                <Image src="/logo.png" alt="Traxle" fill className="object-contain object-left invert opacity-90" priority />
                            </Link>
                            <span className="px-2 py-0.5 rounded text-[9px] font-black tracking-widest bg-red-500/10 text-red-500 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]">MASTER</span>
                        </div>
                    ) : (
                        <div className="w-full flex justify-center"><span className="text-2xl font-black text-blue-500">T</span></div>
                    )}
                </div>
                <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
                    <SidebarItem icon={<FiGrid />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} open={sidebarOpen} />

                    {sidebarOpen && <div className="text-[10px] font-bold text-gray-500 uppercase px-4 mt-6 mb-2">Yönetim</div>}
                    <SidebarItem icon={<FiUsers />} label="Kullanıcılar" active={activeTab === 'users'} onClick={() => setActiveTab('users')} open={sidebarOpen} />
                    <SidebarItem icon={<FiFileText />} label="KYC Merkezi" active={activeTab === 'kyc'} onClick={() => setActiveTab('kyc')} open={sidebarOpen} badge={stats.pending} />

                    {sidebarOpen && <div className="text-[10px] font-bold text-gray-500 uppercase px-4 mt-6 mb-2">Operasyon</div>}
                    <SidebarItem icon={<FiTool />} label="Operasyonlar" active={activeTab === 'operations'} onClick={() => setActiveTab('operations')} open={sidebarOpen} />
                    <SidebarItem icon={<FiDollarSign />} label="Finansman" active={activeTab === 'finance'} onClick={() => setActiveTab('finance')} open={sidebarOpen} />

                    {sidebarOpen && <div className="text-[10px] font-bold text-gray-500 uppercase px-4 mt-6 mb-2">Sistem</div>}
                    <SidebarItem icon={<FiList />} label="Audit Logs" active={activeTab === 'logs'} onClick={() => setActiveTab('logs')} open={sidebarOpen} />
                    <SidebarItem icon={<FiSliders />} label="Ayarlar" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} open={sidebarOpen} />
                </nav>
                <div className="p-4 border-t border-white/5">
                    <button onClick={() => auth.signOut()} className="flex items-center gap-3 w-full p-3 text-xs font-bold text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors">
                        <FiLogOut className="text-lg" /> {sidebarOpen && "Güvenli Çıkış"}
                    </button>
                </div>
            </motion.aside>

            <main className="flex-1 flex flex-col relative overflow-hidden">
                <header className="h-20 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8 z-10">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-white/5 rounded-xl text-gray-400"><FiMenu size={20} /></button>
                        <div className="text-sm text-gray-400 font-medium">Yönetim <span className="mx-2">/</span> <span className="text-white capitalize">{activeTab}</span></div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsBroadcastOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white rounded-lg text-xs font-bold transition-all">
                            <FiSend /> Duyuru Yap
                        </button>
                        <div className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 flex items-center gap-2">
                            <FiActivity className="text-green-400 animate-pulse" /><span className="text-[10px] font-bold font-mono text-green-400">SİSTEM AKTİF</span>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 scroll-smooth relative">
                    <AnimatePresence mode='wait'>
                        {activeTab === 'dashboard' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <BentoCard title="Net Ciro (Komisyon)" value={`₺${stats.revenue.toLocaleString()}`} icon={<FiDollarSign />} color="text-green-400" bg="bg-green-500/10" border="border-green-500/20" />
                                    <BentoCard title="Aktif Operasyonlar" value={stats.activeLoads} icon={<FiTool />} color="text-blue-400" bg="bg-blue-500/10" border="border-blue-500/20" />
                                    <BentoCard title="Toplam Kullanıcı" value={stats.totalUsers} icon={<FiUsers />} color="text-purple-400" bg="bg-purple-500/10" border="border-purple-500/20" />
                                    <BentoCard title="Onay Bekleyenler" value={stats.pending} icon={<FiFileText />} color="text-orange-400" bg="bg-orange-500/10" border="border-orange-500/20" />
                                </div>

                                <div className="grid lg:grid-cols-3 gap-6">
                                    <div className="lg:col-span-2 bg-[#0A0A0A] border border-white/5 rounded-[32px] p-8 relative overflow-hidden group hover:border-white/10 transition-colors shadow-2xl">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700"></div>
                                        <h3 className="font-bold text-lg mb-6 flex items-center gap-2 relative z-10"><FiDatabase className="text-indigo-400" /> Firebase Tüketim Monitörü</h3>
                                        <div className="space-y-6 relative z-10">
                                            <div>
                                                <div className="flex justify-between text-sm mb-2 text-gray-400"><span>Firestore Okuma (Aylık)</span><span className="font-mono text-white">{metrics.reads.toLocaleString()} / 50k</span></div>
                                                <div className="w-full bg-white/5 rounded-full h-2"><div className="bg-indigo-500 h-2 rounded-full w-[90%]"></div></div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-sm mb-2 text-gray-400"><span>Firestore Yazma (Aylık)</span><span className="font-mono text-white">{metrics.writes.toLocaleString()} / 20k</span></div>
                                                <div className="w-full bg-white/5 rounded-full h-2"><div className="bg-purple-500 h-2 rounded-full w-[60%]"></div></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-[#0A0A0A] border border-white/5 rounded-[32px] p-8 shadow-2xl hover:border-white/10 transition-colors">
                                        <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><FiCpu className="text-gray-400" /> Servis Sağlığı</h3>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5"><span className="text-sm font-bold text-gray-300">Auth Server</span><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span></div>
                                            <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5"><span className="text-sm font-bold text-gray-300">Realtime DB</span><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span></div>
                                            <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5"><span className="text-sm font-bold text-gray-300">Payment Webhooks</span><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span></div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'users' && <UsersModule key="users" users={users} openDetail={openUserDetail} exportCSV={exportToCSV} />}
                        {activeTab === 'kyc' && <KYCView key="kyc" documents={pendingDocs} users={users} onAction={handleGlobalDocAction} />}
                        {activeTab === 'operations' && <OperationsView key="ops" loads={loads} />}
                        {activeTab === 'finance' && <FinanceView key="fin" loads={loads} webhooks={webhooks} logAction={logAction} />}
                        {activeTab === 'logs' && <LogsView key="logs" logs={logs} />}
                        {activeTab === 'settings' && <SettingsView key="set" config={maintenanceConfig} setConfig={setMaintenanceConfig} waf={wafConfig} setWaf={setWafConfig} features={featureFlags} setFeatures={setFeatureFlags} logAction={logAction} logs={logs} />}
                    </AnimatePresence>
                </div>
            </main>

            <AnimatePresence>
                {isModalOpen && selectedUser && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-[#1A1A1A] w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[85vh] border border-white/10">
                            <div className="p-6 bg-white/5 border-b border-white/10 flex justify-between items-center shrink-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-2xl font-bold text-blue-400 overflow-hidden relative">
                                        {selectedUser.photoURL ? <Image src={selectedUser.photoURL} alt="" fill className="object-cover" /> : selectedUser.name?.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                            {selectedUser.name} {selectedUser.isVerified && <FiCheckCircle className="text-green-500 w-5 h-5" />}
                                        </h2>
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <span>{selectedUser.email}</span><span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                            <span className="uppercase font-bold text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded">{selectedUser.role}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button onClick={handleImpersonate} className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/40 rounded-xl text-sm font-bold transition-colors">
                                        <FiUserCheck /> Gölge Modu
                                    </button>
                                    <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-red-500 transition-colors"><FiXCircle size={28} /></button>
                                </div>
                            </div>

                            <div className="flex border-b border-white/10 px-6 shrink-0 bg-[#1A1A1A]">
                                <ModalTab label="Profil & İşlemler" icon={<FiUsers />} active={modalTab === 'profile'} onClick={() => setModalTab('profile')} />
                                <ModalTab label={`KYC Onay Hattı (${userDocs.length})`} icon={<FiFileText />} active={modalTab === 'documents'} onClick={() => setModalTab('documents')} />
                                <ModalTab label={`Araçlar (${userVehicles.length})`} icon={<FiTool />} active={modalTab === 'vehicles'} onClick={() => setModalTab('vehicles')} />
                            </div>

                            <div className="p-8 overflow-y-auto flex-1 bg-[#050814]">
                                {modalTab === 'profile' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <h3 className="font-bold text-lg text-white border-b border-white/10 pb-2">Kullanıcı Bilgileri</h3>
                                            <div className="space-y-3">
                                                <InfoRow label="Kayıt Tarihi" value={selectedUser.createdAt?.toDate ? new Date(selectedUser.createdAt.toDate()).toLocaleDateString() : '---'} />
                                                <InfoRow label="Telefon" value={selectedUser.phone || '---'} />
                                                <InfoRow label="Hesap ID" value={selectedUser.id} mono />
                                                <InfoRow label="Onay Durumu" value={selectedUser.isVerified ? 'Onaylı' : 'Bekliyor'} isStatus status={selectedUser.isVerified} />
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <h3 className="font-bold text-lg text-white border-b border-white/10 pb-2">Yönetici İşlemleri</h3>
                                            <div className="grid grid-cols-1 gap-3">
                                                <button onClick={() => handleVerify(selectedUser.id, !selectedUser.isVerified)} className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${selectedUser.isVerified ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border border-yellow-500/20' : 'bg-green-600 text-white hover:bg-green-700'}`}>
                                                    {selectedUser.isVerified ? <><FiXCircle /> Onayı Kaldır</> : <><FiCheckCircle /> Kullanıcıyı Onayla</>}
                                                </button>
                                                <button onClick={() => handleBan(selectedUser.id, !selectedUser.isBanned)} className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${selectedUser.isBanned ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20'}`}>
                                                    {selectedUser.isBanned ? <><FiCheckCircle /> Banı Kaldır</> : <><FiLock /> Hesabı Banla</>}
                                                </button>

                                                <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10">
                                                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2"><FiShield /> Yetki Ataması</h4>
                                                    <div className="flex gap-2">
                                                        <select value={pendingRole} onChange={(e) => setPendingRole(e.target.value)} className="flex-1 bg-[#1A1A1A] border border-white/10 rounded-lg text-xs px-3 py-2 outline-none font-bold text-gray-300">
                                                            <option value="admin_kyc">KYC & Müşteri Uzmanı</option>
                                                            <option value="admin_op">Operasyon Yöneticisi</option>
                                                            <option value="admin_finance">Finans Uzmanı</option>
                                                            <option value="admin_it">IT & Sistem Yöneticisi</option>
                                                            <option value="supplier">Tedarikçi (Makine Sahibi)</option>
                                                            <option value="customer">Şantiye (Müşteri)</option>
                                                            <option value="admin">Master Admin</option>
                                                        </select>
                                                        <button onClick={() => handleChangeRole(selectedUser.id, pendingRole)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-lg">Yetkiyi Ata</button>
                                                    </div>
                                                </div>
                                                <div className="pt-4 border-t border-white/10">
                                                    <button onClick={() => handleDelete(selectedUser.id)} className="w-full py-3 border border-red-500/30 text-red-500 rounded-xl text-xs font-bold hover:bg-red-500/10 flex items-center justify-center gap-1"><FiTrash2 /> Hesabı Tamamen Sil</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {modalTab === 'documents' && (
                                    <div className="space-y-4">
                                        {userDocs.length === 0 && <p className="text-gray-500 text-center py-10">Belge bulunmuyor.</p>}
                                        {userDocs.map(doc => (
                                            <div key={doc.id} className="bg-white/5 p-5 rounded-2xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${doc.status === 'approved' ? 'bg-green-500/20 text-green-400' : doc.status === 'rejected' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}><FiFileText /></div>
                                                    <div>
                                                        <p className="font-bold text-white">{doc.name}</p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${doc.status === 'approved' ? 'bg-green-500/20 text-green-400' : doc.status === 'rejected' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{doc.status === 'pending' ? 'İnceleme Bekliyor' : doc.status}</span>
                                                            <span className="text-xs text-gray-500 uppercase">{doc.type}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 w-full md:w-auto">
                                                    {doc.fileUrl && <a href={doc.fileUrl} target="_blank" className="p-2 border border-white/10 rounded-lg hover:bg-white/5"><FiEye className="w-5 h-5 text-gray-300" /></a>}
                                                    <button onClick={() => handleGlobalDocAction(doc.id, true, selectedUser.id)} className="px-4 py-2 bg-green-500/20 hover:bg-green-500/40 text-green-400 border border-green-500/30 rounded-lg text-sm font-bold transition-colors">Onayla</button>
                                                    <button onClick={() => handleGlobalDocAction(doc.id, false, selectedUser.id)} className="px-4 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 border border-red-500/30 rounded-lg text-sm font-bold transition-colors">Reddet</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {modalTab === 'vehicles' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {userVehicles.length === 0 && <p className="text-gray-500">Araç yok.</p>}
                                        {userVehicles.map(veh => (
                                            <div key={veh.id} className="bg-white/5 p-4 rounded-xl border border-white/10">
                                                <div className="flex justify-between mb-2"><span className="font-bold text-lg">{veh.plate}</span><span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded font-bold uppercase">{veh.status}</span></div>
                                                <p className="text-sm text-gray-400">{veh.brand} {veh.model}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isBroadcastOpen && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsBroadcastOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-[#1A1A1A] border border-white/10 w-full max-w-md p-6 rounded-3xl shadow-2xl">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white"><FiSend className="text-indigo-400" /> Toplu Duyuru Gönder</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Hedef Kitle</label>
                                    <select value={broadcastMessage.target} onChange={e => setBroadcastMessage({ ...broadcastMessage, target: e.target.value })} className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none text-white font-bold">
                                        <option value="all" className="bg-black">Tüm Kullanıcılar</option>
                                        <option value="supplier" className="bg-black">Sadece Tedarikçiler</option>
                                        <option value="customer" className="bg-black">Sadece Şantiyeler</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Başlık</label>
                                    <input type="text" value={broadcastMessage.title} onChange={e => setBroadcastMessage({ ...broadcastMessage, title: e.target.value })} className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none text-white font-bold" placeholder="Örn: Sistem Bakımı" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Mesaj</label>
                                    <textarea value={broadcastMessage.body} onChange={e => setBroadcastMessage({ ...broadcastMessage, body: e.target.value })} className="w-full p-3 bg-white/5 border border-white/10 rounded-xl outline-none h-24 resize-none text-white font-medium" placeholder="Mesajınızı buraya yazın..." />
                                </div>
                                <button onClick={handleBroadcast} className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-indigo-500/30">Gönder</button>
                            </div>
                            <button onClick={() => setIsBroadcastOpen(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white"><FiXCircle size={24} /></button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

function KYCView({ documents, users, onAction }: any) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold flex items-center gap-2"><FiFileText className="text-blue-400" /> KYC & Belge Onay Merkezi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                {documents.length === 0 && (
                    <div className="col-span-full py-16 text-center text-gray-500 bg-[#0A0A0A] rounded-[32px] border border-dashed border-white/10">
                        <FiCheckCircle className="mx-auto text-4xl text-green-500 mb-4 opacity-50" />
                        <p className="text-lg font-bold text-white">Her Şey Temiz!</p><p className="text-sm">İncelenecek yeni belge bulunmuyor.</p>
                    </div>
                )}
                {documents.map((doc: any) => {
                    const user = users.find((u: any) => u.id === doc.userId);
                    return (
                        <div key={doc.id} className="bg-[#0A0A0A] p-6 rounded-[32px] border border-white/5 shadow-xl flex flex-col gap-4 relative overflow-hidden group hover:border-white/20 transition-all">
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center text-xl shrink-0"><FiFileText /></div>
                                <div className="min-w-0">
                                    <h3 className="font-bold text-white truncate">{doc.name}</h3>
                                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5"><FiUser /> <span className="truncate">{user?.name || 'Bilinmeyen'}</span></div>
                                </div>
                            </div>
                            <div className="mt-auto flex gap-2 pt-2 relative z-10">
                                {doc.fileUrl && <a href={doc.fileUrl} target="_blank" className="flex items-center justify-center p-3 border border-white/10 rounded-xl text-gray-300 hover:bg-white/5"><FiEye size={18} /></a>}
                                <button onClick={() => onAction(doc.id, false, doc.userId)} className="flex-[0.5] py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-sm font-bold transition-all">Reddet</button>
                                <button onClick={() => onAction(doc.id, true, doc.userId)} className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-green-500/20 transition-all">Onayla</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function BentoCard({ title, value, icon, color, bg, border }: any) {
    return (
        <div className={`p-6 rounded-[32px] bg-[#0A0A0A] border border-white/5 hover:border-white/10 transition-all shadow-xl group relative overflow-hidden`}>
            <div className={`absolute -right-4 -top-4 w-24 h-24 ${bg} blur-2xl rounded-full group-hover:scale-150 transition-transform duration-700`}></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-gray-400 text-sm font-medium">{title}</span>
                    <div className={`p-2 rounded-xl ${bg} ${color} ${border} border`}>{icon}</div>
                </div>
                <span className="text-3xl font-black text-white tracking-tight">{value}</span>
            </div>
        </div>
    );
}

function SidebarItem({ icon, label, active, onClick, open, badge }: any) {
    return (
        <button onClick={onClick} className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group ${active ? 'bg-white/10 text-white shadow-inner' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'} ${!open ? 'justify-center' : ''}`}>
            <div className={`text-xl ${active ? 'text-blue-400' : 'group-hover:text-gray-300'}`}>{icon}</div>
            {open && <div className="flex-1 text-left text-sm font-bold flex justify-between items-center">{label} {badge > 0 && <span className="bg-red-500/20 text-red-500 border border-red-500/30 text-[10px] px-2 py-0.5 rounded-full">{badge}</span>}</div>}
        </button>
    );
}
function ModalTab({ label, icon, active, onClick }: any) { return <button onClick={onClick} className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-colors ${active ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-300'}`}>{icon} {label}</button> }
function InfoRow({ label, value, mono, isStatus, status }: any) { return <div className="flex justify-between items-center py-2 border-b border-white/5 last:border-0"><span className="text-sm text-gray-500">{label}</span>{isStatus ? <span className={`text-xs font-bold px-2 py-1 rounded-full ${status ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'}`}>{value}</span> : <span className={`text-sm font-bold text-white ${mono ? 'font-mono text-gray-400' : ''}`}>{value}</span>}</div> }