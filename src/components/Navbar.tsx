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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

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
        <Link href="/" className="relative h-8 w-32 hover:opacity-80 transition-opacity">
          <Image 
            src="/logo.png" 
            alt="TraxleAPP" 
            fill 
            className="object-contain object-left dark:invert-0 invert-0 dark:filter-none filter" 
            priority 
          />
        </Link>

<div className="hidden md:flex items-center gap-1 bg-gray-100 dark:bg-white/5 p-1 rounded-full border border-gray-200 dark:border-white/5 backdrop-blur-md">
          <NavLink href="/kunyex">KünyeX</NavLink>
          <NavLink href="/molatik">Molatik</NavLink>
          <NavLink href="/lojistik">Lojistik</NavLink>
          <NavLink href="/hakkimizda">Şirket</NavLink>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="scale-90"><ThemeToggle /></div>
          {loading ? (
            <div className="w-24 h-9 bg-gray-200 dark:bg-white/5 rounded-full animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-4">
                <NotificationBadge />
                <MagneticButton>
                    <Link href="/panel">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full shadow-lg shadow-blue-500/20 transition-all font-bold text-xs tracking-wide">
                            Panele Git
                        </button>
                    </Link>
                </MagneticButton>
            </div>
          ) : (
            <button onClick={() => router.push('/giris')} className="px-6 py-2.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black text-xs font-bold hover:opacity-90 transition-all">Giriş Yap</button>
          )}
        </div>

        <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-900 dark:text-white p-2">
                {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
        </div>
      </div>
    </nav>
    </>
  );
}

const NavLink = ({href, children}: {href:string, children:React.ReactNode}) => (
  <Link href={href} className="px-5 py-2 rounded-full text-sm font-medium transition-all text-gray-600 hover:text-black hover:bg-white dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10">{children}</Link>
);