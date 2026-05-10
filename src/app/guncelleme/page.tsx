import Link from "next/link";

export default function UpdateHubPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-28 pb-20 text-gray-900 dark:bg-[#050814] dark:text-white">
      <div className="mx-auto w-full max-w-6xl">
        <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300">
          Guncelleme Merkezi
        </span>

        <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
          KunyeX ve BarkodX teknik dagitim sayfalari
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-300">
          Bu merkezden KunyeX istemci guncellemesini manuel indirebilir, BarkodX DataTransfer paketine ulasabilir ve kurulum adimlarini takip edebilirsiniz.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
            <p className="text-xs font-bold uppercase tracking-wide text-blue-700 dark:text-blue-300">KunyeX Update</p>
            <h2 className="mt-2 text-2xl font-black">Manuel Guncelleme Sayfasi</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
              Istemci tarafinda otomatik update devre disiysa veya kontrollu dagitim yapmak istiyorsaniz bu sayfadan dogrudan guncelleme dosyalarini indirebilirsiniz.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/guncelleme/kunyex"
                className="inline-flex rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                KunyeX guncelleme sayfasina git
              </Link>
              <Link
                href="/guncelleme/KunyeX_Master_Client.exe"
                className="inline-flex rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:border-gray-400 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/40"
              >
                EXE indir
              </Link>
            </div>
          </article>

          <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
            <p className="text-xs font-bold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">BarkodX DataTransfer</p>
            <h2 className="mt-2 text-2xl font-black">DataTransfer Sayfasi</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
              BarkodX kullanan ekipler icin veri tasima adimlari, dosya yapisi ve transfer sonrasi kontrol listesi bu sayfada yer alir.
            </p>
            <div className="mt-5">
              <Link
                href="/barkodx/uygulamalar/guncelleme"
                className="inline-flex rounded-full bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700"
              >
                BarkodX uygulama guncelleme sayfasina git
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
