'use client';

import LanguageSelector from '@/components/LanguageSelector';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { key: 'home', href: '#hero' },
  { key: 'about', href: '#about' },
  { key: 'experience', href: '#experience' },
  { key: 'skills', href: '#skills' },
  { key: 'blog', href: '#blog' },
  { key: 'contact', href: '#contact' },
];

export default function MobileMenuOverlay({ isOpen, onClose }: MobileMenuOverlayProps) {
  const t = useTranslations('navigation');

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 40; // Height of navbar + some padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Close menu when clicking on the backdrop (not the terminal window)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black/80 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleOverlayClick}
        >
          <div className="flex p-4">
            {/* macOS Terminal Window Frame */}
            <motion.div
              className="w-[80%] rounded-lg bg-black shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {/* Terminal Title Bar */}
              <div className="relative flex h-7 items-center rounded-t-lg bg-zinc-700 px-2">
                {/* Traffic Lights */}
                <div className="flex space-x-2">
                  <button
                    onClick={onClose}
                    className="bg-error-red h-3 w-3 rounded-full transition-colors hover:bg-red-600 focus:ring-2 focus:ring-red-300 focus:outline-none"
                    aria-label="Close mobile menu"
                  >
                    <span className="sr-only">Close</span>
                  </button>
                  <div className="h-3 w-3 rounded-full bg-yellow-500 transition-colors hover:bg-yellow-600"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500 transition-colors hover:bg-green-600"></div>
                </div>
                {/* Window Title */}
                <div className="absolute left-1/2 -translate-x-1/2 transform">
                  <span className="text-xs font-medium text-white">mobile-menu.sh</span>
                </div>
              </div>

              {/* Terminal Content */}
              <div className="bg-black p-2">
                <div className="my-2 text-center">
                  {/* Language Selector */}
                  {/* <motion.div
                    className="text-left mb-4 pb-4 border-b border-zinc-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    <LanguageSelector variant="mobile" />
                  </motion.div> */}

                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.key}
                      onClick={() => scrollToSection(item.href)}
                      className="text-secondary hover:text-gopher-blue focus:ring-gopher-blue focus:ring-opacity-50 block w-full rounded px-4 py-2 text-left text-lg font-medium transition-colors duration-200 focus:ring-2 focus:outline-none"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                      whileHover={{ scale: 1.02, x: 6 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-gopher-blue font-mono">→ </span>
                      {t(item.key)}
                    </motion.button>
                  ))}

                  {/* Language Selector */}
                  <motion.div
                    className="mt-4 border-t border-zinc-800 pt-4 text-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    <LanguageSelector variant="mobile" />
                  </motion.div>

                  <motion.div
                    className="text-muted mt-6 border-t border-zinc-800 pt-4 text-left font-mono text-xs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <span className="text-gopher-blue">tip:</span> tap outside to close
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
