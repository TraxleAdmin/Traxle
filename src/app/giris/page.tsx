"use client";

import React, { InputHTMLAttributes, ReactNode, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiAlertCircle,
  FiArrowRight,
  FiCheckCircle,
  FiLock,
  FiShield,
  FiTrendingUp,
  FiUser,
} from "react-icons/fi";
import { loginUser, socialLogin } from "@/lib/auth";
import InteractiveGridCard from "@/components/ui/InteractiveGridCard";

const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const AppleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.11 4.11-1.11 1.66.01 3.2.73 4.1 1.84-3.52 1.69-2.91 5.91.43 7.46-.77 2.01-1.92 3.84-3.72 4.04zM12.03 7.25c-.19-2.38 1.95-4.57 4.04-4.82.26 2.51-2.15 4.69-4.04 4.82z" />
  </svg>
);

const TRUST_ITEMS = [
  { label: "Aktif Kurumsal Hesap", value: "128+" },
  { label: "Platform Uptime", value: "99.96%" },
  { label: "Aylık İşlenen Kayıt", value: "1.2M+" },
];

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({ identifier: "", password: "" });

  const handleSocialLogin = async (providerName: "google" | "apple") => {
    setIsLoading(true);
    setGlobalError(null);
    const res = await socialLogin(providerName, "customer");
    if (res.success) {
      router.push("/panel");
      return;
    }

    setGlobalError(res.error || `${providerName} ile giriş yapılamadı.`);
    setIsLoading(false);
  };

  const validateForm = () => {
    let isValid = true;
    const errors = { identifier: "", password: "" };
    const inputVal = formData.identifier.trim();

    if (!inputVal) {
      errors.identifier = "E-posta veya telefon bilgisi gerekli.";
      isValid = false;
    } else if (inputVal.includes("@")) {
      if (!inputVal.includes(".")) {
        errors.identifier = "Geçerli bir e-posta adresi girin.";
        isValid = false;
      }
    } else {
      const cleanPhone = inputVal.replace(/\D/g, "");
      if (cleanPhone.length < 10 || cleanPhone.length > 11) {
        errors.identifier = "Geçerli bir telefon numarası girin. (Örn: 555 123 45 67)";
        isValid = false;
      }
    }

    if (!formData.password) {
      errors.password = "Şifre gerekli.";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Şifre en az 6 karakter olmalı.";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setGlobalError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setGlobalError(null);

    const result = await loginUser(formData.identifier, formData.password);
    if (result.success) {
      router.push("/panel");
      return;
    }

    setGlobalError(result.error || "Giriş yapılamadı.");
    setIsLoading(false);
  };

  return (
    <div className="page-neon-shell auth-premium-shell relative min-h-screen overflow-hidden text-slate-100">
      <div className="page-neon-grid" aria-hidden />
      <div className="page-neon-beams" aria-hidden>
        <span className="page-neon-beam page-neon-beam-1" />
        <span className="page-neon-beam page-neon-beam-2" />
        <span className="page-neon-beam page-neon-beam-3" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1420px] flex-col px-4 pb-10 pt-24 sm:px-6 lg:flex-row lg:items-center lg:gap-10 lg:px-10 lg:pt-20">
        <section className="flex w-full items-center pb-10 lg:w-[56%] lg:pb-0">
          <div className="w-full">
            <div className="auth-kicker">
              <FiCheckCircle />
              Kurumsal Erişim Merkezi
            </div>
            <h1 className="neon-heading mt-6 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Traxle Operasyon Paneli
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200/85 sm:text-lg">
              Kiralama, ekip yönetimi, saha güvenliği ve finansal akış tek kontrol katmanında. Hesabınızla giriş yapın
              ve operasyon ritmini kaldığı yerden sürdürün.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {TRUST_ITEMS.map((item) => (
                <InteractiveGridCard key={item.label} className="neon-grid-card rounded-2xl p-4" intensity={7}>
                  <span className="neon-grid-card__glow" aria-hidden />
                  <p className="relative z-10 font-[var(--font-mono)] text-2xl font-semibold text-cyan-100">{item.value}</p>
                  <p className="relative z-10 mt-2 text-xs uppercase tracking-[0.16em] text-slate-300/80">{item.label}</p>
                </InteractiveGridCard>
              ))}
            </div>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-cyan-300/35 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">
              <FiShield />
              Çok katmanlı doğrulama ve şifreli iletişim aktif
            </div>
          </div>
        </section>

        <section className="flex w-full items-center justify-center lg:w-[44%]">
          <InteractiveGridCard className="neon-grid-card w-full max-w-xl rounded-[2rem] p-6 sm:p-8" intensity={5}>
            <span className="neon-grid-card__glow" aria-hidden />
            <div className="relative z-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/90">Sign In</p>
              <h2 className="mt-3 text-3xl font-black text-white">Tekrar Hoş Geldiniz</h2>
              <p className="mt-2 text-sm leading-7 text-slate-300">Hesabınıza erişmek için kurumsal giriş bilgilerinizi kullanın.</p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleSocialLogin("google")}
                  disabled={isLoading}
                  className="auth-social-button"
                >
                  <GoogleIcon />
                  <span>Google</span>
                </button>
                <button
                  onClick={() => handleSocialLogin("apple")}
                  disabled={isLoading}
                  className="auth-social-button"
                >
                  <AppleIcon />
                  <span>Apple</span>
                </button>
              </div>

              <div className="auth-divider mt-6">
                <span>veya</span>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label className="auth-label" htmlFor="identifier">
                    E-posta veya Telefon
                  </label>
                  <AuthInputField
                    id="identifier"
                    icon={<FiUser />}
                    type="text"
                    name="identifier"
                    placeholder="ornek@firma.com veya 555 123 45 67"
                    value={formData.identifier}
                    onChange={handleChange}
                    error={fieldErrors.identifier}
                  />
                  {fieldErrors.identifier ? <p className="auth-error">{fieldErrors.identifier}</p> : null}
                </div>

                <div>
                  <label className="auth-label" htmlFor="password">
                    Şifre
                  </label>
                  <AuthInputField
                    id="password"
                    icon={<FiLock />}
                    type="password"
                    name="password"
                    placeholder="Şifrenizi girin"
                    value={formData.password}
                    onChange={handleChange}
                    error={fieldErrors.password}
                  />
                  {fieldErrors.password ? <p className="auth-error">{fieldErrors.password}</p> : null}

                  <div className="mt-3 text-right">
                    <Link href="/sifremi-unuttum" className="auth-link">
                      Şifremi unuttum
                    </Link>
                  </div>
                </div>

                {globalError ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="auth-error-box"
                  >
                    <FiAlertCircle className="mt-0.5 shrink-0 text-base" />
                    <span>{globalError}</span>
                  </motion.div>
                ) : null}

                <button type="submit" disabled={isLoading} className="auth-primary-button mt-1">
                  {isLoading ? (
                    <span className="auth-spinner" />
                  ) : (
                    <>
                      Giriş Yap
                      <FiArrowRight />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-7 text-center text-sm text-slate-400">
                Kurumsal hesabınız yok mu?{" "}
                <Link href="/kayit-ol" className="auth-link">
                  Kayıt olun
                </Link>
              </p>

              <div className="mt-6 flex items-center gap-2 text-xs text-slate-400/85">
                <FiTrendingUp />
                Oturumlar güvenlik politikalarına göre denetlenir.
              </div>
            </div>
          </InteractiveGridCard>
        </section>
      </div>
    </div>
  );
}

function AuthInputField({
  icon,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { icon: ReactNode; error?: string }) {
  return (
    <div className="relative group">
      <div
        className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg transition-colors ${
          error ? "text-rose-400" : "text-slate-400 group-focus-within:text-cyan-200"
        }`}
      >
        {icon}
      </div>
      <input
        {...props}
        className={`auth-input ${error ? "border-rose-400/65 focus:border-rose-300 focus:ring-rose-400/25" : ""} ${
          props.className || ""
        }`}
      />
    </div>
  );
}
