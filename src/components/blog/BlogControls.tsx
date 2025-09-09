'use client';

import { useState } from 'react';
import { PostMetadata } from '@/lib/blog/posts';
import PostCard from '@/components/blog/PostCard';
import TagFilter from '@/components/blog/TagFilter';

interface BlogControlsProps {
  posts: PostMetadata[];
  allTags: string[];
  locale: 'en' | 'es';
}

export default function BlogControls({ posts, allTags, locale }: BlogControlsProps) {
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const handleFilteredPosts = (newPosts: PostMetadata[]) => {
    setFilteredPosts(newPosts);
  };

  return (
    <>
      {/* Filter Controls */}
      <TagFilter 
        posts={posts}
        allTags={allTags}
        locale={locale}
        onFilteredPosts={handleFilteredPosts}
      />

      {/* Posts List */}
      <div className="posts-list">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <PostCard 
              key={post.id}
              post={post}
              locale={locale}
              index={index}
            />
          ))
        ) : (
          <div className="no-posts text-center py-12">
            <div className="text-text-muted font-mono text-lg mb-4">
              {locale === 'es' ? 'No se encontraron posts' : 'No posts found'}
            </div>
            <div className="text-text-muted text-sm">
              {locale === 'es' 
                ? 'Prueba ajustando los filtros o vuelve más tarde.'
                : 'Try adjusting your filters or check back later.'
              }
            </div>
          </div>
        )}
      </div>
    </>
  );
}