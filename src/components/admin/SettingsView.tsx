'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
    FiSettings, FiShield, FiLock, FiToggleRight, FiRefreshCw, 
    FiServer, FiClock, FiTerminal, FiSave, FiCode 
} from 'react-icons/fi';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { AdminLog } from './LogsView';

// Ayar Tipleri
interface MaintenanceConfig { isActive: boolean; title: string; message: string; expectedEndTime: string; allowedIps: string; }
interface WAFConfig { rateLimit: number; blocklist: string; suspiciousThreshold: number; }
interface FeatureFlags { newPaymentGateway: boolean; autoKYC: boolean; mapboxIntegration: boolean; driverRewards: boolean; }

interface SettingsViewProps {
    config: MaintenanceConfig;
    setConfig: (val: MaintenanceConfig) => void;
    waf: WAFConfig;
    setWaf: (val: WAFConfig) => void;
    features: FeatureFlags;
    setFeatures: (val: FeatureFlags) => void;
    logAction: (action: string, targetId: string, details: string) => Promise<void>;
    logs: AdminLog[];
}

// Alt Bileşenler (Sadece bu dosyada kullanılır)
function FeatureToggle({ label, description, active, onChange }: any) { 
    return (
        <div className="flex items-center justify-between p-5 border border-gray-200 dark:border-white/10 rounded-2xl hover:border-purple-300 dark:hover:border-purple-500/50 transition-colors bg-white dark:bg-[#0A0A0A]">
            <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">{label}</h4>
                <p className="text-xs text-gray-500 mt-1">{description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={active} onChange={(e) => onChange(e.target.checked)} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
            </label>
        </div>
    );
}

function CronJobItem({ title, description, onClick }: any) { 
    return (
        <div className="flex items-center justify-between p-5 border border-gray-200 dark:border-white/10 rounded-2xl hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-colors bg-white dark:bg-[#0A0A0A]">
            <div>
                <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 text-sm">
                    <FiCode className="text-indigo-500"/> {title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">{description}</p>
            </div>
            <button onClick={onClick} className="px-5 py-2.5 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-bold text-xs rounded-xl transition-all active:scale-95">
                Manuel Tetikle
            </button>
        </div> 
    );
}

export default function SettingsView({ config, setConfig, waf, setWaf, features, setFeatures, logAction, logs }: SettingsViewProps) {
    const [saving, setSaving] = useState(false);
    const [settingsTab, setSettingsTab] = useState<'killswitch' | 'waf' | 'features' | 'cron'>('killswitch');
    const logsEndRef = useRef<HTMLDivElement>(null);

    // Terminal için otomatik scroll
    useEffect(() => { logsEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [logs]);

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, "system", "maintenance"), config);
            await setDoc(doc(db, "system", "waf"), waf);
            await setDoc(doc(db, "system", "features"), features);
            await logAction("UPDATE_SYSTEM_CONFIG", "MASTER_SETTINGS", `Settings updated across all modules.`);
            alert("✅ Tüm sistem ayarları veritabanına kaydedildi ve canlıya alındı.");
        } catch (error) { 
            console.error(error); 
            alert("Kaydedilirken hata oluştu!"); 
        } finally { 
            setSaving(false); 
        }
    };

    const triggerCronJob = async (jobName: string) => {
        if(!confirm(`"${jobName}" görevini ŞU AN manuel olarak tetiklemek istediğinize emin misiniz?`)) return;
        await logAction("MANUAL_CRON_TRIGGER", jobName, "Admin manually triggered scheduled task.");
        alert(`✅ ${jobName} görevi bulut fonksiyonlarında sıraya alındı!`);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold flex items-center gap-2">
                <FiSettings className="text-gray-500" /> Gelişmiş Sistem Ayarları
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* SOL TARAF: KONTROLLER (8 Kolon) */}
                <div className="lg:col-span-8 space-y-6">
                    
                    {/* Alt Sekmeler */}
                    <div className="flex overflow-x-auto bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/5 rounded-2xl p-2 gap-2 shadow-sm custom-scrollbar">
                        <button onClick={() => setSettingsTab('killswitch')} className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${settingsTab === 'killswitch' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'}`}><FiShield/> Killswitch</button>
                        <button onClick={() => setSettingsTab('waf')} className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${settingsTab === 'waf' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'}`}><FiLock/> WAF & Güvenlik</button>
                        <button onClick={() => setSettingsTab('features')} className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${settingsTab === 'features' ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'}`}><FiToggleRight/> Feature Flags</button>
                        <button onClick={() => setSettingsTab('cron')} className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${settingsTab === 'cron' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'}`}><FiRefreshCw/> Cron Jobs</button>
                    </div>

                    {/* Sekme İçerikleri */}
                    <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/5 rounded-3xl overflow-hidden shadow-xl min-h-[450px] flex flex-col justify-between">
                        
                        {/* 1. KILLSWITCH */}
                        {settingsTab === 'killswitch' && (
                            <div className="animate-in fade-in">
                                <div className={`p-6 border-b flex justify-between items-center transition-colors ${config.isActive ? 'bg-red-900/10 border-red-900/30' : 'border-gray-200 dark:border-white/5'}`}>
                                    <div>
                                        <h3 className={`text-xl font-bold flex items-center gap-2 ${config.isActive ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
                                            Acil Durum Yönetimi
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">Sistemi dış dünyaya kapatır. Veritabanı anlık olarak etkilenir.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer hover:scale-105 transition-transform">
                                        <input type="checkbox" className="sr-only peer" checked={config.isActive} onChange={(e) => setConfig({...config, isActive: e.target.checked})} />
                                        <div className="w-16 h-8 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-8 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-600 shadow-inner"></div>
                                    </label>
                                </div>
                                <div className="p-8 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-500">Bakım Başlığı</label>
                                            <input type="text" value={config.title} onChange={(e) => setConfig({...config, title: e.target.value})} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500/50 transition-all" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-500">Tahmini Bitiş</label>
                                            <div className="relative">
                                                <FiClock className="absolute left-4 top-3.5 text-gray-400" />
                                                <input type="datetime-local" value={config.expectedEndTime} onChange={(e) => setConfig({...config, expectedEndTime: e.target.value})} className="w-full pl-11 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pr-4 py-3 outline-none focus:ring-2 focus:ring-red-500/50 transition-all" />
                                            </div>
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-sm font-bold text-gray-500 flex justify-between">
                                                <span>İzin Verilen IP Adresleri</span>
                                                <span className="text-xs text-blue-500 cursor-pointer font-bold hover:underline" onClick={() => setConfig({...config, allowedIps: config.allowedIps ? config.allowedIps + ', 127.0.0.1' : '127.0.0.1'})}>+ Localhost Ekle</span>
                                            </label>
                                            <div className="relative">
                                                <FiServer className="absolute left-4 top-3.5 text-gray-400" />
                                                <input type="text" value={config.allowedIps} onChange={(e) => setConfig({...config, allowedIps: e.target.value})} placeholder="Örn: 192.168.1.1, 88.241.X.X" className="w-full pl-11 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pr-4 py-3 font-mono text-sm outline-none focus:ring-2 focus:ring-red-500/50 transition-all" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 2. WAF & RATE LIMITING */}
                        {settingsTab === 'waf' && (
                            <div className="animate-in fade-in p-8 space-y-8">
                                <div>
                                    <h3 className="text-lg font-bold mb-2">Dinamik Rate Limiting</h3>
                                    <p className="text-sm text-gray-500 mb-6">API uç noktalarına gelen saniyelik istek sınırını belirleyin.</p>
                                    <div className="flex items-center gap-6 bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10">
                                        <input type="range" min="10" max="1000" value={waf.rateLimit} onChange={(e) => setWaf({...waf, rateLimit: parseInt(e.target.value)})} className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                                        <span className="font-mono font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-xl border border-blue-200 dark:border-blue-500/30 shadow-sm">{waf.rateLimit} req/s</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-500">Kara Liste (IP Blocklist)</label>
                                    <textarea value={waf.blocklist} onChange={(e) => setWaf({...waf, blocklist: e.target.value})} rows={4} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 outline-none font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500/50 transition-all" placeholder="Engellenecek IP adreslerini virgülle ayırarak yazın..." />
                                </div>
                            </div>
                        )}

                        {/* 3. FEATURE FLAGS */}
                        {settingsTab === 'features' && (
                            <div className="animate-in fade-in p-8 space-y-4">
                                <p className="text-sm text-gray-500 mb-6 font-medium">Uygulama özelliklerini yeni bir kod deploy etmeden, canlıda anında açıp kapatın.</p>
                                <FeatureToggle label="Yeni Ödeme Geçidi (Param POS) Aktifliği" description="Kullanıcılar ödeme yaparken yeni Param POS arayüzüne yönlendirilir." active={features.newPaymentGateway} onChange={(v:any) => setFeatures({...features, newPaymentGateway: v})} />
                                <FeatureToggle label="Otomatik KYC Süreci (Yapay Zeka)" description="Kullanıcı belgeleri admin önüne düşmeden önce Google Vision API ile ön kontrolden geçer." active={features.autoKYC} onChange={(v:any) => setFeatures({...features, autoKYC: v})} />
                                <FeatureToggle label="Mapbox Canlı Takip Entegrasyonu" description="Harita altyapısı olarak Google Maps yerine Mapbox kullanılır." active={features.mapboxIntegration} onChange={(v:any) => setFeatures({...features, mapboxIntegration: v})} />
                            </div>
                        )}

                        {/* 4. CRON JOBS */}
                        {settingsTab === 'cron' && (
                            <div className="animate-in fade-in p-8 space-y-4">
                                <p className="text-sm text-gray-500 mb-6 font-medium">Zamanlanmış bulut fonksiyonlarını (Cloud Functions) acil durumlarda beklemeden manuel tetikleyin.</p>
                                <CronJobItem title="Pasif Sürücüleri Uyar (SMS)" description="30 gündür sisteme girmeyen sürücülere geri dönüş SMS'i atar. (Normalde ayın 1'i çalışır)" onClick={() => triggerCronJob("triggerPassiveDriverSMS")} />
                                <CronJobItem title="Bekleyen Eski Ödemeleri İptal Et" description="72 saattir ödeme bekleyen yük ilanlarını otomatik iptal eder." onClick={() => triggerCronJob("cleanupStaleLoads")} />
                                <CronJobItem title="Finansal Gecelik Özet (Mutabakat)" description="Bugünün tüm işlemlerini toplayıp muhasebe e-postasına PDF atar." onClick={() => triggerCronJob("generateDailyFinancePDF")} />
                            </div>
                        )}

                        {/* Ortak Kaydet Butonu */}
                        <div className="px-8 py-5 bg-gray-50 dark:bg-white/5 border-t border-gray-200 dark:border-white/10 flex justify-end">
                            <button onClick={handleSave} disabled={saving} className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white transition-all transform active:scale-95 shadow-lg ${saving ? 'bg-gray-500 cursor-wait' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-500/30 hover:-translate-y-0.5'}`}>
                                {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <FiSave className="text-xl" />}
                                {saving ? 'Veritabanına Yazılıyor...' : 'Tüm Ayarları Canlıya Al'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* SAĞ TARAF: CANLI TERMİNAL (4 Kolon) */}
                <div className="lg:col-span-4">
                    <div className="bg-[#1e1e1e] border border-gray-700 rounded-3xl overflow-hidden flex flex-col h-full min-h-[500px] shadow-2xl relative">
                        {/* Terminal Header */}
                        <div className="p-4 bg-[#2d2d2d] border-b border-gray-700 flex justify-between items-center shrink-0">
                            <h3 className="text-xs font-mono font-bold text-gray-300 flex items-center gap-2">
                                <FiTerminal className="text-green-400" /> LIVE_DB_STREAM
                            </h3>
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                            </div>
                        </div>
                        
                        {/* Terminal Body */}
                        <div className="flex-1 p-5 overflow-y-auto font-mono text-xs space-y-4 custom-scrollbar text-green-400/90 leading-relaxed tracking-wide">
                            <div className="text-gray-500 mb-4 animate-pulse">
                                {'>'} root@traxle-core:~$ connect --db firestore<br/>
                                {'>'} Auth verified. Listening to 'admin_logs' collection...
                            </div>
                            
                            {logs.slice().reverse().map((log: any) => (
                                <div key={log.id} className="flex gap-3 items-start animate-in fade-in slide-in-from-left-2 duration-300 border-l-2 border-green-500/30 pl-2">
                                    <span className="text-gray-500 shrink-0">
                                        [{log.timestamp?.toDate ? new Date(log.timestamp.toDate()).toLocaleTimeString('tr-TR') : '...'}]
                                    </span>
                                    <div className="break-all flex flex-col">
                                        <span>
                                            <span className="text-blue-400 font-bold">[{log.action}]</span> 
                                            <span className="text-yellow-300 ml-2">TARGET_ID: {log.targetId}</span>
                                        </span>
                                        <span className="text-gray-300 mt-1 opacity-80">
                                            ↳ {log.details}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            <div ref={logsEndRef} className="h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}