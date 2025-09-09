'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import TerminalPrompt from '@/components/ui/TerminalPrompt';

interface SocialLink {
  platform: string;
  url: string;
  description: string;
}

interface SocialMediaProps {
  showContent: boolean;
  socialCommand: string;
  showSocialCursor: boolean;
}

export default function SocialMedia({ showContent, socialCommand, showSocialCursor }: SocialMediaProps) {
  const t = useTranslations('sections.contact');

  const socialLinks: SocialLink[] = t.raw('social.links') as SocialLink[];

  return (
    <div className="mt-8 space-y-4 border-t border-gray-700 pt-8 md:mt-0 lg:flex-1 lg:border-t-0 lg:pt-0">
      {/* Social prompt with typing animation */}
      <div className="border-b border-gray-800 pb-4">
        <TerminalPrompt command={socialCommand} showCursor={showSocialCursor} cursorState="typing" />
      </div>

      {showContent && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Markdown-style output */}
          <div className="space-y-4">
            <div className="border-b border-gray-800 pb-4">
              <h3 className="mb-2 text-lg font-semibold text-white">
                <span className="text-keyword-purple">#</span> Redes Sociales
              </h3>
              <p className="text-secondary text-sm">
                <span className="text-comment-gray">{'//'} </span>
                Conéctate conmigo en estas plataformas
              </p>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              {socialLinks.map((link, index) => (
                <motion.div
                  key={link.platform}
                  className="group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-gopher-blue mt-1 text-sm">▶</span>
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="font-semibold text-white">
                          <span className="text-keyword-purple">**</span>
                          {link.platform}
                          <span className="text-keyword-purple">**</span>
                        </span>
                      </div>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gopher-blue hover:text-gopher-blue-hover rounded px-1 py-0.5 text-sm underline transition-colors duration-200 group-hover:bg-gray-900"
                      >
                        {link.url}
                      </a>
                      <p className="text-secondary mt-1 text-xs italic">
                        <span className="text-comment-gray">{'//'} </span>
                        {link.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer message */}
            <div className="mt-6 border-t border-gray-800 pt-4">
              <p className="text-secondary text-sm italic">
                <span className="text-string-green">&quot;</span>
                {t('social.footer')}
                <span className="text-string-green">&quot;</span>
              </p>
            </div>

            {/* Terminal cursor */}
            <div className="mt-4">
              <TerminalPrompt showCursor={true} />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
