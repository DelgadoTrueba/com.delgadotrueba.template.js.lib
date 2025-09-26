import { configs as jsConfigs } from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { importX } from 'eslint-plugin-import-x';
import globals from 'globals';
import { configs as tsConfigs } from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
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
  // Entorno Global (define las variable globales de node / browser)
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
  },

  // Presets para JS
  jsConfigs.recommended,
  importX.flatConfigs.recommended,

  // Presets para TS
  ...tsConfigs.recommended,
  importX.flatConfigs.typescript,

  // Capa de reglas propia para TS
  {
    files: ['**/*.ts'],
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          project: './tsconfig.base.json',
        }),
      ],
    },
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      // 🔣 Reglas para los imports <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],
      // pluginImportX
      'import-x/order': [
        'error',
        {
          groups: [
            'builtin', // node:fs, path
            'external', // react, lodash
            'internal', // alias de tu app (tsconfig paths)
            ['parent', 'sibling', 'index'], // imports relativos sin saltos
            'object',
            'type', // type-only imports
          ],
          // pathGroups: [
          //   // React siempre primero dentro de "external"
          //   { pattern: 'react', group: 'external', position: 'before' },
          //   { pattern: 'react-dom', group: 'external', position: 'before' },
          //   // Todos los @org/* (monorepo) van al inicio de external
          //   { pattern: '@mi-org/**', group: 'external', position: 'before' },

          //   // Alias internos de la app (caen en "internal" gracias al resolver TS)
          //   { pattern: '@/*', group: 'internal', position: 'before' },
          //   { pattern: '~/*', group: 'internal' },

          //   // Estilos al final de los relativos/internos
          //   {
          //     pattern: '**/*.{css,scss,sass,less}',
          //     group: 'index',
          //     position: 'after',
          //   },

          //   // Side-effect imports (vite plugins, polyfills)
          //   { pattern: '\u0000*', group: 'external', position: 'after' },
          // ],
          // ¡Importante! Deja que tus pathGroups afecten también a "external"
          pathGroupsExcludedImportTypes: ['builtin'],
          // Espaciado y orden alfabético
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import-x/no-duplicates': 'error',
    },
  },
  // 🔕 Apaga reglas de estilo conflictivas con Prettier
  prettierConfig,
]);
