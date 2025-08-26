'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useTerminalCursor } from '@/hooks/useTerminalCursor';

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
  const cursor = useTerminalCursor();
  
  const socialLinks: SocialLink[] = t.raw('social.links') as SocialLink[];

  return (
    <div className="lg:flex-1 space-y-4 border-t lg:border-t-0 border-gray-700 pt-8 lg:pt-0">
      {/* Social prompt with typing animation */}
      <div className="border-b border-gray-800 pb-4">
        <div className="terminal-line">
          <span className="terminal-prompt">
            <span className='text-[#58c5a4]'>diegopher</span>
            <span className='text-white'>@</span>
            <span className='text-gopher-blue'>portfolio</span>
            <span className='text-white'>:</span>
            <span className='text-white'>~</span>
            <span className='text-white'>$</span>
          </span>
        </div>
        <div className="terminal-line terminal-continuation">
          <span className="terminal-chevron">
            <span className='text-[#58c5a4]'>❯</span>
          </span>
          <span className="terminal-command">
            {socialCommand}
            <motion.span 
              className="terminal-cursor"
              animate={{ opacity: showSocialCursor ? 1 : 0 }}
              transition={cursor.typing.transition}
            >
              █
            </motion.span>
          </span>
        </div>
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
              <h3 className="text-lg font-semibold text-white mb-2">
                <span className="text-keyword-purple">#</span> Redes Sociales
              </h3>
              <p className="text-sm text-secondary">
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
                    <span className="text-gopher-blue text-sm mt-1">▶</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-semibold">
                          <span className="text-keyword-purple">**</span>
                          {link.platform}
                          <span className="text-keyword-purple">**</span>
                        </span>
                      </div>
                      <a 
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gopher-blue hover:text-gopher-blue-hover underline transition-colors duration-200 text-sm group-hover:bg-gray-900 px-1 py-0.5 rounded"
                      >
                        {link.url}
                      </a>
                      <p className="text-xs text-secondary mt-1 italic">
                        <span className="text-comment-gray">{'//'} </span>
                        {link.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer message */}
            <div className="border-t border-gray-800 pt-4 mt-6">
              <p className="text-sm text-secondary italic">
                <span className="text-string-green">&quot;</span>
                {t('social.footer')}
                <span className="text-string-green">&quot;</span>
              </p>
            </div>

            {/* Terminal cursor */}
            <div className="terminal-line mt-4">
              <span className="terminal-prompt">
                <span className='text-[#58c5a4]'>diegopher</span>
                <span className='text-white'>@</span>
                <span className='text-gopher-blue'>portfolio</span>
                <span className='text-white'>:</span>
                <span className='text-white'>~</span>
                <span className='text-white'>$</span>
              </span>
            </div>
            <div className="terminal-line terminal-continuation">
              <span className="terminal-chevron">
                <span className='text-[#58c5a4]'>❯</span>
              </span>
              <motion.span 
                className="terminal-cursor"
                animate={cursor.blinking}
              >
                █
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}