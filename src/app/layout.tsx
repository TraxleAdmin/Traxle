import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import CookieBanner from "@/components/CookieBanner";
import MaintenanceGuard from "@/components/MaintenanceGuard";
import LocaleDocumentSync from "@/components/LocaleDocumentSync";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Traxle | Operations Technology Ecosystem",
  description:
    "Traxle brings digital identity, workforce and logistics operations into one enterprise platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 text-gray-900 dark:bg-[#050814] dark:text-white`}>
        <Providers>
          <LocaleDocumentSync />
          <MaintenanceGuard>
            <SplashScreen />
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <CookieBanner />
          </MaintenanceGuard>
        </Providers>
      </body>
    </html>
  );
}
