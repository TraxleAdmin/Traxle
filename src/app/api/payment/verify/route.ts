import { NextResponse } from 'next/server';
import iyzipay from '@/lib/iyzipay';
import { adminDb } from '@/lib/firebase-admin';
import * as admin from 'firebase-admin';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = body.token;
    
    const conversationId = body.conversationId || 'Mobil_App';

    if (!token) {
        return NextResponse.json({ status: 'failure', message: 'Token eksik' }, { status: 400 });
    }

    if (!adminDb) {
        console.error("🔴 CRITICAL: Firebase Admin başlatılamadı!");
        return NextResponse.json({ status: 'error', message: 'Sunucu DB hatası' }, { status: 500 });
    }

    return new Promise<NextResponse>((resolve) => {
        (iyzipay as any).checkoutForm.retrieve({
            locale: 'tr',
            conversationId: conversationId,
            token: token
        }, async (err: any, result: any) => {
            
            if (err) {
                console.error("🔴 Iyzico Sorgu Hatası:", err);
                return resolve(NextResponse.json({ status: 'error', message: 'Banka ile iletişim kurulamadı' }, { status: 500 }));
            } 
            
            if (result.status !== 'success' || result.paymentStatus !== 'SUCCESS') {
                console.error(`🔴 Ödeme Başarısız [${token}]:`, result.errorMessage);
                return resolve(NextResponse.json({ status: 'failure', message: result.errorMessage }, { status: 400 }));
            } 
            
            // ==========================================
            // 🟢 ÖDEME BAŞARILI! PARAYI VERİTABANINA YAZ
            // ==========================================
            
            const userId = result.basketId?.split('-')[1] || body.userId;
            const paidPrice = parseFloat(result.paidPrice);

            if (!userId) {
                console.error("🔴 CRITICAL: Ödeme alındı ama Kullanıcı ID bulunamadı!", result);
                return resolve(NextResponse.json({ status: 'error', message: 'Kullanıcı eşleştirilemedi' }, { status: 400 }));
            }

            try {
                // 🔥 TS HATASI ÇÖZÜMÜ: adminDb! kullanarak null olmadığını garanti ediyoruz
                await adminDb!.runTransaction(async (transaction) => {
                    
                    // 1. Bu ödeme daha önce işlenmiş mi kontrol et
                    const paymentRef = adminDb!.collection('payment_logs').doc(result.paymentId);
                    const paymentDoc = await transaction.get(paymentRef) as any;
                    
                    if (paymentDoc.exists && paymentDoc.data().status === 'COMPLETED') {
                        console.warn(`⚠️ UYARI: Ödeme (${result.paymentId}) daha önce işlenmiş. Atlanıyor.`);
                        return; 
                    }

                    // 2. Kullanıcının mevcut bakiyesini al
                    const userRef = adminDb!.collection('users').doc(userId);
                    const userDoc = await transaction.get(userRef) as any;
                    
                    if (!userDoc.exists) {
                        throw new Error(`Kullanıcı (${userId}) veritabanında bulunamadı.`);
                    }

                    const currentBalance = userDoc.data().walletBalance || 0;

                    // 3. Kullanıcının Bakiyesini Güncelle
                    transaction.update(userRef, {
                        walletBalance: currentBalance + paidPrice,
                        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                    });

                    // 4. Ödeme Logunu (Faturasını) Kaydet
                    transaction.set(paymentRef, {
                        userId: userId,
                        amount: paidPrice,
                        paymentId: result.paymentId,
                        token: token,
                        gateway: 'iyzico',
                        status: 'COMPLETED',
                        createdAt: admin.firestore.FieldValue.serverTimestamp(),
                    });

                    // 5. Cüzdan Hareketlerine (Ekstreye) Kaydet
                    const walletTxRef = adminDb!.collection('transactions').doc();
                    transaction.set(walletTxRef, {
                        userId: userId,
                        title: 'Cüzdan Yüklemesi',
                        description: `Kredi Kartı ile Bakiye Yükleme (ID: ${result.paymentId})`,
                        amount: paidPrice,
                        type: 'incoming',
                        category: 'deposit',
                        status: 'completed',
                        date: admin.firestore.FieldValue.serverTimestamp(),
                    });
                });

                console.log(`✅ BAŞARILI: Kullanıcı (${userId}) hesabına ₺${paidPrice} eklendi.`);
                
                resolve(NextResponse.json({ 
                    status: 'success', 
                    price: paidPrice,
                    paymentId: result.paymentId,
                    message: 'Bakiye cüzdana başarıyla yansıtıldı.'
                }));

            } catch (dbError: any) {
                console.error(`🚨 FATAL ERROR: Para çekildi ama DB güncellenemedi! PaymentID: ${result.paymentId}`, dbError);
                
                // 🔥 TS HATASI ÇÖZÜMÜ: adminDb!
                await adminDb!.collection('admin_logs').add({
                    action: 'FATAL_DB_WRITE_ERROR',
                    targetId: result.paymentId,
                    adminId: 'SYSTEM',
                    details: `Parası çekilen kullanıcıya (${userId}) bakiye eklenemedi! Manuel müdahale gerekli. Tutar: ₺${paidPrice}`,
                    timestamp: admin.firestore.FieldValue.serverTimestamp()
                });

                resolve(NextResponse.json({ status: 'error', message: 'Kritik veritabanı hatası. Müşteri hizmetlerine ulaşın.' }, { status: 500 }));
            }
        });
    });

  } catch (error: any) {
    console.error("Verify API Genel Hatası:", error);
    return NextResponse.json({ status: 'error', message: 'Sunucu hatası' }, { status: 500 });
  }
}