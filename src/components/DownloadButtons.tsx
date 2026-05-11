'use client';

import Link from 'next/link';

export default function DownloadButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      
      {/* --- APP STORE BUTONU --- */}
      <Link href="#" className="group relative flex items-center justify-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] 
        /* SABİT GENİŞLİK: w-[200px] ile ikisini eşitliyoruz */
        w-full sm:w-[200px]
        
        /* LIGHT MODE */
        bg-gray-100 border border-gray-300 text-gray-900 hover:bg-white hover:border-gray-400 hover:shadow-lg
        
        /* DARK MODE */
        dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white dark:hover:text-black dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
      >
        
        {/* Parlama Efekti */}
        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out
                bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/30">
            </div>
        </div>
        
        {/* Apple SVG */}
        <svg className="w-6 h-6 fill-current shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.565,9.785c-0.123,0.077-3.051,1.702-3.051,5.305c0.138,4.109,3.695,5.55,3.756,5.55 c-0.061,0.077-0.537,1.963-1.947,3.94C23.204,26.283,21.962,28,20.076,28c-1.794,0-2.438-1.135-4.508-1.135 c-2.223,0-2.852,1.135-4.554,1.135c-1.886,0-3.22-1.809-4.4-3.496c-1.533-2.208-2.836-5.673-2.882-9 c-0.031-1.763,0.307-3.496,1.165-4.968c1.211-2.055,3.373-3.45,5.734-3.496c1.809-0.061,3.419,1.242,4.523,1.242 c1.058,0,3.036-1.242,5.274-1.242C21.394,7.041,23.97,7.332,25.565,9.785z M15.001,6.688c-0.322-1.61,0.567-3.22,1.395-4.247 c1.058-1.242,2.729-2.085,4.17-2.085c0.092,1.61-0.491,3.189-1.533,4.339C18.098,5.937,16.488,6.872,15.001,6.688z" />
        </svg>

        <div className="flex flex-col items-start leading-none relative z-10">
          <span className="text-[9px] font-semibold opacity-60 uppercase tracking-widest mb-0.5">İndirin</span>
          <span className="text-lg font-bold tracking-tight">App Store</span>
        </div>
      </Link>

      {/* --- GOOGLE PLAY BUTONU --- */}
      <Link href="#" className="group relative flex items-center justify-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] 
        /* SABİT GENİŞLİK */
        w-full sm:w-[200px]
        
        /* LIGHT MODE */
        bg-gray-100 border border-gray-300 text-gray-900 hover:bg-white hover:border-gray-400 hover:shadow-lg
        
        /* DARK MODE */
        dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white dark:hover:text-black dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
      >
        
        {/* Parlama Efekti */}
        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out
                bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/30">
            </div>
        </div>

        {/* Google Play SVG */}
        <svg className="w-6 h-6 shrink-0 transition-transform group-hover:scale-110" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 466 511.98">
            <g>
                <path fill="#EA4335" d="M199.9 237.8l-198.5 232.37c7.22,24.57 30.16,41.81 55.8,41.81 11.16,0 20.93,-2.79 29.3,-8.37l0 0 244.16 -139.46 -130.76 -126.35z"/>
                <path fill="#FBBC04" d="M433.91 205.1l0 0 -104.65 -60 -111.61 110.22 113.01 108.83 104.64 -58.6c18.14,-9.77 30.7,-29.3 30.7,-50.23 -1.4,-20.93 -13.95,-40.46 -32.09,-50.22z"/>
                <path fill="#34A853" d="M199.42 273.45l129.85 -128.35 -241.37 -136.73c-8.37,-5.58 -19.54,-8.37 -30.7,-8.37 -26.5,0 -50.22,18.14 -55.8,41.86 0,0 0,0 0,0l198.02 231.59z"/>
                <path fill="#4285F4" d="M1.39 41.86c-1.39,4.18 -1.39,9.77 -1.39,15.34l0 397.64c0,5.57 0,9.76 1.4,15.34l216.27 -214.86 -216.28 -213.46z"/>
            </g>
        </svg>

        <div className="flex flex-col items-start leading-none relative z-10">
          <span className="text-[9px] font-semibold opacity-60 uppercase tracking-widest mb-0.5">Edinin</span>
          <span className="text-lg font-bold tracking-tight">Google Play</span>
        </div>
      </Link>

    </div>
  );
}