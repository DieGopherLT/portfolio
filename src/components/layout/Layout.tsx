'use client';

import Navigation from './Navigation';
import Header from './Header';
import Footer from './Footer';
import MobileMenuOverlay from './MobileMenuOverlay';
import { MobileMenuProvider, useMobileMenu } from '@/contexts/MobileMenuContext';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

function LayoutContent({ children, className = "" }: LayoutProps) {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useMobileMenu();

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      offset: 100,
      easing: 'ease-out'
    });
  }, []);

  return (
    <div className={`min-h-screen bg-primary text-white ${className}`}>
      <Navigation />
      
      <main className="flex flex-col w-full min-h-screen">
        <Header />
        <div className='flex-1'>
          {children}
        </div>
        <Footer />
      </main>

      {/* Mobile menu overlay - completely outside the sticky nav */}
      <MobileMenuOverlay 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </div>
  );
}

export default function Layout({ children, className = "" }: LayoutProps) {
  return (
    <MobileMenuProvider>
      <LayoutContent className={className}>
        {children}
      </LayoutContent>
    </MobileMenuProvider>
  );
}