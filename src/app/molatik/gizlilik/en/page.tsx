import React from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiShield } from 'react-icons/fi';

export default function MolatikEnglishPrivacyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent px-4 py-28 text-gray-900 transition-colors duration-500 selection:bg-purple-500/30 dark:text-gray-300 md:py-32">
      <div className="absolute left-1/2 top-24 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-[110px] pointer-events-none dark:bg-purple-600/10" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <Link
          href="/molatik"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-purple-600 transition-colors hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
        >
          <FiArrowLeft /> Back to Molatik
        </Link>

        <div className="rounded-3xl border border-purple-100 bg-white/90 p-6 text-left shadow-sm backdrop-blur-xl dark:border-purple-500/10 dark:bg-[#080c14]/90 md:p-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-purple-600 dark:border-purple-500/20 dark:bg-purple-500/10 dark:text-purple-400">
            <FiShield /> Privacy Policy
          </div>

          <h1 className="mb-5 text-3xl font-black tracking-tight text-gray-900 dark:text-white md:text-4xl">
            Molatik Privacy Policy
          </h1>

          <div className="space-y-6 text-base leading-relaxed text-gray-600 dark:text-gray-400">
            <p className="text-sm font-bold text-gray-500 dark:text-gray-500">
              Last updated: 2026
            </p>

            <p>
              The Molatik application may collect and process limited personal data in order to improve the user experience and provide application functions.
            </p>

            <div>
              <h2 className="mb-2 font-bold text-gray-900 dark:text-white">Data Collected:</h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>Email address or user information for login processes</li>
                <li>Application usage data (break durations, time tracking, usage statistics)</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-2 font-bold text-gray-900 dark:text-white">Data Use:</h2>
              <p>Collected data is used for the following purposes:</p>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>Providing and maintaining application functions</li>
                <li>Improving the user experience</li>
                <li>Monitoring and improving system performance</li>
              </ul>
            </div>

            <div>
              <h2 className="mb-2 font-bold text-gray-900 dark:text-white">Data Sharing:</h2>
              <p>
                Molatik does not sell user data or share it with third parties for commercial purposes.
              </p>
              <p className="mt-3">
                However, limited data may be shared with infrastructure service providers required for the application to operate, such as hosting and data storage services.
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-bold text-gray-900 dark:text-white">Data Retention:</h2>
              <p>
                User data is retained only for as long as necessary and is then deleted or anonymized.
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-bold text-gray-900 dark:text-white">Data Security:</h2>
              <p>
                User data is stored on secure servers and protected against unauthorized access.
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-bold text-gray-900 dark:text-white">User Rights:</h2>
              <p>Users may:</p>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>Request access to their data</li>
                <li>Request deletion of their data</li>
              </ul>
              <p className="mt-3">
                The contact address below may be used for these requests.
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-bold text-gray-900 dark:text-white">Children's Privacy:</h2>
              <p>
                Molatik is not intended for children under the age of 13 and does not knowingly collect data from children.
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-bold text-gray-900 dark:text-white">Policy Changes:</h2>
              <p>
                This privacy policy may be updated from time to time. Updates will be announced on this page.
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-bold text-gray-900 dark:text-white">Contact:</h2>
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
