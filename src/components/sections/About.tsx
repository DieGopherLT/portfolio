'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useAOSVisibility } from '@/hooks/useAOSVisibility';
import TerminalFooter from '@/components/TerminalFooter';
import TerminalPrompt from '@/components/ui/TerminalPrompt';

// Enum para estados de animación
enum AnimationState {
  IDLE = 0,
  CAT_COMMAND = 1,
  CAT_OUTPUT = 2, 
  SECOND_COMMAND = 3,
  SECOND_OUTPUT = 4,
  COMPLETE = 5
}

export default function About() {
  const t = useTranslations('sections.about');
  const personalInfo = useTranslations('personal_info');
  const { ref, isVisible } = useAOSVisibility({ threshold: 0.2 });

  // Estado principal de la animación
  const [animationState, setAnimationState] = useState<AnimationState>(AnimationState.IDLE);
  
  // Estados para el contenido de los comandos
  const [catCommand, setCatCommand] = useState('');
  const [secondCommand, setSecondCommand] = useState('');

  const typeText = useCallback((text: string, setter: (value: string) => void): Promise<void> => {
    return new Promise((resolve) => {
      setter(''); // Reset
      let currentIndex = 0;
      const typingSpeed = 50 + Math.random() * 30;
      
      const typeChar = () => {
        if (currentIndex < text.length) {
          setter(text.slice(0, currentIndex + 1));
          currentIndex++;
          setTimeout(typeChar, typingSpeed);
        } else {
          resolve();
        }
      };
      
      typeChar();
    });
  }, []);

  // Función principal de animación
  const runAnimation = useCallback(async () => {
    if (!isVisible) return;

    try {
      // Delay inicial
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 1. Cat comando
      setAnimationState(AnimationState.CAT_COMMAND);
      await typeText('cat /etc/developer.conf', setCatCommand);
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // 2. Cat output
      setAnimationState(AnimationState.CAT_OUTPUT);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 3. Segundo comando
      setAnimationState(AnimationState.SECOND_COMMAND);
      await typeText('cat about-me.md', setSecondCommand);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // 4. Segundo output
      setAnimationState(AnimationState.SECOND_OUTPUT);
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // 5. Completo
      setAnimationState(AnimationState.COMPLETE);
      
    } catch (error) {
      console.error('Animation error:', error);
    }
  }, [isVisible, typeText]);

  // Efecto principal simplificado
  useEffect(() => {
    if (isVisible && animationState === AnimationState.IDLE) {
      runAnimation();
    }
  }, [isVisible, runAnimation, animationState]);

  return (
    <section ref={ref} id="about" className="min-h-screen py-10 px-4" aria-labelledby="about-heading">
      <div className="max-w-4xl mx-auto">
        <h2 
          id="about-heading"
          className="text-4xl md:text-5xl font-light text-white mb-8 text-center"
          data-aos="fade-up"
          data-aos-duration="300"
          data-aos-once="true"
        >
          {t('title')}
        </h2>

        {/* Single Terminal Window */}
        <div
          className={clsx('terminal-window', {
            'invisible': !isVisible
          })}
          data-aos="fade-up"
          data-aos-delay="800"
          data-aos-duration="300"
          data-aos-once="true"
        >
          {/* macOS Terminal Header */}
          <div className="terminal-header">
            <div className="traffic-lights">
              <div className="traffic-light close"></div>
              <div className="traffic-light minimize"></div>
              <div className="traffic-light maximize"></div>
            </div>
            <div className="window-title">about_me.sh</div>
          </div>

          {/* Terminal Content */}
          <div className="terminal-content">
            <div className="font-mono text-white p-6">
              
              {/* Cat Command */}
              <AnimatePresence>
                {animationState >= AnimationState.CAT_COMMAND && (
                  <motion.div 
                    key="cat-command"
                    className="mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <TerminalPrompt
                      command={catCommand}
                      showCursor={animationState === AnimationState.CAT_COMMAND}
                      cursorState="blinking"
                      commandClassName="text-sm"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

                {/* Cat Command Output */}
                <AnimatePresence>
                  {animationState >= AnimationState.CAT_OUTPUT && (
                    <motion.div 
                      key="cat-output"
                      className="mb-6 pl-0"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <div className="pl-4 space-y-1 text-sm">
                        <div>
                          <span className="text-keyword-purple">[profile]</span>
                        </div>
                        <div>
                          <span className="text-ts-blue">name</span>=<span className="text-string-green">&quot;{personalInfo('full_name')}&quot;</span>
                        </div>
                        <div>
                          <span className="text-ts-blue">role</span>=<span className="text-string-green">&quot;{personalInfo('title')} && {personalInfo('specialization')}&quot;</span>
                        </div>
                        <div>
                          <span className="text-ts-blue">preferences</span>=<span className="text-string-green">&quot;{personalInfo('preference')}&quot;</span>
                        </div>
                        <div>
                          <span className="text-ts-blue">uptime</span>=<span className="text-string-green">&quot;{personalInfo('experience_years')}+ years&quot;</span>
                        </div>
                        <div>
                          <span className="text-ts-blue">age</span>=<span className="text-string-green">&quot;{personalInfo('age')}&quot;</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Second Command */}
                <AnimatePresence>
                  {animationState >= AnimationState.SECOND_COMMAND && (
                    <motion.div 
                      key="second-command"
                      className="mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <TerminalPrompt
                        command={secondCommand}
                        showCursor={animationState === AnimationState.SECOND_COMMAND}
                        cursorState="blinking"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Second Command Output */}
                <AnimatePresence>
                  {animationState >= AnimationState.SECOND_OUTPUT && (
                    <motion.div 
                      className="mb-6 pl-0"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
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
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {animationState === AnimationState.COMPLETE && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <TerminalFooter path="~/about" />
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}