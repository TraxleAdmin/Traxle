export const locales = ['tr', 'en', 'de', 'ar', 'ru'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'tr';

export type RouteKey = 'projects' | 'about' | 'services' | 'contact';

export const routeKeys = ['projects', 'about', 'services', 'contact'] as const satisfies readonly RouteKey[];

export const localizedRouteSlugs: Record<RouteKey, Record<Locale, string>> = {
  projects: {
    tr: 'urunler',
    en: 'products',
    de: 'produkte',
    ar: 'المنتجات',
    ru: 'продукты',
  },
  about: {
    tr: 'hakkimizda',
    en: 'about',
    de: 'ueber-uns',
    ar: 'من-نحن',
    ru: 'о-нас',
  },
  services: {
    tr: 'hizmetler',
    en: 'services',
    de: 'dienstleistungen',
    ar: 'الخدمات',
    ru: 'услуги',
  },
  contact: {
    tr: 'iletisim',
    en: 'contact',
    de: 'kontakt',
    ar: 'تواصل',
    ru: 'контакты',
  },
};

const localizedRouteAliases: Record<RouteKey, Partial<Record<Locale, string[]>>> = {
  projects: {
    tr: ['projeler'],
    en: ['projects'],
    de: ['projekte'],
    ar: ['المشاريع'],
    ru: ['проекты'],
  },
  about: {},
  services: {},
  contact: {},
};

export const localizedMolatikPrivacySlugs: Record<Locale, string> = {
  tr: 'gizlilik',
  en: 'privacy',
  de: 'datenschutz',
  ar: 'الخصوصية',
  ru: 'конфиденциальность',
};

export type ProductVisualKind = 'barcode' | 'timer' | 'document' | 'logistics';

export type Dictionary = {
  dir: 'ltr' | 'rtl';
  languageLabel: string;
  themeLabel: string;
  nav: {
    home: string;
    projects: string;
    about: string;
    services: string;
    contact: string;
  };
  status: {
    active: string;
    development: string;
    concept: string;
  };
  home: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    proof: string[];
    productsTitle: string;
    productsDescription: string;
    howTitle: string;
    howDescription: string;
    howSteps: Array<{
      title: string;
      description: string;
    }>;
    demoTitle: string;
    demoDescription: string;
    demoLabel: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    description: string;
    openProject: string;
  };
  detail: {
    features: string;
    model: string;
    overview: string;
  };
  productDetail: {
    whatItDoes: string;
    features: string;
    useCases: string;
    demoTitle: string;
    demoDescription: string;
    demoLabel: string;
    backToProducts: string;
    privacyLabel: string;
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    name: string;
    email: string;
    message: string;
    submit: string;
  };
  cta: {
    title: string;
    description: string;
    label: string;
  };
  privacy: {
    title: string;
    lastUpdated: string;
    intro: string;
    collectedTitle: string;
    collectedItems: string[];
    useTitle: string;
    useItems: string[];
    sharingTitle: string;
    sharingText: string;
    retentionTitle: string;
    retentionText: string;
    securityTitle: string;
    securityText: string;
    rightsTitle: string;
    rightsItems: string[];
    childrenTitle: string;
    childrenText: string;
    changesTitle: string;
    changesText: string;
    contactTitle: string;
    contactEmail: string;
  };
  footer: {
    description: string;
    rights: string;
  };
};

export const languageOptions: Array<{ locale: Locale; label: string; nativeName: string }> = [
  { locale: 'tr', label: 'Türkçe', nativeName: 'Türkçe' },
  { locale: 'en', label: 'English', nativeName: 'English' },
  { locale: 'de', label: 'Deutsch', nativeName: 'Deutsch' },
  { locale: 'ar', label: 'Arabic', nativeName: 'العربية' },
  { locale: 'ru', label: 'Russian', nativeName: 'Русский' },
];

