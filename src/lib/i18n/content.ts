import { Locale, RouteKey } from "./routes";

export interface Section {
  title: string;
  body: string;
}

export interface PageCopy {
  title: string;
  intro: string;
  sections: Section[];
}

export interface ProductCopy {
  badge: string;
  title: string;
  intro: string;
  highlights: string[];
  privacyCta: string;
}

export interface HomeCard {
  key: RouteKey;
  title: string;
  description: string;
  status: string;
}

export interface HomeCopy {
  badge: string;
  title: string;
  intro: string;
  cards: HomeCard[];
}

export interface AboutCopy {
  badge: string;
  title: string;
  intro: string;
  stats: { label: string; value: string }[];
  sections: Section[];
}

export interface LocaleContent {
  nav: {
    brandTag: string;
    links: { key: RouteKey; label: string }[];
    cta: { key: RouteKey; label: string };
    languageLabel: string;
  };
  footer: {
    description: string;
    ecosystem: string;
    company: string;
    legal: string;
    copyright: string;
  };
  home: HomeCopy;
  about: AboutCopy;
  products: {
    molatik: ProductCopy;
    kunyex: ProductCopy;
    logistics: ProductCopy;
  };
  productPrivacy: {
    molatik: PageCopy;
    kunyex: PageCopy;
  };
  pages: Record<
    | "features"
    | "pricing"
    | "integrations"
    | "contact"
    | "careers"
    | "updates"
    | "privacy"
    | "terms"
    | "cookies"
    | "kvkk"
    | "refund"
    | "distance"
    | "preInfo",
    PageCopy
  >;
}

const COMMON_STATS = {
  accounts: "Live Data",
  records: "Live Data",
  uptime: "SLA-backed",
};

