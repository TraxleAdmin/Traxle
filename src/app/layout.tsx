import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import CookieBanner from "@/components/CookieBanner";
import MaintenanceGuard from "@/components/MaintenanceGuard";
import { Providers } from "./providers";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import Scene from "@/components/canvas/Scene";
import { TransitionProvider } from "@/components/animations/TransitionManager";
import { defaultLocale, isLocale } from "@/lib/i18n";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Traxle | Premium Engineering Ecosystem",
  description: "Mobil ve masaüstü yazılım ürünleri geliştiren üst düzey teknoloji ekosistemi.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const localeHeader = headersList.get("x-traxle-locale") ?? defaultLocale;
  const locale = isLocale(localeHeader) ? localeHeader : defaultLocale;
  const dir = headersList.get("x-traxle-dir") === "rtl" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${inter.className} bg-white text-slate-950 transition-colors duration-500 dark:bg-black dark:text-white`}>
        <Providers>
          <MaintenanceGuard>
            <TransitionProvider>
              <SmoothScroll>
                <Scene />
                <div className="relative z-10">
                  <SplashScreen />
                  <Navbar />
                  <main className="min-h-screen">
                    <PageTransition>{children}</PageTransition>
                  </main>
                  <Footer />
                  <CookieBanner />
                </div>
              </SmoothScroll>
            </TransitionProvider>
          </MaintenanceGuard>
        </Providers>
      </body>
    </html>
  );
}
