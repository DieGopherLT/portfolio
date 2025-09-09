import '@/app/globals.css';

import { ReactNode } from 'react';

import { Inter, JetBrains_Mono } from 'next/font/google';


// Import fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-reading',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogRootLayout({ children }: BlogLayoutProps) {
  return (
    <html lang="en">
      <head></head>
      <body className="min-h-screen text-white">
        <div className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>{children}</div>
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