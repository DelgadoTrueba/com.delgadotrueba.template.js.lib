module.exports = {
  '**/*.ts': ['eslint -c .eslintrc.json', 'npm run test -- --findRelatedTests'],
};
