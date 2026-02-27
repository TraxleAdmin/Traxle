'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight, FiAlertCircle, FiCheckCircle, FiChevronLeft, FiUser, FiMail } from 'react-icons/fi';
import { auth } from '@/lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth'; 
import TextShimmer from '@/components/ui/TextShimmer';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showForgotIdModal, setShowForgotIdModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      // 🔥 SADECE AUTH İŞLEMİ (Veritabanı taraması yok, Enumeration açığı yok)
      await sendPasswordResetEmail(auth, email);
      
      // İşlem ne olursa olsun Başarılı state'ine geç (Siber Güvenlik Standardı)
      setStatus('success');
      
    } catch (error: any) {
      console.error("Şifre Sıfırlama İstediği:", error);
      
      // Eğer Firebase'in "Enumeration Protection" özelliği açıksa buraya asla düşmez, her zaman success döner.
      // Sadece format hatası veya hız sınırı (rate-limit) varsa hata veririz.
      if (error.code === 'auth/invalid-email') {
        setStatus('error');
        setErrorMessage("Lütfen geçerli bir e-posta adresi formatı giriniz.");
      } else if (error.code === 'auth/too-many-requests') {
        setStatus('error');
        setErrorMessage("Çok fazla deneme yaptınız. Lütfen biraz bekleyip tekrar deneyin.");
      } else {
        // Diğer tüm durumlarda (Kullanıcı bulamasa bile) güvenlik için başarılı gibi davran
        setStatus('success');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-[#050814] transition-colors duration-500 font-sans selection:bg-blue-500/30">
      
      {/* SOL TARAF */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden transition-colors duration-500 bg-gray-50 dark:bg-black">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-5 dark:opacity-30 mix-blend-overlay transition-opacity duration-500" />
         <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-blue-500/5 to-transparent dark:from-black dark:via-blue-900/20 dark:to-black/60 transition-colors duration-500" />
         
         <div className="relative z-10 px-12 max-w-2xl text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-xs font-bold mb-6 backdrop-blur-md">
                    GÜVENLİK MERKEZİ
                </div>
                <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight transition-colors duration-500">
                    Hesabınızı <br/><TextShimmer>Güvende</TextShimmer> Tutun.
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed transition-colors duration-500">
                    Şifrenizi unuttuysanız endişelenmeyin. Birkaç adımda hesabınıza yeniden erişim sağlayabilirsiniz.
                </p>
            </motion.div>
         </div>
      </div>

      {/* SAĞ TARAF */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-12 relative bg-white dark:bg-[#050814]">
         <div className="w-full max-w-[450px] mx-auto">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                
                <div className="mb-8">
                    <Link href="/giris" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black dark:hover:text-white mb-6 transition-colors group">
                        <FiChevronLeft className="group-hover:-translate-x-1 transition-transform"/> GİRİŞE DÖN
                    </Link>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">Hesap Kurtarma</h1>
                    <p className="text-gray-500 dark:text-gray-400">Sisteme kayıtlı E-posta adresinizi girin.</p>
                </div>

                {status === 'success' ? (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-500/20 rounded-2xl p-8 text-center">
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-lg shadow-green-500/20">
                            <FiCheckCircle />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">İşlem Tamamlandı</h3>
                        {/* 🔥 GÜVENLİK STANDARDI METNİ BURADA */}
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            Eğer sistemimizde <span className="font-bold text-gray-900 dark:text-white">{email}</span> adresine ait bir hesap bulunuyorsa, şifre sıfırlama bağlantısı gönderilmiştir. Lütfen gelen kutunuzu (ve spam klasörünü) kontrol edin.
                        </p>
                        <Link href="/giris" className="block w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-green-500/30 active:scale-95">
                            Giriş Yap
                        </Link>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <PremiumInput 
                                icon={<FiMail />} 
                                type="email" 
                                placeholder="Kayıtlı e-posta adresiniz" 
                                value={email} 
                                onChange={(e: any) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>

                        {status === 'error' && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-500/20 rounded-xl flex items-start gap-3 text-sm text-red-600 dark:text-red-400 font-medium">
                                <FiAlertCircle className="text-lg shrink-0 mt-0.5" />
                                <p>{errorMessage}</p>
                            </motion.div>
                        )}

                        <button 
                            type="submit" 
                            disabled={isLoading || !email} 
                            className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-4 rounded-2xl shadow-lg hover:opacity-90 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white dark:border-black/30 dark:border-t-black rounded-full animate-spin"></div> : <>Bağlantı Gönder <FiArrowRight /></>}
                        </button>

                        <div className="pt-6 border-t border-gray-200 dark:border-white/10 text-center">
                            <button 
                                type="button" 
                                onClick={() => setShowForgotIdModal(true)}
                                className="text-sm font-bold text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                Hiçbir bilgimi hatırlamıyorum
                            </button>
                        </div>
                    </form>
                )}
            </motion.div>
         </div>
      </div>

      {/* KİMLİĞİMİ UNUTTUM MODALI */}
      <AnimatePresence>
        {showForgotIdModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
                    onClick={() => setShowForgotIdModal(false)} 
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
                />
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0, y: 20 }} 
                    animate={{ scale: 1, opacity: 1, y: 0 }} 
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="relative bg-white dark:bg-[#1A1A1A] w-full max-w-md p-8 rounded-[32px] shadow-2xl text-center border border-gray-200 dark:border-white/10"
                >
                    <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                        <FiUser />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Hesabınızı Kurtaralım</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                        Güvenlik politikalarımız gereği, e-posta veya telefon numaranızı tamamen unuttuysanız manuel doğrulama yapmamız gerekmektedir. Lütfen destek ekibimize ulaşın.
                    </p>
                    <div className="space-y-3">
                        <Link href="/iletisim" className="block w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-500/30 active:scale-95">
                            Destek Talebi Oluştur
                        </Link>
                        <button onClick={() => setShowForgotIdModal(false)} className="block w-full py-4 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white font-bold rounded-xl transition-colors">
                            Geri Dön
                        </button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PremiumInput({ icon, error, ...props }: any) {
  return (
    <div className="relative group">
      <div className={`absolute left-4 top-1/2 -translate-y-1/2 text-xl transition-colors ${error ? 'text-red-500' : 'text-gray-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400'}`}>{icon}</div>
      <input className={`w-full bg-white dark:bg-white/5 border-2 rounded-2xl py-4 pl-12 pr-4 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none transition-all font-medium ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-100 dark:border-white/10 focus:border-blue-500 dark:focus:border-blue-400 shadow-sm focus:shadow-blue-500/10'}`} {...props} />
    </div>
  );
}