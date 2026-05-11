import type { CSSProperties } from "react";
import { FaFileCode, FaWindows } from "react-icons/fa";
import { FiArrowUpRight, FiRefreshCw, FiShield } from "react-icons/fi";
import PremiumUtilityPage from "@/components/PremiumUtilityPage";

const MANIFEST_URL = "https://traxleapp.com/guncelleme/kunyex-latest.json";
const EXE_URL = "https://traxleapp.com/guncelleme/KunyeX_Master_Client.exe";
const tone = { "--tone-a": "#34d399", "--tone-b": "#10b981", "--tone-c": "#84cc16" } as CSSProperties;

export default function KunyeXManualUpdatePage() {
  return (
    <PremiumUtilityPage
      tone={tone}
      eyebrow="KunyeX Manuel Güncelleme"
      title="KunyeX istemci paketini kontrollü şekilde dağıt."
      intro="Saha ve merkez ekipleri için manifest doğrulama, EXE kurulumu ve kurulum sonrası kontrol adımlarını tek premium arayüzde topladık."
      icon={FiRefreshCw}
      visualTitle="KunyeX dağıtım akışı"
      visualRows={["Manifest sürüm bilgisi okunur", "EXE paketi yönetici yetkisiyle kurulur", "Profil ve senkronizasyon testleri tamamlanır"]}
      primaryAction={{ href: EXE_URL, label: "KunyeX Master Client indir", icon: <FaWindows /> }}
      secondaryAction={{ href: MANIFEST_URL, label: "Manifest JSON aç", icon: <FaFileCode />, external: true }}
      cards={[
        {
          eyebrow: "Sürüm kaynağı",
          title: "Manifest doğrulaması",
          body: "Masaüstü istemci yeni sürüm kontrolü için resmi JSON manifestini okur.",
          points: [MANIFEST_URL, "Sürüm, hash ve dağıtım bilgisi bu kaynak üzerinden kontrol edilir."],
          actions: [{ href: MANIFEST_URL, label: "JSON dosyasını aç", icon: <FaFileCode />, external: true }],
        },
        {
          eyebrow: "Kurulum paketi",
          title: "Manuel EXE kurulumu",
          body: "Otomatik dağıtım kapalıysa veya şube bazlı kontrollü geçiş gerekiyorsa resmi EXE paketi kullanılır.",
          points: [EXE_URL, "Kurulum sonrası giriş, profil ve senkronizasyon kontrolleri yapılır."],
          actions: [
            { href: EXE_URL, label: "EXE indir", icon: <FaWindows /> },
            { href: "/barkodx/uygulamalar/guncelleme", label: "BarkodX dağıtımı", icon: <FiArrowUpRight />, muted: true },
          ],
        },
        {
          eyebrow: "Operasyon güvenliği",
          title: "Kurulum kontrol listesi",
          body: "Canlı geçiş öncesinde mevcut kurulum yedeği alınır, manifest sürümü doğrulanır ve cihaz senkronu test edilir.",
          points: ["Mevcut dizinin yedeğini alın.", "EXE dosyasını yönetici yetkisiyle çalıştırın.", "İlk oturumda audit ve sync kontrollerini tamamlayın."],
          actions: [{ href: "/guncelleme", label: "Güncelleme merkezine dön", icon: <FiShield />, muted: true }],
        },
      ]}
      footerTitle="KunyeX dağıtımını standartlaştır."
      footerBody="Manifest, EXE ve operasyon adımlarını tek kontrol yüzeyinde tutarak saha geçişlerini daha güvenli hale getirin."
    />
  );
}
