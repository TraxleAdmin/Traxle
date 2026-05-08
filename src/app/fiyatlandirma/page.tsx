import { BadgeCheck, Building2, CreditCard, Sparkles } from 'lucide-react';
import StaticShowcasePage from '@/components/relaunch/StaticShowcasePage';

export const metadata = { title: 'Fiyatlandırma | Traxle', description: 'Traxle ürün ailesi için demo ve teklif akışı.' };

export default function PricingPage() {
  return (
    <StaticShowcasePage
      eyebrow="Pricing desk"
      title="Paket değil, doğru ürün katmanı."
      description="Traxle fiyatlandırması BarkodX, Molatik, KünyeX ve lojistik akışının işletmedeki kullanım şekline göre netleştirilir. Önce ihtiyacı okur, sonra sade bir ürün planı çıkarırız."
      ctaLabel="Demo ve teklif al"
      ctaHref="/tr/iletisim"
      items={[
        { title: 'Ürün bazlı kurulum', description: 'Tek ürünle başlayıp operasyon büyüdükçe ekosisteme yeni katmanlar ekleyebilirsin.', icon: <Sparkles size={20} />, accent: '#22d3ee' },
        { title: 'Kurumsal değerlendirme', description: 'Şube, depo, personel ve saha akışına göre daha net kullanım planı hazırlanır.', icon: <Building2 size={20} />, accent: '#34d399' },
        { title: 'Net ödeme akışı', description: 'Ödeme ve abonelik adımları panel ve ürün ihtiyacına göre yalın tutulur.', icon: <CreditCard size={20} />, accent: '#f59e0b' },
        { title: 'Sürdürülebilir destek', description: 'Ürün kullanıma alındıktan sonra güncelleme ve destek ritmi aynı standartta devam eder.', icon: <BadgeCheck size={20} />, accent: '#60a5fa' },
      ]}
    />
  );
}
