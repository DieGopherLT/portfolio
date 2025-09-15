'use client';

import LanguageSelector from '@/components/LanguageSelector';

import Link from 'next/link';

interface BlogNavigationProps {
  locale: 'en' | 'es';
  showBackLink?: boolean;
}

export default function BlogNavigation({ locale, showBackLink = true }: BlogNavigationProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-700 bg-black/80 backdrop-blur-lg">
      <div className="mx-auto grid grid-cols-3 max-w-5xl items-center py-4">
        {/* Left side - Back Link */}
        {showBackLink && (
          <div className="justify-self-start">
            <Link
              href={`/${locale}`}
              className="font-mono text-sm text-gray-400 transition-colors hover:text-gopher-blue"
            >
              ←
            </Link>
          </div>
        )}

        {/* Center - Blog Title */}
        <div className="justify-self-center">
          <Link
            href={`/blog/${locale}`}
            className="font-mono text-lg font-light text-white transition-colors hover:text-gopher-blue"
          >
            diegopher/blog
          </Link>
        </div>

        {/* Right side - Language Switcher */}
        <div className="justify-self-end">
          <LanguageSelector className="text-sm" />
        </div>
      </div>
    </nav>
  );
}
