'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiActivity,
  FiArrowRight,
  FiCpu,
  FiFileText,
  FiLayers,
  FiMaximize,
  FiMessageSquare,
  FiPrinter,
  FiShield,
  FiTool,
} from 'react-icons/fi';
import TextShimmer from '@/components/ui/TextShimmer';

const coreFeatures = [
  {
    icon: FiMaximize,
    title: 'Görüntü İşleme (OCR)',
    description: 'PDF, fotoğraf ve fatura içeriğindeki plaka, miktar, üretim yeri ve ürün bilgisini otomatik ayıklar.',
  },
  {
    icon: FiPrinter,
    title: 'Dinamik PDF Motoru',
    description: 'QR kodlu, firma logolu ve parametrik baskı dosyalarını şube ihtiyaçlarına göre hazırlar.',
  },
  {
    icon: FiLayers,
    title: 'Akıllı Fiyat Matrisi',
    description: 'Merkezi ürün verilerini okur, ürün isimleriyle eşleştirir ve etiket fiyatlarını otomatik belirler.',
  },
];

const roadmap = [
  { label: 'OCR doğruluk katmanı', value: 'Geliştiriliyor', progress: 'w-[78%]' },
  { label: 'Şube kilidi ve HWID kontrolü', value: 'Test ediliyor', progress: 'w-[64%]' },
  { label: 'Toplu PDF ve etiket üretimi', value: 'Geliştiriliyor', progress: 'w-[71%]' },
];

const details = [
  'HKS bildirimleri ve faturalar için veri ayıklama akışı',
  'Şubeye özel donanım kimliği doğrulaması',
  'Ürün-fiyat eşleştirmesi ve reyon etiketi üretimi',
  'Kurulum talebiyle ilerleyen kontrollü enterprise dağıtım',
];

