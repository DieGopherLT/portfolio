'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import TerminalWindow from '@/components/TerminalWindow';
import TerminalFooter from '@/components/TerminalFooter';
import { useAOSVisibility } from '@/hooks/useAOSVisibility';

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
  const { ref, isVisible } = useAOSVisibility({ threshold: 0.2 });

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
      tooling: '🔧'
    };
    return icons[categoryKey] || '📋';
  };

  const getCategoryColor = (categoryKey: string): string => {
    const colors: Record<string, string> = {
      conceptual: 'text-keyword-purple',
      backend: 'text-gopher-blue',
      frontend: 'text-ts-blue',
      tooling: 'text-terminal-green'
    };
    return colors[categoryKey] || 'text-secondary';
  };

  return (
    <section ref={ref} id="skills" className="min-h-screen py-10 px-4" aria-labelledby="skills-heading">
      <div className="max-w-4xl mx-auto">
        <h2 
          id="skills-heading"
          className="text-4xl md:text-5xl font-light text-white mb-8 text-center"
          data-aos="fade-up"
          data-aos-duration="300"
          data-aos-once="true"
        >
          {t('title')}
        </h2>

        {/* Terminal Window con renderizado condicional */}
        <div
          className={clsx({
            'invisible': !isVisible
          })}
          data-aos="fade-up"
          data-aos-delay="800"
          data-aos-duration="300"
          data-aos-once="true"
        >
          <TerminalWindow
            title="skills_inventory.json"
            command={t('terminal_command').replace('diegopher@portfolio:~$ ', '')}
            isVisible={isVisible}
            onTypingComplete={handleTypingComplete}
            className="max-w-4xl mx-auto"
          />
        </div>

        <div 
          className={clsx('mt-8 max-w-4xl mx-auto', {
            'invisible': !showContent
          })}
          data-aos="fade-up"
          data-aos-duration="400"
          data-aos-once="true"
        >
          <div className="bg-black border border-gray-800 rounded-lg p-4 md:p-8 font-mono text-white">
            <div className="space-y-8">
                {/* Header Info */}
                <div className="border-b border-gray-800 pb-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                    <span className="text-gopher-blue font-semibold">{t('labels.overview')}</span>
                    <span className="text-xs text-secondary bg-gray-800 px-2 py-1 rounded">
                      {t('expertise_level')}
                    </span>
                  </div>
                  <div className="text-sm text-secondary">
                    <div className="flex flex-wrap gap-4">
                      <div>{t('labels.specialization')}: {t('labels.backend_development')}</div>
                      <div>{t('labels.main_languages')}: {highlightedLanguages.join(', ')}</div>
                    </div>
                  </div>
                </div>

                {/* Skills Categories */}
                <div className="space-y-6">
                  {Object.entries(categories).map(([categoryKey, category], index) => (
                    <div 
                      key={categoryKey}
                      className="border-l-2 border-gopher-blue pl-4 md:pl-6"
                      data-aos="fade-right"
                      data-aos-duration="500"
                      data-aos-delay={index * 150}
                      data-aos-once="true"
                    >
                      <div className="mb-4">
                        <h3 className={`text-lg md:text-xl font-bold ${getCategoryColor(categoryKey)} mb-2`}>
                          {getCategoryIcon(categoryKey)} {category.name}
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {sortSkillsByHighlight(category.skills).map((skill: string, idx: number) => (
                          <div 
                            key={idx}
                            className={clsx(
                              'text-xs md:text-sm px-3 py-2 rounded border transition-all duration-200 hover:scale-105 cursor-default',
                              {
                                'bg-gopher-blue/10 border-gopher-blue text-gopher-blue font-semibold': isHighlighted(skill),
                                'bg-gray-800 border-gray-700 text-secondary hover:bg-gray-700': !isHighlighted(skill)
                              }
                            )}
                          >
                            <span className="flex items-center gap-2">
                              {isHighlighted(skill) && (
                                <span className="text-warning-yellow text-xs">★</span>
                              )}
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
                    <h4 className="text-sm font-semibold text-secondary mb-3 uppercase tracking-wide">
                      {t('labels.highlighted_section')}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {highlightedLanguages.map((lang: string, idx: number) => {
                      const skill = `${lang} (Golang)` === `${lang} (Golang)` && lang === 'Go' ? 'Go (Golang)' : lang;
                      const level = getSkillLevel(skill);
                      const isIntermediate = level === 'Intermediate' || level === 'Intermedio';
                      
                      return (
                        <div 
                          key={idx}
                          className="flex items-center gap-3 p-3 bg-gopher-blue/5 border border-gopher-blue rounded-lg"
                        >
                          <span className={`text-lg ${isIntermediate ? 'text-warning-yellow' : 'text-warning-yellow'}`}>
                            {isIntermediate ? '◐' : '★'}
                          </span>
                          <div>
                            <div className="text-gopher-blue font-semibold text-sm">{lang}</div>
                            <div className="text-xs text-secondary">
                              {isIntermediate ? t('labels.intermediate_experience') : t('labels.advanced_experience')}
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
      </div>
    </section>
  );
}
