/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
	content: ['./components/**/*.tsx', './pages/**/*.tsx'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				brand: {
					light: '#FBF8F3',
					dark: '#232332',
					purple: '#7928CA',
					pink: '#FF0080',
				},
				blue: {
					lighter: '#71c5ee',
					light: '#3182ce',
					normal: '#025091',
				},
				card: {
					dark: 'rgba(255, 255, 255, 0.04)',
					light: 'rgba(255, 255, 255, 0.80)',
				},
				badge: {
					dark: 'rgba(226, 232, 240, 0.16)',
					light: '#F8F0E3',
				},
				'accent-1': '#FAFAFA',
				'accent-2': '#EAEAEA',
				'accent-7': '#333',
				success: '#0070f3',
				cyan: '#79FFE1',
				primary: colors.blue,
			},
			typography: {
				DEFAULT: {
					css: {
						fontFamily: 'var(--font-lora), Georgia, serif',
						fontSize: '18px',
						lineHeight: '1.85',
						color: '#d4d4d4',
						maxWidth: 'none',

						// Headings
						h1: {
							fontFamily: 'var(--font-sans)',
							fontSize: '2.25rem',
							fontWeight: '600',
							lineHeight: '1.25',
							color: '#ffffff',
							marginTop: '0',
							marginBottom: '1.5rem',
							letterSpacing: '-0.02em',
						},
						h2: {
							fontFamily: 'var(--font-sans)',
							fontSize: '1.6rem',
							fontWeight: '600',
							lineHeight: '1.3',
							color: '#ffffff',
							marginTop: '2.5rem',
							marginBottom: '1rem',
							letterSpacing: '-0.015em',
							paddingBottom: '0.5rem',
							borderBottom: '1px solid #222222',
						},
						h3: {
							fontFamily: 'var(--font-sans)',
							fontSize: '1.25rem',
							fontWeight: '600',
							lineHeight: '1.4',
							color: '#f0f0f0',
							marginTop: '2rem',
							marginBottom: '0.75rem',
						},
						h4: {
							fontFamily: 'var(--font-sans)',
							fontSize: '1.1rem',
							fontWeight: '500',
							color: '#e0e0e0',
							marginTop: '1.5rem',
							marginBottom: '0.5rem',
						},
						'h5, h6': {
							fontFamily: 'var(--font-sans)',
							fontSize: '1rem',
							fontWeight: '500',
							color: '#cccccc',
						},

						// Paragraph
						p: {
							fontSize: '1.125rem',
							lineHeight: '1.85',
							marginTop: '0',
							marginBottom: '1.5rem',
							color: '#d4d4d4',
						},

						// Links
						a: {
							color: '#b5f542',
							textDecoration: 'underline',
							textDecorationColor: '#b5f54240',
							textUnderlineOffset: '3px',
							fontWeight: '400',
							transition: 'color 0.15s, text-decoration-color 0.15s',
							'&:hover': {
								color: '#ccff70',
								textDecorationColor: '#b5f542',
							},
						},

						// Strong & emphasis
						strong: {
							color: '#ffffff',
							fontWeight: '600',
						},
						em: {
							color: '#d4d4d4',
							fontStyle: 'italic',
						},

						// Blockquote
						blockquote: {
							borderLeftWidth: '3px',
							borderLeftColor: '#b5f542',
							backgroundColor: '#111111',
							borderRadius: '0 8px 8px 0',
							paddingTop: '1rem',
							paddingBottom: '1rem',
							paddingLeft: '1.5rem',
							paddingRight: '1.5rem',
							marginLeft: '0',
							marginRight: '0',
							fontStyle: 'italic',
							color: '#a3a3a3',
							'& p': {
								marginBottom: '0',
								fontSize: '1.05rem',
							},
						},

						// Unordered list
						ul: {
							paddingLeft: '1.5rem',
							marginBottom: '1.5rem',
							listStyleType: 'none',
						},
						'ul > li': {
							position: 'relative',
							paddingLeft: '1.25rem',
							marginBottom: '0.5rem',
							color: '#d4d4d4',
							'&::before': {
								content: '"▸"',
								position: 'absolute',
								left: '0',
								color: '#b5f542',
								fontSize: '0.75rem',
								top: '5px',
							},
						},

						// Ordered list
						ol: {
							paddingLeft: '1.5rem',
							marginBottom: '1.5rem',
							counterReset: 'list-counter',
							listStyleType: 'none',
						},
						'ol > li': {
							position: 'relative',
							paddingLeft: '1.75rem',
							marginBottom: '0.5rem',
							color: '#d4d4d4',
							counterIncrement: 'list-counter',
							'&::before': {
								content: 'counter(list-counter) "."',
								position: 'absolute',
								left: '0',
								color: '#b5f542',
								fontFamily: 'var(--font-mono)',
								fontSize: '0.85rem',
								fontWeight: '600',
								top: '2px',
							},
						},

						// Nested lists
						'li > ul, li > ol': {
							marginTop: '0.5rem',
							marginBottom: '0.5rem',
						},

						// Inline code
						'code:not(pre code)': {
							fontFamily: 'var(--font-mono)',
							fontSize: '0.875em',
							color: '#b5f542',
							backgroundColor: '#1a1a1a',
							border: '1px solid #2a2a2a',
							borderRadius: '4px',
							padding: '0.15em 0.4em',
							fontWeight: '400',
						},

						// Code blocks (rehype-pretty-code wraps in <figure>)
						'figure[data-rehype-pretty-code-figure]': {
							margin: '1.75rem 0',
							borderRadius: '10px',
							overflow: 'hidden',
							border: '1px solid #222222',
							backgroundColor: '#0d0d0d',
						},
						'figure[data-rehype-pretty-code-figure] figcaption': {
							fontFamily: 'var(--font-mono)',
							fontSize: '0.75rem',
							color: '#666666',
							backgroundColor: '#111111',
							borderBottom: '1px solid #1e1e1e',
							padding: '8px 16px',
						},
						pre: {
							margin: '0',
							padding: '1.25rem 1.5rem',
							backgroundColor: 'transparent',
							overflowX: 'auto',
							fontSize: '0.875rem',
							lineHeight: '1.7',
						},
						'pre code': {
							fontFamily: 'var(--font-mono)',
							fontSize: '0.875rem',
							backgroundColor: 'transparent',
							border: 'none',
							padding: '0',
							color: 'inherit',
						},
						// Highlighted lines (rehype-pretty-code)
						'[data-highlighted-line]': {
							backgroundColor: '#1e2a12',
							borderLeft: '2px solid #b5f542',
							paddingLeft: 'calc(1.5rem - 2px)',
							marginLeft: '-1.5rem',
							marginRight: '-1.5rem',
							paddingRight: '1.5rem',
						},

						// Horizontal rule
						hr: {
							borderColor: '#222222',
							borderTopWidth: '1px',
							marginTop: '2.5rem',
							marginBottom: '2.5rem',
						},

						// Tables
						table: {
							width: '100%',
							fontSize: '0.9rem',
							marginBottom: '1.75rem',
							borderCollapse: 'collapse',
							display: 'block',
							overflowX: 'auto',
						},
						thead: {
							borderBottom: '2px solid #333333',
						},
						th: {
							fontFamily: 'var(--font-sans)',
							fontWeight: '600',
							fontSize: '0.8rem',
							letterSpacing: '0.05em',
							textTransform: 'uppercase',
							color: '#888888',
							padding: '10px 16px',
							textAlign: 'left',
							backgroundColor: '#111111',
						},
						td: {
							padding: '10px 16px',
							borderBottom: '1px solid #1e1e1e',
							color: '#d4d4d4',
							verticalAlign: 'top',
						},
						'tr:hover td': {
							backgroundColor: '#141414',
						},

						// Images
						img: {
							borderRadius: '8px',
							border: '1px solid #222222',
							marginTop: '1.5rem',
							marginBottom: '0.5rem',
							width: '100%',
						},
						figure: {
							margin: '2rem 0',
						},
						figcaption: {
							textAlign: 'center',
							fontSize: '0.8rem',
							color: '#666666',
							marginTop: '0.5rem',
							fontStyle: 'italic',
						},

						// Keyboard input element
						kbd: {
							fontFamily: 'var(--font-mono)',
							fontSize: '0.8em',
							color: '#d4d4d4',
							backgroundColor: '#1a1a1a',
							border: '1px solid #333333',
							borderBottom: '2px solid #444444',
							borderRadius: '4px',
							padding: '0.1em 0.5em',
						},

						// Definition / abbreviation
						abbr: {
							textDecoration: 'underline dotted',
							textDecorationColor: '#555555',
							cursor: 'help',
						},

						// Mark / highlight
						mark: {
							backgroundColor: '#b5f54230',
							color: '#b5f542',
							padding: '0.1em 0.25em',
							borderRadius: '3px',
						},
					},
				},
			},
			spacing: {
				28: '7rem',
			},
			letterSpacing: {
				tighter: '-.04em',
			},
			inset: {
				100: '100%',
				50: '50%',
			},
			lineHeight: {
				tight: 1.2,
			},
			fontSize: {
				'5xl': '2.5rem',
				'6xl': '2.75rem',
				'7xl': '4.5rem',
				'8xl': '6.25rem',
			},
			boxShadow: {
				sm: '0 5px 10px rgba(0, 0, 0, 0.12)',
				md: '0 8px 30px rgba(0, 0, 0, 0.12)',
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		function ({ addUtilities }) {
			addUtilities({
				'.flex-center': {
					display: 'flex',
					'align-items': 'center',
					'justify-content': 'center',
				},
			});
		},
	],
};
