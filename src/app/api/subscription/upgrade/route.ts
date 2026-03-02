import { adminDb } from '@/lib/firebase-admin';
import { NextResponse } from 'next/server';
import * as admin from 'firebase-admin';
import { PLANS, PlanType } from '@/lib/plans';

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

    // 2. Güvenlik Kontrolü
    if (!adminDb) {
      console.error("🔴 HATA: Firebase Admin (adminDb) başlatılamadı.");
      return NextResponse.json(
        { error: 'Sunucu yapılandırma hatası: Veritabanı bağlantısı yok.' },
        { status: 500 }
      );
    }

    // 3. Plan Doğrulama
    const selectedPlan = PLANS[planType as PlanType];
    if (!selectedPlan) {
      return NextResponse.json({ error: 'Geçersiz paket tipi.' }, { status: 400 });
    }

    // 4. Transaction ile Güvenli Veritabanı İşlemi
    await adminDb.runTransaction(async (transaction) => {
      const userRef = adminDb!.collection('users').doc(userId);
      const userDoc = await transaction.get(userRef) as any;

      if (!userDoc.exists) {
        throw new Error("Kullanıcı bulunamadı!");
      }

      // Kullanıcıyı yeni B2B mantığıyla güncelle
      transaction.update(userRef, {
        subscriptionPlan: planType,
        remainingAds: selectedPlan.limits.loadPost,
        freeDopings: selectedPlan.limits.freeDopings,
        subscriptionStatus: 'active',
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    });

    console.log(`✅ Kullanıcı (${userId}) planı yükseltildi: ${planType}`);

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