import React from 'react';
import { FiCpu, FiMapPin, FiSmartphone, FiPieChart, FiShield, FiFileText, FiZap, FiGlobe, FiBarChart2 } from 'react-icons/fi';
import TextShimmer from '@/components/ui/TextShimmer';
import UnifiedCard from '@/components/ui/UnifiedCard';

export const metadata = { title: 'Özellikler | Traxle', description: 'Yapay zeka destekli eşleştirme ve güvenli ödeme sistemleri.' };

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen bg-[#050814] text-white py-24 sm:py-32 overflow-hidden selection:bg-blue-500/30">

      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">

        <div className="mx-auto max-w-3xl lg:text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-blue-900/30 text-blue-400 text-xs font-bold tracking-wider uppercase border border-blue-500/20 backdrop-blur-md">
            🚀 Neden Traxle?
          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6">
            Saha Operasyonlarını <br className="hidden md:block" />
            <TextShimmer className="inline-block">Otopilota Alın</TextShimmer>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-gray-400 max-w-2xl mx-auto">
            Geleneksel kiralama yöntemleri yavaş, maliyetli ve tahsilat riski barındırır.
            Traxle'ın uçtan uca dijital çözümleriyle verimliliğinizi %35 artırın.
          </p>
        </div>

        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[260px]">

            <UnifiedCard className="md:col-span-2" title="Akıllı Eşleştirme" description="Proje detaylarınıza (tonaj, model, ataşman) göre en uygun makineyi ve tedarikçiyi saniyeler içinde bulur." icon={<FiCpu />} color="from-blue-400 to-cyan-300" />
            <UnifiedCard title="Canlı Takip & Paylaşım" description="Makinenizin konumunu harita üzerinde 7/24 izleyin." icon={<FiMapPin />} color="from-cyan-400 to-blue-300" delay={0.1} />
            <UnifiedCard title="Güvenli Havuz (Escrow)" description="Ödemeleriniz BDDK lisanslı altyapı ile güvende. Teslimat onaylanmadan para transferi gerçekleşmez." icon={<FiShield />} color="from-emerald-400 to-teal-300" delay={0.2} />
            <UnifiedCard className="md:col-span-2" title="Şantiye & Tedarikçi Uygulaması" description="Şantiye şefleri ve operatörler iş atamalarını cepten görür, teslimat kanıtı (Tutanak) fotoğrafını anında yükler." icon={<FiSmartphone />} color="from-purple-400 to-indigo-300" delay={0.3} />
            <UnifiedCard title="Dijital Evrak Yönetimi" description="Sözleşme ve teslim tutanakları dijital ortamda saklanır. Kağıt israfı biter." icon={<FiFileText />} color="from-amber-400 to-orange-300" delay={0.4} />
            <UnifiedCard className="md:col-span-3" title="Operasyonel Analitik" description="Hangi makine daha kârlı? Saha süreleriniz ne durumda? Veriye dayalı raporlarla sürecinizi optimize edin." icon={<FiPieChart />} color="from-pink-400 to-rose-300" delay={0.5} />

          </div>
        </div>
      </div>
    </div>
  );
}