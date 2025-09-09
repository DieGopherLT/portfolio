import Link from 'next/link';
import { motion } from 'framer-motion';
import { PostMetadata } from '@/lib/blog/posts';
import { generatePostUrl, formatReadingTime } from '@/lib/blog/utils';

interface PostCardProps {
  post: PostMetadata;
  locale: 'en' | 'es';
  index?: number;
}

export default function PostCard({ post, locale, index = 0 }: PostCardProps) {
  const postUrl = generatePostUrl(post, locale);
  const readingTimeText = formatReadingTime(post.readingTime[locale], locale);

  // Format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.article
      className="post-card group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        ease: "easeOut" 
      }}
      whileHover={{ x: 4 }}
    >
      <div className="post-card-content py-8 border-b border-border-subtle transition-all duration-200">
        {/* Post Date */}
        <time 
          dateTime={post.publishedAt}
          className="post-date block text-text-muted font-mono text-sm mb-2"
        >
          {formatDate(post.publishedAt)}
        </time>

        {/* Post Title */}
        <h2 className="post-title text-2xl font-light mb-4 leading-tight">
          <Link 
            href={postUrl}
            className="text-text-primary hover:text-gopher-blue transition-colors group-hover:text-gopher-blue"
          >
            {post.title[locale]}
          </Link>
        </h2>

        {/* Post Excerpt */}
        <p className="post-excerpt text-text-secondary leading-relaxed mb-4">
          {post.description[locale]}
        </p>

        {/* Post Meta */}
        <div className="post-meta flex justify-between items-center">
          {/* Reading Time */}
          <span className="reading-time text-text-muted font-mono text-sm">
            {readingTimeText}
          </span>

          {/* Tags */}
          <div className="post-tags flex gap-2">
            {post.tags.slice(0, 3).map(tag => (
              <span 
                key={tag}
                className="tag text-gopher-blue-muted font-mono text-sm"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="tag text-text-muted font-mono text-sm">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Featured Badge */}
        {post.featured && (
          <div className="featured-badge mt-3">
            <span className="inline-flex items-center gap-1 text-warning-yellow font-mono text-xs">
              <span className="text-warning-yellow">★</span>
              {locale === 'es' ? 'Destacado' : 'Featured'}
            </span>
          </div>
        )}
      </div>
    </motion.article>
  );
}