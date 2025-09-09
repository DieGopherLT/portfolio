'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useAOSVisibility } from '@/hooks/useAOSVisibility';
import ContactForm from '@/components/ui/ContactForm';
import SocialMedia from '@/components/ui/SocialMedia';

// Enums para estados de animación independientes
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

  // Estados independientes para cada animación
  const [formAnimationState, setFormAnimationState] = useState<FormAnimationState>(FormAnimationState.IDLE);
  const [socialAnimationState, setSocialAnimationState] = useState<SocialAnimationState>(
    SocialAnimationState.IDLE
  );

  // Estados para el contenido de los comandos
  const [formCommand, setFormCommand] = useState('');
  const [socialCommand, setSocialCommand] = useState('');

  const typeText = useCallback((text: string, setter: (value: string) => void): Promise<void> => {
    return new Promise(resolve => {
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

  // Función de animación para el formulario de contacto
  const runFormAnimation = useCallback(async () => {
    if (!shouldRender) return;

    try {
      // Delay inicial
      await new Promise(resolve => setTimeout(resolve, 500));

      // 1. Form command typing
      setFormAnimationState(FormAnimationState.TYPING_COMMAND);
      await typeText('./contact-form.sh', setFormCommand);
      await new Promise(resolve => setTimeout(resolve, 300));

      // 2. Show form content
      setFormAnimationState(FormAnimationState.SHOWING_CONTENT);
      await new Promise(resolve => setTimeout(resolve, 400));

      // 3. Complete
      setFormAnimationState(FormAnimationState.COMPLETE);
    } catch (error) {
      console.error('Form animation error:', error);
    }
  }, [shouldRender, typeText]);

  // Función de animación para los enlaces sociales
  const runSocialAnimation = useCallback(async () => {
    if (!shouldRender) return;

    try {
      // Delay inicial (ligeramente mayor para efecto escalonado)
      await new Promise(resolve => setTimeout(resolve, 700));

      // 1. Social command typing
      setSocialAnimationState(SocialAnimationState.TYPING_COMMAND);
      await typeText(t('social.command').replace('diegopher@portfolio:~$ ', ''), setSocialCommand);
      await new Promise(resolve => setTimeout(resolve, 300));

      // 2. Show social content
      setSocialAnimationState(SocialAnimationState.SHOWING_CONTENT);
      await new Promise(resolve => setTimeout(resolve, 400));

      // 3. Complete
      setSocialAnimationState(SocialAnimationState.COMPLETE);
    } catch (error) {
      console.error('Social animation error:', error);
    }
  }, [shouldRender, typeText, t]);

  // Efecto principal que ejecuta ambas animaciones en paralelo
  useEffect(() => {
    const runAllAnimations = async () => {
      if (
        shouldRender &&
        formAnimationState === FormAnimationState.IDLE &&
        socialAnimationState === SocialAnimationState.IDLE
      ) {
        // Ejecutar ambas animaciones en paralelo
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
