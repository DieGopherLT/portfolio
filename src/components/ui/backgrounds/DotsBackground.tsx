'use client';

import { cn } from '@/lib/utils';

import type { DotsBackgroundProps } from './types';

/**
 * DotsBackground - Minimal terminal-aesthetic background
 *
 * Renders the current subtle dot pattern used in the portfolio.
 * Optimized for performance and readability.
 */
export function DotsBackground({ className }: DotsBackgroundProps) {
  return (
    <div
      className={cn('fixed inset-0', className)}
      style={{
        backgroundColor: '#000000',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        backgroundAttachment: 'fixed',
      }}
      aria-hidden="true"
    />
  );
}
