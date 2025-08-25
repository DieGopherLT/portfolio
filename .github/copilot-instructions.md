# GitHub Copilot Instructions - DieGopherLT Portfolio

## Project Context

For project overview, see [README.md](../README.md).

For complete technical specifications and design guidelines, see [CLAUDE.md](../CLAUDE.md).

## Key Development Guidelines

### Code Style Priorities
1. **Terminal Authenticity**: Every UI element should reinforce the terminal/Unix aesthetic
2. **Performance**: Prioritize smooth 60fps animations and efficient scroll handling
3. **Accessibility**: Maintain high contrast and semantic markup while preserving terminal context
4. **Clean Code**: Follow Unix philosophy - do one thing and do it well

### Critical Design Requirements
- **Color Palette**: Pure black background (#000000), white text (#FFFFFF), gopher blue accent (#00ADD8)
- **Typography**: Monospace for terminal elements, clean sans-serif for content
- **Animations**: Realistic typing speeds (1.5-3s), authentic cursor blinking
- **Layout**: macOS terminal window frames with proper traffic light positioning

### Component Patterns
- All sections follow: title → terminal prompt → typing animation → content reveal
- Terminal windows must include authentic macOS-style title bars
- Contact section requires split terminal design (form + social links)
- Form elements should use TUI styling while maintaining standard UX

### Animation Timing
- Section title fade: 0.3s
- Scroll pause: 0.5s  
- Terminal window appear: 0.3s
- Typing duration: 1.5-3s (command dependent)
- Content reveal: 0.4s

### Accessibility Considerations
- Respect `prefers-reduced-motion` for all animations
- Maintain semantic HTML structure
- Ensure keyboard navigation works throughout
- High contrast compliance for dark theme

### Performance Targets
- Character-by-character typing rendering must be efficient
- Smooth scroll behavior with section locking during animations
- Optimized monospace font loading
- Minimal JavaScript footprint

When suggesting code, prioritize these specifications over generic solutions.