module.exports = [
  {
    path: './dist/esm/src/index.js',
  },
  {
    limit: '1 kB',
    path: './dist/esm/src/features/datetime/*/index.js',
  },
];
