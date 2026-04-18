import Link from 'next/link';
import { FiTool } from 'react-icons/fi';

export default function LojistikYakindaPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#050814] flex flex-col items-center justify-center relative overflow-hidden text-center px-4 transition-colors duration-500 selection:bg-blue-500/30">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />
      
      <h1 className="text-[80px] md:text-[180px] font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-50 dark:from-gray-800 dark:to-[#050814] leading-none select-none opacity-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
        LOJİSTİK
      </h1>

      <div className="relative z-10 -mt-10 md:-mt-20">
        <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-bold mb-6 backdrop-blur-md">
          <FiTool className="animate-spin-slow" /> Geliştirme Aşamasında
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
          Traxle Lojistik Çok Yakında!
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-lg mx-auto mb-10 leading-relaxed font-medium">
          İş makinesi ve ağır vasıta kiralama sektörünü kökünden değiştirecek olan B2B işletim sistemimiz şu an inşa ediliyor. Ekosistemin bu parçası aktif olduğunda duyuracağız.
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