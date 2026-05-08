import { BarChart3, Boxes, ScanLine, ShieldCheck } from 'lucide-react';
import StaticShowcasePage from '@/components/relaunch/StaticShowcasePage';

export const metadata = { title: 'Özellikler | Traxle', description: 'Traxle operasyon ürünlerinin temel yetenekleri.' };

export default function FeaturesPage() {
  return (
    <StaticShowcasePage
      eyebrow="Capability map"
      title="Her ürün kartı gerçek bir operasyon akışını taşır."
      description="Traxle görünümü artık ürün odaklı: kartlar, durumlar, veri akışı ve demo aksiyonları bütün public sayfalarda aynı çizgide ilerler."
      items={[
        { title: 'Ürün kartları', description: 'BarkodX, Molatik, KünyeX ve Lojistik aynı sistemde taranabilir kartlara dönüştü.', icon: <Boxes size={20} />, accent: '#22d3ee' },
        { title: 'Canlı işlem dili', description: 'Tarama, vardiya, belge ve rota verileri ayrı ama uyumlu görsel sinyallerle anlatılır.', icon: <ScanLine size={20} />, accent: '#34d399' },
        { title: 'Karar panelleri', description: 'Sayfa yapısı metin ağırlığından çıkıp daha okunur metrik ve akış bloklarına taşındı.', icon: <BarChart3 size={20} />, accent: '#f59e0b' },
        { title: 'Güven katmanı', description: 'Yasal sayfalar ve ürün politikaları daha okunur, sade ve erişilebilir bir yüzeye oturur.', icon: <ShieldCheck size={20} />, accent: '#60a5fa' },
      ]}
    />
  );
}
