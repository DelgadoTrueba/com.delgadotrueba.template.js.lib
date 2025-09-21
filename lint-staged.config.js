/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
module.exports = {
  'src/utils-test/*.ts': ['tsc --noEmit', 'eslint -c .eslintrc.json'],
  'src/**/*.ts': ['tsc --noEmit', 'eslint -c .eslintrc.json', 'npm run test -- --findRelatedTests'],
};
