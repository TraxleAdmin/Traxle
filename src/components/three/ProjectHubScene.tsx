'use client';

import { ContactShadows, Sparkles } from '@react-three/drei';
import SceneShell from '@/components/three/SceneShell';
import PremiumSceneStage from '@/components/three/PremiumSceneStage';
import ProjectPortal from '@/components/three/ProjectPortal';
import type { Project } from '@/lib/projects';

export default function ProjectHubScene({
  projects,
  className,
}: {
  projects: Project[];
  className?: string;
}) {
  return (
    <SceneShell className={className} cameraPosition={[0, 0.18, 6.2]}>
      <PremiumSceneStage accent="#38bdf8" intensity="calm" />
      <group position={[0, -0.05, 0]}>
        {projects.map((project, index) => (
          <ProjectPortal key={project.slug} index={index} total={projects.length} accent={project.accent} />
        ))}
      </group>
      <Sparkles count={18} speed={0.18} size={1.8} scale={[5.6, 2.4, 2.8]} color="#dff8ff" />
      <ContactShadows position={[0, -1.55, 0]} opacity={0.24} scale={7} blur={2.6} far={3.4} />
    </SceneShell>
  );
}
