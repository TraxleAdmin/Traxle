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
import HeroScene from "@/components/canvas/HeroScene";
import PageTransition from "@/components/PageTransition";
import { Suspense } from "react";

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
      <body className={`${inter.className} bg-gray-50 dark:bg-[#050814] text-gray-900 dark:text-white transition-colors duration-500`}>
        <Providers>
          <MaintenanceGuard>
            <SmoothScroll>
              {/* Sitenin tamamı için global 3D arka plan */}
              <Suspense fallback={null}>
                <HeroScene />
              </Suspense>

              {/* İçeriğin 3D objelerin üzerinde (ama tıklanabilir) durması için relative ve z-10 */}
              <div className="relative z-10">
                <SplashScreen />
                <Navbar />
                <main className="min-h-screen">
                  <PageTransition>
                    {children}
                  </PageTransition>
                </main>
                <Footer />
                <CookieBanner />
              </div>
            </SmoothScroll>
          </MaintenanceGuard>
        </Providers>
      </body>
    </html>
  );
}