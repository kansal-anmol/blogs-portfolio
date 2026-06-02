// Libs
import { AppProps } from 'next/app';
import { JetBrains_Mono, Lora } from 'next/font/google';
import Head from 'next/head';
import { useEffect } from 'react';

// Contexts
import { AppProvider } from '@/src/client/contexts/appContext';
import { PUBLICATION } from '@/src/shared/constants/publication';

// Components
import { PageFooter } from '@/src/client/components/PageFooter';
import { PageNavbar } from '@/src/client/components/PageNavbar';

// Styles
import '../styles/index.css';

const lora = Lora({
	subsets: ['latin'],
	variable: '--font-lora',
	display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ['latin'],
	variable: '--font-mono',
	display: 'swap',
});

const googleAnalytics = `
	window.dataLayer = window.dataLayer || [];
	function gtag(){window.dataLayer.push(arguments);}
	gtag('js', new Date());
`;

export default function MyApp({ Component, pageProps }: AppProps) {
	useEffect(() => {
		(window as any).adjustIframeSize = (id: string, newHeight: string) => {
			const i = document.getElementById(id);
			if (!i) return;
			// eslint-disable-next-line radix
			i.style.height = `${parseInt(newHeight)}px`;
		};
	}, []);

	return (
		<AppProvider publication={PUBLICATION}>
			<Head>
				<link rel="icon" type="image/jpeg" href="/assets/profile.jpg" />
				<link rel="apple-touch-icon" href="/assets/profile.jpg" />
				<meta name="theme-color" content="#000000" />
				<script dangerouslySetInnerHTML={{ __html: googleAnalytics }} />
			</Head>
			<div
				className={`${lora.variable} ${jetbrainsMono.variable} flex min-h-screen flex-col bg-[#0a0a0a] font-sans text-neutral-100`}
			>
				<PageNavbar />

				<main className="grow">
					<Component {...pageProps} />
				</main>

				<PageFooter />
			</div>
		</AppProvider>
	);
}
