'use client';

import { ContactShadows, Sparkles } from '@react-three/drei';
import SceneShell from '@/components/three/SceneShell';
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
      <group position={[0, -0.05, 0]}>
        {projects.map((project, index) => (
          <ProjectPortal key={project.slug} index={index} total={projects.length} accent={project.accent} />
        ))}
      </group>
      <Sparkles count={34} speed={0.22} size={2.2} scale={[6, 2.6, 3]} color="#dff8ff" />
      <ContactShadows position={[0, -1.55, 0]} opacity={0.24} scale={7} blur={2.6} far={3.4} />
    </SceneShell>
  );
}
