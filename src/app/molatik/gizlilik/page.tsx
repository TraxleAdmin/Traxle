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
            <p>
              Molatik uygulaması, kullanıcı deneyimini geliştirmek amacıyla sınırlı veriler toplayabilir.
            </p>

            <div>
              <h2 className="mb-2 font-bold text-gray-900 dark:text-white">Toplanan Veriler:</h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>Giriş işlemleri için e-posta veya kullanıcı bilgileri</li>
                <li>Uygulama içi kullanım verileri (mola süreleri, zaman takibi)</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-2 font-bold text-gray-900 dark:text-white">Veri Kullanımı:</h2>
              <p>
                Toplanan veriler yalnızca uygulama işlevselliğini sağlamak ve kullanıcı deneyimini geliştirmek amacıyla kullanılır.
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-bold text-gray-900 dark:text-white">Veri Paylaşımı:</h2>
              <p>Molatik, kullanıcı verilerini üçüncü taraflarla paylaşmaz.</p>
            </div>

            <div>
              <h2 className="mb-2 font-bold text-gray-900 dark:text-white">Veri Güvenliği:</h2>
              <p>
                Kullanıcı verileri güvenli altyapılarda saklanır ve yetkisiz erişimlere karşı korunur.
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-bold text-gray-900 dark:text-white">Kullanıcı Hakları:</h2>
              <p>Kullanıcılar, verilerinin silinmesini talep edebilir.</p>
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

            <p className="border-t border-gray-100 pt-6 text-sm font-medium text-gray-500 dark:border-white/5 dark:text-gray-500">
              Bu politika gerektiğinde güncellenebilir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
