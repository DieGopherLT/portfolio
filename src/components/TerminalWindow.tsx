'use client';

import { motion } from 'framer-motion';
import { useTypingAnimation } from '@/hooks/useTypingAnimation';

interface TerminalWindowProps {
  title?: string;
  command: string;
  onTypingComplete?: () => void;
  className?: string;
}

export default function TerminalWindow({
  title = "diegopher@portfolio: ~",
  command,
  onTypingComplete,
  className = ""
}: TerminalWindowProps) {
  const { displayedText, showCursor } = useTypingAnimation({
    command,
    onTypingComplete
  });

  return (
    <motion.div 
      className={`terminal-window ${className}`}
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
        <div className="terminal-line">
          <span className="terminal-prompt">
            <span className='text-[#58c5a4]'>diegopher</span>
            <span className='text-white'>@</span>
            portfolio:~$
          </span>
        </div>
        <div className="terminal-line terminal-continuation">
          <span className="terminal-chevron">
            <span className='text-[#58c5a4]'>❯</span>
          </span>
          <span className="terminal-command">
            {displayedText}
            <motion.span 
              className="terminal-cursor"
              animate={{ opacity: showCursor ? 1 : 0 }}
              transition={{ duration: 0.1 }}
            >
              █
            </motion.span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}