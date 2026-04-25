'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiMapPin, FiSend, FiCheckCircle, FiAlertCircle, FiUser, FiMessageSquare, FiArrowRight } from 'react-icons/fi';
import UnifiedCard from '@/components/ui/UnifiedCard';
import TextShimmer from '@/components/ui/TextShimmer';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Genel Bilgi', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/send-email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      if (response.ok) {
        setStatus('success'); setFormData({ name: '', email: '', subject: 'Genel Bilgi', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else { setStatus('error'); }
    } catch (error) { setStatus('error'); }
  };

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-[#050814] text-gray-900 dark:text-white pt-24 pb-20 overflow-hidden transition-colors duration-300 selection:bg-blue-500/30">
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600/10 dark:bg-blue-900/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 dark:bg-cyan-900/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wider uppercase mb-6 backdrop-blur-md border border-blue-200 dark:border-blue-500/30">
            7/24 Destek Hattı
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-gray-900 dark:text-white">Bir Sorunuz mu <TextShimmer>Var?</TextShimmer></h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">Saha ve kiralama operasyonlarınız, iş ortaklığı fırsatları veya teknik destek için ekibimizle iletişime geçin.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-4">
            <UnifiedCard title="E-Posta" description="Genel sorular ve iş birlikleri için." icon={<FiMail />} color="from-blue-400 to-indigo-300">
              <div className="mt-3 pt-3 border-t border-gray-200/50 dark:border-white/5">
                <a href="mailto:contact@traxleapp.com" className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-2 group text-sm md:text-base">contact@traxleapp.com <FiArrowRight className="group-hover:translate-x-1 transition-transform" /></a>
              </div>
            </UnifiedCard>
            <UnifiedCard title="Genel Merkez" description="Yönetim ve Operasyon ofisimiz." icon={<FiMapPin />} color="from-cyan-400 to-teal-300" delay={0.1}>
              <div className="mt-3 pt-3 border-t border-gray-200/50 dark:border-white/5">
                <span className="font-medium block text-gray-900 dark:text-white text-sm md:text-base">Yeniköy Mah. 58 Sokak No:24 D:4</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">Antalya, Türkiye</span>
              </div>
            </UnifiedCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-3">
            <div className="group relative bg-white dark:bg-[#0F1629] border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-colors duration-500"></div>
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputGroup label="Ad Soyad" name="name" type="text" placeholder="Adınız Soyadınız" value={formData.name} onChange={handleChange} icon={<FiUser />} />
                  <InputGroup label="E-Posta" name="email" type="email" placeholder="ornek@sirket.com" value={formData.email} onChange={handleChange} icon={<FiMail />} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Konu</label>
                  <select name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium">
                    <option className="bg-white dark:bg-[#0F1629]">Genel Bilgi</option>
                    <option className="bg-white dark:bg-[#0F1629]">Tedarikçi Başvurusu</option>
                    <option className="bg-white dark:bg-[#0F1629]">Şantiye / Müşteri İşbirliği</option>
                    <option className="bg-white dark:bg-[#0F1629]">Teknik Destek</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Mesajınız</label>
                  <div className="relative group">
                    <textarea name="message" rows={4} placeholder="Size nasıl yardımcı olabiliriz?" value={formData.message} onChange={handleChange} required className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 pl-11 outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none font-medium"></textarea>
                    <FiMessageSquare className="absolute left-4 top-4 text-gray-400 group-focus-within:text-blue-500" />
                  </div>
                </div>
                <button type="submit" disabled={status === 'loading'} className="w-full py-3.5 rounded-xl font-bold text-white shadow-lg bg-gradient-to-r from-blue-600 to-cyan-500 flex justify-center items-center gap-2 active:scale-95 disabled:opacity-70">
                  {status === 'loading' ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <>Mesajı Gönder <FiSend /></>}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function InputGroup({ label, name, type, placeholder, value, onChange, icon }: any) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">{label}</label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">{icon}</div>
        <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} required className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3.5 pl-11 outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
      </div>
    </div>
  );
}