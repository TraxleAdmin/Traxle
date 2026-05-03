'use client';

import React, { createContext, MutableRefObject, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';

type TransitionManagerValue = {
  selectedProjectId: string | null;
  transitionProgressRef: MutableRefObject<number>;
  startProjectTransition: (projectId: string) => void;
};

const TransitionManagerContext = createContext<TransitionManagerValue | null>(null);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const transitionProgressRef = useRef(0);
  const activeTweenRef = useRef<gsap.core.Tween | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const startProjectTransition = useCallback((projectId: string) => {
    activeTweenRef.current?.kill();
    setSelectedProjectId(projectId);
    transitionProgressRef.current = 0;

    activeTweenRef.current = gsap.to(transitionProgressRef, {
      current: 1,
      duration: 1.15,
      ease: 'power3.inOut',
      onComplete: () => {
        router.push(`/project/${projectId}`);
      },
    });
  }, [router, transitionProgressRef]);

  useEffect(() => {
    activeTweenRef.current?.kill();
    activeTweenRef.current = null;
    transitionProgressRef.current = 0;
    setSelectedProjectId(null);
  }, [pathname]);

  useEffect(() => () => {
    activeTweenRef.current?.kill();
  }, []);

  const value = useMemo(
    () => ({ selectedProjectId, transitionProgressRef, startProjectTransition }),
    [selectedProjectId, startProjectTransition],
  );

  return (
    <TransitionManagerContext.Provider value={value}>
      {children}
    </TransitionManagerContext.Provider>
  );
}

export function useTransitionManager() {
  const value = useContext(TransitionManagerContext);

  if (!value) {
    throw new Error('useTransitionManager must be used inside TransitionProvider');
  }

  return value;
}
