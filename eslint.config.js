import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
	pluginJs.configs.recommended,
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		plugins: {
			react: pluginReact,
			'react-hooks': pluginReactHooks,
		},
		rules: {
			'react/react-in-jsx-scope': 'off',
			'react/jsx-uses-react': 'off',
			'react/jsx-uses-vars': 'error',
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
			'no-console': 'off',
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
];
