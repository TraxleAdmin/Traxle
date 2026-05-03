'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiArchive,
  FiArrowRight,
  FiBox,
  FiCode,
  FiCpu,
  FiDatabase,
  FiLayers,
  FiTag,
} from 'react-icons/fi';

const modules = [
  {
    icon: FiTag,
    title: 'Barkod Üretimi',
    description: 'Ürün kodu, kategori ve varyant bilgilerini kullanarak standart barkod akışları için temiz kayıt yapısı hazırlar.',
  },
  {
    icon: FiArchive,
    title: 'Ürün Kartları',
    description: 'Ürün adı, stok bilgisi, fiyat ve açıklama alanlarını tek ekranda yönetilebilir hale getirir.',
  },
  {
    icon: FiDatabase,
    title: 'Yerel Veri Akışı',
    description: 'Kodlama sürecinde hızlı test ve saha senaryoları için yerel kayıt mimarisiyle ilerler.',
  },
];

const buildSteps = [
  { title: 'Çekirdek kayıt modeli', status: 'Tamamlanıyor' },
  { title: 'Barkod ve etiket ekranları', status: 'Kodlanıyor' },
  { title: 'Ürün listeleme ve arama', status: 'Kodlanıyor' },
  { title: 'Kurumsal raporlama katmanı', status: 'Planlandı' },
];

export default function BarkodXPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-screen overflow-hidden bg-transparent text-gray-900 selection:bg-amber-500/30 dark:text-white"
    >
      <section className="relative px-4 pt-32 pb-20 md:pt-40">
        <div className="container relative z-10 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, x: -36 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-700 shadow-sm dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300">
                <FiCode className="animate-pulse" /> Kodlanıyor
              </div>

              <h1 className="mb-6 text-5xl font-black leading-[1.02] tracking-tight text-gray-900 dark:text-white md:text-7xl lg:text-8xl">
                BarkodX
                <span className="block text-amber-600 dark:text-amber-300">ürün operasyonunu hızlandırır.</span>
              </h1>

              <p className="max-w-2xl text-lg font-medium leading-relaxed text-gray-600 dark:text-gray-400 md:text-xl">
                BarkodX; ürün kartları, barkod kayıtları, etiket hazırlığı ve stok görünürlüğü için geliştirilen yeni nesil operasyon uygulaması. Şu anda çekirdek modülleri kodlanıyor ve saha kullanımına uygun hızlı, sade bir iş akışı hedefleniyor.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/iletisim?ref=barkodx"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gray-900 px-7 py-4 text-sm font-black text-white shadow-lg transition-all hover:-translate-y-1 active:scale-95 dark:bg-white dark:text-[#050814]"
                >
                  Gelişmeler için iletişime geç <FiArrowRight />
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-7 py-4 text-sm font-black text-amber-700 transition-all hover:-translate-y-1 hover:bg-amber-100 active:scale-95 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300"
                >
                  Ekosisteme dön
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 36, rotateY: -12 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] border border-amber-100 bg-white/85 p-8 shadow-xl backdrop-blur-2xl dark:border-amber-500/10 dark:bg-[#080c14]/80">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-300">Kod Laboratuvarı</p>
                    <h2 className="mt-2 text-2xl font-black text-gray-900 dark:text-white">Tarama Simülasyonu</h2>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-2xl text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                    <FiBox />
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-950 p-5 shadow-inner dark:border-white/5">
                  <motion.div
                    initial={{ x: '-20%' }}
                    animate={{ x: '120%' }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-y-0 left-0 w-16 bg-amber-400/20 blur-md"
                  />
                  <div className="relative z-10 grid grid-cols-12 gap-1">
                    {Array.from({ length: 72 }).map((_, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0.25 }}
                        animate={{ opacity: index % 5 === 0 ? 1 : 0.45 }}
                        transition={{ duration: 1.4, repeat: Infinity, repeatType: 'reverse', delay: (index % 8) * 0.05 }}
                        className={`h-16 rounded-sm ${index % 3 === 0 ? 'bg-amber-300' : 'bg-white'}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:border-white/5 dark:bg-white/[0.03]">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Modül</p>
                    <p className="mt-2 font-black text-gray-900 dark:text-white">Ürün Kartı</p>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 dark:border-white/5 dark:bg-white/[0.03]">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Durum</p>
                    <p className="mt-2 font-black text-amber-700 dark:text-amber-300">Kodlanıyor</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <div key={module.title} className="rounded-[2rem] border border-gray-200/70 bg-white/80 p-8 shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-300 dark:border-white/10 dark:bg-[#0a0f1c]/70 dark:hover:border-amber-500/30">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-2xl text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                    <Icon />
                  </div>
                  <h3 className="mb-3 text-2xl font-black text-gray-900 dark:text-white">{module.title}</h3>
                  <p className="leading-relaxed text-gray-600 dark:text-gray-400">{module.description}</p>
                </div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 rounded-[2rem] border border-gray-200/70 bg-white/80 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-[#0a0f1c]/70"
          >
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                  <FiCpu /> Geliştirme Durumu
                </div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white">Kodlanan ana parçalar</h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                BarkodX, hızlı ürün tanımlama ve etiket operasyonları için aşamalı olarak hazırlanıyor. İlk hedef sade kayıt, hızlı arama ve güvenilir barkod akışı.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              {buildSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-white/5 dark:bg-white/[0.03]"
                >
                  <FiLayers className="mb-4 text-xl text-amber-700 dark:text-amber-300" />
                  <h3 className="font-black text-gray-900 dark:text-white">{step.title}</h3>
                  <p className="mt-3 text-xs font-bold uppercase tracking-widest text-gray-500">{step.status}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
