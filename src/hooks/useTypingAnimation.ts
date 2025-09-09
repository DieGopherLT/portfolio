'use client';

import { useState, useEffect } from 'react';

interface UseTypingAnimationOptions {
  command: string;
  onTypingComplete?: () => void;
  typingSpeed?: number;
  startDelay?: number;
}

export function useTypingAnimation({
  command,
  onTypingComplete,
  typingSpeed = 50,
  startDelay = 300,
}: UseTypingAnimationOptions) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!command) return;

    setDisplayedText('');
    setIsTyping(true);

    let currentIndex = 0;
    const actualTypingSpeed = typingSpeed + Math.random() * 30;

    const typeText = () => {
      if (currentIndex < command.length) {
        setDisplayedText(command.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeText, actualTypingSpeed);
      } else {
        setIsTyping(false);
        onTypingComplete?.();
      }
    };

    const startTimer = setTimeout(typeText, startDelay);
    return () => clearTimeout(startTimer);
  }, [command, onTypingComplete, typingSpeed, startDelay]);

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
  };
}
