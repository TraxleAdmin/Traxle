import { db } from '@/lib/firebase';
import { doc, getDoc, collection, query, where, getCountFromServer } from 'firebase/firestore';
import { PLANS, PlanType } from '@/lib/plans';

export async function checkSubscriptionLimit(userId: string, action: 'create_load' | 'make_offer') {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    // Kullanıcının planını bul (Varsayılan: free)
    const userPlanId = (userSnap.data()?.subscriptionPlan as PlanType) || 'free';
    const plan = PLANS[userPlanId];

    // Enterprise veya Premium ise limit kontrolüne gerek yok (VIP Geçiş)
    if (userPlanId === 'premium' || userPlanId === 'enterprise') {
      return { success: true };
    }

    // --- İLAN (YÜK) OLUŞTURMA LİMİTİ KONTROLÜ ---
    if (action === 'create_load') {
      const limit = plan.limits.loadPost;

      // Bu ayın başlangıcını bul (Örn: 1 Şubat 00:00)
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      // Veritabanına sor: "Bu adam bu ay kaç ilan açtı?"
      const q = query(
        collection(db, 'loads'),
        where('createdBy', '==', userId),
        where('createdAt', '>=', startOfMonth) // Sadece bu ay
      );

      const snapshot = await getCountFromServer(q);
      const used = snapshot.data().count;

      if (used >= limit) {
        return {
          success: false,
          message: `Bu ayki ${limit} adet ilan oluşturma limitinizi doldurdunuz. Lütfen paketinizi yükseltin.`,
          currentPlan: userPlanId
        };
      }
    }

    // --- TEKLİF LİMİTİ KONTROLÜ ---
    // Yeni B2B modelinde teklif vermek her paket için sınırsızdır.
    if (action === 'make_offer') {
      return { success: true };
    }

    return { success: true };

  } catch (error) {
    console.error('Limit kontrol hatası:', error);
    return { success: false, message: 'Abonelik bilgisi kontrol edilemedi.' };
  }
}