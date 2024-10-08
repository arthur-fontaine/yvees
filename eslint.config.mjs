import path from 'node:path'
import { fileURLToPath } from 'node:url'
import antfu from '@antfu/eslint-config'
import perfectionistPlugin from 'eslint-plugin-perfectionist'
import filenamePlugin from 'eslint-plugin-filename-rules'
import fpPlugin from 'eslint-plugin-fp'
import useEncapsulationPlugin from 'eslint-plugin-use-encapsulation'
import * as regexpPlugin from 'eslint-plugin-regexp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default antfu(
  {
    plugins: {
      fp: fpPlugin,
      'filename-rules': filenamePlugin,
      'use-encapsulation': useEncapsulationPlugin,
    },
    typescript: {
      filesTypeAware: ['**/*.{ts,tsx,d\\.ts}'],
      overrides: {
        'ts/no-import-type-side-effects': 'error',
        'ts/no-use-before-define': 'off',
        'ts/no-namespace': 'off',
      },
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json', './apps/*/tsconfig.json', './packages/*/tsconfig.json'],
      },
    },
    stylistic: {
      overrides: {
        'style/indent': ['error', 2, { flatTernaryExpressions: true }],
        'style/max-len': ['error', {
          code: 80,
          comments: 120,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreTrailingComments: true,
          ignoreUrls: true,
          tabWidth: 2,
        }],
        'style/multiline-ternary': 'off',
      },
    },
    rules: {
      'eslint-comments/no-unlimited-disable': 'off',
      ...perfectionistPlugin.configs['recommended-natural'].rules,
      'perfectionist/sort-imports': 'off',
      'import/order': [
        'error',
        {
          'groups': [
            'builtin',
            'external',
            'internal',
            ['sibling', 'parent'],
            'index',
            'unknown',
          ],
          'newlines-between': 'always',
          'alphabetize': {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      curly: ['error', 'all'],
      'filename-rules/not-match': [2, /(^index\..*)/],
      'fp/no-throw': 'error',
      'import/no-default-export': ['error'],
      'ts/no-explicit-any': ['error'],
      'unicorn/filename-case': ['error', { case: 'kebabCase', ignore: ['^.*\.md'] }],
      'unicorn/switch-case-braces': ['error'],
      'unicorn/no-null': ['error'],
      'jsdoc/match-description': ['error'],
      'jsdoc/require-description': ['error'],
      'jsdoc/require-description-complete-sentence': ['error'],
      'jsdoc/require-jsdoc': ['error', {
        publicOnly: true,
        require: {
          ArrowFunctionExpression: true,
          ClassDeclaration: true,
          ClassExpression: true,
          FunctionDeclaration: true,
          FunctionExpression: true,
          MethodDefinition: true,
        },
      }],
      'use-encapsulation/prefer-custom-hooks': ['error', {
        allow: [],
        block: [],
      }],
      'no-cond-assign': ['off']
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      'ts/naming-convention': [
        'error',
        ...getNamingConventionRules({ tsx: false }),
      ],
    },
  },
  {
    files: ['**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      'style/indent': 'off',
      'style/jsx-indent': ['error'],
      'style/max-len': ['error', {
        code: 80,
        comments: 120,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        tabWidth: 2,
      }],
      'ts/naming-convention': [
        'error',
        ...getNamingConventionRules({ tsx: true }),
      ],
    },
  },
  regexpPlugin.configs['flat/recommended'],
  {
    files: ['**/*.config.*'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  {
    ignores: [
      '**/__generated__/**',
      '**/*.config.*',
      'pnpm-lock.yaml',
      'apps/dashboard/src/shared/components/ui/',
      'apps/mobile/.expo/',
      'packages/car/boot/',
      'packages/db/drizzle/meta/',
      '**/.venv/',
    ],
  },
)

function getNamingConventionRules({ tsx }) {
  /** @type Extract<NonNullable<import('@antfu/eslint-config').Rules['ts/naming-convention']>, any[]>[1][] */
  const config = [
    // This default configuration can be found at https://typescript-eslint.io/rules/naming-convention/
    {
      selector: 'default',
      format: ['camelCase'],
      leadingUnderscore: 'allow',
      trailingUnderscore: 'allow',
    },
    {
      selector: 'import',
      format: ['camelCase', 'PascalCase'],
    },
    {
      selector: 'variable',
      format: ['camelCase', 'UPPER_CASE'],
      leadingUnderscore: 'allow',
      trailingUnderscore: 'allow',
    },
    {
      selector: 'typeLike',
      format: ['PascalCase'],
    },
    // Following is not the default configuration
    tsx ? {
      selector: 'variable',
      types: ['function'],
      format: ['camelCase', 'PascalCase'],
    } : undefined,
    tsx ? {
      selector: 'function',
      format: ['camelCase', 'PascalCase'],
    } : undefined,
  ]

  return config.filter(Boolean)
}
