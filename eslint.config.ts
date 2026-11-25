import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  {
    ignores: ['.greenwood/**', 'node_modules/**', 'public/**', 'reports/**']
  },
  {
    files: ['**/*.{js,ts,tsx}'],
    extends: [js.configs.recommended]
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [tseslint.configs.recommended],
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'error',
      // WCC uses JSX.IntrinsicElements declarations to type custom elements.
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-import-type-side-effects': 'error'
    }
  },
  {
    files: ['src/**/*.{js,ts,tsx}'],
    languageOptions: { globals: globals.browser }
  },
  {
    files: ['src/**/*.spec.ts'],
    languageOptions: { globals: globals.mocha }
  },
  {
    files: ['*.{js,ts}'],
    languageOptions: { globals: globals.node }
  }
);
