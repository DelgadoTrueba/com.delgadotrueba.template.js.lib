/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
module.exports = {
  '!src/**/*': ['prettier --write'],
  'src/**/*': ['prettier --check'],
  'src/utils-test/*.ts': [
    'tsc --noEmit --skipLibCheck',
    'eslint -c .eslint.config.ts',
  ],
  'src/**/*.ts': [
    'tsc --noEmit --skipLibCheck',
    'eslint -c eslint.config.ts',
    'npm run test -- --findRelatedTests',
  ],
};
