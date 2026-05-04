import type { Locale, ProductVisualKind } from '@/lib/i18n';
import { defaultLocale, getMolatikPrivacyPath, withLocale } from '@/lib/i18n';

export type ProjectStatus = 'active' | 'development' | 'concept';

export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  detail: string;
  longDescription: string;
  category: string;
  status: ProjectStatus;
  modelPath?: string;
  accent: string;
  visualKind: ProductVisualKind;
  features: string[];
  useCases: string[];
  cardCta: string;
  cta: {
    label: string;
    href: string;
  };
  privacyHref?: string;
};

const baseProjects = [
  {
    slug: 'barkodx',
    title: 'BarkodX',
    status: 'development',
    accent: '#22d3ee',
    visualKind: 'barcode',
    modelPath: undefined,
  },
  {
    slug: 'molatik',
    title: 'Molatik',
    status: 'active',
    accent: '#8b5cf6',
    visualKind: 'timer',
    modelPath: undefined,
  },
  {
    slug: 'kunyex',
    title: 'KünyeX',
    status: 'development',
    accent: '#38bdf8',
    visualKind: 'document',
    modelPath: undefined,
  },
  {
    slug: 'lojistik',
    title: 'Lojistik',
    status: 'development',
    accent: '#60a5fa',
    visualKind: 'logistics',
    modelPath: undefined,
  },
] as const satisfies ReadonlyArray<{
  slug: string;
  title: string;
  status: ProjectStatus;
  accent: string;
  visualKind: ProductVisualKind;
  modelPath?: string;
}>;

type ProjectSlug = (typeof baseProjects)[number]['slug'];
type LocalizedProjectCopy = Omit<Project, 'slug' | 'title' | 'status' | 'accent' | 'visualKind' | 'modelPath' | 'privacyHref'>;

