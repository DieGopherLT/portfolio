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
