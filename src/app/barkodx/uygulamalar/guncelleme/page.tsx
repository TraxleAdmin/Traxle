import type { CSSProperties } from "react";
import { FaApple, FaFileCode, FaWindows } from "react-icons/fa";
import { FiDatabase } from "react-icons/fi";
import PremiumUtilityPage from "@/components/PremiumUtilityPage";

const BARKODX_APPSTORE_URL = "https://apps.apple.com/tr/app/barkodx/id6767043219?l=tr";
const KUNYEX_MANIFEST_URL = "https://traxleapp.com/guncelleme/kunyex-latest.json";
const KUNYEX_EXE_URL = "https://traxleapp.com/guncelleme/KunyeX_Master_Client.exe";
const tone = { "--tone-a": "#22d3ee", "--tone-b": "#2563eb", "--tone-c": "#38bdf8" } as CSSProperties;

export default function BarkodxApplicationsUpdatePage() {
  return (
    <PremiumUtilityPage
      tone={tone}
      eyebrow="BarkodX Uygulamalar"
      title="BarkodX dağıtım ve veri transfer merkezi."
      intro="BarkodX kullanan ekipler için iOS indirme, DataTransfer akışı ve KunyeX masaüstü kaynaklarını aynı operasyon panelinde toplar."
      icon={FiDatabase}
      visualTitle="BarkodX operasyon dağıtımı"
      visualRows={["App Store kurulum bağlantısı", "DataTransfer cihaz geçiş akışı", "KunyeX masaüstü güncelleme kaynakları"]}
      primaryAction={{ href: BARKODX_APPSTORE_URL, label: "BarkodX App Store indir", icon: <FaApple />, external: true }}
      secondaryAction={{ href: "/guncelleme/barkodx-datatransfer", label: "DataTransfer sayfası", icon: <FiDatabase /> }}
      cards={[
        {
          eyebrow: "Uygulama dağıtımı",
          title: "BarkodX iOS indirme",
          body: "Saha ekiplerinin BarkodX kurulumunu resmi App Store bağlantısı ile standartlaştırın.",
          actions: [{ href: BARKODX_APPSTORE_URL, label: "App Store'dan indir", icon: <FaApple />, external: true }],
        },
        {
          eyebrow: "Veri taşıma",
          title: "DataTransfer adımları",
          body: "Cihaz değişimlerinde veri kaybını azaltmak için BarkodX transfer akışını kontrollü şekilde ilerletin.",
          actions: [{ href: "/guncelleme/barkodx-datatransfer", label: "DataTransfer aç", icon: <FiDatabase /> }],
        },
        {
          eyebrow: "Masaüstü güncelleme",
          title: "KunyeX update kaynakları",
          body: "Entegrasyonlu süreçler için KunyeX istemci sürüm kontrolü ve manuel EXE dağıtım bağlantıları.",
          actions: [
            { href: KUNYEX_MANIFEST_URL, label: "kunyex-latest.json", icon: <FaFileCode />, external: true, muted: true },
            { href: KUNYEX_EXE_URL, label: "Master Client indir", icon: <FaWindows /> },
          ],
        },
      ]}
      footerTitle="BarkodX kurulumlarını tek standarda çek."
      footerBody="İndirme, transfer ve doğrulama adımları aynı sayfada olduğunda saha geçişleri daha hızlı ve daha güvenli ilerler."
    />
  );
}
