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
  const portalRef = useRef<THREE.Group>(null);
  const scannerRef = useRef<THREE.Mesh>(null);
  const reducedMotion = usePrefersReducedMotion();
  const position = useMemo(() => getPortalPosition(index, total), [index, total]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const elapsed = state.clock.elapsedTime;
    const motionScale = reducedMotion ? 0.32 : 1;

    groupRef.current.rotation.y = -position[0] * 0.12 + Math.sin(elapsed * 0.42 + index) * 0.16 * motionScale;
    groupRef.current.rotation.x = Math.sin(elapsed * 0.36 + index) * 0.045 * motionScale;
    groupRef.current.position.y = position[1] + Math.sin(elapsed * 0.72 + index) * 0.14 * motionScale;

    if (portalRef.current) {
      portalRef.current.rotation.z += delta * (0.12 + index * 0.025) * motionScale;
    }

    if (scannerRef.current) {
      scannerRef.current.position.y = Math.sin(elapsed * 1.5 + index) * 0.46 * motionScale;
      scannerRef.current.scale.x = 0.82 + Math.sin(elapsed * 1.2 + index) * 0.08 * motionScale;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={[0.02, -position[0] * 0.12, 0]}>
      <RoundedBox args={[1.05, 1.42, 0.14]} radius={0.12} smoothness={14}>
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
      <group ref={portalRef} position={[0, 0, -0.05]}>
        <mesh>
          <torusGeometry args={[0.82, 0.025, 18, 140]} />
          <meshPhysicalMaterial color={accent} emissive={accent} emissiveIntensity={0.45} metalness={0.4} roughness={0.18} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2.8]}>
          <torusGeometry args={[0.62, 0.015, 16, 120]} />
          <meshPhysicalMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.12} metalness={0.4} roughness={0.18} />
        </mesh>
      </group>
      <mesh ref={scannerRef} position={[0, 0, 0.12]}>
        <boxGeometry args={[0.78, 0.035, 0.035]} />
        <meshBasicMaterial color={accent} transparent opacity={0.72} />
      </mesh>
      <mesh position={[0, -0.82, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.82, 0.025, 18, 140]} />
        <meshPhysicalMaterial color="#04111d" metalness={0.78} roughness={0.18} transparent opacity={0.7} />
      </mesh>
      <FloatingModel accent={accent} scale={0.34} compact />
    </group>
  );
}
