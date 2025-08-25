'use client';

import { motion } from 'framer-motion';

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      className={`mt-4 py-8 border-t border-zinc-800 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl">
          {/* Copyright */}
          <div className="text-muted text-sm">
            © {currentYear} Diego López Torres
          </div>
        </div>
      </div>
    </motion.footer>
  );
}