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
  className?: string;
}

export interface AdaptiveBackgroundProps {
  children: React.ReactNode;
  type?: BackgroundType; // Optional - when not provided, auto-detects based on route
  className?: string;
  starsConfig?: Partial<StarsBackgroundProps>;
}
