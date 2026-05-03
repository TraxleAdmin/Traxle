'use client';

import { useEffect } from 'react';
import { getDictionary, type Locale } from '@/lib/i18n';

export default function DocumentLocaleSync({ locale }: { locale: Locale }) {
  useEffect(() => {
    const dictionary = getDictionary(locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = dictionary.dir;
  }, [locale]);

  return null;
}
