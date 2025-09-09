/**
 * Background System Exports
 *
 * Unified export file for the adaptive background system.
 * Import from this file to access all background components and utilities.
 */

// Main components
export { AdaptiveBackground } from './AdaptiveBackground';
export { DotsBackground } from './DotsBackground';
export { StarsBackground } from './StarsBackground';

// Hooks
export { useBackgroundType, usePrefersReducedMotion } from './hooks/useBackgroundType';

// Types
export type {
  BackgroundType,
  AdaptiveBackgroundProps,
  DotsBackgroundProps,
  StarsBackgroundProps,
} from './types';
