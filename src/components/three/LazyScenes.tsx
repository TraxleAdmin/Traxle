'use client';

import dynamic from 'next/dynamic';
import LoadingScene from '@/components/three/LoadingScene';

export const LazyHomeHeroScene = dynamic(() => import('@/components/three/HomeHeroScene'), {
  ssr: false,
  loading: () => <LoadingScene />,
});

export const LazyProjectHubScene = dynamic(() => import('@/components/three/ProjectHubScene'), {
  ssr: false,
  loading: () => <LoadingScene />,
});

export const LazyModelViewer = dynamic(() => import('@/components/three/ModelViewer'), {
  ssr: false,
  loading: () => <LoadingScene />,
});
