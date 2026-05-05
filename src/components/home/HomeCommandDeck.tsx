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
import ProductGlyph from '@/components/home/ProductGlyph';
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

export default function HomeCommandDeck({ products }: { products: Project[] }) {
  const reducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = products[activeIndex] ?? products[0];
  const ActiveIcon = activeProduct ? visualIcons[activeProduct.visualKind] : Activity;

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

            <div className="relative mt-5 grid gap-4 sm:grid-cols-[1fr_0.82fr]">
              <div className="min-w-0">
                <ProductGlyph kind={activeProduct.visualKind} accent={activeProduct.accent} />
              </div>
              <div className="grid content-between gap-3">
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

                <div className="rounded-2xl border border-white/10 bg-black/[0.18] p-4">
                  <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
                    Process map
                  </p>
                  <div className="mt-4 grid gap-2">
                    {activeProduct.features.slice(0, 3).map((feature, index) => (
                      <div key={feature} className="flex items-center gap-2 text-xs font-bold leading-5 text-white/[0.72]">
                        <span className="h-1.5 w-7 rounded-full" style={{ backgroundColor: index === 1 ? activeProduct.accent : 'rgba(255,255,255,0.22)' }} />
                        <span className="truncate">{feature}</span>
                      </div>
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
                <button
                  key={product.slug}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={cn(
                    'premium-deck-tab group relative min-h-[106px] overflow-hidden rounded-[1.15rem] border p-4 text-left transition duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300',
                    active
                      ? 'border-slate-900/[0.12] bg-slate-950 text-white shadow-[0_22px_70px_rgba(15,23,42,0.22)] dark:border-white/[0.14] dark:bg-white/[0.09]'
                      : 'border-slate-200/80 bg-white/80 text-slate-800 hover:bg-white dark:border-white/10 dark:bg-white/[0.045] dark:text-slate-200 dark:hover:bg-white/[0.07]',
                  )}
                  style={{ '--deck-accent': product.accent } as CSSProperties}
                  aria-pressed={active}
                >
                  <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(circle at 82% 22%, ${product.accent}24, transparent 42%)` }} />
                  <div className="relative flex items-start justify-between gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-current/[0.1] bg-current/[0.05]">
                      <Icon size={17} color={active ? product.accent : undefined} aria-hidden="true" />
                    </span>
                    <ChevronRight size={16} className="mt-2 transition group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                  <div className="relative mt-3">
                    <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] opacity-[0.55]">
                      {String(index + 1).padStart(2, '0')} / {product.category}
                    </p>
                    <h3 className="mt-1 text-lg font-black">{product.title}</h3>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
