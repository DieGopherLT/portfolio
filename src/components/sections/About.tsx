'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import TerminalWindow from '@/components/TerminalWindow';
import TerminalFooter from '@/components/TerminalFooter';
import { useAOSVisibility } from '@/hooks/useAOSVisibility';

export default function About() {
  const t = useTranslations('sections.about');
  const [showContent, setShowContent] = useState(false);
  const { ref, shouldRender } = useAOSVisibility({ threshold: 0.2 });

  const handleTypingComplete = useCallback(() => {
    setTimeout(() => setShowContent(true), 400);
  }, []);

  return (
    <section ref={ref} id="about" className="min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 
          className="text-4xl md:text-5xl font-light text-white mb-8 text-center"
          data-aos="fade-up"
          data-aos-duration="300"
          data-aos-once="true"
        >
          {t('title')}
        </h2>

        {/* Terminal Window con renderizado condicional */}
        {shouldRender && (
          <div
            data-aos="fade-up"
            data-aos-delay="800"
            data-aos-duration="300"
            data-aos-once="true"
          >
            <TerminalWindow
              title="about_me.md"
              command={t('terminal_command').replace('diegopher@portfolio:~$ ', '')}
              onTypingComplete={handleTypingComplete}
              className="max-w-4xl mx-auto"
            />
          </div>
        )}

        {showContent && (
          <div 
            className="mt-8 max-w-4xl mx-auto"
            data-aos="fade-up"
            data-aos-duration="400"
            data-aos-once="true"
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
          </div>
        )}
      </div>
    </section>
  );
}