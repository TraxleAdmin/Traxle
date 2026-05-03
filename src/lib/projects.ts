import type { Locale } from '@/lib/i18n';
import { defaultLocale, withLocale } from '@/lib/i18n';

export type ProjectStatus = 'active' | 'development' | 'concept';

export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  status: ProjectStatus;
  modelPath?: string;
  accent: string;
  features: string[];
  cta: {
    label: string;
    href: string;
  };
};

const baseProjects = [
  {
    slug: 'traxle-core',
    title: 'Traxle Core',
    status: 'active',
    accent: '#00c2ff',
    modelPath: undefined,
  },
  {
    slug: 'traxle-studio',
    title: 'Traxle Studio',
    status: 'development',
    accent: '#ffffff',
    modelPath: undefined,
  },
  {
    slug: 'traxle-vision',
    title: 'Traxle Vision',
    status: 'concept',
    accent: '#7dd3fc',
    modelPath: undefined,
  },
  {
    slug: 'traxle-labs',
    title: 'Traxle Labs',
    status: 'development',
    accent: '#38bdf8',
    modelPath: undefined,
  },
] as const satisfies ReadonlyArray<{
  slug: string;
  title: string;
  status: ProjectStatus;
  accent: string;
  modelPath?: string;
}>;

type LocalizedProjectCopy = Omit<Project, 'slug' | 'title' | 'status' | 'accent' | 'modelPath'>;

