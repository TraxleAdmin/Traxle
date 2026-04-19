import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 🔥 Mevcut iyzipay ayarın korunuyor
  serverExternalPackages: ["iyzipay"],

  // 🔥 GÖRÜNMEZ KÖPRÜ (Rewrite Maskesi)
  async rewrites() {
    return [
      {
        // Şubelerin göreceği havalı link:
        source: 'https://www.traxleapp.com/guncelleme/KunyeX_Master_Client.exe',
        // Firebase'den kopyaladığın o uzun linki BURAYA yapıştır:
        destination: 'gs://kunyex-lisans.firebasestorage.app/KunyeX_Master_Client.exe',
      },
    ];
  },
};

export default nextConfig;