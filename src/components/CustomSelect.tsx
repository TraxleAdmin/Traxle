'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

interface CustomSelectProps {
  label?: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function CustomSelect({ label, value, options, onChange, placeholder = "Seçiniz" }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Dışarı tıklandığında kapatma mantığı
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref]);

  return (
    <div className="relative w-full" ref={ref}>
      {label && (
        <label className="block text-xs font-bold text-gray-500 mb-1 ml-1 uppercase tracking-wider">
          {label}
        </label>
      )}
      
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3.5 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 outline-none text-gray-900 dark:text-white flex justify-between items-center transition-all hover:border-blue-500/50 focus:border-blue-500"
      >
        <span className={`truncate font-medium ${!value ? 'text-gray-400' : ''}`}>
          {value || placeholder}
        </span>
        <FiChevronDown 
          className={`transition-transform duration-300 text-gray-400 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="absolute z-[100] w-full mt-2 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto custom-scrollbar">
              {options.map((option) => (
                <div 
                  key={option}
                  onClick={() => { onChange(option); setIsOpen(false); }}
                  className={`px-4 py-3 text-sm cursor-pointer transition-colors border-b border-gray-100 dark:border-white/5 last:border-0
                    ${value === option 
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-bold' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                    }`}
                >
                  {option}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}