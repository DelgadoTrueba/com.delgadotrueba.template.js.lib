import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';
import pluginImport from "eslint-plugin-import";
import globals from 'globals';
import ts from 'typescript-eslint';

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
      files: ['**/*.{js}'],
      ...js.configs.recommended,
    },
    {
      files: ['**/*.{ts}'],
      ...ts.configs.recommended,
      plugins: { import: pluginImport },
      settings: {
        // Para que "internal" respete tus paths de TS (paths/alias en tsconfig)
        "import/resolver": {
          typescript: { project: true }
        }
      },
      rules: {
        // 🔣 Reglas para los imports <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        "@typescript-eslint/consistent-type-imports": ["error", {
          prefer: "type-imports",
          fixStyle: "separate-type-imports"
        }],
        // pluginImport
        "import/order": ["error", {
          "groups": [
            "builtin",        // node:fs, path
            "external",       // react, lodash
            "internal",       // alias de tu app (tsconfig paths)
            ["parent", "sibling", "index"], // imports relativos sin saltos
            "object",
            "type"            // type-only imports
          ],
          // ¡Importante! Deja que tus pathGroups afecten también a "external"
          "pathGroupsExcludedImportTypes": ["builtin"],
          // Espaciado y orden alfabético
          "newlines-between": "always",
          "alphabetize": { order: "asc", caseInsensitive: true }
        }],
        "import/no-duplicates": "error"
      }
    },
    // Quita reglas de estilo que choquen con Prettier
    prettierConfig,
  ],
);
