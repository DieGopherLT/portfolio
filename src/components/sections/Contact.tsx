'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useAOSVisibility } from '@/hooks/useAOSVisibility';
import ContactForm from '@/components/ui/ContactForm';
import SocialMedia from '@/components/ui/SocialMedia';

// Enum para estados de animación
enum AnimationState {
  IDLE = 0,
  FORM_COMMAND = 1,
  SOCIAL_COMMAND = 2,
  SHOW_CONTENT = 3,
  COMPLETE = 4
}

export default function Contact() {
  const t = useTranslations('sections.contact');
  const { ref, shouldRender } = useAOSVisibility({ threshold: 0.2 });

  // Estado principal de la animación
  const [animationState, setAnimationState] = useState<AnimationState>(AnimationState.IDLE);
  
  // Estados para el contenido de los comandos
  const [formCommand, setFormCommand] = useState('');
  const [socialCommand, setSocialCommand] = useState('');

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
    if (!shouldRender) return;

    try {
      // Delay inicial
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 1. Form command
      setAnimationState(AnimationState.FORM_COMMAND);
      await typeText('./contact-form.sh', setFormCommand);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // 2. Social command
      setAnimationState(AnimationState.SOCIAL_COMMAND);
      await typeText(t('social.command').replace('diegopher@portfolio:~$ ', ''), setSocialCommand);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // 3. Show content
      setAnimationState(AnimationState.SHOW_CONTENT);
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // 4. Complete
      setAnimationState(AnimationState.COMPLETE);
      
    } catch (error) {
      console.error('Animation error:', error);
    }
  }, [shouldRender, typeText, t]);

  // Efecto principal
  useEffect(() => {
    if (shouldRender && animationState === AnimationState.IDLE) {
      runAnimation();
    }
  }, [shouldRender, runAnimation, animationState]);


  return (
    <section ref={ref} id="contact" className="py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 
          className="text-4xl md:text-5xl font-light text-white mb-8 text-center"
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
            <div className="lg:flex lg:gap-4 font-mono text-white">
              
              {/* Left Side - Contact Form */}
              <ContactForm 
                showContent={animationState >= AnimationState.SHOW_CONTENT} 
                formCommand={formCommand} 
                showFormCursor={animationState === AnimationState.FORM_COMMAND} 
              />

              {/* Vertical Divider */}
              <div className="hidden lg:flex justify-center items-start lg:flex-shrink-0">
                <div className="w-px bg-gray-700 h-full min-h-96"></div>
              </div>

              {/* Right Side - Social Links */}
              <SocialMedia 
                showContent={animationState >= AnimationState.SHOW_CONTENT} 
                socialCommand={socialCommand} 
                showSocialCursor={animationState === AnimationState.SOCIAL_COMMAND} 
              />

            </div>
          </div>
        </div>
        )}
      </div>
    </section>
  );
}
