import React from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiShield } from 'react-icons/fi';

export default function MolatikPrivacyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent px-4 py-28 text-gray-900 transition-colors duration-500 selection:bg-purple-500/30 dark:text-gray-300 md:py-32">
      <div className="absolute left-1/2 top-24 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-[110px] pointer-events-none dark:bg-purple-600/10" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <Link
          href="/molatik"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-purple-600 transition-colors hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
        >
          <FiArrowLeft /> Molatik sayfasına dön
        </Link>

        <div className="rounded-3xl border border-purple-100 bg-white/90 p-6 text-left shadow-sm backdrop-blur-xl dark:border-purple-500/10 dark:bg-[#080c14]/90 md:p-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-purple-600 dark:border-purple-500/20 dark:bg-purple-500/10 dark:text-purple-400">
            <FiShield /> Gizlilik Politikası
          </div>

          <h1 className="mb-5 text-3xl font-black tracking-tight text-gray-900 dark:text-white md:text-4xl">
            Molatik Gizlilik Politikası
          </h1>

          <div className="space-y-6 text-base leading-relaxed text-gray-600 dark:text-gray-400">
            <p className="text-sm font-bold text-gray-500 dark:text-gray-500">
              Son güncelleme: 2026
            </p>

            <p>
              Molatik uygulaması, kullanıcı deneyimini geliştirmek ve uygulama işlevlerini sağlamak amacıyla sınırlı kişisel veri toplayabilir ve işler.
            </p>

            <div>
              <h2 className="mb-2 font-bold text-gray-900 dark:text-white">Toplanan Veriler:</h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>Giriş işlemleri için e-posta adresi veya kullanıcı bilgileri</li>
                <li>Uygulama kullanım verileri (mola süreleri, zaman takibi, kullanım istatistikleri)</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-2 font-bold text-gray-900 dark:text-white">Veri Kullanımı:</h2>
              <p>Toplanan veriler aşağıdaki amaçlarla kullanılır:</p>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>Uygulama işlevlerini sağlamak ve sürdürmek</li>
                <li>Kullanıcı deneyimini geliştirmek</li>
                <li>Sistem performansını izlemek ve iyileştirmek</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-2 font-bold text-gray-900 dark:text-white">Veri Paylaşımı:</h2>
              <p>
                Molatik, kullanıcı verilerini üçüncü taraflarla satmaz veya ticari amaçla paylaşmaz.
              </p>
              <p className="mt-3">
                Ancak, uygulamanın çalışması için gerekli olan altyapı hizmet sağlayıcılarıyla (örneğin barındırma ve veri depolama hizmetleri) sınırlı veri paylaşımı yapılabilir.
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-bold text-gray-900 dark:text-white">Veri Saklama:</h2>
              <p>
                Kullanıcı verileri yalnızca gerekli olduğu süre boyunca saklanır ve ardından silinir veya anonim hale getirilir.
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-bold text-gray-900 dark:text-white">Veri Güvenliği:</h2>
              <p>
                Kullanıcı verileri güvenli sunucularda saklanır ve yetkisiz erişime karşı korunur.
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-bold text-gray-900 dark:text-white">Kullanıcı Hakları:</h2>
              <p>Kullanıcılar:</p>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>Verilerine erişim talep edebilir</li>
                <li>Verilerinin silinmesini isteyebilir</li>
              </ul>
              <p className="mt-3">
                Bu talepler için aşağıdaki iletişim adresi kullanılabilir.
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-bold text-gray-900 dark:text-white">Çocukların Gizliliği:</h2>
              <p>
                Molatik, 13 yaş altındaki çocuklara yönelik bir uygulama değildir ve bilerek çocuklardan veri toplamaz.
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-bold text-gray-900 dark:text-white">Politika Değişiklikleri:</h2>
              <p>
                Bu gizlilik politikası zaman zaman güncellenebilir. Güncellemeler bu sayfa üzerinden duyurulur.
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-bold text-gray-900 dark:text-white">İletişim:</h2>
              <a
                href="mailto:support@traxleapp.com"
                className="font-bold text-purple-600 transition-colors hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
              >
                support@traxleapp.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
