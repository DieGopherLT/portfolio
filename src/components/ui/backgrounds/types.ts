import type { SpringOptions } from 'framer-motion';

export type BackgroundType = 'dots' | 'stars' | 'none';

export interface DotsBackgroundProps {
  className?: string;
}

export interface StarsBackgroundProps {
  factor?: number;
  speed?: number;
  transition?: SpringOptions;
  starColor?: string;
  pointerEvents?: boolean;
  className?: string;
}

export interface AdaptiveBackgroundProps {
  children: React.ReactNode;
  type?: BackgroundType;
  className?: string;
  starsConfig?: Partial<StarsBackgroundProps>;
}
