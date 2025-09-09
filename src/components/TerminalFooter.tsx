'use client';

import { motion } from 'framer-motion';
import TerminalPrompt from '@/components/ui/TerminalPrompt';

interface TerminalFooterProps {
  path?: string;
  className?: string;
}

export default function TerminalFooter({ path = '~', className = '' }: TerminalFooterProps) {
  return (
    <motion.div
      className={`terminal-footer ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <TerminalPrompt showCursor={true} cursorState="blinking" path={path} />
    </motion.div>
  );
}
