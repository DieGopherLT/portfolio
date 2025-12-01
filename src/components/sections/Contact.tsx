'use client';

import ContactForm from '@/components/ui/ContactForm';
import SocialMedia from '@/components/ui/SocialMedia';
import { useAOSVisibility } from '@/hooks/useAOSVisibility';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function Contact() {
  const t = useTranslations('sections.contact');
  const { ref, shouldRender } = useAOSVisibility({ threshold: 0.2 });

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

        {shouldRender && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="terminal-window"
          >
            {/* Terminal Header */}
            <div className="terminal-header">
              <div className="traffic-lights">
                <div className="traffic-light close"></div>
                <div className="traffic-light minimize"></div>
                <div className="traffic-light maximize"></div>
              </div>
              <div className="window-title">get_in_touch.sh</div>
            </div>

            {/* Terminal Content */}
            <div className="terminal-content">
              <div className="p-8">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="mb-1 text-2xl font-semibold text-white">{t('header.title')}</h3>
                  <p className="text-lg text-secondary">{t('header.subtitle')}</p>
                </div>

                {/* Divider */}
                <div className="mb-6 h-px bg-white/10"></div>

                {/* Split Layout - Form and Social */}
                <div className="gap-8 lg:grid lg:grid-cols-2">
                  {/* Left Side - Contact Form */}
                  <ContactForm />

                  {/* Right Side - Social Links */}
                  <SocialMedia />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
