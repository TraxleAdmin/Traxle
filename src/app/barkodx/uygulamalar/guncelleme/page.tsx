"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaApple, FaFileCode, FaWindows } from "react-icons/fa";
import { FiActivity, FiArrowUpRight, FiDatabase, FiRefreshCw, FiShield } from "react-icons/fi";

const BARKODX_APPSTORE_URL = "https://apps.apple.com/tr/app/barkodx/id6767043219?l=tr";
const KUNYEX_MANIFEST_URL = "https://traxleapp.com/guncelleme/kunyex-latest.json";
const KUNYEX_EXE_URL = "https://traxleapp.com/guncelleme/KunyeX_Master_Client.exe";

const FLOAT_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function BarkodxApplicationsUpdatePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 px-4 pt-28 pb-20 text-slate-900 transition-colors dark:bg-[#030712] dark:text-white">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 hidden h-44 bg-gradient-to-b from-[#020617] via-[#020617]/88 to-transparent dark:block" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.2),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.2),transparent_44%),radial-gradient(circle_at_70%_50%,rgba(217,70,239,0.12),transparent_48%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(100,116,139,0.13)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.13)_1px,transparent_1px)] bg-[size:42px_42px] opacity-30 dark:opacity-35" />

      <motion.div
        className="pointer-events-none absolute -top-16 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/25 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.32, 0.58, 0.32] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: FLOAT_EASE }}
          className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50/80 px-4 py-1 text-xs font-bold uppercase tracking-wider text-cyan-700 backdrop-blur-xl dark:border-cyan-400/35 dark:bg-cyan-400/12 dark:text-cyan-300"
        >
          <FiActivity />
          BarkodX Uygulamalar
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: FLOAT_EASE }}
          className="mt-5 text-4xl font-black tracking-tight sm:text-5xl"
        >
          BarkodX guncelleme ve dagitim merkezi
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.12, ease: FLOAT_EASE }}
          className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300"
        >
          Bu sayfa, BarkodX kullanan ekiplerin uygulama dagitimi, veri transfer adimlari ve ilgili guncelleme kaynaklarina hizli erisim saglamasi icin Traxle arayuzuyle uyumlu olarak hazirlandi.
        </motion.p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: [0, -6, 0] }}
            transition={{ opacity: { duration: 0.65 }, y: { duration: 6.2, repeat: Infinity, ease: "easeInOut" } }}
            whileHover={{ y: -10, scale: 1.01 }}
            className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/72 p-6 shadow-[0_22px_60px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.05]"
          >
            <div className="pointer-events-none absolute -right-16 -top-12 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl transition-opacity group-hover:opacity-90" />
            <p className="text-xs font-bold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">Uygulama dagitimi</p>
            <h2 className="mt-2 text-xl font-black">BarkodX iOS indirme</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Saha ekiplerinin BarkodX kurulumunu resmi App Store baglantisi ile standart hale getirin.
            </p>

            <div className="mt-5 rounded-2xl border border-cyan-200/70 bg-cyan-50/70 p-3 dark:border-cyan-400/20 dark:bg-cyan-400/10">
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-cyan-700 dark:text-cyan-200">
                <span>Store Sync</span>
                <span>LIVE</span>
              </div>
              <div className="mt-3 space-y-2">
                {[84, 62, 94].map((w, idx) => (
                  <motion.div
                    key={`store-${idx}`}
                    className="h-1.5 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500"
                    animate={{ width: [`${Math.max(42, w - 20)}%`, `${w}%`, `${Math.max(42, w - 14)}%`] }}
                    transition={{ duration: 2.8 + idx * 0.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                ))}
              </div>
            </div>

            <Link
              href={BARKODX_APPSTORE_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(8,145,178,0.35)] transition hover:from-blue-600 hover:to-indigo-600"
            >
              <FaApple />
              App Store'dan indir
            </Link>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: [0, -8, 0] }}
            transition={{ opacity: { duration: 0.65, delay: 0.08 }, y: { duration: 6.6, repeat: Infinity, ease: "easeInOut", delay: 0.22 } }}
            whileHover={{ y: -10, scale: 1.01 }}
            className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/72 p-6 shadow-[0_22px_60px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.05]"
          >
            <div className="pointer-events-none absolute -right-16 -top-12 h-44 w-44 rounded-full bg-blue-400/20 blur-3xl transition-opacity group-hover:opacity-90" />
            <p className="text-xs font-bold uppercase tracking-wide text-blue-700 dark:text-blue-300">Veri tasima</p>
            <h2 className="mt-2 text-xl font-black">DataTransfer adimlari</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              BarkodX cihaz degisimlerinde veri kaybi yasamamak icin standart transfer adimlarini uygulayin.
            </p>

            <div className="relative mt-5 overflow-hidden rounded-2xl border border-blue-200/70 bg-blue-50/70 p-3 dark:border-blue-400/20 dark:bg-blue-400/10">
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-200">
                <span>Backup</span>
                <span>Transfer</span>
                <span>Verify</span>
              </div>
              <motion.div
                className="absolute left-2 right-2 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                animate={{ y: [14, 56, 14] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <Link
              href="/guncelleme/barkodx-datatransfer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-blue-300 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-800 transition hover:border-blue-400 dark:border-blue-400/40 dark:bg-blue-400/10 dark:text-blue-200"
            >
              <FiDatabase />
              DataTransfer sayfasini ac
            </Link>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: [0, -7, 0] }}
            transition={{ opacity: { duration: 0.65, delay: 0.14 }, y: { duration: 6.4, repeat: Infinity, ease: "easeInOut", delay: 0.35 } }}
            whileHover={{ y: -10, scale: 1.01 }}
            className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/72 p-6 shadow-[0_22px_60px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.05]"
          >
            <div className="pointer-events-none absolute -right-16 -top-12 h-44 w-44 rounded-full bg-fuchsia-400/20 blur-3xl transition-opacity group-hover:opacity-90" />
            <p className="text-xs font-bold uppercase tracking-wide text-purple-700 dark:text-purple-300">Masaustu guncelleme</p>
            <h2 className="mt-2 text-xl font-black">KunyeX update kaynaklari</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Entegrasyonlu surecler icin KunyeX istemci surum kontrolu ve manuel EXE dagitim baglantilari.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <Link
                href={KUNYEX_MANIFEST_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100/70 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-400 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/40"
              >
                <FaFileCode />
                kunyex-latest.json
              </Link>
              <Link
                href={KUNYEX_EXE_URL}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(147,51,234,0.36)] transition hover:from-fuchsia-600 hover:to-purple-600"
              >
                <FaWindows />
                KunyeX Master Client indir
              </Link>
            </div>
          </motion.article>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.28 }}
          transition={{ duration: 0.7, ease: FLOAT_EASE }}
          className="mt-8 rounded-3xl border border-slate-200/80 bg-white/72 p-6 shadow-[0_22px_60px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.05]"
        >
          <h3 className="inline-flex items-center gap-2 text-lg font-black">
            <FiShield className="text-emerald-500" />
            Operasyon notlari
          </h3>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
            <li>Yeni cihaz kurulumu oncesi aktif BarkodX kullanicilarinin senkronizasyonunu tamamlayin.</li>
            <li>DataTransfer akisini test ortaminda bir kez calistirip kayit uyumunu dogrulayin.</li>
            <li>Canli ortama gecis sonrasi ilk vardiyada rastgele barkod okuma kontrolleri yapin.</li>
          </ol>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/guncelleme/kunyex"
              className="inline-flex items-center gap-2 rounded-full border border-indigo-300 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-800 transition hover:border-indigo-400 dark:border-indigo-400/40 dark:bg-indigo-400/10 dark:text-indigo-200"
            >
              <FiRefreshCw />
              KunyeX manuel guncelleme
            </Link>
            <Link
              href="/guncelleme"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-400 dark:border-white/20 dark:bg-white/10 dark:text-white"
            >
              Merkeze don
              <FiArrowUpRight />
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
