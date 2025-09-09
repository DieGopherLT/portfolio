'use client';

import * as React from 'react';
import { motion, useMotionValue, useSpring, type Transition } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { StarsBackgroundProps } from './types';

// ===== STAR GENERATION UTILITY =====
function generateStars(count: number, starColor: string): string {
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000;
    const y = Math.floor(Math.random() * 4000) - 2000;
    shadows.push(`${x}px ${y}px ${starColor}`);
  }
  return shadows.join(', ');
}

// ===== STAR LAYER COMPONENT =====
interface StarLayerProps {
  count: number;
  size: number;
  transition: Transition;
  starColor: string;
}

function StarLayer({ 
  count = 1000, 
  size = 1, 
  transition = { repeat: Infinity, duration: 50, ease: 'linear' }, 
  starColor = '#fff' 
}: StarLayerProps) {
  const [boxShadow, setBoxShadow] = React.useState<string>('');

  React.useEffect(() => {
    setBoxShadow(generateStars(count, starColor));
  }, [count, starColor]);

  return (
    <motion.div
      animate={{ y: [0, -2000] }}
      transition={transition}
      className="absolute top-0 left-0 w-full h-[2000px]"
    >
      <div
        className="absolute bg-transparent rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
      <div
        className="absolute bg-transparent rounded-full top-[2000px]"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
    </motion.div>
  );
}

// ===== MAIN STARS BACKGROUND COMPONENT =====
/**
 * StarsBackground - Interactive animated starfield
 * 
 * Features:
 * - Multiple parallax layers with different speeds
 * - Mouse parallax effect
 * - Customizable colors and animation speed
 * - Optimized for gopher blue theme
 */
export function StarsBackground({
  factor = 0.05,
  speed = 50,
  transition = { stiffness: 50, damping: 20 },
  starColor = '#00ADD8', // Gopher blue by default
  pointerEvents = true,
  className
}: StarsBackgroundProps) {
  const offsetX = useMotionValue(1);
  const offsetY = useMotionValue(1);

  const springX = useSpring(offsetX, transition);
  const springY = useSpring(offsetY, transition);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const newOffsetX = -(e.clientX - centerX) * factor;
      const newOffsetY = -(e.clientY - centerY) * factor;
      offsetX.set(newOffsetX);
      offsetY.set(newOffsetY);
    },
    [offsetX, offsetY, factor],
  );

  return (
    <div
      className={cn(
        'fixed inset-0 -z-10 overflow-hidden',
        'bg-[radial-gradient(ellipse_at_bottom,_#1a1a1a_0%,_#000_100%)]',
        className,
      )}
      onMouseMove={handleMouseMove}
      aria-hidden="true"
    >
      <motion.div
        style={{ x: springX, y: springY }}
        className={cn({ 'pointer-events-none': !pointerEvents })}
      >
        {/* Small stars - fast movement */}
        <StarLayer
          count={800}
          size={1}
          transition={{ repeat: Infinity, duration: speed, ease: 'linear' }}
          starColor={starColor}
        />
        {/* Medium stars - medium movement */}
        <StarLayer
          count={300}
          size={2}
          transition={{
            repeat: Infinity,
            duration: speed * 2,
            ease: 'linear',
          }}
          starColor={starColor}
        />
        {/* Large stars - slow movement */}
        <StarLayer
          count={150}
          size={3}
          transition={{
            repeat: Infinity,
            duration: speed * 3,
            ease: 'linear',
          }}
          starColor={starColor}
        />
      </motion.div>
    </div>
  );
}