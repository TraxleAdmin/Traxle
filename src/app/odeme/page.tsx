'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FiPackage, FiAlertCircle } from 'react-icons/fi';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

function PaymentContent() {
  const searchParams = useSearchParams();
  const planType = searchParams.get('plan') || 'starter';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authChecked, setAuthChecked] = useState(false);

  const planDetails: any = {
    free: { name: 'Deneme Paketi', price: '0.1', period: 'Ömür Boyu' },
    starter: { name: 'Başlangıç Paketi', price: '149', period: 'Aylık' },
    pro: { name: 'Profesyonel Paket', price: '299', period: 'Aylık' },
  };

  const selectedPlan = planDetails[planType] || planDetails['starter'];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!authChecked) return;

    const initializePayment = async () => {
      try {
        setLoading(true);
        setError(null);

        const fullName = currentUser?.displayName || 'Misafir Kullanıcı';
        const nameParts = fullName.split(' ');
        const surname = nameParts.length > 1 ? nameParts.pop() : 'Müşterisi';
        const name = nameParts.join(' ');

        const response = await fetch('/api/payment/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            planType: planType,
            price: selectedPlan.price,
            user: {
              id: currentUser?.uid || 'guest_123456',
              name: name || 'Traxle',
              surname: surname || 'Üyesi',
              email: currentUser?.email || 'guest@traxle.com',
              phone: '+905555555555',
              address: 'Türkiye'
            }
          }),
        });

        const data = await response.json();

        if (data.status === 'success' && data.checkoutFormContent) {
          setHtmlContent(data.checkoutFormContent);
        } else {
          setError('Ödeme formu başlatılamadı: ' + (data.message || data.errorMessage || 'Bilinmeyen Hata'));
        }

      } catch (err) {
        setError('Sunucu ile bağlantı kurulamadı.');
      } finally {
        setLoading(false);
      }
    };
    initializePayment();
  }, [planType, selectedPlan.price, authChecked, currentUser]);

  useEffect(() => {
    if (htmlContent) {
      const scriptContentMatch = htmlContent.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
      const srcMatch = htmlContent.match(/src=["'](.*?)["']/);

      if (scriptContentMatch && scriptContentMatch[1]) {
        try {
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.text = scriptContentMatch[1];
          document.body.appendChild(script);
          return () => { try { document.body.removeChild(script); } catch (e) { } };
        } catch (e) { setError("Ödeme ekranı yüklenirken hata oluştu."); }
      } else if (srcMatch && srcMatch[1]) {
        const script = document.createElement('script');
        script.src = srcMatch[1];
        script.async = true;
        document.body.appendChild(script);
        return () => { try { document.body.removeChild(script); } catch (e) { } };
      }
    }
  }, [htmlContent]);

  return (
    <div className="container mx-auto px-6 relative z-10 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-black mb-4">Güvenli Ödeme</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Ödemeniz <span className="font-bold text-blue-600 dark:text-blue-400">BDDK Lisanslı Güvenli Havuz Sistemi</span> güvencesiyle korunmaktadır.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/10 p-6 rounded-3xl shadow-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><FiPackage className="text-blue-500" /> Sipariş Özeti</h3>
            <div className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-white/5">
              <div><p className="font-bold text-lg">{selectedPlan.name}</p><span className="text-xs text-gray-500">{selectedPlan.period}</span></div>
              <div className="text-right"><span className="block font-bold text-xl">₺{selectedPlan.price}</span></div>
            </div>
            <div className="flex justify-between items-center py-4">
              <span className="text-gray-600 dark:text-gray-400">Toplam Tutar</span>
              <span className="font-black text-2xl text-blue-600 dark:text-blue-400">₺{selectedPlan.price}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 min-h-[500px] shadow-2xl flex flex-col justify-center items-center">
            {loading && (
              <div className="text-center space-y-4 absolute inset-0 flex flex-col items-center justify-center bg-white/90 dark:bg-[#0F1629]/90 z-20 backdrop-blur-sm">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-gray-500 font-medium">{!authChecked ? "Bilgiler alınıyor..." : "Ödeme formu hazırlanıyor..."}</p>
              </div>
            )}
            {error ? (
              <div className="text-center text-red-500 p-6 z-30">
                <FiAlertCircle className="mx-auto text-4xl mb-3" />
                <p className="font-semibold">{error}</p>
                <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg">Tekrar Dene</button>
              </div>
            ) : (
              <div id="iyzipay-checkout-form" className="w-full responsive"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050814] pt-32 pb-20 text-gray-900 dark:text-white transition-colors duration-300">
      <Suspense fallback={<div className="text-center pt-20">Yükleniyor...</div>}><PaymentContent /></Suspense>
    </div>
  );
}