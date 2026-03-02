import { NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase-admin';
import * as admin from 'firebase-admin';

export async function POST(request: Request) {
    try {
        // 1. SİBER GÜVENLİK: Bearer Token Kontrolü (Sadece giriş yapmış mobil kullanıcılar)
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Yetkisiz erişim. Token bulunamadı veya hatalı.' }, { status: 401 });
        }

        const idToken = authHeader.split('Bearer ')[1];
        let decodedToken;
        try {
            decodedToken = await adminAuth!.verifyIdToken(idToken);
        } catch (e) {
            return NextResponse.json({ error: 'Geçersiz veya süresi dolmuş oturum.' }, { status: 401 });
        }

        const userId = decodedToken.uid;
        const body = await request.json();

        let displayId = '';

        // 2. ATOMİK İŞLEM: İlan Limitini Kontrol Et ve Düş
        await adminDb!.runTransaction(async (transaction) => {
            const userRef = adminDb!.collection('users').doc(userId);
            const userDoc = await transaction.get(userRef);

            if (!userDoc.exists) throw new Error("Kullanıcı hesabı bulunamadı.");

            const userData = userDoc.data()!;

            // Veritabanında kalan ilan hakkını oku (Yoksa 0 say)
            const remainingAds = userData.remainingAds || 0;

            if (remainingAds <= 0) {
                throw new Error("Aylık kiralama ilanı hakkınız dolmuştur. Lütfen paketinizi yükseltin.");
            }

            // Hakkı 1 düşür
            transaction.update(userRef, {
                remainingAds: remainingAds - 1
            });

            // Yeni Kiralama İlanını Oluştur
            const newLoadRef = adminDb!.collection('loads').doc();
            displayId = `PRJ-${Math.floor(100000 + Math.random() * 900000)}`;

            transaction.set(newLoadRef, {
                ...body,
                createdBy: userId,
                creatorName: userData.companyName || userData.name || 'Şantiye Yetkilisi',
                status: 'Bekliyor',
                displayId: displayId,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                // Doping Varsayılanları (Hepsi başlangıçta null/pasif)
                dopingAcilUntil: null,
                dopingUstteUntil: null,
                dopingVitrinUntil: null
            });
        });

        console.log(`✅ MOBİL API: Kullanıcı [${userId}] yeni ilan açtı. Kalan Hakkı düştü.`);

        return NextResponse.json({
            success: true,
            message: 'Kiralama ilanı başarıyla oluşturuldu.',
            loadId: displayId
        });

    } catch (error: any) {
        console.error("🔴 API /mobile/loads ERROR:", error);
        return NextResponse.json({ error: error.message || 'Sunucu işlemi sırasında hata oluştu.' }, { status: 500 });
    }
}