'use client';

import React, { ComponentType, lazy, Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Preload, Stars } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import DigitalCore from '@/components/canvas/DigitalCore';
import DeviceEcosystem, { getGoldenSpiralPosition } from '@/components/canvas/DeviceEcosystem';
import { useProjectData } from '@/hooks/useProjectData';
import { useTransitionManager } from '@/components/animations/TransitionManager';
import type { PortfolioProject, PortfolioSceneType } from '@/types/portfolio';

const sceneComponents: Record<PortfolioSceneType, React.LazyExoticComponent<ComponentType>> = {
  timer: lazy(() => import('@/components/canvas/scenes/TimerScene')),
  network: lazy(() => import('@/components/canvas/scenes/NetworkScene')),
  scanner: lazy(() => import('@/components/canvas/scenes/ScannerScene')),
  idCard: lazy(() => import('@/components/canvas/scenes/IdentityScene')),
};

function getProjectIdFromPath(pathname: string) {
  const match = pathname.match(/^\/project\/([^/?#]+)/);
  return match ? decodeURIComponent(match[1]) : undefined;
}

function EcosystemCameraRig({
  projects,
  progressRef,
  selectedProjectId,
  transitionProgressRef,
}: {
  projects: PortfolioProject[];
  progressRef: React.MutableRefObject<number>;
  selectedProjectId: string | null;
  transitionProgressRef: React.MutableRefObject<number>;
}) {
  const { camera, viewport } = useThree();
  const compact = viewport.width < 7;

  useFrame(() => {
    const progress = progressRef.current;
    const radius = compact ? 6.2 : 7.4;
    const angle = progress * Math.PI * 1.08 - 0.45;
    const basePosition = new THREE.Vector3(
      Math.sin(angle) * radius,
      THREE.MathUtils.lerp(1.1, compact ? 0.65 : 1.55, progress),
      THREE.MathUtils.lerp(7.2, 2.4, progress) + Math.cos(angle) * 1.2,
    );
    const baseTarget = new THREE.Vector3(0, 0, compact ? -0.7 : -1.1);

    const selectedIndex = selectedProjectId ? projects.findIndex((project) => project.id === selectedProjectId) : -1;
    const transitionProgress = transitionProgressRef.current;

    if (selectedIndex >= 0 && transitionProgress > 0) {
      const target = new THREE.Vector3(...getGoldenSpiralPosition(selectedIndex, projects.length, compact));
      const zoomPosition = target.clone().add(new THREE.Vector3(0, 0.1, 1.18));
      camera.position.copy(basePosition.lerp(zoomPosition, transitionProgress));
      camera.lookAt(baseTarget.lerp(target, transitionProgress));
      return;
    }

    camera.position.copy(basePosition);
    camera.lookAt(baseTarget);
  });

  return null;
}

function ProjectCameraRig() {
  const { camera, viewport } = useThree();

  useFrame(() => {
    const compact = viewport.width < 7;
    const time = performance.now() * 0.00018;
    camera.position.x = Math.sin(time) * (compact ? 3.1 : 3.8);
    camera.position.y = compact ? 0.55 : 0.9;
    camera.position.z = compact ? 5.2 : 4.6;
    camera.lookAt(0.35, -0.05, -1.1);
  });

  return null;
}

function ProjectSceneSwitch({ project }: { project: PortfolioProject }) {
  const SceneComponent = sceneComponents[project.sceneType];
  return (
    <Suspense fallback={null}>
      <SceneComponent />
    </Suspense>
  );
}

function EcosystemStage({
  projects,
  selectedProjectId,
  transitionProgressRef,
  onProjectSelect,
}: {
  projects: PortfolioProject[];
  selectedProjectId: string | null;
  transitionProgressRef: React.MutableRefObject<number>;
  onProjectSelect: (projectId: string) => void;
}) {
  const progressRef = useRef(0);

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

  return (
    <>
      <DigitalCore progressRef={progressRef} />
      <DeviceEcosystem
        projects={projects}
        progressRef={progressRef}
        selectedProjectId={selectedProjectId}
        transitionProgressRef={transitionProgressRef}
        onProjectSelect={onProjectSelect}
      />
      <EcosystemCameraRig
        projects={projects}
        progressRef={progressRef}
        selectedProjectId={selectedProjectId}
        transitionProgressRef={transitionProgressRef}
      />
    </>
  );
}

export default function Scene() {
  const pathname = usePathname();
  const projectId = getProjectIdFromPath(pathname);
  const isEcosystem = pathname === '/';
  const isProjectPage = Boolean(projectId);
  const { projects, project, loading, error } = useProjectData(projectId);
  const { selectedProjectId, transitionProgressRef, startProjectTransition } = useTransitionManager();
  const [mounted, setMounted] = useState(false);
  const shouldRender = isEcosystem || isProjectPage;

  const loadingLabel = useMemo(() => {
    if (error) return 'Firebase stream unavailable';
    return isProjectPage ? 'Decrypting Data...' : 'Initiating Core...';
  }, [error, isProjectPage]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !shouldRender) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-0 bg-black">
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
        {isEcosystem && (
          <EcosystemStage
            projects={projects}
            selectedProjectId={selectedProjectId}
            transitionProgressRef={transitionProgressRef}
            onProjectSelect={startProjectTransition}
          />
        )}
        {isProjectPage && project && (
          <>
            <ProjectSceneSwitch project={project} />
            <ProjectCameraRig />
          </>
        )}
        <Environment preset="night" />
        <Preload all />
      </Canvas>

      {(loading || error) && (
        <div className="pointer-events-none absolute inset-x-0 top-28 flex justify-center px-4">
          <div className="rounded-full border border-cyan-300/15 bg-black/60 px-5 py-2 text-xs font-black uppercase tracking-[0.26em] text-cyan-100/80 shadow-[0_0_28px_rgba(0,194,255,0.18)] backdrop-blur-xl">
            {loadingLabel}
          </div>
        </div>
      )}
    </div>,
    document.body,
  );
}
