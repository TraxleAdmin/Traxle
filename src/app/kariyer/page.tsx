import { BriefcaseBusiness, Code2, Coffee, UsersRound } from 'lucide-react';
import StaticShowcasePage from '@/components/relaunch/StaticShowcasePage';

export const metadata = { title: 'Kariyer | Traxle', description: 'Traxle ekibine katılma ve çalışma kültürü.' };

export default function CareerPage() {
  return (
    <StaticShowcasePage
      eyebrow="Talent channel"
      title="Operasyon yazılımı seven insanlarla büyüyoruz."
      description="Traxle; ürün, tasarım ve mühendisliği aynı masada düşünen; hızlı ama temiz üretimi seven insanlarla çalışmak ister."
      ctaLabel="Başvuru için yaz"
      ctaHref="mailto:contact@traxleapp.com?subject=Traxle%20Kariyer"
      items={[
        { title: 'Ürün odağı', description: 'Her rol gerçek kullanıcı akışlarını daha sade ve güçlü hale getirmeye çalışır.', icon: <BriefcaseBusiness size={20} />, accent: '#22d3ee' },
        { title: 'Modern mühendislik', description: 'Next.js, Firebase, API ve mobil iş akışları üzerinde üretim yapılır.', icon: <Code2 size={20} />, accent: '#34d399' },
        { title: 'Küçük ekip, net sahiplik', description: 'Kararlar hızlı alınır; işi sahiplenen kişi ürünü doğrudan etkiler.', icon: <UsersRound size={20} />, accent: '#f59e0b' },
        { title: 'Sakin ama iddialı ritim', description: 'Gösterişten çok çalışan, ölçülen ve müşteriye dokunan ürünler önemlidir.', icon: <Coffee size={20} />, accent: '#60a5fa' },
      ]}
    />
  );
}
