'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FiMenu, FiX } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import NotificationBadge from './NotificationBadge';

// --- MAGNETIC BUTTON EFEKTİ ---
const MagneticButton = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };

    const reset = () => setPosition({ x: 0, y: 0 });

    return (
        <motion.div
            ref={ref}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            className={className}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 🔥 KONUM KONTROLÜ: Kullanıcı hala kayıt sayfasında mı?
  const isRegistrationPage = pathname === '/kayit-ol';

  // Scroll takibi
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auth durumu takibi
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Panel sayfalarında Navbar GİZLENSİN
  if (pathname?.startsWith('/panel')) return null;

  return (
    <>
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/80 dark:bg-[#050814]/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 py-3' 
        : 'bg-transparent border-b border-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="relative h-8 w-28 hover:opacity-80 transition-opacity">
          <Image 
            src="/logo.png" 
            alt="Traxle" 
            fill 
            className="object-contain object-left dark:invert-0 invert-0 dark:filter-none filter" 
            priority 
          />
        </Link>

        {/* ORTA MENÜ (Sadece PC) */}
        <div className="hidden md:flex items-center gap-1 bg-gray-100 dark:bg-white/5 p-1 rounded-full border border-gray-200 dark:border-white/5 backdrop-blur-md transition-colors duration-300">
          <NavLink href="/ozellikler">Özellikler</NavLink>
          <NavLink href="/#nasil-calisir">Nasıl Çalışır?</NavLink>
          {/* EKLENDİ: Hakkımızda Linki */}
          <NavLink href="/hakkimizda">Hakkımızda</NavLink>
          <NavLink href="/iletisim">İletişim</NavLink>
        </div>

        {/* SAĞ TARAF (Sadece PC) */}
        <div className="hidden md:flex items-center gap-4">
          
          <div className="scale-90">
             <ThemeToggle />
          </div>

          {loading ? (
            <div className="w-24 h-9 bg-gray-200 dark:bg-white/5 rounded-full animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-4">
                <NotificationBadge />

                <MagneticButton>
                    {/* 🔥 BUTON KONTROLÜ: KAYIT SAYFASINDAYSA PASİF */}
                    {isRegistrationPage ? (
                        <button disabled className="flex items-center gap-2 bg-gray-400 text-white px-5 py-2.5 rounded-full shadow-none cursor-not-allowed font-semibold text-xs tracking-wide opacity-70">
                            <span>Yönlendiriliyor...</span>
                        </button>
                    ) : (
                        <Link href="/panel">
                            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full shadow-lg shadow-blue-500/20 transition-all font-semibold text-xs tracking-wide">
                                <span>Panele Git</span>
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </button>
                        </Link>
                    )}
                </MagneticButton>
            </div>
          ) : (
            // Giriş / Kayıt Butonu
            <div className="relative h-[42px] bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full shadow-sm overflow-hidden transition-all duration-300 w-[110px] hover:w-[190px] group cursor-pointer backdrop-blur-md">
                
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
                    <span className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        Giriş Yap
                    </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-between px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button 
                        onClick={() => router.push('/giris')} 
                        className="flex-1 h-[34px] flex items-center justify-center rounded-full text-[11px] font-bold hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-gray-700 dark:text-white"
                        >
                        Giriş
                        </button>
                        
                        <div className="w-[1px] h-3 bg-gray-300 dark:bg-white/20"></div>
                        
                        <button 
                        onClick={() => router.push('/kayit-ol')}
                        className="flex-1 h-[34px] flex items-center justify-center rounded-full text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                        >
                        Kayıt
                        </button>
                </div>
            </div>
          )}
        </div>

        {/* MOBİL İÇİN HAMBURGER BUTTON */}
        <div className="flex items-center gap-4 md:hidden">
            <div className="scale-75">
                <ThemeToggle />
            </div>
            
            {user && <NotificationBadge />}

            <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-900 dark:text-white p-2"
            >
                {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
        </div>

      </div>
    </nav>

    {/* --- MOBİL MENÜ --- */}
    <AnimatePresence>
        {mobileMenuOpen && (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed inset-0 z-40 bg-white/95 dark:bg-[#050814]/95 backdrop-blur-3xl pt-24 px-6 md:hidden flex flex-col gap-6"
            >
                <div className="flex flex-col gap-4 text-center">
                    <Link href="/ozellikler" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-gray-900 dark:text-white py-2">Özellikler</Link>
                    <Link href="/#nasil-calisir" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-gray-900 dark:text-white py-2">Nasıl Çalışır?</Link>
                    {/* EKLENDİ: Hakkımızda Linki Mobil */}
                    <Link href="/hakkimizda" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-gray-900 dark:text-white py-2">Hakkımızda</Link>
                    <Link href="/iletisim" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-gray-900 dark:text-white py-2">İletişim</Link>
                    
                    <div className="w-full h-px bg-gray-200 dark:bg-white/10 my-4"></div>
                    
                    {!loading && (
                          user ? (
                            // 🔥 MOBİL MENÜDE DE AYNISINI UYGULA
                            isRegistrationPage ? (
                                <button disabled className="bg-gray-400 text-white py-4 rounded-xl font-bold text-lg cursor-not-allowed opacity-50">
                                    Yönlendiriliyor...
                                </button>
                            ) : (
                                <Link href="/panel" onClick={() => setMobileMenuOpen(false)} className="bg-blue-600 text-white py-4 rounded-xl font-bold text-lg">
                                    Panele Git
                                </Link>
                            )
                          ) : (
                             <div className="flex flex-col gap-3">
                                <Link href="/giris" onClick={() => setMobileMenuOpen(false)} className="bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white py-4 rounded-xl font-bold text-lg border border-gray-200 dark:border-white/5">
                                    Giriş Yap
                                </Link>
                                <Link href="/kayit-ol" onClick={() => setMobileMenuOpen(false)} className="bg-blue-600 text-white py-4 rounded-xl font-bold text-lg">
                                    Kayıt Ol
                                </Link>
                             </div>
                          )
                    )}
                </div>
            </motion.div>
        )}
    </AnimatePresence>
    </>
  );
}

const NavLink = ({href, children}: {href:string, children:React.ReactNode}) => (
  <Link href={href} className="px-5 py-2 rounded-full text-sm font-medium transition-all
    text-gray-600 hover:text-black hover:bg-white
    dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10">
    {children}
  </Link>
);