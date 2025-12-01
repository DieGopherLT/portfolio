'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface SocialLink {
  platform: string;
  url: string;
  description: string;
}

export default function SocialMedia() {
  const t = useTranslations('sections.contact');
  const socialLinks: SocialLink[] = t.raw('social.links') as SocialLink[];

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-medium text-white">{t('social.section_title')}</h4>

      <div className="flex flex-wrap gap-4">
        {socialLinks.map((link, index) => (
          <motion.a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center gap-2 text-gopher-blue transition-colors hover:text-gopher-blue-hover"
          >
            <span className="text-lg">›</span>
            <span>{link.platform}</span>
          </motion.a>
        ))}
      </div>

      <p className="text-sm italic text-secondary">{t('social.footer')}</p>
    </div>
  );
}
