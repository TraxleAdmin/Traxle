import Link from "next/link";
import { FaFileCode, FaWindows } from "react-icons/fa";
import { FiArrowUpRight, FiDatabase } from "react-icons/fi";

export default function UpdateHubPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50 px-4 pb-20 pt-28 text-gray-900 transition-colors dark:bg-[#050814] dark:text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.15),transparent_45%)]" />

      <div className="relative mx-auto w-full max-w-6xl">
        <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300">
          Güncelleme Merkezi
        </span>

        <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">KunyeX ve BarkodX teknik dağıtım sayfaları</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-300">
          Bu merkezden KunyeX istemci güncellemesini manuel olarak indirebilir, BarkodX veri aktarımı adımlarını takip edebilir
          ve operasyonel geçiş sürecinizi standartlaştırabilirsiniz.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04]">
            <p className="text-xs font-bold uppercase tracking-wide text-blue-700 dark:text-blue-300">KunyeX Güncelleme</p>
            <h2 className="mt-2 text-2xl font-black">Manuel Güncelleme Paketi</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
              Otomatik güncelleme kapalıysa veya kontrollü dağıtım gerekiyorsa, sürüm bildirimi (manifest) ve EXE dosyalarına bu
              sayfadan doğrudan erişebilirsiniz.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/guncelleme/kunyex"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <FaWindows />
                KunyeX güncelleme sayfasına git
              </Link>
              <Link
                href="https://traxleapp.com/guncelleme/kunyex-latest.json"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:border-gray-400 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/40"
              >
                <FaFileCode />
                JSON sürüm bildirimi
              </Link>
            </div>
          </article>

          <article className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04]">
            <p className="text-xs font-bold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">BarkodX Veri Aktarımı</p>
            <h2 className="mt-2 text-2xl font-black">Veri Taşıma ve Doğrulama</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
              Cihaz değişimi senaryolarında BarkodX veri aktarımını adım adım yönetmek ve geçiş riskini azaltmak için
              detaylı kontrol sayfasını kullanın.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/barkodx/uygulamalar/guncelleme"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700"
              >
                <FiDatabase />
                BarkodX uygulama güncelleme
              </Link>
              <Link
                href="/guncelleme/barkodx-datatransfer"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-300 bg-cyan-50 px-5 py-3 text-sm font-semibold text-cyan-800 transition hover:border-cyan-400 dark:border-cyan-400/40 dark:bg-cyan-400/10 dark:text-cyan-200"
              >
                Veri aktarımı detayları
                <FiArrowUpRight />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
