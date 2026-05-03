'use client';

import { useMemo, useRef } from 'react';
import { RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import FloatingModel from '@/components/three/FloatingModel';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

function getPortalPosition(index: number, total: number) {
  const angle = (index / Math.max(total, 1)) * Math.PI * 2;
  const radius = total > 3 ? 2.25 : 1.75;
  const y = (index % 2 === 0 ? 0.45 : -0.48) + Math.sin(angle * 1.4) * 0.25;
  const z = -Math.cos(angle) * 0.55;

  return [Math.cos(angle) * radius, y, z] as const;
}

export default function ProjectPortal({
  index,
  total,
  accent,
}: {
  index: number;
  total: number;
  accent: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = usePrefersReducedMotion();
  const position = useMemo(() => getPortalPosition(index, total), [index, total]);

  useFrame((_, delta) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.y += delta * 0.08;
    groupRef.current.position.y = position[1] + Math.sin(performance.now() * 0.00045 + index) * 0.08;
  });

  return (
    <group ref={groupRef} position={position} rotation={[0.02, -position[0] * 0.12, 0]}>
      <RoundedBox args={[1.05, 1.42, 0.1]} radius={0.12} smoothness={14}>
        <meshPhysicalMaterial
          color="#0a1020"
          metalness={0.7}
          roughness={0.16}
          clearcoat={1}
          clearcoatRoughness={0.08}
        />
      </RoundedBox>
      <RoundedBox args={[0.82, 1.08, 0.11]} radius={0.08} smoothness={14} position={[0, 0, 0.035]}>
        <meshPhysicalMaterial color={accent} emissive={accent} emissiveIntensity={0.16} metalness={0.28} roughness={0.1} transparent opacity={0.34} />
      </RoundedBox>
      <mesh position={[0, 0, -0.05]}>
        <torusGeometry args={[0.82, 0.025, 18, 140]} />
        <meshPhysicalMaterial color={accent} emissive={accent} emissiveIntensity={0.45} metalness={0.4} roughness={0.18} />
      </mesh>
      <FloatingModel accent={accent} scale={0.34} compact />
    </group>
  );
}