export const CONTENT: Record<Locale, LocaleContent> = {
  tr: {
    nav: {
      brandTag: "Traxle Teknoloji Ekosistemi",
      links: [
        { key: "kunyex", label: "KunyeX" },
        { key: "molatik", label: "Molatik" },
        { key: "logistics", label: "Logistics" },
        { key: "about", label: "Hakkımızda" },
      ],
      cta: { key: "contact", label: "İletişim" },
      languageLabel: "Dil",
    },
    footer: {
      description:
        "Traxle, dijital kimlik, saha ekip yönetimi ve lojistik operasyonlarını tek veri omurgasında birleştiren kurumsal yazılım platformudur.",
      ecosystem: "Ekosistem",
      company: "Şirket",
      legal: "Yasal",
      copyright: "(c) 2026 Traxle. Tüm hakları saklıdır.",
    },
    home: {
      badge: "Canlı Ekosistem",
      title: "Programları Tek Çatı Altında Yöneten Operasyon Platformu",
      intro:
        "KunyeX, Molatik ve Logistics ürünlerini ortak veri modeliyle birleştirerek operasyon ekiplerine hız, görünürlük ve denetlenebilirlik sağlıyoruz.",
      cards: [
        {
          key: "kunyex",
          title: "KunyeX",
          description: "NFC/QR tabanlı dijital kimlik ve rol bazlı yetkilendirme yönetimi.",
          status: "Kurumsal kullanımda",
        },
        {
          key: "molatik",
          title: "Molatik",
          description: "Vardiya, mola, görev atama ve saha performansını tek panelden yönetir.",
          status: "Aktif geliştirme",
        },
        {
          key: "logistics",
          title: "Traxle Logistics",
          description: "Yük eşleştirme, teslimat takibi ve maliyet raporlamasını birleştirir.",
          status: "Pilot süreçler aktif",
        },
      ],
    },
    about: {
      badge: "Traxle Hakkında",
      title: "Gerçek Operasyon Problemlerine Ürün Tabanlı Çözüm",
      intro:
        "Saha ekipleri, depo ve lojistik süreçlerinde dağınık yapıları birleştiren modüler yazılımlar geliştiriyoruz. Kararlarımızı sahadan gelen gerçek veri ve ölçülebilir sonuçlar belirler.",
      stats: [
        { label: "Aktif Kurumsal Hesap", value: "Canlı veri" },
        { label: "Aylık İşlenen Kayıt", value: "Canlı veri" },
        { label: "Platform Erişilebilirlik", value: "SLA tanımlı" },
      ],
      sections: [
        {
          title: "Ne yapıyoruz?",
          body: "Dijital kimlik, iş gücü yönetimi ve lojistik operasyonlarını tek ekosistemde birleştiren modüller tasarlıyoruz.",
        },
        {
          title: "Nasıl çalışıyoruz?",
          body: "Her ürünü operasyon ekipleriyle birlikte modelleyip performans metrikleriyle sürekli iyileştiriyoruz.",
        },
        {
          title: "Neyi garanti ediyoruz?",
          body: "Güvenlik, izlenebilirlik, hızlı uyarlama ve kesintisiz kurumsal kullanım.",
        },
      ],
    },
    products: {
      molatik: {
        badge: "Molatik Workforce",
        title: "Vardiya ve Mola Operasyonlarını Otonomlaştırın",
        intro:
          "Molatik, ekip yönetimindeki manuel takip yükünü azaltır ve yöneticilere anlık operasyon görünürlüğü sağlar.",
        highlights: [
          "Vardiya bazlı görev ve check-in akışı",
          "Politika bazlı mola denetimi",
          "Lokasyon destekli saha kayıtları",
          "Yönetici odaklı günlük performans panelleri",
        ],
        privacyCta: "Molatik Gizlilik Sayfasını Aç",
      },
      kunyex: {
        badge: "KunyeX Identity",
        title: "Dijital Kimlik ve Yetki Kontrolünü Standartlaştırın",
        intro:
          "KunyeX, fiziksel ve dijital kimlik bağlantısını güvenli şekilde yöneterek profil doğrulama sürecini hızlandırır.",
        highlights: [
          "NFC/QR ile hızlı profil doğrulama",
          "Rol bazlı yetki modeli",
          "Donanım bağımlı lisans doğrulaması",
          "Denetlenebilir denetim kayıtları",
        ],
        privacyCta: "KunyeX Gizlilik Sayfasını Aç",
      },
      logistics: {
        badge: "Traxle Logistics",
        title: "Tekliften Teslimata Kadar Lojistik Kontrol",
        intro:
          "Traxle Logistics, yük eşleştirme ve sevkiyat akışını veri odaklı hâle getirir.",
        highlights: [
          "Yük-araç eşleştirme motoru",
          "Teslimat kanıt zinciri",
          "Rota ve maliyet analizi",
          "Operasyonel KPI panelleri",
        ],
        privacyCta: "İletişim ekibiyle süreç bilgisi al",
      },
    },
    productPrivacy: {
      molatik: {
        title: "Molatik Gizlilik Politikası",
        intro:
          "Bu metin Molatik ürününde işlenen verilerin kapsamını, güvenlik prensiplerini ve erişim kontrollerini açıklar.",
        sections: [
          { title: "Veri kapsamı", body: "Personel, vardiya, mola ve görev kayıtları sadece hizmet sunumu amacıyla işlenir." },
          { title: "Erişim", body: "Rol bazlı erişim modeli ve MFA ile kritik ekranlar korunur." },
          { title: "Güvenlik", body: "İletişim TLS ile şifrelenir, hassas veriler depoda şifreli tutulur." },
        ],
      },
      kunyex: {
        title: "KunyeX Gizlilik Politikası",
        intro:
          "Bu metin KunyeX ürünündeki dijital kimlik verisi, lisanslama ve denetim süreçlerini kapsar.",
        sections: [
          { title: "Kimlik verisi", body: "Profil ve doğrulama verisi amaç sınırlaması ilkesiyle işlenir." },
          { title: "Lisans güvenliği", body: "Kurumsal istemciler yetkili cihaz kimliğine bağlanır." },
          { title: "Denetim", body: "Kritik işlem kayıtları bütünlük kontrolleriyle saklanır." },
        ],
      },
    },
    pages: {
      features: {
        title: "Özellikler",
        intro: "Traxle modülleri, operasyon hızı ve denetlenebilirlik ihtiyacına göre tasarlanır.",
        sections: [
          { title: "Otomasyon", body: "Tekrarlayan süreçler kural tabanlı otomatikleştirilir." },
          { title: "Canlı raporlama", body: "Ekip ve lokasyon performansı anlık takip edilir." },
          { title: "Kurumsal uyum", body: "Yetki ve günlük (log) politikalarını merkezi olarak uygular." },
        ],
      },
      pricing: {
        title: "Fiyatlandırma",
        intro: "Modüler lisanslama ile her ekip sadece ihtiyaç duyduğu ürüne ödeme yapar.",
        sections: [
          { title: "Paket modeli", body: "KunyeX, Molatik ve Logistics modülleri ayrı veya birlikte alınabilir." },
          { title: "Ölçeklenebilirlik", body: "Kullanım hacmine göre lisans yapısı büyütülebilir." },
          { title: "Destek", body: "Onboarding, eğitim ve teknik destek SLA kapsamında planlanır." },
        ],
      },
      integrations: {
        title: "Entegrasyonlar",
        intro: "ERP, muhasebe ve operasyon sistemleriyle çift yönlü veri bağlantısı kuruyoruz.",
        sections: [
          { title: "API", body: "Güvenli REST API ve webhook katmanı ile hızlı entegrasyon." },
          { title: "Kimlik servisleri", body: "SSO ve kurumsal dizin servisleri desteği." },
          { title: "BI aktarımı", body: "Planlı aktarım (export) ile analitik sistemlere veri akışı." },
        ],
      },
      contact: {
        title: "İletişim",
        intro: "Demo, fiyatlandırma ve teknik iş birliği talepleri için ekibimize ulaşabilirsiniz.",
        sections: [
          { title: "Satış", body: "Kurumsal taleplere 1 iş günü içinde dönüş sağlanır." },
          { title: "Teknik destek", body: "Aktif müşteriler için SLA odaklı destek akışı bulunur." },
          { title: "Partnerlik", body: "Entegrasyon ve kanal partnerliği süreçleri ayrıca değerlendirilir." },
        ],
      },
      careers: {
        title: "Kariyer",
        intro: "Operasyon bilgisiyle ürün geliştiren ekip arkadaşları arıyoruz.",
        sections: [
          { title: "Kültür", body: "Sorumluluk alan, hızlı karar veren ve ölçülebilir sonuç üreten ekip modeli." },
          { title: "Çalışma şekli", body: "Role göre hibrit ve uzaktan çalışma imkânı." },
          { title: "Açık roller", body: "Mühendislik, ürün ve operasyon pozisyonları sürekli açıktır." },
        ],
      },
      updates: {
        title: "Ürün Güncellemeleri",
        intro: "Sürüm notları, güvenlik iyileştirmeleri ve yol haritası özeti bu sayfada yayınlanır.",
        sections: [
          { title: "Son sürüm", body: "Performans ve gösterge paneli iyileştirmeleri yayına alındı." },
          { title: "Güvenlik", body: "Oturum güvenliği ve denetim alarm kuralları güncellendi." },
          { title: "Yolda olanlar", body: "Geliştirilmiş rota planlama ve otomatik maliyet analizi geliyor." },
        ],
      },
      privacy: {
        title: "Gizlilik Politikası",
        intro: "Platformda toplanan verilerin hangi amaçlarla işlendiği bu metinde açıklanır.",
        sections: [
          { title: "Toplanan veriler", body: "Hesap, kullanım ve operasyon kayıtları." },
          { title: "Kullanım amacı", body: "Hizmet sürekliliği, güvenlik ve yasal yükümlülük." },
          { title: "Haklar", body: "Erişim, düzeltme ve silme talepleri resmi kanallardan iletilebilir." },
        ],
      },
      terms: {
        title: "Kullanım Koşulları",
        intro: "Traxle hizmetlerini kullanan kurumlar bu koşulları kabul etmiş sayılır.",
        sections: [
          { title: "Kapsam", body: "Modüller ve kullanım limitleri seçilen plana göre belirlenir." },
          { title: "Sorumluluk", body: "Hesap güvenliği ve kullanıcı yönetimi müşteri sorumluluğundadır." },
          { title: "Hukuki çerçeve", body: "Uyuşmazlıklar sözleşme ve yetkili yargı kapsamında çözülür." },
        ],
      },
      cookies: {
        title: "Çerez Politikası",
        intro: "Güvenli oturum ve performans ölçümleri için çerez teknolojileri kullanılır.",
        sections: [
          { title: "Zorunlu çerezler", body: "Kimlik doğrulama ve güvenlik için gereklidir." },
          { title: "Analitik çerezler", body: "Anonim kullanım verileriyle deneyim iyileştirilir." },
          { title: "Tercih yönetimi", body: "Tarayıcı ayarlarından çerez tercihleri düzenlenebilir." },
        ],
      },
      kvkk: {
        title: "KVKK Aydınlatma",
        intro: "Veri sorumlusu olarak kişisel veri işleme faaliyetlerimize ilişkin bilgilendirme.",
        sections: [
          { title: "Veri sorumlusu", body: "Traxle, hizmet kapsamı içindeki veri işleme faaliyetlerinden sorumludur." },
          { title: "Hukuki sebep", body: "Sözleşmenin ifası, meşru menfaat ve yasal yükümlülük." },
          { title: "Başvuru", body: "Talepler resmi iletişim kanallarından alınmaktadır." },
        ],
      },
      refund: {
        title: "İptal ve İade",
        intro: "İptal ve iade süreçleri seçilen plan ile sözleşme maddelerine göre yönetilir.",
        sections: [
          { title: "İptal", body: "İptal talebi panel veya destek kanalı üzerinden başlatılır." },
          { title: "İade değerlendirmesi", body: "Kullanım ve sözleşme durumuna göre uygunluk incelenir." },
          { title: "Tamamlama", body: "Onaylanan iade süreçleri finans ekibi tarafından sonuçlandırılır." },
        ],
      },
      distance: {
        title: "Mesafeli Hizmet Sözleşmesi",
        intro: "Dijital ortamda sunulan hizmetler için tarafların hak ve yükümlülükleri belirlenir.",
        sections: [
          { title: "Taraflar", body: "Traxle ile hizmet alan kurum arasında kurulur." },
          { title: "Teslim", body: "Erişim dijital olarak lisanslanan modüllerle sağlanır." },
          { title: "Fesih", body: "Sona erdirme koşulları plan ve süre taahhüdüne göre uygulanır." },
        ],
      },
      preInfo: {
        title: "Ön Bilgilendirme Formu",
        intro: "Satın alma öncesinde hizmet kapsamı ve maliyet detayları sunulur.",
        sections: [
          { title: "Hizmet tanımı", body: "Seçilen modüllerin teknik kapsamı listelenir." },
          { title: "Ücretlendirme", body: "Vergi, periyot ve ek servis bedelleri açıkça belirtilir." },
          { title: "Destek", body: "Kurulum ve destek kanal detayları önceden paylaşılır." },
        ],
      },
    },
  },
  en: {
    nav: {
      brandTag: "Traxle Technology Ecosystem",
      links: [
        { key: "kunyex", label: "KunyeX" },
        { key: "molatik", label: "Molatik" },
        { key: "logistics", label: "Logistics" },
        { key: "about", label: "About" },
      ],
      cta: { key: "contact", label: "Contact" },
      languageLabel: "Language",
    },
    footer: {
      description:
        "Traxle is an enterprise software platform unifying digital identity, workforce coordination and logistics operations.",
      ecosystem: "Ecosystem",
      company: "Company",
      legal: "Legal",
      copyright: "(c) 2026 Traxle. All rights reserved.",
    },
    home: {
      badge: "Live Ecosystem",
      title: "Program-level Operations on a Single Stack",
      intro:
        "We connect KunyeX, Molatik and Logistics products through one shared data model for speed, visibility and governance.",
      cards: [
        {
          key: "kunyex",
          title: "KunyeX",
          description: "NFC/QR based digital identity and role-based permission control.",
          status: "In enterprise use",
        },
        {
          key: "molatik",
          title: "Molatik",
          description: "Shift, break, assignment and workforce performance in one panel.",
          status: "Actively developing",
        },
        {
          key: "logistics",
          title: "Traxle Logistics",
          description: "Load matching, delivery tracking and cost reporting in one flow.",
          status: "Pilot operations active",
        },
      ],
    },
    about: {
      badge: "About Traxle",
      title: "We Build Productized Solutions for Real Operations",
      intro:
        "Our team delivers modular software for field operations, compliance and logistics management. Product decisions are driven by measurable outcomes.",
      stats: [
        { label: "Active Enterprise Accounts", value: COMMON_STATS.accounts },
        { label: "Monthly Processed Records", value: COMMON_STATS.records },
        { label: "Platform Uptime", value: COMMON_STATS.uptime },
      ],
      sections: [
        { title: "What we build", body: "Digital identity, workforce and logistics modules that operate together." },
        { title: "How we work", body: "We co-design workflows with operations teams and iterate from production data." },
        { title: "What we prioritize", body: "Security, reliability, adaptability and measurable business value." },
      ],
    },
    products: {
      molatik: {
        badge: "Molatik Workforce",
        title: "Automate Shift and Break Operations",
        intro:
          "Molatik removes manual workforce tracking and gives managers real-time operational visibility.",
        highlights: [
          "Shift-based assignment and attendance flow",
          "Policy-based break governance",
          "Location-assisted field records",
          "Daily manager dashboards",
        ],
        privacyCta: "Open Molatik Privacy Page",
      },
      kunyex: {
        badge: "KunyeX Identity",
        title: "Standardize Digital Identity and Access Control",
        intro:
          "KunyeX links physical credentials with digital profiles and secures profile verification workflows.",
        highlights: [
          "Fast NFC/QR profile verification",
          "Role-based access model",
          "Hardware-bound license validation",
          "Auditable critical event logs",
        ],
        privacyCta: "Open KunyeX Privacy Page",
      },
      logistics: {
        badge: "Traxle Logistics",
        title: "Control Logistics from Offer to Delivery",
        intro: "Traxle Logistics turns dispatch and delivery processes into a measurable digital flow.",
        highlights: [
          "Load and vehicle matching engine",
          "Proof-of-delivery chain",
          "Route and cost analytics",
          "Operational KPI dashboards",
        ],
        privacyCta: "Contact us for process details",
      },
    },
    productPrivacy: {
      molatik: {
        title: "Molatik Privacy Policy",
        intro: "This text explains data scope, security controls and access principles used in Molatik.",
        sections: [
          { title: "Data scope", body: "Workforce, shift, break and task records are processed only for service delivery." },
          { title: "Access", body: "Role-based access and MFA protect critical administrative actions." },
          { title: "Security", body: "Traffic is encrypted in transit and sensitive records are encrypted at rest." },
        ],
      },
      kunyex: {
        title: "KunyeX Privacy Policy",
        intro: "This text covers identity data handling, device licensing and audit principles of KunyeX.",
        sections: [
          { title: "Identity data", body: "Profile and verification data are processed under purpose limitation." },
          { title: "License security", body: "Enterprise clients are bound to approved hardware identity." },
          { title: "Audit", body: "Critical actions are logged with integrity checks." },
        ],
      },
    },
    pages: {
      features: {
        title: "Features",
        intro: "Traxle modules are designed for operational speed and governance.",
        sections: [
          { title: "Automation", body: "Recurring tasks are moved into rule-driven workflows." },
          { title: "Live reporting", body: "Team and location performance can be tracked in real time." },
          { title: "Enterprise compliance", body: "Permissions and logs are managed centrally." },
        ],
      },
      pricing: {
        title: "Pricing",
        intro: "Modular licensing helps every team pay only for what they use.",
        sections: [
          { title: "Package model", body: "KunyeX, Molatik and Logistics can be purchased separately or together." },
          { title: "Scalability", body: "Licensing expands as usage grows." },
          { title: "Support", body: "Onboarding and support flows are aligned with SLA." },
        ],
      },
      integrations: {
        title: "Integrations",
        intro: "Bidirectional integration with ERP, accounting and operations systems.",
        sections: [
          { title: "API", body: "Secure REST APIs and webhooks for rapid integration." },
          { title: "Identity services", body: "SSO and enterprise directory support." },
          { title: "BI export", body: "Scheduled exports for analytics platforms." },
        ],
      },
      contact: {
        title: "Contact",
        intro: "Reach us for demos, pricing and implementation discussions.",
        sections: [
          { title: "Sales", body: "Enterprise requests receive a first response within one business day." },
          { title: "Technical support", body: "Active customers are supported under monitored SLA channels." },
          { title: "Partnership", body: "Integration and channel partnership requests are reviewed separately." },
        ],
      },
      careers: {
        title: "Careers",
        intro: "We are hiring people who can turn operational complexity into clear products.",
        sections: [
          { title: "Culture", body: "Ownership, fast decisions and measurable impact." },
          { title: "Work model", body: "Hybrid and remote work options by role." },
          { title: "Open roles", body: "Engineering, product and operations positions are regularly open." },
        ],
      },
      updates: {
        title: "Product Updates",
        intro: "Release notes, security improvements and roadmap updates.",
        sections: [
          { title: "Latest release", body: "Performance and dashboard rendering improvements shipped." },
          { title: "Security", body: "Session hardening and audit alert rules were updated." },
          { title: "Upcoming", body: "Advanced route planning and automated cost analytics are in progress." },
        ],
      },
      privacy: {
        title: "Privacy Policy",
        intro: "This policy explains what data is collected and why.",
        sections: [
          { title: "Collected data", body: "Account, usage and operations records." },
          { title: "Purpose", body: "Service continuity, security and legal compliance." },
          { title: "Rights", body: "Access, correction and deletion requests can be submitted officially." },
        ],
      },
      terms: {
        title: "Terms of Use",
        intro: "Organizations using Traxle services are bound by these terms.",
        sections: [
          { title: "Scope", body: "Modules and limits are defined by selected plan." },
          { title: "Responsibility", body: "Customers are responsible for account security and user management." },
          { title: "Legal framework", body: "Disputes are handled under contract and governing jurisdiction." },
        ],
      },
      cookies: {
        title: "Cookie Policy",
        intro: "Cookies are used for secure sessions and product performance.",
        sections: [
          { title: "Essential cookies", body: "Required for authentication and security checks." },
          { title: "Analytics cookies", body: "Anonymous usage data improves experience." },
          { title: "Preference management", body: "Cookie settings can be changed in browser controls." },
        ],
      },
      kvkk: {
        title: "Data Protection Notice",
        intro: "Information about personal data processing by Traxle as data controller.",
        sections: [
          { title: "Controller", body: "Traxle is responsible for processing activities within service scope." },
          { title: "Legal basis", body: "Contract performance, legitimate interest and legal obligations." },
          { title: "Requests", body: "Requests are accepted through official communication channels." },
        ],
      },
      refund: {
        title: "Cancellation and Refund",
        intro: "Cancellation and refund flow depends on plan and contractual terms.",
        sections: [
          { title: "Cancellation", body: "Requests can be initiated through panel or support channels." },
          { title: "Refund review", body: "Eligibility is checked against usage and contract clauses." },
          { title: "Completion", body: "Approved refunds are finalized by finance operations." },
        ],
      },
      distance: {
        title: "Distance Service Agreement",
        intro: "Defines rights and obligations for digitally delivered services.",
        sections: [
          { title: "Parties", body: "Established between Traxle and subscribing organization." },
          { title: "Delivery", body: "Service access is provisioned digitally by licensed modules." },
          { title: "Termination", body: "Termination terms follow plan commitment and contract period." },
        ],
      },
      preInfo: {
        title: "Pre-information Form",
        intro: "Service scope, pricing and support details shared before purchase.",
        sections: [
          { title: "Service definition", body: "Technical coverage of selected modules is listed." },
          { title: "Pricing", body: "Fees, taxes and optional costs are transparently stated." },
          { title: "Support", body: "Setup and support channels are documented before go-live." },
        ],
      },
    },
  },
  de: {} as LocaleContent,
  ru: {} as LocaleContent,
  ar: {} as LocaleContent,
};

