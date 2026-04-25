'use client';

import React from 'react';

export default function BrandLogos() {
  return (
    <section className="py-10 border-y border-white/5 bg-traxle-dark/50 backdrop-blur-sm">
      <div className="container mx-auto px-6">

        <p className="text-center text-sm text-gray-500 mb-8 font-medium uppercase tracking-widest">
          TÜM ŞANTİYE VE İŞ MAKİNESİ İHTİYAÇLARINIZ İÇİN TEK PLATFORM
        </p>

        {/* Kategori Grid */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">

          {/* Kategori 1: Ekskavatör */}
          <div className="flex flex-col items-center gap-2 group cursor-pointer">
            <svg className="w-10 h-10 text-white group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors tracking-widest">EKSKAVATÖR</span>
          </div>

          {/* Kategori 2: Vinç */}
          <div className="flex flex-col items-center gap-2 group cursor-pointer">
            <svg className="w-10 h-10 text-white group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l8-4v18M13 7l6 4v10" />
            </svg>
            <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors tracking-widest">VİNÇ (CRANE)</span>
          </div>

          {/* Kategori 3: Loder */}
          <div className="flex flex-col items-center gap-2 group cursor-pointer">
            <svg className="w-10 h-10 text-white group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
            </svg>
            <span className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors tracking-widest">LODER</span>
          </div>

          {/* Kategori 4: Lowbed / Ağır Nakliye */}
          <div className="flex flex-col items-center gap-2 group cursor-pointer">
            <svg className="w-10 h-10 text-white group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <rect x="2" y="10" width="20" height="8" rx="2" />
              <circle cx="6" cy="18" r="2" />
              <circle cx="18" cy="18" r="2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 10V6a2 2 0 00-2-2H6a2 2 0 00-2 2v4" />
            </svg>
            <span className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors tracking-widest">AĞIR NAKLİYE</span>
          </div>

          {/* Kategori 5: Dozer */}
          <div className="flex flex-col items-center gap-2 group cursor-pointer">
            <svg className="w-10 h-10 text-white group-hover:text-orange-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 10h16v8H4zm0 0l4-6h8l4 6" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2 14h20" />
            </svg>
            <span className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors tracking-widest">DOZER & GREYDER</span>
          </div>

        </div>
      </div>
    </section>
  );
}