"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Line } from "@react-three/drei";
import * as THREE from "three";

function WireNodes() {
  const groupRef = useRef<THREE.Group | null>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.06;
  });

  const points = useMemo(
    () => [
      [-1.8, -0.6, -1.2],
      [-0.9, 0.9, -0.6],
      [0.1, -0.2, -0.9],
      [1.2, 1.1, -0.4],
      [-1.1, -1.1, 0.3],
      [0.8, -0.8, 0.5],
      [1.9, 0.3, 0.8],
      [-0.2, 1.3, 0.7],
    ],
    [],
  );

  const linePairs = useMemo(
    () => [
      [0, 1],
      [1, 2],
      [2, 3],
      [2, 5],
      [4, 2],
      [4, 5],
      [5, 6],
      [1, 7],
      [7, 3],
    ],
    [],
  );

  return (
    <group ref={groupRef}>
      {linePairs.map(([a, b], index) => {
        return (
          <Line
            key={`${a}-${b}-${index}`}
            points={[
              [points[a][0], points[a][1], points[a][2]],
              [points[b][0], points[b][1], points[b][2]],
            ]}
            color="#38bdf8"
            lineWidth={1}
            transparent
            opacity={0.45}
          />
        );
      })}

      {points.map((position, index) => (
        <Float
          key={`node-${index}`}
          speed={1.4}
          rotationIntensity={0.45}
          floatIntensity={0.55}
          floatingRange={[-0.18, 0.2]}
        >
          <mesh position={[position[0], position[1], position[2]]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color={index % 2 === 0 ? "#22d3ee" : "#a855f7"} emissive="#0ea5e9" emissiveIntensity={0.7} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function MainGeometry() {
  const meshRef = useRef<THREE.Mesh | null>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.0028;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <Float speed={1.25} rotationIntensity={0.36} floatIntensity={0.45} floatingRange={[-0.24, 0.24]}>
      <mesh ref={meshRef} position={[0.25, 0.05, 0]}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshStandardMaterial
          color="#1d4ed8"
          emissive="#3b82f6"
          emissiveIntensity={0.55}
          roughness={0.28}
          metalness={0.72}
          wireframe
          transparent
          opacity={0.75}
        />
      </mesh>
    </Float>
  );
}

export default function HomeDepthScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4], fov: 52 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      performance={{ min: 0.75 }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[2.5, 2.2, 2.8]} intensity={2.7} color="#22d3ee" />
        <pointLight position={[-3.1, -2.5, -2.5]} intensity={2.1} color="#a855f7" />
        <Environment preset="night" />
        <MainGeometry />
        <WireNodes />
      </Suspense>
    </Canvas>
  );
}
