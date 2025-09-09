import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface BlogLayoutProps {
  children: React.ReactNode;
  locale: 'en' | 'es';
  showBackLink?: boolean;
}

export default function BlogLayout({ children, locale, showBackLink = true }: BlogLayoutProps) {
  const t = useTranslations('common_phrases');

  return (
    <div className="blog-layout bg-bg-primary text-text-primary min-h-screen">
      {/* Blog Navigation */}
      <nav className="blog-nav border-border-subtle sticky top-0 z-50 border-b bg-black/80 backdrop-blur-lg">
        <div className="nav-container mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          {/* Back Link */}
          <div className="nav-back">
            {showBackLink && (
              <Link
                href={`/${locale}`}
                className="text-text-muted hover:text-gopher-blue font-mono text-sm transition-colors"
              >
                ← {locale === 'es' ? 'Volver al portfolio' : 'Back to portfolio'}
              </Link>
            )}
          </div>

          {/* Blog Title */}
          <div className="blog-header-title">
            <Link
              href={`/blog/${locale}`}
              className="hover:text-gopher-blue font-mono text-lg font-light text-white transition-colors"
            >
              diegopher/blog
            </Link>
          </div>

          {/* Language Switcher */}
          <div className="nav-links flex items-center gap-4">
            <Link
              href={`/blog/${locale === 'en' ? 'es' : 'en'}`}
              className="text-text-secondary hover:text-text-primary font-mono text-sm transition-colors"
            >
              {locale === 'en' ? 'ES' : 'EN'}
            </Link>
          </div>
        </div>
      </nav>

      {/* Blog Content */}
      <div className="blog-content">{children}</div>
    </div>
  );
}
