'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import DynamicProfilePicture from '../ui/DynamicProfilePicture';

interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
  const t = useTranslations('personal_info');

  return (
    <motion.header 
      className={`py-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Desktop Grid Layout */}
      <div className="hidden md:grid grid-cols-[1fr_auto] items-center gap-8 max-w-6xl mx-auto px-6">
        {/* Text Content - Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h1 className="text-3xl lg:text-5xl font-light text-white mb-4">
            {t('full_name')}
          </h1>
          <p className="text-xl lg:text-2xl text-secondary mb-2 font-light">
            {t('title')}
          </p>
        </motion.div>

        {/* Dynamic Profile Picture - Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <DynamicProfilePicture
            normalImageSrc="/images/profile/normal.webp"
            asciiImageSrc="/images/profile/ascii.webp"
            alt="Professional profile photo of Diego López Torres, Software Engineer, showing a friendly expression against a dark background"
            size="lg"
            priority
          />
        </motion.div>
      </div>

      {/* Mobile Stacked Layout */}
      <div className="md:hidden flex flex-col items-center gap-6 px-6">
        {/* Dynamic Profile Picture - Top on Mobile */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <DynamicProfilePicture
            normalImageSrc="/images/profile/normal.webp"
            asciiImageSrc="/images/profile/ascii.webp"
            alt="Professional profile photo of Diego López Torres, Software Engineer, showing a friendly expression against a dark background"
            size="md"
            priority
          />
        </motion.div>

        {/* Text Content - Bottom on Mobile */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl font-light text-white mb-4">
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