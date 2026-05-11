'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import {
    updateProfile, User, reauthenticateWithCredential, EmailAuthProvider,
    updatePassword, verifyBeforeUpdateEmail, multiFactor
} from 'firebase/auth';
import { doc, onSnapshot, updateDoc, collection, addDoc, query, where, deleteDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiTrash2, FiAlertTriangle, FiUser, FiSettings, FiMail, FiCheckCircle,
    FiShield, FiFileText, FiCamera, FiX, FiUpload, FiSmartphone, FiLock,
    FiSave, FiKey, FiList, FiMonitor, FiArrowLeft, FiBell, FiMoon, FiGlobe,
    FiDownloadCloud, FiEyeOff, FiCreditCard, FiMapPin, FiSmile, FiLink, FiCpu
} from 'react-icons/fi';
import DeleteAccountModal from '../DeleteAccount';

interface Document { id: string; type: string; name: string; status: 'approved' | 'pending' | 'rejected'; uploadedAt: any; fileName?: string; rejectReason?: string; }
interface LoginLog { id: string; ip: string; device: string; status: string; timestamp: any; }

export default function SettingsPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'preferences' | 'privacy' | 'documents'>('profile');
    const [loading, setLoading] = useState(true);

    // States
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });
    const [pwdLoading, setPwdLoading] = useState(false);
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);

    // --- 🔥 YENİ PREMİUM ÖZELLİK STATES ---
    const [ghostMode, setGhostMode] = useState(false);
    const [downloadFormat, setDownloadFormat] = useState<'JSON' | 'HTML'>('HTML');
    const [downloadState, setDownloadState] = useState<'idle' | 'preparing' | 'ready'>('idle');
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [permissions, setPermissions] = useState({ analytics: true, personalization: true, publicProfile: false });

    const [documents, setDocuments] = useState<Document[]>([]);
    const [loginLogs, setLoginLogs] = useState<LoginLog[]>([]);
    const docInputRef = useRef<HTMLInputElement>(null);
    const [uploadDocType, setUploadDocType] = useState<string>('');

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [statusPopup, setStatusPopup] = useState<{ isOpen: boolean, type: 'success' | 'error', title: string, message: string }>({ isOpen: false, type: 'success', title: '', message: '' });

    // 🔥 2FA EMAIL DEĞİŞİM STATE'LERİ (Zero-Trust)
    const [isEmailChangeModalOpen, setIsEmailChangeModalOpen] = useState(false);
    const [emailChangeStep, setEmailChangeStep] = useState(1);
    const [phoneCode, setPhoneCode] = useState('');
    const [recoveryCode, setRecoveryCode] = useState('');
    const [newEmailInput, setNewEmailInput] = useState('');
    const [apiLoading, setApiLoading] = useState(false);

    // 🔥 1FA TELEFON DEĞİŞİM STATE'LERİ
    const [isPhoneChangeModalOpen, setIsPhoneChangeModalOpen] = useState(false);
    const [phoneChangeStep, setPhoneChangeStep] = useState(1);
    const [primaryEmailCode, setPrimaryEmailCode] = useState('');
    const [newPhoneInput, setNewPhoneInput] = useState('');

    const showSuccess = (title: string, message: string) => setStatusPopup({ isOpen: true, type: 'success', title, message });
    const showError = (title: string, message: string) => setStatusPopup({ isOpen: true, type: 'error', title, message });
    const closeStatus = () => setStatusPopup({ ...statusPopup, isOpen: false });

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setName(currentUser.displayName || '');
                setEmail(currentUser.email || '');
                setPhotoPreview(currentUser.photoURL || null);

                try { setIs2FAEnabled(multiFactor(currentUser).enrolledFactors.length > 0); } catch (e) { setIs2FAEnabled(false); }

                const unsubUser = onSnapshot(doc(db, "users", currentUser.uid), (docSnap) => {
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setUserData(data);
                        if (data.name) setName(data.name);
                        if (data.photoURL) setPhotoPreview(data.photoURL);
                    }
                });

                const qDocs = query(collection(db, "documents"), where("userId", "==", currentUser.uid), orderBy("uploadedAt", "desc"));
                const unsubDocs = onSnapshot(qDocs, (s) => setDocuments(s.docs.map(d => ({ id: d.id, ...d.data() } as Document))));

                const qLogs = query(collection(db, "user_login_logs"), where("userId", "==", currentUser.uid), orderBy("timestamp", "desc"));
                const unsubLogs = onSnapshot(qLogs, (s) => setLoginLogs(s.docs.map(d => ({ id: d.id, ...d.data() } as LoginLog))));

                setLoading(false);
                return () => { unsubUser(); unsubDocs(); unsubLogs(); };
            } else {
                router.push('/giris');
            }
        });
        return () => unsubscribeAuth();
    }, [router]);

    // ==========================================
    // GERÇEK API: ZERO-TRUST MAİL/TELEFON DEĞİŞİMİ
    // ==========================================

    // E-Posta değiştirmek için hem Telefona hem 2. Maile kod at (Gerçek İstek)
    const handleSendDualCodes = async () => {
        setApiLoading(true);
        try {
            // 1. Kurtarma e-postasına (/api/send-otp) üzerinden kod yolla
            if (!userData?.recoveryEmail) throw new Error("Kurtarma e-postanız kayıtlı değil. Lütfen önce destek ekibine başvurun.");

            const resEmail = await fetch('/api/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userData.recoveryEmail }),
            });

            if (!resEmail.ok) throw new Error("Kurtarma adresine kod gönderilemedi.");

            // 2. Telefona SMS at (Bu kısmı Firebase Phone Auth veya kendi SMS sağlayıcınla bağlarsın, 
            // şimdilik test için API'yi bozmamak adına sadece uyarı basıyoruz ama mail GERÇEK gidiyor.)
            console.log(`[SIMULASYON SMS]: ${userData?.phone} numarasına kod atıldı.`);

            setEmailChangeStep(2);
        } catch (e: any) {
            showError("Bağlantı Hatası", e.message);
        } finally {
            setApiLoading(false);
        }
    };

    const handleVerifyDualCodes = async () => {
        if (!phoneCode || !recoveryCode) return alert("Lütfen iki kodu da girin.");
        setApiLoading(true);
        try {
            // 1. Kurtarma Mailindeki kodu onayla
            const resEmail = await fetch('/api/send-otp', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userData.recoveryEmail, code: recoveryCode }),
            });
            const emailData = await resEmail.json();
            if (!resEmail.ok) throw new Error("E-Posta Kodu Hatası: " + (emailData.message || "Kod geçersiz"));

            // 2. SMS Kodunu onayla (Simülasyon - Geliştirme aşaması için sabit 123456)
            if (phoneCode !== "123456") throw new Error("SMS Kodu Hatalı (Test için 123456 girin)");

            setEmailChangeStep(3);
        } catch (e: any) {
            showError("Doğrulama Başarısız", e.message);
        } finally {
            setApiLoading(false);
        }
    };

    // Telefon değiştirmek için sadece 1. Maile kod at (Gerçek İstek)
    const handleSendSingleCode = async () => {
        setApiLoading(true);
        try {
            if (!userData?.email) throw new Error("Birincil e-postanız bulunamadı.");

            const res = await fetch('/api/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userData.email }),
            });

            if (!res.ok) throw new Error("E-postanıza kod gönderilemedi.");
            setPhoneChangeStep(2);
        } catch (e: any) {
            showError("Hata", e.message);
        } finally {
            setApiLoading(false);
        }
    };

    const handleVerifySingleCode = async () => {
        if (!primaryEmailCode) return;
        setApiLoading(true);
        try {
            const res = await fetch('/api/send-otp', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userData.email, code: primaryEmailCode }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Kod geçersiz veya süresi dolmuş");

            setPhoneChangeStep(3);
        } catch (e: any) {
            showError("Doğrulama Başarısız", e.message);
        } finally {
            setApiLoading(false);
        }
    };


    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, { displayName: name, photoURL: photoPreview });
                await updateDoc(doc(db, "users", auth.currentUser.uid), { name: name, photoURL: photoPreview, updatedAt: serverTimestamp() });
                showSuccess("Profil Güncellendi", "Bilgileriniz başarıyla kaydedildi.");
            }
        } catch (error: any) { showError("Hata", error.message); }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordForm.new !== passwordForm.confirm) return showError("Hata", "Yeni şifreler eşleşmiyor.");
        if (passwordForm.new.length < 6) return showError("Hata", "Şifre en az 6 karakter olmalıdır.");
        setPwdLoading(true);
        try {
            if (auth.currentUser && auth.currentUser.email) {
                const credential = EmailAuthProvider.credential(auth.currentUser.email, passwordForm.current);
                await reauthenticateWithCredential(auth.currentUser, credential);
                await updatePassword(auth.currentUser, passwordForm.new);
                showSuccess("Başarılı", "Şifreniz güncellendi.");
                setPasswordForm({ current: '', new: '', confirm: '' });
            }
        } catch (error: any) {
            if (error.code === 'auth/invalid-credential') showError("Hata", "Mevcut şifrenizi yanlış girdiniz.");
            else showError("Hata", "Şifre güncellenemedi.");
        } finally { setPwdLoading(false); }
    };

    const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !auth.currentUser) return;
        try {
            const docNameMap: any = { 'id_card': 'Kimlik Kartı', 'license': 'Sürücü Belgesi', 'src': 'SRC Belgesi', 'psychotech': 'Psikoteknik' };
            await addDoc(collection(db, "documents"), { userId: auth.currentUser.uid, type: uploadDocType, name: docNameMap[uploadDocType] || 'Belge', status: 'pending', uploadedAt: serverTimestamp(), fileName: file.name });
            showSuccess("Belge Gönderildi", "Belgeniz inceleme sürecine alındı.");
        } catch (error) { showError("Hata", "Yükleme başarısız."); }
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) { const reader = new FileReader(); reader.onloadend = () => setPhotoPreview(reader.result as string); reader.readAsDataURL(file); }
    };

    const handleLogoutAll = async () => {
        if (!confirm("Tüm cihazlardan çıkış yapmak istediğinize emin misiniz?")) return;
        await auth.signOut();
        router.push('/giris');
    };

    const startDownloadRequest = () => {
        setDownloadState('preparing');
        setDownloadProgress(0);
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 15) + 5;
            if (progress >= 100) {
                clearInterval(interval);
                setDownloadProgress(100);
                setTimeout(() => setDownloadState('ready'), 500);
            } else {
                setDownloadProgress(progress);
            }
        }, 400);
    };

    if (loading) return <div className="flex h-screen items-center justify-center"><div className="w-10 h-10 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div></div>;

    const role = userData?.role;
    const isDriver = role === 'driver';
    const isStaffOrAdmin = role === 'admin' || role?.startsWith('admin_');

    return (
        <div className="max-w-6xl mx-auto pb-20 px-4 md:px-0 mt-8">

            {isStaffOrAdmin && (
                <button
                    onClick={() => router.push(role === 'admin' ? '/panel/admin' : '/panel/staff')}
                    className="mb-6 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-bold transition-colors inline-flex items-center gap-2"
                >
                    <FiArrowLeft /> Yönetim Paneline Dön
                </button>
            )}

            <div className="mb-8 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-3xl shadow-lg shadow-blue-500/30"><FiSettings /></div>
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Hesap & Tercihler</h1>
                    <p className="text-gray-500 text-sm mt-1">Traxle deneyiminizi kişiselleştirin ve güvenliğinizi sağlayın.</p>
                </div>
            </div>

            <div className="flex gap-2 mb-8 overflow-x-auto custom-scrollbar pb-2">
                {[
                    { id: 'profile', label: 'Profil & Hesap', icon: <FiUser /> },
                    { id: 'security', label: 'Güvenlik & Giriş', icon: <FiLock /> },
                    { id: 'privacy', label: 'Veri & Gizlilik', icon: <FiShield /> },
                    { id: 'notifications', label: 'Bildirimler', icon: <FiBell /> },
                    { id: 'preferences', label: 'Görünüm & Dil', icon: <FiGlobe /> },
                    { id: 'documents', label: 'Resmi Belgeler', icon: <FiFileText /> }
                ].map((tab) => {
                    if (isStaffOrAdmin && tab.id === 'documents') return null;
                    if (!isDriver && tab.id === 'documents') return null;

                    return (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`relative px-5 py-3 rounded-2xl text-sm font-bold transition-all shrink-0 flex items-center gap-2 ${activeTab === tab.id ? 'bg-gray-900 text-white dark:bg-white dark:text-black shadow-md scale-105' : 'bg-white dark:bg-[#11131F] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 border border-gray-200 dark:border-white/5'}`}>
                            {tab.icon} <span>{tab.label}</span>
                        </button>
                    )
                })}
            </div>

            <AnimatePresence mode="wait">

                {activeTab === 'profile' && (
                    <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-white dark:bg-[#11131F] rounded-[32px] p-6 border border-gray-200 dark:border-white/5 shadow-sm text-center">
                                <div className="relative inline-block mt-4 mb-4">
                                    <div className="w-32 h-32 rounded-full border-4 border-white dark:border-[#050814] shadow-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                                        {photoPreview ? <img src={photoPreview} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-400">{name.charAt(0).toUpperCase()}</div>}
                                    </div>
                                    <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-1 right-1 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center border-4 border-white dark:border-[#050814] shadow-sm hover:scale-110 transition-transform"><FiCamera /></button>
                                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{name}</h2>
                                <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest font-bold">{role}</p>

                                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-500/20 rounded-2xl flex items-center gap-3 text-left">
                                    <div className="text-green-500 text-2xl"><FiSmile /></div>
                                    <div>
                                        <h4 className="text-sm font-bold text-green-700 dark:text-green-400">Hesap Durumu: Kusursuz</h4>
                                        <p className="text-xs text-green-600/80 dark:text-green-400/70">Hiçbir ihlaliniz bulunmuyor.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-[#11131F] rounded-[32px] p-6 border border-gray-200 dark:border-white/5 shadow-sm">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><FiLink /> Bağlı Hesaplar</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 border border-gray-100 dark:border-white/5 rounded-xl">
                                        <div className="flex items-center gap-3"><div className="w-8 h-8 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center text-red-500 font-bold">G</div><span className="text-sm font-bold">Google</span></div>
                                        <span className="text-xs text-green-500 font-bold">Bağlı</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 border border-gray-100 dark:border-white/5 rounded-xl">
                                        <div className="flex items-center gap-3"><div className="w-8 h-8 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center text-gray-900 dark:text-white font-bold">A</div><span className="text-sm font-bold">Apple</span></div>
                                        <button className="text-xs text-blue-500 font-bold hover:underline">Bağla</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-8 space-y-6">
                            <form onSubmit={handleUpdateProfile} className="bg-white dark:bg-[#11131F] rounded-[32px] p-8 border border-gray-200 dark:border-white/5 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Kişisel Bilgiler</h3>
                                    <button type="submit" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all active:scale-95"><FiSave /> Kaydet</button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Ad Soyad</label>
                                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-xl text-gray-900 dark:text-white font-bold border border-gray-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                                    </div>

                                    {/* 1. MAİL ALANI */}
                                    <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20">
                                        <label className="text-xs font-bold text-gray-500 uppercase flex justify-between mb-1">
                                            Birincil E-Posta
                                            <button type="button" onClick={() => { setEmailChangeStep(1); setIsEmailChangeModalOpen(true) }} className="text-blue-600 font-bold hover:underline">Değiştir</button>
                                        </label>
                                        <div className="text-sm font-bold text-gray-900 dark:text-white">{userData?.email}</div>
                                    </div>

                                    {/* 2. KURTARMA MAİLİ ALANI */}
                                    <div className="p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20">
                                        <label className="text-xs font-bold text-orange-500 uppercase mb-1 flex items-center gap-1">
                                            <FiShield /> Kurtarma E-Postası
                                        </label>
                                        <div className="text-sm font-bold text-gray-900 dark:text-white">{userData?.recoveryEmail || "Belirtilmemiş"}</div>
                                    </div>

                                    {/* TELEFON ALANI */}
                                    <div className="md:col-span-2 p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20">
                                        <label className="text-xs font-bold text-gray-500 uppercase flex justify-between mb-1">
                                            Kayıtlı Telefon
                                            <button type="button" onClick={() => { setPhoneChangeStep(1); setIsPhoneChangeModalOpen(true) }} className="text-blue-600 font-bold hover:underline">Değiştir</button>
                                        </label>
                                        <div className="text-sm font-bold text-gray-900 dark:text-white">{userData?.phone}</div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'security' && (
                    <motion.div key="security" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <form onSubmit={handlePasswordChange} className="bg-white dark:bg-[#11131F] p-8 rounded-[32px] border border-gray-200 dark:border-white/5 shadow-sm">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-6"><FiKey className="text-blue-500" /> Şifre Güncelleme</h3>
                                    <div className="space-y-4">
                                        <input type="password" required value={passwordForm.current} onChange={e => setPasswordForm({ ...passwordForm, current: e.target.value })} placeholder="Mevcut Şifre" className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 outline-none text-sm text-gray-900 dark:text-white focus:border-blue-500" />
                                        <input type="password" required value={passwordForm.new} onChange={e => setPasswordForm({ ...passwordForm, new: e.target.value })} placeholder="Yeni Şifre" className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 outline-none text-sm text-gray-900 dark:text-white focus:border-blue-500" />
                                        <input type="password" required value={passwordForm.confirm} onChange={e => setPasswordForm({ ...passwordForm, confirm: e.target.value })} placeholder="Yeni Şifre (Tekrar)" className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 outline-none text-sm text-gray-900 dark:text-white focus:border-blue-500" />
                                        <button type="submit" disabled={pwdLoading} className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50">Şifreyi Değiştir</button>
                                    </div>
                                </form>
                                <div className="bg-white dark:bg-[#11131F] p-8 rounded-[32px] border border-gray-200 dark:border-white/5 shadow-sm">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-1"><FiCpu className="text-purple-500" /> Geçiş Anahtarları (Passkeys)</h3>
                                            <p className="text-sm text-gray-500">Şifre yerine FaceID veya TouchID ile güvenli giriş.</p>
                                        </div>
                                    </div>
                                    <button onClick={() => alert("Passkey altyapısı yakında eklenecektir.")} className="mt-6 w-full py-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-bold rounded-xl hover:bg-purple-100 transition-colors">Anahtar Oluştur</button>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-white dark:bg-[#11131F] p-8 rounded-[32px] border border-gray-200 dark:border-white/5 shadow-sm">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2"><FiSmartphone className="text-green-500" /> İki Adımlı Doğrulama</h3>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" checked={is2FAEnabled} onChange={() => alert("Güvenlik politikalarımız gereği; 2FA aktivasyonu yalnızca Traxle Mobil Uygulaması üzerinden yapılabilmektedir.")} />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
                                        </label>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-4">Giriş yaparken telefonunuza SMS kodu gönderilir.</p>
                                    <div className={`text-xs font-bold p-3 rounded-xl border ${is2FAEnabled ? 'text-green-600 bg-green-50 border-green-200 dark:bg-green-500/10' : 'text-orange-500 bg-orange-50 border-orange-200 dark:bg-orange-500/10'}`}>
                                        {is2FAEnabled ? '2FA Aktif. Hesabınız güvende.' : 'Şu anda devre dışı. Mobil uygulamadan aktifleştirin.'}
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-[#11131F] p-8 rounded-[32px] border border-gray-200 dark:border-white/5 shadow-sm h-[320px] flex flex-col">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2"><FiMonitor className="text-indigo-500" /> Güvenilen Cihazlar</h3>
                                        <button onClick={handleLogoutAll} className="text-xs font-bold text-red-500 hover:underline">Tümünden Çık</button>
                                    </div>
                                    <div className="w-full h-24 bg-gray-200 dark:bg-gray-800 rounded-xl mb-4 relative overflow-hidden bg-[url('/grid.svg')] bg-cover bg-center">
                                        <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay"></div>
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-[0_0_10px_rgba(59,130,246,1)] animate-pulse"></div>
                                    </div>
                                    <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
                                        <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                                            <div><p className="text-sm font-bold text-gray-900 dark:text-white">Windows PC - Tarayıcı</p><p className="text-[10px] text-gray-500">Antalya, TR • Şu an aktif</p></div>
                                            <span className="text-xs text-green-500 font-bold">Bu Cihaz</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#11131F] rounded-[32px] border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-100 dark:border-white/5"><h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2"><FiList className="text-orange-500" /> Son Giriş Hareketleri</h3></div>
                            <div className="overflow-x-auto max-h-60 custom-scrollbar">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50 dark:bg-white/5 text-gray-500 sticky top-0 backdrop-blur-md">
                                        <tr><th className="px-6 py-4 font-bold text-xs">Tarih</th><th className="px-6 py-4 font-bold text-xs">IP Adresi</th><th className="px-6 py-4 font-bold text-xs">Cihaz</th><th className="px-6 py-4 font-bold text-xs text-right">Durum</th></tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                                        {loginLogs.map(log => (
                                            <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                                                <td className="px-6 py-4 font-mono text-xs">{log.timestamp?.toDate ? new Date(log.timestamp.toDate()).toLocaleString('tr-TR') : '-'}</td>
                                                <td className="px-6 py-4 font-mono text-xs text-gray-500">{log.ip}</td>
                                                <td className="px-6 py-4 text-xs text-gray-400">{log.device}</td>
                                                <td className="px-6 py-4 text-right"><span className={`px-2 py-1 rounded text-[10px] font-bold ${log.status === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : 'bg-red-100 text-red-700 dark:bg-red-900/30'}`}>{log.status === 'success' ? 'Başarılı' : 'Başarısız'}</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'privacy' && (
                    <motion.div key="privacy" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Veri Şeffaflık Raporu</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-5 rounded-2xl bg-white dark:bg-[#11131F] border border-gray-200 dark:border-white/5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-500 flex items-center justify-center text-xl"><FiMapPin /></div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">Konum Verisi</h4>
                                    <p className="text-xs text-gray-500">Sadece yük eşleşmesi ve canlı takip sırasında şifrelenerek kullanılır.</p>
                                </div>
                                <div className="p-5 rounded-2xl bg-white dark:bg-[#11131F] border border-gray-200 dark:border-white/5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-500/10 text-green-500 flex items-center justify-center text-xl"><FiCreditCard /></div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">Finansal Bilgiler</h4>
                                    <p className="text-xs text-gray-500">Kredi kartı verileriniz asla Traxle sunucularında saklanmaz. iyzico'ya iletilir.</p>
                                </div>
                                <div className="p-5 rounded-2xl bg-white dark:bg-[#11131F] border border-gray-200 dark:border-white/5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-500 flex items-center justify-center text-xl"><FiShield /></div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">Kimlik (KYC)</h4>
                                    <p className="text-xs text-gray-500">Resmi yasal zorunluluklar gereği izole sunucularda güvenle saklanır.</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-8">
                                <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-[32px] border border-gray-800 shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/40 transition-colors duration-500"></div>
                                    <div className="flex justify-between items-start relative z-10">
                                        <div>
                                            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2"><FiEyeOff className="text-indigo-400" /> Hayalet Modu</h3>
                                            <p className="text-sm text-gray-400 max-w-[250px]">Sistemde "Çevrimdışı" görünürsünüz. Haritada izlenemez ve bildirim almazsınız. Algoritma puanınız düşmez.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer hover:scale-105 transition-transform">
                                            <input type="checkbox" className="sr-only peer" checked={ghostMode} onChange={(e) => setGhostMode(e.target.checked)} />
                                            <div className="w-12 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                                        </label>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-[#11131F] p-8 rounded-[32px] border border-gray-200 dark:border-white/5 shadow-sm">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Mikro İzin Yönetimi</h3>
                                    <div className="space-y-4">
                                        <PermissionToggle title="Performans ve Analitik" desc="Uygulamayı iyileştirmemiz için anonim kullanım verisi gönder." checked={permissions.analytics} onChange={() => setPermissions(p => ({ ...p, analytics: !p.analytics }))} />
                                        <PermissionToggle title="Kişiselleştirilmiş Fırsatlar" desc="Geçmiş rotalarıma bakarak bana özel yük önerileri sun." checked={permissions.personalization} onChange={() => setPermissions(p => ({ ...p, personalization: !p.personalization }))} />
                                        <PermissionToggle title="Sınırlı Profil Görünürlüğü" desc="Yük verenler, adım yerine sadece plakamı ve puanımı görsün." checked={permissions.publicProfile} onChange={() => setPermissions(p => ({ ...p, publicProfile: !p.publicProfile }))} />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-[#11131F] p-8 rounded-[32px] border border-gray-200 dark:border-white/5 shadow-sm h-fit">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2"><FiDownloadCloud className="text-blue-500" /> Veri İndirme Merkezi</h3>
                                <p className="text-sm text-gray-500 mb-8">KVKK ve GDPR kapsamında platformdaki tüm işlemlerinizi, faturalarınızı ve log kayıtlarınızı arşiv olarak indirebilirsiniz.</p>
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Format Seçimi</label>
                                        <div className="flex gap-3">
                                            <button onClick={() => setDownloadFormat('JSON')} className={`flex-1 py-3 rounded-xl border-2 font-bold text-sm transition-all ${downloadFormat === 'JSON' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'border-gray-100 dark:border-white/5 text-gray-500 hover:border-gray-300'}`}>JSON (Geliştirici)</button>
                                            <button onClick={() => setDownloadFormat('HTML')} className={`flex-1 py-3 rounded-xl border-2 font-bold text-sm transition-all ${downloadFormat === 'HTML' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'border-gray-100 dark:border-white/5 text-gray-500 hover:border-gray-300'}`}>HTML (Okunabilir)</button>
                                        </div>
                                    </div>
                                    {downloadState === 'idle' && (
                                        <button onClick={startDownloadRequest} className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:opacity-90 transition-opacity flex justify-center items-center gap-2 active:scale-95 shadow-lg">Arşiv Talebi Oluştur</button>
                                    )}
                                    {downloadState === 'preparing' && (
                                        <div className="p-5 border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-900/10 rounded-2xl relative overflow-hidden">
                                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]"></div>
                                            <div className="flex justify-between text-sm font-bold text-blue-700 dark:text-blue-400 mb-3 relative z-10"><span>Arşiviniz derleniyor...</span><span>%{downloadProgress}</span></div>
                                            <div className="w-full h-2 bg-blue-200 dark:bg-blue-900/50 rounded-full overflow-hidden relative z-10">
                                                <motion.div initial={{ width: "0%" }} animate={{ width: `${downloadProgress}%` }} className="h-full bg-blue-600 rounded-full"></motion.div>
                                            </div>
                                            <p className="text-xs text-blue-600/70 dark:text-blue-400/70 mt-3 font-medium relative z-10">İşlem bitince mail alacaksınız. Sayfadan ayrılabilirsiniz.</p>
                                        </div>
                                    )}
                                    {downloadState === 'ready' && (
                                        <button onClick={() => setDownloadState('idle')} className="w-full py-4 bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-500/30 flex justify-center items-center gap-2 hover:bg-green-700 transition-colors animate-pulse"><FiDownloadCloud size={20} /> İndirmeyi Başlat (.zip)</button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-6 rounded-3xl border border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-bold text-red-700 dark:text-red-400 flex items-center gap-2"><FiAlertTriangle /> Tehlikeli Bölge</h3>
                                <p className="text-sm text-red-600/80 dark:text-red-400/70 mt-1 max-w-md">Hesabınızı sildiğinizde tüm verileriniz kalıcı olarak silinir. Bu işlem geri alınamaz.</p>
                            </div>
                            <button onClick={() => setIsDeleteModalOpen(true)} className="px-6 py-3 bg-white border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 transition-colors shadow-sm dark:bg-red-500/10 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/20 w-full md:w-auto">Hesabımı Sil</button>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'notifications' && (
                    <motion.div key="notifications" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-[#11131F] p-8 rounded-[32px] border border-gray-200 dark:border-white/5 shadow-sm space-y-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Bildirim Tercihleri</h3>
                            <PermissionToggle title="Yeni İş Fırsatları" desc="Bölgendeki uygun yükler anında cebine gelsin." checked={true} onChange={() => { }} />
                            <PermissionToggle title="Ödeme ve Fatura" desc="Cüzdan hareketleri ve e-fatura kesimleri." checked={true} onChange={() => { }} />
                            <PermissionToggle title="Pazarlama ve Kampanyalar" desc="Traxle yenilikleri ve indirim haberleri." checked={false} onChange={() => { }} />
                        </div>
                        <div className="bg-white dark:bg-[#11131F] p-8 rounded-[32px] border border-gray-200 dark:border-white/5 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4"><FiMoon className="text-blue-500" /> Rahatsız Etme (DND)</h3>
                            <p className="text-sm text-gray-500 mb-6">Belirlediğiniz saatler arasında push bildirimleri ve SMS'ler sessize alınır.</p>
                            <div className="flex items-center gap-4 bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/10">
                                <input type="time" defaultValue="22:00" className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 p-2 rounded-lg font-bold outline-none text-gray-900 dark:text-white" />
                                <span className="text-gray-400 font-bold">-</span>
                                <input type="time" defaultValue="06:00" className="bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 p-2 rounded-lg font-bold outline-none text-gray-900 dark:text-white" />
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'preferences' && (
                    <motion.div key="preferences" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                        <div className="bg-white dark:bg-[#11131F] p-8 rounded-[32px] border border-gray-200 dark:border-white/5 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Uygulama Teması</h3>
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="h-24 rounded-2xl border-2 border-blue-500 bg-white flex items-center justify-center font-bold text-gray-900 shadow-lg cursor-pointer">Açık</div>
                                    <div className="h-24 rounded-2xl border-2 border-transparent bg-gray-900 text-white flex items-center justify-center font-bold cursor-pointer hover:border-blue-500 transition-colors">Koyu</div>
                                    <div className="h-24 rounded-2xl border-2 border-transparent bg-gradient-to-r from-gray-200 to-gray-800 text-white flex items-center justify-center font-bold text-sm cursor-pointer hover:border-blue-500 transition-colors">Sistem</div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Bölgesel Ayarlar</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Platform Dili</label>
                                        <select className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 outline-none font-bold text-gray-900 dark:text-white">
                                            <option>Türkçe (TR)</option>
                                            <option>English (US)</option>
                                            <option>Deutsch (DE)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Varsayılan Para Birimi</label>
                                        <select className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 outline-none font-bold text-gray-900 dark:text-white">
                                            <option>Türk Lirası (₺)</option>
                                            <option>Euro (€)</option>
                                            <option>US Dollar ($)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'documents' && (
                    <motion.div key="documents" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                        <div className="bg-white dark:bg-[#11131F] rounded-[32px] p-8 border border-gray-200 dark:border-white/5 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Kimlik ve Yetki Belgeleri</h3>
                            <p className="text-sm text-gray-500 mb-8">Sistemde onaylı bir kullanıcı olmak ve işlem yapabilmek için gerekli evraklarınızı buradan yükleyebilirsiniz.</p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                {[
                                    { id: 'id_card', label: 'Kimlik (Önlü Arkalı)' },
                                    { id: 'license', label: 'Ehliyet' },
                                    { id: 'src', label: 'SRC Belgesi' },
                                    { id: 'psychotech', label: 'Psikoteknik' }
                                ].map((docType) => (
                                    <div key={docType.id} onClick={() => { setUploadDocType(docType.id); docInputRef.current?.click(); }} className="cursor-pointer bg-gray-50 dark:bg-white/5 border-2 border-dashed border-gray-200 dark:border-white/10 hover:border-blue-500 rounded-2xl p-6 text-center transition-colors group">
                                        <FiUpload className="mx-auto text-2xl text-gray-400 group-hover:text-blue-500 mb-3 transition-colors" />
                                        <p className="font-bold text-sm text-gray-700 dark:text-gray-300">{docType.label}</p>
                                        <span className="text-[10px] text-gray-500 mt-1 block">PDF veya JPG</span>
                                    </div>
                                ))}
                            </div>
                            <input type="file" ref={docInputRef} className="hidden" accept="image/*,.pdf" onChange={handleDocumentUpload} />

                            <h4 className="font-bold text-gray-900 dark:text-white mb-4 border-t border-gray-100 dark:border-white/5 pt-6">Yüklenen Belgeler</h4>
                            <div className="space-y-3">
                                {documents.length === 0 && <p className="text-sm text-gray-500 italic">Henüz yüklenmiş bir belge bulunmuyor.</p>}
                                {documents.map(d => (
                                    <div key={d.id} className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-200 dark:border-white/5 flex flex-col md:flex-row justify-between md:items-center gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${d.status === 'approved' ? 'bg-green-100 text-green-600' : d.status === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                                <FiFileText />
                                            </div>
                                            <div>
                                                <span className="font-bold text-sm text-gray-900 dark:text-white block">{d.name}</span>
                                                <span className="text-[10px] text-gray-500">{d.fileName || 'Belge'} • {d.uploadedAt?.toDate ? new Date(d.uploadedAt.toDate()).toLocaleDateString('tr-TR') : ''}</span>
                                                {d.rejectReason && <span className="block text-xs text-red-500 mt-1">Hata: {d.rejectReason}</span>}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto border-t md:border-t-0 border-gray-200 dark:border-white/10 pt-3 md:pt-0">
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${d.status === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : d.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30'}`}>
                                                {d.status === 'pending' ? 'İnceleniyor' : d.status === 'approved' ? 'Onaylandı' : 'Reddedildi'}
                                            </span>
                                            <button onClick={async () => { if (confirm("Belgeyi silmek istediğinize emin misiniz?")) await deleteDoc(doc(db, 'documents', d.id)); }} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"><FiTrash2 /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>

            {/* ======================= 🔥 E-POSTA DEĞİŞTİRME MODALI (ÇİFT DOĞRULAMA - GERÇEK API) ======================= */}
            <AnimatePresence>
                {isEmailChangeModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsEmailChangeModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white dark:bg-[#1A1A1A] w-full max-w-md p-8 rounded-[32px] shadow-2xl border border-gray-200 dark:border-white/10">
                            <button onClick={() => setIsEmailChangeModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-white/5 rounded-full p-2"><FiX size={20} /></button>

                            {emailChangeStep === 1 && (
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4"><FiShield /></div>
                                    <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Çift Doğrulama</h3>
                                    <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                                        Ana e-postanızı değiştirmek, hesabınızın sahipliğini devretmek anlamına gelir. Bu yüzden hem <strong>{userData?.phone}</strong> numarasına hem de <strong>{userData?.recoveryEmail}</strong> adresinize birer onay kodu göndereceğiz.
                                    </p>
                                    <button
                                        onClick={handleSendDualCodes}
                                        disabled={apiLoading}
                                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 active:scale-95 transition-all disabled:opacity-50"
                                    >
                                        {apiLoading ? 'Gönderiliyor...' : 'Kodları Gönder'}
                                    </button>
                                </div>
                            )}

                            {emailChangeStep === 2 && (
                                <div>
                                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Kodları Girin</h3>
                                    <p className="text-sm text-gray-500 mb-6">Lütfen telefonunuza ve kurtarma e-postanıza gelen 6 haneli kodları girin.</p>

                                    <div className="space-y-4 mb-6">
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block"><FiSmartphone className="inline" /> SMS Kodu</label>
                                            <input type="text" value={phoneCode} onChange={e => setPhoneCode(e.target.value)} placeholder="------" className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-center tracking-[0.5em] font-bold outline-none focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block"><FiMail className="inline" /> E-posta Kodu</label>
                                            <input type="text" value={recoveryCode} onChange={e => setRecoveryCode(e.target.value)} placeholder="------" className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-center tracking-[0.5em] font-bold outline-none focus:border-blue-500" />
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleVerifyDualCodes}
                                        disabled={apiLoading}
                                        className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all disabled:opacity-50"
                                    >
                                        {apiLoading ? 'Doğrulanıyor...' : 'Doğrula'}
                                    </button>
                                </div>
                            )}

                            {emailChangeStep === 3 && (
                                <div>
                                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4"><FiCheckCircle /></div>
                                    <h3 className="text-xl font-bold text-center mb-2 text-gray-900 dark:text-white">Yeni E-Posta</h3>
                                    <p className="text-sm text-center text-gray-500 mb-6">Güvenlik adımlarını geçtiniz. Yeni e-posta adresinizi belirleyebilirsiniz.</p>
                                    <input type="email" value={newEmailInput} onChange={e => setNewEmailInput(e.target.value)} placeholder="yeni@email.com" className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-4 font-bold outline-none focus:border-blue-500 mb-6" />
                                    <button onClick={async () => {
                                        try {
                                            if (auth.currentUser) {
                                                await verifyBeforeUpdateEmail(auth.currentUser, newEmailInput);
                                                alert(`${newEmailInput} adresine doğrulama linki gönderildi!`);
                                                setIsEmailChangeModalOpen(false);
                                            }
                                        } catch (e: any) { alert(e.message); }
                                    }} className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all">
                                        Kaydet ve Doğrulama Yolla
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ======================= 🔥 TELEFON DEĞİŞTİRME MODALI (TEKLİ DOĞRULAMA - GERÇEK API) ======================= */}
            <AnimatePresence>
                {isPhoneChangeModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsPhoneChangeModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white dark:bg-[#1A1A1A] w-full max-w-md p-8 rounded-[32px] shadow-2xl border border-gray-200 dark:border-white/10">
                            <button onClick={() => setIsPhoneChangeModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-white/5 rounded-full p-2"><FiX size={20} /></button>

                            {phoneChangeStep === 1 && (
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4"><FiMail /></div>
                                    <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Telefon Değişikliği</h3>
                                    <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                                        Yeni bir telefon numarası ekleyebilmek için mevcut birincil e-postanız olan <strong>{userData?.email}</strong> adresine bir onay kodu göndereceğiz.
                                    </p>
                                    <button
                                        onClick={handleSendSingleCode}
                                        disabled={apiLoading}
                                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 active:scale-95 transition-all disabled:opacity-50"
                                    >
                                        {apiLoading ? 'Gönderiliyor...' : 'Kodu Gönder'}
                                    </button>
                                </div>
                            )}

                            {phoneChangeStep === 2 && (
                                <div>
                                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">E-Posta Onayı</h3>
                                    <p className="text-sm text-gray-500 mb-6">Mail kutunuza gelen 6 haneli kodu girin.</p>

                                    <input type="text" value={primaryEmailCode} onChange={e => setPrimaryEmailCode(e.target.value)} placeholder="------" className="w-full bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-4 text-center tracking-[0.5em] font-bold outline-none focus:border-blue-500 mb-6 text-xl" />

                                    <button
                                        onClick={handleVerifySingleCode}
                                        disabled={apiLoading || !primaryEmailCode}
                                        className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all disabled:opacity-50"
                                    >
                                        {apiLoading ? 'Doğrulanıyor...' : 'Doğrula'}
                                    </button>
                                </div>
                            )}

                            {phoneChangeStep === 3 && (
                                <div>
                                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4"><FiSmartphone /></div>
                                    <h3 className="text-xl font-bold text-center mb-2 text-gray-900 dark:text-white">Yeni Telefon</h3>
                                    <p className="text-sm text-center text-gray-500 mb-6">Doğrulama başarılı. Yeni telefon numaranızı girip SMS ile onaylayın.</p>

                                    <div className="relative mb-6">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">+90</span>
                                        <input type="text" value={newPhoneInput} onChange={e => setNewPhoneInput(e.target.value.replace(/\D/g, ''))} maxLength={10} placeholder="555 123 45 67" className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-14 pr-4 py-4 font-bold outline-none focus:border-blue-500" />
                                    </div>

                                    <button onClick={() => {
                                        alert("Yeni numaraya Firebase Recaptcha SMS gitti varsayalım ve DB'ye kaydedildi.");
                                        setIsPhoneChangeModalOpen(false);
                                    }} className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all">
                                        SMS Gönder ve Kaydet
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <DeleteAccountModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} userEmail={user?.email || ''} />

            <AnimatePresence>
                {statusPopup.isOpen && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeStatus} />
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white dark:bg-[#1A1A1A] w-full max-w-sm p-6 rounded-3xl text-center shadow-2xl">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl ${statusPopup.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                {statusPopup.type === 'success' ? <FiCheckCircle /> : <FiAlertTriangle />}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{statusPopup.title}</h3>
                            <p className="text-gray-500 mb-6 text-sm">{statusPopup.message}</p>
                            <button onClick={closeStatus} className="w-full py-3 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 text-gray-900 dark:text-white font-bold rounded-xl transition-colors">Tamam</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}

// Yardımcı Bileşenler
function PermissionToggle({ title, desc, checked, onChange }: any) {
    return (
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
            <div className="pr-4">
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">{title}</h4>
                <p className="text-xs text-gray-500 mt-1">{desc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
        </div>
    );
}