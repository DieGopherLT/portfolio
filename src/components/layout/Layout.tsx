'use client';

import Navigation from './Navigation';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className = "" }: LayoutProps) {
  return (
    <div className={`min-h-screen bg-bg-primary text-text-primary ${className}`}>
      <Navigation />
      
      <main className="flex flex-col w-full min-h-screen">
        <Header />
        <div className='flex-1'>
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
}