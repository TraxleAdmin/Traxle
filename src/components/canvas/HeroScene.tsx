'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Preload, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import * as random from 'maath/random/dist/maath-random.esm';
import { useTheme } from 'next-themes';

// Siberpunk Tarzı Dönen ve Etkileşimli Yıldız/Parçacık Ağı (Particles)
function CyberParticles({ isDark, ...props }: any) {
  const ref = useRef<THREE.Points>(null);

  // Parçacık noktalarını oluştur
  const sphere = useMemo(() => random.inSphere(new Float32Array(5000), { radius: 2.5 }), []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;

      // Fare pozisyonuna göre etkileşim (Parallax)
      const mouseX = state.pointer.x;
      const mouseY = state.pointer.y;

      // Smooth movement (Lerp)
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, mouseX * 0.5, 0.05);
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, mouseY * 0.5, 0.05);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color={isDark ? "#00C2FF" : "#0057FF"} // Light modda daha koyu mavi, dark modda cyan
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

// Ana obje - Soyut Geometrik Ağ veya Wireframe Küre
function CyberGlobe({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} scale={2.5}>
        {/* Icosahedron (Daha fütüristik ve geometrik) */}
        <icosahedronGeometry args={[1, 1]} />
        {/* Wireframe materyal ile siberpunk ağı görünümü */}
        <meshStandardMaterial
          color="#0057FF" // Traxle Blue
          wireframe={true}
          transparent
          opacity={isDark ? 0.3 : 0.15}
          emissive="#0057FF"
          emissiveIntensity={isDark ? 0.5 : 0.2}
        />
      </mesh>
    </Float>
  );
}

// İkinci iç içe obje
function InnerCore({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= delta * 0.3;
      meshRef.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.2}>
      <octahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial
        color={isDark ? "#050814" : "#ffffff"}
        emissive={isDark ? "#00C2FF" : "#0057FF"}
        emissiveIntensity={isDark ? 0.8 : 0.4}
        wireframe={true}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}


export default function HeroScene() {
  const { theme, systemTheme } = useTheme();

  // Client-side hydration safety için kontrol (default dark)
  const isDark = useMemo(() => {
    const currentTheme = theme === 'system' ? systemTheme : theme;
    return currentTheme !== 'light';
  }, [theme, systemTheme]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={isDark ? 0.5 : 1.2} />
        <pointLight position={[10, 10, 10]} intensity={isDark ? 1 : 2} color={isDark ? "#0057FF" : "#ffffff"} />
        <pointLight position={[-10, -10, -10]} intensity={isDark ? 1 : 0.5} color={isDark ? "#00C2FF" : "#0057FF"} />

        {/* 3D Öğeler */}
        <CyberGlobe isDark={isDark} />
        <InnerCore isDark={isDark} />
        <CyberParticles isDark={isDark} />

        <Environment preset="city" />
        <Preload all />
      </Canvas>
    </div>
  );
}
