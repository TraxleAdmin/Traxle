import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center relative overflow-hidden text-center px-4 transition-colors duration-500">
      
      {/* Arka Plan Işıkları */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[100px]" />
      
      {/* Büyük 404 Yazısı */}
      <h1 className="text-[150px] md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-50 dark:from-gray-800 dark:to-[#050814] leading-none select-none opacity-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
        404
      </h1>

      <div className="relative z-10 -mt-10 md:-mt-20">
        <div className="inline-block px-4 py-1.5 rounded-full bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-500 text-sm font-bold mb-6 animate-pulse">
          Sinyal Kaybı
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
          Rota Hesaplanamadı!
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-lg mx-auto mb-8 font-medium">
          Aradığınız koordinatlarda herhangi bir veri bulunamadı. Sayfa taşınmış veya silinmiş olabilir.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-[#050814] px-8 py-4 rounded-xl font-black hover:scale-105 transition-all shadow-lg active:scale-95"
        >
          <span>←</span> Ana Karargaha Dön
        </Link>
      </div>
    </div>
  );
}