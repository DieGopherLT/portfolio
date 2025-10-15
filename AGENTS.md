# DieGopherLT Portfolio - Technical Guidelines

A terminal-inspired portfolio website built with Next.js 15 and modern web technologies. This project combines Unix aesthetic principles with professional portfolio presentation, featuring a multilingual blog system and interactive terminal-style UI components.

This document provides complete technical guidelines for development. For project overview and user documentation, see [README.md](./README.md). For design specifications, see [docs/design_guidelines.md](./docs/design_guidelines.md).

## Quick Reference

- **Build**: `npm run build` (Next.js with Turbopack)
- **Dev**: `npm run dev` (development server with Turbopack)
- **Lint**: `npm run lint` (ESLint)
- **Start**: `npm start` (production server)
- **Project Overview**: [README.md](./README.md)
- **Design Guidelines**: [docs/design_guidelines.md](./docs/design_guidelines.md)
- **Landing Page Sections**: [docs/landing_page_sections.md](./docs/landing_page_sections.md)
- **Architecture Details**: [docs/architecture.md](./docs/architecture.md)

## Technology Stack

### Core Framework
- **Next.js 15.5.0**: App Router with Turbopack, static generation
- **React 19.1.0**: Functional components with hooks
- **TypeScript 5**: Strict type checking

### Styling & Animation
- **Tailwind CSS 4**: Utility-first styling with custom theme
- **Framer Motion 12**: Declarative animations (typing effects, transitions)
- **AOS 2.3.4**: Scroll animations
- **CLSX**: Clean conditionaal styles, prefer over template strings

### Internationalization
- **next-intl 4.3.5**: Route-based i18n with locale switching
- **Supported Locales**: English (en), Spanish (es)

### Content & Blog
- **MDX**: `next-mdx-remote` for blog content
- **gray-matter**: Frontmatter parsing
- **Shiki 3**: Syntax highlighting
- **rehype/remark plugins**: Autolink headings, slugs, GFM

### UI Components
- **lucide-react**: Icon system
- **react-hook-form**: Form handling
- **clsx + tailwind-merge**: Conditional class management

### Backend Integration
- **Telegram Bot API**: Contact form notifications

## Code Standards

### Naming Conventions

- **Components**: PascalCase (`TerminalPrompt.tsx`, `BlogSection.tsx`)
- **Hooks**: use + PascalCase (`useTypingAnimation.ts`, `useTerminalCursor.ts`)
- **Interfaces/Types**: PascalCase with suffixes (`TerminalPromptProps`, `UseTypingAnimationOptions`)
- **Functions/Variables**: camelCase (`getAllPosts()`, `displayedText`)
- **Files**: Match component/hook names exactly

### TypeScript Guidelines

- Always define explicit prop interfaces
- Use type-only imports: `import type { Metadata } from 'next'`
- Properly type async functions: `Promise<PostMetadata[]>`

### Code Style Principles

**Clean Code** (user preferences):
- Guard clauses over nested conditionals
- Extract complex conditions to variables
- Configuration objects for 3+ parameters
- Comments for technical decisions only

