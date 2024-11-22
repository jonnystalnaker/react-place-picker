import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';

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
				// Define globals for both browser and Node.js
				window: 'readonly',
				document: 'readonly',
				console: 'readonly',
				process: 'readonly',
				module: 'readonly',
				require: 'readonly',
			},
		},
		plugins: {
			react: pluginReact,
			'react-hooks': pluginReactHooks,
		},
		rules: {
			'react/react-in-jsx-scope': 'off', // React 17+ JSX Transform
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
			'no-console': 'off', // Allow console statements
		},
		settings: {
			react: {
				version: 'detect', // Automatically detect React version
			},
		},
	},
];
