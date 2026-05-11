import Link from "next/link";
import { FaFileCode, FaWindows } from "react-icons/fa";
import { FiArrowUpRight, FiRefreshCw, FiShield } from "react-icons/fi";

const MANIFEST_URL = "https://traxleapp.com/guncelleme/kunyex-latest.json";
const EXE_URL = "https://traxleapp.com/guncelleme/KunyeX_Master_Client.exe";

export default function KunyeXManualUpdatePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50 px-4 pt-28 pb-20 text-gray-900 transition-colors dark:bg-[#050814] dark:text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.14),transparent_45%)]" />

      <div className="relative mx-auto w-full max-w-6xl">
        <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300">
          KunyeX Manuel Guncelleme
        </span>

        <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
          KunyeX istemci guncelleme paketi
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-300">
          Bu sayfa, saha ve merkez ekipleri icin kontrollu guncelleme dagitimi yapmaniz amaciyla hazirlandi.
          Uygulama manifest dosyasini okuyarak surumu dogrular, EXE paketiyle manuel kurulum yapabilirsiniz.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04]">
            <p className="text-xs font-bold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
              Surum kaynagi
            </p>
            <h2 className="mt-2 text-xl font-black">1) Guncelleme manifesti</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
              Masaustu istemci, yeni surum kontrolu icin asagidaki JSON dosyasini ceker:
            </p>
            <code className="mt-3 block rounded-xl bg-gray-100 p-3 text-xs text-gray-800 dark:bg-white/10 dark:text-gray-100">
              {MANIFEST_URL}
            </code>
            <Link
              href={MANIFEST_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition hover:border-gray-400 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/40"
            >
              <FaFileCode />
              JSON dosyasini ac
            </Link>
          </article>

          <article className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04]">
            <p className="text-xs font-bold uppercase tracking-wide text-blue-700 dark:text-blue-300">
              Kurulum paketi
            </p>
            <h2 className="mt-2 text-xl font-black">2) Manuel kurulum dosyasi</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
              Istemcinin indirecegi resmi guncelleme EXE dosyasi:
            </p>
            <code className="mt-3 block rounded-xl bg-gray-100 p-3 text-xs text-gray-800 dark:bg-white/10 dark:text-gray-100">
              {EXE_URL}
            </code>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href={EXE_URL}
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <FaWindows />
                KunyeX Master Client indir
              </Link>
              <Link
                href="/barkodx/uygulamalar/guncelleme"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-300 bg-cyan-50 px-5 py-3 text-sm font-semibold text-cyan-800 transition hover:border-cyan-400 dark:border-cyan-400/40 dark:bg-cyan-400/10 dark:text-cyan-200"
              >
                <FiRefreshCw />
                BarkodX guncelleme sayfasina git
              </Link>
            </div>
          </article>
        </div>

        <section className="mt-8 rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
          <h3 className="inline-flex items-center gap-2 text-lg font-black">
            <FiShield className="text-emerald-500" />
            Operasyon adimlari
          </h3>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-gray-600 dark:text-gray-300">
            <li>Mevcut kurulum dizininin yedegini alin.</li>
            <li>Manifest JSON ile surum bilgisini dogrulayin.</li>
            <li>EXE dosyasini indirip yonetici yetkisiyle calistirin.</li>
            <li>Kurulum sonrasi giris, profil ve senkronizasyon kontrollerini tamamlayin.</li>
          </ol>
          <div className="mt-5">
            <Link
              href="/guncelleme"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition hover:border-gray-400 dark:border-white/20 dark:bg-white/10 dark:text-white"
            >
              Guncelleme merkezine don
              <FiArrowUpRight />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
