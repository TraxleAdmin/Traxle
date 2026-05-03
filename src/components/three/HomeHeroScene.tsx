'use client';

import { useRef } from 'react';
import { ContactShadows, RoundedBox, Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SceneShell from '@/components/three/SceneShell';
import FloatingModel from '@/components/three/FloatingModel';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

function HeroCore() {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = usePrefersReducedMotion();

  useFrame((_, delta) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.y += delta * 0.12;
    groupRef.current.rotation.z = Math.sin(performance.now() * 0.00022) * 0.08;
  });

  return (
    <group ref={groupRef} position={[1.35, -0.05, 0]} rotation={[0.12, -0.55, 0.06]}>
      <FloatingModel accent="#00c2ff" scale={1.08} />
      <RoundedBox args={[0.24, 2.4, 0.08]} radius={0.04} position={[-1.15, -0.05, -0.18]}>
        <meshPhysicalMaterial color="#ffffff" metalness={0.42} roughness={0.2} transparent opacity={0.28} />
      </RoundedBox>
      <RoundedBox args={[0.16, 1.65, 0.08]} radius={0.04} position={[1.24, 0.15, 0.16]}>
        <meshPhysicalMaterial color="#00c2ff" emissive="#00c2ff" emissiveIntensity={0.28} metalness={0.36} roughness={0.12} transparent opacity={0.58} />
      </RoundedBox>
      <Sparkles count={28} speed={0.25} size={2.4} scale={[3.2, 2.2, 2.2]} color="#dff8ff" />
      <ContactShadows position={[0, -1.35, 0]} opacity={0.28} scale={5} blur={2.5} far={3.2} />
    </group>
  );
}

export default function HomeHeroScene({ className }: { className?: string }) {
  return (
    <SceneShell className={className} cameraPosition={[0, 0.35, 5.8]}>
      <HeroCore />
    </SceneShell>
  );
}
