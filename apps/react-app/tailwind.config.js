const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')
const { join } = require('path')
const {
  CONTAINER,
  COLORS,
} = require('../../libs/components/common/tailwind.config')

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
