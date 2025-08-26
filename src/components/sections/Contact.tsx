'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useAOSVisibility } from '@/hooks/useAOSVisibility';
import ContactForm from '@/components/ui/ContactForm';
import SocialMedia from '@/components/ui/SocialMedia';

export default function Contact() {
  const t = useTranslations('sections.contact');
  const [showContent, setShowContent] = useState(false);
  const { ref, shouldRender } = useAOSVisibility({ threshold: 0.2 });

  // States for controlling typing animations manually
  const [formCommand, setFormCommand] = useState('');
  const [socialCommand, setSocialCommand] = useState('');
  const [showFormCursor, setShowFormCursor] = useState(true);
  const [showSocialCursor, setShowSocialCursor] = useState(false);

  // Use effect to handle sequential typing animations
  useEffect(() => {
    // Start form typing first
    setTimeout(() => {
      typeText('./contact-form.sh', setFormCommand, () => {
        setShowFormCursor(false);
        // Start social typing after form is complete
        setTimeout(() => {
          setShowSocialCursor(true);
          typeText(t('social.command').replace('diegopher@portfolio:~$ ', ''), setSocialCommand, () => {
            setShowSocialCursor(false);
            setTimeout(() => setShowContent(true), 400);
          });
        }, 300);
      });
    }, 500);
  }, [t]);

  const typeText = (text: string, setter: (value: string) => void, onComplete: () => void) => {
    let currentIndex = 0;
    const typingSpeed = 50 + Math.random() * 30;
    
    const typeChar = () => {
      if (currentIndex < text.length) {
        setter(text.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeChar, typingSpeed);
      } else {
        onComplete();
      }
    };
    
    typeChar();
  };


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
                showContent={showContent} 
                formCommand={formCommand} 
                showFormCursor={showFormCursor} 
              />

              {/* Vertical Divider */}
              <div className="hidden lg:flex justify-center items-start lg:flex-shrink-0">
                <div className="w-px bg-gray-700 h-full min-h-96"></div>
              </div>

              {/* Right Side - Social Links */}
              <SocialMedia 
                showContent={showContent} 
                socialCommand={socialCommand} 
                showSocialCursor={showSocialCursor} 
              />

            </div>
          </div>
        </div>
        )}
      </div>
    </section>
  );
}
