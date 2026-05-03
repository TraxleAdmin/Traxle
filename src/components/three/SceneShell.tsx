'use client';

import { Suspense, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Preload } from '@react-three/drei';
import { cn } from '@/lib/cn';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useWebGLSupport } from '@/hooks/useWebGLSupport';
import LoadingScene from '@/components/three/LoadingScene';
import WebGLFallback from '@/components/three/WebGLFallback';

export default function SceneShell({
  children,
  className,
  interactive = false,
  cameraPosition = [0, 0.5, 5.6],
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  cameraPosition?: [number, number, number];
}) {
  const webglSupported = useWebGLSupport();
  const reducedMotion = usePrefersReducedMotion();

  if (webglSupported === false) {
    return (
      <div className={cn('absolute inset-0', className)} aria-hidden="true">
        <WebGLFallback />
      </div>
    );
  }

  if (webglSupported === null) {
    return (
      <div className={cn('absolute inset-0', className)} aria-hidden="true">
        <LoadingScene />
      </div>
    );
  }

  return (
    <div className={cn('absolute inset-0', interactive ? 'pointer-events-auto' : 'pointer-events-none', className)} aria-hidden="true">
      <Canvas
        dpr={[1, 1.6]}
        frameloop={reducedMotion ? 'demand' : 'always'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: cameraPosition, fov: 42, near: 0.1, far: 80 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.72} />
          <directionalLight position={[3.5, 4.5, 4]} intensity={1.8} color="#eafaff" />
          <pointLight position={[-3.5, -1.8, 3]} intensity={1.9} color="#00c2ff" distance={9} />
          <pointLight position={[2, 1.2, -3]} intensity={0.7} color="#ffffff" distance={7} />
          {children}
          <Environment preset="city" />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
