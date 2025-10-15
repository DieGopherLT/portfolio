# Claude Code Context - DieGopherLT Portfolio

> **Project Overview**: See @README.md
> **Complete Technical Guidelines**: See @AGENTS.md
> **Design Guidelines**: See @docs/design_guidelines.md
> **Landing Page Sections**: See @docs/landing_page_sections.md
> **Architecture Details**: See @docs/architecture.md

## Quick Reference

- **Domain**: diegopher.dev (Cloudflare)
- **Build**: `npm run build`
- **Dev**: `npm run dev`
- **Tech Stack**: Next.js 15 + React 19 + TypeScript + Tailwind CSS 4
- **i18n**: @i18n/messages/en.json and @i18n/messages/es.json

## Critical Architecture Notes

### Blog System Routing (Complex)

**CRITICAL**: The blog uses a dual-identifier system:
- `metadata.id` → Physical folder name in `content/blog/[id]/`
- `metadata.slug.[locale]` → Public URL slug (can differ between languages)

**Example**:
- Folder: `content/blog/zero-to-portfolio/`
- English URL: `/en/blog/from-zero-to-portfolio`
- Spanish URL: `/es/blog/de-cero-a-portfolio`

The `id` MUST match the folder name. Slugs can be completely different per language.

**For complete blog system details**, see @AGENTS.md under "Blog System Architecture".

### Background System Z-Index (Common Gotcha)

**CRITICAL**: `AdaptiveBackground` and `DotsBackground` use `fixed inset-0` positioning.

**Solution**: UI elements that need to appear above background MUST use `relative z-10` or higher.

**Common issue**: Mobile navigation overlays disappearing behind background.

**For complete background system details**, see @AGENTS.md under "Background System".
