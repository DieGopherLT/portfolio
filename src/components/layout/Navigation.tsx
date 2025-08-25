'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useMobileMenu } from '@/contexts/MobileMenuContext';

interface NavigationProps {
  className?: string;
}

const navItems = [
  { key: 'home', href: '#hero' },
  { key: 'about', href: '#about' },
  { key: 'experience', href: '#experience' },
  { key: 'skills', href: '#skills' },
  { key: 'contact', href: '#contact' }
];

export default function Navigation({ className = "" }: NavigationProps) {
  const t = useTranslations('navigation');
  const { isMobileMenuOpen, toggleMobileMenu } = useMobileMenu();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <motion.nav 
      className={`sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-zinc-800 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          
          <div className="hidden md:flex gap-6 lg:gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className="nav-link text-sm font-medium text-text-secondary hover:text-gopher-blue transition-colors duration-200 px-2 py-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t(item.key)}
              </motion.button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden sticky top-0">
            <motion.button
              onClick={toggleMobileMenu}
              className="text-text-secondary hover:text-gopher-blue transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-mono text-sm">
                {isMobileMenuOpen ? '[close]' : '[menu]'}
              </span>
            </motion.button>
          </div>
        </div>
      </div>

    </motion.nav>
  );
}