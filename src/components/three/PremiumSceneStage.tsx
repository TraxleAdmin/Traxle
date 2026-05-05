'use client';

import { useMemo, useRef } from 'react';
import { RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type PremiumSceneStageProps = {
  accent?: string;
  intensity?: 'calm' | 'rich';
};

function LightBand({
  accent,
  position,
  rotation,
  scale = 1,
  opacity = 0.16,
}: {
  accent: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  opacity?: number;
}) {
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[4.6, 0.34, 1, 1]} />
      <meshBasicMaterial
        color={accent}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function OrbitNodes({ accent, radius = 2.42, count = 10 }: { accent: string; radius?: number; count?: number }) {
  const nodes = useMemo(
    () =>
      Array.from({ length: count }).map((_, index) => {
        const angle = (index / count) * Math.PI * 2;
        return {
          angle,
          position: [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.46, Math.sin(angle) * 0.42] as [number, number, number],
          size: index % 3 === 0 ? 0.055 : 0.036,
        };
      }),
    [count, radius],
  );

  return (
    <group>
      {nodes.map((node, index) => (
        <mesh key={node.angle} position={node.position}>
          <sphereGeometry args={[node.size, 18, 18]} />
          <meshBasicMaterial
            color={index % 3 === 0 ? accent : '#f2fbff'}
            transparent
            opacity={index % 3 === 0 ? 0.9 : 0.58}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function PremiumSceneStage({
  accent = '#22d3ee',
  intensity = 'rich',
}: PremiumSceneStageProps) {
  const ringRef = useRef<THREE.Group>(null);
  const bandRef = useRef<THREE.Group>(null);
  const floorRef = useRef<THREE.Group>(null);
  const motion = intensity === 'rich' ? 1 : 0.62;

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime;

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.055 * motion;
      ringRef.current.rotation.y = Math.sin(elapsed * 0.18) * 0.08 * motion;
    }

    if (bandRef.current) {
      bandRef.current.rotation.z = Math.sin(elapsed * 0.2) * 0.045 * motion;
      bandRef.current.position.y = Math.sin(elapsed * 0.32) * 0.08 * motion;
    }

    if (floorRef.current) {
      floorRef.current.rotation.z -= delta * 0.025 * motion;
    }
  });

  return (
    <group>
      <group ref={bandRef} position={[0.08, 0.08, -0.82]}>
        <LightBand accent={accent} position={[-0.72, 0.82, 0.18]} rotation={[0.12, -0.32, -0.22]} opacity={0.18} />
        <LightBand accent="#ffffff" position={[0.58, -0.34, 0.12]} rotation={[-0.08, 0.34, 0.2]} scale={0.78} opacity={0.09} />
        {intensity === 'rich' && (
          <LightBand accent={accent} position={[0.4, 1.2, -0.28]} rotation={[0.26, 0.18, 0.52]} scale={0.62} opacity={0.11} />
        )}
      </group>

      <group ref={ringRef} position={[0, 0, -0.52]}>
        <mesh rotation={[Math.PI / 2.35, 0, 0.18]}>
          <torusGeometry args={[2.52, 0.012, 14, 220]} />
          <meshBasicMaterial color={accent} transparent opacity={0.42} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh rotation={[0.34, Math.PI / 2.55, -0.44]}>
          <torusGeometry args={[1.72, 0.009, 12, 180]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.18} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        {intensity === 'rich' && (
          <mesh rotation={[-0.22, Math.PI / 2.85, 0.76]}>
            <torusGeometry args={[3.08, 0.007, 10, 240]} />
            <meshBasicMaterial color={accent} transparent opacity={0.18} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        )}
        <OrbitNodes accent={accent} count={intensity === 'rich' ? 12 : 8} />
      </group>

      <group ref={floorRef} position={[0, -1.62, -0.28]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <torusGeometry args={[2.55, 0.018, 18, 220]} />
          <meshBasicMaterial color={accent} transparent opacity={0.22} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh>
          <ringGeometry args={[1.08, 1.1, 96]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.08} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
        </mesh>
        {Array.from({ length: 7 }).map((_, index) => (
          <RoundedBox
            key={index}
            args={[0.018, 3.8, 0.018]}
            radius={0.004}
            position={[-1.32 + index * 0.44, 0, 0.01]}
          >
            <meshBasicMaterial color="#ffffff" transparent opacity={0.055} depthWrite={false} />
          </RoundedBox>
        ))}
        {Array.from({ length: 5 }).map((_, index) => (
          <RoundedBox
            key={`rail-${index}`}
            args={[3.8, 0.018, 0.018]}
            radius={0.004}
            position={[0, -0.88 + index * 0.44, 0.012]}
          >
            <meshBasicMaterial color="#ffffff" transparent opacity={0.045} depthWrite={false} />
          </RoundedBox>
        ))}
      </group>
    </group>
  );
}
