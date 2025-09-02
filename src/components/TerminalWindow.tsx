'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useTypingAnimation } from '@/hooks/useTypingAnimation';
import TerminalPrompt from '@/components/ui/TerminalPrompt';

interface TerminalWindowProps {
  title?: string;
  command: string;
  isVisible?: boolean;
  onTypingComplete?: () => void;
  className?: string;
}

export default function TerminalWindow({
  title = "diegopher@portfolio: ~",
  command,
  isVisible = true,
  onTypingComplete,
  className = ""
}: TerminalWindowProps) {
  const { displayedText } = useTypingAnimation({
    command,
    shouldStart: isVisible,
    onTypingComplete
  });

  return (
    <motion.div 
      className={clsx('terminal-window', className)}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="terminal-header">
        <div className="traffic-lights">
          <motion.div 
            className="traffic-light close"
            whileHover={{ scale: 1.1 }}
          />
          <motion.div 
            className="traffic-light minimize"
            whileHover={{ scale: 1.1 }}
          />
          <motion.div 
            className="traffic-light maximize"
            whileHover={{ scale: 1.1 }}
          />
        </div>
        <div className="window-title">{title}</div>
      </div>
      
      <div className="terminal-content">
        <TerminalPrompt
          command={displayedText}
          showCursor={true}
          cursorState="blinking"
        />
      </div>
    </motion.div>
  );
}