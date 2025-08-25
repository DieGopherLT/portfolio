# DynamicProfilePicture Component - Development Prompt

## Component Overview

Create a **DynamicProfilePicture** React component that displays a dynamic transition between three states:
1. **Normal photo** (1-1.5 seconds)
2. **ASCII art version** (1-1.5 seconds)  
3. **Diagonal split** showing half normal/half ASCII (2-3 seconds)

This component will be integrated into the existing **Header** component in `src/components/layout/Header.tsx`.

## Technical Requirements

### Core Functionality
- **Automatic cycling** through the three image states
- **Quick glitch/monitor-losing-signal transitions** between states (duration: ~100-200ms)
- **Smooth infinite loop** that restarts after the split state
- **Performance optimized** with proper image preloading and caching
- **Mobile responsive** with appropriate sizing

### Visual Requirements
- **Split state**: Diagonal division using CSS `clip-path` 
- **Transition effects**: Monitor flicker/signal loss aesthetic (not generic glitch)
- **Size**: Fixed dimensions maintaining image aspect ratio (400×539px source)
  - Desktop: 120px × 162px
  - Mobile: 80px × 108px
- **Shape**: Rectangular with rounded corners (not circular) to preserve portrait proportions
- **Position**: Should integrate seamlessly into the Header component layout

### Animation Timing
```javascript
const TIMINGS = {
  normal: 1500,        // 1.5 seconds
  ascii: 1500,         // 1.5 seconds  
  split: 2500,         // 2.5 seconds
  transition: 150      // Quick flicker transition
};
```

## File Structure

Create the following files:
```
src/components/ui/DynamicProfilePicture/
├── index.ts
├── DynamicProfilePicture.tsx
├── DynamicProfilePicture.module.css
└── hooks/
    └── useDynamicProfilePicture.ts
```

## Component Props Interface

```typescript
interface DynamicProfilePictureProps {
  normalImageSrc: string;
  asciiImageSrc: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  isPaused?: boolean; // For accessibility/reduced motion
}
```

## CSS Requirements

### Class Prefix
- **ALL CSS classes must use the prefix `dpp-`** (DynamicProfilePicture)
- Example: `.dpp-container`, `.dpp-image`, `.dpp-transition-effect`

### Key Styles Needed
- **Container**: Circular clipping, proper aspect ratio maintenance
- **Image layers**: Absolute positioning for seamless transitions  
- **Clip-path**: Diagonal split (45-degree angle recommended)
- **Transition effects**: Monitor flicker, scan lines, brief static
- **Responsive**: Breakpoints for mobile/tablet/desktop sizing

### Performance Considerations
- Use `transform3d(0,0,0)` to trigger hardware acceleration
- Implement `will-change` property during transitions only
- Optimize transition durations for 60fps performance

## Animation Strategy

### State Management
Use a custom hook `useDynamicProfilePicture` that manages:
- Current active state (normal/ascii/split)
- Transition timing
- Preloading status
- Pause/resume functionality

### Transition Effects
Implement monitor-losing-signal effect with:
- **CSS Filter animations** for smooth color-to-grayscale transitions
- **Scanline overlay** with subtle gopher-blue tint during state changes  
- **Monitor flicker** using opacity and brightness manipulation
- **Subtle hue rotation** during corruption phase for digital artifact feel
- **Enhanced contrast** in B&W state to make ASCII details pop
- Quick duration (100-200ms max)

### Split State Implementation
- Use CSS `clip-path: polygon()` for the diagonal division
- **Top-left triangle**: normal image with full color (`filter: none`)
- **Bottom-right triangle**: ASCII image with B&W filter (`filter: grayscale(100%) contrast(1.3)`)
- Smooth clip-path animation when entering/exiting split state
- **Dramatic visual contrast** between color and monochrome halves

## Integration Requirements

### Header Component Integration
- **Desktop Layout**: Grid layout with text content (left) and DynamicProfilePicture (right)
- **Mobile Layout**: Stacked layout with DynamicProfilePicture on top, then text content below
- Replace the existing ASCII art area with the profile picture component
- Maintain the current responsive layout structure
- Preserve the gopher-blue color scheme (#00ADD8)
- Work with the existing Framer Motion animations

### Layout Specifications
```css
/* Desktop Grid */
.dpp-header-grid {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 2rem;
}

/* Mobile Stack */
@media (max-width: 768px) {
  .dpp-header-grid {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  
  .dpp-photo-first {
    order: -1; /* Ensure photo appears first in mobile */
  }
}
```

### Image Assets
- **Location**: Store images in `public/images/profile/` directory
- **Normal photo**: `normal.webp` (optimized from 2,765 × 3,740px source, aspect ratio 0.74)
- **ASCII photo**: `ascii.webp` (optimized from 400 × 539px source, matching aspect ratio 0.74) - **Keep in color**
- **Format**: WebP recommended for optimal performance and quality
- **Optimization**: Next.js will handle automatic optimization when served from public/
- **Critical**: ASCII grayscale effect will be handled by CSS filters, not image processing
- Include proper loading states and error handling
- Both images must maintain exact aspect ratio consistency for seamless transitions

### File Structure
```
public/
├── images/
│   └── profile/
│       ├── normal.webp
│       └── ascii.webp
└── ...

src/components/ui/DynamicProfilePicture/
├── index.ts
├── DynamicProfilePicture.tsx
├── DynamicProfilePicture.module.css
└── hooks/
    └── useDynamicProfilePicture.ts
```

## Accessibility & Performance

### Accessibility
- Respect `prefers-reduced-motion` - show static normal image only
- Proper alt text for screen readers
- Keyboard navigation support (spacebar to pause/resume)
- Focus indicators when interactive

### Performance
- **Image preloading**: Load all images before starting animation
- **Memory management**: Proper cleanup of intervals/timeouts
- **Bundle size**: Keep CSS and JS minimal
- **Render optimization**: Use React.memo if beneficial

### Browser Support
- Modern browsers (ES2020+)
- CSS `clip-path` support required
- Fallback for older browsers: static normal image

## Code Style Requirements

### React Patterns
- Use TypeScript with strict typing
- Implement proper error boundaries
- Use React hooks (useState, useEffect, useCallback, useMemo)
- Follow React 19+ best practices

### CSS Methodology
- Use CSS Modules for scoped styles
- BEM-like naming with `dnp-` prefix
- Mobile-first responsive design
- Use CSS custom properties for theming

### Testing Considerations
- Component should be easily testable
- Mock timers for animation testing
- Image loading state testing
- Accessibility testing hooks

## Error Handling

- **Image loading failures**: Graceful fallback to normal image
- **Animation failures**: Fallback to static display
- **Performance issues**: Automatic pause if frame rate drops
- **Memory leaks**: Proper cleanup of all intervals and timeouts

## Documentation

Include comprehensive JSDoc comments for:
- Component props and their purposes
- Hook return values and methods
- Complex animation logic
- Performance considerations

## Final Notes

- **Component should be self-contained** and not depend on external state
- **Maintain the terminal/unixporn aesthetic** established in the portfolio
- **Optimize for the existing color scheme** (black background, white text, gopher blue accent)
- **Consider adding subtle sound effects** (optional) for state transitions
- **Make it easily configurable** for different timing preferences

The goal is to create a professional, performant, and visually striking component that enhances the portfolio's unique terminal aesthetic while telling the story of bridging the real and digital worlds.