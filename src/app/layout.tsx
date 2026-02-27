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
  display: 'swap',
  adjustFontFallback: false
});

export const metadata: Metadata = {
  title: "Traxle | İş Makinesi Kiralama Platformu",
  description: "Türkiye'nin dijital B2B iş makinesi, şantiye ve filo yönetim platformu.",
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