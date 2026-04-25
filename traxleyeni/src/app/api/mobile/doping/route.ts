import { NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase-admin';
import * as admin from 'firebase-admin';

// Doping Fiyat Listesi (TL)
const DOPING_PRICES = {
    'acil': 29,
    'ustte': 59,
    'vitrin': 89
};

export async function POST(request: Request) {
    try {
        // 1. Güvenlik ve Token Doğrulama
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Yetkisiz erişim.' }, { status: 401 });
        }

        const idToken = authHeader.split('Bearer ')[1];
        const decodedToken = await adminAuth!.verifyIdToken(idToken);
        const userId = decodedToken.uid;

        const body = await request.json();
        const { loadId, dopingType } = body;

        // Gelen doping tipi fiyat listemizde var mı?
        if (!loadId || !dopingType || !DOPING_PRICES[dopingType as keyof typeof DOPING_PRICES]) {
            return NextResponse.json({ error: 'Eksik veya geçersiz doping tipi.' }, { status: 400 });
        }

        const price = DOPING_PRICES[dopingType as keyof typeof DOPING_PRICES];

        // 2. Transaction Başlat
        await adminDb!.runTransaction(async (transaction) => {
            const userRef = adminDb!.collection('users').doc(userId);
            const userDoc = await transaction.get(userRef);
            if (!userDoc.exists) throw new Error("Kullanıcı bulunamadı.");
            const userData = userDoc.data()!;

            const loadRef = adminDb!.collection('loads').doc(loadId);
            const loadDoc = await transaction.get(loadRef);
            if (!loadDoc.exists) throw new Error("Belirtilen ilan bulunamadı.");

            // Kendi ilanı dışındakilere doping basamaz
            if (loadDoc.data()!.createdBy !== userId) {
                throw new Error("Bu işleme yetkiniz yok. Sadece kendi ilanlarınıza doping yapabilirsiniz.");
            }

            // 3. Ödeme Mantığı (Hediye Hak vs Cüzdan)
            if (userData.freeDopings && userData.freeDopings > 0) {
                // Hediye Doping Varsa Onu Kullan
                transaction.update(userRef, { freeDopings: userData.freeDopings - 1 });
            } else {
                // Hediye Yoksa Cüzdandan Düş
                if ((userData.walletBalance || 0) < price) {
                    throw new Error(`Yetersiz bakiye. Bu doping ${price} TL'dir. Lütfen cüzdanınıza bakiye yükleyin.`);
                }
                transaction.update(userRef, { walletBalance: userData.walletBalance - price });

                // Cüzdan Logu (Ekstre İçin)
                const txRef = adminDb!.collection('transactions').doc();
                transaction.set(txRef, {
                    userId,
                    title: 'Doping Satın Alımı',
                    description: `${dopingType.toUpperCase()} Özelliği (İlan: #${loadId.substring(0, 6)})`,
                    amount: price,
                    type: 'outgoing',
                    category: 'shopping',
                    status: 'completed',
                    date: admin.firestore.FieldValue.serverTimestamp()
                });
            }

            // 4. İlana Dopingi Tanımla (Bugünden itibaren +7 Gün Süre Ver)
            const expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 7);

            const updateData: any = {};
            if (dopingType === 'acil') updateData.dopingAcilUntil = expireDate;
            if (dopingType === 'ustte') updateData.dopingUstteUntil = expireDate;
            if (dopingType === 'vitrin') updateData.dopingVitrinUntil = expireDate;

            transaction.update(loadRef, updateData);
        });

        console.log(`✅ MOBİL API: Kullanıcı [${userId}], [${loadId}] ilanına [${dopingType}] uyguladı.`);
        return NextResponse.json({ success: true, message: 'Doping başarıyla uygulandı ve ilanınız öne çıkarıldı.' });

    } catch (error: any) {
        console.error("🔴 API /mobile/doping ERROR:", error);
        return NextResponse.json({ error: error.message || 'Satın alma işlemi başarısız.' }, { status: 500 });
    }
}