export const dictionaries: Record<Locale, Dictionary> = {
  tr: {
    dir: 'ltr',
    languageLabel: 'Dil seçimi',
    themeLabel: 'Tema değiştir',
    nav: {
      home: 'Ana sayfa',
      projects: 'Ürünler',
      about: 'Hakkımızda',
      services: 'Hizmetler',
      contact: 'İletişim',
    },
    status: {
      active: 'Canlı',
      development: 'Geliştiriliyor',
      concept: 'Planlanıyor',
    },
    home: {
      eyebrow: 'Traxle uygulamaları',
      title: 'İşletmen için geliştirilen 4 güçlü uygulama',
      description:
        'Stok, personel, belge ve lojistik süreçlerini yöneten bağımsız ama birlikte çalışan sistemler.',
      primaryCta: 'Ürünleri Keşfet',
      secondaryCta: 'Demo Talep Et',
      proof: ['Stok ve fiyat kontrolü', 'Personel zaman takibi', 'Belge ve saha operasyonu'],
      productsTitle: 'Traxle uygulamaları',
      productsDescription: 'İşletmenin farklı operasyon ihtiyaçları için geliştirilen ürünleri keşfet.',
      howTitle: 'Süreci basitleştir, operasyonu görünür hale getir',
      howDescription: 'Uygulamayı seç, veriyi düzenle ve günlük operasyon akışını daha ölçülebilir yönet.',
      howSteps: [
        {
          title: 'İhtiyacın olan uygulamayı seç',
          description: 'Stok, personel, belge veya lojistik süreçlerinden hangisini yönetmek istediğini belirle.',
        },
        {
          title: 'Veriyi düzenli şekilde işle',
          description: 'Uygulamalar, günlük operasyon verilerini daha takip edilebilir hale getirir.',
        },
        {
          title: 'Süreci ölç ve iyileştir',
          description: 'Daha net kayıtlar, daha hızlı kararlar ve daha kontrollü operasyon akışı sağlar.',
        },
      ],
      demoTitle: 'Traxle uygulamalarını işletmende görmek ister misin?',
      demoDescription:
        'BarkodX, Molatik, KünyeX ve Lojistik çözümlerinden hangisinin işletmene uygun olduğunu birlikte değerlendirelim.',
      demoLabel: 'Demo Talep Et',
    },
    projects: {
      eyebrow: 'Ürün vitrini',
      title: 'Barkod, mola, belge ve lojistik operasyonları için Traxle ürünleri.',
      description: 'Her ürün net bir iş sürecini çözer ve işletme operasyonunu daha görünür hale getirir.',
      openProject: 'Ürünü incele',
    },
    detail: {
      features: 'Temel özellikler',
      model: 'Ürün animasyonu',
      overview: 'Ürün özeti',
    },
    productDetail: {
      whatItDoes: 'Ne işe yarar?',
      features: 'Temel özellikler',
      useCases: 'Kullanım senaryoları',
      demoTitle: 'Bu ürünü işletmende değerlendirelim',
      demoDescription: 'İhtiyacını birlikte netleştirip ürünün operasyonuna nasıl uyacağını gösterebiliriz.',
      demoLabel: 'Demo Talep Et',
      backToProducts: 'Ürünlere dön',
      privacyLabel: 'Molatik gizlilik politikasını incele',
    },
    about: {
      eyebrow: 'Traxle',
      title: 'Traxle, işletmeler için operasyon yazılımları geliştirir.',
      description:
        'Barkod, personel zamanı, belge verisi ve lojistik süreçleri gibi günlük iş akışlarını sade, ölçülebilir ve güvenilir yazılımlara dönüştürür.',
      points: ['Net ürün odağı', 'Mobil ve web deneyimi', 'Operasyon verisine uygun tasarım'],
    },
    services: {
      eyebrow: 'Hizmetler',
      title: 'Operasyon yazılımları için ürün tasarımı ve mühendislik.',
      description:
        'Traxle ürünleri; stok, personel, belge ve saha akışlarını gerçek kullanım senaryolarına göre tasarlanmış arayüzlerle yönetir.',
      items: [
        {
          title: 'Ürün arayüzleri',
          description: 'İşletme ekiplerinin hızlı anlayacağı, mobilde güçlü çalışan ürün ekranları.',
        },
        {
          title: 'Operasyon platformları',
          description: 'Stok, personel, belge ve lojistik verilerini düzenli akışlara dönüştüren sistemler.',
        },
        {
          title: 'Yazılım mimarisi',
          description: 'Next.js, Firebase ve API katmanlarıyla sürdürülebilir ürün altyapıları.',
        },
        {
          title: 'Dijital deneyim tasarımı',
          description: 'Okunabilir, erişilebilir ve satış odaklı SaaS ürün vitrini deneyimleri.',
        },
      ],
    },
    contact: {
      eyebrow: 'Demo',
      title: 'Traxle ürünlerini işletmen için değerlendirelim.',
      description: 'Kısa bir not bırak; BarkodX, Molatik, KünyeX veya Lojistik için uygun çözümü birlikte belirleyelim.',
      name: 'Ad Soyad',
      email: 'E-posta',
      message: 'Mesaj',
      submit: 'Demo talebi gönder',
    },
    cta: {
      title: 'Traxle uygulamalarını işletmende görmek ister misin?',
      description:
        'BarkodX, Molatik, KünyeX ve Lojistik çözümlerinden hangisinin işletmene uygun olduğunu birlikte değerlendirelim.',
      label: 'Demo Talep Et',
    },
    privacy: {
      title: 'Molatik Gizlilik Politikası',
      lastUpdated: 'Son güncelleme: 2026',
      intro:
        'Molatik uygulaması, kullanıcı deneyimini geliştirmek ve uygulama işlevlerini sağlamak amacıyla sınırlı kişisel veri toplayabilir ve işler.',
      collectedTitle: 'Toplanan Veriler',
      collectedItems: [
        'Giriş işlemleri için e-posta adresi veya kullanıcı bilgileri',
        'Uygulama kullanım verileri: mola süreleri, zaman takibi ve kullanım istatistikleri',
      ],
      useTitle: 'Veri Kullanımı',
      useItems: [
        'Uygulama işlevlerini sağlamak ve sürdürmek',
        'Kullanıcı deneyimini geliştirmek',
        'Sistem performansını izlemek ve iyileştirmek',
      ],
      sharingTitle: 'Veri Paylaşımı',
      sharingText:
        'Molatik, kullanıcı verilerini üçüncü taraflarla satmaz veya ticari amaçla paylaşmaz. Uygulamanın çalışması için gerekli altyapı sağlayıcılarıyla sınırlı veri paylaşımı yapılabilir.',
      retentionTitle: 'Veri Saklama',
      retentionText: 'Kullanıcı verileri yalnızca gerekli olduğu süre boyunca saklanır ve ardından silinir veya anonim hale getirilir.',
      securityTitle: 'Veri Güvenliği',
      securityText: 'Kullanıcı verileri güvenli sunucularda saklanır ve yetkisiz erişime karşı korunur.',
      rightsTitle: 'Kullanıcı Hakları',
      rightsItems: ['Verilerine erişim talep edebilir', 'Verilerinin silinmesini isteyebilir'],
      childrenTitle: 'Çocukların Gizliliği',
      childrenText: 'Molatik, 13 yaş altındaki çocuklara yönelik bir uygulama değildir ve bilerek çocuklardan veri toplamaz.',
      changesTitle: 'Politika Değişiklikleri',
      changesText: 'Bu gizlilik politikası zaman zaman güncellenebilir. Güncellemeler bu sayfa üzerinden duyurulur.',
      contactTitle: 'İletişim',
      contactEmail: 'support@traxleapp.com',
    },
    footer: {
      description: 'Barkod, mola, belge ve lojistik operasyonları için premium SaaS ürünleri.',
      rights: 'Tüm hakları saklıdır.',
    },
  },
  en: {
    dir: 'ltr',
    languageLabel: 'Language',
    themeLabel: 'Toggle theme',
    nav: {
      home: 'Home',
      projects: 'Products',
      about: 'About',
      services: 'Services',
      contact: 'Contact',
    },
    status: {
      active: 'Live',
      development: 'In development',
      concept: 'Planned',
    },
    home: {
      eyebrow: 'Traxle applications',
      title: '4 powerful applications built for your business',
      description: 'Independent but connected systems for inventory, staff, document, and logistics operations.',
      primaryCta: 'Explore Products',
      secondaryCta: 'Request Demo',
      proof: ['Inventory and price control', 'Staff time tracking', 'Document and field operations'],
      productsTitle: 'Traxle applications',
      productsDescription: 'Explore products built for different operational needs in your business.',
      howTitle: 'Simplify the process and make operations visible',
      howDescription: 'Choose the app, organize the data, and manage daily operations with clearer records.',
      howSteps: [
        {
          title: 'Choose the application you need',
          description: 'Decide whether you want to manage inventory, staff, document, or logistics processes.',
        },
        {
          title: 'Process data in an organized way',
          description: 'The applications make daily operational data easier to follow.',
        },
        {
          title: 'Measure and improve the process',
          description: 'Clearer records support faster decisions and a more controlled operation flow.',
        },
      ],
      demoTitle: 'Would you like to see Traxle applications in your business?',
      demoDescription:
        'Let’s evaluate which of BarkodX, Molatik, KünyeX, and Logistics fits your business needs.',
      demoLabel: 'Request Demo',
    },
    projects: {
      eyebrow: 'Product showcase',
      title: 'Traxle products for barcode, break, document, and logistics operations.',
      description: 'Each product solves a clear business process and makes operations easier to see.',
      openProject: 'View product',
    },
    detail: {
      features: 'Core features',
      model: 'Product animation',
      overview: 'Product overview',
    },
    productDetail: {
      whatItDoes: 'What it does',
      features: 'Core features',
      useCases: 'Use cases',
      demoTitle: 'Let’s evaluate this product for your business',
      demoDescription: 'We can clarify your need and show how the product fits your operation.',
      demoLabel: 'Request Demo',
      backToProducts: 'Back to products',
      privacyLabel: 'View Molatik privacy policy',
    },
    about: {
      eyebrow: 'Traxle',
      title: 'Traxle builds operations software for businesses.',
      description:
        'It turns daily workflows such as barcode, staff time, document data, and logistics processes into simple, measurable, and reliable software.',
      points: ['Clear product focus', 'Mobile and web experience', 'Design shaped by operational data'],
    },
    services: {
      eyebrow: 'Services',
      title: 'Product design and engineering for operations software.',
      description:
        'Traxle products manage inventory, staff, document, and field flows through interfaces designed around real usage scenarios.',
      items: [
        {
          title: 'Product interfaces',
          description: 'Product screens that business teams can understand quickly and use strongly on mobile.',
        },
        {
          title: 'Operations platforms',
          description: 'Systems that turn inventory, staff, document, and logistics data into organized flows.',
        },
        {
          title: 'Software architecture',
          description: 'Sustainable product infrastructure with Next.js, Firebase, and API layers.',
        },
        {
          title: 'Digital experience design',
          description: 'Readable, accessible, and conversion-focused SaaS product showcase experiences.',
        },
      ],
    },
    contact: {
      eyebrow: 'Demo',
      title: 'Let’s evaluate Traxle products for your business.',
      description: 'Leave a short note and we will identify the right fit for BarkodX, Molatik, KünyeX, or Logistics.',
      name: 'Full name',
      email: 'Email',
      message: 'Message',
      submit: 'Send demo request',
    },
    cta: {
      title: 'Would you like to see Traxle applications in your business?',
      description: 'Let’s evaluate which of BarkodX, Molatik, KünyeX, and Logistics fits your business needs.',
      label: 'Request Demo',
    },
    privacy: {
      title: 'Molatik Privacy Policy',
      lastUpdated: 'Last updated: 2026',
      intro:
        'Molatik may collect and process limited personal data to improve the user experience and provide application functions.',
      collectedTitle: 'Data Collected',
      collectedItems: [
        'Email address or user information for sign-in processes',
        'Application usage data: break durations, time tracking, and usage statistics',
      ],
      useTitle: 'Data Use',
      useItems: [
        'Provide and maintain application functions',
        'Improve the user experience',
        'Monitor and improve system performance',
      ],
      sharingTitle: 'Data Sharing',
      sharingText:
        'Molatik does not sell user data or share it for commercial purposes. Limited data may be shared with infrastructure providers required for the application to operate.',
      retentionTitle: 'Data Retention',
      retentionText: 'User data is stored only as long as necessary, then deleted or anonymized.',
      securityTitle: 'Data Security',
      securityText: 'User data is stored on secure servers and protected against unauthorized access.',
      rightsTitle: 'User Rights',
      rightsItems: ['Request access to their data', 'Request deletion of their data'],
      childrenTitle: 'Children’s Privacy',
      childrenText: 'Molatik is not intended for children under 13 and does not knowingly collect data from children.',
      changesTitle: 'Policy Changes',
      changesText: 'This privacy policy may be updated from time to time. Updates are announced on this page.',
      contactTitle: 'Contact',
      contactEmail: 'support@traxleapp.com',
    },
    footer: {
      description: 'Premium SaaS products for barcode, break, document, and logistics operations.',
      rights: 'All rights reserved.',
    },
  },
  de: {
    dir: 'ltr',
    languageLabel: 'Sprache',
    themeLabel: 'Design wechseln',
    nav: {
      home: 'Start',
      projects: 'Produkte',
      about: 'Über uns',
      services: 'Dienstleistungen',
      contact: 'Kontakt',
    },
    status: {
      active: 'Live',
      development: 'In Entwicklung',
      concept: 'Geplant',
    },
    home: {
      eyebrow: 'Traxle Anwendungen',
      title: '4 leistungsstarke Anwendungen für dein Unternehmen',
      description:
        'Unabhängige, aber zusammenarbeitende Systeme für Bestand, Personal, Dokumente und Logistik.',
      primaryCta: 'Produkte entdecken',
      secondaryCta: 'Demo anfragen',
      proof: ['Bestand und Preise steuern', 'Personalzeiten verfolgen', 'Dokumente und Außendienstprozesse'],
      productsTitle: 'Traxle Anwendungen',
      productsDescription: 'Entdecke Produkte für unterschiedliche operative Anforderungen deines Unternehmens.',
      howTitle: 'Prozesse vereinfachen und Abläufe sichtbar machen',
      howDescription: 'Wähle die Anwendung, ordne die Daten und steuere tägliche Abläufe mit klareren Einträgen.',
      howSteps: [
        {
          title: 'Wähle die passende Anwendung',
          description: 'Lege fest, ob du Bestand, Personal, Dokumente oder Logistikprozesse verwalten möchtest.',
        },
        {
          title: 'Verarbeite Daten strukturiert',
          description: 'Die Anwendungen machen tägliche Betriebsdaten besser nachvollziehbar.',
        },
        {
          title: 'Miss und verbessere den Prozess',
          description: 'Klarere Aufzeichnungen ermöglichen schnellere Entscheidungen und kontrolliertere Abläufe.',
        },
      ],
      demoTitle: 'Möchtest du Traxle Anwendungen in deinem Unternehmen sehen?',
      demoDescription:
        'Wir bewerten gemeinsam, welche Lösung aus BarkodX, Molatik, KünyeX und Logistik zu deinem Unternehmen passt.',
      demoLabel: 'Demo anfragen',
    },
    projects: {
      eyebrow: 'Produktübersicht',
      title: 'Traxle Produkte für Barcode-, Pausen-, Dokumenten- und Logistikprozesse.',
      description: 'Jedes Produkt löst einen klaren Geschäftsprozess und macht Abläufe sichtbarer.',
      openProject: 'Produkt ansehen',
    },
    detail: {
      features: 'Kernfunktionen',
      model: 'Produktanimation',
      overview: 'Produktübersicht',
    },
    productDetail: {
      whatItDoes: 'Wofür es gedacht ist',
      features: 'Kernfunktionen',
      useCases: 'Einsatzszenarien',
      demoTitle: 'Lass uns dieses Produkt für dein Unternehmen bewerten',
      demoDescription: 'Wir können deinen Bedarf klären und zeigen, wie das Produkt in deinen Ablauf passt.',
      demoLabel: 'Demo anfragen',
      backToProducts: 'Zurück zu Produkten',
      privacyLabel: 'Molatik Datenschutz ansehen',
    },
    about: {
      eyebrow: 'Traxle',
      title: 'Traxle entwickelt Operations-Software für Unternehmen.',
      description:
        'Tägliche Abläufe wie Barcode, Personalzeit, Dokumentdaten und Logistik werden in einfache, messbare und zuverlässige Software verwandelt.',
      points: ['Klarer Produktfokus', 'Mobile und Web-Erfahrung', 'Design nach operativen Daten'],
    },
    services: {
      eyebrow: 'Dienstleistungen',
      title: 'Produktdesign und Engineering für Operations-Software.',
      description:
        'Traxle Produkte steuern Bestand, Personal, Dokumente und Außendienstflüsse über Oberflächen, die an realen Nutzungsszenarien ausgerichtet sind.',
      items: [
        {
          title: 'Produktoberflächen',
          description: 'Produktbildschirme, die Teams schnell verstehen und mobil zuverlässig nutzen können.',
        },
        {
          title: 'Operations-Plattformen',
          description: 'Systeme, die Bestands-, Personal-, Dokument- und Logistikdaten in geordnete Abläufe bringen.',
        },
        {
          title: 'Softwarearchitektur',
          description: 'Nachhaltige Produktinfrastruktur mit Next.js, Firebase und API-Schichten.',
        },
        {
          title: 'Digital Experience Design',
          description: 'Lesbare, zugängliche und vertriebsorientierte SaaS-Produktvitrinen.',
        },
      ],
    },
    contact: {
      eyebrow: 'Demo',
      title: 'Lass uns Traxle Produkte für dein Unternehmen bewerten.',
      description: 'Hinterlasse eine kurze Nachricht; wir finden die passende Lösung für BarkodX, Molatik, KünyeX oder Logistik.',
      name: 'Name',
      email: 'E-Mail',
      message: 'Nachricht',
      submit: 'Demo-Anfrage senden',
    },
    cta: {
      title: 'Möchtest du Traxle Anwendungen in deinem Unternehmen sehen?',
      description:
        'Wir bewerten gemeinsam, welche Lösung aus BarkodX, Molatik, KünyeX und Logistik zu deinem Unternehmen passt.',
      label: 'Demo anfragen',
    },
    privacy: {
      title: 'Molatik Datenschutzrichtlinie',
      lastUpdated: 'Letzte Aktualisierung: 2026',
      intro:
        'Molatik kann begrenzte personenbezogene Daten erheben und verarbeiten, um die Nutzererfahrung zu verbessern und App-Funktionen bereitzustellen.',
      collectedTitle: 'Erhobene Daten',
      collectedItems: [
        'E-Mail-Adresse oder Nutzerinformationen für Anmeldevorgänge',
        'App-Nutzungsdaten: Pausenzeiten, Zeiterfassung und Nutzungsstatistiken',
      ],
      useTitle: 'Datennutzung',
      useItems: [
        'App-Funktionen bereitstellen und aufrechterhalten',
        'Nutzererfahrung verbessern',
        'Systemleistung überwachen und verbessern',
      ],
      sharingTitle: 'Datenweitergabe',
      sharingText:
        'Molatik verkauft keine Nutzerdaten und teilt sie nicht zu kommerziellen Zwecken. Begrenzte Daten können mit Infrastruktur-Dienstleistern geteilt werden, die für den Betrieb der App erforderlich sind.',
      retentionTitle: 'Datenspeicherung',
      retentionText: 'Nutzerdaten werden nur so lange gespeichert, wie es erforderlich ist, und danach gelöscht oder anonymisiert.',
      securityTitle: 'Datensicherheit',
      securityText: 'Nutzerdaten werden auf sicheren Servern gespeichert und gegen unbefugten Zugriff geschützt.',
      rightsTitle: 'Nutzerrechte',
      rightsItems: ['Zugriff auf ihre Daten anfordern', 'Löschung ihrer Daten verlangen'],
      childrenTitle: 'Datenschutz von Kindern',
      childrenText: 'Molatik richtet sich nicht an Kinder unter 13 Jahren und erhebt wissentlich keine Daten von Kindern.',
      changesTitle: 'Änderungen der Richtlinie',
      changesText: 'Diese Datenschutzrichtlinie kann von Zeit zu Zeit aktualisiert werden. Aktualisierungen werden auf dieser Seite bekannt gegeben.',
      contactTitle: 'Kontakt',
      contactEmail: 'support@traxleapp.com',
    },
    footer: {
      description: 'Premium SaaS-Produkte für Barcode-, Pausen-, Dokumenten- und Logistikprozesse.',
      rights: 'Alle Rechte vorbehalten.',
    },
  },
  ar: {
    dir: 'rtl',
    languageLabel: 'اللغة',
    themeLabel: 'تبديل المظهر',
    nav: {
      home: 'الرئيسية',
      projects: 'المنتجات',
      about: 'من نحن',
      services: 'الخدمات',
      contact: 'تواصل',
    },
    status: {
      active: 'متاح',
      development: 'قيد التطوير',
      concept: 'مخطط',
    },
    home: {
      eyebrow: 'تطبيقات Traxle',
      title: '4 تطبيقات قوية مصممة لعملك',
      description: 'أنظمة مستقلة لكنها تعمل معا لإدارة المخزون والموظفين والوثائق والعمليات اللوجستية.',
      primaryCta: 'استكشف المنتجات',
      secondaryCta: 'اطلب عرضا تجريبيا',
      proof: ['التحكم في المخزون والأسعار', 'تتبع وقت الموظفين', 'الوثائق والعمليات الميدانية'],
      productsTitle: 'تطبيقات Traxle',
      productsDescription: 'اكتشف المنتجات المطورة لاحتياجات التشغيل المختلفة في عملك.',
      howTitle: 'بسّط العملية واجعل التشغيل أكثر وضوحا',
      howDescription: 'اختر التطبيق، نظم البيانات، وأدر العمليات اليومية بسجلات أكثر وضوحا.',
      howSteps: [
        {
          title: 'اختر التطبيق الذي تحتاجه',
          description: 'حدد ما إذا كنت تريد إدارة المخزون أو الموظفين أو الوثائق أو العمليات اللوجستية.',
        },
        {
          title: 'عالج البيانات بطريقة منظمة',
          description: 'تجعل التطبيقات بيانات التشغيل اليومية أسهل في المتابعة.',
        },
        {
          title: 'قِس العملية وحسّنها',
          description: 'السجلات الأوضح تدعم قرارات أسرع وتدفقا تشغيليا أكثر تحكما.',
        },
      ],
      demoTitle: 'هل ترغب في رؤية تطبيقات Traxle داخل عملك؟',
      demoDescription: 'لنقيّم معا أي حلول BarkodX وMolatik وKünyeX واللوجستيات تناسب احتياج عملك.',
      demoLabel: 'اطلب عرضا تجريبيا',
    },
    projects: {
      eyebrow: 'عرض المنتجات',
      title: 'منتجات Traxle لعمليات الباركود والاستراحات والوثائق واللوجستيات.',
      description: 'كل منتج يحل عملية عمل واضحة ويجعل التشغيل أكثر قابلية للرؤية.',
      openProject: 'عرض المنتج',
    },
    detail: {
      features: 'الميزات الأساسية',
      model: 'حركة المنتج',
      overview: 'ملخص المنتج',
    },
    productDetail: {
      whatItDoes: 'ما فائدته؟',
      features: 'الميزات الأساسية',
      useCases: 'سيناريوهات الاستخدام',
      demoTitle: 'لنقيّم هذا المنتج لعملك',
      demoDescription: 'يمكننا توضيح احتياجك وإظهار كيف يناسب المنتج عملياتك.',
      demoLabel: 'اطلب عرضا تجريبيا',
      backToProducts: 'العودة إلى المنتجات',
      privacyLabel: 'عرض سياسة خصوصية Molatik',
    },
    about: {
      eyebrow: 'Traxle',
      title: 'تطوّر Traxle برمجيات تشغيل للشركات.',
      description:
        'تحول سير العمل اليومي مثل الباركود ووقت الموظفين وبيانات الوثائق والعمليات اللوجستية إلى برمجيات بسيطة وقابلة للقياس وموثوقة.',
      points: ['تركيز واضح على المنتج', 'تجربة جوال وويب', 'تصميم مبني على بيانات التشغيل'],
    },
    services: {
      eyebrow: 'الخدمات',
      title: 'تصميم وهندسة منتجات لبرمجيات التشغيل.',
      description:
        'تدير منتجات Traxle المخزون والموظفين والوثائق والتدفقات الميدانية عبر واجهات مصممة حول سيناريوهات استخدام حقيقية.',
      items: [
        {
          title: 'واجهات المنتجات',
          description: 'شاشات منتجات تفهمها فرق العمل بسرعة وتعمل بقوة على الجوال.',
        },
        {
          title: 'منصات التشغيل',
          description: 'أنظمة تحول بيانات المخزون والموظفين والوثائق واللوجستيات إلى تدفقات منظمة.',
        },
        {
          title: 'هندسة البرمجيات',
          description: 'بنية منتجات مستدامة باستخدام Next.js وFirebase وطبقات API.',
        },
        {
          title: 'تصميم التجربة الرقمية',
          description: 'واجهات SaaS واضحة وسهلة الوصول وموجهة لطلب العروض.',
        },
      ],
    },
    contact: {
      eyebrow: 'عرض تجريبي',
      title: 'لنقيّم منتجات Traxle لعملك.',
      description: 'اترك رسالة قصيرة وسنحدد الحل الأنسب من BarkodX أو Molatik أو KünyeX أو اللوجستيات.',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      message: 'الرسالة',
      submit: 'إرسال طلب العرض',
    },
    cta: {
      title: 'هل ترغب في رؤية تطبيقات Traxle داخل عملك؟',
      description: 'لنقيّم معا أي حلول BarkodX وMolatik وKünyeX واللوجستيات تناسب احتياج عملك.',
      label: 'اطلب عرضا تجريبيا',
    },
    privacy: {
      title: 'سياسة خصوصية Molatik',
      lastUpdated: 'آخر تحديث: 2026',
      intro:
        'قد تجمع Molatik وتعالج بيانات شخصية محدودة لتحسين تجربة المستخدم وتوفير وظائف التطبيق.',
      collectedTitle: 'البيانات التي يتم جمعها',
      collectedItems: [
        'البريد الإلكتروني أو معلومات المستخدم لعمليات تسجيل الدخول',
        'بيانات استخدام التطبيق: مدة الاستراحات وتتبع الوقت وإحصاءات الاستخدام',
      ],
      useTitle: 'استخدام البيانات',
      useItems: [
        'توفير وظائف التطبيق والحفاظ عليها',
        'تحسين تجربة المستخدم',
        'مراقبة أداء النظام وتحسينه',
      ],
      sharingTitle: 'مشاركة البيانات',
      sharingText:
        'لا تبيع Molatik بيانات المستخدمين ولا تشاركها لأغراض تجارية. قد تتم مشاركة بيانات محدودة مع مزودي البنية التحتية الضروريين لتشغيل التطبيق.',
      retentionTitle: 'الاحتفاظ بالبيانات',
      retentionText: 'يتم الاحتفاظ ببيانات المستخدمين فقط للمدة اللازمة، ثم يتم حذفها أو إخفاء هويتها.',
      securityTitle: 'أمن البيانات',
      securityText: 'تخزن بيانات المستخدمين على خوادم آمنة وتتم حمايتها من الوصول غير المصرح به.',
      rightsTitle: 'حقوق المستخدم',
      rightsItems: ['طلب الوصول إلى بياناته', 'طلب حذف بياناته'],
      childrenTitle: 'خصوصية الأطفال',
      childrenText: 'Molatik ليس موجها للأطفال دون سن 13 عاما ولا يجمع بيانات الأطفال عن علم.',
      changesTitle: 'تغييرات السياسة',
      changesText: 'قد يتم تحديث سياسة الخصوصية هذه من وقت لآخر. يتم الإعلان عن التحديثات عبر هذه الصفحة.',
      contactTitle: 'تواصل',
      contactEmail: 'support@traxleapp.com',
    },
    footer: {
      description: 'منتجات SaaS فاخرة لعمليات الباركود والاستراحات والوثائق واللوجستيات.',
      rights: 'جميع الحقوق محفوظة.',
    },
  },
  ru: {
    dir: 'ltr',
    languageLabel: 'Язык',
    themeLabel: 'Переключить тему',
    nav: {
      home: 'Главная',
      projects: 'Продукты',
      about: 'О нас',
      services: 'Услуги',
      contact: 'Контакты',
    },
    status: {
      active: 'Запущено',
      development: 'В разработке',
      concept: 'Планируется',
    },
    home: {
      eyebrow: 'Приложения Traxle',
      title: '4 мощных приложения для вашего бизнеса',
      description:
        'Независимые, но совместно работающие системы для склада, персонала, документов и логистики.',
      primaryCta: 'Посмотреть продукты',
      secondaryCta: 'Запросить демо',
      proof: ['Контроль склада и цен', 'Учет времени персонала', 'Документы и полевые операции'],
      productsTitle: 'Приложения Traxle',
      productsDescription: 'Изучите продукты для разных операционных задач вашего бизнеса.',
      howTitle: 'Упростите процесс и сделайте операции видимыми',
      howDescription: 'Выберите приложение, упорядочите данные и управляйте ежедневными операциями понятнее.',
      howSteps: [
        {
          title: 'Выберите нужное приложение',
          description: 'Определите, чем нужно управлять: складом, персоналом, документами или логистикой.',
        },
        {
          title: 'Обрабатывайте данные структурированно',
          description: 'Приложения делают ежедневные операционные данные проще для отслеживания.',
        },
        {
          title: 'Измеряйте и улучшайте процесс',
          description: 'Более ясные записи помогают быстрее принимать решения и лучше контролировать поток операций.',
        },
      ],
      demoTitle: 'Хотите увидеть приложения Traxle в вашем бизнесе?',
      demoDescription:
        'Давайте вместе оценим, какое решение из BarkodX, Molatik, KünyeX и Логистики подходит вашему бизнесу.',
      demoLabel: 'Запросить демо',
    },
    projects: {
      eyebrow: 'Витрина продуктов',
      title: 'Продукты Traxle для штрихкодов, перерывов, документов и логистики.',
      description: 'Каждый продукт решает понятный бизнес-процесс и делает операции видимее.',
      openProject: 'Посмотреть продукт',
    },
    detail: {
      features: 'Основные функции',
      model: 'Анимация продукта',
      overview: 'Обзор продукта',
    },
    productDetail: {
      whatItDoes: 'Что делает продукт',
      features: 'Основные функции',
      useCases: 'Сценарии использования',
      demoTitle: 'Давайте оценим этот продукт для вашего бизнеса',
      demoDescription: 'Мы поможем уточнить задачу и показать, как продукт подойдет вашим операциям.',
      demoLabel: 'Запросить демо',
      backToProducts: 'Назад к продуктам',
      privacyLabel: 'Открыть политику конфиденциальности Molatik',
    },
    about: {
      eyebrow: 'Traxle',
      title: 'Traxle разрабатывает операционное ПО для бизнеса.',
      description:
        'Ежедневные процессы, такие как штрихкоды, учет времени персонала, данные документов и логистика, превращаются в простое, измеримое и надежное ПО.',
      points: ['Четкий продуктовый фокус', 'Мобильный и веб-опыт', 'Дизайн на основе операционных данных'],
    },
    services: {
      eyebrow: 'Услуги',
      title: 'Продуктовый дизайн и инженерия для операционного ПО.',
      description:
        'Продукты Traxle управляют складом, персоналом, документами и полевыми потоками через интерфейсы, созданные под реальные сценарии.',
      items: [
        {
          title: 'Продуктовые интерфейсы',
          description: 'Экраны продуктов, которые команды быстро понимают и уверенно используют на мобильных устройствах.',
        },
        {
          title: 'Операционные платформы',
          description: 'Системы, превращающие складские, кадровые, документные и логистические данные в упорядоченные потоки.',
        },
        {
          title: 'Архитектура ПО',
          description: 'Устойчивая продуктовая инфраструктура на Next.js, Firebase и API-слоях.',
        },
        {
          title: 'Дизайн цифрового опыта',
          description: 'Читаемые, доступные и ориентированные на заявку SaaS-витрины продуктов.',
        },
      ],
    },
    contact: {
      eyebrow: 'Демо',
      title: 'Давайте оценим продукты Traxle для вашего бизнеса.',
      description: 'Оставьте короткое сообщение, и мы подберем подходящее решение: BarkodX, Molatik, KünyeX или Логистика.',
      name: 'Имя',
      email: 'Email',
      message: 'Сообщение',
      submit: 'Отправить запрос',
    },
    cta: {
      title: 'Хотите увидеть приложения Traxle в вашем бизнесе?',
      description: 'Давайте вместе оценим, какое решение из BarkodX, Molatik, KünyeX и Логистики подходит вашему бизнесу.',
      label: 'Запросить демо',
    },
    privacy: {
      title: 'Политика конфиденциальности Molatik',
      lastUpdated: 'Последнее обновление: 2026',
      intro:
        'Molatik может собирать и обрабатывать ограниченные персональные данные для улучшения пользовательского опыта и обеспечения функций приложения.',
      collectedTitle: 'Собираемые данные',
      collectedItems: [
        'Адрес электронной почты или информация пользователя для входа',
        'Данные использования приложения: длительность перерывов, учет времени и статистика использования',
      ],
      useTitle: 'Использование данных',
      useItems: [
        'Обеспечение и поддержка функций приложения',
        'Улучшение пользовательского опыта',
        'Мониторинг и улучшение производительности системы',
      ],
      sharingTitle: 'Передача данных',
      sharingText:
        'Molatik не продает пользовательские данные и не передает их в коммерческих целях. Ограниченные данные могут передаваться поставщикам инфраструктуры, необходимым для работы приложения.',
      retentionTitle: 'Хранение данных',
      retentionText: 'Данные пользователей хранятся только необходимый срок, затем удаляются или обезличиваются.',
      securityTitle: 'Безопасность данных',
      securityText: 'Данные пользователей хранятся на защищенных серверах и защищаются от несанкционированного доступа.',
      rightsTitle: 'Права пользователя',
      rightsItems: ['Запросить доступ к своим данным', 'Запросить удаление своих данных'],
      childrenTitle: 'Конфиденциальность детей',
      childrenText: 'Molatik не предназначен для детей младше 13 лет и сознательно не собирает данные детей.',
      changesTitle: 'Изменения политики',
      changesText: 'Эта политика конфиденциальности может периодически обновляться. Обновления публикуются на этой странице.',
      contactTitle: 'Контакты',
      contactEmail: 'support@traxleapp.com',
    },
    footer: {
      description: 'Премиальные SaaS-продукты для штрихкодов, перерывов, документов и логистики.',
      rights: 'Все права защищены.',
    },
  },
};

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export function getLocaleFromPathname(pathname: string | null | undefined): Locale {
  const segment = pathname?.split('/').filter(Boolean)[0];
  return isLocale(segment) ? segment : defaultLocale;
}

