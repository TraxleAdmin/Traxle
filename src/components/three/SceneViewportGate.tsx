'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type SceneViewportGateProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  rootMargin?: string;
};

export default function SceneViewportGate({
  children,
  className,
  delay = 350,
  rootMargin = '520px',
}: SceneViewportGateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || ready) return;

    let timeout = 0;
    let idle = 0;
    const start = () => {
      timeout = window.setTimeout(() => {
        if ('requestIdleCallback' in window) {
          idle = window.requestIdleCallback(() => setReady(true), { timeout: 1200 });
          return;
        }
        setReady(true);
      }, delay);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        start();
      },
      { rootMargin },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
      if (idle) window.cancelIdleCallback(idle);
    };
  }, [delay, ready, rootMargin]);

  return (
    <div ref={ref} className={cn('pointer-events-none absolute inset-0', className)} aria-hidden="true">
      {ready ? children : null}
    </div>
  );
}
