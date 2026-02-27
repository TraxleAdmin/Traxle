import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050814] flex flex-col items-center justify-center relative overflow-hidden text-center px-4">
      
      {/* Arka Plan Işıkları */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px]" />
      
      {/* Büyük 404 Yazısı */}
      <h1 className="text-[150px] md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-700 to-[#050814] leading-none select-none opacity-50">
        404
      </h1>

      <div className="relative z-10 -mt-10 md:-mt-20">
        <div className="inline-block px-4 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium mb-4 animate-pulse">
          Sinyal Kaybı
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Rota Hesaplanamadı!
        </h2>
        
        <p className="text-gray-400 text-lg max-w-lg mx-auto mb-8">
          Aradığınız koordinatlarda herhangi bir veri bulunamadı. Sayfa taşınmış veya silinmiş olabilir.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-white text-[#050814] px-8 py-4 rounded-lg font-bold hover:bg-gray-200 transition-all hover:scale-105"
        >
          <span>←</span> Ana Üsse Dön
        </Link>
      </div>
    </div>
  );
}