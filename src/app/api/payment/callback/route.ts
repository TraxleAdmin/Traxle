import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. Iyzico'dan gelen POST form verisini al
    const formData = await request.formData();
    const token = formData.get('token');
    const conversationId = formData.get('conversationId');

    console.log(`🔵 Iyzico Callback Geldi. Token: ${token}, ConversationId: ${conversationId}`);

    if (!token) {
        // Token yoksa uygulamaya hata durumuyla dön
        return NextResponse.redirect(`traxleapp://payment/callback?status=error&message=token_missing`, 302);
    }

    // 2. MOBİL UYGULAMAYA (DEEP LINK) YÖNLENDİRME
    // Flutter'daki WebView veya işletim sistemi bu "traxleapp://" şemasını görünce araya girecek.
    const deepLinkUrl = `traxleapp://payment/callback?status=success&token=${token}&conversationId=${conversationId}`;

    // 302 Yönlendirmesi (Redirect) ile mobil app'i tetikliyoruz
    return NextResponse.redirect(deepLinkUrl, 302);

  } catch (error: any) {
    console.error("🔴 Callback Yönlendirme Hatası:", error);
    // Beklenmedik bir hata olursa uygulamayı kilitli bırakmamak için hata linkine atıyoruz
    return NextResponse.redirect(`traxleapp://payment/callback?status=error&message=server_error`, 302);
  }
}