CONTENT.de = {
  ...CONTENT.en,
  nav: {
    brandTag: "Traxle Technologie-Ökosystem",
    links: [
      { key: "kunyex", label: "KunyeX" },
      { key: "molatik", label: "Molatik" },
      { key: "logistics", label: "Logistik" },
      { key: "about", label: "Über uns" },
    ],
    cta: { key: "contact", label: "Kontakt" },
    languageLabel: "Sprache",
  },
  footer: {
    description:
      "Traxle ist eine Unternehmensplattform, die digitale Identität, Personalsteuerung und Logistikprozesse in einer gemeinsamen Datenstruktur vereint.",
    ecosystem: "Ökosystem",
    company: "Unternehmen",
    legal: "Rechtliches",
    copyright: "(c) 2026 Traxle. Alle Rechte vorbehalten.",
  },
  home: {
    badge: "Live-Ökosystem",
    title: "Programme auf einer einheitlichen Operations-Plattform",
    intro:
      "Wir verbinden KunyeX, Molatik und Logistics in einem gemeinsamen Datenmodell für Geschwindigkeit, Transparenz und Governance.",
    cards: [
      {
        key: "kunyex",
        title: "KunyeX",
        description: "NFC/QR-basierte digitale Identität mit rollenbasierter Berechtigungssteuerung.",
        status: "Im Unternehmenseinsatz",
      },
      {
        key: "molatik",
        title: "Molatik",
        description: "Verwaltet Schichten, Pausen, Aufgaben und Teamleistung in einer Oberfläche.",
        status: "Aktiv in Entwicklung",
      },
      {
        key: "logistics",
        title: "Traxle Logistics",
        description: "Verknüpft Frachtzuordnung, Lieferverfolgung und Kostenanalysen.",
        status: "Pilotbetrieb aktiv",
      },
    ],
  },
  about: {
    badge: "Über Traxle",
    title: "Produktlösungen für reale Betriebsabläufe",
    intro:
      "Wir entwickeln modulare Software für Außendienst, Compliance und Logistikmanagement. Entscheidungen basieren auf messbaren Ergebnissen aus dem Live-Betrieb.",
    stats: [
      { label: "Aktive Unternehmenskonten", value: COMMON_STATS.accounts },
      { label: "Monatlich verarbeitete Datensätze", value: COMMON_STATS.records },
      { label: "Plattform-Verfügbarkeit", value: COMMON_STATS.uptime },
    ],
    sections: [
      {
        title: "Was wir bauen",
        body: "Module für digitale Identität, Workforce-Management und Logistik, die in einer Plattform zusammenarbeiten.",
      },
      {
        title: "Wie wir arbeiten",
        body: "Wir modellieren Prozesse gemeinsam mit Operationsteams und verbessern Produkte kontinuierlich anhand produktiver Daten.",
      },
      {
        title: "Was wir garantieren",
        body: "Sicherheit, Nachvollziehbarkeit, Anpassungsfähigkeit und stabilen Unternehmenseinsatz.",
      },
    ],
  },
  products: {
    molatik: {
      badge: "Molatik Workforce",
      title: "Schicht- und Pausenprozesse automatisieren",
      intro:
        "Molatik reduziert manuelle Teamverfolgung und liefert Führungskräften operative Transparenz in Echtzeit.",
      highlights: [
        "Schichtbasierte Aufgaben- und Check-in-Flows",
        "Regelbasierte Pausensteuerung",
        "Standortgestützte Feldeinträge",
        "Tages-Dashboards für Teamleiter",
      ],
      privacyCta: "Molatik-Datenschutz öffnen",
    },
    kunyex: {
      badge: "KunyeX Identity",
      title: "Digitale Identität und Zugriffskontrolle standardisieren",
      intro:
        "KunyeX verbindet physische und digitale Identitätsdaten und beschleunigt sichere Verifizierungsprozesse.",
      highlights: [
        "Schnelle Profilprüfung per NFC/QR",
        "Rollenbasiertes Zugriffsmodell",
        "Hardwaregebundene Lizenzvalidierung",
        "Revisionssichere Audit-Protokolle",
      ],
      privacyCta: "KunyeX-Datenschutz öffnen",
    },
    logistics: {
      badge: "Traxle Logistics",
      title: "Logistik von Angebot bis Zustellung steuern",
      intro:
        "Traxle Logistics macht Disposition und Lieferprozesse messbar, steuerbar und auditierbar.",
      highlights: [
        "Engine zur Zuordnung von Fracht und Fahrzeug",
        "Nachweisbare Lieferkette",
        "Routen- und Kostenanalysen",
        "Operative KPI-Dashboards",
      ],
      privacyCta: "Kontakt für Prozessdetails",
    },
  },
  productPrivacy: {
    molatik: {
      title: "Molatik-Datenschutzerklärung",
      intro:
        "Dieser Text erläutert Datenumfang, Sicherheitskontrollen und Zugriffsprinzipien innerhalb von Molatik.",
      sections: [
        {
          title: "Datenumfang",
          body: "Mitarbeiter-, Schicht-, Pausen- und Aufgabeninformationen werden ausschließlich zur Leistungserbringung verarbeitet.",
        },
        {
          title: "Zugriff",
          body: "Rollenbasierte Berechtigungen und MFA schützen kritische Verwaltungsaktionen.",
        },
        {
          title: "Sicherheit",
          body: "Daten werden bei Übertragung und Speicherung verschlüsselt.",
        },
      ],
    },
    kunyex: {
      title: "KunyeX-Datenschutzerklärung",
      intro:
        "Dieser Text beschreibt Identitätsdatenverarbeitung, Geräte-Lizenzierung und Audit-Prinzipien von KunyeX.",
      sections: [
        {
          title: "Identitätsdaten",
          body: "Profil- und Verifizierungsdaten werden zweckgebunden und kontrolliert verarbeitet.",
        },
        {
          title: "Lizenzsicherheit",
          body: "Unternehmens-Clients sind an freigegebene Hardware-Identitäten gebunden.",
        },
        {
          title: "Audit",
          body: "Kritische Aktionen werden mit Integritätsprüfungen protokolliert.",
        },
      ],
    },
  },
  pages: {
    features: {
      title: "Funktionen",
      intro: "Traxle-Module sind auf operative Geschwindigkeit und Governance ausgelegt.",
      sections: [
        { title: "Automatisierung", body: "Wiederkehrende Abläufe werden regelbasiert automatisiert." },
        { title: "Live-Reporting", body: "Team- und Standortleistung kann in Echtzeit verfolgt werden." },
        { title: "Enterprise-Compliance", body: "Rechte und Protokolle werden zentral gesteuert." },
      ],
    },
    pricing: {
      title: "Preise",
      intro: "Modulare Lizenzierung: Jedes Team zahlt nur für die tatsächlich genutzten Produkte.",
      sections: [
        { title: "Paketmodell", body: "KunyeX, Molatik und Logistics sind einzeln oder gemeinsam lizenzierbar." },
        { title: "Skalierbarkeit", body: "Die Lizenzstruktur wächst mit dem Nutzungsvolumen." },
        { title: "Support", body: "Onboarding, Schulung und Support werden SLA-konform geplant." },
      ],
    },
    integrations: {
      title: "Integrationen",
      intro: "Bidirektionale Integrationen mit ERP-, Buchhaltungs- und Betriebssystemen.",
      sections: [
        { title: "API", body: "Sichere REST-APIs und Webhooks für schnelle Anbindung." },
        { title: "Identity Services", body: "Unterstützung für SSO und Unternehmensverzeichnisse." },
        { title: "BI-Export", body: "Geplante Exporte für Analytics- und BI-Plattformen." },
      ],
    },
    contact: {
      title: "Kontakt",
      intro: "Kontaktieren Sie uns für Demo, Preise und Implementierungsplanung.",
      sections: [
        { title: "Vertrieb", body: "Unternehmensanfragen erhalten in der Regel innerhalb eines Werktags eine erste Rückmeldung." },
        { title: "Technischer Support", body: "Aktive Kunden werden über SLA-gesteuerte Supportkanäle betreut." },
        { title: "Partnerschaften", body: "Integrations- und Vertriebspartnerschaften werden separat bewertet." },
      ],
    },
    careers: {
      title: "Karriere",
      intro: "Wir suchen Menschen, die operative Komplexität in klare Produkte übersetzen.",
      sections: [
        { title: "Kultur", body: "Verantwortung, schnelle Entscheidungen und messbare Wirkung." },
        { title: "Arbeitsmodell", body: "Je nach Rolle hybrid oder remote." },
        { title: "Offene Rollen", body: "Positionen in Engineering, Produkt und Operations sind fortlaufend offen." },
      ],
    },
    updates: {
      title: "Produkt-Updates",
      intro: "Release Notes, Sicherheitsverbesserungen und Roadmap-Updates.",
      sections: [
        { title: "Letzte Version", body: "Performance-Optimierungen und Verbesserungen im Dashboard wurden ausgeliefert." },
        { title: "Sicherheit", body: "Session-Härtung und Audit-Alarmregeln wurden aktualisiert." },
        { title: "Als Nächstes", body: "Erweiterte Routenplanung und automatische Kostenanalysen sind in Arbeit." },
      ],
    },
    privacy: {
      title: "Datenschutzerklärung",
      intro: "Diese Richtlinie beschreibt, welche Daten erfasst werden und warum.",
      sections: [
        { title: "Erhobene Daten", body: "Konto-, Nutzungs- und Betriebsdaten." },
        { title: "Zweck", body: "Servicekontinuität, Sicherheit und rechtliche Compliance." },
        { title: "Rechte", body: "Anfragen zu Auskunft, Berichtigung oder Löschung können offiziell eingereicht werden." },
      ],
    },
    terms: {
      title: "Nutzungsbedingungen",
      intro: "Organisationen, die Traxle-Dienste nutzen, sind an diese Bedingungen gebunden.",
      sections: [
        { title: "Geltungsbereich", body: "Module und Limits richten sich nach dem gewählten Plan." },
        { title: "Verantwortung", body: "Kunden sind für Kontosicherheit und Benutzerverwaltung verantwortlich." },
        { title: "Rechtsrahmen", body: "Streitigkeiten werden gemäß Vertrag und zuständiger Gerichtsbarkeit behandelt." },
      ],
    },
    cookies: {
      title: "Cookie-Richtlinie",
      intro: "Cookies werden für sichere Sitzungen und Produktleistung verwendet.",
      sections: [
        { title: "Essenzielle Cookies", body: "Erforderlich für Authentifizierung und Sicherheitsprüfungen." },
        { title: "Analyse-Cookies", body: "Anonyme Nutzungsdaten verbessern die Produktqualität." },
        { title: "Einstellungsverwaltung", body: "Cookie-Präferenzen können im Browser geändert werden." },
      ],
    },
    kvkk: {
      title: "Datenschutzhinweis",
      intro: "Informationen zur Verarbeitung personenbezogener Daten durch Traxle als Verantwortlicher.",
      sections: [
        { title: "Verantwortlicher", body: "Traxle ist für Datenverarbeitung im Rahmen der bereitgestellten Dienste verantwortlich." },
        { title: "Rechtsgrundlage", body: "Vertragserfüllung, berechtigtes Interesse und gesetzliche Pflichten." },
        { title: "Anträge", body: "Anfragen werden über offizielle Kommunikationskanäle entgegengenommen." },
      ],
    },
    refund: {
      title: "Stornierung und Rückerstattung",
      intro: "Der Ablauf richtet sich nach ausgewähltem Plan und Vertragsbedingungen.",
      sections: [
        { title: "Stornierung", body: "Anträge können über das Panel oder den Support gestartet werden." },
        { title: "Prüfung", body: "Die Erstattungsfähigkeit wird anhand Nutzung und Vertragsklauseln bewertet." },
        { title: "Abschluss", body: "Freigegebene Rückerstattungen werden durch Finance abgeschlossen." },
      ],
    },
    distance: {
      title: "Fernabsatz-Dienstleistungsvertrag",
      intro: "Definiert Rechte und Pflichten für digital erbrachte Dienstleistungen.",
      sections: [
        { title: "Vertragsparteien", body: "Zwischen Traxle und der abonnierenden Organisation." },
        { title: "Bereitstellung", body: "Zugriff wird digital über lizenzierte Module bereitgestellt." },
        { title: "Kündigung", body: "Kündigungsbedingungen folgen Planlaufzeit und Vertragsrahmen." },
      ],
    },
    preInfo: {
      title: "Vorabinformationsformular",
      intro: "Leistungsumfang, Preise und Supportdetails vor dem Kauf.",
      sections: [
        { title: "Leistungsbeschreibung", body: "Technischer Umfang der ausgewählten Module." },
        { title: "Preisstruktur", body: "Gebühren, Steuern und optionale Kosten werden transparent dargestellt." },
        { title: "Support", body: "Setup- und Supportkanäle werden vor dem Go-live dokumentiert." },
      ],
    },
  },
};

