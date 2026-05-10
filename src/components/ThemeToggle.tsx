"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full border border-gray-200 bg-white p-2 text-gray-700 shadow-sm transition hover:bg-gray-100 dark:border-white/10 dark:bg-white/5 dark:text-yellow-300 dark:hover:bg-white/10"
      aria-label="Toggle theme"
    >
      {isDark ? <FiMoon size={18} /> : <FiSun size={18} />}
    </button>
  );
}
