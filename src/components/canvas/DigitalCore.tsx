'use client';

import React, { MutableRefObject, useMemo, useRef } from 'react';
import { Float, Icosahedron } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type DigitalCoreProps = {
  progressRef: MutableRefObject<number>;
};

export default function DigitalCore({ progressRef }: DigitalCoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const coreMaterial = useMemo(
    () => new THREE.MeshPhysicalMaterial({
      color: '#07111f',
      roughness: 0.18,
      metalness: 0.55,
      transmission: 0.26,
      thickness: 0.7,
      emissive: '#00c2ff',
      emissiveIntensity: 0.4,
      wireframe: true,
    }),
    [],
  );

  useFrame((_, delta) => {
    const progress = progressRef.current;
    const visibility = THREE.MathUtils.clamp(1 - progress * 1.25, 0, 1);

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * (0.28 + progress * 0.8);
      groupRef.current.rotation.x += delta * 0.12;
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(1.25, 0.32, progress));
    }

    if (innerRef.current) {
      innerRef.current.rotation.z -= delta * 0.52;
      const material = innerRef.current.material as THREE.MeshPhysicalMaterial;
      material.opacity = visibility;
      material.emissiveIntensity = THREE.MathUtils.lerp(0.65, 0.08, progress);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.6} rotationIntensity={0.6} floatIntensity={0.7}>
        <Icosahedron ref={innerRef} args={[1.15, 3]} material={coreMaterial} />
        <mesh scale={1.72}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#00c2ff" wireframe transparent opacity={0.18} />
        </mesh>
        <mesh scale={2.15}>
          <torusGeometry args={[1, 0.006, 12, 160]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.32} />
        </mesh>
      </Float>
    </group>
  );
}
