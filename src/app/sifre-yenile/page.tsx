'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const email = searchParams.get('email');
    const token = searchParams.get('token'); // Firestore Document ID

    const [newPassword, setNewPassword] = useState('');
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!email || !token) {
            setStatus('error');
            setMessage('Geçersiz veya eksik bağlantı.');
        }
    }, [email, token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            // 1. GÜVENLİK KONTROLÜ: Bu token (docId) veritabanında gerçekten var mı?
            const tokenRef = doc(db, "password_resets", token as string);
            const tokenSnap = await getDoc(tokenRef);

            if (!tokenSnap.exists() || tokenSnap.data().email !== email) {
                setStatus('error');
                setMessage('Bu şifre sıfırlama bağlantısı süresi dolmuş veya geçersiz.');
                return;
            }

            // 2. ANA BEYNE BİLDİR (NestJS PostgreSQL Şifre Güncelleme)
            // Not: Kendi NestJS sunucu adresini yaz (Örn: http://localhost:3000 veya render.com adresi)
            const response = await fetch('http://localhost:3000/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, newPassword }),
            });

            if (!response.ok) throw new Error("Sunucu hatası");

            // 3. İZLERİ YOK ET: Kullanılan tokeni Firestore'dan sil ki bir daha kullanılamasın
            await deleteDoc(tokenRef);

            setStatus('success');
            setMessage('Şifreniz başarıyla güncellendi! Giriş sayfasına yönlendiriliyorsunuz...');

            // 3 saniye sonra girişe yolla
            setTimeout(() => router.push('/giris'), 3000);

        } catch (error) {
            setStatus('error');
            setMessage('İşlem sırasında bir hata oluştu.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6 text-center">Yeni Şifre Belirle</h1>

                {status === 'error' && <div className="text-red-500 mb-4 text-center">{message}</div>}
                {status === 'success' && <div className="text-green-500 mb-4 text-center font-bold">{message}</div>}

                {status !== 'success' && status !== 'error' && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Yeni Şifreniz</label>
                            <input
                                type="password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-3"
                                placeholder="En az 6 karakter"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full bg-black text-white p-3 rounded-lg font-bold hover:bg-gray-800 transition-all"
                        >
                            {status === 'loading' ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}