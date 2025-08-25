'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useMobileMenu } from '@/contexts/MobileMenuContext';
import LanguageSelector from '@/components/LanguageSelector';
import { Link } from '@/i18n/navigation';

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
      const offset = 80; // Height of navbar + some padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
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
        <div className="flex items-center h-16 w-full">
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex w-full">
            {/* Spacer for left side */}
            <div className="flex-1"></div>
            
            {/* Center navigation */}
            <div className="flex gap-6 lg:gap-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className="nav-link text-sm font-medium text-secondary hover:text-gopher-blue transition-colors duration-200 px-2 py-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t(item.key)}
                </motion.button>
              ))}
            </div>
            
            {/* Right side - Language selector */}
            <div className="flex-1 flex justify-end">
              <LanguageSelector variant="desktop" />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden w-full flex justify-center">
            <motion.button
              onClick={toggleMobileMenu}
              className="text-secondary hover:text-gopher-blue transition-colors duration-200"
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