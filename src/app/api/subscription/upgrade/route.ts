// src/app/api/subscription/upgrade/route.ts

import { adminDb } from '@/lib/firebase-admin'; // ✅ Doğru dosya adı
import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin'; 

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, planType } = body;

    // 1. Basit veri doğrulama
    if (!userId || !planType) {
      return NextResponse.json(
        { error: 'Eksik bilgi: userId ve planType zorunludur.' },
        { status: 400 }
      );
    }

    // 2. Güvenlik Kontrolü (Veritabanı bağlantısı var mı?)
    if (!adminDb) {
      console.error("🔴 HATA: Firebase Admin (adminDb) başlatılamadı.");
      return NextResponse.json(
        { error: 'Sunucu yapılandırma hatası: Veritabanı bağlantısı yok.' },
        { status: 500 }
      );
    }

    // 3. Kredi ve Paket Mantığı
    const PLAN_CREDITS: Record<string, number> = {
      'free': 10,
      'starter': 100,
      'pro': 500,
      'enterprise': 1000
    };

    // Eğer geçersiz bir plan tipi gelirse işlem yapma
    if (!PLAN_CREDITS[planType]) {
        return NextResponse.json({ error: 'Geçersiz paket tipi.' }, { status: 400 });
    }

    const addedCredits = PLAN_CREDITS[planType as string];

    // 4. Transaction ile Güvenli Veritabanı İşlemi
    await adminDb.runTransaction(async (transaction) => {
      // TypeScript'e adminDb'nin var olduğunu (!) ile söylüyoruz
      const userRef = adminDb!.collection('users').doc(userId);
      
      // 🔥 KRİTİK: "as any" kullanarak TypeScript'in "List mi? Doküman mı?" kafa karışıklığını çözüyoruz.
      const userDoc = await transaction.get(userRef) as any;

      if (!userDoc.exists) {
        throw new Error("Kullanıcı bulunamadı!");
      }

      const userData = userDoc.data();
      const currentCredits = userData?.credits || 0;

      // Kullanıcıyı güncelle
      transaction.update(userRef, {
        plan: planType,
        credits: currentCredits + addedCredits,
        subscriptionStatus: 'active',
        // Sunucu zamanını kullanmak daha güvenilirdir
        updatedAt: admin.firestore.FieldValue.serverTimestamp(), 
      });
    });

    console.log(`✅ Kullanıcı (${userId}) planı yükseltildi: ${planType} (+${addedCredits} kredi)`);

    return NextResponse.json({ 
      success: true, 
      message: 'Plan başarıyla yükseltildi.',
      newPlan: planType 
    });

  } catch (error: any) {
    console.error("Upgrade API Hatası:", error);
    return NextResponse.json(
      { error: error.message || 'Plan yükseltilirken bir hata oluştu.' },
      { status: 500 }
    );
  }
}