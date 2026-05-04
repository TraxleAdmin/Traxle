'use client';

import { useEffect, useRef } from 'react';
import { ContactShadows, RoundedBox, Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SceneShell from '@/components/three/SceneShell';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

function useScrollProgress(targetId?: string) {
  const progressRef = useRef(0);

  useEffect(() => {
    if (!targetId) return;

    let frame = 0;

    const update = () => {
      const target = document.getElementById(targetId);
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const travel = Math.max(rect.height - window.innerHeight, 1);
      progressRef.current = THREE.MathUtils.clamp(-rect.top / travel, 0, 1);
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [targetId]);

  return progressRef;
}

function HeroCore({ scrollTargetId }: { scrollTargetId?: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const orbitARef = useRef<THREE.Group>(null);
  const orbitBRef = useRef<THREE.Group>(null);
  const bladeRef = useRef<THREE.Group>(null);
  const reducedMotion = usePrefersReducedMotion();
  const progressRef = useScrollProgress(scrollTargetId);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const elapsed = state.clock.elapsedTime;
    const progress = progressRef.current;
    const eased = THREE.MathUtils.smoothstep(progress, 0, 1);
    const motionScale = reducedMotion ? 0.28 : 1;

    groupRef.current.rotation.y = Math.sin(elapsed * 0.22) * 0.12 * motionScale + THREE.MathUtils.lerp(-0.34, 0.48, eased);
    groupRef.current.rotation.x = Math.sin(elapsed * 0.18) * 0.06 * motionScale + eased * 0.1;
    groupRef.current.position.x = THREE.MathUtils.lerp(-0.18, -0.62, eased);
    groupRef.current.position.y = THREE.MathUtils.lerp(-0.03, 0.08, eased) + Math.sin(elapsed * 0.42) * 0.08 * motionScale;
    groupRef.current.position.z = THREE.MathUtils.lerp(-0.1, -0.78, eased);
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.92, 0.74, eased));

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * (0.42 + eased * 0.65) * motionScale;
      coreRef.current.rotation.z -= delta * (0.18 + eased * 0.28) * motionScale;
    }

    if (shellRef.current) {
      shellRef.current.rotation.y -= delta * (0.18 + eased * 0.42) * motionScale;
      shellRef.current.scale.setScalar(1 + eased * 0.18 + Math.sin(elapsed * 1.2) * 0.018 * motionScale);
    }

    if (orbitARef.current) {
      orbitARef.current.rotation.z += delta * (0.64 + eased * 0.8) * motionScale;
      orbitARef.current.rotation.y = Math.sin(elapsed * 0.36) * 0.18 * motionScale + eased * 0.36;
      orbitARef.current.scale.setScalar(THREE.MathUtils.lerp(1, 1.32, eased));
    }

    if (orbitBRef.current) {
      orbitBRef.current.rotation.x -= delta * (0.48 + eased * 0.56) * motionScale;
      orbitBRef.current.rotation.z += delta * (0.22 + eased * 0.42) * motionScale;
      orbitBRef.current.scale.setScalar(THREE.MathUtils.lerp(1, 1.18, eased));
    }

    if (bladeRef.current) {
      bladeRef.current.rotation.y -= delta * (0.26 + eased * 0.55) * motionScale;
      bladeRef.current.scale.set(1 + eased * 0.32, 1 + eased * 0.08, 1);
    }
  });

  return (
    <group ref={groupRef} position={[-0.18, -0.03, -0.1]} rotation={[0.08, -0.34, 0.04]} scale={0.92}>
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

export default function HomeHeroScene({ className, scrollTargetId }: { className?: string; scrollTargetId?: string }) {
  return (
    <SceneShell className={className} cameraPosition={[0, 0.25, 5.7]}>
      <HeroCore scrollTargetId={scrollTargetId} />
    </SceneShell>
  );
}
