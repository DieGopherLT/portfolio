'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import TerminalWindow from '@/components/TerminalWindow';
import TerminalFooter from '@/components/TerminalFooter';

export default function About() {
  const t = useTranslations('sections.about');
  const [showContent, setShowContent] = useState(false);

  const handleTypingComplete = useCallback(() => {
    setTimeout(() => setShowContent(true), 400);
  }, []);

  return (
    <section id="about" className="min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-light text-white mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('title')}
        </motion.h2>

        <TerminalWindow
          title="about_me.md"
          command={t('terminal_command').replace('diegopher@portfolio:~$ ', '')}
          onTypingComplete={handleTypingComplete}
          className="max-w-4xl mx-auto"
        />

        {showContent && (
          <motion.div 
            className="mt-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-black border border-gray-800 rounded-lg p-8 font-mono text-white">
              <div className="space-y-6">
                <div className="border-b border-gray-800 pb-4">
                  <span className="text-gopher-blue font-semibold">USER INFO</span>
                  <div className="mt-2 text-sm text-secondary">
                    <div>Name: Diego López Torres</div>
                    <div>Role: Software Engineer</div>
                    <div>Experience: 3+ years</div>
                    <div>Location: Guadalajara, MX</div>
                  </div>
                </div>

                <div className="space-y-4 text-secondary leading-relaxed">
                  <p className="text-white">
                    <span className="text-terminal-green">$</span> {t('content.intro')}
                  </p>
                  
                  <p>
                    <span className="text-gopher-blue">→</span> {t('content.expertise')}
                  </p>
                  
                  <p>
                    <span className="text-warning-yellow">★</span> {t('content.passion')}
                  </p>
                  
                  <p>
                    <span className="text-keyword-purple">◆</span> {t('content.philosophy')}
                  </p>
                  
                  <p>
                    <span className="text-ts-blue">▶</span> {t('content.current_focus')}
                  </p>
                </div>

                <TerminalFooter path="~/about" />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}