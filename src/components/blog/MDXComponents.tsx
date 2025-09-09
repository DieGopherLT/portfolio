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
    success: 'bg-success-bg border-success-border'
  };

  const icons = {
    info: 'ℹ',
    warning: '⚠',
    error: '✕',
    success: '✓'
  };

  return (
    <div className={`callout my-6 p-4 rounded-lg border ${styles[type]}`}>
      {title && (
        <div className="callout-title flex items-center gap-2 font-semibold text-sm mb-2">
          <span>{icons[type]}</span>
          {title}
        </div>
      )}
      <div className="callout-content text-sm leading-relaxed">
        {children}
      </div>
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
    <div className="code-block my-6 rounded-lg overflow-hidden bg-bg-code-block border border-border-subtle">
      {filename && (
        <div className="code-header flex justify-between items-center px-4 py-2 bg-bg-secondary border-b border-border-subtle">
          <span className="code-filename font-mono text-sm text-text-muted">
            {filename}
          </span>
          <button 
            className="code-copy px-2 py-1 text-xs font-mono border border-border-subtle rounded hover:bg-gopher-blue hover:border-gopher-blue hover:text-bg-primary transition-all"
            onClick={() => navigator.clipboard.writeText(children)}
          >
            copy
          </button>
        </div>
      )}
      <pre className="p-4 overflow-x-auto">
        <code className={`language-${language}`}>
          {children}
        </code>
      </pre>
    </div>
  );
}

interface TerminalOutputProps {
  children: ReactNode;
}

function TerminalOutput({ children }: TerminalOutputProps) {
  return (
    <div className="terminal-output my-6 bg-bg-code-block border border-border-subtle rounded-lg p-4 font-mono">
      {children}
    </div>
  );
}

interface FileTreeProps {
  children: ReactNode;
}

function FileTree({ children }: FileTreeProps) {
  return (
    <div className="file-tree my-6 bg-bg-code-block border border-border-subtle rounded-lg p-4">
      <pre className="tree-content font-mono text-sm leading-relaxed text-text-secondary m-0">
        {children}
      </pre>
    </div>
  );
}

// Main MDX components mapping
export const MDXComponents = {
  // Override default HTML elements
  h1: ({ children, ...props }: any) => (
    <h1 className="text-3xl font-light text-text-primary mb-6 mt-8 first:mt-0" {...props}>
      {children}
    </h1>
  ),
  
  h2: ({ children, ...props }: any) => (
    <h2 className="text-2xl font-light text-text-primary mb-4 mt-8 border-b border-border-subtle pb-2" {...props}>
      {children}
    </h2>
  ),
  
  h3: ({ children, ...props }: any) => (
    <h3 className="text-xl font-light text-text-primary mb-3 mt-6" {...props}>
      {children}
    </h3>
  ),

  p: ({ children, ...props }: any) => (
    <p className="text-text-secondary leading-relaxed mb-4" {...props}>
      {children}
    </p>
  ),

  a: ({ href, children, ...props }: any) => {
    // Internal links
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className="text-gopher-blue underline hover:text-gopher-blue-hover transition-colors" {...props}>
          {children}
        </Link>
      );
    }
    
    // Anchor links
    if (href?.startsWith('#')) {
      return (
        <a href={href} className="text-gopher-blue underline hover:text-gopher-blue-hover transition-colors" {...props}>
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
        className="text-gopher-blue underline hover:text-gopher-blue-hover transition-colors"
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
        className="figure-image w-full rounded-lg border border-border-subtle"
        {...props}
      />
      {title && (
        <figcaption className="figure-caption mt-3 text-center text-text-muted text-sm italic">
          {title}
        </figcaption>
      )}
    </figure>
  ),

  code: ({ children, ...props }: any) => (
    <code 
      className="bg-bg-tertiary px-1.5 py-0.5 rounded text-sm font-mono text-gopher-blue" 
      {...props}
    >
      {children}
    </code>
  ),

  pre: ({ children, ...props }: any) => (
    <pre 
      className="bg-bg-code-block border border-border-subtle rounded-lg p-4 overflow-x-auto my-6 font-mono text-sm"
      {...props}
    >
      {children}
    </pre>
  ),

  ul: ({ children, ...props }: any) => (
    <ul className="list-disc list-inside space-y-2 mb-4 text-text-secondary" {...props}>
      {children}
    </ul>
  ),

  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 text-text-secondary" {...props}>
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
      className="border-l-4 border-gopher-blue pl-6 py-2 my-6 text-text-secondary italic"
      {...props}
    >
      {children}
    </blockquote>
  ),

  hr: (props: any) => (
    <hr className="border-border-subtle my-8" {...props} />
  ),

  // Custom components
  Callout,
  CodeBlock,
  TerminalOutput,
  FileTree,

  // Layout components
  Grid: ({ children, cols = 2 }: { children: ReactNode; cols?: number }) => (
    <div className={`grid grid-cols-${cols} gap-6 my-8`}>
      {children}
    </div>
  ),
};