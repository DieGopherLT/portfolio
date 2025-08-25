# Claude Code Context - DieGopherLT Portfolio

> For project overview, see @README.md

## Design Philosophy

### Core Concept
- **Main Theme**: r/unixporn aesthetic meets professional portfolio
- **Visual Metaphor**: Terminal session showcasing developer skills
- **Inspiration**: jhey.dev + r/unixporn + terminal aesthetics

### Main Principles
- Form follows terminal function
- Minimalist Unix philosophy
- Typing animations create immersion
- Standard UX with terminal presentation

## Color Palette

### Primary Colors
```css
--bg-primary: #000000;
--text-primary: #FFFFFF;
--text-secondary: #8B949E;
--text-muted: #6E7681;
```

### Accent Colors
```css
--gopher-blue: #00ADD8;
--gopher-blue-hover: #00B4D6;
--gopher-blue-muted: #007D9C;
--terminal-green: #39D353;
--warning-yellow: #F1C40F;
--error-red: #E74C3C;
```

### Syntax Highlighting
```css
--ts-blue: #007ACC;
--go-cyan: #00ADD8;
--string-green: #98C379;
--keyword-purple: #C678DD;
--comment-gray: #5C6370;
```

## Typography

### Font Stack
- **Primary**: system-ui, -apple-system, sans-serif
- **Monospace**: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace

### Hierarchy
- **Section Titles**: 2.5rem, weight 300, white color, clean minimal style
- **Terminal Prompts**: 1.1rem monospace, gopher blue color
- **Body Text**: 1rem, line-height 1.6, secondary text color
- **Code Snippets**: monospace, background #0D1117, border 1px solid #21262D

## Layout Structure

### Page Type
Single-page scroll with navigation

### Navigation
- Fixed minimal nav bar
- Unix-inspired menu style
- Top position
- Smooth scroll to sections behavior

### Section Structure
**Pattern**: title → prompt → content flow

**Animation Sequence**:
1. Section title fade in
2. Slight scroll pause
3. Terminal prompt typing animation
4. Scroll lock during typing
5. Content reveal after prompt

### Content Guidelines
- Max 800px centered width
- Generous Unix-style whitespace
- Pure black background with white text mandatory

## Section Architecture

### Hero Section
- Terminal welcome sequence
- Optional ASCII art or logo
- `diegopher@portfolio:~$ intro_message`
- Brief developer statement
- Typing effect for specialization

### About Section
- **Terminal Command**: `diegopher@portfolio:~$ whoami`
- Personal technical narrative style
- Focus on backend/frontend passion + Unix philosophy

### Experience Section
- **Terminal Command**: `diegopher@portfolio:~$ history | grep work`
- Chronological professional timeline
- Clean job entries with tech tags

### Skills Section
- **Terminal Command**: `diegopher@portfolio:~$ skills --list --verbose`
- Categorized technical skills
- Highlight languages: TypeScript, Go
- Categories: languages, frameworks, tools, concepts

### Projects Section
- **Terminal Command**: `diegopher@portfolio:~$ ls projects/ -la`
- Project cards terminal-inspired
- GitHub repo style with descriptions

### Contact Section
- **Terminal Command**: `diegopher@portfolio:~$ connect --help`
- **CRITICAL**: Split terminal design with macOS frames

#### Left Side - Contact Form
- TUI-styled contact form in terminal window
- macOS style with traffic lights
- Window title: "contact-form.sh"
- Terminal interface appearance
- Standard form UX functionality

#### Right Side - Social Links
- Social links terminal window
- macOS style with traffic lights
- Window title: "mis-redes.md"
- Command simulation: `diegopher@portfolio:~$ cat mis-redes.md`
- Markdown formatted social links
- Authentic terminal output style

### Where to find content for sections?

The project uses **next-intl** for internationalization with the following structure:

#### Configuration Location
- **Config file**: `src/i18n/config.ts`
- **Current setup**: Static locale ('en' by default)
- **Messages location**: `src/i18n/messages/`

#### Content Files
- **English**: `src/i18n/messages/en.json`
- **Spanish**: `src/i18n/messages/es.json`

#### Content Structure
Each locale file contains:

