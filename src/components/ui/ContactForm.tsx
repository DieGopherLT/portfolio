'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useTerminalCursor } from '@/hooks/useTerminalCursor';
import { useForm } from 'react-hook-form';

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
  const cursor = useTerminalCursor();
  
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    mode: 'onBlur',
    reValidateMode: 'onChange'
  });

  const onSubmit = (data: ContactFormData) => {
    console.log('Form submitted:', data);
  };

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  return (
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="flex justify-between items-center text-sm text-secondary mb-2 font-mono">
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
                  required: t('form.errors.name.required')
                })}
                placeholder={t('form.placeholders.name')}
                className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white font-mono text-sm focus:border-gopher-blue focus:outline-none focus:ring-1 focus:ring-gopher-blue transition-colors"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="flex justify-between items-center text-sm text-secondary mb-2 font-mono">
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
                    message: t('form.errors.email.invalid')
                  }
                })}
                placeholder={t('form.placeholders.email')}
                className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white font-mono text-sm focus:border-gopher-blue focus:outline-none focus:ring-1 focus:ring-gopher-blue transition-colors"
              />
            </div>

            {/* Subject Field */}
            <div>
              <label className="flex justify-between items-center text-sm text-secondary mb-2 font-mono">
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
                  required: t('form.errors.subject.required')
                })}
                placeholder={t('form.placeholders.subject')}
                className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white font-mono text-sm focus:border-gopher-blue focus:outline-none focus:ring-1 focus:ring-gopher-blue transition-colors"
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="flex justify-between items-center text-sm text-secondary mb-2 font-mono">
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
                  required: t('form.errors.message.required')
                })}
                placeholder={t('form.placeholders.message')}
                rows={4}
                className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white font-mono text-sm focus:border-gopher-blue focus:outline-none focus:ring-1 focus:ring-gopher-blue transition-colors resize-y"
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
  );
}