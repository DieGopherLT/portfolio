'use client';

import TerminalFooter from '@/components/TerminalFooter';
import TerminalWindow from '@/components/TerminalWindow';
import { ANIMATION_DELAYS } from '@/constants/animations';
import { useAOSVisibility } from '@/hooks/useAOSVisibility';

import { useCallback, useState } from 'react';

import { useTranslations } from 'next-intl';

interface Job {
  company: string;
  position: string;
  period: string;
  type: string;
  website_url?: string;
  achievements: string[];
  technologies: string[];
  highlights: string;
}

export default function Experience() {
  const t = useTranslations('sections.experience');
  const [showContent, setShowContent] = useState(false);
  const { ref, shouldRender } = useAOSVisibility({ threshold: 0.2 });

  const handleTypingComplete = useCallback(() => {
    setTimeout(() => setShowContent(true), ANIMATION_DELAYS.MEDIUM);
  }, []);

  const jobs: Job[] = t.raw('jobs') as Job[];

  return (
    <section
      ref={ref}
      id="experience"
      className="min-h-screen px-4 py-10"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-4xl">
        <h2
          id="experience-heading"
          className="mb-8 text-center text-4xl font-light text-white md:text-5xl"
          data-aos="fade-up"
          data-aos-duration="300"
          data-aos-once="true"
        >
          {t('title')}
        </h2>

        {/* Terminal Window con renderizado condicional */}
        {shouldRender && (
          <div data-aos="fade-up" data-aos-delay="800" data-aos-duration="300" data-aos-once="true">
            <TerminalWindow
              title="work_history.log"
              command={t('terminal_command').replace('diegopher@portfolio:~$ ', '')}
              onTypingComplete={handleTypingComplete}
              className="mx-auto max-w-4xl"
            />
          </div>
        )}

        {showContent && (
          <div
            className="mx-auto mt-8 max-w-4xl"
            data-aos="fade-up"
            data-aos-duration="400"
            data-aos-once="true"
          >
            <div className="rounded-lg border border-gray-800 bg-black p-4 font-mono text-white md:p-8">
              <div className="space-y-8">
                {jobs.map((job, index) => (
                  <div
                    key={index}
                    className="border-gopher-blue border-l-2 pb-6 pl-4 last:pb-0 md:pl-6"
                    data-aos="fade-right"
                    data-aos-duration="500"
                    data-aos-delay={index * 200}
                    data-aos-once="true"
                  >
                    {/* Job Header */}
                    <div className="mb-4">
                      <div className="mb-2 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                        <h3 className="text-lg font-bold text-white md:text-xl">{job.position}</h3>
                        <span className="text-secondary self-start rounded bg-gray-800 px-2 py-1 text-xs md:text-sm lg:self-center">
                          {job.type}
                        </span>
                      </div>
                      <p className="text-gopher-blue text-base font-semibold md:text-lg">{job.company}</p>
                      <p className="text-muted mt-1 text-xs md:text-sm">{job.period}</p>

                      {/* Company Website - whois style */}
                      {job.website_url && (
                        <div className="mt-3 rounded border border-gray-700 bg-gray-900 p-2">
                          <div className="font-mono text-xs">
                            <span className="text-muted">
                              $ whois {job.company.replace(' ', '\\ ')} | grep &apos;Website:&apos;
                            </span>
                            <br />
                            <span className="text-terminal-green">Website: </span>
                            <a
                              href={job.website_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gopher-blue hover:text-gopher-blue-hover underline transition-colors"
                            >
                              {job.website_url}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Highlights */}
                    <div className="border-terminal-green mb-4 rounded border-l-2 bg-gray-900 p-3">
                      <p className="text-terminal-green text-xs md:text-sm">
                        <span className="font-semibold">💡 {t('labels.highlight')}:</span> {job.highlights}
                      </p>
                    </div>

                    {/* Achievements */}
                    <div className="mb-4">
                      <h4 className="text-secondary mb-3 text-xs font-semibold tracking-wide uppercase md:text-sm">
                        {t('labels.achievements')}
                      </h4>
                      <ul className="space-y-2">
                        {job.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-secondary flex items-start gap-3 text-xs md:text-sm">
                            <span className="text-gopher-blue mt-1 flex-shrink-0 text-xs">▶</span>
                            <span className="leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-secondary mb-3 text-xs font-semibold tracking-wide uppercase md:text-sm">
                        {t('labels.tech_stack')}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-gopher-blue cursor-default rounded border border-gray-700 bg-gray-800 px-2 py-1 font-mono text-xs transition-colors hover:bg-gray-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                <TerminalFooter path="~/experience" />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
