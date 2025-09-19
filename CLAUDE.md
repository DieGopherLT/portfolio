# Claude Code Context - DieGopherLT Portfolio

> For project overview, see @README.md  
> For complete design guidelines, see @docs/design_guidelines.md

## Landing Page Architecture

For detailed section specifications and content structure, see [docs/landing_page_sections.md](docs/landing_page_sections.md).

## Design & Visual Standards

For complete design specifications including:

- Color palette and typography
- Terminal window design patterns
- Animation timing and interactions
- Brand personality guidelines
- Implementation requirements
- Development implementation guidelines

See @docs/design_guidelines.md

## Technical Implementation

## Internationalization

- See @i18n/ to find all related files.
- @i18n/messages/en.json for English texts.
- @i18n/messages/es.json for Spanish texts.

## Blog System Architecture

### Routing Structure

The blog uses Next.js App Router with dynamic multilingual routing:

```
/src/app/[locale]/blog/[slug]/page.tsx
```

This generates routes like:
- `/en/blog/portfolio-development-process`
- `/es/blog/proceso-desarrollo-portfolio`

### Content Organization

```
content/blog/
└── [post-id]/                  # Physical folder (must match metadata.id)
    ├── metadata.json           # Multilingual metadata
    ├── en.mdx                 # English content
    └── es.mdx                 # Spanish content
```

### Metadata Structure

Each post requires a `metadata.json` file with:

```json
{
  "id": "folder-name",          // CRITICAL: Must match physical folder name
  "slug": {
    "en": "english-url-slug",   // Public URL for English version
    "es": "spanish-url-slug"    // Public URL for Spanish version (can be different)
  },
  "title": {
    "en": "English Title",
    "es": "Título en Español"
  },
  "description": {
    "en": "English description",
    "es": "Descripción en español"
  },
  "publishedAt": "YYYY-MM-DD",
  "updatedAt": "YYYY-MM-DD",
  "tags": ["tag1", "tag2"],
  "featured": true|false,
  "readingTime": {
    "en": 5,                   // Minutes for English version
    "es": 5                    // Minutes for Spanish version
  }
}
```

### Key Routing Rules

1. **`id` field**: Must exactly match the physical folder name in `content/blog/`
2. **`slug` fields**: Define the public URLs and can be completely different between languages
3. **Static Generation**: All routes are pre-generated at build time via `generateStaticParams()`

### URL Resolution Flow

1. User visits `/es/blog/proceso-desarrollo-portfolio`
2. Next.js extracts: `locale="es"`, `slug="proceso-desarrollo-portfolio"`
3. `getPostBySlug()` finds post where `metadata.slug.es === "proceso-desarrollo-portfolio"`
4. Uses `metadata.id` to load content from `content/blog/[id]/es.mdx`
5. Renders page with Spanish content and metadata

### SEO & Language Support

- Each language version gets its own URL for optimal SEO
- `generateMetadata()` creates language-specific meta tags
- `alternates.languages` links between language versions
- Supports completely different slug naming conventions per language

### Frontend Stack

- Modern JavaScript framework (choice flexible)
- CSS with careful monospace handling
- CSS keyframes and intersection observer for animations

### Performance Considerations

- Efficient character-by-character rendering for typing animations
- Smooth section transitions
- Optimize monospace fonts loading
- Smooth 60fps animations mandatory

### Accessibility

- Full keyboard navigation support
- Semantic markup with terminal context
- Respect reduced motion settings
- High contrast dark theme compliance

### Background System

#### AdaptiveBackground Component
- Smart background system that automatically detects appropriate background type based on route
- `src/components/ui/backgrounds/AdaptiveBackground.tsx` - Main wrapper component
- Supports manual override with `type` prop or auto-detection based on pathname
- Respects `prefers-reduced-motion` (falls back to dots when motion is reduced)
- Available types: `'stars'`, `'dots'`, `'none'`

#### DotsBackground Component  
- `src/components/ui/backgrounds/DotsBackground.tsx` - Minimal terminal-aesthetic background
- Uses `fixed inset-0` positioning with radial gradient dots pattern
- **CRITICAL Z-INDEX CONSIDERATION**: Background uses `fixed` positioning which can overlay content
- **Solution**: UI elements that need to appear above background must use `relative z-10` or higher
- Example: Header mobile layout requires `relative z-10` to appear above background

#### Z-Index Guidelines
- Background components: z-index 0 (default)
- UI content above background: `relative z-10` minimum
- Navigation and overlays: higher z-index as needed
- Always test mobile layouts for background overlap issues

## Domain related

- Domain was bought on Cloudflare.
- Domain is 'diegopher.dev'
