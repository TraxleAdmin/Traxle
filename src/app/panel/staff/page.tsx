'use client';

import React, { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebase';
import { 
  collection, query, orderBy, onSnapshot, doc, getDoc, updateDoc, where, getDocs, addDoc, serverTimestamp, limit 
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import { 
  FiGrid, FiUsers, FiTruck, FiMap, FiDollarSign, FiList, 
  FiMenu, FiLogOut, FiShieldOff, FiXCircle, FiCheckCircle, FiFileText, FiDownload, FiArrowRight, FiAlertTriangle, FiSliders, FiShield, FiLock, FiEye, FiUser 
} from 'react-icons/fi';

import UsersModule from '@/components/admin/UsersModule';
import OperationsView from '@/components/admin/OperationsView';
import FinanceView from '@/components/admin/FinanceView'; 
import LogsView from '@/components/admin/LogsView';
import SettingsView from '@/components/admin/SettingsView'; 

type StaffRole = 'admin_kyc' | 'admin_op' | 'admin_finance' | 'admin_it';

const ROLE_CONFIG: Record<StaffRole, any> = {
  admin_kyc: { title: 'KYC & Müşteri Uzmanı', color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20', allowedTabs: ['dashboard', 'users', 'kyc'] },
  admin_op: { title: 'Operasyon Yöneticisi', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', allowedTabs: ['dashboard', 'operations', 'map'] },
  admin_finance: { title: 'Finans Uzmanı', color: 'text-amber-400 bg-amber-400/10 border-amber-400/20', allowedTabs: ['dashboard', 'finance'] },
  admin_it: { title: 'Sistem Yöneticisi', color: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20', allowedTabs: ['dashboard', 'logs', 'settings'] }
};

const ALL_MENU_ITEMS = [
  { id: 'dashboard', label: 'Personel Özeti', icon: <FiGrid />, category: 'Genel' },
  { id: 'users', label: 'Kullanıcılar', icon: <FiUsers />, category: 'Müşteri Yönetimi' },
  { id: 'kyc', label: 'KYC Onay Merkezi', icon: <FiFileText />, category: 'Müşteri Yönetimi' },
  { id: 'operations', label: 'Operasyon Merkezi', icon: <FiTruck />, category: 'Lojistik' },
  { id: 'map', label: 'Canlı Harita', icon: <FiMap />, category: 'Lojistik' },
  { id: 'finance', label: 'Kasa & Webhook', icon: <FiDollarSign />, category: 'Finansman' },
  { id: 'logs', label: 'Denetim İzi', icon: <FiList />, category: 'IT & Sistem' },
  { id: 'settings', label: 'Sistem Ayarları', icon: <FiSliders />, category: 'IT & Sistem' },
];

export default function StaffRouterPage() {
  const [role, setRole] = useState<StaffRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [users, setUsers] = useState<any[]>([]);
  const [loads, setLoads] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [webhooks, setWebhooks] = useState<any[]>([]); 
  const [pendingDocs, setPendingDocs] = useState<any[]>([]); 
  const [stats, setStats] = useState({ totalUsers: 0, activeLoads: 0, revenue: 0, pending: 0 });

  const [maintenanceConfig, setMaintenanceConfig] = useState({ isActive: false, title: '', message: '', expectedEndTime: '', allowedIps: '' });
  const [wafConfig, setWafConfig] = useState({ rateLimit: 100, blocklist: '', suspiciousThreshold: 5 });
  const [featureFlags, setFeatureFlags] = useState({ newPaymentGateway: false, autoKYC: true, mapboxIntegration: false, driverRewards: false });

  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const checkAccess = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userRole = userDoc.data().role as StaffRole;
          if (ROLE_CONFIG[userRole]) {
            setRole(userRole);
            startDataStreams(userRole);
          } else { setRole(null); setLoading(false); }
        }
      } else { setRole(null); setLoading(false); }
    });
    return () => checkAccess();
  }, []);

  const startDataStreams = (userRole: StaffRole) => {
    const config = ROLE_CONFIG[userRole];
    
    if (config.allowedTabs.includes('users') || config.allowedTabs.includes('dashboard') || config.allowedTabs.includes('kyc')) {
        onSnapshot(query(collection(db, "users"), orderBy("createdAt", "desc")), (snap) => {
            const uList = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            setUsers(uList);
            setStats(prev => ({ ...prev, totalUsers: uList.length, pending: uList.filter((u:any) => !u.isVerified && !u.isBanned).length }));
        });
        onSnapshot(query(collection(db, "documents"), where("status", "==", "pending")), (snap) => {
            setPendingDocs(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
    }

    if (config.allowedTabs.includes('operations') || config.allowedTabs.includes('finance') || config.allowedTabs.includes('dashboard')) {
        onSnapshot(query(collection(db, "loads"), orderBy("createdAt", "desc")), (snap) => {
            const lList = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            setLoads(lList);
            setStats(prev => ({ ...prev, activeLoads: lList.filter((l:any) => l.status === 'active').length, revenue: lList.reduce((acc, curr:any) => acc + (curr.price * 0.10), 0) }));
        });
        onSnapshot(query(collection(db, "payment_logs"), orderBy("createdAt", "desc"), limit(50)), (snap) => {
            setWebhooks(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        });
    }

    if (config.allowedTabs.includes('logs') || config.allowedTabs.includes('settings')) {
        onSnapshot(query(collection(db, "admin_logs"), orderBy("timestamp", "desc")), (snap) => {
            setLogs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        });
    }

    if (config.allowedTabs.includes('settings')) {
        onSnapshot(doc(db, "system", "maintenance"), (d) => { if(d.exists()) setMaintenanceConfig(d.data() as any); });
        onSnapshot(doc(db, "system", "waf"), (d) => { if(d.exists()) setWafConfig(d.data() as any); });
        onSnapshot(doc(db, "system", "features"), (d) => { if(d.exists()) setFeatureFlags(d.data() as any); });
    }
    setTimeout(() => setLoading(false), 500);
  };

  const logAction = async (action: string, targetId: string, details: string) => {
      if (!auth.currentUser) return;
      await addDoc(collection(db, "admin_logs"), { action, targetId, details, adminId: auth.currentUser.uid, timestamp: serverTimestamp() });
  };

  const handleVerify = async (userId: string, status: boolean) => {
    if(!confirm(status ? "Onaylanacak?" : "Onay kaldırılacak?")) return;
    try {
      await updateDoc(doc(db, "users", userId), { isVerified: status, verifiedAt: status ? new Date() : null });
      await logAction("VERIFY_USER", userId, `Status: ${status}`);
      if (selectedUser) setSelectedUser({ ...selectedUser, isVerified: status });
    } catch (e: any) { alert("Yetki Hatası: " + e.message); }
  };

  const handleBan = async (userId: string, status: boolean) => {
    if(!confirm(status ? "BANLANACAK?" : "Ban kaldırılacak?")) return;
    try {
      await updateDoc(doc(db, "users", userId), { isBanned: status });
      await logAction("BAN_USER", userId, `Banned: ${status}`);
      if (selectedUser) setSelectedUser({ ...selectedUser, isBanned: status });
    } catch (e: any) { alert("Yetki Hatası: " + e.message); }
  };

  const handleGlobalDocAction = async (docId: string, isApproved: boolean, userId: string) => {
      let reason = "";
      if (!isApproved) {
          reason = prompt("Ret sebebi:") || "Standartlara uymuyor.";
          if (!reason) return;
      } else { if(!confirm("Onaylıyorsunuz?")) return; }

      try {
          await updateDoc(doc(db, "documents", docId), { status: isApproved ? 'approved' : 'rejected', rejectReason: reason });
          await logAction("GLOBAL_KYC_REVIEW", docId, `Status: ${isApproved ? 'Approved' : 'Rejected'}`);
          await addDoc(collection(db, "notifications"), {
              userId: userId, title: isApproved ? "Belge Onaylandı 🎉" : "Belge Reddedildi", 
              message: isApproved ? "Evrak onaylandı." : `Belge reddedildi. Sebep: ${reason}`, 
              type: isApproved ? "success" : "error", createdAt: serverTimestamp(), read: false
          });
      } catch (error: any) { alert("Hata: " + error.message); }
  };

  if (loading) {
      return (
          <div className="flex h-screen bg-[#050814] w-full overflow-hidden">
              <div className="w-[280px] border-r border-white/5 p-6 flex flex-col gap-6 bg-[#0A0A0A]">
                 <div className="w-32 h-10 bg-white/10 animate-pulse rounded-xl mb-4"></div>
                 {[1,2,3,4].map(i => <div key={i} className="w-full h-11 bg-white/5 animate-pulse rounded-2xl"></div>)}
              </div>
              <div className="flex-1 p-8 flex flex-col gap-8">
                 <div className="w-full h-16 bg-white/5 animate-pulse rounded-2xl"></div>
                 <div className="grid grid-cols-3 gap-6">
                    {[1,2,3].map(i => <div key={i} className="w-full h-32 bg-[#0A0A0A] border border-white/5 animate-pulse rounded-[32px]"></div>)}
                 </div>
                 <div className="w-full h-96 bg-[#0A0A0A] border border-white/5 animate-pulse rounded-[32px]"></div>
              </div>
          </div>
      );
  }

  if (!role) return <div className="h-screen flex items-center justify-center bg-black text-red-500 font-bold">Erişim Engellendi (403)</div>;

  const currentConfig = ROLE_CONFIG[role];
  const authorizedMenuItems = ALL_MENU_ITEMS.filter(item => currentConfig.allowedTabs.includes(item.id));

  return (
    <div className="flex h-screen bg-[#050814] overflow-hidden text-white font-sans selection:bg-blue-500/30">
      
      <motion.aside initial={{ width: 280 }} animate={{ width: sidebarOpen ? 280 : 80 }} className="bg-[#0A0A0A] border-r border-white/5 flex flex-col z-20 shadow-2xl relative">
        <div className="h-24 flex items-center px-6 border-b border-white/5 relative">
            {sidebarOpen ? (
                <div className="flex items-center gap-3">
                    <Link href="/panel/staff" className="relative w-28 h-8 block">
                        <Image src="/logo.png" alt="Traxle" fill className="object-contain object-left invert opacity-90" priority />
                    </Link>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black tracking-widest border ${currentConfig.color}`}>STAFF</span>
                </div>
            ) : (
                <div className="w-full flex justify-center"><span className="text-2xl font-black text-blue-500">T</span></div>
            )}
        </div>
        <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
            {authorizedMenuItems.map((item, index) => (
               <React.Fragment key={item.id}>
                 {(index === 0 || authorizedMenuItems[index - 1].category !== item.category) && sidebarOpen && (
                    <div className="text-[10px] font-bold text-gray-500 uppercase px-4 mt-6 mb-2">{item.category}</div>
                 )}
                 <button onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group ${activeTab === item.id ? 'bg-white/10 text-white shadow-inner' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'} ${!sidebarOpen ? 'justify-center' : ''}`}>
                    <div className={`text-xl ${activeTab === item.id ? 'text-blue-400' : 'group-hover:text-gray-300'}`}>{item.icon}</div>
                    {sidebarOpen && <div className="flex-1 text-left text-sm font-bold flex justify-between">{item.label} {item.id === 'kyc' && pendingDocs.length > 0 && <span className="bg-red-500/20 text-red-500 border border-red-500/30 text-[10px] px-2 py-0.5 rounded-full">{pendingDocs.length}</span>}</div>}
                 </button>
               </React.Fragment>
            ))}
        </nav>
        <div className="p-4 border-t border-white/5">
            <button onClick={() => auth.signOut()} className="flex items-center gap-3 w-full p-3 text-xs font-bold text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors">
                <FiLogOut className="text-lg" /> {sidebarOpen && "Güvenli Çıkış"}
            </button>
        </div>
      </motion.aside>

      <main className="flex-1 flex flex-col relative overflow-hidden">
        <header className="h-20 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5 flex items-center px-8 z-10">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 mr-4 text-gray-400 hover:bg-white/5 rounded-xl"><FiMenu size={20} /></button>
            <div className="text-sm font-medium"><span className={currentConfig.color.split(' ')[0]}>{currentConfig.title}</span> <span className="mx-2 text-gray-600">/</span> <span className="capitalize text-white">{activeTab}</span></div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 scroll-smooth relative">
            <AnimatePresence mode='wait'>
                <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="h-full">
                    
                    {activeTab === 'dashboard' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {role === 'admin_finance' && <BentoCard title="Kasa Hacmi" value={`₺${stats.revenue.toLocaleString()}`} icon={<FiDollarSign/>} color="text-amber-400" bg="bg-amber-500/10" border="border-amber-500/20" />}
                            {(role === 'admin_op' || role === 'admin_finance') && <BentoCard title="Aktif Operasyonlar" value={stats.activeLoads} icon={<FiTruck/>} color="text-emerald-400" bg="bg-emerald-500/10" border="border-emerald-500/20" />}
                            {role === 'admin_kyc' && <BentoCard title="Kullanıcı Havuzu" value={stats.totalUsers} icon={<FiUsers/>} color="text-cyan-400" bg="bg-cyan-500/10" border="border-cyan-500/20" />}
                            {role === 'admin_kyc' && <BentoCard title="Bekleyen Evrak" value={stats.pending} icon={<FiAlertTriangle />} color="text-orange-400" bg="bg-orange-500/10" border="border-orange-500/20" />}
                        </div>
                    )}

                    {activeTab === 'users' && <UsersModule users={users} openDetail={(u) => { setSelectedUser(u); setIsModalOpen(true); }} exportCSV={() => {}} />}
                    {activeTab === 'kyc' && <KYCView documents={pendingDocs} users={users} onAction={handleGlobalDocAction} />}
                    {activeTab === 'operations' && <OperationsView loads={loads} />}
                    {activeTab === 'finance' && <FinanceView loads={loads} webhooks={webhooks} logAction={logAction} />}
                    {activeTab === 'logs' && <LogsView logs={logs} />}
                    {activeTab === 'settings' && <SettingsView config={maintenanceConfig} setConfig={setMaintenanceConfig} waf={wafConfig} setWaf={setWafConfig} features={featureFlags} setFeatures={setFeatureFlags} logAction={logAction} logs={logs} />}

                </motion.div>
            </AnimatePresence>
        </div>
      </main>

      {/* KYC Modal (Personel Sadece Onay/Ban Yapar, Rol Değiştiremez) */}
      <AnimatePresence>
        {isModalOpen && selectedUser && role === 'admin_kyc' && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-[#1A1A1A] border border-white/10 w-full max-w-xl p-6 rounded-[32px] shadow-2xl">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-2xl font-bold text-cyan-400">
                                {selectedUser.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">{selectedUser.name}</h2>
                                <p className="text-sm text-gray-400">{selectedUser.email}</p>
                                <span className={`text-[10px] uppercase px-2 py-0.5 rounded mt-1 inline-block font-bold border ${selectedUser.isVerified ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'}`}>
                                    {selectedUser.isVerified ? 'Onaylı Kullanıcı' : 'Onay Bekliyor'}
                                </span>
                            </div>
                        </div>
                        <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white"><FiXCircle size={28} /></button>
                    </div>
                    
                    <div className="bg-black/50 p-4 rounded-2xl border border-white/5 mb-6">
                        <div className="flex justify-between items-center py-2 border-b border-white/5"><span className="text-sm text-gray-500">Kayıt Türü</span><span className="font-bold text-sm text-white uppercase">{selectedUser.role}</span></div>
                        <div className="flex justify-between items-center py-2"><span className="text-sm text-gray-500">Telefon</span><span className="font-bold text-sm text-white">{selectedUser.phone || '-'}</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => handleVerify(selectedUser.id, !selectedUser.isVerified)} className={`py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${selectedUser.isVerified ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 hover:bg-yellow-500/20' : 'bg-green-600 text-white shadow-lg shadow-green-500/20 hover:bg-green-700'}`}>
                            {selectedUser.isVerified ? <><FiXCircle/> Onayı Kaldır</> : <><FiCheckCircle/> Hesabı Onayla</>}
                        </button>
                        <button onClick={() => handleBan(selectedUser.id, !selectedUser.isBanned)} className={`py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${selectedUser.isBanned ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20'}`}>
                            {selectedUser.isBanned ? <><FiCheckCircle/> Banı Kaldır</> : <><FiLock/> Kullanıcıyı Banla</>}
                        </button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Ortak Bileşenler (KYC ve Bento Card)
function KYCView({ documents, users, onAction }: any) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold flex items-center gap-2"><FiFileText className="text-blue-400"/> KYC & Belge Onay Merkezi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                {documents.length === 0 && (
                    <div className="col-span-full py-16 text-center text-gray-500 bg-[#0A0A0A] rounded-[32px] border border-dashed border-white/10">
                        <FiCheckCircle className="mx-auto text-4xl text-green-500 mb-4 opacity-50" />
                        <p className="text-lg font-bold text-white">Her Şey Temiz!</p><p className="text-sm">İncelenecek yeni belge bulunmuyor.</p>
                    </div>
                )}
                {documents.map((doc:any) => {
                    const user = users.find((u:any) => u.id === doc.userId);
                    return (
                        <div key={doc.id} className="bg-[#0A0A0A] p-6 rounded-[32px] border border-white/5 shadow-xl flex flex-col gap-4 relative overflow-hidden group hover:border-white/20 transition-all">
                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center text-xl shrink-0"><FiFileText/></div>
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