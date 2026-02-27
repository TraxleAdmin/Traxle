'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  FiCpu, FiLock, FiZap, FiActivity, FiCreditCard, FiBarChart2,
  FiArrowRight, FiGlobe, FiCode, FiMapPin, FiShield,
  FiSmartphone, FiFileText, FiPieChart, FiTool
} from 'react-icons/fi';

import Stats from '@/components/Stats';
import DownloadButtons from '@/components/DownloadButtons';
import InteractivePhone from '@/components/InteractivePhone';
import EmbeddedPhone from '@/components/EmbeddedPhone';
import ScreenMap from '@/components/screens/ScreenMap';
import ScreenWallet from '@/components/screens/ScreenWallet';
import NasilCalisir from '@/components/NasilCalisir';
import SSS from '@/components/SSS';
import UnifiedCard from '@/components/ui/UnifiedCard';
import TextShimmer from '@/components/ui/TextShimmer';

function ScrollSection({ children, onViewportEnter, color }: { children: React.ReactNode, onViewportEnter: () => void, color: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const borderColor = useTransform(scrollYProgress, [0, 1], ["rgba(255, 255, 255, 0.05)", color]);

  return (
    <motion.div
      ref={ref}
      onViewportEnter={onViewportEnter}
      viewport={{ margin: "-45% 0px -45% 0px" }}
      style={{ borderLeftColor: borderColor }}
      className="min-h-[90vh] flex flex-col justify-center pl-6 border-l-4 transition-colors duration-300"
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [phoneTab, setPhoneTab] = useState('home');

  return (
    <div className="flex flex-col gap-0 min-h-screen transition-colors duration-500 bg-gray-50 dark:bg-[#050814] text-gray-900 dark:text-white selection:bg-blue-400 selection:text-white">

      {/* 1. HERO ALANI */}
      <div className="hidden lg:block relative w-full pt-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
            <div className="pt-20 pb-40">
              <motion.div
                onViewportEnter={() => setPhoneTab('home')}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                className="min-h-[90vh] flex flex-col justify-center space-y-8"
              >
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                  İş Makinenizi <br />
                  <TextShimmer>Güvenle</TextShimmer> Kiralayın.
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg">
                  Traxle; kurumsal tedarikçileri ve şantiyeleri yapay zeka destekli, %100 dijital ve güvenli tek bir işletim sisteminde buluşturur.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4"><DownloadButtons /></div>
              </motion.div>

              <ScrollSection onViewportEnter={() => setPhoneTab('map')} color="#60A5FA">
                <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="space-y-6">
                  <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center text-3xl border border-blue-100 dark:border-blue-500/20 shadow-lg shadow-blue-500/10">📄</div>
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Dijital Sözleşme <br />ve KYC Onayı</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">Kimliği doğrulanmamış (KYC) hiçbir tedarikçi platformda yer alamaz. Tüm kiralama süreçleri hukuki dijital sözleşmelerle anında güvence altına alınır.</p>
                </motion.div>
              </ScrollSection>

              <ScrollSection onViewportEnter={() => setPhoneTab('wallet')} color="#34D399">
                <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="space-y-6">
                  <div className="w-16 h-16 bg-green-50 dark:bg-green-500/10 rounded-2xl flex items-center justify-center text-3xl border border-green-100 dark:border-green-500/20 shadow-lg shadow-green-500/10">💸</div>
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Havuz Sistemiyle <br />Güvenli Ödeme</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">Kiralama bedeli güvenli ödeme altyapısıyla havuzda tutulur. Makine şantiyeye sorunsuz teslim edildiğinde para tedarikçinin cüzdanına geçer. Risk sıfır.</p>
                </motion.div>
              </ScrollSection>
            </div>

            <div className="sticky top-0 h-screen flex items-center justify-center py-10">
              <div className="relative w-full max-w-md scale-90 xl:scale-100 transition-transform">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-[120px] -z-10 animate-pulse-slow pointer-events-none"></div>
                <InteractivePhone activeTab={phoneTab} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBİL GÖRÜNÜM */}
      <div className="block lg:hidden px-6 pb-20 pt-28 space-y-24">
        <section>
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">İş Makinenizi <br /><TextShimmer>Güvenle</TextShimmer> Kiralayın.</h1>
          <DownloadButtons />
        </section>
        <section><h2 className="text-3xl font-bold mb-4 dark:text-white">Dijital Sözleşme</h2><EmbeddedPhone><ScreenMap /></EmbeddedPhone></section>
        <section><h2 className="text-3xl font-bold mb-4 dark:text-white">Güvenli Ödeme</h2><EmbeddedPhone><ScreenWallet /></EmbeddedPhone></section>
      </div>

      <Stats />

      {/* 4. ÖZELLİKLER */}
      <div id="ozellikler" className="bg-gray-50 dark:bg-[#050814] py-24 px-6 relative overflow-hidden transition-colors duration-500">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.03] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto space-y-12 relative z-10">
          <div className="text-center space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-block px-3 py-1 mb-4 border rounded-full text-xs font-semibold backdrop-blur-md border-blue-400/30 bg-blue-400/10 text-blue-500 dark:text-blue-300">
              🚀 Neden Traxle?
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">Ağır Vasıtalar İçin <br /> Akıllı Çözümler</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">Evrak karmaşasını ve tahsilat risklerini bitiren, B2B iş makinesi kiralama altyapısı.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[260px]">

            <UnifiedCard
              className="md:col-span-2"
              title="Gelişmiş Filtreleme & Eşleştirme"
              description="İhtiyacınız olan ekskavatör, vinç veya loderi tonajına, model yılına ve ataşmanlarına göre saniyeler içinde bulun."
              icon={<FiTool />}
              color="from-blue-400 to-cyan-300"
            >
              <div className="absolute bottom-0 left-0 right-0 h-24 opacity-30 dark:opacity-20 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 1440 320" fill="none" preserveAspectRatio="none">
                  <path fill="url(#blue-grad)" fillOpacity="0.3" d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                  <defs><linearGradient id="blue-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#60A5FA" /><stop offset="100%" stopColor="#22D3EE" /></linearGradient></defs>
                </svg>
              </div>
            </UnifiedCard>

            <UnifiedCard
              title="Saha Teslimat Formları"
              description="Makinenin şantiyeye geliş ve çıkış anındaki durumu mobil uygulama üzerinden fotoğraflı tutanakla kayıt altına alınır."
              icon={<FiFileText />}
              color="from-cyan-400 to-blue-300"
              delay={0.1}
            />

            <UnifiedCard
              title="Güvenli Ödeme (Escrow)"
              description="Ödemeleriniz BDDK lisanslı altyapı ile havuzda tutulur. Operasyon onaylanmadan para aktarılmaz."
              icon={<FiShield />}
              color="from-emerald-400 to-teal-300"
              delay={0.2}
            />

            <UnifiedCard
              className="md:col-span-2"
              title="Tedarikçi ve Müşteri Uygulaması"
              description="Makine sahipleri filolarını, şantiye şefleri ise kiraladıkları araçları tek bir mobil uygulamadan yönetir."
              icon={<FiSmartphone />}
              color="from-purple-400 to-indigo-300"
              delay={0.3}
            >
              <div className="absolute right-6 bottom-4 hidden md:block opacity-30 dark:opacity-20 transform rotate-12">
                <FiSmartphone className="text-8xl text-purple-400" />
              </div>
            </UnifiedCard>

            <UnifiedCard
              title="Dijital Takip"
              description="Harita ve statü güncellemeleri sayesinde makinenizin nerede olduğunu her an bilin."
              icon={<FiMapPin />}
              color="from-amber-400 to-orange-300"
              delay={0.4}
            />

            <UnifiedCard
              className="md:col-span-3"
              title="Filo ve Gelir Yönetimi"
              description="Makine parkınızdaki hangi aracın daha çok kazandırdığını, bakım sürelerini ve finansal akışınızı detaylı panelle izleyin."
              icon={<FiPieChart />}
              color="from-pink-400 to-rose-300"
              delay={0.5}
            >
              <div className="absolute top-1/2 right-12 -translate-y-1/2 hidden md:block">
                <div className="px-4 py-1.5 bg-white dark:bg-white/5 border border-pink-400/30 rounded-lg text-pink-500 dark:text-pink-300 text-xs font-bold animate-pulse shadow-sm">
                  🚀 Veriye Dayalı Karar
                </div>
              </div>
            </UnifiedCard>

          </div>
        </div>
      </div>

      <section id="nasil-calisir"><NasilCalisir /></section>
      <SSS />

      {/* 7. ALT CTA */}
      <section className="container mx-auto px-6 mb-24 relative z-10 mt-32">
        <div className="max-w-5xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>

            <div className="relative rounded-[2.5rem] bg-gray-50 dark:bg-[#080c14] overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05] animate-grid-move"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/5 to-transparent h-[200%] w-full animate-scanline pointer-events-none"></div>
              </div>

              <div className="relative z-10 p-12 md:p-20 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-400/10 border border-blue-400/20 text-blue-500 dark:text-blue-300 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                  Traxle OS
                </motion.div>

                <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-gray-900 dark:text-white mb-8 leading-[0.9]">
                  İnşaatın <br />
                  <TextShimmer>Geleceğine Katılın.</TextShimmer>
                </h2>

                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                  Sadece bir kiralama platformu değil, saha operasyonunuzun dijital beyni.
                </p>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                  <div className="flex justify-center scale-110 md:scale-125">
                    <DownloadButtons />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}