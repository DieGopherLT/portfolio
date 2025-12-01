'use client';

import TerminalWindow from '@/components/TerminalWindow';
import ContactForm from '@/components/ui/ContactForm';
import SocialMedia from '@/components/ui/SocialMedia';
import { useAOSVisibility } from '@/hooks/useAOSVisibility';

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
          <TerminalWindow
            title="get_in_touch.sh"
            className="mx-auto max-w-6xl"
          >
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
          </TerminalWindow>
        )}
      </div>
    </section>
  );
}
