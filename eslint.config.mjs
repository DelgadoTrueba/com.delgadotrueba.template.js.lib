import js from '@eslint/js';
import ts from 'typescript-eslint';
import globals from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig(
  globalIgnores([
    'node_modules',
    'dist',
    'coverage',
    'scripts',
    'commitlint.config.js',
    'jest.cjs.config.js',
    'jest.mjs.config.js',
    'jest.preset.js',
    'lint-staged.config.js',
  ]),
  [
    // Entorno (define las variable globales de node / browser)
    {
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: { ...globals.browser, ...globals.node },
      },
    },
    {
      files: ['*.{js,mjs,cjs}'],
      ...js.configs.recommended,
    },
    {
      files: ['*.{ts,tsx,mts,cts}'],
      ...ts.configs.recommended,
    },
    {
      rules: {}
    },
    // Quita reglas de estilo que choquen con Prettier
    prettierConfig,
  ],
);
