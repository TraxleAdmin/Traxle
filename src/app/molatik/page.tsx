'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiActivity, FiArrowRight, FiBarChart2, FiClock, FiShield, FiUsers, FiZap } from 'react-icons/fi';

const features = [
  ['Mola takibi', 'Personelin mola başlangıç, bitiş ve süre kayıtlarını anlaşılır hale getirir.', FiClock],
  ['Vardiya görünürlüğü', 'Şube, ekip ve görev bazlı çalışma durumunu tek panelde toplar.', FiUsers],
  ['Verimlilik raporu', 'Günlük ve haftalık verileri yöneticinin karar alacağı net rapora dönüştürür.', FiBarChart2],
  ['Kontrollü erişim', 'Yetkili kullanıcı, şube ve rol ayrımıyla güvenli işletme akışı sağlar.', FiShield],
];

export default function MolatikPage() {
  return (
    <main className="relative overflow-hidden bg-[#05070d] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-260px] h-[620px] w-[920px] -translate-x-1/2 rounded-full bg-purple-500/20 blur-[170px]" />
        <div className="absolute right-[-220px] top-[440px] h-[560px] w-[560px] rounded-full bg-fuchsia-400/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.06]" />
      </div>

      <section className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-14 px-6 pb-20 pt-36 lg:grid-cols-[1fr_.9fr] lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-purple-300/20 bg-purple-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-purple-200">
            <FiZap /> Molatik Workforce
          </div>
          <h1 className="text-5xl font-black tracking-[-0.065em] md:text-7xl lg:text-8xl">
            Personel mola ve vardiya yönetimi için akıllı kontrol paneli.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
            Molatik, yoğun mağaza ve operasyon ekiplerinde mola takibi, görev görünürlüğü ve yönetici raporlamasını tek sistemde birleştiren kurumsal SaaS ürünüdür.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/iletisim" className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-black text-slate-950 transition hover:-translate-y-0.5">
              Erken erişim iste <FiArrowRight className="transition group-hover:translate-x-1" />
            </Link>
            <Link href="/" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-7 py-4 text-sm font-bold text-white backdrop-blur-xl transition hover:bg-white/[0.08]">
              Ana sayfaya dön
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative">
          <div className="absolute inset-0 rounded-[3rem] bg-purple-500/20 blur-[90px]" />
          <div className="relative rounded-[2.7rem] border border-white/10 bg-white/[0.055] p-4 shadow-2xl shadow-black/40 backdrop-blur-2xl">
            <div className="rounded-[2.1rem] border border-white/10 bg-[#070b14] p-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.23em] text-slate-500">Şube görünümü</p>
                  <h2 className="mt-2 text-2xl font-black">Mola Kontrol</h2>
                </div>
                <div className="rounded-2xl bg-purple-400/10 px-3 py-2 text-xs font-black text-purple-300">Beta</div>
              </div>

              <div className="mt-5 grid gap-4">
                {[
                  ['Kasalar', '8 aktif · 2 molada', '74%'],
                  ['Manav', '3 aktif · 1 molada', '62%'],
                  ['Züccaciye', '2 aktif · 0 molada', '91%'],
                ].map(([team, status, percent]) => (
                  <div key={team} className="rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-black">{team}</p>
                        <p className="mt-1 text-sm text-slate-400">{status}</p>
                      </div>
                      <p className="text-lg font-black text-purple-200">{percent}</p>
                    </div>
                    <div className="mt-4 h-2 rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-purple-400 to-fuchsia-300" style={{ width: percent }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-purple-300">Ürün yetenekleri</p>
          <h2 className="mt-5 text-4xl font-black tracking-[-0.045em] md:text-6xl">Ekip yönetimini elle takipten çıkarır.</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map(([title, text, Icon]: any) => (
            <div key={title} className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.07]">
              <div className="mb-8 inline-flex rounded-2xl bg-purple-400/10 p-4 text-purple-200"><Icon size={24} /></div>
              <h3 className="text-xl font-black">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-28 pt-12 lg:px-8">
        <div className="rounded-[3rem] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-xl md:p-12">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <div className="mb-6 inline-flex rounded-3xl bg-purple-400/10 p-4 text-purple-200"><FiActivity size={28} /></div>
              <h2 className="text-4xl font-black tracking-[-0.04em]">Yönetici için sade, ekip için hızlı.</h2>
            </div>
            <p className="text-base leading-8 text-slate-400">
              Molatik, sahadaki gerçek tempoya uyacak şekilde hızlı aksiyon, net durum kartları ve günlük raporlama üzerine tasarlanır. Amaç fazla ekran değil, doğru kararı en kısa yoldan göstermektir.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
