'use client';

import React, { useRef } from 'react';
import { RoundedBox } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function IdentityScene() {
  const cardRef = useRef<THREE.Group>(null);
  const glareRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (cardRef.current) {
      cardRef.current.rotation.y = THREE.MathUtils.damp(cardRef.current.rotation.y, pointer.x * 0.34, 5, delta);
      cardRef.current.rotation.x = THREE.MathUtils.damp(cardRef.current.rotation.x, -pointer.y * 0.22, 5, delta);
      cardRef.current.position.y = Math.sin(performance.now() * 0.00055) * 0.08;
    }

    if (glareRef.current) {
      glareRef.current.position.x = pointer.x * 0.42;
      glareRef.current.position.y = pointer.y * 0.22;
    }
  });

  return (
    <group ref={cardRef} position={[0.85, -0.05, -1.05]} rotation={[0.08, -0.22, -0.03]}>
      <RoundedBox args={[2.05, 1.24, 0.08]} radius={0.08} smoothness={16}>
        <meshPhysicalMaterial color="#06101f" metalness={0.35} roughness={0.12} transmission={0.32} thickness={0.75} clearcoat={1} />
      </RoundedBox>
      <RoundedBox args={[1.84, 0.24, 0.086]} radius={0.04} position={[0, 0.28, 0.06]} smoothness={10}>
        <meshBasicMaterial color="#00c2ff" transparent opacity={0.26} />
      </RoundedBox>
      <RoundedBox args={[0.52, 0.52, 0.09]} radius={0.06} position={[-0.58, -0.22, 0.065]} smoothness={10}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.18} />
      </RoundedBox>
      <mesh ref={glareRef} position={[0.15, 0.1, 0.09]} rotation={[0, 0, -0.55]}>
        <planeGeometry args={[0.42, 1.7]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.18} blending={THREE.AdditiveBlending} />
      </mesh>
      <pointLight color="#00c2ff" intensity={1.8} distance={3.5} />
    </group>
  );
}
