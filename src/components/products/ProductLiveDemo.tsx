'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Activity, Database, FileScan, MapPinned, PackageCheck, TimerReset } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import type { Project } from '@/lib/projects';

function DemoShell({
  product,
  children,
}: {
  product: Project;
  children: ReactNode;
}) {
  return (
    <div className="relative mx-auto min-h-[420px] w-full max-w-[560px] overflow-hidden rounded-[1.35rem] border border-white/14 bg-[#050914]/72 p-4 shadow-[0_34px_110px_rgba(0,0,0,0.48)] backdrop-blur-2xl sm:p-5">
      <div className="pointer-events-none absolute inset-0 opacity-80" style={{ background: `radial-gradient(circle at 74% 16%, ${product.accent}26, transparent 38%), linear-gradient(135deg, rgba(255,255,255,0.1), transparent 34%)` }} />
      <div className="pointer-events-none absolute -inset-x-24 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
      <div className="relative flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="min-w-0">
          <p className="truncate text-xs font-black uppercase tracking-[0.22em] text-cyan-100/70">{product.category}</p>
          <h3 className="mt-2 truncate text-2xl font-black text-white">{product.title}</h3>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/8" style={{ boxShadow: `0 0 28px ${product.accent}22` }}>
          <Activity size={18} color={product.accent} aria-hidden="true" />
        </span>
      </div>
      <div className="relative pt-5">{children}</div>
    </div>
  );
}

function BarkodXDemo({ product }: { product: Project }) {
  const reducedMotion = usePrefersReducedMotion();
  const bars = [42, 76, 54, 96, 68, 108, 48, 88, 62, 102, 52, 82];

  return (
    <DemoShell product={product}>
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-4">
        <div className="flex h-40 items-end justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4">
          {bars.map((height, index) => (
            <motion.span
              key={`${height}-${index}`}
              className="w-3 rounded-full bg-white/78"
              style={{ height, boxShadow: index % 3 === 0 ? `0 0 24px ${product.accent}` : undefined }}
              animate={reducedMotion ? undefined : { height: [height, height + 18, height] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.08, ease: 'easeInOut' }}
            />
          ))}
        </div>
        <motion.span
          className="absolute left-7 right-7 top-24 h-1 rounded-full"
          style={{ backgroundColor: product.accent, boxShadow: `0 0 34px ${product.accent}` }}
          animate={reducedMotion ? undefined : { y: [-58, 86, -58] }}
          transition={{ duration: 3.1, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {product.features.slice(0, 3).map((feature, index) => (
          <div key={feature} className="min-h-24 rounded-2xl border border-white/10 bg-white/[0.055] p-4">
            <PackageCheck size={18} color={index === 0 ? product.accent : '#dff8ff'} aria-hidden="true" />
            <p className="mt-3 text-sm font-black leading-5 text-white">{feature}</p>
          </div>
        ))}
      </div>
    </DemoShell>
  );
}

function MolatikDemo({ product }: { product: Project }) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <DemoShell product={product}>
      <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
        <div className="relative flex min-h-56 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.045]">
          <motion.div
            className="absolute h-40 w-40 rounded-full"
            style={{
              background: `conic-gradient(${product.accent} 0 72%, rgba(255,255,255,0.1) 72% 100%)`,
              boxShadow: `0 0 48px ${product.accent}24`,
            }}
            animate={reducedMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          />
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-[#050914]">
            <TimerReset size={28} color={product.accent} aria-hidden="true" />
          </div>
        </div>
        <div className="grid gap-3">
          {product.features.slice(0, 4).map((feature, index) => (
            <motion.div
              key={feature}
              className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] px-4"
              animate={reducedMotion ? undefined : { x: [0, index % 2 ? -4 : 4, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: index * 0.2, ease: 'easeInOut' }}
            >
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: index < 2 ? product.accent : '#dff8ff', boxShadow: `0 0 18px ${product.accent}` }} />
              <p className="text-sm font-black leading-5 text-white">{feature}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </DemoShell>
  );
}

function KunyexDemo({ product }: { product: Project }) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <DemoShell product={product}>
      <div className="relative grid gap-4 sm:grid-cols-[1fr_0.92fr]">
        <div className="relative min-h-72 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-5">
          <FileScan size={24} color={product.accent} aria-hidden="true" />
          <div className="mt-7 grid gap-3">
            {[88, 72, 96, 58, 80, 66].map((width, index) => (
              <motion.span
                key={`${width}-${index}`}
                className="h-3 rounded-full bg-white/18"
                style={{ width: `${width}%` }}
                animate={reducedMotion ? undefined : { opacity: [0.28, index === 2 ? 0.92 : 0.52, 0.28] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.14 }}
              />
            ))}
          </div>
          <motion.span
            className="absolute inset-x-5 top-28 h-12 rounded-full blur-2xl"
            style={{ backgroundColor: product.accent }}
            animate={reducedMotion ? undefined : { y: [-50, 135, -50], opacity: [0.12, 0.28, 0.12] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div className="grid content-center gap-3">
          {product.features.slice(0, 4).map((feature, index) => (
            <div key={feature} className="rounded-2xl border border-white/10 bg-black/24 p-4">
              <div className="mb-3 h-1.5 rounded-full" style={{ width: `${56 + index * 10}%`, backgroundColor: index === 1 ? product.accent : 'rgba(255,255,255,0.22)' }} />
              <p className="text-sm font-black leading-5 text-white">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </DemoShell>
  );
}

function LogisticsDemo({ product }: { product: Project }) {
  const reducedMotion = usePrefersReducedMotion();
  const nodes = [
    ['18%', '68%'],
    ['36%', '42%'],
    ['62%', '58%'],
    ['82%', '30%'],
  ];

  return (
    <DemoShell product={product}>
      <div className="relative min-h-72 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:34px_34px]" />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <motion.path
            d="M18 68 C34 34 50 74 62 58 S78 34 82 30"
            fill="none"
            stroke={product.accent}
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeDasharray="7 7"
            animate={reducedMotion ? undefined : { strokeDashoffset: [0, -42] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
        </svg>
        {nodes.map(([left, top], index) => (
          <span
            key={`${left}-${top}`}
            className="absolute h-4 w-4 rounded-full border border-white/70"
            style={{ left, top, backgroundColor: index === 3 ? product.accent : '#dff8ff', boxShadow: `0 0 28px ${product.accent}` }}
          />
        ))}
        <motion.span
          className="absolute flex h-10 w-10 items-center justify-center rounded-full border border-white/18 bg-[#050914]"
          style={{ boxShadow: `0 0 34px ${product.accent}30` }}
          animate={reducedMotion ? undefined : { left: ['18%', '36%', '62%', '82%', '18%'], top: ['68%', '42%', '58%', '30%', '68%'] }}
          transition={{ duration: 6.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <MapPinned size={17} color={product.accent} aria-hidden="true" />
        </motion.span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {product.features.slice(0, 2).map((feature, index) => (
          <div key={feature} className="flex min-h-20 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-4">
            <Database size={18} color={index === 0 ? product.accent : '#dff8ff'} aria-hidden="true" />
            <p className="text-sm font-black leading-5 text-white">{feature}</p>
          </div>
        ))}
      </div>
    </DemoShell>
  );
}

export default function ProductLiveDemo({ product }: { product: Project }) {
  if (product.visualKind === 'barcode') return <BarkodXDemo product={product} />;
  if (product.visualKind === 'timer') return <MolatikDemo product={product} />;
  if (product.visualKind === 'document') return <KunyexDemo product={product} />;
  return <LogisticsDemo product={product} />;
}
