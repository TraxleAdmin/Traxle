'use client';
import { User } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function EmailVerificationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'SEND' | 'VERIFY'>('SEND');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Kullanıcının mail durumu kontrol et
  useEffect(() => {
    const checkEmailStatus = async () => {
      if (!auth.currentUser) return;

      const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setEmail(userData.email || '');
        // Eğer emailVerified: false ise modalı aç
        if (userData.emailVerified === false) {
          setIsOpen(true);
        }
      }
    };

    // Auth durumunu dinle (sayfa yenilenince vs.)
const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
    if (user) checkEmailStatus();
});

    return () => unsubscribe();
  }, []);

  const sendCode = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Kod gönderilemedi.');
      
      setStep('VERIFY');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    setLoading(true);
    setError('');
    try {
        const res = await fetch('/api/send-otp', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, code }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Hatalı kod.');

        // Firestore'da durumu güncelle
        if (auth.currentUser) {
            await updateDoc(doc(db, "users", auth.currentUser.uid), {
                emailVerified: true
            });
        }

        // Modalı kapat
        setIsOpen(false);
        alert("E-Posta adresiniz başarıyla doğrulandı! 🎉");

    } catch (err: any) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0b1021] border border-blue-500/30 rounded-2xl p-6 w-full max-w-md shadow-[0_0_50px_rgba(37,99,235,0.2)]">
        <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                ✉️
            </div>
            <h2 className="text-xl font-bold text-white">E-Posta Doğrulaması Gerekli</h2>
            <p className="text-gray-400 text-sm mt-2">
                Güvenliğiniz için lütfen <span className="text-white font-mono">{email}</span> adresini doğrulayın.
                Bu adımı geçemezsiniz.
            </p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-500/10 text-red-400 text-sm rounded-lg text-center">{error}</div>}

        {step === 'SEND' ? (
             <button onClick={sendCode} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all">
                {loading ? 'Kod Gönderiliyor...' : 'Doğrulama Kodu Gönder'}
             </button>
        ) : (
            <div className="space-y-4">
                <input 
                   type="text" 
                   value={code} 
                   onChange={(e) => setCode(e.target.value)} 
                   placeholder="Gelen Kodu Girin"
                   maxLength={6}
                   className="w-full bg-[#0F1528] border border-white/20 rounded-xl h-12 text-center text-xl text-white tracking-widest outline-none focus:border-blue-500"
                />
                <button onClick={verifyCode} disabled={loading} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl transition-all">
                    {loading ? 'Doğrulanıyor...' : 'Kodu Onayla'}
                </button>
                <button onClick={() => setStep('SEND')} className="w-full text-sm text-gray-500 hover:text-white">
                    Kodu tekrar gönder
                </button>
            </div>
        )}
      </div>
    </div>
  );
}