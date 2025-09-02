'use client';

import { useEffect, useState, useRef } from 'react';

interface UseAOSVisibilityOptions {
  threshold?: number;
  offset?: number;
}

export function useAOSVisibility(options: UseAOSVisibilityOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  
  const { threshold = 0.3, offset = 100 } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold,
        rootMargin: `0px 0px -${offset}px 0px`
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, offset]);

  return {
    ref: elementRef,
    isVisible
  };
}
