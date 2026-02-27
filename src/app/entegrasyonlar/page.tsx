'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiDatabase, FiCreditCard, FiMapPin, FiCode, FiArrowRight, FiCheck } from 'react-icons/fi';
import UnifiedCard from '@/components/ui/UnifiedCard';
import TextShimmer from '@/components/ui/TextShimmer'; // Kısayol: Kayan Yazı

// --- ENTEGRASYON VERİLERİ (SOFT RENKLER) ---
const categories = [
  { id: 'all', label: 'Tümü' },
  { id: 'ecommerce', label: 'E-Ticaret' },
  { id: 'erp', label: 'ERP & Muhasebe' },
  { id: 'payment', label: 'Ödeme Sistemleri' },
  { id: 'tracking', label: 'Araç Takip' },
];

const integrations = [
  {
    id: 1,
    name: 'Shopify',
    category: 'ecommerce',
    desc: 'Siparişleriniz düştüğü an otomatik kargo kaydı oluşturun.',
    icon: <FiShoppingCart />,
    status: 'Aktif',
    color: 'from-green-400 to-emerald-300', 
  },
  {
    id: 2,
    name: 'WooCommerce',
    category: 'ecommerce',
    desc: 'WordPress sitenizdeki kargo süreçlerini otomatize edin.',
    icon: <FiShoppingCart />,
    status: 'Aktif',
    color: 'from-purple-400 to-indigo-300',
  },
  {
    id: 3,
    name: 'Logo Yazılım',
    category: 'erp',
    desc: 'Fatura ve irsaliyelerinizi Traxle ile senkronize edin.',
    icon: <FiDatabase />,
    status: 'Beta',
    color: 'from-orange-400 to-amber-300',
  },
  {
    id: 4,
    name: 'PayTR',
    category: 'payment',
    desc: 'Güvenli ödeme altyapısı ile anında tahsilat yapın.',
    icon: <FiCreditCard />,
    status: 'Aktif',
    color: 'from-blue-400 to-cyan-300',
  },
  {
    id: 5,
    name: 'Arvento',
    category: 'tracking',
    desc: 'Araçlarınızın konum verisini Traxle paneline yansıtın.',
    icon: <FiMapPin />,
    status: 'Planlanıyor',
    color: 'from-red-400 to-rose-300',
  },
  {
    id: 6,
    name: 'Paraşüt',
    category: 'erp',
    desc: 'Ön muhasebe kayıtlarınız otomatik oluşsun.',
    icon: <FiDatabase />,
    status: 'Aktif',
    color: 'from-pink-400 to-fuchsia-300',
  },
  {
    id: 7,
    name: 'Iyzico',
    category: 'payment',
    desc: 'Kredi kartı saklama ve tek tıkla ödeme kolaylığı.',
    icon: <FiCreditCard />,
    status: 'Aktif',
    color: 'from-blue-400 to-indigo-300',
  },
  {
    id: 8,
    name: 'Ideasoft',
    category: 'ecommerce',
    desc: 'Yerli e-ticaret altyapınızla tam uyumlu çalışır.',
    icon: <FiShoppingCart />,
    status: 'Aktif',
    color: 'from-yellow-300 to-orange-300',
  },
];

// --- HACKER TYPER BİLEŞENİ ---
const codeContent = [
    { text: "const ", color: "text-purple-400" },
    { text: "traxle ", color: "text-yellow-300" },
    { text: "= ", color: "text-white" },
    { text: "require", color: "text-blue-400" },
    { text: "('", color: "text-white" },
    { text: "traxle-api", color: "text-green-400" },
    { text: "');\n\n", color: "text-white" },
    { text: "// Yeni bir sipariş oluştur ve sürücü ata\n", color: "text-gray-500" },
    { text: "await ", color: "text-purple-400" },
    { text: "traxle", color: "text-yellow-300" },
    { text: ".", color: "text-white" },
    { text: "orders", color: "text-white" },
    { text: ".", color: "text-white" },
    { text: "create", color: "text-blue-400" },
    { text: "({\n", color: "text-white" },
    { text: "  customer_id: ", color: "text-sky-300" },
    { text: "'CUST_8821'", color: "text-orange-400" },
    { text: ",\n", color: "text-white" },
    { text: "  items: ", color: "text-sky-300" },
    { text: "[...]", color: "text-white" },
    { text: ",\n", color: "text-white" },
    { text: "  delivery_address: ", color: "text-sky-300" },
    { text: "'Antalya, TR'", color: "text-orange-400" },
    { text: ",\n", color: "text-white" },
    { text: "  webhook_url: ", color: "text-sky-300" },
    { text: "'https://mysite.com/hook'\n", color: "text-orange-400" },
    { text: "});\n\n", color: "text-white" },
    { text: "// Başarılı yanıtı logla\n", color: "text-gray-500" },
    { text: "console", color: "text-white" },
    { text: ".", color: "text-white" },
    { text: "log", color: "text-yellow-300" },
    { text: "(", color: "text-white" },
    { text: "\"Sipariş Traxle'a iletildi! 🚀\"", color: "text-green-400" },
    { text: ");", color: "text-white" },
];

