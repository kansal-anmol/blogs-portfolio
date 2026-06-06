// Libs
import { AppProps } from 'next/app';
import { JetBrains_Mono, Lora } from 'next/font/google';
import Head from 'next/head';

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

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<link rel="icon" type="image/jpeg" href="/assets/profile.png" />
				<link rel="apple-touch-icon" href="/assets/profile.png" />
				<meta name="theme-color" content="#000000" />
			</Head>
			<div
				className={`${lora.variable} ${jetbrainsMono.variable} flex min-h-screen flex-col bg-[#0a0a0a] font-sans text-neutral-100`}
			>
				<PageNavbar />

				<main className="grow">
					<Component {...pageProps} />
				</main>

				<PageFooter authorName={pageProps.user?.name} socials={pageProps.user?.socials} />
			</div>
		</>
	);
}
