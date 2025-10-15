'use client';

import { useCallback, useEffect, useState } from 'react';

interface UseTypingAnimationOptions {
  command?: string;
  onTypingComplete?: () => void;
  typingSpeed?: number;
  startDelay?: number;
  autoStart?: boolean;
}

export function useTypingAnimation({
  command = '',
  onTypingComplete,
  typingSpeed = 50,
  startDelay = 300,
  autoStart = true,
}: UseTypingAnimationOptions = {}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  /**
   * Función de typing que puede usarse tanto automáticamente como manualmente
   * @param text - El texto a escribir
   * @param setter - Setter opcional para actualizar estado externo
   * @returns Promise que se resuelve cuando termina de escribir
   */
  const typeText = useCallback(
    (text: string, setter?: (value: string) => void): Promise<void> => {
      return new Promise(resolve => {
        const targetSetter = setter || setDisplayedText;
        targetSetter('');
        setIsTyping(true);

        let currentIndex = 0;
        const actualTypingSpeed = typingSpeed + Math.random() * 30;

        const typeChar = () => {
          if (currentIndex < text.length) {
            targetSetter(text.slice(0, currentIndex + 1));
            currentIndex++;
            setTimeout(typeChar, actualTypingSpeed);
          } else {
            setIsTyping(false);
            resolve();
            onTypingComplete?.();
          }
        };

        typeChar();
      });
    },
    [typingSpeed, onTypingComplete]
  );

  // Auto-start solo si autoStart=true y hay comando
  useEffect(() => {
    if (!command || !autoStart) return;

    const startTimer = setTimeout(() => {
      typeText(command);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [command, autoStart, startDelay, typeText]);

  // Cursor parpadeante
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return {
    displayedText,
    isTyping,
    showCursor,
    typeText,
  };
}
