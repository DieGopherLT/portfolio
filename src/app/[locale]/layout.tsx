import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import StructuredData from '@/components/StructuredData';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Generate metadata dynamically based on locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const baseUrl = 'https://diegopher.dev';
  const currentUrl = `${baseUrl}/${locale}`;
  const profileImageUrl = `${baseUrl}/profile-image.webp`;

  const title = `${t('personal_info.full_name')} - ${t('personal_info.title')}`;
  const description = t('sections.hero.description');

  return {
    title,
    description,
    authors: [{ name: t('personal_info.full_name'), url: baseUrl }],
    creator: t('personal_info.full_name'),
    keywords: [
      'Software Engineer',
      'Full Stack Developer',
      'Go Developer',
      'TypeScript Developer',
      'Backend Architecture',
      'Web Development',
      'Linux',
      'Diego López Torres',
      'diegopher',
    ],
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
        'x-default': `${baseUrl}/en`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      url: currentUrl,
      siteName: `${t('personal_info.full_name')} - Portfolio`,
      title,
      description,
      images: [
        {
          url: profileImageUrl,
          width: 400,
          height: 400,
          alt: `${t('personal_info.full_name')} - ${t('personal_info.title')}`,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: [profileImageUrl],
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
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
    other: {
      'theme-color': '#00ADD8',
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'en' | 'es')) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preload" href={geistSans.variable} as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href={geistMono.variable} as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StructuredData locale={locale} />
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
