export default function BrandLogos() {
  return (
    <section className="py-10 border-y border-white/5 bg-traxle-dark/50 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        
        <p className="text-center text-sm text-gray-500 mb-8 font-medium">
          DÜNYA DEVİ 500+ LOJİSTİK FİRMASI TARAFINDAN GÜVENİLİYOR
        </p>

        {/* Logo Grid */}
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          
          {/* Logo 1: Swift Cargo */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <svg className="w-8 h-8 text-white group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2-1-7.97 4.28L2 11l10 5 10-5-2.03-1.28L12 11zm0 5l2-1-7.97 4.28L2 16l10 5 10-5-2.03-1.28L12 16z"/></svg>
            <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">SWIFT</span>
          </div>

          {/* Logo 2: Vertex Line */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <svg className="w-8 h-8 text-white group-hover:text-emerald-400 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 5l6 12H6l6-12z"/></svg>
            <span className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">VERTEX</span>
          </div>

          {/* Logo 3: Echo Logistics */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <svg className="w-8 h-8 text-white group-hover:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" className="text-traxle-dark" fill="black"/></svg>
            <span className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">ECHO</span>
          </div>

          {/* Logo 4: North Sea */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <svg className="w-8 h-8 text-white group-hover:text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"/></svg>
            <span className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">NORTH</span>
          </div>

          {/* Logo 5: Quantum */}
          <div className="flex items-center gap-2 group cursor-pointer">
             <svg className="w-8 h-8 text-white group-hover:text-orange-400 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            <span className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">QUANTUM</span>
          </div>

        </div>
      </div>
    </section>
  );
}