const localizedProjectCopy: Record<Locale, Record<ProjectSlug, LocalizedProjectCopy>> = {
  tr: {
    barkodx: {
      shortDescription: 'Stok ve fiyat yönetimini kontrol altına al.',
      detail: 'Barkod, ürün, fiyat ve stok süreçlerini daha hızlı ve düzenli yönet.',
      longDescription:
        'BarkodX, ürün kayıtlarını, barkod takibini, fiyat güncellemelerini ve stok görünürlüğünü daha düzenli yönetmek isteyen işletmeler için geliştirilir.',
      category: 'Stok ve fiyat yönetimi',
      features: ['Barkod ve ürün kartı takibi', 'Fiyat değişikliklerini daha düzenli yönetme', 'Stok kayıtlarını hızlı kontrol etme', 'Ürün arama ve listeleme akışı'],
      useCases: ['Market ve mağaza ürün yönetimi', 'Depo stok kontrolü', 'Fiyat etiketi hazırlığı', 'Ürün kartı düzenleme'],
      cardCta: 'BarkodX’i İncele',
      cta: { label: 'BarkodX için demo talep et', href: '/contact' },
    },
    molatik: {
      shortDescription: 'Personel mola ve vardiya süreçlerini takip et.',
      detail: 'Çalışan molalarını, vardiya düzenini ve operasyon içi zaman takibini kolaylaştır.',
      longDescription:
        'Molatik, personel molalarını, vardiya durumlarını ve günlük zaman takibini daha görünür hale getiren operasyon uygulamasıdır.',
      category: 'Personel zaman takibi',
      features: ['Mola başlangıç ve bitiş takibi', 'Vardiya düzeni görünürlüğü', 'Personel durum kontrolü', 'Günlük kullanım istatistikleri'],
      useCases: ['Şube personeli mola takibi', 'Vardiya içi zaman kontrolü', 'Yönetici operasyon özeti', 'Ekip yoğunluğu izleme'],
      cardCta: 'Molatik’i İncele',
      cta: { label: 'Molatik için demo talep et', href: '/contact' },
    },
    kunyex: {
      shortDescription: 'Ürün künyesi ve belge verilerini otomatik çıkar.',
      detail: 'Belgelerden, ürün bilgilerinden ve künye içeriklerinden düzenli veri üret.',
      longDescription:
        'KünyeX, PDF ve doküman içeriklerinden ürün bilgilerini daha düzenli çıkarmak, künye verisi oluşturmak ve manuel giriş yükünü azaltmak için tasarlanır.',
      category: 'Belge ve künye verisi',
      features: ['PDF ve doküman işleme akışı', 'Ürün künyesi veri çıkarımı', 'Satırları veri alanlarına dönüştürme', 'Manuel giriş yükünü azaltma'],
      useCases: ['Ürün künyesi hazırlama', 'Fatura veya PDF bilgisini düzenleme', 'Belgeden ürün alanları çıkarma', 'Şube ve depo doküman akışı'],
      cardCta: 'KünyeX’i İncele',
      cta: { label: 'KünyeX için demo talep et', href: '/contact' },
    },
    lojistik: {
      shortDescription: 'Taşıma ve saha operasyonlarını yönet.',
      detail: 'Rota, teslimat, saha akışı ve operasyon süreçlerini daha görünür hale getir.',
      longDescription:
        'Lojistik, taşıma akışlarını, teslimat noktalarını, rota görünürlüğünü ve saha operasyonlarını daha takip edilebilir hale getiren ürün katmanıdır.',
      category: 'Saha ve taşıma operasyonu',
      features: ['Rota ve teslimat takibi', 'Saha operasyon görünürlüğü', 'Hareketli nokta ve görev akışı', 'Operasyon kayıtlarını düzenleme'],
      useCases: ['Teslimat süreci izleme', 'Saha ekip akışı', 'Rota planlama görünürlüğü', 'Taşıma operasyonu kontrolü'],
      cardCta: 'Lojistik’i İncele',
      cta: { label: 'Lojistik için demo talep et', href: '/contact' },
    },
  },
  en: {
    barkodx: {
      shortDescription: 'Take control of inventory and price management.',
      detail: 'Manage barcode, product, price, and stock processes faster and with more order.',
      longDescription:
        'BarkodX is built for businesses that need clearer product records, barcode tracking, price updates, and inventory visibility.',
      category: 'Inventory and price management',
      features: ['Barcode and product card tracking', 'More organized price updates', 'Fast inventory record checks', 'Product search and listing flow'],
      useCases: ['Retail product management', 'Warehouse stock control', 'Price label preparation', 'Product card editing'],
      cardCta: 'View BarkodX',
      cta: { label: 'Request a BarkodX demo', href: '/contact' },
    },
    molatik: {
      shortDescription: 'Track staff break and shift processes.',
      detail: 'Simplify employee breaks, shift order, and operational time tracking.',
      longDescription:
        'Molatik makes staff breaks, shift status, and daily time tracking more visible for operation teams.',
      category: 'Staff time tracking',
      features: ['Break start and finish tracking', 'Shift order visibility', 'Staff status control', 'Daily usage statistics'],
      useCases: ['Branch staff break tracking', 'Shift time control', 'Manager operation summary', 'Team workload visibility'],
      cardCta: 'View Molatik',
      cta: { label: 'Request a Molatik demo', href: '/contact' },
    },
    kunyex: {
      shortDescription: 'Extract product identity and document data automatically.',
      detail: 'Create structured data from documents, product information, and identity content.',
      longDescription:
        'KünyeX is designed to extract product information from PDFs and documents, create product identity data, and reduce manual entry work.',
      category: 'Document and product data',
      features: ['PDF and document processing flow', 'Product identity data extraction', 'Turning rows into data fields', 'Reducing manual data entry'],
      useCases: ['Product identity preparation', 'Invoice or PDF information cleanup', 'Document-to-product field extraction', 'Branch and warehouse document flow'],
      cardCta: 'View KünyeX',
      cta: { label: 'Request a KünyeX demo', href: '/contact' },
    },
    lojistik: {
      shortDescription: 'Manage transport and field operations.',
      detail: 'Make route, delivery, field flow, and operational processes more visible.',
      longDescription:
        'Logistics makes transport flows, delivery points, route visibility, and field operations easier to follow.',
      category: 'Field and transport operations',
      features: ['Route and delivery tracking', 'Field operation visibility', 'Moving point and task flow', 'Organized operation records'],
      useCases: ['Delivery process monitoring', 'Field team flow', 'Route planning visibility', 'Transport operation control'],
      cardCta: 'View Logistics',
      cta: { label: 'Request a Logistics demo', href: '/contact' },
    },
  },
  de: {
    barkodx: {
      shortDescription: 'Bestand und Preisverwaltung unter Kontrolle bringen.',
      detail: 'Barcode-, Produkt-, Preis- und Lagerprozesse schneller und geordneter verwalten.',
      longDescription:
        'BarkodX ist für Unternehmen gedacht, die Produktdaten, Barcode-Verfolgung, Preisänderungen und Bestandsübersicht klarer steuern möchten.',
      category: 'Bestands- und Preisverwaltung',
      features: ['Barcode- und Produktkarten verfolgen', 'Preisänderungen geordneter verwalten', 'Bestandsdaten schnell prüfen', 'Produktsuche und Listenfluss'],
      useCases: ['Produktverwaltung im Handel', 'Lagerbestandskontrolle', 'Vorbereitung von Preisschildern', 'Bearbeitung von Produktkarten'],
      cardCta: 'BarkodX ansehen',
      cta: { label: 'BarkodX Demo anfragen', href: '/contact' },
    },
    molatik: {
      shortDescription: 'Pausen- und Schichtprozesse des Personals verfolgen.',
      detail: 'Mitarbeiterpausen, Schichtordnung und operative Zeiterfassung vereinfachen.',
      longDescription:
        'Molatik macht Personalpausen, Schichtstatus und tägliche Zeiterfassung für Operationsteams sichtbarer.',
      category: 'Personal-Zeiterfassung',
      features: ['Pausenstart und Pausenende verfolgen', 'Schichtordnung sichtbar machen', 'Personalstatus kontrollieren', 'Tägliche Nutzungsstatistiken'],
      useCases: ['Pausenverfolgung in Filialen', 'Zeitkontrolle innerhalb der Schicht', 'Operationsübersicht für Manager', 'Team-Auslastung beobachten'],
      cardCta: 'Molatik ansehen',
      cta: { label: 'Molatik Demo anfragen', href: '/contact' },
    },
    kunyex: {
      shortDescription: 'Produktkennzeichen und Dokumentdaten automatisch extrahieren.',
      detail: 'Strukturierte Daten aus Dokumenten, Produktinformationen und Kennzeichnungsinhalten erzeugen.',
      longDescription:
        'KünyeX extrahiert Produktinformationen aus PDFs und Dokumenten, erstellt Produktkennzeichnungsdaten und reduziert manuelle Eingaben.',
      category: 'Dokument- und Produktdaten',
      features: ['PDF- und Dokumentverarbeitung', 'Extraktion von Produktkennzeichnungsdaten', 'Zeilen in Datenfelder umwandeln', 'Manuelle Dateneingabe reduzieren'],
      useCases: ['Produktkennzeichnung vorbereiten', 'Rechnungs- oder PDF-Daten ordnen', 'Produktfelder aus Dokumenten extrahieren', 'Dokumentenfluss für Filiale und Lager'],
      cardCta: 'KünyeX ansehen',
      cta: { label: 'KünyeX Demo anfragen', href: '/contact' },
    },
    lojistik: {
      shortDescription: 'Transport- und Außendienstprozesse verwalten.',
      detail: 'Routen, Lieferungen, Außendienstflüsse und operative Prozesse sichtbarer machen.',
      longDescription:
        'Logistik macht Transportflüsse, Lieferpunkte, Routenübersicht und Außendienstprozesse besser nachvollziehbar.',
      category: 'Außendienst und Transport',
      features: ['Routen- und Lieferverfolgung', 'Sichtbarkeit im Außendienst', 'Bewegliche Punkte und Aufgabenfluss', 'Geordnete Operationsaufzeichnungen'],
      useCases: ['Lieferprozesse überwachen', 'Außendienst-Teamfluss', 'Sichtbarkeit der Routenplanung', 'Transportprozesse kontrollieren'],
      cardCta: 'Logistik ansehen',
      cta: { label: 'Logistik Demo anfragen', href: '/contact' },
    },
  },
  ar: {
    barkodx: {
      shortDescription: 'تحكم في إدارة المخزون والأسعار.',
      detail: 'أدر عمليات الباركود والمنتجات والأسعار والمخزون بسرعة وتنظيم أكبر.',
      longDescription:
        'BarkodX مصمم للشركات التي تحتاج إلى سجلات منتجات أوضح وتتبع باركود وتحديث أسعار ورؤية أفضل للمخزون.',
      category: 'إدارة المخزون والأسعار',
      features: ['تتبع الباركود وبطاقات المنتجات', 'تنظيم تحديثات الأسعار', 'فحص سجلات المخزون بسرعة', 'تدفق بحث وقوائم المنتجات'],
      useCases: ['إدارة منتجات المتاجر', 'التحكم في مخزون المستودع', 'تحضير بطاقات الأسعار', 'تعديل بطاقات المنتجات'],
      cardCta: 'عرض BarkodX',
      cta: { label: 'اطلب عرض BarkodX', href: '/contact' },
    },
    molatik: {
      shortDescription: 'تابع استراحات الموظفين والورديات.',
      detail: 'بسّط استراحات الموظفين وترتيب الورديات وتتبع الوقت داخل التشغيل.',
      longDescription:
        'Molatik يجعل استراحات الموظفين وحالة الورديات وتتبع الوقت اليومي أكثر وضوحا لفرق التشغيل.',
      category: 'تتبع وقت الموظفين',
      features: ['تتبع بداية ونهاية الاستراحة', 'رؤية ترتيب الورديات', 'التحكم في حالة الموظفين', 'إحصاءات الاستخدام اليومية'],
      useCases: ['تتبع استراحات موظفي الفروع', 'التحكم في الوقت داخل الوردية', 'ملخص تشغيل للمدير', 'رؤية ضغط الفريق'],
      cardCta: 'عرض Molatik',
      cta: { label: 'اطلب عرض Molatik', href: '/contact' },
    },
    kunyex: {
      shortDescription: 'استخرج بيانات هوية المنتج والوثائق تلقائيا.',
      detail: 'أنشئ بيانات منظمة من الوثائق ومعلومات المنتجات ومحتوى الهوية.',
      longDescription:
        'KünyeX مصمم لاستخراج معلومات المنتجات من ملفات PDF والوثائق، وإنشاء بيانات هوية المنتج وتقليل الإدخال اليدوي.',
      category: 'بيانات الوثائق والمنتجات',
      features: ['تدفق معالجة PDF والوثائق', 'استخراج بيانات هوية المنتج', 'تحويل الصفوف إلى حقول بيانات', 'تقليل إدخال البيانات اليدوي'],
      useCases: ['تحضير هوية المنتج', 'تنظيم معلومات الفواتير أو PDF', 'استخراج حقول المنتجات من الوثائق', 'تدفق وثائق الفروع والمستودعات'],
      cardCta: 'عرض KünyeX',
      cta: { label: 'اطلب عرض KünyeX', href: '/contact' },
    },
    lojistik: {
      shortDescription: 'أدر النقل والعمليات الميدانية.',
      detail: 'اجعل المسارات والتسليمات وتدفق الميدان والعمليات أكثر وضوحا.',
      longDescription:
        'اللوجستيات تجعل تدفقات النقل ونقاط التسليم ورؤية المسارات والعمليات الميدانية أسهل في المتابعة.',
      category: 'العمليات الميدانية والنقل',
      features: ['تتبع المسارات والتسليمات', 'رؤية العمليات الميدانية', 'نقاط متحركة وتدفق مهام', 'تنظيم سجلات التشغيل'],
      useCases: ['مراقبة عملية التسليم', 'تدفق فريق الميدان', 'رؤية تخطيط المسارات', 'التحكم في عمليات النقل'],
      cardCta: 'عرض اللوجستيات',
      cta: { label: 'اطلب عرض اللوجستيات', href: '/contact' },
    },
  },
  ru: {
    barkodx: {
      shortDescription: 'Возьмите под контроль склад и цены.',
      detail: 'Управляйте штрихкодами, товарами, ценами и запасами быстрее и более упорядоченно.',
      longDescription:
        'BarkodX создан для компаний, которым нужны понятные карточки товаров, отслеживание штрихкодов, обновления цен и видимость запасов.',
      category: 'Управление складом и ценами',
      features: ['Отслеживание штрихкодов и карточек товаров', 'Более упорядоченные изменения цен', 'Быстрая проверка складских записей', 'Поиск и список товаров'],
      useCases: ['Управление товарами в магазине', 'Контроль складских запасов', 'Подготовка ценников', 'Редактирование карточек товаров'],
      cardCta: 'Открыть BarkodX',
      cta: { label: 'Запросить демо BarkodX', href: '/contact' },
    },
    molatik: {
      shortDescription: 'Отслеживайте перерывы и смены персонала.',
      detail: 'Упростите перерывы сотрудников, порядок смен и учет времени в операциях.',
      longDescription:
        'Molatik делает перерывы персонала, статус смен и ежедневный учет времени более видимыми для операционных команд.',
      category: 'Учет времени персонала',
      features: ['Отслеживание начала и конца перерыва', 'Видимость порядка смен', 'Контроль статуса персонала', 'Ежедневная статистика использования'],
      useCases: ['Учет перерывов сотрудников филиала', 'Контроль времени внутри смены', 'Операционная сводка для менеджера', 'Видимость загрузки команды'],
      cardCta: 'Открыть Molatik',
      cta: { label: 'Запросить демо Molatik', href: '/contact' },
    },
    kunyex: {
      shortDescription: 'Автоматически извлекайте данные документов и карточек товаров.',
      detail: 'Создавайте структурированные данные из документов, информации о товарах и содержимого карточек.',
      longDescription:
        'KünyeX извлекает информацию о товарах из PDF и документов, создает данные карточек товаров и снижает объем ручного ввода.',
      category: 'Документы и товарные данные',
      features: ['Обработка PDF и документов', 'Извлечение данных карточки товара', 'Преобразование строк в поля данных', 'Снижение ручного ввода'],
      useCases: ['Подготовка карточек товаров', 'Упорядочивание информации из счетов или PDF', 'Извлечение полей товара из документов', 'Документооборот филиала и склада'],
      cardCta: 'Открыть KünyeX',
      cta: { label: 'Запросить демо KünyeX', href: '/contact' },
    },
    lojistik: {
      shortDescription: 'Управляйте перевозками и полевыми операциями.',
      detail: 'Сделайте маршруты, доставки, полевой поток и операционные процессы более видимыми.',
      longDescription:
        'Логистика делает транспортные потоки, точки доставки, видимость маршрутов и полевые операции проще для отслеживания.',
      category: 'Полевые и транспортные операции',
      features: ['Отслеживание маршрутов и доставок', 'Видимость полевых операций', 'Движущиеся точки и поток задач', 'Упорядоченные операционные записи'],
      useCases: ['Мониторинг доставки', 'Поток полевой команды', 'Видимость планирования маршрута', 'Контроль транспортных операций'],
      cardCta: 'Открыть Логистику',
      cta: { label: 'Запросить демо Логистики', href: '/contact' },
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
    privacyHref: project.slug === 'molatik' ? getMolatikPrivacyPath(locale) : undefined,
  }));
}

export function getProjectBySlug(slug: string, locale: Locale = defaultLocale) {
  return getProjects(locale).find((project) => project.slug === slug);
}

export function getProjectSlugs() {
  return baseProjects.map((project) => project.slug);
}
