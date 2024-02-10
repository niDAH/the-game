module.exports = {
    env: {
        browser: true,
        es2020: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:jest/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:prettier/recommended', // Make sure this is always the last element in the array.
    ],
    ignorePatterns: ['node_modules', '*.config.js'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': 'warn',
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            node: {
                paths: ['src'],
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
    plugins: ['simple-import-sort', 'prettier'],
    rules: {
        '@typescript-eslint/comma-dangle': ['error', 'only-multiline'],
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/semi': 0,
        '@typescript-eslint/space-before-function-paren': ['error', 'never'],
        '@typescript-eslint/strict-boolean-expressions': 'off',
        'comma-dangle': ['error', 'only-multiline'],
        'indent': 'off',
        'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
        'react/react-in-jsx-scope': 'off',
        'restrict-template-expressions': 'off',
        'semi': [2, 'always'],
        'semi-style': ['error', 'last'],
        'space-before-function-paren': 'off'
    },
};
