// eslint.config.js
// flat ESLint config w/ TypeScript, React, & Prettier

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettier from 'eslint-plugin-prettier/recommended'
import localRules from '@ggfincke/eslint-config/rules'

const typeImportRules = {
  '@typescript-eslint/consistent-type-imports': [
    'error',
    {
      prefer: 'type-imports',
      disallowTypeAnnotations: true,
      fixStyle: 'separate-type-imports',
    },
  ],
}

const projectRules = {
  // custom comment style rules
  'ggfincke/no-jsdoc-blocks': 'error',
  'ggfincke/file-header': 'error',
  'ggfincke/comment-style-guide': 'warn',
  'no-inline-comments': 'error',
  // enforce type imports w/ verbatimModuleSyntax
  ...typeImportRules,
}

const baseTypeScriptExtends = [
  js.configs.recommended,
  tseslint.configs.recommended,
  prettier,
]

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      jsxA11y.flatConfigs.recommended,
      prettier,
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      ggfincke: localRules,
    },
    rules: {
      ...projectRules,
      // allow tabIndex on non-interactive elements for tooltip keyboard access
      'jsx-a11y/no-noninteractive-tabindex': [
        'warn',
        { tags: [], roles: [], allowExpressionValues: true },
      ],
    },
  },
  {
    files: ['tests/ui/**/*.{ts,tsx}', 'vitest.setup.ts'],
    extends: [
      ...baseTypeScriptExtends,
      reactHooks.configs['recommended-latest'],
      jsxA11y.flatConfigs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      ggfincke: localRules,
    },
    rules: projectRules,
  },
  {
    files: ['tests/**/*.{ts,tsx}'],
    ignores: ['tests/ui/**'],
    extends: baseTypeScriptExtends,
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.node,
    },
    plugins: {
      ggfincke: localRules,
    },
    rules: projectRules,
  },
  {
    files: ['scripts/**/*.ts', 'vite.config.ts', 'vitest.config.ts'],
    extends: baseTypeScriptExtends,
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.node,
    },
    plugins: {
      ggfincke: localRules,
    },
    rules: projectRules,
  },
])
