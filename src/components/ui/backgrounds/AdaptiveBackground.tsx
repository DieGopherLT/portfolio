'use client';

import { cn } from '@/lib/utils';

import * as React from 'react';

import { DotsBackground } from './DotsBackground';
import { StarsBackground } from './StarsBackground';
import { usePrefersReducedMotion } from './hooks/useBackgroundType';
import type { AdaptiveBackgroundProps } from './types';

/**
 * AdaptiveBackground Component
 *
 * A flexible background wrapper that conditionally renders different background types
 * based on context. Designed for terminal-aesthetic portfolios with consistent theming.
 *
 * Features:
 * - Accessibility: Respects prefers-reduced-motion
 * - Performance: Only renders active background
 * - Theming: Consistent gopher blue palette
 * - Flexibility: Full configuration control
 *
 * Usage Examples:
 *
 * ```tsx
 * // Portfolio sections (minimal dots)
 * <AdaptiveBackground type="dots">
 *   <PortfolioContent />
 * </AdaptiveBackground>
 *
 * // Blog landing (immersive stars)
 * <AdaptiveBackground
 *   type="stars"
 *   starsConfig={{
 *     starColor: '#00ADD8',
 *     speed: 60,
 *     factor: 0.03
 *   }}
 * >
 *   <BlogLanding />
 * </AdaptiveBackground>
 *
 * // Blog posts (back to minimal for readability)
 * <AdaptiveBackground type="dots">
 *   <BlogPost />
 * </AdaptiveBackground>
 * ```
 */
export function AdaptiveBackground({
  children,
  type = 'dots',
  className,
  starsConfig = {},
}: AdaptiveBackgroundProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Force dots background if user prefers reduced motion
  const effectiveType = prefersReducedMotion ? 'dots' : type;

  const renderBackground = React.useMemo(() => {
    switch (effectiveType) {
      case 'stars':
        return (
          <StarsBackground
            factor={0.03}
            speed={60}
            starColor="#00ADD8"
            pointerEvents={true}
            {...starsConfig}
          />
        );
      case 'dots':
        return <DotsBackground />;
      case 'none':
        return null;
      default:
        return <DotsBackground />;
    }
  }, [effectiveType, starsConfig]);

  return (
    <div className={cn('relative', className)}>
      {renderBackground}
      {children}
    </div>
  );
}
