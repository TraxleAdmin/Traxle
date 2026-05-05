'use client';

import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  ChevronRight,
  Cpu,
  Database,
  FileScan,
  Layers3,
  RadioTower,
  Route,
  ScanLine,
  Sparkles,
  TimerReset,
} from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/cn';
import type { ProductVisualKind } from '@/lib/i18n';
import type { Project } from '@/lib/projects';

const visualIcons: Record<ProductVisualKind, typeof ScanLine> = {
  barcode: ScanLine,
  timer: TimerReset,
  document: FileScan,
  logistics: Route,
};

const codeRows = ['api.ingest()', 'cache.sync()', 'event.stream()', 'device.ready()'];
const moduleBarcodeBars = [24, 54, 38, 68, 46, 78, 34, 62, 42, 72, 30, 58];
const miniBarcodeBars = [16, 26, 20, 32, 24, 34, 18, 28];
const processMapLabels: Record<ProductVisualKind, string[]> = {
  barcode: ['Urun', 'Fiyat', 'Stok'],
  timer: ['Mola', 'Vardiya', 'Durum'],
  document: ['PDF', 'Veri', 'Cikti'],
  logistics: ['Rota', 'Saha', 'Teslimat'],
};
const deckLogisticsPath = 'M10 72 C22 52 31 42 38 42 S52 58 62 58 S78 30 90 30';
const deckLogisticsPoints = [
  { x: 10, y: 72 },
  { x: 38, y: 42 },
  { x: 62, y: 58 },
  { x: 90, y: 30 },
];

type DeckVisualProps = {
  kind: ProductVisualKind;
  accent: string;
  reducedMotion: boolean;
  className?: string;
};

