import React from 'react';
import { 
  FiCpu, 
  FiMapPin, 
  FiSmartphone, 
  FiPieChart, 
  FiShield, 
  FiFileText,
  FiZap,
  FiCreditCard,
  FiActivity,
  FiBarChart2
} from 'react-icons/fi';
import TextShimmer from '@/components/ui/TextShimmer';
import UnifiedCard from '@/components/ui/UnifiedCard'; // ✨ UnifiedCard Eklendi

export const metadata = {
  title: 'Özellikler | Traxle',
  description: 'Yapay zeka destekli yük eşleştirme, canlı takip ve güvenli ödeme sistemleri.',
};

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen bg-[#050814] text-white py-24 sm:py-32 overflow-hidden selection:bg-blue-500/30">
      
      {/* --- Arka Plan Efektleri (Soft & Deep) --- */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        
        {/* --- BAŞLIK --- */}
        <div className="mx-auto max-w-3xl lg:text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-blue-900/30 text-blue-400 text-xs font-bold tracking-wider uppercase border border-blue-500/20 backdrop-blur-md">
             🚀 Neden Traxle?
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6">
            Operasyonlarınızı <br className="hidden md:block" />
            {/* ✨ SOFT RENK GEÇİŞİ EFEKTİ ✨ */}
            <TextShimmer className="inline-block">Otopilota Alın</TextShimmer>
          </h2>
          
          <p className="mt-6 text-lg leading-relaxed text-gray-400 max-w-2xl mx-auto">
            Geleneksel lojistik yöntemleri yavaş, maliyetli ve takibi zordur. 
            Traxle'ın uçtan uca dijital çözümleriyle verimliliğinizi %35 artırın, maliyetlerinizi düşürün.
          </p>
        </div>

        {/* --- ÖZELLİK KARTLARI (UnifiedCard ile Güncellendi) --- */}
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[260px]">
              
              {/* KART 1: Akıllı Eşleştirme */}
              <UnifiedCard 
                className="md:col-span-2"
                title="Akıllı Eşleştirme"
                description="Yük detaylarınıza (ağırlık, hacim, rota) göre en uygun aracı ve sürücüyü saniyeler içinde bulur. Boş dönüşleri minimize eder."
                icon={<FiCpu />}
                color="from-blue-400 to-cyan-300" // SOFT RENK
              >
                  <div className="absolute bottom-0 left-0 right-0 h-24 opacity-30 dark:opacity-20 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 1440 320" fill="none" preserveAspectRatio="none">
                      <path fill="url(#blue-grad)" fillOpacity="0.3" d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                      <defs><linearGradient id="blue-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#60A5FA" /><stop offset="100%" stopColor="#22D3EE" /></linearGradient></defs>
                    </svg>
                  </div>
              </UnifiedCard>

              {/* KART 2: Canlı Takip */}
              <UnifiedCard 
                title="Canlı Takip & Paylaşım"
                description="Yükünüzün konumunu harita üzerinde 7/24 izleyin. Müşterinizle 'Canlı Takip Linkini' tek tıkla paylaşın."
                icon={<FiMapPin />}
                color="from-cyan-400 to-blue-300" // SOFT RENK
                delay={0.1}
              />

              {/* KART 3: Güvenli Ödeme */}
              <UnifiedCard 
                title="Güvenli Ödeme (iyzico)"
                description="Ödemeleriniz BDDK lisanslı altyapı ile güvende. Teslimat onaylanmadan para transferi gerçekleşmez."
                icon={<FiShield />}
                color="from-emerald-400 to-teal-300" // SOFT RENK
                delay={0.2}
              />

              {/* KART 4: Mobil Uygulama */}
              <UnifiedCard 
                className="md:col-span-2"
                title="Sürücü Mobil Uygulaması"
                description="Sürücüler iş atamalarını cepten görür, navigasyonla rotaya gider ve teslimat kanıtı (POD) fotoğrafını anında yükler."
                icon={<FiSmartphone />}
                color="from-purple-400 to-indigo-300" // SOFT RENK
                delay={0.3}
              >
                  <div className="absolute right-6 bottom-4 hidden md:block opacity-30 dark:opacity-20 transform rotate-12">
                     <FiSmartphone className="text-8xl text-purple-400" />
                  </div>
              </UnifiedCard>

              {/* KART 5: Dijital Evrak */}
              <UnifiedCard 
                title="Dijital Evrak Yönetimi"
                description="İrsaliye, fatura ve teslim tutanakları dijital ortamda saklanır. Kağıt israfı biter."
                icon={<FiFileText />}
                color="from-amber-400 to-orange-300" // SOFT RENK
                delay={0.4}
              />

              {/* KART 6: Operasyonel Analitik */}
              <UnifiedCard 
                className="md:col-span-3"
                title="Operasyonel Analitik"
                description="Hangi rota daha kârlı? Teslimat süreleriniz ne durumda? Veriye dayalı raporlarla lojistik sürecinizi optimize edin."
                icon={<FiPieChart />}
                color="from-pink-400 to-rose-300" // SOFT RENK
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
    </div>
  );
}