export type PortfolioPlatform = 'mobile' | 'desktop' | 'cross';
export type PortfolioStatus = 'production' | 'development';
export type PortfolioSceneType = 'timer' | 'network' | 'scanner' | 'idCard';

export type PortfolioMetric = {
  label: string;
  value: string;
};

export type PortfolioProject = {
  id: string;
  title: string;
  platform: PortfolioPlatform;
  techStack: string[];
  description: string;
  status: PortfolioStatus;
  sceneType: PortfolioSceneType;
  features: string[];
  metrics: PortfolioMetric[];
  modelUrl?: string;
};
