import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin'; 
import * as admin from 'firebase-admin'; 

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, planType, amount } = body; // amount: Eğer sadece para ekleyeceksen

    // 1. Basit Doğrulama
    if (!userId || (!planType && !amount)) {
      return NextResponse.json({ error: 'Kullanıcı ID ve (Paket veya Tutar) zorunludur.' }, { status: 400 });
    }

    if (!adminDb) {
      return NextResponse.json({ error: 'Admin DB Bağlantısı Yok' }, { status: 500 });
    }

    // 2. Paket Ayarları (Credits karşılıkları)
    const PLAN_CREDITS: Record<string, number> = {
      'free': 10,
      'starter': 100,
      'pro': 500,
      'enterprise': 1000
    };

    let addedCredits = 0;
    
    // Eğer paket seçildiyse onun kredisini al, yoksa manuel girilen tutarı kredi say
    if (planType && PLAN_CREDITS[planType]) {
        addedCredits = PLAN_CREDITS[planType];
    } else if (amount) {
        addedCredits = Number(amount); // Sadece bakiye yükleme senaryosu
    }

    // 3. Veritabanını Güncelle
    await adminDb.runTransaction(async (transaction) => {
      const userRef = adminDb!.collection('users').doc(userId);
      const userDoc = await transaction.get(userRef) as any;

      if (!userDoc.exists) throw new Error("Kullanıcı bulunamadı!");

      const currentCredits = userDoc.data()?.credits || 0;
      
      const updateData: any = {
        credits: currentCredits + addedCredits,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        lastAdminAction: 'manual_assignment'
      };

      // Eğer bir paket seçildiyse planı da değiştir, sadece para yüklendiyse planı elleme
      if (planType) {
        updateData.plan = planType;
        updateData.subscriptionStatus = 'active';
      }

      transaction.update(userRef, updateData);
    });

    console.log(`👮 ADMIN ACTION: Kullanıcı (${userId}) güncellendi. Plan: ${planType}, Eklenen Kredi: ${addedCredits}`);

    return NextResponse.json({ success: true, message: 'İşlem başarıyla tamamlandı.' });

  } catch (error: any) {
    console.error("Admin Assign Hatası:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}