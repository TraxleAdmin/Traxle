'use client';

import { useMemo, useRef, type ReactNode } from 'react';
import { ContactShadows, Float, RoundedBox, Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import SceneShell from '@/components/three/SceneShell';
import type { ProductVisualKind } from '@/lib/i18n';

type ProductExperienceSceneProps = {
  kind: ProductVisualKind;
  accent: string;
  className?: string;
};

function CoreRig({
  children,
  compact = false,
}: {
  children: ReactNode;
  compact?: boolean;
}) {
  const rigRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!rigRef.current) return;
    const elapsed = state.clock.elapsedTime;
    rigRef.current.rotation.y += delta * 0.08;
    rigRef.current.rotation.x = Math.sin(elapsed * 0.24) * 0.045;
    rigRef.current.position.y = Math.sin(elapsed * 0.38) * 0.06;
  });

  return (
    <Float speed={0.9} floatIntensity={compact ? 0.16 : 0.26} rotationIntensity={0.08}>
      <group ref={rigRef} position={[0.08, -0.08, -0.35]} rotation={[0.04, -0.34, 0.02]} scale={compact ? 0.72 : 0.92}>
        {children}
      </group>
    </Float>
  );
}

function SharedHalo({ accent }: { accent: string }) {
  const haloRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!haloRef.current) return;
    haloRef.current.rotation.z += delta * 0.09;
    haloRef.current.rotation.y -= delta * 0.05;
  });

  return (
    <group ref={haloRef}>
      <mesh rotation={[Math.PI / 2.45, 0, 0.22]}>
        <torusGeometry args={[1.95, 0.018, 18, 180]} />
        <meshPhysicalMaterial color={accent} emissive={accent} emissiveIntensity={0.46} metalness={0.45} roughness={0.18} />
      </mesh>
      <mesh rotation={[0.2, Math.PI / 2.6, 0.64]}>
        <torusGeometry args={[1.36, 0.014, 18, 150]} />
        <meshPhysicalMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.12} metalness={0.5} roughness={0.2} transparent opacity={0.62} />
      </mesh>
      <mesh rotation={[0.4, -Math.PI / 2.8, -0.22]}>
        <torusGeometry args={[2.28, 0.01, 14, 170]} />
        <meshPhysicalMaterial color={accent} emissive={accent} emissiveIntensity={0.16} metalness={0.4} roughness={0.18} transparent opacity={0.38} />
      </mesh>
    </group>
  );
}

function BarcodeScene({ accent }: { accent: string }) {
  const scannerRef = useRef<THREE.Mesh>(null);
  const bars = [0.72, 1.2, 0.84, 1.42, 0.96, 1.56, 0.68, 1.26, 0.9, 1.46, 0.76, 1.08];

  useFrame((state) => {
    if (!scannerRef.current) return;
    scannerRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.55) * 0.68;
    scannerRef.current.scale.x = 1.1 + Math.sin(state.clock.elapsedTime * 1.9) * 0.12;
  });

  return (
    <CoreRig>
      <SharedHalo accent={accent} />
      <RoundedBox args={[3.4, 2.16, 0.24]} radius={0.16} smoothness={14}>
        <meshPhysicalMaterial color="#07111d" metalness={0.74} roughness={0.16} clearcoat={1} />
      </RoundedBox>
      <RoundedBox args={[2.88, 1.42, 0.12]} radius={0.11} smoothness={12} position={[0, 0.08, 0.18]}>
        <meshPhysicalMaterial color="#101c2a" metalness={0.32} roughness={0.12} transparent opacity={0.68} />
      </RoundedBox>
      {bars.map((height, index) => (
        <RoundedBox
          key={`${height}-${index}`}
          args={[0.08, height, 0.08]}
          radius={0.025}
          position={[-1.16 + index * 0.21, -0.08 + height / 2 - 0.78, 0.34]}
        >
          <meshPhysicalMaterial
            color={index % 3 === 0 ? accent : '#eafaff'}
            emissive={index % 3 === 0 ? accent : '#eafaff'}
            emissiveIntensity={index % 3 === 0 ? 0.42 : 0.08}
            metalness={0.38}
            roughness={0.18}
          />
        </RoundedBox>
      ))}
      <mesh ref={scannerRef} position={[0, 0, 0.48]}>
        <boxGeometry args={[2.72, 0.035, 0.035]} />
        <meshBasicMaterial color={accent} transparent opacity={0.82} />
      </mesh>
      {[-1, 1].map((side) => (
        <RoundedBox key={side} args={[0.48, 0.36, 0.34]} radius={0.08} position={[side * 1.72, -1.02, 0.26]}>
          <meshPhysicalMaterial color={side > 0 ? '#152335' : '#0b1626'} metalness={0.72} roughness={0.18} clearcoat={1} />
        </RoundedBox>
      ))}
    </CoreRig>
  );
}

