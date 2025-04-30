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
              marginTop: '2em',
              marginBottom: '1em',
            },
            h2: {
              fontWeight: '600',
              marginTop: '1.5em',
              marginBottom: '0.75em',
            },
            h3: {
              fontWeight: '600',
              marginTop: '1.25em',
              marginBottom: '0.5em',
            },
            strong: {
              fontWeight: '600',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config; 