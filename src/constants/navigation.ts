export const NAV_ITEMS = [
  { key: 'home', href: '#hero' },
  { key: 'about', href: '#about' },
  { key: 'experience', href: '#experience' },
  { key: 'skills', href: '#skills' },
  { key: 'blog', href: '#blog' },
  { key: 'contact', href: '#contact' },
] as const;

export type NavItemKey = typeof NAV_ITEMS[number]['key'];
