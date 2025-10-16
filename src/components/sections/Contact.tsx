'use client';

import ContactForm from '@/components/ui/ContactForm';
import SocialMedia from '@/components/ui/SocialMedia';
import { ANIMATION_DELAYS, delay } from '@/constants/animations';
import { useAOSVisibility } from '@/hooks/useAOSVisibility';
import { useTypingAnimation } from '@/hooks/useTypingAnimation';

import { useCallback, useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

enum FormAnimationState {
  IDLE = 0,
  TYPING_COMMAND = 1,
  SHOWING_CONTENT = 2,
  COMPLETE = 3,
}

enum SocialAnimationState {
  IDLE = 0,
  TYPING_COMMAND = 1,
  SHOWING_CONTENT = 2,
  COMPLETE = 3,
}

export default function Contact() {
  const t = useTranslations('sections.contact');
  const { ref, shouldRender } = useAOSVisibility({ threshold: 0.2 });

  const { typeText } = useTypingAnimation({ autoStart: false });

  const [formAnimationState, setFormAnimationState] = useState<FormAnimationState>(FormAnimationState.IDLE);
  const [socialAnimationState, setSocialAnimationState] = useState<SocialAnimationState>(
    SocialAnimationState.IDLE
  );

  const [formCommand, setFormCommand] = useState('');
  const [socialCommand, setSocialCommand] = useState('');

  const runFormAnimation = useCallback(async () => {
    if (!shouldRender) return;

    try {
      await delay(ANIMATION_DELAYS.MEDIUM);

      // 1. Form command typing
      setFormAnimationState(FormAnimationState.TYPING_COMMAND);
      await typeText('./contact-form.sh', setFormCommand);
      await delay(ANIMATION_DELAYS.SHORT);

      // 2. Show form content
      setFormAnimationState(FormAnimationState.SHOWING_CONTENT);
      await delay(ANIMATION_DELAYS.MEDIUM);

      // 3. Complete
      setFormAnimationState(FormAnimationState.COMPLETE);
    } catch (error) {
      console.error('Form animation error:', error);
    }
  }, [shouldRender, typeText]);

  const runSocialAnimation = useCallback(async () => {
    if (!shouldRender) return;

    try {
      // Slightly longer delay for staggered effect
      await delay(ANIMATION_DELAYS.LONG);

      // 1. Social command typing
      setSocialAnimationState(SocialAnimationState.TYPING_COMMAND);
      await typeText(t('social.command').replace('diegopher@portfolio:~$ ', ''), setSocialCommand);
      await delay(ANIMATION_DELAYS.SHORT);

      // 2. Show social content
      setSocialAnimationState(SocialAnimationState.SHOWING_CONTENT);
      await delay(ANIMATION_DELAYS.MEDIUM);

      // 3. Complete
      setSocialAnimationState(SocialAnimationState.COMPLETE);
    } catch (error) {
      console.error('Social animation error:', error);
    }
  }, [shouldRender, typeText, t]);

  useEffect(() => {
    const runAllAnimations = async () => {
      if (
        shouldRender &&
        formAnimationState === FormAnimationState.IDLE &&
        socialAnimationState === SocialAnimationState.IDLE
      ) {
        // Run both animations in parallel
        await Promise.all([runFormAnimation(), runSocialAnimation()]);
      }
    };

    runAllAnimations();
  }, [shouldRender, runFormAnimation, runSocialAnimation, formAnimationState, socialAnimationState]);

  return (
    <section ref={ref} id="contact" className="px-4 py-10" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-6xl">
        <h2
          id="contact-heading"
          className="mb-8 text-center text-4xl font-light text-white md:text-5xl"
          data-aos="fade-up"
          data-aos-duration="300"
          data-aos-once="true"
        >
          {t('title')}
        </h2>

        {/* Single Terminal Window with Split Content */}
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
              <div className="window-title">connection_handler.sh</div>
            </div>

            {/* Terminal Content - Split Layout */}
            <div className="terminal-content">
              <div className="font-mono text-white lg:flex lg:gap-4">
                {/* Left Side - Contact Form */}
                <ContactForm
                  showContent={formAnimationState >= FormAnimationState.SHOWING_CONTENT}
                  formCommand={formCommand}
                  showFormCursor={formAnimationState === FormAnimationState.TYPING_COMMAND}
                />

                {/* Vertical Divider */}
                <div className="hidden items-start justify-center lg:flex lg:flex-shrink-0">
                  <div className="h-full min-h-96 w-px bg-gray-700"></div>
                </div>

                {/* Right Side - Social Links */}
                <SocialMedia
                  showContent={socialAnimationState >= SocialAnimationState.SHOWING_CONTENT}
                  socialCommand={socialCommand}
                  showSocialCursor={socialAnimationState === SocialAnimationState.TYPING_COMMAND}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
