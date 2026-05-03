'use client';

import { useSyncExternalStore } from 'react';

function subscribe() {
  return () => undefined;
}

function getWebGLSnapshot() {
  if (typeof document === 'undefined') {
    return null;
  }

  const canvas = document.createElement('canvas');
  const webgl =
    canvas.getContext('webgl2') ||
    canvas.getContext('webgl') ||
    canvas.getContext('experimental-webgl');

  return Boolean(webgl);
}

function getServerSnapshot() {
  return null;
}

export function useWebGLSupport() {
  return useSyncExternalStore(subscribe, getWebGLSnapshot, getServerSnapshot);
}
