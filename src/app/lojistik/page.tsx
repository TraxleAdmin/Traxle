'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiCreditCard, FiMap, FiShield, FiTruck, FiUsers, FiZap } from 'react-icons/fi';

const capabilities = [
  ['Akıllı ilan akışı', 'Yük, iş makinesi ve saha ihtiyacı tek formdan net şartlarla yayınlanır.', FiTruck],
  ['Rol bazlı panel', 'Yükveren, sürücü, işletme ve admin için ayrı görünüm ve yetki mimarisi.', FiUsers],
  ['QR teslimat kapanışı', 'Teslimat, konum ve QR doğrulama ile kayıt altına alınır.', FiCheckCircle],
  ['Ödeme kuruluşu uyumu', 'Blokaj, komisyon ve abonelik kurguları güvenli altyapı ile tasarlanır.', FiCreditCard],
];

const steps = [
  ['01', 'Talep açılır', 'İşin çıkış, varış, tonaj, araç tipi ve ödeme şartları belirlenir.'],
  ['02', 'Eşleşme yapılır', 'Uygun araç veya operatör işi kabul eder; süreç panelde takip edilir.'],
  ['03', 'Saha doğrulanır', 'Teslimat QR, konum ve zaman kaydıyla kapatılır.'],
  ['04', 'Raporlanır', 'Komisyon, işlem geçmişi ve performans verileri görünür olur.'],
];

export default function LojistikPage() {
  return (
    <main className="relative overflow-hidden bg-[#05070d] text-white">
      <Background />

      <section className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-14 px-6 pb-20 pt-36 lg:grid-cols-[1fr_.9fr] lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-blue-300/20 bg-blue-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-blue-200">
            <FiZap /> Traxle Platform
          </div>
          <h1 className="text-5xl font-black tracking-[-0.065em] md:text-7xl lg:text-8xl">
            Lojistik ve iş makinesi operasyonları için tek merkez.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
            Traxle; yükveren, araç sahibi, iş makinesi kiralayan işletme ve saha ekiplerini güvenli, izlenebilir ve ölçeklenebilir bir dijital akışta buluşturur.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/iletisim" className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-black text-slate-950 transition hover:-translate-y-0.5">
              Demo görüşmesi iste <FiArrowRight className="transition group-hover:translate-x-1" />
            </Link>
            <Link href="/hakkimizda" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-7 py-4 text-sm font-bold text-white backdrop-blur-xl transition hover:bg-white/[0.08]">
              Ekosistemi incele
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative">
          <div className="absolute inset-0 rounded-[3rem] bg-blue-500/20 blur-[90px]" />
          <div className="relative rounded-[2.7rem] border border-white/10 bg-white/[0.055] p-4 shadow-2xl shadow-black/40 backdrop-blur-2xl">
            <div className="rounded-[2.1rem] border border-white/10 bg-[#070b14] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.23em] text-slate-500">Operasyon haritası</p>
                  <h2 className="mt-2 text-2xl font-black">Antalya Aktif Ağ</h2>
                </div>
                <div className="rounded-2xl bg-emerald-400/10 px-3 py-2 text-xs font-black text-emerald-300">Canlı</div>
              </div>

              <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.035] p-5">
                <div className="relative h-72 overflow-hidden rounded-[1.6rem] border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,.32),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(34,211,238,.24),transparent_30%),#0b1220]">
                  <div className="absolute left-[18%] top-[30%] h-4 w-4 rounded-full bg-blue-300 shadow-[0_0_30px_rgba(147,197,253,.9)]" />
                  <div className="absolute left-[58%] top-[46%] h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_30px_rgba(103,232,249,.9)]" />
                  <div className="absolute left-[74%] top-[20%] h-4 w-4 rounded-full bg-emerald-300 shadow-[0_0_30px_rgba(110,231,183,.9)]" />
                  <div className="absolute left-[25%] top-[38%] h-[2px] w-[220px] rotate-[12deg] bg-gradient-to-r from-blue-300/0 via-blue-300/70 to-cyan-300/0" />
                  <div className="absolute bottom-5 left-5 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 backdrop-blur-xl">
                    <p className="text-xs text-slate-400">Aktif rota</p>
                    <p className="font-black">Döşemealtı → Liman</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {['12 iş', '38 araç', '96% doğrulama'].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center text-sm font-black">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-300">Çekirdek yetenekler</p>
          <h2 className="mt-5 text-4xl font-black tracking-[-0.045em] md:text-6xl">Saha gerçeğine uygun dijital altyapı.</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {capabilities.map(([title, text, Icon]: any) => (
            <div key={title} className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.07]">
              <div className="mb-8 inline-flex rounded-2xl bg-blue-400/10 p-4 text-blue-200"><Icon size={24} /></div>
              <h3 className="text-xl font-black">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-xl">
            <div className="mb-7 inline-flex rounded-3xl bg-cyan-400/10 p-4 text-cyan-200"><FiShield size={28} /></div>
            <h2 className="text-4xl font-black tracking-[-0.04em]">Blokaj, komisyon ve güven tasarımı bir arada.</h2>
            <p className="mt-5 text-base leading-8 text-slate-400">Traxle, ödemeyi kendi üzerinde tutan bir cüzdan sistemi gibi değil; ödeme kuruluşu altyapısı ile uyumlu yazılım katmanı olarak konumlanır.</p>
          </div>
          <div className="grid gap-4">
            {steps.map(([no, title, text]) => (
              <div key={no} className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 sm:grid-cols-[90px_1fr]">
                <div className="text-3xl font-black text-blue-300">{no}</div>
                <div>
                  <h3 className="font-black">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-400">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Background() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-1/2 top-[-260px] h-[620px] w-[920px] -translate-x-1/2 rounded-full bg-blue-500/18 blur-[170px]" />
      <div className="absolute right-[-220px] top-[420px] h-[560px] w-[560px] rounded-full bg-cyan-400/10 blur-[150px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.06]" />
    </div>
  );
}
