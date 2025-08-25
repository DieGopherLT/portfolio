'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useTerminalCursor } from '@/hooks/useTerminalCursor';
import { useAOSVisibility } from '@/hooks/useAOSVisibility';

interface SocialLink {
  platform: string;
  url: string;
  description: string;
}

export default function Contact() {
  const t = useTranslations('sections.contact');
  const cursor = useTerminalCursor();
  const [showContent, setShowContent] = useState(false);
  const { ref, shouldRender } = useAOSVisibility({ threshold: 0.2 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const socialLinks: SocialLink[] = t.raw('social.links') as SocialLink[];

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
              <div className="lg:flex-1 space-y-4">
                {/* Form prompt with typing animation */}
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
                      {formCommand}
                      <motion.span 
                        className="terminal-cursor"
                        animate={{ opacity: showFormCursor ? 1 : 0 }}
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
                    transition={{ duration: 0.4 }}
                  >
                    {/* Form script header */}
                    <div className="space-y-2 mb-4">
                      <div className="terminal-line">
                        <span className="text-terminal-green">#!/bin/bash</span>
                      </div>
                      <div className="terminal-line">
                        <span className="text-comment-gray"># Contact Form Script</span>
                      </div>
                      <div className="terminal-line">
                        <span className="text-keyword-purple">echo</span>{' '}
                        <span className="text-string-green">&quot;Initializing contact form...&quot;</span>
                      </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name Field */}
                      <div>
                        <label className="block text-sm text-secondary mb-2 font-mono">
                          <span className="text-keyword-purple">read</span>{' '}
                          <span className="text-gopher-blue">-p</span>{' '}
                          <span className="text-string-green">&quot;{t('form.fields.name')}: &quot;</span>{' '}
                          <span className="text-white">name</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={t('form.placeholders.name')}
                          className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white font-mono text-sm focus:border-gopher-blue focus:outline-none focus:ring-1 focus:ring-gopher-blue transition-colors"
                          required
                        />
                      </div>

                      {/* Email Field */}
                      <div>
                        <label className="block text-sm text-secondary mb-2 font-mono">
                          <span className="text-keyword-purple">read</span>{' '}
                          <span className="text-gopher-blue">-p</span>{' '}
                          <span className="text-string-green">&quot;{t('form.fields.email')}: &quot;</span>{' '}
                          <span className="text-white">email</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder={t('form.placeholders.email')}
                          className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white font-mono text-sm focus:border-gopher-blue focus:outline-none focus:ring-1 focus:ring-gopher-blue transition-colors"
                          required
                        />
                      </div>

                      {/* Subject Field */}
                      <div>
                        <label className="block text-sm text-secondary mb-2 font-mono">
                          <span className="text-keyword-purple">read</span>{' '}
                          <span className="text-gopher-blue">-p</span>{' '}
                          <span className="text-string-green">&quot;{t('form.fields.subject')}: &quot;</span>{' '}
                          <span className="text-white">subject</span>
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder={t('form.placeholders.subject')}
                          className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white font-mono text-sm focus:border-gopher-blue focus:outline-none focus:ring-1 focus:ring-gopher-blue transition-colors"
                          required
                        />
                      </div>

                      {/* Message Field */}
                      <div>
                        <label className="block text-sm text-secondary mb-2 font-mono">
                          <span className="text-keyword-purple">read</span>{' '}
                          <span className="text-gopher-blue">-p</span>{' '}
                          <span className="text-string-green">&quot;{t('form.fields.message')}: &quot;</span>{' '}
                          <span className="text-white">message</span>
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder={t('form.placeholders.message')}
                          rows={4}
                          className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white font-mono text-sm focus:border-gopher-blue focus:outline-none focus:ring-1 focus:ring-gopher-blue transition-colors resize-y"
                          required
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-4">
                        <div className="terminal-line mb-3">
                          <span className="text-comment-gray"># Execute send command</span>
                        </div>
                        <motion.button
                          type="submit"
                          className="bg-gopher-blue hover:bg-gopher-blue-hover text-black font-mono font-semibold px-4 py-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gopher-blue focus:ring-offset-2 focus:ring-offset-black"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="text-black">./send_message.sh</span>
                        </motion.button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </div>

              {/* Vertical Divider */}
              <div className="hidden lg:flex justify-center items-start lg:flex-shrink-0">
                <div className="w-px bg-gray-700 h-full min-h-96"></div>
              </div>

              {/* Right Side - Social Links */}
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

            </div>
          </div>
        </div>
        )}
      </div>
    </section>
  );
}