CONTENT.ru = {
  ...CONTENT.en,
  nav: {
    brandTag: "Технологическая экосистема Traxle",
    links: [
      { key: "kunyex", label: "KunyeX" },
      { key: "molatik", label: "Molatik" },
      { key: "logistics", label: "Логистика" },
      { key: "about", label: "О нас" },
    ],
    cta: { key: "contact", label: "Контакты" },
    languageLabel: "Язык",
  },
  footer: {
    description:
      "Traxle — это корпоративная платформа, объединяющая цифровую идентификацию, управление командами и логистические операции в единой структуре данных.",
    ecosystem: "Экосистема",
    company: "Компания",
    legal: "Правовая информация",
    copyright: "(c) 2026 Traxle. Все права защищены.",
  },
  home: {
    badge: "Живая экосистема",
    title: "Управление программами на единой операционной платформе",
    intro:
      "Мы объединяем KunyeX, Molatik и Logistics в общей модели данных для скорости, прозрачности и управляемости.",
    cards: [
      {
        key: "kunyex",
        title: "KunyeX",
        description: "Цифровая идентификация на базе NFC/QR с ролевым управлением доступом.",
        status: "Используется в компаниях",
      },
      {
        key: "molatik",
        title: "Molatik",
        description: "Смены, перерывы, назначения и эффективность сотрудников в одном интерфейсе.",
        status: "Активная разработка",
      },
      {
        key: "logistics",
        title: "Traxle Logistics",
        description: "Сопоставление грузов, отслеживание доставок и анализ затрат в едином потоке.",
        status: "Пилотные процессы активны",
      },
    ],
  },
  about: {
    badge: "О Traxle",
    title: "Продуктовые решения для реальных операционных задач",
    intro:
      "Мы создаем модульные продукты для полевых команд, комплаенса и логистики. Решения принимаются на основе измеримых результатов из реальной эксплуатации.",
    stats: [
      { label: "Активные корпоративные аккаунты", value: COMMON_STATS.accounts },
      { label: "Обрабатываемые записи в месяц", value: COMMON_STATS.records },
      { label: "Доступность платформы", value: COMMON_STATS.uptime },
    ],
    sections: [
      {
        title: "Что мы создаем",
        body: "Модули цифровой идентификации, управления персоналом и логистики, работающие как единая система.",
      },
      {
        title: "Как мы работаем",
        body: "Совместно проектируем процессы с операционными командами и улучшаем продукты на основе боевых данных.",
      },
      {
        title: "Что мы гарантируем",
        body: "Безопасность, прозрачность, гибкость внедрения и стабильность для корпоративной эксплуатации.",
      },
    ],
  },
  products: {
    molatik: {
      badge: "Molatik Workforce",
      title: "Автоматизируйте управление сменами и перерывами",
      intro:
        "Molatik убирает ручной контроль и дает менеджерам прозрачность операций в реальном времени.",
      highlights: [
        "Назначения и check-in по сменам",
        "Контроль перерывов на основе политик",
        "Полевые записи с привязкой к локации",
        "Ежедневные панели для руководителей",
      ],
      privacyCta: "Открыть политику конфиденциальности Molatik",
    },
    kunyex: {
      badge: "KunyeX Identity",
      title: "Стандартизируйте цифровую идентификацию и контроль доступа",
      intro:
        "KunyeX связывает физические и цифровые идентификаторы и ускоряет безопасную проверку профиля.",
      highlights: [
        "Быстрая проверка профиля по NFC/QR",
        "Ролевая модель доступа",
        "Лицензирование, привязанное к оборудованию",
        "Аудируемые журналы критических действий",
      ],
      privacyCta: "Открыть политику конфиденциальности KunyeX",
    },
    logistics: {
      badge: "Traxle Logistics",
      title: "Контролируйте логистику от заявки до доставки",
      intro:
        "Traxle Logistics превращает диспетчеризацию и доставку в измеримый цифровой процесс.",
      highlights: [
        "Механизм сопоставления груза и транспорта",
        "Подтверждаемая цепочка доставки",
        "Аналитика маршрутов и затрат",
        "Операционные KPI-панели",
      ],
      privacyCta: "Связаться для деталей процесса",
    },
  },
  productPrivacy: {
    molatik: {
      title: "Политика конфиденциальности Molatik",
      intro:
        "В этом документе описаны состав данных, меры безопасности и принципы доступа в Molatik.",
      sections: [
        {
          title: "Состав данных",
          body: "Данные сотрудников, смен, перерывов и задач обрабатываются только для предоставления сервиса.",
        },
        {
          title: "Доступ",
          body: "Критические административные действия защищены ролевым доступом и MFA.",
        },
        {
          title: "Безопасность",
          body: "Передача данных и хранение чувствительной информации выполняются в зашифрованном виде.",
        },
      ],
    },
    kunyex: {
      title: "Политика конфиденциальности KunyeX",
      intro:
        "Документ охватывает обработку идентификационных данных, лицензирование устройств и принципы аудита в KunyeX.",
      sections: [
        {
          title: "Идентификационные данные",
          body: "Данные профиля и верификации обрабатываются по принципу ограничения цели.",
        },
        {
          title: "Безопасность лицензий",
          body: "Корпоративные клиенты привязываются к одобренной аппаратной идентичности.",
        },
        {
          title: "Аудит",
          body: "Критические действия журналируются с проверками целостности.",
        },
      ],
    },
  },
  pages: {
    features: {
      title: "Возможности",
      intro: "Модули Traxle разработаны для высокой скорости операций и управляемости.",
      sections: [
        { title: "Автоматизация", body: "Повторяющиеся процессы переводятся в правила и автоматические сценарии." },
        { title: "Отчетность в реальном времени", body: "Показатели команды и локаций доступны без задержек." },
        { title: "Корпоративное соответствие", body: "Права доступа и журналы управляются централизованно." },
      ],
    },
    pricing: {
      title: "Тарифы",
      intro: "Модульная лицензия: команда оплачивает только реально используемые продукты.",
      sections: [
        { title: "Пакетная модель", body: "KunyeX, Molatik и Logistics можно подключать отдельно или вместе." },
        { title: "Масштабирование", body: "Лицензия расширяется по мере роста использования." },
        { title: "Поддержка", body: "Онбординг, обучение и поддержка выстраиваются по SLA." },
      ],
    },
    integrations: {
      title: "Интеграции",
      intro: "Двунаправленная интеграция с ERP, бухгалтерскими и операционными системами.",
      sections: [
        { title: "API", body: "Безопасные REST API и webhooks для быстрого подключения." },
        { title: "Сервисы идентификации", body: "Поддержка SSO и корпоративных каталогов." },
        { title: "BI-экспорт", body: "Плановые выгрузки в аналитические платформы." },
      ],
    },
    contact: {
      title: "Контакты",
      intro: "Свяжитесь с нами по вопросам демо, стоимости и внедрения.",
      sections: [
        { title: "Продажи", body: "По корпоративным запросам мы обычно отвечаем в течение одного рабочего дня." },
        { title: "Техническая поддержка", body: "Действующие клиенты обслуживаются через SLA-каналы." },
        { title: "Партнерство", body: "Запросы на интеграции и партнерские программы рассматриваются отдельно." },
      ],
    },
    careers: {
      title: "Карьера",
      intro: "Мы ищем специалистов, которые превращают операционную сложность в понятные продукты.",
      sections: [
        { title: "Культура", body: "Ответственность, быстрые решения и измеримый результат." },
        { title: "Формат работы", body: "Гибридный и удаленный формат в зависимости от роли." },
        { title: "Открытые роли", body: "Регулярно открыты позиции в инженерии, продукте и операциях." },
      ],
    },
    updates: {
      title: "Обновления продукта",
      intro: "Релиз-ноты, улучшения безопасности и обновления дорожной карты.",
      sections: [
        { title: "Последний релиз", body: "Выпущены улучшения производительности и отображения дашбордов." },
        { title: "Безопасность", body: "Обновлены правила защиты сессий и audit-оповещений." },
        { title: "Далее", body: "В разработке расширенное планирование маршрутов и автоматический анализ затрат." },
      ],
    },
    privacy: {
      title: "Политика конфиденциальности",
      intro: "Документ объясняет, какие данные собираются и с какой целью.",
      sections: [
        { title: "Собираемые данные", body: "Данные аккаунта, использования и операционных действий." },
        { title: "Цель", body: "Непрерывность сервиса, безопасность и соблюдение законодательства." },
        { title: "Права", body: "Запросы на доступ, исправление и удаление принимаются через официальные каналы." },
      ],
    },
    terms: {
      title: "Условия использования",
      intro: "Организации, использующие сервисы Traxle, принимают эти условия.",
      sections: [
        { title: "Область действия", body: "Модули и ограничения определяются выбранным тарифом." },
        { title: "Ответственность", body: "Клиент отвечает за безопасность аккаунтов и управление пользователями." },
        { title: "Правовая база", body: "Споры рассматриваются в рамках договора и применимой юрисдикции." },
      ],
    },
    cookies: {
      title: "Политика файлов cookie",
      intro: "Cookie используются для безопасных сессий и повышения качества продукта.",
      sections: [
        { title: "Обязательные cookie", body: "Необходимы для аутентификации и проверок безопасности." },
        { title: "Аналитические cookie", body: "Анонимные данные использования помогают улучшать сервис." },
        { title: "Управление настройками", body: "Предпочтения cookie можно изменить в настройках браузера." },
      ],
    },
    kvkk: {
      title: "Уведомление о защите данных",
      intro: "Информация об обработке персональных данных компанией Traxle как оператором данных.",
      sections: [
        { title: "Оператор данных", body: "Traxle отвечает за обработку данных в рамках предоставляемых сервисов." },
        { title: "Правовое основание", body: "Исполнение договора, законный интерес и юридические обязательства." },
        { title: "Запросы", body: "Запросы принимаются через официальные каналы связи." },
      ],
    },
    refund: {
      title: "Отмена и возврат",
      intro: "Порядок отмены и возврата зависит от тарифа и условий договора.",
      sections: [
        { title: "Отмена", body: "Запрос можно инициировать через панель или канал поддержки." },
        { title: "Проверка возврата", body: "Право на возврат оценивается по факту использования и условиям договора." },
        { title: "Завершение", body: "Одобренные возвраты завершаются финансовой командой." },
      ],
    },
    distance: {
      title: "Договор дистанционного оказания услуг",
      intro: "Определяет права и обязанности сторон для услуг, предоставляемых в цифровом формате.",
      sections: [
        { title: "Стороны", body: "Договор заключается между Traxle и организацией-подписчиком." },
        { title: "Предоставление", body: "Доступ к сервису предоставляется цифровым способом через лицензированные модули." },
        { title: "Расторжение", body: "Условия расторжения определяются планом и сроком договора." },
      ],
    },
    preInfo: {
      title: "Форма предварительного информирования",
      intro: "До покупки предоставляются сведения о составе услуг, стоимости и поддержке.",
      sections: [
        { title: "Описание услуги", body: "Перечисляется технический охват выбранных модулей." },
        { title: "Ценообразование", body: "Прозрачно указываются сборы, налоги и дополнительные расходы." },
        { title: "Поддержка", body: "Каналы внедрения и поддержки фиксируются до запуска." },
      ],
    },
  },
};

