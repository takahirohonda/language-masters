const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')
const { join } = require('path')
const { COLORS } = require('../../tailwind.config.common')

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
    colors: COLORS,
    container: CONTAINER,
    extend: {},
  },
  plugins: [],
}
