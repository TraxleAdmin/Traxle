'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMail, 
  FiMapPin, 
  FiSend, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiUser, 
  FiMessageSquare,
  FiArrowRight 
} from 'react-icons/fi';
import UnifiedCard from '@/components/ui/UnifiedCard';
import TextShimmer from '@/components/ui/TextShimmer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Genel Bilgi',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: 'Genel Bilgi', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Hata:", error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-[#050814] text-gray-900 dark:text-white pt-24 pb-20 overflow-hidden transition-colors duration-300 selection:bg-blue-500/30">
      
      {/* --- ARKA PLAN EFEKTLERİ --- */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600/10 dark:bg-blue-900/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 dark:bg-cyan-900/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        
        {/* --- BAŞLIK (Daha kompakt margin) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wider uppercase mb-6 backdrop-blur-md border border-blue-200 dark:border-blue-500/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            7/24 Destek Hattı
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-gray-900 dark:text-white">
            Bir Sorunuz mu <TextShimmer>Var?</TextShimmer>
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Lojistik operasyonlarınız, iş ortaklığı fırsatları veya teknik destek için ekibimizle iletişime geçin.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          
          {/* --- SOL TARAF: İLETİŞİM KARTLARI (KÜÇÜLTÜLDÜ) --- */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Kart 1: Email (Daha Kompakt) */}
            <UnifiedCard
                title="E-Posta"
                description="Genel sorular ve iş birlikleri için."
                icon={<FiMail />}
                color="from-blue-400 to-indigo-300"
            >
                {/* mt-6 ve pt-6 yerine mt-3 ve pt-3 kullanıldı */}
                <div className="mt-3 pt-3 border-t border-gray-200/50 dark:border-white/5">
                    <a href="mailto:contact@traxleapp.com" className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-2 group text-sm md:text-base">
                        contact@traxleapp.com <FiArrowRight className="group-hover:translate-x-1 transition-transform"/>
                    </a>
                </div>
            </UnifiedCard>

            {/* Kart 2: Adres (Daha Kompakt) */}
            <UnifiedCard
                title="Genel Merkez"
                description="Yönetim ve Operasyon ofisimiz."
                icon={<FiMapPin />}
                color="from-cyan-400 to-teal-300"
                delay={0.1}
            >
                {/* mt-6 ve pt-6 yerine mt-3 ve pt-3 kullanıldı */}
                <div className="mt-3 pt-3 border-t border-gray-200/50 dark:border-white/5">
                    <span className="font-medium block text-gray-900 dark:text-white leading-relaxed text-sm md:text-base">
                        Yeniköy Mah. 58 Sokak No:24 D:4
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Antalya, Türkiye</span>
                </div>
            </UnifiedCard>

          </motion.div>

          {/* --- SAĞ TARAF: FORM --- */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="group relative bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-gray-200/50 dark:shadow-none overflow-hidden hover:border-blue-500/20 transition-colors duration-500">
               
               {/* Form Dekoratif Arka Plan Glow */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-colors duration-500"></div>

               <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputGroup 
                        label="Ad Soyad" 
                        name="name" 
                        type="text" 
                        placeholder="Adınız Soyadınız" 
                        value={formData.name} 
                        onChange={handleChange} 
                        icon={<FiUser />}
                    />
                    <InputGroup 
                        label="E-Posta" 
                        name="email" 
                        type="email" 
                        placeholder="ornek@sirket.com" 
                        value={formData.email} 
                        onChange={handleChange} 
                        icon={<FiMail />}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Konu</label>
                    <div className="relative group">
                        <select 
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none cursor-pointer font-medium hover:bg-white dark:hover:bg-white/10"
                        >
                            <option className="bg-white dark:bg-[#0F1629]">Genel Bilgi</option>
                            <option className="bg-white dark:bg-[#0F1629]">Sürücü Başvurusu</option>
                            <option className="bg-white dark:bg-[#0F1629]">Yük Veren İşbirliği</option>
                            <option className="bg-white dark:bg-[#0F1629]">Teknik Destek</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">▼</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Mesajınız</label>
                    <div className="relative group">
                        <textarea 
                            name="message" 
                            rows={4} 
                            placeholder="Size nasıl yardımcı olabiliriz?" 
                            value={formData.message} 
                            onChange={handleChange} 
                            required
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 pl-11 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none placeholder:text-gray-400 font-medium hover:bg-white dark:hover:bg-white/10"
                        ></textarea>
                        <div className="absolute left-4 top-4 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                            <FiMessageSquare />
                        </div>
                    </div>
                  </div>

                  {/* DURUM MESAJLARI */}
                  <AnimatePresence mode='wait'>
                    {status === 'success' && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="p-3 bg-green-100 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400 rounded-xl flex items-center gap-3 font-medium text-sm"
                        >
                            <FiCheckCircle size={18} />
                            <p>Mesajınız iletildi.</p>
                        </motion.div>
                    )}
                    {status === 'error' && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="p-3 bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 rounded-xl flex items-center gap-3 font-medium text-sm"
                        >
                            <FiAlertCircle size={18} />
                            <p>Bir hata oluştu.</p>
                        </motion.div>
                    )}
                  </AnimatePresence>

                  <button 
                    type="submit" 
                    disabled={status === 'loading' || status === 'success'}
                    className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed
                        ${status === 'loading' ? 'bg-gray-400 cursor-wait' : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-blue-500/30'}
                    `}
                  >
                    {status === 'loading' ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        <>Mesajı Gönder <FiSend /></>
                    )}
                  </button>

               </form>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

// --- YARDIMCI BİLEŞENLER ---

function InputGroup({ label, name, type, placeholder, value, onChange, icon }: any) {
    return (
        <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{label}</label>
            <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    {icon}
                </div>
                <input 
                    type={type} 
                    name={name} 
                    placeholder={placeholder} 
                    value={value} 
                    onChange={onChange} 
                    required
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 pl-11 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-gray-400 font-medium hover:bg-white dark:hover:bg-white/10"
                />
            </div>
        </div>
    );
}