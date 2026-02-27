'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiDatabase, FiCreditCard, FiMapPin, FiCode, FiArrowRight, FiCheck } from 'react-icons/fi';
import UnifiedCard from '@/components/ui/UnifiedCard';
import TextShimmer from '@/components/ui/TextShimmer';

const categories = [{ id: 'all', label: 'Tümü' }, { id: 'erp', label: 'ERP & Muhasebe' }, { id: 'payment', label: 'Ödeme Sistemleri' }, { id: 'tracking', label: 'Araç Takip' }];

const integrations = [
  { id: 3, name: 'Logo Yazılım', category: 'erp', desc: 'Fatura ve irsaliyelerinizi Traxle ile senkronize edin.', icon: <FiDatabase />, status: 'Beta', color: 'from-orange-400 to-amber-300' },
  { id: 4, name: 'Param POS', category: 'payment', desc: 'Güvenli ödeme altyapısı ile anında tahsilat yapın.', icon: <FiCreditCard />, status: 'Aktif', color: 'from-blue-400 to-cyan-300' },
  { id: 5, name: 'Arvento', category: 'tracking', desc: 'Araçlarınızın konum verisini Traxle paneline yansıtın.', icon: <FiMapPin />, status: 'Planlanıyor', color: 'from-red-400 to-rose-300' },
  { id: 6, name: 'Paraşüt', category: 'erp', desc: 'Ön muhasebe kayıtlarınız otomatik oluşsun.', icon: <FiDatabase />, status: 'Aktif', color: 'from-pink-400 to-fuchsia-300' }
];

const codeContent = [
  { text: "const ", color: "text-purple-400" }, { text: "traxle ", color: "text-yellow-300" }, { text: "= require('traxle-api');\n\n", color: "text-white" },
  { text: "// Yeni kiralama oluştur ve tedarikçi ata\n", color: "text-gray-500" },
  { text: "await traxle.rentals.create({\n", color: "text-white" },
  { text: "  project_id: 'PRJ_8821',\n", color: "text-orange-400" },
  { text: "  machine_type: 'Excavator',\n", color: "text-orange-400" },
  { text: "  delivery_address: 'Antalya Şantiye',\n", color: "text-orange-400" },
  { text: "});\n\n", color: "text-white" },
  { text: "console.log(\"Kiralama talebi iletildi! 🚀\");", color: "text-green-400" },
];

function InteractiveCodeBlock() {
  const [typedCount, setTypedCount] = useState(25);
  const [isHovering, setIsHovering] = useState(false);
  const totalChars = codeContent.reduce((acc, token) => acc + token.text.length, 0);

  useEffect(() => {
    const handleKeyDown = () => {
      if (!isHovering) return;
      setTypedCount((prev) => Math.min(prev + Math.floor(Math.random() * 3) + 2, totalChars));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHovering, totalChars]);

  return (
    <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className="bg-[#1e1e1e] rounded-2xl p-6 shadow-2xl border border-white/10 font-mono text-xs md:text-sm h-[320px] cursor-text relative">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-red-400/80"></div><div className="w-3 h-3 rounded-full bg-yellow-400/80"></div><div className="w-3 h-3 rounded-full bg-green-400/80"></div></div>
      </div>
      <div className="whitespace-pre-wrap leading-relaxed">
        {codeContent.map((token, index) => {
          let currentCount = codeContent.slice(0, index).reduce((acc, t) => acc + t.text.length, 0);
          if (currentCount >= typedCount) return null;
          return <span key={index} className={token.color}>{token.text.slice(0, typedCount - currentCount)}</span>;
        })}
      </div>
    </div>
  );
}

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const filteredIntegrations = activeTab === 'all' ? integrations : integrations.filter(item => item.category === activeTab);

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-[#050814] text-gray-900 dark:text-white pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 border border-purple-200 text-xs font-bold uppercase mb-6">Bağlantılı Ekosistem</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Tüm Sistemlerinizle <br /><TextShimmer>Konuşan</TextShimmer> Tek Platform.</motion.h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Traxle, kullandığınız muhasebe ve ödeme sistemleriyle %100 uyumlu çalışır.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveTab(cat.id)} className={`px-6 py-2.5 rounded-full text-sm font-bold border transition-all ${activeTab === cat.id ? 'bg-gray-900 text-white dark:bg-white dark:text-black' : 'bg-white/50 dark:bg-white/5 text-gray-500'}`}>{cat.label}</button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          <AnimatePresence mode='popLayout'>
            {filteredIntegrations.map((item) => (
              <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} key={item.id} className="relative group h-full">
                <div className="relative h-full bg-white/80 dark:bg-[#080c14] border border-gray-100 dark:border-white/5 rounded-[2rem] p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-gray-50 dark:bg-white/5">{item.icon}</div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border bg-gray-50 dark:bg-white/5">{item.status}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="relative rounded-[2.5rem] p-[2px] bg-gradient-to-br from-purple-400/20 via-transparent to-blue-400/20 shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center bg-white dark:bg-[#080c14] p-10 md:p-16 rounded-[2.5rem]">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-purple-600 font-mono text-sm bg-purple-50 px-4 py-1.5 rounded-full"><FiCode /> developers.traxleapp.com</div>
              <h2 className="text-3xl md:text-5xl font-black leading-tight">Kendi Entegrasyonunuzu <br /> <span className="text-purple-500">Kodlayın.</span></h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-lg">Traxle API, geliştiriciler için tasarlandı. RESTful mimarisi ve Webhook desteği ile sisteminizi saniyeler içinde bağlayın.</p>
            </div>
            <div className="flex-1 w-full max-w-xl mx-auto"><InteractiveCodeBlock /></div>
          </div>
        </div>
      </div>
    </div>
  );
}