export default function KunyeXEnterprisePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent pt-32 pb-20 text-gray-900 transition-colors duration-500 selection:bg-cyan-500/30 dark:text-white">
      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-28 grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, rotateY: -15, z: -100 }}
            animate={{ opacity: 1, rotateY: 0, z: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 transform-gpu lg:col-span-5 lg:order-1"
          >
            <div className="relative overflow-hidden rounded-[3rem] border border-gray-200/50 bg-white/80 p-10 text-center shadow-[0_20px_60px_rgba(0,194,255,0.1)] backdrop-blur-3xl transition-all duration-700 hover:border-cyan-500/50 dark:border-white/10 dark:bg-[#0a0f1c]/70 dark:shadow-[0_20px_60px_rgba(0,194,255,0.15)]">
              <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400" />

              <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border border-cyan-100 bg-cyan-50 text-4xl text-cyan-500 shadow-inner transition-transform duration-700 hover:scale-110 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-400">
                <FiCpu />
              </div>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-700 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-300">
                <FiTool className="animate-pulse" /> Geliştiriliyor
              </div>

              <h2 className="mb-3 text-3xl font-black text-gray-900 dark:text-white">KünyeX Enterprise</h2>
              <p className="mb-8 px-2 text-base font-medium leading-relaxed text-gray-600 dark:text-gray-400">
                Merkez depo ve şubeler için HWID kilitli, kontrollü dağıtım modeline sahip OCR ve barkod otomasyon sistemi geliştiriliyor.
              </p>

              <div className="mb-8 flex flex-col gap-3">
                <div className="mx-auto flex w-fit items-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-500/5 px-4 py-2 text-[10px] font-bold text-cyan-500 dark:text-cyan-400">
                  <FiShield /> ZERO-TRUST KURULUM MODELİ
                </div>
              </div>

              <Link
                href="/iletisim?ref=kunyex-request"
                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 py-5 font-black tracking-wide text-white shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all hover:from-cyan-500 hover:to-blue-500 active:scale-95"
              >
                <span className="absolute inset-0 translate-x-[-100%] bg-white/20 transition-transform duration-700 group-hover:translate-x-[100%]" />
                <FiMessageSquare className="text-xl" /> Kurulum Talebi Oluştur
              </Link>

              <p className="mt-5 text-[10px] font-bold uppercase tracking-widest text-gray-400 opacity-70 dark:text-gray-500">
                Öncelikli Enterprise Pilotları İçin
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 34 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 space-y-8 lg:col-span-7 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-600 shadow-sm backdrop-blur-md dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-400">
              <FiActivity className="animate-pulse" /> OCR, QR ve Etiket Otomasyonu
            </div>

            <h1 className="text-6xl font-black leading-[1.0] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-500 dark:from-white dark:to-white/40 md:text-7xl lg:text-8xl">
              Evrak İşleri <br />
              <TextShimmer className="[--base-color:theme(colors.cyan.600)] [--base-gradient-color:theme(colors.cyan.400)] dark:[--base-color:theme(colors.cyan.400)] dark:[--base-gradient-color:theme(colors.cyan.200)]">
                Geliştiriliyor.
              </TextShimmer>
            </h1>

            <p className="max-w-2xl text-xl font-light leading-relaxed text-gray-600 dark:text-gray-400">
              KünyeX; HKS bildirimlerini, karmaşık faturaları ve PDF tablolarını daha hızlı okunabilir hale getirmek için geliştiriliyor. Amaç, karmaşık evrak süreçlerini şube kilitli, izlenebilir ve otomatik etiket üreten bir yapıya dönüştürmek.
            </p>

            <div className="grid grid-cols-1 gap-8 border-t border-gray-200/50 pt-8 dark:border-white/10 md:grid-cols-2">
              {coreFeatures.slice(0, 2).map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex gap-4">
                    <Icon className="mt-1 shrink-0 text-3xl text-cyan-500 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                    <div>
                      <h4 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h4>
                      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {coreFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="rounded-[2.5rem] border border-gray-200/50 bg-white/80 p-10 shadow-lg backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-500/30 dark:border-white/10 dark:bg-[#0a0f1c]/70">
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-100 bg-cyan-50 text-2xl text-cyan-600 shadow-inner transition-transform duration-500 hover:rotate-6 hover:scale-110 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-400">
                  <Icon />
                </div>
                <h3 className="mb-4 text-2xl font-black text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-base font-light leading-relaxed text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-gray-200/70 bg-white/80 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-[#0a0f1c]/70"
          >
            <div className="mb-6 flex items-center gap-3">
              <FiFileText className="text-2xl text-cyan-600 dark:text-cyan-400" />
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">Geliştirme Odakları</h2>
            </div>
            <div className="space-y-4">
              {details.map((detail) => (
                <div key={detail} className="flex gap-3 rounded-2xl bg-gray-50 p-4 text-sm font-bold text-gray-700 dark:bg-white/[0.03] dark:text-gray-300">
                  <FiArrowRight className="mt-0.5 shrink-0 text-cyan-600 dark:text-cyan-400" />
                  {detail}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border border-cyan-200/70 bg-cyan-50/70 p-8 backdrop-blur-xl dark:border-cyan-500/10 dark:bg-cyan-500/[0.04]"
          >
            <div className="mb-6 flex items-center gap-3">
              <FiActivity className="text-2xl text-cyan-700 dark:text-cyan-400" />
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">Canlı Geliştirme Panosu</h2>
            </div>
            <div className="space-y-4">
              {roadmap.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/70 bg-white/70 p-4 dark:border-white/5 dark:bg-white/[0.03]">
                  <div className="mb-3 flex items-center justify-between gap-3 text-sm">
                    <span className="font-bold text-gray-700 dark:text-gray-300">{item.label}</span>
                    <span className="font-black text-cyan-700 dark:text-cyan-300">{item.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200 dark:bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: item.progress }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full rounded-full bg-cyan-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
