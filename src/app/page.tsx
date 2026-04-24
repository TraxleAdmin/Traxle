'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiBarChart2,
  FiCheckCircle,
  FiCreditCard,
  FiDatabase,
  FiLock,
  FiMapPin,
  FiPackage,
  FiShield,
  FiTruck,
  FiZap,
} from 'react-icons/fi';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const platformCards = [
  {
    title: 'Yük ve iş eşleştirme',
    text: 'Yükveren, araç sahibi ve saha operasyonlarını tek ekranda buluşturan kontrollü ilan ve teklif akışı.',
    icon: FiPackage,
  },
  {
    title: 'QR teslimat doğrulama',
    text: 'Teslimat noktasında QR doğrulama ile operasyon kapanışı, kayıt altına alma ve ödeme tetikleme kurgusu.',
    icon: FiCheckCircle,
  },
  {
    title: 'Güvenli ödeme mimarisi',
    text: 'Bakiye, blokaj, abonelik ve komisyon süreçleri ödeme kuruluşu altyapısıyla uyumlu tasarlanır.',
    icon: FiCreditCard,
  },
  {
    title: 'Harita ve saha görünürlüğü',
    text: 'Araç, iş, lokasyon ve mesafe verisini anlaşılır panel yapısıyla operasyon ekibine açar.',
    icon: FiMapPin,
  },
];

const trustItems = [
  'KVKK ve platform güvenliği odaklı veri mimarisi',
  'Yükveren, sürücü ve işletme rolleri için ayrı yetki modeli',
  'Firebase tabanlı ölçeklenebilir başlangıç altyapısı',
  'Mobil, web panel ve ödeme akışları için tek ekosistem',
];

