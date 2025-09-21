/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
module.exports = {
  '**/*.ts': ['tsc --noEmit', 'eslint -c .eslintrc.json', 'npm run test -- --findRelatedTests'],
};
