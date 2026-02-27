import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 🔥 BU SATIR EKLENDİ: iyzipay hatasını çözer
  serverExternalPackages: ["iyzipay"],
};

export default nextConfig;