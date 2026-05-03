'use client';

import React, { MutableRefObject, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import ProjectDevice from '@/components/canvas/ProjectDevice';
import type { PortfolioProject } from '@/types/portfolio';

type DeviceEcosystemProps = {
  projects: PortfolioProject[];
  progressRef: MutableRefObject<number>;
};

function getGoldenSpiralPosition(index: number, total: number, compact: boolean): [number, number, number] {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const angle = index * goldenAngle;
  const normalized = total <= 1 ? 0.5 : index / (total - 1);
  const radius = (compact ? 1.65 : 2.55) + normalized * (compact ? 1.45 : 2.15);
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius - normalized * (compact ? 1.4 : 2.4);
  const y = (0.5 - normalized) * (compact ? 2.2 : 3.4);

  return [x, y, z];
}

export default function DeviceEcosystem({ projects, progressRef }: DeviceEcosystemProps) {
  const { viewport } = useThree();
  const compact = viewport.width < 7;
  const positions = useMemo(
    () => projects.map((_, index) => getGoldenSpiralPosition(index, projects.length, compact)),
    [compact, projects],
  );

  return (
    <group>
      {projects.map((project, index) => (
        <ProjectDevice
          key={project.id}
          project={project}
          index={index}
          target={positions[index]}
          progressRef={progressRef}
          compact={compact}
        />
      ))}
    </group>
  );
}
