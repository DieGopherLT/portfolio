'use client';

import { motion } from 'framer-motion';

interface TerminalFooterProps {
  path?: string;
  className?: string;
}

export default function TerminalFooter({
  path = "~",
  className = ""
}: TerminalFooterProps) {
  return (
    <motion.div 
      className={`terminal-footer ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="terminal-line">
        <span className="terminal-prompt">
          <span className='text-[#58c5a4]'>diegopher</span>
          <span className='text-white'>@</span>
          <span className='text-gopher-blue'>portfolio</span>
          <span className='text-white'>:</span>
          <span className='text-white'>{path}</span>
          <span className='text-white'>$</span>
        </span>
      </div>
      <div className="terminal-line terminal-continuation">
        <span className="terminal-chevron">
          <span className='text-[#58c5a4]'>❯</span>
        </span>
        <span className="terminal-cursor-only">
          <motion.span 
            className="terminal-cursor"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ 
              duration: 1.06,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            █
          </motion.span>
        </span>
      </div>
    </motion.div>
  );
}
