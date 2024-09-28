const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  // https://stackoverflow.com/questions/74878470/nx-and-jest-dont-find-all-my-tests-that-end-with-spec-tsx
  moduleFileExtensions: ['ts', 'tsx', 'js', 'mjs', 'html'],
  transform: {
    '^.+\\.(tsx?|js|html)$': [
      'ts-jest',
      {
        // this path is apps/react-app/tsconfig.spec.json
        tsconfig: '<rootDir>/tsconfig.spec.json',
        jsx: 'react',
      },
    ],
  },
};
