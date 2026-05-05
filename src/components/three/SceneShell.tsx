'use client';

import { Suspense, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { cn } from '@/lib/cn';
import { useWebGLSupport } from '@/hooks/useWebGLSupport';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import LoadingScene from '@/components/three/LoadingScene';
import WebGLFallback from '@/components/three/WebGLFallback';

function CameraDrift() {
  const reducedMotion = usePrefersReducedMotion();
  const { camera, pointer } = useThree();
  const target = new THREE.Vector3();
  const lookAt = new THREE.Vector3(0, 0, 0);

  useFrame(() => {
    if (reducedMotion) return;

    target.set(pointer.x * 0.12, 0.18 + pointer.y * 0.08, camera.position.z);
    camera.position.lerp(target, 0.018);
    camera.lookAt(lookAt);
  });

  return null;
}

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
        dpr={[0.9, 1.25]}
        frameloop="always"
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: cameraPosition, fov: 40, near: 0.1, far: 80 }}
        performance={{ min: 0.45 }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.06;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={['#020617', 7.5, 16]} />
          <CameraDrift />
          <ambientLight intensity={0.64} />
          <directionalLight position={[3.6, 5.4, 4.4]} intensity={2.2} color="#f2fbff" />
          <spotLight position={[-2.6, 3.8, 2.8]} angle={0.48} penumbra={0.72} intensity={2.6} color="#dff8ff" distance={10} />
          <pointLight position={[-3.5, -1.8, 3]} intensity={2.2} color="#00c2ff" distance={9} />
          <pointLight position={[2.2, 1.4, -3]} intensity={0.95} color="#ffffff" distance={7} />
          {children}
          <Environment preset="city" />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
