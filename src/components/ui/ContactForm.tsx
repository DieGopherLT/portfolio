'use client';

import TerminalPrompt from '@/components/ui/TerminalPrompt';
import TerminalSpinner from '@/components/ui/TerminalSpinner';
import { ANIMATION_DELAYS, delay } from '@/constants/animations';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface ContactFormProps {
  showContent: boolean;
  formCommand: string;
  showFormCursor: boolean;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm({ showContent, formCommand, showFormCursor }: ContactFormProps) {
  const t = useTranslations('sections.contact');
  const [submitState, setSubmitState] = useState<'idle' | 'typing' | 'sending' | 'success'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitState('typing');

    // Simulate command animation timing
    await delay(ANIMATION_DELAYS.INITIAL);

    setSubmitState('sending');

    try {
      // Send message to Telegram
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitState('success');

      // Reset after showing success message
      setTimeout(() => {
        setSubmitState('idle');
        reset();
      }, 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitState('idle');
    }
  };

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  return (
    <div className="space-y-4 lg:flex-1">
      {/* Form prompt with typing animation */}
      <div className="border-b border-gray-800 pb-4">
        <TerminalPrompt command={formCommand} showCursor={showFormCursor} cursorState="typing" />
      </div>

      {showContent && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Form script header */}
          <div className="mb-4 space-y-2">
            <div className="terminal-line">
              <span className="text-terminal-green">#!/bin/bash</span>
            </div>
            <div className="terminal-line">
              <span className="text-comment-gray"># Contact Form Script</span>
            </div>
            <div className="terminal-line text-sm md:text-[1.1rem]">
              <span className="text-keyword-purple">echo</span>{' '}
              <span className="text-string-green">&quot;Initializing contact form...&quot;</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="text-secondary mb-2 flex items-center justify-between font-mono text-sm">
                <span>
                  <span className="text-keyword-purple">read</span>{' '}
                  <span className="text-gopher-blue">-p</span>{' '}
                  <span className="text-string-green">&quot;{t('form.fields.name')}: &quot;</span>{' '}
                  <span className="text-white">name</span>
                </span>
                {errors.name && (
                  <span className="text-error-red">
                    <span className="text-comment-gray"># </span>
                    {errors.name.message}
                  </span>
                )}
              </label>
              <input
                type="text"
                {...register('name', {
                  required: t('form.errors.name.required'),
                })}
                placeholder={t('form.placeholders.name')}
                className="focus:border-gopher-blue focus:ring-gopher-blue w-full rounded border border-gray-700 bg-gray-900 px-3 py-2 font-mono text-sm text-white transition-colors focus:ring-1 focus:outline-none"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="text-secondary mb-2 flex items-center justify-between font-mono text-sm">
                <span>
                  <span className="text-keyword-purple">read</span>{' '}
                  <span className="text-gopher-blue">-p</span>{' '}
                  <span className="text-string-green">&quot;{t('form.fields.email')}: &quot;</span>{' '}
                  <span className="text-white">email</span>
                </span>
                {errors.email && (
                  <span className="text-error-red">
                    <span className="text-comment-gray"># </span>
                    {errors.email.message}
                  </span>
                )}
              </label>
              <input
                type="email"
                {...register('email', {
                  required: t('form.errors.email.required'),
                  pattern: {
                    value: emailRegex,
                    message: t('form.errors.email.invalid'),
                  },
                })}
                placeholder={t('form.placeholders.email')}
                className="focus:border-gopher-blue focus:ring-gopher-blue w-full rounded border border-gray-700 bg-gray-900 px-3 py-2 font-mono text-sm text-white transition-colors focus:ring-1 focus:outline-none"
              />
            </div>

            {/* Subject Field */}
            <div>
              <label className="text-secondary mb-2 flex items-center justify-between font-mono text-sm">
                <span>
                  <span className="text-keyword-purple">read</span>{' '}
                  <span className="text-gopher-blue">-p</span>{' '}
                  <span className="text-string-green">&quot;{t('form.fields.subject')}: &quot;</span>{' '}
                  <span className="text-white">subject</span>
                </span>
                {errors.subject && (
                  <span className="text-error-red">
                    <span className="text-comment-gray"># </span>
                    {errors.subject.message}
                  </span>
                )}
              </label>
              <input
                type="text"
                {...register('subject', {
                  required: t('form.errors.subject.required'),
                })}
                placeholder={t('form.placeholders.subject')}
                className="focus:border-gopher-blue focus:ring-gopher-blue w-full rounded border border-gray-700 bg-gray-900 px-3 py-2 font-mono text-sm text-white transition-colors focus:ring-1 focus:outline-none"
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="text-secondary mb-2 flex items-center justify-between font-mono text-sm">
                <span>
                  <span className="text-keyword-purple">read</span>{' '}
                  <span className="text-gopher-blue">-p</span>{' '}
                  <span className="text-string-green">&quot;{t('form.fields.message')}: &quot;</span>{' '}
                  <span className="text-white">message</span>
                </span>
                {errors.message && (
                  <span className="text-error-red">
                    <span className="text-comment-gray"># </span>
                    {errors.message.message}
                  </span>
                )}
              </label>
              <textarea
                {...register('message', {
                  required: t('form.errors.message.required'),
                })}
                placeholder={t('form.placeholders.message')}
                rows={4}
                className="focus:border-gopher-blue focus:ring-gopher-blue w-full resize-y rounded border border-gray-700 bg-gray-900 px-3 py-2 font-mono text-sm text-white transition-colors focus:ring-1 focus:outline-none"
              />
            </div>

            {/* Submit Section */}
            <div className="pt-4">
              <div className="terminal-line mb-3">
                <span className="text-comment-gray"># Execute send command</span>
              </div>

              {submitState === 'idle' && (
                <motion.button
                  type="submit"
                  className="bg-gopher-blue hover:bg-gopher-blue-hover focus:ring-gopher-blue rounded px-4 py-2 font-mono font-semibold text-black transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-black">./send_message.sh</span>
                </motion.button>
              )}

              {submitState === 'typing' && (
                <div className="terminal-line">
                  <TerminalPrompt command="./send_message.sh" showCursor={true} cursorState="typing" />
                </div>
              )}

              {submitState === 'sending' && (
                <div className="space-y-2">
                  <div className="terminal-line">
                    <TerminalPrompt command="./send_message.sh" showCursor={false} />
                  </div>
                  <div className="terminal-line flex items-center gap-2">
                    <TerminalSpinner />
                    <span className="text-terminal-green font-mono text-sm">Sending message...</span>
                  </div>
                </div>
              )}

              {submitState === 'success' && (
                <div className="space-y-2">
                  <div className="terminal-line">
                    <TerminalPrompt command="./send_message.sh" showCursor={false} />
                  </div>
                  <div className="terminal-line">
                    <span className="text-terminal-green font-mono text-sm">
                      ✓ Message sent successfully!
                    </span>
                  </div>
                  <div className="terminal-line">
                    <TerminalPrompt command="" showCursor={true} cursorState="blinking" />
                  </div>
                </div>
              )}
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
}
