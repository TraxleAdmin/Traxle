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
  accounts: "128+",
  records: "1.2M+",
  uptime: "99.96%",
};

export const CONTENT: Record<Locale, LocaleContent> = {
  tr: {
    nav: {
      brandTag: "Traxle Teknoloji Ekosistemi",
      links: [
        { key: "kunyex", label: "KunyeX" },
        { key: "molatik", label: "Molatik" },
        { key: "logistics", label: "Logistics" },
        { key: "about", label: "Hakkimizda" },
      ],
      cta: { key: "contact", label: "Iletisim" },
      languageLabel: "Dil",
    },
    footer: {
      description:
        "Traxle, dijital kimlik, saha ekip yonetimi ve lojistik operasyonlarini tek veri omurgasinda birlestiren kurumsal yazilim platformudur.",
      ecosystem: "Ekosistem",
      company: "Sirket",
      legal: "Yasal",
      copyright: "(c) 2026 Traxle. Tum haklari saklidir.",
    },
    home: {
      badge: "Canli Ekosistem",
      title: "Programlari Tek Cati Altinda Yoneten Operasyon Platformu",
      intro:
        "KunyeX, Molatik ve Logistics urunlerini ortak veri modeliyle birlestirerek operasyon ekiplerine hiz, gorunurluk ve denetlenebilirlik sagliyoruz.",
      cards: [
        {
          key: "kunyex",
          title: "KunyeX",
          description: "NFC/QR tabanli dijital kimlik ve rol bazli yetkilendirme yonetimi.",
          status: "Kurumsal kullanimda",
        },
        {
          key: "molatik",
          title: "Molatik",
          description: "Vardiya, mola, gorev atama ve saha performansini tek panelden yonetir.",
          status: "Aktif gelistirme",
        },
        {
          key: "logistics",
          title: "Traxle Logistics",
          description: "Yuk eslestirme, teslimat takip ve maliyet raporlamayi birlestirir.",
          status: "Pilot surecler aktif",
        },
      ],
    },
    about: {
      badge: "Traxle Hakkinda",
      title: "Gercek Operasyon Problemlerine Urun Tabanli Cozum",
      intro:
        "Saha ekipleri, depo ve lojistik sureclerinde daÄŸinik yapilari birlestiren moduler yazilimlar gelistiriyoruz. Kararlarimizi sahadan gelen gercek veri ve olculebilir sonuclar belirler.",
      stats: [
        { label: "Aktif Kurumsal Hesap", value: COMMON_STATS.accounts },
        { label: "Aylik Islenen Kayit", value: COMMON_STATS.records },
        { label: "Platform Uptime", value: COMMON_STATS.uptime },
      ],
      sections: [
        {
          title: "Ne yapiyoruz?",
          body: "Dijital kimlik, isgucu yonetimi ve lojistik operasyonlari tek ekosistemde birlestiren moduller tasarliyoruz.",
        },
        {
          title: "Nasil calisiyoruz?",
          body: "Her urunu operasyon ekipleriyle birlikte modelleyip performans metrikleriyle surekli iyilestiriyoruz.",
        },
        {
          title: "Neyi garanti ediyoruz?",
          body: "Guvenlik, izlenebilirlik, hizli uyarlama ve kesintisiz kurumsal kullanim.",
        },
      ],
    },
    products: {
      molatik: {
        badge: "Molatik Workforce",
        title: "Vardiya ve Mola Operasyonlarini Otonomlastirin",
        intro:
          "Molatik, ekip yonetimindeki manuel takip yukunu azaltir ve yoneticilere anlik operasyon gorunurlugu saglar.",
        highlights: [
          "Vardiya bazli gorev ve check-in akisi",
          "Politika bazli mola denetimi",
          "Lokasyon destekli saha kayitlari",
          "Yonetici odakli gunluk performans panelleri",
        ],
        privacyCta: "Molatik Gizlilik Sayfasini Ac",
      },
      kunyex: {
        badge: "KunyeX Identity",
        title: "Dijital Kimlik ve Yetki Kontrolunu Standartlastirin",
        intro:
          "KunyeX, fiziksel ve dijital kimlik baglantisini guvenli sekilde yoneterek profil dogrulama surecini hizlandirir.",
        highlights: [
          "NFC/QR ile hizli profil dogrulama",
          "Rol bazli yetki modeli",
          "Donanim bagimli lisans dogrulamasi",
          "Denetlenebilir audit kayitlari",
        ],
        privacyCta: "KunyeX Gizlilik Sayfasini Ac",
      },
      logistics: {
        badge: "Traxle Logistics",
        title: "Tekliften Teslimata Kadar Lojistik Kontrol",
        intro:
          "Traxle Logistics, yuk eslestirme ve sevkiyat akisini veri odakli hale getirir.",
        highlights: [
          "Yuk-arac eslestirme motoru",
          "Teslimat kanit zinciri",
          "Rota ve maliyet analizi",
          "Operasyonel KPI panelleri",
        ],
        privacyCta: "Iletisim ekibiyle surec bilgisi al",
      },
    },
    productPrivacy: {
      molatik: {
        title: "Molatik Gizlilik Politikasi",
        intro:
          "Bu metin Molatik urununde islenen verilerin kapsamini, guvenlik prensiplerini ve erisim kontrollerini aciklar.",
        sections: [
          { title: "Veri kapsami", body: "Personel, vardiya, mola ve gorev kayitlari sadece hizmet sunumu amaciyla islenir." },
          { title: "Erisim", body: "Rol bazli erisim modeli ve MFA ile kritik ekranlar korunur." },
          { title: "Guvenlik", body: "Iletisim TLS ile sifrelenir, hassas veriler depoda sifreli tutulur." },
        ],
      },
      kunyex: {
        title: "KunyeX Gizlilik Politikasi",
        intro:
          "Bu metin KunyeX urunundeki dijital kimlik verisi, lisanslama ve audit sureclerini kapsar.",
        sections: [
          { title: "Kimlik verisi", body: "Profil ve dogrulama verisi amac sinirlamasi ilkesiyle islenir." },
          { title: "Lisans guvenligi", body: "Kurumsal istemciler yetkili cihaz kimligine baglanir." },
          { title: "Denetim", body: "Kritik islem kayitlari butunluk kontrolleriyle saklanir." },
        ],
      },
    },
    pages: {
      features: {
        title: "Ozellikler",
        intro: "Traxle modulleri, operasyon hizi ve denetlenebilirlik ihtiyacina gore tasarlanir.",
        sections: [
          { title: "Otomasyon", body: "Tekrarlayan surecler kural tabanli otomatiklestirilir." },
          { title: "Canli raporlama", body: "Ekip ve lokasyon performansi anlik takip edilir." },
          { title: "Kurumsal uyum", body: "Yetki ve log politikalarini merkezi olarak uygular." },
        ],
      },
      pricing: {
        title: "Fiyatlandirma",
        intro: "Moduler lisanslama ile her ekip sadece ihtiyac duydugu urune odeme yapar.",
        sections: [
          { title: "Paket modeli", body: "KunyeX, Molatik ve Logistics modulleri ayri veya birlikte alinabilir." },
          { title: "Olceklenebilirlik", body: "Kullanim hacmine gore lisans yapisi buyutulebilir." },
          { title: "Destek", body: "Onboarding, egitim ve teknik destek SLA kapsaminda planlanir." },
        ],
      },
      integrations: {
        title: "Entegrasyonlar",
        intro: "ERP, muhasebe ve operasyon sistemleriyle cift yonlu veri baglantisi kuruyoruz.",
        sections: [
          { title: "API", body: "Guvenli REST API ve webhook katmani ile hizli entegrasyon." },
          { title: "Kimlik servisleri", body: "SSO ve kurumsal dizin servisleri destegi." },
          { title: "BI aktarimi", body: "Planli export ile analitik sistemlere veri akisi." },
        ],
      },
      contact: {
        title: "Iletisim",
        intro: "Demo, fiyatlandirma ve teknik is birligi talepleri icin ekibimize ulasabilirsiniz.",
        sections: [
          { title: "Satis", body: "Kurumsal taleplere 1 is gunu icinde donus saglanir." },
          { title: "Teknik destek", body: "Aktif musteriler icin SLA odakli destek akisi bulunur." },
          { title: "Partnerlik", body: "Entegrasyon ve kanal partnerligi surecleri ayrica degerlendirilir." },
        ],
      },
      careers: {
        title: "Kariyer",
        intro: "Operasyon bilgisiyle urun gelistiren ekip arkadaslari ariyoruz.",
        sections: [
          { title: "Kultur", body: "Sorumluluk alan, hizli karar veren ve olculebilir sonuc ureten ekip modeli." },
          { title: "Calisma sekli", body: "Role gore hibrit ve uzaktan calisma imkani." },
          { title: "Acik roller", body: "Muhendislik, urun ve operasyon pozisyonlari surekli aciktir." },
        ],
      },
      updates: {
        title: "Urun Guncellemeleri",
        intro: "Surum notlari, guvenlik iyilestirmeleri ve roadmap ozeti bu sayfada yayinlanir.",
        sections: [
          { title: "Son surum", body: "Performans ve dashboard iyilestirmeleri yayina alindi." },
          { title: "Guvenlik", body: "Oturum guvenligi ve audit alarm kurallari guncellendi." },
          { title: "Yolda olanlar", body: "Gelistirilmis rota planlama ve otomatik maliyet analizi geliyor." },
        ],
      },
      privacy: {
        title: "Gizlilik Politikasi",
        intro: "Platformda toplanan verilerin hangi amaclarla islendigi bu metinde aciklanir.",
        sections: [
          { title: "Toplanan veriler", body: "Hesap, kullanim ve operasyon kayitlari." },
          { title: "Kullanim amaci", body: "Hizmet surekliligi, guvenlik ve yasal yukumluluk." },
          { title: "Haklar", body: "Erisim, duzeltme ve silme talepleri resmi kanallardan iletilebilir." },
        ],
      },
      terms: {
        title: "Kullanim Kosullari",
        intro: "Traxle hizmetlerini kullanan kurumlar bu kosullari kabul etmis sayilir.",
        sections: [
          { title: "Kapsam", body: "Moduller ve kullanim limitleri secilen plana gore belirlenir." },
          { title: "Sorumluluk", body: "Hesap guvenligi ve kullanici yonetimi musteri sorumlulugundadir." },
          { title: "Hukuki cerceve", body: "Uyusmazliklar sozlesme ve yetkili yargi kapsaminda cozulur." },
        ],
      },
      cookies: {
        title: "Cerez Politikasi",
        intro: "Guvenli oturum ve performans olcumleri icin cerez teknolojileri kullanilir.",
        sections: [
          { title: "Zorunlu cerezler", body: "Kimlik dogrulama ve guvenlik icin gereklidir." },
          { title: "Analitik cerezler", body: "Anonim kullanim verileriyle deneyim iyilestirilir." },
          { title: "Tercih yonetimi", body: "Tarayici ayarlarindan cerez tercihleri duzenlenebilir." },
        ],
      },
      kvkk: {
        title: "KVKK Aydinlatma",
        intro: "Veri sorumlusu olarak kisÌ§isel veri isleme faaliyetlerimize iliskin bilgilendirme.",
        sections: [
          { title: "Veri sorumlusu", body: "Traxle, hizmet kapsami icindeki veri isleme faaliyetlerinden sorumludur." },
          { title: "Hukuki sebep", body: "Sozlesmenin ifasi, mesru menfaat ve yasal yukumluluk." },
          { title: "Basvuru", body: "Talepler resmi iletisim kanallarindan alinmaktadir." },
        ],
      },
      refund: {
        title: "Iptal ve Iade",
        intro: "Iptal ve iade surecleri secilen plan ile sozlesme maddelerine gore yonetilir.",
        sections: [
          { title: "Iptal", body: "Iptal talebi panel veya destek kanali uzerinden baslatilir." },
          { title: "Iade degerlendirmesi", body: "Kullanim ve sozlesme durumuna gore uygunluk incelenir." },
          { title: "Tamamlama", body: "Onaylanan iade surecleri finans ekibi tarafindan sonuclandirilir." },
        ],
      },
      distance: {
        title: "Mesafeli Hizmet Sozlesmesi",
        intro: "Dijital ortamda sunulan hizmetler icin taraflarin hak ve yukumlulukleri belirlenir.",
        sections: [
          { title: "Taraflar", body: "Traxle ile hizmet alan kurum arasinda kurulur." },
          { title: "Teslim", body: "Erisim dijital olarak lisanslanan modullerle saglanir." },
          { title: "Fesih", body: "Sona erdirme kosullari plan ve sure taahhudune gore uygulanir." },
        ],
      },
      preInfo: {
        title: "On Bilgilendirme Formu",
        intro: "Satin alma oncesinde hizmet kapsami ve maliyet detaylari sunulur.",
        sections: [
          { title: "Hizmet tanimi", body: "Secilen modullerin teknik kapsami listelenir." },
          { title: "Ucretlendirme", body: "Vergi, periyot ve ek servis bedelleri acikca belirtilir." },
          { title: "Destek", body: "Kurulum ve destek kanal detaylari onceden paylasilir." },
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
    ...CONTENT.en.nav,
    brandTag: "Traxle Technologie-Okosystem",
    links: [
      { key: "kunyex", label: "KunyeX" },
      { key: "molatik", label: "Molatik" },
      { key: "logistics", label: "Logistik" },
      { key: "about", label: "Unternehmen" },
    ],
    cta: { key: "contact", label: "Kontakt" },
    languageLabel: "Sprache",
  },
  footer: {
    ...CONTENT.en.footer,
    description:
      "Traxle ist eine Unternehmensplattform fur digitale Identitat, Teamsteuerung und Logistikprozesse.",
    ecosystem: "Okosystem",
    company: "Unternehmen",
    legal: "Rechtliches",
    copyright: "(c) 2026 Traxle. Alle Rechte vorbehalten.",
  },
};

CONTENT.ru = {
  ...CONTENT.en,
  nav: {
    ...CONTENT.en.nav,
    brandTag: "Tekhnologicheskaya ekosistema Traxle",
    links: [
      { key: "kunyex", label: "KunyeX" },
      { key: "molatik", label: "Molatik" },
      { key: "logistics", label: "Logistika" },
      { key: "about", label: "O kompanii" },
    ],
    cta: { key: "contact", label: "Kontakty" },
    languageLabel: "Yazyk",
  },
  footer: {
    ...CONTENT.en.footer,
    description:
      "Traxle obedinyaet tsifrovuyu identifikaciyu, upravlenie komandami i logisticheskie processy v odnoi platforme.",
    ecosystem: "Ekosistema",
    company: "Kompaniya",
    legal: "Pravo",
    copyright: "(c) 2026 Traxle. Vse prava zashchishcheny.",
  },
};

CONTENT.ar = {
  ...CONTENT.en,
  nav: {
    ...CONTENT.en.nav,
    brandTag: "Manzumat Traxle al-taqniyya",
    links: [
      { key: "kunyex", label: "KunyeX" },
      { key: "molatik", label: "Molatik" },
      { key: "logistics", label: "Logistics" },
      { key: "about", label: "Man nahn" },
    ],
    cta: { key: "contact", label: "Ittisal" },
    languageLabel: "Lugha",
  },
  footer: {
    ...CONTENT.en.footer,
    description:
      "Traxle mansa muassasiyya li idarat al-hawiyya al-raqmiyya wa al-firaq al-midaniyya wa al-lujistiyat.",
    ecosystem: "Al-manzuma",
    company: "Al-sharika",
    legal: "Qanuni",
    copyright: "(c) 2026 Traxle. jami al-huquq mahfuza.",
  },
};

// Language-specific content overrides for DE/RU/AR pages.
CONTENT.de = {
  ...CONTENT.de,
  home: {
    ...CONTENT.de.home,
    badge: "Aktives Okosystem",
    title: "Programme auf einer gemeinsamen operativen Plattform",
    intro: "Wir verbinden KunyeX, Molatik und Logistics in einer Datenstruktur fur Geschwindigkeit, Transparenz und Kontrolle.",
  },
  about: {
    ...CONTENT.de.about,
    badge: "Uber Traxle",
    title: "Produktorientierte Losungen fur reale Betriebsablaufe",
    intro: "Unsere Teams entwickeln modulare Software fur Feldbetrieb, Compliance und Logistiksteuerung mit messbaren Ergebnissen.",
  },
  pages: {
    ...CONTENT.de.pages,
    features: { ...CONTENT.de.pages.features, title: "Funktionen" },
    pricing: { ...CONTENT.de.pages.pricing, title: "Preise" },
    integrations: { ...CONTENT.de.pages.integrations, title: "Integrationen" },
    contact: { ...CONTENT.de.pages.contact, title: "Kontakt" },
    careers: { ...CONTENT.de.pages.careers, title: "Karriere" },
    updates: { ...CONTENT.de.pages.updates, title: "Produkt-Updates" },
    privacy: { ...CONTENT.de.pages.privacy, title: "Datenschutz" },
    terms: { ...CONTENT.de.pages.terms, title: "Nutzungsbedingungen" },
    cookies: { ...CONTENT.de.pages.cookies, title: "Cookie-Richtlinie" },
    kvkk: { ...CONTENT.de.pages.kvkk, title: "Datenschutzhinweis" },
  },
};

CONTENT.ru = {
  ...CONTENT.ru,
  home: {
    ...CONTENT.ru.home,
    badge: "Aktivnaya ekosistema",
    title: "Programmy na yedinoi operacionnoi platforme",
    intro: "KunyeX, Molatik i Logistics rabotayut v obshchei modeli dannyh dlya skorosti, prozrachnosti i upravleniya.",
  },
  about: {
    ...CONTENT.ru.about,
    badge: "O Traxle",
    title: "Produktovye resheniya dlya realnyh operacionnyh zadach",
    intro: "My sozdayem modulnye produkty dlya polevyh komand, compliance i logistiki s oporoi na izmeryaemye rezultaty.",
  },
  pages: {
    ...CONTENT.ru.pages,
    features: { ...CONTENT.ru.pages.features, title: "Vozmozhnosti" },
    pricing: { ...CONTENT.ru.pages.pricing, title: "Tarify" },
    integrations: { ...CONTENT.ru.pages.integrations, title: "Integracii" },
    contact: { ...CONTENT.ru.pages.contact, title: "Kontakty" },
    careers: { ...CONTENT.ru.pages.careers, title: "Karera" },
    updates: { ...CONTENT.ru.pages.updates, title: "Obnovleniya produkta" },
    privacy: { ...CONTENT.ru.pages.privacy, title: "Politika konfidentsialnosti" },
    terms: { ...CONTENT.ru.pages.terms, title: "Usloviya ispolzovaniya" },
    cookies: { ...CONTENT.ru.pages.cookies, title: "Politika cookie" },
    kvkk: { ...CONTENT.ru.pages.kvkk, title: "Uvedomlenie o dannyh" },
  },
};

CONTENT.ar = {
  ...CONTENT.ar,
  home: {
    ...CONTENT.ar.home,
    badge: "Ecosystem Active",
    title: "Idarat al-baramij ala manassa tashghiliyya wahida",
    intro: "Narbut KunyeX wa Molatik wa Logistics fi model bayanat wahid lilsur'a wal-wuduh wal-tahakkum.",
  },
  about: {
    ...CONTENT.ar.about,
    badge: "About Traxle",
    title: "Hulul muntaja li mushkilat tashghiliyya haqiqiya",
    intro: "Nubni baramij modular li idarat al-firaq wal-imtithal wal-lujistiyat bi natayij qabilah lil-qiyas.",
  },
  pages: {
    ...CONTENT.ar.pages,
    features: { ...CONTENT.ar.pages.features, title: "Mizat" },
    pricing: { ...CONTENT.ar.pages.pricing, title: "Asaar" },
    integrations: { ...CONTENT.ar.pages.integrations, title: "Takamulat" },
    contact: { ...CONTENT.ar.pages.contact, title: "Ittisal" },
    careers: { ...CONTENT.ar.pages.careers, title: "Wazayif" },
    updates: { ...CONTENT.ar.pages.updates, title: "Tahdithat al-muntaj" },
    privacy: { ...CONTENT.ar.pages.privacy, title: "Siyasat al-khususiya" },
    terms: { ...CONTENT.ar.pages.terms, title: "Shurut al-istikhdam" },
    cookies: { ...CONTENT.ar.pages.cookies, title: "Siyasat cookie" },
    kvkk: { ...CONTENT.ar.pages.kvkk, title: "Iishaar himayat al-bayanat" },
  },
};

