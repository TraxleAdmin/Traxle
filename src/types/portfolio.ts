export type PortfolioPlatform = 'mobile' | 'desktop' | 'cross';
export type PortfolioStatus = 'production' | 'development';

export type PortfolioProject = {
  id: string;
  title: string;
  platform: PortfolioPlatform;
  techStack: string[];
  description: string;
  status: PortfolioStatus;
  modelUrl?: string;
};
