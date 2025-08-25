'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
  const t = useTranslations('personal_info');

  const asciiArt = `██████╗ ██╗███████╗ ██████╗  ██████╗ ██████╗ ██╗  ██╗███████╗██████╗ ██╗  ████████╗
██╔══██╗██║██╔════╝██╔════╝ ██╔═══██╗██╔══██╗██║  ██║██╔════╝██╔══██╗██║  ╚══██╔══╝
██║  ██║██║█████╗  ██║  ███╗██║   ██║██████╔╝███████║█████╗  ██████╔╝██║     ██║   
██║  ██║██║██╔══╝  ██║   ██║██║   ██║██╔═══╝ ██╔══██║██╔══╝  ██╔══██╗██║     ██║   
██████╔╝██║███████╗╚██████╔╝╚██████╔╝██║     ██║  ██║███████╗██║  ██║███████╗██║   
╚═════╝ ╚═╝╚══════╝ ╚═════╝  ╚═════╝ ╚═╝     ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝`;

  return (
    <motion.header 
      className={`py-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="text-center">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <pre className="ascii-art text-gopher-blue font-mono leading-tight overflow-x-auto whitespace-pre">
            {asciiArt}
          </pre>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4">
            {t('full_name')}
          </h1>
          <p className="text-xl sm:text-2xl text-secondary mb-2 font-light">
            {t('title')}
          </p>
        </motion.div>

      </div>
    </motion.header>
  );
}