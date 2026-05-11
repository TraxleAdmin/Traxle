import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import CookieBanner from "@/components/CookieBanner";
import GlobalMotionBackdrop from "@/components/GlobalMotionBackdrop";
import MaintenanceGuard from "@/components/MaintenanceGuard";
import LocaleDocumentSync from "@/components/LocaleDocumentSync";
import { Providers } from "./providers";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
  display: "swap",
  adjustFontFallback: true,
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
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-gray-50 text-gray-900 dark:bg-[#050814] dark:text-white`}
      >
        <GlobalMotionBackdrop />
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
