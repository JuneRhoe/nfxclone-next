import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import jsxA11y from 'eslint-plugin-jsx-a11y'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
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
