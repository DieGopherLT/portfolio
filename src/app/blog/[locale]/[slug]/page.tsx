import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/blog/posts';
import { isValidLocale, formatDate } from '@/lib/blog/utils';
import { extractTOC, MDXRemote } from '@/lib/blog/mdx';
import { MDXComponents } from '@/components/blog/MDXComponents';
import BlogLayout from '@/components/blog/BlogLayout';
import TableOfContents from '@/components/blog/TableOfContents';
import { formatReadingTime } from '@/lib/blog/utils';

interface BlogPostProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { locale, slug } = await params;
  
  // Validate locale
  if (!isValidLocale(locale)) {
    notFound();
  }

  // Get post data
  const post = await getPostBySlug(slug, locale);
  
  if (!post) {
    notFound();
  }

  const { metadata, content } = post;
  const readingTimeText = formatReadingTime(metadata.readingTime[locale], locale);

  return (
    <BlogLayout locale={locale}>
      <article className="blog-post max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Post Header */}
            <header className="post-header mb-12">
              {/* Breadcrumb */}
              <nav className="post-breadcrumb mb-6" aria-label="Breadcrumb">
                <a 
                  href={`/blog/${locale}`}
                  className="text-text-muted hover:text-gopher-blue transition-colors font-mono text-sm"
                >
                  ← {locale === 'es' ? 'Volver al blog' : 'Back to blog'}
                </a>
              </nav>

              {/* Post Title */}
              <h1 className="post-headline text-3xl md:text-4xl font-light text-white leading-tight mb-6">
                {metadata.title[locale]}
              </h1>

              {/* Post Metadata */}
              <div className="post-metadata flex flex-wrap items-center gap-4 text-text-muted font-mono text-sm">
                <time dateTime={metadata.publishedAt}>
                  {formatDate(metadata.publishedAt, locale)}
                </time>
                
                <span className="metadata-separator">•</span>
                
                <span>{readingTimeText}</span>

                {metadata.updatedAt && metadata.updatedAt !== metadata.publishedAt && (
                  <>
                    <span className="metadata-separator">•</span>
                    <span>
                      {locale === 'es' ? 'Actualizado' : 'Updated'} {formatDate(metadata.updatedAt, locale)}
                    </span>
                  </>
                )}

                {/* Tags */}
                {metadata.tags.length > 0 && (
                  <>
                    <span className="metadata-separator">•</span>
                    <div className="post-tag-list flex gap-2">
                      {metadata.tags.map(tag => (
                        <span key={tag} className="post-tag text-gopher-blue-muted">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </header>

            {/* Post Content */}
            <div className="post-content prose prose-lg max-w-none">
              <Suspense fallback={
                <div className="animate-pulse">
                  <div className="h-4 bg-bg-secondary rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-bg-secondary rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-bg-secondary rounded w-5/6 mb-4"></div>
                </div>
              }>
                <MDXRemote 
                  source={content}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [],
                      rehypePlugins: [],
                    }
                  }}
                  components={MDXComponents}
                />
              </Suspense>
            </div>
          </div>

          {/* Sidebar - Table of Contents */}
          <aside className="lg:col-span-1">
            <TableOfContents content={content} locale={locale} />
          </aside>
        </div>

        {/* Post Footer */}
        <footer className="post-footer mt-16 pt-8 border-t border-border-subtle">
          <div className="text-center text-text-muted font-mono text-sm">
            <p>
              {locale === 'es' 
                ? '¿Encontraste útil este post? '
                : 'Found this post useful? '
              }
              <a 
                href={`/${locale}#contact`}
                className="text-gopher-blue hover:text-gopher-blue-hover underline"
              >
                {locale === 'es' ? 'Hablemos' : "Let's connect"}
              </a>
            </p>
          </div>
        </footer>
      </article>
    </BlogLayout>
  );
}

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = await getAllPosts();
  const params: { locale: string; slug: string }[] = [];

  posts.forEach(post => {
    // Generate params for both locales
    params.push(
      { locale: 'en', slug: post.slug.en },
      { locale: 'es', slug: post.slug.es }
    );
  });

  return params;
}

// Generate metadata
export async function generateMetadata({ params }: BlogPostProps) {
  const { locale, slug } = await params;
  
  if (!isValidLocale(locale)) {
    return {};
  }

  const post = await getPostBySlug(slug, locale);
  
  if (!post) {
    return {};
  }

  const { metadata } = post;
  
  return {
    title: `${metadata.title[locale]} | DieGopherLT Blog`,
    description: metadata.description[locale],
    openGraph: {
      title: metadata.title[locale],
      description: metadata.description[locale],
      type: 'article',
      publishedTime: metadata.publishedAt,
      modifiedTime: metadata.updatedAt,
      authors: ['Diego López Torres'],
      tags: metadata.tags,
      locale: locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title[locale],
      description: metadata.description[locale],
    },
    alternates: {
      languages: {
        'en': `/blog/en/${metadata.slug.en}`,
        'es': `/blog/es/${metadata.slug.es}`,
      }
    }
  };
}