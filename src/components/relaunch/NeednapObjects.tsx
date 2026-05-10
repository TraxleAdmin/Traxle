import { cn } from '@/lib/cn';

export default function NeednapObjects({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <span className="neednap-object neednap-sphere left-[20%] top-[28%] h-20 w-20 bg-[radial-gradient(circle_at_34%_28%,#ffffff,#2437ff_18%,#070069_70%)]" />
      <span className="neednap-object neednap-coil left-[23%] top-[40%] h-36 w-28">
        {Array.from({ length: 5 }).map((_, index) => (
          <i key={index} className="absolute left-0 h-8 w-28 rounded-[999px] border-[10px] border-[#1f2cff]" style={{ top: index * 20, transform: `rotate(${index % 2 ? -9 : 9}deg)` }} />
        ))}
      </span>
      <span className="neednap-object neednap-capsule left-[38%] top-[17%] h-48 w-16 rotate-[-28deg] rounded-[999px] bg-[linear-gradient(105deg,#0a0907_0%,#2d2a20_45%,#f8f5db_52%,#050505_100%)] shadow-[0_0_32px_rgba(255,255,255,0.28)]" />
      <span className="neednap-object neednap-cube left-[54%] top-[33%] h-24 w-24 rotate-[-21deg] bg-[#f000c8] shadow-[0_0_42px_rgba(240,0,200,0.5)]" />
      <span className="neednap-object neednap-glass right-[19%] top-[27%] h-24 w-64 rotate-[-10deg] rounded-[1.6rem] bg-[linear-gradient(135deg,#021a08,#00bf24_52%,#05340b)] opacity-90 shadow-[inset_0_8px_22px_rgba(255,255,255,0.16),0_0_42px_rgba(0,255,72,0.22)]" />
      <span className="neednap-object neednap-stack right-[15%] top-[45%] h-24 w-28 rounded-l-[999px] rounded-r-2xl bg-[repeating-radial-gradient(ellipse_at_left,#ffd900_0_7px,#d5a800_8px_11px)] shadow-[0_0_28px_rgba(255,217,0,0.32)]" />
      <span className="neednap-object neednap-ring right-[23%] top-[64%] h-24 w-24 rounded-full bg-[#00c9b6] shadow-[0_0_28px_rgba(0,201,182,0.35)] before:absolute before:inset-7 before:rounded-full before:bg-black before:content-['']" />
      <span className="neednap-object neednap-brick left-[8%] top-[62%] h-28 w-80 rotate-[10deg] rounded-xl bg-[linear-gradient(135deg,#622916,#ff4d24_45%,#b83420)] shadow-[inset_0_0_18px_rgba(255,255,255,0.22),0_24px_50px_rgba(0,0,0,0.5)]" />
      <span className="neednap-object neednap-blade left-[48%] top-[61%] h-80 w-20 rotate-[28deg] rounded-[999px] bg-[linear-gradient(90deg,#020202,#111_38%,#e8e8e8_43%,#020202_48%,#050505)] shadow-[0_0_36px_rgba(255,255,255,0.18)]" />
    </div>
  );
}
