# Blog i18n Integration and Route Restructure

## Context

- **Timestamp**: 2025-09-15T17:35:00Z
- **Project**: portfolio
- **Task Type**: refactor
- **Duration**: ~45 minutes

## Problem Statement

- Blog routes were outside the localized structure (`/blog/[locale]/`) causing i18n context errors
- `BlogNavigation` component couldn't access locale context for `LanguageSelector`
- Hardcoded strings in blog components instead of using i18n translation files
- Runtime error: "No intl context found" when using `useLanguageSwitch` hook

## Solution Summary

- Moved blog routes from `/blog/[locale]/` to `/[locale]/blog/` structure
- Integrated blog pages into existing `NextIntlClientProvider` context
- Extracted hardcoded strings to translation files (`en.json`, `es.json`)
- Updated all internal links and metadata to use new route structure

## Technical Implementation

### Files Modified

- **Moved**: `src/app/blog/[locale]/page.tsx` → `src/app/[locale]/blog/page.tsx`
- **Moved**: `src/app/blog/[locale]/[slug]/page.tsx` → `src/app/[locale]/blog/[slug]/page.tsx`
- **Deleted**: `src/app/blog/layout.tsx` (no longer needed)
- **Updated**: `src/components/blog/BlogNavigation.tsx` (better centering with flexbox)
- **Updated**: `src/i18n/messages/en.json` (added `sections.blog.page` translations)
- **Updated**: `src/i18n/messages/es.json` (added `sections.blog.page` translations)

### Key Decisions

- Used `git mv` to preserve file history during route restructure
- Maintained blog-specific metadata while leveraging inherited i18n context
- Preserved SEO optimization with updated alternate language URLs
- Simplified `BlogNavigation` from 3-column justify-between to flex-1 grid for perfect centering
- Replaced manual language switcher with existing `LanguageSelector` component

## Testing/Verification

- Verified blog pages inherit i18n context properly
- Confirmed `LanguageSelector` works without runtime errors
- Tested route changes: `/blog/en` → `/en/blog`, `/blog/es` → `/es/blog`
- Validated metadata generation with translations
- Checked breadcrumb links and navigation consistency

## Technical Debt

- None created. Actually reduced debt by:
  - Eliminating duplicate language switcher code
  - Removing unnecessary blog layout
  - Centralizing translations

## Related

- **Commits**: c7fc53a, 15f8fdf, 712ca04
- **Dependencies**: Relies on existing i18n infrastructure and `LanguageSelector` component
- **Follow-up**: Blog routes now follow same pattern as main portfolio pages