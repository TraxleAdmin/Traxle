'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiUser, FiLock, FiArrowRight, FiAlertCircle } from 'react-icons/fi';
import { loginUser, socialLogin } from '@/lib/auth';
import TextShimmer from '@/components/ui/TextShimmer';

const GoogleIcon = () => (<svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>);
const AppleIcon = () => (<svg className="w-5 h-5 text-current" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.11 4.11-1.11 1.66.01 3.2.73 4.1 1.84-3.52 1.69-2.91 5.91.43 7.46-.77 2.01-1.92 3.84-3.72 4.04zM12.03 7.25c-.19-2.38 1.95-4.57 4.04-4.82.26 2.51-2.15 4.69-4.04 4.82z" /></svg>);


export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });

  const [fieldErrors, setFieldErrors] = useState({
    identifier: '',
    password: ''
  });

  const handleSocialLogin = async (providerName: 'google' | 'apple') => {
    setIsLoading(true);
    setGlobalError(null);
    const res = await socialLogin(providerName, 'customer');
    if (res.success) {
      router.push('/panel');
    } else {
      setGlobalError(res.error || `${providerName} ile giriş yapılamadı.`);
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = { identifier: '', password: '' };
    const inputVal = formData.identifier.trim();

    if (!inputVal) {
      errors.identifier = "E-posta veya Telefon bilgisi gerekli.";
      isValid = false;
    } else if (inputVal.includes('@')) {
      if (!inputVal.includes('.')) {
        errors.identifier = "Geçerli bir e-posta adresi giriniz.";
        isValid = false;
      }
    } else {
      const cleanPhone = inputVal.replace(/\D/g, '');
      if (cleanPhone.length < 10 || cleanPhone.length > 11) {
        errors.identifier = "Geçerli bir telefon numarası giriniz. (Örn: 555 123 45 67)";
        isValid = false;
      }
    }

    if (!formData.password) {
      errors.password = "Şifre gerekli.";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Şifre en az 6 karakter olmalıdır.";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: '' });
    setGlobalError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setGlobalError(null);

    const result = await loginUser(formData.identifier, formData.password);

    if (result.success) {
      router.push('/panel');
    } else {
      setGlobalError(result.error || "Giriş yapılamadı.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-[#050814] transition-colors duration-500">

      {/* --- SOL TARAF --- */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden transition-colors duration-500 bg-gray-50 dark:bg-black">

        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-5 dark:opacity-30 mix-blend-overlay transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-blue-500/5 to-transparent dark:from-black dark:via-blue-900/20 dark:to-black/60 transition-colors duration-500" />

        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] animate-pulse bg-blue-300/30 dark:bg-blue-600/20 transition-colors duration-500" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] animate-pulse delay-1000 bg-cyan-300/30 dark:bg-cyan-600/20 transition-colors duration-500" />

        <div className="relative z-10 px-12 max-w-2xl text-center lg:text-left">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(34,197,94,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              SİSTEM ÇEVRİMİÇİ
            </div>

            <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight text-gray-900 dark:text-white transition-colors duration-500">
              Kontrol <br />
              <TextShimmer>Yeniden</TextShimmer> Sizde.
            </h2>

            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400 transition-colors duration-500">
              Traxle B2B paneline giriş yaparak makine parkınızı, kiralama süreçlerinizi ve finansal akışınızı anlık yönetmeye devam edin.
            </p>
          </motion.div>
        </div>
      </div>

      {/* --- SAĞ TARAF --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Tekrar Hoşgeldiniz 👋</h1>
            <p className="text-gray-500 dark:text-gray-400">Hesabınıza erişmek için bilgilerinizi girin.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => handleSocialLogin('google')} disabled={isLoading} className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-all active:scale-[0.98] text-sm font-bold text-gray-700 dark:text-white disabled:opacity-50">
              <GoogleIcon /> <span>Google</span>
            </button>
            <button onClick={() => handleSocialLogin('apple')} disabled={isLoading} className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-all active:scale-[0.98] text-sm font-bold text-gray-700 dark:text-white disabled:opacity-50">
              <AppleIcon /> <span>Apple</span>
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-white/10"></div></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-[#050814] px-4 text-gray-400 font-bold">veya</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <InputGroup
                icon={<FiUser />}
                type="text"
                name="identifier"
                placeholder="E-posta veya Telefon"
                value={formData.identifier}
                onChange={handleChange}
                error={fieldErrors.identifier}
              />
              {fieldErrors.identifier && <p className="text-red-500 text-xs mt-1 ml-1">{fieldErrors.identifier}</p>}
            </div>

            <div>
              <InputGroup
                icon={<FiLock />}
                type="password"
                name="password"
                placeholder="Şifre"
                value={formData.password}
                onChange={handleChange}
                error={fieldErrors.password}
              />
              {fieldErrors.password && <p className="text-red-500 text-xs mt-1 ml-1">{fieldErrors.password}</p>}

              <div className="text-right mt-3">
                <Link
                  href="/sifremi-unuttum"
                  className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  Şifremi Unuttum?
                </Link>
              </div>
            </div>

            {globalError && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-2 border border-red-100 dark:border-red-500/20">
                <FiAlertCircle className="shrink-0" /> {globalError}
              </motion.div>
            )}

            <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
              {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Giriş Yap <FiArrowRight /></>}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
            Kurumsal hesabınız yok mu? <Link href="/kayit-ol" className="text-blue-600 dark:text-blue-400 font-bold hover:underline ml-1">Kayıt Olun</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function InputGroup({ icon, error, ...props }: any) {
  return (
    <div className="relative group">
      <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors text-lg ${error ? 'text-red-500' : 'text-gray-400 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400'}`}>
        {icon}
      </div>
      <input className={`w-full bg-gray-50 dark:bg-white/5 border rounded-xl py-3.5 pl-12 pr-4 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all font-medium ${error ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 dark:border-white/10 focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-400'}`} {...props} />
    </div>
  );
}