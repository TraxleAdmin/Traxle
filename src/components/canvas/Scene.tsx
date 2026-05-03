'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Preload, Stars } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import DigitalCore from '@/components/canvas/DigitalCore';
import DeviceEcosystem from '@/components/canvas/DeviceEcosystem';
import type { PortfolioProject } from '@/types/portfolio';

type SceneProps = {
  projects: PortfolioProject[];
  loading: boolean;
  error: string | null;
};

function CameraRig({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const { camera, viewport } = useThree();

  useFrame(() => {
    const progress = progressRef.current;
    const compact = viewport.width < 7;
    const radius = compact ? 6.2 : 7.4;
    const angle = progress * Math.PI * 1.08 - 0.45;

    camera.position.x = Math.sin(angle) * radius;
    camera.position.y = THREE.MathUtils.lerp(1.1, compact ? 0.65 : 1.55, progress);
    camera.position.z = THREE.MathUtils.lerp(7.2, 2.4, progress) + Math.cos(angle) * 1.2;
    camera.lookAt(0, 0, compact ? -0.7 : -1.1);
  });

  return null;
}

export default function Scene({ projects, loading, error }: SceneProps) {
  const progressRef = useRef(0);
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tween = gsap.to(progressRef, {
      current: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '#ecosystem-scroll',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-0 bg-black">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 1.1, 7.2], fov: 42, near: 0.1, far: 100 }}
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 6, 18]} />
        <ambientLight intensity={0.42} />
        <directionalLight position={[3, 5, 4]} intensity={1.5} color="#dff8ff" />
        <pointLight position={[-4, -2, 5]} intensity={1.8} color="#00c2ff" distance={12} />
        <Stars radius={20} depth={9} count={1200} factor={2.6} saturation={0} fade speed={0.35} />
        <DigitalCore progressRef={progressRef} />
        <DeviceEcosystem projects={projects} progressRef={progressRef} />
        <CameraRig progressRef={progressRef} />
        <Environment preset="night" />
        <Preload all />
      </Canvas>

      {(loading || error) && (
        <div className="absolute inset-x-0 top-28 flex justify-center px-4">
          <div className="rounded-full border border-cyan-300/15 bg-black/60 px-5 py-2 text-xs font-black uppercase tracking-[0.26em] text-cyan-100/80 shadow-[0_0_28px_rgba(0,194,255,0.18)] backdrop-blur-xl">
            {error ? 'Firebase stream unavailable' : 'Initiating Core...'}
          </div>
        </div>
      )}
    </div>,
    document.body,
  );
}