function InteractiveCodeBlock() {
    const [typedCount, setTypedCount] = useState(25);
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const totalChars = codeContent.reduce((acc, token) => acc + token.text.length, 0);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isHovering) return;
            const jump = Math.floor(Math.random() * 3) + 2;
            setTypedCount((prev) => Math.min(prev + jump, totalChars));
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isHovering, totalChars]);

    const renderCode = () => {
        let currentCount = 0;
        return codeContent.map((token, index) => {
            if (currentCount >= typedCount) return null;
            const remaining = typedCount - currentCount;
            const textToShow = token.text.slice(0, remaining);
            currentCount += token.text.length;
            return <span key={index} className={token.color}>{textToShow}</span>;
        });
    };

    return (
        <div 
            ref={containerRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="bg-[#1e1e1e] rounded-2xl p-6 shadow-2xl border border-white/10 font-mono text-xs md:text-sm overflow-hidden relative group hover:border-purple-400/30 transition-colors h-[320px] cursor-text"
        >
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                </div>
                <div className={`text-[10px] text-gray-500 transition-opacity duration-300 ${isHovering && typedCount < totalChars ? 'opacity-100' : 'opacity-0'}`}>
                    (Yazmak için rastgele tuşlara basın)
                </div>
            </div>
            <div className="whitespace-pre-wrap leading-relaxed">
                {renderCode()}
                <span className="inline-block w-2 h-4 bg-purple-400 align-middle animate-pulse ml-1"></span>
            </div>
            <div className={`absolute bottom-6 right-6 px-3 py-1 bg-green-400/20 text-green-300 rounded text-xs border border-green-400/30 flex items-center gap-1 transition-all duration-500 ${typedCount >= totalChars ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <FiCheck /> Çalışıyor
            </div>
        </div>
    );
}

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredIntegrations = activeTab === 'all' 
    ? integrations 
    : integrations.filter(item => item.category === activeTab);

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-[#050814] text-gray-900 dark:text-white pt-32 pb-20 overflow-hidden transition-colors duration-300 selection:bg-blue-400/30">
      
      {/* --- ARKA PLAN EFEKTLERİ --- */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-400/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none dark:invert"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.04] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-bold tracking-wider uppercase mb-6 backdrop-blur-md border border-purple-200 dark:border-purple-500/30"
          >
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            Bağlantılı Ekosistem
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-gray-900 dark:text-white"
          >
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-gray-900 dark:text-white">
          Tüm Sistemlerinizle <br/>
        <TextShimmer>Konuşan</TextShimmer> Tek Platform.
      </h1>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Traxle, kullandığınız e-ticaret, muhasebe ve ödeme sistemleriyle %100 uyumlu çalışır. 
            Tek tıkla bağlayın, verileri otomatik aksın.
          </motion.p>
        </div>

        {/* --- FİLTRE BUTONLARI --- */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
           {categories.map((cat) => (
             <button
               key={cat.id}
               onClick={() => setActiveTab(cat.id)}
               className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border backdrop-blur-md relative overflow-hidden group
                 ${activeTab === cat.id 
                    ? 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-black dark:border-white shadow-lg scale-105' 
                    : 'bg-white/50 dark:bg-white/5 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:border-purple-400/50 hover:text-purple-500 dark:hover:text-white'
                 }`}
             >
               {cat.label}
             </button>
           ))}
        </div>

        {/* --- PREMIUM KARTLAR --- */}
        <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24"
        >
            <AnimatePresence mode='popLayout'>
                {filteredIntegrations.map((item) => (
                    <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.9 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                        key={item.id}
                        className="relative group h-full"
                    >
                        {/* Arkadaki Renkli Glow (Soft) */}
                        <div className={`absolute -inset-[1px] rounded-[2rem] bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-50 blur-lg transition-all duration-700`} />
                        
                        {/* Keskin Çerçeve */}
                        <div className={`absolute -inset-[1px] rounded-[2rem] bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-30 transition-all duration-500`} />

                        {/* Kartın Kendisi */}
                        <div className="relative h-full bg-white/80 dark:bg-[#080c14] border border-gray-100 dark:border-white/5 rounded-[2rem] p-8 flex flex-col justify-between overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-none transition-colors duration-300">
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] dark:opacity-[0.04] pointer-events-none" />
                            <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-full blur-[50px] pointer-events-none`} />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-500 group-hover:scale-105 group-hover:-rotate-3 shadow-sm border
                                                    bg-gray-50 border-gray-100 text-gray-500
                                                    dark:bg-white/5 dark:border-white/10 dark:text-gray-300
                                                    group-hover:bg-gradient-to-br ${item.color} group-hover:text-white group-hover:border-transparent group-hover:shadow-md`}>
                                        {item.icon}
                                    </div>
                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide border
                                        ${item.status === 'Aktif' ? 'bg-green-50 text-green-600 border-green-100 dark:bg-green-500/10 dark:text-green-300 dark:border-green-500/20' : 
                                          item.status === 'Beta' ? 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20' :
                                          'bg-gray-50 text-gray-500 border-gray-100 dark:bg-white/5 dark:text-gray-400 dark:border-white/10'}
                                    `}>
                                        {item.status}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:translate-x-1 transition-transform">{item.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                                    {item.desc}
                                </p>
                            </div>
                            
                            <button className="relative z-10 mt-8 w-full py-3 rounded-xl border border-gray-200 dark:border-white/10 text-sm font-bold text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-all flex items-center justify-center gap-2 group-hover:shadow-sm">
                                Entegrasyonu İncele <FiArrowRight />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>

        {/* --- GELİŞTİRİCİ / API BÖLÜMÜ --- */}
        <div className="relative rounded-[2.5rem] overflow-hidden p-[2px] bg-gradient-to-br from-purple-400/20 via-transparent to-blue-400/20 shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center bg-white dark:bg-[#080c14] p-10 md:p-16 rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05] animate-grid-move"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400/5 to-transparent h-[200%] w-full animate-scanline pointer-events-none"></div>
                <div className="absolute -top-[200px] -right-[200px] w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="relative z-10 flex-1 space-y-8 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-300 font-mono text-sm bg-purple-50 dark:bg-purple-500/10 px-4 py-1.5 rounded-full border border-purple-200 dark:border-purple-500/20">
                        <FiCode /> developers.traxleapp.com
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
                        Kendi Entegrasyonunuzu <br/> <span className="text-purple-500 dark:text-purple-300">Kodlayın.</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-lg mx-auto lg:mx-0 font-medium">
                        Traxle API, geliştiriciler için tasarlandı. RESTful mimarisi, kapsamlı dokümantasyonu ve Webhook desteği ile sisteminizi saniyeler içinde bağlayın.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start">
                        <button className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:opacity-90 transition-colors flex items-center justify-center gap-2 shadow-lg hover:scale-105 transform duration-200">
                             API Dokümantasyonu <FiArrowRight />
                        </button>
                        <button className="px-8 py-4 bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                             Sandbox Hesabı Al
                        </button>
                    </div>
                </div>

                {/* --- İNTERAKTİF KOD BLOĞU --- */}
                <div className="relative z-10 flex-1 w-full max-w-xl mx-auto">
                    <InteractiveCodeBlock />
                </div>
            </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes grid-move { 0% { background-position: 0 0; } 100% { background-position: 40px 40px; } }
        .animate-grid-move { animation: grid-move 20s linear infinite; }
        @keyframes scanline { 0% { transform: translateY(-50%); } 100% { transform: translateY(0%); } }
        .animate-scanline { animation: scanline 8s linear infinite; }
      `}</style>

    </div>
  );
}