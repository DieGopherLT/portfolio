import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

// Custom components for MDX content

interface CalloutProps {
  type?: 'info' | 'warning' | 'error' | 'success';
  title?: string;
  children: ReactNode;
}

function Callout({ type = 'info', title, children }: CalloutProps) {
  const styles = {
    info: 'bg-info-bg border-info-border',
    warning: 'bg-warning-bg border-warning-border',
    error: 'bg-error-bg border-error-border',
    success: 'bg-success-bg border-success-border',
  };

  const icons = {
    info: 'ℹ',
    warning: '⚠',
    error: '✕',
    success: '✓',
  };

  return (
    <div className={`callout my-6 rounded-lg border p-4 ${styles[type]}`}>
      {title && (
        <div className="callout-title mb-2 flex items-center gap-2 text-sm font-semibold">
          <span>{icons[type]}</span>
          {title}
        </div>
      )}
      <div className="callout-content text-sm leading-relaxed">{children}</div>
    </div>
  );
}

interface CodeBlockProps {
  children: string;
  className?: string;
  filename?: string;
}

function CodeBlock({ children, className, filename }: CodeBlockProps) {
  const language = className?.replace('language-', '') || 'text';

  return (
    <div className="code-block bg-bg-code-block border-border-subtle my-6 overflow-hidden rounded-lg border">
      {filename && (
        <div className="code-header bg-bg-secondary border-border-subtle flex items-center justify-between border-b px-4 py-2">
          <span className="code-filename text-text-muted font-mono text-sm">{filename}</span>
          <button
            className="code-copy border-border-subtle hover:bg-gopher-blue hover:border-gopher-blue hover:text-bg-primary rounded border px-2 py-1 font-mono text-xs transition-all"
            onClick={() => navigator.clipboard.writeText(children)}
          >
            copy
          </button>
        </div>
      )}
      <pre className="overflow-x-auto p-4">
        <code className={`language-${language}`}>{children}</code>
      </pre>
    </div>
  );
}

interface TerminalOutputProps {
  children: ReactNode;
}

function TerminalOutput({ children }: TerminalOutputProps) {
  return (
    <div className="terminal-output bg-bg-code-block border-border-subtle my-6 rounded-lg border p-4 font-mono">
      {children}
    </div>
  );
}

interface FileTreeProps {
  children: ReactNode;
}

function FileTree({ children }: FileTreeProps) {
  return (
    <div className="file-tree bg-bg-code-block border-border-subtle my-6 rounded-lg border p-4">
      <pre className="tree-content text-text-secondary m-0 font-mono text-sm leading-relaxed">{children}</pre>
    </div>
  );
}

// Main MDX components mapping
export const MDXComponents = {
  // Override default HTML elements
  h1: ({ children, ...props }: any) => (
    <h1 className="text-text-primary mt-8 mb-6 text-3xl font-light first:mt-0" {...props}>
      {children}
    </h1>
  ),

  h2: ({ children, ...props }: any) => (
    <h2
      className="text-text-primary border-border-subtle mt-8 mb-4 border-b pb-2 text-2xl font-light"
      {...props}
    >
      {children}
    </h2>
  ),

  h3: ({ children, ...props }: any) => (
    <h3 className="text-text-primary mt-6 mb-3 text-xl font-light" {...props}>
      {children}
    </h3>
  ),

  p: ({ children, ...props }: any) => (
    <p className="text-text-secondary mb-4 leading-relaxed" {...props}>
      {children}
    </p>
  ),

  a: ({ href, children, ...props }: any) => {
    // Internal links
    if (href?.startsWith('/')) {
      return (
        <Link
          href={href}
          className="text-gopher-blue hover:text-gopher-blue-hover underline transition-colors"
          {...props}
        >
          {children}
        </Link>
      );
    }

    // Anchor links
    if (href?.startsWith('#')) {
      return (
        <a
          href={href}
          className="text-gopher-blue hover:text-gopher-blue-hover underline transition-colors"
          {...props}
        >
          {children}
        </a>
      );
    }

    // External links
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gopher-blue hover:text-gopher-blue-hover underline transition-colors"
        {...props}
      >
        {children}
      </a>
    );
  },

  img: ({ src, alt, title, ...props }: any) => (
    <figure className="figure my-8">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={400}
        className="figure-image border-border-subtle w-full rounded-lg border"
        {...props}
      />
      {title && (
        <figcaption className="figure-caption text-text-muted mt-3 text-center text-sm italic">
          {title}
        </figcaption>
      )}
    </figure>
  ),

  code: ({ children, ...props }: any) => (
    <code className="bg-bg-tertiary text-gopher-blue rounded px-1.5 py-0.5 font-mono text-sm" {...props}>
      {children}
    </code>
  ),

  pre: ({ children, ...props }: any) => (
    <pre
      className="bg-bg-code-block border-border-subtle my-6 overflow-x-auto rounded-lg border p-4 font-mono text-sm"
      {...props}
    >
      {children}
    </pre>
  ),

  ul: ({ children, ...props }: any) => (
    <ul className="text-text-secondary mb-4 list-inside list-disc space-y-2" {...props}>
      {children}
    </ul>
  ),

  ol: ({ children, ...props }: any) => (
    <ol className="text-text-secondary mb-4 list-inside list-decimal space-y-2" {...props}>
      {children}
    </ol>
  ),

  li: ({ children, ...props }: any) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),

  blockquote: ({ children, ...props }: any) => (
    <blockquote
      className="border-gopher-blue text-text-secondary my-6 border-l-4 py-2 pl-6 italic"
      {...props}
    >
      {children}
    </blockquote>
  ),

  hr: (props: any) => <hr className="border-border-subtle my-8" {...props} />,

  // Custom components
  Callout,
  CodeBlock,
  TerminalOutput,
  FileTree,

  // Layout components
  Grid: ({ children, cols = 2 }: { children: ReactNode; cols?: number }) => (
    <div className={`grid grid-cols-${cols} my-8 gap-6`}>{children}</div>
  ),
};
