'use client';

import React, { useRef } from 'react';
import { RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ScannerScene() {
  const boxRef = useRef<THREE.Group>(null);
  const scannerRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (boxRef.current) {
      boxRef.current.rotation.y += delta * 0.28;
      boxRef.current.rotation.x = Math.sin(performance.now() * 0.00045) * 0.12;
    }

    if (scannerRef.current) {
      scannerRef.current.position.y = Math.sin(performance.now() * 0.0012) * 0.9;
    }
  });

  return (
    <group position={[0.95, -0.1, -1.15]}>
      <group ref={boxRef}>
        <RoundedBox args={[1.35, 1.35, 1.35]} radius={0.08} smoothness={8}>
          <meshPhysicalMaterial color="#111827" metalness={0.76} roughness={0.2} clearcoat={0.9} />
        </RoundedBox>
        <RoundedBox args={[1.39, 1.39, 1.39]} radius={0.08} smoothness={8}>
          <meshBasicMaterial color="#00c2ff" wireframe transparent opacity={0.22} />
        </RoundedBox>
      </group>
      <mesh ref={scannerRef} rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0.05]}>
        <boxGeometry args={[2.7, 0.035, 1.8]} />
        <meshBasicMaterial color="#00c2ff" transparent opacity={0.32} blending={THREE.AdditiveBlending} />
      </mesh>
      <pointLight color="#00c2ff" intensity={2.2} distance={4} />
    </group>
  );
}
