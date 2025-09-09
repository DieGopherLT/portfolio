import BlogControls from '@/components/blog/BlogControls';
import BlogLayout from '@/components/blog/BlogLayout';
import { getAllPosts, getAllTags } from '@/lib/blog/posts';
import { isValidLocale } from '@/lib/blog/utils';

import { redirect } from 'next/navigation';

interface BlogIndexProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogIndex({ params }: BlogIndexProps) {
  const { locale } = await params;

  // Validate locale
  if (!isValidLocale(locale)) {
    redirect('/blog/en');
  }

  // Get all posts and tags
  const posts = await getAllPosts();
  const allTags = await getAllTags();

  return (
    <BlogLayout locale={locale}>
      <div className="blog-index mx-auto max-w-4xl px-6 py-12">
        {/* Blog Header */}
        <header className="blog-header mb-12">
          <h1 className="blog-title mb-4 font-mono text-4xl font-light text-white md:text-5xl">
            <span className="text-gopher-blue">$</span> {locale === 'es' ? 'Blog Personal' : 'Personal Blog'}
          </h1>
          <p className="blog-description text-text-secondary max-w-2xl text-lg leading-relaxed">
            {locale === 'es'
              ? 'Insights técnicos, experiencias de desarrollo y reflexiones sobre arquitectura de software. Una inmersión profunda en la filosofía Unix y las prácticas de desarrollo modernas.'
              : 'Technical insights, development experiences, and thoughts about software architecture. A deeper dive into the Unix philosophy and modern development practices.'}
          </p>
        </header>

        {/* Blog Controls - Client Component */}
        <BlogControls posts={posts} allTags={allTags} locale={locale} />
      </div>
    </BlogLayout>
  );
}

// Generate static params for locales
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}
