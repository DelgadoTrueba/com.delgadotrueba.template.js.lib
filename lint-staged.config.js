/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
module.exports = {
  '!src/**/*': ['prettier --write'],
  'src/**/*': ['prettier --check'],
  'src/utils-test/*.ts': ['tsc --noEmit', 'eslint -c .eslintrc.json'],
  'src/**/*.ts': [
    'tsc --noEmit',
    'eslint -c eslint.config.mjs',
    'npm run test -- --findRelatedTests',
  ],
};
