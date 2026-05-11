import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore'; // 🔥 YENİ EKLENDİ

// Uygulama daha önce başlatılmamışsa başlat
if (!admin.apps.length) {
  // 1. Değişkenleri alıyoruz
  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  // 2. Hepsinin var olduğundan emin oluyoruz (Type Safety)
  if (projectId && clientEmail && privateKey) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          // 🔥 Vercel ve Localhost uyumu için satır sonu karakterlerini düzeltiyoruz
          privateKey: privateKey.replace(/\\n/g, '\n'),
        }),
      });
      console.log("✅ Firebase Admin başarıyla başlatıldı.");
    } catch (error) {
      console.error("❌ Firebase Admin başlatma hatası:", error);
    }
  } else {
    // Sadece sunucu tarafında log bas, build'i kırma.
    // Not: Bu hata, sadece API rotaları çalıştığında görünür.
    console.error("⚠️ UYARI: Firebase Admin anahtarları (ENV) eksik! Server işlemleri çalışmaz.");
  }
}

// 🔥 SİHİRLİ DOKUNUŞ 2: Sunucu bağlantısını da standart (default) veritabanına çektik.
export const adminDb = admin.apps.length ? admin.firestore() : null;
export const adminAuth = admin.apps.length ? admin.auth() : null;