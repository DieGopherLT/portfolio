# Blog Architecture - DieGopherLT Portfolio

## Overview

Sistema de blog integrado al portfolio con estética Unix-minimalista, MDX support y entradas autocontenidas.

## File Structure

### Content Organization

```
content/blog/
├── mi-primer-post/
│   ├── en.mdx           # English version
│   ├── es.mdx           # Spanish version
│   ├── assets/          # Images and resources
│   │   └── cover.png
│   └── metadata.json    # Multilingual metadata
└── second-post/
    ├── en.mdx
    ├── es.mdx
    ├── assets/
    └── metadata.json
```

### Code Organization

```
src/
├── app/blog/
│   ├── [locale]/
│   │   ├── [slug]/page.tsx       # Individual posts
│   │   └── page.tsx              # Blog index with inline tag filtering
│   └── layout.tsx                # Blog layout
├── components/blog/
│   ├── BlogSection.tsx           # Homepage section
│   ├── BlogLayout.tsx
│   ├── PostCard.tsx
│   ├── TableOfContents.tsx       # TOC terminal
│   ├── TagFilter.tsx             # Inline filtering component
│   └── MDXComponents.tsx
└── lib/blog/
    ├── posts.ts                  # Posts API
    ├── mdx.ts                    # MDX processor
    └── utils.ts                  # Utilities
```

## Metadata Schema

```json
{
  "id": "post-id",
  "slug": {
    "en": "english-slug",
    "es": "slug-español"
  },
  "title": {
    "en": "English Title",
    "es": "Título en Español"
  },
  "description": {
    "en": "English description",
    "es": "Descripción en español"
  },
  "publishedAt": "2024-01-15",
  "updatedAt": "2024-01-16",
  "tags": ["react", "nextjs", "typescript"],
  "featured": false,
  "readingTime": {
    "en": 5,
    "es": 6
  }
}
```

## Routing Strategy

- `/blog/en/my-first-post` - English posts
- `/blog/es/mi-primer-post` - Spanish posts
- `/blog/en` - English blog index with inline tag filtering
- `/blog/es` - Spanish blog index with inline tag filtering

## Tag Filtering

- **Client-side inline filtering** on blog index pages
- No separate routes for tags - filters applied to existing page
- TagFilter component manages state and UI
- Blog index page acts as true index with all filtering capabilities

## Key Features

- Autocontained blog entries (no external dependencies)
- Multilingual support with separate files
- Terminal-style TOC with tree command simulation
- Client-side tag-based filtering system on index pages
- Reading time estimation per language
- Unix-minimalista aesthetic consistency

## Integration Points

- Homepage blog section with dual terminal (About.tsx pattern)
- next-intl for UI translations (not content)
- Framer Motion for animations
- MDX for rich content with React components
