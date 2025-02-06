const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')
const { join } = require('path')
const { THEME } = require('../../libs/components/common/tailwind.config')
/** @type {import('tailwindcss').Config} */
module.exports = {
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
