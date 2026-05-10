"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiSettings, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { CONTENT } from "@/lib/i18n/content";
import { detectLocale, localizedPath } from "@/lib/i18n/routes";

type CookiePreferences = {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "traxle_cookie_consent_v2";

const COOKIE_TEXT = {
  tr: {
    title: "Cerez Tercihleri",
    body: "Deneyimi iyilestirmek ve guvenligi korumak icin cerez kullaniyoruz.",
    settings: "Ayarlar",
    accept: "Kabul Et",
    reject: "Tumunu Reddet",
    save: "Secimi Kaydet",
    linkPrefix: "Detaylar icin",
  },
  en: {
    title: "Cookie Preferences",
    body: "We use cookies to improve your experience and keep services secure.",
    settings: "Settings",
    accept: "Accept All",
    reject: "Reject All",
    save: "Save Selection",
    linkPrefix: "For details see",
  },
  de: {
    title: "Cookie-Einstellungen",
    body: "Wir verwenden Cookies fur ein besseres Erlebnis und sichere Dienste.",
    settings: "Einstellungen",
    accept: "Alle akzeptieren",
    reject: "Alle ablehnen",
    save: "Auswahl speichern",
    linkPrefix: "Details unter",
  },
  ru: {
    title: "Nastroyki cookie",
    body: "My ispolzuem cookie dlya uluchsheniya raboty i bezopasnosti servisa.",
    settings: "Nastroyki",
    accept: "Prinyat vse",
    reject: "Otklonit vse",
    save: "Sohranit vybor",
    linkPrefix: "Podrobnee v",
  },
  ar: {
    title: "Iidadat cookie",
    body: "Nastakhdim cookie litahsin al-khidma wa al-amn.",
    settings: "Iidadat",
    accept: "Qabul al-kull",
    reject: "Rafd al-kull",
    save: "Hifz al-ikhtiyar",
    linkPrefix: "Liltfasil zour",
  },
} as const;

export default function CookieBanner() {
  const pathname = usePathname() ?? "/";
  const locale = detectLocale(pathname);
  const text = COOKIE_TEXT[locale];

  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      const timer = window.setTimeout(() => setOpen(true), 1200);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const save = (next: CookiePreferences) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setPreferences(next);
    setOpen(false);
    setShowSettings(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed inset-x-4 bottom-4 z-[9990] mx-auto w-full max-w-5xl"
          >
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl dark:border-white/10 dark:bg-[#0f172a]">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">{text.title}</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {text.body} {text.linkPrefix}{" "}
                    <Link href={localizedPath("cookies", locale)} className="font-semibold text-blue-600 hover:underline">
                      {CONTENT[locale].pages.cookies.title}
                    </Link>
                    .
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowSettings(true)}
                    className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-white/10 dark:text-gray-200 dark:hover:bg-white/10"
                  >
                    {text.settings}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      save({
                        necessary: true,
                        functional: true,
                        analytics: true,
                        marketing: true,
                      })
                    }
                    className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    {text.accept}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {showSettings && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60"
                onClick={() => setShowSettings(false)}
              />

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#0f172a]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    <span className="inline-flex items-center gap-2">
                      <FiSettings />
                      {text.title}
                    </span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => setShowSettings(false)}
                    className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
                    aria-label="Close"
                  >
                    <FiX />
                  </button>
                </div>

                <div className="space-y-4">
                  <CookieRow label="Necessary" checked disabled />
                  <CookieRow
                    label="Functional"
                    checked={preferences.functional}
                    onToggle={() =>
                      setPreferences((prev) => ({ ...prev, functional: !prev.functional }))
                    }
                  />
                  <CookieRow
                    label="Analytics"
                    checked={preferences.analytics}
                    onToggle={() =>
                      setPreferences((prev) => ({ ...prev, analytics: !prev.analytics }))
                    }
                  />
                  <CookieRow
                    label="Marketing"
                    checked={preferences.marketing}
                    onToggle={() =>
                      setPreferences((prev) => ({ ...prev, marketing: !prev.marketing }))
                    }
                  />
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      save({
                        necessary: true,
                        functional: false,
                        analytics: false,
                        marketing: false,
                      })
                    }
                    className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-white/10 dark:text-gray-200 dark:hover:bg-white/10"
                  >
                    {text.reject}
                  </button>
                  <button
                    type="button"
                    onClick={() => save(preferences)}
                    className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    {text.save}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}

function CookieRow({
  label,
  checked,
  onToggle,
  disabled,
}: {
  label: string;
  checked: boolean;
  onToggle?: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 dark:border-white/10">
      <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{label}</span>
      <button
        type="button"
        onClick={onToggle}
        disabled={disabled}
        className={`relative h-6 w-11 rounded-full transition ${
          checked ? "bg-blue-600" : "bg-gray-300 dark:bg-white/15"
        } ${disabled ? "opacity-50" : ""}`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}