**Functional Programming**:
- Immutability (create copies, don't mutate)
- Functional array methods (map, filter, reduce)
- Async/await over callback hell

**React**:
- Minimize useEffect/useCallback/useMemo dependencies
- Single-responsibility components

### HTML/CSS

- **Semantic HTML**: Use `<main>`, `<section>`, `<article>` over generic `<div>`
- **Mobile-first**: Media queries with `min-width`
- **Flexbox**: For single-axis layouts
- **Z-index**: Backgrounds `fixed inset-0`, UI needs `relative z-10+`

## Project Architecture

**For detailed architecture**, see [docs/architecture.md](./docs/architecture.md)

### Key Directories

- `src/app/[locale]/` - i18n routes (landing, blog)
- `src/components/sections/` - Page sections (About, Skills, Experience, Contact)
- `src/components/layout/` - Structural components (Header, Footer, Navigation)
- `src/components/ui/` - Reusable UI (TerminalPrompt, backgrounds, etc.)
- `src/components/blog/` - Blog components (PostCard, TOC, MDXComponents)
- `src/hooks/` - Custom hooks
- `src/lib/blog/` - Blog utilities (posts.ts, mdx.ts)
- `src/i18n/` - i18n config and messages
- `content/blog/[post-id]/` - MDX content (metadata.json, en.mdx, es.mdx)

### Routing

- `/[locale]` → Landing page
- `/[locale]/blog` → Blog list
- `/[locale]/blog/[slug]` → Blog post
- `/api/telegram` → Contact form API

**i18n**: Middleware auto-redirects `/` to `/en` or `/es`

### Internationalization

**Config**: `src/i18n/config.ts` - Locales: `['en', 'es']`, default: `'en'`

**Messages**: `i18n/messages/{en,es}.json`

**Usage**: `const t = useTranslations('Section'); t('key')`

### Blog System

**Structure**: `content/blog/[post-id]/{metadata.json, en.mdx, es.mdx}`

**CRITICAL Dual-Identifier Routing**:
- `metadata.id` → Must match physical folder name
- `metadata.slug[locale]` → Public URL (can differ per language)

**Metadata Fields**: `id`, `slug{en,es}`, `title{en,es}`, `description{en,es}`, `publishedAt`, `updatedAt`, `tags[]`, `featured`, `readingTime{en,es}`

**Utilities** (`src/lib/blog/posts.ts`):
- `getAllPosts()` - All posts sorted by date
- `getPostBySlug(slug, locale)` - Load specific post
- `getRecentPosts(limit)` - N recent posts
- `getPostsByTag(tag)` - Filter by tag
- `getAllTags()` - All unique tags
- `formatDate(dateString, locale)` - Locale-aware formatting

### Background System

**AdaptiveBackground** (`src/components/ui/backgrounds/AdaptiveBackground.tsx`):
- Auto-detection: blog routes → dots, landing → stars
- Manual override: `<AdaptiveBackground type="dots" />`
- Respects `prefers-reduced-motion`
- Types: `'stars'`, `'dots'`, `'none'`

**Z-index**: Backgrounds use `fixed inset-0`, UI needs `relative z-10+`

## Common Patterns

### Terminal Typing Animation

**Usage** (`src/hooks/useTypingAnimation.ts`):
```typescript
const { displayedText, isTyping, typeText } = useTypingAnimation({
  command: 'cat about.txt',
  onTypingComplete: () => console.log('Done'),
  typingSpeed: 50,
  startDelay: 300,
  autoStart: true
});
```

**Features**: Variable speed (50 + random 30ms), 530ms cursor blink, typing/blinking states

### Terminal Prompt Component

**Usage** (`src/components/ui/TerminalPrompt.tsx`):
```typescript
<TerminalPrompt
  command="cat about.txt"
  showCursor={true}
  cursorState="typing"
  path="~/projects"
/>
```

**Output**: `diegopher@portfolio:~/projects$ ❯ cat about.txt█`

### Section Animation Sequence

**States**:
```typescript
enum AnimationState {
  IDLE, CAT_COMMAND, CAT_OUTPUT, SECOND_COMMAND, SECOND_OUTPUT, COMPLETE
}
```

**Flow**: Title fade → Prompt typing → Scroll lock → Content reveal

### Form Handling

**TUI-styled forms with react-hook-form**:
```typescript
const { register, handleSubmit, formState: { errors } } = useForm();

<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register('email', { required: true })} className="terminal-input" />
</form>
```

## Antipatterns to Address

**Spanish Comments**: Found in `src/hooks/useTypingAnimation.ts:25-29` - Gradually replace with English

```typescript
// ✗ Current: Función de typing que puede usarse tanto automáticamente como manualmente
// ✓ Target: Typing function that can be used automatically or manually
```

**Note**: Gradual improvement, not a blocker

## Development Workflows

**New Components**:
1. Create in appropriate directory (sections/, ui/, layout/)
2. Define TypeScript props interface
3. Functional component pattern
4. Export as default

**New Blog Posts**:
1. Create `content/blog/[post-id]/`
2. Add `metadata.json` (ensure `id` matches folder)
3. Create `en.mdx` and `es.mdx`
4. Rebuild to regenerate static routes

**i18n Updates**:
1. Add keys to `i18n/messages/{en,es}.json`
2. Use `useTranslations()` hook
3. Test both locales

**Style Updates**:
1. Reference design guidelines
2. Tailwind mobile-first
3. Test with `prefers-reduced-motion`

## Requirements

**Performance**: 60fps animations, optimized fonts, minimal JS footprint

**Accessibility**: Keyboard navigation, semantic HTML, `prefers-reduced-motion` support, high contrast compliance, ARIA labels

**Domain**: diegopher.dev (Cloudflare)

## Cross-References

- [README.md](./README.md) - Project overview
- [docs/design_guidelines.md](./docs/design_guidelines.md) - Design specs (colors, typography, animations, brand)
- [docs/landing_page_sections.md](./docs/landing_page_sections.md) - Section specifications
- [docs/architecture.md](./docs/architecture.md) - Component hierarchy, state management, performance

---

**Maintainability Note**: This document describes patterns and principles. Update when introducing new architectural patterns or antipatterns.
