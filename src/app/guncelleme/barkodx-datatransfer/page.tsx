import type { CSSProperties } from "react";
import { FaApple } from "react-icons/fa";
import { FiArrowUpRight, FiDatabase, FiShield } from "react-icons/fi";
import PremiumUtilityPage from "@/components/PremiumUtilityPage";

const BARKODX_APPSTORE_URL = "https://apps.apple.com/tr/app/barkodx/id6767043219?l=tr";
const tone = { "--tone-a": "#22d3ee", "--tone-b": "#2563eb", "--tone-c": "#38bdf8" } as CSSProperties;

export default function BarkodXDataTransferPage() {
  return (
    <PremiumUtilityPage
      tone={tone}
      eyebrow="BarkodX DataTransfer"
      title="Cihaz geçişlerini kontrollü veri transfer akışına bağla."
      intro="BarkodX kullanan ekipler için transfer öncesi hazırlık, taşıma ve doğrulama adımlarını premium operasyon kontrol yüzeyinde topladık."
      icon={FiDatabase}
      visualTitle="Veri taşıma kontrol akışı"
      visualRows={["Eski cihaz son senkronu tamamlanır", "Yetki ve kayıt eşleşmeleri aktarılır", "Rastgele barkod testleriyle doğrulanır"]}
      primaryAction={{ href: BARKODX_APPSTORE_URL, label: "BarkodX App Store indir", icon: <FaApple />, external: true }}
      secondaryAction={{ href: "/guncelleme/kunyex", label: "KunyeX güncelleme", icon: <FiArrowUpRight /> }}
      cards={[
        {
          eyebrow: "Transfer öncesi",
          title: "Hazırlık kontrol kartı",
          body: "Yeni cihaza geçmeden önce stok, ürün ve rol kayıtlarının son durumunu güvenli şekilde hazırlayın.",
          points: [
            "Eski cihazdaki stok ve ürün kayıtlarının son senkronizasyonunu tamamlayın.",
            "Rol bazlı yetkileri kontrol ederek yeni cihaza aktarım listesini oluşturun.",
            "Ekipleri bilgilendirip planlı bir geçiş penceresi belirleyin.",
          ],
          actions: [{ href: "/barkodx/uygulamalar/guncelleme", label: "Dağıtım merkezine dön", icon: <FiDatabase />, muted: true }],
        },
        {
          eyebrow: "Transfer sonrası",
          title: "Doğrulama kontrol kartı",
          body: "Aktarım tamamlandıktan sonra veri uyumu ve kullanıcı akışları kontrollü test edilir.",
          points: [
            "Rastgele barkod okuma testleriyle kayıt eşleşmelerini doğrulayın.",
            "Kullanıcı yetkileri ve oturum akışlarını tek tek test edin.",
            "Stok ve fiyat listelerinin eski cihazla birebir uyumunu kontrol edin.",
          ],
          actions: [{ href: BARKODX_APPSTORE_URL, label: "App Store indir", icon: <FaApple />, external: true }],
        },
        {
          eyebrow: "Güvenlik notu",
          title: "Operasyon notları",
          body: "Canlı ortama geçişte ilk vardiyada örnek barkod kontrolleri ve yetki testleri tamamlanmadan süreci kapatmayın.",
          points: ["Transferi önce test ortamında deneyin.", "Canlı geçişte ilk vardiyayı izleyin.", "Sorun olursa dağıtım merkezine geri dönün."],
          actions: [{ href: "/guncelleme", label: "Güncelleme merkezi", icon: <FiShield />, muted: true }],
        },
      ]}
      footerTitle="Veri geçişlerini daha güvenli yap."
      footerBody="Hazırlık ve doğrulama adımları net olduğunda BarkodX cihaz değişimleri daha az riskle tamamlanır."
    />
  );
}
