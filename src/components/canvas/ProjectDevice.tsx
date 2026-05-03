'use client';

import React, { MutableRefObject, Suspense, useEffect, useMemo, useRef } from 'react';
import { Html, RoundedBox, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ProjectCard3DOverlay from '@/components/ui/ProjectCard3DOverlay';
import type { PortfolioProject } from '@/types/portfolio';

type ProjectDeviceProps = {
  project: PortfolioProject;
  index: number;
  target: [number, number, number];
  progressRef: MutableRefObject<number>;
  compact: boolean;
};

function OptionalGltfModel({ url }: { url: string }) {
  const gltf = useGLTF(url, true);
  return <primitive object={gltf.scene} scale={1.25} />;
}

function DeviceShell({ platform }: { platform: PortfolioProject['platform'] }) {
  if (platform === 'desktop') {
    return (
      <group>
        <RoundedBox args={[2.25, 1.34, 0.08]} radius={0.07} smoothness={10}>
          <meshPhysicalMaterial color="#111827" roughness={0.24} metalness={0.85} clearcoat={0.8} />
        </RoundedBox>
        <RoundedBox args={[2.02, 1.12, 0.09]} radius={0.04} position={[0, 0.02, 0.055]} smoothness={8}>
          <meshBasicMaterial color="#03101f" />
        </RoundedBox>
        <mesh position={[0, -0.83, 0]}>
          <boxGeometry args={[0.16, 0.62, 0.08]} />
          <meshStandardMaterial color="#1f2937" metalness={0.9} roughness={0.26} />
        </mesh>
        <RoundedBox args={[0.82, 0.08, 0.34]} radius={0.04} position={[0, -1.15, 0]} smoothness={8}>
          <meshStandardMaterial color="#111827" metalness={0.9} roughness={0.24} />
        </RoundedBox>
      </group>
    );
  }

  const width = platform === 'cross' ? 1.12 : 0.82;
  const height = platform === 'cross' ? 1.58 : 1.72;

  return (
    <group>
      <RoundedBox args={[width, height, 0.1]} radius={0.12} smoothness={14}>
        <meshPhysicalMaterial color="#121826" roughness={0.2} metalness={0.78} clearcoat={1} />
      </RoundedBox>
      <RoundedBox args={[width - 0.12, height - 0.18, 0.105]} radius={0.09} position={[0, 0, 0.058]} smoothness={12}>
        <meshBasicMaterial color="#03101f" />
      </RoundedBox>
      <mesh position={[0, height / 2 - 0.1, 0.12]}>
        <boxGeometry args={[0.22, 0.018, 0.01]} />
        <meshBasicMaterial color="#e5f8ff" />
      </mesh>
    </group>
  );
}

export default function ProjectDevice({ project, index, target, progressRef, compact }: ProjectDeviceProps) {
  const groupRef = useRef<THREE.Group>(null);
  const targetVector = useMemo(() => new THREE.Vector3(...target), [target]);
  const glowColor = project.status === 'production' ? '#41ffb6' : '#00c2ff';

  useEffect(() => {
    if (project.modelUrl) {
      useGLTF.preload(project.modelUrl, true);
    }
  }, [project.modelUrl]);

  useFrame((_, delta) => {
    const progress = progressRef.current;
    const localProgress = THREE.MathUtils.smoothstep(
      THREE.MathUtils.clamp((progress - 0.1 - index * 0.025) / 0.72, 0, 1),
      0,
      1,
    );

    if (!groupRef.current) return;

    groupRef.current.position.set(
      targetVector.x * localProgress,
      targetVector.y * localProgress,
      targetVector.z * localProgress,
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(0, Math.atan2(targetVector.x, targetVector.z) + Math.PI, localProgress);
    groupRef.current.rotation.x = Math.sin(progress * Math.PI + index) * 0.12;
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.08, compact ? 0.72 : 0.92, localProgress));
    groupRef.current.position.y += Math.sin(performance.now() * 0.0008 + index) * delta * 0.22;
  });

  return (
    <group ref={groupRef}>
      <pointLight color={glowColor} intensity={1.1} distance={3.2} />
      <Suspense fallback={<DeviceShell platform={project.platform} />}>
        {project.modelUrl ? <OptionalGltfModel url={project.modelUrl} /> : <DeviceShell platform={project.platform} />}
      </Suspense>
      <mesh position={[0, 0, -0.12]} scale={[1.22, 1.22, 1.22]}>
        <sphereGeometry args={[0.82, 32, 32]} />
        <meshBasicMaterial color={glowColor} transparent opacity={0.055} />
      </mesh>
      <Html transform center distanceFactor={compact ? 5.8 : 4.8} position={[project.platform === 'desktop' ? 1.55 : 1.05, 0.05, 0.14]}>
        <ProjectCard3DOverlay project={project} />
      </Html>
    </group>
  );
}
