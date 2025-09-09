# Blog Implementation Plan

## Phase 1: Core Infrastructure

1. **Install MDX dependencies**
   - @next/mdx
   - gray-matter (frontmatter parsing)
   - reading-time (reading time estimation)
   - rehype/remark plugins for TOC and syntax highlighting

2. **Create blog utilities (lib/blog/)**
   - posts.ts - Post discovery and metadata parsing
   - mdx.ts - MDX processing with plugins
   - utils.ts - Helper functions

3. **Setup directory structure**
   - Create content/blog/ directory
   - Create app/blog/ routing structure
   - Create components/blog/ directory

## Phase 2: Homepage Integration

1. **Create BlogSection.tsx**
   - Dual terminal pattern like About.tsx
   - First terminal: `cat about-blog.md` with description
   - Second terminal: `ls blog/` with recent posts as .md files
   - Animation states and typing effects

2. **Update homepage**
   - Add blog section after projects
   - Update next-intl messages for blog content

## Phase 3: Blog Pages

1. **Create dynamic routing**
   - [locale]/[slug]/page.tsx for individual posts
   - [locale]/page.tsx for blog index with inline tag filtering

2. **Implement components**
   - BlogLayout.tsx - Main blog wrapper
   - PostCard.tsx - Post previews for index
   - TableOfContents.tsx - Terminal tree-style TOC
   - TagFilter.tsx - **Inline client-side filtering component**
   - MDXComponents.tsx - Custom MDX components

## Phase 4: Content & Testing

1. **Create example posts**
   - First post with both en/es versions
   - Include images, code blocks, headings for TOC testing
   - Test metadata system

2. **Implement SEO**
   - generateMetadata for posts
   - RSS feed generation
   - Sitemap integration

## Phase 5: Optimization

1. **Performance**
   - Static generation with generateStaticParams
   - Image optimization for blog assets
   - Code splitting for blog components

2. **Accessibility**
   - Keyboard navigation for TOC
   - Screen reader support
   - Focus management

## Tag Filtering Strategy

- **No separate tag routes** - filtering happens on index pages
- TagFilter component manages client-side state
- Blog index pages ([locale]/page.tsx) handle all filtering logic
- URL state management for shareable filtered views (optional)
- Search functionality integrated with tag filtering

## Dependencies to Add

```json
{
  "@next/mdx": "^14.2.0",
  "gray-matter": "^4.0.3",
  "reading-time": "^1.5.0",
  "remark-gfm": "^4.0.0",
  "rehype-slug": "^6.0.0",
  "rehype-autolink-headings": "^7.1.0",
  "shiki": "^0.14.0"
}
```
