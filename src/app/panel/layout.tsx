'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { sendVerificationEmail } from '@/lib/auth';
import {
  FiSettings, FiLogOut, FiMenu, FiX, FiUser, FiShield, FiSmartphone, FiBriefcase
} from 'react-icons/fi';
import ThemeToggle from '@/components/ThemeToggle';
import NotificationBadge from '@/components/NotificationBadge';
import { motion, AnimatePresence } from 'framer-motion';

function UserBadge({ role }: { role: string }) {
  const isSupplier = role === 'supplier';
  const isAdmin = role?.startsWith('admin');

  const badgeStyle = isAdmin
    ? "bg-red-500/10 text-red-500 border-red-500/20"
    : isSupplier
      ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
      : "bg-blue-500/10 text-blue-500 border-blue-500/20";

  const icon = isAdmin ? <FiShield /> : isSupplier ? <FiBriefcase /> : <FiUser />;
  const text = role === 'admin' ? "YÖNETİCİ" : role?.startsWith('admin_') ? "PERSONEL" : isSupplier ? "TEDARİKÇİ" : "ŞANTİYE (MÜŞTERİ)";

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${badgeStyle}`}>
      {icon} <span>{text}</span>
    </div>
  );
}

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push('/giris');
      } else {
        setUser(currentUser);
        const unsubDoc = onSnapshot(doc(db, "users", currentUser.uid), (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);

            // Yöneticileri otomatik olarak kendi panellerine şutla
            if (pathname === '/panel') {
              if (data.role === 'admin') router.replace('/panel/admin');
              else if (data.role?.startsWith('admin_')) router.replace('/panel/staff');
            }
          }
        });

        setTimeout(() => setLoading(false), 500);
        return () => unsubDoc();
      }
    });
    return () => unsubscribe();
  }, [router, pathname]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/giris');
  };

  const handleResendMail = async () => {
    if (!user) return;
    await sendVerificationEmail(user);
    alert("Doğrulama maili tekrar gönderildi.");
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-[#F3F4F6] dark:bg-[#050814] w-full overflow-hidden">
        <div className="w-[280px] border-r border-gray-200 dark:border-white/5 p-6 hidden lg:flex flex-col gap-8 bg-white dark:bg-[#0B0F19]">
          <div className="w-32 h-10 bg-gray-200 dark:bg-white/5 animate-pulse rounded-xl mx-auto"></div>
          <div className="flex items-center gap-4 mt-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-white/5 animate-pulse"></div>
            <div className="space-y-2 flex-1">
              <div className="w-full h-4 bg-gray-200 dark:bg-white/5 animate-pulse rounded"></div>
              <div className="w-2/3 h-3 bg-gray-200 dark:bg-white/5 animate-pulse rounded"></div>
            </div>
          </div>
          <div className="space-y-4 mt-4">
            {[1, 2].map(i => <div key={i} className="w-full h-12 bg-gray-200 dark:bg-white/5 animate-pulse rounded-xl"></div>)}
          </div>
        </div>
        <div className="flex-1 p-8 flex flex-col gap-8">
          <div className="w-full h-20 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/5 animate-pulse rounded-2xl"></div>
          <div className="w-full h-64 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/5 animate-pulse rounded-3xl"></div>
        </div>
      </div>
    );
  }

  // Admin veya Staff isek standart yan menüyü çizmeyip içerideki özel tasarımlarını gösteriyoruz
  const isSpecialRoute = pathname?.startsWith('/panel/admin') || pathname?.startsWith('/panel/staff');
  if (isSpecialRoute) {
    return (
      <div className="h-screen bg-[#050814] text-white overflow-hidden flex flex-col">
        {user && !user.emailVerified && (
          <div className="bg-orange-500/10 border-b border-orange-500/20 p-2 text-center text-xs text-orange-400 font-bold z-50 shrink-0">
            Hesap güvenliğiniz için lütfen e-postanızı doğrulayın. <button onClick={handleResendMail} className="underline text-white ml-2">Tekrar Gönder</button>
          </div>
        )}
        {children}
      </div>
    );
  }

  // 🔥 MÜŞTERİ VE TEDARİKÇİ İÇİN KISITLANMIŞ MENÜ
  const menuConfig = {
    customer: [
      { icon: <FiSmartphone />, label: 'Mobil Uygulama', href: '/panel' },
      { icon: <FiSettings />, label: 'Firma Ayarları', href: '/panel/ayarlar' },
    ],
    supplier: [
      { icon: <FiSmartphone />, label: 'Mobil Uygulama', href: '/panel' },
      { icon: <FiSettings />, label: 'Şirket & Evraklar', href: '/panel/ayarlar' },
    ]
  };

  const currentMenu = menuConfig[userData?.role as keyof typeof menuConfig] || menuConfig.customer;

  return (
    <div className="flex h-screen bg-[#F3F4F6] dark:bg-[#050814] text-gray-900 dark:text-gray-100 overflow-hidden font-sans selection:bg-blue-500/30">

      {/* --- STANDART KULLANICI SIDEBAR --- */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-white dark:bg-[#0B0F19] border-r border-gray-200 dark:border-white/5 transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] flex flex-col shadow-2xl lg:shadow-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
        <div className="h-24 flex items-center justify-center border-b border-gray-100 dark:border-white/5">
          <Link href="/" className="relative w-40 h-12 block">
            <Image src="/logo.png" alt="Traxle Logo" fill className="object-contain object-center dark:brightness-0 dark:invert transition-all" priority />
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden absolute right-4 p-2 text-gray-500"><FiX /></button>
        </div>

        <div className="p-6 pb-2">
          <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5 flex items-center gap-4 group hover:border-blue-500/30 transition-colors">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-[2px]">
                <div className="w-full h-full rounded-full bg-white dark:bg-[#0B0F19] overflow-hidden">
                  {userData?.photoURL ? <img src={userData.photoURL} alt="Profil" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center font-bold text-lg text-gray-500">{userData?.name?.[0]?.toUpperCase() || 'U'}</div>}
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#0B0F19] rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm truncate">{userData?.companyName || userData?.name || 'Kullanıcı'}</h4>
              <UserBadge role={userData?.role} />
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Ana Menü</p>
          {currentMenu.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)} className="block relative group">
                {isActive && <motion.div layoutId="activeTab" className="absolute inset-0 bg-blue-50 dark:bg-blue-600/10 rounded-xl" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
                <div className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl transition-colors ${isActive ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
                  <span className={`text-xl ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'}`}>{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                  {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-white/5">
          <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 transition-colors">
            <FiLogOut className="text-lg" /> Oturumu Kapat
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 relative h-screen overflow-hidden">
        <header className="h-20 flex items-center justify-between px-6 lg:px-10 bg-white/80 dark:bg-[#050814]/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg"><FiMenu size={24} /></button>
            <div className="flex flex-col">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white capitalize leading-tight">
                {pathname === '/panel' ? 'Uygulama İndir' : pathname?.split('/').pop()?.replace(/-/g, ' ')}
              </h2>
              <p className="text-xs text-gray-500 hidden sm:block">Traxle B2B Paneli</p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            <ThemeToggle />
            <NotificationBadge />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            {user && !user.emailVerified && (
              <div className="mb-6 bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 p-4 rounded-2xl flex items-center justify-between text-sm text-orange-800 dark:text-orange-400 font-bold">
                <span>Lütfen hesabınızı güvenceye almak için e-posta adresinizi doğrulayın.</span>
                <button onClick={handleResendMail} className="underline hover:text-orange-600 dark:hover:text-orange-300">Tekrar Gönder</button>
              </div>
            )}
            {children}
          </div>
        </main>

        <AnimatePresence>
          {isSidebarOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" />}
        </AnimatePresence>
      </div>
    </div>
  );
}