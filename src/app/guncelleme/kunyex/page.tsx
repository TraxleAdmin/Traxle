import Link from "next/link";

const MANIFEST_URL = "https://traxleapp.com/guncelleme/kunyex-latest.json";
const EXE_URL = "https://traxleapp.com/guncelleme/KunyeX_Master_Client.exe";

export default function KunyeXManualUpdatePage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-28 pb-20 text-gray-900 dark:bg-[#050814] dark:text-white">
      <div className="mx-auto w-full max-w-5xl">
        <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300">
          KunyeX Manuel Guncelleme
        </span>

        <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">KunyeX istemci guncelleme paketi</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-300">
          Bu sayfa, saha ve merkez ekipleri icin kontrollu guncelleme dagitimi yapmaniz amaciyla hazirlandi. Uygulama manifest dosyasini okuyarak yeni surumu gorur, EXE paketiyle manuel kurulum yapabilirsiniz.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
            <h2 className="text-xl font-black">1) Guncelleme manifesti</h2>
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
              className="mt-4 inline-flex rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition hover:border-gray-400 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/40"
            >
              JSON dosyasini ac
            </Link>
          </article>

          <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
            <h2 className="text-xl font-black">2) Manuel kurulum dosyasi</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
              Istemcinin indirecegi resmi guncelleme EXE dosyasi:
            </p>
            <code className="mt-3 block rounded-xl bg-gray-100 p-3 text-xs text-gray-800 dark:bg-white/10 dark:text-gray-100">
              {EXE_URL}
            </code>
            <Link
              href={EXE_URL}
              className="mt-4 inline-flex rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              KunyeX Master Client indir
            </Link>
            <Link
              href="/barkodx/uygulamalar/guncelleme"
              className="mt-3 inline-flex rounded-full border border-cyan-300 bg-cyan-50 px-5 py-3 text-sm font-semibold text-cyan-800 transition hover:border-cyan-400 dark:border-cyan-400/40 dark:bg-cyan-400/10 dark:text-cyan-200"
            >
              BarkodX uygulama guncelleme sayfasina git
            </Link>
          </article>
        </div>

        <section className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
          <h3 className="text-lg font-black">Operasyon adimlari</h3>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-gray-600 dark:text-gray-300">
            <li>Mevcut kurulum dizininin yedegini alin.</li>
            <li>Manifest JSON ile surum bilgisini dogrulayin.</li>
            <li>EXE dosyasini indirip yonetici yetkisiyle calistirin.</li>
            <li>Kurulum sonrasi giris, profil ve senkronizasyon kontrollerini yapin.</li>
          </ol>
        </section>
      </div>
    </div>
  );
}
