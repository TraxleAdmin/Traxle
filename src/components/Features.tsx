export default function Features() {
  const features = [
    {
      title: "Yapay Zeka Destekli Rota",
      desc: "Trafiği, hava durumunu ve kargo önceliklerini analiz ederek en hızlı rotayı saniyeler içinde çizer.",
      icon: "⚡",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Canlı Filo Takibi",
      desc: "Tüm araçlarınızı harita üzerinde kuş bakışı izleyin. Hız ihlalleri ve duraklamalardan anında haberdar olun.",
      icon: "🗺️",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Kağıtsız Teslimat",
      desc: "QR kod ve dijital imza ile evrak işlerini sıfıra indirin. Teslimat kanıtları anında buluta yüklenir.",
      icon: "📱",
      color: "from-emerald-500 to-green-500",
    },
    {
      title: "Akıllı Raporlama",
      desc: "Hangi sürücü ne kadar yakıt harcadı? Hangi rota daha karlı? Detaylı analizlerle verimliliği artırın.",
      icon: "📊",
      color: "from-orange-500 to-yellow-500",
    },
  ];

  return (
    <section className="py-24 bg-traxle-dark relative overflow-hidden">
      
      {/* Üst Çizgi Efekti */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6">
        
        {/* Başlık Bölümü */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Lojistiği <span className="text-traxle-cyan">Yeniden Tanımlayın</span>
          </h2>
          <p className="text-traxle-text text-lg">
            Eski usul Excel dosyalarını ve telefon trafiğini unutun. Traxle, operasyonunuzu otopilota alır.
          </p>
        </div>

        {/* Bento Grid Yapısı (Kutular) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-3xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Hover Efekti (Sağ üstten gelen ışık) */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                {/* İkon Kutusu */}
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-3xl mb-6 shadow-inner border border-white/5">
                  {feature.icon}
                </div>
                
                {/* Başlık */}
                <h3 className="text-2xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                
                {/* Açıklama */}
                <p className="text-traxle-text leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}