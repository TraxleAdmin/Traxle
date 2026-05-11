import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

export async function POST(request: Request) {
  try {
    const { name, email, message, subject } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Eksik bilgi.' }, { status: 400 });
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

    const msg = {
      to: "contact@traxleapp.com", // Sana gelecek olan mail
      from: { email: 'contact@traxleapp.com', name: 'Traxle Web İletişim' }, // Doğrulanmış gönderici adresin
      replyTo: email, // Yanıtla deyince müşteriye gitsin
      subject: `Yeni İletişim Mesajı: ${subject || 'Genel Bilgi'}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0057FF;">Traxle İletişim Formu</h2>
          <p><strong>Gönderen:</strong> ${name}</p>
          <p><strong>E-Posta:</strong> ${email}</p>
          <p><strong>Konu:</strong> ${subject || 'Belirtilmedi'}</p>
          <div style="background: #f8f9fa; padding: 20px; border-left: 4px solid #0057FF; border-radius: 4px; margin-top: 20px;">
            ${message}
          </div>
        </div>
      `,
    };

    await sgMail.send(msg);
    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('SendGrid İletişim Formu Hatası:', error);
    return NextResponse.json({ error: 'Mail gönderilemedi' }, { status: 500 });
  }
}