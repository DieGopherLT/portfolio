/**
 * Standard animation delay timings used throughout the application
 * All values in milliseconds
 */
export const ANIMATION_DELAYS = {
  /** Initial delay before starting animation sequence (800ms) */
  INITIAL: 800,
  /** Short delay between animation steps (300ms) */
  SHORT: 300,
  /** Medium delay for standard transitions (400ms) */
  MEDIUM: 400,
  /** Long delay for emphasis or waiting (700ms) */
  LONG: 700,
  /** Delay before revealing content after typing (1500ms) */
  CONTENT_REVEAL: 1500,
  /** Delay for displaying command output (2000ms) */
  CONTENT_DISPLAY: 2000,
} as const;

/**
 * Helper function to create a Promise that resolves after a delay
 * @param ms - Milliseconds to wait
 */
export const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));