function TimerScene({ accent }: { accent: string }) {
  const handRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (handRef.current) handRef.current.rotation.z -= delta * 0.82;
    if (ringRef.current) ringRef.current.rotation.y += delta * 0.16;
  });

  return (
    <CoreRig>
      <SharedHalo accent={accent} />
      <group ref={ringRef}>
        <mesh>
          <torusGeometry args={[1.16, 0.24, 32, 190]} />
          <meshPhysicalMaterial color="#101827" metalness={0.84} roughness={0.14} clearcoat={1} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI * 0.18]}>
          <torusGeometry args={[1.17, 0.06, 18, 190]} />
          <meshPhysicalMaterial color={accent} emissive={accent} emissiveIntensity={0.58} metalness={0.44} roughness={0.12} />
        </mesh>
      </group>
      <mesh>
        <cylinderGeometry args={[0.78, 0.78, 0.16, 64]} />
        <meshPhysicalMaterial color="#090f1b" metalness={0.58} roughness={0.18} clearcoat={1} />
      </mesh>
      <group ref={handRef} position={[0, 0, 0.16]}>
        <RoundedBox args={[0.08, 0.72, 0.07]} radius={0.025} position={[0, 0.33, 0]}>
          <meshBasicMaterial color="#ffffff" />
        </RoundedBox>
        <RoundedBox args={[0.1, 0.46, 0.08]} radius={0.025} position={[0.2, -0.04, 0]} rotation={[0, 0, -Math.PI / 2.5]}>
          <meshBasicMaterial color={accent} />
        </RoundedBox>
      </group>
      {Array.from({ length: 8 }).map((_, index) => {
        const angle = (index / 8) * Math.PI * 2;
        return (
          <RoundedBox
            key={index}
            args={[0.42, 0.18, 0.1]}
            radius={0.05}
            position={[Math.cos(angle) * 1.86, Math.sin(angle) * 1.02, -0.12]}
            rotation={[0, 0, angle * 0.18]}
          >
            <meshPhysicalMaterial color={index % 2 ? '#101827' : accent} emissive={index % 2 ? '#000000' : accent} emissiveIntensity={index % 2 ? 0 : 0.22} metalness={0.52} roughness={0.16} />
          </RoundedBox>
        );
      })}
    </CoreRig>
  );
}

function DocumentScene({ accent }: { accent: string }) {
  const extractionRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!extractionRef.current) return;
    extractionRef.current.position.x = 0.62 + Math.sin(state.clock.elapsedTime * 0.78) * 0.26;
    extractionRef.current.position.y = 0.08 + Math.cos(state.clock.elapsedTime * 0.62) * 0.12;
  });

  return (
    <CoreRig>
      <SharedHalo accent={accent} />
      {[-0.18, 0, 0.18].map((offset, index) => (
        <RoundedBox
          key={offset}
          args={[1.72, 2.28, 0.1]}
          radius={0.11}
          position={[-0.38 + offset, 0.02 + index * 0.04, -0.06 + index * 0.14]}
          rotation={[0.02, -0.16 + index * 0.08, -0.08 + index * 0.04]}
        >
          <meshPhysicalMaterial color={index === 2 ? '#101827' : '#0b1422'} metalness={0.62} roughness={0.16} clearcoat={1} transparent opacity={index === 2 ? 0.92 : 0.68} />
        </RoundedBox>
      ))}
      {Array.from({ length: 6 }).map((_, index) => (
        <RoundedBox key={index} args={[1.02 - (index % 3) * 0.16, 0.055, 0.04]} radius={0.018} position={[-0.45, 0.78 - index * 0.24, 0.28]}>
          <meshBasicMaterial color={index === 2 ? accent : '#dff8ff'} transparent opacity={index === 2 ? 0.84 : 0.45} />
        </RoundedBox>
      ))}
      <group ref={extractionRef} position={[0.68, 0.1, 0.48]}>
        <RoundedBox args={[1.34, 0.82, 0.18]} radius={0.1}>
          <meshPhysicalMaterial color="#050b15" metalness={0.72} roughness={0.14} clearcoat={1} transparent opacity={0.86} />
        </RoundedBox>
        {Array.from({ length: 3 }).map((_, index) => (
          <RoundedBox key={index} args={[0.76 - index * 0.12, 0.06, 0.035]} radius={0.02} position={[0, 0.22 - index * 0.22, 0.12]}>
            <meshBasicMaterial color={index === 1 ? accent : '#eafaff'} transparent opacity={index === 1 ? 0.92 : 0.48} />
          </RoundedBox>
        ))}
      </group>
    </CoreRig>
  );
}

