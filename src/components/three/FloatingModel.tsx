'use client';

import { useRef } from 'react';
import { Float, RoundedBox, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

function LoadedModel({ modelPath, scale }: { modelPath: string; scale: number }) {
  const gltf = useGLTF(modelPath);
  return <primitive object={gltf.scene} scale={scale} />;
}

function ProceduralModel({
  accent,
  scale,
  compact = false,
}: {
  accent: string;
  scale: number;
  compact?: boolean;
}) {
  return (
    <group scale={scale}>
      <mesh rotation={[0.3, 0.5, 0.1]}>
        <icosahedronGeometry args={[compact ? 0.92 : 1.1, 3]} />
        <meshPhysicalMaterial
          color="#101827"
          metalness={0.78}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.12}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2.35, 0.12, 0]}>
        <torusGeometry args={[compact ? 1.02 : 1.2, 0.035, 18, 160]} />
        <meshPhysicalMaterial color={accent} emissive={accent} emissiveIntensity={0.35} metalness={0.45} roughness={0.18} />
      </mesh>
      <mesh rotation={[0.22, Math.PI / 2.4, 0.45]}>
        <torusGeometry args={[compact ? 0.72 : 0.84, 0.025, 18, 140]} />
        <meshPhysicalMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.08} metalness={0.5} roughness={0.16} />
      </mesh>
      <RoundedBox args={[compact ? 0.48 : 0.58, compact ? 0.18 : 0.22, 0.08]} radius={0.035} position={[0.42, -0.48, 0.62]}>
        <meshPhysicalMaterial color={accent} metalness={0.42} roughness={0.12} clearcoat={1} transparent opacity={0.86} />
      </RoundedBox>
    </group>
  );
}

export default function FloatingModel({
  modelPath,
  accent = '#00c2ff',
  scale = 1,
  compact = false,
}: {
  modelPath?: string;
  accent?: string;
  scale?: number;
  compact?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = usePrefersReducedMotion();

  useFrame((_, delta) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.y += delta * 0.22;
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      Math.sin(performance.now() * 0.00045) * 0.1,
      3,
      delta,
    );
  });

  return (
    <Float enabled={!reducedMotion} speed={1.05} floatIntensity={0.25} rotationIntensity={0.12}>
      <group ref={groupRef}>
        {modelPath ? <LoadedModel modelPath={modelPath} scale={scale} /> : <ProceduralModel accent={accent} scale={scale} compact={compact} />}
      </group>
    </Float>
  );
}
