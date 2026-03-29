import importPlugin from 'eslint-plugin-import';

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        plugins: { import: importPlugin },
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parser: tseslint.parsers.typescript,
        },
        rules: {
            // prefer barrel exports instead of deep paths
            'import/no-useless-path-segments': ['error', { noUselessIndex: true }],

            // auto-sort + organize imports into groups
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',           // node builtins
                        'external',          // npm packages
                        'type',              // type-only imports
                        'internal',          // @/ paths
                        ['parent', 'sibling', 'index'] // relative imports
                    ],
                    pathGroups: [
                        { pattern: '@/**/types', group: 'type', position: 'before' },
                        { pattern: '@/**/hooks', group: 'internal', position: 'before' },
                        { pattern: '@/**/components', group: 'internal', position: 'after' }
                    ],
                    pathGroupsExcludedImportTypes: ['builtin'],
                    alphabetize: { order: 'asc', caseInsensitive: true },
                    'newlines-between': 'always'
                }
            ],
        },
    },
]);