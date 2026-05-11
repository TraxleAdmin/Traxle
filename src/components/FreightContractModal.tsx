'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiX, FiPrinter, FiFileText } from 'react-icons/fi';

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
        goodsDescription: string;
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
                <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50 shrink-0 print:hidden">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xl">
                            <FiFileText />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">İş Makinesi Kiralama Sözleşmesi</h2>
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

                <div className="flex-1 overflow-y-auto p-12 bg-white font-serif leading-relaxed print:p-0 print:overflow-visible">

                    <div className="text-center mb-8 border-b-2 border-black pb-4">
                        <h1 className="text-2xl font-bold uppercase mb-2">İş Makinesi Kiralama Sözleşmesi</h1>
                        <p className="text-sm">Traxle Platformu Üzerinden Dijital Olarak Düzenlenmiştir</p>
                    </div>

                    <div className="space-y-6 text-sm">
                        <p><strong>Tarih:</strong> {data.date}</p>

                        <section>
                            <h3 className="font-bold uppercase border-b border-gray-300 mb-2">1. Taraflar</h3>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <p className="font-bold">KİRALAYAN (Müşteri/Şantiye):</p>
                                    <p>{data.shipperName}</p>
                                    <p className="text-xs mt-1 text-gray-500">Platform ID: CUS-{data.contractId.substring(0, 4)}</p>
                                </div>
                                <div>
                                    <p className="font-bold">KİRAYA VEREN (Tedarikçi):</p>
                                    <p>{data.driverName}</p>
                                    <p>Makine Plaka/Seri No: <strong>{data.driverPlate}</strong></p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3 className="font-bold uppercase border-b border-gray-300 mb-2">2. Kiralama Bilgileri</h3>
                            <table className="w-full border-collapse border border-gray-300">
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 p-2 font-bold bg-gray-50 w-1/4">Teslim Edilecek Şantiye</td>
                                        <td className="border border-gray-300 p-2">{data.origin}</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 p-2 font-bold bg-gray-50">İade Edilecek Konum</td>
                                        <td className="border border-gray-300 p-2">{data.destination}</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 p-2 font-bold bg-gray-50">Makine Tipi & Tonaj</td>
                                        <td className="border border-gray-300 p-2">{data.goodsDescription}</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 p-2 font-bold bg-gray-50">Kira Bedeli</td>
                                        <td className="border border-gray-300 p-2 font-bold">₺{data.price.toLocaleString()} + KDV</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>

                        <section>
                            <h3 className="font-bold uppercase border-b border-gray-300 mb-2">3. Genel Şartlar</h3>
                            <ol className="list-decimal pl-5 space-y-1 text-xs text-justify">
                                <li>İşbu sözleşme, Türk Borçlar Kanunu'nun kira sözleşmelerine ilişkin hükümleri çerçevesinde düzenlenmiştir.</li>
                                <li>Kiraya Veren, makineyi çalışır ve eksiksiz durumda belirtilen şantiyeye teslim etmekle yükümlüdür.</li>
                                <li>Platform (Traxle), taraflar arasındaki kiralama ilişkisinin tarafı olmayıp, sadece aracılık hizmeti sunmaktadır.</li>
                                <li>Ödeme, teslimatın gerçekleşmesi ve "Teslimat Kanıtı"nın sisteme yüklenmesini müteakip güvenli havuzdan serbest bırakılır.</li>
                                <li>Taraflar, işbu dijital sözleşmenin 6100 sayılı HMK uyarınca kesin delil teşkil ettiğini kabul eder.</li>
                            </ol>
                        </section>

                        <div className="grid grid-cols-2 gap-20 mt-16">
                            <div className="text-center">
                                <p className="font-bold mb-8">KİRALAYAN</p>
                                <div className="border border-dashed border-gray-400 p-4 rounded bg-gray-50 text-xs text-gray-500">
                                    Bu belge Traxle sistemi üzerinden <br /> {data.date} tarihinde <br /> dijital olarak onaylanmıştır.
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="font-bold mb-8">KİRAYA VEREN</p>
                                <div className="border border-dashed border-gray-400 p-4 rounded bg-gray-50 text-xs text-gray-500">
                                    Bu belge Traxle sistemi üzerinden <br /> {data.date} tarihinde <br /> dijital olarak onaylanmıştır.
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </motion.div>
        </div>
    );
}