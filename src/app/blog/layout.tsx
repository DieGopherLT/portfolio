import '@/app/globals.css';

import { ReactNode } from 'react';

import { fontClassName } from '@/lib/fonts';

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogRootLayout({ children }: BlogLayoutProps) {
  return (
    <html lang="en">
      <head></head>
      <body className="min-h-screen text-white">
        <div className={fontClassName}>{children}</div>
      </body>
    </html>
  );
}

export const metadata = {
  title: {
    template: '%s | DieGopherLT Blog',
    default: 'DieGopherLT Blog',
  },
  description: 'Technical insights, development experiences, and thoughts about software architecture.',
  keywords: ['software development', 'programming', 'unix', 'go', 'typescript', 'architecture', 'blog'],
  authors: [{ name: 'Diego López Torres', url: 'https://diegopher.dev' }],
  creator: 'Diego López Torres',
  openGraph: {
    type: 'website',
    siteName: 'DieGopherLT Blog',
    url: 'https://diegopher.dev/blog',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@diegopherLT',
  },
  robots: {
    index: true,
    follow: true,
  },
};