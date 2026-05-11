import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // <--- KRİTİK AYAR BU
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        traxle: {
          blue: "#0057FF", 
          cyan: "#00C2FF", 
          dark: "#050814", 
          panel: "#0F1629", 
          border: "rgba(255, 255, 255, 0.08)", 
        },
      },
      backgroundImage: {
        'traxle-gradient': 'linear-gradient(135deg, #0057FF 0%, #00C2FF 100%)',
        'glass-gradient': 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
      },
      boxShadow: {
        'neon-blue': '0 0 20px -5px rgba(0, 87, 255, 0.5)',
        'neon-cyan': '0 0 20px -5px rgba(0, 194, 255, 0.5)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;