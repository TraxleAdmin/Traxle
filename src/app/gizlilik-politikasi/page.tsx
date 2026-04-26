'use client';

import React from 'react';
import PrivacyPolicyContent from '@/components/legal/PrivacyPolicyContent';
import TextShimmer from '@/components/ui/TextShimmer';
import { FiShield } from 'react-icons/fi';

export default function PrivacyPolicyPage() {
  return (
    <div className="relative min-h-screen bg-transparent text-gray-900 dark:text-gray-300 pt-32 pb-20 overflow-hidden transition-colors duration-300 selection:bg-blue-500/30">

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">

        {/* --- Header --- */}
        <div className="mb-16 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wider uppercase border border-blue-200/50 dark:border-blue-500/30 backdrop-blur-md">
            <FiShield /> Yasal & Güvenlik
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white tracking-tight leading-tight">
            Gizlilik ve <br className="md:hidden" />
            <TextShimmer className='[--base-color:theme(colors.blue.600)] [--base-gradient-color:theme(colors.blue.300)] dark:[--base-color:theme(colors.blue.400)] dark:[--base-gradient-color:theme(colors.blue.200)]'>
              Veri Güvenliği
            </TextShimmer>
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium flex items-center gap-2 md:justify-start justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            Son Güncelleme: 10 Şubat 2026
          </p>
        </div>

        {/* --- İçerik Kutusu --- */}
        <div className="p-8 md:p-12 rounded-[2rem] border shadow-xl backdrop-blur-xl transition-all duration-300
                        bg-white/80 border-gray-200/50
                        dark:bg-[#0a0f1c]/80 dark:border-white/5 dark:shadow-[0_0_40px_rgba(0,0,0,0.5)]">

          <div className="prose prose-lg prose-blue max-w-none
                          prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                          prose-p:text-gray-600 dark:prose-p:text-gray-400
                          prose-li:text-gray-600 dark:prose-li:text-gray-400
                          prose-strong:text-gray-900 dark:prose-strong:text-white
                          prose-a:text-blue-600 dark:prose-a:text-blue-400">
            <PrivacyPolicyContent />
          </div>
        </div>

      </div>
    </div>
  );
}