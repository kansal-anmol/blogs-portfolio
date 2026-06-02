import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				{/* Preconnect & Google Fonts */}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=Geist+Mono:wght@100..900&display=swap" rel="stylesheet" />
			</Head>
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
