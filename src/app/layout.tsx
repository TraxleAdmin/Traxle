import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import CookieBanner from "@/components/CookieBanner";
import MaintenanceGuard from "@/components/MaintenanceGuard";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Traxle | Ağır Operasyonlar İçin Dijital İşletim Sistemi",
  description: "Traxle; lojistik, iş makinesi, saha doğrulama, ödeme akışları ve kurumsal otomasyon için tasarlanan yeni nesil teknoloji ekosistemidir.",
  keywords: ["Traxle", "lojistik", "iş makinesi", "yük platformu", "KünyeX", "Molatik", "B2B SaaS"],
  metadataBase: new URL("https://traxleapp.com"),
  openGraph: {
    title: "Traxle | Operation OS",
    description: "Ağır operasyonlar, lojistik ve saha doğrulama için premium dijital altyapı.",
    url: "https://traxleapp.com",
    siteName: "Traxle",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#05070d] text-white`}>
        <Providers>
          <MaintenanceGuard>
            <SplashScreen />
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <CookieBanner />
          </MaintenanceGuard>
        </Providers>
      </body>
    </html>
  );
}
