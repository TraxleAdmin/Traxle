'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { PortfolioPlatform, PortfolioProject, PortfolioStatus } from '@/types/portfolio';

const platforms: PortfolioPlatform[] = ['mobile', 'desktop', 'cross'];
const statuses: PortfolioStatus[] = ['production', 'development'];

function normalizeProject(id: string, value: Record<string, unknown>): PortfolioProject | null {
  const title = typeof value.title === 'string' ? value.title.trim() : '';
  const description = typeof value.description === 'string' ? value.description.trim() : '';
  const platform = platforms.includes(value.platform as PortfolioPlatform) ? value.platform as PortfolioPlatform : null;
  const status = statuses.includes(value.status as PortfolioStatus) ? value.status as PortfolioStatus : null;
  const techStack = Array.isArray(value.techStack)
    ? value.techStack.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    : [];
  const modelUrl = typeof value.modelUrl === 'string' && value.modelUrl.trim().length > 0 ? value.modelUrl : undefined;

  if (!title || !description || !platform || !status) {
    return null;
  }

  return {
    id: typeof value.id === 'string' && value.id.trim().length > 0 ? value.id : id,
    title,
    platform,
    techStack,
    description,
    status,
    modelUrl,
  };
}

export function useFirebaseProjects() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'portfolio_projects'),
      (snapshot) => {
        const nextProjects = snapshot.docs
          .map((doc) => normalizeProject(doc.id, doc.data()))
          .filter((project): project is PortfolioProject => Boolean(project));

        setProjects(nextProjects);
        setError(null);
        setLoading(false);
      },
      (snapshotError) => {
        setError(snapshotError.message);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  return { projects, loading, error };
}
