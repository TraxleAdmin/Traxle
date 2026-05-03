'use client';

import React, { useMemo, useRef } from 'react';
import { Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function sphericalPoint(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

export default function NetworkScene() {
  const globeRef = useRef<THREE.Group>(null);
  const routes = useMemo(() => {
    const points = [
      [41, 29],
      [52, 13],
      [25, 55],
      [1, 104],
      [40, -74],
      [35, 139],
    ];

    return points.map((point, index) => {
      const start = sphericalPoint(point[0], point[1], 1.25);
      const endSeed = points[(index + 2) % points.length];
      const end = sphericalPoint(endSeed[0], endSeed[1], 1.25);
      const mid = start.clone().add(end).normalize().multiplyScalar(1.68);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      return curve.getPoints(36);
    });
  }, []);

  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={globeRef} position={[0.7, -0.1, -1.35]}>
      <mesh>
        <sphereGeometry args={[1.25, 64, 64]} />
        <meshPhysicalMaterial color="#020712" metalness={0.5} roughness={0.32} transparent opacity={0.72} />
      </mesh>
      <mesh scale={1.012}>
        <sphereGeometry args={[1.25, 32, 32]} />
        <meshBasicMaterial color="#00c2ff" wireframe transparent opacity={0.09} />
      </mesh>
      {routes.map((route, index) => (
        <Line key={index} points={route} color={index % 2 === 0 ? '#00c2ff' : '#ffffff'} lineWidth={1.4} transparent opacity={0.72} />
      ))}
      {routes.flatMap((route, routeIndex) =>
        route.filter((_, index) => index % 12 === 0).map((point, nodeIndex) => (
          <mesh key={`${routeIndex}-${nodeIndex}`} position={point}>
            <sphereGeometry args={[0.026, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        )),
      )}
    </group>
  );
}
