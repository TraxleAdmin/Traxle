'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPrinter, FiDownload, FiFileText } from 'react-icons/fi';

interface FreightContractProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    contractId: string;
    date: string;
    shipperName: string;
    driverName: string;
    driverPlate: string;
    origin: string;
    destination: string;
    goodsDescription: string; // Yük cinsi
    price: number;
  };
}

export default function FreightContractModal({ isOpen, onClose, data }: FreightContractProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
        onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} 
        className="relative bg-white text-black w-full max-w-4xl h-[85vh] rounded-xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50 shrink-0 print:hidden">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xl">
                 <FiFileText />
              </div>
              <div>
                 <h2 className="text-xl font-bold text-gray-900">Dijital Navlun Sözleşmesi</h2>
                 <p className="text-xs text-gray-500">Ref No: {data.contractId}</p>
              </div>
           </div>
           <div className="flex gap-2">
              <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors">
                 <FiPrinter /> Yazdır
              </button>
              <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                 <FiX size={24} />
              </button>
           </div>
        </div>

        {/* SÖZLEŞME METNİ (A4 Formatı) */}
        <div className="flex-1 overflow-y-auto p-12 bg-white font-serif leading-relaxed print:p-0 print:overflow-visible">
            
            <div className="text-center mb-8 border-b-2 border-black pb-4">
                <h1 className="text-2xl font-bold uppercase mb-2">Taşıma İşleri (Navlun) Sözleşmesi</h1>
                <p className="text-sm">Traxle Lojistik Platformu Üzerinden Düzenlenmiştir</p>
            </div>

            <div className="space-y-6 text-sm">
                <p><strong>Tarih:</strong> {data.date}</p>

                {/* 1. TARAFLAR */}
                <section>
                    <h3 className="font-bold uppercase border-b border-gray-300 mb-2">1. Taraflar</h3>
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <p className="font-bold">GÖNDEREN (Yük Veren):</p>
                            <p>{data.shipperName}</p>
                            <p className="text-xs mt-1 text-gray-500">Platform ID: SH-{data.contractId.substring(0,4)}</p>
                        </div>
                        <div>
                            <p className="font-bold">TAŞIYICI:</p>
                            <p>{data.driverName}</p>
                            <p>Araç Plaka: <strong>{data.driverPlate}</strong></p>
                        </div>
                    </div>
                </section>

                {/* 2. TAŞIMA BİLGİLERİ */}
                <section>
                    <h3 className="font-bold uppercase border-b border-gray-300 mb-2">2. Taşıma Bilgileri</h3>
                    <table className="w-full border-collapse border border-gray-300">
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 p-2 font-bold bg-gray-50 w-1/4">Yükleme Yeri</td>
                                <td className="border border-gray-300 p-2">{data.origin}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2 font-bold bg-gray-50">Varış Yeri</td>
                                <td className="border border-gray-300 p-2">{data.destination}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2 font-bold bg-gray-50">Yük Cinsi</td>
                                <td className="border border-gray-300 p-2">{data.goodsDescription}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2 font-bold bg-gray-50">Navlun Bedeli</td>
                                <td className="border border-gray-300 p-2 font-bold">₺{data.price.toLocaleString()} + KDV</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                {/* 3. ŞARTLAR */}
                <section>
                    <h3 className="font-bold uppercase border-b border-gray-300 mb-2">3. Genel Şartlar</h3>
                    <ol className="list-decimal pl-5 space-y-1 text-xs text-justify">
                        <li>İşbu sözleşme, Türk Ticaret Kanunu (TTK) hükümleri çerçevesinde düzenlenmiştir.</li>
                        <li>Taşıyıcı, yükü hasarsız ve eksiksiz olarak varış noktasına teslim etmekle yükümlüdür.</li>
                        <li>Platform (Traxle), taraflar arasındaki taşıma ilişkisinin tarafı olmayıp, sadece aracılık hizmeti sunmaktadır.</li>
                        <li>Ödeme, teslimatın gerçekleşmesi ve "Teslimat Kanıtı"nın (POD) sisteme yüklenmesini müteakip 24 saat içinde serbest bırakılır.</li>
                        <li>Taraflar, işbu dijital sözleşmenin 6100 sayılı HMK uyarınca kesin delil teşkil ettiğini kabul eder.</li>
                    </ol>
                </section>

                {/* İMZALAR */}
                <div className="grid grid-cols-2 gap-20 mt-16">
                    <div className="text-center">
                        <p className="font-bold mb-8">GÖNDEREN</p>
                        <div className="border border-dashed border-gray-400 p-4 rounded bg-gray-50 text-xs text-gray-500">
                            Bu belge Traxle sistemi üzerinden <br/> {data.date} tarihinde <br/> dijital olarak onaylanmıştır.
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="font-bold mb-8">TAŞIYICI</p>
                        <div className="border border-dashed border-gray-400 p-4 rounded bg-gray-50 text-xs text-gray-500">
                            Bu belge Traxle sistemi üzerinden <br/> {data.date} tarihinde <br/> dijital olarak onaylanmıştır.
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </motion.div>
    </div>
  );
}