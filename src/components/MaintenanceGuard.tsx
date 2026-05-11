// src/components/MaintenanceGuard.tsx
// 🚧 DEV-OPS NOTU: UI Testi için Firestore bağlantısı bypass edildi.
'use client';

import React from 'react';

export default function MaintenanceGuard({ children }: { children: React.ReactNode }) {
  // Bakım modu kontrolünü (veritabanı sorgusunu) atlayıp doğrudan sayfayı render ediyoruz.
  return <>{children}</>;
}