CONTENT.ar = {
  ...CONTENT.en,
  nav: {
    brandTag: "منظومة Traxle التقنية",
    links: [
      { key: "kunyex", label: "KunyeX" },
      { key: "molatik", label: "Molatik" },
      { key: "logistics", label: "اللوجستيات" },
      { key: "about", label: "من نحن" },
    ],
    cta: { key: "contact", label: "اتصل بنا" },
    languageLabel: "اللغة",
  },
  footer: {
    description:
      "Traxle منصة مؤسسية توحد الهوية الرقمية وإدارة فرق العمل والعمليات اللوجستية ضمن بنية بيانات واحدة.",
    ecosystem: "المنظومة",
    company: "الشركة",
    legal: "قانوني",
    copyright: "(c) 2026 Traxle. جميع الحقوق محفوظة.",
  },
  home: {
    badge: "منظومة حية",
    title: "إدارة البرامج عبر منصة تشغيل موحدة",
    intro:
      "نوحّد KunyeX وMolatik وLogistics ضمن نموذج بيانات واحد لزيادة السرعة والوضوح والحوكمة.",
    cards: [
      {
        key: "kunyex",
        title: "KunyeX",
        description: "هوية رقمية قائمة على NFC/QR مع إدارة صلاحيات بحسب الأدوار.",
        status: "مستخدم فعلياً في المؤسسات",
      },
      {
        key: "molatik",
        title: "Molatik",
        description: "إدارة المناوبات والاستراحات والمهام وأداء الفرق من لوحة واحدة.",
        status: "قيد التطوير النشط",
      },
      {
        key: "logistics",
        title: "Traxle Logistics",
        description: "يربط مطابقة الشحنات وتتبع التسليم وتحليلات التكاليف في تدفق واحد.",
        status: "عمليات تجريبية نشطة",
      },
    ],
  },
  about: {
    badge: "عن Traxle",
    title: "حلول منتجات لمشكلات تشغيل حقيقية",
    intro:
      "نطوّر حلولاً معيارية لفرق الميدان والامتثال وإدارة اللوجستيات. قراراتنا تعتمد على نتائج قابلة للقياس من بيئة العمل الحقيقية.",
    stats: [
      { label: "حسابات مؤسسية نشطة", value: COMMON_STATS.accounts },
      { label: "سجلات معالجة شهرياً", value: COMMON_STATS.records },
      { label: "جاهزية المنصة", value: COMMON_STATS.uptime },
    ],
    sections: [
      {
        title: "ماذا نبني",
        body: "وحدات للهوية الرقمية وإدارة القوى العاملة واللوجستيات تعمل ضمن منظومة واحدة.",
      },
      {
        title: "كيف نعمل",
        body: "نصمّم التدفقات مع فرق العمليات ونحسّن المنتجات باستمرار اعتماداً على بيانات الإنتاج.",
      },
      {
        title: "ماذا نضمن",
        body: "الأمان، القابلية للتدقيق، سرعة التكيّف، والاستقرار التشغيلي للمؤسسات.",
      },
    ],
  },
  products: {
    molatik: {
      badge: "Molatik Workforce",
      title: "أتمتة إدارة المناوبات والاستراحات",
      intro:
        "Molatik يخفّف العبء اليدوي في متابعة الفرق ويوفّر للمديرين رؤية تشغيلية لحظية.",
      highlights: [
        "تدفق مهام وتسجيل حضور حسب المناوبة",
        "حوكمة الاستراحات وفق السياسات",
        "سجلات ميدانية مدعومة بالموقع",
        "لوحات يومية موجهة للمديرين",
      ],
      privacyCta: "فتح سياسة خصوصية Molatik",
    },
    kunyex: {
      badge: "KunyeX Identity",
      title: "توحيد الهوية الرقمية والتحكم في الوصول",
      intro:
        "KunyeX يربط الهوية المادية بالهوية الرقمية ويُسرّع عمليات التحقق الآمنة من الملفات الشخصية.",
      highlights: [
        "تحقق سريع من الملف الشخصي عبر NFC/QR",
        "نموذج صلاحيات قائم على الأدوار",
        "تفعيل الترخيص المرتبط بالأجهزة",
        "سجلات تدقيق قابلة للمراجعة",
      ],
      privacyCta: "فتح سياسة خصوصية KunyeX",
    },
    logistics: {
      badge: "Traxle Logistics",
      title: "التحكم اللوجستي من العرض حتى التسليم",
      intro:
        "Traxle Logistics يحوّل إدارة الشحن والتسليم إلى تدفق رقمي قابل للقياس.",
      highlights: [
        "محرك مطابقة الشحنة مع المركبة",
        "سلسلة إثبات التسليم",
        "تحليلات المسار والتكلفة",
        "لوحات مؤشرات تشغيلية KPI",
      ],
      privacyCta: "تواصل معنا لتفاصيل العمليات",
    },
  },
  productPrivacy: {
    molatik: {
      title: "سياسة خصوصية Molatik",
      intro:
        "يوضح هذا النص نطاق البيانات وضوابط الأمان ومبادئ الوصول المعتمدة في Molatik.",
      sections: [
        {
          title: "نطاق البيانات",
          body: "بيانات الموظفين والمناوبات والاستراحات والمهام تُعالَج فقط لغرض تقديم الخدمة.",
        },
        {
          title: "الوصول",
          body: "تُحمى الإجراءات الحساسة بنموذج صلاحيات قائم على الأدوار مع المصادقة متعددة العوامل.",
        },
        {
          title: "الأمان",
          body: "يتم تشفير البيانات أثناء النقل وعند التخزين.",
        },
      ],
    },
    kunyex: {
      title: "سياسة خصوصية KunyeX",
      intro:
        "يغطي هذا النص معالجة بيانات الهوية وآليات الترخيص ومبادئ التدقيق في KunyeX.",
      sections: [
        {
          title: "بيانات الهوية",
          body: "تتم معالجة بيانات الملف والتحقق وفق مبدأ تقييد الغرض.",
        },
        {
          title: "أمان الترخيص",
          body: "يرتبط عميل المؤسسة بهوية أجهزة معتمدة فقط.",
        },
        {
          title: "التدقيق",
          body: "تُسجل الإجراءات الحرجة مع ضوابط سلامة البيانات.",
        },
      ],
    },
  },
  pages: {
    features: {
      title: "المزايا",
      intro: "وحدات Traxle مصممة لرفع سرعة العمليات وتحسين الحوكمة.",
      sections: [
        { title: "الأتمتة", body: "تحويل الإجراءات المتكررة إلى تدفقات آلية قائمة على القواعد." },
        { title: "تقارير لحظية", body: "متابعة أداء الفرق والمواقع في الوقت الفعلي." },
        { title: "امتثال مؤسسي", body: "إدارة الصلاحيات وسجلات التدقيق مركزياً." },
      ],
    },
    pricing: {
      title: "الأسعار",
      intro: "ترخيص مرن بنموذج وحدات: ادفع فقط مقابل ما يستخدمه فريقك فعلياً.",
      sections: [
        { title: "نموذج الباقات", body: "يمكن تفعيل KunyeX وMolatik وLogistics بشكل منفصل أو مجتمع." },
        { title: "قابلية التوسع", body: "يتوسع الترخيص مع نمو الاستخدام." },
        { title: "الدعم", body: "الإعداد والتدريب والدعم الفني تُدار وفق SLA." },
      ],
    },
    integrations: {
      title: "التكاملات",
      intro: "تكامل ثنائي الاتجاه مع أنظمة ERP والمحاسبة والعمليات.",
      sections: [
        { title: "API", body: "واجهات REST آمنة وwebhooks لدمج سريع." },
        { title: "خدمات الهوية", body: "دعم SSO ودلائل المؤسسات." },
        { title: "تصدير BI", body: "تصدير مجدول إلى منصات التحليلات." },
      ],
    },
    contact: {
      title: "اتصل بنا",
      intro: "تواصل معنا لطلب عرض تجريبي أو تسعير أو مناقشة التنفيذ.",
      sections: [
        { title: "المبيعات", body: "نرد عادة على طلبات الشركات خلال يوم عمل واحد." },
        { title: "الدعم التقني", body: "العملاء النشطون يحصلون على دعم عبر قنوات مراقبة وفق SLA." },
        { title: "الشراكات", body: "طلبات التكامل والشراكة تُقيَّم عبر مسار منفصل." },
      ],
    },
    careers: {
      title: "الوظائف",
      intro: "نبحث عن أشخاص يحوّلون التعقيد التشغيلي إلى منتجات واضحة وقابلة للتنفيذ.",
      sections: [
        { title: "الثقافة", body: "ملكية العمل، سرعة القرار، وأثر قابل للقياس." },
        { title: "نموذج العمل", body: "خيارات عمل هجينة وعن بُعد حسب الدور." },
        { title: "الوظائف المفتوحة", body: "أدوار الهندسة والمنتج والعمليات متاحة بشكل مستمر." },
      ],
    },
    updates: {
      title: "تحديثات المنتج",
      intro: "ملاحظات الإصدارات وتحسينات الأمان وتحديثات خارطة الطريق.",
      sections: [
        { title: "أحدث إصدار", body: "تم إطلاق تحسينات الأداء وعرض لوحات المتابعة." },
        { title: "الأمان", body: "تم تحديث قواعد حماية الجلسات وتنبيهات التدقيق." },
        { title: "قريباً", body: "تخطيط مسارات متقدم وتحليلات تكلفة تلقائية قيد التطوير." },
      ],
    },
    privacy: {
      title: "سياسة الخصوصية",
      intro: "توضح هذه السياسة نوع البيانات التي نجمعها وأسباب جمعها.",
      sections: [
        { title: "البيانات المجمعة", body: "بيانات الحساب والاستخدام والعمليات." },
        { title: "الغرض", body: "استمرارية الخدمة والأمان والامتثال القانوني." },
        { title: "الحقوق", body: "طلبات الوصول أو التصحيح أو الحذف متاحة عبر القنوات الرسمية." },
      ],
    },
    terms: {
      title: "شروط الاستخدام",
      intro: "تُعد الجهات التي تستخدم خدمات Traxle موافقة على هذه الشروط.",
      sections: [
        { title: "النطاق", body: "الوحدات والحدود تُحدَّد حسب الخطة المختارة." },
        { title: "المسؤولية", body: "العميل مسؤول عن أمان الحسابات وإدارة المستخدمين." },
        { title: "الإطار القانوني", body: "تُحل النزاعات وفق العقد والجهة القضائية المختصة." },
      ],
    },
    cookies: {
      title: "سياسة ملفات الارتباط",
      intro: "نستخدم ملفات الارتباط للجلسات الآمنة وتحسين أداء المنتج.",
      sections: [
        { title: "ملفات الارتباط الأساسية", body: "ضرورية للمصادقة والتحقق الأمني." },
        { title: "ملفات التحليل", body: "بيانات استخدام مجهولة تساعدنا على تحسين التجربة." },
        { title: "إدارة التفضيلات", body: "يمكن تعديل إعدادات ملفات الارتباط من المتصفح." },
      ],
    },
    kvkk: {
      title: "إشعار حماية البيانات",
      intro: "معلومات حول معالجة البيانات الشخصية بواسطة Traxle بصفته متحكم بيانات.",
      sections: [
        { title: "متحكم البيانات", body: "Traxle مسؤول عن أنشطة المعالجة ضمن نطاق الخدمات المقدمة." },
        { title: "الأساس القانوني", body: "تنفيذ العقد والمصلحة المشروعة والالتزامات القانونية." },
        { title: "الطلبات", body: "تُستقبل الطلبات عبر قنوات التواصل الرسمية." },
      ],
    },
    refund: {
      title: "الإلغاء والاسترداد",
      intro: "تعتمد آلية الإلغاء والاسترداد على الخطة المختارة وشروط العقد.",
      sections: [
        { title: "الإلغاء", body: "يمكن بدء طلب الإلغاء من اللوحة أو عبر فريق الدعم." },
        { title: "مراجعة الاسترداد", body: "يتم تقييم الأهلية بناءً على الاستخدام وشروط العقد." },
        { title: "الإتمام", body: "يتم إتمام عمليات الاسترداد المعتمدة من فريق المالية." },
      ],
    },
    distance: {
      title: "اتفاقية الخدمة عن بُعد",
      intro: "تحدد حقوق والتزامات الأطراف للخدمات المقدمة رقمياً.",
      sections: [
        { title: "الأطراف", body: "اتفاق بين Traxle والجهة المشتركة في الخدمة." },
        { title: "التسليم", body: "يتم توفير الوصول رقمياً عبر الوحدات المرخصة." },
        { title: "الإنهاء", body: "تخضع شروط الإنهاء لمدة الخطة وبنود العقد." },
      ],
    },
    preInfo: {
      title: "نموذج المعلومات المسبقة",
      intro: "نعرض نطاق الخدمة والتسعير وتفاصيل الدعم قبل إتمام الشراء.",
      sections: [
        { title: "تعريف الخدمة", body: "توضيح النطاق التقني للوحدات المختارة." },
        { title: "التسعير", body: "عرض الرسوم والضرائب والتكاليف الإضافية بشفافية." },
        { title: "الدعم", body: "تحديد قنوات الإعداد والدعم قبل الإطلاق التشغيلي." },
      ],
    },
  },
};


