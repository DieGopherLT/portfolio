import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { createHighlighter, type Highlighter } from 'shiki';

// Shiki highlighter instance (cached)
let highlighterPromise: Promise<Highlighter> | null = null;

async function getShikiHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-dark'],
      langs: ['typescript', 'javascript', 'go', 'rust', 'bash', 'json', 'yaml', 'css', 'html', 'markdown']
    });
  }
  return highlighterPromise;
}

export const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [
      remarkGfm,
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['anchor-link'],
          },
        },
      ],
    ],
  },
};

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function extractTOC(content: string): TOCItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Only include h2 and h3
    if (level >= 2 && level <= 3) {
      toc.push({
        id,
        text,
        level
      });
    }
  }

  return toc;
}

export async function highlightCode(code: string, lang: string): Promise<string> {
  try {
    const highlighter = await getShikiHighlighter();
    return highlighter.codeToHtml(code, {
      lang: lang || 'text',
      theme: 'github-dark',
    });
  } catch (error) {
    console.error('Error highlighting code:', error);
    return `<pre><code>${code}</code></pre>`;
  }
}

export { MDXRemote };