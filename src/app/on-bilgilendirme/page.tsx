'use client';

import React from 'react';
import PreInfoFormContent from '@/components/legal/PreInfoFormContent';
import TextShimmer from '@/components/ui/TextShimmer';
import { FiInfo } from 'react-icons/fi';

export default function PreInfoFormPage() {
  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-[#050814] text-gray-900 dark:text-gray-300 pt-32 pb-20 overflow-hidden transition-colors duration-300 selection:bg-indigo-500/30">

      {/* --- Arka Plan Efektleri (Indigo Temalı) --- */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none dark:invert"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">

        {/* --- Header --- */}
        <div className="mb-16 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-wider uppercase border border-indigo-200 dark:border-indigo-500/30">
            <FiInfo /> Yasal & Bilgilendirme
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white tracking-tight leading-tight">
            Ön Bilgilendirme <br className="md:hidden" />
            {/* TextShimmer Rengini İndigo Yaptık */}
            <TextShimmer className='[--base-color:theme(colors.indigo.600)] [--base-gradient-color:theme(colors.indigo.200)] dark:[--base-color:theme(colors.indigo.700)] dark:[--base-gradient-color:theme(colors.indigo.400)]'>
              Formu
            </TextShimmer>
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium flex items-center gap-2 md:justify-start justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            Son Güncelleme: 10 Şubat 2026
          </p>
        </div>

        {/* --- İçerik Kutusu --- */}
        <div className="p-8 md:p-12 rounded-[2rem] border shadow-sm transition-all duration-300
                        bg-white border-gray-100
                        dark:bg-[#080c14] dark:border-white/5 dark:shadow-none">

          <div className="prose prose-lg prose-indigo max-w-none
                          prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                          prose-p:text-gray-600 dark:prose-p:text-gray-400
                          prose-li:text-gray-600 dark:prose-li:text-gray-400
                          prose-strong:text-gray-900 dark:prose-strong:text-white
                          prose-a:text-indigo-600 dark:prose-a:text-indigo-400">
            <PreInfoFormContent />
          </div>
        </div>

      </div>
    </div>
  );
}