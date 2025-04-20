import { FlatCompat } from '@eslint/eslintrc'
import jsxA11y from 'eslint-plugin-jsx-a11y'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const a11yRecommended = {
  name: 'jsx-a11y/recommended',
  plugins: {
    'jsx-a11y': jsxA11y,
  },
  languageOptions: {
    parserOptions: {
      ...jsxA11y.configs.recommended.parserOptions,
    },
  },
  rules: {
    ...jsxA11y.configs.recommended.rules,
  },
}

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  a11yRecommended,
]

export default eslintConfig
