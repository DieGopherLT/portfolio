'use client';

import TerminalFooter from '@/components/TerminalFooter';
import TerminalWindow from '@/components/TerminalWindow';
import { useAOSVisibility } from '@/hooks/useAOSVisibility';

import { useCallback, useState } from 'react';

import { useTranslations } from 'next-intl';

interface SkillCategory {
  name: string;
  skills: string[];
}

interface SkillsCategories {
  conceptual: SkillCategory;
  backend: SkillCategory;
  frontend: SkillCategory;
  tooling: SkillCategory;
}

export default function Skills() {
  const t = useTranslations('sections.skills');
  const [showContent, setShowContent] = useState(false);
  const { ref, shouldRender } = useAOSVisibility({ threshold: 0.2 });

  const handleTypingComplete = useCallback(() => {
    setTimeout(() => setShowContent(true), 400);
  }, []);

  const categories: SkillsCategories = t.raw('categories') as SkillsCategories;
  const highlightedLanguages: string[] = t.raw('highlighted_languages') as string[];
  const highlightedSkills: string[] = t.raw('highlighted_skills') as string[];
  const skillLevels: Record<string, string> = t.raw('skill_levels') as Record<string, string>;

  const isHighlighted = (skill: string): boolean => {
    return highlightedSkills.includes(skill);
  };

  const sortSkillsByHighlight = (skills: string[]): string[] => {
    return skills.sort((a, b) => {
      const aHighlighted = isHighlighted(a);
      const bHighlighted = isHighlighted(b);

      // Si ambos están resaltados o ninguno está resaltado, mantener orden original
      if (aHighlighted === bHighlighted) {
        return 0;
      }

      // Los resaltados van primero
      return aHighlighted ? -1 : 1;
    });
  };

  const getSkillLevel = (skill: string): string => {
    return skillLevels[skill] || '';
  };

  const getCategoryIcon = (categoryKey: string): string => {
    const icons: Record<string, string> = {
      conceptual: '🧠',
      backend: '⚙️',
      frontend: '🎨',
      tooling: '🔧',
    };
    return icons[categoryKey] || '📋';
  };

  const getCategoryColor = (categoryKey: string): string => {
    const colors: Record<string, string> = {
      conceptual: 'text-keyword-purple',
      backend: 'text-gopher-blue',
      frontend: 'text-ts-blue',
      tooling: 'text-terminal-green',
    };
    return colors[categoryKey] || 'text-secondary';
  };

  return (
    <section ref={ref} id="skills" className="min-h-screen px-4 py-10" aria-labelledby="skills-heading">
      <div className="mx-auto max-w-4xl">
        <h2
          id="skills-heading"
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
              title="skills_inventory.json"
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
                {/* Header Info */}
                <div className="border-b border-gray-800 pb-4">
                  <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <span className="text-gopher-blue font-semibold">{t('labels.overview')}</span>
                    <span className="text-secondary rounded bg-gray-800 px-2 py-1 text-xs">
                      {t('expertise_level')}
                    </span>
                  </div>
                  <div className="text-secondary text-sm">
                    <div className="flex flex-wrap gap-4">
                      <div>
                        {t('labels.specialization')}: {t('labels.backend_development')}
                      </div>
                      <div>
                        {t('labels.main_languages')}: {highlightedLanguages.join(', ')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills Categories */}
                <div className="space-y-6">
                  {Object.entries(categories).map(([categoryKey, category], index) => (
                    <div
                      key={categoryKey}
                      className="border-gopher-blue border-l-2 pl-4 md:pl-6"
                      data-aos="fade-right"
                      data-aos-duration="500"
                      data-aos-delay={index * 150}
                      data-aos-once="true"
                    >
                      <div className="mb-4">
                        <h3 className={`text-lg font-bold md:text-xl ${getCategoryColor(categoryKey)} mb-2`}>
                          {getCategoryIcon(categoryKey)} {category.name}
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        {sortSkillsByHighlight(category.skills).map((skill: string, idx: number) => (
                          <div
                            key={idx}
                            className={`cursor-default rounded border px-3 py-2 text-xs transition-all duration-200 hover:scale-105 md:text-sm ${
                              isHighlighted(skill)
                                ? 'bg-gopher-blue/10 border-gopher-blue text-gopher-blue font-semibold'
                                : 'text-secondary border-gray-700 bg-gray-800 hover:bg-gray-700'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              {isHighlighted(skill) && <span className="text-warning-yellow text-xs">★</span>}
                              {skill}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Highlighted Languages Section */}
                <div className="border-t border-gray-800 pt-6">
                  <div className="mb-4">
                    <h4 className="text-secondary mb-3 text-sm font-semibold tracking-wide uppercase">
                      {t('labels.highlighted_section')}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {highlightedLanguages.map((lang: string, idx: number) => {
                      const skill =
                        `${lang} (Golang)` === `${lang} (Golang)` && lang === 'Go' ? 'Go (Golang)' : lang;
                      const level = getSkillLevel(skill);
                      const isIntermediate = level === 'Intermediate' || level === 'Intermedio';

                      return (
                        <div
                          key={idx}
                          className="bg-gopher-blue/5 border-gopher-blue flex items-center gap-3 rounded-lg border p-3"
                        >
                          <span
                            className={`text-lg ${isIntermediate ? 'text-warning-yellow' : 'text-warning-yellow'}`}
                          >
                            {isIntermediate ? '◐' : '★'}
                          </span>
                          <div>
                            <div className="text-gopher-blue text-sm font-semibold">{lang}</div>
                            <div className="text-secondary text-xs">
                              {isIntermediate
                                ? t('labels.intermediate_experience')
                                : t('labels.advanced_experience')}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <TerminalFooter path="~/skills" />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