**Section Content**:
- `sections.hero` - Hero section content with terminal welcome, name, title, description
- `sections.about` - About section with terminal command and detailed content structure
- `sections.experience` - Work experience with jobs array, achievements, and technologies
- `sections.skills` - Skills organized by categories (conceptual, backend, frontend, tooling)
- `sections.projects` - Projects section (currently coming_soon status)
- `sections.contact` - Contact form and social links with terminal window titles

**Navigation & Common**:
- `navigation` - Menu items for each section
- `common_phrases` - Reusable phrases like loading, scroll hints, etc.
- `personal_info` - Basic personal information used across sections

**Terminal Commands**:
Each section has a specific `terminal_command` that appears in the typing animation:
- Hero: `echo 'Hello world!'` / `echo 'Hola mundo!'`
- About: `whoami`
- Experience: `history | grep work`
- Skills: `skills --list --verbose`
- Projects: `ls projects/ -la`
- Contact: `connect --help`

**Key Implementation Notes**:
- All terminal window titles are defined in the content files
- Social links window uses "mis-redes.md" / "my-networks.md"
- Contact form window uses "contact-form.sh"
- Content is structured to support the terminal aesthetic with authentic command-line feel

## Terminal Window Design

### Frame Style
macOS terminal window with:

### Title Bar
- Height: 28px
- Background: #2D2D2D
- **Traffic Lights**:
  - Close (red): #FF5F57, 12px from left, 12px diameter
  - Minimize (yellow): #FFBD2E, 32px from left, 12px diameter
  - Maximize (green): #28CA42, 52px from left, 12px diameter
  - Hover: subtle darken effect

### Window Title
- Text: "diegopher@portfolio: ~" (or appropriate)
- Font: SF Pro Display, system-ui
- Size: 13px
- Color: #FFFFFF
- Position: centered

### Terminal Content Area
- Background: #000000
- Padding: 16px 20px
- Border radius: 0 0 8px 8px
- Box shadow: 0 4px 20px rgba(0,0,0,0.3)

## Animations and Interactions

### Scroll Behavior
**Type**: Smooth controlled sections

**Terminal Window Appearance**:
- Entrance animation: fade in from top with slight bounce
- Timing: appears just before typing starts

**Typing Animations**:
- Speed: realistic terminal typing
- Cursor: blinking Unix cursor
- Optional: subtle keyboard sounds

**Sequence Timing**:
- Title appear: 0.3s
- Scroll pause: 0.5s
- Terminal window appear: 0.3s
- Typing duration: 1.5-3s depending on command
- Content reveal: 0.4s fade in

### Interactive Elements
- Nav hover: subtle gopher blue highlight
- Links: underline animation gopher blue
- Buttons: terminal button press effect
- Form fields: TUI style focus states

### Micro Interactions
- Terminal cursor blink: authentic timing
- Code syntax highlight: language appropriate colors
- Scroll indicators: minimalist Unix style

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

## Implementation Requirements

### Must Have
1. Pure black background with white text
2. Gopher blue (#00ADD8) as primary accent color
3. Authentic monospace typography for terminal elements
4. macOS terminal window frames with traffic lights
5. Realistic typing animation timing
6. Smooth scroll behavior with section pausing
7. Split terminal contact section (both with macOS frames)
8. TUI styled form elements
9. Markdown output for social links
10. Authentic terminal window title bars

### Avoid
- Bright colors outside accent palette
- Overly fast or fake looking typing animations
- Breaking terminal illusion with non-Unix elements
- Cluttered layouts against Unix philosophy
- Photos or personal imagery

### Performance Requirements
- Smooth 60fps animations
- Efficient scroll handling
- Fast font loading
- Minimal JavaScript for core functionality

## Brand Personality

### Core Values
- Unix philosophy simplicity
- Technical excellence
- Clean code principles
- Open source mindset
- Continuous learning

### Brand Adjectives
- Technical, minimalist, authentic
- Unix-inspired, developer-focused
- Clean, efficient

### Community Alignment
r/unixporn aesthetic values

## Unique Selling Points

### Visual Differentiation
- Authentic terminal aesthetics in portfolio
- Innovative scroll-controlled typing animations
- Split terminal contact form design
- Seamless blend of UX standards with Unix presentation

### Technical Differentiation
- Demonstrates terminal fluency through design
- Shows attention to detail and authenticity
- Appeals to technical community values