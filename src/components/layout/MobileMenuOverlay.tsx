'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSelector from '@/components/LanguageSelector';

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { key: 'home', href: '#hero' },
  { key: 'about', href: '#about' },
  { key: 'experience', href: '#experience' },
  { key: 'skills', href: '#skills' },
  { key: 'contact', href: '#contact' }
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
        behavior: 'smooth'
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
          className="md:hidden fixed bg-black/80 inset-0 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleOverlayClick}
        >
          <div className="flex p-4">
            {/* macOS Terminal Window Frame */}
            <motion.div
              className="w-[80%] bg-black rounded-lg shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Terminal Title Bar */}
              <div className="h-7 bg-zinc-700 flex items-center relative px-2 rounded-t-lg">
                {/* Traffic Lights */}
                <div className="flex space-x-2">
                  <button
                    onClick={onClose}
                    className="w-3 h-3 rounded-full bg-error-red hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
                    aria-label="Close mobile menu"
                  >
                    <span className="sr-only">Close</span>
                  </button>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"></div>
                </div>
                {/* Window Title */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <span className="text-white text-xs font-medium">mobile-menu.sh</span>
                </div>
              </div>

              {/* Terminal Content */}
              <div className="bg-black p-2">
                <div className="text-center my-2">
                  
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
                      className="block w-full text-lg font-medium text-secondary hover:text-gopher-blue transition-colors duration-200 px-4 py-2 text-left focus:outline-none focus:ring-2 focus:ring-gopher-blue focus:ring-opacity-50 rounded"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                      whileHover={{ scale: 1.02, x: 6 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="font-mono text-gopher-blue">→ </span>
                      {t(item.key)}
                    </motion.button>
                  ))}

                  {/* Language Selector */}
                  <motion.div
                    className="text-left mt-4 pt-4 border-t border-zinc-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    <LanguageSelector variant="mobile" />
                  </motion.div>

                  <motion.div 
                    className="text-xs text-left font-mono text-muted mt-6 pt-4 border-t border-zinc-800"
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