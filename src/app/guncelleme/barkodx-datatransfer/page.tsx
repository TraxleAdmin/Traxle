import Link from "next/link";
import { FaApple } from "react-icons/fa";
import { FiArrowUpRight, FiCheckCircle, FiDatabase, FiShield } from "react-icons/fi";

const BARKODX_APPSTORE_URL = "https://apps.apple.com/tr/app/barkodx/id6767043219?l=tr";

export default function BarkodXDataTransferPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50 px-4 pt-28 pb-20 text-gray-900 transition-colors dark:bg-[#050814] dark:text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.18),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.14),transparent_45%)]" />

      <div className="relative mx-auto w-full max-w-6xl">
        <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-cyan-700 dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-300">
          BarkodX DataTransfer
        </span>

        <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">BarkodX veri tasima merkezi</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-300">
          BarkodX kullanan ekipler icin veri tasima oncesi hazirlik, transfer ve dogrulama adimlari bu sayfada
          toplandi. Transfer surecinde hata riskini azaltmak icin kontrol listesini adim adim uygulayin.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04]">
            <p className="text-xs font-bold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">
              Transfer oncesi
            </p>
            <h2 className="mt-2 text-xl font-black">Hazirlik kontrol karti</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
              <li className="inline-flex gap-2">
                <FiCheckCircle className="mt-1 shrink-0 text-emerald-500" />
                Eski cihazdaki stok ve urun kayitlarinin son senkronizasyonunu tamamlayin.
              </li>
              <li className="inline-flex gap-2">
                <FiCheckCircle className="mt-1 shrink-0 text-emerald-500" />
                Rol bazli yetkileri kontrol ederek yeni cihaza aktarim listesini olusturun.
              </li>
              <li className="inline-flex gap-2">
                <FiCheckCircle className="mt-1 shrink-0 text-emerald-500" />
                Ekipleri bilgilendirip planli bir gecis penceresi belirleyin.
              </li>
            </ul>
          </article>

          <article className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.04]">
            <p className="text-xs font-bold uppercase tracking-wide text-blue-700 dark:text-blue-300">
              Transfer sonrasi
            </p>
            <h2 className="mt-2 text-xl font-black">Dogrulama kontrol karti</h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
              <li className="inline-flex gap-2">
                <FiDatabase className="mt-1 shrink-0 text-blue-600 dark:text-blue-300" />
                Rastgele barkod okuma testleriyle kayit eslesmelerini dogrulayin.
              </li>
              <li className="inline-flex gap-2">
                <FiDatabase className="mt-1 shrink-0 text-blue-600 dark:text-blue-300" />
                Kullanici yetkileri ve oturum akislarini tek tek test edin.
              </li>
              <li className="inline-flex gap-2">
                <FiDatabase className="mt-1 shrink-0 text-blue-600 dark:text-blue-300" />
                Stok ve fiyat listelerinin eski cihazla birebir uyumunu kontrol edin.
              </li>
            </ul>
          </article>
        </div>

        <section className="mt-8 rounded-3xl border border-gray-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
          <h3 className="inline-flex items-center gap-2 text-lg font-black">
            <FiShield className="text-emerald-500" />
            Indirme ve yonlendirme
          </h3>
          <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
            Yeni cihaz kurulumunda BarkodX iOS uygulamasini resmi App Store baglantisindan indirin. Guncelleme
            dosyalari ve masaustu dagitimlari icin KunyeX sayfasina gecis yapabilirsiniz.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={BARKODX_APPSTORE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700"
            >
              <FaApple />
              BarkodX App Store indir
            </Link>
            <Link
              href="/guncelleme/kunyex"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:border-gray-400 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/40"
            >
              KunyeX guncelleme sayfasina gec
              <FiArrowUpRight />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
