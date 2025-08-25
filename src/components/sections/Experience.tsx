'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import TerminalWindow from '@/components/TerminalWindow';

interface Job {
  company: string;
  position: string;
  period: string;
  type: string;
  achievements: string[];
  technologies: string[];
  highlights: string;
}

export default function Experience() {
  const t = useTranslations('sections.experience');
  const [showContent, setShowContent] = useState(false);

  const handleTypingComplete = useCallback(() => {
    setTimeout(() => setShowContent(true), 400);
  }, []);

  const jobs: Job[] = t.raw('jobs') as Job[];

  return (
    <section id="experience" className="min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-light text-white mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('title')}
        </motion.h2>

        <TerminalWindow
          title="work_history.log"
          command={t('terminal_command').replace('diegopher@portfolio:~$ ', '')}
          onTypingComplete={handleTypingComplete}
          className="max-w-3xl mx-auto"
        />

        {showContent && (
          <motion.div 
            className="mt-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-black border border-gray-800 rounded-lg p-4 md:p-8 font-mono text-white">
              <div className="space-y-8">
                {jobs.map((job, index) => (
                  <motion.div 
                    key={index}
                    className="border-l-2 border-gopher-blue pl-4 md:pl-6 pb-6 last:pb-0"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    {/* Job Header */}
                    <div className="mb-4">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 mb-2">
                        <h3 className="text-lg md:text-xl font-bold text-white">
                          {job.position}
                        </h3>
                        <span className="text-xs md:text-sm text-secondary bg-gray-800 px-2 py-1 rounded self-start lg:self-center">
                          {job.type}
                        </span>
                      </div>
                      <p className="text-base md:text-lg text-gopher-blue font-semibold">
                        {job.company}
                      </p>
                      <p className="text-xs md:text-sm text-muted mt-1">
                        {job.period}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div className="mb-4 p-3 bg-gray-900 rounded border-l-2 border-terminal-green">
                      <p className="text-xs md:text-sm text-terminal-green">
                        <span className="font-semibold">💡 {t('labels.highlight')}:</span> {job.highlights}
                      </p>
                    </div>

                    {/* Achievements */}
                    <div className="mb-4">
                      <h4 className="text-xs md:text-sm font-semibold text-secondary mb-3 uppercase tracking-wide">
                        {t('labels.achievements')}
                      </h4>
                      <ul className="space-y-2">
                        {job.achievements.map((achievement, idx) => (
                          <li 
                            key={idx} 
                            className="text-xs md:text-sm text-secondary flex items-start gap-3"
                          >
                            <span className="text-gopher-blue text-xs mt-1 flex-shrink-0">▶</span>
                            <span className="leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-xs md:text-sm font-semibold text-secondary mb-3 uppercase tracking-wide">
                        {t('labels.tech_stack')}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech, idx) => (
                          <span 
                            key={idx}
                            className="text-xs px-2 py-1 bg-gray-800 text-gopher-blue border border-gray-700 rounded font-mono hover:bg-gray-700 transition-colors cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Terminal Footer */}
                <div className="border-t border-gray-800 pt-4 mt-6">
                  <div className="text-xs text-muted">
                    <span className="text-gopher-blue">diegopher@portfolio</span>
                    <span className="text-secondary">:</span>
                    <span className="text-terminal-green">~/experience</span>
                    <span className="text-secondary">$ </span>
                    <span className="terminal-cursor">█</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
