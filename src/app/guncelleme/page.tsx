'use client';

import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDownToLine,
  BadgeCheck,
  Box,
  CheckCircle2,
  Cpu,
  DatabaseZap,
  FileCode2,
  MonitorDown,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import TextShimmer from '@/components/ui/TextShimmer';

const update = {
  product: 'KunyeX Master Client',
  version: '1.1.0',
  fileName: 'KunyeX_Master_Client.exe',
  downloadUrl: '/guncelleme/KunyeX_Master_Client.exe',
  manifestUrl: '/guncelleme/kunyex-latest.json',
  sizeLabel: '96.86 MiB',
  sha256: 'B019D3BE16AE491F6787FC08114B3560C2A98254B6B2903F879AD33F73294C45',
  publishedAt: '05.05.2026',
};

const releaseNotes = [
  {
    icon: DatabaseZap,
    title: 'Kalici bellek matrisi',
    description:
      'Yeni fiyatlar ve urun verileri eski kayitlari bozmadan daha genis bir havuzda tutulur. Sube operasyonlari daha kararli ilerler.',
    tone: 'cyan',
  },
  {
    icon: RadioTower,
    title: 'Guncelleme kanali',
    description:
      'Program guncellemeleri artik web uzerinden tek merkezden alinabilir. Ekipler ayni dosyaya, ayni surum bilgisiyle ulasir.',
    tone: 'emerald',
  },
  {
    icon: Zap,
    title: 'Performans ve isleme akisi',
    description:
      'ODP/PPTX isleme hattindaki duzeltmeler, arka plan operasyonlari ve kurulum akisi daha temiz hale getirildi.',
    tone: 'amber',
  },
];

const checks = [
  'Windows 10 / 11 uyumlu',
  '64-bit istemci paketi',
  'SHA-256 kontrol bilgisi yayinda',
  'Tek tikla dogrudan indirme',
];

