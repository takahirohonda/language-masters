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
    },
  },
  plugins: [],
}

module.exports = config
