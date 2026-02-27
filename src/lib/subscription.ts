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

    // Enterprise veya Pro ise limit kontrolüne gerek yok (VIP Geçiş)
    if (userPlanId === 'pro' || userPlanId === 'enterprise') {
      return { success: true };
    }

    // --- YÜK İLANI LİMİTİ KONTROLÜ ---
    if (action === 'create_load') {
      const limit = plan.limits.loadPost;
      
      // Bu ayın başlangıcını bul (Örn: 1 Şubat 00:00)
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0,0,0,0);

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
          message: `Bu ayki ${limit} adet yük ilan limitinizi doldurdunuz.`,
          currentPlan: userPlanId
        };
      }
    }

    // --- TEKLİF LİMİTİ KONTROLÜ (İleride lazım olacak) ---
    if (action === 'make_offer') {
      const limit = plan.limits.offers;
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0,0,0,0);

      const q = query(
        collection(db, 'offers'),
        where('bidderId', '==', userId),
        where('createdAt', '>=', startOfMonth)
      );
      
      const snapshot = await getCountFromServer(q);
      const used = snapshot.data().count;

      if (used >= limit) {
         return { 
            success: false, 
            message: `Bu ayki ${limit} adet teklif verme limitinizi doldurdunuz.`,
            currentPlan: userPlanId
         };
      }
    }

    return { success: true };

  } catch (error) {
    console.error('Limit kontrol hatası:', error);
    // Hata olursa kullanıcıyı engellememek için (veya engellemek için) bir politika seç
    return { success: false, message: 'Abonelik bilgisi kontrol edilemedi.' };
  }
}