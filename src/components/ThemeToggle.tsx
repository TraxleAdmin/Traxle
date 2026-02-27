'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi'; // react-icons kurulu varsayıyorum

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Hydration hatasını önlemek için (Next.js klasiği)
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full transition-all duration-300
                 bg-gray-100 dark:bg-gray-800 
                 text-gray-800 dark:text-yellow-400
                 hover:bg-gray-200 dark:hover:bg-gray-700
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Temayı Değiştir"
    >
      {theme === 'dark' ? <FiMoon size={20} /> : <FiSun size={20} />}
    </button>
  );
}