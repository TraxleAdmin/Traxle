import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import CookieBanner from "@/components/CookieBanner";
import MaintenanceGuard from "@/components/MaintenanceGuard";
import { Providers } from "./providers";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  adjustFontFallback: false
});

export const metadata: Metadata = {
  title: "Traxle | Teknoloji Ekosistemi", // 🔥 GÜNCELLENDİ
  description: "Lojistik, dijital kimlik ve personel yönetimi çözümleri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 dark:bg-[#050814] text-gray-900 dark:text-white`}>
        <Providers>
          <MaintenanceGuard>
            <SmoothScroll>
              <SplashScreen />
              <Navbar />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
              <CookieBanner />
            </SmoothScroll>
          </MaintenanceGuard>
        </Providers>
      </body>
    </html>
  );
}