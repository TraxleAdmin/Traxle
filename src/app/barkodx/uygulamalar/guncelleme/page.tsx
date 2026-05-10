import Link from "next/link";
import { FaApple, FaFileCode, FaWindows } from "react-icons/fa";
import { FiArrowUpRight, FiDatabase, FiRefreshCw, FiShield } from "react-icons/fi";

const BARKODX_APPSTORE_URL = "https://apps.apple.com/tr/app/barkodx/id6767043219?l=tr";
const KUNYEX_MANIFEST_URL = "https://traxleapp.com/guncelleme/kunyex-latest.json";
const KUNYEX_EXE_URL = "https://traxleapp.com/guncelleme/KunyeX_Master_Client.exe";

export default function BarkodxApplicationsUpdatePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50 px-4 pt-28 pb-20 text-gray-900 transition-colors dark:bg-[#050814] dark:text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.18),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.14),transparent_45%)]" />
      <div className="mx-auto w-full max-w-6xl">
        <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-cyan-700 dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-300">
          BarkodX Uygulamalar
        </span>

        <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
          BarkodX guncelleme ve dagitim merkezi
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-300">
          Bu sayfa, BarkodX kullanan ekiplerin uygulama dagitimi, veri transfer adimlari ve ilgili guncelleme kaynaklarina hizli erisim saglamasi icin Traxle arayuzuyle uyumlu olarak hazirlandi.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <article className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04]">
            <p className="text-xs font-bold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">Uygulama dagitimi</p>
            <h2 className="mt-2 text-xl font-black">BarkodX iOS indirme</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
              Saha ekiplerinin BarkodX kurulumunu resmi App Store baglantisi ile standart hale getirin.
            </p>
            <Link
              href={BARKODX_APPSTORE_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700"
            >
              <FaApple />
              App Store'dan indir
            </Link>
          </article>

          <article className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04]">
            <p className="text-xs font-bold uppercase tracking-wide text-blue-700 dark:text-blue-300">Veri tasima</p>
            <h2 className="mt-2 text-xl font-black">DataTransfer adimlari</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
              BarkodX cihaz degisimlerinde veri kaybi yasamamak icin standart transfer adimlarini uygulayin.
            </p>
            <Link
              href="/guncelleme/barkodx-datatransfer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-blue-300 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-800 transition hover:border-blue-400 dark:border-blue-400/40 dark:bg-blue-400/10 dark:text-blue-200"
            >
              <FiDatabase />
              DataTransfer sayfasini ac
            </Link>
          </article>

          <article className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04]">
            <p className="text-xs font-bold uppercase tracking-wide text-purple-700 dark:text-purple-300">Masaustu guncelleme</p>
            <h2 className="mt-2 text-xl font-black">KunyeX update kaynaklari</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
              Entegrasyonlu surecler icin KunyeX istemci surum kontrolu ve manuel EXE dagitim baglantilari.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <Link
                href={KUNYEX_MANIFEST_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition hover:border-gray-400 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/40"
              >
                <FaFileCode />
                kunyex-latest.json
              </Link>
              <Link
                href={KUNYEX_EXE_URL}
                className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
              >
                <FaWindows />
                KunyeX Master Client indir
              </Link>
            </div>
          </article>
        </div>

        <section className="mt-8 rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
          <h3 className="inline-flex items-center gap-2 text-lg font-black">
            <FiShield className="text-emerald-500" />
            Operasyon notlari
          </h3>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-gray-600 dark:text-gray-300">
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
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition hover:border-gray-400 dark:border-white/20 dark:bg-white/10 dark:text-white"
            >
              Merkeze don
              <FiArrowUpRight />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
