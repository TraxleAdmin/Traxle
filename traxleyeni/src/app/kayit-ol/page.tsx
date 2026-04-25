'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    FiUser, FiMail, FiLock, FiSmartphone, FiCreditCard,
    FiArrowRight, FiCheck, FiBriefcase, FiMapPin, FiFileText, FiMessageSquare, FiAlertCircle, FiCheckCircle, FiX, FiShield, FiTool, FiSettings
} from 'react-icons/fi';
import { registerUser, socialLogin } from '@/lib/auth';
import { auth } from '@/lib/firebase';
import {
    RecaptchaVerifier,
    signInWithPhoneNumber,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import CustomSelect from '@/components/CustomSelect';
import TextShimmer from '@/components/ui/TextShimmer';

import TermsOfServiceContent from '@/components/legal/TermsOfServiceContent';
import PrivacyPolicyContent from '@/components/legal/PrivacyPolicyContent';

declare global {
    interface Window {
        recaptchaVerifier: RecaptchaVerifier | undefined;
    }
}

// --- ICONS ---
const GoogleIcon = () => (<svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>);
const AppleIcon = () => (<svg className="w-5 h-5 text-current" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.11 4.11-1.11 1.66.01 3.2.73 4.1 1.84-3.52 1.69-2.91 5.91.43 7.46-.77 2.01-1.92 3.84-3.72 4.04zM12.03 7.25c-.19-2.38 1.95-4.57 4.04-4.82.26 2.51-2.15 4.69-4.04 4.82z" /></svg>);

// --- MODAL ---
function PolicyModal({ isOpen, onClose, onApprove, title, children }: any) {
    const [canApprove, setCanApprove] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setCanApprove(false);
            if (contentRef.current) contentRef.current.scrollTop = 0;
        }
    }, [isOpen, title]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight + 50) setCanApprove(true);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} className="relative bg-white dark:bg-[#1A1A1A] w-full max-w-5xl h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 dark:border-white/10">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-white/10 shrink-0 bg-white dark:bg-[#1A1A1A] z-20 relative">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <FiFileText className="text-blue-600" /> {title}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors text-gray-500 dark:text-gray-400">
                        <FiX size={24} />
                    </button>
                </div>
                <div ref={contentRef} onScroll={handleScroll} className="flex-1 overflow-y-auto scroll-smooth bg-gray-50 dark:bg-[#050814] relative">
                    <div className="p-4 md:p-8 transform scale-95 origin-top">{children}</div>
                    <div className="h-24 flex items-center justify-center text-xs text-gray-400 border-t border-dashed border-gray-200 dark:border-white/10 mt-8 pb-8">-- Onaylamak için metnin sonuna geldiniz --</div>
                </div>
                <div className="p-6 border-t border-gray-100 dark:border-white/10 bg-white dark:bg-[#1A1A1A] shrink-0 flex justify-end gap-3 z-20 relative shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
                    <button onClick={onClose} className="px-6 py-3 text-gray-500 font-bold hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl transition-colors">Vazgeç</button>
                    <button onClick={onApprove} disabled={!canApprove} className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg ${canApprove ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30 cursor-pointer active:scale-95' : 'bg-gray-200 dark:bg-white/10 text-gray-400 cursor-not-allowed'}`}>
                        {canApprove ? <><FiCheck /> Okudum, Onaylıyorum</> : 'Aşağı Kaydırınız...'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export default function RegisterPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [role, setRole] = useState<'supplier' | 'customer'>('supplier');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [agreedToAll, setAgreedToAll] = useState(false);
    const [currentContract, setCurrentContract] = useState<'none' | 'terms' | 'privacy'>('none');
    const [isSuccess, setIsSuccess] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [smsCode, setSmsCode] = useState('');
    const [confirmationResult, setConfirmationResult] = useState<any>(null);

    const [formData, setFormData] = useState({
        name: '', tcKn: '', email: '', recoveryEmail: '', phone: '', password: '', passwordConfirm: '',
        companyName: '', taxNumber: '', city: '', fleetSize: '', projectType: ''
    });

    const [fieldErrors, setFieldErrors] = useState<any>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let { name, value } = e.target;
        if (name === 'phone') { value = value.replace(/[^0-9]/g, ''); if (value.length > 10) return; }
        if (name === 'tcKn') { value = value.replace(/[^0-9]/g, ''); if (value.length > 11) return; }
        if (name === 'taxNumber') { value = value.replace(/[^0-9]/g, ''); }
        setFormData({ ...formData, [name]: value });
        setFieldErrors({ ...fieldErrors, [name]: '' });
        setError(null);
    };

    useEffect(() => {
        if (!window.recaptchaVerifier) {
            try {
                window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                    'size': 'normal',
                    'callback': () => setError(null),
                    'expired-callback': () => {
                        setError("Güvenlik doğrulaması zaman aşımına uğradı. Lütfen tekrar işaretleyin.");
                        if (window.recaptchaVerifier) {
                            window.recaptchaVerifier.clear();
                            window.recaptchaVerifier = undefined;
                        }
                    }
                });
                window.recaptchaVerifier.render();
            } catch (e) {
                console.error("Recaptcha Init Error:", e);
            }
        }
    }, []);

    useEffect(() => {
        if (isSuccess) {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        router.push('/panel');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isSuccess, router]);

    const handleSocialLogin = async (providerName: 'google' | 'apple') => {
        setIsLoading(true);
        setError(null);
        const res = await socialLogin(providerName, role);
        if (res.success) {
            setIsSuccess(true);
        } else {
            setError(res.error || `${providerName} ile giriş yapılamadı.`);
            setIsLoading(false);
        }
    };

    const validateStep1 = () => {
        let isValid = true;
        let errors: any = {};
        if (!formData.name) { errors.name = "Ad Soyad zorunludur."; isValid = false; }
        if (!formData.tcKn || formData.tcKn.length !== 11) { errors.tcKn = "Yetkili TC (11 hane) gereklidir."; isValid = false; }
        if (!formData.email || !formData.email.includes('@')) { errors.email = "Geçersiz e-posta."; isValid = false; }

        if (!formData.recoveryEmail || !formData.recoveryEmail.includes('@')) {
            errors.recoveryEmail = "Kurtarma e-postası zorunludur."; isValid = false;
        } else if (formData.recoveryEmail.toLowerCase() === formData.email.toLowerCase()) {
            errors.recoveryEmail = "Ana e-posta ile aynı olamaz."; isValid = false;
        }

        if (!formData.phone || formData.phone.length < 10) { errors.phone = "10 hane gerekli."; isValid = false; }
        if (!formData.password || formData.password.length < 6) { errors.password = "Min 6 karakter."; isValid = false; }
        if (formData.password !== formData.passwordConfirm) { errors.passwordConfirm = "Şifreler uyuşmuyor."; isValid = false; }

        setFieldErrors(errors);
        return isValid;
    };

    const startContractFlow = () => {
        if (agreedToAll) return;
        setCurrentContract('terms');
    };

    const handleContractApproval = () => {
        if (currentContract === 'terms') { setCurrentContract('privacy'); }
        else if (currentContract === 'privacy') { setCurrentContract('none'); setAgreedToAll(true); }
    };

    const handleNextStep = async () => {
        setError(null);
        if (step === 1) {
            if (validateStep1()) setStep(2);
        } else if (step === 2) {
            if (!agreedToAll) { setError("Sözleşmeleri onaylamanız gerekiyor."); return; }

            setIsLoading(true);
            const cleanNumber = formData.phone.replace(/\D/g, '').replace(/^0+/, '');
            const phoneNumber = `+90${cleanNumber}`;

            try {
                if (!window.recaptchaVerifier) {
                    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { 'size': 'normal' });
                    await window.recaptchaVerifier.render();
                }
                const appVerifier = window.recaptchaVerifier;
                if (!appVerifier) throw new Error("Recaptcha hatası.");

                const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
                setConfirmationResult(confirmation);
                setStep(3);
            } catch (err: any) {
                if (err.code === 'auth/invalid-phone-number') setError("Numara formatı hatalı.");
                else if (err.code === 'auth/too-many-requests') setError("Çok fazla deneme. Bekleyiniz.");
                else if (err.message && err.message.includes('reCAPTCHA')) setError("Lütfen 'Ben Robot Değilim' kutucuğunu işaretleyin.");
                else setError("SMS gönderilemedi: " + err.message);

                if (window.recaptchaVerifier) {
                    window.recaptchaVerifier.clear();
                    window.recaptchaVerifier = undefined;
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!confirmationResult) return;

        setIsLoading(true);
        setError(null);

        try {
            await confirmationResult.confirm(smsCode);
            const cleanNumber = formData.phone.replace(/\D/g, '').replace(/^0+/, '');
            const formattedPhone = `+90${cleanNumber}`;

            const res = await registerUser(formData.email, formData.password, { ...formData, phone: formattedPhone, role: role });

            if (res.success) {
                setIsSuccess(true);
            } else {
                setIsLoading(false);
                setError("Veritabanı Hatası: " + (res.error || "Kayıt oluşturulamadı."));
            }
        } catch (err: any) {
            setIsLoading(false);
            setError("Hata: " + (err.message || "Kod doğrulanamadı."));
        }
    };

    return (
        <div className="min-h-screen flex bg-white dark:bg-[#050814] transition-colors duration-500 font-sans selection:bg-blue-500/30 relative">

            <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden transition-colors duration-500 bg-gray-50 dark:bg-black">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-5 dark:opacity-40 mix-blend-overlay transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-cyan-500/10 dark:from-blue-900/60 dark:via-black/50 dark:to-cyan-900/40 transition-colors duration-500" />
                <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full blur-[100px] animate-pulse bg-blue-300/20 dark:bg-blue-500/20 transition-colors duration-500" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full blur-[100px] animate-pulse delay-700 bg-cyan-300/20 dark:bg-cyan-500/20 transition-colors duration-500" />
                <div className="relative z-10 px-12 max-w-2xl text-center lg:text-left">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <div className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold mb-6 backdrop-blur-md">Traxle B2B Ağı</div>
                        <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight transition-colors duration-500">Şantiyeni <br /><TextShimmer>Dijitale</TextShimmer> Taşı.</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed transition-colors duration-500">Türkiye'nin en gelişmiş iş makinesi kiralama ağına katılın. Güvenli ödeme, dijital sözleşme ve anlık eşleştirme ile operasyonunuzu hızlandırın.</p>
                    </motion.div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-12 relative bg-white dark:bg-[#050814]">
                <div className="w-full max-w-[500px] mx-auto">
                    {isSuccess ? (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center space-y-6">
                            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-full flex items-center justify-center shadow-xl shadow-green-500/20">
                                <FiCheckCircle size={48} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Kayıt Başarılı! 🚀</h1>
                                <p className="text-gray-600 dark:text-gray-300">Hesabınız oluşturuldu. <br /><span className="text-blue-600 font-bold">{countdown} saniye</span> içinde panele yönlendiriliyorsunuz.</p>
                            </div>
                            <div className="w-full h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden mt-4">
                                <motion.div initial={{ width: "100%" }} animate={{ width: "0%" }} transition={{ duration: 3, ease: "linear" }} className="h-full bg-blue-600" />
                            </div>
                            <button onClick={() => router.push('/panel')} className="mt-4 px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-xl font-bold transition-all w-full shadow-lg shadow-blue-500/30 active:scale-95 flex items-center justify-center gap-2">
                                Panele Git <FiArrowRight />
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            <div className="mb-8 text-center lg:text-left">
                                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Kurumsal Hesap Oluştur</h1>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">Traxle dünyasına katılmak için firma bilgilerinizi girin.</p>
                            </div>

                            {error && (
                                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 text-sm rounded-xl font-bold flex items-center gap-3 border border-red-100 dark:border-red-500/30">
                                    <FiAlertCircle className="text-lg shrink-0" /> {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <AnimatePresence mode='wait'>
                                    {step === 1 && (
                                        <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-5">

                                            <div className="bg-gray-50 dark:bg-white/5 p-1 rounded-2xl flex relative border border-gray-200 dark:border-white/10 mb-6">
                                                <motion.div className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-[#1A1F30] rounded-xl shadow-sm border border-gray-100 dark:border-white/5" animate={{ x: role === 'supplier' ? 0 : '100%' }} transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                                                <button type="button" onClick={() => setRole('supplier')} className={`flex-1 py-3 text-sm font-bold relative z-10 transition-colors ${role === 'supplier' ? 'text-blue-600 dark:text-white' : 'text-gray-500'}`}>Tedarikçi (Makine Sahibi)</button>
                                                <button type="button" onClick={() => setRole('customer')} className={`flex-1 py-3 text-sm font-bold relative z-10 transition-colors ${role === 'customer' ? 'text-blue-600 dark:text-white' : 'text-gray-500'}`}>Şantiye (Müşteri)</button>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                <button type="button" onClick={() => handleSocialLogin('google')} disabled={isLoading} className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-all active:scale-[0.98] text-sm font-bold text-gray-700 dark:text-white disabled:opacity-50">
                                                    <GoogleIcon /> <span>Google</span>
                                                </button>
                                                <button type="button" onClick={() => handleSocialLogin('apple')} disabled={isLoading} className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-all active:scale-[0.98] text-sm font-bold text-gray-700 dark:text-white disabled:opacity-50">
                                                    <AppleIcon /> <span>Apple</span>
                                                </button>
                                            </div>

                                            <div className="relative my-6">
                                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-white/10"></div></div>
                                                <div className="relative flex justify-center text-xs uppercase">
                                                    <span className="bg-white dark:bg-[#050814] px-4 text-gray-400 font-bold">veya E-posta ile</span>
                                                </div>
                                            </div>

                                            <PremiumInput
                                                icon={<FiUser />} type="text" name="name" placeholder="Yetkili Ad Soyad" value={formData.name} onChange={handleChange} error={fieldErrors.name}
                                            />
                                            <PremiumInput
                                                icon={<FiCreditCard />} type="text" name="tcKn" placeholder="Yetkili TC Kimlik No (11 Hane)" value={formData.tcKn} onChange={handleChange} maxLength={11} error={fieldErrors.tcKn}
                                            />
                                            <PremiumInput
                                                icon={<FiMail />} type="email" name="email" placeholder="Firma E-posta Adresi" value={formData.email} onChange={handleChange} error={fieldErrors.email}
                                            />

                                            <div>
                                                <PremiumInput
                                                    icon={<FiShield className="text-orange-500" />} type="email" name="recoveryEmail" placeholder="Kurtarma E-postası (Zorunlu)" value={formData.recoveryEmail} onChange={handleChange} error={fieldErrors.recoveryEmail}
                                                />
                                                <p className="mt-1 ml-2 text-[10px] text-gray-500 font-medium">Şirket hesabınıza erişimi kaybederseniz bu adres kullanılacaktır.</p>
                                            </div>

                                            <div className="relative">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold border-r border-gray-200 dark:border-white/10 pr-3">+90</div>
                                                <input type="tel" name="phone" maxLength={10} placeholder="5XX XXX XX XX" value={formData.phone} onChange={handleChange} className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl py-3.5 pl-20 pr-4 text-gray-900 dark:text-white font-bold outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all" />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <PremiumInput
                                                    icon={<FiLock />} type="password" name="password" placeholder="Şifre" value={formData.password} onChange={handleChange} error={fieldErrors.password}
                                                />
                                                <PremiumInput
                                                    icon={<FiCheck />} type="password" name="passwordConfirm" placeholder="Tekrar" value={formData.passwordConfirm} onChange={handleChange} error={fieldErrors.passwordConfirm}
                                                />
                                            </div>
                                            <button type="button" onClick={handleNextStep} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
                                                Devam Et <FiArrowRight />
                                            </button>
                                        </motion.div>
                                    )}

                                    {step === 2 && (
                                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                            <div>
                                                <button type="button" onClick={() => setStep(1)} className="text-xs font-bold text-gray-500 hover:text-black dark:hover:text-white mb-2 flex items-center gap-1 transition-colors">← BİLGİLERE DÖN</button>
                                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{role === 'supplier' ? 'Tedarikçi Firma Bilgileri' : 'Şantiye (Müşteri) Bilgileri'}</h2>
                                            </div>

                                            {role === 'supplier' ? (
                                                <div className="space-y-4">
                                                    <PremiumInput
                                                        icon={<FiBriefcase />} type="text" name="companyName" placeholder="Firma Ünvanı" value={formData.companyName} onChange={handleChange}
                                                    />
                                                    <PremiumInput
                                                        icon={<FiFileText />} type="text" name="taxNumber" placeholder="Vergi No" value={formData.taxNumber} onChange={handleChange}
                                                    />
                                                    <CustomSelect
                                                        label="Makine Parkı (Filo) Büyüklüğü" value={formData.fleetSize} options={['1-5 Makine', '6-20 Makine', '21-50 Makine', '50+ Makine']} onChange={(val) => setFormData({ ...formData, fleetSize: val })} placeholder="Seçiniz"
                                                    />
                                                    <PremiumInput
                                                        icon={<FiMapPin />} type="text" name="city" placeholder="Merkez Şehir" value={formData.city} onChange={handleChange}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    <PremiumInput
                                                        icon={<FiBriefcase />} type="text" name="companyName" placeholder="Şirket / Şantiye Ünvanı" value={formData.companyName} onChange={handleChange}
                                                    />
                                                    <PremiumInput
                                                        icon={<FiFileText />} type="text" name="taxNumber" placeholder="Vergi No" value={formData.taxNumber} onChange={handleChange}
                                                    />
                                                    <CustomSelect
                                                        label="Proje Türü" value={formData.projectType} options={['Altyapı (Yol, Köprü, Baraj)', 'Üstyapı (Konut, AVM)', 'Madencilik', 'Enerji (RES, GES)', 'Diğer']} onChange={(val) => setFormData({ ...formData, projectType: val })} placeholder="Seçiniz"
                                                    />
                                                    <PremiumInput
                                                        icon={<FiMapPin />} type="text" name="city" placeholder="Proje Şehri" value={formData.city} onChange={handleChange}
                                                    />
                                                </div>
                                            )}

                                            <div onClick={startContractFlow} className={`flex items-start gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer group ${agreedToAll ? 'bg-blue-50 border-blue-500/30 dark:bg-blue-900/10' : 'bg-gray-50 border-gray-200 dark:bg-white/5 dark:border-white/10 hover:border-blue-400'}`}>
                                                <div className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${agreedToAll ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-400 text-transparent group-hover:border-blue-500'}`}>
                                                    <FiCheck size={14} strokeWidth={4} />
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-300 select-none">
                                                    <span className="font-bold text-blue-600 underline">Üyelik Sözleşmesi</span> ve <span className="font-bold text-blue-600 underline">KVKK Aydınlatma Metni</span>'ni okudum, onaylıyorum.
                                                </div>
                                            </div>

                                            <button type="button" onClick={handleNextStep} disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 active:scale-[0.98]">
                                                {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <>SMS Doğrulama <FiArrowRight /></>}
                                            </button>
                                        </motion.div>
                                    )}

                                    {step === 3 && (
                                        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                            <div className="text-center">
                                                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl shadow-lg shadow-blue-500/20">
                                                    <FiMessageSquare />
                                                </div>
                                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Doğrulama</h1>
                                                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                                                    <strong>+90 {formData.phone}</strong> numarasına gelen kodu girin.
                                                </p>
                                            </div>
                                            <div className="flex justify-center">
                                                <input
                                                    type="text"
                                                    placeholder="------"
                                                    value={smsCode}
                                                    onChange={(e) => {
                                                        const val = e.target.value.replace(/[^0-9]/g, '');
                                                        if (val.length <= 6) setSmsCode(val);
                                                    }}
                                                    className="w-full text-center text-4xl font-bold tracking-[0.5em] py-4 bg-transparent border-b-2 border-gray-200 dark:border-white/20 focus:border-blue-500 outline-none text-gray-900 dark:text-white transition-colors"
                                                />
                                            </div>

                                            <div className="flex gap-3 mt-8">
                                                <button type="button" onClick={() => setStep(2)} className="flex-1 py-4 bg-gray-100 dark:bg-white/10 rounded-2xl font-bold text-gray-500 hover:bg-gray-200 transition-colors">
                                                    Geri
                                                </button>
                                                <button type="submit" disabled={isLoading || smsCode.length !== 6} className="flex-[2] bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-500/30 transition-all disabled:opacity-50 active:scale-[0.98] flex items-center justify-center gap-2">
                                                    {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Onayla ve Bitir'}
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className={step === 2 ? "flex justify-center w-full mt-6" : "hidden"}>
                                    <div id="recaptcha-container"></div>
                                </div>

                            </form>

                            {step === 1 && (
                                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8 font-medium">
                                    Zaten hesabınız var mı? <Link href="/giris" className="text-blue-600 dark:text-blue-400 font-bold hover:underline ml-1">Giriş Yap</Link>
                                </p>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>

            <PolicyModal isOpen={currentContract === 'terms'} onClose={() => setCurrentContract('none')} onApprove={handleContractApproval} title="1/2: Üyelik Sözleşmesi">
                <TermsOfServiceContent />
            </PolicyModal>
            <PolicyModal isOpen={currentContract === 'privacy'} onClose={() => setCurrentContract('none')} onApprove={handleContractApproval} title="2/2: KVKK Aydınlatma Metni">
                <PrivacyPolicyContent />
            </PolicyModal>
        </div>
    );
}

function PremiumInput({ icon, error, ...props }: any) {
    return (
        <div className="relative group">
            <div className={`absolute left-4 top-1/2 -translate-y-1/2 text-xl transition-colors ${error ? 'text-red-500' : 'text-gray-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400'}`}>
                {icon}
            </div>
            <input
                className={`w-full bg-white dark:bg-white/5 border-2 rounded-2xl py-4 pl-12 pr-4 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none transition-all font-medium ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-100 dark:border-white/10 focus:border-blue-500 dark:focus:border-blue-400 shadow-sm focus:shadow-blue-500/10'}`}
                {...props}
            />
        </div>
    );
}