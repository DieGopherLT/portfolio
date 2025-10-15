'use client';

import TerminalFooter from '@/components/TerminalFooter';
import TerminalPrompt from '@/components/ui/TerminalPrompt';
import { ANIMATION_DELAYS, delay } from '@/constants/animations';
import { useAOSVisibility } from '@/hooks/useAOSVisibility';
import { useTypingAnimation } from '@/hooks/useTypingAnimation';
import { formatDateShort, formatReadingTime } from '@/lib/blog/utils';

import { useCallback, useEffect, useState } from 'react';



import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';





// Animation states enum
enum AnimationState {
  IDLE = 0,
  CAT_COMMAND = 1,
  CAT_OUTPUT = 2,
  LS_COMMAND = 3,
  LS_OUTPUT = 4,
  COMPLETE = 5,
}

interface RecentPost {
  slug: string;
  title: string;
  date: string;
  readingTime: number;
}

interface BlogSectionProps {
  recentPosts?: RecentPost[];
  locale: 'en' | 'es';
}

export default function BlogSection({ recentPosts = [], locale }: BlogSectionProps) {
  const t = useTranslations('sections.blog');
  const { ref, shouldRender } = useAOSVisibility({ threshold: 0.2 });

  const { typeText } = useTypingAnimation({ autoStart: false });

  // Animation state
  const [animationState, setAnimationState] = useState<AnimationState>(AnimationState.IDLE);

  // Command states
  const [catCommand, setCatCommand] = useState('');
  const [lsCommand, setLsCommand] = useState('');

  // Main animation sequence
  const runAnimation = useCallback(async () => {
    if (!shouldRender) return;

    try {
      // Initial delay
      await delay(ANIMATION_DELAYS.INITIAL);

      // 1. Cat command
      setAnimationState(AnimationState.CAT_COMMAND);
      await typeText('cat about-blog.md', setCatCommand);
      await delay(ANIMATION_DELAYS.MEDIUM);

      // 2. Cat output
      setAnimationState(AnimationState.CAT_OUTPUT);
      await delay(ANIMATION_DELAYS.CONTENT_DISPLAY);

      // 3. LS command
      setAnimationState(AnimationState.LS_COMMAND);
      await typeText('ls blog/', setLsCommand);
      await delay(ANIMATION_DELAYS.SHORT);

      // 4. LS output
      setAnimationState(AnimationState.LS_OUTPUT);
      await delay(ANIMATION_DELAYS.MEDIUM);

      // 5. Complete
      setAnimationState(AnimationState.COMPLETE);
    } catch (error) {
      console.error('Blog animation error:', error);
    }
  }, [shouldRender, typeText]);

  // Effect to trigger animation
  useEffect(() => {
    if (shouldRender && animationState === AnimationState.IDLE) {
      runAnimation();
    }
  }, [shouldRender, runAnimation, animationState]);

  return (
    <section ref={ref} id="blog" className="min-h-screen px-4 py-10" aria-labelledby="blog-heading">
      <div className="mx-auto max-w-4xl">
        <h2
          id="blog-heading"
          className="mb-8 text-center text-4xl font-light text-white md:text-5xl"
          data-aos="fade-up"
          data-aos-duration="300"
          data-aos-once="true"
        >
          {t('title')}
        </h2>

        {/* Terminal Window */}
        {shouldRender && (
          <div
            className="terminal-window"
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
              <div className="window-title">blog_explorer.sh</div>
            </div>

            {/* Terminal Content */}
            <div className="terminal-content">
              <div className="p-6 font-mono text-white">
                {/* Cat Command */}
                <AnimatePresence>
                  {animationState >= AnimationState.CAT_COMMAND && (
                    <motion.div
                      key="cat-command"
                      className="mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
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

                {/* Cat Output */}
                <AnimatePresence>
                  {animationState >= AnimationState.CAT_OUTPUT && (
                    <motion.div
                      key="cat-output"
                      className="mb-6 pl-0"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <div className="space-y-3 text-sm leading-relaxed">
                        <div className="text-keyword-purple"># {t('description.title')}</div>
                        <div className="text-secondary">{t('description.content')}</div>
                        <div className="text-ts-blue">
                          →{' '}
                          <Link
                            href={`/${locale}/blog`}
                            className="text-gopher-blue hover:text-gopher-blue-hover underline"
                          >
                            {t('description.link_text')}
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* LS Command */}
                <AnimatePresence>
                  {animationState >= AnimationState.LS_COMMAND && (
                    <motion.div
                      key="ls-command"
                      className="mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                      <TerminalPrompt
                        command={lsCommand}
                        showCursor={animationState === AnimationState.LS_COMMAND}
                        cursorState="blinking"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* LS Output */}
                <AnimatePresence>
                  {animationState >= AnimationState.LS_OUTPUT && (
                    <motion.div
                      className="mb-6 pl-0"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <div className="space-y-2">
                        {recentPosts.length > 0 ? (
                          recentPosts.map((post, index) => (
                            <motion.div
                              key={post.slug}
                              className="flex items-center justify-between text-sm"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.4,
                                delay: index * 0.1,
                                ease: 'easeOut',
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-gopher-blue">-rw-r--r--</span>
                                <span className="text-warning-yellow">
                                  {formatDateShort(post.date, locale)}
                                </span>
                                <Link
                                  href={`/${locale}/blog/${post.slug}`}
                                  className="hover:text-gopher-blue text-white transition-colors"
                                >
                                  {post.title}.md
                                </Link>
                              </div>
                              <span className="text-text-muted text-xs">
                                {formatReadingTime(post.readingTime, locale)}
                              </span>
                            </motion.div>
                          ))
                        ) : (
                          <div className="text-text-muted text-sm">{t('no_posts')}</div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {animationState === AnimationState.COMPLETE && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                      <TerminalFooter path="~/blog" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}