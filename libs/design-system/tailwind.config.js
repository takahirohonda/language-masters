const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')
const { join } = require('path')
const { THEME } = require('../../tailwind.config.common')

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: THEME,
  plugins: [],
}

module.exports = config
