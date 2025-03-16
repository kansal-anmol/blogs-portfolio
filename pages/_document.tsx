import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body>
				<script
					dangerouslySetInnerHTML={{
						__html: `
								(function() {
									const isDark = localStorage.getItem('darkMode') === 'true';
									if (isDark) {
									document.documentElement.classList.add('dark');
									}
								})();
								`,
					}}
				/>

				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
