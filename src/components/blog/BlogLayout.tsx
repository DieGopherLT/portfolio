import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface BlogLayoutProps {
  children: React.ReactNode;
  locale: 'en' | 'es';
  showBackLink?: boolean;
}

export default function BlogLayout({ children, locale, showBackLink = true }: BlogLayoutProps) {
  const t = useTranslations('common_phrases');

  return (
    <div className="blog-layout min-h-screen bg-bg-primary text-text-primary">
      {/* Blog Navigation */}
      <nav className="blog-nav sticky top-0 z-50 backdrop-blur-lg bg-black/80 border-b border-border-subtle">
        <div className="nav-container max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Back Link */}
          <div className="nav-back">
            {showBackLink && (
              <Link 
                href={`/${locale}`}
                className="text-text-muted hover:text-gopher-blue transition-colors font-mono text-sm"
              >
                ← {locale === 'es' ? 'Volver al portfolio' : 'Back to portfolio'}
              </Link>
            )}
          </div>

          {/* Blog Title */}
          <div className="blog-header-title">
            <Link 
              href={`/blog/${locale}`}
              className="text-white hover:text-gopher-blue transition-colors font-mono text-lg font-light"
            >
              diegopher/blog
            </Link>
          </div>

          {/* Language Switcher */}
          <div className="nav-links flex items-center gap-4">
            <Link 
              href={`/blog/${locale === 'en' ? 'es' : 'en'}`}
              className="text-text-secondary hover:text-text-primary transition-colors text-sm font-mono"
            >
              {locale === 'en' ? 'ES' : 'EN'}
            </Link>
          </div>
        </div>
      </nav>

      {/* Blog Content */}
      <div className="blog-content">
        {children}
      </div>
    </div>
  );
}