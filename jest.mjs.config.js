/* eslint-disable */
module.exports = {
  displayName: 'http',
  preset: './jest.preset.js',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      { tsconfig: '<rootDir>/tsconfig.mjs.spec.json' },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: './coverage/mjs',
};
