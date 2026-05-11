import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import * as admin from 'firebase-admin';
import { PLANS, PlanType } from '@/lib/plans';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, planType, amount } = body;

    // 1. Basit Doğrulama
    if (!userId || (!planType && !amount)) {
      return NextResponse.json({ error: 'Kullanıcı ID ve (Paket veya Tutar) zorunludur.' }, { status: 400 });
    }

    if (!adminDb) {
      return NextResponse.json({ error: 'Admin DB Bağlantısı Yok' }, { status: 500 });
    }

    // 2. Veritabanını Güncelle
    await adminDb.runTransaction(async (transaction) => {
      const userRef = adminDb!.collection('users').doc(userId);
      const userDoc = await transaction.get(userRef) as any;

      if (!userDoc.exists) throw new Error("Kullanıcı bulunamadı!");

      const userData = userDoc.data();
      const updateData: any = {
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        lastAdminAction: 'manual_assignment'
      };

      // Paket seçildiyse paketin haklarını tanımla
      if (planType && PLANS[planType as PlanType]) {
        const selectedPlan = PLANS[planType as PlanType];
        updateData.subscriptionPlan = planType;
        updateData.subscriptionStatus = 'active';
        updateData.remainingAds = selectedPlan.limits.loadPost;
        updateData.freeDopings = selectedPlan.limits.freeDopings;
      }

      // Cüzdan tutarı manuel girildiyse (Sadece bakiye yükleme senaryosu)
      if (amount) {
        const currentBalance = userData?.walletBalance || 0;
        updateData.walletBalance = currentBalance + Number(amount);
      }

      transaction.update(userRef, updateData);
    });

    console.log(`👮 ADMIN ACTION: Kullanıcı (${userId}) güncellendi.`);

    return NextResponse.json({ success: true, message: 'İşlem başarıyla tamamlandı.' });

  } catch (error: any) {
    console.error("Admin Assign Hatası:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}