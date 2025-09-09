'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TOCItem } from '@/lib/blog/mdx';

interface TableOfContentsProps {
  content: string;
  locale: 'en' | 'es';
}

export default function TableOfContents({ content, locale }: TableOfContentsProps) {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isVisible, setIsVisible] = useState(true);

  // Extract TOC from content
  useEffect(() => {
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const items: TOCItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      items.push({
        id,
        text,
        level
      });
    }

    setToc(items);
  }, [content]);

  // Intersection Observer for active heading
  useEffect(() => {
    if (toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -70% 0%' }
    );

    // Observe all headings
    toc.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [toc]);

  // Don't render if no TOC items
  if (toc.length === 0) return null;

  // Handle click to scroll to heading
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="toc-container sticky top-24 h-fit">
      <div className="terminal-window">
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="traffic-lights">
            <div className="traffic-light close"></div>
            <div className="traffic-light minimize"></div>
            <div className="traffic-light maximize"></div>
          </div>
          <div className="window-title">table_of_contents.sh</div>
        </div>

        {/* Terminal Content */}
        <div className="terminal-content">
          <div className="font-mono text-white p-4">
            {/* Tree Command */}
            <div className="mb-4">
              <div className="flex items-center gap-2 text-gopher-blue text-sm">
                <span>diegopher@blog:~$</span>
                <span className="text-white">tree -I "*.md" --dirsfirst</span>
              </div>
            </div>

            {/* Tree Output */}
            <div className="tree-output">
              <AnimatePresence>
                {toc.map((item, index) => {
                  const isActive = activeId === item.id;
                  const isLevel2 = item.level === 2;
                  const isLevel3 = item.level === 3;

                  return (
                    <motion.div
                      key={item.id}
                      className={`toc-item flex items-center text-sm leading-relaxed ${
                        isLevel3 ? 'ml-4' : ''
                      }`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {/* Tree Structure */}
                      <span className="tree-symbol text-text-muted mr-2">
                        {isLevel2 ? '├──' : '│   └──'}
                      </span>

                      {/* Clickable Link */}
                      <button
                        onClick={() => scrollToHeading(item.id)}
                        className={`toc-link relative text-left hover:text-gopher-blue transition-colors cursor-pointer ${
                          isActive 
                            ? 'text-gopher-blue font-medium' 
                            : 'text-text-secondary'
                        }`}
                        aria-label={`Go to ${item.text}`}
                      >
                        {item.text}
                        
                        {/* Underline for active/hover */}
                        <motion.div 
                          className={`absolute bottom-0 left-0 h-px bg-gopher-blue ${
                            isActive ? 'opacity-100' : 'opacity-0'
                          }`}
                          layoutId="activeUnderline"
                          initial={false}
                          animate={{ 
                            width: isActive ? '100%' : '0%',
                            opacity: isActive ? 1 : 0
                          }}
                          transition={{ duration: 0.2 }}
                        />
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-2 border-t border-border-subtle">
              <div className="text-text-muted text-xs font-mono">
                {toc.length} {locale === 'es' ? 'secciones' : 'sections'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}