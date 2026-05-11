// src/lib/iyzipay.ts
import Iyzipay from 'iyzipay';

const apiKey = process.env.IYZICO_API_KEY;
const secretKey = process.env.IYZICO_SECRET_KEY;
const uri = 'https://sandbox-api.iyzipay.com';

if (!apiKey || !secretKey) {
    // Sunucu tarafında log düşsün ama uygulamayı kırmasın
    console.error("⚠️ IYZICO API Anahtarları Eksik!");
}

const iyzipay = new Iyzipay({
    apiKey: apiKey || 'dummy', // Hata fırlatmaması için boşsa dummy değer
    secretKey: secretKey || 'dummy',
    uri: uri
});

export default iyzipay;