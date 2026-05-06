import type { Locale } from '@/lib/i18n';

type PrivacySection = {
  title: string;
  items?: string[];
  text?: string;
  link?: {
    label: string;
    href: string;
  };
};

export type BarkodXPrivacyContent = {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: PrivacySection[];
};

const onboardingUrl = 'https://www.traxleapp.com';

export const barkodxPrivacyContent: Record<Locale, BarkodXPrivacyContent> = {
  tr: {
    title: 'BarkodX Gizlilik Politikası',
    lastUpdated: 'Son güncelleme: 2026',
    intro:
      'BarkodX, barkod okutma, ürün kaydı, fiyat, stok ve işletme senkronizasyonu işlevlerini sağlamak için yalnızca gerekli verileri işler.',
    sections: [
      {
        title: 'Takip, reklam ve konum',
        items: [
          'BarkodX kullanıcıları üçüncü taraf uygulama veya web sitelerinde takip etmez.',
          'Uygulamada üçüncü taraf reklam veya reklam ölçüm SDK’sı bulunmaz.',
          'Konum verisi toplanmaz.',
        ],
      },
      {
        title: 'Kamera ve fotoğraf arşivi erişimi',
        items: [
          'Kamera yalnızca barkod okutma ve ürün fotoğrafı çekme amacıyla kullanılır.',
          'Fotoğraf arşivi yalnızca kullanıcının isteğiyle ürün görseli seçmek için kullanılır.',
        ],
      },
      {
        title: 'İşlenen operasyon verileri',
        items: [
          'Ürün barkodu, ürün adı, fiyat, stok ve kampanya fiyatı uygulama işlevselliği için işlenir.',
          'Personel rolleri ve senkronizasyon kayıtları yetki ve işletme akışlarını yönetmek için işlenir.',
        ],
      },
      {
        title: 'Saklama ve senkronizasyon',
        items: [
          'Varsayılan kullanımda veriler cihaz üzerinde saklanır.',
          'Traxle Cloud veya BarkodX Bridge etkinleştirilirse ürün/fiyat verileri işletme senkronizasyonu için aktarılabilir.',
        ],
      },
      {
        title: 'İşletme kurulumu',
        text: 'Her işletme BarkodX kullanımı ve kurulum süreci için Traxle üzerinden onboarding talep edebilir.',
        link: { label: onboardingUrl, href: onboardingUrl },
      },
    ],
  },
  en: {
    title: 'BarkodX Privacy Policy',
    lastUpdated: 'Last updated: 2026',
    intro:
      'BarkodX processes only the data needed to provide barcode scanning, product records, pricing, stock, and business synchronization features.',
    sections: [
      {
        title: 'Tracking, advertising, and location',
        items: [
          'BarkodX does not track users across third-party apps or websites.',
          'The app does not include third-party advertising or ad measurement SDKs.',
          'Location data is not collected.',
        ],
      },
      {
        title: 'Camera and photo library access',
        items: [
          'The camera is used only for barcode scanning and taking product photos.',
          'The photo library is used only when the user chooses to select a product image.',
        ],
      },
      {
        title: 'Operational data processed',
        items: [
          'Product barcode, product name, price, stock, and campaign price are processed for app functionality.',
          'Staff roles and synchronization records are processed to manage permissions and business workflows.',
        ],
      },
      {
        title: 'Storage and synchronization',
        items: [
          'By default, data is stored on the device.',
          'If Traxle Cloud or BarkodX Bridge is enabled, product/price data may be transferred for business synchronization.',
        ],
      },
      {
        title: 'Business onboarding',
        text: 'Any business can request onboarding at https://www.traxleapp.com.',
        link: { label: onboardingUrl, href: onboardingUrl },
      },
    ],
  },
  de: {
    title: 'BarkodX Datenschutzrichtlinie',
    lastUpdated: 'Letzte Aktualisierung: 2026',
    intro:
      'BarkodX verarbeitet nur die Daten, die für Barcode-Scanning, Produktdaten, Preise, Lagerbestand und Unternehmenssynchronisierung erforderlich sind.',
    sections: [
      {
        title: 'Tracking, Werbung und Standort',
        items: [
          'BarkodX verfolgt Nutzer nicht in Drittanbieter-Apps oder auf Websites Dritter.',
          'Die App enthält keine SDKs für Drittanbieter-Werbung oder Werbemessung.',
          'Standortdaten werden nicht erfasst.',
        ],
      },
      {
        title: 'Kamera- und Fotozugriff',
        items: [
          'Die Kamera wird nur zum Scannen von Barcodes und zum Aufnehmen von Produktfotos verwendet.',
          'Die Fotomediathek wird nur verwendet, wenn der Nutzer ein Produktbild auswählen möchte.',
        ],
      },
      {
        title: 'Verarbeitete Betriebsdaten',
        items: [
          'Produktbarcode, Produktname, Preis, Bestand und Aktionspreis werden für die App-Funktionalität verarbeitet.',
          'Personalrollen und Synchronisationsprotokolle werden verarbeitet, um Berechtigungen und Unternehmensabläufe zu verwalten.',
        ],
      },
      {
        title: 'Speicherung und Synchronisierung',
        items: [
          'Standardmäßig werden Daten auf dem Gerät gespeichert.',
          'Wenn Traxle Cloud oder BarkodX Bridge aktiviert ist, können Produkt-/Preisdaten zur Unternehmenssynchronisierung übertragen werden.',
        ],
      },
      {
        title: 'Onboarding für Unternehmen',
        text: 'Jedes Unternehmen kann das Onboarding über Traxle anfragen.',
        link: { label: onboardingUrl, href: onboardingUrl },
      },
    ],
  },
  ar: {
    title: 'سياسة خصوصية BarkodX',
    lastUpdated: 'آخر تحديث: 2026',
    intro:
      'يعالج BarkodX البيانات اللازمة فقط لتوفير مسح الباركود وسجلات المنتجات والأسعار والمخزون ومزامنة الأعمال.',
    sections: [
      {
        title: 'التتبع والإعلانات والموقع',
        items: [
          'لا يتتبع BarkodX المستخدمين عبر تطبيقات أو مواقع ويب تابعة لجهات خارجية.',
          'لا يحتوي التطبيق على SDK للإعلانات أو قياس الإعلانات من جهات خارجية.',
          'لا يتم جمع بيانات الموقع.',
        ],
      },
      {
        title: 'الوصول إلى الكاميرا ومكتبة الصور',
        items: [
          'تستخدم الكاميرا فقط لمسح الباركود والتقاط صور المنتجات.',
          'تستخدم مكتبة الصور فقط عندما يختار المستخدم صورة منتج بنفسه.',
        ],
      },
      {
        title: 'بيانات التشغيل التي تتم معالجتها',
        items: [
          'تتم معالجة باركود المنتج واسم المنتج والسعر والمخزون وسعر الحملة لتشغيل التطبيق.',
          'تتم معالجة أدوار الموظفين وسجلات المزامنة لإدارة الصلاحيات وتدفقات العمل.',
        ],
      },
      {
        title: 'التخزين والمزامنة',
        items: [
          'في الاستخدام الافتراضي، يتم تخزين البيانات على الجهاز.',
          'إذا تم تفعيل Traxle Cloud أو BarkodX Bridge، فقد يتم نقل بيانات المنتجات/الأسعار لمزامنة الأعمال.',
        ],
      },
      {
        title: 'تهيئة الشركات',
        text: 'يمكن لأي شركة طلب التهيئة عبر Traxle.',
        link: { label: onboardingUrl, href: onboardingUrl },
      },
    ],
  },
  ru: {
    title: 'Политика конфиденциальности BarkodX',
    lastUpdated: 'Последнее обновление: 2026',
    intro:
      'BarkodX обрабатывает только данные, необходимые для сканирования штрихкодов, карточек товаров, цен, запасов и синхронизации бизнеса.',
    sections: [
      {
        title: 'Отслеживание, реклама и геолокация',
        items: [
          'BarkodX не отслеживает пользователей в сторонних приложениях или на сторонних веб-сайтах.',
          'В приложении нет сторонних SDK для рекламы или измерения рекламы.',
          'Данные о местоположении не собираются.',
        ],
      },
      {
        title: 'Доступ к камере и фотогалерее',
        items: [
          'Камера используется только для сканирования штрихкодов и съемки фотографий товаров.',
          'Фотогалерея используется только по выбору пользователя для выбора изображения товара.',
        ],
      },
      {
        title: 'Обрабатываемые операционные данные',
        items: [
          'Штрихкод товара, название товара, цена, остаток и акционная цена обрабатываются для работы приложения.',
          'Роли персонала и журналы синхронизации обрабатываются для управления правами и рабочими процессами.',
        ],
      },
      {
        title: 'Хранение и синхронизация',
        items: [
          'По умолчанию данные хранятся на устройстве.',
          'Если включены Traxle Cloud или BarkodX Bridge, данные о товарах/ценах могут передаваться для синхронизации бизнеса.',
        ],
      },
      {
        title: 'Онбординг для бизнеса',
        text: 'Любая компания может запросить онбординг через Traxle.',
        link: { label: onboardingUrl, href: onboardingUrl },
      },
    ],
  },
};

export function getBarkodXPrivacyContent(locale: Locale) {
  return barkodxPrivacyContent[locale];
}
