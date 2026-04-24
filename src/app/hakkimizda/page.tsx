'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiCpu, FiDatabase, FiGlobe, FiLock, FiShield, FiTarget, FiZap } from 'react-icons/fi';

const principles = [
  ['Saha gerçekliği', 'Ürünler masa başında değil, gerçek operasyon akışına göre tasarlanır.', FiTarget],
  ['Güvenli mimari', 'Kimlik, rol, işlem kaydı ve ödeme akışı daha ilk günden güven temelli kurulur.', FiShield],
  ['Ölçeklenebilir altyapı', 'Firebase, Next.js ve modüler servis yapısıyla hızlı geliştirme ve büyüme hedeflenir.', FiDatabase],
  ['Premium deneyim', 'Karmaşık operasyonlar sade ekranlar ve hızlı aksiyonlarla yönetilebilir hale gelir.', FiZap],
];

const stack = [
  ['Web', 'Next.js, TypeScript, Tailwind'],
  ['Mobil', 'Flutter ve rol bazlı uygulama akışları'],
  ['Veri', 'Firebase Auth, Firestore, Storage'],
  ['Ödeme', 'iyzico uyumlu blokaj, komisyon ve abonelik kurguları'],
];

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden bg-[#05070d] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-260px] h-[660px] w-[980px] -translate-x-1/2 rounded-full bg-blue-500/18 blur-[170px]" />
        <div className="absolute bottom-[-220px] left-[-220px] h-[620px] w-[620px] rounded-full bg-cyan-400/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.06]" />
      </div>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-36 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl">
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-blue-100 backdrop-blur-xl">
            <FiGlobe /> Traxle Teknoloji Ekosistemi
          </div>
          <h1 className="text-5xl font-black tracking-[-0.065em] md:text-7xl lg:text-8xl">
            Fiziksel operasyonları dijital zekâ ile yeniden kuruyoruz.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
            Traxle; lojistik, iş makinesi, personel yönetimi, dijital kimlik ve ödeme akışları gibi dağınık operasyonları tek bir modern yazılım ekosistemine dönüştürmek için geliştirilen teknoloji markasıdır.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            ['Operation OS', 'Ürün vizyonu'],
            ['B2B SaaS', 'İş modeli'],
            ['Security First', 'Mimari yaklaşım'],
          ].map(([value, label]) => (
            <div key={value} className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
              <p className="text-3xl font-black tracking-tight">{value}</p>
              <p className="mt-2 text-sm font-semibold text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-xl md:p-10">
            <div className="mb-7 inline-flex rounded-3xl bg-blue-400/10 p-4 text-blue-200"><FiCpu size={28} /></div>
            <h2 className="text-4xl font-black tracking-[-0.04em]">Tek ürün değil, birbirine bağlanan ekosistem.</h2>
            <p className="mt-5 text-base leading-8 text-slate-400">
              Traxle Platform, KünyeX ve Molatik aynı düşünceyle gelişir: işletmelerin zaman kaybettiren, manuel ve hataya açık süreçlerini güvenli yazılıma taşımak.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {principles.map(([title, text, Icon]: any) => (
              <div key={title} className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-400/10 text-blue-200"><Icon size={22} /></div>
                <h3 className="font-black">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="rounded-[3rem] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-xl md:p-12">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">Teknoloji yaklaşımı</p>
              <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-5xl">Hızlı geliştirme, güvenli büyüme.</h2>
              <p className="mt-5 text-base leading-8 text-slate-400">
                Başlangıçta çevik ve maliyet kontrollü; büyüme aşamasında mikroservis, Docker ve Kubernetes mimarisine genişleyebilir yapı.
              </p>
            </div>
            <div className="grid gap-4">
              {stack.map(([title, text]) => (
                <div key={title} className="rounded-[2rem] border border-white/10 bg-[#070b14]/70 p-5">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300"><FiLock /></div>
                    <div>
                      <h3 className="font-black">{title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-400">{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
