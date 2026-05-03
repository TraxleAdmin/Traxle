'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiActivity,
  FiArrowRight,
  FiBarChart2,
  FiCheckCircle,
  FiClock,
  FiShield,
  FiUsers,
  FiZap,
} from 'react-icons/fi';

const features = [
  {
    icon: FiClock,
    title: 'Mola ve Mesai Takibi',
    description: 'Personelin mola başlangıç, bitiş ve toplam çalışma sürelerini anlaşılır bir akışta takip eder.',
  },
  {
    icon: FiUsers,
    title: 'Ekip Görünürlüğü',
    description: 'Şube, vardiya ve ekip bazlı durumları yöneticilerin hızlı karar alabileceği bir özet ekrana taşır.',
  },
  {
    icon: FiBarChart2,
    title: 'Verimlilik Analizi',
    description: 'Kullanım istatistikleriyle yoğun saatleri, aksayan süreçleri ve iyileştirme alanlarını görünür kılar.',
  },
];

const readiness = [
  'Uygulama deneyimi canlı kullanıma hazırlandı',
  'Gizlilik politikası Türkçe ve İngilizce olarak yayında',
  'Destek talepleri support@traxleapp.com üzerinden alınabilir',
  'Kurumsal kullanım senaryoları için izleme ve raporlama akışı hazır',
];

const workflow = [
  { step: '01', title: 'Personel Girişi', text: 'Kullanıcı kimliği doğrulanır ve aktif vardiya görünür hale gelir.' },
  { step: '02', title: 'Mola Kaydı', text: 'Mola süreleri ve zaman takibi sade bir işlem akışıyla kaydedilir.' },
  { step: '03', title: 'Yönetici Özeti', text: 'Toplanan bilgiler günlük operasyon ekranlarında raporlanır.' },
];

export default function MolatikPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative min-h-screen overflow-hidden bg-transparent text-gray-900 transition-colors duration-500 selection:bg-purple-500/30 dark:text-white"
    >
      <section className="relative px-4 pt-32 pb-20 md:pt-40">
        <div className="container relative z-10 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-green-700 shadow-sm dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-400">
                <FiCheckCircle className="animate-pulse" /> Canlıya Hazır
              </div>

              <h1 className="mb-6 text-5xl font-black leading-[1.02] tracking-tight text-gray-900 dark:text-white md:text-7xl lg:text-8xl">
                Molatik
                <span className="block text-purple-600 dark:text-purple-400">mola yönetimini sadeleştirir.</span>
              </h1>

              <p className="max-w-2xl text-lg font-medium leading-relaxed text-gray-600 dark:text-gray-400 md:text-xl">
                Kurumsal işletmeler için geliştirilen Molatik; personel molalarını, zaman takibini ve kullanım istatistiklerini tek bir operasyon akışında toplar. Ekipler ne durumda, mola süreleri nasıl ilerliyor ve yöneticiler hangi veriye bakmalı sorularını hızlıca yanıtlar.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/molatik/gizlilik"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gray-900 px-7 py-4 text-sm font-black text-white shadow-lg transition-all hover:-translate-y-1 active:scale-95 dark:bg-white dark:text-[#050814]"
                >
                  Gizlilik politikasını incele <FiArrowRight />
                </Link>
                <Link
                  href="/iletisim?ref=molatik-ready"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-purple-200 bg-purple-50 px-7 py-4 text-sm font-black text-purple-700 transition-all hover:-translate-y-1 hover:bg-purple-100 active:scale-95 dark:border-purple-500/20 dark:bg-purple-500/10 dark:text-purple-300"
                >
                  Kurumsal bilgi al
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40, rotateY: 12 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] border border-purple-100 bg-white/85 p-8 shadow-xl backdrop-blur-2xl dark:border-purple-500/10 dark:bg-[#080c14]/80">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">Operasyon Panosu</p>
                    <h2 className="mt-2 text-2xl font-black text-gray-900 dark:text-white">Bugünkü Durum</h2>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-2xl text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                    <FiZap />
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    ['Aktif Vardiya', '12 personel', 'w-[78%]'],
                    ['Ortalama Mola', '14 dk', 'w-[52%]'],
                    ['Zaman Takibi', 'Canlı', 'w-[92%]'],
                  ].map(([label, value, width]) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4 dark:border-white/5 dark:bg-white/[0.03]"
                    >
                      <div className="mb-3 flex items-center justify-between text-sm">
                        <span className="font-bold text-gray-700 dark:text-gray-300">{label}</span>
                        <span className="font-black text-purple-600 dark:text-purple-400">{value}</span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-200 dark:bg-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width }}
                          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
                          className="h-full rounded-full bg-purple-500"
                        />
                      </div>
                    </motion.div>
                  ))}
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
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="rounded-[2rem] border border-gray-200/70 bg-white/80 p-8 shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-purple-300 dark:border-white/10 dark:bg-[#0a0f1c]/70 dark:hover:border-purple-500/30">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-2xl text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                    <Icon />
                  </div>
                  <h3 className="mb-3 text-2xl font-black text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="leading-relaxed text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-gray-200/70 bg-white/80 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-[#0a0f1c]/70"
            >
              <div className="mb-6 flex items-center gap-3">
                <FiActivity className="text-2xl text-purple-600 dark:text-purple-400" />
                <h2 className="text-2xl font-black text-gray-900 dark:text-white">İşleyiş Akışı</h2>
              </div>
              <div className="space-y-5">
                {workflow.map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-xs font-black text-purple-700 dark:bg-purple-500/10 dark:text-purple-300">{item.step}</span>
                    <div>
                      <h3 className="font-black text-gray-900 dark:text-white">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-green-200/70 bg-green-50/70 p-8 backdrop-blur-xl dark:border-green-500/10 dark:bg-green-500/[0.04]"
            >
              <div className="mb-6 flex items-center gap-3">
                <FiShield className="text-2xl text-green-700 dark:text-green-400" />
                <h2 className="text-2xl font-black text-gray-900 dark:text-white">Canlıya Hazırlık</h2>
              </div>
              <div className="space-y-4">
                {readiness.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl bg-white/70 p-4 text-sm font-bold text-gray-700 dark:bg-white/[0.03] dark:text-gray-300">
                    <FiCheckCircle className="mt-0.5 shrink-0 text-green-600 dark:text-green-400" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
