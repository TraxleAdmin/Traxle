export type PlanType = 'free' | 'pro' | 'premium' | 'enterprise';

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
  limits: {
    loadPost: number;
    freeDopings: number;
  };
  logicFeatures: {
    verifiedBadge: boolean;
    proBadge: boolean;
    advancedAnalytics: boolean | 'basic' | 'advanced';
    prioritySupport: boolean;
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
    name: 'Standart',
    label: 'Standart',
    description: 'Sistemi keşfetmek ve ilk ilanlarınızı vermek için.',
    price: 0,
    limits: {
      loadPost: 2,
      freeDopings: 0,
    },
    logicFeatures: {
      verifiedBadge: false,
      proBadge: false,
      advancedAnalytics: false,
      prioritySupport: false,
    },
    displayFeatures: [
      { text: 'Ayda 2 İlan Hakkı', included: true },
      { text: '%0 Komisyon (Tüm Kazanç Sizin)', included: true },
      { text: 'Hediye Doping', included: false },
      { text: 'Doğrulanmış Rozet', included: false },
    ],
    ui: {
      color: 'gray',
      badgeIcon: null,
      buttonText: 'Mevcut Plan',
      popular: false
    }
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    label: 'Pro',
    description: 'Düzenli iş yapan bireysel makine sahipleri.',
    price: 149,
    limits: {
      loadPost: 10,
      freeDopings: 0,
    },
    logicFeatures: {
      verifiedBadge: true,
      proBadge: false,
      advancedAnalytics: 'basic',
      prioritySupport: false,
    },
    displayFeatures: [
      { text: 'Ayda 10 İlan Hakkı', included: true },
      { text: '%0 Komisyon', included: true },
      { text: 'Doğrulanmış Rozet (Mavi Tik)', included: true },
      { text: 'Temel Analizler', included: true },
      { text: 'Hediye Doping', included: false },
    ],
    ui: {
      color: 'blue',
      badgeIcon: 'FiCheckCircle',
      buttonText: 'Pro\'ya Geç',
      popular: true
    }
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    label: 'Premium',
    description: 'Daha fazla görünürlük isteyen filolar.',
    price: 499,
    limits: {
      loadPost: 30,
      freeDopings: 2,
    },
    logicFeatures: {
      verifiedBadge: true,
      proBadge: true,
      advancedAnalytics: 'advanced',
      prioritySupport: true,
    },
    displayFeatures: [
      { text: 'Ayda 30 İlan Hakkı', included: true },
      { text: '%0 Komisyon', included: true },
      { text: 'Her Ay 2 Adet Hediye Doping', included: true },
      { text: 'Pro Rozeti (Altın Tik)', included: true },
      { text: 'Öncelikli Canlı Destek', included: true },
    ],
    ui: {
      color: 'purple',
      badgeIcon: 'FiStar',
      buttonText: 'Premium Ol',
      popular: false
    }
  },
  enterprise: {
    id: 'enterprise',
    name: 'Kurumsal',
    label: 'Kurumsal',
    description: 'Büyük ölçekli şantiye ve makine parkları.',
    price: 1499,
    limits: {
      loadPost: 80,
      freeDopings: 15,
    },
    logicFeatures: {
      verifiedBadge: true,
      proBadge: true,
      advancedAnalytics: 'advanced',
      prioritySupport: true,
    },
    displayFeatures: [
      { text: 'Ayda 80 İlan Hakkı', included: true },
      { text: '%0 Komisyon', included: true },
      { text: 'Her Ay 15 Adet Hediye Doping', included: true },
      { text: 'Özel Kurumsal Rozet', included: true },
      { text: 'Gelişmiş Raporlama', included: true },
      { text: 'Özel Müşteri Temsilcisi (Yakında)', included: false },
    ],
    ui: {
      color: 'black',
      badgeIcon: 'FiShield',
      buttonText: 'Kurumsal Ol',
      popular: false
    }
  }
};