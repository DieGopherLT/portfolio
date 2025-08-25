import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#000000',
        'text-primary': '#FFFFFF',
        'text-secondary': '#8B949E',
        'text-muted': '#6E7681',
        'gopher-blue': '#00ADD8',
        'gopher-blue-hover': '#00B4D6',
        'gopher-blue-muted': '#007D9C',
        'terminal-green': '#39D353',
        'warning-yellow': '#F1C40F',
        'error-red': '#E74C3C',
        'ts-blue': '#007ACC',
        'go-cyan': '#00ADD8',
        'string-green': '#98C379',
        'keyword-purple': '#C678DD',
        'comment-gray': '#5C6370',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'SF Mono', 'ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
