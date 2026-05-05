'use client';

import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function InteractiveBackground() {
  const reducedMotion = usePrefersReducedMotion();
  const frameRef = useRef(0);
  const [position, setPosition] = useState({ x: 50, y: 32 });

  useEffect(() => {
    if (reducedMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (frameRef.current) return;

      frameRef.current = window.requestAnimationFrame(() => {
        setPosition({
          x: (event.clientX / window.innerWidth) * 100,
          y: (event.clientY / window.innerHeight) * 100,
        });
        frameRef.current = 0;
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, [reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(34,211,238,0.22), transparent 28%), radial-gradient(circle at 80% 18%, rgba(96,165,250,0.16), transparent 32%), radial-gradient(circle at 18% 78%, rgba(52,211,153,0.12), transparent 30%), radial-gradient(circle at 62% 82%, rgba(245,158,11,0.08), transparent 34%), var(--traxle-interactive-bg)`,
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px] opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_86%)]" />
      <div className="absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
      {!reducedMotion && (
        <>
          <span className="absolute left-[12%] top-[24%] h-1 w-1 animate-ping rounded-full bg-cyan-200" />
          <span className="absolute left-[78%] top-[18%] h-1 w-1 animate-pulse rounded-full bg-white/80" />
          <span className="absolute left-[64%] top-[68%] h-1 w-1 animate-ping rounded-full bg-blue-300" />
          <span className="absolute top-[34%] h-px w-56 animate-[slide-line_9s_linear_infinite] bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
          <span className="absolute top-[58%] h-px w-72 animate-[slide-line_12s_linear_infinite] bg-gradient-to-r from-transparent via-blue-300/60 to-transparent" />
        </>
      )}
    </div>
  );
}
