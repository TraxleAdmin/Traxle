import type { CSSProperties } from "react";
import { FaFileCode, FaWindows } from "react-icons/fa";
import { FiArrowUpRight, FiDatabase, FiRefreshCw } from "react-icons/fi";
import PremiumUtilityPage from "@/components/PremiumUtilityPage";

const tone = { "--tone-a": "#22d3ee", "--tone-b": "#2563eb", "--tone-c": "#38bdf8" } as CSSProperties;

export default function UpdateHubPage() {
  return (
    <PremiumUtilityPage
      tone={tone}
      eyebrow="TRAXLE Güncelleme Merkezi"
      title="Dağıtım, manifest ve veri transfer akışları tek merkezde."
      intro="KunyeX istemci güncellemeleri, BarkodX DataTransfer adımları ve saha dağıtım kaynakları için kontrollü operasyon sayfası."
      icon={FiRefreshCw}
      visualTitle="Teknik dağıtım kontrolü"
      visualRows={["KunyeX manifest doğrulaması", "BarkodX veri transfer akışı", "Saha kurulum kontrol listesi"]}
      primaryAction={{ href: "/guncelleme/kunyex", label: "KunyeX paketini aç", icon: <FaWindows /> }}
      secondaryAction={{ href: "/barkodx/uygulamalar/guncelleme", label: "BarkodX dağıtımını aç", icon: <FiDatabase /> }}
      cards={[
        {
          eyebrow: "KunyeX Update",
          title: "Manuel güncelleme paketi",
          body: "Otomatik update kapalıysa veya kontrollü dağıtım gerekiyorsa manifest ve EXE kaynaklarına buradan erişilir.",
          actions: [
            { href: "/guncelleme/kunyex", label: "Güncelleme sayfası", icon: <FaWindows /> },
            { href: "https://traxleapp.com/guncelleme/kunyex-latest.json", label: "JSON manifest", icon: <FaFileCode />, external: true, muted: true },
          ],
        },
        {
          eyebrow: "BarkodX DataTransfer",
          title: "Veri taşıma ve doğrulama",
          body: "Cihaz değişimi senaryolarında veri kaybını azaltmak için BarkodX aktarım akışını standartlaştırır.",
          actions: [
            { href: "/barkodx/uygulamalar/guncelleme", label: "BarkodX uygulamaları", icon: <FiDatabase /> },
            { href: "/guncelleme/barkodx-datatransfer", label: "DataTransfer detayları", icon: <FiArrowUpRight />, muted: true },
          ],
        },
      ]}
      footerTitle="Güncelleme operasyonunu kontrollü ilerlet."
      footerBody="Manifest, kurulum ve transfer adımlarını aynı tasarım diliyle tek merkezden yönetin."
    />
  );
}