export default function UpdatePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 px-5 pb-20 pt-32 text-slate-950 transition-colors duration-500 dark:bg-[#030712] dark:text-white sm:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-cyan-400/12 blur-[120px]" />
        <div className="absolute right-[-12rem] top-28 h-[34rem] w-[34rem] rounded-full bg-emerald-300/10 blur-[110px]" />
        <div className="absolute bottom-0 left-[-10rem] h-[30rem] w-[30rem] rounded-full bg-blue-500/10 blur-[110px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.055)_1px,transparent_1px)] bg-[size:44px_44px] opacity-55 dark:bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)]" />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-white/82 px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-cyan-700 shadow-[0_18px_60px_rgba(15,23,42,0.10)] backdrop-blur-2xl dark:border-cyan-300/20 dark:bg-white/[0.065] dark:text-cyan-200">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            KUNYEX UPDATE CENTER
          </div>
          <h1 className="text-4xl font-black leading-[0.98] tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
            KunyeX <TextShimmer>v{update.version}</TextShimmer>
            <br className="hidden sm:block" /> indirme merkezi
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
            KunyeX istemci guncellemelerini bu sayfadan alin. Son paket, surum bilgisi ve dosya dogrulama ozeti tek merkezde tutulur.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.section
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[1.6rem] border border-slate-200/80 bg-white/[0.88] p-5 shadow-[0_30px_110px_rgba(15,23,42,0.14)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_30px_110px_rgba(0,0,0,0.34)] sm:p-7"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(34,211,238,0.22),transparent_36%),linear-gradient(135deg,rgba(255,255,255,0.24),transparent_42%)]" />
            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] font-black uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-200">
                    Latest package
                  </p>
                  <h2 className="mt-3 text-3xl font-black text-slate-950 dark:text-white">{update.product}</h2>
                  <p className="mt-2 text-sm font-bold text-slate-500 dark:text-slate-300">
                    Windows 10 / 11 - 64-bit - {update.sizeLabel}
                  </p>
                </div>
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/12 text-cyan-700 shadow-[0_0_38px_rgba(34,211,238,0.18)] dark:text-cyan-100">
                  <MonitorDown size={24} aria-hidden="true" />
                </span>
              </div>

              <a
                href={update.downloadUrl}
                download={update.fileName}
                className="mt-7 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full border border-cyan-300/40 bg-cyan-400 px-6 text-sm font-black text-slate-950 shadow-[0_0_44px_rgba(34,211,238,0.34)] transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                <ArrowDownToLine size={19} aria-hidden="true" />
                KunyeX Master Client indir
              </a>

              <div className="mt-7 grid gap-3">
                {checks.map((check) => (
                  <div key={check} className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/90 px-4 py-3 text-sm font-black text-slate-700 dark:border-white/10 dark:bg-black/20 dark:text-slate-200">
                    <CheckCircle2 size={17} className="text-emerald-500" aria-hidden="true" />
                    {check}
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-3 rounded-2xl border border-slate-200/80 bg-slate-950 p-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] dark:border-white/10">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-white/50">Surum</span>
                  <span className="font-mono text-sm font-black">v{update.version}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-white/50">Yayin</span>
                  <span className="font-mono text-sm font-black">{update.publishedAt}</span>
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-white/50">
                    <ShieldCheck size={14} aria-hidden="true" />
                    SHA-256
                  </div>
                  <p className="break-all rounded-xl bg-white/[0.06] p-3 font-mono text-[11px] font-bold leading-5 text-cyan-100">
                    {update.sha256}
                  </p>
                </div>
              </div>

              <a
                href={update.manifestUrl}
                className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-700 transition hover:text-cyan-500 dark:text-cyan-200"
              >
                <FileCode2 size={15} aria-hidden="true" />
                Manifest JSON
              </a>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-5"
          >
            <div className="relative overflow-hidden rounded-[1.6rem] border border-slate-200/80 bg-white/[0.78] p-6 shadow-[0_24px_90px_rgba(15,23,42,0.10)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.045]">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.045)_1px,transparent_1px)] bg-[size:34px_34px] dark:bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)]" />
              <div className="relative flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-900/10 bg-slate-950 text-white dark:border-white/10 dark:bg-white/[0.08]">
                  <Sparkles size={19} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-[11px] font-black uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-200">
                    Release notes
                  </p>
                  <h2 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">Bu surumde neler var?</h2>
                </div>
              </div>
            </div>

            {releaseNotes.map((note, index) => {
              const Icon = note.icon;

              return (
                <motion.article
                  key={note.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.62, delay: 0.26 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="premium-motion-card relative overflow-hidden rounded-[1.25rem] border border-slate-200/80 bg-white/[0.84] p-5 shadow-[0_20px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.055]"
                  style={{ '--card-accent': note.tone === 'emerald' ? '#34d399' : note.tone === 'amber' ? '#f59e0b' : '#22d3ee' } as CSSProperties}
                >
                  <div className="relative flex gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-900/10 bg-slate-950 text-white dark:border-white/10 dark:bg-white/[0.08]">
                      <Icon size={19} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-lg font-black text-slate-950 dark:text-white">{note.title}</h3>
                      <p className="mt-2 text-sm font-medium leading-7 text-slate-600 dark:text-slate-300">{note.description}</p>
                    </div>
                  </div>
                </motion.article>
              );
            })}

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: 'Paket', value: 'EXE', icon: Box },
                { label: 'Kontrol', value: 'SHA', icon: BadgeCheck },
                { label: 'Runtime', value: 'Win64', icon: Cpu },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-[1.15rem] border border-slate-200/80 bg-white/[0.72] p-4 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045]">
                    <Icon size={18} className="text-cyan-600 dark:text-cyan-200" aria-hidden="true" />
                    <p className="mt-4 font-mono text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">{item.label}</p>
                    <p className="mt-1 text-xl font-black text-slate-950 dark:text-white">{item.value}</p>
                  </div>
                );
              })}
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
