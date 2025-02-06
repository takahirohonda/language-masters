const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')
const { join } = require('path')
const { COLORS, CONTAINER } = require('../../../tailwind.config.common')

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    container: CONTAINER,
    extend: {
      colors: COLORS,
      keyframes: {
        growLeft: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        growLeft: 'growLeft 500ms ease-in-out',
      },
      screens: {
        xs: '460px',
        sm: '768px',
        md: '1024px',
        lg: '1280px',
        xl: '1536px',
        '2xl': '1920px',
      },
    },
  },
  plugins: [],
}

module.exports = config