function decodeSegment(segment: string) {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

function normalizeSegment(segment: string) {
  return decodeSegment(segment).toLocaleLowerCase();
}

export function getCanonicalRouteKey(segment: string | undefined): RouteKey | null {
  if (!segment) return null;
  const normalizedSegment = normalizeSegment(segment);
  return routeKeys.find((key) => key === normalizedSegment) ?? null;
}

export function resolveLocalizedRouteKey(locale: Locale, segment: string | undefined): RouteKey | null {
  if (!segment) return null;
  const normalizedSegment = normalizeSegment(segment);

  return (
    routeKeys.find((key) => {
      const localizedSlug = localizedRouteSlugs[key][locale];
      const aliases = localizedRouteAliases[key][locale] ?? [];
      return [localizedSlug, key, ...aliases].some((candidate) => normalizeSegment(candidate) === normalizedSegment);
    }) ?? null
  );
}

export function getLocalizedPath(locale: Locale, routeKey: RouteKey, rest: string[] = []) {
  const localizedSlug = localizedRouteSlugs[routeKey][locale];
  const suffix = rest.filter(Boolean).join('/');
  return `/${locale}/${localizedSlug}${suffix ? `/${suffix}` : ''}`;
}

export function getMolatikPrivacyPath(locale: Locale) {
  return `/${locale}/molatik/${localizedMolatikPrivacySlugs[locale]}`;
}

export function isMolatikPrivacySlug(segment: string | undefined) {
  if (!segment) return false;
  const normalizedSegment = normalizeSegment(segment);
  return Object.values(localizedMolatikPrivacySlugs).some((slug) => normalizeSegment(slug) === normalizedSegment);
}

export function isMolatikPrivacyPath(locale: Locale, productSegment: string | undefined, privacySegment: string | undefined) {
  if (!productSegment || !privacySegment) return false;
  return normalizeSegment(productSegment) === 'molatik' && normalizeSegment(privacySegment) === normalizeSegment(localizedMolatikPrivacySlugs[locale]);
}

export function withLocale(locale: Locale, path = '') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const segments = normalizedPath.split('/').filter(Boolean);
  const pathSegments = isLocale(segments[0]) ? segments.slice(1) : segments;

  if (pathSegments.length === 0) {
    return `/${locale}`;
  }

  if (pathSegments[0] === 'molatik' && isMolatikPrivacySlug(pathSegments[1])) {
    return getMolatikPrivacyPath(locale);
  }

  const routeKey = resolveLocalizedRouteKey(locale, pathSegments[0]) ?? getCanonicalRouteKey(pathSegments[0]);

  if (routeKey) {
    return getLocalizedPath(locale, routeKey, pathSegments.slice(1));
  }

  return `/${locale}/${pathSegments.join('/')}`;
}

export function switchLocalePath(pathname: string, nextLocale: Locale) {
  const segments = pathname.split('/').filter(Boolean);
  if (isLocale(segments[0])) {
    const currentLocale = segments[0];

    if (isMolatikPrivacyPath(currentLocale, segments[1], segments[2])) {
      return getMolatikPrivacyPath(nextLocale);
    }

    const routeKey = resolveLocalizedRouteKey(currentLocale, segments[1]);

    if (routeKey) {
      return getLocalizedPath(nextLocale, routeKey, segments.slice(2));
    }

    segments[0] = nextLocale;
    return `/${segments.join('/')}`;
  }

  return withLocale(nextLocale, pathname);
}
