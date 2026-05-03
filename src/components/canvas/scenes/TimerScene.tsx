'use client';

import React, { useRef } from 'react';
import { Float, RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function TimerScene() {
  const gearRef = useRef<THREE.Group>(null);
  const handRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (gearRef.current) {
      gearRef.current.rotation.z += delta * 0.22;
      gearRef.current.rotation.y = Math.sin(performance.now() * 0.00035) * 0.12;
    }

    if (handRef.current) {
      handRef.current.rotation.z -= delta * 0.9;
    }
  });

  return (
    <group position={[1.25, -0.2, -1]} rotation={[0.05, -0.32, 0]}>
      <Float speed={1.2} rotationIntensity={0.16} floatIntensity={0.28}>
        <group ref={gearRef}>
          <mesh>
            <torusGeometry args={[1.25, 0.055, 18, 180]} />
            <meshPhysicalMaterial color="#111827" metalness={0.82} roughness={0.18} clearcoat={1} />
          </mesh>
          <mesh>
            <torusGeometry args={[0.82, 0.018, 16, 180]} />
            <meshBasicMaterial color="#00c2ff" transparent opacity={0.72} />
          </mesh>
          {Array.from({ length: 24 }).map((_, index) => {
            const angle = (index / 24) * Math.PI * 2;
            return (
              <RoundedBox
                key={angle}
                args={[0.035, 0.18, 0.03]}
                radius={0.01}
                position={[Math.cos(angle) * 1.25, Math.sin(angle) * 1.25, 0.02]}
                rotation={[0, 0, angle]}
              >
                <meshStandardMaterial color="#dff8ff" emissive="#00c2ff" emissiveIntensity={0.35} />
              </RoundedBox>
            );
          })}
        </group>
        <group ref={handRef}>
          <mesh position={[0, 0.36, 0.08]}>
            <boxGeometry args={[0.035, 0.74, 0.025]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0.24, -0.16, 0.08]} rotation={[0, 0, -0.88]}>
            <boxGeometry args={[0.025, 0.54, 0.025]} />
            <meshBasicMaterial color="#00c2ff" />
          </mesh>
        </group>
        <mesh position={[0, 0, 0.1]}>
          <sphereGeometry args={[0.08, 24, 24]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </Float>
    </group>
  );
}