const localizedProjectCopy: Record<Locale, Record<(typeof baseProjects)[number]['slug'], LocalizedProjectCopy>> = {
  tr: {
    'traxle-core': {
      shortDescription: 'Ürün evreninin operasyon, veri ve ölçeklenebilirlik merkezi.',
      longDescription:
        'Traxle Core, farklı mobil ve masaüstü ürünleri aynı veri düzeni, rol yapısı ve üretim standardı altında birleştirmek için tasarlanan temel platform katmanıdır.',
      category: 'Platform altyapısı',
      features: ['Çok ürünlü kontrol mimarisi', 'Gerçek zamanlı veri akışlarına hazır yapı', 'Modüler rol ve izin mantığı'],
      cta: { label: 'Core için demo talep et', href: '/contact' },
    },
    'traxle-studio': {
      shortDescription: 'Yeni ürün yüzeyleri için tasarım, prototip ve deneyim üretim alanı.',
      longDescription:
        'Traxle Studio, ürün fikirlerini 3D web arayüzleri, etkileşim prototipleri ve üretime hazır tasarım sistemlerine dönüştüren kreatif geliştirme alanıdır.',
      category: 'Dijital deneyim',
      features: ['3D arayüz prototipleri', 'Tutarlı tasarım sistemi', 'Hızlı ürün vitrini oluşturma'],
      cta: { label: 'Studio sürecini görüş', href: '/contact' },
    },
    'traxle-vision': {
      shortDescription: 'Veri, analiz ve yapay zeka destekli karar ekranları için konsept katmanı.',
      longDescription:
        'Traxle Vision, karmaşık sistem verilerini okunabilir panellere, görsel akışlara ve gelecekteki zeka destekli ürün katmanlarına bağlamak için kurgulanır.',
      category: 'Analitik ve zeka',
      features: ['Görsel veri katmanları', 'Yönetici panellerine uygun yapı', 'Gelecek AI entegrasyonlarına hazır mimari'],
      cta: { label: 'Vision konseptini keşfet', href: '/contact' },
    },
    'traxle-labs': {
      shortDescription: 'Yeni ürün fikirlerinin denendiği deneysel mühendislik alanı.',
      longDescription:
        'Traxle Labs, 3D web, masaüstü araçları ve mobil ürün fikirlerini düşük riskle test etmek, ölçmek ve olgunlaştırmak için tasarlanmıştır.',
      category: 'Ar-Ge',
      features: ['Hızlı MVP doğrulama', 'Deneysel 3D ürün arayüzleri', 'Gelecek projeler için teknoloji keşfi'],
      cta: { label: 'Labs ile yeni fikir başlat', href: '/contact' },
    },
  },
  en: {
    'traxle-core': {
      shortDescription: 'The operational, data, and scalability center of the product universe.',
      longDescription:
        'Traxle Core is the foundational platform layer designed to unify mobile and desktop products under one data model, role structure, and production standard.',
      category: 'Platform infrastructure',
      features: ['Multi-product control architecture', 'Ready for real-time data flows', 'Modular role and permission logic'],
      cta: { label: 'Request a Core demo', href: '/contact' },
    },
    'traxle-studio': {
      shortDescription: 'A design, prototype, and experience production space for new product surfaces.',
      longDescription:
        'Traxle Studio turns product ideas into 3D web interfaces, interaction prototypes, and production-ready design systems.',
      category: 'Digital experience',
      features: ['3D interface prototypes', 'Consistent design system', 'Fast product showcase creation'],
      cta: { label: 'Discuss the Studio process', href: '/contact' },
    },
    'traxle-vision': {
      shortDescription: 'A concept layer for data, analytics, and AI-assisted decision screens.',
      longDescription:
        'Traxle Vision connects complex system data to readable panels, visual flows, and future intelligence-driven product layers.',
      category: 'Analytics and intelligence',
      features: ['Visual data layers', 'Executive dashboard structure', 'Architecture ready for future AI integrations'],
      cta: { label: 'Explore the Vision concept', href: '/contact' },
    },
    'traxle-labs': {
      shortDescription: 'An experimental engineering space where new product ideas are tested.',
      longDescription:
        'Traxle Labs is designed to test, measure, and mature 3D web, desktop tool, and mobile product ideas with lower risk.',
      category: 'R&D',
      features: ['Fast MVP validation', 'Experimental 3D product interfaces', 'Technology discovery for future projects'],
      cta: { label: 'Start a new idea with Labs', href: '/contact' },
    },
  },
  de: {
    'traxle-core': {
      shortDescription: 'Das Betriebs-, Daten- und Skalierungszentrum des Produktuniversums.',
      longDescription:
        'Traxle Core ist die grundlegende Plattformschicht, die mobile und Desktop-Produkte unter einem Datenmodell, Rollenmodell und Produktionsstandard vereint.',
      category: 'Plattform-Infrastruktur',
      features: ['Kontrollarchitektur für mehrere Produkte', 'Bereit für Echtzeit-Datenflüsse', 'Modulare Rollen- und Berechtigungslogik'],
      cta: { label: 'Core-Demo anfragen', href: '/contact' },
    },
    'traxle-studio': {
      shortDescription: 'Ein Design-, Prototyping- und Experience-Bereich für neue Produktoberflächen.',
      longDescription:
        'Traxle Studio verwandelt Produktideen in 3D-Weboberflächen, Interaktionsprototypen und produktionsreife Designsysteme.',
      category: 'Digital Experience',
      features: ['3D-Interface-Prototypen', 'Konsistentes Designsystem', 'Schnelle Erstellung von Produktpräsentationen'],
      cta: { label: 'Studio-Prozess besprechen', href: '/contact' },
    },
    'traxle-vision': {
      shortDescription: 'Eine Konzeptschicht für Daten-, Analyse- und KI-gestützte Entscheidungsbildschirme.',
      longDescription:
        'Traxle Vision verbindet komplexe Systemdaten mit lesbaren Panels, visuellen Flows und zukünftigen intelligenten Produktschichten.',
      category: 'Analyse und Intelligenz',
      features: ['Visuelle Datenschichten', 'Struktur für Management-Dashboards', 'Architektur für zukünftige KI-Integrationen'],
      cta: { label: 'Vision-Konzept entdecken', href: '/contact' },
    },
    'traxle-labs': {
      shortDescription: 'Ein experimenteller Engineering-Bereich zum Testen neuer Produktideen.',
      longDescription:
        'Traxle Labs testet, misst und entwickelt 3D-Web-, Desktop-Tool- und mobile Produktideen mit geringerem Risiko weiter.',
      category: 'Forschung und Entwicklung',
      features: ['Schnelle MVP-Validierung', 'Experimentelle 3D-Produktinterfaces', 'Technologieerkundung für zukünftige Projekte'],
      cta: { label: 'Neue Idee mit Labs starten', href: '/contact' },
    },
  },
  ar: {
    'traxle-core': {
      shortDescription: 'مركز التشغيل والبيانات وقابلية التوسع في كون المنتجات.',
      longDescription:
        'Traxle Core هو طبقة المنصة الأساسية المصممة لتوحيد منتجات الجوال وسطح المكتب ضمن نموذج بيانات وأدوار ومعايير إنتاج واحدة.',
      category: 'بنية المنصة',
      features: ['معمارية تحكم لعدة منتجات', 'جاهزية لتدفقات البيانات الفورية', 'منطق أدوار وصلاحيات معياري'],
      cta: { label: 'اطلب عرض Core', href: '/contact' },
    },
    'traxle-studio': {
      shortDescription: 'مساحة تصميم ونمذجة وتجربة لواجهات المنتجات الجديدة.',
      longDescription:
        'Traxle Studio يحول أفكار المنتجات إلى واجهات ويب ثلاثية الأبعاد ونماذج تفاعلية وأنظمة تصميم جاهزة للإنتاج.',
      category: 'تجربة رقمية',
      features: ['نماذج واجهات ثلاثية الأبعاد', 'نظام تصميم متسق', 'إنشاء سريع لعروض المنتجات'],
      cta: { label: 'ناقش مسار Studio', href: '/contact' },
    },
    'traxle-vision': {
      shortDescription: 'طبقة تصور لشاشات القرار المدعومة بالبيانات والتحليلات والذكاء الاصطناعي.',
      longDescription:
        'Traxle Vision يربط بيانات الأنظمة المعقدة بلوحات واضحة وتدفقات مرئية وطبقات منتجات ذكية مستقبلية.',
      category: 'تحليلات وذكاء',
      features: ['طبقات بيانات مرئية', 'بنية مناسبة للوحات الإدارة', 'معمارية جاهزة لتكاملات الذكاء الاصطناعي'],
      cta: { label: 'استكشف تصور Vision', href: '/contact' },
    },
    'traxle-labs': {
      shortDescription: 'مساحة هندسية تجريبية لاختبار أفكار المنتجات الجديدة.',
      longDescription:
        'Traxle Labs مصمم لاختبار وقياس وتطوير أفكار الويب ثلاثية الأبعاد وأدوات سطح المكتب ومنتجات الجوال بمخاطر أقل.',
      category: 'بحث وتطوير',
      features: ['تحقق سريع من MVP', 'واجهات منتجات ثلاثية الأبعاد تجريبية', 'استكشاف تقني للمشاريع المستقبلية'],
      cta: { label: 'ابدأ فكرة جديدة مع Labs', href: '/contact' },
    },
  },
  ru: {
    'traxle-core': {
      shortDescription: 'Операционный, data- и scale-центр продуктовой вселенной.',
      longDescription:
        'Traxle Core — базовый платформенный слой, созданный для объединения мобильных и настольных продуктов под общей моделью данных, ролей и production-стандартом.',
      category: 'Платформенная инфраструктура',
      features: ['Архитектура управления несколькими продуктами', 'Готовность к real-time потокам данных', 'Модульная логика ролей и прав'],
      cta: { label: 'Запросить демо Core', href: '/contact' },
    },
    'traxle-studio': {
      shortDescription: 'Пространство дизайна, прототипирования и создания опыта для новых продуктовых поверхностей.',
      longDescription:
        'Traxle Studio превращает продуктовые идеи в 3D веб-интерфейсы, интерактивные прототипы и production-ready дизайн-системы.',
      category: 'Цифровой опыт',
      features: ['Прототипы 3D-интерфейсов', 'Единая дизайн-система', 'Быстрое создание продуктовой витрины'],
      cta: { label: 'Обсудить процесс Studio', href: '/contact' },
    },
    'traxle-vision': {
      shortDescription: 'Концептуальный слой для данных, аналитики и AI-assisted экранов решений.',
      longDescription:
        'Traxle Vision связывает сложные системные данные с читаемыми панелями, визуальными потоками и будущими интеллектуальными продуктовыми слоями.',
      category: 'Аналитика и интеллект',
      features: ['Визуальные слои данных', 'Структура для executive dashboards', 'Архитектура для будущих AI-интеграций'],
      cta: { label: 'Изучить концепт Vision', href: '/contact' },
    },
    'traxle-labs': {
      shortDescription: 'Экспериментальное инженерное пространство для проверки новых продуктовых идей.',
      longDescription:
        'Traxle Labs помогает тестировать, измерять и развивать идеи 3D web, desktop-инструментов и мобильных продуктов с меньшим риском.',
      category: 'R&D',
      features: ['Быстрая проверка MVP', 'Экспериментальные 3D-продуктовые интерфейсы', 'Поиск технологий для будущих проектов'],
      cta: { label: 'Запустить идею с Labs', href: '/contact' },
    },
  },
};

export const projects = getProjects(defaultLocale);

export function getProjects(locale: Locale = defaultLocale): Project[] {
  const copy = localizedProjectCopy[locale];

  return baseProjects.map((project) => ({
    ...project,
    ...copy[project.slug],
    cta: {
      ...copy[project.slug].cta,
      href: withLocale(locale, copy[project.slug].cta.href),
    },
  }));
}

export function getProjectBySlug(slug: string, locale: Locale = defaultLocale) {
  return getProjects(locale).find((project) => project.slug === slug);
}

export function getProjectSlugs() {
  return baseProjects.map((project) => project.slug);
}
