import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';

export const runtime = 'nodejs'; // ✅ nodemailer için şart

function hashEmail(email: string) {
  return crypto.createHash('sha256').update(email.trim().toLowerCase()).digest('hex');
}

function json(body: any, status = 200) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  try {
    const ct = request.headers.get('content-type') || '';
    if (!ct.includes('application/json')) {
      return json({ error: 'Content-Type application/json olmalı' }, 400);
    }

    const { email } = await request.json();
    if (!email) return json({ error: 'Mail gerekli' }, 400);

    // OTP üret
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const key = hashEmail(email);
    const expiresAt = Date.now() + 3 * 60 * 1000; // 3 dk

    await setDoc(doc(db, 'otps', key), {
      email: email.trim().toLowerCase(),
      code,
      createdAt: Date.now(),
      expiresAt,
    });

    // Env kontrol (çok kritik)
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      return json(
        { error: 'GMAIL_USER veya GMAIL_APP_PASSWORD env eksik. .env.local kontrol et.' },
        500
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Traxle" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Giriş Kodu: ${code}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Traxle Giriş Kodu</h2>
          <div style="font-size: 34px; letter-spacing: 6px; font-weight: 800;">${code}</div>
          <p>Kod 3 dakika geçerlidir.</p>
        </div>
      `,
    });

    return json({ success: true });
  } catch (error: any) {
    // ✅ Her durumda JSON döndür
    return json({ error: error?.message || 'Server error' }, 500);
  }
}

export async function PUT(request: Request) {
  try {
    const ct = request.headers.get('content-type') || '';
    if (!ct.includes('application/json')) {
      return json({ error: 'Content-Type application/json olmalı' }, 400);
    }

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
