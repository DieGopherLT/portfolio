import Link from 'next/link';

interface BlogNavigationProps {
  locale: 'en' | 'es';
  showBackLink?: boolean;
}

export default function BlogNavigation({ locale, showBackLink = true }: BlogNavigationProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-700 bg-black/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Back Link */}
        <div>
          {showBackLink && (
            <Link
              href={`/${locale}`}
              className="font-mono text-sm text-gray-400 transition-colors hover:text-gopher-blue"
            >
              ← {locale === 'es' ? 'Volver al portfolio' : 'Back to portfolio'}
            </Link>
          )}
        </div>

        {/* Blog Title */}
        <div>
          <Link
            href={`/blog/${locale}`}
            className="font-mono text-lg font-light text-white transition-colors hover:text-gopher-blue"
          >
            diegopher/blog
          </Link>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-4">
          <Link
            href={`/blog/${locale === 'en' ? 'es' : 'en'}`}
            className="font-mono text-sm text-gray-300 transition-colors hover:text-white"
          >
            {locale === 'en' ? 'ES' : 'EN'}
          </Link>
        </div>
      </div>
    </nav>
  );
}