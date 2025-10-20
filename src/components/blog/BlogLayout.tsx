import { DotsBackground } from '@/components/ui/backgrounds';
import Footer from '@/components/layout/Footer';
import BlogNavigation from './BlogNavigation';

interface BlogLayoutProps {
  children: React.ReactNode;
  locale: 'en' | 'es';
  showBackLink?: boolean;
}

export default function BlogLayout({ children, locale, showBackLink = true }: BlogLayoutProps) {

  return (
    <div className="flex min-h-screen flex-col text-white">
      <BlogNavigation locale={locale} showBackLink={showBackLink} />
      <DotsBackground />
      <main className="flex-1 relative z-10">
        {/* Blog Content */}
        {children}
      </main>

      <Footer />
    </div>
  );
}
