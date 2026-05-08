import { Cable, DatabaseZap, RadioTower, Workflow } from 'lucide-react';
import StaticShowcasePage from '@/components/relaunch/StaticShowcasePage';

export const metadata = { title: 'Entegrasyonlar | Traxle', description: 'Traxle ürünleri için veri ve operasyon entegrasyonları.' };

export default function IntegrationsPage() {
  return (
    <StaticShowcasePage
      eyebrow="Integration layer"
      title="Operasyon verisi tek dilde konuşsun."
      description="Traxle ürünleri stok, personel, belge ve saha verisini daha temiz bir akışa almak için API, rapor ve senkronizasyon katmanlarıyla tasarlanır."
      ctaLabel="Entegrasyon görüşmesi"
      ctaHref="/tr/iletisim"
      items={[
        { title: 'Barkod ve stok aktarımı', description: 'Ürün kartları, fiyat değişimleri ve stok kayıtları daha düzenli okunur.', icon: <DatabaseZap size={20} />, accent: '#22d3ee' },
        { title: 'Personel zaman verisi', description: 'Molatik ile mola, vardiya ve günlük durum kayıtları rapora hazır hale gelir.', icon: <RadioTower size={20} />, accent: '#34d399' },
        { title: 'Belge işleme hattı', description: 'KünyeX belge verisini ürün alanlarına dönüştürecek akışlar için konumlanır.', icon: <Workflow size={20} />, accent: '#f59e0b' },
        { title: 'API uyarlama', description: 'İhtiyaç olduğunda mevcut iş yazılımlarına bağlanan daha özel entegrasyonlar planlanır.', icon: <Cable size={20} />, accent: '#60a5fa' },
      ]}
    />
  );
}
