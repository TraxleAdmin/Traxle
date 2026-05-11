import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 🔥 Mevcut iyzipay ayarın korunuyor
  serverExternalPackages: ["iyzipay"],

  // 🔥 GÖRÜNMEZ KÖPRÜ (Rewrite Maskesi)
  async rewrites() {
    return [
      {
        // 1. DÜZELTME: Sadece klasör yolu yazılır (Domain kullanılmaz)
        source: '/guncelleme/KunyeX_Master_Client.exe',
        
        // 2. DÜZELTME: Firebase'den aldığın HTTPS indirme linkini buraya yapıştır
        destination: 'https://firebasestorage.googleapis.com/v0/b/kunyex-lisans.firebasestorage.app/o/KunyeX_Master_Client.exe?alt=media&token=9624226d-eb25-49c2-8635-a59174b9979e',
      },
    ];
  },
};

export default nextConfig;