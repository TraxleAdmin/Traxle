import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import crypto from 'crypto';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';

function hashEmail(email: string) {
  return crypto.createHash('sha256').update(email.trim().toLowerCase()).digest('hex');
}

function json(body: any, status = 200) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) return json({ error: 'Mail gerekli' }, 400);

    // 6 Haneli OTP üret
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const key = hashEmail(email);
    const expiresAt = Date.now() + 3 * 60 * 1000; // 3 dk geçerli

    // DB'ye kaydet
    await setDoc(doc(db, 'otps', key), {
      email: email.trim().toLowerCase(),
      code,
      createdAt: Date.now(),
      expiresAt,
    });

    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

    const msg = {
      to: email,
      from: { email: 'contact@traxleapp.com', name: 'Traxle Güvenlik' },
      subject: `Traxle Doğrulama Kodunuz: ${code}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 30px; text-align: center; max-width: 500px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #111;">Doğrulama İşlemi</h2>
          <p style="color: #555;">Hesabınızda yapılan değişikliği onaylamak veya giriş yapmak için aşağıdaki kodu kullanın:</p>
          <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; padding: 20px; background: #f4f6f8; border-radius: 12px; margin: 30px auto; color: #0057FF;">
            ${code}
          </div>
          <p style="color: #999; font-size: 12px;">Bu kodun süresi 3 dakika içinde dolacaktır. Eğer bu işlemi siz yapmadıysanız lütfen bu e-postayı dikkate almayın.</p>
        </div>
      `,
    };

    await sgMail.send(msg);
    return json({ success: true });

  } catch (error: any) {
    console.error("SendGrid OTP Gönderim Hatası:", error);
    return json({ error: error?.message || 'Kod gönderilemedi' }, 500);
  }
}

export async function PUT(request: Request) {
  try {
    const { email, code } = await request.json();
    if (!email || !code) return json({ success: false, message: 'email ve code gerekli' }, 400);

    const key = hashEmail(email);
    const ref = doc(db, 'otps', key);
    const snap = await getDoc(ref);

    if (!snap.exists()) return json({ success: false, message: 'not_found' }, 400);

    const data = snap.data() as any;

    if (Date.now() > Number(data.expiresAt || 0)) {
      await deleteDoc(ref);
      return json({ success: false, message: 'expired' }, 400);
    }

    if (String(data.code) !== String(code)) {
      return json({ success: false, message: 'invalid_code' }, 400);
    }

    await deleteDoc(ref);
    return json({ success: true });
  } catch (error: any) {
    return json({ error: error?.message || 'Server error' }, 500);
  }
}