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
      className="rounded-full border border-slate-200/80 bg-white/80 p-2 text-slate-700 shadow-[0_6px_20px_rgba(15,23,42,0.1)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white dark:border-white/15 dark:bg-white/[0.08] dark:text-amber-300 dark:hover:bg-white/15"
      aria-label="Toggle theme"
    >
      {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
}
