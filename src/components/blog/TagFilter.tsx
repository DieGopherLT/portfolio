'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PostMetadata } from '@/lib/blog/posts';
import { searchPosts, filterPostsByTag } from '@/lib/blog/utils';

interface TagFilterProps {
  posts: PostMetadata[];
  locale: 'en' | 'es';
  onFilteredPosts: (posts: PostMetadata[]) => void;
  allTags: string[];
}

export default function TagFilter({ posts, locale, onFilteredPosts, allTags }: TagFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredPosts, setFilteredPosts] = useState(posts);

  // Apply filters whenever search or tags change
  useEffect(() => {
    let result = posts;

    // Apply search filter
    if (searchQuery.trim()) {
      result = searchPosts(result, searchQuery, locale);
    }

    // Apply tag filters
    if (selectedTags.length > 0) {
      result = result.filter(post => 
        selectedTags.every(tag => post.tags.includes(tag))
      );
    }

    setFilteredPosts(result);
    onFilteredPosts(result);
  }, [posts, searchQuery, selectedTags, locale, onFilteredPosts]);

  // Handle tag toggle
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };

  const hasActiveFilters = searchQuery.trim() || selectedTags.length > 0;

  return (
    <div className="blog-controls mb-8 pb-6 border-b border-border-subtle">
      {/* Search Input */}
      <div className="search-container mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder={locale === 'es' ? 'Buscar posts...' : 'Search posts...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input w-full px-4 py-3 bg-bg-secondary border border-border-subtle rounded-md text-text-primary font-mono text-sm placeholder:text-text-muted focus:outline-none focus:border-gopher-blue focus:ring-1 focus:ring-gopher-blue/20"
          />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <span className="text-text-muted font-mono text-xs">
              {filteredPosts.length}/{posts.length}
            </span>
          </div>
        </div>
      </div>

      {/* Tag Filters */}
      <div className="tag-filters">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-text-muted font-mono text-sm">
            {locale === 'es' ? 'Filtrar por:' : 'Filter by:'}
          </span>
          
          {allTags.map(tag => (
            <motion.button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`tag-filter px-3 py-1.5 rounded-md font-mono text-xs border transition-all duration-200 ${
                selectedTags.includes(tag)
                  ? 'bg-gopher-blue border-gopher-blue text-bg-primary'
                  : 'bg-transparent border-border-subtle text-text-secondary hover:border-gopher-blue hover:text-gopher-blue'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              #{tag}
            </motion.button>
          ))}
        </div>

        {/* Clear Filters */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2 text-sm">
                <span className="text-text-muted font-mono">
                  {locale === 'es' ? 'Mostrando' : 'Showing'} {filteredPosts.length} {locale === 'es' ? 'de' : 'of'} {posts.length} posts
                </span>
                {selectedTags.length > 0 && (
                  <span className="text-gopher-blue font-mono">
                    • {selectedTags.length} {locale === 'es' ? 'tags activos' : 'active tags'}
                  </span>
                )}
              </div>
              
              <button
                onClick={clearFilters}
                className="clear-filters text-text-muted hover:text-gopher-blue font-mono text-sm underline transition-colors"
              >
                {locale === 'es' ? 'Limpiar filtros' : 'Clear filters'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}