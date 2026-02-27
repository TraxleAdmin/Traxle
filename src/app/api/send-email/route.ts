import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // 1. Veri Kontrolü
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Eksik bilgi.' }, { status: 400 });
    }

    // Konsola ortam değişkenlerinin yüklendiğini teyit etmek için yazdıralım (Şifreyi gizleyerek)
    console.log("Mail Gönderim Denemesi Başladı...");
    console.log("SMTP User:", process.env.SMTP_USER);
    console.log("SMTP Pass Var mı:", process.env.SMTP_PASS ? "Evet" : "Hayır");

    // 2. SMTP Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // .env.local dosyasından gelir
      },
    });

    // Bağlantıyı test et
    await new Promise((resolve, reject) => {
        transporter.verify(function (error, success) {
            if (error) {
                console.error("SMTP Bağlantı Hatası:", error);
                reject(error);
            } else {
                console.log("SMTP Sunucusu hazır");
                resolve(success);
            }
        });
    });

    // 3. Mail İçeriği
    const mailOptions = {
      from: `"Traxle Web" <${process.env.SMTP_USER}>`,
      to: "contact@traxleapp.com", // Sabit alıcı (Senin mailin)
      replyTo: email,
      subject: `📩 Yeni Mesaj: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #0057FF;">Yeni İletişim Mesajı</h2>
          <p><strong>Kimden:</strong> ${name} (${email})</p>
          <p style="background: #f9f9f9; padding: 10px;">${message}</p>
        </div>
      `,
    };

    // 4. Gönder
    await transporter.sendMail(mailOptions);
    console.log("Mail başarıyla gönderildi.");

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('GENEL HATA DETAYI:', error);
    return NextResponse.json({ error: error.message || 'Sunucu hatası' }, { status: 500 });
  }
}