function LogisticsScene({ accent }: { accent: string }) {
  const moverRef = useRef<THREE.Mesh>(null);
  const route = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1.45, -0.5, 0.3),
        new THREE.Vector3(-0.65, 0.34, 0.38),
        new THREE.Vector3(0.25, -0.12, 0.42),
        new THREE.Vector3(1.18, 0.62, 0.48),
      ]),
    [],
  );
  const routeGeometry = useMemo(() => new THREE.TubeGeometry(route, 96, 0.025, 10, false), [route]);

  useFrame((state) => {
    if (!moverRef.current) return;
    const point = route.getPoint((state.clock.elapsedTime * 0.12) % 1);
    moverRef.current.position.copy(point);
    moverRef.current.position.z += 0.12;
  });

  return (
    <CoreRig>
      <SharedHalo accent={accent} />
      <RoundedBox args={[3.45, 2.12, 0.16]} radius={0.16} smoothness={14} rotation={[0.18, -0.08, 0]}>
        <meshPhysicalMaterial color="#07111d" metalness={0.72} roughness={0.16} clearcoat={1} />
      </RoundedBox>
      {Array.from({ length: 9 }).map((_, index) => (
        <mesh key={`x-${index}`} position={[-1.55 + index * 0.39, 0, 0.16]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[1.72, 0.01, 0.012]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.12} />
        </mesh>
      ))}
      {Array.from({ length: 6 }).map((_, index) => (
        <mesh key={`y-${index}`} position={[0, -0.78 + index * 0.32, 0.16]}>
          <boxGeometry args={[3.12, 0.01, 0.012]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.12} />
        </mesh>
      ))}
      <mesh geometry={routeGeometry}>
        <meshPhysicalMaterial color={accent} emissive={accent} emissiveIntensity={0.62} metalness={0.34} roughness={0.16} />
      </mesh>
      {[-1.45, -0.65, 0.25, 1.18].map((x, index) => {
        const y = [-0.5, 0.34, -0.12, 0.62][index];
        return (
          <mesh key={x} position={[x, y, 0.58]}>
            <sphereGeometry args={[index === 3 ? 0.13 : 0.095, 24, 24]} />
            <meshPhysicalMaterial color={index === 3 ? accent : '#eafaff'} emissive={index === 3 ? accent : '#ffffff'} emissiveIntensity={index === 3 ? 0.42 : 0.08} metalness={0.35} roughness={0.12} />
          </mesh>
        );
      })}
      <mesh ref={moverRef}>
        <sphereGeometry args={[0.095, 24, 24]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </CoreRig>
  );
}

export default function ProductExperienceScene({ kind, accent, className }: ProductExperienceSceneProps) {
  return (
    <SceneShell className={className} cameraPosition={[0, 0.18, 6.25]}>
      <group position={[0.05, 0, 0]}>
        {kind === 'barcode' && <BarcodeScene accent={accent} />}
        {kind === 'timer' && <TimerScene accent={accent} />}
        {kind === 'document' && <DocumentScene accent={accent} />}
        {kind === 'logistics' && <LogisticsScene accent={accent} />}
      </group>
      <Sparkles count={58} speed={0.32} size={2.4} scale={[7.4, 3.6, 3.4]} color="#dff8ff" />
      <ContactShadows position={[1.12, -1.54, 0]} opacity={0.26} scale={6.4} blur={2.8} far={3.8} />
    </SceneShell>
  );
}
