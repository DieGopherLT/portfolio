import { ClientBackgroundWrapper } from '@/components/ui/ClientBackgroundWrapper';
import Footer from '@/components/layout/Footer';

import Link from 'next/link';

interface BlogLayoutProps {
  children: React.ReactNode;
  locale: 'en' | 'es';
  showBackLink?: boolean;
}

export default function BlogLayout({ children, locale, showBackLink = true }: BlogLayoutProps) {

  return (
    <div className="blog-layout text-white min-h-screen">
      {/* Blog Navigation */}
      <nav className="blog-nav sticky top-0 z-50 border-b border-gray-700 bg-black/80 backdrop-blur-lg">
        <div className="nav-container mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          {/* Back Link */}
          <div className="nav-back">
            {showBackLink && (
              <Link
                href={`/${locale}`}
                className="text-gray-400 hover:text-[#00ADD8] font-mono text-sm transition-colors"
              >
                ← {locale === 'es' ? 'Volver al portfolio' : 'Back to portfolio'}
              </Link>
            )}
          </div>

          {/* Blog Title */}
          <div className="blog-header-title">
            <Link
              href={`/blog/${locale}`}
              className="hover:text-[#00ADD8] font-mono text-lg font-light text-white transition-colors"
            >
              diegopher/blog
            </Link>
          </div>

          {/* Language Switcher */}
          <div className="nav-links flex items-center gap-4">
            <Link
              href={`/blog/${locale === 'en' ? 'es' : 'en'}`}
              className="text-gray-300 hover:text-white font-mono text-sm transition-colors"
            >
              {locale === 'en' ? 'ES' : 'EN'}
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex min-h-screen w-full flex-col">
        {/* Blog Content */}
        <ClientBackgroundWrapper type="stars">
          <div className="blog-content relative flex-1">{children}</div>
        </ClientBackgroundWrapper>
        
        <Footer />
      </main>
    </div>
  );
}
