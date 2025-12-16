module.exports = {
    root: true,
    env: { node: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',

        // ALWAYS KEEP "PRETTIER" LAST, THIS DISABLES CONFLICTS WITH PRETTIER
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
};
