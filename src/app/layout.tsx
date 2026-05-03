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
import PageTransition from "@/components/PageTransition";
import Scene from "@/components/canvas/Scene";
import { TransitionProvider } from "@/components/animations/TransitionManager";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  adjustFontFallback: false
});

export const metadata: Metadata = {
  title: "Traxle | Premium Engineering Ecosystem",
  description: "Mobil ve masaüstü yazılım ürünleri geliştiren üst düzey teknoloji ekosistemi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white transition-colors duration-500`}>
        <Providers>
          <MaintenanceGuard>
            <TransitionProvider>
              <SmoothScroll>
                <Scene />
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
            </TransitionProvider>
          </MaintenanceGuard>
        </Providers>
      </body>
    </html>
  );
}
