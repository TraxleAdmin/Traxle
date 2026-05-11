import React from 'react';
import { AlertTriangle, Clock } from 'lucide-react';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center shadow-2xl">
        <div className="mx-auto w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8 text-yellow-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-2">Bakım Çalışması</h1>
        <p className="text-gray-400 mb-6">
          Sistemlerimizde planlı bir geliştirme yapıyoruz. En kısa sürede çok daha güçlü bir şekilde geri döneceğiz.
        </p>

        <div className="bg-gray-950 rounded-lg p-4 border border-gray-800 flex items-center justify-center gap-3">
          <Clock className="w-5 h-5 text-indigo-500" />
          <span className="text-sm text-gray-300 font-mono">Tahmini Dönüş: Çok Yakında</span>
        </div>
        
        <div className="mt-8 text-xs text-gray-600">
          Traxle Systems &copy; 2026
        </div>
      </div>
    </div>
  );
}