function DeckModuleVisual({ kind, accent, reducedMotion }: DeckVisualProps) {
  return (
    <div className="relative h-[150px] overflow-hidden rounded-[1.15rem] border border-white/10 bg-black/[0.34] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:h-[162px]">
      <div className="pointer-events-none absolute inset-0 opacity-90" style={{ background: `radial-gradient(circle at 50% 0%, ${accent}26, transparent 52%)` }} />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:24px_24px] opacity-60" />

      {kind === 'barcode' && (
        <div className="relative flex h-full flex-col justify-between">
          <div className="relative flex h-24 items-end justify-center gap-1.5 overflow-hidden rounded-xl border border-white/10 bg-white/[0.045] px-4 pb-4">
            {moduleBarcodeBars.map((height, index) => (
              <motion.span
                key={`${height}-${index}`}
                className="w-2 rounded-full bg-white/80"
                style={{ height, boxShadow: index % 3 === 0 ? `0 0 18px ${accent}` : undefined }}
                animate={reducedMotion ? undefined : { scaleY: [0.82, 1.08, 0.9] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.08, ease: 'easeInOut' }}
              />
            ))}
            <motion.span
              className="absolute left-5 right-5 top-1/2 h-0.5 rounded-full"
              style={{ backgroundColor: accent, boxShadow: `0 0 28px ${accent}` }}
              animate={reducedMotion ? undefined : { y: [-26, 28, -26] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <span key={index} className="h-1.5 rounded-full bg-white/10" />
            ))}
          </div>
        </div>
      )}

      {kind === 'timer' && (
        <div className="relative flex h-full items-center justify-center">
          <motion.div
            className="absolute h-28 w-28 rounded-full border border-white/10"
            style={{ background: `conic-gradient(${accent} 0 68%, rgba(255,255,255,0.08) 68% 100%)`, boxShadow: `0 0 42px ${accent}22` }}
            animate={reducedMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/[0.15] bg-black/[0.55]">
            <span className="absolute h-10 w-10 rounded-full border border-white/10" />
            <motion.span
              className="absolute left-1/2 top-1/2 h-0 w-0"
              animate={reducedMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            >
              <span
                className="absolute bottom-0 left-[-1px] h-9 w-0.5 rounded-full"
                style={{ backgroundColor: accent, boxShadow: `0 0 18px ${accent}` }}
              />
              <span className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
            </motion.span>
            <span className="relative h-3.5 w-3.5 rounded-full" style={{ background: `radial-gradient(circle, ${accent} 0 36%, transparent 42%)` }} />
          </div>
        </div>
      )}

      {kind === 'document' && (
        <div className="relative mx-auto flex h-full max-w-[220px] items-center justify-center">
          <div className="relative h-28 w-24 rounded-xl border border-white/[0.15] bg-white/[0.06] p-3 shadow-2xl">
            {Array.from({ length: 5 }).map((_, index) => (
              <motion.span
                key={index}
                className="mb-2 block h-2 rounded-full bg-white/[0.22]"
                animate={reducedMotion ? undefined : { width: ['64%', index % 2 === 0 ? '92%' : '50%', '64%'] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.16, ease: 'easeInOut' }}
              />
            ))}
          </div>
          <motion.div
            className="absolute right-6 top-9 grid gap-2 rounded-xl border border-white/10 bg-black/[0.65] p-3 shadow-2xl"
            animate={reducedMotion ? undefined : { x: [8, -2, 8], opacity: [0.72, 1, 0.72] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {[46, 58, 38].map((width, index) => (
              <span key={width} className="h-2 rounded-full" style={{ width, backgroundColor: index === 1 ? accent : 'rgba(255,255,255,0.2)' }} />
            ))}
          </motion.div>
        </div>
      )}

      {kind === 'logistics' && (
        <div className="relative h-full">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d={deckLogisticsPath} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="7" strokeLinecap="round" />
            <motion.path
              d={deckLogisticsPath}
              fill="none"
              stroke={accent}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="9 8"
              animate={reducedMotion ? undefined : { strokeDashoffset: [0, -34] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'linear' }}
            />
            {deckLogisticsPoints.map((point, index) => (
              <motion.circle
                key={`${point.x}-${point.y}`}
                cx={point.x}
                cy={point.y}
                r={index === 3 ? 3.3 : 3.6}
                fill={index === 3 ? accent : 'rgba(255,255,255,0.86)'}
                stroke="rgba(255,255,255,0.68)"
                strokeWidth="0.7"
                style={{ filter: `drop-shadow(0 0 6px ${accent})` }}
                animate={reducedMotion ? undefined : { r: [index === 3 ? 3.3 : 3.6, index === 3 ? 4.3 : 4.5, index === 3 ? 3.3 : 3.6] }}
                transition={{ duration: 2.3, repeat: Infinity, delay: index * 0.18, ease: 'easeInOut' }}
              />
            ))}
            <motion.circle
              cx={deckLogisticsPoints[0].x}
              cy={deckLogisticsPoints[0].y}
              r="2.7"
              fill={accent}
              style={{ filter: `drop-shadow(0 0 8px ${accent})` }}
              animate={
                reducedMotion
                  ? undefined
                  : {
                      cx: deckLogisticsPoints.map((point) => point.x).concat(deckLogisticsPoints[0].x),
                      cy: deckLogisticsPoints.map((point) => point.y).concat(deckLogisticsPoints[0].y),
                    }
              }
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        </div>
      )}
    </div>
  );
}

function DeckTabVisual({ kind, accent, reducedMotion, className }: DeckVisualProps) {
  return (
    <div className={cn('relative mt-3 h-12 overflow-hidden rounded-xl border border-current/[0.08] bg-slate-950/[0.07] dark:bg-black/[0.22]', className)}>
      <div className="absolute inset-0 opacity-80" style={{ background: `radial-gradient(circle at 78% 20%, ${accent}28, transparent 56%)` }} />

      {kind === 'barcode' && (
        <div className="relative flex h-full items-end justify-center gap-1 px-4 pb-2">
          {miniBarcodeBars.map((height, index) => (
            <motion.span
              key={`${height}-${index}`}
              className="w-1.5 rounded-full bg-current/[0.45]"
              style={{ height }}
              animate={reducedMotion ? undefined : { scaleY: [0.76, 1.1, 0.82] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.07, ease: 'easeInOut' }}
            />
          ))}
          <motion.span
            className="absolute left-4 right-4 top-5 h-0.5 rounded-full"
            style={{ backgroundColor: accent, boxShadow: `0 0 18px ${accent}` }}
            animate={reducedMotion ? undefined : { x: ['-12%', '12%', '-12%'] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      )}

      {kind === 'timer' && (
        <div className="relative flex h-full items-center justify-center">
          <motion.span
            className="h-8 w-8 rounded-full border border-current/[0.15]"
            style={{ background: `conic-gradient(${accent} 0 70%, rgba(255,255,255,0.08) 70% 100%)` }}
            animate={reducedMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          <span className="absolute h-4 w-4 rounded-full bg-black/[0.45]" />
        </div>
      )}

      {kind === 'document' && (
        <div className="relative flex h-full items-center justify-center gap-1.5">
          {[22, 32, 26, 36].map((width, index) => (
            <motion.span
              key={width}
              className="h-2 rounded-full bg-current/[0.35]"
              style={{ width }}
              animate={reducedMotion ? undefined : { opacity: [0.35, 0.86, 0.35] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.16, ease: 'easeInOut' }}
            />
          ))}
          <span className="h-2 w-8 rounded-full" style={{ backgroundColor: accent }} />
        </div>
      )}

      {kind === 'logistics' && (
        <svg className="relative h-full w-full" viewBox="0 0 100 36" preserveAspectRatio="none" aria-hidden="true">
          <motion.path
            d="M10 25 C28 8 43 28 58 20 S78 7 90 13"
            fill="none"
            stroke={accent}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="8 8"
            animate={reducedMotion ? undefined : { strokeDashoffset: [0, -30] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
          />
          {[10, 58, 90].map((cx, index) => (
            <circle key={cx} cx={cx} cy={index === 0 ? 25 : index === 1 ? 20 : 13} r="3.2" fill={index === 2 ? accent : 'currentColor'} opacity="0.72" />
          ))}
        </svg>
      )}
    </div>
  );
}

export default function HomeCommandDeck({ products }: { products: Project[] }) {
  const reducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = products[activeIndex] ?? products[0];
  const ActiveIcon = activeProduct ? visualIcons[activeProduct.visualKind] : Activity;
  const processSteps = activeProduct ? processMapLabels[activeProduct.visualKind] : [];

  const metrics = useMemo(() => {
    if (!activeProduct) return [];

    return [
      { label: 'SYNC', value: '98%', icon: RadioTower },
      { label: 'DATA', value: `${activeProduct.features.length * 12}K`, icon: Database },
      { label: 'FLOW', value: 'LIVE', icon: Layers3 },
    ];
  }, [activeProduct]);

  useEffect(() => {
    if (reducedMotion || products.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveIndex((value) => (value + 1) % products.length);
    }, 3600);

    return () => window.clearInterval(interval);
  }, [products.length, reducedMotion]);

  if (!activeProduct) return null;

  return (
    <div
      className="relative mx-auto min-h-[560px] w-full max-w-[700px] lg:min-h-[650px]"
      style={{ '--deck-accent': activeProduct.accent } as CSSProperties}
    >
      <div className="premium-orbit-field absolute inset-0" />
      <motion.div
        className="premium-command-shell relative overflow-hidden rounded-[1.8rem] border border-slate-200/70 bg-white/[0.78] p-4 shadow-[0_34px_120px_rgba(15,23,42,0.18)] backdrop-blur-2xl dark:border-white/10 dark:bg-[rgba(6,10,20,0.78)] dark:shadow-[0_34px_120px_rgba(0,0,0,0.46)] sm:p-5"
        animate={reducedMotion ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-95">
          <div className="premium-console-mesh absolute inset-0" />
          <div className="absolute -left-20 top-12 h-56 w-56 rounded-full blur-3xl" style={{ backgroundColor: `${activeProduct.accent}24` }} />
          <div className="absolute -right-24 bottom-4 h-72 w-72 rounded-full bg-emerald-300/[0.12] blur-3xl" />
        </div>

        <div className="relative flex items-center justify-between gap-4 border-b border-slate-900/10 pb-4 dark:border-white/10">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-900/10 bg-slate-950 text-white shadow-[0_0_34px_rgba(34,211,238,0.22)] dark:border-white/[0.12] dark:bg-white/[0.08]">
              <Cpu size={18} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-mono text-[10px] font-black uppercase tracking-[0.24em] text-slate-500 dark:text-cyan-100/60">
                TRAXLE CONTROL OS
              </p>
              <h2 className="mt-1 truncate text-xl font-black text-slate-950 dark:text-white sm:text-2xl">
                {activeProduct.title}
              </h2>
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-300/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-200 sm:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]" />
            Online
          </div>
        </div>

        <div className="relative mt-4 grid gap-4 lg:grid-cols-[1.05fr_0.74fr]">
          <div className="relative min-h-[380px] overflow-hidden rounded-[1.35rem] border border-slate-900/10 bg-slate-950 p-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] dark:border-white/10 sm:p-5">
            <div className="premium-data-grid absolute inset-0 opacity-70" />
            <div className="absolute inset-x-6 top-8 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="relative flex items-center justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/[0.58]">
                  Active module
                </p>
                <p className="mt-2 max-w-[18rem] text-sm font-bold leading-6 text-white/[0.74]">
                  {activeProduct.shortDescription}
                </p>
              </div>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/[0.12] bg-white/[0.08]" style={{ boxShadow: `0 0 32px ${activeProduct.accent}28` }}>
                <ActiveIcon size={19} color={activeProduct.accent} aria-hidden="true" />
              </span>
            </div>

            <div className="relative mt-5 grid gap-3">
              <DeckModuleVisual kind={activeProduct.visualKind} accent={activeProduct.accent} reducedMotion={reducedMotion} />

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
                      Pipeline
                    </p>
                    <Sparkles size={15} color={activeProduct.accent} aria-hidden="true" />
                  </div>
                  <div className="grid gap-2">
                    {codeRows.map((row, index) => (
                      <motion.div
                        key={row}
                        className="flex items-center gap-2 rounded-xl bg-black/[0.22] px-3 py-2 font-mono text-[10px] font-bold text-white/[0.66]"
                        animate={reducedMotion ? undefined : { x: [0, index % 2 === 0 ? 4 : -4, 0] }}
                        transition={{ duration: 3.2, repeat: Infinity, delay: index * 0.16, ease: 'easeInOut' }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: index === 0 ? activeProduct.accent : 'rgba(255,255,255,0.34)' }} />
                        {row}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div data-process-map className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-black/[0.18] p-4">
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
                    Process map
                  </p>
                  <div className="mt-4 grid min-w-0 gap-2">
                    {processSteps.map((step, index) => (
                      <motion.div
                        key={step}
                        data-process-step
                        className="flex h-8 min-w-0 items-center gap-2 overflow-hidden rounded-xl bg-white/[0.035] px-2 text-[10px] font-black uppercase tracking-[0.04em] text-white/[0.72]"
                        animate={reducedMotion ? undefined : { x: [0, index === 1 ? 3 : -2, 0] }}
                        transition={{ duration: 3.4, repeat: Infinity, delay: index * 0.18, ease: 'easeInOut' }}
                      >
                        <span
                          className="h-1.5 w-5 shrink-0 rounded-full"
                          style={{ backgroundColor: index === 1 ? activeProduct.accent : 'rgba(255,255,255,0.22)' }}
                        />
                        <span className="min-w-0 truncate">{step}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-4 grid gap-3 sm:grid-cols-3">
              {metrics.map(({ label, value, icon: Icon }, index) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.055] p-3">
                  <Icon size={15} color={index === 0 ? activeProduct.accent : '#e2f7ff'} aria-hidden="true" />
                  <p className="mt-3 font-mono text-[10px] font-black uppercase tracking-[0.16em] text-white/[0.45]">
                    {label}
                  </p>
                  <p className="mt-1 text-lg font-black text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            {products.map((product, index) => {
              const Icon = visualIcons[product.visualKind];
              const active = index === activeIndex;

              return (
                <motion.button
                  key={product.slug}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  whileHover={reducedMotion ? undefined : { y: -4, scale: 1.012 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className={cn(
                    'premium-deck-tab group relative min-h-[112px] overflow-hidden rounded-[1.15rem] border p-3 text-left transition duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300',
                    active
                      ? 'border-slate-900/[0.12] bg-slate-950 text-white shadow-[0_22px_70px_rgba(15,23,42,0.22)] dark:border-white/[0.14] dark:bg-white/[0.09]'
                      : 'border-slate-200/80 bg-white/80 text-slate-800 hover:bg-white dark:border-white/10 dark:bg-white/[0.045] dark:text-slate-200 dark:hover:bg-white/[0.07]',
                  )}
                  style={{ '--deck-accent': product.accent } as CSSProperties}
                  aria-pressed={active}
                >
                  <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(circle at 82% 22%, ${product.accent}24, transparent 42%)` }} />
                  <div className="relative flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-current/[0.1] bg-current/[0.05]">
                      <Icon size={17} color={active ? product.accent : undefined} aria-hidden="true" />
                    </span>
                    <DeckTabVisual kind={product.visualKind} accent={product.accent} reducedMotion={reducedMotion} className="mt-0 h-10 flex-1" />
                    <ChevronRight size={16} className="shrink-0 transition group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                  <div className="relative mt-2">
                    <p className="truncate font-mono text-[9px] font-black uppercase leading-4 tracking-[0.14em] opacity-[0.55]">
                      {String(index + 1).padStart(2, '0')} / {product.category}
                    </p>
                    <h3 className="mt-0.5 text-base font-black">{product.title}</h3>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
