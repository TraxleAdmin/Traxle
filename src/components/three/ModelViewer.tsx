'use client';

import { ContactShadows, Sparkles } from '@react-three/drei';
import SceneShell from '@/components/three/SceneShell';
import FloatingModel from '@/components/three/FloatingModel';

export default function ModelViewer({
  modelPath,
  accent,
  className,
}: {
  modelPath?: string;
  accent: string;
  className?: string;
}) {
  return (
    <SceneShell className={className} cameraPosition={[0, 0.15, 4.6]}>
      <group position={[0, -0.05, 0]}>
        <FloatingModel modelPath={modelPath} accent={accent} scale={1.12} />
        <Sparkles count={18} speed={0.18} size={2} scale={[3, 2, 2]} color="#dff8ff" />
        <ContactShadows position={[0, -1.4, 0]} opacity={0.25} scale={4.5} blur={2.4} far={3} />
      </group>
    </SceneShell>
  );
}
