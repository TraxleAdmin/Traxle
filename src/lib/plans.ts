export type PlanType = 'free' | 'starter' | 'pro' | 'enterprise';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PlanConfig {
  id: PlanType;
  name: string;
  label: string;
  description: string;
  price: number;
  commissionRate: number;
  limits: {
    loadPost: number;
    offers: number;
  };
  logicFeatures: {
    verifiedBadge: boolean;
    proBadge: boolean;
    advancedAnalytics: boolean | 'basic' | 'advanced';
    prioritySupport: boolean;
    autoMatch: boolean;
    smsNotification: boolean;
    apiAccess: boolean;
  };
  displayFeatures: PlanFeature[];
  ui: {
    color: string;
    badgeIcon: string | null;
    buttonText: string;
    popular: boolean;
  };
}

export const PLANS: Record<PlanType, PlanConfig> = {
  free: {
    id: 'free',
    name: 'Free',
    label: 'Başlangıç',
    description: 'Sistemi keşfetmek ve ilk yüklerini taşımak için.',
    price: 0,
    commissionRate: 12,
    limits: {
      loadPost: 2,
      offers: 5,
    },
    logicFeatures: {
      verifiedBadge: false,
      proBadge: false,
      advancedAnalytics: false,
      prioritySupport: false,
      autoMatch: false,
      smsNotification: false,
      apiAccess: false,
    },
    displayFeatures: [
      { text: 'Ayda 2 Yük İlanı', included: true },
      { text: 'Standart Listeleme', included: true },
      { text: 'Mesajlaşma Erişimi', included: true },
      { text: 'Temel Profil Sayfası', included: true },
      { text: 'Doğrulanmış Rozet', included: false },
      { text: 'Gelişmiş Analizler', included: false },
    ],
    ui: {
      color: 'gray',
      badgeIcon: null,
      buttonText: 'Mevcut Plan',
      popular: false
    }
  },
  starter: {
    id: 'starter',
    name: 'Starter',
    label: 'Hızlandırıcı',
    description: 'Daha fazla görünürlük ve güven rozeti.',
    price: 350,
    commissionRate: 10,
    limits: {
      loadPost: 15,
      offers: 50,
    },
    logicFeatures: {
      verifiedBadge: true,
      proBadge: false,
      advancedAnalytics: 'basic',
      prioritySupport: false,
      autoMatch: false,
      smsNotification: false,
      apiAccess: false,
    },
    displayFeatures: [
      { text: 'Ayda 15 Yük İlanı', included: true },
      { text: 'Öncelikli Sıralama', included: true },
      { text: 'Doğrulanmış Rozet (Mavi Tik)', included: true },
      { text: 'Düşük Komisyon (%10)', included: true },
      { text: 'E-posta Destek Önceliği', included: true },
      { text: 'Gelişmiş Analizler', included: false },
    ],
    ui: {
      color: 'blue',
      badgeIcon: 'FiCheckCircle',
      buttonText: 'Starter\'a Geç',
      popular: true
    }
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    label: 'Profesyonel',
    description: 'Hız, güven ve maksimum kazanç.',
    price: 1250,
    commissionRate: 8,
    limits: {
      loadPost: 9999,
      offers: 9999,
    },
    logicFeatures: {
      verifiedBadge: true,
      proBadge: true,
      advancedAnalytics: 'advanced',
      prioritySupport: true,
      autoMatch: true,
      smsNotification: true,
      apiAccess: false,
    },
    displayFeatures: [
      { text: 'Sınırsız Yük İlanı', included: true },
      { text: 'Arama Sonuçlarında En Üstte', included: true },
      { text: 'Pro Rozeti (Altın Tik)', included: true },
      { text: 'Minimum Komisyon (%8)', included: true },
      { text: 'Gelişmiş Analiz Paneli', included: true },
      { text: 'Otomatik Eşleşme Önerileri', included: true },
      { text: 'Özel Telefon Hattı', included: true },
    ],
    ui: {
      color: 'purple',
      badgeIcon: 'FiStar',
      buttonText: 'Pro Ol',
      popular: false
    }
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    label: 'Kurumsal',
    description: 'Büyük operasyonlar için özel çözümler.',
    price: 0,
    commissionRate: 5,
    limits: {
      loadPost: 9999,
      offers: 9999,
    },
    logicFeatures: {
      verifiedBadge: true,
      proBadge: true,
      advancedAnalytics: 'advanced',
      prioritySupport: true,
      autoMatch: true,
      smsNotification: true,
      apiAccess: true,
    },
    displayFeatures: [
      { text: 'Tamamen Sınırsız Erişim', included: true },
      { text: 'Özel Müşteri Temsilcisi', included: true },
      { text: 'API Entegrasyonu', included: true },
      { text: 'SLA (Hizmet Seviyesi Anlaşması)', included: true },
      { text: 'Özel Raporlama', included: true },
      { text: 'Marka Giydirme', included: true },
    ],
    ui: {
      color: 'black',
      badgeIcon: 'FiShield',
      buttonText: 'Teklif Al',
      popular: false
    }
  }
};