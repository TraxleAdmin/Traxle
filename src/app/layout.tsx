import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// 👇 Navbar ve Footer'ı buraya import ediyoruz
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer"; 
import SplashScreen from "@/components/SplashScreen";
import CookieBanner from "@/components/CookieBanner"; // 🔥 EKLENDİ
import MaintenanceGuard from "@/components/MaintenanceGuard"; // 🔥 SİSTEM KALKANI EKLENDİ
import { Providers } from "./providers";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  adjustFontFallback: false 
});

export const metadata: Metadata = {
  title: "Traxle",
  description: "Lojistik Yönetim Platformu",
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
          {/* 🛡️ SİSTEM KALKANI: Site bakımdaysa altındaki hiçbir şeyi (Navbar, Footer vb.) göstermez, sadece bakım sayfasını basar. Panel rotalarını ise es geçer. */}
          <MaintenanceGuard>
            
            {/* 1. Splash Screen En Üstte */}
            <SplashScreen /> 
            
            {/* 2. Navbar: Tüm sayfalarda görünür (Panel hariç, kendi içinde engelli) */}
            <Navbar /> 
            
            {/* 3. Sayfa İçeriği (page.tsx'ler buraya gelir) */}
            <main className="min-h-screen">
              {children}
            </main> 

            {/* 4. Footer: En altta */}
            <Footer /> 

            {/* 5. Cookie Banner (Sayfanın Üstüne Biner) */}
            <CookieBanner />
            
          </MaintenanceGuard>
        </Providers>
      </body>
    </html>
  );
}