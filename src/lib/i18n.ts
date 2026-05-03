export const locales = ['tr', 'en', 'de', 'ar', 'ru'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'tr';

export type RouteKey = 'projects' | 'about' | 'services' | 'contact';

export const routeKeys = ['projects', 'about', 'services', 'contact'] as const satisfies readonly RouteKey[];

export const localizedRouteSlugs: Record<RouteKey, Record<Locale, string>> = {
  projects: {
    tr: 'projeler',
    en: 'projects',
    de: 'projekte',
    ar: 'المشاريع',
    ru: 'проекты',
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
    processTitle: string;
    processDescription: string;
    process: Array<{
      value: string;
      label: string;
      description: string;
    }>;
    hubTitle: string;
    hubDescription: string;
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
      projects: 'Projeler',
      about: 'Hakkımızda',
      services: 'Servisler',
      contact: 'İletişim',
    },
    status: {
      active: 'Canlı',
      development: 'Geliştiriliyor',
      concept: 'Konsept',
    },
    home: {
      eyebrow: 'Traxle Project Universe',
      title: 'Mobil ve masaüstü ürünler için 3D teknoloji evreni.',
      description:
        'Traxle; proje platformları, 3D web arayüzleri ve üretim odaklı yazılım mimarilerini aynı premium dijital çatı altında toplar.',
      primaryCta: 'Projeleri Keşfet',
      secondaryCta: 'Demo Talep Et',
      proof: ['3D arayüz mimarisi', 'Ürün ekosistemi', 'Performans odaklı mühendislik'],
      processTitle: 'Kurumsal ürün hattı gibi çalışan dijital vitrin',
      processDescription:
        'Traxle; strateji, mimari, arayüz ve canlıya çıkış disiplinlerini tek bir kontrollü deneyim akışına bağlar.',
      process: [
        {
          value: '01',
          label: 'Strateji',
          description: 'Ürün portföyü, hedef kitle ve marka algısı tek bir ekosistem vizyonunda hizalanır.',
        },
        {
          value: '02',
          label: 'Mimari',
          description: 'Web, mobil ve masaüstü yüzeyleri ölçeklenebilir bir teknik temel üzerinde tasarlanır.',
        },
        {
          value: '03',
          label: 'Deneyim',
          description: '3D atmosfer, okunabilir HTML içerik ve erişilebilir navigasyon aynı tasarım diliyle birleşir.',
        },
        {
          value: '04',
          label: 'Yayın',
          description: 'Performans, SEO ve responsive davranış canlı ortam beklentilerine göre doğrulanır.',
        },
      ],
      hubTitle: 'Tek çatı altında ölçeklenebilir projeler',
      hubDescription:
        'Mevcut ve gelecek ürünler aynı veri yapısı, aynı görsel dil ve aynı erişilebilir web deneyimiyle yönetilir.',
    },
    projects: {
      eyebrow: 'Project Hub',
      title: 'Traxle ekosistemindeki tüm ürün yüzeyleri.',
      description:
        'Her proje, canlı bir 3D portal ve okunabilir HTML içerik katmanıyla aynı evrende konumlanır.',
      openProject: 'Projeyi aç',
    },
    detail: {
      features: 'Öne çıkan özellikler',
      model: '3D model alanı',
      overview: 'Proje özeti',
    },
    about: {
      eyebrow: 'Vizyon',
      title: 'Traxle, ürün geliştirmeyi mühendislik ve tasarım seviyesinde bir ekosisteme dönüştürür.',
      description:
        'Şirketin odağı; mobil, masaüstü ve web ürünlerini tutarlı, ölçülebilir ve yüksek kaliteli dijital deneyimlere çevirmektir.',
      points: ['Geleceğe hazır mimari', 'Tutarlı ürün dili', 'Gerçek kullanıcı akışlarına göre tasarım'],
    },
    services: {
      eyebrow: 'Servisler',
      title: 'Premium yazılım ürünleri için uçtan uca tasarım ve mühendislik.',
      description:
        '3D web deneyiminden ürün platformlarına kadar her katman performans, erişilebilirlik ve sürdürülebilir kod yapısı ile tasarlanır.',
      items: [
        {
          title: '3D web arayüzleri',
          description: 'WebGL, React Three Fiber ve HTML UI birleşimiyle premium, erişilebilir arayüzler.',
        },
        {
          title: 'Ürün platformları',
          description: 'Mobil, masaüstü ve web ürünlerini ortak veri ve tasarım sistemi altında toplama.',
        },
        {
          title: 'Yazılım mimarisi',
          description: 'Ölçeklenebilir Next.js, API, veri ve dağıtım mimarileri.',
        },
        {
          title: 'Dijital deneyim tasarımı',
          description: 'Kullanıcı akışları, etkileşim dili ve üretime hazır arayüz sistemleri.',
        },
      ],
    },
    contact: {
      eyebrow: 'Demo',
      title: 'Traxle evrenini ürününüz için birlikte kuralım.',
      description:
        'Kısa bir not bırakın; proje kapsamı, 3D deneyim seviyesi ve üretim mimarisi için dönüş yapalım.',
      name: 'Ad Soyad',
      email: 'E-posta',
      message: 'Mesaj',
      submit: 'Demo talebi gönder',
    },
    cta: {
      title: 'Yeni proje için premium bir başlangıç yapın.',
      description: 'Traxle evrenine yeni ürünler, portallar ve 3D model dosyaları kolayca eklenebilir.',
      label: 'Demo Talep Et',
    },
    footer: {
      description: 'Mobil, masaüstü ve web ürünleri için premium teknoloji ekosistemi.',
      rights: 'Tüm hakları saklıdır.',
    },
  },
  en: {
    dir: 'ltr',
    languageLabel: 'Language',
    themeLabel: 'Toggle theme',
    nav: {
      home: 'Home',
      projects: 'Projects',
      about: 'About',
      services: 'Services',
      contact: 'Contact',
    },
    status: {
      active: 'Active',
      development: 'Development',
      concept: 'Concept',
    },
    home: {
      eyebrow: 'Traxle Project Universe',
      title: 'A 3D technology universe for mobile and desktop products.',
      description:
        'Traxle brings project platforms, 3D web interfaces, and production-grade software architecture into one premium digital roof.',
      primaryCta: 'Explore Projects',
      secondaryCta: 'Request Demo',
      proof: ['3D interface architecture', 'Product ecosystem', 'Performance-led engineering'],
      processTitle: 'A digital front door built like an enterprise product line',
      processDescription:
        'Traxle connects strategy, architecture, interface design, and launch readiness into one controlled experience flow.',
      process: [
        {
          value: '01',
          label: 'Strategy',
          description: 'Portfolio, audience, and brand perception align under a single ecosystem vision.',
        },
        {
          value: '02',
          label: 'Architecture',
          description: 'Web, mobile, and desktop surfaces are shaped on a scalable technical foundation.',
        },
        {
          value: '03',
          label: 'Experience',
          description: '3D atmosphere, readable HTML content, and accessible navigation share one design language.',
        },
        {
          value: '04',
          label: 'Launch',
          description: 'Performance, SEO, and responsive behavior are checked against production expectations.',
        },
      ],
      hubTitle: 'Scalable projects under one roof',
      hubDescription:
        'Existing and future products share the same data structure, visual language, and accessible web experience.',
    },
    projects: {
      eyebrow: 'Project Hub',
      title: 'Every product surface in the Traxle ecosystem.',
      description:
        'Each project lives in the same universe through a live 3D portal and a readable HTML content layer.',
      openProject: 'Open project',
    },
    detail: {
      features: 'Key features',
      model: '3D model area',
      overview: 'Project overview',
    },
    about: {
      eyebrow: 'Vision',
      title: 'Traxle turns product development into an engineering and design ecosystem.',
      description:
        'The company focuses on transforming mobile, desktop, and web products into consistent, measurable, high-quality digital experiences.',
      points: ['Future-ready architecture', 'Consistent product language', 'Design based on real user flows'],
    },
    services: {
      eyebrow: 'Services',
      title: 'End-to-end design and engineering for premium software products.',
      description:
        'From 3D web experiences to product platforms, every layer is designed for performance, accessibility, and maintainable code.',
      items: [
        {
          title: '3D web interfaces',
          description: 'Premium, accessible interfaces combining WebGL, React Three Fiber, and HTML UI.',
        },
        {
          title: 'Product platforms',
          description: 'Unifying mobile, desktop, and web products under shared data and design systems.',
        },
        {
          title: 'Software architecture',
          description: 'Scalable Next.js, API, data, and deployment architecture.',
        },
        {
          title: 'Digital experience design',
          description: 'User flows, interaction language, and production-ready interface systems.',
        },
      ],
    },
    contact: {
      eyebrow: 'Demo',
      title: 'Let’s build the Traxle universe for your product.',
      description:
        'Leave a short note and we will respond about scope, 3D experience level, and production architecture.',
      name: 'Full name',
      email: 'Email',
      message: 'Message',
      submit: 'Send demo request',
    },
    cta: {
      title: 'Start the next project with a premium foundation.',
      description: 'New products, portals, and 3D model files can be added to the Traxle universe easily.',
      label: 'Request Demo',
    },
    footer: {
      description: 'A premium technology ecosystem for mobile, desktop, and web products.',
      rights: 'All rights reserved.',
    },
  },
  de: {
    dir: 'ltr',
    languageLabel: 'Sprache',
    themeLabel: 'Design wechseln',
    nav: {
      home: 'Start',
      projects: 'Projekte',
      about: 'Über uns',
      services: 'Services',
      contact: 'Kontakt',
    },
    status: {
      active: 'Aktiv',
      development: 'Entwicklung',
      concept: 'Konzept',
    },
    home: {
      eyebrow: 'Traxle Project Universe',
      title: 'Ein 3D-Technologieuniversum für mobile und Desktop-Produkte.',
      description:
        'Traxle vereint Projektplattformen, 3D-Weboberflächen und produktionsreife Softwarearchitektur unter einem hochwertigen digitalen Dach.',
      primaryCta: 'Projekte entdecken',
      secondaryCta: 'Demo anfragen',
      proof: ['3D-Interface-Architektur', 'Produktökosystem', 'Performance-orientierte Entwicklung'],
      processTitle: 'Ein digitaler Auftritt wie eine Enterprise-Produktlinie',
      processDescription:
        'Traxle verbindet Strategie, Architektur, Interface-Design und Launch-Readiness zu einem kontrollierten Erlebnisfluss.',
      process: [
        {
          value: '01',
          label: 'Strategie',
          description: 'Portfolio, Zielgruppe und Markenwirkung werden in einer gemeinsamen Ökosystem-Vision ausgerichtet.',
        },
        {
          value: '02',
          label: 'Architektur',
          description: 'Web-, Mobile- und Desktop-Oberflächen entstehen auf einer skalierbaren technischen Grundlage.',
        },
        {
          value: '03',
          label: 'Erlebnis',
          description: '3D-Atmosphäre, lesbare HTML-Inhalte und barrierearme Navigation folgen einer Designsprache.',
        },
        {
          value: '04',
          label: 'Launch',
          description: 'Performance, SEO und responsives Verhalten werden an Produktionsanforderungen geprüft.',
        },
      ],
      hubTitle: 'Skalierbare Projekte unter einem Dach',
      hubDescription:
        'Bestehende und zukünftige Produkte teilen dieselbe Datenstruktur, Designsprache und zugängliche Weberfahrung.',
    },
    projects: {
      eyebrow: 'Project Hub',
      title: 'Alle Produktoberflächen im Traxle-Ökosystem.',
      description:
        'Jedes Projekt erscheint im selben Universum mit einem lebendigen 3D-Portal und lesbarer HTML-Inhaltsebene.',
      openProject: 'Projekt öffnen',
    },
    detail: {
      features: 'Kernfunktionen',
      model: '3D-Modellbereich',
      overview: 'Projektüberblick',
    },
    about: {
      eyebrow: 'Vision',
      title: 'Traxle macht Produktentwicklung zu einem Ökosystem aus Engineering und Design.',
      description:
        'Der Fokus liegt darauf, mobile, Desktop- und Webprodukte in konsistente, messbare und hochwertige digitale Erlebnisse zu verwandeln.',
      points: ['Zukunftsfähige Architektur', 'Konsistente Produktsprache', 'Design nach realen Nutzerflüssen'],
    },
    services: {
      eyebrow: 'Services',
      title: 'End-to-End Design und Engineering für Premium-Softwareprodukte.',
      description:
        'Von 3D-Weberlebnissen bis zu Produktplattformen wird jede Ebene auf Performance, Zugänglichkeit und wartbaren Code ausgelegt.',
      items: [
        {
          title: '3D-Weboberflächen',
          description: 'Premium-Interfaces mit WebGL, React Three Fiber und HTML UI.',
        },
        {
          title: 'Produktplattformen',
          description: 'Mobile, Desktop- und Webprodukte unter gemeinsamen Daten- und Designsystemen vereinen.',
        },
        {
          title: 'Softwarearchitektur',
          description: 'Skalierbare Next.js-, API-, Daten- und Deployment-Architekturen.',
        },
        {
          title: 'Digital Experience Design',
          description: 'User Flows, Interaktionssprache und produktionsreife Interface-Systeme.',
        },
      ],
    },
    contact: {
      eyebrow: 'Demo',
      title: 'Lassen Sie uns das Traxle-Universum für Ihr Produkt bauen.',
      description:
        'Hinterlassen Sie eine kurze Nachricht; wir melden uns zu Umfang, 3D-Erlebnis und Produktionsarchitektur.',
      name: 'Name',
      email: 'E-Mail',
      message: 'Nachricht',
      submit: 'Demo-Anfrage senden',
    },
    cta: {
      title: 'Starten Sie das nächste Projekt mit einer Premium-Basis.',
      description: 'Neue Produkte, Portale und 3D-Modelldateien lassen sich einfach in das Traxle-Universum integrieren.',
      label: 'Demo anfragen',
    },
    footer: {
      description: 'Ein Premium-Technologieökosystem für mobile, Desktop- und Webprodukte.',
      rights: 'Alle Rechte vorbehalten.',
    },
  },
  ar: {
    dir: 'rtl',
    languageLabel: 'اللغة',
    themeLabel: 'تبديل المظهر',
    nav: {
      home: 'الرئيسية',
      projects: 'المشاريع',
      about: 'عن تراكسل',
      services: 'الخدمات',
      contact: 'تواصل',
    },
    status: {
      active: 'نشط',
      development: 'قيد التطوير',
      concept: 'تصور',
    },
    home: {
      eyebrow: 'Traxle Project Universe',
      title: 'كون تقني ثلاثي الأبعاد لمنتجات الجوال وسطح المكتب.',
      description:
        'تجمع Traxle منصات المشاريع وواجهات الويب ثلاثية الأبعاد وبنية البرمجيات الجاهزة للإنتاج ضمن تجربة رقمية فاخرة واحدة.',
      primaryCta: 'استكشف المشاريع',
      secondaryCta: 'اطلب عرضا تجريبيا',
      proof: ['هندسة واجهات ثلاثية الأبعاد', 'منظومة منتجات', 'هندسة عالية الأداء'],
      processTitle: 'واجهة رقمية تعمل كخط منتجات مؤسسي',
      processDescription:
        'تربط Traxle بين الاستراتيجية والبنية وتصميم الواجهة وجاهزية الإطلاق ضمن مسار تجربة واحد ومنضبط.',
      process: [
        {
          value: '01',
          label: 'الاستراتيجية',
          description: 'تتوافق محفظة المنتجات والجمهور وانطباع العلامة ضمن رؤية موحدة للمنظومة.',
        },
        {
          value: '02',
          label: 'البنية',
          description: 'تصمم واجهات الويب والجوال وسطح المكتب على أساس تقني قابل للتوسع.',
        },
        {
          value: '03',
          label: 'التجربة',
          description: 'تجتمع الأجواء ثلاثية الأبعاد ومحتوى HTML المقروء والتنقل الواضح في لغة تصميم واحدة.',
        },
        {
          value: '04',
          label: 'الإطلاق',
          description: 'يتم فحص الأداء وSEO والسلوك المتجاوب وفق توقعات بيئة الإنتاج.',
        },
      ],
      hubTitle: 'مشاريع قابلة للتوسع تحت سقف واحد',
      hubDescription:
        'المنتجات الحالية والمستقبلية تشترك في بنية بيانات واحدة ولغة بصرية موحدة وتجربة ويب سهلة الوصول.',
    },
    projects: {
      eyebrow: 'Project Hub',
      title: 'كل أسطح المنتجات داخل منظومة Traxle.',
      description:
        'يعيش كل مشروع في الكون نفسه عبر بوابة ثلاثية الأبعاد وطبقة محتوى HTML واضحة وقابلة للقراءة.',
      openProject: 'افتح المشروع',
    },
    detail: {
      features: 'الميزات الرئيسية',
      model: 'منطقة النموذج ثلاثي الأبعاد',
      overview: 'ملخص المشروع',
    },
    about: {
      eyebrow: 'الرؤية',
      title: 'تحول Traxle تطوير المنتجات إلى منظومة تجمع الهندسة والتصميم.',
      description:
        'ينصب التركيز على تحويل منتجات الجوال وسطح المكتب والويب إلى تجارب رقمية متسقة وقابلة للقياس وعالية الجودة.',
      points: ['بنية جاهزة للمستقبل', 'لغة منتجات متسقة', 'تصميم مبني على تدفقات استخدام حقيقية'],
    },
    services: {
      eyebrow: 'الخدمات',
      title: 'تصميم وهندسة شاملة لمنتجات برمجية فاخرة.',
      description:
        'من تجارب الويب ثلاثية الأبعاد إلى منصات المنتجات، تصمم كل طبقة للأداء وإمكانية الوصول وقابلية الصيانة.',
      items: [
        {
          title: 'واجهات ويب ثلاثية الأبعاد',
          description: 'واجهات فاخرة وسهلة الوصول تجمع WebGL وReact Three Fiber وHTML UI.',
        },
        {
          title: 'منصات المنتجات',
          description: 'توحيد منتجات الجوال وسطح المكتب والويب تحت بيانات وأنظمة تصميم مشتركة.',
        },
        {
          title: 'هندسة البرمجيات',
          description: 'بنى Next.js وAPI وبيانات ونشر قابلة للتوسع.',
        },
        {
          title: 'تصميم التجارب الرقمية',
          description: 'تدفقات المستخدم ولغة التفاعل وأنظمة واجهات جاهزة للإنتاج.',
        },
      ],
    },
    contact: {
      eyebrow: 'عرض تجريبي',
      title: 'لنبن كون Traxle لمنتجك.',
      description:
        'اترك رسالة قصيرة وسنعود إليك حول نطاق المشروع ومستوى التجربة ثلاثية الأبعاد وبنية الإنتاج.',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      message: 'الرسالة',
      submit: 'إرسال طلب العرض',
    },
    cta: {
      title: 'ابدأ المشروع التالي بأساس فاخر.',
      description: 'يمكن إضافة منتجات وبوابات وملفات نماذج ثلاثية الأبعاد جديدة إلى كون Traxle بسهولة.',
      label: 'اطلب عرضا تجريبيا',
    },
    footer: {
      description: 'منظومة تقنية فاخرة لمنتجات الجوال وسطح المكتب والويب.',
      rights: 'جميع الحقوق محفوظة.',
    },
  },
  ru: {
    dir: 'ltr',
    languageLabel: 'Язык',
    themeLabel: 'Переключить тему',
    nav: {
      home: 'Главная',
      projects: 'Проекты',
      about: 'О нас',
      services: 'Услуги',
      contact: 'Контакты',
    },
    status: {
      active: 'Активно',
      development: 'В разработке',
      concept: 'Концепт',
    },
    home: {
      eyebrow: 'Traxle Project Universe',
      title: '3D-технологическая вселенная для мобильных и настольных продуктов.',
      description:
        'Traxle объединяет проектные платформы, 3D веб-интерфейсы и production-ready архитектуру в единую премиальную цифровую систему.',
      primaryCta: 'Посмотреть проекты',
      secondaryCta: 'Запросить демо',
      proof: ['Архитектура 3D-интерфейсов', 'Экосистема продуктов', 'Инженерия с фокусом на производительность'],
      processTitle: 'Цифровая витрина, построенная как корпоративная продуктовая линия',
      processDescription:
        'Traxle объединяет стратегию, архитектуру, интерфейс и готовность к запуску в единый управляемый поток опыта.',
      process: [
        {
          value: '01',
          label: 'Стратегия',
          description: 'Портфель, аудитория и восприятие бренда выстраиваются вокруг единого видения экосистемы.',
        },
        {
          value: '02',
          label: 'Архитектура',
          description: 'Веб-, мобильные и настольные поверхности проектируются на масштабируемой технической основе.',
        },
        {
          value: '03',
          label: 'Опыт',
          description: '3D-атмосфера, читаемый HTML-контент и доступная навигация работают в одном дизайн-языке.',
        },
        {
          value: '04',
          label: 'Запуск',
          description: 'Производительность, SEO и адаптивность проверяются по ожиданиям production-среды.',
        },
      ],
      hubTitle: 'Масштабируемые проекты под одной крышей',
      hubDescription:
        'Текущие и будущие продукты используют общую структуру данных, визуальный язык и доступный веб-опыт.',
    },
    projects: {
      eyebrow: 'Project Hub',
      title: 'Все продуктовые поверхности экосистемы Traxle.',
      description:
        'Каждый проект существует в единой вселенной через 3D-портал и читаемый HTML-слой контента.',
      openProject: 'Открыть проект',
    },
    detail: {
      features: 'Ключевые функции',
      model: 'Область 3D-модели',
      overview: 'Обзор проекта',
    },
    about: {
      eyebrow: 'Видение',
      title: 'Traxle превращает разработку продуктов в экосистему инженерии и дизайна.',
      description:
        'Фокус компании — превращать мобильные, настольные и веб-продукты в согласованные, измеримые и качественные цифровые впечатления.',
      points: ['Архитектура, готовая к будущему', 'Единый язык продукта', 'Дизайн на основе реальных пользовательских сценариев'],
    },
    services: {
      eyebrow: 'Услуги',
      title: 'Дизайн и инженерия полного цикла для премиальных программных продуктов.',
      description:
        'От 3D веб-опыта до продуктовых платформ, каждый слой проектируется с учетом производительности, доступности и поддерживаемого кода.',
      items: [
        {
          title: '3D веб-интерфейсы',
          description: 'Премиальные доступные интерфейсы на базе WebGL, React Three Fiber и HTML UI.',
        },
        {
          title: 'Продуктовые платформы',
          description: 'Объединение мобильных, настольных и веб-продуктов через общие данные и дизайн-системы.',
        },
        {
          title: 'Архитектура ПО',
          description: 'Масштабируемые архитектуры Next.js, API, данных и деплоя.',
        },
        {
          title: 'Дизайн цифрового опыта',
          description: 'Пользовательские сценарии, язык взаимодействий и production-ready системы интерфейсов.',
        },
      ],
    },
    contact: {
      eyebrow: 'Демо',
      title: 'Давайте создадим вселенную Traxle для вашего продукта.',
      description:
        'Оставьте короткое сообщение, и мы ответим по поводу объема, уровня 3D-опыта и production-архитектуры.',
      name: 'Имя',
      email: 'Email',
      message: 'Сообщение',
      submit: 'Отправить запрос',
    },
    cta: {
      title: 'Начните следующий проект с премиальной основы.',
      description: 'Новые продукты, порталы и 3D-модели можно легко добавить во вселенную Traxle.',
      label: 'Запросить демо',
    },
    footer: {
      description: 'Премиальная технологическая экосистема для мобильных, настольных и веб-продуктов.',
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
      return normalizeSegment(localizedSlug) === normalizedSegment || key === normalizedSegment;
    }) ?? null
  );
}

export function getLocalizedPath(locale: Locale, routeKey: RouteKey, rest: string[] = []) {
  const localizedSlug = localizedRouteSlugs[routeKey][locale];
  const suffix = rest.filter(Boolean).join('/');
  return `/${locale}/${localizedSlug}${suffix ? `/${suffix}` : ''}`;
}

export function withLocale(locale: Locale, path = '') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const segments = normalizedPath.split('/').filter(Boolean);
  const pathSegments = isLocale(segments[0]) ? segments.slice(1) : segments;

  if (pathSegments.length === 0) {
    return `/${locale}`;
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
    const routeKey = resolveLocalizedRouteKey(currentLocale, segments[1]);

    if (routeKey) {
      return getLocalizedPath(nextLocale, routeKey, segments.slice(2));
    }

    segments[0] = nextLocale;
    return `/${segments.join('/')}`;
  }

  return withLocale(nextLocale, pathname);
}
