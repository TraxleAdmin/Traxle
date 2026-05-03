'use client';

import { useRef } from 'react';
import { ContactShadows, RoundedBox, Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SceneShell from '@/components/three/SceneShell';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

function HeroCore() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const orbitARef = useRef<THREE.Group>(null);
  const orbitBRef = useRef<THREE.Group>(null);
  const bladeRef = useRef<THREE.Group>(null);
  const reducedMotion = usePrefersReducedMotion();

  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) return;
    const elapsed = state.clock.elapsedTime;

    groupRef.current.rotation.y = Math.sin(elapsed * 0.22) * 0.12 - 0.34;
    groupRef.current.rotation.x = Math.sin(elapsed * 0.18) * 0.06;
    groupRef.current.position.y = Math.sin(elapsed * 0.42) * 0.08;

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.42;
      coreRef.current.rotation.z -= delta * 0.18;
    }

    if (shellRef.current) {
      shellRef.current.rotation.y -= delta * 0.18;
      shellRef.current.scale.setScalar(1 + Math.sin(elapsed * 1.2) * 0.018);
    }

    if (orbitARef.current) {
      orbitARef.current.rotation.z += delta * 0.64;
      orbitARef.current.rotation.y = Math.sin(elapsed * 0.36) * 0.18;
    }

    if (orbitBRef.current) {
      orbitBRef.current.rotation.x -= delta * 0.48;
      orbitBRef.current.rotation.z += delta * 0.22;
    }

    if (bladeRef.current) {
      bladeRef.current.rotation.y -= delta * 0.26;
    }
  });

  return (
    <group ref={groupRef} position={[0.62, -0.03, -0.1]} rotation={[0.08, -0.34, 0.04]} scale={0.92}>
      <group ref={coreRef}>
        <mesh>
          <dodecahedronGeometry args={[0.82, 1]} />
          <meshPhysicalMaterial
            color="#08111f"
            metalness={0.86}
            roughness={0.16}
            clearcoat={1}
            clearcoatRoughness={0.08}
          />
        </mesh>
        <mesh ref={shellRef}>
          <sphereGeometry args={[1.02, 64, 64]} />
          <meshPhysicalMaterial
            color="#dff8ff"
            metalness={0.15}
            roughness={0.04}
            transmission={0.28}
            thickness={0.85}
            clearcoat={1}
            transparent
            opacity={0.24}
          />
        </mesh>
      </group>

      <group ref={orbitARef} rotation={[Math.PI / 2.6, 0.18, -0.08]}>
        <mesh>
          <torusGeometry args={[1.52, 0.045, 24, 220]} />
          <meshPhysicalMaterial color="#00c2ff" emissive="#00c2ff" emissiveIntensity={0.46} metalness={0.45} roughness={0.12} />
        </mesh>
        {Array.from({ length: 4 }).map((_, index) => {
          const angle = (index / 4) * Math.PI * 2;
          return (
            <RoundedBox
              key={angle}
              args={[0.26, 0.12, 0.12]}
              radius={0.035}
              position={[Math.cos(angle) * 1.52, Math.sin(angle) * 1.52, 0]}
              rotation={[0, 0, angle]}
            >
              <meshPhysicalMaterial color="#e8fbff" metalness={0.5} roughness={0.14} clearcoat={1} />
            </RoundedBox>
          );
        })}
      </group>

      <group ref={orbitBRef} rotation={[0.34, Math.PI / 2.4, 0.6]}>
        <mesh>
          <torusGeometry args={[1.18, 0.032, 18, 180]} />
          <meshPhysicalMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.16} metalness={0.38} roughness={0.12} />
        </mesh>
        <RoundedBox args={[0.18, 0.62, 0.12]} radius={0.045} position={[0, 1.18, 0]}>
          <meshPhysicalMaterial color="#00c2ff" emissive="#00c2ff" emissiveIntensity={0.22} metalness={0.48} roughness={0.12} clearcoat={1} />
        </RoundedBox>
      </group>

      <group ref={bladeRef}>
        {[-1, 1].map((side) => (
          <group key={side} position={[side * 1.92, 0, -0.05]} rotation={[0, side * -0.08, side * 0.03]}>
            <RoundedBox args={[0.22, 1.82, 0.16]} radius={0.08}>
              <meshPhysicalMaterial
                color={side > 0 ? '#083445' : '#0d1117'}
                metalness={0.72}
                roughness={0.2}
                clearcoat={1}
                transparent
                opacity={side > 0 ? 0.82 : 0.62}
              />
            </RoundedBox>
            <mesh position={[0, side * 0.55, 0.11]}>
              <sphereGeometry args={[0.045, 18, 18]} />
              <meshBasicMaterial color={side > 0 ? '#00c2ff' : '#ffffff'} />
            </mesh>
          </group>
        ))}
      </group>

      <RoundedBox args={[0.92, 0.2, 0.12]} radius={0.055} position={[0.52, -1.12, 0.24]} rotation={[0.16, -0.36, -0.16]}>
        <meshPhysicalMaterial color="#07131f" metalness={0.8} roughness={0.16} clearcoat={1} />
      </RoundedBox>

      <Sparkles count={34} speed={0.44} size={2.0} scale={[4.4, 2.7, 2.8]} color="#dff8ff" />
      <ContactShadows position={[0, -1.42, 0]} opacity={0.34} scale={5.6} blur={2.8} far={3.3} />
    </group>
  );
}

export default function HomeHeroScene({ className }: { className?: string }) {
  return (
    <SceneShell className={className} cameraPosition={[0, 0.25, 5.7]}>
      <HeroCore />
    </SceneShell>
  );
}
