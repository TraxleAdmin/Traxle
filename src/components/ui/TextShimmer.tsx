'use client';
import React from 'react';

export default function TextShimmer({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <>
      <span className={`text-transparent bg-clip-text 
                        bg-[linear-gradient(to_right,#60A5FA,#22D3EE,#C084FC,#60A5FA)] 
                        animate-text-shimmer bg-[length:200%_auto] ${className}`}>
        {children}
      </span>

      {/* 🔥 BU STİL BLOĞU SAYESİNDE ANİMASYON HER SAYFADA ÇALIŞIR */}
      <style jsx global>{`
        @keyframes text-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-text-shimmer {
          animation: text-shimmer 3s linear infinite;
        }
      `}</style>
    </>
  );
}