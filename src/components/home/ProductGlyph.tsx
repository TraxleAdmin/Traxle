'use client';

import { motion } from 'framer-motion';
import type { ProductVisualKind } from '@/lib/i18n';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

function BarcodeGlyph({ accent }: { accent: string }) {
  const bars = [28, 52, 36, 68, 44, 76, 32, 58, 42, 70, 30, 50];
  return (
    <div className="relative h-full min-h-40 overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-5">
      <motion.span
        className="pointer-events-none absolute -left-16 top-6 h-28 w-28 rounded-full blur-3xl"
        style={{ backgroundColor: `${accent}28` }}
        animate={{ x: [0, 210, 0], opacity: [0.18, 0.46, 0.18] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative flex h-24 items-end justify-center gap-1.5 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] px-4">
        {bars.map((height, index) => (
          <motion.span
            key={`${height}-${index}`}
            className="w-2 rounded-full bg-white/80"
            style={{ height, boxShadow: index % 3 === 0 ? `0 0 18px ${accent}` : undefined, transformOrigin: 'bottom' }}
            animate={{ scaleY: [0.72, 1.18, 0.86], opacity: [0.62, 1, 0.72] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.08, ease: 'easeInOut' }}
          />
        ))}
        <motion.span
          className="absolute inset-y-3 w-10 rounded-full blur-lg"
          style={{ backgroundColor: `${accent}45` }}
          animate={{ x: [-135, 135, -135] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <motion.span
        className="absolute left-4 right-4 top-16 h-1 rounded-full"
        style={{ backgroundColor: accent, boxShadow: `0 0 28px ${accent}` }}
        animate={{ y: [0, 68, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="mt-4 grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <span key={index} className="h-2 rounded-full bg-white/10" />
        ))}
      </div>
    </div>
  );
}

function TimerGlyph({ accent }: { accent: string }) {
  return (
    <div className="relative flex h-full min-h-40 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/40">
      <motion.div
        className="absolute h-36 w-36 rounded-full opacity-80 blur-[0.2px]"
        style={{ background: `conic-gradient(from 90deg, transparent 0 20%, ${accent} 21% 36%, transparent 37% 100%)` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute h-28 w-28 rounded-full border border-white/10"
        style={{ boxShadow: `inset 0 0 36px ${accent}33, 0 0 38px ${accent}22` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      >
        <span className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 rounded-full" style={{ backgroundColor: accent }} />
      </motion.div>
      <motion.div
        className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/[0.04]"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="h-10 w-10 rounded-full" style={{ background: `conic-gradient(${accent}, transparent 68%)`, boxShadow: `0 0 26px ${accent}28` }} />
      </motion.div>
      <motion.span
        className="absolute left-1/2 top-1/2 h-12 w-0.5 origin-bottom -translate-x-1/2 -translate-y-full rounded-full"
        style={{ backgroundColor: accent, boxShadow: `0 0 18px ${accent}` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute bottom-5 left-5 right-5 flex items-center gap-2">
        <span className="h-2 flex-1 rounded-full bg-white/10" />
        <motion.span
          className="h-2 w-12 rounded-full"
          style={{ backgroundColor: accent, boxShadow: `0 0 18px ${accent}` }}
          animate={{ x: [-10, 10, -10], opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}

function DocumentGlyph({ accent }: { accent: string }) {
  return (
    <div className="relative h-full min-h-40 overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-5">
      <motion.span
        className="pointer-events-none absolute inset-y-0 w-14 rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm"
        animate={{ x: [-90, 260, -90] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative mx-auto h-28 w-24 rounded-xl border border-white/15 bg-white/[0.05] p-3 shadow-2xl">
        {Array.from({ length: 5 }).map((_, index) => (
          <motion.span
            key={index}
            className="mb-2 block h-2 rounded-full bg-white/20"
            animate={{ width: ['72%', index % 2 === 0 ? '96%' : '54%', '72%'] }}
            transition={{ duration: 3.2, repeat: Infinity, delay: index * 0.18 }}
          />
        ))}
      </div>
      <motion.div
        className="absolute right-7 top-8 grid gap-2 rounded-xl border border-white/10 bg-black/60 p-3"
        animate={{ x: [10, -4, 10], y: [0, -4, 0], opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <span key={index} className="h-2 w-14 rounded-full" style={{ backgroundColor: index === 1 ? accent : 'rgba(255,255,255,0.18)' }} />
        ))}
      </motion.div>
    </div>
  );
}

function LogisticsGlyph({ accent }: { accent: string }) {
  const nodes = [
    ['18%', '68%'],
    ['38%', '42%'],
    ['62%', '58%'],
    ['82%', '30%'],
  ];

  return (
    <div className="relative h-full min-h-40 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M18 68 C34 36 48 70 62 58 S78 34 82 30"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <motion.path
          d="M18 68 C34 36 48 70 62 58 S78 34 82 30"
          fill="none"
          stroke={accent}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="8 8"
          animate={{ strokeDashoffset: [0, -32] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </svg>
      <motion.span
        className="absolute h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: accent, boxShadow: `0 0 24px ${accent}` }}
        animate={{ left: ['18%', '38%', '62%', '82%', '18%'], top: ['68%', '42%', '58%', '30%', '68%'] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      {nodes.map(([left, top], index) => (
        <motion.span
          key={`${left}-${top}`}
          className="absolute h-3 w-3 rounded-full border border-white/60"
          style={{ left, top, backgroundColor: index === 3 ? accent : 'rgba(255,255,255,0.8)', boxShadow: `0 0 24px ${accent}` }}
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.24 }}
        />
      ))}
    </div>
  );
}

function StaticProductGlyph({ kind, accent }: { kind: ProductVisualKind; accent: string }) {
  return (
    <div className="relative h-full min-h-40 overflow-hidden rounded-2xl border border-white/10 bg-black/[0.45] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      <div className="absolute inset-0 opacity-70" style={{ background: `radial-gradient(circle at 50% 20%, ${accent}24, transparent 54%)` }} />
      {kind === 'barcode' && (
        <div className="relative flex h-24 items-end justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-4">
          {[28, 52, 36, 68, 44, 76, 32, 58, 42, 70].map((height, index) => (
            <span key={`${height}-${index}`} className="w-2 rounded-full bg-white/80" style={{ height, boxShadow: index % 3 === 0 ? `0 0 18px ${accent}` : undefined }} />
          ))}
          <span className="absolute left-4 right-4 top-1/2 h-1 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 28px ${accent}` }} />
        </div>
      )}
      {kind === 'timer' && (
        <div className="relative flex h-28 items-center justify-center">
          <div className="h-24 w-24 rounded-full border border-white/15" style={{ background: `conic-gradient(${accent} 0 68%, rgba(255,255,255,0.08) 68% 100%)`, boxShadow: `0 0 34px ${accent}22` }} />
          <div className="absolute h-14 w-14 rounded-full border border-white/15 bg-black/70" />
        </div>
      )}
      {kind === 'document' && (
        <div className="relative mx-auto h-28 w-24 rounded-xl border border-white/15 bg-white/[0.06] p-3">
          {[72, 92, 54, 82, 66].map((width, index) => (
            <span key={index} className="mb-2 block h-2 rounded-full bg-white/25" style={{ width: `${width}%` }} />
          ))}
          <div className="absolute -right-8 top-6 grid gap-2 rounded-xl border border-white/10 bg-black/70 p-3">
            {[44, 56, 36].map((width, index) => (
              <span key={index} className="h-2 rounded-full" style={{ width, backgroundColor: index === 1 ? accent : 'rgba(255,255,255,0.2)' }} />
            ))}
          </div>
        </div>
      )}
      {kind === 'logistics' && (
        <div className="relative h-28 rounded-xl border border-white/10 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px]">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M18 68 C34 36 48 70 62 58 S78 34 82 30" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" />
          </svg>
          {['18%:68%', '38%:42%', '62%:58%', '82%:30%'].map((point, index) => {
            const [left, top] = point.split(':');
            return <span key={point} className="absolute h-3 w-3 rounded-full border border-white/60" style={{ left, top, backgroundColor: index === 3 ? accent : 'rgba(255,255,255,0.8)', boxShadow: `0 0 22px ${accent}` }} />;
          })}
        </div>
      )}
    </div>
  );
}

export default function ProductGlyph({ kind, accent, forceMotion = false }: { kind: ProductVisualKind; accent: string; forceMotion?: boolean }) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion && !forceMotion) {
    return <StaticProductGlyph kind={kind} accent={accent} />;
  }

  if (kind === 'barcode') return <BarcodeGlyph accent={accent} />;
  if (kind === 'timer') return <TimerGlyph accent={accent} />;
  if (kind === 'document') return <DocumentGlyph accent={accent} />;
  return <LogisticsGlyph accent={accent} />;
}
