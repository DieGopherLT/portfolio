'use client';

import { motion } from 'framer-motion';

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/DieGopherLT',
      username: 'DieGopherLT'
    },
    {
      name: 'LinkedIn', 
      url: 'https://linkedin.com/in/diegopher',
      username: 'diegopher'
    }
  ];

  return (
    <motion.footer 
      className={`mt-20 py-8 border-t border-zinc-800 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 max-w-4xl">
          {/* Terminal separator line */}
          <div className="text-text-muted font-mono text-sm">
            ================================
          </div>
          
          {/* Social links in terminal style */}
          <div className="font-mono text-sm text-text-secondary space-y-1">
            <div className="text-gopher-blue">$ cat social-links.md</div>
            <div className="pl-4 space-y-1">
              {socialLinks.map((link) => (
                <motion.div key={link.name} whileHover={{ x: 4 }}>
                  <span className="text-text-muted">• </span>
                  <a 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gopher-blue hover:text-gopher-blue-hover underline transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                  <span className="text-text-muted"> - @{link.username}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-text-muted text-sm">
            © {currentYear} Diego López Torres
          </div>

          {/* Terminal prompt with blinking cursor */}
          <motion.div 
            className="font-mono text-sm text-gopher-blue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span>diegopher@portfolio:~$ </span>
            <motion.span
              className="terminal-cursor"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1.06, ease: "linear" }}
            >
              █
            </motion.span>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}