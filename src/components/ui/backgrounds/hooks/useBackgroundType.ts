'use client';

import * as React from 'react';
import type { BackgroundType } from '../types';

/**
 * Hook for programmatic background type determination
 *
 * Automatically determines the appropriate background type based on the current route.
 * Useful for implementing context-aware background switching.
 *
 * @param pathname - Current pathname from router
 * @returns Background type to use
 */
export function useBackgroundType(pathname: string): BackgroundType {
  return React.useMemo(() => {
    // Blog landing pages get stars for visual impact
    if (pathname === '/blog' || pathname.match(/^\/[a-z]{2}\/blog$/)) {
      return 'stars';
    }

    // Individual blog posts get dots for readability
    if (pathname.includes('/blog/') && pathname.split('/').length > 3) {
      return 'dots';
    }

    // Portfolio sections get minimal dots
    if (pathname.includes('#') || pathname === '/' || pathname.match(/^\/[a-z]{2}\/?$/)) {
      return 'dots';
    }

    // Default to dots for unknown routes
    return 'dots';
  }, [pathname]);
}

/**
 * Hook for checking user motion preferences
 *
 * @returns true if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  return React.useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);
}
