import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            h1: {
              fontWeight: '700',
              fontSize: '2.25rem',
              marginTop: '2em',
              marginBottom: '1em',
              color: 'inherit',
            },
            h2: {
              fontWeight: '600',
              fontSize: '1.875rem',
              marginTop: '1.5em',
              marginBottom: '0.75em',
              color: 'inherit',
            },
            h3: {
              fontWeight: '600',
              fontSize: '1.5rem',
              marginTop: '1.25em',
              marginBottom: '0.5em',
              color: 'inherit',
            },
            strong: {
              fontWeight: '600',
              color: 'inherit',
            },
            a: {
              color: 'inherit',
              textDecoration: 'underline',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config; 