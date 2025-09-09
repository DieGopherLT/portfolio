'use client';

import { cn } from '@/lib/utils';

import * as React from 'react';

import { usePathname } from 'next/navigation';
import { DotsBackground } from './DotsBackground';
import { StarsBackground } from './StarsBackground';
import { usePrefersReducedMotion, useBackgroundType } from './hooks/useBackgroundType';
import type { AdaptiveBackgroundProps } from './types';

/**
 * AdaptiveBackground Component
 *
 * A smart background wrapper that automatically detects the appropriate background type
 * based on the current route, or accepts manual override. Designed for terminal-aesthetic 
 * portfolios with consistent theming.
 *
 * Features:
 * - Automatic route-based background detection (when type not specified)
 * - Manual override capability (when type is specified)
 * - Accessibility: Respects prefers-reduced-motion
 * - Performance: Only renders active background with memoization
 * - Theming: Consistent gopher blue palette
 * - Full configuration control
 *
 * Usage Examples:
 *
 * ```tsx
 * // Automatic detection (recommended)
 * <AdaptiveBackground>
 *   <YourContent />
 * </AdaptiveBackground>
 *
 * // Manual override for specific cases
 * <AdaptiveBackground type="stars" starsConfig={{ speed: 80 }}>
 *   <SpecialContent />
 * </AdaptiveBackground>
 * ```
 */
export function AdaptiveBackground({
  children,
  type,
  className,
  starsConfig = {},
}: AdaptiveBackgroundProps) {
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();
  const autoDetectedType = useBackgroundType(pathname);

  // Use provided type or auto-detected type, then apply accessibility override
  const resolvedType = type ?? autoDetectedType;
  const effectiveType = prefersReducedMotion ? 'dots' : resolvedType;

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
