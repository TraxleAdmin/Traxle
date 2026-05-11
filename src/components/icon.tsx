import { ImageResponse } from 'next/og';

// İkon Boyut Ayarları
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// İkonu Oluşturan Kod
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: 'linear-gradient(135deg, #0057FF 0%, #00C2FF 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '8px',
          fontWeight: 800,
          fontFamily: 'sans-serif',
        }}
      >
        T
      </div>
    ),
    {
      ...size,
    }
  );
}