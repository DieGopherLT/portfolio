import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ClientBackgroundWrapper } from '@/components/ui/ClientBackgroundWrapper';
import { fontClassName } from '@/lib/fonts';

import './globals.css';

export default function NotFound() {
  const t = useTranslations('not_found');

  return (
    <html lang="en">
      <head />
      <body className={`bg-black text-white ${fontClassName} antialiased`}>
        <ClientBackgroundWrapper type="dots">
          <div className="min-h-screen flex items-center justify-center text-white">
            <div className="text-center px-6 max-w-2xl relative z-10">
              <h1 className="text-9xl font-bold text-gopher-blue mb-8">404</h1>
              
              <h2 className="text-4xl font-light mb-6 text-white">
                {t('heading')}
              </h2>
              
              <p className="text-xl text-secondary mb-12 leading-relaxed">
                {t('description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/en"
                  className="px-8 py-4 bg-gopher-blue hover:bg-gopher-blue-hover text-black font-medium rounded-md transition-colors duration-200"
                >
                  {t('go_home')}
                </Link>
                
                <Link
                  href="/en/blog"
                  className="px-8 py-4 border border-gopher-blue text-gopher-blue hover:bg-gopher-blue hover:text-black font-medium rounded-md transition-all duration-200"
                >
                  {t('go_blog')}
                </Link>
              </div>
            </div>
          </div>
        </ClientBackgroundWrapper>
      </body>
    </html>
  );
}
