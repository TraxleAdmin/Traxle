"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { LOCALE_META, detectLocale } from "@/lib/i18n/routes";

export default function LocaleDocumentSync() {
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    const locale = detectLocale(pathname);
    const meta = LOCALE_META[locale];
    document.documentElement.lang = locale;
    document.documentElement.dir = meta.dir;
  }, [pathname]);

  return null;
}
