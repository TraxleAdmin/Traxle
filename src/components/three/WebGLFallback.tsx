export default function WebGLFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[inherit] bg-[radial-gradient(circle_at_50%_35%,rgba(0,194,255,0.20),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.72),rgba(226,232,240,0.50))] dark:bg-[radial-gradient(circle_at_50%_35%,rgba(0,194,255,0.24),transparent_34%),linear-gradient(135deg,rgba(0,0,0,0.94),rgba(2,6,23,0.88))]">
      <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-cyan-300/30 bg-white/35 shadow-[0_0_50px_rgba(0,194,255,0.18)] backdrop-blur-2xl dark:bg-white/10" />
      <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/30 blur-xl" />
    </div>
  );
}
