'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiArrowRight, FiAlertCircle, FiCheckCircle, FiChevronLeft, FiLock, FiShield } from 'react-icons/fi';
import { db } from '@/lib/firebase';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import TextShimmer from '@/components/ui/TextShimmer'; // Kendi bileşen yolunu kontrol et

// Next.js'te useSearchParams kullanan client component'lerin Suspense ile sarılması gerekir
export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#050814]"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>}>
            <ResetPasswordContent />
        </Suspense>
    );
}

function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const email = searchParams.get('email');
    const token = searchParams.get('token');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState<'validating' | 'invalid_token' | 'idle' | 'submitting' | 'success' | 'error'>('validating');
    const [errorMessage, setErrorMessage] = useState('');

    // 1. ADIM: SAYFA YÜKLENDİĞİNDE TOKEN'IN GERÇEKLİĞİNİ KONTROL ET
    useEffect(() => {
        const verifyToken = async () => {
            if (!email || !token) {
                setStatus('invalid_token');
                return;
            }

            try {
                const tokenRef = doc(db, "password_resets", token as string);
                const tokenSnap = await getDoc(tokenRef);

                if (!tokenSnap.exists() || tokenSnap.data().email !== email) {
                    setStatus('invalid_token');
                } else {
                    setStatus('idle'); // Token geçerli, formu göster
                }
            } catch (error) {
                console.error("Token doğrulama hatası:", error);
                setStatus('invalid_token');
            }
        };

        verifyToken();
    }, [email, token]);

    // 2. ADIM: YENİ ŞİFREYİ KAYDET (NESTJS BEYNİNE GÖNDER)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setStatus('error');
            setErrorMessage("Şifreler birbiriyle eşleşmiyor.");
            return;
        }

        if (newPassword.length < 6) {
            setStatus('error');
            setErrorMessage("Şifreniz en az 6 karakter olmalıdır.");
            return;
        }

        setStatus('submitting');
        setErrorMessage('');

        try {
            // ANA BEYNE BİLDİR (NestJS PostgreSQL Şifre Güncelleme)
            // NOT: NEXT_PUBLIC_API_URL değişkenini .env.local dosyanda tanımlamalısın (örn: http://localhost:3000)
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
            const response = await fetch(`${apiUrl}/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, newPassword }),
            });

            if (!response.ok) throw new Error("Sunucu hatası");

            // İZLERİ YOK ET: Kullanılan tokeni Firestore'dan sil
            const tokenRef = doc(db, "password_resets", token as string);
            await deleteDoc(tokenRef);

            setStatus('success');

            // 3 Saniye sonra girişe yönlendir
            setTimeout(() => {
                router.push('/giris');
            }, 3000);

        } catch (error: any) {
            console.error("Şifre Güncelleme Hatası:", error);
            setStatus('error');
            setErrorMessage("Şifre güncellenirken bir ağ hatası oluştu.");
        }
    };

    return (
        <div className="min-h-screen flex bg-white dark:bg-[#050814] transition-colors duration-500 font-sans selection:bg-blue-500/30">

            {/* SOL TARAF */}
            <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden transition-colors duration-500 bg-gray-50 dark:bg-black">
                {/* Güvenlik hissini artırmak için hafif farklı bir görsel kullanabiliriz */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-5 dark:opacity-30 mix-blend-overlay transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-blue-500/5 to-transparent dark:from-black dark:via-blue-900/20 dark:to-black/60 transition-colors duration-500" />

                <div className="relative z-10 px-12 max-w-2xl text-center lg:text-left">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold mb-6 backdrop-blur-md">
                            <FiShield /> ŞİFRELEME AKTİF
                        </div>
                        <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight transition-colors duration-500">
                            Yeni Bir <br /><TextShimmer>Başlangıç</TextShimmer> Yapın.
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed transition-colors duration-500">
                            Güçlü bir şifre belirleyerek Traxle pazar yerindeki yolculuğunuza kaldığınız yerden devam edin.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* SAĞ TARAF */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-12 relative bg-white dark:bg-[#050814]">
                <div className="w-full max-w-[450px] mx-auto">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

                        <div className="mb-8">
                            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">Yeni Şifre Belirle</h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                {status === 'validating' ? 'Güvenlik bağlantınız kontrol ediliyor...' :
                                    status === 'invalid_token' ? 'Bağlantı geçerliliğini yitirmiş.' :
                                        <span className="font-medium text-gray-800 dark:text-gray-200">{email}</span>}
                            </p>
                        </div>

                        {/* YÜKLENİYOR (TOKEN KONTROLÜ) DURUMU */}
                        {status === 'validating' && (
                            <div className="py-12 flex justify-center">
                                <div className="w-8 h-8 border-4 border-gray-200 dark:border-white/10 border-t-black dark:border-t-white rounded-full animate-spin"></div>
                            </div>
                        )}

                        {/* GEÇERSİZ / SÜRESİ DOLMUŞ LİNK DURUMU */}
                        {status === 'invalid_token' && (
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-500/20 rounded-2xl p-8 text-center">
                                <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-lg shadow-red-500/20">
                                    <FiAlertCircle />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Geçersiz Bağlantı</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                    Bu şifre sıfırlama bağlantısı kullanılmış, süresi dolmuş veya hatalı olabilir. Lütfen yeni bir bağlantı talep edin.
                                </p>
                                <Link href="/sifremi-unuttum" className="block w-full py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-2xl transition-all active:scale-95 hover:opacity-90">
                                    Yeni Bağlantı İste
                                </Link>
                            </motion.div>
                        )}

                        {/* BAŞARILI DURUM */}
                        {status === 'success' && (
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-500/20 rounded-2xl p-8 text-center">
                                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-lg shadow-green-500/20">
                                    <FiCheckCircle />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Şifreniz Güncellendi</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                    Hesabınızın şifresi başarıyla değiştirildi. Şimdi yeni şifrenizle giriş yapabilirsiniz. Yönlendiriliyorsunuz...
                                </p>
                            </motion.div>
                        )}

                        {/* FORM ALANI */}
                        {(status === 'idle' || status === 'submitting' || status === 'error') && (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <PremiumInput
                                        icon={<FiLock />}
                                        type="password"
                                        placeholder="Yeni şifreniz (En az 6 karakter)"
                                        value={newPassword}
                                        onChange={(e: any) => setNewPassword(e.target.value)}
                                        required
                                        disabled={status === 'submitting'}
                                    />
                                    <PremiumInput
                                        icon={<FiLock />}
                                        type="password"
                                        placeholder="Yeni şifrenizi tekrar girin"
                                        value={confirmPassword}
                                        onChange={(e: any) => setConfirmPassword(e.target.value)}
                                        required
                                        disabled={status === 'submitting'}
                                    />
                                </div>

                                {status === 'error' && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-500/20 rounded-xl flex items-start gap-3 text-sm text-red-600 dark:text-red-400 font-medium overflow-hidden">
                                        <FiAlertCircle className="text-lg shrink-0 mt-0.5" />
                                        <p>{errorMessage}</p>
                                    </motion.div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'submitting' || !newPassword || !confirmPassword}
                                    className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-4 rounded-2xl shadow-lg hover:opacity-90 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {status === 'submitting' ? <div className="w-5 h-5 border-2 border-white/30 border-t-white dark:border-black/30 dark:border-t-black rounded-full animate-spin"></div> : <>Şifreyi Güncelle <FiArrowRight /></>}
                                </button>

                                <div className="pt-6 border-t border-gray-200 dark:border-white/10 text-center">
                                    <Link href="/giris" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black dark:hover:text-white transition-colors group">
                                        <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" /> VAZGEÇ VE GİRİŞE DÖN
                                    </Link>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

// Premium Input Bileşenini Buraya da Ekliyoruz
function PremiumInput({ icon, error, ...props }: any) {
    return (
        <div className="relative group">
            <div className={`absolute left-4 top-1/2 -translate-y-1/2 text-xl transition-colors ${error ? 'text-red-500' : 'text-gray-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400'}`}>{icon}</div>
            <input className={`w-full bg-white dark:bg-white/5 border-2 rounded-2xl py-4 pl-12 pr-4 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none transition-all font-medium ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-100 dark:border-white/10 focus:border-blue-500 dark:focus:border-blue-400 shadow-sm focus:shadow-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed'}`} {...props} />
        </div>
    );
}