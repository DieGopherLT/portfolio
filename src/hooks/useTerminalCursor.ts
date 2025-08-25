'use client';

import { useMemo } from 'react';
import type { TargetAndTransition, Transition } from 'framer-motion';

interface TerminalCursorConfig {
  /**
   * Para cursor parpadeante continuo (como en footer o prompt final)
   */
  blinking: TargetAndTransition;
  
  /**
   * Para cursor durante tipeo (se controla con estado showCursor)
   */
  typing: {
    transition: Transition;
  };
}

/**
 * Hook para unificar las animaciones del cursor de terminal
 * Basado en el ritmo tranquilo del TerminalFooter (1.06s)
 */
export function useTerminalCursor(): TerminalCursorConfig {
  return useMemo(() => ({
    blinking: {
      opacity: [1, 0, 1],
      transition: {
        duration: 1.06,
        repeat: Infinity,
        ease: "linear"
      }
    },
    typing: {
      transition: {
        duration: 0.15 // Slightly slower than 0.1 for consistency
      }
    }
  }), []);
}