const workflow = [
  ['01', 'İlan oluşturulur', 'Yükveren veya işletme, işi platformda tüm şartlarıyla yayınlar.'],
  ['02', 'Uygun taraf eşleşir', 'Araç sahibi veya operatör, işi kabul eder ve süreç kayıt altına alınır.'],
  ['03', 'Teslimat doğrulanır', 'QR, konum ve işlem kayıtlarıyla operasyon tamamlanır.'],
  ['04', 'Rapor oluşur', 'Komisyon, performans ve işlem geçmişi panelde görünür hale gelir.'],
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden bg-[#05070d] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-240px] h-[620px] w-[920px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[170px]" />
        <div className="absolute right-[-180px] top-[520px] h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-[150px]" />
        <div className="absolute bottom-0 left-[-220px] h-[620px] w-[620px] rounded-full bg-indigo-500/10 blur-[160px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.055)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.08]" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pb-20 pt-36 lg:px-8">
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.08 }}
          className="grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]"
        >
          <div>
            <motion.div
              variants={fadeUp}
              className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-blue-100 shadow-2xl shadow-blue-950/30 backdrop-blur-xl"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,.9)]" />
              Yeni nesil operasyon platformu
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="max-w-5xl text-5xl font-black tracking-[-0.07em] text-white md:text-7xl lg:text-8xl"
            >
              Ağır operasyonlar için akıllı dijital omurga.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl"
            >
              Traxle; yük, araç, iş makinesi, saha doğrulama ve ödeme süreçlerini tek ekranda toplayan premium B2B teknoloji ekosistemidir.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/lojistik"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-slate-950 shadow-[0_24px_80px_rgba(255,255,255,.16)] transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                Platformu keşfet
                <FiArrowRight className="transition group-hover:translate-x-1" />
              </Link>
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-7 py-4 text-sm font-bold text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/[0.08]"
              >
                İletişime geç
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-12 grid max-w-xl grid-cols-3 gap-3 text-center">
              {[
                ['B2B', 'Pazar yeri'],
                ['QR', 'Teslimat'],
                ['KVKK', 'Uyumlu yapı'],
              ].map(([value, label]) => (
                <div key={value} className="rounded-3xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl">
                  <div className="text-2xl font-black tracking-tight text-white">{value}</div>
                  <div className="mt-1 text-xs font-medium text-slate-400">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="relative">
            <div className="absolute inset-0 rounded-[3rem] bg-blue-500/20 blur-[90px]" />
            <div className="relative rounded-[2.5rem] border border-white/10 bg-white/[0.06] p-3 shadow-2xl shadow-black/40 backdrop-blur-2xl">
              <div className="rounded-[2rem] border border-white/10 bg-[#070b14] p-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Canlı operasyon</p>
                    <h2 className="mt-2 text-2xl font-black tracking-tight">Traxle Control</h2>
                  </div>
                  <div className="rounded-2xl bg-emerald-400/10 px-3 py-2 text-xs font-bold text-emerald-300">Aktif</div>
                </div>

                <div className="mt-5 grid gap-4">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-slate-400">Bugünkü işlem hacmi</p>
                        <p className="mt-2 text-4xl font-black tracking-tight">₺284.750</p>
                      </div>
                      <div className="rounded-2xl bg-blue-500/15 p-3 text-blue-300"><FiBarChart2 size={22} /></div>
                    </div>
                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-blue-400 to-cyan-300" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      ['12', 'Aktif iş'],
                      ['38', 'Uygun araç'],
                      ['96%', 'Doğrulama'],
                      ['7 dk', 'Ortalama eşleşme'],
                    ].map(([value, label]) => (
                      <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                        <p className="text-2xl font-black">{value}</p>
                        <p className="mt-1 text-xs text-slate-400">{label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-3xl border border-blue-400/20 bg-blue-400/[0.07] p-5">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-blue-400/15 p-3 text-blue-200"><FiTruck size={21} /></div>
                      <div>
                        <p className="font-bold">Antalya → İzmir</p>
                        <p className="text-sm text-slate-400">Blokaj hazır · QR teslimat bekleniyor</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-blue-300">Platform mimarisi</p>
          <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-6xl">Pazar yeri, ödeme ve saha takibi tek sistemde.</h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {platformCards.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                className="group rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.07]"
              >
                <div className="mb-8 inline-flex rounded-2xl bg-white/10 p-4 text-blue-200 transition group-hover:bg-blue-400/15">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-black tracking-tight">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{item.text}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.045] p-8 backdrop-blur-xl md:p-10">
            <div className="mb-7 inline-flex rounded-3xl bg-blue-500/15 p-4 text-blue-200">
              <FiShield size={28} />
            </div>
            <h2 className="text-4xl font-black tracking-[-0.04em]">Güven temeli olmadan pazar yeri büyümez.</h2>
            <p className="mt-5 text-base leading-8 text-slate-400">
              Traxle tasarımı; kimlik doğrulama, ödeme kuruluşu entegrasyonu, işlem kayıtları ve rol bazlı yetkilendirme üzerine kurulur.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {trustItems.map((item, index) => (
              <div key={item} className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
                  {index === 0 ? <FiLock /> : index === 1 ? <FiZap /> : index === 2 ? <FiDatabase /> : <FiShield />}
                </div>
                <p className="text-sm font-semibold leading-7 text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="rounded-[3rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl md:p-10">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-300">Akış</p>
              <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-5xl">İşin başından teslimata kadar izlenebilir süreç.</h2>
            </div>
            <div className="grid gap-4">
              {workflow.map(([step, title, text]) => (
                <div key={step} className="grid gap-4 rounded-[2rem] border border-white/10 bg-[#070b14]/70 p-5 sm:grid-cols-[90px_1fr]">
                  <div className="text-3xl font-black text-blue-300">{step}</div>
                  <div>
                    <h3 className="font-black">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-400">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-28 pt-16 lg:px-8">
        <div className="overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-br from-white/[0.10] to-white/[0.035] p-8 text-center shadow-2xl shadow-blue-950/30 backdrop-blur-xl md:p-14">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-blue-200">Traxle</p>
          <h2 className="mx-auto mt-5 max-w-4xl text-4xl font-black tracking-[-0.05em] md:text-6xl">
            Operasyonunu dijitalleştiren işletme daha hızlı eşleşir, daha kontrollü büyür.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300">
            Web panel, mobil uygulama ve ödeme altyapısı aynı vizyonda birleşir. Traxle, ağır işlerin dijital işletim sistemi olmak için tasarlanır.
          </p>
          <div className="mt-9 flex justify-center">
            <Link href="/iletisim" className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5">
              Demo görüşmesi planla
              <FiArrowRight className="transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
