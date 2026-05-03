export default function LoadingScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="rounded-full border border-cyan-300/20 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-cyan-700 shadow-[0_0_30px_rgba(0,194,255,0.15)] backdrop-blur-xl dark:bg-black/50 dark:text-cyan-100">
        Loading universe
      </div>
    </div>
  );
}
