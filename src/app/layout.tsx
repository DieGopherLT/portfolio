import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DieGopherLT | Backend & Frontend Developer",
  description: "Backend and Frontend developer specializing in TypeScript, Go, and modern web technologies. Unix philosophy meets professional portfolio.",
  keywords: ["DieGopherLT", "software engineer", "backend developer", "frontend developer", "TypeScript", "Go", "JavaScript", "React", "Node.js", "portfolio"],
  authors: [{ name: "DieGopherLT" }],
  creator: "DieGopherLT",
  publisher: "DieGopherLT",
  metadataBase: new URL('https://diegopherlt.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://diegopherlt.dev',
    title: 'DieGopherLT | Backend & Frontend Developer',
    description: 'Backend and Frontend developer specializing in TypeScript, Go, and modern web technologies. Unix philosophy meets professional portfolio.',
    siteName: 'DieGopherLT Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DieGopherLT - Backend & Frontend Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DieGopherLT | Backend & Frontend Developer',
    description: 'Backend and Frontend developer specializing in TypeScript, Go, and modern web technologies.',
    images: ['/og-image.png'],
    creator: '@DieGopherLT',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "DieGopherLT",
    "jobTitle": "Backend & Frontend Developer",
    "description": "Backend and Frontend developer specializing in TypeScript, Go, and modern web technologies",
    "url": "https://diegopherlt.dev",
    "sameAs": [
      "https://github.com/DieGopherLT",
      "https://linkedin.com/in/diegopherlt",
      "https://twitter.com/DieGopherLT"
    ],
    "knowsAbout": [
      "TypeScript",
      "Go",
      "JavaScript",
      "React",
      "Node.js",
      "Backend Development",
      "Frontend Development",
      "Web Development"
    ],
    "alumniOf": {
      "@type": "Organization",
      "name": "University/Institution"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
