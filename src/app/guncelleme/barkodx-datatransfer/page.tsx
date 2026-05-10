import Link from "next/link";

const BARKODX_APPSTORE_URL = "https://apps.apple.com/tr/app/barkodx/id6767043219?l=tr";

export default function BarkodXDataTransferPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-28 pb-20 text-gray-900 dark:bg-[#050814] dark:text-white">
      <div className="mx-auto w-full max-w-5xl">
        <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-cyan-700 dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-300">
          BarkodX DataTransfer
        </span>

        <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">BarkodX veri tasima merkezi</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-300">
          BarkodX kullanan ekipler icin veri tasima oncesi hazirlik, transfer ve dogrulama adimlari bu sayfada toplandi. Transfer surecinde hata riskini azaltmak icin adimlari sirasiyla uygulayin.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
            <h2 className="text-xl font-black">Transfer oncesi kontrol</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-gray-600 dark:text-gray-300">
              <li>Eski cihazdaki tum urun ve stok kayitlarini son kez senkronize edin.</li>
              <li>Rol bazli yetkileri kontrol edip yeni cihaza aktarim listesi olusturun.</li>
              <li>Transfer zamani icin operasyon ekibini bilgilendirip kesinti penceresi belirleyin.</li>
            </ul>
          </article>

          <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
            <h2 className="text-xl font-black">Transfer sonrasi dogrulama</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-gray-600 dark:text-gray-300">
              <li>Rastgele urun barkodlarini okutarak kayit eslesmelerini test edin.</li>
              <li>Kullanici hesaplarinda yetki ve oturum testlerini tamamlayin.</li>
              <li>Stok ve fiyat listelerinin eski cihazla birebir uyumunu kontrol edin.</li>
            </ul>
          </article>
        </div>

        <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
          <h3 className="text-lg font-black">BarkodX indirme ve yonlendirme</h3>
          <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
            Yeni cihaz kurulumunda BarkodX iOS uygulamasini resmi App Store adresinden indirin.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={BARKODX_APPSTORE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700"
            >
              BarkodX App Store indir
            </Link>
            <Link
              href="/guncelleme/kunyex"
              className="inline-flex rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:border-gray-400 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/40"
            >
              KunyeX guncelleme sayfasina gec
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
