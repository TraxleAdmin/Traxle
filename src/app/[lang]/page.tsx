import { notFound } from "next/navigation";
import { LocalizedHome } from "@/components/localized/LocalizedPages";
import { LOCALES, Locale, isLocale } from "@/lib/i18n/routes";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <LocalizedHome locale={lang as Locale} />;
}
