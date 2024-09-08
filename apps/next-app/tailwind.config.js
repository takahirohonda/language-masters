const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')
const { join } = require('path')
const { COLORS, CONTAINER } = require('../../tailwind.config.common')

/** @type {import('tailwindcss').Config} */
module.exports = {
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
    },
  },
  plugins: [],
}
