// eslint.config.js — ESLint v9+ flat config (ESM)
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';

export default [
	// Global ignores — must be a standalone object with only "ignores"
	{
		ignores: ['.next/**', 'node_modules/**', 'dist/**'],
	},
	{
		files: ['src/**/*.{js,jsx,ts,tsx}', 'pages/**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 2022,
				sourceType: 'module',
				ecmaFeatures: { jsx: true },
			},
		},
		plugins: {
			'@typescript-eslint': tseslint,
			react: pluginReact,
			'react-hooks': pluginReactHooks,
		},
		settings: {
			react: { version: 'detect' },
		},
		rules: {
			// React
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			// React hooks
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
			// TypeScript
			'@typescript-eslint/no-unused-vars': ['warn'],
			'@typescript-eslint/no-explicit-any': 'warn',
		},
	},
	// Prettier last — disables rules that conflict with formatting
	prettier,
];
