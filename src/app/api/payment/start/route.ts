import { NextResponse } from 'next/server';
import iyzipay from '@/lib/iyzipay'; 

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { price, user } = body; 
    
    // Güvenlik: Tutar kontrolü
    if (!price || price < 10) {
        return NextResponse.json({ status: 'error', message: 'Minimum yükleme tutarı 10 TL olmalıdır.' }, { status: 400 });
    }

    if (!user || !user.id) {
        return NextResponse.json({ status: 'error', message: 'Kullanıcı kimliği (ID) doğrulanamadı.' }, { status: 401 });
    }

    // Mobil uygulamanın 3D sonrasında geri döneceği bizim sunucumuzdaki köprü adres
    const origin = new URL(request.url).origin;
    const callbackUrl = `${origin}/api/payment/callback`;
    const priceStr = price.toString();

    // Sipariş ID'sini Benzersiz (Unique) ve İzlenebilir yapıyoruz
    const basketId = `WALLET-${user.id}-${Date.now()}`;

    const requestData = {
      locale: 'tr',
      conversationId: basketId,
      price: priceStr,
      paidPrice: priceStr, // Komisyon yansıtılacaksa burası değişir
      currency: 'TRY',
      basketId: basketId,
      paymentGroup: 'PRODUCT',
      callbackUrl: callbackUrl,
      enabledInstallments: [1], // Cüzdan yüklemesinde taksit olmaz
      buyer: {
        id: user.id,
        name: user.name?.split(' ')[0] || 'Traxle',
        surname: user.name?.split(' ').slice(1).join(' ') || 'Sürücüsü',
        gsmNumber: user.phone || '+905555555555',
        email: user.email || 'no-reply@traxleapp.com',
        identityNumber: '11111111111', // Bireyseller için zorunlu, şirketler için VKN
        lastLoginDate: new Date().toISOString().split('T')[0] + ' 12:00:00',
        registrationDate: new Date().toISOString().split('T')[0] + ' 12:00:00',
        registrationAddress: user.city || 'Antalya',
        ip: '85.85.85.85', // Güvenlik için sunucuya gelen IP alınmalı (Req.headers.get('x-forwarded-for'))
        city: user.city || 'Antalya',
        country: 'Turkey',
        zipCode: '07000',
      },
      shippingAddress: {
        contactName: user.name || 'Traxle Sürücüsü',
        city: user.city || 'Antalya',
        country: 'Turkey',
        address: 'Dijital Hizmet / Cüzdan Bakiyesi',
        zipCode: '07000',
      },
      billingAddress: {
        contactName: user.name || 'Traxle Sürücüsü',
        city: user.city || 'Antalya',
        country: 'Turkey',
        address: 'Dijital Hizmet / Cüzdan Bakiyesi',
        zipCode: '07000',
      },
      basketItems: [
        {
          id: 'WALLET_LOAD',
          name: 'Traxle Cüzdan Bakiyesi',
          category1: 'Finans',
          category2: 'Bakiye',
          itemType: 'VIRTUAL', // Dijital ürün olduğunu belirtir, kargo aranmaz
          price: priceStr,
        },
      ],
    };

    return new Promise<NextResponse>((resolve) => {
      (iyzipay as any).checkoutFormInitialize.create(requestData, (err: any, result: any) => {
        if (err) {
          console.error('🔴 Iyzico Başlatma Hatası:', err);
          resolve(NextResponse.json({ status: 'error', message: err.message || 'Bağlantı hatası' }, { status: 500 }));
        } else if (result.status !== 'success') {
          console.error('🔴 Iyzico API Reddi:', result.errorMessage);
          resolve(NextResponse.json({ status: 'failure', errorMessage: result.errorMessage }, { status: 400 }));
        } else {
          // BAŞARILI: Mobil uygulamaya Token'ı ve Ödeme Linkini gönder
          console.log(`🟢 Ödeme Başlatıldı [${basketId}] - Token: ${result.token}`);
          resolve(NextResponse.json({ 
              status: 'success', 
              paymentPageUrl: result.paymentPageUrl,
              token: result.token,
              conversationId: basketId
          }));
        }
      });
    });

  } catch (error: any) {
    console.error('🔴 Sunucu İç Hatası:', error);
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}