"use client";

import React, { InputHTMLAttributes, ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  FiAlertCircle,
  FiArrowRight,
  FiCheckCircle,
  FiChevronLeft,
  FiMail,
  FiShield,
  FiUser,
} from "react-icons/fi";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import InteractiveGridCard from "@/components/ui/InteractiveGridCard";

const RECOVERY_STEPS = [
  "Kurumsal e-posta adresinizi doğrulayın.",
  "Talebiniz güvenlik kuyruğuna alınır.",
  "Bağlantı e-posta kutunuza otomatik gönderilir.",
];

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showForgotIdModal, setShowForgotIdModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      await addDoc(collection(db, "password_resets"), {
        email: email.toLowerCase().trim(),
        createdAt: serverTimestamp(),
        source: "frontend_bypass",
      });

      setStatus("success");
    } catch (error) {
      console.error("Şifre sıfırlama isteği hatası:", error);
      setStatus("error");
      setErrorMessage("İstek gönderilirken ağ hatası oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
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
              <FiShield />
              Güvenlik ve Hesap Kurtarma
            </div>
            <h1 className="neon-heading mt-6 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Erişimi Hızla Geri Kazanın
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200/85 sm:text-lg">
              Kurumsal hesap güvenliğini bozmadan parola yenileme talebinizi alın, doğrulama adımlarıyla hesabınızı
              tekrar aktif edin.
            </p>

            <div className="mt-8 space-y-3">
              {RECOVERY_STEPS.map((step, index) => (
                <InteractiveGridCard key={step} className="neon-grid-card rounded-2xl p-4" intensity={6}>
                  <span className="neon-grid-card__glow" aria-hidden />
                  <div className="relative z-10 flex items-start gap-3">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-xs font-black text-slate-950">
                      {index + 1}
                    </span>
                    <p className="pt-0.5 text-sm leading-7 text-slate-200/85">{step}</p>
                  </div>
                </InteractiveGridCard>
              ))}
            </div>
          </div>
        </section>

        <section className="flex w-full items-center justify-center lg:w-[44%]">
          <InteractiveGridCard className="neon-grid-card w-full max-w-xl rounded-[2rem] p-6 sm:p-8" intensity={5}>
            <span className="neon-grid-card__glow" aria-hidden />
            <div className="relative z-10">
              <Link href="/giris" className="auth-back-link">
                <FiChevronLeft />
                Girişe dön
              </Link>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/90">Password Recovery</p>
              <h2 className="mt-3 text-3xl font-black text-white">Hesap Kurtarma</h2>
              <p className="mt-2 text-sm leading-7 text-slate-300">Sisteme kayıtlı e-posta adresinizi girin, kurtarma akışını başlatalım.</p>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-7 rounded-2xl border border-emerald-400/30 bg-emerald-500/12 p-6"
                >
                  <div className="flex items-start gap-3">
                    <FiCheckCircle className="mt-0.5 shrink-0 text-xl text-emerald-300" />
                    <div>
                      <p className="font-semibold text-emerald-200">Talebiniz alındı</p>
                      <p className="mt-2 text-sm leading-7 text-emerald-100/90">
                        Eğer sistemimizde <span className="font-semibold">{email}</span> adresine ait bir hesap varsa
                        sıfırlama bağlantısı kısa süre içinde iletilecektir.
                      </p>
                    </div>
                  </div>
                  <Link href="/giris" className="auth-primary-button mt-6">
                    Girişe dön
                    <FiArrowRight />
                  </Link>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                  <div>
                    <label className="auth-label" htmlFor="email">
                      Kurumsal E-posta
                    </label>
                    <AuthInputField
                      id="email"
                      icon={<FiMail />}
                      type="email"
                      placeholder="ornek@firma.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {status === "error" ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="auth-error-box"
                    >
                      <FiAlertCircle className="mt-0.5 shrink-0 text-base" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  ) : null}

                  <button type="submit" disabled={isLoading || !email} className="auth-primary-button">
                    {isLoading ? (
                      <span className="auth-spinner" />
                    ) : (
                      <>
                        Bağlantı Gönder
                        <FiArrowRight />
                      </>
                    )}
                  </button>

                  <div className="pt-2 text-center">
                    <button type="button" onClick={() => setShowForgotIdModal(true)} className="auth-link">
                      Hiçbir bilgimi hatırlamıyorum
                    </button>
                  </div>
                </form>
              )}
            </div>
          </InteractiveGridCard>
        </section>
      </div>

      <AnimatePresence>
        {showForgotIdModal ? (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForgotIdModal(false)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 16 }}
              className="relative w-full max-w-md rounded-[2rem] border border-cyan-200/20 bg-slate-950/92 p-7 shadow-[0_26px_80px_rgba(2,8,23,0.7)]"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20 text-xl text-cyan-200">
                <FiUser />
              </div>
              <h3 className="mt-4 text-2xl font-black text-white">Manuel Doğrulama</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                E-posta veya telefon bilgilerinizi hatırlamıyorsanız güvenlik politikası gereği manuel doğrulama
                gerekiyor. Destek ekibimiz kimlik doğrulama adımlarında size eşlik eder.
              </p>
              <div className="mt-6 space-y-3">
                <Link href="/iletisim" className="auth-primary-button">
                  Destek Talebi Oluştur
                  <FiArrowRight />
                </Link>
                <button onClick={() => setShowForgotIdModal(false)} className="auth-secondary-button w-full">
                  Geri Dön
                </button>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function AuthInputField({ icon, ...props }: InputHTMLAttributes<HTMLInputElement> & { icon: ReactNode }) {
  return (
    <div className="relative group">
      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400 transition-colors group-focus-within:text-cyan-200">
        {icon}
      </div>
      <input {...props} className={`auth-input ${props.className || ""}`} />
    </div>
  );
}
