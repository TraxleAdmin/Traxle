'use client';

import { useEffect, useState } from 'react';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type {
  PortfolioMetric,
  PortfolioPlatform,
  PortfolioProject,
  PortfolioSceneType,
  PortfolioStatus,
} from '@/types/portfolio';

const platforms: PortfolioPlatform[] = ['mobile', 'desktop', 'cross'];
const statuses: PortfolioStatus[] = ['production', 'development'];
const sceneTypes: PortfolioSceneType[] = ['timer', 'network', 'scanner', 'idCard'];

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string' && item.trim().length > 0);
}

function normalizeMetrics(value: unknown): PortfolioMetric[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item) => {
    if (!item || typeof item !== 'object') return [];
    const record = item as Record<string, unknown>;
    const label = typeof record.label === 'string' ? record.label.trim() : '';
    const metricValue = typeof record.value === 'string' ? record.value.trim() : '';

    return label && metricValue ? [{ label, value: metricValue }] : [];
  });
}

function normalizeProject(id: string, value: Record<string, unknown>): PortfolioProject | null {
  const title = typeof value.title === 'string' ? value.title.trim() : '';
  const description = typeof value.description === 'string' ? value.description.trim() : '';
  const platform = platforms.includes(value.platform as PortfolioPlatform) ? value.platform as PortfolioPlatform : null;
  const status = statuses.includes(value.status as PortfolioStatus) ? value.status as PortfolioStatus : null;
  const sceneType = sceneTypes.includes(value.sceneType as PortfolioSceneType) ? value.sceneType as PortfolioSceneType : null;
  const techStack = isStringArray(value.techStack) ? value.techStack.map((item) => item.trim()) : [];
  const features = isStringArray(value.features) ? value.features.map((item) => item.trim()) : [];
  const metrics = normalizeMetrics(value.metrics);
  const modelUrl = typeof value.modelUrl === 'string' && value.modelUrl.trim().length > 0 ? value.modelUrl : undefined;

  if (!title || !description || !platform || !status || !sceneType) {
    return null;
  }

  return {
    id,
    title,
    platform,
    techStack,
    description,
    status,
    sceneType,
    features,
    metrics,
    modelUrl,
  };
}

export function useProjectData(projectId?: string) {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (projectId) {
      const unsubscribe = onSnapshot(
        doc(db, 'portfolio_projects', projectId),
        (snapshot) => {
          const nextProject = snapshot.exists() ? normalizeProject(snapshot.id, snapshot.data()) : null;
          setProject(nextProject);
          setProjects([]);
          setLoading(false);
        },
        (snapshotError) => {
          setError(snapshotError.message);
          setLoading(false);
        },
      );

      return unsubscribe;
    }

    const unsubscribe = onSnapshot(
      collection(db, 'portfolio_projects'),
      (snapshot) => {
        const nextProjects = snapshot.docs
          .map((projectDoc) => normalizeProject(projectDoc.id, projectDoc.data()))
          .filter((nextProject): nextProject is PortfolioProject => Boolean(nextProject));

        setProjects(nextProjects);
        setProject(null);
        setLoading(false);
      },
      (snapshotError) => {
        setError(snapshotError.message);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [projectId]);

  return { projects, project, loading, error };
}

export function useFirebaseProjects() {
  const { projects, loading, error } = useProjectData();
  return { projects, loading, error };
}
